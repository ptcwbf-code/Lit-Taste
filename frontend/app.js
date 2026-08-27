// 前端：纯 HTML + CSS + Vanilla JavaScript。
// 只负责三件事：把目录画出来、把题目画出来、把结果画出来。算分和匹配都在后端。
// 维度、标签、文案全部来自后端返回的 test 元信息（state.test），这里不再写死任何维度。
const state = { test: null, questions: [], idx: 0, answers: [], result: null, count: 24, fromHistory: false, inFollowUp: false, submissionId: null };

// 每次答题生成一个唯一 submissionId：提交结果时带上，后端按它做幂等去重，
// 这样"响应丢失后重试"不会产生重复历史记录。
function newSubmissionId() {
  return 's_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 10);
}

// 统一的 fetch 封装：非 2xx 时抛出带错误信息的异常，避免静默失败。
// timeoutMs 可选：超时会中止请求（抛 AbortError），用于提交这类不能无限等待的调用。
async function api(url, options = {}, timeoutMs) {
  const ctrl = new AbortController();
  const timer = timeoutMs ? setTimeout(() => ctrl.abort(), timeoutMs) : null;
  try {
    const res = await fetch(url, { ...options, signal: ctrl.signal });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || ('请求失败 (' + res.status + ')'));
    return data;
  } finally {
    if (timer) clearTimeout(timer);
  }
}

function show(id) {
  for (const s of ['catalog', 'intro', 'quiz', 'results', 'history']) {
    document.getElementById(s).classList.toggle('hidden', s !== id);
  }
  document.getElementById('homeBtn').classList.toggle('hidden', id === 'catalog');
  window.scrollTo(0, 0);
}

async function init() {
  document.getElementById('homeBtn').addEventListener('click', loadCatalog);
  document.getElementById('startBtn').addEventListener('click', startQuiz);
  document.getElementById('historyBtn').addEventListener('click', openHistory);
  document.getElementById('backBtn').addEventListener('click', () => show('intro'));
  loadCatalog();
}

// —— 目录页 ——
async function loadCatalog() {
  show('catalog');
  document.getElementById('wordmark').textContent = '测试台 · Quiz Platform';
  try {
    const list = await api('/api/tests');
    renderCatalog(list);
  } catch (e) {
    document.getElementById('catalogBody').innerHTML = '<p class="empty">加载失败：' + e.message + '</p>';
  }
}

function renderCatalog(list) {
  if (!list.length) {
    document.getElementById('catalogBody').innerHTML = '<p class="empty">还没有测试。</p>';
    return;
  }
  document.getElementById('catalogBody').innerHTML = list.map((t) =>
    '<div class="catalog-card" data-id="' + t.id + '">' +
      '<div class="catalog-emoji">' + (t.emoji || '🎯') + '</div>' +
      '<div class="catalog-info">' +
        '<div class="catalog-top">' +
          '<span class="catalog-badge">' + (t.metaBadge || '测试') + '</span>' +
          '<span class="catalog-count">' + t.questionCount + ' 题 · ' + t.entityCount + ' 个候选</span>' +
        '</div>' +
        '<h2 class="catalog-title">' + t.heading + '</h2>' +
        '<p class="catalog-lead">' + t.lead + '</p>' +
      '</div>' +
    '</div>'
  ).join('');
  document.querySelectorAll('.catalog-card').forEach((c) => c.addEventListener('click', () => openTest(c.dataset.id)));
}

async function openTest(id) {
  try {
    const t = await api('/api/tests/' + id);
    state.test = t;
    renderIntro(t);
    show('intro');
  } catch (e) {
    alert('加载测试失败：' + e.message);
  }
}

function renderIntro(t) {
  document.getElementById('wordmark').textContent = t.wordmark || t.title;
  document.getElementById('introKicker').textContent = t.metaBadge || '';
  document.getElementById('introHeading').textContent = t.heading;
  document.getElementById('introLead').textContent = t.lead || '';
  const modes = (t.modes && t.modes.length) ? t.modes : [{ count: 24, label: '标准版', desc: '' }];
  const defIdx = modes.length > 1 ? 1 : 0;
  document.getElementById('modes').innerHTML = modes.map((m, i) =>
    '<button class="mode' + (i === defIdx ? ' selected' : '') + '" data-count="' + m.count + '"><strong>' + m.label + '</strong><span>' + (m.desc || '') + '</span></button>'
  ).join('');
  document.querySelectorAll('.mode').forEach((btn) => btn.addEventListener('click', () => selectMode(btn)));
  state.count = Number(modes[defIdx].count);
}

