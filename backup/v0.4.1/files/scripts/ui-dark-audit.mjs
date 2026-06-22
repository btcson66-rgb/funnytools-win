import { spawn } from 'node:child_process';
import { mkdtemp, rm, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const origin = (process.argv[2] || 'http://127.0.0.1:4321').replace(/\/$/, '');
const interactionMode = process.argv.includes('--interactions');
const viewportWidth = Number(process.argv.find((arg) => arg.startsWith('--width='))?.split('=')[1] || 1440);
const viewportHeight = viewportWidth < 600 ? 844 : viewportWidth < 1024 ? 1024 : 1100;
const chromeCandidates = [
  process.env.CHROME_PATH,
  process.env.PROGRAMFILES && join(process.env.PROGRAMFILES, 'Google', 'Chrome', 'Application', 'chrome.exe'),
  process.env['PROGRAMFILES(X86)'] && join(process.env['PROGRAMFILES(X86)'], 'Google', 'Chrome', 'Application', 'chrome.exe'),
  process.env.LOCALAPPDATA && join(process.env.LOCALAPPDATA, 'Google', 'Chrome', 'Application', 'chrome.exe'),
  process.platform === 'darwin' && '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  process.platform === 'linux' && 'google-chrome',
].filter(Boolean);

async function findChrome() {
  const { access } = await import('node:fs/promises');
  for (const candidate of chromeCandidates) {
    try { await access(candidate); return candidate; } catch {}
  }
  throw new Error('Chrome not found. Set CHROME_PATH to run the dark-mode UI audit.');
}

function extractRoutes(xml) {
  const routes = [...xml.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)]
    .map((match) => match[1] || '/')
    .filter((route) => !route.startsWith('/embed/'));
  return [...new Set(['/', '/en/', '/support/', '/404.html', ...routes])];
}

async function waitForJson(url, attempts = 80) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return response.json();
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`Timed out waiting for ${url}`);
}

function createCdp(wsUrl) {
  const socket = new WebSocket(wsUrl);
  let nextId = 1;
  const pending = new Map();
  const listeners = new Map();
  const ready = new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });
  socket.addEventListener('message', ({ data }) => {
    const message = JSON.parse(data);
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result);
      return;
    }
    for (const listener of listeners.get(message.method) || []) listener(message.params);
  });
  return {
    ready,
    send(method, params = {}) {
      const id = nextId++;
      socket.send(JSON.stringify({ id, method, params }));
      return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
    },
    once(method) {
      return new Promise((resolve) => {
        const handler = (params) => {
          listeners.set(method, (listeners.get(method) || []).filter((item) => item !== handler));
          resolve(params);
        };
        listeners.set(method, [...(listeners.get(method) || []), handler]);
      });
    },
    close() { socket.close(); },
  };
}

const auditExpression = String.raw`(() => {
  const parseColor = (value) => {
    const match = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    return match ? [Number(match[1]), Number(match[2]), Number(match[3]), match[4] === undefined ? 1 : Number(match[4])] : null;
  };
  const luminance = ([r, g, b]) => {
    const channel = (value) => { const v = value / 255; return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; };
    return .2126 * channel(r) + .7152 * channel(g) + .0722 * channel(b);
  };
  const contrast = (a, b) => { const l1 = luminance(a); const l2 = luminance(b); return (Math.max(l1, l2) + .05) / (Math.min(l1, l2) + .05); };
  const visible = (element) => {
    const rect = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    if (element.matches('.skip-link:not(:focus)')) return false;
    return rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.right > 0 && style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) > .05;
  };
  const label = (element) => {
    const id = element.id ? '#' + element.id : '';
    const classes = [...element.classList].slice(0, 3).map((name) => '.' + name).join('');
    const text = (element.getAttribute('aria-label') || element.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 70);
    return element.tagName.toLowerCase() + id + classes + (text ? ' [' + text + ']' : '');
  };
  const ownBackground = (element) => {
    let current = element;
    while (current) {
      const color = parseColor(getComputedStyle(current).backgroundColor);
      if (color && color[3] > .15) return color;
      current = current.parentElement;
    }
    return parseColor(getComputedStyle(document.documentElement).backgroundColor) || [15, 23, 42, 1];
  };
  const all = [...document.querySelectorAll('body *')].filter(visible);
  const whiteSurfaces = all.filter((element) => {
    if (/^(IMG|PICTURE|VIDEO|CANVAS|SVG|PATH|OPTION)$/.test(element.tagName) || element.matches('[class*="canvas-wrap"]')) return false;
    const rect = element.getBoundingClientRect();
    if (rect.width * rect.height < 500) return false;
    const color = parseColor(getComputedStyle(element).backgroundColor);
    return color && color[3] > .5 && color[0] > 235 && color[1] > 235 && color[2] > 235;
  }).map(label);
  const controls = all.filter((element) => element.matches('button, .btn, input:not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="color"]):not([type="file"]), textarea, select, [role="button"]'));
  const lowContrastControls = controls.filter((element) => {
    const foreground = parseColor(getComputedStyle(element).color);
    const background = ownBackground(element);
    return foreground && background && contrast(foreground, background) < 3;
  }).map(label);
  const smallControls = controls.filter((element) => {
    const rect = element.getBoundingClientRect();
    return rect.width < 32 || rect.height < 32;
  }).map(label);
  const overflow = document.documentElement.scrollWidth > document.documentElement.clientWidth + 2;
  return {
    theme: document.documentElement.dataset.theme,
    whiteSurfaces: [...new Set(whiteSurfaces)].slice(0, 30),
    lowContrastControls: [...new Set(lowContrastControls)].slice(0, 30),
    smallControls: [...new Set(smallControls)].slice(0, 30),
    horizontalOverflow: overflow,
  };
})()`;

