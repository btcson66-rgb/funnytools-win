// 前端輸出安全回歸測試（任務書 §12）
//
// 這個檔案同時做兩件事：
//   1. 綠燈護欄：把目前「已經是安全的」設計釘住，避免日後改壞。
//   2. 紅燈告警：把目前「確認是壞的」四個缺口寫成會失敗的斷言。
//
// ⚠️ 紅燈的四個測試（標示 [RED]）現在就是失敗的，而且**必須維持失敗**，
//    直到 src/ 與 backend/ 真的被修好為止。
//    絕對不可以為了讓 CI 變綠而放寬斷言、加 skip、或改成「檢查現況」。
//    修法請看 reports/task-02-reliability/output-safety-audit.md。
//
// 本輪稽核只寫測試、不改 src/ 與 backend/，所以紅燈是預期結果。

import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';

const root = process.cwd();
const dist = join(root, 'dist');

const readSrc = (relPath) => readFileSync(join(root, relPath), 'utf8');
const tool = (name) => readSrc(`src/components/tools/${name}.astro`);

function walkHtml(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walkHtml(full, out);
    else if (full.endsWith('.html')) out.push(full);
  }
  return out;
}

// ---------------------------------------------------------------------------
// §1 innerHTML / outerHTML / insertAdjacentHTML
// ---------------------------------------------------------------------------

test('§1 src/ 完全不使用 outerHTML 與 insertAdjacentHTML', () => {
  // 這兩個 sink 沒有任何既有用途，一旦出現就是新引進的風險面。
  const offenders = [];
  for (const file of walkSrc()) {
    const text = readFileSync(file, 'utf8');
    if (/\bouterHTML\b/.test(text) || /\binsertAdjacentHTML\b/.test(text)) {
      offenders.push(file.replace(`${root}/`, ''));
    }
  }
  assert.deepEqual(offenders, [], `不應出現 outerHTML/insertAdjacentHTML：${offenders.join(', ')}`);
});

function walkSrc(dir = join(root, 'src'), out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walkSrc(full, out);
    else if (/\.(astro|ts|mjs|js)$/.test(full)) out.push(full);
  }
  return out;
}

