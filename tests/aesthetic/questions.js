// 48 道"美学氛围题"（题库）。全部为 4 选项，单选（前端每题选 1 项）。
//
// 出题哲学（本包区别于"穿搭问卷"的关键）：题目绝不同"你喜欢哪种风格 / 你的穿搭是哪种"，
// 只测**此刻的审美直觉**：你对光与暗、繁与简、旧与新、甜与刺的本能倾向。流派是结果，
// 不是提问素材。每一题都是一小段**审美切片**，用意象开场（一间房间、一束光、一件旧物、
// 一处风景、一枚符号），选项写"你此刻的感受 / 偏好"，而不是"你会买什么"。
//
// 6 种"美学氛围题型" format（供 server.js 分层抽样）：
//   tint    色调（8 题）  —— 光影、颜色、一天中的光   · 主打 luminance / dulcet / numinous
//   nest    巢居（10 题） —— 房间、陈设、居住的角落  · 主打 ornate / organic / childlike
//   keepsake 旧物（8 题） —— 旧物、记忆、传家的东西  · 主打 retro / numinous / dulcet
//   garb    衣装（8 题）  —— 外表、姿态、愿意戴的脸  · 主打 theatrical / unruly / childlike
//   vista   景致（8 题）  —— 风景、想去的地方        · 主打 ethereal / organic / luminance
//   glyph   印记（6 题）  —— 符号、图腾、信仰        · 主打 numinous / unruly / ornate
//
// 10 个"美学"维（本包无隐藏维）：
//   luminance 明度 / dulcet 甜度 / ornate 繁饰 / retro 怀旧 / organic 原生
//   unruly 乖张 / numinous 灵光 / childlike 童真 / theatrical 戏剧 / ethereal 缥缈
//
// 向量净化原则（务必保持，改题文字时不要破坏）：
//   - 每个选项只主攻 1–2 个维度，系数 +1 / +2 / +3，全部非负。
//   - 不写负系数："不倾向某端"通过"给对立维度不加分"来表达（低分端自然落空）。
//   - "回避 / 算了 / 没感觉 / 无所谓"的选项：vector 留空 + avoid: true，用于"无偏好检测"。
//     注意密度：约 1/3 的题保留 avoid 即可（本库 16 处）——过密会触发"无偏好收缩"，
//     让画像塌缩向中性、落向温和型实体。浓烈型维度（theatrical / unruly）载荷要足。
module.exports = [
  // —— tint 色调（8 题）——
  { id: 1, format: 'tint', context: null,
    prompt: '如果一间房间只能有一种颜色，你会选——',
    options: [
      { id: 'A', text: '奶白或米色，干净又温柔。', vector: { luminance: 2, dulcet: 1 } },
      { id: 'B', text: '墨黑或深绿，沉静有分量。', vector: { numinous: 1 } },
      { id: 'C', text: '雾蓝或灰紫，介于梦与现实之间。', vector: { ethereal: 2 } },
      { id: 'D', text: '我不在乎颜色，功能舒服就行。', vector: {}, avoid: true },
    ] },
  { id: 2, format: 'tint', context: null,
    prompt: '一天里，你最想停留在哪一刻的光里？',
    options: [
      { id: 'A', text: '清晨，干净透亮的日光。', vector: { luminance: 3 } },
      { id: 'B', text: '傍晚，金色温柔的斜阳。', vector: { dulcet: 2, retro: 1 } },
      { id: 'C', text: '深夜，月光与灯影的交界。', vector: { ethereal: 2, numinous: 1 } },
      { id: 'D', text: '正午，刺眼得让人睁不开眼的强光。', vector: { theatrical: 2, luminance: 1 } },
    ] },
  { id: 3, format: 'tint', context: null,
    prompt: '一面墙上的光斑，你更喜欢哪一种——',
    options: [
      { id: 'A', text: '整片明亮的，像把阳光请了进来。', vector: { luminance: 3 } },
      { id: 'B', text: '碎碎的、晃动的，像树影。', vector: { organic: 2 } },
      { id: 'C', text: '从高处漏下来的一道，像圣光。', vector: { numinous: 3 } },
      { id: 'D', text: '一道过分鲜艳、像舞台灯的光。', vector: { theatrical: 3 } },
    ] },
  { id: 4, format: 'tint', context: null,
    prompt: '同样是一杯茶，你更愿意它看起来——',
    options: [
      { id: 'A', text: '清亮透明，像能看透杯底。', vector: { luminance: 2 } },
      { id: 'B', text: '奶白柔和的，一口下去都是暖的。', vector: { dulcet: 3 } },
      { id: 'C', text: '有质感的，陶器配粗粝的杯沿。', vector: { organic: 2, retro: 1 } },
      { id: 'D', text: '能喝就行，样子不重要。', vector: {}, avoid: true },
    ] },
  { id: 5, format: 'tint', context: null,
    prompt: '雨后的天空，最打动你的是——',
    options: [
      { id: 'A', text: '被洗得发亮的蓝。', vector: { luminance: 3 } },
      { id: 'B', text: '那种说不清颜色的、柔和的灰。', vector: { ethereal: 2 } },
      { id: 'C', text: '天边那一道干干净净的光。', vector: { numinous: 2, dulcet: 1 } },
      { id: 'D', text: '一道骤然的、把天劈开的闪电。', vector: { theatrical: 3 } },
    ] },
  { id: 6, format: 'tint', context: null,
    prompt: '糖果色和旧照片色，你更愿意住在哪一种里？',
    options: [
      { id: 'A', text: '糖果色，亮亮的、甜甜的。', vector: { dulcet: 2, luminance: 1 } },
      { id: 'B', text: '旧照片色，泛黄、模糊、有故事。', vector: { retro: 3 } },
      { id: 'C', text: '黑白灰，安静又高级。', vector: { numinous: 2 } },
      { id: 'D', text: '艳到刺眼的撞色，像演出海报。', vector: { theatrical: 2, unruly: 1 } },
    ] },
  { id: 7, format: 'tint', context: null,
    prompt: '一支蜡烛，你更想它是——',
    options: [
      { id: 'A', text: '白蜡烛，光很纯。', vector: { numinous: 3 } },
      { id: 'B', text: '粉蜡烛，香香的、软软的。', vector: { dulcet: 2 } },
      { id: 'C', text: '做旧的手工蜡烛，带一点粗糙。', vector: { organic: 2 } },
      { id: 'D', text: '我不用蜡烛。', vector: {}, avoid: true },
    ] },
  { id: 8, format: 'tint', context: null,
    prompt: '一面镜子里的你，你更希望镜面是——',
    options: [
      { id: 'A', text: '擦得很亮，照得很清楚。', vector: { luminance: 2 } },
      { id: 'B', text: '雾蒙蒙的，像隔着一层梦。', vector: { ethereal: 3 } },
      { id: 'C', text: '旧旧的、带花纹的镜框。', vector: { retro: 2, ornate: 1 } },
      { id: 'D', text: '镀金的、镶满饰物的华丽大镜。', vector: { ornate: 3, theatrical: 1 } },
    ] },

  // —— nest 巢居（10 题）——
  { id: 9, format: 'nest', context: null,
    prompt: '布置你的桌面/房间时，你更偏——',
    options: [
      { id: 'A', text: '东西堆得满满当当，每件都有故事。', vector: { ornate: 2, retro: 1 } },
      { id: 'B', text: '极简留白，只留最爱用的几样。', vector: { numinous: 1 } },
      { id: 'C', text: '放一些植物或自然的小东西。', vector: { organic: 3 } },
      { id: 'D', text: '像舞台布景一样，夸张又有戏剧性。', vector: { theatrical: 3 } },
    ] },
  { id: 10, format: 'nest', context: null,
    prompt: '你的床品，你更愿意是——',
    options: [
      { id: 'A', text: '柔软的、粉粉的，像躺在云里。', vector: { dulcet: 2, childlike: 1 } },
      { id: 'B', text: '亚麻的、粗粝的、有呼吸感。', vector: { organic: 3 } },
      { id: 'C', text: '刺绣的、有花边的、精致讲究。', vector: { ornate: 3 } },
      { id: 'D', text: '猩红丝绒的，像伯爵的卧榻。', vector: { theatrical: 2, ornate: 1 } },
    ] },
  { id: 11, format: 'nest', context: null,
    prompt: '墙上挂什么，你更偏——',
    options: [
      { id: 'A', text: '自己的照片、画，有纪念意义。', vector: { retro: 2, childlike: 1 } },
      { id: 'B', text: '一幅颜色很美的装饰画。', vector: { luminance: 2, ornate: 1 } },
      { id: 'C', text: '一束干花，或一截树枝。', vector: { organic: 3 } },
      { id: 'D', text: '一幅让你不舒服、忘不掉的表现主义画。', vector: { unruly: 2, theatrical: 1 } },
    ] },
  { id: 12, format: 'nest', context: null,
    prompt: '你最希望自己的小角落，闻起来像——',
    options: [
      { id: 'A', text: '旧书和木头的味道。', vector: { retro: 2, numinous: 1 } },
      { id: 'B', text: '糖果和奶油的味道。', vector: { dulcet: 3 } },
      { id: 'C', text: '雨后的泥土和植物的味道。', vector: { organic: 3 } },
      { id: 'D', text: '没什么特别的味。', vector: {}, avoid: true },
    ] },
  { id: 13, format: 'nest', context: null,
    prompt: '房间里最显眼的那把椅子，你希望它是——',
    options: [
      { id: 'A', text: '宽大的、毛绒绒的，能陷进去。', vector: { dulcet: 2, childlike: 1 } },
      { id: 'B', text: '线条利落的、有设计感的。', vector: { ornate: 2 } },
      { id: 'C', text: '旧旧的藤椅或木椅，有使用痕迹。', vector: { organic: 2, retro: 1 } },
      { id: 'D', text: '一张荒诞的、不像椅子的椅子。', vector: { unruly: 3 } },
    ] },
  { id: 14, format: 'nest', context: null,
    prompt: '如果桌角要放一件小东西，你会放——',
    options: [
      { id: 'A', text: '一个捡来的石头或松果。', vector: { organic: 3 } },
      { id: 'B', text: '一个亮晶晶的、可爱的小摆件。', vector: { childlike: 2, luminance: 1 } },
      { id: 'C', text: '一个祖传的、旧旧的小物件。', vector: { retro: 3 } },
      { id: 'D', text: '一个会吓到客人的古怪玩意儿。', vector: { unruly: 2, theatrical: 1 } },
    ] },
  { id: 15, format: 'nest', context: null,
    prompt: '你的柜子打开，你会更希望看到——',
    options: [
      { id: 'A', text: '整整齐齐、按颜色排好的衣服。', vector: { ornate: 2 } },
      { id: 'B', text: '几件旧旧的、穿了很多次的。', vector: { organic: 2, retro: 1 } },
      { id: 'C', text: '各种可爱的小裙子和小物件。', vector: { childlike: 3 } },
      { id: 'D', text: '一柜子夸张的戏服和道具。', vector: { theatrical: 3 } },
    ] },
  { id: 16, format: 'nest', context: null,
    prompt: '房间里的一面小镜子，你更希望它——',
    options: [
      { id: 'A', text: '带一圈精致的花边或金框。', vector: { ornate: 3 } },
      { id: 'B', text: '是捡来的旧镜子，有磨痕。', vector: { organic: 2 } },
      { id: 'C', text: '贴上可爱的贴纸，像小时候。', vector: { childlike: 3 } },
      { id: 'D', text: '普通的镜子就行。', vector: {}, avoid: true },
    ] },
  { id: 17, format: 'nest', context: null,
    prompt: '深夜里，你更想被什么东西包围着入睡？',
    options: [
      { id: 'A', text: '软软的玩偶和抱枕。', vector: { childlike: 2, dulcet: 1 } },
      { id: 'B', text: '干净的、留白的空间。', vector: { numinous: 2 } },
      { id: 'C', text: '堆满书和旧物的温暖角落。', vector: { retro: 2, ornate: 1 } },
      { id: 'D', text: '一幅盯久了会让人不安的画。', vector: { unruly: 2, ethereal: 1 } },
    ] },
  { id: 18, format: 'nest', context: null,
    prompt: '你的房间如果可以是一种情绪，你希望是——',
    options: [
      { id: 'A', text: '被宠爱的那种甜。', vector: { dulcet: 3 } },
      { id: 'B', text: '安静得像教堂的净。', vector: { numinous: 3 } },
      { id: 'C', text: '像森林和野地一样自由。', vector: { organic: 2, ethereal: 1 } },
      { id: 'D', text: '像一场华丽的个人秀。', vector: { theatrical: 3 } },
    ] },

  // —— keepsake 旧物（8 题）——
  { id: 19, format: 'keepsake', context: null,
    prompt: '一件旧物传到你手上，你更看重它——',
    options: [
      { id: 'A', text: '承载的记忆和故事。', vector: { retro: 2, numinous: 1 } },
      { id: 'B', text: '那种旧旧的、被用过的质感。', vector: { retro: 2, organic: 1 } },
      { id: 'C', text: '它能不能让我现在的生活更好看。', vector: { ornate: 2 } },
      { id: 'D', text: '旧东西没什么特别的。', vector: {}, avoid: true },
    ] },
  { id: 20, format: 'keepsake', context: null,
    prompt: '一张旧照片，最打动你的是——',
    options: [
      { id: 'A', text: '那些已经回不去的时光。', vector: { retro: 3 } },
      { id: 'B', text: '照片里那个人的眼神。', vector: { numinous: 2 } },
      { id: 'C', text: '照片本身那种泛黄的质感。', vector: { retro: 2, organic: 1 } },
      { id: 'D', text: '照片里那人穿着夸张的旧时装。', vector: { theatrical: 2, retro: 1 } },
    ] },
  { id: 21, format: 'keepsake', context: null,
    prompt: '你更愿意收藏——',
    options: [
      { id: 'A', text: '旧书、旧唱片、旧邮票。', vector: { retro: 3 } },
      { id: 'B', text: '闪闪发亮的、新新的东西。', vector: { luminance: 2, dulcet: 1 } },
      { id: 'C', text: '手工做的、粗糙但有温度的东西。', vector: { organic: 3 } },
      { id: 'D', text: '一些别人看不懂的古怪物件。', vector: { unruly: 2, ethereal: 1 } },
    ] },
  { id: 22, format: 'keepsake', context: null,
    prompt: '一件旧物，你更想用它——',
    options: [
      { id: 'A', text: '唤醒某段快忘掉的记忆。', vector: { retro: 2, numinous: 1 } },
      { id: 'B', text: '让现在的日子更甜一点。', vector: { dulcet: 3 } },
      { id: 'C', text: '当摆设，装饰我的生活。', vector: { ornate: 2 } },
      { id: 'D', text: '当一件夸张的道具，演给别人看。', vector: { theatrical: 2 } },
    ] },
  { id: 23, format: 'keepsake', context: null,
    prompt: '外婆传下来一只旧木盒，你最希望里面是——',
    options: [
      { id: 'A', text: '泛黄的信和旧照片。', vector: { retro: 3 } },
      { id: 'B', text: '手工缝的小物件，针脚细细的。', vector: { organic: 2, dulcet: 1 } },
      { id: 'C', text: '一支旧钢笔或一块旧表。', vector: { retro: 2, numinous: 1 } },
      { id: 'D', text: '什么都可以，有故事就行。', vector: {}, avoid: true },
    ] },
  { id: 24, format: 'keepsake', context: null,
    prompt: '翻旧东西时，你最常想起的是——',
    options: [
      { id: 'A', text: '小时候的自己和家人。', vector: { retro: 2, childlike: 1 } },
      { id: 'B', text: '那些东西陪过的人。', vector: { numinous: 2 } },
      { id: 'C', text: '那个年代的样子。', vector: { retro: 3 } },
      { id: 'D', text: '那时候的自己多么反叛。', vector: { unruly: 2, retro: 1 } },
    ] },
  { id: 25, format: 'keepsake', context: null,
    prompt: '如果一件旧物有"灵魂"，你希望它是——',
    options: [
      { id: 'A', text: '安静的、守护的。', vector: { numinous: 3 } },
      { id: 'B', text: '甜软的、想被抱抱的。', vector: { dulcet: 3 } },
      { id: 'C', text: '野的、不肯被驯服的。', vector: { unruly: 3 } },
      { id: 'D', text: '爱演、爱出风头的。', vector: { theatrical: 3 } },
    ] },
  { id: 26, format: 'keepsake', context: null,
    prompt: '收藏柜里，你更想摆满——',
    options: [
      { id: 'A', text: '各地淘来的小玩意儿。', vector: { retro: 2, organic: 1 } },
      { id: 'B', text: '可爱的手办和玩偶。', vector: { childlike: 3 } },
      { id: 'C', text: '精致的、有分量的艺术品。', vector: { ornate: 3 } },
      { id: 'D', text: '一只只夸张的面具，随时能演。', vector: { theatrical: 3 } },
    ] },

  // —— garb 衣装（8 题）——
  { id: 27, format: 'garb', context: null,
    prompt: '如果要给自己一个"日常的样子"，你更偏——',
    options: [
      { id: 'A', text: '干净利落，越简单越好。', vector: { numinous: 1, luminance: 1 } },
      { id: 'B', text: '有点戏剧感，让人多看一眼。', vector: { theatrical: 2, dulcet: 1 } },
      { id: 'C', text: '按自己舒服来，不管别人怎么看。', vector: { unruly: 2 } },
      { id: 'D', text: '没想过这个问题。', vector: {}, avoid: true },
    ] },
  { id: 28, format: 'garb', context: null,
    prompt: '一件衣服，你最在意它——',
    options: [
      { id: 'A', text: '够不够引人注目。', vector: { theatrical: 3 } },
      { id: 'B', text: '穿起来像不像自己。', vector: { unruly: 2 } },
      { id: 'C', text: '可不可爱、甜不甜。', vector: { dulcet: 2, childlike: 1 } },
      { id: 'D', text: '布料是不是天然亲肤的。', vector: { organic: 2 } },
    ] },
  { id: 29, format: 'garb', context: null,
    prompt: '你更愿意被形容成——',
    options: [
      { id: 'A', text: '干净的、像光一样亮眼。', vector: { luminance: 2 } },
      { id: 'B', text: '神秘的、一眼看不透的。', vector: { ethereal: 2, numinous: 1 } },
      { id: 'C', text: '有自己的脾气、不好惹的。', vector: { unruly: 3, theatrical: 1 } },
      { id: 'D', text: '普通的就好，别被注意。', vector: {}, avoid: true },
    ] },
  { id: 30, format: 'garb', context: null,
    prompt: '参加一个可以尽情装扮的场合，你更想——',
    options: [
      { id: 'A', text: '穿成舞台上的主角。', vector: { theatrical: 3 } },
      { id: 'B', text: '穿成小时候梦想的样子。', vector: { childlike: 2, dulcet: 1 } },
      { id: 'C', text: '穿成和平时完全不同的我。', vector: { unruly: 3, theatrical: 1 } },
      { id: 'D', text: '穿得比平时夸张十倍，全场最响。', vector: { theatrical: 2, unruly: 1 } },
    ] },
  { id: 31, format: 'garb', context: null,
    prompt: '你的"标志性颜色"会是——',
    options: [
      { id: 'A', text: '黑白，干净又有气势。', vector: { numinous: 2 } },
      { id: 'B', text: '亮粉或糖果色，越甜越好。', vector: { dulcet: 2, luminance: 1 } },
      { id: 'C', text: '特别刺眼、别人不敢穿的颜色。', vector: { unruly: 3, theatrical: 1 } },
      { id: 'D', text: '一身华丽的金属亮片。', vector: { theatrical: 2, ornate: 1 } },
    ] },
  { id: 32, format: 'garb', context: null,
    prompt: '化妆/打理自己这件事，你更觉得——',
    options: [
      { id: 'A', text: '是一种舞台感，我很享受。', vector: { theatrical: 3 } },
      { id: 'B', text: '是把自己打扮得可爱的过程。', vector: { childlike: 2, dulcet: 1 } },
      { id: 'C', text: '想怎么来怎么来，别人管不着。', vector: { unruly: 3, theatrical: 1 } },
      { id: 'D', text: '尽量自然，让皮肤透透气。', vector: { organic: 2 } },
    ] },
  { id: 33, format: 'garb', context: null,
    prompt: '如果有一个镜头对着你，你会——',
    options: [
      { id: 'A', text: '摆好姿势，享受这一刻。', vector: { theatrical: 3 } },
      { id: 'B', text: '做个鬼脸，或者躲开。', vector: { childlike: 2, theatrical: 1 } },
      { id: 'C', text: '无所谓，拍就拍。', vector: { unruly: 1 } },
      { id: 'D', text: '故意做点出格的事，气气镜头。', vector: { unruly: 3 } },
    ] },
  { id: 34, format: 'garb', context: null,
    prompt: '你心里最想成为的样子，更接近——',
    options: [
      { id: 'A', text: '精致讲究、有仪式感的。', vector: { ornate: 2, theatrical: 1 } },
      { id: 'B', text: '轻盈得像会飞的精灵。', vector: { ethereal: 3 } },
      { id: 'C', text: '自由得谁都不服管。', vector: { unruly: 3 } },
      { id: 'D', text: '耀眼到让人移不开眼的。', vector: { theatrical: 2, luminance: 1 } },
    ] },

  // —— vista 景致（8 题）——
  { id: 35, format: 'vista', context: null,
    prompt: '一个完全自由的周末，你更想去——',
    options: [
      { id: 'A', text: '森林、海边或山野，亲近自然。', vector: { organic: 3 } },
      { id: 'B', text: '一座有历史的老城，慢慢逛。', vector: { retro: 2, ornate: 1 } },
      { id: 'C', text: '某个不真实的地方，像梦里才会有的。', vector: { ethereal: 3 } },
      { id: 'D', text: '在家待着最舒服。', vector: {}, avoid: true },
    ] },
  { id: 36, format: 'vista', context: null,
    prompt: '如果推窗是一片风景，你更想要——',
    options: [
      { id: 'A', text: '开阔的、阳光洒满的湖面。', vector: { luminance: 3 } },
      { id: 'B', text: '雾中的山，若隐若现。', vector: { ethereal: 3 } },
      { id: 'C', text: '一片自己种的野花地。', vector: { organic: 3 } },
      { id: 'D', text: '一场盛大的人造灯光秀。', vector: { theatrical: 2, luminance: 1 } },
    ] },
  { id: 37, format: 'vista', context: null,
    prompt: '旅途中，最吸引你的是——',
    options: [
      { id: 'A', text: '那些年代久远的旧街巷。', vector: { retro: 3 } },
      { id: 'B', text: '辽阔得让人出神的地方。', vector: { ethereal: 2, numinous: 1 } },
      { id: 'C', text: '自然生长的荒野和山林。', vector: { organic: 3 } },
      { id: 'D', text: '一座古怪得不像真的建筑。', vector: { unruly: 2, ethereal: 1 } },
    ] },
  { id: 38, format: 'vista', context: null,
    prompt: '一处"想去很久"的地方，它更像——',
    options: [
      { id: 'A', text: '一座被云托着的圣殿。', vector: { numinous: 3 } },
      { id: 'B', text: '一片铺满薰衣草的、亮亮的花田。', vector: { luminance: 2, dulcet: 1 } },
      { id: 'C', text: '一个只有我知道的隐蔽角落。', vector: { organic: 2, unruly: 1 } },
      { id: 'D', text: '一座昼夜颠倒、灯红酒绿的奇城。', vector: { theatrical: 2, ethereal: 1 } },
    ] },
  { id: 39, format: 'vista', context: null,
    prompt: '黄昏的海边，你更想——',
    options: [
      { id: 'A', text: '看天色从粉到紫一点点变。', vector: { dulcet: 2, ethereal: 1 } },
      { id: 'B', text: '赤脚踩沙子，感受海水。', vector: { organic: 3 } },
      { id: 'C', text: '静静站着，觉得这刻很神圣。', vector: { numinous: 3 } },
      { id: 'D', text: '让海风把头发吹得乱七八糟。', vector: { unruly: 2 } },
    ] },
  { id: 40, format: 'vista', context: null,
    prompt: '一张明信片，你最想收到画着什么的——',
    options: [
      { id: 'A', text: '老城、旧路、旧时光。', vector: { retro: 3 } },
      { id: 'B', text: '彩虹、云朵、可爱的小动物。', vector: { childlike: 2, dulcet: 1 } },
      { id: 'C', text: '一个说不清在哪里的梦幻地方。', vector: { ethereal: 3 } },
      { id: 'D', text: '收到什么都行。', vector: {}, avoid: true },
    ] },
  { id: 41, format: 'vista', context: null,
    prompt: '独自旅行时，你更享受——',
    options: [
      { id: 'A', text: '和自然待在一起的感觉。', vector: { organic: 3 } },
      { id: 'B', text: '在陌生老街上漫无目的地走。', vector: { retro: 2, numinous: 1 } },
      { id: 'C', text: '一种随时可以消失的自由。', vector: { unruly: 2, ethereal: 1 } },
      { id: 'D', text: '像电影主角一样登场和告别。', vector: { theatrical: 3 } },
    ] },
  { id: 42, format: 'vista', context: null,
    prompt: '如果可以选择"看见"，你更想看见——',
    options: [
      { id: 'A', text: '夜里发光的、童话一样的东西。', vector: { childlike: 2, luminance: 1, theatrical: 1 } },
      { id: 'B', text: '古老又崇高的、让人敬畏的。', vector: { numinous: 3 } },
      { id: 'C', text: '现实中不会存在的景象。', vector: { ethereal: 3 } },
      { id: 'D', text: '一场把世界颠倒过来的狂欢。', vector: { theatrical: 2, unruly: 1 } },
    ] },

  // —— glyph 印记（6 题）——
  { id: 43, format: 'glyph', context: null,
    prompt: '如果让你选一个符号代表自己，你更倾向——',
    options: [
      { id: 'A', text: '羽毛、光、翅膀这类纯净的东西。', vector: { numinous: 3 } },
      { id: 'B', text: '月亮、星星、夜晚。', vector: { ethereal: 2, retro: 1 } },
      { id: 'C', text: '一个颠倒的、反着来的符号。', vector: { unruly: 3 } },
      { id: 'D', text: '不需要符号代表我。', vector: {}, avoid: true },
    ] },
  { id: 44, format: 'glyph', context: null,
    prompt: '一件刻着花纹的旧器物，你更想看它——',
    options: [
      { id: 'A', text: '繁复精致的纹样，一圈圈展开。', vector: { ornate: 3 } },
      { id: 'B', text: '刻痕旧旧的，像藏着一段往事。', vector: { retro: 2, numinous: 1 } },
      { id: 'C', text: '反常规的、说不清的图案。', vector: { unruly: 2 } },
      { id: 'D', text: '一种夸张到华丽的祭器纹样。', vector: { theatrical: 2, ornate: 1 } },
    ] },
  { id: 45, format: 'glyph', context: null,
    prompt: '如果要纹一个图案在看不见的地方，你会选——',
    options: [
      { id: 'A', text: '一朵小小的花，或一颗星。', vector: { childlike: 2, numinous: 1 } },
      { id: 'B', text: '一句旧旧的话，或一个符号。', vector: { retro: 2 } },
      { id: 'C', text: '一个很狂的、打破规矩的图。', vector: { unruly: 3, theatrical: 1 } },
      { id: 'D', text: '我不纹身。', vector: {}, avoid: true },
    ] },
  { id: 46, format: 'glyph', context: null,
    prompt: '一枚徽章或印章，你更想要它刻着——',
    options: [
      { id: 'A', text: '一个神秘、神圣的图案。', vector: { numinous: 3 } },
      { id: 'B', text: '精致的几何或花纹。', vector: { ornate: 3 } },
      { id: 'C', text: '一个只有我懂的、反着来的暗号。', vector: { unruly: 2, ethereal: 1, theatrical: 1 } },
      { id: 'D', text: '我不要徽章。', vector: {}, avoid: true },
    ] },
  { id: 47, format: 'glyph', context: null,
    prompt: '你更相信哪一种"印记"的力量——',
    options: [
      { id: 'A', text: '洁净、守护、祝福类的。', vector: { numinous: 3 } },
      { id: 'B', text: '从旧时光里传下来的。', vector: { retro: 3 } },
      { id: 'C', text: '自己造出来、不照规矩的。', vector: { unruly: 3, theatrical: 1 } },
      { id: 'D', text: '印记没什么力量。', vector: {}, avoid: true },
    ] },
  { id: 48, format: 'glyph', context: null,
    prompt: '一面老墙上的涂鸦，你更可能——',
    options: [
      { id: 'A', text: '停下来，觉得它有种失控的美。', vector: { unruly: 2, ethereal: 1, theatrical: 1 } },
      { id: 'B', text: '拍下来，当一件艺术作品。', vector: { ornate: 2 } },
      { id: 'C', text: '想：这堵墙背后，有多少故事。', vector: { retro: 2, numinous: 1 } },
      { id: 'D', text: '路过，没注意。', vector: {}, avoid: true },
    ] },
];
