// tests/era/test.js —— "最契合的历史时代"测试的完整定义（内容包）。
//
// 引擎（backend/scoring.js）不关心具体是哪个测试：维度、隐藏维、权重、缩放、
// 阈值、文案全部来自这里。本内容包与 tests/music/、tests/animal/ 结构完全对齐，
// 只是把"声音 / 生态维度"换成了全新的"时代气质 10 维"，去掉了隐藏维与难度分量。
//
// 核心钩子不是"你想穿越去哪个时代"（那是向往），而是——
// **「你的性格气质，最像哪个时代的空气」**。结果是具体时代 + 一段文学化的漂亮文案
// + 一张复古时代明信片。所以题目绝不同"历史 / 朝代 / 穿越 / 你喜欢哪个时代"，
// 只问**当下的你如何感受世界**：你的信仰、你的节奏、你对秩序和野蛮的态度、你是向上还是黄昏。
//
// 内容包结构：
//   id / title / heading / lead / modes          —— 目录页 + 开场页
//   entityLabel / resultKicker / familyTitle ...  —— 结果页文案标签
//   dims / hidden                                 —— 核心维度 + 隐藏维度（有序）
//   config                                        —— 计分与匹配的可调参数
//   pronouns                                      —— 实体指代（它，不分性别）
//   copy                                          —— 灵魂文案、时代底色文案
//   heroKicker / postcard                         —— 结果页 Hero 标题 + 明信片分享卡开关
//   questions / entities / details                —— 题目、实体向量、实体介绍

const questions = require('./questions.js');
const entities = require('./entities.js');
const details = require('./details.js');

