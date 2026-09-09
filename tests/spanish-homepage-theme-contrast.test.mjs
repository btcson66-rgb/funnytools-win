import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const globalCss = fs.readFileSync(new URL('../src/styles/global.css', import.meta.url), 'utf8');
const spanishHomepage = fs.readFileSync(new URL('../src/pages/es/index.astro', import.meta.url), 'utf8');

function declarations(source, selector, requiredToken) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const matches = [...source.matchAll(new RegExp(`${escaped}\\s*\\{([^}]+)\\}`, 'gs'))];
  const match = requiredToken
    ? matches.find((candidate) => candidate[1].includes(requiredToken))
    : matches[0];
  assert.ok(match, `Missing CSS rule: ${selector} with ${requiredToken || 'expected declarations'}`);
  return match[1];
}

function tokenValue(block, token) {
  const match = block.match(new RegExp(`--${token}:\\s*(#[0-9a-f]{3}(?:[0-9a-f]{3})?)\\b`, 'i'));
  assert.ok(match, `Missing solid color token --${token}`);
  return match[1].length === 4
    ? `#${match[1].slice(1).split('').map((value) => value.repeat(2)).join('')}`
    : match[1];
}

function propertyToken(block, property) {
  const match = block.match(new RegExp(`${property}:\\s*var\\(--([a-z0-9-]+)\\)`, 'i'));
  assert.ok(match, `Missing token-backed ${property} declaration`);
  return match[1];
}

function channel(value) {
  const normalized = value / 255;
  return normalized <= 0.04045
    ? normalized / 12.92
    : ((normalized + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const channels = hex.match(/[a-f\d]{2}/gi).map((value) => channel(Number.parseInt(value, 16)));
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrast(foreground, background) {
  const first = luminance(foreground);
  const second = luminance(background);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}

function assertContrast(label, foreground, background) {
  const ratio = contrast(foreground, background);
  assert.ok(ratio >= 4.5, `${label} contrast ${ratio.toFixed(3)} is below 4.5`);
}

const rootTokens = declarations(globalCss, ':root', '--color-primary-700');
const darkTokens = declarations(globalCss, '[data-theme="dark"]', '--color-primary-700');
const lightRuleMatch = spanishHomepage.match(
  /html:not\(\[data-theme="dark"\]\):has\(\.home-page\[data-native-locale="es"\]\)\s*\.home-page\[data-native-locale="es"\]\s*\.btn\.go\s*\{([^}]+)\}/s,
);
assert.ok(lightRuleMatch, 'Missing Spanish homepage light CTA route rule');
const lightRule = lightRuleMatch[1];
const lightBackgroundToken = propertyToken(lightRule, 'background');

const light = {
  cta: tokenValue(rootTokens, lightBackgroundToken),
};
const dark = {
  primary600: tokenValue(darkTokens, 'color-primary-600'),
  primary700: tokenValue(darkTokens, 'color-primary-700'),
};

test('Spanish homepage light CTA override is route-local, token-backed, and theme-aware', () => {
  assert.match(spanishHomepage, /<article\s+class="home-page"\s+data-native-locale="es"/s);
  assert.match(spanishHomepage, /<style is:global>/);
  assert.match(lightRule, /border-color:\s*var\(--color-primary-700\)/);
  assert.equal(lightBackgroundToken, 'color-primary-700');
  assert.doesNotMatch(lightRule, /!important/);
  assert.doesNotMatch(lightRule, /#[0-9a-f]{3,8}/i);
  assert.doesNotMatch(spanishHomepage, /html\[data-theme="dark"\][^{]*\.home-page\[data-native-locale="es"\][^{]*\.btn\.go\s*\{/s);
  assert.match(spanishHomepage, /\.site-nav\s+:is\(\.brand, a\[aria-current="page"\]\)[^{]*\{\s*color:\s*var\(--color-primary-700\)/s);
  assert.match(spanishHomepage, /\.site-footer\s+:is\(\.footer-links span, \.fineprint, \.footer-bottom p\)[^{]*\{\s*color:\s*var\(--color-slate-500\)/s);
});

test('Spanish light hero and card CTA token pairs pass every required state', () => {
  assert.match(spanishHomepage, /class="hero-actions"[\s\S]*?<a class="btn go"/);
  assert.match(spanishHomepage, /class="tool-card"[\s\S]*?<a class="btn go"/);
  for (const state of ['default', 'hover', 'focus-visible']) {
    assertContrast(`SPANISH_LIGHT_HERO_CTA ${state}`, '#ffffff', light.cta);
    assertContrast(`SPANISH_LIGHT_CARD_CTA ${state}`, '#ffffff', light.cta);
  }
});

test('Spanish dark CTA pairs remain governed by the existing theme tokens', () => {
  for (const target of ['HERO', 'CARD']) {
    assertContrast(`SPANISH_DARK_${target}_CTA default`, '#042f2e', dark.primary600);
    assertContrast(`SPANISH_DARK_${target}_CTA hover`, '#042f2e', dark.primary700);
    assertContrast(`SPANISH_DARK_${target}_CTA focus-visible`, '#042f2e', dark.primary600);
  }
});