function selectMode(btn) {
  document.querySelectorAll('.mode').forEach((b) => b.classList.remove('selected'));
  btn.classList.add('selected');
  state.count = Number(btn.dataset.count);
}

// —— 答题 ——
async function startQuiz() {
  try {
    const qs = await api('/api/tests/' + state.test.id + '/questions?count=' + state.count);
    state.questions = qs;
    state.idx = 0;
    state.answers = [];
    state.submissionId = newSubmissionId();
    state.fromHistory = false;
    state.inFollowUp = false;
    show('quiz');
    renderScenario();
  } catch (e) {
    alert('加载题目失败：' + e.message);
  }
}

function renderScenario() {
  const q = state.questions[state.idx];
  const total = state.questions.length;
  document.getElementById('progressText').textContent = (state.idx + 1) + ' / ' + total;
  document.getElementById('progressBar').style.width = (((state.idx + 1) / total) * 100) + '%';

  const a = state.answers[state.idx] || (state.answers[state.idx] = { questionId: q.id, selections: [] });

  // 追问分支：主层选完后出现的第二层情境（单问，更深入一层）
  if (state.inFollowUp && q.followUp) {
    const fuQ = q.followUp;
    const fuSel = a.followUp;
    const optHtml = fuQ.options.map((o) =>
      '<button class="option' + (o.id === fuSel ? ' selected' : '') + '" data-id="' + o.id + '"><span class="opt-key">' + o.id + '</span>' + o.text + '</button>'
    ).join('');
    document.getElementById('scenario').innerHTML = '' +
      '<div class="scenario-card">' +
        '<p class="scenario-tag">追问</p>' +
        '<p class="prompt">' + fuQ.prompt + '</p>' +
        '<div class="options">' + optHtml + '</div>' +
        '<div class="quiz-nav">' +
          '<button id="prevBtn" class="ghost">返回</button>' +
          '<button id="nextBtn" class="primary"' + (fuSel ? '' : ' disabled') + '>' + (state.idx + 1 === total ? '查看结果' : '下一题') + '</button>' +
        '</div>' +
      '</div>';
    document.getElementById('nextBtn').addEventListener('click', next);
    document.getElementById('prevBtn').addEventListener('click', prev);
    document.querySelectorAll('.option').forEach((btn) => btn.addEventListener('click', () => selectFollowUp(btn)));
    return;
  }

  const sel = a.selections;
  const optHtml = q.options.map((o) => {
    const selected = sel.includes(o.id);
    return '<button class="option' + (selected ? ' selected' : '') + '" data-id="' + o.id + '"><span class="opt-key">' + o.id + '</span>' + o.text + '</button>';
  }).join('');

  document.getElementById('scenario').innerHTML = '' +
    '<div class="scenario-card">' +
      (q.context ? '<p class="scenario-bg">' + q.context + '</p>' : '') +
      '<p class="prompt">' + q.prompt + '</p>' +
      '<div class="options">' + optHtml + '</div>' +
      '<div class="quiz-nav">' +
        (state.idx > 0 ? '<button id="prevBtn" class="ghost">上一题</button>' : '<span></span>') +
        '<button id="nextBtn" class="primary"' + (sel.length >= 1 ? '' : ' disabled') + '>' + (q.followUp ? '继续' : (state.idx + 1 === total ? '查看结果' : '下一题')) + '</button>' +
      '</div>' +
    '</div>';

  document.getElementById('nextBtn').addEventListener('click', next);
  if (state.idx > 0) document.getElementById('prevBtn').addEventListener('click', prev);
  document.querySelectorAll('.option').forEach((btn) => btn.addEventListener('click', () => select(btn)));
}

function select(btn) {
  const sel = state.answers[state.idx].selections;
  const id = btn.dataset.id;
  if (sel[0] === id) sel.length = 0; // 点已选项 → 取消选择
  else sel[0] = id;                   // 单选：换成这一项
  renderScenario();
}

function selectFollowUp(btn) {
  state.answers[state.idx].followUp = btn.dataset.id;
  renderScenario();
}

