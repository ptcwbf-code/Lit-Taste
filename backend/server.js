// Backend：Node.js + Express + PostgreSQL。
// 它做的事：接收浏览器的 HTTP 请求 -> 计分匹配 -> 查询/写入 Postgres -> 把结果变成 JSON 返回。
//
// 这是一个"测试平台"后端：它不再知道"文学口味"是什么，只知道从 tests/ 目录里
// 加载若干个"测试内容包"（每个包自带维度、实体、题目、文案），然后统一地：
//   出题（分层抽样 + 维度覆盖保证）、计分、余弦匹配、存结果。
const path = require('node:path');
const fs = require('node:fs');
const express = require('express');
const { Pool } = require('pg');
const { computeProfile, matchEntities, describeProfile, describeSoul, describeMatch, dimKeys } = require('./scoring.js');

const app = express();
const PORT = process.env.PORT || 3001; // Render 会注入动态端口；本地回退 3001（3000 被占用）
const DEFAULT_COUNT = 24; // 标准版默认题数（前端会传 count 覆盖）

// 数据库连接：优先读 DATABASE_URL（Render/Neon/Supabase 都会注入），本地开发回退到 localhost。
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/literary_taste';
const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: /localhost|127\.0\.0\.1/.test(DATABASE_URL) ? false : { rejectUnauthorized: false },
});

// —— 加载所有测试内容包（tests/<id>/test.js）——
const TESTS_DIR = path.join(__dirname, '..', 'tests');
const tests = new Map();

