// scoring.js —— 通用计分与匹配引擎（纯函数，无副作用）。
//
// 引擎不关心"是什么测试"：维度、隐藏维、权重、缩放、阈值、文案全部来自 test 定义
// （tests/<id>/test.js）。每一个测试的内容包决定了它测什么、怎么匹配、结果页说什么话。
//
// 引擎只保留两件通用机制：
//   1. 计分：把用户的选择累加进各维，按"该维被吃到的信号比例"归一化到 0~10，
//      并做"无偏好检测"（回避过多 → 向中性收缩）。
//   2. 匹配：中心化余弦相似度（可选对比增强）排名实体，再叠加可选的"难度契合"分量。
//
// 引擎支持两种计分模式（由 test.config.mode 决定，默认 'profile' 雷达匹配型）：
//   'profile'  —— N 维余弦相似度 → 排名实体（当前文学口味、未来的文学角色/历史人物/动物都用它）
//   'classify' —— 每个答案往若干"类型"累加，取最高者（MBTI / 四学院 / 五行 这类，预留）
// 本文件当前完整实现 'profile'；'classify' 的入口留好，等做分类型测试时再填。

function clamp(x, a, b) { return Math.max(a, Math.min(b, x)); }
function r1(x) { return Math.round(x * 10) / 10; }

// —— 从 test 定义里取"形状"的辅助函数 ——
const dimKeys = (t) => t.dims.map((d) => d.key);
const hiddenKeys = (t) => (t.hidden || []).map((d) => d.key);
const dimLabel = (t, k) => { const d = t.dims.find((x) => x.key === k); return d ? d.label : k; };
const dimAdj = (t, k) => { const d = t.dims.find((x) => x.key === k); return d ? d.adj : k; };
const cfg = (t) => t.config || {};

// 实体难度（进入门槛）：由 config.difficulty 指定用哪两维合成。
// 例如文学口味 = (form + (10 - readability)) / 2 —— 形式难度 + 慢重程度 的平均。
function difficultyOf(entity, test) {
  const d = cfg(test).difficulty;
  if (!d) return null;
  return (entity[d.hardDim] + (10 - entity[d.slowDim])) / 2;
}

// 用户难度耐受：由 config.difficulty 指定用哪个隐藏维（+ 可选 patience）合成。
function toleranceOf(profile, test) {
  const d = cfg(test).difficulty;
  if (!d) return null;
  let tol = profile.hidden && profile.hidden[d.tolHidden] != null ? profile.hidden[d.tolHidden] : 5;
  if (d.tolPatience) tol = (tol + (profile.patience || 5)) / 2;
  return tol;
}

