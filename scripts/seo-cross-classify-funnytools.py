import csv,json,pathlib,re
from urllib.parse import urlparse
base=pathlib.Path('docs/seo')
rows=json.loads((base/'evidence/production-final/pages.json').read_text(encoding='utf-8'))
policy=pathlib.Path('src/lib/indexPolicy.ts').read_text(encoding='utf-8')
allowed=set(re.findall(r"^  '([^']+)'",policy,re.M))
columns=['site','url','http_status','indexable','meta_robots','x_robots','canonical','in_sitemap','incoming_links','language','page_type','bing_status','recommended_state','reason']
for row in rows:
    path=urlparse(row['url']).path
    if path in allowed:
        row['recommended_state']='SHOULD_INDEX'
        row['reason']='Explicit 21-URL T2 allowlist src/lib/indexPolicy.ts and BaseLayout enforcement; canonical indexable 200. PDF owner reopened by approved W40 v5.148.0.' if path=='/tools/merge-pdf/' else 'Explicit 21-URL T2 allowlist src/lib/indexPolicy.ts; BaseLayout enforces canonical indexability. Preserve existing owner.'
    elif 'noindex' in (row['meta_robots']+' '+row['x_robots']).lower():
        row['recommended_state']='INTENTIONAL_NOINDEX'
        row['reason']='T2 index consolidation: outside src/lib/indexPolicy.ts allowlist; src/layouts/BaseLayout.astro shouldNoindex preserves available utility/content without reopening search ownership.'
        if path.startswith(('/en/','/es/','/fr/')): row['reason']+=' Locale remains excluded; no approved locale index reopening.'
        elif path.startswith('/blog/'): row['reason']+=' Blog template also explicitly noindex.'
    else:
        row['recommended_state']='UNKNOWN'
        row['reason']='Needs source-policy review; no automatic indexability change.'
with (base/'INDEXABILITY-MATRIX-2026-10.csv').open('w',encoding='utf-8-sig',newline='') as f:
    w=csv.DictWriter(f,fieldnames=columns,extrasaction='ignore'); w.writeheader();w.writerows(rows)
print('Classified',len(rows),'rows;',sum(r['recommended_state']=='INTENTIONAL_NOINDEX' for r in rows),'intentional noindex')
