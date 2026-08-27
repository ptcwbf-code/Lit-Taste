// 48 道"时代氛围题"（题库）。全部为 4 选项，单选（前端每题选 1 项）。
//
// 出题哲学（本包区别于"历史小测"的关键）：题目绝不同"你想去哪个时代 / 你喜欢哪个朝代的什么"，
// 只测**此刻的你如何感受世界**——你的信仰、你的节奏、你对秩序与野蛮的态度、你是向上还是黄昏。
// 时代是结果，不是提问素材。每一题都是一小段**氛围切片**，用意象开场（晨光、长路、回廊、
// 宴席、新月、风暴），选项写"你此刻的感受 / 反应"，而不是"你会采取的行动"。
//
// 6 种"时代氛围题型" format（供 server.js 分层抽样）：
//   dawn    晨光（8 题）  —— 黎明、开端、世界初醒  · 主打 gold / faith / tempo
//   road    长路（10 题） —— 征途、远方、出发      · 主打 quest / edge / tribe
//   cloister 回廊（10 题）—— 静谧、独处、沉思      · 主打 mind / faith / tempo(慢)
//   feast   宴席（7 题）  —— 人群、热闹、庆典      · 主打 tribe / fire / grace
//   crescent 新月（8 题） —— 暧昧、浪漫、夜        · 主打 fire / grace / rule
//   storm   风暴（5 题）  —— 激烈、冲突、变革      · 主打 fire / quest / edge
//
// 10 个"时代气质"维（本包无隐藏维）：
//   faith 信仰 / rule 礼序 / tribe 群系 / grace 风雅 / mind 学养
//   quest 征途 / edge 边野 / tempo 节律 / gold 荣光 / fire 烈度
//
// 向量净化原则（务必保持，改题文字时不要破坏）：
//   - 每个选项只主攻 1–2 个维度，系数 +1 / +2 / +3，全部非负。
//   - 不写负系数："不倾向某端"通过"给对立维度不加分"来表达（低分端自然落空）。
//   - "回避 / 算了 / 没感觉 / 无所谓"的选项：vector 留空 + avoid: true，用于"无偏好检测"。
//     注意密度：约 1/3 的题保留 avoid 即可（本库 16 处）——过密会轻易触发"无偏好收缩"压平画像。
module.exports = [
  // —— dawn 晨光（8 题）——
  { id: 1, format: 'dawn', context: null,
    prompt: '清晨醒来，你希望窗外是一个怎样的世界？',
    options: [
      { id: 'A', text: '崭新的、一切才刚开始，什么都有可能。', vector: { gold: 2, quest: 1 } },
      { id: 'B', text: '安宁的、和昨天一样稳稳当当。', vector: { tempo: 1, faith: 1 } },
      { id: 'C', text: '热闹的、街上已经有人声和烟火气。', vector: { tribe: 2, fire: 1 } },
      { id: 'D', text: '安静到能听见自己的呼吸就好。', vector: { mind: 1, tempo: 1 } },
    ] },
  { id: 2, format: 'dawn', context: null,
    prompt: '天光将亮未亮，你站在窗前，心里先浮起的念头是——',
    options: [
      { id: 'A', text: '今天也许会发生一件改变一切的事。', vector: { gold: 2, quest: 1 } },
      { id: 'B', text: '又是平平常常的一天，这很好。', vector: { tempo: 2, faith: 1 } },
      { id: 'C', text: '得赶紧开始，把这一天用满。', vector: { tempo: 2, quest: 1 } },
      { id: 'D', text: '没什么特别的念头，就这么待着。', vector: {}, avoid: true },
    ] },
  { id: 3, format: 'dawn', context: null,
    prompt: '新的一天，你更愿意相信它——',
    options: [
      { id: 'A', text: '是命运给的一次崭新机会。', vector: { faith: 2, gold: 1 } },
      { id: 'B', text: '是自己一步步走出来的。', vector: { quest: 2, rule: 1 } },
      { id: 'C', text: '是可以慢慢过的，不急着怎样。', vector: { tempo: 2 } },
      { id: 'D', text: '是用来做成一件正事的。', vector: { mind: 1, rule: 1 } },
    ] },
  { id: 4, format: 'dawn', context: null,
    prompt: '清晨的市集已经热闹起来，你——',
    options: [
      { id: 'A', text: '喜欢这股活气，跟着就有了精神。', vector: { tribe: 2, fire: 1 } },
      { id: 'B', text: '喜欢晨光的安静，宁可等它散场。', vector: { tempo: 1, faith: 1 } },
      { id: 'C', text: '想为在乎的人挑点新鲜的东西。', vector: { tribe: 2, grace: 1 } },
      { id: 'D', text: '你对这种地方说不上喜欢不喜欢。', vector: {}, avoid: true },
    ] },
  { id: 5, format: 'dawn', context: null,
    prompt: '东方泛白的那一刻，你觉得这光是——',
    options: [
      { id: 'A', text: '一种宣告：新的一切开始了。', vector: { gold: 2, faith: 1 } },
      { id: 'B', text: '一种提醒：昨天已经过去了。', vector: { tempo: 1, mind: 1 } },
      { id: 'C', text: '一种邀请：远方正在等你出发。', vector: { quest: 2, gold: 1 } },
      { id: 'D', text: '就是天亮而已，你没什么感想。', vector: { tempo: 1, mind: 1 } },
    ] },
  { id: 6, format: 'dawn', context: null,
    prompt: '假如黎明时分有句轻声的许诺，你更愿意听见——',
    options: [
      { id: 'A', text: '"你会抵达一个更好的地方。"', vector: { gold: 2, faith: 1 } },
      { id: 'B', text: '"慢一点，该来的都会来。"', vector: { tempo: 2, faith: 1 } },
      { id: 'C', text: '"今天有人与你同行。"', vector: { tribe: 2 } },
      { id: 'D', text: '"一切都要靠你自己。"', vector: { quest: 1, mind: 1 } },
    ] },
  { id: 7, format: 'dawn', context: null,
    prompt: '破晓时分，世界最像——',
    options: [
      { id: 'A', text: '一张白纸，等着被写上字。', vector: { gold: 2, mind: 1 } },
      { id: 'B', text: '一场仪式，值得认真对待。', vector: { grace: 2, faith: 1 } },
      { id: 'C', text: '一扇门，推开就是远方。', vector: { quest: 2 } },
      { id: 'D', text: '你从没想过这个问题。', vector: {} },
    ] },
  { id: 8, format: 'dawn', context: null,
    prompt: '晨光落在一座陌生的城市，你的第一反应是——',
    options: [
      { id: 'A', text: '想知道今天城里会发生什么新鲜事。', vector: { tempo: 2, fire: 1 } },
      { id: 'B', text: '想给它一点时间，慢慢认识。', vector: { tempo: 1, mind: 1 } },
      { id: 'C', text: '想趁早出发，把它走遍。', vector: { quest: 2, gold: 1 } },
      { id: 'D', text: '你觉得城市都差不多。', vector: {} },
    ] },

  // —— road 长路（10 题）——
  { id: 9, format: 'road', context: null,
    prompt: '面前有一条不知通向哪里的路，你更可能——',
    options: [
      { id: 'A', text: '背上行囊就走，路的尽头才有答案。', vector: { quest: 3, edge: 1 } },
      { id: 'B', text: '先打听清楚前面是什么，再决定。', vector: { rule: 1, mind: 1 } },
      { id: 'C', text: '和结伴的人一起走，路上不孤单。', vector: { tribe: 2, quest: 1 } },
      { id: 'D', text: '这条路太野，我宁可待在原地。', vector: {}, avoid: true },
    ] },
  { id: 10, format: 'road', context: null,
    prompt: '长途跋涉的晚上，你更看重——',
    options: [
      { id: 'A', text: '明天能走到一个没到过的地方。', vector: { quest: 2, gold: 1 } },
      { id: 'B', text: '今晚能睡个安稳觉，养足力气。', vector: { tempo: 1, tribe: 1 } },
      { id: 'C', text: '同伴都好好的，没掉队。', vector: { tribe: 2 } },
      { id: 'D', text: '一路上学到了什么新东西。', vector: { mind: 2 } },
    ] },
  { id: 11, format: 'road', context: null,
    prompt: '路越来越难走，前头是望不到边的荒野——',
    options: [
      { id: 'A', text: '你反而来劲，越难越想走。', vector: { edge: 2, quest: 1 } },
      { id: 'B', text: '你开始盘算：值不值得冒这个险。', vector: { mind: 2 } },
      { id: 'C', text: '你相信这条路会把你带到该去的地方。', vector: { faith: 2 } },
      { id: 'D', text: '你想回头了。', vector: {}, avoid: true },
    ] },
  { id: 12, format: 'road', context: null,
    prompt: '你更愿意把"远方"理解成——',
    options: [
      { id: 'A', text: '一处能重新开始的地方。', vector: { quest: 2, gold: 1 } },
      { id: 'B', text: '一群值得一起走的人。', vector: { tribe: 2 } },
      { id: 'C', text: '一段与自己相处的时光。', vector: { mind: 2 } },
      { id: 'D', text: '一个让心跳加速的未知。', vector: { edge: 2, fire: 1 } },
    ] },
  { id: 13, format: 'road', context: null,
    prompt: '有人在路口劝你"别走了，前面没什么好"，你——',
    options: [
      { id: 'A', text: '更想亲眼看看，自己判断。', vector: { quest: 2, mind: 1 } },
      { id: 'B', text: '谢谢你，但我的路我自己走。', vector: { quest: 2, rule: 1 } },
      { id: 'C', text: '你动摇了，想再想想。', vector: { mind: 1, tempo: 1 } },
      { id: 'D', text: '你说服他跟你一起走。', vector: { tribe: 2, fire: 1 } },
    ] },
  { id: 14, format: 'road', context: null,
    prompt: '漫漫长路上，什么最能支撑你——',
    options: [
      { id: 'A', text: '一种相信：脚下这条路是对的。', vector: { faith: 2 } },
      { id: 'B', text: '远方的某个承诺，哪怕很模糊。', vector: { gold: 2 } },
      { id: 'C', text: '同行者的一句"跟上"。', vector: { tribe: 2 } },
      { id: 'D', text: '自己定的规矩：既然出发了就不回头。', vector: { rule: 2 } },
    ] },
  { id: 15, format: 'road', context: null,
    prompt: '野外过夜，四周是陌生的风声——',
    options: [
      { id: 'A', text: '你有点警觉，但反而清醒。', vector: { edge: 2 } },
      { id: 'B', text: '你想起远方的家，心里软了一下。', vector: { tribe: 2, gold: 1 } },
      { id: 'C', text: '你望着星空，想一些很大的问题。', vector: { faith: 2, mind: 1 } },
      { id: 'D', text: '你有点害怕这种没人罩着的感觉。', vector: { rule: 2 } },
    ] },
  { id: 16, format: 'road', context: null,
    prompt: '你最向往的"在路上"，是——',
    options: [
      { id: 'A', text: '一个人的孤旅，天地任我行。', vector: { edge: 2, quest: 1 } },
      { id: 'B', text: '一支马队，说说笑笑往前走。', vector: { tribe: 2 } },
      { id: 'C', text: '边走边想，把一路想明白。', vector: { mind: 2 } },
      { id: 'D', text: '沿着路走，不必知道终点在哪里。', vector: { faith: 1, tempo: 1 } },
    ] },
  { id: 17, format: 'road', context: null,
    prompt: '有人说"离家越远，人越接近自己"，你觉得——',
    options: [
      { id: 'A', text: '有道理，陌生让我看得更清。', vector: { mind: 2, edge: 1 } },
      { id: 'B', text: '未必，我要的从来不是远。', vector: { tempo: 1, tribe: 1 } },
      { id: 'C', text: '家就是我的根，越远越空。', vector: { tribe: 2 } },
      { id: 'D', text: '这种话太文绉绉了。', vector: {} },
    ] },
  { id: 18, format: 'road', context: null,
    prompt: '路旁出现两条岔路，一条热闹、一条荒凉，你——',
    options: [
      { id: 'A', text: '走荒凉那条，人少的地方才有真东西。', vector: { edge: 2 } },
      { id: 'B', text: '走热闹那条，人多的地方总有故事。', vector: { tribe: 2, fire: 1 } },
      { id: 'C', text: '停下来，先弄清它们各自通向哪里。', vector: { mind: 2 } },
      { id: 'D', text: '随便走一条，反正都是路。', vector: { tempo: 1, quest: 1 } },
    ] },

  // —— cloister 回廊（10 题）——
  { id: 19, format: 'cloister', context: null,
    prompt: '一个人待在安静的空间里，你更享受——',
    options: [
      { id: 'A', text: '想明白一个很久没想通的问题。', vector: { mind: 3 } },
      { id: 'B', text: '什么都不想，让时间自己流过。', vector: { tempo: 2, faith: 1 } },
      { id: 'C', text: '把周围布置得舒服、好看。', vector: { grace: 3 } },
      { id: 'D', text: '安静太久会慌，想找人说话。', vector: {}, avoid: true },
    ] },
  { id: 20, format: 'cloister', context: null,
    prompt: '独处时，你更常做的是——',
    options: [
      { id: 'A', text: '和自己对话，问自己真正要什么。', vector: { mind: 2 } },
      { id: 'B', text: '发呆，什么也不想。', vector: { tempo: 2 } },
      { id: 'C', text: '读书、写字、做些有分量的事。', vector: { mind: 2, grace: 1 } },
      { id: 'D', text: '默想一会儿，和更高的什么待在一起。', vector: { faith: 3 } },
    ] },
  { id: 21, format: 'cloister', context: null,
    prompt: '一把旧椅子、一盏灯、一本书，这样一个夜晚——',
    options: [
      { id: 'A', text: '正合我意，最好没有人打扰。', vector: { tempo: 2, mind: 1 } },
      { id: 'B', text: '好，但再有一个亲近的人在身边更好。', vector: { tribe: 2 } },
      { id: 'C', text: '我想把它布置得再讲究一点。', vector: { grace: 2 } },
      { id: 'D', text: '我会坐不住，心里发痒。', vector: {}, avoid: true },
    ] },
  { id: 22, format: 'cloister', context: null,
    prompt: '沉思的时候，你更相信——',
    options: [
      { id: 'A', text: '答案要靠自己想出来。', vector: { mind: 3 } },
      { id: 'B', text: '答案会慢慢浮现，急不得。', vector: { tempo: 2, faith: 1 } },
      { id: 'C', text: '答案在书里、在圣贤那里。', vector: { mind: 1, faith: 1 } },
      { id: 'D', text: '想那么多没用，去做就对了。', vector: { quest: 1, rule: 1 } },
    ] },
  { id: 23, format: 'cloister', context: null,
    prompt: '日头偏西，四下无人，你——',
    options: [
      { id: 'A', text: '想一个人把今天过完，安静地。', vector: { tempo: 2 } },
      { id: 'B', text: '心里涌起一点对命运、对更大的什么的念头。', vector: { faith: 2 } },
      { id: 'C', text: '想趁安静把想做的事做一点。', vector: { mind: 2, quest: 1 } },
      { id: 'D', text: '你有点怕这种空落落的感觉。', vector: { tribe: 2 } },
    ] },
  { id: 24, format: 'cloister', context: null,
    prompt: '你的"内在世界"，更像——',
    options: [
      { id: 'A', text: '一间摆满书的房间。', vector: { mind: 2, grace: 1 } },
      { id: 'B', text: '一座灯火幽暗的庙。', vector: { faith: 3 } },
      { id: 'C', text: '一片流动的、不急着上岸的水。', vector: { tempo: 2 } },
      { id: 'D', text: '一扇时常敞开的窗。', vector: { tribe: 1, fire: 1 } },
    ] },
  { id: 25, format: 'cloister', context: null,
    prompt: '有人对你说"慢一点，好好想一想"，你——',
    options: [
      { id: 'A', text: '深以为然，我本来就不喜欢赶。', vector: { tempo: 2 } },
      { id: 'B', text: '一直在想，不用别人提醒。', vector: { mind: 2 } },
      { id: 'C', text: '想，但也要想明白之后行动。', vector: { mind: 1, quest: 1 } },
      { id: 'D', text: '我觉得这是浪费时间，先做再说。', vector: { quest: 2 } },
    ] },
  { id: 26, format: 'cloister', context: null,
    prompt: '深夜里，你更愿意——',
    options: [
      { id: 'A', text: '让心事沉下来，想清楚再睡。', vector: { mind: 2, tempo: 1 } },
      { id: 'B', text: '翻几页书，或写几行字。', vector: { grace: 2, mind: 1 } },
      { id: 'C', text: '和自己认认真真待一会儿。', vector: { faith: 2, tempo: 1 } },
      { id: 'D', text: '快点睡，明天还有事。', vector: { rule: 1, quest: 1 } },
    ] },
  { id: 27, format: 'cloister', context: null,
    prompt: '一炷香、一段留白、一句含蓄的话，这类东西——',
    options: [
      { id: 'A', text: '让你安静下来，很受用。', vector: { faith: 2, tempo: 1 } },
      { id: 'B', text: '让你想起生活的仪式感。', vector: { grace: 2 } },
      { id: 'C', text: '让你想琢磨它背后的意思。', vector: { mind: 2 } },
      { id: 'D', text: '你觉得故弄玄虚。', vector: {} },
    ] },
  { id: 28, format: 'cloister', context: null,
    prompt: '独处久了，你更接近哪种状态——',
    options: [
      { id: 'A', text: '心里越来越清亮。', vector: { mind: 2 } },
      { id: 'B', text: '心里越来越安定。', vector: { faith: 2, tempo: 1 } },
      { id: 'C', text: '心里越来越辽阔。', vector: { grace: 2, edge: 1 } },
      { id: 'D', text: '会想念喧闹，想回到人群里。', vector: { tribe: 2 } },
    ] },

  // —— feast 宴席（7 题）——
  { id: 29, format: 'feast', context: null,
    prompt: '一场为庆祝某件事而设的宴席，你更可能是——',
    options: [
      { id: 'A', text: '张罗的人，让每个人都尽兴。', vector: { tribe: 2, fire: 1 } },
      { id: 'B', text: '最投入的那一个，笑得最大声。', vector: { fire: 2, tribe: 1 } },
      { id: 'C', text: '在角落观察，看众人百态。', vector: { mind: 2 } },
      { id: 'D', text: '能推就推，不喜欢这种场合。', vector: {}, avoid: true },
    ] },
  { id: 30, format: 'feast', context: null,
    prompt: '热闹的人群里，你——',
    options: [
      { id: 'A', text: '想成为让气氛更热的那个人。', vector: { fire: 2, tribe: 1 } },
      { id: 'B', text: '喜欢被包围的感觉，有归属。', vector: { tribe: 3 } },
      { id: 'C', text: '留意谁开心、谁落单。', vector: { tribe: 1, mind: 1 } },
      { id: 'D', text: '想早点抽身，回到自己那边。', vector: { tempo: 1, mind: 1 } },
    ] },
  { id: 31, format: 'feast', context: null,
    prompt: '一场盛大的典礼，你最被触动的是——',
    options: [
      { id: 'A', text: '那种共同的、被纪念的时刻。', vector: { tribe: 2, faith: 1, gold: 1 } },
      { id: 'B', text: '讲究的礼数和规矩。', vector: { rule: 2, grace: 1 } },
      { id: 'C', text: '场面的华美与仪式感。', vector: { grace: 3 } },
      { id: 'D', text: '你觉得这些仪式没什么意思。', vector: {} },
    ] },
  { id: 32, format: 'feast', context: null,
    prompt: '宴席上有人讲了一个笑话，大家笑得前仰后合，你——',
    options: [
      { id: 'A', text: '跟着大笑，喜欢这种热络。', vector: { fire: 2, tribe: 1 } },
      { id: 'B', text: '温和地笑，觉得这样就好。', vector: { tribe: 1, tempo: 1 } },
      { id: 'C', text: '心里想着别的事，笑得有点敷衍。', vector: { mind: 2 } },
      { id: 'D', text: '觉得场面有点闹，想安静一下。', vector: { tempo: 2 } },
    ] },
  { id: 33, format: 'feast', context: null,
    prompt: '你希望自己的生日被怎样度过——',
    options: [
      { id: 'A', text: '请来亲近的人，热热闹闹一场。', vector: { tribe: 2, fire: 1 } },
      { id: 'B', text: '用心布置，让这一天像件作品。', vector: { grace: 3 } },
      { id: 'C', text: '和至亲几个人，安静地过。', vector: { tribe: 1, tempo: 1 } },
      { id: 'D', text: '不过，和平常一样最好。', vector: {}, avoid: true },
    ] },
  { id: 34, format: 'feast', context: null,
    prompt: '人群散去后，你更记得的是——',
    options: [
      { id: 'A', text: '谁和谁之间的那点热络与真心。', vector: { tribe: 2 } },
      { id: 'B', text: '席上某个瞬间的美。', vector: { grace: 2 } },
      { id: 'C', text: '自己心里的起起落落。', vector: { fire: 2, mind: 1 } },
      { id: 'D', text: '终于可以一个人待着了。', vector: { tempo: 2 } },
    ] },
  { id: 35, format: 'feast', context: null,
    prompt: '如果有人提议"再开一轮，不要停"，你——',
    options: [
      { id: 'A', text: '赞成，开心就该尽兴。', vector: { fire: 3 } },
      { id: 'B', text: '看大家，大家都在就继续。', vector: { tribe: 2 } },
      { id: 'C', text: '见好就收，留一点余味。', vector: { grace: 2, tempo: 1 } },
      { id: 'D', text: '我心里已经开始想走了。', vector: {}, avoid: true },
    ] },

  // —— crescent 新月（8 题）——
  { id: 36, format: 'crescent', context: null,
    prompt: '夜里，有人在你耳边轻声讲了一个关于"想要"的秘密。',
    options: [
      { id: 'A', text: '你想把这个秘密酿成一段故事。', vector: { fire: 2, grace: 1 } },
      { id: 'B', text: '你替它守住，一字不露。', vector: { rule: 1, tribe: 1 } },
      { id: 'C', text: '你被它点燃，也想起自己的渴望。', vector: { fire: 2, quest: 1 } },
      { id: 'D', text: '你不太相信这种话。', vector: {}, avoid: true },
    ] },
  { id: 37, format: 'crescent', context: null,
    prompt: '月光下的一条小街，你更愿意——',
    options: [
      { id: 'A', text: '慢慢走，让夜意漫上来。', vector: { grace: 2, tempo: 1 } },
      { id: 'B', text: '遇见一个可以说话的人。', vector: { fire: 2, tribe: 1 } },
      { id: 'C', text: '想一件藏在心里很久的事。', vector: { mind: 2 } },
      { id: 'D', text: '尽快回家，夜里街道让人不安。', vector: { rule: 2 } },
    ] },
  { id: 38, format: 'crescent', context: null,
    prompt: '一段暧昧不明的关心，你——',
    options: [
      { id: 'A', text: '享受这种说不破的美。', vector: { fire: 2, grace: 1 } },
      { id: 'B', text: '想弄清楚它到底意味着什么。', vector: { mind: 2 } },
      { id: 'C', text: '得体地回应，不多想。', vector: { rule: 2 } },
      { id: 'D', text: '我嫌烦，宁可直来直去。', vector: {}, avoid: true },
    ] },
  { id: 39, format: 'crescent', context: null,
    prompt: '夜里你更可能被什么打动——',
    options: [
      { id: 'A', text: '一句浪漫到放肆的话。', vector: { fire: 3 } },
      { id: 'B', text: '一件精致到头发丝的小东西。', vector: { grace: 3 } },
      { id: 'C', text: '一份守约守时的妥帖。', vector: { rule: 2 } },
      { id: 'D', text: '一片让人安静下来的夜色。', vector: { tempo: 2, faith: 1 } },
    ] },
  { id: 40, format: 'crescent', context: null,
    prompt: '如果有封信可以寄给一个想念的人，你会——',
    options: [
      { id: 'A', text: '写满炽热的话，不藏半分。', vector: { fire: 3 } },
      { id: 'B', text: '斟酌用词，写一封讲究的信。', vector: { grace: 2, mind: 1 } },
      { id: 'C', text: '只写几句平常话，但句句真心。', vector: { rule: 1, tribe: 1 } },
      { id: 'D', text: '没什么可写的，也没人可寄。', vector: {}, avoid: true },
    ] },
  { id: 41, format: 'crescent', context: null,
    prompt: '你理解的"浪漫"，更接近——',
    options: [
      { id: 'A', text: '克制里的炽热，未说破的深情。', vector: { fire: 2, rule: 1 } },
      { id: 'B', text: '把生活过成一件有美感的事。', vector: { grace: 3 } },
      { id: 'C', text: '为一个人冲动一次、不管不顾。', vector: { fire: 3 } },
      { id: 'D', text: '平静地相守，日复一日。', vector: { tempo: 1, tribe: 1 } },
    ] },
  { id: 42, format: 'crescent', context: null,
    prompt: '午夜，窗外的灯一盏盏熄灭，你——',
    options: [
      { id: 'A', text: '觉得夜里有种迷人的张力。', vector: { fire: 2, edge: 1 } },
      { id: 'B', text: '想把这一刻留进记忆里。', vector: { grace: 2 } },
      { id: 'C', text: '想有些话该不该说，该怎么说。', vector: { mind: 2, rule: 1 } },
      { id: 'D', text: '你只想快点睡。', vector: {} },
    ] },
  { id: 43, format: 'crescent', context: null,
    prompt: '若有一支舞，你更愿意——',
    options: [
      { id: 'A', text: '忘我地跳，把情绪都交给节拍。', vector: { fire: 3 } },
      { id: 'B', text: '跳得讲究、跳得好看。', vector: { grace: 2, rule: 1 } },
      { id: 'C', text: '和熟识的人一起，跳个尽兴。', vector: { tribe: 2, fire: 1 } },
      { id: 'D', text: '站在旁边看，不跳。', vector: { tempo: 1, mind: 1 } },
    ] },

  // —— storm 风暴（5 题）——
  { id: 44, format: 'storm', context: null,
    prompt: '风暴将至，秩序正在松动，你更可能——',
    options: [
      { id: 'A', text: '站到风暴里，成为改变的一部分。', vector: { quest: 2, fire: 1, gold: 1 } },
      { id: 'B', text: '先守好自己和身边的人。', vector: { tribe: 2, rule: 1 } },
      { id: 'C', text: '观察风暴，想弄清它从哪来、往哪去。', vector: { mind: 2, edge: 1 } },
      { id: 'D', text: '找个地方躲起来，等它过去。', vector: {}, avoid: true },
    ] },
  { id: 45, format: 'storm', context: null,
    prompt: '一场冲突摆在你面前，你——',
    options: [
      { id: 'A', text: '忍不住要表明立场，站到阵前。', vector: { fire: 2, quest: 1, edge: 1 } },
      { id: 'B', text: '先看看哪边占理，再说话。', vector: { mind: 2, rule: 1 } },
      { id: 'C', text: '想把这股乱劲变成点什么。', vector: { quest: 2, fire: 1 } },
      { id: 'D', text: '尽量不掺和，躲开是非。', vector: { tempo: 1, tribe: 1 } },
    ] },
  { id: 46, format: 'storm', context: null,
    prompt: '"旧的秩序正在崩坏"，听到这句话，你——',
    options: [
      { id: 'A', text: '心里一阵兴奋：该变天了。', vector: { quest: 2, fire: 1 } },
      { id: 'B', text: '警觉：乱世里要先自保。', vector: { edge: 2, rule: 1 } },
      { id: 'C', text: '想弄清楚旧的是否真的该倒。', vector: { mind: 2 } },
      { id: 'D', text: '你希望它别变，稳稳当当才好。', vector: {}, avoid: true },
    ] },
  { id: 47, format: 'storm', context: null,
    prompt: '变革的浪潮里，你更愿意做——',
    options: [
      { id: 'A', text: '第一个冲上去的人。', vector: { fire: 2, edge: 1 } },
      { id: 'B', text: '把方向想清楚的人。', vector: { mind: 3 } },
      { id: 'C', text: '把大家拢在一起的人。', vector: { tribe: 2 } },
      { id: 'D', text: '等在岸边、看清结果的人。', vector: { tempo: 2 } },
    ] },
  { id: 48, format: 'storm', context: null,
    prompt: '暴风雨停歇后，你更想看——',
    options: [
      { id: 'A', text: '被冲刷过、焕然一新的土地。', vector: { gold: 2, quest: 1 } },
      { id: 'B', text: '废墟里冒出的新芽。', vector: { gold: 2, edge: 1 } },
      { id: 'C', text: '天边那道让人安心的光。', vector: { faith: 2 } },
      { id: 'D', text: '一切都回到原来的样子。', vector: {}, avoid: true },
    ] },
];
