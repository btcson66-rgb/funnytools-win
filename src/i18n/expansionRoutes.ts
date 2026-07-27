import routeRegistry from './expansion-routes.json';

export type ExpansionLocale = 'es' | 'fr' | 'de';
export type RouteLocale = 'zh' | 'en' | ExpansionLocale;

interface ExpansionRoute {
  key: string;
  type: 'home' | 'tool' | 'page';
  paths: Partial<Record<RouteLocale, string>>;
}

const routes = routeRegistry.routes as ExpansionRoute[];
const hreflangByLocale: Record<RouteLocale, string> = {
  zh: 'zh-TW',
  en: 'en',
  es: 'es',
  fr: 'fr',
  de: 'de',
};

function normalizePath(pathname: string): string {
  if (!pathname) return '/';
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return path.endsWith('/') ? path : `${path}/`;
}

export function expansionRouteByKey(key: string): ExpansionRoute | undefined {
  return routes.find((route) => route.key === key);
}

export function expansionRouteByPath(pathname: string): ExpansionRoute | undefined {
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
  const englishPath = route.paths.en;

  return englishPath
    ? [...links, { hreflang: 'x-default', href: englishPath }]
    : links;
}

export function publishedExpansionPaths(locale: ExpansionLocale): string[] {
  return routes
    .map((route) => route.paths[locale])
    .filter((path): path is string => Boolean(path));
}

export const expansionRoutesReviewedAt = routeRegistry.reviewedAt;
