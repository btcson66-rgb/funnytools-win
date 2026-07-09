// GA4 custom event helper for FunnyTools
// All events use gtag() which is already loaded in BaseLayout.astro
// ChatGPT referrals should be tagged with utm_source=chatgpt.com; GA4 captures UTM params automatically.

type GA4Params = Record<string, string | number | boolean | undefined>;
const forbiddenParamNames = /^(input|input_value|user_input|raw_value|text|result_text|file_name|filename|student_name|student_names|grade|grades|research_data|password|qr_payload)$/i;

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
    const safeParams = Object.fromEntries(Object.entries(params).filter(([key]) => !forbiddenParamNames.test(key)));
    window.gtag('event', eventName, { ...base, ...safeParams });
  }
}

export function trackToolCardClick(toolId: string, toolName: string, category: string) {
  track('tool_card_click', { tool_id: toolId, tool_name: toolName, category });
}

export function trackToolUseStart(toolId: string, toolName: string, category: string) {
  track('tool_use_started', { tool_id: toolId, tool_name: toolName, category });
}

export function trackToolUseSuccess(toolId: string, toolName: string, category: string) {
  track('tool_use_completed', { tool_id: toolId, tool_name: toolName, category });
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

export function trackArticleCtaClick(articleId: string, targetType: string) {
  track('article_cta_click', { article_id: articleId, target_type: targetType });
}

export function trackHubClick(hubId: string, sourcePath?: string) {
  track('hub_click', { hub_id: hubId, source_path: sourcePath || window.location.pathname });
}

export function trackDownloadGate(
  eventName: 'gate_view' | 'gate_submit' | 'gate_email_sent' | 'gate_fallback_local',
  toolId: string,
  reason?: string,
) {
  track(eventName, { tool_id: toolId, reason });
}

export function trackNewsletterSignup(source: string, success: boolean) {
  track('newsletter_signup', { source, success });
}

export {};
