// 72 位作家及其 10 维画像（0-10）。
// 维度顺序：narrative 叙事 / lyric 抒情 / psychology 心理 / imagination 想象
//          society 社会 / philosophy 哲思 / form 形式 / readability 轻快 / humor 幽默 / desire 欲望
//
// 本版按诊断报告做了三处维度层改动：
// 1) 新增 humor（反讽/幽默/机智）：分开纳博科夫 / 钱钟书 / 王小波 / 塞万提斯 /
//    契诃夫 / 辛波斯卡这批"反讽的智慧"型作家。
// 2) readability 从"易读"重定义为"轻快/直接"：不再与 form 互为镜像，而是独立的
//    "节奏快、表达直、一读就进去"。
// 3) 新增 desire（欲望/情欲/渴求/占有）：分开三岛由纪夫 / 张爱玲 / 福楼拜 /
//    纳博科夫 / 紫式部这批"欲望驱动"型作家。
//
// 曹雪芹已二次降峰：只保留 psychology=10 这一个满分与 lyric=9 次高峰，其余压到
// 4–7（narrative 5 / society 7 / form 4 / readability 5 / humor 6 / desire 6），
// 不再"万能答案"——辨识度来自"有所不写"。
module.exports = [
  { name: '荷马', region_era: '古希腊', works: '《伊利亚特》《奥德赛》', narrative: 9, lyric: 7, psychology: 3, imagination: 8, society: 7, philosophy: 4, form: 3, readability: 7, humor: 4, desire: 5, tags: '史诗、英雄、战争、命运' },
  { name: '索福克勒斯', region_era: '古希腊', works: '《俄狄浦斯王》《安提戈涅》', narrative: 8, lyric: 8, psychology: 7, imagination: 5, society: 9, philosophy: 8, form: 6, readability: 6, humor: 2, desire: 3, tags: '悲剧、命运、责任、城邦' },
  { name: '柏拉图', region_era: '古希腊', works: '《理想国》《会饮篇》', narrative: 3, lyric: 3, psychology: 4, imagination: 4, society: 8, philosophy: 10, form: 8, readability: 4, humor: 6, desire: 6, tags: '对话、理念、政治、知识' },
  { name: '维吉尔', region_era: '古罗马', works: '《埃涅阿斯纪》', narrative: 9, lyric: 8, psychology: 3, imagination: 6, society: 9, philosophy: 5, form: 4, readability: 6, humor: 2, desire: 4, tags: '史诗、国家、责任、牺牲' },
  { name: '奥维德', region_era: '古罗马', works: '《变形记》', narrative: 9, lyric: 8, psychology: 3, imagination: 10, society: 6, philosophy: 3, form: 4, readability: 8, humor: 6, desire: 8, tags: '神话、变形、欲望、奇观' },
  { name: '司马迁', region_era: '中国汉代', works: '《史记》', narrative: 9, lyric: 7, psychology: 7, imagination: 3, society: 10, philosophy: 7, form: 5, readability: 7, humor: 5, desire: 4, tags: '历史、人物、权力、尊严' },
  { name: '庄子', region_era: '中国战国', works: '《庄子》', narrative: 4, lyric: 10, psychology: 4, imagination: 9, society: 3, philosophy: 10, form: 8, readability: 5, humor: 9, desire: 2, tags: '寓言、自由、反讽、相对主义' },
  { name: '陶渊明', region_era: '中国东晋', works: '《桃花源记》《归去来兮辞》', narrative: 3, lyric: 10, psychology: 4, imagination: 6, society: 3, philosophy: 6, form: 4, readability: 9, humor: 4, desire: 2, tags: '隐逸、自然、淡泊、诗意' },
  { name: '李白', region_era: '中国唐代', works: '《蜀道难》《将进酒》', narrative: 3, lyric: 10, psychology: 3, imagination: 10, society: 4, philosophy: 4, form: 6, readability: 9, humor: 6, desire: 4, tags: '浪漫、自由、夸张、宇宙' },
  { name: '杜甫', region_era: '中国唐代', works: '《春望》《三吏三别》', narrative: 6, lyric: 10, psychology: 7, imagination: 3, society: 10, philosophy: 5, form: 5, readability: 6, humor: 3, desire: 3, tags: '现实、家国、民生、历史' },
  { name: '苏轼', region_era: '中国宋代', works: '《赤壁赋》《念奴娇·赤壁怀古》', narrative: 4, lyric: 10, psychology: 5, imagination: 6, society: 6, philosophy: 7, form: 6, readability: 8, humor: 7, desire: 4, tags: '旷达、自然、人生、哲思' },
  { name: '曹雪芹', region_era: '中国清代', works: '《红楼梦》', narrative: 5, lyric: 9, psychology: 10, imagination: 4, society: 7, philosophy: 7, form: 4, readability: 5, humor: 6, desire: 6, tags: '心理、家族、细节、悲剧' },
  { name: '施耐庵', region_era: '中国元末明初', works: '《水浒传》', narrative: 9, lyric: 6, psychology: 5, imagination: 7, society: 9, philosophy: 4, form: 4, readability: 9, humor: 5, desire: 4, tags: '群像、江湖、暴力、忠义' },
  { name: '罗贯中', region_era: '中国元末明初', works: '《三国演义》', narrative: 10, lyric: 4, psychology: 5, imagination: 3, society: 10, philosophy: 6, form: 5, readability: 9, humor: 4, desire: 4, tags: '战争、权谋、历史、英雄' },
  { name: '吴承恩', region_era: '中国明代', works: '《西游记》', narrative: 10, lyric: 6, psychology: 3, imagination: 10, society: 7, philosophy: 5, form: 5, readability: 9, humor: 8, desire: 4, tags: '神魔、冒险、讽刺、成长' },
  { name: '紫式部', region_era: '日本平安时代', works: '《源氏物语》', narrative: 8, lyric: 10, psychology: 9, imagination: 4, society: 5, philosophy: 6, form: 6, readability: 5, humor: 3, desire: 6, tags: '爱情、宫廷、心理、无常' },
  { name: '松尾芭蕉', region_era: '日本江户时代', works: '《奥之细道》', narrative: 3, lyric: 10, psychology: 4, imagination: 5, society: 2, philosophy: 8, form: 5, readability: 8, humor: 4, desire: 2, tags: '旅行、自然、瞬间、禅意' },
  { name: '迦梨陀娑', region_era: '古印度', works: '《沙恭达罗》《云使》', narrative: 8, lyric: 10, psychology: 5, imagination: 8, society: 4, philosophy: 4, form: 4, readability: 7, humor: 5, desire: 6, tags: '爱情、自然、神话、抒情' },
  { name: '费尔多西', region_era: '波斯', works: '《列王纪》', narrative: 9, lyric: 8, psychology: 3, imagination: 10, society: 8, philosophy: 4, form: 4, readability: 7, humor: 2, desire: 4, tags: '民族史诗、英雄、王权、神话' },
  { name: '《一千零一夜》作者群', region_era: '阿拉伯世界', works: '《一千零一夜》', narrative: 10, lyric: 8, psychology: 3, imagination: 10, society: 7, philosophy: 4, form: 7, readability: 10, humor: 7, desire: 7, tags: '套层故事、奇观、机智、欲望' },
  { name: '但丁', region_era: '意大利中世纪', works: '《神曲》', narrative: 9, lyric: 8, psychology: 5, imagination: 10, society: 7, philosophy: 9, form: 8, readability: 5, humor: 2, desire: 4, tags: '宗教、地狱、救赎、象征' },
  { name: '塞万提斯', region_era: '西班牙', works: '《堂吉诃德》', narrative: 10, lyric: 7, psychology: 5, imagination: 8, society: 7, philosophy: 6, form: 7, readability: 9, humor: 10, desire: 4, tags: '反讽、冒险、现实与幻想' },
  { name: '简·奥斯汀', region_era: '英国', works: '《傲慢与偏见》《爱玛》', narrative: 8, lyric: 5, psychology: 8, imagination: 3, society: 8, philosophy: 3, form: 6, readability: 10, humor: 9, desire: 5, tags: '机智、爱情、阶级、礼仪' },
  { name: '狄更斯', region_era: '英国', works: '《远大前程》《双城记》', narrative: 10, lyric: 6, psychology: 5, imagination: 5, society: 10, philosophy: 4, form: 4, readability: 9, humor: 8, desire: 5, tags: '社会、成长、戏剧、群像' },
  { name: '夏洛蒂·勃朗特', region_era: '英国', works: '《简·爱》', narrative: 8, lyric: 8, psychology: 8, imagination: 5, society: 7, philosophy: 5, form: 5, readability: 8, humor: 4, desire: 6, tags: '爱情、自尊、女性、哥特' },
  { name: '陀思妥耶夫斯基', region_era: '俄国', works: '《罪与罚》《卡拉马佐夫兄弟》', narrative: 10, lyric: 5, psychology: 10, imagination: 3, society: 8, philosophy: 10, form: 8, readability: 5, humor: 5, desire: 8, tags: '罪、信仰、自由、伦理' },
  { name: '托尔斯泰', region_era: '俄国', works: '《战争与和平》《安娜·卡列尼娜》', narrative: 10, lyric: 6, psychology: 9, imagination: 3, society: 10, philosophy: 9, form: 5, readability: 7, humor: 5, desire: 6, tags: '现实、家庭、历史、道德' },
  { name: '契诃夫', region_era: '俄国', works: '《樱桃园》《套中人》', narrative: 6, lyric: 7, psychology: 10, imagination: 3, society: 7, philosophy: 6, form: 6, readability: 8, humor: 8, desire: 5, tags: '日常、潜台词、失落、克制' },
  { name: '卡夫卡', region_era: '奥匈帝国/捷克', works: '《变形记》《审判》', narrative: 7, lyric: 6, psychology: 8, imagination: 9, society: 8, philosophy: 9, form: 10, readability: 5, humor: 5, desire: 5, tags: '荒诞、异化、制度、梦魇' },
  { name: '普鲁斯特', region_era: '法国', works: '《追忆似水年华》', narrative: 5, lyric: 10, psychology: 10, imagination: 3, society: 6, philosophy: 9, form: 10, readability: 2, humor: 4, desire: 6, tags: '记忆、时间、意识、感官' },
  { name: '加缪', region_era: '法国/阿尔及利亚', works: '《局外人》《鼠疫》', narrative: 8, lyric: 5, psychology: 6, imagination: 4, society: 8, philosophy: 10, form: 6, readability: 9, humor: 5, desire: 4, tags: '荒诞、反抗、清醒、道德' },
  { name: '萨特', region_era: '法国', works: '《恶心》《禁闭》', narrative: 6, lyric: 3, psychology: 7, imagination: 3, society: 8, philosophy: 10, form: 7, readability: 4, humor: 3, desire: 5, tags: '存在主义、自由、责任' },
  { name: '福楼拜', region_era: '法国', works: '《包法利夫人》', narrative: 8, lyric: 7, psychology: 8, imagination: 3, society: 8, philosophy: 4, form: 8, readability: 6, humor: 7, desire: 9, tags: '现实主义、欲望、讽刺、形式' },
  { name: '伍尔夫', region_era: '英国', works: '《到灯塔去》《达洛维夫人》', narrative: 5, lyric: 10, psychology: 8, imagination: 5, society: 9, philosophy: 7, form: 10, readability: 3, humor: 5, desire: 5, tags: '意识流、时间、女性、感知' },
  { name: '乔伊斯', region_era: '爱尔兰', works: '《尤利西斯》《都柏林人》', narrative: 6, lyric: 9, psychology: 9, imagination: 5, society: 7, philosophy: 6, form: 10, readability: 2, humor: 7, desire: 7, tags: '语言实验、意识流、城市、神话' },
  { name: '福克纳', region_era: '美国', works: '《喧哗与骚动》《我弥留之际》', narrative: 8, lyric: 8, psychology: 10, imagination: 5, society: 9, philosophy: 6, form: 10, readability: 3, humor: 4, desire: 6, tags: '多视角、南方、家族、时间' },
  { name: '海明威', region_era: '美国', works: '《老人与海》《太阳照常升起》', narrative: 8, lyric: 4, psychology: 3, imagination: 2, society: 5, philosophy: 3, form: 6, readability: 10, humor: 3, desire: 4, tags: '极简、行动、沉默、尊严' },
  { name: '菲茨杰拉德', region_era: '美国', works: '《了不起的盖茨比》', narrative: 8, lyric: 8, psychology: 6, imagination: 4, society: 8, philosophy: 4, form: 6, readability: 9, humor: 5, desire: 7, tags: '美国梦、爱情、阶级、幻灭' },
  { name: '托妮·莫里森', region_era: '美国', works: '《宠儿》《所罗门之歌》', narrative: 8, lyric: 9, psychology: 9, imagination: 9, society: 10, philosophy: 7, form: 6, readability: 4, humor: 4, desire: 5, tags: '黑人历史、创伤、记忆、女性' },
  { name: '纳博科夫', region_era: '俄裔美国', works: '《洛丽塔》《微暗的火》', narrative: 8, lyric: 10, psychology: 8, imagination: 5, society: 4, philosophy: 5, form: 10, readability: 4, humor: 10, desire: 10, tags: '语言、审美、不可靠叙述、游戏' },
  { name: '贝克特', region_era: '爱尔兰/法国', works: '《等待戈多》《莫洛伊》', narrative: 3, lyric: 5, psychology: 6, imagination: 8, society: 3, philosophy: 10, form: 10, readability: 2, humor: 6, desire: 3, tags: '荒诞、重复、停滞、语言失效' },
  { name: '博尔赫斯', region_era: '阿根廷', works: '《虚构集》《阿莱夫》', narrative: 7, lyric: 7, psychology: 4, imagination: 10, society: 6, philosophy: 10, form: 10, readability: 4, humor: 7, desire: 3, tags: '迷宫、镜子、无限、图书馆' },
  { name: '马尔克斯', region_era: '哥伦比亚', works: '《百年孤独》《霍乱时期的爱情》', narrative: 10, lyric: 9, psychology: 6, imagination: 10, society: 8, philosophy: 7, form: 8, readability: 6, humor: 7, desire: 7, tags: '魔幻、家族、历史、爱情' },
  { name: '科塔萨尔', region_era: '阿根廷', works: '《跳房子》《万火归一》', narrative: 6, lyric: 8, psychology: 6, imagination: 9, society: 5, philosophy: 6, form: 10, readability: 3, humor: 7, desire: 5, tags: '游戏、碎片、超现实、读者参与' },
  { name: '卡尔维诺', region_era: '意大利', works: '《看不见的城市》《寒冬夜行人》', narrative: 6, lyric: 8, psychology: 5, imagination: 9, society: 6, philosophy: 7, form: 9, readability: 9, humor: 8, desire: 4, tags: '轻盈、结构、幻想、知识' },
  { name: '埃科', region_era: '意大利', works: '《玫瑰之名》《傅科摆》', narrative: 9, lyric: 6, psychology: 5, imagination: 8, society: 7, philosophy: 7, form: 7, readability: 5, humor: 6, desire: 4, tags: '符号、历史、谜案、博学' },
  { name: '米兰·昆德拉', region_era: '捷克/法国', works: '《生命中不能承受之轻》《玩笑》', narrative: 7, lyric: 5, psychology: 6, imagination: 4, society: 9, philosophy: 8, form: 7, readability: 8, humor: 9, desire: 8, tags: '讽刺、爱情、政治、身体' },
  { name: '黑塞', region_era: '德国/瑞士', works: '《悉达多》《荒原狼》', narrative: 6, lyric: 8, psychology: 8, imagination: 6, society: 4, philosophy: 10, form: 6, readability: 8, humor: 3, desire: 5, tags: '灵性、成长、自我分裂' },
  { name: '托马斯·曼', region_era: '德国', works: '《魔山》《布登勃洛克一家》', narrative: 8, lyric: 5, psychology: 8, imagination: 4, society: 10, philosophy: 8, form: 8, readability: 3, humor: 6, desire: 6, tags: '疾病、时代、知识、衰败' },
  { name: 'J.M.库切', region_era: '南非/澳大利亚', works: '《耻》《等待野蛮人》《福》', narrative: 7, lyric: 3, psychology: 8, imagination: 4, society: 10, philosophy: 9, form: 7, readability: 5, humor: 3, desire: 6, tags: '冷峻、殖民、伦理、他者' },
  { name: '石黑一雄', region_era: '英国/日裔', works: '《长日将尽》《别让我走》', narrative: 8, lyric: 6, psychology: 10, imagination: 5, society: 7, philosophy: 7, form: 6, readability: 8, humor: 4, desire: 4, tags: '克制、记忆、责任、失去' },
  { name: '奈保尔', region_era: '特立尼达/英国', works: '《毕司沃斯先生的房子》《印度：受伤的文明》', narrative: 8, lyric: 4, psychology: 6, imagination: 2, society: 9, philosophy: 5, form: 4, readability: 8, humor: 6, desire: 4, tags: '流亡、殖民、身份、疏离' },
  { name: '帕慕克', region_era: '土耳其', works: '《我的名字叫红》《雪》', narrative: 9, lyric: 7, psychology: 6, imagination: 5, society: 9, philosophy: 6, form: 9, readability: 4, humor: 5, desire: 5, tags: '身份、历史、艺术、东西方' },
  { name: '纳吉布·马哈福兹', region_era: '埃及', works: '《开罗三部曲》《窃贼与狗》', narrative: 9, lyric: 5, psychology: 8, imagination: 2, society: 9, philosophy: 5, form: 5, readability: 8, humor: 4, desire: 5, tags: '城市、家庭、宗教、社会变迁' },
  { name: '阿契贝', region_era: '尼日利亚', works: '《瓦解》《荒原上的箭》', narrative: 8, lyric: 5, psychology: 4, imagination: 5, society: 10, philosophy: 7, form: 5, readability: 8, humor: 5, desire: 4, tags: '殖民、传统、文化冲突、群体' },
  { name: '辛波斯卡', region_era: '波兰', works: '《呼唤雪人》《结束与开始》', narrative: 4, lyric: 9, psychology: 5, imagination: 5, society: 7, philosophy: 7, form: 7, readability: 8, humor: 9, desire: 4, tags: '反讽、日常、偶然、历史' },
  { name: '安妮·卡森', region_era: '加拿大', works: '《红的自传》《丈夫之美》', narrative: 4, lyric: 10, psychology: 7, imagination: 8, society: 5, philosophy: 7, form: 10, readability: 3, humor: 7, desire: 8, tags: '跨文体、神话、欲望、断裂' },
  { name: '安部公房', region_era: '日本', works: '《砂女》《箱男》', narrative: 7, lyric: 5, psychology: 7, imagination: 9, society: 7, philosophy: 6, form: 7, readability: 4, humor: 4, desire: 5, tags: '荒诞、身份、空间、异化' },
  { name: '川端康成', region_era: '日本', works: '《雪国》《古都》', narrative: 4, lyric: 10, psychology: 7, imagination: 4, society: 3, philosophy: 6, form: 6, readability: 6, humor: 2, desire: 6, tags: '孤独、美、死亡、瞬间' },
  { name: '三岛由纪夫', region_era: '日本', works: '《金阁寺》《春雪》', narrative: 8, lyric: 9, psychology: 9, imagination: 5, society: 6, philosophy: 6, form: 8, readability: 4, humor: 3, desire: 9, tags: '身体、美、死亡、传统' },
  { name: '鲁迅', region_era: '中国', works: '《呐喊》《彷徨》《野草》', narrative: 7, lyric: 7, psychology: 8, imagination: 5, society: 10, philosophy: 8, form: 7, readability: 7, humor: 9, desire: 4, tags: '启蒙、讽刺、国民性、反抗' },
  { name: '沈从文', region_era: '中国', works: '《边城》《长河》', narrative: 5, lyric: 10, psychology: 5, imagination: 5, society: 5, philosophy: 4, form: 4, readability: 9, humor: 5, desire: 4, tags: '乡土、自然、人性、温柔' },
  { name: '张爱玲', region_era: '中国', works: '《金锁记》《倾城之恋》', narrative: 8, lyric: 9, psychology: 10, imagination: 4, society: 8, philosophy: 5, form: 6, readability: 7, humor: 7, desire: 9, tags: '都市、关系、欲望、苍凉' },
  { name: '钱钟书', region_era: '中国', works: '《围城》《谈艺录》', narrative: 8, lyric: 5, psychology: 5, imagination: 4, society: 8, philosophy: 6, form: 8, readability: 6, humor: 10, desire: 5, tags: '讽刺、知识、语言、婚姻' },
  { name: '王小波', region_era: '中国', works: '《黄金时代》《白银时代》', narrative: 8, lyric: 5, psychology: 6, imagination: 6, society: 9, philosophy: 6, form: 7, readability: 9, humor: 10, desire: 7, tags: '幽默、理性、自由、反权威' },
  { name: '莫言', region_era: '中国', works: '《红高粱家族》《蛙》', narrative: 9, lyric: 7, psychology: 5, imagination: 8, society: 10, philosophy: 5, form: 6, readability: 7, humor: 7, desire: 7, tags: '民间、历史、暴力、魔幻' },
  { name: '余华', region_era: '中国', works: '《活着》《许三观卖血记》', narrative: 9, lyric: 3, psychology: 4, imagination: 4, society: 9, philosophy: 4, form: 3, readability: 10, humor: 6, desire: 4, tags: '苦难、荒诞、普通人、韧性' },
  { name: '阿城', region_era: '中国', works: '《棋王》《树王》', narrative: 6, lyric: 7, psychology: 5, imagination: 4, society: 5, philosophy: 6, form: 3, readability: 9, humor: 6, desire: 3, tags: '简洁、民间、自然、精神性' },
  { name: '乔治·艾略特', region_era: '英国', works: '《米德尔马契》《弗洛斯河上的磨坊》', narrative: 7, lyric: 5, psychology: 9, imagination: 3, society: 8, philosophy: 6, form: 5, readability: 6, humor: 6, desire: 5, tags: '现实、道德、心理、社会' },
  { name: '艾丽丝·门罗', region_era: '加拿大', works: '《逃离》《亲爱的生活》', narrative: 7, lyric: 8, psychology: 10, imagination: 4, society: 7, philosophy: 7, form: 5, readability: 8, humor: 4, desire: 5, tags: '短篇、日常、心理、女性' },
  { name: '奥尔加·托卡尔丘克', region_era: '波兰', works: '《太古和其他的时间》《云游》', narrative: 6, lyric: 8, psychology: 6, imagination: 9, society: 8, philosophy: 9, form: 8, readability: 4, humor: 5, desire: 5, tags: '碎片、神话、哲思、旅行' },
  { name: '沃莱·索因卡', region_era: '尼日利亚', works: '《诠释者》《死亡与国王的马夫》', narrative: 7, lyric: 8, psychology: 6, imagination: 7, society: 9, philosophy: 8, form: 7, readability: 5, humor: 7, desire: 5, tags: '非洲、神话、政治、戏剧' },
];
