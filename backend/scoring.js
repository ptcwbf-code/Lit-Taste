// scoring.js —— 计分与匹配（纯函数）。
//
// 10 核心维度（雷达图 + 余弦匹配）：
//   narrative 叙事 / lyric 抒情 / psychology 心理 / imagination 想象
//   society 社会 / philosophy 哲思 / form 形式 / readability 轻快 / humor 幽默 / desire 欲望
// 2 隐藏维度（只用于文案与"难度契合"）：
//   ambiguity 歧义容忍 / intensity 情绪强度
//
// 注：readability 已从"易读"重定义为"轻快/直接"——不再与 form 互为镜像，
// 而是独立的"节奏快、表达直、一读就进去"。幽默（第 9 维）分开纳博科夫 /
// 钱钟书 / 王小波 / 塞万提斯这批"反讽的智慧"型作家；欲望（第 10 维）分开
// 三岛由纪夫 / 张爱玲 / 福楼拜 / 纳博科夫这批"情欲 / 渴求 / 占有"型作家。

const DIMS = ['narrative', 'lyric', 'psychology', 'imagination', 'society', 'philosophy', 'form', 'readability', 'humor', 'desire'];
const HIDDEN = ['ambiguity', 'intensity'];

const DIM_LABELS = { narrative: '叙事', lyric: '抒情', psychology: '心理', imagination: '想象', society: '社会', philosophy: '哲思', form: '形式', readability: '轻快', humor: '幽默', desire: '欲望' };
const DIM_ADJ = { narrative: '情节驱动', lyric: '语言敏感', psychology: '心理洞察', imagination: '想象奔放', society: '现实关怀', philosophy: '哲思内省', form: '形式探索', readability: '轻快直接', humor: '反讽机智', desire: '欲望驱动' };
const HIDDEN_LABELS = { ambiguity: '歧义容忍', intensity: '情绪强度' };

// —— 灵魂分析文案库：把每个维度翻译成一句面对"你"的文学化解读。
// 每个维度有"高 / 低"两句，按用户实际画像拼装成若干段（原创，不照抄外部站点）。
const SOUL = {
  narrative: {
    high: '你天生想知道"然后呢"。一件事的意义，对你来说藏在它的走向里——你追的不是答案，是那根把你一路拽向结局的线。',
    low: '你不急着要结局。比起"接下来发生什么"，你更愿意停在"此刻是什么滋味"上，多待一会儿。',
  },
  lyric: {
    high: '文字对你首先是声音和质地。你会为一句句子的节奏放慢脚步——那种被语言轻轻碰一下的感觉，比情节更让你记得住。',
    low: '你不大容易被漂亮的句子带走。你要的是事情本身，不是它被说出来时的腔调。',
  },
  psychology: {
    high: '你对人心有种近乎本能的兴趣。别人看见行为，你看见行为底下的动机、犹豫，和那句没说出口的半句话。',
    low: '你不习惯在别人的内心久留。相比反复揣摩，你更愿意直接相处、直接做事。',
  },
  imagination: {
    high: '你脑子里常驻着一个不存在的世界。现实只是它的一种版本，你随时准备好切换到另一个更自由的可能。',
    low: '你更相信眼前可触可感的东西。那些飞得太远的想象，你只会礼貌地看它们一眼。',
  },
  society: {
    high: '你没法只关心自己。远处的人和事会牵动你，你总想把"我"放进一个更大的"我们"里，重新看一遍。',
    low: '你更愿意守好自己的一小片天地。宏大的时代议题，你听听就好，不一定非要走进去。',
  },
  philosophy: {
    high: '你忍不住追问"为什么"。一件事就算已经有了结果，你还是想再往下挖一层，看看底下到底藏着什么。',
    low: '你更看重手头的事，而不是悬在头顶的问题。想不明白的，你就让它先飘一会儿。',
  },
  form: {
    high: '你对"怎么讲"和"讲什么"同样在意。结构、秩序、拆解——它们本身就能让你着迷。',
    low: '你不大关心一件东西是怎么搭起来的，你在乎它好不好用、好不好读。',
  },
  readability: {
    high: '你偏爱轻快、直接、能一口气读进去的东西。节奏慢、绕来绕去的，最容易磨掉你的耐心。',
    low: '你不怕慢，也不怕绕。真正值得的东西，你愿意慢下来，一点一点啃下去。',
  },
  humor: {
    high: '你带着一种反讽的距离看世界——你常先看见事情好笑的那一面，再看见它悲哀的那一面。那种"看破不说破"的会心，比眼泪更让你记得住。',
    low: '你更愿意认真、直直地看待事情。玩笑和反讽，你不太习惯在它们中间逗留。',
  },
  desire: {
    high: '你对"想要"这件事很诚实。吸引、占有、求而不得——那些把人往下拽的渴望，是你最想读进去的暗流。',
    low: '你不太被"欲望"牵动。那些炽热、缠绕、非要不可的东西，你更愿意退后一步，看清它们。',
  },
  ambiguity: {
    high: '你能和"没有答案"这件事和平共处。开放、悬置、多重可能，对你不是负担，是余地。',
    low: '你希望事情有个明确的落点。太悬的东西会让你不安，你更想要一个能抓得住的结论。',
  },
  intensity: {
    high: '你能承受很重的情绪，甚至在里面得到某种回响。那些剧烈、残酷的东西，不会轻易把你击穿。',
    low: '你对强烈的情绪比较敏感。太苦、太烈的东西，你会本能地想往后退一步。',
  },
  patience: {
    high: '你愿意为一部作品投入很长的篇幅和耐心。熬出来的东西，你觉得更有分量。',
    low: '你更喜欢容易进入、能较快读完的东西。时间有限，你想把它花在更轻快的地方。',
  },
};

