import routeRegistry from './expansion-routes.json';

// P1 (2026-10-15): the es/fr locales were removed from the site, so the route
// registry now only pairs the zh-TW and en versions of the same page. The file
// name is kept so existing imports keep working; it is no longer an
// "expansion" registry.
export type RouteLocale = 'zh' | 'en';

interface RouteEntry {
  key: string;
  type: 'home' | 'tool' | 'page' | 'guide' | 'workflow' | 'category';
  paths: Partial<Record<RouteLocale, string>>;
}

const routes = routeRegistry.routes as RouteEntry[];
const hreflangByLocale: Record<RouteLocale, string> = {
  zh: 'zh-TW',
  en: 'en',
};

function normalizePath(pathname: string): string {
  if (!pathname) return '/';
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return path.endsWith('/') ? path : `${path}/`;
}

export function expansionRouteByKey(key: string): RouteEntry | undefined {
  return routes.find((route) => route.key === key);
}

export function expansionRouteByPath(pathname: string): RouteEntry | undefined {
  const normalized = normalizePath(pathname);
  return routes.find((route) =>
    Object.values(route.paths).some((path) => path && normalizePath(path) === normalized),
  );
}

export function routePath(key: string, locale: RouteLocale): string | undefined {
  return expansionRouteByKey(key)?.paths[locale];
}

export function routeAlternates(pathname: string) {
  const route = expansionRouteByPath(pathname);
  if (!route) return [];

  const links = (Object.entries(route.paths) as [RouteLocale, string][])
    .filter(([, path]) => Boolean(path))
    .map(([locale, path]) => ({
      hreflang: hreflangByLocale[locale],
      href: path,
    }));
  const defaultPath = route.paths.en ?? route.paths.zh;

  return defaultPath
    ? [...links, { hreflang: 'x-default', href: defaultPath }]
    : links;
}

export const expansionRoutesReviewedAt = routeRegistry.reviewedAt;
