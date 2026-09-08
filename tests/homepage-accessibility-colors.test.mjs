import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const page = fs.readFileSync(new URL('../src/pages/[...locale]/index.astro', import.meta.url), 'utf8');

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
  const light = Math.max(luminance(foreground), luminance(background));
  const dark = Math.min(luminance(foreground), luminance(background));
  return (light + 0.05) / (dark + 0.05);
}

test('homepage links and primary actions use WCAG AA colors without changing every route', () => {
  assert.match(page, /\.lang-switch,[\s\S]*?\.home-page \.inline-link\s*{\s*color:\s*#0f766e/s);
  assert.match(page, /\.home-page \.btn\.go\s*{[^}]*background:\s*#0f766e/s);
  assert.ok(contrast('#0f766e', '#ffffff') >= 4.5);
  assert.ok(contrast('#ffffff', '#0f766e') >= 4.5);
  assert.match(page, /\.site-main:has\(\.home-page\) ~ \.site-footer \.footer-brand strong\s*{\s*color:\s*#0f766e/s);
  assert.match(page, /\.site-main:has\(\.home-page\) ~ \.site-footer \.footer-links span,[\s\S]*?color:\s*#475569/s);
  assert.ok(contrast('#475569', '#f8fafc') >= 4.5);
});