function next() {
  const q = state.questions[state.idx];
  if (q.followUp && !state.inFollowUp) {
    state.inFollowUp = true;
    renderScenario();
    return;
  }
  state.inFollowUp = false;
  if (state.idx + 1 < state.questions.length) {
    state.idx++;
    renderScenario();
  } else {
    finish();
  }
}

function prev() {
  if (state.inFollowUp) {
    state.inFollowUp = false;
    renderScenario();
    return;
  }
  if (state.idx > 0) {
    state.idx--;
    renderScenario();
  }
}

async function finish() {
  document.getElementById('scenario').innerHTML = '<div class="scenario-card"><p class="lead">正在计算结果……</p></div>';
  const url = '/api/tests/' + state.test.id + '/results';
  const body = JSON.stringify({ answers: state.answers, submissionId: state.submissionId });
  let lastErr = null;

  // 提交最多重试 3 次：网络断了 / 响应丢了（fail to fetch、超时）就重试；
  // 服务端已算好的情况由 submissionId 幂等兜底，重试不会产生重复记录。
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const data = await api(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      }, 60000);
      state.result = data;
      renderResults(data);
      return;
    } catch (e) {
      lastErr = e;
      const retriable = e.name === 'AbortError' || /failed to fetch|networkerror|load failed/i.test(String(e.message || ''));
      if (!retriable || attempt === 3) break;
      document.getElementById('scenario').innerHTML =
        '<div class="scenario-card"><p class="lead">网络不太稳，正在重试（第 ' + attempt + ' 次）……</p></div>';
      await new Promise((r) => setTimeout(r, 1500 * attempt));
    }
  }

  const msg = (lastErr && lastErr.message) ? lastErr.message : '';
  document.getElementById('scenario').innerHTML =
    '<div class="scenario-card">' +
      '<p class="lead">计算出错了</p>' +
      '<p class="empty">' + msg + '</p>' +
      '<p class="empty">别担心：结果多半已经保存了。</p>' +
      '<div class="quiz-nav">' +
        '<button id="retrySubmitBtn" class="primary">再试一次</button>' +
        '<button id="gotoHistoryBtn" class="ghost">查看历史记录</button>' +
      '</div>' +
    '</div>';
  document.getElementById('retrySubmitBtn').addEventListener('click', finish);
  document.getElementById('gotoHistoryBtn').addEventListener('click', openHistory);
}

