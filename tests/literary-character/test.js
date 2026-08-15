// tests/literary-character/test.js —— "文学角色"测试的完整定义（内容包）。
//
// 引擎（backend/scoring.js）不关心具体是哪个测试：维度、隐藏维、权重、缩放、
// 阈值、文案全部来自这里。本内容包与 tests/literary-taste/ 结构完全对齐，
// 只是把"写作风格维度"换成了"人格维度"，去掉了隐藏维与难度分量。
//
// 内容包结构：
//   id / title / heading / lead / modes          —— 目录页 + 开场页
//   entityLabel / resultKicker / familyTitle ...  —— 结果页文案标签
//   dims / hidden                                 —— 核心维度 + 隐藏维度（有序）
//   config                                        —— 计分与匹配的可调参数
//   pronouns                                      —— 实体指代（他/她/他们/它）
//   copy                                          —— 灵魂文案、角色底色文案
//   questions / entities / details                —— 题目、实体向量、实体介绍

const questions = require('./questions.js');
const entities = require('./entities.js');
const details = require('./details.js');

module.exports = {
  id: 'literary-character',
  title: '文学角色 · 你是谁',
  wordmark: '文学角色 · Character Profile',
  metaBadge: '十维人格',
  heading: '你更像哪个文学角色',
  lead: '几个情境，凭直觉选。没有对错，只有你更像谁。',
  modes: [
    { count: 16, label: '精简版', desc: '16 题 · 约 3 分钟' },
    { count: 24, label: '标准版', desc: '24 题 · 约 5 分钟' },
    { count: 32, label: '精确版', desc: '32 题 · 更精确' },
    { count: 99, label: '全题库', desc: '48 题 · 全部做完' },
  ],

  // 结果页文案标签（前端按这些渲染，不含硬编码）
  entityLabel: '文学角色',
  resultKicker: '你的角色底色',
  familyTitle: '你的角色家族',
  dnaTitle: '你们共享的特质',
  tipLabel: '角色的底色',
  booksTitle: '值得一读的原著',
  legendLabel: '最契合的角色',
  metaFields: ['works'], // 实体副标题行：显示出处著作，如《红楼梦》

  dims: [
    { key: 'action', label: '行动', adj: '目标驱动' },
    { key: 'emotion', label: '情感', adj: '情感丰沛' },
    { key: 'inner', label: '内省', adj: '心思复杂' },
    { key: 'dream', label: '想象', adj: '理想奔放' },
    { key: 'care', label: '关怀', adj: '心怀他人' },
    { key: 'thought', label: '思辨', adj: '追问意义' },
    { key: 'order', label: '守序', adj: '规矩自持' },
    { key: 'wit', label: '幽默', adj: '反讽机智' },
    { key: 'desire', label: '欲望', adj: '野心渴求' },
    { key: 'tough', label: '坚韧', adj: '扛得住事' },
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
    difficulty: null,            // 角色没有"阅读难度"，关闭难度分量
    extractBooks: true,          // 从角色出处（works）抽《书名》生成"推荐原著"
  },

  pronouns: {
    female: ['林黛玉', '王熙凤', '薛宝钗', '史湘云', '曹七巧', '白流苏', '翠翠', '驹子', '苔丝', '爱玛·包法利', '安娜·卡列尼娜', '娜塔莎·罗斯托娃', '简·爱', '凯瑟琳·恩肖', '伊丽莎白·班纳特', '斯嘉丽·奥哈拉', '爱丽丝', '白素贞', '花木兰', '奥菲利娅'],
    group: [],
    defaultSubj: '他', defaultPoss: '他的',
  },

  copy: {
    // 灵魂分析：把每个维度翻译成一句面对"你"的文学化解读（高/低两句）
    soul: {
      action: {
        high: '你骨子里有一股劲，认定了就往前冲，不习惯站在原地等。',
        low: '你更愿意顺其自然，让事情自己走到你面前。',
      },
      emotion: {
        high: '你的心是敞着的，喜怒都写在脸上，别人一句话就能把你带进去。',
        low: '你习惯站在情绪外面看，理性地掂量，很少被一阵风就吹动。',
      },
      inner: {
        high: '你的心思很细，一件事能在心里来回盘很久，越想越深。',
        low: '你不爱跟自己较劲，想不明白的，就先放到一边。',
      },
      dream: {
        high: '你脑子里常住着另一个世界，现实只是它的一个版本。',
        low: '你更相信眼前看得见摸得着的东西，不大会跟着想象飘远。',
      },
      care: {
        high: '你心里装得下别人，远处的人和事也会牵动你。',
        low: '你更愿意守好自己这一小块天地，别的事听听就好。',
      },
      thought: {
        high: '你总忍不住问"为什么"，事情有了结果，你还想再挖一层。',
        low: '你更看重把日子过下去，那些悬着的问题，让它们先飘着。',
      },
      order: {
        high: '你喜欢秩序和规矩，凡事有个章法，心里才踏实。',
        low: '你不爱被条条框框捆住，随性一点，反而自在。',
      },
      wit: {
        high: '你看世界总隔着一层笑意，先看见好笑的那面，再看悲哀的那面。',
        low: '你更愿意一本正经地看待事情，玩笑和反讽不太对你胃口。',
      },
      desire: {
        high: '你对"想要"这件事很诚实，认准了就不肯放手。',
        low: '你不太被欲望牵着走，得不到的，也就算了。',
      },
      tough: {
        high: '你扛得住事，越是被压，反而越能挺起腰来。',
        low: '你的心比较软，遇到重击容易碎，需要慢慢缓过来。',
      },
    },

    // 角色的底色：按实体最突出的维度，给结果页一句"这个角色的底色"
    readingTips: {
      action: '这个角色最迷人的，是说做就做、不给自己留退路的那股冲劲。',
      emotion: '这个角色的心是敞开的，喜怒都滚烫，藏都藏不住。',
      inner: '这个角色想得深，很多话都咽在心里，始终没说出口。',
      dream: '这个角色活在自己的理想里，现实只是他路过的地方。',
      care: '这个角色把别人和世道放在心上，常常先想到别人。',
      thought: '这个角色总在追问"为什么"，答案对他反而没那么重要。',
      order: '这个角色重规矩、讲章法，认准的理就守到底。',
      wit: '这个角色看破不说破，用一层笑意挡着最冷的东西。',
      desire: '这个角色最迷人的，是他那股不肯放手的劲。',
      tough: '这个角色扛得住事，再难也没有被压垮过。',
    },

    // 结果页"分析"区里实体"最突出的是什么"的用词（角色是"身上"，不是"作品"）
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