// 计分：把用户的选择累加进各维，按"该维被吃到的信号比例"归一化。
//   core[d] / availSum[d] ∈ [0,1]，线性映射到 5~10（coreScale）。
//   availSum[d] = 被抽到的题里该维所有选项系数之和（满分基准）——
//   这样"你在该维的机会里选了多少次"决定分数，与做了多少题无关（16 题/48 题同尺度）。
//   未触及的维度保持中性 5；吃满全部机会 → 10（罕见）。
function computeProfile(answers, test) {
  const dims = dimKeys(test);
  const hidden = hiddenKeys(test);
  const c = cfg(test);
  const byId = new Map(test.questions.map((q) => [q.id, q]));

  const core = Object.fromEntries(dims.map((d) => [d, 0]));
  const availSum = Object.fromEntries(dims.map((d) => [d, 0]));
  const hiddenAcc = Object.fromEntries(hidden.map((d) => [d, 0]));
  const hiddenCount = Object.fromEntries(hidden.map((d) => [d, 0]));
  let patienceSum = 0, patienceCount = 0;
  let avoidCount = 0, avoidAvailable = 0;

  const apply = (opt) => {
    if (!opt) return; // 无效选择直接跳过，而不是终止整个循环
    if (opt.avoid) avoidCount++;
    for (const d of dims) { const v = opt.vector && opt.vector[d]; if (v) core[d] += v; }
    for (const d of hidden) { const v = opt.hidden && opt.hidden[d]; if (v) { hiddenAcc[d] += v; hiddenCount[d]++; } }
    if (typeof opt.patience === 'number') { patienceSum += opt.patience; patienceCount++; }
  };

  for (const a of answers) {
    const q = byId.get(a.questionId);
    if (!q) continue;
    if (q.options.some((o) => o.avoid)) avoidAvailable++;
    if (q.followUp && q.followUp.options.some((o) => o.avoid)) avoidAvailable++;
    // 累加"可及信号"：抽到这一题，该题所有选项的向量系数都算作对应维的满分基准（无论用户选没选）。
    for (const o of q.options) for (const d of dims) { const v = o.vector && o.vector[d]; if (v) availSum[d] += v; }
    if (q.followUp) for (const o of q.followUp.options) for (const d of dims) { const v = o.vector && o.vector[d]; if (v) availSum[d] += v; }
    // 每题单选：只取 selections 的第 1 项（前端只允许选一项；即便传入多项也仅计第一项）。
    (a.selections || []).slice(0, 1).forEach((sel) => apply(q.options.find((o) => o.id === sel)));
    if (q.followUp && a.followUp) apply(q.followUp.options.find((o) => o.id === a.followUp));
  }

  const coreNorm = Object.fromEntries(dims.map((d) => [d, r1(clamp(5 + (availSum[d] ? core[d] / availSum[d] : 0) * c.coreScale, 0, 10))]));
  const hiddenNorm = Object.fromEntries(hidden.map((d) => [d, r1(clamp(5 + (hiddenCount[d] ? hiddenAcc[d] / hiddenCount[d] : 0) * c.hiddenScale, 0, 10))]));
  const patience = patienceCount ? r1(patienceSum / patienceCount) : 5;
  const avoidRatio = avoidAvailable ? avoidCount / avoidAvailable : 0;

  // 无偏好检测：回避比例过高 → 核心维向中性(5)收缩，避免"没偏好"被喂成"全能高分"。
  let coreFinal = coreNorm;
  if (avoidRatio >= c.avoidThreshold) {
    const shrink = clamp((avoidRatio - c.avoidThreshold) / (1 - c.avoidThreshold), 0, 1);
    for (const d of dims) coreFinal[d] = r1(5 + (coreNorm[d] - 5) * (1 - shrink));
  }

  return { core: coreFinal, hidden: hiddenNorm, patience, avoidRatio };
}

// 余弦相似度：对 N 维做中心化（减 5），比较"口味的形状"而非绝对高低。
function cosine(u, w, dims) {
  let dot = 0, nu = 0, nw = 0;
  for (const d of dims) {
    const a = u[d] - 5, b = w[d] - 5;
    dot += a * b; nu += a * a; nw += b * b;
  }
  if (!nu || !nw) return 0;
  return dot / Math.sqrt(nu * nw);
}

