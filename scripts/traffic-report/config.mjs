import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const secretDir = join(root, 'api token');

const serviceAccount = JSON.parse(readFileSync(join(secretDir, 'ga4-service-account.json'), 'utf8'));
const analyticsConfig = JSON.parse(readFileSync(join(secretDir, 'ga4-config.json'), 'utf8'));

// cloudflare api.txt 裡塞了多組 token（funnytools 分析、roomfeng 部署、roomfeng 分析…），
// 用「最後一個 token= 蓋過前面」的樸素解析會抓錯 token（曾把 roomfeng-analytics-report
// token 套用到 funnytools zone，導致 authz 錯誤被誤判為「缺 Analytics:Read 權限」）。
// 改成先找到 funnytools-daily-analytics-report 那個區塊（以空行分隔），只在區塊內找 key=value。
const cloudflareText = readFileSync(join(secretDir, 'cloudflare api.txt'), 'utf8');
const cfBlocks = cloudflareText.split(/\r?\n\s*\r?\n/);
const funnytoolsBlock = cfBlocks.find((b) => /funnytools-daily-analytics-report/i.test(b)) || '';
const cfLines = Object.fromEntries(
  funnytoolsBlock
    .split(/\r?\n/)
    .map((l) => l.match(/^\s*(token|zone_id|account_id)\s*=\s*(.+?)\s*$/))
    .filter(Boolean)
    .map((m) => [m[1], m[2]]),
);

let discordToken = '';
let discordGuildId = '';
try {
  const envText = readFileSync('D:\\notify-bot\\.env', 'utf8');
  for (const line of envText.split(/\r?\n/)) {
    const m = line.match(/^(\w+)\s*=\s*(.+?)\s*$/);
    if (m) {
      if (m[1] === 'DISCORD_TOKEN') discordToken = m[2];
      if (m[1] === 'GUILD_ID') discordGuildId = m[2];
    }
  }
} catch { /* Discord config optional */ }

export const config = {
  root,
  secretDir,
  serviceAccount,
  ga4PropertyId: String(analyticsConfig.property_id || '').replace(/^properties\//, ''),
  cloudflare: {
    token: cfLines.token || '',
    zoneId: cfLines.zone_id || '',
    accountId: cfLines.account_id || '',
  },
  discord: {
    token: discordToken,
    guildId: discordGuildId,
    ownerUserId: '822832480133840918',
    channelName: 'funnytools-analytics',
  },
  timezone: 'Asia/Taipei',
  domain: 'funnytools.win',
};
