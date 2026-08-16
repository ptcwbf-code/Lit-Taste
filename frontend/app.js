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
      '<div class="catalog-card-head">' +
        '<span class="catalog-badge">' + (t.metaBadge || '测试') + '</span>' +
        '<span class="catalog-count">' + t.questionCount + ' 题 · ' + t.entityCount + ' 个候选</span>' +
      '</div>' +
      '<h2 class="catalog-title">' + t.heading + '</h2>' +
      '<p class="catalog-lead">' + t.lead + '</p>' +
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
        '<div class="hero-label">你是</div>' +
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
    if (sb) sb.addEventListener('click', () => downloadShareCard(m, t));
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

// —— 分享卡（各测试通用：背景 + emoji + 你是X + 金句 + 落款 合成竖版 PNG）——
function shareCard(m, t) {
  const w = 720, h = 1080;
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');

  // 背景：有专属渐变（音乐）用渐变，否则用主题深色
  const colors = (m.gradient && m.gradient.match(/#[0-9a-fA-F]{6}/g)) || ['#2a2620', '#16171a'];
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, colors[0] || '#2a2620');
  g.addColorStop(1, colors[1] || colors[0] || '#16171a');
  ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);

  const { emoji, label } = splitName(m.name);
  ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';

  let y = 300;
  if (emoji) {
    ctx.font = '180px "Segoe UI Emoji", "Noto Color Emoji", serif';
    ctx.fillText(emoji, w / 2, y + 60);
    y += 180;
  }

  ctx.font = '34px Georgia, "Noto Serif SC", serif';
  ctx.fillStyle = 'rgba(255,255,255,.82)';
  ctx.fillText((t && t.entityLabel === '作家') ? '你 像' : '你 是', w / 2, y + 50);

  ctx.font = 'bold 72px Georgia, "Noto Serif SC", serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(label, w / 2, y + 150);

  // 金句：按宽度简单换行
  ctx.font = '38px Georgia, "Noto Serif SC", serif';
  ctx.fillStyle = 'rgba(255,255,255,.95)';
  const quote = (m.quote || '').replace(/[，。；！？,.!?]/g, '').slice(0, 24);
  const perLine = 9, lines = [];
  for (let i = 0; i < quote.length; i += perLine) lines.push(quote.slice(i, i + perLine));
  lines.forEach((ln, i) => ctx.fillText(ln, w / 2, y + 290 + i * 66));

  // 落款：source（英文名 / 物种 / 出处）优先，否则用测试标题
  ctx.font = '26px Georgia, "Noto Serif SC", serif';
  ctx.fillStyle = 'rgba(255,255,255,.62)';
  ctx.fillText(m.source || t.title || '', w / 2, h - 96);

  return canvas;
}

function downloadShareCard(m, t) {
  const canvas = shareCard(m, t);
  canvas.toBlob((blob) => {
    if (!blob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = ((m.name && m.name.replace(/^\S+\s*/, '')) || 'result') + '.png';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(a.href);
  });
}

init();
