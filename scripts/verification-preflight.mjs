import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const reportPath = path.join(repoRoot, 'reports', 'verification-report.json');

function check(name, pass, evidence) {
  return { name, status: pass ? 'pass' : 'fail', evidence };
}

function read(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), 'utf8');
}

const toolSource = read('src/data/tools.ts');
const toolSlugs = [...toolSource.matchAll(/^\s+slug:\s*'([^']+)'/gm)].map((match) => match[1]);
const duplicateToolSlugs = toolSlugs.filter((slug, index) => toolSlugs.indexOf(slug) !== index);
const methodologyPages = fs.readdirSync(path.join(repoRoot, 'src/content/methodology/task-011'))
  .filter((name) => name.endsWith('.md'));
const requiredRoutes = [
  'src/pages/[...locale]/methodology/index.astro',
  'src/pages/[...locale]/methodology/[slug].astro',
];
const checks = [
  check('tool-slugs-unique', duplicateToolSlugs.length === 0, { toolCount: toolSlugs.length, duplicates: duplicateToolSlugs }),
  check('methodology-source-pack', methodologyPages.length === 10, { markdownFiles: methodologyPages.length }),
  check('methodology-routes', requiredRoutes.every((file) => fs.existsSync(path.join(repoRoot, file))), { requiredRoutes }),
  check('tool-verification-block-wired', /VerificationBlock/.test(read('src/layouts/ToolLayout.astro')), { layout: 'ToolLayout.astro' }),
  check('tool-verification-block-is-zh-gated', /lang === 'zh' && <VerificationBlock/.test(read('src/layouts/ToolLayout.astro')), { reason: 'English methodology translations are not claimed without source content.' }),
];

const report = {
  generatedAt: new Date().toISOString(),
  dataAvailable: false,
  note: 'This report contains repository checks only; it is not third-party certification or a claim that every tool has passed every runtime case.',
  overallStatus: checks.every((item) => item.status === 'pass') ? 'pass' : 'fail',
  checks,
};
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(report, null, 2));
if (report.overallStatus !== 'pass') process.exitCode = 1;
