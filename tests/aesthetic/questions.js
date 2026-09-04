// 48 道"美学氛围题"（题库）。全部为 4 选项，单选（前端每题选 1 项）。
//
// 出题哲学（本包区别于"穿搭问卷"的关键）：题目绝不同"你喜欢哪种风格 / 你的穿搭是哪种"，
// 只测**此刻的审美直觉**：你对光与暗、繁与简、旧与新、甜与刺的本能倾向。流派是结果，
// 不是提问素材。每一题都是一小段**审美切片**，用意象开场（一间房间、一束光、一件旧物、
// 一处风景、一枚符号），选项写"你此刻的感受 / 偏好"。
//
// 文字铁律（重要）：**选项绝不直接点破品类/流派标签**——不出现"粉色 / 可爱 / 甜甜的 /
// 蕾丝 / 玩偶 / 糖果 / Kawaii / 哥特 / 叛逆"这类词，甜与萌一律用质地表达（绵、软、嫩、
// 圆、浅、暖、想亲近），暗与反叛用氛围表达（深、沉、不按常理、有自己的主张）。题目只该
// 测出倾向，不该让用户一眼看出"这是在测哪一卦"。避免纹身等"很多人的个人选择会回避"的
// 身体改造场景——它让不相关的人被迫选回避，测不到真实审美。
//
// 6 种"美学氛围题型" format（供 server.js 分层抽样）：
//   tint    色调（8 题）  —— 光影、颜色、一天中的光   · 主打 luminance / dulcet / numinous
//   nest    巢居（10 题） —— 房间、陈设、居住的角落  · 主打 ornate / organic / childlike
//   keepsake 旧物（8 题） —— 旧物、记忆、传家的东西  · 主打 retro / numinous / dulcet
//   garb    衣装（8 题）  —— 外表、姿态、愿意戴的脸  · 主打 theatrical / unruly / childlike
//   vista   景致（8 题）  —— 风景、想去的地方        · 主打 ethereal / organic / luminance
//   glyph   印记（6 题）  —— 符号、图腾、信仰        · 主打 numinous / unruly / ornate
//
// 向量净化原则（务必保持，改题文字时不要破坏）：
//   - 每个选项只主攻 1–2 个维度，系数 +1 / +2 / +3，全部非负。
//   - 不写负系数："不倾向某端"通过"给对立维度不加分"来表达（低分端自然落空）。
//   - "回避 / 算了 / 没感觉 / 无所谓"的选项：vector 留空 + avoid: true，用于"无偏好检测"。
//     注意密度：约 1/3 的题保留 avoid 即可（本库 16 处）。
module.exports = [
  // —— tint 色调（8 题）——
  { id: 1, format: 'tint', context: null,
    prompt: '如果一间房间只能有一种颜色，你会选——',
    options: [
      { id: 'A', text: '奶白或米色，干净又温柔。', vector: { luminance: 2, dulcet: 1 } },
      { id: 'B', text: '墨黑或深绿，沉静有分量。', vector: { numinous: 2 } },
      { id: 'C', text: '雾蓝或灰紫，介于梦与现实之间。', vector: { ethereal: 2 } },
      { id: 'D', text: '我不在乎颜色，功能舒服就行。', vector: {}, avoid: true },
    ] },
  { id: 2, format: 'tint', context: null,
    prompt: '一天里，你最想停留在哪一刻的光里？',
    options: [
      { id: 'A', text: '清晨，干净透亮的日光。', vector: { luminance: 3 } },
      { id: 'B', text: '傍晚，把一切都镀成旧金色的光。', vector: { dulcet: 2, retro: 1 } },
      { id: 'C', text: '深夜，月光与灯影的交界。', vector: { ethereal: 2, numinous: 1 } },
      { id: 'D', text: '正午，白晃晃的、躲不开的强光。', vector: { theatrical: 2, luminance: 1 } },
    ] },
  { id: 3, format: 'tint', context: null,
    prompt: '一面墙上的光斑，你更喜欢哪一种——',
    options: [
      { id: 'A', text: '整片明亮的，像把阳光请了进来。', vector: { luminance: 3 } },
      { id: 'B', text: '碎碎的、晃动的，像树影。', vector: { organic: 2 } },
      { id: 'C', text: '从高处漏下来的一道，让人屏住呼吸。', vector: { numinous: 3 } },
      { id: 'D', text: '一束追光，让人想站到它下面去。', vector: { theatrical: 3 } },
    ] },
  { id: 4, format: 'tint', context: null,
    prompt: '同样是一杯热饮，你更愿意它看起来——',
    options: [
      { id: 'A', text: '清亮透明，像能看透杯底。', vector: { luminance: 2 } },
      { id: 'B', text: '颜色淡而温，捧在手里舍不得放。', vector: { dulcet: 3 } },
      { id: 'C', text: '盛在粗粝的陶器里，杯沿留着手的痕迹。', vector: { organic: 2, retro: 1 } },
      { id: 'D', text: '能喝就行，样子不重要。', vector: {}, avoid: true },
    ] },
  { id: 5, format: 'tint', context: null,
    prompt: '雨后的天空，最打动你的是——',
    options: [
      { id: 'A', text: '被洗得发亮的蓝。', vector: { luminance: 3 } },
      { id: 'B', text: '那种说不清颜色的、柔和的灰。', vector: { ethereal: 2 } },
      { id: 'C', text: '云缝里透下来的一束，干净得不敢碰。', vector: { numinous: 2, dulcet: 1 } },
      { id: 'D', text: '一道骤然劈开整个天空的闪电。', vector: { theatrical: 3 } },
    ] },
  { id: 6, format: 'tint', context: null,
    prompt: '两种调子——鲜亮的、和旧旧的，你更愿意住在哪一种里？',
    options: [
      { id: 'A', text: '鲜亮的颜色，一眼看过去心里就松快。', vector: { dulcet: 2, luminance: 1 } },
      { id: 'B', text: '泛黄褪色的旧调子，边角都磨软了。', vector: { retro: 3 } },
      { id: 'C', text: '黑白灰，安静又干净。', vector: { numinous: 2 } },
      { id: 'D', text: '撞得厉害的颜色，隔着一条街都能看见。', vector: { theatrical: 2, unruly: 1 } },
    ] },
  { id: 7, format: 'tint', context: null,
    prompt: '夜里的一支蜡烛，你更想它是——',
    options: [
      { id: 'A', text: '纯白的，光也安静。', vector: { numinous: 3 } },
      { id: 'B', text: '颜色很浅、气味也淡的那种。', vector: { dulcet: 2 } },
      { id: 'C', text: '手作的，烛身留着没抹平的纹。', vector: { organic: 2 } },
      { id: 'D', text: '我不用蜡烛。', vector: {}, avoid: true },
    ] },
  { id: 8, format: 'tint', context: null,
    prompt: '一面镜子里的你，你更希望镜面是——',
    options: [
      { id: 'A', text: '擦得很亮，照得清清楚楚。', vector: { luminance: 2 } },
      { id: 'B', text: '蒙着一层雾，像隔着一场梦。', vector: { ethereal: 3 } },
      { id: 'C', text: '框是旧的，刻着细细的纹。', vector: { retro: 2, ornate: 1 } },
      { id: 'D', text: '镶着金、雕满花的，华丽得有点过分。', vector: { ornate: 3, theatrical: 1 } },
    ] },

  // —— nest 巢居（10 题）——
  { id: 9, format: 'nest', context: null,
    prompt: '布置你的桌面/房间时，你更偏——',
    options: [
      { id: 'A', text: '东西堆得满满当当，每件都有来处。', vector: { ornate: 2, retro: 1 } },
      { id: 'B', text: '只留最顺手的几样，其余收起来。', vector: { numinous: 1 } },
      { id: 'C', text: '放些还沾着土气的东西，让角落有生气。', vector: { organic: 3 } },
      { id: 'D', text: '摆得像布景，走进去就像走进一出戏。', vector: { theatrical: 3 } },
    ] },
  { id: 10, format: 'nest', context: null,
    prompt: '铺床的时候，你更愿意被哪一种裹住——',
    options: [
      { id: 'A', text: '绵软到能陷进去的，像陷进一团云。', vector: { dulcet: 2, childlike: 1 } },
      { id: 'B', text: '亚麻的，粗粝、透气、有它自己的纹理。', vector: { organic: 3 } },
      { id: 'C', text: '绣着花、滚着边的，铺开就是一件讲究事。', vector: { ornate: 3 } },
      { id: 'D', text: '深红丝绒的，厚得像戏院的幕布。', vector: { theatrical: 2, ornate: 1 } },
    ] },
  { id: 11, format: 'nest', context: null,
    prompt: '空出来的那面墙，你更想让它——',
    options: [
      { id: 'A', text: '挂着有年头的东西，像一本翻旧了的相册。', vector: { retro: 2, childlike: 1 } },
      { id: 'B', text: '挂一幅颜色很舒服的画，天天看不腻。', vector: { luminance: 2, ornate: 1 } },
      { id: 'C', text: '斜插几枝干花，或一截捡回来的树枝。', vector: { organic: 3 } },
      { id: 'D', text: '挂一幅让人不舒服、又忍不住一直看的画。', vector: { unruly: 2, theatrical: 1 } },
    ] },
  { id: 12, format: 'nest', context: null,
    prompt: '你的小角落，你最希望它闻起来像——',
    options: [
      { id: 'A', text: '旧书、木器和时间沉淀下来的味。', vector: { retro: 2, numinous: 1 } },
      { id: 'B', text: '刚烤出来的、带着奶香的那种暖。', vector: { dulcet: 3 } },
      { id: 'C', text: '雨后的土、还有没干的草叶。', vector: { organic: 3 } },
      { id: 'D', text: '没什么特别的味。', vector: {}, avoid: true },
    ] },
  { id: 13, format: 'nest', context: null,
    prompt: '房间里最显眼的那把椅子，你希望它是——',
    options: [
      { id: 'A', text: '宽宽的、陷进去就不想起来的。', vector: { dulcet: 2, childlike: 1 } },
      { id: 'B', text: '线条干净利落，往那一放就是点睛。', vector: { ornate: 2 } },
      { id: 'C', text: '旧的藤椅或木椅，坐过很多年。', vector: { organic: 2, retro: 1 } },
      { id: 'D', text: '一把说不清是不是椅子的东西。', vector: { unruly: 3 } },
    ] },
  { id: 14, format: 'nest', context: null,
    prompt: '如果桌角要放一件小东西，你会放——',
    options: [
      { id: 'A', text: '一块捡来的石头，或一颗掉下来的松果。', vector: { organic: 3 } },
      { id: 'B', text: '一个圆圆的、透光的小物件。', vector: { childlike: 2, luminance: 1 } },
      { id: 'C', text: '一个旧旧的小东西，摸着就知道有人用过。', vector: { retro: 3 } },
      { id: 'D', text: '一个会让人多看一眼的古怪玩意儿。', vector: { unruly: 2, theatrical: 1 } },
    ] },
  { id: 15, format: 'nest', context: null,
    prompt: '你的柜子打开，你会更希望看到——',
    options: [
      { id: 'A', text: '按颜色挂得整整齐齐的一排。', vector: { ornate: 2 } },
      { id: 'B', text: '几件旧旧的、穿过很多遍的。', vector: { organic: 2, retro: 1 } },
      { id: 'C', text: '一些小小件的、颜色很嫩的衣服。', vector: { childlike: 3 } },
      { id: 'D', text: '一柜子夸张的行头，随便拿一件都像要上台。', vector: { theatrical: 3 } },
    ] },
  { id: 16, format: 'nest', context: null,
    prompt: '房间里的一面小镜子，你更希望它——',
    options: [
      { id: 'A', text: '带着一圈精致的花边或金框。', vector: { ornate: 3 } },
      { id: 'B', text: '是捡来的旧镜子，边角磨得发亮。', vector: { organic: 2 } },
      { id: 'C', text: '贴着攒了好久的画片，像小时候。', vector: { childlike: 3 } },
      { id: 'D', text: '普通的镜子就行。', vector: {}, avoid: true },
    ] },
  { id: 17, format: 'nest', context: null,
    prompt: '深夜里入睡前，你更想被什么围着——',
    options: [
      { id: 'A', text: '一堆毛茸茸软乎乎的，埋进去就安心。', vector: { childlike: 2, dulcet: 1 } },
      { id: 'B', text: '清清爽爽的空间，什么多余的东西都不放。', vector: { numinous: 2 } },
      { id: 'C', text: '书和旧物堆成的暖角落，随手够得着。', vector: { retro: 2, ornate: 1 } },
      { id: 'D', text: '一幅盯久了会让人睡不着的画。', vector: { unruly: 2, ethereal: 1 } },
    ] },
  { id: 18, format: 'nest', context: null,
    prompt: '如果这个房间是一种情绪，你希望它是——',
    options: [
      { id: 'A', text: '温温软软的，让人想赖着不走。', vector: { dulcet: 3 } },
      { id: 'B', text: '安静得能听见自己的呼吸。', vector: { numinous: 3 } },
      { id: 'C', text: '敞亮的、带一点野气的自在。', vector: { organic: 2, ethereal: 1 } },
      { id: 'D', text: '有一点戏剧性，像总有人在看着你。', vector: { theatrical: 3 } },
    ] },

  // —— keepsake 旧物（8 题）——
  { id: 19, format: 'keepsake', context: null,
    prompt: '一件旧物传到你手上，你更看重它——',
    options: [
      { id: 'A', text: '它身后那段日子、那些没说完的话。', vector: { retro: 2, numinous: 1 } },
      { id: 'B', text: '那种旧旧的、被无数双手摸过的质感。', vector: { retro: 2, organic: 1 } },
      { id: 'C', text: '它能不能让现在的生活更耐看。', vector: { ornate: 2 } },
      { id: 'D', text: '旧东西没什么特别的。', vector: {}, avoid: true },
    ] },
  { id: 20, format: 'keepsake', context: null,
    prompt: '一张旧照片，最打动你的是——',
    options: [
      { id: 'A', text: '那些再也回不去的时间。', vector: { retro: 3 } },
      { id: 'B', text: '照片里那个人的神情。', vector: { numinous: 2 } },
      { id: 'C', text: '照片本身的黄、和磨毛了的边。', vector: { retro: 2, organic: 1 } },
      { id: 'D', text: '照片里那人一身夸张的旧衣裳。', vector: { theatrical: 2, retro: 1 } },
    ] },
  { id: 21, format: 'keepsake', context: null,
    prompt: '你更愿意在架子上收藏——',
    options: [
      { id: 'A', text: '旧书、旧唱片，或盖着旧邮戳的信封。', vector: { retro: 3 } },
      { id: 'B', text: '新的、会反光的东西，擦一擦就亮。', vector: { luminance: 2, dulcet: 1 } },
      { id: 'C', text: '手做的、带着指纹的东西。', vector: { organic: 3 } },
      { id: 'D', text: '一些别人看不出门道、我却懂的东西。', vector: { unruly: 2, ethereal: 1 } },
    ] },
  { id: 22, format: 'keepsake', context: null,
    prompt: '一件旧物，你更想拿它来——',
    options: [
      { id: 'A', text: '想起某段快要忘掉的日子。', vector: { retro: 2, numinous: 1 } },
      { id: 'B', text: '让今天过得再舒心、再熨帖一点。', vector: { dulcet: 3 } },
      { id: 'C', text: '摆着看，把日子衬得更讲究。', vector: { ornate: 2 } },
      { id: 'D', text: '当一件道具，用它把故事讲给别人听。', vector: { theatrical: 2 } },
    ] },
  { id: 23, format: 'keepsake', context: null,
    prompt: '长辈传下来一只旧木盒，你最希望里面是——',
    options: [
      { id: 'A', text: '泛黄的信，和一张张旧照片。', vector: { retro: 3 } },
      { id: 'B', text: '手缝的小东西，针脚细细密密的。', vector: { organic: 2, dulcet: 1 } },
      { id: 'C', text: '一支旧钢笔，或一块停了的表。', vector: { retro: 2, numinous: 1 } },
      { id: 'D', text: '什么都可以，有来处就行。', vector: {}, avoid: true },
    ] },
  { id: 24, format: 'keepsake', context: null,
    prompt: '翻旧东西时，你最常想起的是——',
    options: [
      { id: 'A', text: '小时候那个还没长成的自己。', vector: { retro: 2, childlike: 1 } },
      { id: 'B', text: '这些东西陪过的人。', vector: { numinous: 2 } },
      { id: 'C', text: '那个年代特有的样子。', vector: { retro: 3 } },
      { id: 'D', text: '那时候的自己，多么不肯照别人的规矩来。', vector: { unruly: 2, retro: 1 } },
    ] },
  { id: 25, format: 'keepsake', context: null,
    prompt: '如果一件旧物有自己的脾气，你希望它是——',
    options: [
      { id: 'A', text: '安静的、守着这个家的。', vector: { numinous: 3 } },
      { id: 'B', text: '软乎乎的，让人想抱一下。', vector: { dulcet: 3 } },
      { id: 'C', text: '有点野，谁也驯不服它。', vector: { unruly: 3 } },
      { id: 'D', text: '爱出风头，站在它旁边都显得热闹。', vector: { theatrical: 3 } },
    ] },
  { id: 26, format: 'keepsake', context: null,
    prompt: '一格玻璃柜，你更想摆满——',
    options: [
      { id: 'A', text: '各地淘来的小玩意，个个有故事。', vector: { retro: 2, organic: 1 } },
      { id: 'B', text: '一堆圆滚滚、看着就让人心软的小物。', vector: { childlike: 3 } },
      { id: 'C', text: '精致得让人不敢碰的东西。', vector: { ornate: 3 } },
      { id: 'D', text: '一只只夸张的面具，拿起来就能换一张脸。', vector: { theatrical: 3 } },
    ] },

  // —— garb 衣装（8 题）——
  { id: 27, format: 'garb', context: null,
    prompt: '给自己一个"日常的样子"，你更偏——',
    options: [
      { id: 'A', text: '干净利落，清爽明亮。', vector: { luminance: 2 } },
      { id: 'B', text: '多一点味道，让人忍不住多看两眼。', vector: { theatrical: 2, dulcet: 1 } },
      { id: 'C', text: '怎么舒服怎么来，不看别人的眼色。', vector: { unruly: 2 } },
      { id: 'D', text: '没想过这个问题。', vector: {}, avoid: true },
    ] },
  { id: 28, format: 'garb', context: null,
    prompt: '穿一件衣服，你最在意它——',
    options: [
      { id: 'A', text: '能不能让人一眼记住我。', vector: { theatrical: 3 } },
      { id: 'B', text: '穿着是不是我自己的样子。', vector: { unruly: 2 } },
      { id: 'C', text: '够不够软和，让人想靠近。', vector: { dulcet: 2, childlike: 1 } },
      { id: 'D', text: '料子是不是天然亲肤的。', vector: { organic: 2 } },
    ] },
  { id: 29, format: 'garb', context: null,
    prompt: '你更愿意自己被形容成——',
    options: [
      { id: 'A', text: '干净的、像一束光。', vector: { luminance: 2 } },
      { id: 'B', text: '让人看不透的。', vector: { ethereal: 2, numinous: 1 } },
      { id: 'C', text: '有自己的主张、不好惹的。', vector: { unruly: 3, theatrical: 1 } },
      { id: 'D', text: '普普通通就好，别让人注意。', vector: {}, avoid: true },
    ] },
  { id: 30, format: 'garb', context: null,
    prompt: '一场可以尽情打扮的场合，你更想——',
    options: [
      { id: 'A', text: '站在最亮的地方，让所有人都记得我。', vector: { theatrical: 3 } },
      { id: 'B', text: '穿成小时候盼过的那身样子。', vector: { childlike: 2, dulcet: 1 } },
      { id: 'C', text: '穿成一个连自己都认不出的我。', vector: { unruly: 3, theatrical: 1 } },
      { id: 'D', text: '比平时再大胆十倍，把场子搅热。', vector: { theatrical: 2, unruly: 1 } },
    ] },
  { id: 31, format: 'garb', context: null,
    prompt: '如果有一种颜色总跟着你，它会是——',
    options: [
      { id: 'A', text: '黑白，干净又压得住。', vector: { numinous: 2 } },
      { id: 'B', text: '很浅很嫩的颜色，看着就舒服。', vector: { dulcet: 2, luminance: 1 } },
      { id: 'C', text: '一种别人不敢轻易穿的颜色。', vector: { unruly: 3, theatrical: 1 } },
      { id: 'D', text: '满身都是亮片，走到哪都晃眼。', vector: { theatrical: 2, ornate: 1 } },
    ] },
  { id: 32, format: 'garb', context: null,
    prompt: '打理自己的外表，你更觉得——',
    options: [
      { id: 'A', text: '像上台前对光，我很享受这个过程。', vector: { theatrical: 3 } },
      { id: 'B', text: '把自己捯饬得干干净净，带一点孩子气。', vector: { childlike: 2, dulcet: 1 } },
      { id: 'C', text: '全凭当天心情，别人管不着。', vector: { unruly: 3, theatrical: 1 } },
      { id: 'D', text: '越省事越好，让皮肤透口气。', vector: { organic: 2 } },
    ] },
  { id: 33, format: 'garb', context: null,
    prompt: '如果有个镜头突然对准你，你会——',
    options: [
      { id: 'A', text: '顺势摆好，享受这一下。', vector: { theatrical: 3 } },
      { id: 'B', text: '冲镜头做个怪表情，然后躲开。', vector: { childlike: 2, theatrical: 1 } },
      { id: 'C', text: '无所谓，拍就拍。', vector: { unruly: 1 } },
      { id: 'D', text: '偏要做点出格的事，让它拍个措手不及。', vector: { unruly: 3 } },
    ] },
  { id: 34, format: 'garb', context: null,
    prompt: '你心里那个"想成为的样子"，更接近——',
    options: [
      { id: 'A', text: '处处讲究、把自己收拾得一丝不苟。', vector: { ornate: 2, theatrical: 1 } },
      { id: 'B', text: '轻得能飘起来的、不像活在人间。', vector: { ethereal: 3 } },
      { id: 'C', text: '谁的规矩都不必听。', vector: { unruly: 3 } },
      { id: 'D', text: '一亮相就让人挪不开眼。', vector: { theatrical: 2, luminance: 1 } },
    ] },

  // —— vista 景致（8 题）——
  { id: 35, format: 'vista', context: null,
    prompt: '一个完全自由的周末，你更想去——',
    options: [
      { id: 'A', text: '树林、海边或山野，把鞋脱了走。', vector: { organic: 3 } },
      { id: 'B', text: '一座有年头的老城，慢慢晃。', vector: { retro: 2, ornate: 1 } },
      { id: 'C', text: '一个地图上没有的、像梦里的地方。', vector: { ethereal: 3 } },
      { id: 'D', text: '在家待着最舒服。', vector: {}, avoid: true },
    ] },
  { id: 36, format: 'vista', context: null,
    prompt: '如果推窗就是一片景，你更想要——',
    options: [
      { id: 'A', text: '开阔的、被光照得发亮的湖面。', vector: { luminance: 3 } },
      { id: 'B', text: '雾里的山，看得见又看不清。', vector: { ethereal: 3 } },
      { id: 'C', text: '自己侍弄的一片野地，有花也有草。', vector: { organic: 3 } },
      { id: 'D', text: '一场亮得不真实的光，整夜不熄。', vector: { theatrical: 2, luminance: 1 } },
    ] },
  { id: 37, format: 'vista', context: null,
    prompt: '路上走，最勾住你的是——',
    options: [
      { id: 'A', text: '那些墙皮剥落、走了几百年的老巷。', vector: { retro: 3 } },
      { id: 'B', text: '辽阔到让人出神的地方。', vector: { ethereal: 2, numinous: 1 } },
      { id: 'C', text: '没人管的荒坡和野林子。', vector: { organic: 3 } },
      { id: 'D', text: '一座说不清该不该存在的怪建筑。', vector: { unruly: 2, ethereal: 1 } },
    ] },
  { id: 38, format: 'vista', context: null,
    prompt: '一个"一直想去"的地方，它更像——',
    options: [
      { id: 'A', text: '一座被云托在半空的殿。', vector: { numinous: 3 } },
      { id: 'B', text: '一大片亮得晃眼的花田。', vector: { luminance: 2, dulcet: 1 } },
      { id: 'C', text: '一个只有我知道的、背人的角落。', vector: { organic: 2, unruly: 1 } },
      { id: 'D', text: '一座昼夜颠倒、越夜越亮的城。', vector: { theatrical: 2, ethereal: 1 } },
    ] },
  { id: 39, format: 'vista', context: null,
    prompt: '黄昏的海边，你更想——',
    options: [
      { id: 'A', text: '看天色从淡到浓，一层层换。', vector: { dulcet: 2, ethereal: 1 } },
      { id: 'B', text: '赤脚踩沙，让浪没过脚背。', vector: { organic: 3 } },
      { id: 'C', text: '站着不动，觉得这一刻有点不一样。', vector: { numinous: 3 } },
      { id: 'D', text: '让海风把头发吹得乱七八糟。', vector: { unruly: 2 } },
    ] },
  { id: 40, format: 'vista', context: null,
    prompt: '收到一张明信片，你最想要它画着什么——',
    options: [
      { id: 'A', text: '旧街、旧门、旧得泛黄的墙。', vector: { retro: 3 } },
      { id: 'B', text: '一大片软软的云，和一只圆滚滚的小东西。', vector: { childlike: 2, dulcet: 1 } },
      { id: 'C', text: '一个说不清在哪的、不太真实的地方。', vector: { ethereal: 3 } },
      { id: 'D', text: '收到什么都行。', vector: {}, avoid: true },
    ] },
  { id: 41, format: 'vista', context: null,
    prompt: '一个人在外面走，你最享受——',
    options: [
      { id: 'A', text: '和草木山水待在一起的那种静。', vector: { organic: 3 } },
      { id: 'B', text: '在陌生老街上漫无目的地走。', vector: { retro: 2, numinous: 1 } },
      { id: 'C', text: '随时可以消失、谁也不知道我在哪的自由。', vector: { unruly: 2, ethereal: 1 } },
      { id: 'D', text: '像戏里那个人一样，出场和离开都有戏。', vector: { theatrical: 3 } },
    ] },
  { id: 42, format: 'vista', context: null,
    prompt: '如果可以选一样"看得见"的东西，你想看见——',
    options: [
      { id: 'A', text: '夜里会发光、毛茸茸的小东西。', vector: { childlike: 2, luminance: 1, theatrical: 1 } },
      { id: 'B', text: '古老、崇高，让人安静下来的。', vector: { numinous: 3 } },
      { id: 'C', text: '现实里长不出来的景象。', vector: { ethereal: 3 } },
      { id: 'D', text: '一场把秩序整个掀翻的热闹。', vector: { theatrical: 2, unruly: 1 } },
    ] },

  // —— glyph 印记（6 题）——
  { id: 43, format: 'glyph', context: null,
    prompt: '如果用一个记号代表自己，你更愿意它是——',
    options: [
      { id: 'A', text: '羽毛、微光这类干干净净的东西。', vector: { numinous: 3 } },
      { id: 'B', text: '月亮、星星，属于夜的东西。', vector: { ethereal: 2, retro: 1 } },
      { id: 'C', text: '一个倒着放的、不被承认的记号。', vector: { unruly: 3 } },
      { id: 'D', text: '不需要记号代表我。', vector: {}, avoid: true },
    ] },
  { id: 44, format: 'glyph', context: null,
    prompt: '一件刻着纹的老器物，你更想细看——',
    options: [
      { id: 'A', text: '那些一圈圈绕不完的繁密纹路。', vector: { ornate: 3 } },
      { id: 'B', text: '刻痕里的旧，像藏着没讲完的事。', vector: { retro: 2, numinous: 1 } },
      { id: 'C', text: '那些不按规矩来的、说不清的刻法。', vector: { unruly: 2 } },
      { id: 'D', text: '那种隆重到不像日常用的纹样。', vector: { theatrical: 2, ornate: 1 } },
    ] },
  { id: 45, format: 'glyph', context: null,
    prompt: '要在随身的一件东西上留下一个长久的记号，你会刻——',
    options: [
      { id: 'A', text: '一朵小小的花，或一颗星。', vector: { childlike: 2, numinous: 1 } },
      { id: 'B', text: '一句旧话，或一个看不太懂的符号。', vector: { retro: 2 } },
      { id: 'C', text: '一个很狂的、没人看得懂的记号。', vector: { unruly: 3, theatrical: 1 } },
      { id: 'D', text: '什么都不留，干干净净最好。', vector: {}, avoid: true },
    ] },
  { id: 46, format: 'glyph', context: null,
    prompt: '一枚旧印章递到你手里，你更愿意它刻着——',
    options: [
      { id: 'A', text: '一个说不清来历的、庄严的图案。', vector: { numinous: 3 } },
      { id: 'B', text: '规整的几何，或一圈圈细纹。', vector: { ornate: 3 } },
      { id: 'C', text: '一个只有我懂、别人看着犯愣的记号。', vector: { unruly: 2, ethereal: 1, theatrical: 1 } },
      { id: 'D', text: '我不太用印章。', vector: {}, avoid: true },
    ] },
  { id: 47, format: 'glyph', context: null,
    prompt: '你更愿意相信哪一种"记号"的分量——',
    options: [
      { id: 'A', text: '那种让人安下心来的。', vector: { numinous: 3 } },
      { id: 'B', text: '从旧时候一代代传下来的。', vector: { retro: 3 } },
      { id: 'C', text: '自己现造的、谁也不认的。', vector: { unruly: 3, theatrical: 1 } },
      { id: 'D', text: '记号没什么分量。', vector: {}, avoid: true },
    ] },
  { id: 48, format: 'glyph', context: null,
    prompt: '一面老墙上的乱涂乱画，你更可能——',
    options: [
      { id: 'A', text: '站住看一会儿，觉得有种说不出的好看。', vector: { unruly: 2, ethereal: 1, theatrical: 1 } },
      { id: 'B', text: '拍下来，当一件作品收着。', vector: { ornate: 2 } },
      { id: 'C', text: '想：这面墙背后藏着多少事。', vector: { retro: 2, numinous: 1 } },
      { id: 'D', text: '路过，没留意。', vector: {}, avoid: true },
    ] },
];
