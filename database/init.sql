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