// —— 阅读提示库：按作家最突出的维度，给读者一句"怎么读 TA"的建议（原创，非作者原话）。
// 之前是"作家声音"（用 TA 的口吻对你说一句），但容易被当成作者本人的话，改为中立的阅读提示。
const READING_TIPS = {
  narrative: '跟着故事的走向走，别急着要结局——这位作家最迷人的，是那根把你一路拽向结局的线。',
  lyric: '慢一点读。这位作家有些句子不是用眼睛看的，是要用身体去接的。',
  psychology: '留意那些没说出口的半句话——这位作家最深的，都藏在人物的沉默里。',
  imagination: '先关掉你的常识再读。这位作家见过的，是比现实更真的东西。',
  society: '把"我"放进更大的"我们"里读——这位作家写的，是一整个时代和人群。',
  philosophy: '别急着要答案。读这位作家，问题本身比答案更重。',
  form: '别怕看不懂。这位作家的结构，是想让你换个入口再进来一次。',
  readability: '放轻松，一口气读进去。这位作家把话都说得很清楚。',
  humor: '留意那些笑着说出来的话——这位作家的反讽底下，藏着最冷的东西。',
  desire: '别躲开那些"想要"。这位作家写的，是人最诚实的那一部分。',
};

// —— 可调参数（说明为什么这么定）——
// 最终匹配分 = 风格契合(85%) + 难度契合(15%)。
// 风格契合是"口味像不像"的核心，占大头；难度只是门槛校正。
// 曾把"难度"拆成 difficulty(form) 与 stamina(readability) 两份，但旧版 readability
// 与 form 强负相关（r≈-0.68），等于同一个量算了两遍；现在合并成一个"难度分"、只占一份权重，
// 省下的权重还给 style。readability 重定义为"轻快/直接"后，(form + (10-readability))/2
// 仍可读作"形式难度 + 慢重程度"，D10 语义不变。
const WEIGHTS = { style: 0.85, difficulty: 0.15 };
// 核心维度归一化：按"该维被吃到的信号比例"计分 —— core[d] / available[d]（0~1），
// available[d] = 被抽到的题里该维所有选项系数之和（满分基准）。
// 这样"你在该维的机会里选了多少次"决定分数：与做了多少题无关（16 题/48 题同尺度），
// 也不会因偶发的一次选择而虚高——偶尔选一次幽默远低于"每次有机会都选"。
// 未触及的维度保持中性 5；吃满全部机会 → 10（罕见）。
const CORE_SCALE = 5;
// 隐藏维度（歧义容忍/情绪强度）仍按平均系数缩放，系数最大 ±2：±2→7.5、±1→6.25。
const HIDDEN_SCALE = 1.25;
// 无偏好检测阈值：回避类选项占比 ≥ 0.5 时，判定"信号偏弱"，核心维向中性(5)收缩。
// 分母是"出现了回避选项的题目数"，不是总题数，所以一个系统性回避的用户会接近 1.0。
const AVOID_THRESHOLD = 0.5;
// 用户侧对比增强系数：匹配前把用户画像相对其自身均值放大，让"温和偏好"显现出形状、
// 让"全平用户"诚实归为无形状。K 取 1.8（1.5~2.0 可调）：乘子过大→温和偏好被放大成尖峰，
// 可能误伤真·全能用户；过小→平用户仍被"平全能作家"（全维 6~10 无低谷）过度匹配。
// 只作用于 S10 的 cosine，不进入 allRounder/flatProfile 判断、文案或雷达图。
const ENHANCE_K = 1.8;

