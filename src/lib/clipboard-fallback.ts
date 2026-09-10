interface ClipboardLike {
  writeText?: (text: string) => Promise<void>;
}

interface CopyFallbackOptions {
  clipboard?: ClipboardLike | null;
  prompt?: ((message?: string, defaultValue?: string) => string | null) | null;
}

/** Copy text when possible, with a browser-native manual-copy fallback. */
export async function copyTextWithFallback(
  text: string,
  promptMessage: string,
  options: CopyFallbackOptions = {},
): Promise<'clipboard' | 'prompt'> {
  const clipboard = options.clipboard === undefined
    ? (typeof navigator !== 'undefined' ? navigator.clipboard : undefined)
    : options.clipboard;
  const prompt = options.prompt === undefined
    ? (typeof window !== 'undefined' ? window.prompt.bind(window) : undefined)
    : options.prompt;

  try {
    if (!clipboard?.writeText) throw new Error('Clipboard API unavailable');
    await clipboard.writeText(text);
    return 'clipboard';
  } catch {
    prompt?.(promptMessage, text);
    return 'prompt';
  }
}
