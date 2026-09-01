// tests/aesthetic/test.js —— "最契合的美学流派"测试的完整定义（内容包）。
//
// 引擎（backend/scoring.js）不关心具体是哪个测试：维度、隐藏维、权重、缩放、
// 阈值、文案全部来自这里。本内容包与 tests/era/、tests/music/ 结构完全对齐，
// 只是把"时代气质 / 声音维度"换成了全新的"美学 10 维"，去掉了隐藏维与难度分量。
//
// 核心钩子不是"你喜欢什么风格"（口味），而是——**「你以什么审美姿态活着」**：
// 你的房间、你偏爱的光、你愿意戴上的那张脸。结果是具体美学流派 + 一段文学化解读
// + 一张可分享的"美学名片"。所以题目绝不同"你喜欢哪种风格 / 你的穿搭是哪种"，
// 只测**此刻的审美直觉**：你对光与暗、繁与简、旧与新、甜与刺的本能倾向。
//
// 内容包结构：
//   id / title / heading / lead / modes          —— 目录页 + 开场页
//   entityLabel / resultKicker / familyTitle ...  —— 结果页文案标签
//   dims / hidden                                 —— 核心维度 + 隐藏维度（有序）
//   config                                        —— 计分与匹配的可调参数
//   pronouns                                      —— 实体指代（它，不分性别）
//   copy                                          —— 灵魂文案、美学底色文案
//   gradient                                      —— 分享卡默认主色
//   questions / entities / details                —— 题目、实体向量、实体介绍

const questions = require('./questions.js');
const entities = require('./entities.js');
const details = require('./details.js');

