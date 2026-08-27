// 48 种动物及其 10 维生态画像（0-10）。
// 维度顺序：social 群性 / circadian 昼夜 / territory 领地 / predation 掠食
//          vigilance 警觉 / display 炫耀 / dormancy 蛰伏 / hoard 囤积
//          curiosity 好奇 / combat 好斗
//
// 打分标尺（保证 48 种动物一致）：
//   8–10  该动物的标志性特质（一说名字就想到的）
//   5–7   有但不突出
//   2–4   明显相反或很弱
//   0–1   完全相反
// 每种动物的"主维度"给 8–10，"低维度"给 2–4，其余 5–7，避免全部堆在 7–9。
// name 带 emoji，前端直接在结果名里显示大 emoji；species 是具体物种名（供 meta 副标题）。
module.exports = [
  // —— A. 独行与聪明 ——
  { name: '🦊 狐狸', species: '赤狐', social: 7, circadian: 6, territory: 5, predation: 8, vigilance: 8, display: 6, dormancy: 6, hoard: 5, curiosity: 8, combat: 5, tags: '聪明、狡黠、点到为止' },
  { name: '🐈 猫', species: '家猫', social: 3, circadian: 7, territory: 7, predation: 5, vigilance: 6, display: 4, dormancy: 7, hoard: 4, curiosity: 6, combat: 5, tags: '自我、边界感、清醒' },
  { name: '🐙 章鱼', species: '普通章鱼', social: 2, circadian: 6, territory: 4, predation: 5, vigilance: 7, display: 2, dormancy: 7, hoard: 4, curiosity: 10, combat: 4, tags: '高智、孤独、深不可测' },
  { name: '🐦 乌鸦', species: '小嘴乌鸦', social: 5, circadian: 6, territory: 5, predation: 5, vigilance: 8, display: 3, dormancy: 5, hoard: 8, curiosity: 8, combat: 5, tags: '机警、适应力、独立' },
  { name: '🦎 变色龙', species: '高冠变色龙', social: 2, circadian: 6, territory: 6, predation: 4, vigilance: 8, display: 2, dormancy: 8, hoard: 3, curiosity: 7, combat: 2, tags: '伪装、适应、慢观察' },
  { name: '🐍 蛇', species: '眼镜王蛇', social: 2, circadian: 7, territory: 3, predation: 3, vigilance: 5, display: 3, dormancy: 9, hoard: 4, curiosity: 3, combat: 4, tags: '冷静、隐忍、蜕变' },

  // —— B. 温柔与敏感 ——
  { name: '🦌 鹿', species: '梅花鹿', social: 4, circadian: 7, territory: 4, predation: 2, vigilance: 10, display: 3, dormancy: 7, hoard: 3, curiosity: 3, combat: 2, tags: '敏感、温顺、易惊' },
  { name: '🐰 兔子', species: '穴兔', social: 9, circadian: 4, territory: 5, predation: 1, vigilance: 9, display: 3, dormancy: 4, hoard: 4, curiosity: 6, combat: 1, tags: '机警、温顺、合群' },
  { name: '🐎 马', species: '蒙古马', social: 7, circadian: 5, territory: 2, predation: 2, vigilance: 7, display: 5, dormancy: 4, hoard: 3, curiosity: 6, combat: 4, tags: '自由、敏感、向往远方' },
  { name: '🐘 大象', species: '亚洲象', social: 9, circadian: 5, territory: 6, predation: 2, vigilance: 5, display: 4, dormancy: 6, hoard: 5, curiosity: 6, combat: 4, tags: '温柔、重情、记性' },
  { name: '🐋 蓝鲸', species: '蓝鲸', social: 4, circadian: 6, territory: 3, predation: 3, vigilance: 5, display: 3, dormancy: 6, hoard: 4, curiosity: 6, combat: 2, tags: '温柔、庞大、孤独' },

  // —— C. 群居与暖意 ——
  { name: '🦦 水獭', species: '海獭', social: 9, circadian: 6, territory: 4, predation: 4, vigilance: 5, display: 4, dormancy: 3, hoard: 3, curiosity: 7, combat: 4, tags: '爱玩、合群、有感染力' },
  { name: '🐝 蜜蜂', species: '西方蜜蜂', social: 10, circadian: 4, territory: 5, predation: 3, vigilance: 5, display: 3, dormancy: 3, hoard: 8, curiosity: 4, combat: 5, tags: '勤勉、利他、守秩序' },
  { name: '🐧 企鹅', species: '帝企鹅', social: 9, circadian: 5, territory: 6, predation: 5, vigilance: 6, display: 4, dormancy: 6, hoard: 6, curiosity: 5, combat: 5, tags: '抱团、忠贞、笨拙浪漫' },
  { name: '🕊 旅鸽', species: '旅鸽 🦴', social: 10, circadian: 5, territory: 2, predation: 2, vigilance: 5, display: 4, dormancy: 4, hoard: 3, curiosity: 4, combat: 2, tags: '归属、迁徙、深情' },
  { name: '🐬 海豚', species: '宽吻海豚', social: 9, circadian: 5, territory: 3, predation: 5, vigilance: 6, display: 7, dormancy: 4, hoard: 3, curiosity: 8, combat: 4, tags: '高智、利他、明亮' },
  { name: '🦭 海豹', species: '港海豹', social: 8, circadian: 5, territory: 4, predation: 5, vigilance: 5, display: 5, dormancy: 9, hoard: 3, curiosity: 5, combat: 3, tags: '慵懒、松弛、自洽' },

  // —— D. 张扬与美 ——
  { name: '🦢 天鹅', species: '疣鼻天鹅', social: 5, circadian: 6, territory: 6, predation: 3, vigilance: 5, display: 7, dormancy: 6, hoard: 4, curiosity: 3, combat: 3, tags: '优雅、忠贞、沉默' },
  { name: '🦩 火烈鸟', species: '大红鹳', social: 9, circadian: 5, territory: 4, predation: 2, vigilance: 5, display: 10, dormancy: 5, hoard: 3, curiosity: 4, combat: 2, tags: '醒目、坦荡、爱美' },
  { name: '🦜 鹦鹉', species: '金刚鹦鹉', social: 7, circadian: 5, territory: 4, predation: 3, vigilance: 6, display: 9, dormancy: 4, hoard: 3, curiosity: 9, combat: 4, tags: '聪明、好奇、色彩' },
  { name: '🦋 蝴蝶', species: '帝王蝶', social: 3, circadian: 5, territory: 2, predation: 2, vigilance: 4, display: 8, dormancy: 6, hoard: 2, curiosity: 5, combat: 1, tags: '蜕变、轻盈、绚烂' },

  // —— E. 沉稳与蛰伏 ——
  { name: '🐢 乌龟', species: '陆龟', social: 2, circadian: 5, territory: 9, predation: 2, vigilance: 4, display: 2, dormancy: 9, hoard: 5, curiosity: 2, combat: 2, tags: '沉稳、坚忍、慢' },
  { name: '🐻 棕熊', species: '棕熊', social: 4, circadian: 6, territory: 8, predation: 6, vigilance: 4, display: 3, dormancy: 10, hoard: 6, curiosity: 5, combat: 7, tags: '慵懒、护短、深藏不露' },
  { name: '🦔 刺猬', species: '普通刺猬', social: 4, circadian: 7, territory: 5, predation: 4, vigilance: 8, display: 2, dormancy: 8, hoard: 6, curiosity: 4, combat: 3, tags: '外冷内软、慢热、防御' },
  { name: '🐊 鳄鱼', species: '尼罗鳄', social: 2, circadian: 7, territory: 9, predation: 3, vigilance: 7, display: 3, dormancy: 8, hoard: 4, curiosity: 4, combat: 8, tags: '冷血、耐心、伏击' },
  { name: '🐿 松鼠', species: '红松鼠', social: 5, circadian: 4, territory: 6, predation: 3, vigilance: 8, display: 4, dormancy: 4, hoard: 10, curiosity: 6, combat: 4, tags: '未雨绸缪、机警、勤快' },

  // —— F. 强悍与无畏 ——
  { name: '🐯 虎', species: '东北虎', social: 2, circadian: 6, territory: 9, predation: 9, vigilance: 6, display: 5, dormancy: 6, hoard: 4, curiosity: 5, combat: 9, tags: '孤高、强悍、王者' },
  { name: '🐺 狼', species: '灰狼', social: 8, circadian: 6, territory: 5, predation: 7, vigilance: 6, display: 4, dormancy: 4, hoard: 4, curiosity: 6, combat: 7, tags: '忠诚、野性、坚韧' },
  { name: '🦅 鹰', species: '金雕', social: 2, circadian: 4, territory: 4, predation: 9, vigilance: 7, display: 5, dormancy: 5, hoard: 3, curiosity: 7, combat: 6, tags: '自由、远见、独行' },
  { name: '🦈 鲨鱼', species: '大白鲨', social: 3, circadian: 7, territory: 6, predation: 10, vigilance: 8, display: 4, dormancy: 2, hoard: 2, curiosity: 6, combat: 10, tags: '专注、冷静、永不停歇' },
  { name: '🦡 蜜獾', species: '蜜獾', social: 2, circadian: 6, territory: 8, predation: 9, vigilance: 2, display: 5, dormancy: 5, hoard: 3, curiosity: 7, combat: 10, tags: '无畏、生猛、天不怕' },
  { name: '🐐 山羊', species: '阿尔卑斯羱羊', social: 4, circadian: 5, territory: 6, predation: 2, vigilance: 6, display: 4, dormancy: 5, hoard: 4, curiosity: 8, combat: 8, tags: '倔强、独立、爱攀登' },

  // —— G. 夜的守望 ——
  { name: '🦉 猫头鹰', species: '长耳鸮', social: 3, circadian: 10, territory: 5, predation: 5, vigilance: 8, display: 3, dormancy: 7, hoard: 4, curiosity: 7, combat: 4, tags: '理性、沉静、夜之眼' },
  { name: '🦇 蝙蝠', species: '普通蝙蝠', social: 8, circadian: 10, territory: 5, predation: 4, vigilance: 7, display: 3, dormancy: 6, hoard: 4, curiosity: 6, combat: 4, tags: '夜行、神秘、群居' },

  // —— H. 信任与孤独（已灭绝 🦴）——
  { name: '🦤 渡渡鸟', species: '渡渡鸟 🦴', social: 7, circadian: 5, territory: 4, predation: 1, vigilance: 3, display: 4, dormancy: 6, hoard: 4, curiosity: 4, combat: 1, tags: '信任、温柔、真诚' },
  { name: '🦘 袋狼', species: '塔斯马尼亚虎 🦴', social: 2, circadian: 7, territory: 6, predation: 7, vigilance: 8, display: 3, dormancy: 6, hoard: 3, curiosity: 6, combat: 5, tags: '神秘、沉默、孤独' },

  // —— I. 新加入的十二种 ——
  { name: '🐖 猪', species: '家猪', social: 5, circadian: 5, territory: 4, predation: 2, vigilance: 3, display: 2, dormancy: 8, hoard: 4, curiosity: 8, combat: 2, tags: '通透、聪明、懂享受' },
  { name: '🐄 牛', species: '家牛', social: 6, circadian: 4, territory: 5, predation: 2, vigilance: 4, display: 2, dormancy: 8, hoard: 8, curiosity: 3, combat: 4, tags: '勤恳、耐劳、深耕' },
  { name: '🐒 猴子', species: '猕猴', social: 8, circadian: 5, territory: 3, predation: 4, vigilance: 5, display: 7, dormancy: 2, hoard: 3, curiosity: 9, combat: 7, tags: '机灵、顽皮、爱闹' },
  { name: '🐕 狗', species: '家犬', social: 8, circadian: 5, territory: 5, predation: 4, vigilance: 7, display: 3, dormancy: 4, hoard: 4, curiosity: 6, combat: 6, tags: '忠诚、守护、无保留' },
  { name: '🐪 骆驼', species: '双峰驼', social: 4, circadian: 5, territory: 9, predation: 3, vigilance: 6, display: 2, dormancy: 6, hoard: 9, curiosity: 5, combat: 4, tags: '耐旱、远行、能扛' },
  { name: '🦚 孔雀', species: '蓝孔雀', social: 5, circadian: 5, territory: 7, predation: 2, vigilance: 5, display: 10, dormancy: 4, hoard: 2, curiosity: 4, combat: 3, tags: '华丽、自赏、从容' },
  { name: '🐆 猎豹', species: '猎豹', social: 2, circadian: 5, territory: 4, predation: 9, vigilance: 6, display: 7, dormancy: 4, hoard: 2, curiosity: 6, combat: 3, tags: '迅捷、优雅、不恋战' },
  { name: '🦂 蝎子', species: '黑粗尾蝎', social: 2, circadian: 6, territory: 5, predation: 5, vigilance: 8, display: 2, dormancy: 6, hoard: 3, curiosity: 4, combat: 8, tags: '低调、致命、防御' },
  { name: '🐸 树蛙', species: '红眼树蛙', social: 3, circadian: 8, territory: 3, predation: 7, vigilance: 6, display: 4, dormancy: 6, hoard: 2, curiosity: 5, combat: 3, tags: '耐心、守候、夜行' },
  { name: '🦏 犀牛', species: '白犀牛', social: 5, circadian: 4, territory: 8, predation: 4, vigilance: 4, display: 2, dormancy: 6, hoard: 3, curiosity: 2, combat: 8, tags: '温厚、护土、爆发' },
  { name: '🦥 树懒', species: '褐喉树懒', social: 4, circadian: 4, territory: 3, predation: 1, vigilance: 2, display: 2, dormancy: 10, hoard: 2, curiosity: 2, combat: 1, tags: '极慢、节能、与世无争' },
  { name: '🐹 仓鼠', species: '叙利亚仓鼠', social: 3, circadian: 7, territory: 5, predation: 2, vigilance: 5, display: 2, dormancy: 6, hoard: 9, curiosity: 4, combat: 2, tags: '深夜、囤积、独处' },
];
