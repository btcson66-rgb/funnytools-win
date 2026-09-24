#!/usr/bin/env python3
"""Crawl every declared sitemap URL and compare it with a local Astro build."""

import argparse
import csv
import json
import re
from collections import Counter, defaultdict
from pathlib import Path
from urllib.parse import urljoin, urlparse
from xml.etree import ElementTree

import requests
from bs4 import BeautifulSoup

ORIGIN = "https://funnytools.win"
UA = "FunnyToolsOwnerAudit/002 (+https://funnytools.win/contact/)"
PLACEHOLDER = re.compile(r"\b(?:TODO|TBD|lorem ipsum|placeholder|FIXME)\b", re.I)
VERSION = re.compile(r"\bv\d+\.\d+\.\d+\b")


def locale(path):
    if path.startswith("/en/") or path == "/en":
        return "en"
    if path.startswith("/es/") or path == "/es":
        return "es"
    if path.startswith("/fr/") or path == "/fr":
        return "fr"
    return "zh"


def route_for_file(path, dist):
    relative = path.relative_to(dist).as_posix()
    if relative == "404.html":
        return "/404/"
    if relative == "index.html":
        return "/"
    if relative.endswith("/index.html"):
        return "/" + relative[: -len("index.html")]
    return "/" + relative[: -len(".html")] + "/"


def head_value(soup, name):
    tag = soup.find("meta", attrs={"name": name})
    return tag.get("content", "").strip() if tag else ""


def canonical_value(soup):
    tag = soup.find("link", rel=lambda value: value and "canonical" in value)
    return tag.get("href", "").strip() if tag else ""


def get_xml_urls(session, fetch_base):
    visited = set()
    children = []
    urls = []

    def visit(path):
        if path in visited:
            return
        visited.add(path)
        response = session.get(urljoin(fetch_base, path), timeout=25)
        response.raise_for_status()
        for child in children:
            if urlparse(child["url"]).path == path:
                child["status"] = response.status_code
        root = ElementTree.fromstring(response.content)
        locations = [node.text.strip() for node in root.iter() if node.tag.endswith("}loc") and node.text]
        if root.tag.endswith("}sitemapindex"):
            for location in locations:
                child_path = urlparse(location).path
                children.append({"url": location, "status": None})
                visit(child_path)
        else:
            urls.extend(locations)

    visit("/sitemap.xml")
    return children, list(dict.fromkeys(urls))


def inventory(dist):
    routes = {}
    for path in dist.rglob("*.html"):
        route = route_for_file(path, dist)
        soup = BeautifulSoup(path.read_text(encoding="utf-8", errors="replace"), "html.parser")
        robots = head_value(soup, "robots")
        refresh = soup.find("meta", attrs={"http-equiv": re.compile("refresh", re.I)})
        routes[route] = {
            "path": str(path),
            "locale": locale(route),
            "robots": robots,
            "canonical": canonical_value(soup),
            "redirect": bool(refresh),
            "lang": soup.html.get("lang", "") if soup.html else "",
        }
    return routes


