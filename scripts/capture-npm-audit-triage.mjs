import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const reportDir = join(root, 'reports', 'recovery-closeout-002');
mkdirSync(reportDir, { recursive: true });

const packageJson = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const directProd = new Set(Object.keys(packageJson.dependencies ?? {}));
const directDev = new Set(Object.keys(packageJson.devDependencies ?? {}));

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const auditResult = spawnSync(npmCommand, ['audit', '--json'], {
  cwd: root,
  encoding: 'utf8',
  maxBuffer: 32 * 1024 * 1024,
  shell: process.platform === 'win32',
});
let audit = {};
try {
  audit = JSON.parse(auditResult.stdout || '{}');
} catch (error) {
  throw new Error(`Could not parse npm audit JSON: ${error.message}`);
}

const loadTree = (omitDev) => {
  const result = spawnSync(npmCommand, ['ls', '--all', '--json', ...(omitDev ? ['--omit=dev'] : [])], {
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
    shell: process.platform === 'win32',
  });
  try {
    return JSON.parse(result.stdout || '{}');
  } catch {
    return {};
  }
};

const collectNames = (node, names = new Set()) => {
  if (!node || typeof node !== 'object') return names;
  if (node.name) names.add(node.name);
  for (const [name, child] of Object.entries(node.dependencies ?? {})) {
    names.add(name);
    collectNames(child, names);
  }
  return names;
};

const prodTreeNames = collectNames(loadTree(true));
const allTreeNames = collectNames(loadTree(false));

const vulnerable = Object.entries(audit.vulnerabilities ?? {}).map(([name, value]) => {
  const isDirect = value.isDirect === true || directProd.has(name) || directDev.has(name);
  const directKind = directProd.has(name) ? 'production direct' : directDev.has(name) ? 'development direct' : 'transitive';
  const productionReachability = prodTreeNames.has(name);
  const dependencyClass = isDirect ? directKind : productionReachability ? 'transitive production tree' : allTreeNames.has(name) ? 'transitive development/build tree' : 'transitive / tree unresolved';
  const via = (value.via ?? []).map((entry) => typeof entry === 'string' ? entry : entry?.source ?? entry?.name ?? 'unknown');
  const nodes = value.nodes ?? [];
  const fixAvailable = value.fixAvailable ?? false;
  const breakingFix = typeof fixAvailable === 'object' && fixAvailable !== null
    ? Boolean(fixAvailable.isSemVerMajor)
    : 'unknown';
  return {
    package: name,
    severity: value.severity ?? 'unknown',
    dependencyClass,
    direct: isDirect,
    productionReachability,
    via,
    nodes,
    effects: value.effects ?? [],
    fixAvailable,
    breakingFix,
    action: isDirect || productionReachability ? 'INVESTIGATE_BEFORE_UPGRADE' : 'DEFER_NO_CHANGE',
  };
});

const severityCounts = vulnerable.reduce((counts, item) => {
  counts[item.severity] = (counts[item.severity] ?? 0) + 1;
  return counts;
}, {});

const report = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  command: 'npm audit --json',
  auditExitCode: auditResult.status,
  auditError: auditResult.error?.message ?? null,
  summary: audit.metadata?.vulnerabilities ?? {},
  severityCounts,
  triageRules: {
    noFixExecuted: true,
    noDependencyUpgradeExecuted: true,
    productionTreeDerivedFrom: 'npm ls --all --json --omit=dev',
    note: 'This is a closeout triage artifact. It does not authorize npm audit fix, package upgrades, or lockfile regeneration.',
  },
  vulnerabilities: vulnerable,
  npmAudit: audit,
};

writeFileSync(join(reportDir, 'npm-audit-triage.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8');

const rows = vulnerable.map((item) => `| ${item.package} | ${item.severity} | ${item.dependencyClass} | ${item.productionReachability ? 'yes' : 'no'} | ${item.action} |`).join('\n');
const markdown = `# npm audit triage — FUNNYTOOLS-RECOVERY-CLOSEOUT-002

Generated: ${report.generatedAt}

` +
  `` +
  `| Package | Severity | Dependency class | In production tree | Decision |\n|---|---:|---|---:|---|\n${rows}\n\n` +
  `## Boundary\n\n` +
  `This report records the existing audit state only. No npm audit fix, dependency upgrade, lockfile regeneration, or unrelated security remediation was executed. Direct or production-tree findings remain for a separately authorized dependency review; build-only findings are deferred so this SEO recovery closeout does not expand scope.\n\n` +
  `Audit process exit code: ${auditResult.status ?? 'unknown'}. Vulnerability totals are copied from the raw JSON artifact.\n`;
writeFileSync(join(reportDir, 'NPM-AUDIT-TRIAGE.md'), markdown, 'utf8');

console.log(JSON.stringify({
  auditExitCode: auditResult.status,
  severityCounts,
  totalFindings: vulnerable.length,
  report: 'reports/recovery-closeout-002/npm-audit-triage.json',
}, null, 2));
