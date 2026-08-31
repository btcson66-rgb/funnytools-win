/**
 * Funnytools Conversion API client helpers.
 * Framework-agnostic: React / Next.js / Vue / Svelte / vanilla TypeScript.
 */

export type OcrMode = "auto" | "force" | "off";
export type OcrLang = "eng" | "chi_tra" | "eng+chi_tra" | "chi_tra+eng";

export type PageSelectionErrorCode =
  | "empty-token"
  | "invalid-token"
  | "non-positive"
  | "reversed-range"
  | "too-many-pages";

export class PageSelectionError extends Error {
  readonly code: PageSelectionErrorCode;

  constructor(code: PageSelectionErrorCode) {
    super("Select pages with positive numbers or ascending ranges, for example 1,3-5.");
    this.name = "PageSelectionError";
    this.code = code;
  }
}

/** Parse the human-facing 1-based page selector into the API's page array. */
export function parsePageSelection(input: string): number[] | undefined {
  const value = input.trim();
  if (!value) return undefined;

  const pages = new Set<number>();
  for (const rawToken of value.split(",")) {
    const token = rawToken.trim();
    if (!token) throw new PageSelectionError("empty-token");
    const match = /^(\d+)(?:\s*-\s*(\d+))?$/.exec(token);
    if (!match) throw new PageSelectionError("invalid-token");

    const start = Number(match[1]);
    const end = Number(match[2] ?? match[1]);
    if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start < 1 || end < 1) {
      throw new PageSelectionError("non-positive");
    }
    if (end < start) throw new PageSelectionError("reversed-range");
    for (let page = start; page <= end; page += 1) {
      pages.add(page);
      if (pages.size > 200) throw new PageSelectionError("too-many-pages");
    }
  }

  return [...pages].sort((a, b) => a - b);
}

export type PdfTable = {
  page: number;
  table: number;
  method: string;
  rows: string[][];
};

export type DxfUnits = "unitless" | "inch" | "mm" | "cm" | "m";

export type TablePreviewResponse = {
  stats: Record<string, unknown>;
  tables: PdfTable[];
};

export type BatchCompressionStats = {
  files: number;
  input_bytes: number;
  output_bytes: number;
};

export type BatchCompressionResult = {
  blob: Blob;
  stats: BatchCompressionStats | null;
};

type BatchCompressionOptions = {
  quality?: number;
  maxWidth?: number;
  maxHeight?: number;
  outputFormat?: "auto" | "jpeg" | "png" | "webp";
  signal?: AbortSignal;
};

export async function compressImages(
  baseUrl: string,
  files: File[],
  options: BatchCompressionOptions = {},
): Promise<Blob> {
  return (await compressImagesWithStats(baseUrl, files, options)).blob;
}

export async function compressImagesWithStats(
  baseUrl: string,
  files: File[],
  options: BatchCompressionOptions = {},
): Promise<BatchCompressionResult> {
  if (!files.length) throw new Error("Please choose at least one image.");
  const form = new FormData();
  for (const file of files) form.append("files", file);
  form.append("quality", String(options.quality ?? 82));
  if (options.maxWidth != null) form.append("max_width", String(options.maxWidth));
  if (options.maxHeight != null) form.append("max_height", String(options.maxHeight));
  form.append("output_format", options.outputFormat ?? "auto");

  return fetchBlobWithStats(`${normalizeBaseUrl(baseUrl)}/api/images/compress-batch`, {
    method: "POST",
    body: form,
    signal: options.signal,
  });
}

export async function pdfToWord(
  baseUrl: string,
  file: File,
  options: {
    ocrMode?: OcrMode;
    ocrLang?: OcrLang;
    includeImages?: boolean;
    signal?: AbortSignal;
  } = {},
): Promise<Blob> {
  const form = new FormData();
  form.append("file", file);
  form.append("ocr_mode", options.ocrMode ?? "auto");
  form.append("ocr_lang", options.ocrLang ?? "eng");
  form.append("include_images", String(options.includeImages ?? true));

  return fetchBlob(`${normalizeBaseUrl(baseUrl)}/api/pdf/to-word`, {
    method: "POST",
    body: form,
    signal: options.signal,
  });
}

export async function previewPdfTables(
  baseUrl: string,
  file: File,
  options: {
    pages?: number[];
    ocrMode?: OcrMode;
    ocrLang?: OcrLang;
    signal?: AbortSignal;
  } = {},
): Promise<TablePreviewResponse> {
  const form = new FormData();
  form.append("file", file);
  if (options.pages?.length) form.append("pages", options.pages.join(","));
  form.append("ocr_mode", options.ocrMode ?? "auto");
  form.append("ocr_lang", options.ocrLang ?? "eng");

  const res = await fetch(`${normalizeBaseUrl(baseUrl)}/api/pdf/table-preview`, {
    method: "POST",
    body: form,
    signal: options.signal,
  });
  if (!res.ok) throw new Error(await readApiError(res));
  return (await res.json()) as TablePreviewResponse;
}

