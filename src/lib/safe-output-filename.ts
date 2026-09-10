const WINDOWS_RESERVED_NAME = /^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i;

/** Keep user-facing Unicode names while removing path/control/device hazards. */
export function safeOutputBaseName(input: unknown): string {
  const normalized = String(input ?? '').normalize('NFC');
  const leaf = normalized.split(/[\\/]/).pop() || '';
  const stem = leaf.replace(/\.[^.]*$/, '');
  const safe = stem
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .replace(/[<>:"|?*\\/]/g, '-')
    .replace(/^\.+/, '')
    .replace(/[.\s]+$/g, '')
    .trim();

  if (!safe || WINDOWS_RESERVED_NAME.test(safe)) return 'image';
  return Array.from(safe).slice(0, 120).join('') || 'image';
}
