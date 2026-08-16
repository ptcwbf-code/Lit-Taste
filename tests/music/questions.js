// 48 道"氛围题"（题库）。全部为 4 选项，单选（前端每题选 1 项）。
//
// 出题哲学（本包区别于"生活问卷"的关键）：每一题都是一小段**声音氛围切片**——
// 文字像歌词、像专辑封面、像一段电影氛围。你读题时的感受，就是"听到一段旋律"时的感受；
// 你的选择，是你在那段氛围里最自然的反应。所以题目用意象开场（光、夜、风、人群、声音、质感），
// 选项写"你此刻的感受 / 反应"，而不是"你会采取的行动"。
//
// 6 种"氛围题型" format（供 server.js 分层抽样）：
//   glow    余晖（8 题）  —— 黄昏、过渡、暖调    · 主打 nostalgia / warmth / melancholy
//   night   夜航（10 题） —— 夜晚、独处、安静    · 主打 inward / space / melancholy
//   echo    回声（7 题）  —— 人群、共鸣、关系    · 主打 warmth / aura / groove
//   drift   漂浮（10 题） —— 放空、流动、无时间  · 主打 space / groove / nostalgia
//   throb   悸动（6 题）  —— 渴望、强烈、心跳    · 主打 intensity / aura
//   surge   高涨（7 题）  —— 迸发、投入、宣言    · 主打 intensity / groove / order
//
// 10 个"声音"维（本包无隐藏维）：
//   warmth 温度 / intensity 强度 / order 秩序 / groove 律动 / nostalgia 怀旧
//   texture 质感 / inward 内省 / melancholy 忧郁 / space 留白 / aura 气场
//
// 向量净化原则（务必保持，改题文字时不要破坏）：
//   - 每个选项只主攻 1–2 个维度，系数 +2 / +3（主维）+1 / +2（次维），全部非负。
//   - 不写负系数："不倾向某端"通过"给对立维度不加分"来表达（低分端自然落空）。
//   - "回避 / 算了 / 没感觉 / 无所谓"的选项：vector 留空 + avoid: true，用于"无偏好检测"。
//     注意密度：约 1/3 的题保留 avoid 即可（本库 16 处）——过密会轻易触发"无偏好收缩"压平画像。
module.exports = [
  // —— glow 余晖（8 题）——
  { id: 1, format: 'glow', context: null,
    prompt: '黄昏的光落在地板上，像一首歌的尾奏，慢慢淡下去。',
    options: [
      { id: 'A', text: '你想让这一刻再长一点，不急着起身。', vector: { space: 2, nostalgia: 1 } },
      { id: 'B', text: '这光让你想起某个回不去的地方。', vector: { nostalgia: 3 } },
      { id: 'C', text: '你更喜欢明亮的、确切的东西。', vector: { order: 1, warmth: 1 } },
      { id: 'D', text: '你拉上窗帘，把黄昏挡在外面。', vector: {}, avoid: true },
    ] },
  { id: 2, format: 'glow', context: null,
    prompt: '天色将暗未暗，路灯一盏一盏亮起来，你走在回家的路上。',
    options: [
      { id: 'A', text: '你放慢脚步，舍不得这段过渡的天光。', vector: { nostalgia: 1, melancholy: 2 } },
      { id: 'B', text: '你想起小时候，也是这样被谁牵着手回家。', vector: { nostalgia: 3 } },
      { id: 'C', text: '你急着到家，有一屋子温暖在等你。', vector: { warmth: 2, groove: 1 } },
      { id: 'D', text: '你只顾赶路，心里盘算着明天要做的事。', vector: { order: 2 } },
    ] },
  { id: 3, format: 'glow', context: null,
    prompt: '黄昏的光落在手边的一件小器物上，你更被什么打动——',
    options: [
      { id: 'A', text: '它被打磨得温润、精致，每一处都恰到好处。', vector: { texture: 3 } },
      { id: 'B', text: '它保留着做出来时的粗粝和手工痕迹。', vector: { warmth: 2, nostalgia: 1 } },
      { id: 'C', text: '它实用耐用，别的都次要。', vector: { order: 1 } },
      { id: 'D', text: '你其实没怎么注意过它。', vector: { space: 2 } },
    ] },
  { id: 4, format: 'glow', context: null,
    prompt: '黄昏的风带着一点凉意，吹过你的脸。',
    options: [
      { id: 'A', text: '你深吸一口，觉得这凉意让人清醒。', vector: { space: 2, inward: 1 } },
      { id: 'B', text: '你想起某个有风的黄昏，和一个不在身边的人。', vector: { nostalgia: 2, melancholy: 1 } },
      { id: 'C', text: '你紧了紧外套，想快点回到暖和的地方。', vector: { warmth: 2 } },
      { id: 'D', text: '你没留意风，继续往前走。', vector: { order: 1 } },
    ] },
  { id: 5, format: 'glow', context: null,
    prompt: '天边烧起一片晚霞，红得很不真实。',
    options: [
      { id: 'A', text: '你停下脚步，想把它整个看进眼里。', vector: { space: 2, melancholy: 1 } },
      { id: 'B', text: '你想让这晚霞再艳一点、再久一点。', vector: { intensity: 1, nostalgia: 1 } },
      { id: 'C', text: '你被这份壮阔震住，心里涌起一股敬意。', vector: { aura: 3 } },
      { id: 'D', text: '你瞄了一眼，继续低头走。', vector: { order: 1 } },
    ] },
  { id: 6, format: 'glow', context: null,
    prompt: '黄昏的房间里，一切都镀上一层金色，连噪音都变软了。',
    options: [
      { id: 'A', text: '你舍不得开灯，想让这金色多待一会儿。', vector: { space: 2, nostalgia: 1 } },
      { id: 'B', text: '你被这暖意包裹，心里软软的。', vector: { warmth: 2, melancholy: 1 } },
      { id: 'C', text: '你打开灯，让房间回到清楚的样子。', vector: { order: 2 } },
      { id: 'D', text: '你没察觉天色，一直在忙。', vector: { order: 2 } },
    ] },
  { id: 7, format: 'glow', context: null,
    prompt: '傍晚，炊烟从远处升起，空气里有饭菜的味道。',
    options: [
      { id: 'A', text: '你想家，想那些平凡却踏实的日子。', vector: { nostalgia: 2, warmth: 1 } },
      { id: 'B', text: '你心里涌起一点酸，说不上为什么。', vector: { melancholy: 2, inward: 1 } },
      { id: 'C', text: '你觉得饿，只想快点吃上一口热的。', vector: { warmth: 2 } },
      { id: 'D', text: '你没什么感觉，只是路过。', vector: { order: 1 } },
    ] },
  { id: 8, format: 'glow', context: null,
    prompt: '太阳落下去的那一刻，世界好像安静了一秒。',
    options: [
      { id: 'A', text: '你喜欢这种"今天结束了"的踏实感。', vector: { order: 2, warmth: 1 } },
      { id: 'B', text: '你有点舍不得，总觉得这一天还没过够。', vector: { nostalgia: 2, melancholy: 1 } },
      { id: 'C', text: '你松一口气，白天的紧绷终于可以放下。', vector: { space: 2, inward: 1 } },
      { id: 'D', text: '你没注意太阳什么时候落的。', vector: { order: 1 } },
    ] },

  // —— night 夜航（10 题）——
  { id: 9, format: 'night', context: null,
    prompt: '夜很深了，四下安静，你听见自己的呼吸像某种节拍。',
    options: [
      { id: 'A', text: '你享受这种静，像给世界调低了音量。', vector: { inward: 2, space: 1 } },
      { id: 'B', text: '安静久了会有点慌，你希望有人说话。', vector: { warmth: 2 } },
      { id: 'C', text: '夜的慢，让你终于想得动一些事。', vector: { inward: 2, melancholy: 1 } },
      { id: 'D', text: '你打开灯和屏幕，把安静赶走。', vector: {}, avoid: true },
    ] },
  { id: 10, format: 'night', context: null,
    prompt: '凌晨三点，你醒着，窗外只有远处偶尔的车声。',
    options: [
      { id: 'A', text: '你躺着，任由思绪像夜一样漫开。', vector: { inward: 2, space: 1 } },
      { id: 'B', text: '你想起很多白天来不及想的事，越睡越清醒。', vector: { inward: 2, melancholy: 1 } },
      { id: 'C', text: '你起来给自己倒杯水，又坐回黑暗里。', vector: { space: 2 } },
      { id: 'D', text: '你刷手机，把这一夜刷过去。', vector: { groove: 1 } },
    ] },
  { id: 11, format: 'night', context: null,
    prompt: '深夜的巷子空无一人，只有你的影子跟着你。',
    options: [
      { id: 'A', text: '你不怕，反而享受这份独行的安静。', vector: { inward: 2, space: 1 } },
      { id: 'B', text: '你加快脚步，想快点回到亮着灯的地方。', vector: { warmth: 1, order: 1 } },
      { id: 'C', text: '你想起很多年前，也曾在这样的夜里走过。', vector: { nostalgia: 2, melancholy: 1 } },
      { id: 'D', text: '你戴上耳机，假装自己不在这里。', vector: { inward: 1 } },
    ] },
  { id: 12, format: 'night', context: null,
    prompt: '关上灯，房间沉进黑暗，只有月光漏进来一点。',
    options: [
      { id: 'A', text: '你睁着眼，觉得黑暗是一种温柔的包裹。', vector: { inward: 2 } },
      { id: 'B', text: '你心里翻着白天的事，一时平静不下来。', vector: { melancholy: 2, inward: 1 } },
      { id: 'C', text: '你很快就困了，黑暗让你安心。', vector: { space: 1 } },
      { id: 'D', text: '你有点怕黑，留了一盏小灯。', vector: { order: 1 } },
    ] },
  { id: 13, format: 'night', context: null,
    prompt: '深夜里，你翻到一叠旧照片，有些边角已经磨得泛白。',
    options: [
      { id: 'A', text: '你喜欢那些磨旧的，它们带着被摸过的痕迹。', vector: { nostalgia: 3 } },
      { id: 'B', text: '你喜欢那些还完好的，像时光没有磨损它们。', vector: { nostalgia: 2, order: 1 } },
      { id: 'C', text: '你一张张看过去，分不清更喜欢哪一张。', vector: { nostalgia: 2, inward: 1 } },
      { id: 'D', text: '你合上相册，放回抽屉。', vector: { order: 1 } },
    ] },
  { id: 14, format: 'night', context: null,
    prompt: '万籁俱寂，你第一次这么清楚地听见自己的心跳。',
    options: [
      { id: 'A', text: '你静静听，像在认识一个更里面的自己。', vector: { inward: 3 } },
      { id: 'B', text: '你有点慌，想弄出点声音打破这静。', vector: { warmth: 1, groove: 1 } },
      { id: 'C', text: '你觉得孤独，但这份孤独很干净。', vector: { melancholy: 2, space: 1 } },
      { id: 'D', text: '你翻个身，逼自己睡。', vector: { order: 1 } },
    ] },
  { id: 15, format: 'night', context: null,
    prompt: '深夜，你站在窗前，整座城市都在脚下睡着了。',
    options: [
      { id: 'A', text: '你享受这高高在上的旁观，谁也不会打扰你。', vector: { inward: 2, space: 1 } },
      { id: 'B', text: '你看着万家灯火，觉得温暖又遥远。', vector: { melancholy: 2, warmth: 1 } },
      { id: 'C', text: '你想，这一刻有人也醒着吗。', vector: { warmth: 2 } },
      { id: 'D', text: '你拉上窗帘，转身去睡。', vector: { order: 1 } },
    ] },
  { id: 16, format: 'night', context: null,
    prompt: '夜里下起小雨，雨点轻轻敲着窗。',
    options: [
      { id: 'A', text: '你听雨，听得心里一点点静下来。', vector: { space: 2, inward: 1 } },
      { id: 'B', text: '雨声让你想起某个潮湿的、回不去的夜晚。', vector: { melancholy: 2, nostalgia: 1 } },
      { id: 'C', text: '你担心雨会下大，起来检查门窗。', vector: { order: 2 } },
      { id: 'D', text: '你嫌吵，用被子蒙住头。', vector: { order: 1 } },
    ] },
  { id: 17, format: 'night', context: null,
    prompt: '黑暗里，白天藏起来的那部分自己慢慢醒过来。',
    options: [
      { id: 'A', text: '你任由它出来，和它说说话。', vector: { inward: 3 } },
      { id: 'B', text: '你有点怕它，想把它压回去。', vector: {}, avoid: true },
      { id: 'C', text: '你借着夜色，想通了一些白天想不通的事。', vector: { space: 2, inward: 1 } },
      { id: 'D', text: '你觉得孤独，想找个人说说话。', vector: { warmth: 2 } },
    ] },
  { id: 18, format: 'night', context: null,
    prompt: '天快亮的时候，夜色一点点褪去，像退潮。',
    options: [
      { id: 'A', text: '你舍不得这夜，还想再待一会儿。', vector: { space: 2, melancholy: 1 } },
      { id: 'B', text: '你松一口气，新的一天终于来了。', vector: { warmth: 1, order: 1 } },
      { id: 'C', text: '你想起这一夜，觉得自己又熬过来了。', vector: { inward: 2 } },
      { id: 'D', text: '你已经睡熟了，没看见天亮。', vector: {}, avoid: true },
    ] },

  // —— echo 回声（7 题）——
  { id: 19, format: 'echo', context: null,
    prompt: '人群里，有人无意说出你心里想过千百遍、却从没说出口的那句话。',
    options: [
      { id: 'A', text: '你愣住，像被自己的回声击中。', vector: { inward: 2, melancholy: 1 } },
      { id: 'B', text: '你顺着话接下去，好像你们早就认识。', vector: { warmth: 2, groove: 1 } },
      { id: 'C', text: '你默默记住这个人，觉得他懂你。', vector: { inward: 1, space: 1 } },
      { id: 'D', text: '你笑笑，没往心里去。', vector: {}, avoid: true },
    ] },
  { id: 20, format: 'echo', context: null,
    prompt: '如果人生是一场演出，你更想站在哪一种舞台中央？',
    options: [
      { id: 'A', text: '一座巨大的剧院，坐满几千人。', vector: { aura: 3 } },
      { id: 'B', text: '一间小酒馆，离每个人都很近。', vector: { warmth: 3 } },
      { id: 'C', text: '没有舞台，我随时可以走掉。', vector: { space: 2, inward: 1 } },
      { id: 'D', text: '没想过。', vector: {}, avoid: true },
    ] },
  { id: 21, format: 'echo', context: null,
    prompt: '一群人的笑声里，你的笑声也融了进去，听不出是谁。',
    options: [
      { id: 'A', text: '你喜欢这种被裹进去的感觉，热烘烘的。', vector: { warmth: 2, groove: 1 } },
      { id: 'B', text: '你笑着笑着，忽然有一瞬走神，像在看别人。', vector: { inward: 2, space: 1 } },
      { id: 'C', text: '你想让这笑声再响一点，响得所有人都听见。', vector: { aura: 2, intensity: 1 } },
      { id: 'D', text: '你也跟着笑起来，越笑越真心。', vector: { warmth: 2 } },
    ] },
  { id: 22, format: 'echo', context: null,
    prompt: '你说了一句话，满屋子的人安静了一秒，然后一齐看向你。',
    options: [
      { id: 'A', text: '你享受这一秒，像全场被你按了暂停。', vector: { aura: 2, intensity: 1 } },
      { id: 'B', text: '你有点不自在，想把话题轻轻带过去。', vector: { inward: 1, space: 1 } },
      { id: 'C', text: '你顺着这一秒，把话讲得更深。', vector: { aura: 1, order: 1 } },
      { id: 'D', text: '你慌了，觉得自己说错话。', vector: {}, avoid: true },
    ] },
  { id: 23, format: 'echo', context: null,
    prompt: '聚会前你挑衣服：一套剪裁挺括、纤尘不染，一套洗旧发白、随性贴身。',
    options: [
      { id: 'A', text: '你选挺括那套，想让人看见你的体面。', vector: { texture: 3 } },
      { id: 'B', text: '你选旧的那套，舒服、自在、像你自己。', vector: { warmth: 2, space: 1 } },
      { id: 'C', text: '看场合，见重要的人就穿体面点。', vector: { order: 2, texture: 1 } },
      { id: 'D', text: '你懒得挑，抓到哪件穿哪件。', vector: { groove: 1 } },
    ] },
  { id: 24, format: 'echo', context: null,
    prompt: '一群人跟着节拍晃动，动作不齐，却莫名地合拍。',
    options: [
      { id: 'A', text: '你跟着晃，觉得身体先于思想懂了。', vector: { groove: 3 } },
      { id: 'B', text: '你看着他们，觉得人原来可以这么简单快乐。', vector: { warmth: 2 } },
      { id: 'C', text: '你跟着人群一起晃，热腾腾地融进去。', vector: { groove: 2, warmth: 1 } },
      { id: 'D', text: '你觉得吵，想离开。', vector: { inward: 1 } },
    ] },
  { id: 25, format: 'echo', context: null,
    prompt: '热闹散场后，你一个人走在回家的路上。',
    options: [
      { id: 'A', text: '你还在回味刚才的喧闹，嘴角带着笑。', vector: { warmth: 2, nostalgia: 1 } },
      { id: 'B', text: '你享受这种热闹之后的空，像回声慢慢落下。', vector: { space: 2, melancholy: 1 } },
      { id: 'C', text: '你忽然觉得孤单，热闹反而衬得现在更静。', vector: { melancholy: 2, inward: 1 } },
      { id: 'D', text: '你松了口气，终于可以一个人待着了。', vector: { space: 2 } },
    ] },

  // —— drift 漂浮（10 题）——
  { id: 26, format: 'drift', context: null,
    prompt: '什么都不必做的一个下午，时间像水一样，不急着流向哪里。',
    options: [
      { id: 'A', text: '你让自己漂着，没有方向也挺好。', vector: { space: 2, groove: 1 } },
      { id: 'B', text: '漂着漂着，你想起一些久远的事。', vector: { nostalgia: 2, inward: 1 } },
      { id: 'C', text: '你需要手里有点事，不然会慌。', vector: { order: 2 } },
      { id: 'D', text: '你睡了一觉，醒来天已经黑了。', vector: {}, avoid: true },
    ] },
  { id: 27, format: 'drift', context: null,
    prompt: '两件外套，一件洗得发白、边缘磨出毛边；一件崭新挺括，还没拆吊牌。',
    options: [
      { id: 'A', text: '你更想穿那件旧的——它像你。', vector: { nostalgia: 2, warmth: 1 } },
      { id: 'B', text: '你更想要那件新的，崭新的开始。', vector: { texture: 3, order: 1 } },
      { id: 'C', text: '你会两件都要，旧的舒服，新的体面。', vector: { texture: 1, warmth: 1 } },
      { id: 'D', text: '你无所谓穿哪件。', vector: {}, avoid: true },
    ] },
  { id: 28, format: 'drift', context: null,
    prompt: '你在一条安静的河边坐了很久，看水从脚边流走。',
    options: [
      { id: 'A', text: '你跟着水流走神，脑子慢慢空了。', vector: { space: 2, groove: 1 } },
      { id: 'B', text: '你想起时间也是这样流走，一去不回。', vector: { melancholy: 2, nostalgia: 1 } },
      { id: 'C', text: '你坐不住，总觉得该起来做点什么。', vector: { order: 2 } },
      { id: 'D', text: '你捡起一块石头，摩挲它光滑的表面。', vector: { texture: 3 } },
    ] },
  { id: 29, format: 'drift', context: null,
    prompt: '你翻开两本旧笔记，一本字迹工工整整，一本满是涂改、批注和折角。',
    options: [
      { id: 'A', text: '你更珍惜那本工整的，像把日子过得一丝不苟。', vector: { texture: 3 } },
      { id: 'B', text: '你更珍惜那本涂改的，它更真实、更有温度。', vector: { warmth: 2, nostalgia: 1 } },
      { id: 'C', text: '你两本都喜欢，各有各的好。', vector: { order: 1, warmth: 1 } },
      { id: 'D', text: '你其实很少写笔记。', vector: { order: 1 } },
    ] },
  { id: 30, format: 'drift', context: null,
    prompt: '你飘在半空，脚下是辽阔的原野；不远处，有一间亮着灯的小屋。',
    options: [
      { id: 'A', text: '你被这片辽阔震住，觉得自己渺小又自由。', vector: { aura: 3 } },
      { id: 'B', text: '你更想落回那间小屋，缩进熟悉的温暖里。', vector: { warmth: 2, space: 1 } },
      { id: 'C', text: '你既想停在半空看远方，也惦记屋里的灯。', vector: { aura: 1, warmth: 1 } },
      { id: 'D', text: '你只觉得冷，想快点落地。', vector: { order: 1 } },
    ] },
  { id: 31, format: 'drift', context: null,
    prompt: '一段没有安排的空白时间，像一条看不见两岸的河。',
    options: [
      { id: 'A', text: '你顺着它漂，看它把你带到哪里。', vector: { groove: 2, space: 1 } },
      { id: 'B', text: '你心里发慌，总想往河里扔点什么填满它。', vector: { order: 2 } },
      { id: 'C', text: '你怀念起某个同样空白的、回不去的下午。', vector: { melancholy: 2, nostalgia: 1 } },
      { id: 'D', text: '你把它睡过去了。', vector: { space: 1 } },
    ] },
  { id: 32, format: 'drift', context: null,
    prompt: '风穿过树叶，声音由远及近，像海浪。',
    options: [
      { id: 'A', text: '你闭眼听，仿佛自己正漂在海上。', vector: { space: 2, groove: 1 } },
      { id: 'B', text: '你想起海边，想起某个夏天。', vector: { nostalgia: 2, warmth: 1 } },
      { id: 'C', text: '你想知道是哪种树，抬头去看。', vector: { order: 1 } },
      { id: 'D', text: '你嫌吵，走开了。', vector: { inward: 1 } },
    ] },
  { id: 33, format: 'drift', context: null,
    prompt: '时间的刻度忽然消失了，分不清现在是几点、星期几。',
    options: [
      { id: 'A', text: '你觉得自由，像被从表盘上放了出来。', vector: { space: 2, groove: 1 } },
      { id: 'B', text: '你有点慌，想找回一个确定的时间点。', vector: { order: 2 } },
      { id: 'C', text: '你怀念起从前那种"日子数得清"的踏实。', vector: { nostalgia: 2, warmth: 1 } },
      { id: 'D', text: '你无所谓，反正都差不多。', vector: {}, avoid: true },
    ] },
  { id: 34, format: 'drift', context: null,
    prompt: '你像一片叶子，从树上落下，在空中转了好几圈才落地。',
    options: [
      { id: 'A', text: '你享受那几圈，慢、轻、没有目的地。', vector: { space: 2, groove: 1 } },
      { id: 'B', text: '你有点舍不得离开树，落地像告别。', vector: { melancholy: 2, nostalgia: 1 } },
      { id: 'C', text: '你更想快点落地，落定才安心。', vector: { order: 2 } },
      { id: 'D', text: '你从没想过当一片叶子。', vector: { groove: 1 } },
    ] },
  { id: 35, format: 'drift', context: null,
    prompt: '一整片空白摊在你面前，像刚下过雪的原野。',
    options: [
      { id: 'A', text: '你想在上面踩出第一串脚印。', vector: { groove: 2, intensity: 1 } },
      { id: 'B', text: '你舍不得踩，只想看着它完整地白着。', vector: { texture: 2, nostalgia: 1 } },
      { id: 'C', text: '你想起童年的雪，心里软了一下。', vector: { nostalgia: 2, warmth: 1 } },
      { id: 'D', text: '你没感觉，反正雪总会化。', vector: { order: 1 } },
    ] },

  // —— throb 悸动（6 题）——
  { id: 36, format: 'throb', context: null,
    prompt: '有一样东西你渴望了很久，它总在深夜回来敲门。',
    options: [
      { id: 'A', text: '你想顺着这股劲，看看它通向哪里。', vector: { intensity: 2, groove: 1 } },
      { id: 'B', text: '你把它按回去，等它自己冷却。', vector: {}, avoid: true },
      { id: 'C', text: '你把它写下来，让它不再在心里吵。', vector: { inward: 2, texture: 1 } },
      { id: 'D', text: '你把这股劲烧起来，做成一件大事。', vector: { intensity: 3 } },
    ] },
  { id: 37, format: 'throb', context: null,
    prompt: '心脏忽然漏跳了一拍，又重重地补上。',
    options: [
      { id: 'A', text: '你喜欢这种强烈的存在感，像身体在提醒你活着。', vector: { intensity: 2, aura: 1 } },
      { id: 'B', text: '你有点慌，怕自己出了什么问题。', vector: { order: 1 } },
      { id: 'C', text: '你停下来，静静感受那一瞬间。', vector: { space: 2, inward: 1 } },
      { id: 'D', text: '你没当回事，继续忙。', vector: { order: 1 } },
    ] },
  { id: 38, format: 'throb', context: null,
    prompt: '某种情绪涌上来，堵在胸口，上不去也下不来。',
    options: [
      { id: 'A', text: '你想找个人，把它整个倒出来。', vector: { warmth: 2, intensity: 1 } },
      { id: 'B', text: '你让它堵着，慢慢自己化开。', vector: { space: 2, inward: 1 } },
      { id: 'C', text: '你想做点什么，把它用掉。', vector: { intensity: 2, groove: 1 } },
      { id: 'D', text: '你把它压下去，装作没事。', vector: { inward: 1 } },
    ] },
  { id: 39, format: 'throb', context: null,
    prompt: '你看着镜子里自己的眼睛，忽然被一种说不清的冲动攫住。',
    options: [
      { id: 'A', text: '你想做一件轰轰烈烈的事，不计后果。', vector: { intensity: 3 } },
      { id: 'B', text: '你想去很远的地方，把一切重新开始。', vector: { space: 2, groove: 1 } },
      { id: 'C', text: '你被自己吓到，赶紧移开眼睛。', vector: {}, avoid: true },
      { id: 'D', text: '你想把这一刻记住，它很珍贵。', vector: { aura: 2, inward: 1 } },
    ] },
  { id: 40, format: 'throb', context: null,
    prompt: '站在高处的边缘，风很大，你忽然很想张开双臂。',
    options: [
      { id: 'A', text: '你想喊出来，让风把声音带走。', vector: { intensity: 2, aura: 1 } },
      { id: 'B', text: '你想飞出去，不是坠落，是释放。', vector: { intensity: 2, space: 1 } },
      { id: 'C', text: '你抓紧栏杆，退后一步。', vector: { order: 1 } },
      { id: 'D', text: '你只是静静看着远方，觉得开阔。', vector: { aura: 3 } },
    ] },
  { id: 41, format: 'throb', context: null,
    prompt: '一股想哭的冲动毫无预兆地冒出来，眼眶先热了。',
    options: [
      { id: 'A', text: '你让它流出来，痛痛快快。', vector: { intensity: 2, warmth: 1 } },
      { id: 'B', text: '你把它忍回去，红了眼也不出声。', vector: { inward: 2, space: 1 } },
      { id: 'C', text: '你转过身，不想让人看见。', vector: { inward: 1 } },
      { id: 'D', text: '你有点莫名其妙，把它压下去了。', vector: {}, avoid: true },
    ] },

  // —— surge 高涨（7 题）——
  { id: 42, format: 'surge', context: null,
    prompt: '某个瞬间，所有情绪都堆到嗓子眼，像潮水到了最高处。',
    options: [
      { id: 'A', text: '你屏住呼吸，让它砸下来。', vector: { intensity: 2, aura: 1 } },
      { id: 'B', text: '你希望这一刻慢一点，别那么快结束。', vector: { space: 2, nostalgia: 1 } },
      { id: 'C', text: '你准备好和所有人一起冲上去。', vector: { intensity: 2, groove: 2 } },
      { id: 'D', text: '你退到一边，看着就好。', vector: {}, avoid: true },
    ] },
  { id: 43, format: 'surge', context: null,
    prompt: '号角声响起，一场属于你的战役就要打响。',
    options: [
      { id: 'A', text: '你热血上涌，第一个冲在最前面。', vector: { intensity: 3 } },
      { id: 'B', text: '你握紧拳头，心里已经排好了战术。', vector: { order: 2, intensity: 1 } },
      { id: 'C', text: '你和身边的伙伴对视一眼，一起上。', vector: { warmth: 2, groove: 1 } },
      { id: 'D', text: '你有点犹豫，想先看看局势。', vector: { inward: 1 } },
    ] },
  { id: 44, format: 'surge', context: null,
    prompt: '积蓄了很久的力量，终于到了一个必须释放的临界点。',
    options: [
      { id: 'A', text: '你选择把它一次爆出来，不留余力。', vector: { intensity: 3 } },
      { id: 'B', text: '你把它放进一件作品里，慢慢打磨。', vector: { texture: 3, order: 1 } },
      { id: 'C', text: '你带着它跑起来，让身体把它甩出去。', vector: { groove: 2, intensity: 1 } },
      { id: 'D', text: '你再等等，怕释放了就没有了。', vector: { inward: 1 } },
    ] },
  { id: 45, format: 'surge', context: null,
    prompt: '人声鼎沸里，你举起手，想说出那句憋了很久的话。',
    options: [
      { id: 'A', text: '你喊出来，让所有人都听见。', vector: { intensity: 2, aura: 2 } },
      { id: 'B', text: '你说得有条有理，一句一句砸实。', vector: { order: 2, intensity: 1 } },
      { id: 'C', text: '你站起来，身体比语言更先表态。', vector: { groove: 2, intensity: 1 } },
      { id: 'D', text: '你又把手放下了，算了。', vector: {}, avoid: true },
    ] },
  { id: 46, format: 'surge', context: null,
    prompt: '一段旋律在胸腔里越堆越高，快要溢出来。',
    options: [
      { id: 'A', text: '你忍不住跟着哼，让它往外冒。', vector: { groove: 2, warmth: 1 } },
      { id: 'B', text: '你闭上眼睛，让它在身体里轰然作响。', vector: { intensity: 2, inward: 1 } },
      { id: 'C', text: '你想把它变成一首完整的歌，一句一句搭。', vector: { texture: 2, order: 1 } },
      { id: 'D', text: '你没察觉，它自己就散了。', vector: { space: 1 } },
    ] },
  { id: 47, format: 'surge', context: null,
    prompt: '决定已下，没有退路了，你反而松了口气。',
    options: [
      { id: 'A', text: '你一步跨出去，头也不回。', vector: { intensity: 2, groove: 1 } },
      { id: 'B', text: '你按着心里的清单，一件件把路铺好。', vector: { order: 3 } },
      { id: 'C', text: '你想和在意的人大声宣布这个决定。', vector: { warmth: 2, aura: 1 } },
      { id: 'D', text: '你还是有点慌，想再拖一拖。', vector: { inward: 1 } },
    ] },
  { id: 48, format: 'surge', context: null,
    prompt: '终点就在前面，人群在你身后呐喊，风灌满你的耳朵。',
    options: [
      { id: 'A', text: '你用尽全力冲刺，什么也不想。', vector: { intensity: 3 } },
      { id: 'B', text: '你享受这万众瞩目的时刻，越喊越来劲。', vector: { aura: 3 } },
      { id: 'C', text: '你按自己的节奏，稳稳地冲过去。', vector: { order: 2, groove: 1 } },
      { id: 'D', text: '你放慢脚步，觉得不必那么拼。', vector: { space: 1 } },
    ] },
];