// —— 结果 ——
function renderResults(data) {
  show('results');
  const t = data.test;
  document.getElementById('wordmark').textContent = t.wordmark || t.title;
  const rb = document.getElementById('restartBtn');
  if (state.fromHistory) {
    rb.textContent = '返回历史';
    rb.onclick = () => openHistory();
  } else {
    rb.textContent = '再做一次';
    rb.onclick = () => openTest(state.test.id);
  }
  const m = data.match;
  const entityLabel = t.entityLabel || '';
  const radar = drawRadar(data.profile.core, m ? m.profile : null, t);

  // 音乐风格专属：结果带 gradient 时，顶部渲染渐变 Hero（emoji + 你是X + 契合分）
  const heroSp = splitName(m && m.name);
  const heroHtml = (m && m.gradient)
    ? '<div class="hero" style="background:' + m.gradient + '">' +
        (heroSp.emoji ? '<div class="hero-emoji">' + heroSp.emoji + '</div>' : '') +
        '<div class="hero-label">' + (t.heroKicker || '你是') + '</div>' +
        '<div class="hero-name">' + heroSp.label + '</div>' +
        '<div class="hero-score">契合 ' + m.score.toFixed(1) + '</div>' +
      '</div>'
    : '';
  const legendHtml = '<p class="legend">实线 = 你　·　虚线 = 最契合的' + entityLabel + '</p>';
  const radarHtml = t.foldRadar
    ? '<details class="radar-fold"><summary>查看你的完整图谱 ▾</summary><div class="radar-wrap">' + radar + legendHtml + '</div></details>'
    : '<div class="radar-wrap">' + radar + legendHtml + '</div>';

  // Hero 已承担主名时，match-card 不再重复显示名字（弱化重复）
  const nameHtml = heroHtml
    ? ''
    : '<h2 class="match-name">' + m.name + '<span class="match-score">契合 ' + m.score.toFixed(1) + '</span></h2>';
  // 分享卡按钮（各测试通用）
  const shareHtml = (m && m.quote)
    ? '<div class="share-wrap"><button id="shareBtn" class="primary">保存分享图</button></div>'
    : '';

  const soulHtml = (data.soul || []).map((p) => '<p>' + p + '</p>').join('');

  const rankLabel = ['最契合', '其次', '再次'];
  const familyHtml = (data.family || []).map((f, i) =>
    '<div class="family-card' + (i === 0 ? ' top' : '') + '">' +
      '<div class="family-rank">' + rankLabel[i] + '</div>' +
      '<div class="family-body">' +
        '<div class="family-name">' + f.name + '<span class="family-score">' + f.score.toFixed(1) + '</span></div>' +
        (f.meta ? '<div class="family-meta">' + f.meta + '</div>' : '') +
        '<div class="family-why">' + f.why + '</div>' +
      '</div>' +
    '</div>'
  ).join('');

  const analysisHtml = (m.analysis || []).map((a) => '<p>' + a + '</p>').join('');
  const sharedHtml = (m.sharedDna && m.sharedDna.length)
    ? '<div class="dna"><p class="dna-title">' + (t.dnaTitle || '') + '</p><div class="dna-tags">' +
      m.sharedDna.map((d) => '<span class="dna-tag">' + d + '</span>').join('') + '</div></div>'
    : '';
  const tipHtml = m.tip
    ? '<div class="says"><p class="says-label">' + (t.tipLabel || '') + '</p><p class="says-text">' + m.tip + '</p></div>'
    : '';
  const booksHtml = (data.books && data.books.length)
    ? '<div class="books"><p class="books-title">' + (t.booksTitle || '') + '</p><div class="books-list">' +
      data.books.map((b) => '<span class="book">' + b + '</span>').join('') + '</div></div>'
    : '';
  const caveatHtml = data.caveat ? '<p class="caveat">' + data.caveat + '</p>' : '';

  const breakdownHtml = t.hasDifficulty
    ? '风格 ' + m.breakdown.style.toFixed(1) + ' · 难度 ' + m.breakdown.difficulty.toFixed(1)
    : '风格 ' + m.breakdown.style.toFixed(1);

  document.getElementById('resultsBody').innerHTML = '' +
    heroHtml +
    '<p class="kicker">' + (t.resultKicker || '') + '</p>' +
    '<h1 class="type">' + data.typeLabel + '</h1>' +
    (data.topDims && data.topDims.length ? '<p class="type-sub">你最看重的是「' + data.topDims.join('」与「') + '」</p>' : '') +
    caveatHtml +
    '<div class="soul">' + soulHtml + '</div>' +
    radarHtml +
    '<div class="module-title">' + (t.familyTitle || '') + '</div>' +
    '<div class="family">' + familyHtml + '</div>' +
    '<div class="match-card">' +
      '<p class="match-kicker">最契合的' + entityLabel + '</p>' +
      nameHtml +
      (m.meta ? '<p class="match-meta">' + m.meta + '</p>' : '') +
      '<p class="match-breakdown">' + breakdownHtml + '</p>' +
      (m.desc ? '<p class="match-intro">' + m.desc + '</p>' : '') +
      (m.desc2 ? '<p class="match-works">' + m.desc2 + '</p>' : '') +
      '<div class="match-analysis">' + analysisHtml + '</div>' +
      sharedHtml +
      tipHtml +
      (m.quote ? '<blockquote class="match-quote">' + m.quote + '<cite>' + m.source + '</cite></blockquote>' : '') +
    '</div>' +
    booksHtml +
    shareHtml;
  if (m && m.quote) {
    const sb = document.getElementById('shareBtn');
    if (sb) sb.addEventListener('click', () => downloadShareCard(data));
  }
}

// —— 历史 ——
async function openHistory() {
  if (!state.test) return;
  show('history');
  document.getElementById('historyTitle').textContent = state.test.heading + ' · 历史结果';
  try {
    const list = await api('/api/tests/' + state.test.id + '/results');
    renderHistory(list);
  } catch (e) {
    document.getElementById('historyBody').innerHTML = '<p class="empty">加载历史失败：' + e.message + '</p>';
  }
}

