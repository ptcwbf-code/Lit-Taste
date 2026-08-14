-- Schema for the literary-taste app (PostgreSQL).
-- This file is applied by database/seed.js, which connects via DATABASE_URL and runs it.

-- 作家表：每位作家的 10 个维度分数（0-10）
CREATE TABLE IF NOT EXISTS writers (
  id           SERIAL PRIMARY KEY,
  name         TEXT NOT NULL,      -- 作家名
  region_era   TEXT,               -- 地区 / 时代
  works        TEXT,               -- 代表作品
  narrative    INTEGER,            -- 叙事
  lyric        INTEGER,            -- 抒情
  psychology   INTEGER,            -- 心理
  imagination  INTEGER,            -- 想象
  society      INTEGER,            -- 社会
  philosophy   INTEGER,            -- 哲思
  form         INTEGER,            -- 形式
  readability  INTEGER,            -- 轻快 / 直接
  humor        INTEGER,            -- 幽默 / 反讽
  desire       INTEGER,            -- 欲望 / 渴求
  tags         TEXT                -- 主要标签
);

-- 结果表：每一次完成的测试，存下用户的 10 个维度分 + 匹配到的作家
CREATE TABLE IF NOT EXISTS results (
  id           SERIAL PRIMARY KEY,
  created_at   TIMESTAMPTZ DEFAULT now(),
  narrative    DOUBLE PRECISION,
  lyric        DOUBLE PRECISION,
  psychology   DOUBLE PRECISION,
  imagination  DOUBLE PRECISION,
  society      DOUBLE PRECISION,
  philosophy   DOUBLE PRECISION,
  form         DOUBLE PRECISION,
  readability  DOUBLE PRECISION,
  humor        DOUBLE PRECISION,
  desire       DOUBLE PRECISION,
  matches      TEXT,              -- 匹配到的作家名（JSON 文本）
  result_json  TEXT               -- 完整结果快照（JSON 文本），用于历史回看
);
