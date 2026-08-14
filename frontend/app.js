// 前端：纯 HTML + CSS + Vanilla JavaScript。
// 只负责两件事：把题目画出来、把结果画出来。算分和匹配都在后端。
const state = { questions: [], idx: 0, answers: [], result: null, count: 24, fromHistory: false, inFollowUp: false };

// 统一的 fetch 封装：非 2xx 时抛出带错误信息的异常，避免静默失败
async function api(url, options) {
  const res = await fetch(url, options);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || ('请求失败 (' + res.status + ')'));
  return data;
}

const DIM_ORDER = ['narrative', 'lyric', 'psychology', 'imagination', 'society', 'philosophy', 'form', 'readability', 'humor', 'desire'];
const DIM_LABELS = { narrative: '叙事', lyric: '抒情', psychology: '心理', imagination: '想象', society: '社会', philosophy: '哲思', form: '形式', readability: '轻快', humor: '幽默', desire: '欲望' };

async function init() {
  document.getElementById('startBtn').addEventListener('click', startQuiz);
  document.getElementById('historyBtn').addEventListener('click', openHistory);
  document.getElementById('backBtn').addEventListener('click', () => show('intro'));
  document.querySelectorAll('.mode').forEach((btn) => btn.addEventListener('click', () => selectMode(btn)));
}

function selectMode(btn) {
  document.querySelectorAll('.mode').forEach((b) => b.classList.remove('selected'));
  btn.classList.add('selected');
  state.count = Number(btn.dataset.count);
}

function show(id) {
  for (const s of ['intro', 'quiz', 'results', 'history']) {
    document.getElementById(s).classList.toggle('hidden', s !== id);
  }
  window.scrollTo(0, 0);
}

async function startQuiz() {
  try {
    const qs = await api('/api/questions?count=' + state.count);
    state.questions = qs;
    state.idx = 0;
    state.answers = [];
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
    const rank = sel.indexOf(o.id); // -1 未选；0 = 第 1 项；1 = 第 2 项
    const key = rank >= 0 ? (rank + 1) : o.id; // 选中的显示排名序号，未选的显示选项字母
    return '<button class="option' + (rank >= 0 ? ' selected' : '') + '" data-id="' + o.id + '"><span class="opt-key">' + key + '</span>' + o.text + '</button>';
  }).join('');

  document.getElementById('scenario').innerHTML = '' +
    '<div class="scenario-card">' +
      (q.context ? '<p class="scenario-bg' + (q.format === 'reaction' ? ' quote' : '') + '">' + q.context + '</p>' : '') +
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
  const i = sel.indexOf(id);
  if (i >= 0) sel.splice(i, 1);          // 已选中 → 再点取消（第 2 项会自动升为第 1 项）
  else if (sel.length < 2) sel.push(id); // 未满两项 → 按点击顺序加入（第 1 / 第 2）
  else sel[1] = id;                       // 已满两项 → 替换第 2 项
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
  document.getElementById('scenario').innerHTML = '<div class="scenario-card"><p class="lead">正在计算你的阅读口味……</p></div>';
  try {
    const data = await api('/api/results', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers: state.answers }),
    });
    state.result = data;
    renderResults(data);
  } catch (e) {
    document.getElementById('scenario').innerHTML = '<div class="scenario-card"><p class="lead">计算出错了</p><p class="empty">' + e.message + '。请刷新页面重试。</p></div>';
  }
}