function renderHistory(list) {
  if (!list.length) {
    document.getElementById('historyBody').innerHTML = '<p class="empty">还没有记录。先做一次测试吧。</p>';
    return;
  }
  document.getElementById('historyBody').innerHTML = list.map((r) => {
    const res = r.result || {};
    const top = res.match ? res.match.name : '';
    return '' +
      '<div class="history-card" data-id="' + r.id + '">' +
        '<div class="history-meta">' +
          '<span class="history-time">' + r.created_at + '</span>' +
          '<p class="history-matches">最契合：' + top + '</p>' +
        '</div>' +
        '<div class="history-radar">' + drawRadar(res.profile ? res.profile.core : {}, null, res.test, 132, false) + '</div>' +
        '<button class="history-del" data-id="' + r.id + '">删除</button>' +
      '</div>';
  }).join('');
  document.querySelectorAll('.history-card').forEach((c) => c.addEventListener('click', () => viewHistory(c.dataset.id)));
  document.querySelectorAll('.history-del').forEach((b) => b.addEventListener('click', (e) => { e.stopPropagation(); deleteHistory(b); }));
}

async function viewHistory(id) {
  try {
    const data = await api('/api/results/' + id);
    state.fromHistory = true;
    state.test = data.test || state.test;
    renderResults(data);
  } catch (e) {
    alert('加载这条记录失败：' + e.message);
  }
}

async function deleteHistory(btn) {
  if (!confirm('删除这条记录？')) return;
  try {
    await api('/api/results/' + btn.dataset.id, { method: 'DELETE' });
    openHistory();
  } catch (e) {
    alert('删除失败：' + e.message);
  }
}

// —— 雷达图：维度与标签来自 test.dims ——
function drawRadar(user, entity, test, size, showLabels) {
  size = size || 360;
  const dims = (test && test.dims) || [];
  const keys = dims.map((d) => d.key);
  const labelOf = Object.fromEntries(dims.map((d) => [d.key, d.label]));
  const N = keys.length;
  if (!N) return '';
  const cx = size / 2, cy = size / 2, R = size * 0.355;
  const angle = (i) => -Math.PI / 2 + (i * 2 * Math.PI) / N;
  const pt = (v, i) => {
    const r = (v / 10) * R;
    return [cx + Math.cos(angle(i)) * r, cy + Math.sin(angle(i)) * r].map((n) => Math.round(n * 10) / 10);
  };

  let s = '';
  for (const ring of [2.5, 5, 7.5, 10]) {
    const pts = keys.map((_, i) => pt(ring, i).join(',')).join(' ');
    s += '<polygon points="' + pts + '" class="ring"/>';
  }
  for (let i = 0; i < N; i++) {
    const [x, y] = pt(10, i);
    s += '<line x1="' + cx + '" y1="' + cy + '" x2="' + x + '" y2="' + y + '" class="axis"/>';
    if (showLabels !== false) {
      const [lx, ly] = pt(12.6, i);
      s += '<text x="' + lx + '" y="' + ly + '" class="label" text-anchor="middle" dominant-baseline="middle">' + (labelOf[keys[i]] || keys[i]) + '</text>';
    }
  }
  const pathOf = (obj) => 'M' + keys.map((d, i) => pt(obj && obj[d] != null ? obj[d] : 5, i).join(' ')).join(' L ') + ' Z';
  s += '<path d="' + pathOf(user) + '" class="user-poly"/>';
  if (entity) {
    s += '<path d="' + pathOf(entity) + '" class="writer-poly"/>';
  }
  return '<svg viewBox="0 0 ' + size + ' ' + size + '" class="radar' + (size < 360 ? ' radar-mini' : '') + '">' + s + '</svg>';
}

// 从实体名里拆出 emoji 与文字：动物/音乐带 emoji（🦊 狐狸），作家/角色不带（林黛玉）
function splitName(name) {
  const parts = (name || '').split(/\s+/);
  if (parts.length > 1 && /\p{Extended_Pictographic}/u.test(parts[0])) {
    return { emoji: parts[0], label: parts.slice(1).join(' ') };
  }
  return { emoji: '', label: name || '' };
}

// 文本按宽度换行，返回行数组
function wrapLines(ctx, text, maxWidth) {
  const lines = [];
  let line = '';
  for (const ch of (text || '').split('')) {
    if (line && ctx.measureText(line + ch).width > maxWidth) { lines.push(line); line = ch; }
    else line += ch;
  }
  if (line) lines.push(line);
  return lines;
}

