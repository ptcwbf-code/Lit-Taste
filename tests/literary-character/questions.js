// 48 道情境题（题库）。全部为 4 选项，单选（前端每题选 1 项）。
//
// 本包"去读书化"：不问"你喜欢什么角色 / 什么书"，而问"在这种处境里你会怎么做 / 怎么想"。
// 题干刻意让答题者"面对文学角色真实碰到过的处境"（爱情被阻、毁于一旦、遭人背叛、
// 只身扛起、与虎谋皮、求而不得……），但不点明是谁、不点名原著——没读过的人也能凭直觉答。
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
//   action 行动 / emotion 情感 / inner 内省 / dream 想象 / care 关怀
//   thought 思辨 / order 守序 / wit 幽默 / desire 欲望 / tough 坚韧
//
// 向量净化原则（务必保持，改题文字时不要破坏）：
//   - 每个选项只主攻 1–2 个维度，系数 +2 / +3（主维）+1 / +2（次维），全部非负。
//   - 不写负系数："不喜欢某倾向"通过"给对立维度加分"来表达。
//   - "回避 / 翻篇 / 不深究 / 算了 / 与我无关"的选项：vector 留空 + avoid: true，
//     用于引擎的"无偏好检测"（每 5 题里至少 1 题要有这种选项）。
//   - 每道题干净地测几个不同维度：不同选项分别指向不同倾向。
//   - 全库 4 道 followUp（追问层），规则同上。