const chromePath = await findChrome();
const profile = await mkdtemp(join(tmpdir(), 'funnytools-ui-audit-'));
const port = 9333 + Math.floor(Math.random() * 500);
const chrome = spawn(chromePath, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
  `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, 'about:blank',
], { stdio: 'ignore' });

try {
  await waitForJson(`http://127.0.0.1:${port}/json/version`);
  const target = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: 'PUT' }).then((response) => response.json());
  const cdp = createCdp(target.webSocketDebuggerUrl);
  await cdp.ready;
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: viewportWidth, height: viewportHeight, deviceScaleFactor: 1, mobile: viewportWidth < 600 });
  await cdp.send('Page.addScriptToEvaluateOnNewDocument', {
    source: `try { localStorage.setItem('theme', 'dark'); } catch {} document.documentElement.dataset.theme = 'dark';`,
  });

  const sitemap = await readFile(new URL('../dist/sitemap.xml', import.meta.url), 'utf8');
  const routes = extractRoutes(sitemap);
  const failures = [];
  for (const route of routes) {
    const loaded = cdp.once('Page.loadEventFired');
    await cdp.send('Page.navigate', { url: `${origin}${route}` });
    await loaded;
    await new Promise((resolve) => setTimeout(resolve, 35));
    const result = await cdp.send('Runtime.evaluate', { expression: auditExpression, returnByValue: true });
    const findings = result.result.value;
    if (interactionMode) {
      await cdp.send('Runtime.evaluate', {
        expression: `(async () => {
          window.prompt = () => null;
          window.print = () => {};
          try { Object.defineProperty(navigator, 'clipboard', { value: { writeText: async () => {} }, configurable: true }); } catch {}
          const buttons = [...document.querySelectorAll('button[type="button"]')].filter((button) => {
            const rect = button.getBoundingClientRect();
            return !button.disabled && rect.width > 0 && rect.height > 0 && !button.matches('.theme-toggle, .mobile-menu-toggle');
          });
          for (const button of buttons) {
            try { button.click(); } catch {}
          }
          await new Promise((resolve) => setTimeout(resolve, 40));
        })()`,
        awaitPromise: true,
        returnByValue: true,
      });
      const afterResult = await cdp.send('Runtime.evaluate', { expression: auditExpression, returnByValue: true });
      const after = afterResult.result.value;
      findings.whiteSurfaces = [...new Set([...findings.whiteSurfaces, ...after.whiteSurfaces])];
      findings.lowContrastControls = [...new Set([...findings.lowContrastControls, ...after.lowContrastControls])];
      findings.smallControls = [...new Set([...findings.smallControls, ...after.smallControls])];
      findings.horizontalOverflow ||= after.horizontalOverflow;
      findings.theme = after.theme;
    }
    if (findings.theme !== 'dark' || findings.whiteSurfaces.length || findings.lowContrastControls.length || findings.smallControls.length || findings.horizontalOverflow) {
      failures.push({ route, ...findings });
    }
  }
  cdp.close();
  const groupFindings = (key) => {
    const grouped = new Map();
    for (const failure of failures) {
      for (const finding of failure[key]) {
        const entry = grouped.get(finding) || { count: 0, routes: [] };
        entry.count += 1;
        if (entry.routes.length < 5) entry.routes.push(failure.route);
        grouped.set(finding, entry);
      }
    }
    return [...grouped.entries()]
      .map(([selector, details]) => ({ selector, ...details }))
      .sort((a, b) => b.count - a.count || a.selector.localeCompare(b.selector));
  };
  console.log(JSON.stringify({
    auditedRoutes: routes.length,
    interactionMode,
    viewport: `${viewportWidth}x${viewportHeight}`,
    failingRoutes: failures.length,
    wrongThemeRoutes: failures.filter((item) => item.theme !== 'dark').map((item) => item.route),
    horizontalOverflowRoutes: failures.filter((item) => item.horizontalOverflow).map((item) => item.route),
    whiteSurfaces: groupFindings('whiteSurfaces'),
    lowContrastControls: groupFindings('lowContrastControls'),
    smallControls: groupFindings('smallControls'),
  }, null, 2));
  if (failures.length) process.exitCode = 1;
} finally {
  chrome.kill();
  await new Promise((resolve) => chrome.once('exit', resolve));
  await rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
}