function clamp(x, a, b) { return Math.max(a, Math.min(b, x)); }
function r1(x) { return Math.round(x * 10) / 10; }

function computeProfile(answers, pool) {
  const byId = new Map(pool.map((q) => [q.id, q]));
  const core = Object.fromEntries(DIMS.map((d) => [d, 0]));
  const availSum = Object.fromEntries(DIMS.map((d) => [d, 0])); // 每个维在被抽到的题里"可及信号"之和（满分基准）
  const hidden = Object.fromEntries(HIDDEN.map((d) => [d, 0]));
  const hiddenCount = Object.fromEntries(HIDDEN.map((d) => [d, 0]));
  let patienceSum = 0;
  let patienceCount = 0;
  let avoidCount = 0;      // 选"回避/翻篇/绕开"类选项的次数
  let avoidAvailable = 0;  // 出现了回避类选项的题目数（分母：衡量"有机会回避时回避得多频繁"）

  // 把一个选项的向量累加进各维（主层选项与追问层选项共用这一套逻辑）。每题单选，满权重记入。
  const apply = (opt) => {
    if (!opt) return; // 无效选择直接跳过，而不是终止整个循环
    if (opt.avoid) avoidCount++;
    for (const d of DIMS) {
      const v = opt.vector && opt.vector[d];
      if (v) { core[d] += v; }
    }
    for (const d of HIDDEN) {
      const v = opt.hidden && opt.hidden[d];
      if (v) { hidden[d] += v; hiddenCount[d]++; }
    }
    if (typeof opt.patience === 'number') { patienceSum += opt.patience; patienceCount++; }
  };

  for (const a of answers) {
    const q = byId.get(a.questionId);
    if (!q) continue;
    if (q.options.some((o) => o.avoid)) avoidAvailable++;
    if (q.followUp && q.followUp.options.some((o) => o.avoid)) avoidAvailable++;
    // 累加"可及信号"：抽到这一题，该题所有选项的向量系数都算作对应维的满分基准（无论用户选没选）。
    for (const o of q.options) for (const d of DIMS) { const v = o.vector && o.vector[d]; if (v) availSum[d] += v; }
    if (q.followUp) for (const o of q.followUp.options) for (const d of DIMS) { const v = o.vector && o.vector[d]; if (v) availSum[d] += v; }
    // 每题单选：只取 selections 的第 1 项（前端只允许选一项；即便传入多项也仅计第一项）。
    (a.selections || []).slice(0, 1).forEach((sel) => {
      apply(q.options.find((o) => o.id === sel));
    });
    // 追问分支：选完第一层后再答的第二层（单选）。
    if (q.followUp && a.followUp) apply(q.followUp.options.find((o) => o.id === a.followUp));
  }

  // 按"吃到的信号比例"归一化：core[d]/availSum[d] ∈ [0,1]，线性映射到 5~10。
  // 未触及的维度保持中性 5；吃满全部机会 → 10（罕见）。
  const coreNorm = Object.fromEntries(DIMS.map((d) => [d, r1(clamp(5 + (availSum[d] ? core[d] / availSum[d] : 0) * CORE_SCALE, 0, 10))]));
  const hiddenNorm = Object.fromEntries(HIDDEN.map((d) => [d, r1(clamp(5 + (hiddenCount[d] ? hidden[d] / hiddenCount[d] : 0) * HIDDEN_SCALE, 0, 10))]));
  const patience = patienceCount ? r1(patienceSum / patienceCount) : 5;
  const avoidRatio = avoidAvailable ? avoidCount / avoidAvailable : 0;

  // 无偏好检测：回避比例过高 → 核心维向中性(5)收缩，避免"没偏好"被喂成"全能高分"。
  // 收缩发生在 computeProfile，保证雷达、匹配、入库看到的是同一个（已收缩的）画像。
  let coreFinal = coreNorm;
  if (avoidRatio >= AVOID_THRESHOLD) {
    const shrink = clamp((avoidRatio - AVOID_THRESHOLD) / (1 - AVOID_THRESHOLD), 0, 1);
    coreFinal = Object.fromEntries(DIMS.map((d) => [d, r1(5 + (coreNorm[d] - 5) * (1 - shrink))]));
  }

  return { core: coreFinal, hidden: hiddenNorm, patience, avoidRatio };
}