module.exports = [
  // —— 现实生活情境（8 题）——
  { id: 1, format: 'reality', context: null,
    prompt: '你深爱一个人，可所有人都认定你们不该在一起。你会？',
    options: [
      { id: 'A', text: '不管别人怎么看，先在一起再说。', vector: { action: 3 } },
      { id: 'B', text: '反复想：我们真的能走到最后吗。', vector: { inner: 3 } },
      { id: 'C', text: '问自己：我爱的到底是这个人，还是"偏要"的那股劲。', vector: { thought: 3 } },
      { id: 'D', text: '算了，也许他们说得有道理。', vector: {}, avoid: true },
    ] },
  { id: 2, format: 'reality', context: null,
    prompt: '你苦心经营的一切，一夕之间几乎毁于一旦。你会？',
    options: [
      { id: 'A', text: '立刻想补救，能救多少救多少。', vector: { action: 2, tough: 1 } },
      { id: 'B', text: '一时万念俱灰，要缓很久才缓得过来。', vector: { emotion: 2 } },
      { id: 'C', text: '复盘：到底是哪一步埋下了祸根。', vector: { thought: 2, order: 1 } },
      { id: 'D', text: '先去看看那些也被连累的人。', vector: { care: 2 } },
    ] },
  { id: 3, format: 'reality', context: null,
    prompt: '你被推到一个只能靠你自己、再没人能帮你扛的位置上。你会？',
    options: [
      { id: 'A', text: '咬着牙把担子挑起来，把它做好。', vector: { tough: 2, order: 1 } },
      { id: 'B', text: '心里不情愿，可又不忍心看它没人管。', vector: { care: 2, emotion: 1 } },
      { id: 'C', text: '先谈清楚条件，该要的争取到位。', vector: { action: 2, desire: 1 } },
      { id: 'D', text: '表面应下，回头跟朋友狠狠吐槽。', vector: { wit: 2 } },
    ] },
  { id: 4, format: 'reality', context: null,
    prompt: '你发现最信任的人，一直在骗你。事情不大，但有点寒心。你会？',
    options: [
      { id: 'A', text: '情绪一下子翻上来，心里很难受。', vector: { emotion: 3 } },
      { id: 'B', text: '反复想：ta 为什么要骗我，从什么时候开始的。', vector: { inner: 3 } },
      { id: 'C', text: '冷笑一声：原来也就这么回事。', vector: { wit: 2 } },
      { id: 'D', text: '算了，不深究，睡一觉就过去了。', vector: {}, avoid: true },
    ],
    followUp: {
      prompt: '第二天，ta 若无其事地跟你打招呼，像什么都没发生。你会？',
      options: [
        { id: 'A', text: '当面问清楚，把话说开。', vector: { action: 2, tough: 1 } },
        { id: 'B', text: '先装作不知道，再慢慢观察。', vector: { inner: 2, wit: 1 } },
        { id: 'C', text: '心里还是难受，想找个人说说。', vector: { emotion: 2, care: 1 } },
        { id: 'D', text: '算了，当没这回事。', vector: {}, avoid: true },
      ],
    },
  },
  { id: 5, format: 'reality', context: null,
    prompt: '一件能让你飞黄腾达、但会伤到别人的机会摆在面前。你会？',
    options: [
      { id: 'A', text: '想争这个机会，先抓住再说。', vector: { desire: 2, action: 1 } },
      { id: 'B', text: '掂量：这个代价，我到底背不背得起。', vector: { inner: 2, thought: 1 } },
      { id: 'C', text: '先想想对方会多难受，下不了手。', vector: { care: 3 } },
      { id: 'D', text: '想要，但手段得干净，不干净我宁可不要。', vector: { order: 2 } },
    ] },
  { id: 6, format: 'reality', context: null,
    prompt: '你突然拥有了一大段自由、却不知该往哪去的日子。你会？',
    options: [
      { id: 'A', text: '马上给自己找点目标，把日子填满。', vector: { action: 3 } },
      { id: 'B', text: '享受这种空，让心思漫无目的地飘。', vector: { dream: 2, inner: 1 } },
      { id: 'C', text: '有点慌，觉得自己在虚度生命。', vector: { thought: 2 } },
      { id: 'D', text: '约上朋友，把空出来的时间变成相聚。', vector: { care: 2, emotion: 1 } },
    ] },
  { id: 7, format: 'reality', context: null,
    prompt: '你和一个挚友在"该不该向现实低头"上彻底谈崩。你会？',
    options: [
      { id: 'A', text: '为了理想，一步也不肯让。', vector: { dream: 3 } },
      { id: 'B', text: '认真跟他辩，把道理讲透。', vector: { thought: 3 } },
      { id: 'C', text: '用玩笑话把气氛缓和下来，别较真。', vector: { wit: 3 } },
      { id: 'D', text: '各退一步，把能一致的先一致了。', vector: { order: 2 } },
    ] },
  { id: 8, format: 'reality', context: null,
    prompt: '你做了一个决定，结果害了无辜的人，追悔莫及。你会？',
    options: [
      { id: 'A', text: '难受，久久自责，放不下。', vector: { inner: 2, emotion: 1 } },
      { id: 'B', text: '立刻去补救，尽量把伤害降到最低。', vector: { action: 2, tough: 1 } },
      { id: 'C', text: '认下这个错，把它当成交学费。', vector: { tough: 3 } },
      { id: 'D', text: '想开点，谁还没犯过错呢。', vector: {}, avoid: true },
    ] },

  // —— 奇幻 / 假设情境（10 题）——
  { id: 9, format: 'fantasy', context: null,
    prompt: '你得到一面能照见未来的镜子。你会？',
    options: [
      { id: 'A', text: '立刻照，想知道自己会变成什么样。', vector: { dream: 2, action: 1 } },
      { id: 'B', text: '不敢照，怕看见一个让自己失望的人。', vector: { inner: 2, emotion: 1 } },
      { id: 'C', text: '想：知道了未来，现在的选择还算数吗？', vector: { thought: 3 } },
      { id: 'D', text: '不照，未来还是留点悬念好。', vector: {}, avoid: true },
    ] },
  { id: 10, format: 'fantasy', context: null,
    prompt: '你被困在一个地方，没有期限，也没人告诉你为什么。你会？',
    options: [
      { id: 'A', text: '想尽办法逃出去，一刻也坐不住。', vector: { action: 2, tough: 1 } },
      { id: 'B', text: '反复想：我到底做错了什么，才落到这一步。', vector: { inner: 3 } },
      { id: 'C', text: '想：真正困住我的，到底是这堵墙，还是我自己。', vector: { thought: 2 } },
      { id: 'D', text: '先和同样被困的人互相打气，一起熬。', vector: { care: 2 } },
    ] },
  { id: 11, format: 'fantasy', context: null,
    prompt: '你可以拥有一种超能力，但只能选一种。你会选？',
    options: [
      { id: 'A', text: '预知未来，提前知道答案。', vector: { thought: 2, order: 1 } },
      { id: 'B', text: '读心，看透别人真实的想法。', vector: { inner: 3 } },
      { id: 'C', text: '飞天入地、力大无穷，去改变世界。', vector: { action: 2, care: 1 } },
      { id: 'D', text: '隐身，躲在人群里看热闹。', vector: { wit: 2 } },
    ] },
  { id: 12, format: 'fantasy', context: null,
    prompt: '一条路通向已知的安稳，另一条通向未知的奇遇。你会？',
    options: [
      { id: 'A', text: '走未知那条，未知才让人兴奋。', vector: { dream: 2, action: 1 } },
      { id: 'B', text: '先停下来想很久，把两条路都推演一遍。', vector: { inner: 2, thought: 1 } },
      { id: 'C', text: '问问同行的人，听听他们怎么想。', vector: { care: 2 } },
      { id: 'D', text: '走安稳那条，不想冒险。', vector: {}, avoid: true },
    ] },
  { id: 13, format: 'fantasy', context: null,
    prompt: '你忽然能听懂动物的心事。你会？',
    options: [
      { id: 'A', text: '好奇地跟它们聊，想知道它们在烦什么。', vector: { dream: 2, care: 1 } },
      { id: 'B', text: '被它们那些细腻的小情绪打动。', vector: { emotion: 3 } },
      { id: 'C', text: '想：人和动物，到底谁更自由？', vector: { thought: 2 } },
      { id: 'D', text: '把它们的秘密悄悄记下来，慢慢琢磨。', vector: { inner: 2 } },
    ] },
  { id: 14, format: 'fantasy', context: null,
    prompt: '你一直视若珍宝、深信不疑的东西，某天发现它并不像你想的那样。你会？',
    options: [
      { id: 'A', text: '不肯相信，宁可继续守着它。', vector: { dream: 2, desire: 1 } },
      { id: 'B', text: '心碎，像被抽走了什么。', vector: { emotion: 3 } },
      { id: 'C', text: '拆解它：到底是它变了，还是我从头就看错了。', vector: { thought: 2, inner: 1 } },
      { id: 'D', text: '坦然接受，看清了也好。', vector: { tough: 2 } },
    ] },
  { id: 15, format: 'fantasy', context: null,
    prompt: '你误入一座会把你最深的恐惧变成现实的屋子。你会？',
    options: [
      { id: 'A', text: '硬着头皮往里走，看它能把我怎么样。', vector: { tough: 3 } },
      { id: 'B', text: '腿软了，本能地想逃。', vector: { emotion: 2, inner: 1 } },
      { id: 'C', text: '想：它为什么要吓我，恐惧本身是什么？', vector: { thought: 3 } },
      { id: 'D', text: '转身就走，不碰这种地方。', vector: {}, avoid: true },
    ] },
  { id: 16, format: 'fantasy', context: null,
    prompt: '你独自到了一个完全陌生的地方，一个人都不认识。你会？',
    options: [
      { id: 'A', text: '兴奋地到处探索，把这当成一场冒险。', vector: { dream: 2, action: 1 } },
      { id: 'B', text: '有点慌，很想立刻回到熟悉的地方。', vector: { emotion: 3 } },
      { id: 'C', text: '想办法安顿下来，慢慢融入这里。', vector: { care: 2, order: 1 } },
      { id: 'D', text: '退到一边，先观察这里的人和规矩。', vector: { inner: 2 } },
    ] },
  { id: 17, format: 'fantasy', context: null,
    prompt: '你可以和过去的自己说一句话。你会？',
    options: [
      { id: 'A', text: '告诉 ta 一个选择，让 ta 少走弯路。', vector: { action: 2, care: 1 } },
      { id: 'B', text: '什么都不说，只想抱抱那个自己。', vector: { emotion: 3 } },
      { id: 'C', text: '问 ta：你现在，是真的快乐吗？', vector: { inner: 2, thought: 1 } },
      { id: 'D', text: '告诉 ta：别怕，去大胆做那个梦。', vector: { dream: 2, emotion: 1 } },
    ] },
  { id: 18, format: 'fantasy', context: null,
    prompt: '所有人都以为你是某种人，可真实的你根本不是那样。你会？',
    options: [
      { id: 'A', text: '撕掉这层伪装，做回真正的自己。', vector: { action: 2, tough: 1 } },
      { id: 'B', text: '很难受，觉得没人真正懂我。', vector: { emotion: 3 } },
      { id: 'C', text: '想：我到底是谁，是我以为的，还是别人眼里的。', vector: { thought: 2, inner: 1 } },
      { id: 'D', text: '无所谓，他们爱怎么想怎么想。', vector: {}, avoid: true },
    ],
    followUp: {
      prompt: '这时，有个人看穿了真实的你。你会？',
      options: [
        { id: 'A', text: '松一口气：终于有人懂我了。', vector: { emotion: 2, care: 1 } },
        { id: 'B', text: '有点慌，反而想躲开。', vector: { inner: 2, emotion: 1 } },
        { id: 'C', text: '想确认：ta 看到的是真的我，还是又一个误会。', vector: { thought: 2, inner: 1 } },
        { id: 'D', text: '无所谓，懂不懂都行。', vector: {}, avoid: true },
      ],
    },
  },

  // —— 社交 / 关系 / 群体（7 题）——
  { id: 19, format: 'social', context: null,
    prompt: '一群人在背后议论一个不在场的人，话说得挺难听。你会？',
    options: [
      { id: 'A', text: '站出来说句公道话。', vector: { care: 2, tough: 1 } },
      { id: 'B', text: '心里不舒服，但也不想当众得罪人。', vector: { emotion: 2, inner: 1 } },
      { id: 'C', text: '冷眼看着，觉得这帮人挺可笑。', vector: { wit: 2 } },
      { id: 'D', text: '不关我事，听听就好。', vector: {}, avoid: true },
    ] },
  { id: 20, format: 'social', context: null,
    prompt: '你和一群三观完全不同的人，被绑进了同一个长期任务里。你会？',
    options: [
      { id: 'A', text: '为了把事做成，主动去协调磨合。', vector: { order: 2, care: 1 } },
      { id: 'B', text: '心里别扭，但忍着把活干完。', vector: { tough: 2, inner: 1 } },
      { id: 'C', text: '忍不住用玩笑讽刺一下这种荒诞。', vector: { wit: 2 } },
      { id: 'D', text: '先把自己的那部分做好，别人的事不多管。', vector: { action: 2 } },
    ] },
  { id: 21, format: 'social', context: null,
    prompt: '一个强势的人当众否定了你，而你并不服气。你会？',
    options: [
      { id: 'A', text: '当场反驳，把道理摆出来。', vector: { action: 2, thought: 1 } },
      { id: 'B', text: '表面不说，回去反复复盘自己的观点。', vector: { inner: 3 } },
      { id: 'C', text: '自嘲一句，把尴尬化解过去。', vector: { wit: 3 } },
      { id: 'D', text: '嘴上不说，心里其实挺受伤的。', vector: { emotion: 2 } },
    ] },
  { id: 22, format: 'social', context: null,
    prompt: '你在一个重要的公开场合，被要求当众讲几句。你会？',
    options: [
      { id: 'A', text: '认真准备，讲得真诚又得体。', vector: { order: 2, care: 1 } },
      { id: 'B', text: '有点慌，但凭感情即兴发挥。', vector: { emotion: 3 } },
      { id: 'C', text: '用几个段子，把气氛逗笑。', vector: { wit: 3 } },
      { id: 'D', text: '找个借口躲过去，不想出风头。', vector: {}, avoid: true },
    ] },
  { id: 23, format: 'social', context: null,
    prompt: '你看到有人被欺负，但帮 ta 会给你带来不小的麻烦。你会？',
    options: [
      { id: 'A', text: '管不了那么多，先帮了再说。', vector: { care: 2, action: 1 } },
      { id: 'B', text: '心里难受，反复想自己该不该出手。', vector: { emotion: 2, inner: 1 } },
      { id: 'C', text: '想个既帮到人、又不惹火上身的两全办法。', vector: { thought: 2, order: 1 } },
      { id: 'D', text: '先顾好自己，等有足够能力再回头帮。', vector: { tough: 2 } },
    ] },
  { id: 24, format: 'social', context: null,
    prompt: '一个圈子总在聊你完全提不起兴趣的话题。你会？',
    options: [
      { id: 'A', text: '努力融入，试着找到共同点。', vector: { care: 2, order: 1 } },
      { id: 'B', text: '待在一边，观察这群人挺有意思。', vector: { inner: 2, wit: 1 } },
      { id: 'C', text: '用幽默自嘲一下自己的格格不入。', vector: { wit: 3 } },
      { id: 'D', text: '直接退出，不勉强自己。', vector: {}, avoid: true },
    ] },
  { id: 25, format: 'social', context: null,
    prompt: '你被推为代表一群人去拍板，大家意见分歧很大。你会？',
    options: [
      { id: 'A', text: '先听每个人的想法，尽量照顾到所有人。', vector: { care: 3 } },
      { id: 'B', text: '果断拍板，拖下去只会更乱。', vector: { action: 2, tough: 1 } },
      { id: 'C', text: '反复权衡：什么才是对大家最好的。', vector: { inner: 2, thought: 1 } },
      { id: 'D', text: '推掉这个烫手山芋。', vector: {}, avoid: true },
    ] },

  // —— 内心 / 独处 / 回忆（10 题）——
  { id: 26, format: 'inner', context: null,
    prompt: '深夜失眠时，你脑子里最常浮现的是？',
    options: [
      { id: 'A', text: '白天那些没说出口的话、没做好的事。', vector: { inner: 3 } },
      { id: 'B', text: '一些从没发生过、也许永远不会发生的情景。', vector: { dream: 3 } },
      { id: 'C', text: '一些很大很远、没有答案的问题。', vector: { thought: 3 } },
      { id: 'D', text: '一个白天的尴尬瞬间，越想越睡不着。', vector: { emotion: 2, wit: 1 } },
    ] },
  { id: 27, format: 'inner', context: null,
    prompt: '一个完全属于自己的下午，你最想做什么？',
    options: [
      { id: 'A', text: '什么目标都没有，让思绪到处乱逛。', vector: { dream: 2, inner: 1 } },
      { id: 'B', text: '把拖了很久的事一件件做完。', vector: { action: 2, order: 1 } },
      { id: 'C', text: '约个朋友，聊聊天、喝喝茶。', vector: { care: 2, emotion: 1 } },
      { id: 'D', text: '躺着刷手机，让时间自己过去。', vector: {}, avoid: true },
    ],
    followUp: {
      prompt: '天快黑了，你忽然有点空落落的。你最想？',
      options: [
        { id: 'A', text: '找个人陪着，一个人待不住。', vector: { care: 2, emotion: 1 } },
        { id: 'B', text: '给自己定个目标，把这半天用出价值。', vector: { action: 2, order: 1 } },
        { id: 'C', text: '放一首老歌，任由情绪浮上来。', vector: { emotion: 2, inner: 1 } },
        { id: 'D', text: '无所谓，怎么过都行。', vector: {}, avoid: true },
      ],
    },
  },
  { id: 28, format: 'inner', context: null,
    prompt: '你翻到多年前写给自己的一段话。你会？',
    options: [
      { id: 'A', text: '眼眶有点热，想起当时的心情。', vector: { emotion: 3 } },
      { id: 'B', text: '想：当年那个我，现在还在吗？', vector: { inner: 2, thought: 1 } },
      { id: 'C', text: '有点想笑，那时的自己真傻。', vector: { wit: 2 } },
      { id: 'D', text: '没感觉，随手合上。', vector: {}, avoid: true },
    ] },
  { id: 29, format: 'inner', context: null,
    prompt: '你独处时，脑子里常有一个声音在？',
    options: [
      { id: 'A', text: '催促我：别停，还有很多事没做。', vector: { action: 2, desire: 1 } },
      { id: 'B', text: '复盘我刚才哪里做得不够好。', vector: { inner: 3 } },
      { id: 'C', text: '追问：我到底想要什么样的生活？', vector: { thought: 3 } },
      { id: 'D', text: '提醒我：别忘了关心一下身边的人。', vector: { care: 2 } },
    ] },
  { id: 30, format: 'inner', context: null,
    prompt: '想起一件让你难堪了很久的往事，你的反应更接近？',
    options: [
      { id: 'A', text: '还是很难受，会陷进去一阵子。', vector: { emotion: 3 } },
      { id: 'B', text: '反复拆解：当时我为什么那样做。', vector: { inner: 3 } },
      { id: 'C', text: '现在能笑着讲出来了。', vector: { wit: 2, tough: 1 } },
      { id: 'D', text: '想想这件事到底给我留下了什么教训。', vector: { thought: 2 } },
    ] },
  { id: 31, format: 'inner', context: null,
    prompt: '你有一个一直没说出口的秘密。它对你更像？',
    options: [
      { id: 'A', text: '一座山，压得我喘不过气，但我会扛下去。', vector: { tough: 3 } },
      { id: 'B', text: '一道伤口，偶尔想起来还会疼。', vector: { emotion: 2, inner: 1 } },
      { id: 'C', text: '一道谜题，我还在琢磨它意味着什么。', vector: { thought: 3 } },
      { id: 'D', text: '早就淡了，不觉得有什么。', vector: {}, avoid: true },
    ] },
  { id: 32, format: 'inner', context: null,
    prompt: '夜深人静，你回想自己这些年走过的路，最常有的感受是？',
    options: [
      { id: 'A', text: '感慨万千，情绪翻涌。', vector: { emotion: 3 } },
      { id: 'B', text: '反复琢磨：哪一步走对了，哪一步走岔了。', vector: { inner: 2, thought: 1 } },
      { id: 'C', text: '觉得挺不容易，也为自己骄傲。', vector: { tough: 2 } },
      { id: 'D', text: '会想：如果当初走另一条路，现在会是什么样。', vector: { dream: 2 } },
    ] },
  { id: 33, format: 'inner', context: null,
    prompt: '你心里有件事，越想越乱。你通常会？',
    options: [
      { id: 'A', text: '把它写下来，或用说的方式理清。', vector: { inner: 2, thought: 1 } },
      { id: 'B', text: '找个人聊聊，说完就轻松了。', vector: { care: 2, emotion: 1 } },
      { id: 'C', text: '干脆先去做点别的，让它自己沉淀。', vector: { action: 2 } },
      { id: 'D', text: '先自嘲两句，再大的事也把它看轻。', vector: { wit: 2 } },
    ] },
  { id: 34, format: 'inner', context: null,
    prompt: '一段关系结束后很久，你偶尔还会想起对方。你想起的更多是？',
    options: [
      { id: 'A', text: '那些美好的瞬间，心里软了一下。', vector: { emotion: 3 } },
      { id: 'B', text: '自己当时哪里做得不够好。', vector: { inner: 3 } },
      { id: 'C', text: '这件事让我明白了什么。', vector: { thought: 2, tough: 1 } },
      { id: 'D', text: '已经很少想起了。', vector: {}, avoid: true },
    ] },
  { id: 35, format: 'inner', context: null,
    prompt: '你独处时，最容易感到？',
    options: [
      { id: 'A', text: '孤独，想有人陪着。', vector: { emotion: 2, care: 1 } },
      { id: 'B', text: '自由，终于能做回自己。', vector: { dream: 2, inner: 1 } },
      { id: 'C', text: '安静，可以好好想想自己的事。', vector: { inner: 3 } },
      { id: 'D', text: '平静，没什么特别的。', vector: { tough: 2 } },
    ] },

  // —— 投入 / 取舍 / 扛事（6 题）——
  { id: 36, format: 'commitment', context: null,
    prompt: '一件很值得、但要熬很久很久的事摆在你面前。你会？',
    options: [
      { id: 'A', text: '一头扎进去，扛得住这份慢。', vector: { tough: 2, order: 1 } },
      { id: 'B', text: '先小步试一段，有感觉再往下走。', vector: { action: 2 } },
      { id: 'C', text: '得有人一起、有回报吊着才撑得住。', vector: { care: 2, desire: 1 } },
      { id: 'D', text: '算了，太苦了，选轻松点的。', vector: {}, avoid: true },
    ] },
  { id: 37, format: 'commitment', context: null,
    prompt: '你开始做一件长期的事，中途屡屡受挫。你会？',
    options: [
      { id: 'A', text: '越挫越勇，非把它做成不可。', vector: { tough: 2, action: 1 } },
      { id: 'B', text: '会灰心，需要缓一缓再继续。', vector: { emotion: 2, inner: 1 } },
      { id: 'C', text: '停下来复盘，调整方向再来。', vector: { thought: 2, order: 1 } },
      { id: 'D', text: '干脆放弃，换一条更容易的路。', vector: {}, avoid: true },
    ] },
  { id: 38, format: 'commitment', context: null,
    prompt: '一件需要你牺牲大量自己时间、去帮别人完成的事。你会？',
    options: [
      { id: 'A', text: '义不容辞，帮人帮到底。', vector: { care: 2, tough: 1 } },
      { id: 'B', text: '先掂量自己扛不扛得住，再答应。', vector: { inner: 2, order: 1 } },
      { id: 'C', text: '帮，但也得把规矩和边界说清楚。', vector: { order: 2, care: 1 } },
      { id: 'D', text: '见不得人开口求，心一软就答应了。', vector: { emotion: 2, care: 1 } },
    ] },
  { id: 39, format: 'commitment', context: null,
    prompt: '你承诺了一件事，后来发现比想象的难得多。你会？',
    options: [
      { id: 'A', text: '既然答应了，咬着牙也得做完。', vector: { tough: 2, order: 1 } },
      { id: 'B', text: '想办法重新谈条件，别把自己累垮。', vector: { action: 2, inner: 1 } },
      { id: 'C', text: '心里后悔，但硬着头皮继续。', vector: { emotion: 2, tough: 1 } },
      { id: 'D', text: '找理由退出，不想硬扛。', vector: {}, avoid: true },
    ] },
  { id: 40, format: 'commitment', context: null,
    prompt: '为了一个长远的目标，你愿意放弃眼前多少快乐？',
    options: [
      { id: 'A', text: '能放弃很多，为了那个目标值得。', vector: { desire: 2, tough: 1 } },
      { id: 'B', text: '一点点来，不能把日子过得太苦。', vector: { order: 2 } },
      { id: 'C', text: '看情况，快乐和目标其实是两码事。', vector: { thought: 2 } },
      { id: 'D', text: '不太愿意，及时行乐更重要。', vector: {}, avoid: true },
    ] },
  { id: 41, format: 'commitment', context: null,
    prompt: '你坚持了很久的一件事，家人朋友都不理解，劝你放弃。你会？',
    options: [
      { id: 'A', text: '这是我一直以来的理想，谁也拦不住。', vector: { dream: 2, tough: 1 } },
      { id: 'B', text: '会动摇，反复问自己值不值得。', vector: { inner: 3 } },
      { id: 'C', text: '跟他们好好解释，争取理解。', vector: { care: 2, order: 1 } },
      { id: 'D', text: '表面上不争，背地里照做自己的。', vector: { wit: 2 } },
    ] },

  // —— 欲望 / 野心 / 诱惑（7 题）——
  { id: 42, format: 'desire', context: null,
    prompt: '一件你特别想要、但代价不小的事摆在面前。你会？',
    options: [
      { id: 'A', text: '太想要了，先拿到手再说。', vector: { desire: 2, action: 1 } },
      { id: 'B', text: '反复掂量：这代价我付得起吗。', vector: { inner: 2, thought: 1 } },
      { id: 'C', text: '想：得到它，我真的会快乐吗？', vector: { thought: 2 } },
      { id: 'D', text: '算了，别被欲望牵着走。', vector: {}, avoid: true },
    ] },
  { id: 43, format: 'desire', context: null,
    prompt: '你一直求而不得的东西，突然出现在眼前。你会？',
    options: [
      { id: 'A', text: '心跳加速，想立刻抓住它。', vector: { desire: 3 } },
      { id: 'B', text: '有点不真实，反而犹豫起来。', vector: { inner: 2, thought: 1 } },
      { id: 'C', text: '想起之前为它吃过的苦，百感交集。', vector: { emotion: 2, tough: 1 } },
      { id: 'D', text: '先想清楚怎么把它稳稳接住，别让它又溜走。', vector: { order: 2, desire: 1 } },
    ] },
  { id: 44, format: 'desire', context: null,
    prompt: '一个诱人的机会，但要你冒不小的险。你会？',
    options: [
      { id: 'A', text: '富贵险中求，干了。', vector: { desire: 2, action: 1 } },
      { id: 'B', text: '把风险和收益反复算清楚。', vector: { inner: 2, order: 1 } },
      { id: 'C', text: '问自己：我要的到底是机会，还是刺激？', vector: { thought: 2 } },
      { id: 'D', text: '太冒险了，不碰。', vector: {}, avoid: true },
    ] },
  { id: 45, format: 'desire', context: null,
    prompt: '你心里有一团火——对某样东西强烈的渴望。它更常让你？',
    options: [
      { id: 'A', text: '行动力爆棚，朝它猛冲。', vector: { desire: 2, action: 1 } },
      { id: 'B', text: '辗转反侧，夜不能寐。', vector: { inner: 2, emotion: 1 } },
      { id: 'C', text: '把它藏得很好，只在心里烧。', vector: { inner: 3 } },
      { id: 'D', text: '慢慢就淡了，不太执着。', vector: {}, avoid: true },
    ],
    followUp: {
      prompt: '如果你发现，得到它要付出你一直最珍视的东西，你会？',
      options: [
        { id: 'A', text: '为了它，我可以放弃很多别的东西。', vector: { desire: 3 } },
        { id: 'B', text: '问自己：它到底值不值得我这么想要。', vector: { inner: 2, thought: 1 } },
        { id: 'C', text: '一步步规划，稳扎稳打地接近它。', vector: { order: 2, action: 1 } },
        { id: 'D', text: '还是算了，让它自己慢慢冷下去。', vector: {}, avoid: true },
      ],
    },
  },
  { id: 46, format: 'desire', context: null,
    prompt: '你遇到一个很迷人、但你知道不该靠近的人。你会？',
    options: [
      { id: 'A', text: '忍不住被吸引，想再多看几眼。', vector: { desire: 3 } },
      { id: 'B', text: '想弄清楚：这种吸引到底是什么。', vector: { thought: 2, inner: 1 } },
      { id: 'C', text: '远远欣赏就好，不越界。', vector: { order: 2, care: 1 } },
      { id: 'D', text: '绕开，别给自己找麻烦。', vector: {}, avoid: true },
    ] },
  { id: 47, format: 'desire', context: null,
    prompt: '你终于得到了最想要的东西，却发现不过如此。你的感受更接近？',
    options: [
      { id: 'A', text: '有点空虚：原来我追的是"追"的过程。', vector: { thought: 2, inner: 1 } },
      { id: 'B', text: '很快又找到了下一个想要的目标。', vector: { desire: 2, action: 1 } },
      { id: 'C', text: '反复想：如果当初没得到，会不会更好。', vector: { inner: 2, emotion: 1 } },
      { id: 'D', text: '坦然接受，得到过就够了。', vector: { tough: 2 } },
    ] },
  { id: 48, format: 'desire', context: null,
    prompt: '一件你克制了很久的欲望，突然有了名正言顺满足它的理由。你会？',
    options: [
      { id: 'A', text: '顺水推舟，满足它这一次。', vector: { desire: 3 } },
      { id: 'B', text: '先想清楚：这理由是真的，还是我给自己找的借口。', vector: { inner: 2, thought: 1 } },
      { id: 'C', text: '把利弊列清楚，看值不值得破例。', vector: { order: 2, thought: 1 } },
      { id: 'D', text: '还是算了，破了例怕收不住。', vector: {}, avoid: true },
    ] },
];