export async function pdfTablesToExcel(
  baseUrl: string,
  file: File,
  options: {
    pages?: number[];
    ocrMode?: OcrMode;
    ocrLang?: OcrLang;
    signal?: AbortSignal;
  } = {},
): Promise<Blob> {
  const form = new FormData();
  form.append("file", file);
  if (options.pages?.length) form.append("pages", options.pages.join(","));
  form.append("ocr_mode", options.ocrMode ?? "auto");
  form.append("ocr_lang", options.ocrLang ?? "eng");

  return fetchBlob(`${normalizeBaseUrl(baseUrl)}/api/pdf/table-to-excel`, {
    method: "POST",
    body: form,
    signal: options.signal,
  });
}

export async function exportEditedTables(
  baseUrl: string,
  tables: PdfTable[],
  signal?: AbortSignal,
): Promise<Blob> {
  return fetchBlob(`${normalizeBaseUrl(baseUrl)}/api/pdf/export-tables`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tables }),
    signal,
  });
}

export async function imageToDxf(
  baseUrl: string,
  file: File,
  options: {
    threshold?: number;
    invert?: boolean;
    blur?: number;
    epsilonRatio?: number;
    minArea?: number;
    unitsPerPixel?: number;
    calibrationPixelDistance?: number;
    calibrationRealDistance?: number;
    units?: DxfUnits;
    signal?: AbortSignal;
  } = {},
): Promise<Blob> {
  const form = new FormData();
  form.append("file", file);
  form.append("threshold", String(options.threshold ?? 180));
  form.append("invert", String(options.invert ?? false));
  form.append("blur", String(options.blur ?? 3));
  form.append("epsilon_ratio", String(options.epsilonRatio ?? 0.0025));
  form.append("min_area", String(options.minArea ?? 20));
  form.append("units", options.units ?? "unitless");
  if (options.unitsPerPixel != null) form.append("units_per_pixel", String(options.unitsPerPixel));
  if (options.calibrationPixelDistance != null) {
    form.append("calibration_pixel_distance", String(options.calibrationPixelDistance));
  }
  if (options.calibrationRealDistance != null) {
    form.append("calibration_real_distance", String(options.calibrationRealDistance));
  }

  return fetchBlob(`${normalizeBaseUrl(baseUrl)}/api/image/to-dxf`, {
    method: "POST",
    body: form,
    signal: options.signal,
  });
}

export async function compressPdf(
  baseUrl: string,
  file: File,
  preset: "lossless" | "balanced" | "strong" = "balanced",
  signal?: AbortSignal,
): Promise<Blob> {
  const form = new FormData();
  form.append("file", file);
  form.append("preset", preset);
  return fetchBlob(`${normalizeBaseUrl(baseUrl)}/api/pdf/compress`, {
    method: "POST",
    body: form,
    signal,
  });
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function pixelDistance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.hypot(x2 - x1, y2 - y1);
}

async function fetchBlob(url: string, init: RequestInit): Promise<Blob> {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(await readApiError(res));
  return res.blob();
}

async function fetchBlobWithStats(url: string, init: RequestInit): Promise<BatchCompressionResult> {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(await readApiError(res));
  return {
    blob: await res.blob(),
    stats: parseBatchCompressionStats(res.headers.get("X-Funnytools-Stats")),
  };
}

function parseBatchCompressionStats(value: string | null): BatchCompressionStats | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value) as Partial<BatchCompressionStats>;
    const files = parsed.files;
    const inputBytes = parsed.input_bytes;
    const outputBytes = parsed.output_bytes;
    if (
      typeof files === "number" && Number.isSafeInteger(files) && files >= 0
      && typeof inputBytes === "number" && Number.isSafeInteger(inputBytes) && inputBytes >= 0
      && typeof outputBytes === "number" && Number.isSafeInteger(outputBytes) && outputBytes >= 0
    ) {
      return {
        files,
        input_bytes: inputBytes,
        output_bytes: outputBytes,
      };
    }
  } catch {
    // A missing or malformed optional header must not break the binary download.
  }
  return null;
}

function normalizeBaseUrl(baseUrl: string): string {
  return baseUrl.replace(/\/+$/, "");
}

async function readApiError(res: Response): Promise<string> {
  try {
    const data = (await res.json()) as { detail?: string };
    return data.detail || `HTTP ${res.status}`;
  } catch {
    return `HTTP ${res.status}`;
  }
}