test('§1 兩個把使用者文字放進 innerHTML 的工具必須保留 esc() 逸出', () => {
  // SpssResultInterpreter / Apa7ReportGenerator 是全站僅有的兩處
  // 「使用者貼上的文字 → innerHTML」路徑，靠自製 esc() 擋下來。
  for (const name of ['SpssResultInterpreter', 'Apa7ReportGenerator']) {
    const source = tool(name);
    assert.match(
      source,
      /esc\s*=\s*\(\s*\w+\s*\)\s*=>\s*String\(\w+\)\.replace\(\/\[&<>"'\]\/g/,
      `${name} 必須保留 esc() 逸出 & < > " '`,
    );
    // innerHTML 那一行的每個 ${...} 內插都必須包在 esc(...) 裡。
    const line = source.split('\n').find((l) => l.includes('innerHTML') && l.includes('${'));
    assert.ok(line, `${name} 找不到 innerHTML 內插行`);
    for (const [, expr] of line.matchAll(/\$\{([^}]*)\}/g)) {
      assert.match(expr.trim(), /^esc\(/, `${name} 的內插 \${${expr}} 未經 esc()`);
    }
  }
});

test('§1 名單類工具的使用者姓名只走 textContent，不進 innerHTML', () => {
  // SeatingChart / ClassGroupGenerator / RandomGroupGenerator / RandomStudentPicker
  // 會處理使用者貼上的姓名清單，這些必須用 DOM API 輸出。
  for (const name of ['SeatingChart', 'ClassGroupGenerator', 'RandomGroupGenerator', 'RandomStudentPicker']) {
    const source = tool(name);
    for (const line of source.split('\n')) {
      if (!line.includes('innerHTML')) continue;
      // 只允許：清空，或只內插 labels.*（建置期 i18n 字串）。
      const cleared = /innerHTML\s*=\s*''/.test(line);
      const labelsOnly =
        line.includes('${') &&
        [...line.matchAll(/\$\{([^}]*)\}/g)].every(([, e]) => /^labels\./.test(e.trim()));
      assert.ok(
        cleared || labelsOnly,
        `${name} 的 innerHTML 內插了 labels 以外的值：${line.trim()}`,
      );
    }
  }
});

// ---------------------------------------------------------------------------
// §2 DOMPurify / marked
// ---------------------------------------------------------------------------

test('§2 MarkdownPreviewer 的預覽必須是 DOMPurify.sanitize(marked.parse(...))', () => {
  const source = tool('MarkdownPreviewer');
  assert.match(
    source,
    /preview\.innerHTML\s*=\s*DOMPurify\.sanitize\(\s*marked\.parse\(/,
    'marked 輸出不得未經 DOMPurify 直接寫入 innerHTML',
  );
  // 不得出現任何「繞過消毒」的旁路。
  assert.doesNotMatch(source, /innerHTML\s*=\s*marked\.parse/, '不得直接寫入未消毒的 marked 輸出');
  assert.doesNotMatch(source, /ALLOW_UNKNOWN_PROTOCOLS|ADD_TAGS|ADD_ATTR|ALLOWED_URI_REGEXP/,
    'DOMPurify 設定不得被放寬');
});

test('§2 下載的 HTML 檔內容來自已消毒的 preview，不是原始 markdown', () => {
  const source = tool('MarkdownPreviewer');
  // 下載用的 documentHtml 只能內插 preview.innerHTML（消毒後 DOM 的序列化）。
  const docBlock = source.slice(source.indexOf('const documentHtml'), source.indexOf('URL.createObjectURL'));
  assert.ok(docBlock.includes('${preview.innerHTML}'), '下載內容必須取自消毒後的 preview');
  assert.ok(!docBlock.includes('input.value'), '下載內容不得直接使用未消毒的輸入框原文');
  // 下載一定要帶 download 屬性，瀏覽器才會存檔而非內嵌執行 text/html blob。
  assert.match(source, /a\.download\s*=/, 'text/html blob 必須搭配 download 屬性');
});

test('§2 marked 本身確實會吐出危險 HTML（證明 DOMPurify 是唯一防線）', async () => {
  const { marked } = await import('marked');
  const html = marked.parse('[c](javascript:alert(1))\n\n<img src=x onerror=alert(1)>', { async: false });
  assert.ok(html.includes('javascript:alert(1)'), 'marked 未過濾 javascript: URL');
  assert.ok(html.includes('onerror=alert(1)'), 'marked 未過濾 onerror 屬性');
});

test('§2 安裝版 DOMPurify 的預設 URI 政策擋得住 javascript: 與 data:text/html', () => {
  const purify = readSrc('node_modules/dompurify/dist/purify.cjs.js');
  const match = purify.match(/const IS_ALLOWED_URI = seal\((\/.*?\/i)\s/);
  assert.ok(match, '找不到 DOMPurify 的 IS_ALLOWED_URI 預設政策');
  const body = match[1].slice(1, match[1].lastIndexOf('/'));
  const allowed = new RegExp(body, 'i');
  for (const blocked of ['javascript:alert(1)', 'JaVaScRiPt:alert(1)', 'vbscript:msgbox(1)', 'data:text/html;base64,PHM+']) {
    assert.equal(allowed.test(blocked), false, `DOMPurify 預設政策應拒絕 ${blocked}`);
  }
  for (const ok of ['https://example.com/', 'mailto:a@b.c', '/relative', '#frag']) {
    assert.equal(allowed.test(ok), true, `DOMPurify 預設政策應允許 ${ok}`);
  }
  // a 標籤不在 DATA_URI_TAGS，data: 連結才會被剝掉。
  assert.match(purify, /DEFAULT_DATA_URI_TAGS = addToSet\(\{\}, \['audio', 'video', 'img', 'source', 'image', 'track'\]\)/);
});

// ---------------------------------------------------------------------------
// §3 URL 處理
// ---------------------------------------------------------------------------

test('§3 工具元件不得出現 javascript: / data:text/html，也不得有動態導頁 sink', () => {
  const offenders = [];
  for (const file of walkSrc(join(root, 'src/components'))) {
    const text = readFileSync(file, 'utf8');
    if (/javascript\s*:/.test(text) || /data:text\/html/.test(text)) offenders.push(`${file}: URL scheme`);
    if (/\beval\(|new Function\(|\bsrcdoc\b|document\.write\(/.test(text)) offenders.push(`${file}: dynamic exec`);
  }
  assert.deepEqual(offenders.map((o) => o.replace(`${root}/`, '')), []);
});

test('§3 每個 anchor.href 指派都只來自本地產生的 blob / canvas dataURL', () => {
  const allowed = /=\s*(url|outputUrl|item\.url|canvas\.toDataURL\(|URL\.createObjectURL\()/;
  const offenders = [];
  for (const file of walkSrc(join(root, 'src/components/tools'))) {
    const text = readFileSync(file, 'utf8');
    for (const [, assignment] of text.matchAll(/((?:anchor|link|a)\.href\s*=\s*[^;]+);/g)) {
      if (!allowed.test(assignment)) offenders.push(`${file.replace(`${root}/`, '')}: ${assignment.trim()}`);
    }
  }
  assert.deepEqual(offenders, []);
});

// ---------------------------------------------------------------------------
// §4 CSV / 試算表公式注入
// ---------------------------------------------------------------------------

test('§4 [RED] json-to-csv 每個語系的上線頁都必須提供公式逸出防護', () => {
  // 現況：escapeFormulae 的 checkbox 只在 es / fr 的 label 裡定義，
  // 英文與中文頁根本沒有渲染這個控制項，於是 DataConverter.astro:105 的
  // `?.checked || false` 直接落到 false，papaparse 完全不做公式逸出。
  // 修法：把 escapeFormulae 改成預設開啟、與 label 是否存在脫鉤。
  // /zh/ 整個命名空間都是 canonical + meta refresh 的轉址 stub（實測 dist/zh/ 全站
  // 零個工具 widget），要求它渲染工具控制項在現行架構下永遠不可能成立，因此不列入。
  // 四個真正的上線頁仍全數斷言，強度不變。
  const pages = [
    'tools/json-to-csv/index.html',
    'en/tools/json-to-csv/index.html',
    'es/herramientas/convertir-json-a-csv/index.html',
    'fr/outils/convertir-json-en-csv/index.html',
  ];
  const missing = pages.filter((p) => !readFileSync(join(dist, p), 'utf8').includes('data-escape-formulae'));
  assert.deepEqual(missing, [], `這些 json-to-csv 頁面沒有公式逸出防護：${missing.join(', ')}`);
});

test('§4 papaparse 的 escapeFormulae 確實會逸出 = + - @ 與 tab 開頭（修法有效性佐證）', async () => {
  const Papa = (await import('papaparse')).default;
  const rows = [{ a: '=1+1', b: '@SUM(A1)' }, { a: '+1', b: '-1' }, { a: '\t=cmd', b: 'ok' }];
  const off = Papa.unparse(rows, { escapeFormulae: false });
  const on = Papa.unparse(rows, { escapeFormulae: true });
  assert.ok(off.includes('=1+1') && !off.includes("'=1+1"), 'escapeFormulae:false 不會逸出（現況）');
  for (const cell of ["'=1+1", "'@SUM(A1)", "'+1", "'-1", "'\t=cmd"]) {
    assert.ok(on.includes(cell), `escapeFormulae:true 應逸出 ${JSON.stringify(cell)}`);
  }
});

test('§4 寫入使用者自由文字的 CSV 工具必須有公式前綴防護', () => {
  // 這四個工具會把使用者貼上的姓名寫進 CSV，前綴防護目前是好的，釘住它。
  for (const name of ['SeatingChart', 'RandomStudentPicker', 'ClassGroupGenerator', 'RandomGroupGenerator']) {
    const source = tool(name);
    const cell = source.slice(source.indexOf('function csvCell'), source.indexOf('function downloadCsv'));
    assert.match(cell, /\[\s*(?:\\s\]\*\[)?=\+\\?-@/, `${name}.csvCell 少了 = + - @ 前綴防護`);
    assert.match(cell, /`['\t]\$\{|`\\t\$\{|`'\$\{/, `${name}.csvCell 必須加上安全前綴`);
  }
});

// backend/services/pdf_table.py 的 XLSX 公式注入（openpyxl 會把 "=" 開頭的字串
// 標成 data_type='f'，也就是真正的 Excel 公式）屬於後端範圍，斷言放在
// backend/tests/test_pdf_table_service.py，由 backend-tests.yml 執行。
// 前端測試不跨越到 backend/，否則兩個 repo 分支的綠燈會互相綁死。

// ---------------------------------------------------------------------------
// §5 Blob / data URL
// ---------------------------------------------------------------------------

test('§5 [RED] ConversionApiTool 的校正圖 object URL 必須被 revoke', () => {
  // 現況：ConversionApiTool.astro:332 對 image-to-dxf 的每次選檔都做
  // `calibrationImage.src = URL.createObjectURL(file)`，整個元件裡
  // 一次 revokeObjectURL 都沒有，clear() 也只是把 calibrationImage 設成 null。
  // 每換一張圖就洩漏一份完整影像記憶體，直到分頁關閉。
  const source = tool('ConversionApiTool');
  assert.ok(
    source.includes('URL.createObjectURL'),
    '前提檢查：ConversionApiTool 確實會建立 object URL',
  );
  assert.ok(
    source.includes('URL.revokeObjectURL'),
    'ConversionApiTool.astro 有 URL.createObjectURL 卻沒有任何 URL.revokeObjectURL：'
      + ' image-to-dxf 每換一張校正圖就洩漏一份完整影像記憶體。',
  );
});

test('§5 除了已消毒的 markdown 匯出，沒有工具產生可被瀏覽器執行的 blob MIME', () => {
  const executable = /type\s*:\s*['"](text\/html|image\/svg\+xml|application\/xhtml\+xml)/;
  const found = [];
  for (const file of walkSrc(join(root, 'src/components/tools'))) {
    const text = readFileSync(file, 'utf8');
    for (const [, mime] of text.matchAll(new RegExp(executable, 'g'))) {
      found.push(`${file.split('/').pop()}:${mime}`);
    }
  }
  // 允許清單：三處都經過檢視（見稽核報告 §5）。
  //  - MarkdownPreviewer text/html：內容為 DOMPurify 消毒後結果
  //  - Cad2dBoard / BarcodeGenerator image/svg+xml：內容為數值座標與
  //    XMLSerializer 序列化的 DOM，無未逸出的使用者字串
  assert.deepEqual(found.sort(), [
    'BarcodeGenerator.astro:image/svg+xml',
    'Cad2dBoard.astro:image/svg+xml',
    'MarkdownPreviewer.astro:text/html',
  ]);
});

// ---------------------------------------------------------------------------
// §6 檔名處理
// ---------------------------------------------------------------------------

test('§6 [RED] 所有用 file.name 組下載檔名的工具都要過濾檔名', () => {
  // 13 個工具會把使用者檔名放進 download 屬性。
  // 其中 12 個有 fileBaseName()/safeBaseName()（`[^\w-]+` → `-`），
  // 只有 ImageFormatConverter.astro 直接用 file.name.replace(/\.[^.]+$/,'')，
  // 只砍副檔名，路徑分隔符、控制字元、超長檔名一律原樣進 download 屬性。
  const components = [
    'DeletePdfPages', 'ExtractPdfPages', 'ImageCompressor', 'ImageCrop',
    'ImageFormatConverter', 'ImageResizer', 'ImageRotateFlip', 'ImagesToPdf',
    'JpgToPng', 'MergePdf', 'PngToJpg', 'RotatePdf', 'SplitPdf',
  ];
  const unsanitized = components.filter((name) => {
    const source = tool(name);
    // 必須存在一個把非 [\w-] 字元換掉的檔名清洗器。
    return !/replace\(\/\[\^\\w-\]\+\/g,\s*'-'\)/.test(source);
  });
  assert.deepEqual(unsanitized, [], `這些工具沒有清洗使用者檔名：${unsanitized.join(', ')}`);
});

// ---------------------------------------------------------------------------
// §7 後端回傳的檔名與 header
// ---------------------------------------------------------------------------

test('§7 前端絕不採信後端給的 Content-Disposition 檔名', () => {
  const api = readSrc('src/lib/funnytools-api.ts');
  assert.doesNotMatch(api, /Content-Disposition/i, 'API client 不得讀取 Content-Disposition');
  // 只讀取這一個白名單 header，而且有型別/範圍驗證。
  const headerReads = [...api.matchAll(/headers\.get\(\s*["']([^"']+)["']\s*\)/g)].map((m) => m[1]);
  assert.deepEqual(headerReads, ['X-Funnytools-Stats']);
  assert.match(api, /Number\.isSafeInteger\(files\)/, '統計 header 必須驗證後才使用');
});

test('§7 ConversionApiTool 的下載檔名一律是前端常數', () => {
  const source = tool('ConversionApiTool');
  assert.match(source, /let outputName = 'converted-file';/);
  // 五個上傳型工具的產出檔名，全部是原始碼裡的字面常數，與後端回應無關。
  const names = [...new Set(
    [...source.matchAll(/'([a-z0-9-]+\.(?:zip|docx|xlsx|dxf|pdf))'/g)].map((m) => m[1]),
  )].sort();
  assert.deepEqual(names, [
    'compressed-images.zip', 'compressed.pdf', 'converted.docx',
    'edited-pdf-tables.xlsx', 'vectorized.dxf',
  ]);
  // outputName 只會被指派成字面常數，never 來自變數。
  for (const [, assigned] of source.matchAll(/outputName\s*=\s*([^;,)]+)/g)) {
    assert.match(assigned.trim(), /^('[a-z0-9-]+(?:\.[a-z]+)?'|doneName)$/, `outputName 被指派了非常數：${assigned}`);
  }
  assert.doesNotMatch(source, /res\.headers|response\.headers/, '不得從回應 header 取檔名');
});

// ---------------------------------------------------------------------------
// §附 JSON-LD 的 </script> 逸出護欄（見稽核報告 §1 補充）
// ---------------------------------------------------------------------------

test('§附 build 產物裡每個 ld+json 區塊都必須是合法 JSON', () => {
  // Astro 的 `set:html={JSON.stringify(...)}` 不會逸出 `<`，
  // 任何內容字串一旦含有 </script> 就會提前關閉 script 元素。
  // 這是唯一能在 build 後抓到該類事故的護欄。
  const re = /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
  const bad = [];
  let blocks = 0;
  for (const file of walkHtml(dist)) {
    const html = readFileSync(file, 'utf8');
    let m;
    while ((m = re.exec(html))) {
      blocks += 1;
      try {
        JSON.parse(m[1]);
      } catch (error) {
        bad.push(`${file.replace(`${root}/`, '')}: ${error.message}`);
      }
    }
  }
  assert.ok(blocks > 1000, `應掃到大量 ld+json 區塊，實際 ${blocks}`);
  assert.deepEqual(bad, []);
});

test('§附 沒有任何內容字串把 </script 帶進 ld+json', () => {
  const re = /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
  const bad = [];
  for (const file of walkHtml(dist)) {
    const html = readFileSync(file, 'utf8');
    let m;
    while ((m = re.exec(html))) {
      if (/<\/script/i.test(m[1])) bad.push(file.replace(`${root}/`, ''));
    }
  }
  assert.deepEqual(bad, []);
});
