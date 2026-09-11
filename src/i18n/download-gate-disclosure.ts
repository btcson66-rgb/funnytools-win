import type { Locale } from '../config/site';

type DownloadGateDisclosure = {
  description: string;
  privacyNote: string;
  sentLocal: string;
};

const disclosures: Record<Locale, Record<string, DownloadGateDisclosure>> = {
  zh: {
    'image-compressor': {
      description: '原圖在瀏覽器本機壓縮；若選擇寄送，產生的輸出檔可能由 FunnyTools 透過 Brevo 寄出。',
      privacyNote: '原圖不會為了壓縮而上傳。若使用寄送下載，產生的輸出檔（不超過 5 MiB）與你提供的電子郵件會送至 FunnyTools 的 Brevo 寄送流程；檔案過大、寄送失敗或網路不可用時，仍可在本機下載。電子郵件會儲存在本機瀏覽器以便下次使用；可依隱私政策或提供的方式要求退訂／刪除。',
      sentLocal: '檔案未寄送，已保留本機下載。',
    },
    'merge-pdf': {
      description: 'PDF 合併在瀏覽器本機完成；若選擇寄送，產生的合併檔可能由 FunnyTools 透過 Brevo 寄出。',
      privacyNote: '你選擇的原始 PDF 只在瀏覽器本機合併，不會為了合併而上傳。若使用寄送下載，產生的合併檔（不超過 5 MiB）與你提供的電子郵件會送至 FunnyTools 的 Brevo 寄送流程；檔案過大、寄送失敗或網路不可用時，仍可在本機下載。電子郵件會儲存在本機瀏覽器以便下次使用；可依隱私政策或提供的方式要求退訂／刪除。',
      sentLocal: '檔案未寄送，已保留本機下載。',
    },
    'qr-code-generator': {
      description: 'QR Code 輸入內容在瀏覽器本機產生；若選擇寄送，產生的 PNG 可能由 FunnyTools 透過 Brevo 寄出。',
      privacyNote: '你輸入的文字、網址與標誌檔案在瀏覽器本機處理。若使用寄送下載，產生的 PNG（不超過 5 MiB）與你提供的電子郵件會送至 FunnyTools 的 Brevo 寄送流程；檔案過大、寄送失敗或網路不可用時，仍可在本機下載。電子郵件會儲存在本機瀏覽器以便下次使用；可依隱私政策或提供的方式要求退訂／刪除。',
      sentLocal: 'PNG 未寄送，已保留本機下載。',
    },
  },
  en: {
    'image-compressor': {
      description: 'The original image is compressed in your browser; if you choose email delivery, the generated output may be sent by FunnyTools through Brevo.',
      privacyNote: 'The original image is not uploaded for compression. If you choose email delivery, the generated output (up to 5 MiB) and the email address you provide enter FunnyTools\' Brevo delivery flow; oversized files, delivery failures, and unavailable network access fall back to a local download. The email address is saved in this browser for reuse; you can request opt-out or deletion through the privacy policy or the provided contact method.',
      sentLocal: 'The file was not emailed; the local download remains available.',
    },
    'merge-pdf': {
      description: 'PDF merging runs in your browser; if you choose email delivery, the generated merged file may be sent by FunnyTools through Brevo.',
      privacyNote: 'The source PDFs are merged in your browser and are not uploaded for the merge. If you choose email delivery, the generated merged file (up to 5 MiB) and the email address you provide enter FunnyTools\' Brevo delivery flow; oversized files, delivery failures, and unavailable network access fall back to a local download. The email address is saved in this browser for reuse; you can request opt-out or deletion through the privacy policy or the provided contact method.',
      sentLocal: 'The file was not emailed; the local download remains available.',
    },
    'qr-code-generator': {
      description: 'QR input is processed in your browser; if you choose email delivery, the generated PNG may be sent by FunnyTools through Brevo.',
      privacyNote: 'The text, URL, and logo file are processed in your browser. If you choose email delivery, the generated PNG (up to 5 MiB) and the email address you provide enter FunnyTools\' Brevo delivery flow; oversized files, delivery failures, and unavailable network access fall back to a local download. The email address is saved in this browser for reuse; you can request opt-out or deletion through the privacy policy or the provided contact method.',
      sentLocal: 'The PNG was not emailed; the local download remains available.',
    },
  },
};

export function getDownloadGateDisclosure(lang: Locale, slug: string): DownloadGateDisclosure | null {
  return disclosures[lang][slug] ?? null;
}
