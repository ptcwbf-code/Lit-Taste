// 36 种历史时代及其 10 维"时代气质"画像（0-10），按 6 大板块组织。
// 维度顺序：faith 信仰 / rule 礼序 / tribe 群系 / grace 风雅 / mind 学养
//          quest 征途 / edge 边野 / tempo 节律 / gold 荣光 / fire 烈度
//
// 这 10 维不是"历史百科属性"，而是"你作为一种精神气质的隐喻"：
//   信仰 faith  —— 相信超验、天命、神圣感 ↔ 世俗理性、怀疑、现世
//   礼序 rule  —— 重等级、礼仪、规则清晰 ↔ 自由、混杂、不拘一格
//   群系 tribe —— 重集体、人情、荣誉纽带 ↔ 个人、独立、疏离自足
//   风雅 grace —— 审美精致、讲仪式、生活美学 ↔ 朴素、实用、粗粝直接
//   学养 mind  —— 重思辨、学问、艺术哲思 ↔ 重行动、经验、生存实干
//   征途 quest —— 开拓、冒险、向往远方 ↔ 守成、安居、求稳
//   边野 edge  —— 亲近蛮荒、未知、危险 ↔ 依赖秩序、安全、文明
//   节律 tempo —— 快、喧闹、新变、瞬息 ↔ 慢、静谧、传统、悠长
//   荣光 gold  —— 黄金上升、笃信未来 ↔ 黄昏颓靡、末世感
//   烈度 fire  —— 情感炽烈、戏剧化、奔放 ↔ 含蓄、克制、内敛
//
// 打分标尺（保证 36 个时代一致）：
//   8–10  该时代的标志性特质（一说名字就想到的）
//   5–7   有但不突出
//   2–4   明显相反或很弱
// 每个时代的"主维度"给 8–10，"低维度"给 2–4，其余 5–7。
// 特别注意：气质接近的时代（策划"易混对"一节）靠主维组合拉开——盛唐=诗酒万国（grace9/fire10/gold9）
// 而对伊丽莎白=剧场航海（mind7/quest9/tribe7）、纽约=金钱街头（quest9/edge8/gold9）；
// 五四=白纸写新字（mind10/quest10）而对大革命=大众街垒（fire10/tribe9）；
// 东京=技术重建（rule6/mind7/tempo10）而对纽约、柏林=裂痕先锋（mind9/tempo10/fire9）；
// 大航海=海图与命（faith7/edge9/gold9）而对西部=孤胆（tribe3/gold6）、蒙古=商路（tribe8/gold6）。
// 生成后跑两两余弦，目标无 >0.85 对（本库全部 <0.85）。
// name 带 emoji，前端直接在结果名里显示大 emoji；era 是时代英文名（供 meta 副标题与金句落款）。
module.exports = [
  // —— 一、古典与神启（6）——
  { name: '🏛️ 古希腊', era: 'Ancient Greece', faith: 3, rule: 3, tribe: 7, grace: 8, mind: 9, quest: 3, edge: 3, tempo: 4, gold: 5, fire: 8, tags: '城邦、广场辩论、万物的尺度' },
  { name: '🗿 古埃及', era: 'Ancient Egypt', faith: 10, rule: 10, tribe: 7, grace: 7, mind: 5, quest: 3, edge: 2, tempo: 2, gold: 7, fire: 4, tags: '金字塔、永恒、秩序与神圣' },
  { name: '🕯️ 中世纪欧洲', era: 'Medieval Europe', faith: 10, rule: 9, tribe: 9, grace: 6, mind: 3, quest: 2, edge: 3, tempo: 4, gold: 3, fire: 3, tags: '哥特教堂、骑士与修士、彼岸' },
  { name: '📖 巴格达', era: 'Abbasid Baghdad', faith: 7, rule: 6, tribe: 6, grace: 8, mind: 9, quest: 8, edge: 3, tempo: 6, gold: 7, fire: 3, tags: '翻译运动、图书馆、智慧之宫' },
  { name: '🏺 罗马帝国', era: 'Roman Empire', faith: 3, rule: 9, tribe: 7, grace: 3, mind: 5, quest: 9, edge: 6, tempo: 6, gold: 9, fire: 7, tags: '大路与水道、法典、万邦仰望' },
  { name: '🌄 玛雅古典期', era: 'Classic Maya', faith: 9, rule: 7, tribe: 6, grace: 3, mind: 8, quest: 3, edge: 5, tempo: 3, gold: 6, fire: 4, tags: '星空历法、雨林金字塔、循环时间' },

  // —— 二、东方的盛与雅（6）——
  { name: '🐉 盛唐长安', era: 'Tang Chang\'an', faith: 3, rule: 2, tribe: 7, grace: 9, mind: 4, quest: 8, edge: 3, tempo: 7, gold: 9, fire: 10, tags: '万国来朝、诗酒、天生我材' },
  { name: '📜 宋代', era: 'Song Dynasty', faith: 4, rule: 6, tribe: 7, grace: 9, mind: 9, quest: 2, edge: 3, tempo: 2, gold: 6, fire: 3, tags: '文治、点茶插花、风雅学问' },
  { name: '🍵 江户日本', era: 'Edo Japan', faith: 5, rule: 9, tribe: 6, grace: 9, mind: 5, quest: 2, edge: 4, tempo: 5, gold: 4, fire: 3, tags: '浮世绘、町人、侘寂与热闹' },
  { name: '🏜️ 蒙古与丝路', era: 'Mongol Silk Road', faith: 6, rule: 2, tribe: 8, grace: 2, mind: 4, quest: 9, edge: 4, tempo: 6, gold: 6, fire: 5, tags: '马背丈量世界、驼铃商道、远方' },
  { name: '📚 先秦诸子', era: 'Hundred Schools', faith: 5, rule: 7, tribe: 6, grace: 5, mind: 9, quest: 6, edge: 4, tempo: 3, gold: 5, fire: 5, tags: '百家争鸣、礼崩乐坏、问天下' },
  { name: '🛕 笈多印度', era: 'Gupta India', faith: 9, rule: 6, tribe: 6, grace: 8, mind: 9, quest: 2, edge: 2, tempo: 5, gold: 6, fire: 4, tags: '梵语诗、石窟、数学与灵魂' },

  // —— 三、欧陆文艺复兴与近代（6）——
  { name: '🎨 文艺复兴佛罗伦萨', era: 'Renaissance Florence', faith: 2, rule: 3, tribe: 6, grace: 9, mind: 9, quest: 6, edge: 4, tempo: 6, gold: 9, fire: 8, tags: '人的光辉、工坊赞助、黄金上升' },
  { name: '🏰 伊丽莎白伦敦', era: 'Elizabethan London', faith: 3, rule: 3, tribe: 7, grace: 7, mind: 7, quest: 9, edge: 6, tempo: 6, gold: 5, fire: 8, tags: '剧场、航海图、帝国黎明' },
  { name: '💐 19世纪巴黎', era: 'Belle Époque Paris', faith: 2, rule: 3, tribe: 4, grace: 9, mind: 9, quest: 5, edge: 3, tempo: 10, gold: 3, fire: 9, tags: '咖啡馆主义、阁楼天才、波西米亚' },
  { name: '🕰️ 维多利亚伦敦', era: 'Victorian London', faith: 6, rule: 9, tribe: 7, grace: 6, mind: 5, quest: 8, edge: 3, tempo: 6, gold: 8, fire: 3, tags: '蒸汽与礼帽、秩序进取、克制的野心' },
  { name: '🎠 维也纳世纪末', era: 'Fin de Siècle Vienna', faith: 5, rule: 5, tribe: 4, grace: 8, mind: 7, quest: 2, edge: 3, tempo: 2, gold: 2, fire: 3, tags: '咖啡馆圆舞曲、金色黄昏、挽歌' },
  { name: '💡 启蒙时代', era: 'The Enlightenment', faith: 2, rule: 3, tribe: 6, grace: 4, mind: 10, quest: 5, edge: 6, tempo: 10, gold: 8, fire: 8, tags: '理性烛光、百科全书、敢于认知' },

  // —— 四、现代都市的霓虹（6）——
  { name: '🌆 1920s上海', era: 'Shanghai 1920s', faith: 2, rule: 3, tribe: 7, grace: 9, mind: 4, quest: 5, edge: 4, tempo: 10, gold: 6, fire: 8, tags: '爵士与旗袍、租界霓虹、东方摩登' },
  { name: '🗼 1960s东京', era: 'Tokyo 1960s', faith: 2, rule: 6, tribe: 4, grace: 4, mind: 7, quest: 6, edge: 8, tempo: 10, gold: 7, fire: 6, tags: '混凝土森林、新干线、把旧的烧掉' },
  { name: '🗽 1980s纽约', era: 'New York 1980s', faith: 2, rule: 3, tribe: 4, grace: 6, mind: 5, quest: 9, edge: 8, tempo: 9, gold: 9, fire: 9, tags: '华尔街与地下俱乐部、野心膨胀' },
  { name: '🌃 黄金年代好莱坞', era: 'Golden Age Hollywood', faith: 3, rule: 3, tribe: 2, grace: 8, mind: 4, quest: 7, edge: 3, tempo: 7, gold: 9, fire: 8, tags: '造梦机器、银幕传奇、流金岁月' },
  { name: '🌉 1920s柏林', era: 'Weimar Berlin', faith: 2, rule: 2, tribe: 4, grace: 4, mind: 9, quest: 6, edge: 6, tempo: 10, gold: 3, fire: 9, tags: '表现主义、裂痕先锋、废墟上的花' },
  { name: '📡 网络黎明', era: 'Internet Dawn', faith: 2, rule: 3, tribe: 4, grace: 3, mind: 9, quest: 8, edge: 2, tempo: 9, gold: 10, fire: 2, tags: '电缆里醒来的新世界、明天可写' },

  // —— 五、征途与边疆（6）——
  { name: '🪓 维京时代', era: 'Viking Age', faith: 7, rule: 2, tribe: 8, grace: 2, mind: 2, quest: 9, edge: 10, tempo: 8, gold: 2, fire: 7, tags: '长船、风暴出海、部落荣誉' },
  { name: '🤠 美国西部', era: 'American Frontier', faith: 3, rule: 3, tribe: 3, grace: 2, mind: 4, quest: 10, edge: 8, tempo: 9, gold: 6, fire: 8, tags: '孤胆、荒原、地平线在邀请' },
  { name: '🏭 工业曼彻斯特', era: 'Industrial Manchester', faith: 2, rule: 7, tribe: 6, grace: 2, mind: 5, quest: 8, edge: 4, tempo: 9, gold: 7, fire: 5, tags: '烟囱齿轮、棉都、新世界胎动' },
  { name: '⛩️ 明治日本', era: 'Meiji Japan', faith: 3, rule: 8, tribe: 7, grace: 6, mind: 6, quest: 9, edge: 5, tempo: 7, gold: 7, fire: 5, tags: '脱亚入欧、西装与和服、守礼向前' },
  { name: '⚓ 大航海时代', era: 'Age of Exploration', faith: 8, rule: 3, tribe: 6, grace: 2, mind: 3, quest: 10, edge: 9, tempo: 7, gold: 9, fire: 6, tags: '海图空白、以命赌疆界、把世界画大' },
  { name: '🐫 阿拉伯商旅', era: 'Spice Road Caravan', faith: 9, rule: 3, tribe: 8, grace: 3, mind: 6, quest: 8, edge: 5, tempo: 5, gold: 5, fire: 6, tags: '驼队与故事、市集热闹、信仰开花' },

  // —— 六、思想与变革（6）——
  { name: '🎸 1960s旧金山', era: 'Haight-Ashbury', faith: 2, rule: 1, tribe: 8, grace: 4, mind: 7, quest: 8, edge: 9, tempo: 7, gold: 5, fire: 7, tags: '爱与和平、反文化、另一种活法' },
  { name: '✒️ 五四运动', era: 'May Fourth Movement', faith: 2, rule: 2, tribe: 5, grace: 3, mind: 10, quest: 10, edge: 5, tempo: 7, gold: 4, fire: 9, tags: '白话文、新青年、拆旧造新' },
  { name: '🎗️ 法国大革命', era: 'French Revolution', faith: 2, rule: 2, tribe: 9, grace: 3, mind: 6, quest: 8, edge: 5, tempo: 8, gold: 4, fire: 10, tags: '自由平等博爱、街垒、掀翻旧世界' },
  { name: '🚀 苏联太空时代', era: 'Soviet Space Age', faith: 3, rule: 6, tribe: 9, grace: 3, mind: 6, quest: 9, edge: 6, tempo: 6, gold: 8, fire: 4, tags: '加加林、集体与理性、向星辰出发' },
  { name: '🎷 哈莱姆文艺复兴', era: 'Harlem Renaissance', faith: 3, rule: 3, tribe: 9, grace: 8, mind: 7, quest: 5, edge: 5, tempo: 6, gold: 5, fire: 8, tags: '爵士诗歌、族群尊严、暗处开花' },
  { name: '🔭 黄金时代科幻', era: 'Golden Age Sci-fi', faith: 4, rule: 3, tribe: 4, grace: 6, mind: 9, quest: 9, edge: 7, tempo: 6, gold: 9, fire: 5, tags: '飞船火星、想象预演人类、明天值得奔赴' },
];
