// Pure helpers behind /tools/random-name-picker/ (draw, group, order).
//
// Everything that needs randomness takes a `randomInt(max)` function that must
// return a uniform integer in [0, max). The browser widget passes
// `secureRandomInt`, which wraps crypto.getRandomValues with rejection
// sampling; tests pass deterministic stubs so that every claim made on the page
// (sizes of groups, probabilities, "every ordering is reachable once") can be
// re-derived exactly.

export type RandomInt = (max: number) => number;
export type FillRandom = (target: Uint32Array) => unknown;

/** Largest multiple of `max` that fits in 2^32; 32-bit values at or above it are thrown away. */
export function rejectionLimit(max: number): number {
  return Math.floor(0x100000000 / max) * max;
}

/**
 * Uniform integer in [0, max) from 32-bit random words. Values that would make
 * some residues more likely than others (the tail above rejectionLimit) are
 * discarded and a new word is drawn.
 */
export function secureRandomInt(max: number, fill?: FillRandom): number {
  if (!Number.isInteger(max) || max < 1 || max > 0x100000000) {
    throw new RangeError('max must be an integer between 1 and 2^32');
  }
  const source: FillRandom | undefined = fill ?? (
    typeof globalThis.crypto?.getRandomValues === 'function'
      ? (target) => globalThis.crypto.getRandomValues(target as Uint32Array<ArrayBuffer>)
      : undefined
  );
  if (!source) throw new Error('secure-random-unavailable');
  const word = new Uint32Array(new ArrayBuffer(4));
  const limit = rejectionLimit(max);
  do {
    source(word);
  } while (word[0] >= limit);
  return word[0] % max;
}

export type Separator = 'line' | 'comma';

/**
 * Turns pasted text into entries. Tabs (a spreadsheet row copied from two
 * columns) become one space; surrounding whitespace, including the full-width
 * space U+3000, is trimmed; empty entries are dropped. Duplicates are kept on
 * purpose: they are separate candidates.
 */
export function parseEntries(text: string, separator: Separator = 'line'): string[] {
  const splitter = separator === 'comma' ? /\r\n|\r|\n|[,，、;；]/ : /\r\n|\r|\n/;
  return text
    .split(splitter)
    .map((item) => item.replace(/\t+/g, ' ').trim())
    .filter((item) => item.length > 0);
}

export function findDuplicates(entries: readonly string[]): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const entry of entries) counts.set(entry, (counts.get(entry) ?? 0) + 1);
  return [...counts].filter(([, count]) => count > 1).map(([name, count]) => ({ name, count }));
}

/** Fisher-Yates (Durstenfeld) shuffle on a copy. */
export function shuffle<T>(items: readonly T[], randomInt: RandomInt): T[] {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = randomInt(index + 1);
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  return copy;
}

export interface DrawOptions {
  /** Number of entries in the list. */
  size: number;
  /** How many picks. */
  count: number;
  /** true: every pick is independent and anyone can come up again. false: nobody can be drawn twice. */
  withReplacement: boolean;
  /** Positions already drawn in earlier rounds; only used when withReplacement is false. */
  used?: ReadonlySet<number>;
}

export type DrawResult =
  | { ok: true; picks: number[] }
  | { ok: false; error: 'empty' | 'invalid-count' | 'not-enough'; available: number };

/** Returns positions (indexes into the entry list), so duplicate names never get mixed up. */
export function draw(options: DrawOptions, randomInt: RandomInt): DrawResult {
  const { size, count, withReplacement } = options;
  const used = withReplacement ? new Set<number>() : (options.used ?? new Set<number>());
  const pool: number[] = [];
  for (let index = 0; index < size; index += 1) if (!used.has(index)) pool.push(index);
  if (size < 1) return { ok: false, error: 'empty', available: 0 };
  if (!Number.isInteger(count) || count < 1) return { ok: false, error: 'invalid-count', available: pool.length };
  if (withReplacement) {
    return { ok: true, picks: Array.from({ length: count }, () => randomInt(size)) };
  }
  if (pool.length < 1) return { ok: false, error: 'empty', available: 0 };
  if (count > pool.length) return { ok: false, error: 'not-enough', available: pool.length };
  return { ok: true, picks: shuffle(pool, randomInt).slice(0, count) };
}

