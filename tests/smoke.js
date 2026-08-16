// tests/smoke.js —— 冒烟测试：语法检查所有源文件 + 校验所有测试内容包结构。
// 用法：node tests/smoke.js   （或 backend 里 npm run smoke）
const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

const ROOT = path.join(__dirname, '..');
const failures = [];
const ok = (c, m) => { if (!c) failures.push(m); };

// 1. node --check 语法检查：前端、后端、以及 tests/ 下所有 JS
const checkFiles = ['frontend/app.js', 'backend/server.js', 'backend/scoring.js'];
for (const d of fs.readdirSync(path.join(ROOT, 'tests'))) {
  const dir = path.join(ROOT, 'tests', d);
  if (!fs.statSync(dir).isDirectory()) continue;
  for (const f of fs.readdirSync(dir)) if (f.endsWith('.js')) checkFiles.push('tests/' + d + '/' + f);
}
for (const f of checkFiles) {
  try { execSync('node --check "' + path.join(ROOT, f).replace(/"/g, '\\"') + '"', { stdio: 'pipe' }); }
  catch (e) { failures.push('syntax: ' + f); }
}

// 2. 加载并校验每个内容包
for (const d of fs.readdirSync(path.join(ROOT, 'tests')).sort()) {
  const dir = path.join(ROOT, 'tests', d);
  if (!fs.statSync(dir).isDirectory()) continue;
  const testPath = path.join(dir, 'test.js');
  if (!fs.existsSync(testPath)) continue;
  let t;
  try { t = require(testPath); }
  catch (e) { failures.push(d + ': require failed — ' + e.message); continue; }
  const dims = (t.dims || []).map((x) => x.key);
  ok(!!t.id, d + ': missing id');
  ok(Array.isArray(t.entities) && t.entities.length > 0, d + ': no entities');
  ok(Array.isArray(t.questions) && t.questions.length > 0, d + ': no questions');

  for (const e of t.entities) {
    for (const k of dims) {
      const v = e[k];
      ok(typeof v === 'number' && v >= 0 && v <= 10, d + ':' + e.name + ' bad ' + k + '=' + v);
    }
    if (t.details) ok(!!t.details[e.name], d + ': missing details for ' + e.name);
  }
  for (const q of t.questions) {
    for (const o of q.options.concat(q.followUp ? q.followUp.options : [])) {
      for (const k of dims) {
        const v = o.vector && o.vector[k];
        if (v != null && v < 0) failures.push(d + ': Q' + q.id + ' negative ' + k);
      }
    }
  }
  console.log('  ✔ ' + d.padEnd(18) + ' dims=' + dims.length + '  entities=' + t.entities.length + '  questions=' + t.questions.length);
}

if (failures.length) {
  console.log('\nSMOKE FAILED (' + failures.length + '):');
  failures.forEach((f) => console.log('  - ' + f));
  process.exit(1);
}
console.log('\nSMOKE PASSED ✔');
