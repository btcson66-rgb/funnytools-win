import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { execFileSync } from 'node:child_process';

const repo = process.cwd();
const read = (file) => fs.readFileSync(path.join(repo, file), 'utf8');

test('Split 04 data-flow classification is explicit and surface-aware', async () => {
  const { classifyToolDataFlow, isCanonicalDownloadGatedTool, isCanonicalConversionApiTool } = await import('../src/lib/toolDataFlow.ts');
  assert.equal(classifyToolDataFlow('image-compressor', 'canonical'), 'LOCAL_PROCESSING_GATED_OUTPUT');
  assert.equal(classifyToolDataFlow('merge-pdf', 'canonical'), 'LOCAL_PROCESSING_GATED_OUTPUT');
  assert.equal(classifyToolDataFlow('qr-code-generator', 'canonical'), 'LOCAL_PROCESSING_GATED_OUTPUT');
  assert.equal(classifyToolDataFlow('pdf-compressor', 'canonical'), 'BACKEND_INPUT_UPLOAD');
  assert.equal(classifyToolDataFlow('pdf-to-word', 'canonical'), 'BACKEND_INPUT_UPLOAD');
  assert.equal(classifyToolDataFlow('image-compressor', 'embed'), 'LOCAL_ONLY');
  assert.equal(classifyToolDataFlow('image-compressor', 'expansion'), 'LOCALE_VARIANT');
  assert.equal(classifyToolDataFlow('pdf-compressor', 'expansion'), 'LOCALE_VARIANT');
  assert.equal(classifyToolDataFlow('unknown-tool', 'canonical'), 'LOCAL_ONLY');
  assert.equal(isCanonicalDownloadGatedTool('merge-pdf'), true);
  assert.equal(isCanonicalConversionApiTool('pdf-compressor'), true);
});

test('gated disclosure is scoped and does not claim all output stays local', async () => {
  const { getDownloadGateDisclosure } = await import('../src/i18n/download-gate-disclosure.ts');
  for (const lang of ['zh', 'en']) {
    for (const slug of ['image-compressor', 'merge-pdf', 'qr-code-generator']) {
      const copy = getDownloadGateDisclosure(lang, slug);
      assert.ok(copy);
      assert.match(copy.description, /Brevo|寄送/);
      assert.match(copy.privacyNote, /5 MiB|5 MiB|5 MiB/);
      assert.doesNotMatch(copy.privacyNote, /never leave|不會離開瀏覽器|所有 PDF 都只/);
    }
    assert.equal(getDownloadGateDisclosure(lang, 'pdf-compressor'), null);
  }
});

test('nongated canonical tools keep the main gate config and local privacy copy', async () => {
  const { t } = await import('../src/i18n/ui.ts');
  const controls = ['word-counter', 'timestamp-converter', 'image-resizer', 'compound-interest', 'break-reminder'];
  for (const lang of ['zh', 'en']) {
    const ui = t(lang);
    const expectedConfig = JSON.stringify({ lang, labels: ui.downloadGate });
    for (const slug of controls) {
      const prefix = lang === 'zh' ? '' : 'en/';
      const html = read(`dist/${prefix}tools/${slug}/index.html`);
      const config = html.match(/<script type="application\/json" data-download-gate-config>([\s\S]*?)<\/script>/)?.[1];
      assert.equal(config, expectedConfig, `${lang}/${slug} gate config drifted`);
      assert.match(html, new RegExp(ui.privacy.localOnly.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
      assert.doesNotMatch(html, /Brevo|email delivery|寄送下載|產生的輸出檔/);
    }
  }
});

test('source contracts preserve gate endpoint, storage, threshold, and payload facts', () => {
  const gate = read('src/lib/downloadGate.client.ts');
  assert.match(read('src/config/site.ts'), /roomfeng\.win\/api\/download-gate/);
  assert.match(gate, /ft_gate_email/);
  assert.match(gate, /5 \* 1024 \* 1024/);
  for (const field of ['email', 'site', 'tool', 'lang', 'toolUrl', 'website']) assert.match(gate, new RegExp(`\\b${field}\\b`));
  const api = read('src/lib/funnytools-api.ts');
  for (const endpoint of ['/api/images/compress-batch', '/api/pdf/to-word', '/api/pdf/table-preview', '/api/pdf/table-to-excel', '/api/pdf/export-tables', '/api/image/to-dxf', '/api/pdf/compress']) {
    assert.match(api, new RegExp(endpoint.replaceAll('/', '\\/')));
  }
  const backendCandidates = [
    process.env.FUNNYTOOLS_ROOMFENG_GATE_PATH,
    process.platform === 'win32' ? 'D:/room-layout-fengshui-planner/functions/api/download-gate.ts' : null,
    path.resolve(repo, '..', 'room-layout-fengshui-planner/functions/api/download-gate.ts'),
  ].filter(Boolean);
  const backendPath = backendCandidates.find((candidate) => fs.existsSync(candidate));
  if (backendPath) {
    const backend = fs.readFileSync(backendPath, 'utf8');
    assert.ok(backend.indexOf('addContact(') < backend.indexOf('fileEntry'));
    assert.match(backend, /SOURCE/);
    assert.match(backend, /GATE_SITE/);
    assert.match(backend, /GATE_TOOL/);
    assert.match(backend, /GATE_LANG/);
  }
});

test('canonical and expansion HTML reflect the route-level disclosure boundary', () => {
  const gated = read('dist/tools/image-compressor/index.html');
  const gatedEn = read('dist/en/tools/merge-pdf/index.html');
  assert.match(gated, /data-download-gate-config/);
  assert.match(gated, /Brevo/);
  assert.match(gated, /原圖在瀏覽器本機壓縮/);
  assert.match(gatedEn, /Brevo/);
  assert.match(gatedEn, /Source PDFs are merged locally/);
  const expansion = read('dist/es/herramientas/comprimir-imagenes/index.html');
  assert.doesNotMatch(expansion, /data-download-gate-config/);
  const compressor = read('dist/tools/pdf-compressor/index.html');
  assert.match(compressor, /FunnyTools Conversion API/);
});

test('scope guard leaves prohibited global files untouched', () => {
  const baseCandidates = [process.env.SPLIT04_BASE_SHA, 'origin/main', 'HEAD^'].filter(Boolean);
  const base = baseCandidates.find((candidate) => {
    try {
      execFileSync('git', ['rev-parse', '--verify', candidate], { stdio: 'ignore' });
      return true;
    } catch {
      return false;
    }
  });
  const changed = base
    ? execFileSync('git', ['diff', '--name-only', base, 'HEAD'], { encoding: 'utf8' }).trim().split(/\r?\n/).filter(Boolean)
    : execFileSync('git', ['diff-tree', '--no-commit-id', '--name-only', '-r', 'HEAD'], { encoding: 'utf8' }).trim().split(/\r?\n/).filter(Boolean);
  assert.ok(!changed.includes('src/i18n/ui.ts'));
  assert.ok(!changed.includes('src/config/site.ts'));
  assert.ok(!changed.some((file) => /downloadGate\.client|ConversionApiTool|backend|\.github\/workflows/.test(file)));
});