/** Sizes of `groups` groups for `people` people: the first (people mod groups) groups get one extra. */
export function groupSizes(people: number, groups: number): number[] {
  const base = Math.floor(people / groups);
  const extra = people % groups;
  return Array.from({ length: groups }, (_, index) => base + (index < extra ? 1 : 0));
}

/** "N people per group" -> number of groups. The groups are then balanced, so sizes are k or k-1 (or all k). */
export function groupCountForSize(people: number, perGroup: number): number {
  return Math.ceil(people / perGroup);
}

export type GroupResult =
  | { ok: true; groups: number[][]; sizes: number[] }
  | { ok: false; error: 'empty' | 'invalid-number' | 'too-many-groups' };

/** Shuffles positions, then deals them into balanced groups (group 1 gets the first slice). */
export function splitIntoGroups(size: number, groupCount: number, randomInt: RandomInt): GroupResult {
  if (size < 1) return { ok: false, error: 'empty' };
  if (!Number.isInteger(groupCount) || groupCount < 1) return { ok: false, error: 'invalid-number' };
  if (groupCount > size) return { ok: false, error: 'too-many-groups' };
  const order = shuffle(Array.from({ length: size }, (_, index) => index), randomInt);
  const sizes = groupSizes(size, groupCount);
  const groups: number[][] = [];
  let cursor = 0;
  for (const length of sizes) {
    groups.push(order.slice(cursor, cursor + length));
    cursor += length;
  }
  return { ok: true, groups, sizes };
}

/** Probability helpers used by the worked examples on the page. */
export const chance = {
  /** One specific entry is among `count` distinct picks out of `size`. */
  inDistinctPicks: (size: number, count: number): number => count / size,
  /** One specific entry shows up at least once in `draws` independent picks with replacement. */
  atLeastOnceWithReplacement: (size: number, draws: number): number => 1 - ((size - 1) / size) ** draws,
  /** Somebody is picked more than once in `draws` independent picks with replacement. */
  someoneRepeats: (size: number, draws: number): number => {
    let allDifferent = 1;
    for (let index = 0; index < draws; index += 1) allDifferent *= (size - index) / size;
    return 1 - allDifferent;
  },
};

// ---- Gift exchange: nobody draws themselves (derangement) ----

/** True when no position maps to itself, i.e. nobody is assigned to themselves. */
export function isDerangement(receivers: readonly number[]): boolean {
  return receivers.every((receiver, giver) => receiver !== giver);
}

/** D(n): how many ways n people can each give to exactly one other person, everyone receiving once. D(n) = (n-1)(D(n-1)+D(n-2)). */
export function derangementCount(size: number): bigint {
  if (!Number.isInteger(size) || size < 0) throw new RangeError('size must be a non-negative integer');
  let previous = 1n; // D(0)
  let current = 0n; // D(1)
  if (size === 0) return previous;
  for (let n = 2; n <= size; n += 1) {
    [previous, current] = [current, BigInt(n - 1) * (current + previous)];
  }
  return current;
}

export function factorial(size: number): bigint {
  let product = 1n;
  for (let n = 2; n <= size; n += 1) product *= BigInt(n);
  return product;
}

export type DerangementResult =
  | { ok: true; receivers: number[]; attempts: number }
  | { ok: false; error: 'too-few' | 'gave-up' };

/**
 * receivers[i] = the position person i gives to. Rejection sampling: Fisher-Yates makes every one of the
 * n! assignments equally likely, and a draw in which anybody gets themselves is thrown away and redone.
 * The assignments that survive are exactly the derangements, and each of them is equally likely
 * (every survivor had the same 1/n! chance in each round). About n!/D(n) = 2.7 rounds are needed on
 * average whatever the list size, so `maxAttempts` is only a safety net (the chance of using up 1000
 * rounds is below (2/3)^1000 for 3 or more people, and 2^-1000 for 2 people).
 */
export function drawDerangement(size: number, randomInt: RandomInt, maxAttempts = 1000): DerangementResult {
  if (!Number.isInteger(size) || size < 2) return { ok: false, error: 'too-few' };
  const identity = Array.from({ length: size }, (_, index) => index);
  for (let attempts = 1; attempts <= maxAttempts; attempts += 1) {
    const receivers = shuffle(identity, randomInt);
    if (isDerangement(receivers)) return { ok: true, receivers, attempts };
  }
  return { ok: false, error: 'gave-up' };
}
