// tests/animal/test.js —— "最契合的动物"测试的完整定义（内容包）。
//
// 引擎（backend/scoring.js）不关心具体是哪个测试：维度、隐藏维、权重、缩放、
// 阈值、文案全部来自这里。本内容包与 tests/literary-character/ 结构完全对齐，
// 只是把"人格维度"换成了全新的"生态维度"，去掉了隐藏维与难度分量。
//
// 核心钩子不是"你是什么动物"的占卜，而是——「如果你的性格是一种动物，它会是什么？」
//
// 内容包结构：
//   id / title / heading / lead / modes          —— 目录页 + 开场页
//   entityLabel / resultKicker / familyTitle ...  —— 结果页文案标签
//   dims / hidden                                 —— 核心维度 + 隐藏维度（有序）
//   config                                        —— 计分与匹配的可调参数
//   pronouns                                      —— 实体指代（他/她/他们/它）
//   copy                                          —— 灵魂文案、动物底色文案
//   questions / entities / details                —— 题目、实体向量、实体介绍

const questions = require('./questions.js');
const entities = require('./entities.js');
const details = require('./details.js');

module.exports = {
  id: 'animal',
  title: '最契合的动物 · 你是谁',
  wordmark: '最契合的动物 · Spirit Animal',
  metaBadge: '生态十维',
  emoji: '🐾',
  heading: '你的性格，最像哪种动物',
  lead: '几个情境，凭直觉选。没有对错，只有你更像谁。',
  modes: [
    { count: 16, label: '精简版', desc: '16 题 · 约 3 分钟' },
    { count: 24, label: '标准版', desc: '24 题 · 约 5 分钟' },
    { count: 32, label: '精确版', desc: '32 题 · 更精确' },
    { count: 99, label: '全题库', desc: '48 题 · 全部做完' },
  ],

  // 结果页文案标签（前端按这些渲染，不含硬编码）
  entityLabel: '动物',
  resultKicker: '你的动物底色',
  familyTitle: '与你相近的动物',
  dnaTitle: '你们共享的特质',
  tipLabel: '它的底色',
  booksTitle: '', // 动物没有"原著书单"，留空（extractBooks 关闭）
  legendLabel: '最契合的动物',
  metaFields: ['species'], // 实体副标题行：显示具体物种名，如「赤狐」
  foldRadar: true, // 结果页雷达图默认折叠（与音乐包一致）
  gradient: 'linear-gradient(135deg, #4a7a3a, #142210)', // 分享卡默认主色（实体未配专属渐变时的兜底）

  dims: [
    { key: 'social', label: '群性', adj: '合群联结' },
    { key: 'circadian', label: '昼夜', adj: '夜之生物' },
    { key: 'territory', label: '领地', adj: '恋家守土' },
    { key: 'predation', label: '掠食', adj: '主动出击' },
    { key: 'vigilance', label: '警觉', adj: '敏感警觉' },
    { key: 'display', label: '炫耀', adj: '张扬夺目' },
    { key: 'dormancy', label: '蛰伏', adj: '独处回血' },
    { key: 'hoard', label: '囤积', adj: '未雨绸缪' },
    { key: 'curiosity', label: '好奇', adj: '好奇探索' },
    { key: 'combat', label: '好斗', adj: '强势无畏' },
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
    difficulty: null,            // 动物没有"阅读难度"，关闭难度分量
    extractBooks: false,         // 动物没有书单，关闭
  },

  pronouns: {
    female: [], // 动物统一用"它"，不分性别
    group: [],
    defaultSubj: '它', defaultPoss: '它的',
  },

  copy: {
    // 灵魂分析：把每个生态维度翻译成一句面对"你"的文学化解读（高/低两句）
    soul: {
      social: {
        high: '你天生需要人，喜欢待在人群里，和别人的联结让你踏实。',
        low: '你习惯自己待着，自给自足，一个人也能把日子过得很好。',
      },
      circadian: {
        high: '你是夜之生物，越到深夜越清醒，思路也越清晰。',
        low: '你偏爱清晨，天一亮就精神，一天的开始是你最好的时光。',
      },
      territory: {
        high: '你恋家、守土，习惯待在自己的地盘里，那里有你的安全。',
        low: '你四海为家，说走就走，没有一个地方能长久拴住你。',
      },
      predation: {
        high: '你主动争取，看准了就出手，不等机会自己送上门。',
        low: '你更愿意等待、随缘，属于你的，迟早会来。',
      },
      vigilance: {
        high: '你对变化和威胁格外敏感，别人没察觉的，你先一步就嗅到了。',
        low: '你松弛、钝感，很少被风吹草动惊扰，心里稳稳的。',
      },
      display: {
        high: '你张扬、夺目，喜欢被看见，也不怕站在人群中央。',
        low: '你低调、安静，习惯隐没在人群里，不声张地做自己。',
      },
      dormancy: {
        high: '你慢节奏，需要独处来回血，热闹之后总想退回自己的壳。',
        low: '你高能量，越忙越有劲，闲下来反而浑身不自在。',
      },
      hoard: {
        high: '你习惯为明天准备，把重要的东西一件件攒起来，心里才安稳。',
        low: '你活在当下，即用即走，不为还没来的事提前操心。',
      },
      curiosity: {
        high: '你对世界充满好奇，爱尝新、爱探索，总有下一个想弄明白的东西。',
        low: '你更相信熟悉的东西，守旧、稳妥，不轻易踏出自己的节奏。',
      },
      combat: {
        high: '你正面刚、无畏，遇事不躲，敢跟比你强的人叫板。',
        low: '你温和、避让，能退一步就退一步，不把冲突当回事。',
      },
    },

    // 动物的底色：按实体最突出的维度，给结果页一句"这个动物的底色"
    readingTips: {
      social: '这种动物最迷人的，是它对同伴的那份不离不弃。',
      circadian: '这种动物最迷人的，是它在深夜独自清醒的那份安静。',
      territory: '这种动物最迷人的，是它对自己领地的执着与守护。',
      predation: '这种动物最迷人的，是它认准目标就全力扑上去的专注。',
      vigilance: '这种动物最迷人的，是它警觉之下藏着的那份敏锐。',
      display: '这种动物最迷人的，是它生来夺目、也坦荡得理直气壮。',
      dormancy: '这种动物最迷人的，是它不慌不忙、懂得蛰伏的从容。',
      hoard: '这种动物最迷人的，是它一点一点为明天攒下的踏实。',
      curiosity: '这种动物最迷人的，是它对世界永远不减的那股好奇。',
      combat: '这种动物最迷人的，是它无所畏惧、正面直上的那股气。',
    },

    // 结果页"分析"区里实体"最突出的是什么"的用词（动物是"身上"，不是"作品"）
    matchNoun: '身上',

    // 无难度，留空
    challenge: {},

    // 无隐藏维、无 patience，留空
    profileLines: {},
  },

  questions,
  entities,
  details,
};
