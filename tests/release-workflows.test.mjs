import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
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

test('deploy workflow submits indexing signals only after a successful deploy, from the deployed build', async () => {
  const workflow = (await readFile(new URL('.github/workflows/deploy.yml', root), 'utf8')).replaceAll('\r\n', '\n');
  const buildJob = workflow.slice(workflow.indexOf('  build-and-verify:'), workflow.indexOf('  deploy:'));
  const submitJob = workflow.slice(workflow.indexOf('  submit-indexing:'), workflow.indexOf('  production-smoke:'));
  // The manifest is created in the same job/build that uploads the Pages artifact.
  assert.match(buildJob, /run: node scripts\/create-indexing-submission-manifest\.mjs/);
  assert.match(buildJob, /name: indexing-submission-manifest/);
  assert.ok(
    buildJob.indexOf('create-indexing-submission-manifest.mjs') < buildJob.indexOf('actions/upload-pages-artifact'),
    'manifest must be generated before the Pages artifact is uploaded',
  );
  // Submit job depends on deploy only (not on the production smoke), and never runs on the 6-hourly schedule.
  assert.match(submitJob, /needs: deploy\n/);
  assert.match(submitJob, /if: github\.event_name != 'schedule' && needs\.deploy\.result == 'success'/);
  assert.match(submitJob, /uses: actions\/download-artifact@v4/);
  for (const script of ['submit-indexnow', 'submit-bing-urls', 'gsc-submit-sitemaps']) {
    assert.match(submitJob, new RegExp(`node scripts/${script}\\.mjs`));
  }
  for (const secret of ['INDEXNOW_KEY', 'BING_API_KEY', 'FABLE_OPS_OAUTH_CLIENT_JSON', 'FABLE_OPS_REFRESH_TOKEN', 'GSC_SERVICE_ACCOUNT_JSON', 'GSC_CLIENT_EMAIL', 'GSC_PRIVATE_KEY']) {
    assert.match(submitJob, new RegExp(`${secret}: \\$\\{\\{ secrets\\.${secret} \\}\\}`));
  }
  assert.doesNotMatch(submitJob, /continue-on-error/);
});

test('SEO indexing workflow never deploys Pages, has no push trigger, and keeps weekly inspection', async () => {
  const workflow = (await readFile(new URL('.github/workflows/seo-indexing.yml', root), 'utf8')).replaceAll('\r\n', '\n');
  const trigger = workflow.slice(workflow.indexOf('\non:'), workflow.indexOf('\npermissions:'));
  assert.doesNotMatch(trigger, /push:/);
  assert.match(trigger, /workflow_dispatch:/);
  assert.match(trigger, /cron: '24 18 \* \* 0'/);
  // Only deploy.yml may deploy Pages, and only that workflow may use the shared `pages` group.
  assert.doesNotMatch(workflow, /deploy-pages|upload-pages-artifact|configure-pages/);
  assert.doesNotMatch(workflow, /group: pages\n/);
  assert.match(workflow, /build-manifest:/);
  assert.match(workflow, /needs: build-manifest/);
  assert.match(workflow, /name: Inspect priority URLs with GSC URL Inspection API/);
  assert.doesNotMatch(workflow, /npm ci \|\| npm install/);
  assert.doesNotMatch(workflow, /continue-on-error/);
});

test('only one push-triggered workflow deploys Pages (avoids pending-run cancellation in the pages group)', async () => {
  const dir = new URL('.github/workflows/', root);
  const pushDeployers = [];
  for (const name of await readdir(dir)) {
    if (!/\.ya?ml$/.test(name)) continue;
    const workflow = (await readFile(new URL(name, dir), 'utf8')).replaceAll('\r\n', '\n');
    const trigger = workflow.slice(workflow.indexOf('\non:'), workflow.indexOf('\npermissions:'));
    if (/\n  push:/.test(trigger) && /deploy-pages/.test(workflow)) pushDeployers.push(name);
  }
  assert.deepEqual(pushDeployers, ['deploy.yml']);
});

test('backend smoke supports optional deployment identity without breaking scheduled health', async () => {
  const workflow = (await readFile(new URL('.github/workflows/conversion-api-smoke.yml', root), 'utf8')).replaceAll('\r\n', '\n');
  const smoke = await readFile(new URL('tests/conversion-api-integration.api.mjs', root), 'utf8');
  assert.match(workflow, /expected_build_sha:/);
  assert.match(workflow, /required: false/);
  assert.match(workflow, /EXPECTED_BUILD_SHA: \$\{\{ github\.event\.inputs\.expected_build_sha \}\}/);
  assert.match(smoke, /if \(expectedBuildSha\)/);
  assert.match(smoke, /IDENTITY_MISMATCH/);
  assert.doesNotMatch(workflow, /EXPECTED_BUILD_SHA: [0-9a-f]{40}/);
});
