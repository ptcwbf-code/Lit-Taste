// Backend：Node.js + Express + PostgreSQL。
// 它做的事：接收浏览器的 HTTP 请求 -> 查询/写入 Postgres -> 把结果变成 JSON 返回。
const path = require('node:path');
const fs = require('node:fs');
const express = require('express');
const { Pool } = require('pg');
const questions = require('./questions.js');
const { DIMS, DIM_LABELS, computeProfile, matchWriters, describeProfile, describeSoul, describeMatch } = require('./scoring.js');
const writersDetail = require('./writers-detail.js');

const app = express();
const PORT = process.env.PORT || 3001; // Render 会注入动态端口；本地回退 3001（3000 被占用）
const QUESTIONS_PER_TEST = 24; // 标准版默认题数（前端会传 count 覆盖）

// 数据库连接：优先读 DATABASE_URL（Render/Neon/Supabase 都会注入），本地开发回退到 localhost。
// 托管服务走 SSL；本地不走。不再依赖本地 app.db 文件，数据落到 Postgres（Render 上可持久化）。
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/literary_taste';
const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: /localhost|127\.0\.0\.1/.test(DATABASE_URL) ? false : { rejectUnauthorized: false },
});

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
function dimsOf(q) {
  const set = new Set();
  for (const o of q.options) for (const d of DIMS) if (o.vector && o.vector[d]) set.add(d);
  return set;
}

// 维度覆盖目标：抽的题越多，每个核心维至少被触及的次数就越高。
// 精简版(16)保 2 次、标准版(24)保 3 次、精确版(32)及以上保 4 次——
// 让"某个维度恰好没被抽到"不再靠运气，而是被抽样器主动补上。
function coverageTarget(count) {
  if (count <= 16) return 2;
  if (count <= 24) return 3;
  return 4;
}

// 按题型分层抽样：保证精简版也能覆盖多种题型，而不是随机抽到一堆同质题。
// 分层之后再加"维度覆盖保证"：剩余槽位贪心挑"能补最多欠触及维"的题，
// 使每个用户无论抽到哪一组，都能稳定地对 10 个核心维表态。
function sampleQuestions(pool_, count) {
  const byFormat = {};
  for (const q of pool_) (byFormat[q.format] = byFormat[q.format] || []).push(q);
  const picked = [];
  for (const f of Object.keys(byFormat)) {
    if (picked.length < count) picked.push(shuffle(byFormat[f])[0]);
  }
  // patience 是独立且高权重的量，且只在 commitment 题型测；
  // 保证标准/精装版至少抽到 2 道 commitment，避免"一个选择决定 7.5% 匹配分"的噪声。
  const minCommit = Math.min(2, count);
  for (const q of shuffle(byFormat.commitment || [])) {
    const have = picked.filter((x) => x.format === 'commitment').length;
    if (have >= minCommit || picked.length >= count || picked.includes(q)) continue;
    picked.push(q);
  }
  // 维度覆盖保证：反复计算当前已抽题里每个维被触及的次数，欠触及维优先补。
  const target = coverageTarget(count);
  const touches = () => {
    const t = Object.fromEntries(DIMS.map((d) => [d, 0]));
    for (const q of picked) for (const d of dimsOf(q)) t[d]++;
    return t;
  };
  const rest = shuffle(pool_.filter((q) => !picked.includes(q))).map((q) => [q, dimsOf(q)]);
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

// async 路由包装：把 rejected promise 交给统一错误处理中间件（见文件末尾）。
const wrap = (fn) => (req, res, next) => fn(req, res, next).catch(next);

app.get('/api/health', wrap(async (req, res) => {
  const { n } = (await pool.query('SELECT COUNT(*)::int AS n FROM writers')).rows[0];
  res.json({ ok: true, service: 'literary-taste-backend', writers: n, questionPool: questions.length });
}));

// 直接暴露作家表，用于演示 SELECT * FROM writers（前端当前未调用，保留作教学用途）
app.get('/api/writers', wrap(async (req, res) => {
  res.json((await pool.query('SELECT * FROM writers ORDER BY id')).rows);
}));

app.get('/api/writers/:id', wrap(async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    res.status(400).json({ error: '无效的 id' });
    return;
  }
  const row = (await pool.query('SELECT * FROM writers WHERE id = $1', [id])).rows[0];
  if (!row) {
    res.status(404).json({ error: 'writer not found' });
    return;
  }
  res.json(row);
}));

// 历史结果：把每次测试的 10 维分和匹配结果都读出来（演示 SELECT * FROM results）
// created_at 统一格式化为 'YYYY-MM-DD HH24:MI:SS'（UTC），与旧 SQLite 版展示一致。
app.get('/api/results', wrap(async (req, res) => {
  const rows = (await pool.query(
    `SELECT id, to_char(created_at, 'YYYY-MM-DD HH24:MI:SS') AS created_at,
            narrative, lyric, psychology, imagination, society, philosophy,
            form, readability, humor, desire, matches
       FROM results ORDER BY id DESC`
  )).rows;
  res.json(rows.map((r) => {
    let matches = {};
    try { matches = JSON.parse(r.matches || '{}'); } catch (e) { matches = {}; }
    return {
      id: r.id,
      created_at: r.created_at,
      core: {
        narrative: r.narrative, lyric: r.lyric, psychology: r.psychology, imagination: r.imagination,
        society: r.society, philosophy: r.philosophy, form: r.form, readability: r.readability, humor: r.humor, desire: r.desire,
      },
      matches,
    };
  }));
}));

