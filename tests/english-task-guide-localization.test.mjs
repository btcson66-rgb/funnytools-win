import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = process.cwd();
test('inflation calculator distinguishes empty values from numeric zero', async () => {
  const source = await readFile(join(root, 'src', 'components', 'tools', 'InflationCalculator.astro'), 'utf8');
  assert.match(source, /const amountRaw = amountInput\.value\.trim\(\);/);
  assert.match(source, /const rateRaw = rateInput\.value\.trim\(\);/);
  assert.match(source, /const yearsRaw = yearsInput\.value\.trim\(\);/);
  assert.match(source, /!amountRaw[\s\S]*!rateRaw[\s\S]*!yearsRaw/);
});
