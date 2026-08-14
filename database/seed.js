// 一次性初始化脚本：连接 Postgres，应用 init.sql，并写入 72 位作家。
// 运行：DATABASE_URL=... node database/seed.js
// 每次运行会清空作家表并重置自增，保证 id 从 1 开始（幂等，可安全重复执行）。
const { Pool } = require('pg');
const path = require('node:path');
const fs = require('node:fs');
const writers = require('./writers.js');

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/literary_taste';
const pool = new Pool({
  connectionString: DATABASE_URL,
  // 本地连接不用 SSL；托管服务（Render/Neon/Supabase）需要 SSL。
  ssl: /localhost|127\.0\.0\.1/.test(DATABASE_URL) ? false : { rejectUnauthorized: false },
});

(async () => {
  try {
    // 1. 应用建表 SQL（CREATE TABLE IF NOT EXISTS，幂等）
    const schema = fs.readFileSync(path.join(__dirname, 'init.sql'), 'utf8');
    await pool.query(schema);

    // 2. 清空作家表并重置自增，然后重新插入（这样脚本可以安全地重复运行）
    await pool.query('TRUNCATE writers RESTART IDENTITY');

    const insert = `
      INSERT INTO writers
        (name, region_era, works, narrative, lyric, psychology, imagination,
         society, philosophy, form, readability, humor, desire, tags)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    `;
    for (const w of writers) {
      await pool.query(insert, [
        w.name, w.region_era, w.works,
        w.narrative, w.lyric, w.psychology, w.imagination,
        w.society, w.philosophy, w.form, w.readability, w.humor, w.desire, w.tags,
      ]);
    }

    const { n } = (await pool.query('SELECT COUNT(*)::int AS n FROM writers')).rows[0];
    console.log('Seeded ' + n + ' writers -> ' + DATABASE_URL.replace(/:[^:@]+@/, ':***@'));
  } catch (e) {
    console.error('seed 失败：' + e.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
})();
