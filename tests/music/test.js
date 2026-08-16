// tests/music/test.js —— "最契合的音乐风格"测试的完整定义（内容包）。
//
// 引擎（backend/scoring.js）不关心具体是哪个测试：维度、隐藏维、权重、缩放、
// 阈值、文案全部来自这里。本内容包与 tests/animal/、tests/literary-character/ 结构完全对齐，
// 只是把"人格 / 生态维度"换成了全新的"声音维度"，去掉了隐藏维与难度分量。
//
// 核心钩子不是"你喜欢什么音乐"，而是——「你是哪一种声音？」
// 结果不是歌单，而是一种具体风格 + 一段文学化、适合截图的漂亮文案。
// 题目是"声音氛围切片"：文字像歌词、像专辑封面，测你在一段氛围里的自然反应。
//
// 内容包结构：
//   id / title / heading / lead / modes          —— 目录页 + 开场页
//   entityLabel / resultKicker / familyTitle ...  —— 结果页文案标签
//   dims / hidden                                 —— 核心维度 + 隐藏维度（有序）
//   config                                        —— 计分与匹配的可调参数
//   pronouns                                      —— 实体指代（他/她/他们/它）
//   copy                                          —— 灵魂文案、风格底色文案
//   questions / entities / details                —— 题目、实体向量、实体介绍

const questions = require('./questions.js');
const entities = require('./entities.js');
const details = require('./details.js');