// 余弦相似度：对 10 维做中心化（减 5），比较"口味的形状"而非绝对高低。
// 设计取舍：这会让"所有维度都无感"（全 5）的用户恒得到 S=5，
// 因为中心化丢掉了"绝对强度"；这是刻意为之——我们更关心口味形状是否相像。
function cosine(u, w) {
  let dot = 0, nu = 0, nw = 0;
  for (const d of DIMS) {
    const a = u[d] - 5, b = w[d] - 5;
    dot += a * b; nu += a * a; nw += b * b;
  }
  if (!nu || !nw) return 0;
  return dot / Math.sqrt(nu * nw);
}

// 匹配：两个互相独立的分量，每个变量只出现一次，避免重复计算。
//   S10 风格契合 = 中心化余弦相似度，映射到 0-10
//   D10 难度契合 = 作家"阅读难度"（form 与 10-readability 合并）与用户"难度耐受"的差距。
//      form 与 readability 强负相关，拆开算会把"难度"算两遍，故合并成一个量。
function matchWriters(profile, writers) {
  const userTol = (profile.hidden.ambiguity + profile.patience) / 2; // 用户难度耐受：歧义容忍 + 耐心 平均

  // 用户侧对比增强：把画像相对自身均值放大，使"温和偏好"显现形状、真·全能用户诚实归为无形状。
  // 只用于 S10 的 cosine；allRounder/flatProfile/peakDim/maxGap 判断、文案与雷达图仍用原始 profile.core。
  const mean = DIMS.reduce((s, d) => s + profile.core[d], 0) / DIMS.length;
  const enhanceCore = Object.fromEntries(DIMS.map((d) => [d, clamp(5 + (profile.core[d] - mean) * ENHANCE_K, 0, 10)]));

  // 无偏好检测的提示：核心维收缩已在 computeProfile 完成，这里只负责加一句提醒。
  const weakSignal = (typeof profile.avoidRatio === 'number' && profile.avoidRatio >= AVOID_THRESHOLD)
    ? '你较多地选择了"回避 / 绕开"的选项，口味信号偏弱，画像已向中性收敛，这份推荐仅供参考。'
    : null;

  // 画像平坦度：10 维 max−min 过小 = 没有明显偏好（随机作答或"全都要"型），也输出低信号提示。
  // 这能兜住那些回避比例不高、却没有任何形状的用户，又不误伤有尖峰形状的爱好者。
  const coreVals = DIMS.map((d) => profile.core[d]);
  const flatProfile = Math.max(...coreVals) - Math.min(...coreVals) < 2.5;
  // 全能高分/疑似随机：多数维度都在高位且没有明显短板——随机作答或"全都要"型读者。
  // 只提示、不收缩（区别于 weakSignal）；有形状的真爱好者会有明显低维，不会被误伤。
  const highCount = coreVals.filter((v) => v >= 7.5).length;
  const allRounder = highCount >= 6 && coreVals.every((v) => v >= 4);
  // 峰值维（用于"覆盖面广但某维最突出"的提示，避免与结果页自相矛盾）
  const peakDim = DIMS.reduce((a, d) => (profile.core[d] > profile.core[a] ? d : a), DIMS[0]);
  // 峰值与次高的落差：只有落差够大，峰值才"真实可信"，否则只是随机噪声，不该被点名
  const sortedVals = coreVals.slice().sort((a, b) => b - a);
  const maxGap = sortedVals[0] - sortedVals[1];

  const scored = writers.map((w) => {
    const S10 = r1(((cosine(enhanceCore, w) + 1) / 2) * 10);
    const writerDiff = (w.form + (10 - w.readability)) / 2; // 作家阅读难度：形式难度 + 慢重程度 平均
    const D10 = r1(10 - Math.min(10, Math.abs(writerDiff - userTol)));
    const final = r1(WEIGHTS.style * S10 + WEIGHTS.difficulty * D10);
    return { w, S10, D10, final };
  });
  // 并列时用 id 作确定性次级排序，避免同分"随机抓一个"。
  scored.sort((a, b) => (b.final - a.final) || (a.w.id - b.w.id));

  const top = {
    name: scored[0].w.name, region_era: scored[0].w.region_era, works: scored[0].w.works, tags: scored[0].w.tags,
    match: scored[0].final,
    profile: Object.fromEntries(DIMS.map((d) => [d, scored[0].w[d]])),
    breakdown: { style: scored[0].S10, difficulty: scored[0].D10 },
  };
  const also = scored.slice(1, 6).map((s) => ({
    name: s.w.name, works: s.w.works, match: s.final,
    tag: labelRunner(profile, s.w),
  }));
  // "文学家族"：前 3 名，每位带一句"为什么契合"，用于结果页的同伴卡。
  const family = scored.slice(0, 3).map((s) => ({
    name: s.w.name, region_era: s.w.region_era, works: s.w.works, tags: s.w.tags,
    match: s.final, why: whyLine(profile, s.w),
  }));

  // 低信号提示：按严重度排序——回避过多（收缩）> 全能高分/疑似随机 > 画像平坦。
  // allRounder 触发时做"峰值感知"：有明确尖峰就承认它，避免与结果页自相矛盾。
  const caveat = weakSignal
    || (allRounder
      ? (profile.core[peakDim] >= 8.5 && maxGap >= 1.5
        ? '你的口味覆盖面很广，但在「' + DIM_LABELS[peakDim] + '」上最突出，推荐侧重于此。'
        : '你几乎对所有风格都来电，这份推荐仅供参考。')
      : (flatProfile ? '你的口味信号比较均衡（各维度接近），这份推荐仅供参考。' : null));

  return { top, also, family, caveat };
}

