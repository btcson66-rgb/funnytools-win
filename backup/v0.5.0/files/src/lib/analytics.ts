// GA4 custom event helper for FunnyTools
// All events use gtag() which is already loaded in BaseLayout.astro

type GA4Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: 'event', eventName: string, params?: GA4Params) => void;
    __ft_track?: (eventName: string, params?: GA4Params) => void;
  }
}

function track(eventName: string, params: GA4Params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    const base: GA4Params = {
      page_path: window.location.pathname,
      language: document.documentElement.lang || 'zh-Hant',
    };
    window.gtag('event', eventName, { ...base, ...params });
  }
}

export function trackToolCardClick(toolId: string, toolName: string, category: string) {
  track('tool_card_click', { tool_id: toolId, tool_name: toolName, category });
}

export function trackToolUseStart(toolId: string, toolName: string, category: string) {
  track('tool_use_start', { tool_id: toolId, tool_name: toolName, category });
}

export function trackToolUseSuccess(toolId: string, toolName: string, category: string) {
  track('tool_use_success', { tool_id: toolId, tool_name: toolName, category });
}

export function trackResultDownload(toolId: string, toolName: string, category: string) {
  track('result_download', { tool_id: toolId, tool_name: toolName, category });
}

export function trackCopyResult(toolId: string, toolName: string, category: string) {
  track('copy_result', { tool_id: toolId, tool_name: toolName, category });
}

export function trackShareClick(platform: string) {
  track('share_click', { method: platform });
}

export function trackSupportClick(source: string) {
  track('support_click', { source });
}

export function trackLanguageSwitch(fromLang: string, toLang: string) {
  track('language_switch', { from_language: fromLang, to_language: toLang });
}

export function trackRelatedToolClick(toolId: string, toolName: string, sourceToolId: string) {
  track('related_tool_click', { tool_id: toolId, tool_name: toolName, source_tool_id: sourceToolId });
}

export {};
