import { readFileSync } from 'node:fs';
import test from 'node:test';
import assert from 'node:assert/strict';

const component = readFileSync('src/components/tools/MergePdf.astro', 'utf8');
const content = readFileSync('src/i18n/tools/merge-pdf.ts', 'utf8');

test('Merge PDF rejects oversized batches before parsing', () => {
  assert.match(component, /const maxFiles = 50;/);
  assert.match(component, /const maxTotalBytes = 100 \* 1024 \* 1024;/);
  assert.match(component, /if \(exceedsLimits\(\)\) return false;/);
  assert.match(component, /if \(exceedsLimits\(\)\) return;/);
  assert.match(component, /labels\.tooManyFiles/);
  assert.match(component, /labels\.tooLarge/);
});

test('Merge PDF limit messages are localized', () => {
  assert.match(content, /tooManyFiles: '一次最多選擇 \{count\} 個 PDF 檔案。'/);
  assert.match(content, /tooManyFiles: 'Choose no more than \{count\} PDF files at once.'/);
  assert.match(content, /tooLarge: '所選 PDF 總大小超過 \{size\}，請分批處理。'/);
  assert.match(content, /tooLarge: 'The selected PDFs exceed \{size\} in total\. Try a smaller batch\.'/);
});
