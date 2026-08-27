// tests/literary-taste/test.js —— "阅读口味"测试的完整定义（内容包）。
//
// 引擎（backend/scoring.js）不关心具体是哪个测试：维度、隐藏维、权重、缩放、
// 阈值、文案全部来自这里。要新增一个测试，就在 tests/ 下加一个同样的内容包，
// 引擎和前端一行都不用改。
//
// 内容包结构：
//   id / title / heading / lead / modes          —— 目录页 + 开场页
//   entityLabel / resultKicker / familyTitle ...  —— 结果页文案标签
//   dims / hidden                                 —— 核心维度 + 隐藏维度（有序）
//   config                                        —— 计分与匹配的可调参数
//   pronouns                                      —— 实体指代（他/她/他们/它）
//   copy                                          —— 灵魂文案、阅读提示、挑战标签、画像提示句
//   questions / entities / details                —— 题目、实体向量、实体介绍

const questions = require('./questions.js');
const entities = require('./entities.js');
const details = require('./details.js');

module.exports = {
  id: 'literary-taste',
  title: '阅读口味 · 文学契合测试',
  wordmark: '阅读口味 · Reading Profile',
  metaBadge: '十维测量',
  emoji: '📖',
  heading: '找到与你最契合的作家',
  lead: '你将面对几个不同的文学情境，做出你的选择。没有对错，只有偏好。',
  modes: [
    { count: 16, label: '精简版', desc: '16 题 · 约 3 分钟' },
    { count: 24, label: '标准版', desc: '24 题 · 约 5 分钟' },
    { count: 32, label: '精确版', desc: '32 题 · 更精确' },
    { count: 99, label: '全题库', desc: '48 题 · 全部做完' },
  ],

  // 结果页文案标签（前端按这些渲染，不含硬编码）
  entityLabel: '作家',
  resultKicker: '你的文学口味',
  familyTitle: '你的文学家族',
  dnaTitle: '你们共享的文学 DNA',
  tipLabel: '阅读提示',
  booksTitle: '为你推荐的书',
  legendLabel: '最契合的作家',
  metaFields: ['region_era', 'works'], // 实体副标题行：按这些字段用 ' · ' 拼接
  foldRadar: true, // 结果页雷达图默认折叠（与其他包统一）
  gradient: 'linear-gradient(135deg, #4a6a8a, #1a2434)', // 分享卡默认主色（实体未配专属渐变时的兜底）

  dims: [
    { key: 'narrative', label: '叙事', adj: '情节驱动' },
    { key: 'lyric', label: '抒情', adj: '语言敏感' },
    { key: 'psychology', label: '心理', adj: '心理洞察' },
    { key: 'imagination', label: '想象', adj: '想象奔放' },
    { key: 'society', label: '社会', adj: '现实关怀' },
    { key: 'philosophy', label: '哲思', adj: '哲思内省' },
    { key: 'form', label: '形式', adj: '形式探索' },
    { key: 'readability', label: '轻快', adj: '轻快直接' },
    { key: 'humor', label: '幽默', adj: '反讽机智' },
    { key: 'desire', label: '欲望', adj: '欲望驱动' },
  ],
  hidden: [
    { key: 'ambiguity', label: '歧义容忍' },
    { key: 'intensity', label: '情绪强度' },
  ],

  config: {
    weights: { style: 0.85, difficulty: 0.15 },
    coreScale: 5,          // 核心维：按"吃到的信号比例"映射到 5~10
    hiddenScale: 1.25,     // 隐藏维：按平均系数缩放
    avoidThreshold: 0.5,   // 回避类选项占比 ≥ 0.5 → 判定信号偏弱，核心维向 5 收缩
    enhanceK: 1.8,         // 匹配前把用户画像相对自身均值放大（让温和偏好显现形状）
    flatThreshold: 2.5,    // 核心维 max−min < 2.5 → 画像平坦
    allRounderHigh: 7.5,   // 全能高分判定：≥7.5 的维度数
    allRounderMinCount: 6, // 全能高分判定：至少这么多维 ≥ allRounderHigh
    allRounderFloor: 4,    // 全能高分判定：所有维都 ≥ 这个底
    peakMin: 8.5,          // 峰值维至少这么高才被点名
    maxGap: 1.5,           // 峰值与次高的落差至少这么大，峰值才可信
    challengeGap: 4,       // 实体难度 − 用户耐受 ≥ 4 → 标"挑战"
    // 难度契合：实体难度 = (hardDim + (10 - slowDim)) / 2，用户耐受 = tolHidden 与 patience 平均
    difficulty: { hardDim: 'form', slowDim: 'readability', tolHidden: 'ambiguity', tolPatience: true },
    extractBooks: true,    // 是否从实体 works 里抽取《书名》生成推荐书单
  },

  pronouns: {
    female: ['紫式部', '简·奥斯汀', '夏洛蒂·勃朗特', '伍尔夫', '托妮·莫里森', '辛波斯卡', '安妮·卡森', '张爱玲', '乔治·艾略特', '艾丽丝·门罗', '奥尔加·托卡尔丘克'],
    group: ['《一千零一夜》作者群'],
    defaultSubj: '他', defaultPoss: '他的',
  },

  copy: {
    // 灵魂分析：把每个维度翻译成一句面对"你"的文学化解读（高/低两句）
    soul: {
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
    },

    // 阅读提示：按实体最突出的维度，给读者一句"怎么读 TA"的建议（非作者原话）
    readingTips: {
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
    },

    // "仅次于"榜单里的挑战标签
    challenge: { hard: '挑战 · 形式实验', slow: '挑战 · 偏晦涩' },

    // 画像提示句：describeProfile 里按隐藏维/耐心高低拼装
    profileLines: {
      ambiguityHigh: '你能享受开放结局与多重解释。',
      ambiguityLow: '你偏好有明确落点的叙事，不太喜欢悬而未决的空白。',
      intensityHigh: '你能承受强烈的情感冲击，甚至在其中得到回响。',
      intensityLow: '你对极度压抑或残酷的情绪较为敏感。',
      patienceHigh: '你的阅读持续性高，愿意为一部作品投入篇幅。',
      patienceLow: '你更偏好容易进入、能较快读完的作品。',
    },
  },

  questions,
  entities,
  details,
};
