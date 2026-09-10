import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

import { AMAZON_PRODUCT_CONTENT_PATH, getAmazonProductContentSource } from '../src/lib/amazonProductContentSource.ts';

const projectRoot = process.cwd();
const cachePath = join(projectRoot, 'public', 'data', 'amazon-product-content.json');

const buildWithCacheState = (withCache) => {
  const outputRoot = mkdtempSync(join(tmpdir(), 'funnytools-amazon-build-'));
  const displacedCache = mkdtempSync(join(tmpdir(), 'funnytools-amazon-cache-'));
  const displacedPath = join(displacedCache, 'amazon-product-content.json');
  const hadCache = existsSync(cachePath);
  if (hadCache) renameSync(cachePath, displacedPath);
  try {
    if (withCache) {
      mkdirSync(join(projectRoot, 'public', 'data'), { recursive: true });
      writeFileSync(cachePath, '{"schema_version":1,"source":"synthetic-test-cache"}\n');
    }
    execFileSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'build', '--', '--outDir', outputRoot], {
      cwd: projectRoot,
      stdio: 'pipe',
      shell: process.platform === 'win32',
      windowsHide: true,
    });
    return readFileSync(join(outputRoot, 'en', 'tools', 'image-compressor', 'index.html'), 'utf8');
  } finally {
    rmSync(outputRoot, { recursive: true, force: true });
    rmSync(cachePath, { force: true });
    if (hadCache) renameSync(displacedPath, cachePath);
    rmSync(displacedCache, { recursive: true, force: true });
  }
};

test('built Amazon shelf omits an unavailable optional cache and keeps the master source', () => {
  const builtTool = buildWithCacheState(false);
  assert.doesNotMatch(builtTool, /data-affiliate-products-content-src="\/data\/amazon-product-content\.json"/);
  assert.match(builtTool, /data-affiliate-products-src="\/data\/amazon-products\.json"/);
});

test('built Amazon shelf advertises a present optional cache without changing its path', () => {
  const builtTool = buildWithCacheState(true);
  assert.match(builtTool, /data-affiliate-products-content-src="\/data\/amazon-product-content\.json"/);
  assert.match(builtTool, /data-affiliate-products-src="\/data\/amazon-products\.json"/);
});

test('build source helper advertises only a present optional cache', () => {
  const projectRoot = mkdtempSync(join(tmpdir(), 'funnytools-amazon-content-'));
  try {
    assert.equal(getAmazonProductContentSource(projectRoot), undefined);
    mkdirSync(join(projectRoot, 'public', 'data'), { recursive: true });
    writeFileSync(join(projectRoot, 'public', 'data', 'amazon-product-content.json'), '{"synthetic":true}\n');
    assert.equal(getAmazonProductContentSource(projectRoot), AMAZON_PRODUCT_CONTENT_PATH);
  } finally {
    rmSync(projectRoot, { recursive: true, force: true });
  }
});
