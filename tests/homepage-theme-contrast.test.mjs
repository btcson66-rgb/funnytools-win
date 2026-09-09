import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const css = fs.readFileSync(new URL('../src/styles/global.css', import.meta.url), 'utf8');
const homepage = fs.readFileSync(new URL('../src/pages/[...locale]/index.astro', import.meta.url), 'utf8');

function declarations(selector, requiredToken) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const matches = [...css.matchAll(new RegExp(`${escaped}\\s*\\{([^}]+)\\}`, 'gs'))];
  const match = requiredToken
    ? matches.find((candidate) => candidate[1].includes(requiredToken))
    : matches[0];
  assert.ok(match, `Missing CSS rule: ${selector} with ${requiredToken || 'expected declarations'}`);
  return match[1];
}

function colorValue(block, property) {
  const match = block.match(new RegExp(`--${property}:\\s*(#[0-9a-f]{3}(?:[0-9a-f]{3})?)\\b`, 'i'));
  assert.ok(match, `Missing solid color token --${property}`);
  return match[1].length === 4
    ? `#${match[1].slice(1).split('').map((value) => value.repeat(2)).join('')}`
    : match[1];
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

const root = declarations(':root', '--color-primary-700');
const dark = declarations('[data-theme="dark"]', '--color-primary-700');
const light = {
  primary700: colorValue(root, 'color-primary-700'),
  slate500: colorValue(root, 'color-slate-500'),
  surface: colorValue(root, 'color-surface'),
  background: colorValue(root, 'color-bg'),
  subtle: colorValue(root, 'color-bg-subtle'),
};
const darkTheme = {
  primary600: colorValue(dark, 'color-primary-600'),
  primary700: colorValue(dark, 'color-primary-700'),
  slate500: colorValue(dark, 'color-slate-500'),
  surface: colorValue(dark, 'color-surface'),
  background: colorValue(dark, 'color-bg'),
  subtle: colorValue(dark, 'color-bg-subtle'),
};

test('homepage contrast overrides are route-scoped and theme-aware', () => {
  assert.match(homepage, /<style is:global>/);
  assert.match(homepage, /html:not\(\[data-theme="dark"\]\):has\(\.home-page\) \.home-page \.btn\.go\s*\{[^}]*background:\s*var\(--color-primary-700\)/s);
  assert.match(homepage, /html:not\(\[data-theme="dark"\]\):has\(\.home-page\) \.home-page \.inline-link\s*\{[^}]*color:\s*var\(--color-primary-700\)/s);
  assert.match(homepage, /html:not\(\[data-theme="dark"\]\):has\(\.home-page\) \.site-nav \.brand\s*\{[^}]*color:\s*var\(--color-primary-700\)/s);
  assert.match(homepage, /html:has\(\.home-page\) \.home-page \.hero-tool-card__desc,[^}]*html:has\(\.home-page\) \.home-page \.category-card__count\s*\{[^}]*color:\s*var\(--color-slate-500\)/s);
  assert.match(homepage, /html:has\(\.home-page\) \.site-footer \.footer-brand strong\s*\{[^}]*color:\s*var\(--color-primary-700\)/s);
  assert.match(homepage, /html:has\(\.home-page\) \.site-footer \.footer-links span,[^}]*html:has\(\.home-page\) \.site-footer \.footer-bottom p\s*\{[^}]*color:\s*var\(--color-slate-500\)/s);
  assert.doesNotMatch(homepage, /\.lang-switch,\s*\.home-page \.inline-link\s*\{\s*color:\s*#0f766e/s);
  assert.doesNotMatch(homepage, /(?<!:has\(\.home-page\) )\.home-page \.btn\.go\s*\{[^}]*background:\s*#0f766e/s);
  assert.doesNotMatch(css, /Homepage-only contrast guard/);
});

test('light homepage target pairs pass the 4.5 contrast release gate in every state', () => {
  for (const state of ['default', 'hover', 'focus-visible']) {
    assertContrast(`light CTA ${state}`, '#ffffff', light.primary700);
    assertContrast(`light inline link ${state}`, light.primary700, light.surface);
    assertContrast(`light language switch ${state}`, light.slate500, light.background);
  }
  assertContrast('light footer brand', light.primary700, light.subtle);
  assertContrast('light navigation brand', light.primary700, light.surface);
  assertContrast('light footer secondary text', light.slate500, light.subtle);
  assertContrast('light homepage card secondary text', light.slate500, light.surface);
});

test('dark historical regression pairs stay above 4.5 without a homepage color override', () => {
  for (const state of ['default', 'focus-visible']) {
    assertContrast(`dark primary CTA ${state}`, '#042f2e', darkTheme.primary600);
    assertContrast(`dark language switch ${state}`, darkTheme.slate500, darkTheme.background);
  }
  assertContrast('dark primary CTA hover', '#042f2e', darkTheme.primary700);
  assertContrast('dark language switch hover', '#f1f5f9', darkTheme.background);
  assertContrast('dark inline link', darkTheme.primary600, darkTheme.surface);
  assertContrast('dark footer brand', darkTheme.primary700, darkTheme.subtle);
  assertContrast('dark footer secondary text', darkTheme.slate500, darkTheme.subtle);
  assertContrast('dark homepage card secondary text', darkTheme.slate500, darkTheme.surface);
});
