// 48 道情境题（题库）。全部为 4 选项，单选（前端每题选 1 项）。
//
// 本包"去动物化"：不问"你喜欢什么动物 / 觉得自己像谁"，而问"在这种处境里你会怎么做 / 怎么想"。
// 题干刻意让人"面对动物真实会碰到的处境"（守地盘、夜里清醒、先下手还是等待、
// 一个人回血还是找人、囤还是花、正面刚还是避开……），但不点明任何动物——没学过动物学也能凭直觉答。
//
// 题型 format（供 server.js 分层抽样）：
//   reality     现实生活情境（8 题）
//   fantasy     奇幻 / 假设情境（10 题）
//   social      社交 / 关系 / 群体（7 题）
//   inner       内心 / 独处 / 回忆（10 题）
//   commitment  投入 / 取舍 / 扛事（6 题）
//   desire      欲望 / 野心 / 诱惑（7 题）
//
// 10 核心维（本包无隐藏维）：
//   social 群性 / circadian 昼夜 / territory 领地 / predation 掠食 / vigilance 警觉
//   display 炫耀 / dormancy 蛰伏 / hoard 囤积 / curiosity 好奇 / combat 好斗
//
// 向量净化原则（务必保持，改题文字时不要破坏）：
//   - 每个选项只主攻 1–2 个维度，系数 +2 / +3（主维）+1 / +2（次维），全部非负。
//   - 不写负系数："不喜欢某倾向"通过"给对立维度不加分"来表达（低分端自然落空）。
//   - "回避 / 翻篇 / 不深究 / 算了 / 随缘 / 与我无关"的选项：vector 留空 + avoid: true，
//     用于引擎的"无偏好检测"（每 5 题里至少 1 题要有这种选项）。
//   - 每道题干净地测几个不同维度：不同选项分别指向不同倾向。
//   - 本库 3 道 followUp（追问层），规则同上。