// 查看单条历史记录的完整结果（点历史卡片进来回看）
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

// 每次返回随机抽取并打乱顺序的情境（不含评分向量）
app.get('/api/questions', (req, res) => {
  const count = Math.min(questions.length, Math.max(1, Number(req.query.count) || QUESTIONS_PER_TEST));
  const sampled = sampleQuestions(questions, count);
  res.json(sampled.map(publicQuestion));
});

// 收答案 -> 计分 -> 匹配 -> 存库 -> 返回结果
app.post('/api/results', wrap(async (req, res) => {
  const answers = req.body && req.body.answers;
  if (!Array.isArray(answers) || answers.length === 0) {
    res.status(400).json({ error: '缺少 answers' });
    return;
  }
  for (const a of answers) {
    const q = questions.find((x) => x.id === a.questionId);
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

  const profile = computeProfile(answers, questions);
  const writers = (await pool.query('SELECT * FROM writers')).rows;
  const { top, also, family, caveat } = matchWriters(profile, writers);
  const desc = describeProfile(profile);
  const soul = describeSoul(profile);

  const detail = writersDetail[top.name] || {};
  const analysis = describeMatch(profile, top.profile, top.name);
  const match = {
    name: top.name, region_era: top.region_era, works: top.works, tags: top.tags,
    match: top.match, profile: top.profile, breakdown: top.breakdown,
    intro: detail.intro || '', works_intro: detail.works_intro || '',
    quote: detail.quote || '', source: detail.source || '',
    analysis: analysis.lines,
    sharedDna: analysis.sharedDna,
    readingTip: analysis.readingTip,
  };

  // 推荐书单：文学家族前三位的代表作（拆成单本、去重，最多 6 本）
  const books = [...new Set(family.flatMap((f) => (f.works || '').match(/《[^》]+》/g) || []))].slice(0, 6);

  const result = {
    profile,
    readingType: desc.type,
    topDims: desc.top.map((d) => DIM_LABELS[d]),
    soul,
    caveat,
    match,
    family,
    books,
    also,
  };

  await pool.query(
    `INSERT INTO results (narrative, lyric, psychology, imagination, society, philosophy, form, readability, humor, desire, matches, result_json)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
    [
      profile.core.narrative, profile.core.lyric, profile.core.psychology, profile.core.imagination,
      profile.core.society, profile.core.philosophy, profile.core.form, profile.core.readability, profile.core.humor, profile.core.desire,
      JSON.stringify({ best: [top.name], adjacent: also.map((x) => x.name) }),
      JSON.stringify(result),
    ]
  );

  res.json(result);
}));

// 统一错误处理：必须注册在所有路由之后，才能捕获路由里的 async 错误，
// 把错误转成 500 JSON 而不是 HTML 错误页或进程崩溃。
app.use((err, req, res, next) => {
  console.error('路由错误：', err);
  res.status(500).json({ error: '服务器内部错误：' + (err && err.message ? err.message : String(err)) });
});

// 启动时确保数据库就绪：应用 schema（CREATE TABLE IF NOT EXISTS，幂等），
// 作家表为空时才导入 72 位作家。这样 Render 上启动命令只需 `node server.js`，
// 不需要单独的 seed 步骤（也避免了 seed.js 在 database/ 下解析不到 pg 的问题）。
async function ensureSeeded() {
  const schema = fs.readFileSync(path.join(__dirname, '..', 'database', 'init.sql'), 'utf8');
  await pool.query(schema);
  const { n } = (await pool.query('SELECT COUNT(*)::int AS n FROM writers')).rows[0];
  if (n === 0) {
    const writers = require('../database/writers.js');
    const insert = `
      INSERT INTO writers
        (name, region_era, works, narrative, lyric, psychology, imagination,
         society, philosophy, form, readability, humor, desire, tags)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    `;
    for (const w of writers) {
      await pool.query(insert, [
        w.name, w.region_era, w.works,
        w.narrative, w.lyric, w.psychology, w.imagination,
        w.society, w.philosophy, w.form, w.readability, w.humor, w.desire, w.tags,
      ]);
    }
    console.log('已导入 ' + writers.length + ' 位作家');
  }
}

(async () => {
  try {
    // 启动时连接可能撞上 Neon 免费档的"冷启动"（休眠后首次连接较慢），重试几次更稳。
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
    await ensureSeeded();
    console.log('Postgres 已连接并就绪');
  } catch (e) {
    console.error('Postgres 连接或初始化失败：' + e.message);
    console.error('请确认 DATABASE_URL 环境变量指向一个可用的 Postgres。');
    process.exit(1);
  }
  app.listen(PORT, () => {
    console.log('Backend listening on http://localhost:' + PORT);
  });
})();
