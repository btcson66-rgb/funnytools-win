import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { INDEXABLE_PATHS } from '../src/lib/indexPolicy.ts';

// P2 batch 5 (2026-10-17): the home page states what the site is, who it is for and where to start in the first
// screen, groups the ten tools by the same four questions as the hub, and stays shorter than the hub.
const read = (route) => readFileSync(new URL(`../dist${route}index.html`, import.meta.url), 'utf8');
const flatten = (page) => page.replace(/ data-astro-cid-[a-z0-9]+/g, '');
const text = (fragment) => fragment.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ').replace(/&#39;/g, "'").replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const home = flatten(read('/'));
const hub = flatten(read('/education-statistics/'));
const homeMain = home.match(/<div class="wrap">[\s\S]*?<\/main>/)?.[0] ?? '';
const hero = home.match(/<section class="hero home-hero">[\s\S]*?<\/section>/)?.[0] ?? '';
const sections = (page) => [...page.matchAll(/<section[^>]*\sid="(position|combine|describe|classroom)"[^>]*>([\s\S]*?)<\/section>/g)].map((m) => ({ id: m[1], html: m[2] }));
const hubSections = sections(hub);
const homeSections = sections(home);
const IDS = ['position', 'combine', 'describe', 'classroom'];

test('first screen: what it is, who it is for, where to start, and the privacy line', () => {
  assert.match(hero, /<h1[^>]*>給台灣學生與老師的成績統計工具<\/h1>/);
  const lead = text(hero.match(/<p class="lead">([\s\S]*?)<\/p>/)?.[1] ?? '');
  for (const phrase of ['FunnyTools 是成績計算器', 'T 分數', 'PR 值', '班排百分比', '學期成績', '教甄總分', '標準差', 't 檢定', '課堂抽籤', '只在你的瀏覽器計算，不會上傳']) assert.ok(lead.includes(phrase), phrase);
  assert.ok(hero.includes('給台灣學生與老師'));
  const starts = [...hero.matchAll(/<a class="(btn go|btn ghost)" href="#([a-z]+)">([^<]+)<\/a>/g)].map((m) => ({ cls: m[1], id: m[2], label: m[3] }));
  assert.deepEqual(starts.map((s) => s.id), IDS, 'four start links, one per situation, same order as the hub');
  assert.deepEqual(starts.map((s) => s.cls), ['btn go', 'btn ghost', 'btn ghost', 'btn ghost']);
  for (const { id } of starts) assert.ok(home.includes(`id="${id}"`), `${id} section exists`);
  assert.ok(hero.includes('href="/education-statistics/"'), 'link to the hub from the first screen');
});

test('four situations, the same ids and headings as the hub, every retained tool exactly once', () => {
  assert.deepEqual(homeSections.map((s) => s.id), IDS);
  assert.deepEqual(hubSections.map((s) => s.id), IDS);
  const heading = (html) => text(html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/)?.[1] ?? '');
  for (const id of IDS) {
    assert.equal(heading(homeSections.find((s) => s.id === id).html), heading(hubSections.find((s) => s.id === id).html), `${id}: same heading as the hub`);
    assert.ok(homeSections.find((s) => s.id === id).html.includes(`href="/education-statistics/#${id}"`), `${id}: links to its hub section`);
  }
  const toolHrefs = [...homeMain.matchAll(/class="tool-card__link" href="(\/tools\/[^"]+)"/g)].map((m) => m[1]);
  const retainedTools = INDEXABLE_PATHS.filter((path) => path.startsWith('/tools/'));
  assert.equal(retainedTools.length, 10);
  assert.deepEqual([...toolHrefs].sort(), [...retainedTools].sort(), 'each retained tool is linked once, nothing else');
  // each tool sits in the same situation on the home page and in the hub
  for (const id of IDS) {
    const onHome = [...homeSections.find((s) => s.id === id).html.matchAll(/class="tool-card__link" href="(\/tools\/[^"]+)"/g)].map((m) => m[1]).sort();
    const onHub = [...hubSections.find((s) => s.id === id).html.matchAll(/class="hub-tool-name" href="(\/tools\/[^"]+)"/g)].map((m) => m[1]).sort();
    assert.deepEqual(onHome, onHub, `${id}: same tools on home and hub`);
  }
});

test('home is the short version: each group intro is shorter than the hub intro, and no hub sentence is repeated', () => {
  for (const id of IDS) {
    const homeIntro = text(homeSections.find((s) => s.id === id).html.match(/<\/h2>\s*<p>([\s\S]*?)<\/p>/)?.[1] ?? '');
    const hubIntro = text(hubSections.find((s) => s.id === id).html.match(/<div class="section-head">[\s\S]*?<\/h2>\s*<p>([\s\S]*?)<\/p>/)?.[1] ?? '');
    assert.ok(homeIntro.length > 20 && hubIntro.length > 20, id);
    assert.ok(homeIntro.length < hubIntro.length, `${id}: home ${homeIntro.length} < hub ${hubIntro.length}`);
    assert.notEqual(homeIntro, hubIntro);
  }
  const homeText = text(homeMain);
  for (const asks of [...hub.matchAll(/<span class="hub-tool-asks">([\s\S]*?)<\/span>/g)].map((m) => text(m[1]))) assert.ok(!homeText.includes(asks), `hub question repeated on home: ${asks}`);
});

test('home keeps its title, description, canonical, schema and the P1 contract', () => {
  assert.match(home, /<title>FunnyTools 成績統計工具｜T 分數、PR 值、標準差、加權平均<\/title>/);
  assert.match(home, /<link rel="canonical" href="https:\/\/funnytools\.win\/"/);
  assert.doesNotMatch(home, /noindex/);
  assert.doesNotMatch(home, /"@type":"(FAQPage|HowTo)"/);
  assert.ok(home.includes('"@type":"WebSite"') || home.includes('"@type":"Organization"'));
  assert.ok(!hero.includes('不確定該用哪一個'));
  const source = readFileSync(new URL('../src/pages/[...locale]/index.astro', import.meta.url), 'utf8');
  assert.doesNotMatch(source, /#[0-9a-f]{3,8}/i);
  assert.doesNotMatch(source, /<style is:global>/);
});
