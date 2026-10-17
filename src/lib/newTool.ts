/** A tool counts as new for this many days after its first public release. */
export const NEW_TOOL_WINDOW_DAYS = 30;

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * P2 batch 6 (2026-10-17): the "newest tool" badge used to be a hand-set boolean that was true on 9 of the 10
 * cards, which made it meaningless. It is now derived from `addedAt`, the ISO date a tool first went public.
 * No `addedAt` (or an unparseable or future date) means no badge: a tool whose launch date nobody can verify is
 * not claimed to be new. `updated`/`reviewedAt` never count, because a rebuilt page is not a new tool.
 */
export function isNewTool(addedAt: string | undefined, now: Date = new Date()): boolean {
  if (!addedAt || !ISO_DATE.test(addedAt)) return false;
  const added = Date.parse(`${addedAt}T00:00:00Z`);
  if (!Number.isFinite(added)) return false;
  const ageDays = (now.getTime() - added) / 86_400_000;
  return ageDays >= 0 && ageDays < NEW_TOOL_WINDOW_DAYS;
}