function loadTests() {
  for (const entry of fs.readdirSync(TESTS_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const testPath = path.join(TESTS_DIR, entry.name, 'test.js');
    if (!fs.existsSync(testPath)) continue;
    const test = require(testPath);
    tests.set(test.id, test);
  }
}
loadTests();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend')));

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// 一道题触及哪些核心维度：某个选项在 vector 里给了该维非零系数，即"这一题有该维的信号可测"。
function dimsOf(q, test) {
  const set = new Set();
  for (const o of q.options) for (const d of dimKeys(test)) if (o.vector && o.vector[d]) set.add(d);
  return set;
}

// 维度覆盖目标：抽的题越多，每个核心维至少被触及的次数就越高。
function coverageTarget(count) {
  if (count <= 16) return 2;
  if (count <= 24) return 3;
  return 4;
}

// 按题型分层抽样：保证精简版也能覆盖多种题型，而不是随机抽到一堆同质题。
// 分层之后再加"维度覆盖保证"：剩余槽位贪心挑"能补最多欠触及维"的题。
function sampleQuestions(test, count) {
  const dims = dimKeys(test);
  const byFormat = {};
  for (const q of test.questions) (byFormat[q.format] = byFormat[q.format] || []).push(q);
  const picked = [];
  for (const f of Object.keys(byFormat)) {
    if (picked.length < count) picked.push(shuffle(byFormat[f])[0]);
  }
  // patience 是独立且高权重的量，且只在 commitment 题型测（若该测试有这种题型）；
  // 保证至少抽到 2 道，避免"一个选择决定一个高权重量"的噪声。
  const minCommit = Math.min(2, count);
  for (const q of shuffle(byFormat.commitment || [])) {
    const have = picked.filter((x) => x.format === 'commitment').length;
    if (have >= minCommit || picked.length >= count || picked.includes(q)) continue;
    picked.push(q);
  }
  const target = coverageTarget(count);
  const touches = () => {
    const t = Object.fromEntries(dims.map((d) => [d, 0]));
    for (const q of picked) for (const d of dimsOf(q, test)) t[d]++;
    return t;
  };
  const rest = shuffle(test.questions.filter((q) => !picked.includes(q))).map((q) => [q, dimsOf(q, test)]);
  while (picked.length < count && rest.length) {
    const t = touches();
    let bi = 0, bestScore = -1;
    for (let i = 0; i < rest.length; i++) {
      let score = 0;
      for (const d of rest[i][1]) if (t[d] < target) score++;
      if (score > bestScore) { bestScore = score; bi = i; }
    }
    picked.push(rest[bi][0]);
    rest.splice(bi, 1);
  }
  return shuffle(picked);
}

// 只暴露给前端的内容：不含评分向量（评分在后端做）
function publicQuestion(q) {
  const strip = (opts) => opts.map((o) => ({ id: o.id, text: o.text }));
  return {
    id: q.id, format: q.format, context: q.context, prompt: q.prompt,
    options: strip(q.options),
    followUp: q.followUp ? { prompt: q.followUp.prompt, options: strip(q.followUp.options) } : null,
  };
}

// 测试的公开元信息：前端渲染目录页、开场页、雷达图、结果页所需的全部标签与维度。
function publicTest(t) {
  return {
    id: t.id, title: t.title, wordmark: t.wordmark, metaBadge: t.metaBadge,
    heading: t.heading, lead: t.lead, modes: t.modes,
    entityLabel: t.entityLabel, resultKicker: t.resultKicker,
    familyTitle: t.familyTitle, dnaTitle: t.dnaTitle, tipLabel: t.tipLabel,
    booksTitle: t.booksTitle, legendLabel: t.legendLabel, metaFields: t.metaFields,
    foldRadar: !!t.foldRadar,
    heroKicker: t.heroKicker || '', // 结果页 Hero 标题（如"你属于"；默认"你是"）
    postcard: !!t.postcard, // 明信片式分享卡开关（时代包开启）
    dims: t.dims.map((d) => ({ key: d.key, label: d.label })),
    hasDifficulty: !!(t.config && t.config.difficulty),
    questionCount: t.questions.length, entityCount: t.entities.length,
  };
}

function catalogItem(t) {
  return {
    id: t.id, title: t.title, heading: t.heading, lead: t.lead,
    metaBadge: t.metaBadge, emoji: t.emoji, questionCount: t.questions.length, entityCount: t.entities.length,
  };
}

// 实体副标题行：按 test.metaFields 指定字段用 ' · ' 拼接（例如 "古希腊 · 《伊利亚特》"）。
function metaLine(entity, test) {
  return (test.metaFields || []).map((f) => entity && entity[f]).filter(Boolean).join(' · ');
}

// 从实体 works 里抽取《书名》生成推荐书单（可选，由 test.config.extractBooks 决定）
function extractBooks(family, test) {
  const names = new Set();
  const books = [];
  for (const f of family) {
    const e = test.entities.find((x) => x.name === f.name);
    const titles = (e && e.works || '').match(/《[^》]+》/g) || [];
    for (const b of titles) if (!names.has(b)) { names.add(b); books.push(b); }
    if (books.length >= 6) break;
  }
  return books;
}

// async 路由包装：把 rejected promise 交给统一错误处理中间件（见文件末尾）。
const wrap = (fn) => (req, res, next) => fn(req, res, next).catch(next);

app.get('/api/health', wrap(async (req, res) => {
  const { n } = (await pool.query('SELECT COUNT(*)::int AS n FROM results')).rows[0];
  res.json({ ok: true, service: 'quiz-platform-backend', tests: tests.size, results: n });
}));

// 目录：列出所有测试（供首页卡片）
app.get('/api/tests', (req, res) => {
  res.json([...tests.values()].map(catalogItem));
});

// 单个测试的公开元信息
app.get('/api/tests/:id', (req, res) => {
  const t = tests.get(req.params.id);
  if (!t) { res.status(404).json({ error: '测试不存在' }); return; }
  res.json(publicTest(t));
});

// 每次返回随机抽取并打乱顺序的情境（不含评分向量）
app.get('/api/tests/:id/questions', (req, res) => {
  const t = tests.get(req.params.id);
  if (!t) { res.status(404).json({ error: '测试不存在' }); return; }
  const count = Math.min(t.questions.length, Math.max(1, Number(req.query.count) || DEFAULT_COUNT));
  res.json(sampleQuestions(t, count).map(publicQuestion));
});

// 收答案 -> 计分 -> 匹配 -> 存库 -> 返回结果
app.post('/api/tests/:id/results', wrap(async (req, res) => {
  const t = tests.get(req.params.id);
  if (!t) { res.status(404).json({ error: '测试不存在' }); return; }
  const submissionId = (req.body && req.body.submissionId) || null;

  // 幂等重试：同一个 submissionId 已经算过并入库，直接返回旧结果，避免重复写库。
  // （前端在"响应丢失"后会重试并带上同一个 submissionId，这里把重试变成安全的。）
  if (submissionId) {
    const prev = await pool.query(
      'SELECT result_json FROM results WHERE submission_id = $1 AND test_id = $2',
      [submissionId, t.id]
    );
    if (prev.rowCount) {
      res.json(JSON.parse(prev.rows[0].result_json));
      return;
    }
  }

  const answers = req.body && req.body.answers;
  if (!Array.isArray(answers) || answers.length === 0) {
    res.status(400).json({ error: '缺少 answers' });
    return;
  }
  for (const a of answers) {
    const q = t.questions.find((x) => x.id === a.questionId);
    if (!q || !Array.isArray(a.selections) || a.selections.length === 0) {
      res.status(400).json({ error: '答案格式不正确' });
      return;
    }
    for (const sel of a.selections) {
      if (!['A', 'B', 'C', 'D', 'E'].includes(sel)) {
        res.status(400).json({ error: '答案格式不正确' });
        return;
      }
    }
    if (a.followUp != null && !['A', 'B', 'C', 'D', 'E'].includes(a.followUp)) {
      res.status(400).json({ error: '答案格式不正确' });
      return;
    }
  }

  const profile = computeProfile(answers, t);
  const { top, also, family, caveat } = matchEntities(profile, t);
  const desc = describeProfile(profile, t);
  const soul = describeSoul(profile, t);

  const topEntity = t.entities.find((e) => e.name === top.name);
  const detail = (t.details && t.details[top.name]) || {};
  const analysis = describeMatch(profile, top.profile, top.name, t);
  const match = {
    name: top.name,
    meta: metaLine(topEntity, t),
    profile: top.profile,
    score: top.match,
    breakdown: top.breakdown,
    desc: detail.intro || '',
    desc2: detail.works_intro || '',
    quote: detail.quote || '',
    source: detail.source || '',
    gradient: detail.gradient || t.gradient || '', // 实体专属渐变，缺省用测试主色（时代包用专属色，其余包用主色）
    seal: detail.seal || '', // 明信片上的时代印章文字（时代包提供）
    analysis: analysis.lines,
    sharedDna: analysis.sharedDna,
    tip: analysis.readingTip,
  };

  const familyOut = family.map((f) => {
    const e = t.entities.find((x) => x.name === f.name);
    return { name: f.name, meta: metaLine(e, t), score: f.match, why: f.why };
  });
  const alsoOut = also.map((f) => {
    const e = t.entities.find((x) => x.name === f.name);
    return { name: f.name, meta: metaLine(e, t), score: f.match, tag: f.tag };
  });
  const books = (t.config && t.config.extractBooks) ? extractBooks(family, t) : [];

  const result = {
    test: publicTest(t),
    profile,
    typeLabel: desc.typeLabel,
    topDims: desc.topDims,
    lowLabel: desc.lowLabel,
    soul,
    caveat,
    match,
    family: familyOut,
    also: alsoOut,
    books,
  };

  await pool.query(
    'INSERT INTO results (test_id, result_json, submission_id) VALUES ($1, $2, $3) ON CONFLICT (submission_id) DO NOTHING',
    [t.id, JSON.stringify(result), submissionId]
  );

  res.json(result);
}));

// 某个测试的历史结果
app.get('/api/tests/:id/results', wrap(async (req, res) => {
  const t = tests.get(req.params.id);
  if (!t) { res.status(404).json({ error: '测试不存在' }); return; }
  const rows = (await pool.query(
    `SELECT id, test_id, to_char(created_at, 'YYYY-MM-DD HH24:MI:SS') AS created_at, result_json
       FROM results WHERE test_id = $1 ORDER BY id DESC`,
    [req.params.id]
  )).rows;
  res.json(rows.map((r) => {
    let result = {};
    try { result = JSON.parse(r.result_json || '{}'); } catch (e) { result = {}; }
    return { id: r.id, test_id: r.test_id, created_at: r.created_at, result };
  }));
}));

// 单条历史记录的完整结果（点历史卡片进来回看；结果里已带 test 元信息，前端可直接渲染）
app.get('/api/results/:id', wrap(async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    res.status(400).json({ error: '无效的 id' });
    return;
  }
  const row = (await pool.query('SELECT result_json FROM results WHERE id = $1', [id])).rows[0];
  if (!row || !row.result_json) {
    res.status(404).json({ error: '记录不存在' });
    return;
  }
  let result = {};
  try { result = JSON.parse(row.result_json); } catch (e) { result = {}; }
  res.json(result);
}));