// 给"仅次于"的作家打标签：当作家"阅读难度"明显高于用户"难度耐受"时，标"挑战"。
// 判据与 D10 一致（writerDiff vs userTol），不再用旧口径 core.form / core.readability。
function labelRunner(profile, writer) {
  const writerDiff = (writer.form + (10 - writer.readability)) / 2;
  const userTol = (profile.hidden.ambiguity + profile.patience) / 2;
  if (writerDiff - userTol < 4) return '';
  // 难的来源：形式实验（form 高）还是文字晦涩（readability 低）
  if (writer.form >= (10 - writer.readability)) return '挑战 · 形式实验';
  return '挑战 · 偏晦涩';
}

function describeProfile(profile) {
  const ranked = DIMS.slice().sort((a, b) => profile.core[b] - profile.core[a]);
  const top = ranked.slice(0, 2);
  const low = ranked[ranked.length - 1];
  const type = top.map((d) => DIM_ADJ[d]).join(' × ');
  const lines = [];
  lines.push('你最看重的是「' + top.map((d) => DIM_LABELS[d]).join('」与「') + '」。');
  lines.push('相对而言，你较少被「' + DIM_LABELS[low] + '」吸引。');
  if (profile.hidden.ambiguity < 4) lines.push('你偏好有明确落点的叙事，不太喜欢悬而未决的空白。');
  else if (profile.hidden.ambiguity > 7) lines.push('你能享受开放结局与多重解释。');
  if (profile.hidden.intensity < 4) lines.push('你对极度压抑或残酷的情绪较为敏感。');
  else if (profile.hidden.intensity > 7) lines.push('你能承受强烈的情感冲击，甚至在其中得到回响。');
  if (profile.patience >= 7) lines.push('你的阅读持续性高，愿意为一部作品投入篇幅。');
  else if (profile.patience <= 4) lines.push('你更偏好容易进入、能较快读完的作品。');
  return { type, top, low, lines };
}