// 匹配：两个互相独立的分量。
//   S10 风格契合 = 中心化余弦相似度（可选 ENHANCE_K 对比增强），映射到 0-10
//   D10 难度契合 = 实体难度与用户耐受的差距（仅当 config.difficulty 存在且权重 > 0）
function matchEntities(profile, test) {
  const c = cfg(test);
  const dims = dimKeys(test);

  // 用户侧对比增强：把画像相对自身均值放大，使"温和偏好"显现形状、真·全能用户诚实归为无形状。
  // 只用于 S10 的 cosine；allRounder/flatProfile/peakDim/maxGap 判断、文案与雷达图仍用原始 profile.core。
  const mean = dims.reduce((s, d) => s + profile.core[d], 0) / dims.length;
  const enhanceCore = Object.fromEntries(dims.map((d) => [d, clamp(5 + (profile.core[d] - mean) * c.enhanceK, 0, 10)]));

  const weakSignal = (typeof profile.avoidRatio === 'number' && profile.avoidRatio >= c.avoidThreshold)
    ? '你较多地选择了"回避 / 绕开"的选项，口味信号偏弱，画像已向中性收敛，这份推荐仅供参考。'
    : null;

  const coreVals = dims.map((d) => profile.core[d]);
  const flatProfile = Math.max(...coreVals) - Math.min(...coreVals) < c.flatThreshold;
  const highCount = coreVals.filter((v) => v >= c.allRounderHigh).length;
  const allRounder = highCount >= c.allRounderMinCount && coreVals.every((v) => v >= c.allRounderFloor);
  const peakDim = dims.reduce((a, d) => (profile.core[d] > profile.core[a] ? d : a), dims[0]);
  const sortedVals = coreVals.slice().sort((a, b) => b - a);
  const maxGap = sortedVals[0] - sortedVals[1];

  const useDifficulty = !!(c.difficulty && c.weights.difficulty > 0);

  const scored = test.entities.map((w, i) => {
    const S10 = r1(((cosine(enhanceCore, w, dims) + 1) / 2) * 10);
    const D10 = useDifficulty ? r1(10 - Math.min(10, Math.abs(difficultyOf(w, test) - toleranceOf(profile, test)))) : 10;
    const final = r1(c.weights.style * S10 + (useDifficulty ? c.weights.difficulty * D10 : 0));
    return { w, i, S10, D10, final };
  });
  // 并列时用实体在数组里的位置作确定性次级排序，避免同分"随机抓一个"。
  scored.sort((a, b) => (b.final - a.final) || (a.i - b.i));

  const top = {
    name: scored[0].w.name,
    match: scored[0].final,
    profile: Object.fromEntries(dims.map((d) => [d, scored[0].w[d]])),
    breakdown: { style: scored[0].S10, difficulty: scored[0].D10 },
  };
  const also = scored.slice(1, 6).map((s) => ({
    name: s.w.name, match: s.final,
    tag: labelRunner(profile, s.w, test),
  }));
  // "家族"：前 3 名，每位带一句"为什么契合"，用于结果页的同伴卡。
  const family = scored.slice(0, 3).map((s) => ({
    name: s.w.name, match: s.final,
    why: whyLine(profile, s.w, test),
  }));

  // 低信号提示：按严重度排序——回避过多（收缩）> 全能高分/疑似随机 > 画像平坦。
  const caveat = weakSignal
    || (allRounder
      ? (profile.core[peakDim] >= c.peakMin && maxGap >= c.maxGap
        ? '你的口味覆盖面很广，但在「' + dimLabel(test, peakDim) + '」上最突出，推荐侧重于此。'
        : '你几乎对所有风格都来电，这份推荐仅供参考。')
      : (flatProfile ? '你的口味信号比较均衡（各维度接近），这份推荐仅供参考。' : null));

  return { top, also, family, caveat };
}

// 给"仅次于"的实体打标签：当实体难度明显高于用户耐受时，标"挑战"。
function labelRunner(profile, entity, test) {
  const c = cfg(test);
  if (!c.difficulty || !c.challengeGap) return '';
  const d = difficultyOf(entity, test);
  const tol = toleranceOf(profile, test);
  if (d - tol < c.challengeGap) return '';
  const hard = entity[c.difficulty.hardDim];
  const slow = 10 - entity[c.difficulty.slowDim];
  const challenge = (test.copy && test.copy.challenge) || {};
  if (hard >= slow) return challenge.hard || '';
  return challenge.slow || '';
}

function describeProfile(profile, test) {
  const dims = dimKeys(test);
  const ranked = dims.slice().sort((a, b) => profile.core[b] - profile.core[a]);
  const top = ranked.slice(0, 2);
  const low = ranked[ranked.length - 1];
  const typeLabel = top.map((d) => dimAdj(test, d)).join(' × ');
  const pl = (test.copy && test.copy.profileLines) || {};
  const lines = [];
  lines.push('你最看重的是「' + top.map((d) => dimLabel(test, d)).join('」与「') + '」。');
  lines.push('相对而言，你较少被「' + dimLabel(test, low) + '」吸引。');
  for (const hd of (test.hidden || [])) {
    const v = profile.hidden && profile.hidden[hd.key];
    if (v == null) continue;
    if (v < 4 && pl[hd.key + 'Low']) lines.push(pl[hd.key + 'Low']);
    else if (v > 7 && pl[hd.key + 'High']) lines.push(pl[hd.key + 'High']);
  }
  if (profile.patience >= 7 && pl.patienceHigh) lines.push(pl.patienceHigh);
  else if (profile.patience <= 4 && pl.patienceLow) lines.push(pl.patienceLow);
  return { typeLabel, topDims: top.map((d) => dimLabel(test, d)), lowLabel: dimLabel(test, low), lines };
}

