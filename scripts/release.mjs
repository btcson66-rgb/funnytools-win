import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();

function run(command, args, options = {}) {
  const output = execFileSync(command, args, {
    cwd: root,
    encoding: 'utf8',
    stdio: options.stdio ?? ['ignore', 'pipe', 'pipe'],
  });
  return typeof output === 'string' ? output.trim() : '';
}

function git(args, options = {}) {
  return run('git', args, options);
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

function readJson(file) {
  return JSON.parse(readFileSync(file, 'utf8'));
}

function writeJson(file, value) {
  writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

function parseArgs(argv) {
  let bump = '';
  let message = '';

  for (let index = 2; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--patch' || arg === '--minor' || arg === '--major') {
      if (bump) fail('Use only one version bump flag: --patch, --minor, or --major.');
      bump = arg.slice(2);
      continue;
    }
    if (arg === '--message') {
      message = argv[index + 1] ?? '';
      index += 1;
      continue;
    }
    if (arg.startsWith('--message=')) {
      message = arg.slice('--message='.length);
      continue;
    }
    fail(`Unknown release argument: ${arg}`);
  }

  if (!bump) fail('Missing version bump flag. Use --patch, --minor, or --major.');
  if (!message.trim()) fail('Missing release message. Use --message "..."');
  return { bump, message: message.trim() };
}

function bumpVersion(version, bump) {
  const parts = version.split('.').map((part) => Number(part));
  if (parts.length !== 3 || parts.some((part) => !Number.isInteger(part) || part < 0)) {
    fail(`Unsupported package version: ${version}`);
  }

  if (bump === 'major') return `${parts[0] + 1}.0.0`;
  if (bump === 'minor') return `${parts[0]}.${parts[1] + 1}.0`;
  return `${parts[0]}.${parts[1]}.${parts[2] + 1}`;
}

function tagExists(tag) {
  try {
    git(['rev-parse', '-q', '--verify', `refs/tags/${tag}`]);
    return true;
  } catch {
    return false;
  }
}

function updatePackageLock(nextVersion) {
  const lockPath = join(root, 'package-lock.json');
  if (!existsSync(lockPath)) return false;
  const lock = readJson(lockPath);
  lock.version = nextVersion;
  if (lock.packages?.['']) {
    lock.packages[''].version = nextVersion;
  }
  writeJson(lockPath, lock);
  return true;
}

const { bump, message } = parseArgs(process.argv);

const packagePath = join(root, 'package.json');
if (!existsSync(packagePath)) fail('package.json not found. Run release from the repo root.');

const branch = git(['branch', '--show-current']);
if (branch !== 'main') fail(`Release must run on main. Current branch: ${branch || '(detached)'}`);

const divergence = git(['rev-list', '--left-right', '--count', 'origin/main...HEAD']).split(/\s+/).map(Number);
if (divergence[0] !== 0 || divergence[1] !== 0) {
  fail(`main must match origin/main before release. origin/main...HEAD = ${divergence.join(' ')}`);
}

const pkg = readJson(packagePath);
const previousVersion = pkg.version;
const nextVersion = bumpVersion(previousVersion, bump);
const releaseTag = `v${nextVersion}`;
const backupTag = `backup/pre-v${nextVersion}`;
if (tagExists(releaseTag)) fail(`Release tag already exists: ${releaseTag}`);
if (tagExists(backupTag)) fail(`Backup tag already exists: ${backupTag}`);

const preReleaseSha = git(['rev-parse', '--short', 'HEAD']);
const backupDir = join(root, 'backup', releaseTag);
mkdirSync(backupDir, { recursive: true });

pkg.version = nextVersion;
writeJson(packagePath, pkg);
const lockUpdated = updatePackageLock(nextVersion);

const readmePath = join(backupDir, 'README.md');
writeFileSync(readmePath, [
  `# ${releaseTag} pre-release backup`,
  '',
  `Created by \`npm run release\` before publishing ${releaseTag}.`,
  '',
  `- Pre-release commit: \`${preReleaseSha}\``,
  `- Backup tag: \`${backupTag}\``,
  `- Release tag: \`${releaseTag}\``,
  `- Release message: ${message}`,
  `- package-lock version updated: ${lockUpdated ? 'yes' : 'no'}`,
  '',
  'No source archive is stored in git; the backup tag is the rollback snapshot.',
  `To restore the exact pre-release commit, use \`git checkout ${backupTag}\`.`,
  '',
].join('\n'));

const statusBeforeStage = git(['status', '--porcelain', '--untracked-files=all']);
if (!statusBeforeStage) fail('No changes to release after version and backup preparation.');

git(['add', '-A', '--', '.'], { stdio: 'inherit' });
git(['add', '-f', '--', `backup/${releaseTag}/README.md`], { stdio: 'inherit' });

const staged = git(['diff', '--cached', '--name-only']);
if (!staged) fail('No staged changes to commit.');

git(['commit', '-m', message], { stdio: 'inherit' });
const releaseSha = git(['rev-parse', '--short', 'HEAD']);
git(['tag', backupTag, preReleaseSha], { stdio: 'inherit' });
git(['tag', releaseTag, releaseSha], { stdio: 'inherit' });
git(['push', 'origin', branch], { stdio: 'inherit' });
git(['push', 'origin', backupTag, releaseTag], { stdio: 'inherit' });

console.log(JSON.stringify({
  previousVersion,
  nextVersion,
  releaseTag,
  backupTag,
  preReleaseSha,
  releaseSha,
  stagedFiles: staged.split(/\r?\n/).filter(Boolean),
}, null, 2));
