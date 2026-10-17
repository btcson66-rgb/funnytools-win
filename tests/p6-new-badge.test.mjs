import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { isNewTool, NEW_TOOL_WINDOW_DAYS } from '../src/lib/newTool.ts';

// P2 batch 6 (2026-10-17): the "newest tool" badge is date-derived, so it can no longer sit on 9 of 10 cards.
const NOW = new Date('2026-10-17T12:00:00Z');

test('badge window is 30 days after addedAt', () => {
  assert.equal(NEW_TOOL_WINDOW_DAYS, 30);
  assert.equal(isNewTool('2026-10-17', NOW), true, 'launched today');
  assert.equal(isNewTool('2026-09-20', NOW), true, '27 days ago');
  assert.equal(isNewTool('2026-09-17', NOW), false, '30 days and 12 hours ago is outside the window');
  assert.equal(isNewTool('2026-06-20', NOW), false, 'months ago');
});

test('no verifiable launch date means no badge', () => {
  assert.equal(isNewTool(undefined, NOW), false);
  assert.equal(isNewTool('', NOW), false);
  assert.equal(isNewTool('not-a-date', NOW), false);
  assert.equal(isNewTool('2026-13-45', NOW), false);
  assert.equal(isNewTool('2026-10-20', NOW), false, 'a date in the future is not a launch that already happened');
});

test('tools.ts no longer carries a hand-set isNew flag', () => {
  const source = readFileSync(new URL('../src/data/tools.ts', import.meta.url), 'utf8');
  assert.ok(!/\bisNew\??\s*:/.test(source), 'isNew is replaced by addedAt');
});

test('built home page: the badge is not on every card', () => {
  const home = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
  const cards = (home.match(/class="tile tool-tile tool-card/g) ?? []).length;
  const badges = (home.match(/data-new-badge/g) ?? []).length;
  assert.equal(cards, 10, 'ten tool cards on the home page');
  assert.ok(badges < cards / 2, `badges (${badges}) must be a minority of cards (${cards})`);
  assert.equal(badges, 0, 'none of the ten tools has a verified launch date inside the last 30 days');
});