def crawl(session, fetch_base, urls):
    rows = []
    link_targets = set()
    for index, url in enumerate(urls, 1):
        path = urlparse(url).path
        try:
            response = session.get(urljoin(fetch_base, path), timeout=30, allow_redirects=True)
            soup = BeautifulSoup(response.content.decode("utf-8", errors="replace"), "html.parser")
            title = soup.title.get_text(" ", strip=True) if soup.title else ""
            description = head_value(soup, "description")
            h1 = [tag.get_text(" ", strip=True) for tag in soup.find_all("h1")]
            canonical = canonical_value(soup)
            robots = head_value(soup, "robots")
            hreflang = [
                {"lang": tag.get("hreflang", ""), "href": tag.get("href", "")}
                for tag in soup.find_all("link", rel=lambda value: value and "alternate" in value)
                if tag.get("hreflang")
            ]
            links = []
            for tag in soup.find_all("a", href=True):
                target = urljoin(url, tag["href"])
                parsed = urlparse(target)
                if parsed.netloc != urlparse(ORIGIN).netloc:
                    continue
                target_path = parsed.path or "/"
                link_targets.add(target_path)
                links.append({
                    "target": target_path,
                    "target_locale": locale(target_path),
                    "text": tag.get_text(" ", strip=True)[:120],
                    "language_switch": bool(tag.find_parent(attrs={"data-lang-switch": True}) or tag.get("hreflang")),
                })
            main = soup.find("main") or soup.body or soup
            visible = main.get_text(" ", strip=True)
            han = len(re.findall(r"[\u4e00-\u9fff]", visible))
            letters = len(re.findall(r"[A-Za-z]", visible))
            source_locale = locale(path)
            mismatch = source_locale == "en" and han > 40 and han > letters * 0.10
            versions = sorted(set(VERSION.findall(soup.get_text(" ", strip=True))))
            rows.append({
                "url": url,
                "source_locale": source_locale,
                "http_status": response.status_code,
                "final_url": response.url,
                "redirect": response.url != urljoin(fetch_base, path),
                "title": title,
                "description": description,
                "h1": h1,
                "h1_count": len(h1),
                "canonical": canonical,
                "canonical_self": canonical == url,
                "robots": robots,
                "hreflang": hreflang,
                "lang": soup.html.get("lang", "") if soup.html else "",
                "internal_links": links,
                "internal_link_count": len(links),
                "cross_locale_links": [link for link in links if link["target_locale"] != source_locale],
                "visible_language_mismatch": mismatch,
                "placeholder_or_editorial_leak": bool(PLACEHOLDER.search(visible)),
                "versions": versions,
                "error": "",
            })
        except Exception as error:
            rows.append({"url": url, "http_status": 0, "error": str(error)})
        if index % 25 == 0:
            print(f"Crawled {index}/{len(urls)} sitemap URLs", flush=True)
    return rows, link_targets


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--fetch-base", default=ORIGIN)
    parser.add_argument("--dist", default="dist")
    parser.add_argument("--out", required=True)
    args = parser.parse_args()
    out = Path(args.out)
    out.parent.mkdir(parents=True, exist_ok=True)
    dist = Path(args.dist)
    session = requests.Session()
    session.headers.update({"User-Agent": UA, "Accept-Language": "zh-TW,zh;q=0.9,en;q=0.8"})
    children, sitemap_urls = get_xml_urls(session, args.fetch_base)
    routes = inventory(dist)
    rows, targets = crawl(session, args.fetch_base, sitemap_urls)
    target_results = {}
    for path in sorted(targets):
        try:
            response = session.get(urljoin(args.fetch_base, path), timeout=20, allow_redirects=True)
            target_results[path] = {"status": response.status_code, "final_url": response.url}
        except Exception as error:
            target_results[path] = {"status": 0, "error": str(error)}
    for row in rows:
        if "internal_links" not in row:
            continue
        row["broken_links"] = [link for link in row["internal_links"] if target_results.get(link["target"], {}).get("status", 0) >= 400 or target_results.get(link["target"], {}).get("status", 0) == 0]
    titles = defaultdict(list)
    canonicals = defaultdict(list)
    for row in rows:
        if row.get("title"):
            titles[row["title"]].append(row["url"])
        if row.get("canonical"):
            canonicals[row["canonical"]].append(row["url"])
    for row in rows:
        row["duplicate_title"] = len(titles[row["title"]]) > 1 if row.get("title") else False
        row["duplicate_canonical"] = len(canonicals[row["canonical"]]) > 1 if row.get("canonical") else False
    sitemap_paths = {urlparse(url).path for url in sitemap_urls}
    route_paths = set(routes)
    summary = {
        "fetch_base": args.fetch_base,
        "sitemap_index": ORIGIN + "/sitemap.xml",
        "sitemap_children": children,
        "sitemap_url_count": len(sitemap_urls),
        "sitemap_urls": sitemap_urls,
        "built_route_count": len(routes),
        "built_route_locales": dict(Counter(item["locale"] for item in routes.values())),
        "built_noindex_count": sum("noindex" in item["robots"].lower() for item in routes.values()),
        "built_redirect_count": sum(item["redirect"] for item in routes.values()),
        "built_routes_not_in_sitemap": sorted(route_paths - sitemap_paths),
        "sitemap_routes_not_built": sorted(sitemap_paths - route_paths),
        "statuses": dict(Counter(row["http_status"] for row in rows)),
        "broken_link_count": sum(len(row.get("broken_links", [])) for row in rows),
        "cross_locale_link_count": sum(len(row.get("cross_locale_links", [])) for row in rows),
        "visible_language_mismatch_count": sum(bool(row.get("visible_language_mismatch")) for row in rows),
        "duplicate_title_count": sum(bool(row.get("duplicate_title")) for row in rows),
        "duplicate_canonical_count": sum(bool(row.get("duplicate_canonical")) for row in rows),
        "versions": dict(Counter(version for row in rows for version in row.get("versions", []))),
        "link_targets": target_results,
    }
    json_path = out.with_suffix(".json")
    csv_path = out.with_suffix(".csv")
    md_path = out.with_suffix(".md")
    json_path.write_text(json.dumps({"summary": summary, "rows": rows}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    fields = ["url", "source_locale", "http_status", "final_url", "redirect", "title", "description", "h1_count", "h1", "canonical", "canonical_self", "robots", "hreflang", "lang", "internal_link_count", "broken_links", "cross_locale_links", "visible_language_mismatch", "placeholder_or_editorial_leak", "duplicate_title", "duplicate_canonical", "versions", "error"]
    with csv_path.open("w", newline="", encoding="utf-8-sig") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields)
        writer.writeheader()
        for row in rows:
            writer.writerow({field: json.dumps(row.get(field), ensure_ascii=False) if isinstance(row.get(field), (list, dict)) else row.get(field, "") for field in fields})
    md_path.write_text("\n".join([
        "# FunnyTools full crawl 002",
        "",
        f"Fetch base: `{args.fetch_base}`",
        f"Sitemap URLs individually crawled: **{len(rows)}/{len(sitemap_urls)}**",
        f"Sitemap children: {len(children)}; built routes: {len(routes)}; noindex built routes: {summary['built_noindex_count']}; redirect stubs: {summary['built_redirect_count']}",
        f"HTTP statuses: `{summary['statuses']}`",
        f"Built routes outside sitemap: {len(summary['built_routes_not_in_sitemap'])}; sitemap paths without build: {len(summary['sitemap_routes_not_built'])}",
        f"Broken internal links: {summary['broken_link_count']}; cross-locale links: {summary['cross_locale_link_count']}; visible-language flags: {summary['visible_language_mismatch_count']}",
        f"Duplicate titles: {summary['duplicate_title_count']}; duplicate canonicals: {summary['duplicate_canonical_count']}",
        f"Visible versions: `{summary['versions']}`",
        "",
        "## Exceptions",
        *[f"- `{row['url']}`: status={row.get('http_status')}, broken={len(row.get('broken_links', []))}, cross-locale={len(row.get('cross_locale_links', []))}, canonical_self={row.get('canonical_self')}, language_flag={row.get('visible_language_mismatch')}" for row in rows if row.get("http_status") != 200 or row.get("broken_links") or row.get("cross_locale_links") or not row.get("canonical_self", False) or row.get("visible_language_mismatch")],
        "",
    ]), encoding="utf-8")
    print(json.dumps({key: value for key, value in summary.items() if key not in ("sitemap_urls", "built_routes_not_in_sitemap", "sitemap_routes_not_built", "link_targets")}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
