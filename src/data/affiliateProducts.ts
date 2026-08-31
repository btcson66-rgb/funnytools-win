/**
 * Affiliate product data contract.
 *
 * The editable catalog lives in public/data/support-products.json so the
 * client can load only the metadata needed for the current shelf. Keep this
 * type aligned with that JSON file; do not put private API credentials here.
 */
export type AffiliatePlatform = 'shopee' | 'coupang' | 'amazon' | string;

/** Active Taiwan-facing affiliate platforms; inactive catalog history may use other values. */
export const ACTIVE_AFFILIATE_PLATFORMS = ['shopee', 'coupang'] as const;
export const ACTIVE_AFFILIATE_PLATFORM_NAMES = {
  zh: '蝦皮與酷澎',
  en: 'Shopee and Coupang',
  es: 'Shopee o Coupang',
  fr: 'Shopee ou Coupang',
} as const;

export interface AffiliateProduct {
  id: string;
  platform: AffiliatePlatform;
  title: string;
  shortTitle?: string;
  affiliateUrl: string;
  imageUrl?: string;
  category: string;
  tags?: string[];
  priority?: number;
  enabled?: boolean;
  status?: 'active' | 'inactive' | string;
  optionalDescription?: string;
  optionalPriceLabel?: string;
  optionalSubId?: string;
  optionalCampaign?: string;
  description?: string;
  fallbackUrl?: string;
}

export const AFFILIATE_PRODUCTS_PATH = '/data/support-products.json';