module.exports = [
  // —— 现实生活情境（8 题）——
  { id: 1, format: 'reality', context: null,
    prompt: '做出成绩后，你更倾向——',
    options: [
      { id: 'A', text: '想让更多人知道、被看见。', vector: { display: 3 } },
      { id: 'B', text: '自己开心就好，不声张。', vector: { dormancy: 1 } },
      { id: 'C', text: '低调，但希望懂的人能看见。', vector: { display: 1, vigilance: 1 } },
      { id: 'D', text: '无所谓，没想过。', vector: {} },
    ] },
  { id: 2, format: 'reality', context: null,
    prompt: '新到一个陌生的城市安顿下来，你第一件事是——',
    options: [
      { id: 'A', text: '把住处收拾成自己的地盘，妥妥帖帖。', vector: { territory: 3 } },
      { id: 'B', text: '先摸清周围有什么好吃好玩的。', vector: { curiosity: 2, social: 1 } },
      { id: 'C', text: '找个安静的角落，先自己缓一缓。', vector: { dormancy: 2 } },
      { id: 'D', text: '认识几个新朋友，快点融入。', vector: { social: 3 } },
    ] },
  { id: 3, format: 'reality', context: null,
    prompt: '手机没电，又在一个不熟的地方。你会——',
    options: [
      { id: 'A', text: '有点慌，赶紧想办法充电、找人。', vector: { vigilance: 2, social: 1 } },
      { id: 'B', text: '无所谓，慢慢找，走丢了就当逛逛。', vector: { curiosity: 2, dormancy: 1 } },
      { id: 'C', text: '记着来时的路，原路返回最安心。', vector: { territory: 2, hoard: 1 } },
      { id: 'D', text: '站在原地，等一个能帮我的人。', vector: { social: 2 } },
    ] },
  { id: 4, format: 'reality', context: null,
    prompt: '你的房间或工位，通常是——',
    options: [
      { id: 'A', text: '东西归置得整整齐齐，每样都有位置。', vector: { territory: 2, hoard: 1 } },
      { id: 'B', text: '看着乱，但什么在哪我自己清楚。', vector: { vigilance: 1 } },
      { id: 'C', text: '随手放，怎么舒服怎么来。', vector: { dormancy: 1 } },
      { id: 'D', text: '会囤一点用得上的东西，有备无患。', vector: { hoard: 3 } },
    ] },
  { id: 5, format: 'reality', context: null,
    prompt: '深夜独自在家，突然听到门外有动静。你会——',
    options: [
      { id: 'A', text: '立刻警觉，悄悄过去看个究竟。', vector: { vigilance: 3, circadian: 1 } },
      { id: 'B', text: '先反锁门、检查门窗，再确认安全。', vector: { vigilance: 2, territory: 1, circadian: 1 } },
      { id: 'C', text: '继续睡，多半是风吹的。', vector: {} },
      { id: 'D', text: '有点怕，叫醒同住的人一起看。', vector: { social: 1, vigilance: 1 } },
    ],
    followUp: {
      prompt: '你确认那只是个误会。可第二天晚上，同样的动静又响了。你会——',
      options: [
        { id: 'A', text: '装个摄像头，非得看明白不可。', vector: { vigilance: 2, curiosity: 1 } },
        { id: 'B', text: '无所谓了，反正也没事。', vector: {}, avoid: true },
        { id: 'C', text: '睡前把门窗再检查一遍。', vector: { vigilance: 1, territory: 1 } },
        { id: 'D', text: '有点不安，去和家人朋友住几天。', vector: { social: 1, dormancy: 1 } },
      ],
    },
  },
  { id: 6, format: 'reality', context: null,
    prompt: '你平时买东西，更接近——',
    options: [
      { id: 'A', text: '想买就买，花得开心最重要。', vector: { display: 1 } },
      { id: 'B', text: '攒着钱，等真正需要的时候再买。', vector: { hoard: 3 } },
      { id: 'C', text: '遇到喜欢的会忍不住囤一点。', vector: { hoard: 2, curiosity: 1 } },
      { id: 'D', text: '货比三家，精打细算。', vector: { vigilance: 2, hoard: 1 } },
    ] },
  { id: 7, format: 'reality', context: null,
    prompt: '忙完一件大事之后，你更想——',
    options: [
      { id: 'A', text: '好好休息，一个人待着回回血。', vector: { dormancy: 3 } },
      { id: 'B', text: '找朋友庆祝一下。', vector: { social: 2, display: 1 } },
      { id: 'C', text: '马上投入下一件事，停不下来。', vector: { predation: 2, circadian: 1 } },
      { id: 'D', text: '复盘一遍，看看哪里还能更好。', vector: { vigilance: 1, curiosity: 1 } },
    ] },
  { id: 8, format: 'reality', context: null,
    prompt: '你更适应哪种生活节奏——',
    options: [
      { id: 'A', text: '快节奏，事情排满才充实。', vector: { predation: 2 } },
      { id: 'B', text: '慢一点，留白给自己。', vector: { dormancy: 2 } },
      { id: 'C', text: '白天高效，晚上必须睡够。', vector: {} },
      { id: 'D', text: '夜里才有最好的状态。', vector: { circadian: 3 } },
    ] },

  // —— 奇幻 / 假设情境（10 题）——
  { id: 9, format: 'fantasy', context: null,
    prompt: '有人当面跟你起冲突，你更可能——',
    options: [
      { id: 'A', text: '正面刚回去，不虚。', vector: { combat: 3 } },
      { id: 'B', text: '先退一步，避免升级。', vector: { dormancy: 1 } },
      { id: 'C', text: '讲道理，据理力争但不撕破脸。', vector: { combat: 1, vigilance: 1 } },
      { id: 'D', text: '能躲就躲。', vector: {}, avoid: true },
    ] },
  { id: 10, format: 'fantasy', context: null,
    prompt: '如果你是一种夜行动物，你更想——',
    options: [
      { id: 'A', text: '在夜里独自巡视自己的领地。', vector: { territory: 2, circadian: 2 } },
      { id: 'B', text: '和同伴一起在黑夜里穿行。', vector: { social: 2, circadian: 2 } },
      { id: 'C', text: '安静蹲在一个角落，看世界。', vector: { vigilance: 2, circadian: 1 } },
      { id: 'D', text: '我还是想白天活动，夜里睡觉。', vector: {} },
    ] },
  { id: 11, format: 'fantasy', context: null,
    prompt: '给你一片无人的旷野，你最想——',
    options: [
      { id: 'A', text: '拼命奔跑，直到跑不动。', vector: { curiosity: 2, predation: 1 } },
      { id: 'B', text: '找个地方躺下晒太阳。', vector: { dormancy: 3 } },
      { id: 'C', text: '把这里圈成自己的地盘。', vector: { territory: 3 } },
      { id: 'D', text: '呼朋唤友一起来玩。', vector: { social: 2, display: 1 } },
    ] },
  { id: 12, format: 'fantasy', context: null,
    prompt: '如果能变成一种"猎手"，你更想——',
    options: [
      { id: 'A', text: '正面追赶，一击制胜。', vector: { combat: 2, predation: 2 } },
      { id: 'B', text: '静静埋伏，等最好的时机。', vector: { vigilance: 2, dormancy: 1, predation: 1, circadian: 1 } },
      { id: 'C', text: '和同伴配合，一起围猎。', vector: { social: 2, predation: 1 } },
      { id: 'D', text: '我不想当猎手，只想安稳活着。', vector: {}, avoid: true },
    ] },
  { id: 13, format: 'fantasy', context: null,
    prompt: '如果你有一种超能力，你更想要——',
    options: [
      { id: 'A', text: '隐身，随时把自己藏起来。', vector: { vigilance: 2, dormancy: 1 } },
      { id: 'B', text: '读心，看懂每一个人。', vector: { vigilance: 2, curiosity: 1 } },
      { id: 'C', text: '飞，去任何想去的地方。', vector: { curiosity: 2, display: 1 } },
      { id: 'D', text: '分身，重要的事一件都不落下。', vector: { social: 2, hoard: 1 } },
    ] },
  { id: 14, format: 'fantasy', context: null,
    prompt: '世界末日，只准你带三样东西进避难所。你会带——',
    options: [
      { id: 'A', text: '能囤的物资，越多越好。', vector: { hoard: 3 } },
      { id: 'B', text: '最亲的那个人。', vector: { social: 3 } },
      { id: 'C', text: '工具和武器，用来自保。', vector: { vigilance: 2, combat: 1 } },
      { id: 'D', text: '一本没看过的书，解闷。', vector: { curiosity: 2, dormancy: 1 } },
    ] },
  { id: 15, format: 'fantasy', context: null,
    prompt: '你是一头猛兽，发现有人闯进了你的领地。你会——',
    options: [
      { id: 'A', text: '低吼警告，再靠近就不客气。', vector: { territory: 2, combat: 2 } },
      { id: 'B', text: '先躲起来观察，判断威胁大小。', vector: { vigilance: 2, dormancy: 1 } },
      { id: 'C', text: '召唤同伴，一起应对。', vector: { social: 2 } },
      { id: 'D', text: '换个地方，不惹麻烦。', vector: {}, avoid: true },
    ] },
  { id: 16, format: 'fantasy', context: null,
    prompt: '如果可以选一种动物的生活，你最看重它——',
    options: [
      { id: 'A', text: '有伙伴，不孤单。', vector: { social: 3 } },
      { id: 'B', text: '有自己的地盘。', vector: { territory: 3 } },
      { id: 'C', text: '自由，不被圈住。', vector: { curiosity: 2 } },
      { id: 'D', text: '漂亮、醒目，被很多人喜欢。', vector: { display: 3 } },
    ] },
  { id: 17, format: 'fantasy', context: null,
    prompt: '深夜的森林里，你最想成为——',
    options: [
      { id: 'A', text: '蹲在高处的猫头鹰，看一切。', vector: { vigilance: 2, circadian: 2 } },
      { id: 'B', text: '群居的蝙蝠，夜里才出动。', vector: { social: 2, circadian: 2 } },
      { id: 'C', text: '缩在窝里的刺猬，安全第一。', vector: { dormancy: 2, vigilance: 1 } },
      { id: 'D', text: '巡视领地的狼。', vector: { territory: 2, circadian: 1 } },
    ] },
  { id: 18, format: 'fantasy', context: null,
    prompt: '给你一个长假和一笔钱，你最想——',
    options: [
      { id: 'A', text: '出发去没去过的地方。', vector: { curiosity: 3 } },
      { id: 'B', text: '待在家里，把窝弄得舒舒服服。', vector: { territory: 2, dormancy: 1 } },
      { id: 'C', text: '和一群朋友疯玩。', vector: { social: 2, display: 1 } },
      { id: 'D', text: '存起来，以后再说。', vector: { hoard: 3 } },
    ] },

  // —— 社交 / 关系 / 群体（7 题）——
  { id: 19, format: 'social', context: null,
    prompt: '累了一整天回到家，你更想——',
    options: [
      { id: 'A', text: '找人聊聊，说说今天。', vector: { social: 2, display: 1 } },
      { id: 'B', text: '一个人安静待着，谁也别来。', vector: { dormancy: 2, circadian: 1 } },
      { id: 'C', text: '约几个朋友出来聚一聚。', vector: { social: 3 } },
      { id: 'D', text: '随便刷刷手机，放空。', vector: {}, avoid: true },
    ] },
  { id: 20, format: 'social', context: null,
    prompt: '在人群里，你通常是——',
    options: [
      { id: 'A', text: '说话最多的那个。', vector: { display: 2, social: 1 } },
      { id: 'B', text: '听得多、说得少的那个。', vector: { vigilance: 2, dormancy: 1 } },
      { id: 'C', text: '张罗全局、照顾大家的那个。', vector: { social: 3 } },
      { id: 'D', text: '待一会儿就想溜的那个。', vector: {}, avoid: true },
    ] },
  { id: 21, format: 'social', context: null,
    prompt: '你更看重哪种关系——',
    options: [
      { id: 'A', text: '一群人的热闹。', vector: { social: 3 } },
      { id: 'B', text: '一两个深交，足够。', vector: { social: 1, territory: 2 } },
      { id: 'C', text: '并肩作战的伙伴。', vector: { combat: 2, social: 1 } },
      { id: 'D', text: '独来独往，关系随缘。', vector: {} },
    ] },
  { id: 22, format: 'social', context: null,
    prompt: '朋友遇到麻烦，你更可能——',
    options: [
      { id: 'A', text: '第一时间冲过去帮忙。', vector: { social: 2, combat: 1 } },
      { id: 'B', text: '冷静帮 ta 分析，想解决办法。', vector: { vigilance: 2, curiosity: 1 } },
      { id: 'C', text: '陪在身边，听 ta 说。', vector: { social: 2, dormancy: 1 } },
      { id: 'D', text: '看情况，不熟的就算了。', vector: {}, avoid: true },
    ],
    followUp: {
      prompt: '事情比想象中麻烦，可能把你拖进去。你会——',
      options: [
        { id: 'A', text: '还是帮到底，朋友一场。', vector: { social: 2, combat: 1 } },
        { id: 'B', text: '量力而行，帮不了就直说。', vector: { vigilance: 2 } },
        { id: 'C', text: '先帮 ta 稳住，再想办法。', vector: { social: 1, territory: 1 } },
        { id: 'D', text: '找借口抽身，别惹上事。', vector: {}, avoid: true },
      ],
    },
  },
  { id: 23, format: 'social', context: null,
    prompt: '团队合作时，你更愿意——',
    options: [
      { id: 'A', text: '当那个拍板的人。', vector: { combat: 2, display: 1 } },
      { id: 'B', text: '当那个默默做事的人。', vector: { dormancy: 1, territory: 1 } },
      { id: 'C', text: '当那个协调、调动大家的人。', vector: { social: 3 } },
      { id: 'D', text: '自己单干更舒服。', vector: {} },
    ] },
  { id: 24, format: 'social', context: null,
    prompt: '你多久需要一次社交——',
    options: [
      { id: 'A', text: '几乎每天，离不开人。', vector: { social: 3 } },
      { id: 'B', text: '偶尔聚聚就好，多了累。', vector: { dormancy: 2 } },
      { id: 'C', text: '很少主动，但别人约也不拒绝。', vector: { social: 1 } },
      { id: 'D', text: '能不见就不见，一个人最好。', vector: {} },
    ] },
  { id: 25, format: 'social', context: null,
    prompt: '一群人讨论，你更常——',
    options: [
      { id: 'A', text: '抢先说出自己的观点。', vector: { display: 2, predation: 1 } },
      { id: 'B', text: '等大家都说完再补充。', vector: { vigilance: 1, dormancy: 1 } },
      { id: 'C', text: '把话题往自己擅长的地方引。', vector: { display: 1, curiosity: 1 } },
      { id: 'D', text: '静静听着，偶尔点点头。', vector: {}, avoid: true },
    ] },

  // —— 内心 / 独处 / 回忆（10 题）——
  { id: 26, format: 'inner', context: null,
    prompt: '一天里，你最有精神、最有灵感的时刻是——',
    options: [
      { id: 'A', text: '深夜，越夜越清醒。', vector: { circadian: 3 } },
      { id: 'B', text: '清晨，一天刚开始时。', vector: {} },
      { id: 'C', text: '下午，忙起来才进入状态。', vector: { predation: 1 } },
      { id: 'D', text: '不定，看情况。', vector: {} },
    ] },
  { id: 27, format: 'inner', context: null,
    prompt: '一个人待着的时候，你更常——',
    options: [
      { id: 'A', text: '想东想西，思绪停不下来。', vector: { vigilance: 2, curiosity: 1 } },
      { id: 'B', text: '放空，什么都不想。', vector: { dormancy: 2 } },
      { id: 'C', text: '计划下一步，把以后的事理一理。', vector: { hoard: 2, territory: 1 } },
      { id: 'D', text: '怀念过去的人和事。', vector: { social: 2, territory: 1 } },
    ] },
  { id: 28, format: 'inner', context: null,
    prompt: '你的内心更像——',
    options: [
      { id: 'A', text: '一座热闹的城，人来人往。', vector: { social: 2, display: 1 } },
      { id: 'B', text: '一片安静的海，深不见底。', vector: { dormancy: 2, circadian: 1 } },
      { id: 'C', text: '一片开阔的原野，想跑出去。', vector: { curiosity: 2, predation: 1 } },
      { id: 'D', text: '一个熟悉的窝，暖暖的。', vector: { territory: 3 } },
    ] },
  { id: 29, format: 'inner', context: null,
    prompt: '深夜失眠的时候，你会——',
    options: [
      { id: 'A', text: '起来做点事，反正也睡不着。', vector: { circadian: 2, predation: 1 } },
      { id: 'B', text: '越躺越清醒，想很多白天没空想的事。', vector: { circadian: 2, vigilance: 1 } },
      { id: 'C', text: '翻来覆去，想尽办法逼自己睡。', vector: {} },
      { id: 'D', text: '打开手机找人聊两句。', vector: { social: 1, circadian: 1 } },
    ] },
  { id: 30, format: 'inner', context: null,
    prompt: '你最常有的状态是——',
    options: [
      { id: 'A', text: '时刻留意周围的人和变化。', vector: { vigilance: 3 } },
      { id: 'B', text: '沉浸在自己的世界里。', vector: { dormancy: 2 } },
      { id: 'C', text: '总惦记着还有什么事没做完。', vector: { hoard: 2, predation: 1, circadian: 1 } },
      { id: 'D', text: '对什么都提不起精神。', vector: {}, avoid: true },
    ] },
  { id: 31, format: 'inner', context: null,
    prompt: '关于"自己"，你更认同哪一句——',
    options: [
      { id: 'A', text: '我是一匹拴不住的野马。', vector: { curiosity: 2, combat: 1 } },
      { id: 'B', text: '我是守着灯的人，等该回来的人。', vector: { territory: 2, social: 2 } },
      { id: 'C', text: '我是夜里最清醒的那个。', vector: { circadian: 3 } },
      { id: 'D', text: '我是站在高处的那个，看得很远。', vector: { predation: 2, display: 1 } },
    ] },
  { id: 32, format: 'inner', context: null,
    prompt: '你更害怕哪种感觉——',
    options: [
      { id: 'A', text: '被人群遗忘、不被看见。', vector: { display: 2, social: 1 } },
      { id: 'B', text: '被困在原地，哪里也去不了。', vector: { curiosity: 2 } },
      { id: 'C', text: '手头没有准备，措手不及。', vector: { hoard: 2, vigilance: 1 } },
      { id: 'D', text: '安静下来，只剩自己一个人。', vector: { social: 2 } },
    ] },
  { id: 33, format: 'inner', context: null,
    prompt: '回想过去，你印象最深的往往是——',
    options: [
      { id: 'A', text: '和一群人的热闹时刻。', vector: { social: 3 } },
      { id: 'B', text: '自己咬牙扛过来的艰难时刻。', vector: { combat: 2, predation: 1 } },
      { id: 'C', text: '某个安静的、属于自己的瞬间。', vector: { dormancy: 2, circadian: 1 } },
      { id: 'D', text: '得到认可、被看见的高光时刻。', vector: { display: 3 } },
    ] },
  { id: 34, format: 'inner', context: null,
    prompt: '你心里最想要的，是——',
    options: [
      { id: 'A', text: '一个安稳的窝。', vector: { territory: 3 } },
      { id: 'B', text: '一群靠得住的人。', vector: { social: 3 } },
      { id: 'C', text: '一片能自由奔跑的天地。', vector: { curiosity: 2, combat: 1 } },
      { id: 'D', text: '一个让人记住我的名字。', vector: { display: 3 } },
    ] },
  { id: 35, format: 'inner', context: null,
    prompt: '你对"变化"的态度，更接近——',
    options: [
      { id: 'A', text: '有点慌，希望一切别变。', vector: { territory: 2, vigilance: 1 } },
      { id: 'B', text: '兴奋，新的东西才有意思。', vector: { curiosity: 3 } },
      { id: 'C', text: '先观察，看清了再动。', vector: { vigilance: 2, dormancy: 1 } },
      { id: 'D', text: '无所谓，怎么都行。', vector: {}, avoid: true },
    ] },

  // —— 投入 / 取舍 / 扛事（6 题）——
  { id: 36, format: 'commitment', context: null,
    prompt: '面对一个想要的机会，你更可能——',
    options: [
      { id: 'A', text: '主动争取，先下手为强。', vector: { predation: 3 } },
      { id: 'B', text: '观察别人先动，等时机成熟再上。', vector: { vigilance: 2, dormancy: 1 } },
      { id: 'C', text: '准备好了再出手，一击即中。', vector: { vigilance: 1, predation: 1, hoard: 1 } },
      { id: 'D', text: '随缘，是我的跑不掉。', vector: {}, avoid: true },
    ] },
  { id: 37, format: 'commitment', context: null,
    prompt: '一件很难、但必须有人扛的事摆在那。你会——',
    options: [
      { id: 'A', text: '主动站出来扛。', vector: { combat: 3 } },
      { id: 'B', text: '衡量自己扛不扛得动，再决定。', vector: { vigilance: 2, hoard: 1 } },
      { id: 'C', text: '拉上大家一起扛。', vector: { social: 2 } },
      { id: 'D', text: '能躲就躲，让更有能力的人上。', vector: {}, avoid: true },
    ] },
  { id: 38, format: 'commitment', context: null,
    prompt: '为了一个重要目标，你愿意——',
    options: [
      { id: 'A', text: '牺牲休息和娱乐，全力冲。', vector: { predation: 2, combat: 1, circadian: 1 } },
      { id: 'B', text: '慢慢来，稳扎稳打地磨。', vector: { dormancy: 2, territory: 1 } },
      { id: 'C', text: '先囤足资源，再动手。', vector: { hoard: 3 } },
      { id: 'D', text: '走一步看一步。', vector: {}, avoid: true },
    ] },
  { id: 39, format: 'commitment', context: null,
    prompt: '有人当面说"这事你不行"。你会——',
    options: [
      { id: 'A', text: '正面怼回去，证明给他看。', vector: { combat: 3 } },
      { id: 'B', text: '心里憋着一股劲，默默做出成绩。', vector: { predation: 2, dormancy: 1 } },
      { id: 'C', text: '好好解释，争取理解。', vector: { social: 1, display: 1 } },
      { id: 'D', text: '算了，不值得。', vector: {}, avoid: true },
    ],
    followUp: {
      prompt: '结果证明你是对的。那个人又来套近乎。你会——',
      options: [
        { id: 'A', text: '不冷不热，把界限划清楚。', vector: { territory: 2, vigilance: 1 } },
        { id: 'B', text: '一笑而过，既往不咎。', vector: { social: 2, dormancy: 1 } },
        { id: 'C', text: '当面把旧账翻出来说清楚。', vector: { combat: 2 } },
        { id: 'D', text: '懒得理，装没看见。', vector: {}, avoid: true },
      ],
    },
  },
  { id: 40, format: 'commitment', context: null,
    prompt: '一个会影响你很久的决定，你会——',
    options: [
      { id: 'A', text: '凭直觉，快速定下来。', vector: { predation: 1, combat: 1 } },
      { id: 'B', text: '反复权衡，列清利弊。', vector: { vigilance: 2, hoard: 1 } },
      { id: 'C', text: '问问身边信任的人。', vector: { social: 2 } },
      { id: 'D', text: '拖着，能晚点定就晚点。', vector: {}, avoid: true },
    ] },
  { id: 41, format: 'commitment', context: null,
    prompt: '你已经投入很多，却突然发现方向可能错了。你会——',
    options: [
      { id: 'A', text: '及时止损，果断换方向。', vector: { predation: 2, curiosity: 1 } },
      { id: 'B', text: '再坚持一下，也许能成。', vector: { combat: 2, hoard: 1 } },
      { id: 'C', text: '先停下来，想清楚到底错在哪。', vector: { vigilance: 2, dormancy: 1 } },
      { id: 'D', text: '心里难受，想找个人说说。', vector: { social: 1 } },
    ] },

  // —— 欲望 / 野心 / 诱惑（7 题）——
  { id: 42, format: 'desire', context: null,
    prompt: '关于钱和资源，你更接近——',
    options: [
      { id: 'A', text: '习惯存一点、囤一点，有备无患。', vector: { hoard: 3 } },
      { id: 'B', text: '及时行乐，赚了就花。', vector: { display: 1 } },
      { id: 'C', text: '精打细算，规划长远。', vector: { hoard: 2, territory: 1 } },
      { id: 'D', text: '没细想过。', vector: {} },
    ] },
  { id: 43, format: 'desire', context: null,
    prompt: '你真正渴望的，是——',
    options: [
      { id: 'A', text: '被很多人看见、认可。', vector: { display: 3 } },
      { id: 'B', text: '安稳的生活，不必漂泊。', vector: { territory: 3 } },
      { id: 'C', text: '自由，想去哪就去哪。', vector: { curiosity: 2, combat: 1 } },
      { id: 'D', text: '把重要的人和事护在身后。', vector: { social: 2, combat: 1 } },
    ] },
  { id: 44, format: 'desire', context: null,
    prompt: '面对一个让你心动、但有点风险的机会，你会——',
    options: [
      { id: 'A', text: '先抓住，机会不等人。', vector: { predation: 3 } },
      { id: 'B', text: '掂量清楚再决定，稳一点。', vector: { vigilance: 2, hoard: 1 } },
      { id: 'C', text: '问问别人怎么看。', vector: { social: 1 } },
      { id: 'D', text: '心动但不敢，最后算了。', vector: {}, avoid: true },
    ] },
  { id: 45, format: 'desire', context: null,
    prompt: '你更想要哪种"赢"——',
    options: [
      { id: 'A', text: '正面击败对手的爽。', vector: { combat: 3 } },
      { id: 'B', text: '悄悄超越所有人，不声张。', vector: { predation: 2 } },
      { id: 'C', text: '和伙伴一起赢。', vector: { social: 2 } },
      { id: 'D', text: '别人真心觉得我厉害。', vector: { display: 2, social: 1 } },
    ] },
  { id: 46, format: 'desire', context: null,
    prompt: '你羡慕的人，通常是——',
    options: [
      { id: 'A', text: '活得特别自由、到处闯荡的。', vector: { curiosity: 2 } },
      { id: 'B', text: '有名、被很多人认识的。', vector: { display: 3 } },
      { id: 'C', text: '有自己一方天地、稳稳当当的。', vector: { territory: 3 } },
      { id: 'D', text: '身边总有一群死党的。', vector: { social: 3 } },
    ] },
  { id: 47, format: 'desire', context: null,
    prompt: '对你来说，"拥有"什么最重要——',
    options: [
      { id: 'A', text: '拥有关系和陪伴。', vector: { social: 3 } },
      { id: 'B', text: '拥有自己的地盘和底气。', vector: { territory: 2, hoard: 1 } },
      { id: 'C', text: '拥有自由和选择的权力。', vector: { curiosity: 2, combat: 1 } },
      { id: 'D', text: '拥有一个被记住的名字。', vector: { display: 2, predation: 1 } },
    ] },
  { id: 48, format: 'desire', context: null,
    prompt: '你心里憋着一股劲的时候，通常是——',
    options: [
      { id: 'A', text: '有人看不起我，我要证明。', vector: { combat: 2, display: 1 } },
      { id: 'B', text: '想要的东西还没到手。', vector: { predation: 2 } },
      { id: 'C', text: '想给在意的人更好的生活。', vector: { social: 2, hoard: 1 } },
      { id: 'D', text: '其实很少憋着，随缘。', vector: {}, avoid: true },
    ] },
];
