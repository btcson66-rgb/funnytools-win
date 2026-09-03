import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

const root = new URL('..', import.meta.url);

test('deployment workflow gates Pages deployment on checks and runs post-deploy smoke', async () => {
  const workflow = (await readFile(new URL('.github/workflows/deploy.yml', root), 'utf8')).replaceAll('\r\n', '\n');
  assert.match(workflow, /run: npm ci\n/);
  assert.match(workflow, /run: npm run lint/);
  assert.match(workflow, /run: npm run typecheck/);
  assert.match(workflow, /run: npm test/);
  assert.match(workflow, /run: npm run build/);
  assert.match(workflow, /run: node scripts\/validate-indexable-urls\.mjs/);
  assert.doesNotMatch(workflow, /continue-on-error/);
  assert.match(workflow, /needs: build-and-verify/);
  assert.match(workflow, /name: Post-deploy production API smoke/);
  assert.match(workflow, /FUNNYTOOLS_SMOKE_RETRIES: 3/);
  assert.match(workflow, /FUNNYTOOLS_SMOKE_PROFILE: production/);
  assert.match(workflow, /PRODUCTION SMOKE FAIL \(DEPLOY SUCCESS\)/);
});

test('SEO workflow separates deployment from indexing and keeps weekly inspection separate', async () => {
  const workflow = (await readFile(new URL('.github/workflows/seo-indexing.yml', root), 'utf8')).replaceAll('\r\n', '\n');
  assert.match(workflow, /build_deploy:/);
  assert.match(workflow, /submit-indexing:/);
  assert.match(workflow, /needs: build_deploy/);
  assert.match(workflow, /name: Inspect priority URLs with GSC URL Inspection API/);
  assert.doesNotMatch(workflow, /npm ci \|\| npm install/);
  assert.doesNotMatch(workflow, /continue-on-error/);
});
