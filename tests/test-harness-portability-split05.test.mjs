import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import {
  extractArrayObjectFieldsFromSource,
  extractDefaultImportsFromSource,
  extractObjectIdentifierMapFromSource,
} from './helpers/static-ts-registry.mjs';

const TEST_DIR = fileURLToPath(new URL('./', import.meta.url));
const SELF = fileURLToPath(import.meta.url);

function walk(directory) {
  const files = [];
  for (const entry of readdirSync(directory)) {
    const absolutePath = path.join(directory, entry);
    if (statSync(absolutePath).isDirectory()) files.push(...walk(absolutePath));
    else files.push(absolutePath);
  }
  return files;
}

function persistentTestFiles() {
  return walk(TEST_DIR)
    .filter((file) => file.endsWith('.test.mjs'))
    .filter((file) => path.resolve(file) !== path.resolve(SELF));
}

test('AST helper fixture tolerates formatting, quotes, braces, and TypeScript wrappers', () => {
  const source = `
    import Alpha from './components/Alpha.astro';
    import Beta from "./components/Beta.astro";
    const records = [
      { slug: 'alpha', status: 'live', privacyLevel: 'local-only' } as const,
      {\n        "slug": "beta", status: "planned", privacyLevel: "anonymous-api"\n      },
    ] satisfies Array<{ slug: string }>;
    const widgets = ({ alpha: Alpha, "beta": Beta } as const);
  `;

  assert.deepEqual(
    extractArrayObjectFieldsFromSource(source, 'records', ['slug', 'status', 'privacyLevel']),
    [
      { slug: 'alpha', status: 'live', privacyLevel: 'local-only' },
      { slug: 'beta', status: 'planned', privacyLevel: 'anonymous-api' },
    ],
  );
  assert.deepEqual(
    extractObjectIdentifierMapFromSource(source, 'widgets'),
    { alpha: 'Alpha', beta: 'Beta' },
  );
  assert.deepEqual(
    extractDefaultImportsFromSource(source),
    { Alpha: './components/Alpha.astro', Beta: './components/Beta.astro' },
  );
});

test('persistent tests do not depend on Windows paths or sibling repositories', () => {
  const files = persistentTestFiles();
  const offenders = [];
  for (const file of files) {
    const source = readFileSync(file, 'utf8');
    if (
      /\b[A-Za-z]:[\\/]/.test(source)
      || /room-layout-fengshui-planner/.test(source)
      || /FUNNYTOOLS_ROOMFENG_GATE_PATH/.test(source)
    ) {
      offenders.push(path.relative(TEST_DIR, file));
    }
  }
  assert.deepEqual(offenders, []);
});

test('persistent tests do not depend on branch topology or moving-base refs', () => {
  const files = persistentTestFiles();
  const offenders = [];
  for (const file of files) {
    const source = readFileSync(file, 'utf8');
    if (
      /\borigin\/main\b/.test(source)
      || /HEAD(?:\^|~\d+)/.test(source)
      || /\bSPLIT\d+_BASE_SHA\b/.test(source)
    ) {
      offenders.push(path.relative(TEST_DIR, file));
    }
  }
  assert.deepEqual(offenders, []);
});
