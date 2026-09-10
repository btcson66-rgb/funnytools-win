import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

export const AMAZON_PRODUCT_CONTENT_PATH = '/data/amazon-product-content.json';

/**
 * The Creators API cache is generated at build time and is intentionally
 * optional. Only advertise it to the browser when the build input exists.
 */
export const getAmazonProductContentSource = (projectRoot = process.cwd()): string | undefined => {
  const relativePath = AMAZON_PRODUCT_CONTENT_PATH.replace(/^\//, '');
  return existsSync(resolve(projectRoot, 'public', relativePath))
    ? AMAZON_PRODUCT_CONTENT_PATH
    : undefined;
};