function renderResults(data) {
  show('results');
  const rb = document.getElementById('restartBtn');
  if (state.fromHistory) {
    rb.textContent = '返回历史';
    rb.onclick = () => openHistory();
  } else {
    rb.textContent = '再做一次';
    rb.onclick = () => location.reload();
  }
  const m = data.match;
  const radar = drawRadar(data.profile.core, m ? m.profile : null);

  const soulHtml = (data.soul || []).map((p) => '<p>' + p + '</p>').join('');

  const rankLabel = ['最契合', '其次', '再次'];
  const familyHtml = (data.family || []).map((f, i) =>
    '<div class="family-card' + (i === 0 ? ' top' : '') + '">' +
      '<div class="family-rank">' + rankLabel[i] + '</div>' +
      '<div class="family-body">' +
        '<div class="family-name">' + f.name + '<span class="family-score">' + f.match.toFixed(1) + '</span></div>' +
        '<div class="family-meta">' + f.region_era + ' · ' + f.works + '</div>' +
        '<div class="family-why">' + f.why + '</div>' +
      '</div>' +
    '</div>'
  ).join('');

  const analysisHtml = (m.analysis || []).map((a) => '<p>' + a + '</p>').join('');

  const sharedHtml = (m.sharedDna && m.sharedDna.length)
    ? '<div class="dna"><p class="dna-title">你们共享的文学 DNA</p><div class="dna-tags">' +
      m.sharedDna.map((d) => '<span class="dna-tag">' + d + '</span>').join('') + '</div></div>'
    : '';

  const readingTipHtml = m.readingTip
    ? '<div class="says"><p class="says-label">阅读提示</p><p class="says-text">' + m.readingTip + '</p></div>'
    : '';

  const booksHtml = (data.books && data.books.length)
    ? '<div class="books"><p class="books-title">为你推荐的书</p><div class="books-list">' +
      data.books.map((b) => '<span class="book">' + b + '</span>').join('') + '</div></div>'
    : '';

  const caveatHtml = data.caveat ? '<p class="caveat">' + data.caveat + '</p>' : '';

  document.getElementById('resultsBody').innerHTML = '' +
    '<p class="kicker">你的文学口味</p>' +
    '<h1 class="type">' + data.readingType + '</h1>' +
    (data.topDims && data.topDims.length ? '<p class="type-sub">你最看重的是「' + data.topDims.join('」与「') + '」</p>' : '') +
    caveatHtml +
    '<div class="soul">' + soulHtml + '</div>' +
    '<div class="radar-wrap">' + radar + '<p class="legend">实线 = 你　·　虚线 = 最契合的作家</p></div>' +
    '<div class="module-title">你的文学家族</div>' +
    '<div class="family">' + familyHtml + '</div>' +
    '<div class="match-card">' +
      '<p class="match-kicker">最契合的作家</p>' +
      '<h2 class="match-name">' + m.name + '<span class="match-score">契合 ' + m.match.toFixed(1) + '</span></h2>' +
      '<p class="match-meta">' + m.region_era + ' · ' + m.works + '</p>' +
      '<p class="match-breakdown">风格 ' + m.breakdown.style.toFixed(1) + ' · 难度 ' + m.breakdown.difficulty.toFixed(1) + '</p>' +
      (m.intro ? '<p class="match-intro">' + m.intro + '</p>' : '') +
      (m.works_intro ? '<p class="match-works">' + m.works_intro + '</p>' : '') +
      '<div class="match-analysis">' + analysisHtml + '</div>' +
      sharedHtml +
      readingTipHtml +
      (m.quote ? '<blockquote class="match-quote">' + m.quote + '<cite>' + m.source + '</cite></blockquote>' : '') +
    '</div>' +
    booksHtml;
}

async function openHistory() {
  show('history');
  try {
    const list = await api('/api/results');
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
    const top = (r.matches.best || []).slice(0, 3).join('、');
    return '' +
      '<div class="history-card" data-id="' + r.id + '">' +
        '<div class="history-meta">' +
          '<span class="history-time">' + r.created_at + '</span>' +
          '<p class="history-matches">最契合：' + top + '</p>' +
        '</div>' +
        '<div class="history-radar">' + drawRadar(r.core, null, 132, false) + '</div>' +
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

function drawRadar(user, writer, size, showLabels) {
  size = size || 360;
  const N = DIM_ORDER.length;
  const cx = size / 2, cy = size / 2, R = size * 0.355;
  const angle = (i) => -Math.PI / 2 + (i * 2 * Math.PI) / N;
  const pt = (v, i) => {
    const r = (v / 10) * R;
    return [cx + Math.cos(angle(i)) * r, cy + Math.sin(angle(i)) * r].map((n) => Math.round(n * 10) / 10);
  };

  let s = '';
  for (const ring of [2.5, 5, 7.5, 10]) {
    const pts = DIM_ORDER.map((_, i) => pt(ring, i).join(',')).join(' ');
    s += '<polygon points="' + pts + '" class="ring"/>';
  }
  for (let i = 0; i < N; i++) {
    const [x, y] = pt(10, i);
    s += '<line x1="' + cx + '" y1="' + cy + '" x2="' + x + '" y2="' + y + '" class="axis"/>';
    if (showLabels !== false) {
      const [lx, ly] = pt(12.6, i);
      s += '<text x="' + lx + '" y="' + ly + '" class="label" text-anchor="middle" dominant-baseline="middle">' + DIM_LABELS[DIM_ORDER[i]] + '</text>';
    }
  }
  const pathOf = (obj) => 'M' + DIM_ORDER.map((d, i) => pt(obj[d] == null ? 5 : obj[d], i).join(' ')).join(' L ') + ' Z';
  s += '<path d="' + pathOf(user) + '" class="user-poly"/>';
  if (writer) {
    s += '<path d="' + pathOf(writer) + '" class="writer-poly"/>';
  }
  return '<svg viewBox="0 0 ' + size + ' ' + size + '" class="radar' + (size < 360 ? ' radar-mini' : '') + '">' + s + '</svg>';
}

init();