// 圆角矩形（兼容旧浏览器，不用 ctx.roundRect）
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// 加载二维码（前端静态文件 /qr.png，后端 serve 整个 frontend/）
function loadQr() {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = '/qr.png';
  });
}

// —— 分享卡：按测试类型分发（postcard 明信片 / 通用渐变卡）——
function shareCard(data) {
  return (data.test && data.test.postcard) ? postcardCard(data) : shareCardGeneric(data);
}

// —— 分享卡（竖版，高度随内容自适应：背景 + emoji + 你是X + 气质标签 + 文学解读 + 金句 + 共振 + 二维码 + 落款）——
async function shareCardGeneric(data) {
  const m = data.match, t = data.test;
  const qr = await loadQr();
  const w = 720;
  const serif = 'Georgia, "Noto Serif SC", "Songti SC", serif';
  const mono = 'Consolas, "SFMono-Regular", monospace';

  // 先测量完整文本（不截断），算出每段行数，进而算总高度
  const mc = document.createElement('canvas').getContext('2d');
  const measure = (text, font, maxW) => { mc.font = font; return wrapLines(mc, text, maxW); };
  const { emoji, label } = splitName(m.name);
  const descLines = measure(m.desc || '', '28px ' + serif, 580);
  const quoteText = '“' + (m.quote || '').replace(/[，。；！？,.!?]$/, '') + '”';
  const quoteLines = measure(quoteText, 'italic 32px ' + serif, 540);
  const resoText = (m.analysis && m.analysis[0]) || '';
  const resoLines = resoText ? measure(resoText, '22px ' + serif, 560) : [];

  let h = 108;
  if (emoji) h += 168;
  h += 40 + 74;                  // 你是 + 名字
  if (data.typeLabel) h += 40;   // 气质标签
  h += 40;                       // 分隔线
  h += descLines.length * 42;    // 文学解读（完整）
  h += 28;                       // 间距
  h += quoteLines.length * 48;   // 金句（完整）
  h += 24;                       // 间距
  if (resoLines.length) h += resoLines.length * 32 + 18; // 共振
  h += 24 + 150 + 34 + 90;       // 间距 + 二维码 + 提示 + 底部留白
  h = Math.max(h, 860);

  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');

  // 背景：有专属渐变（音乐）用渐变，否则用主题深色
  const colors = (m.gradient && m.gradient.match(/#[0-9a-fA-F]{6}/g)) || ['#23201a', '#12110e'];
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, colors[0] || '#23201a');
  g.addColorStop(1, colors[1] || colors[0] || '#12110e');
  ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);

  ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';

  // 顶部金线
  ctx.fillStyle = 'rgba(232,187,99,.85)';
  ctx.fillRect(w / 2 - 44, 52, 88, 3);

  let y = 108;
  if (emoji) {
    ctx.font = '128px "Segoe UI Emoji", "Noto Color Emoji", serif';
    ctx.fillText(emoji, w / 2, y + 98);
    y += 168;
  }

  // "你像 / 你是 / 你属于" 由测试元信息决定（作家=你像，时代等带 heroKicker 用你属于，其余你是）
  const kicker = (t && t.entityLabel === '作家') ? '你 像'
    : (t && t.heroKicker) ? Array.from(t.heroKicker).join(' ') : '你 是';
  ctx.font = '25px ' + mono; ctx.fillStyle = 'rgba(255,255,255,.72)';
  ctx.fillText(kicker, w / 2, y + 20); y += 40;

  ctx.font = 'bold 60px ' + serif; ctx.fillStyle = '#ffffff';
  ctx.fillText(label, w / 2, y + 44); y += 74;

  if (data.typeLabel) {
    ctx.font = '21px ' + mono; ctx.fillStyle = 'rgba(232,187,99,.92)';
    ctx.fillText(data.typeLabel, w / 2, y + 14); y += 40;
  }

  ctx.fillStyle = 'rgba(255,255,255,.22)';
  ctx.fillRect(w / 2 - 130, y, 260, 1); y += 40;

  // 文学解读（完整，不截断）
  ctx.font = '28px ' + serif; ctx.fillStyle = 'rgba(255,255,255,.93)';
  for (const ln of descLines) { ctx.fillText(ln, w / 2, y + 16); y += 42; }
  y += 28;

  // 金句（完整）
  ctx.font = 'italic 32px ' + serif; ctx.fillStyle = '#e8bb63';
  for (const ln of quoteLines) { ctx.fillText(ln, w / 2, y + 16); y += 48; }
  y += 24;

  // 共振（完整）
  if (resoLines.length) {
    ctx.font = '22px ' + serif; ctx.fillStyle = 'rgba(255,255,255,.6)';
    for (const ln of resoLines) { ctx.fillText(ln, w / 2, y + 14); y += 32; }
    y += 18;
  }

  // 二维码（白底保证可扫）
  const qrBox = 150, qrPad = 18;
  const qx = w / 2 - qrBox / 2, qy = y + 24;
  ctx.fillStyle = '#ffffff';
  roundRect(ctx, qx, qy, qrBox, qrBox, 16); ctx.fill();
  if (qr) ctx.drawImage(qr, qx + qrPad, qy + qrPad, qrBox - qrPad * 2, qrBox - qrPad * 2);
  ctx.font = '21px ' + serif; ctx.fillStyle = 'rgba(255,255,255,.76)';
  ctx.fillText('扫码来测，看看你是哪一种', w / 2, qy + qrBox + 32);

  // 底部落款：品牌 + 来源
  ctx.font = '18px ' + mono; ctx.fillStyle = 'rgba(255,255,255,.5)';
  ctx.fillText((t.wordmark || t.title || '') + (m.source ? ' · ' + m.source : ''), w / 2, h - 46);

  return canvas;
}