// 灵魂分析：把 10 维 + 2 隐藏 + 耐心 拼装成面对"你"的文学化解读段落。
function describeSoul(profile) {
  const ranked = DIMS.slice().sort((a, b) => profile.core[b] - profile.core[a]);
  const top2 = ranked.slice(0, 2);
  const low = ranked[ranked.length - 1];
  const paras = [];
  for (const d of top2) if (SOUL[d].high) paras.push(SOUL[d].high);
  if (profile.core[low] < 5.5) paras.push(SOUL[low].low);
  if (profile.hidden.ambiguity >= 6.5) paras.push(SOUL.ambiguity.high);
  else if (profile.hidden.ambiguity <= 3.5) paras.push(SOUL.ambiguity.low);
  if (profile.hidden.intensity >= 6.5) paras.push(SOUL.intensity.high);
  else if (profile.hidden.intensity <= 3.5) paras.push(SOUL.intensity.low);
  if (profile.patience >= 7) paras.push(SOUL.patience.high);
  else if (profile.patience <= 4) paras.push(SOUL.patience.low);
  return paras;
}

// 给"文学家族"里的每位作家写一句"为什么你们契合"。
function whyLine(profile, writer) {
  const ranked = DIMS.slice().sort((a, b) => profile.core[b] - profile.core[a]);
  const shared = ranked.filter((d) => writer[d] >= 7).slice(0, 2);
  if (shared.length) return '你们在「' + shared.map((d) => DIM_LABELS[d]).join('」与「') + '」上同频。';
  return '一种说不清、但很对的气味。';
}

// 作家指代：按名字区分 她 / 他 / 他们（未列出的默认"他"）。
const FEMALE_WRITERS = new Set(['紫式部', '简·奥斯汀', '夏洛蒂·勃朗特', '伍尔夫', '托妮·莫里森', '辛波斯卡', '安妮·卡森', '张爱玲', '乔治·艾略特', '艾丽丝·门罗', '奥尔加·托卡尔丘克']);
const GROUP_WRITERS = new Set(['《一千零一夜》作者群']);

function pronounsFor(name) {
  if (GROUP_WRITERS.has(name)) return { subj: '他们', poss: '他们的' };
  if (FEMALE_WRITERS.has(name)) return { subj: '她', poss: '她的' };
  return { subj: '他', poss: '他的' };
}

function describeMatch(profile, writer, name) {
  const p = pronounsFor(name || '');
  const rankedUser = DIMS.slice().sort((a, b) => profile.core[b] - profile.core[a]);
  const topUser = rankedUser.slice(0, 2);
  const rankedWriter = DIMS.slice().sort((a, b) => writer[b] - writer[a]);
  const topWriter = rankedWriter.slice(0, 2);
  const lines = [];
  const shared = topUser.filter((d) => writer[d] >= 7);
  if (shared.length) {
    lines.push('你们在「' + shared.map((d) => DIM_LABELS[d]).join('」与「') + '」上高度共振——这是你最看重、也恰是' + p.subj + '最擅长的部分。');
  } else {
    lines.push('你偏好的「' + topUser.map((d) => DIM_LABELS[d]).join('」与「') + '」，' + p.subj + '用自己的方式回应了它。');
  }
  lines.push(p.poss + '作品最突出的是「' + topWriter.map((d) => DIM_LABELS[d]).join('」与「') + '」。');
  if (writer.form >= 8 || writer.readability <= 3) {
    lines.push('需要提醒：' + p.poss + '文字并不好读，若你偏好顺畅，可以从代表作慢慢入手。');
  } else if (writer.readability >= 8) {
    lines.push(p.poss + '文字容易进入，很适合作为沉浸阅读的起点。');
  }
  // 共享 DNA：你和 TA 同频的维度（供"你们共享的文学 DNA"模块展示）
  const sharedDna = shared.map((d) => DIM_LABELS[d]);
  // 阅读提示：按 TA 最突出的维度，给读者一句"怎么读 TA"的建议（非作者原话）
  const readingTip = READING_TIPS[rankedWriter[0]] || '';
  return { lines, sharedDna, readingTip };
}

module.exports = { DIMS, HIDDEN, DIM_LABELS, DIM_ADJ, HIDDEN_LABELS, computeProfile, matchWriters, describeProfile, describeSoul, describeMatch };