module.exports = {
  id: 'music',
  title: '最契合的音乐风格 · 你是谁',
  wordmark: '最契合的音乐风格 · Sound Profile',
  metaBadge: '声音十维',
  heading: '你是哪一种音乐',
  lead: '几段氛围，凭直觉选。没有对错，只有你更像哪一种音乐。',
  modes: [
    { count: 16, label: '精简版', desc: '16 题 · 约 3 分钟' },
    { count: 24, label: '标准版', desc: '24 题 · 约 5 分钟' },
    { count: 32, label: '精确版', desc: '32 题 · 更精确' },
    { count: 99, label: '全题库', desc: '48 题 · 全部做完' },
  ],

  // 结果页文案标签（前端按这些渲染，不含硬编码）
  entityLabel: '音乐风格',
  resultKicker: '你的声音底色',
  familyTitle: '与你相近的声音',
  dnaTitle: '你们共享的特质',
  tipLabel: '这种声音的底色',
  booksTitle: '', // 音乐没有"原著书单"，留空（extractBooks 关闭）
  legendLabel: '最契合的音乐风格',
  metaFields: ['en'], // 实体副标题行：显示风格英文名，如「Classical」
  foldRadar: true, // 结果页雷达图默认折叠，给"查看你的完整图谱"展开按钮

  dims: [
    { key: 'warmth', label: '温度', adj: '有体温' },
    { key: 'intensity', label: '强度', adj: '迸发燃烧' },
    { key: 'order', label: '秩序', adj: '严谨结构' },
    { key: 'groove', label: '律动', adj: '踩着节拍' },
    { key: 'nostalgia', label: '怀旧', adj: '回望念旧' },
    { key: 'texture', label: '质感', adj: '精致打磨' },
    { key: 'inward', label: '内省', adj: '向内独白' },
    { key: 'melancholy', label: '忧郁', adj: '深色悲悯' },
    { key: 'space', label: '留白', adj: '留白呼吸' },
    { key: 'aura', label: '气场', adj: '宏大震撼' },
  ],
  hidden: [], // 本测试无隐藏维

  config: {
    mode: 'profile',             // 雷达匹配型（非分类型）
    weights: { style: 1.0, difficulty: 0 },  // 纯风格契合，无难度分量
    coreScale: 5,                // 核心维归一化缩放
    hiddenScale: 1.25,           // 无隐藏维，保留字段但不起作用
    avoidThreshold: 0.5,
    enhanceK: 1.8,
    flatThreshold: 2.5,
    allRounderHigh: 7.5, allRounderMinCount: 6, allRounderFloor: 4,
    peakMin: 8.5, maxGap: 1.5,
    difficulty: null,            // 音乐没有"阅读难度"，关闭难度分量
    extractBooks: false,         // 音乐没有书单，关闭
  },

  pronouns: {
    female: [], // 风格统一用"它"，不分性别
    group: [],
    defaultSubj: '它', defaultPoss: '它的',
  },

  copy: {
    // 灵魂分析：把每个声音维度翻译成一句面对"你"的文学化解读（高/低两句）
    soul: {
      warmth: {
        high: '你天生带着体温，靠近你就觉得暖，喜怒都热腾腾地往外冒。',
        low: '你习惯保持一点距离，冷静、疏离，别人要走近你，得先经过一段安静。',
      },
      intensity: {
        high: '你的情绪一上来就是倾泻，不藏、不压，痛痛快快烧完才算数。',
        low: '你习惯把情绪收着，克制、内敛，再大的风浪也不愿惊动旁人。',
      },
      order: {
        high: '你心里有条理，凡事讲究结构和章法，乱了你会不舒服。',
        low: '你不爱被框住，随性、即兴，计划赶不上变化也没什么大不了。',
      },
      groove: {
        high: '你身上自带节拍，一站进人群，就能让气氛跟着流动起来。',
        low: '你更愿意悬浮着、漂浮着，不赶拍子，由着自己慢悠悠地晃。',
      },
      nostalgia: {
        high: '你念旧，回望总有余温，过去的碎片在你心里一直留着光。',
        low: '你总往前看，新的人、新的东西，比身后的路更让你兴奋。',
      },
      texture: {
        high: '你讲究质感，喜欢被打磨得光滑、精致的东西，连细节都不放过。',
        low: '你不修边幅，宁可粗粝一点、真实一点，也不要那种假假的精致。',
      },
      inward: {
        high: '你更习惯向内走，独白、自省，很多话都只说给自己听。',
        low: '你更愿意向外表达，和世界共振，把心里的声音喊出来给别人听。',
      },
      melancholy: {
        high: '你的底色偏深，忧郁、悲悯，看世界总带着一层温柔的阴影。',
        low: '你明快、轻盈，亮色调是你给世界的默认表情。',
      },
      space: {
        high: '你喜欢留白，喜欢呼吸感和空间，塞得太满会让你喘不过气。',
        low: '你喜欢填满，喜欢密度和充实，空着反而让你不安。',
      },
      aura: {
        high: '你自带气场，喜欢宏大、震撼、有仪式感的时刻。',
        low: '你更爱贴身、亲近、日常的相处，把大场面留给别人。',
      },
    },

    // 风格的底色：按实体最突出的维度，给结果页一句"这种声音的底色"
    readingTips: {
      warmth: '这种声音最迷人的，是它暖到骨子里的温度。',
      intensity: '这种声音最迷人的，是它不顾一切地燃烧。',
      order: '这种声音最迷人的，是它结构里藏着的恒久。',
      groove: '这种声音最迷人的，是它让人停不下来的律动。',
      nostalgia: '这种声音最迷人的，是它回望时那点温存的余温。',
      texture: '这种声音最迷人的，是它被打磨到极致的质感。',
      inward: '这种声音最迷人的，是它向内独白时的深不可测。',
      melancholy: '这种声音最迷人的，是它忧郁里透出的悲悯。',
      space: '这种声音最迷人的，是它留白里那片呼吸的余地。',
      aura: '这种声音最迷人的，是它宏大而震撼的气场。',
    },

    // 结果页"分析"区里实体"最突出的是什么"的用词（风格是"声音里"）
    matchNoun: '声音里',

    // 无难度，留空
    challenge: {},

    // 无隐藏维、无 patience，留空
    profileLines: {},
  },

  questions,
  entities,
  details,
};