// 纸纹噪点：一张小尺寸随机颗粒图，缩放铺满后形成羊皮纸 / 老照片颗粒感
function makeNoise(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const cx = c.getContext('2d');
  const img = cx.createImageData(w, h);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = Math.floor(Math.random() * 255);
    img.data[i] = v; img.data[i + 1] = v; img.data[i + 2] = v; img.data[i + 3] = 255;
  }
  cx.putImageData(img, 0, 0);
  return c;
}

// 时代印章：圆形印戳（时代字 + 双细环，朱红），像盖在明信片上的戳记
function drawSeal(ctx, cx, cy, r, text, serif) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(-Math.PI / 30);
  ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(178,48,40,.92)';
  ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.stroke();
  ctx.lineWidth = 1.5; ctx.strokeStyle = 'rgba(178,48,40,.7)';
  ctx.beginPath(); ctx.arc(0, 0, r - 11, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = 'rgba(178,48,40,.95)';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  const chars = Array.from(text || '');
  if (chars.length >= 4) {
    // 2×2 竖排，像篆刻印文
    ctx.font = 'bold 26px ' + serif;
    ctx.fillText(chars[0], -14, -14);
    ctx.fillText(chars[1], 14, -14);
    ctx.fillText(chars[2], -14, 14);
    ctx.fillText(chars[3], 14, 14);
  } else {
    ctx.font = 'bold 28px ' + serif;
    ctx.fillText(text || '', 0, 3);
  }
  ctx.restore();
}

