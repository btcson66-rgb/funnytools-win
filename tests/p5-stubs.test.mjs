import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { MAX_REMOVED_REDIRECTS, removedRedirects } from '../src/data/removedRedirects.ts';

// P2 batch 5 (2026-10-17): the stub budget is 60, and no redirect stub may chain into another stub
// or point at a page that was not built.
const root = fileURLToPath(new URL('../', import.meta.url));
const dist = join(root, 'dist');

function htmlFiles(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) htmlFiles(full, out);
    else if (name.endsWith('.html')) out.push(full);
  }
  return out;
}
const routeOf = (base, file) => {
  const rel = relative(base, file).split(sep).join('/');
  return rel === 'index.html' ? '/' : `/${rel.replace(/index\.html$/, '')}`;
};
const refreshTarget = (file) => readFileSync(file, 'utf8').match(/http-equiv="refresh" content="0; url=([^"]+)"/)?.[1];

test('stub budget is 60 and the registered map holds no chain', () => {
  assert.equal(MAX_REMOVED_REDIRECTS, 60);
  assert.ok(removedRedirects.length <= MAX_REMOVED_REDIRECTS);
  const from = new Set(removedRedirects.map((r) => r.from));
  assert.equal(from.size, removedRedirects.length, 'no duplicate stub sources');
  for (const r of removedRedirects) assert.ok(!from.has(r.to), `${r.from} -> ${r.to} is a chain`);
});

test('every built redirect stub (registered and /zh/*) goes straight to a built page that is not a stub', () => {
  const targets = new Map();
  for (const file of htmlFiles(dist)) {
    const to = refreshTarget(file);
    if (to) targets.set(routeOf(dist, file), to);
  }
  assert.ok(targets.size > 100, 'the /zh/* aliases and registered stubs are present');
  for (const [from, to] of targets) {
    assert.ok(!targets.has(to), `${from} -> ${to} chains into another stub`);
    assert.ok(existsSync(join(dist, to.replace(/^\//, ''), 'index.html')), `${from} -> ${to} is a 404`);
  }
  assert.equal(targets.get('/zh/category/statistics/'), '/education-statistics/');
  assert.equal(targets.get('/category/statistics/'), '/education-statistics/');
});

test('the contract audit rejects a stub chain and a 404 stub target', () => {
  const tmp = mkdtempSync(join(tmpdir(), 'p5-stubs-'));
  try {
    cpSync(dist, join(tmp, 'dist'), { recursive: true });
    mkdirSync(join(tmp, 'src/lib'), { recursive: true });
    mkdirSync(join(tmp, 'src/data'), { recursive: true });
    cpSync(join(root, 'src/lib/indexPolicy.ts'), join(tmp, 'src/lib/indexPolicy.ts'));
    cpSync(join(root, 'src/data/removedRedirects.ts'), join(tmp, 'src/data/removedRedirects.ts'));
    const run = () => spawnSync(process.execPath, [join(root, 'scripts/p1-site-contract-audit.mjs')], { cwd: tmp, encoding: 'utf8' });
    assert.equal(run().status, 0, 'unmodified copy passes');

    const zh = join(tmp, 'dist/zh/category/statistics/index.html');
    const original = readFileSync(zh, 'utf8');
    writeFileSync(zh, original.replaceAll('/education-statistics/', '/category/statistics/'));
    let result = run();
    assert.notEqual(result.status, 0);
    assert.match(result.stdout, /points at another stub/);

    writeFileSync(zh, original.replaceAll('/education-statistics/', '/no-such-page/'));
    result = run();
    assert.notEqual(result.status, 0);
    assert.match(result.stdout, /which was not built \(404\)/);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});
