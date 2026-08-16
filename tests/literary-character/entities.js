// 72 位文学角色及其 10 维人格画像（0-10）。
// 维度顺序：action 行动 / emotion 情感 / inner 内省 / dream 想象
//          care 关怀 / thought 思辨 / order 守序 / wit 幽默 / desire 欲望 / tough 坚韧
//
// 打分标尺（保证 72 个角色一致）：
//   8–10  该角色的标志性特质（一说名字就想到的）
//   5–7   有但不突出
//   2–4   明显相反或很弱
//   0–1   完全相反
// 每个角色的"主维度"给 8–10，"低维度"给 2–4，其余 5–7，避免全部角色堆在 7–9。
module.exports = [
  // —— 中国古典（18）——
  { name: '林黛玉', works: '《红楼梦》', action: 4, emotion: 10, inner: 9, dream: 7, care: 5, thought: 7, order: 4, wit: 2, desire: 8, tough: 2, tags: '才女、多情、孤高、悲剧' },
  { name: '贾宝玉', works: '《红楼梦》', action: 5, emotion: 9, inner: 7, dream: 9, care: 9, thought: 7, order: 3, wit: 5, desire: 6, tough: 3, tags: '痴情、厌世故、怜香惜玉、反抗' },
  { name: '王熙凤', works: '《红楼梦》', action: 10, emotion: 3, inner: 6, dream: 5, care: 3, thought: 5, order: 5, wit: 8, desire: 9, tough: 7, tags: '精明、泼辣、能干、狠辣' },
  { name: '薛宝钗', works: '《红楼梦》', action: 6, emotion: 3, inner: 8, dream: 3, care: 7, thought: 6, order: 9, wit: 5, desire: 5, tough: 7, tags: '圆融、理性、周全、隐忍' },
  { name: '史湘云', works: '《红楼梦》', action: 7, emotion: 9, inner: 3, dream: 6, care: 7, thought: 4, order: 3, wit: 8, desire: 5, tough: 6, tags: '豪爽、率真、乐观、无心机' },
  { name: '孙悟空', works: '《西游记》', action: 10, emotion: 6, inner: 3, dream: 8, care: 5, thought: 4, order: 2, wit: 9, desire: 6, tough: 8, tags: '桀骜、机灵、行动力、反抗' },
  { name: '唐僧', works: '《西游记》', action: 6, emotion: 6, inner: 5, dream: 5, care: 9, thought: 7, order: 9, wit: 2, desire: 2, tough: 8, tags: '执着、慈悲、虔诚、一根筋' },
  { name: '猪八戒', works: '《西游记》', action: 5, emotion: 8, inner: 4, dream: 6, care: 5, thought: 3, order: 2, wit: 8, desire: 9, tough: 3, tags: '贪吃、好色、幽默、接地气' },
  { name: '沙僧', works: '《西游记》', action: 3, emotion: 5, inner: 5, dream: 4, care: 8, thought: 4, order: 8, wit: 4, desire: 3, tough: 8, tags: '老实、可靠、沉默、扛活' },
  { name: '诸葛亮', works: '《三国演义》', action: 8, emotion: 5, inner: 7, dream: 6, care: 8, thought: 9, order: 9, wit: 3, desire: 3, tough: 8, tags: '智谋、鞠躬尽瘁、谨慎、忠贞' },
  { name: '曹操', works: '《三国演义》', action: 9, emotion: 3, inner: 6, dream: 6, care: 3, thought: 8, order: 5, wit: 7, desire: 9, tough: 8, tags: '雄才、多疑、实用、权谋' },
  { name: '关羽', works: '《三国演义》', action: 7, emotion: 8, inner: 4, dream: 5, care: 7, thought: 3, order: 9, wit: 3, desire: 4, tough: 9, tags: '忠义、骄傲、刚烈、自矜' },
  { name: '武松', works: '《水浒传》', action: 9, emotion: 8, inner: 3, dream: 4, care: 6, thought: 3, order: 5, wit: 5, desire: 4, tough: 9, tags: '快意、勇猛、直性、恩仇' },
  { name: '宋江', works: '《水浒传》', action: 4, emotion: 6, inner: 8, dream: 5, care: 8, thought: 6, order: 8, wit: 5, desire: 4, tough: 6, tags: '仁义、纠结、招安、仗义' },
  { name: '李逵', works: '《水浒传》', action: 9, emotion: 9, inner: 2, dream: 4, care: 7, thought: 2, order: 2, wit: 8, desire: 6, tough: 8, tags: '莽撞、直率、赤子、义气' },
  { name: '林冲', works: '《水浒传》', action: 6, emotion: 6, inner: 8, dream: 4, care: 6, thought: 5, order: 8, wit: 3, desire: 3, tough: 8, tags: '隐忍、内敛、被逼、武艺' },
  { name: '阿Q', works: '《阿Q正传》', action: 5, emotion: 6, inner: 2, dream: 8, care: 4, thought: 3, order: 3, wit: 9, desire: 6, tough: 2, tags: '自欺、精神胜利、麻木、可笑' },
  { name: '孔乙己', works: '《孔乙己》', action: 2, emotion: 5, inner: 6, dream: 5, care: 4, thought: 7, order: 8, wit: 5, desire: 4, tough: 2, tags: '迂腐、清高、可怜、执念' },

  // —— 中国现当代（8）——
  { name: '曹七巧', works: '《金锁记》', action: 6, emotion: 3, inner: 8, dream: 5, care: 2, thought: 6, order: 5, wit: 4, desire: 10, tough: 7, tags: '扭曲、尖刻、狠毒、怨怼' },
  { name: '白流苏', works: '《倾城之恋》', action: 6, emotion: 4, inner: 8, dream: 4, care: 5, thought: 6, order: 7, wit: 6, desire: 8, tough: 6, tags: '精明、求安稳、亦真亦假、算计' },
  { name: '福贵', works: '《活着》', action: 5, emotion: 7, inner: 4, dream: 3, care: 8, thought: 2, order: 5, wit: 5, desire: 2, tough: 10, tags: '认命、坚韧、活着、苦难' },
  { name: '许三观', works: '《许三观卖血记》', action: 6, emotion: 7, inner: 4, dream: 3, care: 8, thought: 4, order: 5, wit: 8, desire: 3, tough: 8, tags: '善良、幽默、扛家、卖血' },
  { name: '王二', works: '《黄金时代》', action: 7, emotion: 6, inner: 4, dream: 8, care: 5, thought: 7, order: 2, wit: 9, desire: 8, tough: 6, tags: '反讽、自由、不羁、率性' },
  { name: '翠翠', works: '《边城》', action: 3, emotion: 9, inner: 8, dream: 6, care: 6, thought: 5, order: 6, wit: 4, desire: 3, tough: 4, tags: '纯真、羞怯、等待、山水' },
  { name: '王一生', works: '《棋王》', action: 5, emotion: 5, inner: 9, dream: 5, care: 5, thought: 9, order: 6, wit: 3, desire: 2, tough: 8, tags: '专注、淡泊、痴棋、精神' },
  { name: '白嘉轩', works: '《白鹿原》', action: 7, emotion: 5, inner: 5, dream: 3, care: 8, thought: 6, order: 9, wit: 3, desire: 5, tough: 9, tags: '固执、硬气、宗族、脊梁' },

  // —— 日本（4）——
  { name: '光源氏', works: '《源氏物语》', action: 4, emotion: 9, inner: 8, dream: 6, care: 6, thought: 5, order: 6, wit: 5, desire: 9, tough: 3, tags: '多情、优雅、漂泊、物哀' },
  { name: '大庭叶藏', works: '《人间失格》', action: 2, emotion: 8, inner: 10, dream: 6, care: 4, thought: 7, order: 3, wit: 5, desire: 6, tough: 2, tags: '敏感、自毁、讨好、堕落' },
  { name: '驹子', works: '《雪国》', action: 5, emotion: 9, inner: 7, dream: 6, care: 6, thought: 3, order: 5, wit: 4, desire: 8, tough: 3, tags: '纯真、世俗、徒劳、艺伎' },
  { name: '沟口', works: '《金阁寺》', action: 3, emotion: 6, inner: 9, dream: 6, care: 3, thought: 8, order: 4, wit: 2, desire: 9, tough: 4, tags: '自卑、痴美、毁灭、口吃' },

  // —— 西方古典（10）——
  { name: '哈姆雷特', works: '《哈姆雷特》', action: 2, emotion: 8, inner: 10, dream: 5, care: 6, thought: 9, order: 5, wit: 7, desire: 4, tough: 3, tags: '迟疑、内省、复仇、延宕' },
  { name: '麦克白', works: '《麦克白》', action: 7, emotion: 7, inner: 8, dream: 6, care: 3, thought: 6, order: 4, wit: 3, desire: 10, tough: 4, tags: '野心、欲望、篡位、良心' },
  { name: '堂吉诃德', works: '《堂吉诃德》', action: 9, emotion: 8, inner: 2, dream: 10, care: 8, thought: 5, order: 2, wit: 7, desire: 5, tough: 8, tags: '理想、疯癫、骑士、天真' },
  { name: '桑丘·潘沙', works: '《堂吉诃德》', action: 6, emotion: 6, inner: 5, dream: 3, care: 8, thought: 3, order: 6, wit: 8, desire: 5, tough: 6, tags: '务实、忠厚、现实、幽默' },
  { name: '浮士德', works: '《浮士德》', action: 8, emotion: 7, inner: 7, dream: 7, care: 3, thought: 9, order: 5, wit: 5, desire: 9, tough: 4, tags: '求知、欲望、交易、永不满足' },
  { name: '少年维特', works: '《少年维特之烦恼》', action: 3, emotion: 10, inner: 9, dream: 8, care: 6, thought: 7, order: 4, wit: 4, desire: 7, tough: 2, tags: '多愁、感伤、为爱、殉情' },
  { name: '苔丝', works: '《德伯家的苔丝》', action: 6, emotion: 9, inner: 7, dream: 5, care: 8, thought: 5, order: 6, wit: 3, desire: 3, tough: 8, tags: '纯洁、坚韧、悲剧、牺牲' },
  { name: '爱玛·包法利', works: '《包法利夫人》', action: 6, emotion: 8, inner: 6, dream: 9, care: 4, thought: 5, order: 3, wit: 5, desire: 9, tough: 3, tags: '虚荣、幻想、浪漫、不甘' },
  { name: '冉阿让', works: '《悲惨世界》', action: 8, emotion: 7, inner: 6, dream: 5, care: 10, thought: 6, order: 7, wit: 3, desire: 3, tough: 9, tags: '救赎、善良、力大、慈悲' },
  { name: '沙威', works: '《悲惨世界》', action: 7, emotion: 2, inner: 6, dream: 2, care: 5, thought: 7, order: 10, wit: 2, desire: 4, tough: 8, tags: '刻板、执法、法理、偏执' },

  // —— 西方 19–20 世纪（14）——
  { name: '于连·索雷尔', works: '《红与黑》', action: 8, emotion: 3, inner: 8, dream: 6, care: 3, thought: 7, order: 5, wit: 6, desire: 9, tough: 7, tags: '野心、自尊、上进、伪装' },
  { name: '拉斯柯尔尼科夫', works: '《罪与罚》', action: 6, emotion: 6, inner: 10, dream: 5, care: 3, thought: 9, order: 4, wit: 3, desire: 8, tough: 4, tags: '挣扎、自傲、救赎、罪' },
  { name: '安娜·卡列尼娜', works: '《安娜·卡列尼娜》', action: 8, emotion: 10, inner: 7, dream: 6, care: 6, thought: 5, order: 3, wit: 4, desire: 9, tough: 3, tags: '激情、勇敢、毁灭、婚外' },
  { name: '娜塔莎·罗斯托娃', works: '《战争与和平》', action: 8, emotion: 9, inner: 3, dream: 8, care: 8, thought: 5, order: 3, wit: 6, desire: 7, tough: 6, tags: '生命、冲动、成长、热爱' },
  { name: '简·爱', works: '《简·爱》', action: 7, emotion: 7, inner: 8, dream: 5, care: 7, thought: 7, order: 8, wit: 4, desire: 3, tough: 9, tags: '自尊、独立、理性、平等' },
  { name: '罗切斯特', works: '《简·爱》', action: 7, emotion: 8, inner: 7, dream: 5, care: 4, thought: 6, order: 4, wit: 6, desire: 8, tough: 7, tags: '激情、骄傲、孤独、秘密' },
  { name: '希斯克利夫', works: '《呼啸山庄》', action: 7, emotion: 9, inner: 7, dream: 6, care: 2, thought: 4, order: 3, wit: 3, desire: 10, tough: 9, tags: '偏执、复仇、毁灭、痴爱' },
  { name: '凯瑟琳·恩肖', works: '《呼啸山庄》', action: 7, emotion: 9, inner: 4, dream: 8, care: 5, thought: 5, order: 2, wit: 6, desire: 8, tough: 6, tags: '野性、矛盾、自由、爱恨' },
  { name: '达西', works: '《傲慢与偏见》', action: 6, emotion: 8, inner: 7, dream: 5, care: 6, thought: 6, order: 8, wit: 3, desire: 4, tough: 7, tags: '傲慢、克制、深情、绅士' },
  { name: '伊丽莎白·班纳特', works: '《傲慢与偏见》', action: 7, emotion: 5, inner: 7, dream: 5, care: 6, thought: 6, order: 3, wit: 9, desire: 5, tough: 6, tags: '机智、独立、偏见、坦率' },
  { name: '霍尔顿·考菲尔德', works: '《麦田守望者》', action: 5, emotion: 8, inner: 9, dream: 8, care: 6, thought: 7, order: 2, wit: 7, desire: 4, tough: 3, tags: '叛逆、真诚、迷惘、纯真' },
  { name: '盖茨比', works: '《了不起的盖茨比》', action: 8, emotion: 8, inner: 4, dream: 9, care: 4, thought: 4, order: 5, wit: 4, desire: 9, tough: 7, tags: '痴情、执着、幻梦、美国梦' },
  { name: '斯嘉丽·奥哈拉', works: '《飘》', action: 9, emotion: 7, inner: 4, dream: 6, care: 3, thought: 4, order: 5, wit: 6, desire: 8, tough: 10, tags: '顽强、自私、生命力、生存' },
  { name: '亚哈船长', works: '《白鲸》', action: 8, emotion: 6, inner: 7, dream: 6, care: 3, thought: 7, order: 4, wit: 2, desire: 10, tough: 9, tags: '偏执、复仇、不妥协、鲸' },

  // —— 西方现代及其他（12）——
  { name: '默尔索', works: '《局外人》', action: 3, emotion: 2, inner: 8, dream: 4, care: 3, thought: 8, order: 4, wit: 5, desire: 4, tough: 6, tags: '疏离、诚实、无意义、冷漠' },
  { name: '格里高尔·萨姆沙', works: '《变形记》', action: 5, emotion: 5, inner: 8, dream: 4, care: 8, thought: 5, order: 8, wit: 3, desire: 2, tough: 3, tags: '尽责、异化、牺牲、变形' },
  { name: '爱德蒙·唐泰斯', works: '《基督山伯爵》', action: 7, emotion: 6, inner: 9, dream: 5, care: 4, thought: 7, order: 6, wit: 4, desire: 8, tough: 9, tags: '复仇、隐忍、翻盘、财富' },
  { name: '福尔摩斯', works: '《福尔摩斯探案集》', action: 7, emotion: 3, inner: 8, dream: 5, care: 3, thought: 10, order: 7, wit: 7, desire: 4, tough: 6, tags: '理性、古怪、天才、推理' },
  { name: '加西莫多', works: '《巴黎圣母院》', action: 5, emotion: 9, inner: 6, dream: 4, care: 9, thought: 4, order: 5, wit: 2, desire: 3, tough: 8, tags: '貌丑、心纯、守护、钟楼' },
  { name: '爱丽丝', works: '《爱丽丝梦游仙境》', action: 8, emotion: 8, inner: 4, dream: 9, care: 6, thought: 6, order: 3, wit: 7, desire: 5, tough: 6, tags: '好奇、勇敢、不合逻辑、梦' },
  { name: '小王子', works: '《小王子》', action: 6, emotion: 9, inner: 6, dream: 8, care: 8, thought: 9, order: 5, wit: 4, desire: 3, tough: 5, tags: '纯真、追问、孤独、玫瑰' },
  { name: '悉达多', works: '《悉达多》', action: 6, emotion: 6, inner: 9, dream: 6, care: 6, thought: 9, order: 6, wit: 3, desire: 3, tough: 7, tags: '求道、觉悟、经历、河' },
  { name: '阿廖沙·卡拉马佐夫', works: '《卡拉马佐夫兄弟》', action: 6, emotion: 9, inner: 7, dream: 6, care: 10, thought: 8, order: 7, wit: 4, desire: 3, tough: 7, tags: '虔诚、纯善、爱人、信仰' },
  { name: '伊万·卡拉马佐夫', works: '《卡拉马佐夫兄弟》', action: 6, emotion: 3, inner: 9, dream: 5, care: 3, thought: 10, order: 6, wit: 6, desire: 6, tough: 6, tags: '理性、怀疑、痛苦、思想' },
  { name: '德米特里·卡拉马佐夫', works: '《卡拉马佐夫兄弟》', action: 8, emotion: 9, inner: 3, dream: 5, care: 5, thought: 4, order: 3, wit: 5, desire: 9, tough: 7, tags: '激情、冲动、欲望、矛盾' },
  { name: '达达尼昂', works: '《三个火枪手》', action: 9, emotion: 8, inner: 3, dream: 8, care: 7, thought: 3, order: 6, wit: 7, desire: 6, tough: 7, tags: '热血、忠诚、冒险、火枪' },

  // —— 神话 / 民间 / 补充（6）——
  { name: '白素贞', works: '《白蛇传》', action: 7, emotion: 9, inner: 6, dream: 6, care: 8, thought: 4, order: 7, wit: 3, desire: 8, tough: 8, tags: '痴情、执着、报恩、蛇妖' },
  { name: '花木兰', works: '《木兰辞》', action: 9, emotion: 7, inner: 5, dream: 6, care: 8, thought: 5, order: 8, wit: 4, desire: 3, tough: 9, tags: '勇敢、忠孝、担当、女扮男装' },
  { name: '奥菲利娅', works: '《哈姆雷特》', action: 2, emotion: 9, inner: 8, dream: 7, care: 7, thought: 5, order: 5, wit: 4, desire: 5, tough: 2, tags: '纯真、命运、悲剧、疯癫' },
  { name: '唐璜', works: '《唐璜》', action: 8, emotion: 7, inner: 5, dream: 6, care: 2, thought: 4, order: 2, wit: 9, desire: 10, tough: 6, tags: '风流、游戏、放浪、引诱' },
  { name: '石神哲哉', works: '《嫌疑人X的献身》', action: 6, emotion: 5, inner: 9, dream: 4, care: 3, thought: 9, order: 6, wit: 2, desire: 5, tough: 9, tags: '偏执、守护、孤独、天才' },
  { name: '郭靖', works: '《射雕英雄传》', action: 7, emotion: 7, inner: 5, dream: 4, care: 10, thought: 5, order: 8, wit: 2, desire: 3, tough: 9, tags: '憨厚、侠义、为国、为民' },
];
