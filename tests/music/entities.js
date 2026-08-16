// 64 种音乐风格及其 10 维"声音"画像（0-10），按 7 大类组织。
// 维度顺序：warmth 温度 / intensity 强度 / order 秩序 / groove 律动 / nostalgia 怀旧
//          texture 质感 / inward 内省 / melancholy 忧郁 / space 留白 / aura 气场
//
// 这 10 维不是"音乐属性"，而是"你作为一种声音、一种存在"的人格隐喻：
//   温度 warmth     —— 温暖热烈 ↔ 冷冽疏离
//   强度 intensity  —— 迸发燃烧宣泄 ↔ 克制内敛不惊动
//   秩序 order      —— 严谨结构有条理 ↔ 即兴随性打破框架
//   律动 groove     —— 踩着节拍流动 ↔ 悬浮无拍漂浮
//   怀旧 nostalgia  —— 回望念旧 ↔ 前瞻求新
//   质感 texture    —— 精致光滑被打磨 ↔ 粗粝手作不修饰
//   内省 inward     —— 向内独白自我 ↔ 向外表达共振
//   忧郁 melancholy —— 忧郁悲悯深色调 ↔ 明快轻盈亮色调
//   留白 space      —— 留白呼吸空间感 ↔ 密实填满密度高
//   气场 aura       —— 宏大震撼仪式感 ↔ 贴身亲近日常感
//
// 打分标尺（保证 64 种风格一致）：
//   8–10  该风格的标志性特质（一说名字就想到的）
//   5–7   有但不突出
//   2–4   明显相反或很弱
//   0–1   完全相反
// 每种风格的"主维度"给 8–10，"低维度"给 2–4，其余 5–7。
// 特别注意：近亲风格（同族）必须靠主维组合拉开——否则余弦相似度 >0.86 时，
// 二者互相"吞噬"，被压制的那个永远成不了 top-1（见策划"易混对"一节）。
// name 带 emoji，前端直接在结果名里显示大 emoji；en 是风格英文名（供 meta 副标题与金句落款）。
module.exports = [
  // —— 一、摇滚与另类（15）——
  { name: '🎧 独立摇滚', en: 'Indie Rock', warmth: 6, intensity: 6, order: 4, groove: 4, nostalgia: 6, texture: 4, inward: 8, melancholy: 7, space: 6, aura: 3, tags: 'DIY、吉他、不从众' },
  { name: '🌗 另类摇滚', en: 'Alternative Rock', warmth: 5, intensity: 7, order: 5, groove: 6, nostalgia: 6, texture: 4, inward: 6, melancholy: 8, space: 6, aura: 5, tags: '边缘、多变、不归类' },
  { name: '🏔️ 后摇', en: 'Post-rock', warmth: 4, intensity: 9, order: 5, groove: 3, nostalgia: 4, texture: 6, inward: 7, melancholy: 9, space: 9, aura: 9, tags: '蓄势、爆发、无词' },
  { name: '🎇 盯鞋', en: 'Shoegaze', warmth: 4, intensity: 8, order: 4, groove: 3, nostalgia: 5, texture: 7, inward: 8, melancholy: 8, space: 8, aura: 4, tags: '模糊、沉浸、失焦' },
  { name: '🗡️ 后朋克', en: 'Post-punk', warmth: 3, intensity: 7, order: 6, groove: 8, nostalgia: 6, texture: 5, inward: 8, melancholy: 9, space: 6, aura: 6, tags: '冷峻、尖锐、智性' },
  { name: '🕯️ 哥特摇滚', en: 'Gothic Rock', warmth: 3, intensity: 7, order: 6, groove: 4, nostalgia: 7, texture: 6, inward: 7, melancholy: 10, space: 6, aura: 8, tags: '幽暗、戏剧、深渊' },
  { name: '🌧️ 垃圾摇滚', en: 'Grunge', warmth: 5, intensity: 9, order: 3, groove: 5, nostalgia: 7, texture: 2, inward: 6, melancholy: 8, space: 4, aura: 4, tags: '颓废、真实、粗粝' },
  { name: '🖤 情绪摇滚', en: 'Emo', warmth: 5, intensity: 9, order: 2, groove: 5, nostalgia: 6, texture: 3, inward: 10, melancholy: 9, space: 5, aura: 4, tags: '坦白、心碎、自白' },
  { name: '📐 数学摇滚', en: 'Math Rock', warmth: 4, intensity: 7, order: 9, groove: 6, nostalgia: 3, texture: 8, inward: 6, melancholy: 5, space: 5, aura: 5, tags: '复杂、跳拍、精巧' },
  { name: '🏛️ 前卫摇滚', en: 'Progressive Rock', warmth: 4, intensity: 9, order: 9, groove: 4, nostalgia: 6, texture: 7, inward: 6, melancholy: 6, space: 8, aura: 7, tags: '宏大、复杂、野心' },
  { name: '🌀 迷幻摇滚', en: 'Psychedelic Rock', warmth: 5, intensity: 8, order: 3, groove: 4, nostalgia: 7, texture: 5, inward: 7, melancholy: 7, space: 8, aura: 7, tags: '迷幻、飘、斑斓' },
  { name: '🎸 硬摇滚', en: 'Hard Rock', warmth: 6, intensity: 10, order: 4, groove: 7, nostalgia: 6, texture: 4, inward: 3, melancholy: 4, space: 3, aura: 8, tags: '重型、直接、爽快' },
  { name: '🤘 重金属', en: 'Heavy Metal', warmth: 4, intensity: 10, order: 6, groove: 7, nostalgia: 3, texture: 2, inward: 3, melancholy: 7, space: 2, aura: 9, tags: '极致、强力、暗黑' },
  { name: '📌 朋克', en: 'Punk', warmth: 5, intensity: 10, order: 2, groove: 6, nostalgia: 4, texture: 1, inward: 2, melancholy: 3, space: 2, aura: 6, tags: '反叛、简短、不修饰' },
  { name: '👑 华丽摇滚', en: 'Glam Rock', warmth: 7, intensity: 7, order: 6, groove: 8, nostalgia: 7, texture: 9, inward: 2, melancholy: 5, space: 5, aura: 9, tags: '戏剧、华丽、舞台人格' },

  // —— 二、流行与都市音乐（14）——
  { name: '🎭 艺术流行', en: 'Art Pop', warmth: 5, intensity: 7, order: 5, groove: 4, nostalgia: 4, texture: 9, inward: 8, melancholy: 8, space: 6, aura: 8, tags: '前卫、戏剧、美学' },
  { name: '🌫️ 梦幻流行', en: 'Dream Pop', warmth: 7, intensity: 5, order: 4, groove: 3, nostalgia: 6, texture: 8, inward: 9, melancholy: 8, space: 9, aura: 5, tags: '朦胧、梦幻、氤氲' },
  { name: '🤖 合成器流行', en: 'Synthpop', warmth: 3, intensity: 5, order: 7, groove: 8, nostalgia: 7, texture: 9, inward: 3, melancholy: 5, space: 5, aura: 6, tags: '合成、电子、冷甜' },
  { name: '🌃 城市流行', en: 'City Pop', warmth: 8, intensity: 5, order: 6, groove: 8, nostalgia: 9, texture: 9, inward: 5, melancholy: 6, space: 5, aura: 6, tags: '都市、怀旧、霓虹' },
  { name: '🎶 流行摇滚', en: 'Pop Rock', warmth: 6, intensity: 6, order: 5, groove: 7, nostalgia: 6, texture: 4, inward: 5, melancholy: 4, space: 5, aura: 6, tags: '明亮、上口、清爽' },
  { name: '🎪 巴洛克流行', en: 'Baroque Pop', warmth: 5, intensity: 6, order: 9, groove: 4, nostalgia: 7, texture: 9, inward: 5, melancholy: 6, space: 5, aura: 8, tags: '华丽、繁复、戏剧' },
  { name: '🪟 室内流行', en: 'Chamber Pop', warmth: 6, intensity: 5, order: 7, groove: 4, nostalgia: 7, texture: 9, inward: 7, melancholy: 8, space: 6, aura: 5, tags: '精致、雅致、私密' },
  { name: '💿 节奏布鲁斯', en: 'R&B', warmth: 9, intensity: 5, order: 5, groove: 9, nostalgia: 6, texture: 8, inward: 5, melancholy: 7, space: 5, aura: 4, tags: '丝滑、亲密、夜晚' },
  { name: '🍯 新灵魂乐', en: 'Neo-soul', warmth: 9, intensity: 3, order: 6, groove: 7, nostalgia: 6, texture: 8, inward: 9, melancholy: 5, space: 6, aura: 4, tags: '丝滑、智性、灵性' },
  { name: '🕺 放克', en: 'Funk', warmth: 6, intensity: 8, order: 1, groove: 10, nostalgia: 6, texture: 6, inward: 3, melancholy: 2, space: 3, aura: 6, tags: '弹性、律动、爽快' },
  { name: '🪩 迪斯科', en: 'Disco', warmth: 7, intensity: 8, order: 5, groove: 10, nostalgia: 9, texture: 8, inward: 2, melancholy: 2, space: 3, aura: 7, tags: '复古、律动、华丽' },
  { name: '🔥 灵魂乐', en: 'Soul', warmth: 10, intensity: 7, order: 4, groove: 9, nostalgia: 6, texture: 6, inward: 6, melancholy: 6, space: 4, aura: 6, tags: '温暖、深情、滚烫' },
  { name: '⛪ 福音音乐', en: 'Gospel', warmth: 9, intensity: 8, order: 6, groove: 7, nostalgia: 7, texture: 6, inward: 5, melancholy: 3, space: 4, aura: 9, tags: '合唱、救赎、向上' },
  { name: '🎵 流行', en: 'Pop', warmth: 8, intensity: 6, order: 5, groove: 7, nostalgia: 5, texture: 9, inward: 3, melancholy: 2, space: 4, aura: 6, tags: '明快、上口、亲和' },

  // —— 三、爵士、蓝调与根源音乐（10）——
  { name: '🎼 比波普', en: 'Bebop', warmth: 6, intensity: 7, order: 8, groove: 7, nostalgia: 7, texture: 7, inward: 5, melancholy: 4, space: 5, aura: 5, tags: '快速、复杂、技术' },
  { name: '🎷 爵士融合', en: 'Jazz Fusion', warmth: 6, intensity: 7, order: 6, groove: 9, nostalgia: 4, texture: 7, inward: 5, melancholy: 4, space: 6, aura: 7, tags: '跨界、复杂、实验' },
  { name: '🪕 三角洲蓝调', en: 'Delta Blues', warmth: 6, intensity: 5, order: 3, groove: 4, nostalgia: 9, texture: 3, inward: 6, melancholy: 9, space: 5, aura: 3, tags: '原始、粗粝、苦难' },
  { name: '🛣️ 美式根源', en: 'Americana', warmth: 7, intensity: 5, order: 5, groove: 6, nostalgia: 9, texture: 4, inward: 5, melancholy: 6, space: 6, aura: 4, tags: '公路、叙事、归乡' },
  { name: '🧣 当代民谣', en: 'Contemporary Folk', warmth: 8, intensity: 3, order: 5, groove: 3, nostalgia: 8, texture: 4, inward: 9, melancholy: 7, space: 6, aura: 4, tags: '叙事、歌词、现代' },
  { name: '🌶️ 弗拉门戈', en: 'Flamenco', warmth: 7, intensity: 10, order: 4, groove: 8, nostalgia: 7, texture: 4, inward: 5, melancholy: 8, space: 3, aura: 8, tags: '炽烈、吉普赛、生命' },
  { name: '🏖️ 巴萨诺瓦', en: 'Bossa Nova', warmth: 7, intensity: 3, order: 5, groove: 7, nostalgia: 6, texture: 7, inward: 6, melancholy: 6, space: 7, aura: 3, tags: '轻盈、慵懒、海风' },
  { name: '🌴 雷鬼', en: 'Reggae', warmth: 8, intensity: 4, order: 4, groove: 8, nostalgia: 5, texture: 5, inward: 4, melancholy: 2, space: 6, aura: 4, tags: '松弛、反拍、和平' },
  { name: '🪘 非洲律动', en: 'Afrobeat', warmth: 6, intensity: 7, order: 5, groove: 10, nostalgia: 6, texture: 5, inward: 3, melancholy: 2, space: 4, aura: 9, tags: '多节奏、政治、不息' },
  { name: '🌹 探戈', en: 'Tango', warmth: 6, intensity: 9, order: 9, groove: 7, nostalgia: 7, texture: 7, inward: 6, melancholy: 8, space: 4, aura: 7, tags: '张力、戏剧、克制' },

  // —— 四、嘻哈与说唱（5）——
  { name: '🥁 Boom Bap', en: 'Boom Bap', warmth: 6, intensity: 7, order: 4, groove: 9, nostalgia: 8, texture: 6, inward: 5, melancholy: 5, space: 4, aura: 6, tags: '老派、采样、黄金' },
  { name: '☕ 爵士说唱', en: 'Jazz Rap', warmth: 6, intensity: 3, order: 5, groove: 9, nostalgia: 8, texture: 8, inward: 7, melancholy: 5, space: 6, aura: 4, tags: '慵懒、智慧、松弛' },
  { name: '🧩 抽象嘻哈', en: 'Abstract Hip-hop', warmth: 3, intensity: 6, order: 4, groove: 5, nostalgia: 4, texture: 9, inward: 9, melancholy: 7, space: 8, aura: 5, tags: '迷宫、超现实、晦涩' },
  { name: '🚧 陷阱说唱', en: 'Trap', warmth: 4, intensity: 8, order: 3, groove: 9, nostalgia: 4, texture: 6, inward: 5, melancholy: 7, space: 4, aura: 7, tags: '暗色、低音、城市' },
  { name: '🌑 Phonk', en: 'Phonk', warmth: 4, intensity: 7, order: 3, groove: 8, nostalgia: 9, texture: 5, inward: 5, melancholy: 8, space: 5, aura: 5, tags: '地下、怀旧、深夜' },

  // —— 五、电子音乐（11）——
  { name: '🌌 氛围音乐', en: 'Ambient', warmth: 4, intensity: 1, order: 3, groove: 1, nostalgia: 3, texture: 7, inward: 10, melancholy: 6, space: 10, aura: 6, tags: '留白、无我、弥漫' },
  { name: '🧠 智能舞曲', en: 'IDM', warmth: 3, intensity: 5, order: 8, groove: 4, nostalgia: 3, texture: 9, inward: 9, melancholy: 6, space: 8, aura: 5, tags: '复杂、聆听、大脑' },
  { name: '🏠 浩室', en: 'House', warmth: 8, intensity: 7, order: 6, groove: 10, nostalgia: 5, texture: 7, inward: 3, melancholy: 3, space: 4, aura: 5, tags: '温暖、律动、包容' },
  { name: '⚙️ 科技舞曲', en: 'Techno', warmth: 3, intensity: 8, order: 8, groove: 8, nostalgia: 3, texture: 6, inward: 5, melancholy: 4, space: 5, aura: 6, tags: '机械、重复、冷硬' },
  { name: '🎛️ 极简科技舞曲', en: 'Minimal Techno', warmth: 3, intensity: 6, order: 9, groove: 6, nostalgia: 3, texture: 7, inward: 6, melancholy: 4, space: 8, aura: 5, tags: '极简、重复、细节' },
  { name: '🌐 迷幻舞曲', en: 'Trance', warmth: 5, intensity: 9, order: 6, groove: 8, nostalgia: 4, texture: 8, inward: 3, melancholy: 1, space: 5, aura: 9, tags: '亢奋、旋律、飞翔' },
  { name: '💥 鼓打贝斯', en: 'Drum & Bass', warmth: 4, intensity: 9, order: 4, groove: 10, nostalgia: 4, texture: 6, inward: 4, melancholy: 3, space: 2, aura: 7, tags: '高速、碎拍、向前' },
  { name: '🔊 回响贝斯', en: 'Dubstep', warmth: 3, intensity: 8, order: 4, groove: 6, nostalgia: 3, texture: 8, inward: 4, melancholy: 4, space: 3, aura: 7, tags: '重低音、切分、爆发' },
  { name: '🌆 合成器浪潮', en: 'Synthwave', warmth: 4, intensity: 7, order: 6, groove: 8, nostalgia: 9, texture: 9, inward: 4, melancholy: 6, space: 4, aura: 9, tags: '复古未来、霓虹、速度' },
  { name: '🗿 蒸汽波', en: 'Vaporwave', warmth: 4, intensity: 2, order: 4, groove: 4, nostalgia: 10, texture: 8, inward: 7, melancholy: 7, space: 7, aura: 5, tags: '消费怀旧、慢放、讽刺' },
  { name: '🎞️ 神游舞曲', en: 'Trip-hop', warmth: 3, intensity: 5, order: 6, groove: 4, nostalgia: 6, texture: 7, inward: 9, melancholy: 10, space: 9, aura: 6, tags: '黑暗、电影感、慢速' },

  // —— 六、古典与跨界（4）——
  { name: '🎻 浪漫主义古典', en: 'Romantic Classical', warmth: 6, intensity: 8, order: 9, groove: 3, nostalgia: 7, texture: 9, inward: 8, melancholy: 9, space: 6, aura: 9, tags: '情感、戏剧、奔涌' },
  { name: '🖼️ 印象主义古典', en: 'Impressionist Classical', warmth: 5, intensity: 4, order: 6, groove: 2, nostalgia: 7, texture: 9, inward: 8, melancholy: 6, space: 8, aura: 6, tags: '色彩、光影、氛围' },
  { name: '🏺 新古典', en: 'Neoclassical', warmth: 3, intensity: 5, order: 9, groove: 3, nostalgia: 6, texture: 8, inward: 9, melancholy: 7, space: 7, aura: 7, tags: '古典骨架、现代血肉' },
  { name: '✨ 古典跨界', en: 'Classical Crossover', warmth: 6, intensity: 8, order: 7, groove: 5, nostalgia: 6, texture: 9, inward: 5, melancholy: 6, space: 4, aura: 10, tags: '宏大、通俗、融合' },

  // —— 七、其他现代风格（5）——
  { name: '📼 低保真', en: 'Lo-fi', warmth: 7, intensity: 2, order: 3, groove: 5, nostalgia: 10, texture: 3, inward: 7, melancholy: 6, space: 6, aura: 3, tags: '怀旧、毛边、放松' },
  { name: '🧘 新世纪音乐', en: 'New Age', warmth: 6, intensity: 1, order: 6, groove: 2, nostalgia: 3, texture: 8, inward: 8, melancholy: 4, space: 8, aura: 7, tags: '宁静、治愈、呼吸' },
  { name: '💃 拉丁流行', en: 'Latin Pop', warmth: 8, intensity: 9, order: 5, groove: 9, nostalgia: 5, texture: 4, inward: 3, melancholy: 2, space: 4, aura: 6, tags: '明快、热情、舞动' },
  { name: '🍀 凯尔特音乐', en: 'Celtic', warmth: 7, intensity: 5, order: 5, groove: 6, nostalgia: 9, texture: 5, inward: 6, melancholy: 7, space: 7, aura: 8, tags: '民族、根源、乡愁' },
  { name: '🖌️ 艺术摇滚', en: 'Art Rock', warmth: 4, intensity: 7, order: 8, groove: 5, nostalgia: 5, texture: 8, inward: 9, melancholy: 5, space: 6, aura: 9, tags: '概念、结构、野心' },
];