module.exports = {
  id: 'aesthetic',
  title: '最契合的美学流派 · 你是谁',
  wordmark: '最契合的美学流派 · Aesthetic Profile',
  metaBadge: '美学十维',
  emoji: '🎨',
  heading: '你是哪一种美学',
  lead: '几束光、几件旧物、几个角落，凭直觉选。没有对错，只有你以什么姿态装点世界。',
  modes: [
    { count: 16, label: '精简版', desc: '16 题 · 约 3 分钟' },
    { count: 24, label: '标准版', desc: '24 题 · 约 5 分钟' },
    { count: 32, label: '精确版', desc: '32 题 · 更精确' },
    { count: 99, label: '全题库', desc: '48 题 · 全部做完' },
  ],

  // 结果页文案标签（前端按这些渲染，不含硬编码）
  entityLabel: '美学流派',
  resultKicker: '你的审美底色',
  familyTitle: '与你相近的美学',
  dnaTitle: '你们共享的美学基因',
  tipLabel: '这种美学的底色',
  booksTitle: '', // 美学没有"原著书单"，留空（extractBooks 关闭）
  legendLabel: '最契合的美学流派',
  metaFields: ['en'], // 实体副标题行：显示流派英文名，如「Coquette」
  foldRadar: true, // 结果页雷达图默认折叠，给"查看你的完整图谱"展开按钮
  heroKicker: '你是', // 结果页 Hero 标题
  postcard: true, // 开启"美学名片"分享卡（渐变 + 流派符号角标）
  gradient: 'linear-gradient(135deg, #7a5a8a, #201428)', // 分享卡默认主色（实体专属渐变缺省时的兜底）

  dims: [
    { key: 'luminance', label: '明度', adj: '发光清澈' },
    { key: 'dulcet', label: '甜度', adj: '甜美治愈' },
    { key: 'ornate', label: '繁饰', adj: '繁复华丽' },
    { key: 'retro', label: '怀旧', adj: '旧时档案' },
    { key: 'organic', label: '原生', adj: '天然手作' },
    { key: 'unruly', label: '乖张', adj: '反叛越界' },
    { key: 'numinous', label: '灵光', adj: '神圣纯净' },
    { key: 'childlike', label: '童真', adj: '童稚天真' },
    { key: 'theatrical', label: '戏剧', adj: '浓烈夸张' },
    { key: 'ethereal', label: '缥缈', adj: '梦幻轻盈' },
  ],
  hidden: [], // 本测试无隐藏维

  config: {
    mode: 'profile',             // 雷达匹配型（非分类型）
    weights: { style: 1.0, difficulty: 0 },  // 纯美学契合，无难度分量
    coreScale: 5,                // 核心维归一化缩放
    hiddenScale: 1.25,           // 无隐藏维，保留字段但不起作用
    avoidThreshold: 0.5,
    enhanceK: 1.8,
    flatThreshold: 2.5,
    allRounderHigh: 7.5, allRounderMinCount: 6, allRounderFloor: 4,
    peakMin: 8.5, maxGap: 1.5,
    difficulty: null,            // 美学没有"阅读难度"，关闭难度分量
    extractBooks: false,         // 美学没有书单，关闭
  },

  pronouns: {
    female: [], // 流派统一用"它"，不分性别
    group: [],
    defaultSubj: '它', defaultPoss: '它的',
  },

  copy: {
    // 灵魂分析：把每个美学维翻译成一句面对"你"的文学化解读（高/低两句）
    soul: {
      luminance: {
        high: '你的世界偏明亮——光、清澈、糖果色，暗沉的东西让你本能地想要调亮。',
        low: '你偏爱幽暗与深邃，阴翳对你不是压迫，是一种有层次的美。',
      },
      dulcet: {
        high: '你被甜美和柔软打动，温柔和治愈是你给的默认温度。',
        low: '你更偏爱锋利和酸涩，带刺的东西反而让你觉得真实。',
      },
      ornate: {
        high: '你喜欢繁复华丽，层层叠叠的细节让你安心，越讲究越好。',
        low: '你是极简的，留白和空旷给你最多的呼吸。',
      },
      retro: {
        high: '你恋旧，旧时光、档案和回忆总让你放慢脚步。',
        low: '你往前看，未来和前卫对你更有吸引力。',
      },
      organic: {
        high: '你亲近天然与手作，粗糙和真实比精致更打动你。',
        low: '你偏爱人工与合成，打磨过的精致才是你的舒适区。',
      },
      unruly: {
        high: '你不驯服，规则和乖巧困不住你，反叛是你的本能。',
        low: '你守序合群，规矩清楚的世界让你安心。',
      },
      numinous: {
        high: '你相信有比日常更高、更纯净的东西，神圣感对你很真实。',
        low: '你务实、现实，把目光放在眼前可触的事上。',
      },
      childlike: {
        high: '你心里住着一个孩子，可爱和天真对你来说是力量。',
        low: '你成熟世故，宁愿显得老练，也不愿被当小孩。',
      },
      theatrical: {
        high: '你喜欢浓烈和夸张，表演性对你是魅力，不是负担。',
        low: '你内敛低调，真实和本分比夺目更接近你。',
      },
      ethereal: {
        high: '你偏爱梦幻与轻盈，超现实的东西让你觉得自由。',
        low: '你更相信实在和厚重，脚踏实地才踏实。',
      },
    },

    // 美学的底色：按实体最突出的维度，给结果页一句"这种美学的底色"
    readingTips: {
      luminance: '这种美学的底色，是它把光当成了语言。',
      dulcet: '这种美学的底色，是它柔软到能化开人心。',
      ornate: '这种美学的底色，是它把繁复也过成了仪式。',
      retro: '这种美学的底色，是它回望时的温度。',
      organic: '这种美学的底色，是它从泥土里长出来的真。',
      unruly: '这种美学的底色，是它不肯被驯服的那股劲。',
      numinous: '这种美学的底色，是它高于日常的纯净。',
      childlike: '这种美学的底色，是它不肯长大的天真。',
      theatrical: '这种美学的底色，是它天生属于舞台的光。',
      ethereal: '这种美学的底色，是它飘在半空的那口气。',
    },

    // 结果页"分析"区里实体"最突出的是什么"的用词（美学是"美学里"）
    matchNoun: '美学里',

    // 无难度，留空
    challenge: {},

    // 无隐藏维、无 patience，留空
    profileLines: {},
  },

  questions,
  entities,
  details,
};
