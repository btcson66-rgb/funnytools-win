import type { Locale } from '../config/site';

export type ToolSurface = 'canonical' | 'embed';
export type CanonicalToolDataFlow = 'LOCAL_ONLY' | 'LOCAL_PROCESSING_GATED_OUTPUT' | 'CONVERSION_API';
export type ToolDataFlowClass =
  | 'LOCAL_ONLY'
  | 'BACKEND_INPUT_UPLOAD'
  | 'LOCAL_PROCESSING_GATED_OUTPUT'
  | 'UNKNOWN';

export const CONVERSION_API_TOOLS = [
  'bulk-image-compressor',
  'pdf-to-word',
  'pdf-table-to-excel',
  'image-to-dxf',
  'pdf-compressor',
] as const;

export const DOWNLOAD_GATED_TOOLS = [
  'image-compressor',
  'merge-pdf',
  'qr-code-generator',
] as const;

export function isCanonicalConversionApiTool(slug: string): boolean {
  return CONVERSION_API_TOOLS.includes(slug as (typeof CONVERSION_API_TOOLS)[number]);
}

export function isCanonicalDownloadGatedTool(slug: string): boolean {
  return DOWNLOAD_GATED_TOOLS.includes(slug as (typeof DOWNLOAD_GATED_TOOLS)[number]);
}

/** The public canonical-tool contract; the embed surface is classified separately. */
export function classifyCanonicalToolDataFlow(slug: string): CanonicalToolDataFlow {
  if (isCanonicalConversionApiTool(slug)) return 'CONVERSION_API';
  if (isCanonicalDownloadGatedTool(slug)) return 'LOCAL_PROCESSING_GATED_OUTPUT';
  return 'LOCAL_ONLY';
}

export function classifyToolDataFlow(
  slug: string,
  surface: ToolSurface,
  _lang?: Locale,
): ToolDataFlowClass {
  if (isCanonicalDownloadGatedTool(slug)) {
    return surface === 'embed' ? 'LOCAL_ONLY' : 'LOCAL_PROCESSING_GATED_OUTPUT';
  }
  if (isCanonicalConversionApiTool(slug)) return 'BACKEND_INPUT_UPLOAD';
  return surface === 'canonical' ? 'LOCAL_ONLY' : 'UNKNOWN';
}
