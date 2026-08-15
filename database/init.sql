-- Schema for the quiz platform (PostgreSQL).
-- This file is applied by backend/server.js on startup (CREATE TABLE IF NOT EXISTS, 幂等)。
--
-- 通用结果表：只存"哪个测试 + 什么时候 + 完整结果快照"。
-- 每个测试的维度/实体/题目/文案都在 tests/<id>/ 的 JS 内容包里，不进数据库——
-- 因为不同测试的维度不同（文学口味 10 维、未来的动物测试是另一套维），
-- 用固定列反而表达不了。result_json 里已经包含 8 维雷达数据、匹配结果、文案。
--
-- 旧的 writers 表（作家 10 维分）已废弃：实体已移到 tests/<id>/entities.js。

CREATE TABLE IF NOT EXISTS results (
  id           SERIAL PRIMARY KEY,
  test_id      TEXT NOT NULL,        -- 哪个测试（对应 tests/<id>）
  created_at   TIMESTAMPTZ DEFAULT now(),
  result_json  TEXT NOT NULL         -- 完整结果快照（JSON 文本），用于历史回看
);

-- 幂等迁移：submission_id 用于提交幂等——前端重试时按它去重，避免"响应丢失"造成重复历史记录。
-- ADD COLUMN / CREATE INDEX 都带 IF NOT EXISTS，每次启动执行也是幂等的。
ALTER TABLE results ADD COLUMN IF NOT EXISTS submission_id TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS results_submission_id_idx ON results(submission_id);
