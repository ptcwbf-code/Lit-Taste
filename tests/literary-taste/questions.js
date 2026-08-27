// 48 道情境题（题库）。全部为 4 选项，无二选一；前端支持每题选 1–2 项。
//
// 本版是"去读书化"：不问"你喜不喜欢读什么"，而问"在这种处境里你会怎么做 / 怎么想"。
//
// 题型 format（供 server.js 分层抽样）：
//   reality     现实处境（两难 / 抉择 / 有限时间）
//   fantasy     虚拟情境（悬念 / 奇诡 / 能力 / 时间）
//   social      社会与他人（不公 / 关系 / 边界）
//   inner       情绪与意义（余味 / 独处 / 强刺激 / 失眠）
//   commitment  投入与耐心（专项测 patience，共 6 题）
//   desire      诱惑与渴求（专项测 desire，共 7 题）
//
// 10 核心：narrative 叙事 / lyric 抒情 / psychology 心理 / imagination 想象
//          society 社会 / philosophy 哲思 / form 形式 / readability 轻快 / humor 幽默 / desire 欲望
// 2 隐藏：ambiguity 歧义容忍 / intensity 情绪强度
//
// 向量净化原则（务必保持，改题文字时不要破坏）：
//   - 每个选项只主攻 1–2 个维度，系数 ±2 / ±3，砍掉"撒胡椒面"式的小尾巴。
//   - narrative 只测"想知道后续 / 完整经过 / 下一步"，不测"查清真相 / 求证"，
//     也不测"兴致来了 / 半途而废"这类动机。凡"需要真相 / 确定性"一律只标 ambiguity（负向）。
//   - readability 只测"轻快 / 直接 / 务实 / 速决 / 向前看"——是主动的偏好，不是回避。
//     凡"翻篇 / 绕开 / 划走 / 不深究"的选项，标 avoid:true + hidden.intensity（负向）。
//     注意区分："往前看 / 不纠结"是 readability，"绕开 / 躲开一个具体刺激"才是 avoid。
//   - society 只测"关心更大的世界 / 时代 / 群体 / 他人处境"，不测"帮人 / 利他"。
//   - humor 测"反讽 / 自嘲 / 调侃 / 觉得荒诞好笑"。
//   - desire 测"渴求 / 诱惑 / 占有 / 求而不得"，集中在 desire 题型，部分情境题也会触及。
//   - ambiguity 正负触及均衡；intensity 正负均衡。
//   - patience 只出现在 commitment 题型，其余题型不写。