// 删除一条历史记录
app.delete('/api/results/:id', wrap(async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    res.status(400).json({ error: '无效的 id' });
    return;
  }
  const r = await pool.query('DELETE FROM results WHERE id = $1', [id]);
  if (!r.rowCount) {
    res.status(404).json({ error: '记录不存在' });
    return;
  }
  res.json({ ok: true, deleted: r.rowCount });
}));

// 统一错误处理：必须注册在所有路由之后，才能捕获路由里的 async 错误。
app.use((err, req, res, next) => {
  console.error('路由错误：', err);
  res.status(500).json({ error: '服务器内部错误：' + (err && err.message ? err.message : String(err)) });
});

// 启动时确保数据库就绪：应用 schema（CREATE TABLE IF NOT EXISTS，幂等），
// 并做一次性迁移——旧版 results 表有 10 个维度列、没有 test_id，检测到就重建。
async function ensureSchema() {
  const schema = fs.readFileSync(path.join(__dirname, '..', 'database', 'init.sql'), 'utf8');
  await pool.query(schema);
  const colRows = (await pool.query(
    `SELECT column_name FROM information_schema.columns WHERE table_name = 'results'`
  )).rows;
  const cols = colRows.map((r) => r.column_name);
  if (cols.includes('narrative') && !cols.includes('test_id')) {
    await pool.query('DROP TABLE results');
    await pool.query(schema);
    console.log('已把旧 results 表迁移为通用结构（旧历史记录已清空）');
  }
}

(async () => {
  try {
    // 启动时连接可能撞上 Neon 免费档的"冷启动"，重试几次更稳。
    let connected = false;
    for (let i = 0; i < 5 && !connected; i++) {
      try {
        await pool.query('SELECT 1');
        connected = true;
      } catch (e) {
        if (i === 4) throw e;
        await new Promise((r) => setTimeout(r, 3000));
      }
    }
    await ensureSchema();
    console.log('Postgres 已连接并就绪；已加载 ' + tests.size + ' 个测试：' + [...tests.keys()].join(', '));
  } catch (e) {
    console.error('Postgres 连接或初始化失败：' + e.message);
    console.error('请确认 DATABASE_URL 环境变量指向一个可用的 Postgres。');
    process.exit(1);
  }
  app.listen(PORT, () => {
    console.log('Backend listening on http://localhost:' + PORT);
  });
})();