// —— 复古时代明信片分享卡（时代包专属，P0）：时代渐变 + 纸纹 + 双线边框 + 大 emoji/时代名 + 金句 + 年代落款 + 印章 ——
async function postcardCard(data) {
  const m = data.match, t = data.test;
  const qr = await loadQr();
  const w = 720;
  const serif = 'Georgia, "Noto Serif SC", "Songti SC", serif';
  const mono = 'Consolas, "SFMono-Regular", monospace';

  // 先测量完整文本，算出每段行数，进而算总高度
  const mc = document.createElement('canvas').getContext('2d');
  const measure = (text, font, maxW) => { mc.font = font; return wrapLines(mc, text, maxW); };
  const { emoji, label } = splitName(m.name);
  const quoteText = '“' + (m.quote || '').replace(/[，。；！？,.!?]$/, '') + '”';
  const quoteLines = measure(quoteText, 'italic 40px ' + serif, 540);
  const descLines = measure(m.desc || '', '26px ' + serif, 600);

  const h = Math.max(1110,
    150 + (emoji ? 140 : 0) + 46 + 100 + 30 +
    quoteLines.length * 54 + 22 + 44 +
    descLines.length * 40 + 40 +
    150 + 34 + 90); // 二维码 + 提示间距 + 底部"年代·地点"落款区
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');

  // 背景：时代专属渐变
  const colors = (m.gradient && m.gradient.match(/#[0-9a-fA-F]{6}/g)) || ['#3a2a1a', '#120d08'];
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, colors[0] || '#3a2a1a');
  g.addColorStop(1, colors[1] || colors[0] || '#120d08');
  ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);

  // 纸纹噪点（羊皮纸 / 老照片颗粒）
  const noise = makeNoise(180, 270);
  ctx.save(); ctx.globalAlpha = 0.07; ctx.drawImage(noise, 0, 0, w, h); ctx.restore();

  // 双线边框（明信片边）
  ctx.strokeStyle = 'rgba(232,187,99,.8)'; ctx.lineWidth = 3;
  ctx.strokeRect(26, 26, w - 52, h - 52);
  ctx.strokeStyle = 'rgba(232,187,99,.3)'; ctx.lineWidth = 1;
  ctx.strokeRect(42, 42, w - 84, h - 84);

  ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';

  // 时代印章（右上角，像邮票的位置）
  drawSeal(ctx, w - 118, 96, 46, m.seal || '', serif);

  // 顶部金线
  ctx.fillStyle = 'rgba(232,187,99,.85)';
  ctx.fillRect(w / 2 - 44, 64, 88, 3);

  let y = 150;
  if (emoji) {
    ctx.font = '120px "Segoe UI Emoji", "Noto Color Emoji", serif';
    ctx.fillText(emoji, w / 2, y + 80);
    y += 140;
  }

  ctx.font = '24px ' + mono; ctx.fillStyle = 'rgba(232,187,99,.92)';
  const kicker = (t && t.heroKicker) ? Array.from(t.heroKicker).join(' ') : '你 属 于';
  ctx.fillText(kicker, w / 2, y + 16); y += 46;

  // 时代名：衬线 + 描边（明信片上的主标题）
  ctx.font = 'bold 64px ' + serif;
  ctx.lineWidth = 5; ctx.lineJoin = 'round';
  ctx.strokeStyle = 'rgba(0,0,0,.55)';
  ctx.strokeText(label, w / 2, y + 48);
  ctx.fillStyle = '#f5ead2';
  ctx.fillText(label, w / 2, y + 48);
  y += 100;

  // 时代金句（中心位，金色，明信片的魂）
  ctx.font = 'italic 40px ' + serif; ctx.fillStyle = '#e8bb63';
  for (const ln of quoteLines) { ctx.fillText(ln, w / 2, y + 22); y += 54; }
  y += 22;

  // 分隔线
  ctx.fillStyle = 'rgba(232,187,99,.4)';
  ctx.fillRect(w / 2 - 120, y, 240, 1); y += 44;

  // 文学解读
  ctx.font = '26px ' + serif; ctx.fillStyle = 'rgba(255,255,255,.93)';
  for (const ln of descLines) { ctx.fillText(ln, w / 2, y + 16); y += 40; }
  y += 40;

  // 二维码（白底保证可扫）
  const qrBox = 150, qrPad = 18;
  const qx = w / 2 - qrBox / 2, qy = y;
  ctx.fillStyle = '#ffffff';
  roundRect(ctx, qx, qy, qrBox, qrBox, 16); ctx.fill();
  if (qr) ctx.drawImage(qr, qx + qrPad, qy + qrPad, qrBox - qrPad * 2, qrBox - qrPad * 2);
  ctx.font = '20px ' + serif; ctx.fillStyle = 'rgba(255,255,255,.72)';
  ctx.fillText('扫码来测，看看你属于哪个时代', w / 2, qy + qrBox + 30);

  // 年代 · 地点 落款（明信片底部的说明行，也是最后一行）
  ctx.font = '22px ' + mono; ctx.fillStyle = 'rgba(232,187,99,.92)';
  ctx.fillText(m.source || '', w / 2, h - 56);

  return canvas;
}

function downloadShareCard(data) {
  shareCard(data).then((canvas) => {
    canvas.toBlob((blob) => {
      if (!blob) return;
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = (splitName(data.match && data.match.name).label || 'result') + '.png';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(a.href);
    });
  });
}

init();