module.exports = [
  // —— 现实处境（6 题）——
  { id: 1, format: 'reality', context: null,
    prompt: '你一直很敬重的一个人，被翻出一件陈年旧事——不光彩，但没直接伤害过谁。你会？',
    options: [
      { id: 'A', text: '先把整件事查清楚，要一个确定的事实，不急着下结论。', vector: {}, hidden: { ambiguity: -2 } },
      { id: 'B', text: '先想想：ta 当年走到那一步，有多少是那个时代、那个环境造成的。', vector: { society: 2 } },
      { id: 'C', text: '忍不住自嘲一句：原来谁的人生，都经不起这么细看。', vector: { humor: 2, philosophy: 1 } },
      { id: 'D', text: '当作没这回事，别让它搅乱你的生活。', vector: {}, avoid: true, hidden: { intensity: -1 } },
    ] },
  { id: 2, format: 'reality', context: null,
    prompt: '如果给你一整年，完全自由、没有负担，但一年后一切归零。你会怎么过？',
    options: [
      { id: 'A', text: '先排一份计划，把这一年用得有条理、最有价值。', vector: { form: 3 } },
      { id: 'B', text: '先离开熟悉的一切，看自己会变成什么样。', vector: { imagination: 3 } },
      { id: 'C', text: '去关注一个更大的问题，为它做点什么，留下一点改变。', vector: { society: 3 } },
      { id: 'D', text: '回到某个念念不忘的地方，把没来得及感受的，慢慢补回来。', vector: { lyric: 3, desire: 1 } },
    ] },
  { id: 3, format: 'reality', context: null,
    prompt: '你站在人生的一个岔路口，两条路都通向未知，没有人能告诉你哪条是对的。你会？',
    options: [
      { id: 'A', text: '先把利弊列清楚，把每条路可能的结果都推演一遍。', vector: { form: 3 }, hidden: { ambiguity: -1 } },
      { id: 'B', text: '选那条更让我兴奋、更没被人走过的路。', vector: { imagination: 2 }, hidden: { ambiguity: 2 } },
      { id: 'C', text: '去听听走过类似路的人，他们后来怎么样了。', vector: { society: 2, narrative: 2 } },
      { id: 'D', text: '心里发虚，希望有个人直接告诉我该走哪条。', vector: {}, hidden: { ambiguity: -2 } },
    ] },
  { id: 4, format: 'reality', context: null,
    prompt: '你在旧书页里，翻到一张夹了几十年的照片，上面的人你已想不起名字。你会？',
    options: [
      { id: 'A', text: '努力回想 ta 是谁，那段日子后来怎么样了。', vector: { psychology: 2, narrative: 2 } },
      { id: 'B', text: '有点怅然，觉得时间过得真快。', vector: { lyric: 2 } },
      { id: 'C', text: '想：我们这一生，究竟会忘记多少人。', vector: { philosophy: 2 } },
      { id: 'D', text: '会去想：那是一个怎样的时代，照片里这个人那一代，都经历了些什么。', vector: { society: 3 } },
    ] },
  { id: 5, format: 'reality', context: null,
    prompt: '手头压着好几件重要的事，可时间只够做其中一部分。你会？',
    options: [
      { id: 'A', text: '先把它们摊开，排一个清清楚楚的先后。', vector: { form: 2 } },
      { id: 'B', text: '直接挑最急的那件先做，剩下的走一步看一步。', vector: { readability: 3 } },
      { id: 'C', text: '先停下来问自己：到底哪一件，才是真正重要的。', vector: { philosophy: 2 } },
      { id: 'D', text: '干脆换一种从没试过的方式，重新来过。', vector: { imagination: 2 } },
    ] },
  { id: 6, format: 'reality', context: null,
    prompt: '一个不算熟的人，突然求你做一件挺麻烦、又费神的事。你会？',
    options: [
      { id: 'A', text: '先问清楚到底是怎么回事，再决定怎么帮。', vector: {}, hidden: { ambiguity: -2 } },
      { id: 'B', text: '心一软，能体会 ta 的难，就答应了。', vector: { psychology: 3 } },
      { id: 'C', text: '想：这世上有那么多人，ta 为什么偏偏找上我。', vector: { psychology: 2, philosophy: 1 } },
      { id: 'D', text: '帮 ta 把事情拆成一步步，理出一个能执行的方案。', vector: { form: 3 } },
    ] },

  // —— 虚拟情境（9 题）——
  { id: 7, format: 'fantasy', context: null,
    prompt: '旧信箱的底部，躺着一封寄给你的信，寄出日期，却是三十年后。你会？',
    options: [
      { id: 'A', text: '迫不及待想知道：信里写了什么，接下来会发生什么。', vector: { narrative: 3 } },
      { id: 'B', text: '先不拆，反反复复地想：为什么偏偏是我。', vector: { philosophy: 3 }, hidden: { ambiguity: 2 } },
      { id: 'C', text: '拆开它，看看未来的自己，究竟说了些什么。', vector: { imagination: 2, narrative: 1 } },
      { id: 'D', text: '觉得是恶作剧，随手丢进废纸篓。', vector: {}, avoid: true, hidden: { intensity: -1, ambiguity: -2 } },
    ] },
  { id: 8, format: 'fantasy', context: null,
    prompt: '你每天坐的那班地铁，某天你发现，它的终点站在地图上根本不存在。你会？',
    options: [
      { id: 'A', text: '兴奋起来：这世界，比我想的有意思多了。', vector: { imagination: 3 }, hidden: { ambiguity: 1 } },
      { id: 'B', text: '心里发毛：那这些年，我究竟被载去了哪里。', vector: { philosophy: 2, psychology: 2 } },
      { id: 'C', text: '觉得挺荒诞、有点好笑：这世界跟我开起玩笑了。', vector: { humor: 3 }, hidden: { ambiguity: 1 } },
      { id: 'D', text: '当作看错了，照旧上车，照旧生活。', vector: {}, avoid: true, hidden: { intensity: -1, ambiguity: -2 } },
    ] },
  { id: 9, format: 'fantasy', context: null,
    prompt: '你可以重新经历过去的某个时刻，但不能改变任何事，只能再感受一次。你会？',
    options: [
      { id: 'A', text: '选一个关键的选择，好奇如果当时不一样，现在会怎样。', vector: { narrative: 3 } },
      { id: 'B', text: '选一个我从未经历过的可能，看那会是什么样。', vector: { imagination: 3 } },
      { id: 'C', text: '选一个最平常的日子，想弄明白自己当时的心境。', vector: { philosophy: 2 } },
      { id: 'D', text: '选一个再也回不去的地方，再闻一次那时的空气。', vector: { lyric: 3, desire: 1 } },
    ] },
  { id: 10, format: 'fantasy', context: null,
    prompt: '你得到一次机会，能听见一个人此刻心里最真实的一句话，但一生只有这一次。你会？',
    options: [
      { id: 'A', text: '留到那个我最放不下的人，再问。', vector: { psychology: 2, desire: 1 } },
      { id: 'B', text: '想听一个已经离开的人，最后想对我说的。', vector: { lyric: 2 } },
      { id: 'C', text: '拿去听一个能影响很多人的人，此刻的真心。', vector: { society: 2, philosophy: 1 } },
      { id: 'D', text: '更好奇：听见之后，我会变成什么样。', vector: { imagination: 2, narrative: 1 }, hidden: { ambiguity: 1 } },
    ] },
  { id: 11, format: 'fantasy', context: null,
    prompt: '你有一张地图，能去任何想去的地方，但一生只能用三次。你会？',
    options: [
      { id: 'A', text: '先规划这三次，把它们用在最值得的地方。', vector: { form: 3 } },
      { id: 'B', text: '留一次给"最想逃离一切"的那个瞬间，其余随缘。', vector: { imagination: 2, philosophy: 1, desire: 1 } },
      { id: 'C', text: '去一个只存在于地图上的地方，看它是不是真的。', vector: { imagination: 3 } },
      { id: 'D', text: '不太敢要，怕用完三次，反而更失落。', vector: {}, avoid: true, hidden: { intensity: -1, ambiguity: -1 } },
    ] },
  { id: 12, format: 'fantasy', context: null,
    prompt: '你在镜子里，看见的是未来的自己。ta 只是静静看着你，一句话也不说。你会？',
    options: [
      { id: 'A', text: '盯着 ta 的眼睛，想读出 ta 想告诉我、又不敢说的。', vector: { psychology: 3 }, hidden: { ambiguity: 2 } },
      { id: 'B', text: '忍不住对 ta 做个鬼脸，想逗逗未来的自己。', vector: { humor: 2, imagination: 1 } },
      { id: 'C', text: '心里发毛，先把视线移开。', vector: {}, avoid: true, hidden: { intensity: -1, ambiguity: -2 } },
      { id: 'D', text: '想：站在这儿的"我"，和镜子里那个，谁才是真的。', vector: { philosophy: 3 }, hidden: { ambiguity: 2 } },
    ] },
  { id: 13, format: 'fantasy', context: null,
    prompt: '有一座桥，只在起雾的夜里出现。走上去的人，有的回来了，有的没有。你会？',
    options: [
      { id: 'A', text: '想走一次——哪怕不知道对面是什么。', vector: { imagination: 3, narrative: 1 }, hidden: { ambiguity: 2 } },
      { id: 'B', text: '先不冲动，在岸边观察打听，摸清规律。', vector: {}, hidden: { ambiguity: -2 } },
      { id: 'C', text: '觉得它美得不像真的，只想远远地看。', vector: { lyric: 2 } },
      { id: 'D', text: '绕开走，不碰这种说不清的东西。', vector: {}, avoid: true, hidden: { intensity: -1, ambiguity: -2 } },
    ] },
  { id: 14, format: 'fantasy', context: null,
    prompt: '你忽然能听懂植物说话，可它们说的，都是些无关紧要的小事。你会？',
    options: [
      { id: 'A', text: '觉得有趣，开始跟每一株植物聊天。', vector: { imagination: 2, lyric: 1 } },
      { id: 'B', text: '想：这个能力哪来的，它想让我明白什么。', vector: { philosophy: 2, psychology: 1 }, hidden: { ambiguity: 1 } },
      { id: 'C', text: '把它们的低语记下来，也许藏着什么规律。', vector: {}, hidden: { ambiguity: -2 } },
      { id: 'D', text: '觉得太吵，只盼它们安静下来。', vector: {}, avoid: true, hidden: { intensity: -1 } },
    ] },
  { id: 15, format: 'fantasy', context: null,
    prompt: '你误入一座地图上没有的小镇，镇上的人好像都认得你，而你一个也不认识。你会？',
    options: [
      { id: 'A', text: '很好奇：我在这里到底有一个怎样的故事，接下来会发生什么。', vector: { narrative: 3 }, hidden: { ambiguity: 1 } },
      { id: 'B', text: '立刻想离开，回到自己熟悉的地方。', vector: {}, avoid: true, hidden: { intensity: -1, ambiguity: -2 } },
      { id: 'C', text: '留下来，一个个问清，这些人到底是谁。', vector: {}, hidden: { ambiguity: -2 } },
      { id: 'D', text: '退到一旁，静静看这座小镇如何运转。', vector: { society: 2, form: 1 } },
    ] },

  // —— 社会与他人（5 题）——
  { id: 16, format: 'social', context: null,
    prompt: '一则让你愤怒的社会新闻，正在传开。你会？',
    options: [
      { id: 'A', text: '转发并说出看法，想让更多人看见。', vector: { society: 3 } },
      { id: 'B', text: '想挖出背后那套制度、那股力量，到底是什么。', vector: { philosophy: 2, society: 1 } },
      { id: 'C', text: '为新闻里那个具体的人难过，很久缓不过来。', vector: { psychology: 2, lyric: 1 } },
      { id: 'D', text: '觉得这新闻荒诞得像段子，可笑着笑着又有点难过。', vector: { humor: 2 } },
    ] },
  { id: 17, format: 'social', context: null,
    prompt: '一场聚会，话题从八卦滑到房价，又滑到理想。你会？',
    options: [
      { id: 'A', text: '聊到现实和社会时，最来劲。', vector: { society: 3 } },
      { id: 'B', text: '更喜欢听每个人背后的故事和心事。', vector: { psychology: 2, lyric: 1 } },
      { id: 'C', text: '在大家天马行空、胡说八道时最开心。', vector: { humor: 3 } },
      { id: 'D', text: '更喜欢有主题、有节奏的聚会，散了也有个说法。', vector: { form: 3 } },
    ] },
  { id: 18, format: 'social', context: null,
    prompt: '你听见别人在背后谈起你，像在谈一个你完全不认识的人。你会？',
    options: [
      { id: 'A', text: '想弄明白，他们为什么用那样的眼光看我。', vector: { psychology: 2 } },
      { id: 'B', text: '心里不痛快，想当面问个清楚。', vector: { readability: 2 }, hidden: { ambiguity: -1 } },
      { id: 'C', text: '忍不住自嘲：原来我在别人眼里，是这么个形象。', vector: { humor: 2 } },
      { id: 'D', text: '随它去，不往心里搁。', vector: {}, avoid: true, hidden: { intensity: -1 } },
    ] },
  { id: 19, format: 'social', context: null,
    prompt: '朋友陷入困境，向你借一笔不小的钱，而你知道，这笔钱很可能还不回来。你会？',
    options: [
      { id: 'A', text: '先问清楚 ta 到底遇到了什么、需要多少。', vector: { psychology: 2 } },
      { id: 'B', text: '心里先自嘲：这一借出去，人和钱怕是都留不住了。', vector: { humor: 2 } },
      { id: 'C', text: '愿意帮，但借条、还法都写清楚。', vector: { form: 2 } },
      { id: 'D', text: '为难，怕伤了情分，还是委婉推掉。', vector: {}, avoid: true, hidden: { intensity: -1 } },
    ] },
  { id: 20, format: 'social', context: null,
    prompt: '一起共事的人里，有人总在拖后腿，而 ta 又是你的朋友。年底的评价，会因此拖累你们所有人。你会？',
    options: [
      { id: 'A', text: '私下找 ta 聊，弄清是能力问题，还是心里有事。', vector: { psychology: 2 } },
      { id: 'B', text: '为了整件事能成，把情况直接跟负责人讲明。', vector: { form: 2 } },
      { id: 'C', text: '忍不住在心里吐槽：摊上这么个队友，算我倒霉。', vector: { humor: 2 } },
      { id: 'D', text: '心里很烦，又不想撕破脸，先忍着。', vector: {}, avoid: true, hidden: { intensity: -1 } },
    ] },

  // —— 情绪与意义（9 题）——
  { id: 21, format: 'inner', context: null,
    prompt: '散场了。你从电影院里走出来，那部片子的余味还在胸口翻涌。你会？',
    options: [
      { id: 'A', text: '马上跟同行的人聊，把那种感觉说出来。', vector: { lyric: 3 } },
      { id: 'B', text: '一路沉默，一个人慢慢消化那份余味。', vector: { psychology: 3 }, hidden: { intensity: 2 } },
      { id: 'C', text: '跟同伴吐槽：这片子，槽点和泪点一样多。', vector: { humor: 2 } },
      { id: 'D', text: '很想知道：如果故事继续，接下来会发生什么。', vector: { narrative: 3 } },
    ] },
  { id: 22, format: 'inner', context: null,
    prompt: '朋友突然问你："人活着，到底有什么意义？" 你的第一反应是？',
    options: [
      { id: 'A', text: '认真跟 ta 往下聊，这个问题值得想。', vector: { philosophy: 3 } },
      { id: 'B', text: '觉得想这些，不如把手头的事做好。', vector: { readability: 2 } },
      { id: 'C', text: '想起自己某个瞬间，也这样问过自己。', vector: { psychology: 2, philosophy: 1 } },
      { id: 'D', text: '开玩笑岔过去，别把气氛弄得那么沉重。', vector: { humor: 2 } },
    ] },
  { id: 23, format: 'inner', context: null,
    prompt: '一个完全空出来的下午，天光很好，也没人找你。你会？',
    options: [
      { id: 'A', text: '翻旧照片、旧消息，把过去的事慢慢过一遍。', vector: { psychology: 3, desire: 1 } },
      { id: 'B', text: '幻想一些从没发生、甚至不可能发生的事。', vector: { imagination: 3 } },
      { id: 'C', text: '列个清单，把一直拖着的事一件件做掉。', vector: { form: 2 } },
      { id: 'D', text: '放一张老唱片，或看部老电影，让情绪沉进去。', vector: { lyric: 3 } },
    ] },
  { id: 24, format: 'inner', context: null,
    prompt: '你看了一出悲剧，主角一路失去所有，结局没有任何补偿。你的感受更接近？',
    options: [
      { id: 'A', text: '被狠狠击中，甚至想再看一遍。', vector: { psychology: 2 }, hidden: { intensity: 3 } },
      { id: 'B', text: '胸口堵得慌，要缓很久才缓得过来。', vector: { psychology: 2 }, hidden: { intensity: 1 } },
      { id: 'C', text: '觉得太苦了，本能地想把视线挪开。', vector: {}, avoid: true, hidden: { intensity: -2 } },
      { id: 'D', text: '忍不住追问：命运凭什么这样对待他。', vector: { philosophy: 2 }, hidden: { intensity: 1 } },
    ] },
  { id: 25, format: 'inner', context: null,
    prompt: '一句话、一段旋律、一个画面，毫无征兆地让你眼眶一热。那一刻你会？',
    options: [
      { id: 'A', text: '想把那种感觉留住，反复地回味。', vector: { lyric: 3, desire: 1 }, hidden: { intensity: 1 } },
      { id: 'B', text: '想弄清楚，它为什么偏偏戳中了我。', vector: { psychology: 2, philosophy: 1 } },
      { id: 'C', text: '立刻分享给那个懂的人。', vector: { lyric: 2 } },
      { id: 'D', text: '把它拆开看——这段旋律、这个画面，是怎么做到的。', vector: { form: 3 } },
    ] },
  { id: 26, format: 'inner', context: null,
    prompt: '一段很重要的关系结束了。过了很久，你最常回想的，是？',
    options: [
      { id: 'A', text: '那些没能说出口的话。', vector: { lyric: 3, desire: 1 }, hidden: { intensity: 1 } },
      { id: 'B', text: '自己当时哪里做得不够好。', vector: { psychology: 3 } },
      { id: 'C', text: '如果当初走了另一条路，现在会怎样。', vector: { imagination: 2, narrative: 2 } },
      { id: 'D', text: '很少再想，人得往前看。', vector: { readability: 2 } },
    ] },
  { id: 27, format: 'inner', context: null,
    prompt: '深夜，灯都关了，你却睡不着。脑子最常转的，是？',
    options: [
      { id: 'A', text: '把一部没看完的故事，在脑子里接着往下想。', vector: { narrative: 3 } },
      { id: 'B', text: '现编一些故事，想象各种从没发生的场景。', vector: { imagination: 3 } },
      { id: 'C', text: '一些很大、很远，又没有答案的问题。', vector: { philosophy: 3 } },
      { id: 'D', text: '脑子里蹦出一个白天尴尬的瞬间，越想越好笑。', vector: { humor: 2 } },
    ] },
  { id: 28, format: 'inner', context: null,
    prompt: '你有机会悄悄帮一个人一个大忙，却不会有任何人知道，是你做的。你会？',
    options: [
      { id: 'A', text: '会做——一想到 ta 能因此松一口气，就值得。', vector: { psychology: 2 } },
      { id: 'B', text: '会做，还想：这件事能不能帮到更多人。', vector: { society: 2 } },
      { id: 'C', text: '想：为什么"不留名"这件事，会让我纠结。', vector: { philosophy: 2 } },
      { id: 'D', text: '先想清楚怎么帮才最有效，再动手。', vector: { form: 2 } },
    ] },
  { id: 29, format: 'inner', context: null,
    prompt: '一张极具冲击力的照片撞进眼睛——灾难、战争，或某个极端的瞬间。你会？',
    options: [
      { id: 'A', text: '被它钉在原地，很久移不开眼睛。', vector: { lyric: 1 }, hidden: { intensity: 3 } },
      { id: 'B', text: '心里难受，想立刻去做点什么。', vector: { society: 2 }, hidden: { intensity: 1 } },
      { id: 'C', text: '去琢磨它的构图、光影，和按下快门的人。', vector: { form: 3 } },
      { id: 'D', text: '迅速划走，不想被它影响。', vector: {}, avoid: true, hidden: { intensity: -2 } },
    ] },

  // —— 投入与耐心（6 题，专项测 patience）——
  { id: 30, format: 'commitment', context: null,
    prompt: '有一件事，要花很久、过程未必舒服，但做完很值得——比如啃下一部大部头，或学一门硬功夫。你会？',
    options: [
      { id: 'A', text: '会一头扎进去，享受那种"熬出来"的成就感。', vector: { form: 1 }, patience: 9 },
      { id: 'B', text: '先小步试一段，有感觉了再往下走。', patience: 6 },
      { id: 'C', text: '得有个人陪着、有回报吊着，才撑得下去。', vector: { society: 1 }, patience: 4 },
      { id: 'D', text: '大概率会放弃，改选更快见效的事。', vector: { readability: 2 }, patience: 2 },
    ] },
  { id: 31, format: 'commitment', context: null,
    prompt: '有一本公认值得慢慢读的好书，但它需要你连续、安静的大块时间，才能真正读进去。你会？',
    options: [
      { id: 'A', text: '专门留出一整段不被打扰的时间，一次读进去。', vector: { form: 1 }, patience: 9 },
      { id: 'B', text: '先小段试读，真有感觉再腾大块时间。', patience: 6 },
      { id: 'C', text: '得有人一起读、有人催着，才坐得住。', vector: { society: 1 }, patience: 4 },
      { id: 'D', text: '算了，碎片时间翻点轻快的更实际。', vector: { readability: 2 }, patience: 2 },
    ] },
  { id: 32, format: 'commitment', context: null,
    prompt: '一部口碑极好的长剧，可前几集节奏很慢，铺垫一层叠着一层。你会？',
    options: [
      { id: 'A', text: '信它后面会好，耐着性子看下去。', vector: { narrative: 1 }, patience: 8 },
      { id: 'B', text: '先看几集，没感觉就弃。', vector: { readability: 1 }, patience: 4 },
      { id: 'C', text: '直接翻剧透和大结局，再决定追不追。', vector: { narrative: 3 }, patience: 3 },
      { id: 'D', text: '不追了，太慢。', vector: { readability: 2 }, patience: 2 },
    ] },
  { id: 33, format: 'commitment', context: null,
    prompt: '同样是读，你更倾向于？',
    options: [
      { id: 'A', text: '一年读透一两本，把每个角落都摸清。', vector: { form: 1 }, patience: 9 },
      { id: 'B', text: '广撒网多读，图个眼界开阔。', vector: { readability: 2 }, patience: 4 },
      { id: 'C', text: '一本为主，偶尔换换口味调剂。', patience: 6 },
      { id: 'D', text: '读不进就换，别跟自己较劲。', vector: { readability: 2 }, patience: 2 },
    ] },
  { id: 34, format: 'commitment', context: null,
    prompt: '一本旧书，重读时你常常发现第一次没注意的细节。你会愿意再读一遍吗？',
    options: [
      { id: 'A', text: '愿意，每次重读都有新的发现。', vector: { narrative: 1 }, patience: 8 },
      { id: 'B', text: '偶尔翻几页，捡回当年的那个感觉。', patience: 6 },
      { id: 'C', text: '除非特别喜欢，否则不太会重读。', vector: { readability: 1 }, patience: 4 },
      { id: 'D', text: '不重读，时间想留给没读过的。', vector: { readability: 2 }, patience: 2 },
    ] },
  { id: 35, format: 'commitment', context: null,
    prompt: '你开始了一个需要长期打磨的计划——比如写一部长篇，或做一件大作品。你会？',
    options: [
      { id: 'A', text: '享受慢慢打磨的过程，相信时间会磨出分量。', vector: { form: 2 }, patience: 9 },
      { id: 'B', text: '兴致来了就猛做一阵，热乎劲儿过了就停。', patience: 4 },
      { id: 'C', text: '找个同伴一起，互相督促着往前走。', vector: { society: 1 }, patience: 6 },
      { id: 'D', text: '迟迟不敢开始，怕做不好。', vector: {}, hidden: { intensity: -1 }, patience: 2 },
    ] },

  // —— 诱惑与渴求（5 题，专项测 desire）——
  { id: 36, format: 'desire', context: null,
    prompt: '有一件你非常想要的东西，可得到它，要付出不小的代价。你会？',
    options: [
      { id: 'A', text: '忍不住去争取，先拿到手再说。', vector: { desire: 3 } },
      { id: 'B', text: '把代价和收获列清楚，值得再动手。', vector: { form: 3 } },
      { id: 'C', text: '问自己：我到底是想要它，还是想要"得到"的感觉。', vector: { philosophy: 2 } },
      { id: 'D', text: '算了，别被一时的想要牵着走。', vector: { readability: 2 } },
    ] },
  { id: 37, format: 'desire', context: null,
    prompt: '有一件你求了很久、却始终得不到的东西。夜深人静时，你最常想起的是？',
    options: [
      { id: 'A', text: '那种"差一点就够到"的滋味，让人放不下。', vector: { desire: 3 } },
      { id: 'B', text: '自己是不是哪里还不够好，才够不到。', vector: { psychology: 2 } },
      { id: 'C', text: '也许得不到，本身就有它的道理。', vector: { philosophy: 2 } },
      { id: 'D', text: '算了，已经尽力了，人得往前看。', vector: { readability: 2 } },
    ] },
  { id: 38, format: 'desire', context: null,
    prompt: '你遇见一个很迷人、但你知道不该靠近的人。你的第一反应是？',
    options: [
      { id: 'A', text: '忍不住被吸引，想再多看几眼。', vector: { desire: 3 } },
      { id: 'B', text: '想弄清楚，这种吸引到底是什么。', vector: { psychology: 2, philosophy: 1 } },
      { id: 'C', text: '远远欣赏就好，不越界。', vector: { form: 2 } },
      { id: 'D', text: '绕开，别给自己找麻烦。', vector: {}, avoid: true, hidden: { intensity: -1 } },
    ] },
  { id: 39, format: 'desire', context: null,
    prompt: '你遇到一件美得让你心颤的东西——一幅画、一件器物、一段旋律。你的第一反应是？',
    options: [
      { id: 'A', text: '想拥有它，让它只属于我。', vector: { desire: 3 } },
      { id: 'B', text: '想把它拆开看，这美是怎么做到的。', vector: { form: 3 } },
      { id: 'C', text: '静静地看很久，舍不得走。', vector: { lyric: 3 } },
      { id: 'D', text: '看一眼就离开，怕陷进去出不来。', vector: {}, avoid: true, hidden: { intensity: -1 } },
    ] },
  { id: 40, format: 'desire', context: null,
    prompt: '你终于得到了曾经最想要的东西，却发现不过如此。你的感受更接近？',
    options: [
      { id: 'A', text: '有点空虚：原来追的，只是那个"追"的过程。', vector: { philosophy: 2 } },
      { id: 'B', text: '很快又找到了下一个想要的东西。', vector: { desire: 2 } },
      { id: 'C', text: '反复想：如果当初没得到，是不是反而更好。', vector: { psychology: 2, philosophy: 1 } },
      { id: 'D', text: '坦然接受，得到过就够了。', vector: { readability: 2 } },
    ] },
  { id: 41, format: 'desire', context: null,
    prompt: '有一件你非常想要的东西，可得到它的方式，会让你心里有点不安。你会？',
    options: [
      { id: 'A', text: '想要的感觉太强，先拿到手再说。', vector: { desire: 3 } },
      { id: 'B', text: '反复掂量：这份不安，到底在提醒我什么。', vector: { psychology: 2, philosophy: 1 } },
      { id: 'C', text: '换个更磊落的方式，看能不能也得到它。', vector: { form: 2 } },
      { id: 'D', text: '算了，来路不正的东西，不要也罢。', vector: { readability: 2 } },
    ] },
  { id: 42, format: 'desire', context: null,
    prompt: '一件你克制了很久的欲望，突然有了一个名正言顺满足它的理由。你会？',
    options: [
      { id: 'A', text: '顺水推舟，满足它这一次。', vector: { desire: 3 } },
      { id: 'B', text: '先想清楚：这理由是真的，还是我给自己找的借口。', vector: { psychology: 2, philosophy: 1 } },
      { id: 'C', text: '把利弊列清楚，看值不值得破这一次例。', vector: { form: 2 } },
      { id: 'D', text: '还是算了，破了例，怕就收不住了。', vector: { readability: 2 } },
    ] },

  // —— 补充（5 题：readability 强选项 + humor 补题）——
  { id: 43, format: 'reality', context: null,
    prompt: '同事发来一份逻辑混乱的提案，让你提意见。你会？',
    options: [
      { id: 'A', text: '开门见山，直接告诉 ta 问题出在哪。', vector: { readability: 3 } },
      { id: 'B', text: '先夸两句，再委婉地点出哪里不行。', vector: { psychology: 2 } },
      { id: 'C', text: '逐字细读，把每一处问题都标注清楚。', vector: { form: 3 } },
      { id: 'D', text: '太费劲了，先搁着，等 ta 自己改清楚再说。', vector: {}, avoid: true, hidden: { intensity: -1 } },
    ] },
  { id: 44, format: 'social', context: null,
    prompt: '你和一个朋友约好了，但 ta 临时变卦，还支支吾吾不直说。你会？',
    options: [
      { id: 'A', text: '直接问清楚：到底还来不来。', vector: { readability: 3 } },
      { id: 'B', text: '先替 ta 想：是不是遇到什么难处了。', vector: { psychology: 2 } },
      { id: 'C', text: '心里不痛快，但也不说破，先这么忍着。', vector: {}, avoid: true, hidden: { intensity: -1 } },
      { id: 'D', text: '半开玩笑点 ta 一下：你是不是想放我鸽子。', vector: { humor: 2 } },
    ] },
  { id: 45, format: 'social', context: null,
    prompt: '朋友给你看 ta 刚写的一段深情告白，但写得有点浮夸。你会？',
    options: [
      { id: 'A', text: '调侃一句："这肉麻得我鸡皮疙瘩都起来了。"', vector: { humor: 3 } },
      { id: 'B', text: '认真帮 ta 改，让它更真诚一点。', vector: { psychology: 2 } },
      { id: 'C', text: '夸两句，别的话就咽回肚子里。', vector: {}, avoid: true, hidden: { intensity: -1 } },
      { id: 'D', text: '拆开看：到底哪一句最肉麻、为什么。', vector: { form: 2 } },
    ] },
  { id: 46, format: 'inner', context: null,
    prompt: '你计划了很久的一件事，最后因为一个特别荒谬的原因搞砸了。你的第一反应是？',
    options: [
      { id: 'A', text: '忍不住笑出来：这也太讽刺了。', vector: { humor: 3 } },
      { id: 'B', text: '复盘：到底哪一步错了，下次怎么避免。', vector: { form: 2 } },
      { id: 'C', text: '很沮丧，要缓很久才缓得过来。', vector: { psychology: 2 }, hidden: { intensity: 1 } },
      { id: 'D', text: '算了，反正也不是非做不可。', vector: { readability: 2 } },
    ] },
  { id: 47, format: 'reality', context: null,
    prompt: '你和朋友聊起最近一件越看越荒诞的新闻，越聊越离谱。你会？',
    options: [
      { id: 'A', text: '顺着往下编，把它越想越离谱、越好笑。', vector: { humor: 3 } },
      { id: 'B', text: '想：这种荒诞背后，是多少人的真实处境。', vector: { society: 2 } },
      { id: 'C', text: '认真分析：这里面有没有什么规律和逻辑。', vector: { form: 2 } },
      { id: 'D', text: '没多大意思，聊点实在的吧。', vector: { readability: 2 } },
    ] },
  { id: 48, format: 'fantasy', context: null,
    prompt: '你在旧衣口袋里摸到一把铜钥匙，没有对应的锁，钥匙柄上刻着一行已经磨淡的小字。你的第一反应是？',
    options: [
      { id: 'A', text: '凑近灯下，想把那行字认出来。', vector: {}, hidden: { ambiguity: -2 } },
      { id: 'B', text: '猜它背后一定有个没讲完的故事。', vector: { narrative: 2 } },
      { id: 'C', text: '觉得有点好笑：这钥匙八成永远用不上了。', vector: { humor: 2 } },
      { id: 'D', text: '随手放回口袋，别太当真。', vector: {}, avoid: true, hidden: { intensity: -1 } },
    ],
    followUp: {
      prompt: '第二天，你在抽屉最深处摸到一个从没见过的旧木盒，上面正好有一个锁孔。你会？',
      options: [
        { id: 'A', text: '迫不及待，想马上知道盒子里装了什么。', vector: { narrative: 3 } },
        { id: 'B', text: '先不打开，反复想：它为什么偏偏落在我手里。', vector: { philosophy: 2 }, hidden: { ambiguity: 2 } },
        { id: 'C', text: '想象盒子里可能装着各种千奇百怪的东西。', vector: { imagination: 2 } },
        { id: 'D', text: '心里发毛，先把盒子放回原处。', vector: {}, avoid: true, hidden: { intensity: -1, ambiguity: -2 } },
      ],
    },
  },
];