// 灵魂分析：把各维（高 2 维 + 最低维 + 隐藏 + 耐心）拼装成面对"你"的解读段落。
function describeSoul(profile, test) {
  const dims = dimKeys(test);
  const soul = (test.copy && test.copy.soul) || {};
  const ranked = dims.slice().sort((a, b) => profile.core[b] - profile.core[a]);
  const top2 = ranked.slice(0, 2);
  const low = ranked[ranked.length - 1];
  const paras = [];
  for (const d of top2) if (soul[d] && soul[d].high) paras.push(soul[d].high);
  if (profile.core[low] < 5.5 && soul[low] && soul[low].low) paras.push(soul[low].low);
  for (const hd of (test.hidden || [])) {
    const v = profile.hidden && profile.hidden[hd.key];
    if (v == null || !soul[hd.key]) continue;
    if (v >= 6.5) paras.push(soul[hd.key].high);
    else if (v <= 3.5) paras.push(soul[hd.key].low);
  }
  if (profile.patience >= 7 && soul.patience && soul.patience.high) paras.push(soul.patience.high);
  else if (profile.patience <= 4 && soul.patience && soul.patience.low) paras.push(soul.patience.low);
  return paras;
}

// 给"家族"里的每位实体写一句"为什么你们契合"。
function whyLine(profile, entity, test) {
  const dims = dimKeys(test);
  const ranked = dims.slice().sort((a, b) => profile.core[b] - profile.core[a]);
  const shared = ranked.filter((d) => entity[d] >= 7).slice(0, 2);
  if (shared.length) return '你们在「' + shared.map((d) => dimLabel(test, d)).join('」与「') + '」上同频。';
  return '一种说不清、但很对的气味。';
}

// 实体指代：按名字区分 她 / 他 / 他们 / 它（默认取 test.pronouns.defaultSubj）。
function pronounsFor(name, test) {
  const p = test.pronouns || {};
  if (p.group && p.group.includes(name)) return { subj: '他们', poss: '他们的' };
  if (p.female && p.female.includes(name)) return { subj: '她', poss: '她的' };
  return { subj: p.defaultSubj || '他', poss: p.defaultPoss || '他的' };
}

function describeMatch(profile, entity, name, test) {
  const p = pronounsFor(name, test);
  const dims = dimKeys(test);
  const rankedUser = dims.slice().sort((a, b) => profile.core[b] - profile.core[a]);
  const topUser = rankedUser.slice(0, 2);
  const rankedEntity = dims.slice().sort((a, b) => entity[b] - entity[a]);
  const topEntity = rankedEntity.slice(0, 2);
  const lines = [];
  const shared = topUser.filter((d) => entity[d] >= 7);
  if (shared.length) {
    lines.push('你们在「' + shared.map((d) => dimLabel(test, d)).join('」与「') + '」上高度共振——这是你最看重、也恰是' + p.subj + '最擅长的部分。');
  } else {
    lines.push('你偏好的「' + topUser.map((d) => dimLabel(test, d)).join('」与「') + '」，' + p.subj + '用自己的方式回应了它。');
  }
  // "最突出的是什么"的用词随实体类型而变：作家是"作品"，角色/动物是"身上"（由 test.copy.matchNoun 指定）。
  const matchNoun = (test.copy && test.copy.matchNoun) || '作品';
  lines.push(p.poss + matchNoun + '最突出的是「' + topEntity.map((d) => dimLabel(test, d)).join('」与「') + '」。');
  const diff = cfg(test).difficulty;
  if (diff) {
    const hard = entity[diff.hardDim];
    const slow = entity[diff.slowDim];
    if (hard >= 8 || slow <= 3) {
      lines.push('需要提醒：' + p.poss + '文字并不好读，若你偏好顺畅，可以从代表作慢慢入手。');
    } else if (slow >= 8) {
      lines.push(p.poss + '文字容易进入，很适合作为沉浸阅读的起点。');
    }
  }
  const sharedDna = shared.map((d) => dimLabel(test, d));
  const readingTip = (test.copy && test.copy.readingTips && test.copy.readingTips[rankedEntity[0]]) || '';
  return { lines, sharedDna, readingTip };
}

module.exports = {
  computeProfile, matchEntities,
  describeProfile, describeSoul, describeMatch,
  whyLine, labelRunner,
  dimKeys, hiddenKeys, dimLabel, dimAdj,
};