module.exports = {
  id: 'era',
  title: '最契合的历史时代 · 你是谁',
  wordmark: '最契合的历史时代 · Era Profile',
  metaBadge: '时代气质十维',
  emoji: '🕰️',
  heading: '你属于哪个时代',
  lead: '几段氛围，凭直觉选。没有对错，只有你的精神气质，最像哪个时代的空气。',
  modes: [
    { count: 16, label: '精简版', desc: '16 题 · 约 3 分钟' },
    { count: 24, label: '标准版', desc: '24 题 · 约 5 分钟' },
    { count: 32, label: '精确版', desc: '32 题 · 更精确' },
    { count: 99, label: '全题库', desc: '48 题 · 全部做完' },
  ],

  // 结果页文案标签（前端按这些渲染，不含硬编码）
  entityLabel: '历史时代',
  resultKicker: '你的时代气质',
  familyTitle: '与你相近的时代',
  dnaTitle: '你们共享的特质',
  tipLabel: '这个时代的底色',
  booksTitle: '', // 时代没有"原著书单"，留空（extractBooks 关闭）
  legendLabel: '最契合的历史时代',
  metaFields: ['era'], // 实体副标题行：显示时代英文名，如「Tang Chang'an」
  foldRadar: true, // 结果页雷达图默认折叠，给"查看你的完整图谱"展开按钮
  heroKicker: '你属于', // 结果页 Hero 标题（其他测试用"你是"；时代用"你属于"更有归属感）
  postcard: true, // 开启"复古时代明信片"分享卡（纸纹 + 时代印章 + 年代·地点落款）

  dims: [
    { key: 'faith', label: '信仰', adj: '神圣超验' },
    { key: 'rule', label: '礼序', adj: '秩序尊崇' },
    { key: 'tribe', label: '群系', adj: '集体归属' },
    { key: 'grace', label: '风雅', adj: '生活美学' },
    { key: 'mind', label: '学养', adj: '思辨智趣' },
    { key: 'quest', label: '征途', adj: '开拓远方' },
    { key: 'edge', label: '边野', adj: '亲近蛮荒' },
    { key: 'tempo', label: '节律', adj: '快变喧闹' },
    { key: 'gold', label: '荣光', adj: '黄金上升' },
    { key: 'fire', label: '烈度', adj: '炽烈奔放' },
  ],
  hidden: [], // 本测试无隐藏维

  config: {
    mode: 'profile',             // 雷达匹配型（非分类型）
    weights: { style: 1.0, difficulty: 0 },  // 纯气质契合，无难度分量
    coreScale: 5,                // 核心维归一化缩放
    hiddenScale: 1.25,           // 无隐藏维，保留字段但不起作用
    avoidThreshold: 0.5,
    enhanceK: 1.8,
    flatThreshold: 2.5,
    allRounderHigh: 7.5, allRounderMinCount: 6, allRounderFloor: 4,
    peakMin: 8.5, maxGap: 1.5,
    difficulty: null,            // 时代没有"阅读难度"，关闭难度分量
    extractBooks: false,         // 时代没有书单，关闭
  },

  pronouns: {
    female: [], // 时代统一用"它"，不分性别
    group: [],
    defaultSubj: '它', defaultPoss: '它的',
  },

  copy: {
    // 灵魂分析：把每个时代气质维翻译成一句面对"你"的文学化解读（高/低两句）
    soul: {
      faith: {
        high: '你信一种比眼前更大的东西——天命、神圣、或冥冥中的尺度，这让你的选择有一种定力。',
        low: '你是现世的、理性的，不迷信、不仰望，宁可相信眼睛看得见、手摸得着的东西。',
      },
      rule: {
        high: '你尊重秩序与礼数，规则清楚的地方让你安心，你愿意按章法把日子过得体面。',
        low: '你厌烦规矩和条条框框，宁可真性情一点，也不愿被礼数裹着走。',
      },
      tribe: {
        high: '你重情义、重归属，一个人走得快，但你更愿意和一群人一起走得远。',
        low: '你更习惯独自站定，人情往来点到为止，你把自由看得比热闹重。',
      },
      grace: {
        high: '你在意美与讲究，生活里的仪式感、器物与细节，你都愿意为它们花心思。',
        low: '你朴素务实，好用和真实排在精致前面，糙一点反而自在。',
      },
      mind: {
        high: '你爱琢磨，喜欢把事想深、想透，思考对你来说本身就是一种乐趣。',
        low: '你更信行动与经验，问题拿来解决，不必绕进思辨的迷宫。',
      },
      quest: {
        high: '你心里有远方，有想干成的大事，安稳的日常填不住你的野心。',
        low: '你守成知足，把日子过得踏实安稳，就是你要的远方。',
      },
      edge: {
        high: '你对蛮荒、未知和危险有天然的亲近，越没人走过的路，你越想去踩。',
        low: '你依赖秩序与安全感，文明和规律给你的踏实，比野性更能滋养你。',
      },
      tempo: {
        high: '你喜欢快的、新的、喧闹的，世界在变这件事本身让你兴奋。',
        low: '你偏爱慢的、旧的、安静的，悠长和传统给你最深的安放。',
      },
      gold: {
        high: '你相信好日子正在来，未来值得押注，你的底色是上升的、发光的。',
        low: '你容易看见凋谢与黄昏，你的底色是忧郁的、珍惜眼前余晖的。',
      },
      fire: {
        high: '你的情感炽烈、藏不住，爱恨都像火，烧起来谁也拦不住。',
        low: '你含蓄克制，把情绪收在心底，再大的波澜也只露出一圈涟漪。',
      },
    },

    // 时代的底色：按实体最突出的维度，给结果页一句"这个时代的底色"
    readingTips: {
      faith: '这个时代的底色，是它信得比谁都深。',
      rule: '这个时代的底色，是它把秩序活成了骨血。',
      tribe: '这个时代的底色，是它把人聚在一起的力量。',
      grace: '这个时代的底色，是它把日子过成了艺术。',
      mind: '这个时代的底色，是它把思考看得比什么都重。',
      quest: '这个时代的底色，是它永远在向远方出发。',
      edge: '这个时代的底色，是它敢跟野性和未知贴身相处。',
      tempo: '这个时代的底色，是它追赶变化的速度。',
      gold: '这个时代的底色，是它笃信上升的荣光。',
      fire: '这个时代的底色，是它挡不住的炽烈。',
    },

    // 结果页"分析"区里实体"最突出的是什么"的用词（时代是"气质里"）
    matchNoun: '气质里',

    // 无难度，留空
    challenge: {},

    // 无隐藏维、无 patience，留空
    profileLines: {},
  },

  questions,
  entities,
  details,
};
