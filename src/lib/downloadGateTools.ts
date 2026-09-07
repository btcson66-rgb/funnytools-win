// Single source of truth for which tools route their download button through
// the email download gate (src/lib/downloadGate.client.ts).
//
// The gate uploads the generated output file plus the visitor's email address
// to SITE.downloadGateEndpoint, so it may only be wired to tools that already
// upload the file for their core function -- i.e. the ConversionApiTool
// tools. Browser-local tools must stay local: adding a slug here without the
// matching privacy copy would re-introduce the "runs entirely in your browser
// but silently uploads" inconsistency this list exists to prevent.
export const DOWNLOAD_GATE_SLUGS = [
  'bulk-image-compressor',
  'image-to-dxf',
  'pdf-compressor',
  'pdf-table-to-excel',
  'pdf-to-word',
] as const;

export type DownloadGateSlug = (typeof DOWNLOAD_GATE_SLUGS)[number];

export function usesDownloadGate(slug: string): boolean {
  return (DOWNLOAD_GATE_SLUGS as readonly string[]).includes(slug);
}
