// 48 种美学流派及其 10 维"美学"画像（0-10），按 6 大板块组织。
// 维度顺序：luminance 明度 / dulcet 甜度 / ornate 繁饰 / retro 怀旧 / organic 原生
//          unruly 乖张 / numinous 灵光 / childlike 童真 / theatrical 戏剧 / ethereal 缥缈
//
// 这 10 维不是"风格属性"，而是"你作为一种美的姿态"：
//   明度 luminance —— 发光、明亮、清澈、糖果色 ↔ 幽暗、深邃、阴翳
//   甜度 dulcet    —— 甜美、治愈、柔软 ↔ 酸涩、锋利、带刺
//   繁饰 ornate    —— 繁复、华丽、堆叠 ↔ 极简、留白、空旷
//   怀旧 retro     —— 旧时光、档案、回忆 ↔ 未来、前卫、崭新
//   原生 organic   —— 天然、手作、粗粝 ↔ 人工、合成、精致
//   乖张 unruly    —— 反叛、越界、不驯 ↔ 守序、乖巧、合群
//   灵光 numinous  —— 神圣、崇高、纯净 ↔ 世俗、功利、现实
//   童真 childlike —— 童稚、可爱、天真 ↔ 成熟、世故、苍老
//   戏剧 theatrical—— 浓烈、夸张、表演性 ↔ 内敛、真实、低调
//   缥缈 ethereal  —— 梦幻、超现实、轻盈 ↔ 实在、厚重、接地
//
// 打分标尺（保证 48 个流派一致）：主维 8–10、低维 2–4、其余 5–7。
// 特别注意：气质接近的流派（策划"易混对"一节）靠主维组合拉开——生成后跑两两余弦，目标无 >0.85 对。
// name 带 emoji + 英文主名，前端在结果名里显示；en 供 meta 副标题。
module.exports = [
  // —— 一、光与甜（甜美明亮系，8）——
  { name: '🎀 Coquette', en: 'Coquette', luminance: 7, dulcet: 9, ornate: 6, retro: 5, organic: 4, unruly: 7, numinous: 4, childlike: 4, theatrical: 9, ethereal: 7, tags: '娇媚少女、蝴蝶结、柔美轻佻' },
  { name: '🍬 Sweet Lolita', en: 'Sweet Lolita', luminance: 8, dulcet: 10, ornate: 9, retro: 6, organic: 3, unruly: 4, numinous: 3, childlike: 9, theatrical: 6, ethereal: 7, tags: '甜系洛丽塔、蕾丝、童话' },
  { name: '🧸 Kawaii', en: 'Kawaii', luminance: 10, dulcet: 9, ornate: 5, retro: 4, organic: 4, unruly: 2, numinous: 3, childlike: 10, theatrical: 3, ethereal: 6, tags: '卡哇伊、糖果色、圆润可爱' },
  { name: '🍓 Strawberry Girl', en: 'Strawberry Girl', luminance: 9, dulcet: 7, ornate: 4, retro: 7, organic: 7, unruly: 3, numinous: 4, childlike: 6, theatrical: 2, ethereal: 3, tags: '草莓女孩、红粉、田园甜心' },
  { name: '☁️ Softie', en: 'Softie', luminance: 6, dulcet: 10, ornate: 3, retro: 4, organic: 4, unruly: 1, numinous: 6, childlike: 8, theatrical: 1, ethereal: 6, tags: '软妹系、云朵、温柔' },
  { name: '👑 Princesscore', en: 'Princesscore', luminance: 6, dulcet: 7, ornate: 9, retro: 7, organic: 3, unruly: 1, numinous: 6, childlike: 6, theatrical: 7, ethereal: 5, tags: '公主核、城堡、缎带' },
  { name: '💗 Barbiecore', en: 'Barbiecore', luminance: 10, dulcet: 5, ornate: 5, retro: 4, organic: 2, unruly: 5, numinous: 1, childlike: 7, theatrical: 9, ethereal: 2, tags: '芭比核、亮粉、张扬自信' },
  { name: '🌸 Girly Girl', en: 'Girly Girl', luminance: 7, dulcet: 7, ornate: 4, retro: 3, organic: 5, unruly: 1, numinous: 3, childlike: 8, theatrical: 3, ethereal: 2, tags: '少女系、闺蜜、甜点' },

  // —— 二、暗与诡（暗黑怪诞系，8）——
  { name: '🖤 Goth', en: 'Goth', luminance: 2, dulcet: 2, ornate: 6, retro: 7, organic: 3, unruly: 7, numinous: 5, childlike: 2, theatrical: 6, ethereal: 5, tags: '哥特、黑蕾丝、死亡浪漫' },
  { name: '📚 Dark Academia', en: 'Dark Academia', luminance: 3, dulcet: 2, ornate: 6, retro: 9, organic: 5, unruly: 4, numinous: 6, childlike: 2, theatrical: 5, ethereal: 5, tags: '暗黑学院、图书馆、蜡笔' },
  { name: '🌀 Weirdcore', en: 'Weirdcore', luminance: 4, dulcet: 3, ornate: 4, retro: 7, organic: 4, unruly: 7, numinous: 5, childlike: 5, theatrical: 6, ethereal: 8, tags: '怪核、超现实、数字失真' },
  { name: '🕳️ Liminal Space', en: 'Liminal Space', luminance: 3, dulcet: 3, ornate: 2, retro: 7, organic: 4, unruly: 5, numinous: 6, childlike: 4, theatrical: 3, ethereal: 9, tags: '阈限空间、空旷、诡异' },
  { name: '🥀 Romantic Goth', en: 'Romantic Goth', luminance: 2, dulcet: 4, ornate: 6, retro: 6, organic: 3, unruly: 7, numinous: 8, childlike: 2, theatrical: 6, ethereal: 7, tags: '浪漫哥特、黑玫瑰、死亡与爱' },
  { name: '🩸 Vampirecore', en: 'Vampirecore', luminance: 1, dulcet: 2, ornate: 10, retro: 9, organic: 2, unruly: 4, numinous: 8, childlike: 2, theatrical: 9, ethereal: 5, tags: '吸血鬼核、丝绒、永生优雅' },
  { name: '🔮 Witchcore', en: 'Witchcore', luminance: 4, dulcet: 4, ornate: 3, retro: 6, organic: 8, unruly: 5, numinous: 9, childlike: 3, theatrical: 5, ethereal: 7, tags: '女巫核、草药、月光魔法' },
  { name: '💋 Dark Feminine', en: 'Dark Feminine', luminance: 5, dulcet: 4, ornate: 6, retro: 5, organic: 2, unruly: 10, numinous: 2, childlike: 2, theatrical: 9, ethereal: 7, tags: '暗黑女性风、黑红、危险魅力' },

  // —— 三、自然与灵（原生灵性系，8）——
  { name: '🌿 Naturecore', en: 'Naturecore', luminance: 6, dulcet: 5, ornate: 3, retro: 4, organic: 10, unruly: 5, numinous: 7, childlike: 4, theatrical: 2, ethereal: 5, tags: '自然核、苔藓、森林' },
  { name: '🕊️ Angelcore', en: 'Angelcore', luminance: 8, dulcet: 7, ornate: 5, retro: 4, organic: 5, unruly: 2, numinous: 10, childlike: 5, theatrical: 4, ethereal: 8, tags: '天使核、羽翼、圣洁白光' },
  { name: '🧚 Fairycore', en: 'Fairycore', luminance: 7, dulcet: 7, ornate: 6, retro: 5, organic: 8, unruly: 4, numinous: 7, childlike: 6, theatrical: 5, ethereal: 9, tags: '仙女核、森林精灵、露珠' },
  { name: '🏺 Kintsugi', en: 'Kintsugi', luminance: 5, dulcet: 5, ornate: 7, retro: 7, organic: 7, unruly: 3, numinous: 8, childlike: 3, theatrical: 3, ethereal: 5, tags: '金缮、金线修补、残缺之美' },
  { name: '🍞 Cottagecore', en: 'Cottagecore', luminance: 6, dulcet: 6, ornate: 4, retro: 7, organic: 9, unruly: 2, numinous: 6, childlike: 4, theatrical: 2, ethereal: 5, tags: '田园核、面包、野花' },
  { name: '🍃 Art Nouveau', en: 'Art Nouveau', luminance: 7, dulcet: 6, ornate: 9, retro: 8, organic: 8, unruly: 3, numinous: 4, childlike: 3, theatrical: 5, ethereal: 5, tags: '新艺术、藤蔓、流动曲线' },
  { name: '🕯️ Symbolism', en: 'Symbolism', luminance: 4, dulcet: 2, ornate: 5, retro: 6, organic: 4, unruly: 5, numinous: 10, childlike: 3, theatrical: 6, ethereal: 9, tags: '象征主义、隐喻、梦' },
  { name: '🗡️ Dark Fantasy', en: 'Dark Fantasy', luminance: 3, dulcet: 2, ornate: 7, retro: 6, organic: 4, unruly: 6, numinous: 6, childlike: 2, theatrical: 9, ethereal: 9, tags: '黑暗奇幻、古堡、幽暗史诗' },

  // —— 四、复古与未来（时间交错系，8）——
  { name: '🌴 Vaporwave', en: 'Vaporwave', luminance: 5, dulcet: 4, ornate: 7, retro: 10, organic: 3, unruly: 5, numinous: 3, childlike: 3, theatrical: 4, ethereal: 8, tags: '蒸汽波、粉蓝、罗马柱' },
  { name: '📼 Nostalgiacore', en: 'Nostalgiacore', luminance: 4, dulcet: 6, ornate: 4, retro: 10, organic: 5, unruly: 3, numinous: 5, childlike: 6, theatrical: 3, ethereal: 6, tags: '怀旧核、旧录像带、童年' },
  { name: '💿 Y2K', en: 'Y2K', luminance: 8, dulcet: 5, ornate: 6, retro: 6, organic: 2, unruly: 5, numinous: 3, childlike: 4, theatrical: 6, ethereal: 6, tags: '千禧风、镭射、金属光泽' },
  { name: '🚀 Retrofuturism', en: 'Retrofuturism', luminance: 8, dulcet: 4, ornate: 4, retro: 9, organic: 2, unruly: 3, numinous: 5, childlike: 3, theatrical: 5, ethereal: 7, tags: '复古未来主义、喷气时代、飞碟' },
  { name: '⚙️ Steampunk', en: 'Steampunk', luminance: 4, dulcet: 3, ornate: 8, retro: 9, organic: 5, unruly: 5, numinous: 2, childlike: 3, theatrical: 6, ethereal: 3, tags: '蒸汽朋克、黄铜、齿轮' },
  { name: '🌆 Synthwave', en: 'Synthwave', luminance: 7, dulcet: 3, ornate: 5, retro: 9, organic: 2, unruly: 4, numinous: 2, childlike: 3, theatrical: 7, ethereal: 6, tags: '合成器浪潮、霓虹、复古80s' },
  { name: '📽️ Vintagecore', en: 'Vintagecore', luminance: 5, dulcet: 5, ornate: 6, retro: 10, organic: 5, unruly: 3, numinous: 5, childlike: 4, theatrical: 3, ethereal: 4, tags: '复古核、旧物、胶片' },
  { name: '🫧 Frutiger Aero', en: 'Frutiger Aero', luminance: 9, dulcet: 6, ornate: 3, retro: 6, organic: 6, unruly: 2, numinous: 6, childlike: 4, theatrical: 2, ethereal: 6, tags: '玻璃气泡、清爽乐观未来' },

  // —— 五、都市亚文化与设计（反叛张扬系，8）——
  { name: '💅 Gyaru', en: 'Gyaru', luminance: 9, dulcet: 5, ornate: 6, retro: 2, organic: 3, unruly: 9, numinous: 2, childlike: 3, theatrical: 10, ethereal: 3, tags: '辣妹系、染发、浓妆' },
  { name: '🌃 Cyberpunk', en: 'Cyberpunk', luminance: 5, dulcet: 2, ornate: 6, retro: 3, organic: 2, unruly: 8, numinous: 1, childlike: 2, theatrical: 4, ethereal: 6, tags: '赛博朋克、霓虹、雨夜高楼' },
  { name: '🌑 Jirai Kei', en: 'Jirai Kei', luminance: 4, dulcet: 5, ornate: 7, retro: 6, organic: 4, unruly: 7, numinous: 4, childlike: 6, theatrical: 7, ethereal: 5, tags: '地雷系、甜美外壳、锋利内核' },
  { name: '🎭 Visual Kei', en: 'Visual Kei', luminance: 4, dulcet: 2, ornate: 10, retro: 4, organic: 2, unruly: 7, numinous: 2, childlike: 2, theatrical: 10, ethereal: 3, tags: '视觉系、华丽、雌雄同体' },
  { name: '🌈 Scene', en: 'Scene', luminance: 8, dulcet: 3, ornate: 5, retro: 4, organic: 3, unruly: 9, numinous: 2, childlike: 8, theatrical: 8, ethereal: 3, tags: '场景系、彩虹、直发' },
  { name: '🏗️ Brutalism', en: 'Brutalism', luminance: 2, dulcet: 2, ornate: 1, retro: 4, organic: 9, unruly: 7, numinous: 4, childlike: 2, theatrical: 3, ethereal: 3, tags: '粗野主义、裸露混凝土、反装饰' },
  { name: '🟥 Memphis Design', en: 'Memphis Design', luminance: 9, dulcet: 6, ornate: 9, retro: 5, organic: 2, unruly: 7, numinous: 2, childlike: 9, theatrical: 7, ethereal: 4, tags: '孟菲斯设计、几何、鲜艳玩具感' },
  { name: '🥂 Art Deco', en: 'Art Deco', luminance: 6, dulcet: 3, ornate: 10, retro: 9, organic: 2, unruly: 5, numinous: 3, childlike: 2, theatrical: 7, ethereal: 4, tags: '装饰艺术、几何对称、黑金奢华' },

  // —— 六、艺术流派（经典与先锋，8）——
  { name: '🌊 Romanticism', en: 'Romanticism', luminance: 4, dulcet: 4, ornate: 5, retro: 6, organic: 8, unruly: 6, numinous: 7, childlike: 2, theatrical: 8, ethereal: 7, tags: '浪漫主义、风暴废墟、崇高激情' },
  { name: '🎨 Impressionism', en: 'Impressionism', luminance: 6, dulcet: 4, ornate: 3, retro: 7, organic: 7, unruly: 3, numinous: 4, childlike: 3, theatrical: 3, ethereal: 7, tags: '印象派、光影、瞬间空气感' },
  { name: '⬜ Minimalism', en: 'Minimalism', luminance: 5, dulcet: 3, ornate: 1, retro: 4, organic: 4, unruly: 4, numinous: 6, childlike: 3, theatrical: 2, ethereal: 5, tags: '极简主义、留白、线条' },
  { name: '🃏 Dada', en: 'Dada', luminance: 5, dulcet: 3, ornate: 5, retro: 5, organic: 4, unruly: 10, numinous: 3, childlike: 6, theatrical: 8, ethereal: 5, tags: '达达主义、拼贴、反艺术' },
  { name: '👁️ Surrealism', en: 'Surrealism', luminance: 3, dulcet: 2, ornate: 6, retro: 4, organic: 3, unruly: 9, numinous: 4, childlike: 3, theatrical: 6, ethereal: 10, tags: '超现实主义、梦境、错位' },
  { name: '🖌️ Expressionism', en: 'Expressionism', luminance: 3, dulcet: 2, ornate: 3, retro: 4, organic: 3, unruly: 9, numinous: 3, childlike: 2, theatrical: 10, ethereal: 5, tags: '表现主义、强烈情绪、扭曲' },
  { name: '🏛️ Baroque', en: 'Baroque', luminance: 6, dulcet: 4, ornate: 10, retro: 7, organic: 2, unruly: 2, numinous: 8, childlike: 2, theatrical: 9, ethereal: 4, tags: '巴洛克、金箔、过盛华丽' },
  { name: '🕵️ Film Noir', en: 'Film Noir', luminance: 1, dulcet: 2, ornate: 4, retro: 9, organic: 2, unruly: 8, numinous: 3, childlike: 2, theatrical: 10, ethereal: 7, tags: '黑色电影、黑白阴影、宿命' },
];
