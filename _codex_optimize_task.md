# TASK: Optimize Free Tools Hub (funnytools.win) — UI polish, UX, legal/compliance, SEO

You are improving an existing, LIVE Astro static site. The repo already builds 194 pages cleanly.
Your job is to make it (1) prettier and more click-worthy, (2) simpler/easier to use, (3) legally
complete/safe (esp. for Google AdSense + GDPR/CCPA), and (4) slightly better for SEO — WITHOUT
breaking anything.

## HARD GUARDRAILS (do not violate — these protect a production site)
- This is a static Astro site, NO UI framework. Keep widgets as vanilla JS. Do NOT add React/Vue/Tailwind/any dependency. Do NOT change package.json deps.
- KEEP the existing brand identity: brand mark "⌘", site names ("免費工具箱" / "Free Tools Hub"),
  and the teal→blue→coral gradient family. Refine, do NOT replace the brand.
- DO NOT touch these invariants: astro.config base must stay '/', SITE.url stays 'https://funnytools.win',
  public/CNAME, the [lang] routing, the embed system (src/pages/[lang]/embed, EmbedLayout, EmbedCode),
  sitemap.xml.ts, robots, JSON-LD/hreflang/canonical logic.
- Monetization stays OFF: do NOT flip any flag in src/config/site.ts (adsenseEnabled=false, features.*=false).
  Do NOT add adsbygoogle markup. Verify none appears in built output.
- Preserve ALL 45 live tools and every tool widget exactly as-is (their internal logic, IDs, results).
  Do NOT edit files under src/components/tools/** or src/i18n/tools/**.
- After your changes, `npm run build` MUST complete with "194 page(s) built" and "Complete!" and zero ERROR.
- Keep accessibility: skip-link, focus-visible outlines, aria labels, 4.5:1 contrast minimum, 44px touch targets.
- All UI text must be bilingual via the existing i18n files (src/i18n/ui.ts), never hardcode user-facing strings in components except where already done.

## CONTEXT (files you will touch)
- src/styles/global.css — single global stylesheet (refine here)
- src/pages/[lang]/index.astro — homepage
- src/pages/[lang]/tools/index.astro — "all tools" listing
- src/components/ToolCard.astro, Nav.astro, Footer.astro
- src/data/categories.ts — category metadata (one stale "planned" description to fix)
- src/data/tools.ts — tool registry (has helpers liveTools, getToolsByCategory; DO NOT edit tool entries, only ADD a helper if needed)
- src/i18n/ui.ts — UI strings (zh + en)
- src/i18n/pages.ts — home/about/privacy/terms/disclaimer copy (REPLACE bodies with exact text in section 5 below)
- src/layouts/BaseLayout.astro — <head> meta
- src/layouts/PageLayout.astro — legal/info page layout

Data facts: 45 live tools, 7 categories (money 6, time 7, random 9, text 9, image 5, fun 4, study 5), 0 planned.

---

## 1) VISUAL / UI POLISH (global.css + small markup)
Apply tasteful, modern (2024+) refinements. Keep it fast and clean — no gratuitous animation.
- Increase card/tile/button border-radius from 8px to 14px (inputs/badges proportionally; keep pills at 999px).
- HERO upgrade: give the hero a subtle decorative background (a soft radial/blurred gradient glow using the
  existing --brand/--brand-2/--accent at low opacity, behind the text, must not reduce text contrast).
  Add a "stat band" row under the hero CTAs: three chips/stats rendered with DYNAMIC values so they never
  go stale: (a) `${liveTools.length}+` tools, (b) `${categories.length}` categories, (c) a static
  "免註冊・免安裝" / "No sign-up · No install" chip. Use the i18n keys you add (see section 4).
- Category tiles + tool tiles: add a soft tinted icon background and a clearer hover lift. Give each
  category tile a small live tool COUNT badge (e.g. "9 個工具" / "9 tools") computed via getToolsByCategory(id).length.
- Make the featured/tool grid feel like a light "bento": consistent gaps, subtle shadow, crisp hover.
- Ensure dark text on light surfaces meets 4.5:1. Do not introduce a dark theme.
- Keep everything responsive; verify the 760px breakpoint still collapses grids to 1 column nicely.

## 2) UX — the big win: instant search/filter on the All Tools page
On src/pages/[lang]/tools/index.astro:
- Add a search input at the top ("搜尋工具…" / "Search tools…", with aria-label) that filters the tool
  tiles live as the user types (vanilla JS, no deps). Match against tool name + short description text.
- Render ALL live tools as tiles grouped by category (already grouped). Add `data-search` attributes
  (lowercased name + short) to each tile wrapper so the script can filter. Hide a category section's
  heading when it has zero visible matches. Show a "找不到符合的工具" / "No tools match your search"
  message when nothing matches.
- Keep it accessible: input is a real <input type="search">, results update without page reload, and
  it must work with zero JS too (all tiles visible by default; the script only filters).
- Put the small filter script inline in this page (or a tiny <script> at the bottom). Keep it minimal.
Also: on the homepage, change the secondary CTA so "瀏覽分類 / Browse categories" still anchors to #categories
(leave the search on the tools page).

## 3) NAV / FOOTER polish
- Footer: add a one-line disclaimer note above the copyright, using a NEW i18n key footer.legalNote:
  zh: "本站工具結果僅供參考，不構成法律、醫療、投資或稅務建議。"
  en: "Tool results are for reference only and are not legal, medical, investment, or tax advice."
- Footer: keep the existing about/contact/privacy/terms/disclaimer links.
- Nav: no structural change required; just ensure it still looks good with the new radius/colors.

## 4) NEW i18n KEYS (add to src/i18n/ui.ts, BOTH zh and en)
Add under each locale:
- hero stat labels:
  zh: heroStats: { toolsLabel: '免費工具', categoriesLabel: '工具分類', noSignup: '免註冊・免安裝' }
  en: heroStats: { toolsLabel: 'free tools', categoriesLabel: 'categories', noSignup: 'No sign-up · No install' }
- tools page search:
  zh: toolsSearch: { placeholder: '搜尋工具…', label: '搜尋工具', empty: '找不到符合的工具，換個關鍵字試試。' }
  en: toolsSearch: { placeholder: 'Search tools…', label: 'Search tools', empty: 'No tools match your search. Try another keyword.' }
- category count suffix:
  zh: toolsCountSuffix: ' 個工具'    (used as `${n}${suffix}`)
  en: toolsCountSuffix: ' tools'
- footer.legalNote (see section 3)
Wire these into the components. Keep the `as const` and the `t()` export working.

## 5) LEGAL / COMPLIANCE — REPLACE these bodies in src/i18n/pages.ts EXACTLY
This is the most important part for avoiding legal problems and passing AdSense review. Use the EXACT
text below (do not paraphrase, do not add claims). `body` is a string[] — one array element per paragraph.
Keep the InfoPageContent shape and the `satisfies` typing. Keep `${SITE.email}` interpolation where shown.

### home.zh.intro  (replace the single string)
把薪資、貸款、計時、文字、隨機抽選與趣味測驗等日常工具整理在同一個地方，全部免費、免安裝、免註冊，打開網頁就能用。

### home.zh.seoTitle
免費工具箱｜免費線上工具大全（薪資 / 貸款 / 計時 / 文字 / 測驗）

### home.zh.seoDescription
45+ 種免費線上工具：薪資加班費試算、貸款與複利、番茄鐘與倒數、字數統計、隨機抽選與趣味測驗。免安裝、免註冊，手機與電腦都能用。

### home.en.intro
Everyday tools for salary, loans, timing, text, random picks, and quizzes — all in one place. Free, no install, no sign-up. Just open the page and go.

### home.en.seoTitle
Free Tools Hub | 45+ free online tools (salary, loans, timers, text)

### home.en.seoDescription
45+ free browser tools: salary & overtime, loan & compound interest, Pomodoro & countdown, word counter, random pickers, and quizzes. No install, no sign-up, works on mobile and desktop.

### pages.zh.about.body  (array)
- 免費工具箱（Free Tools Hub）是一個免費、免安裝、免註冊的線上工具網站，把工作、學習、金錢與日常生活常用的小工具整理在乾淨、好讀、手機友善的頁面中。
- 目前已上線超過 40 種工具，涵蓋薪資與金錢、工作與時間、隨機工具、文字與寫作、圖片與檔案、趣味測驗、學生與老師等分類，並會持續新增。
- 大多數工具直接在你的瀏覽器本機執行，不需要建立帳號，也不會把你輸入的內容上傳到伺服器。我們的目標是讓工具好上手、載入快、不打擾。
- 如果你有工具建議或想回報問題，歡迎來信 ${SITE.email}。

### pages.zh.privacy.body  (array)
- 生效日期：2026 年 6 月 16 日。本隱私權政策說明免費工具箱（funnytools.win，以下稱「本站」）如何處理你的資料。
- 本站是靜態網站，所有工具預設在你的瀏覽器本機執行。你在工具中輸入的文字、數字、名單與設定不會傳送到本站伺服器，本站也不會儲存這些內容、不要求註冊，也不建立會員帳號。
- 本機儲存：部分工具會使用瀏覽器的 localStorage 儲存你的偏好設定（例如番茄鐘的時間長度），這些資料只留在你的裝置上，你可以隨時透過清除瀏覽器資料移除。
- Cookie 與廣告：本站目前未啟用 Google AdSense 或任何第三方廣告。未來若啟用廣告，Google 及其他第三方供應商可能會使用 Cookie，依你先前造訪本站或其他網站的紀錄放送個人化廣告。你可前往 Google 廣告設定（google.com/settings/ads）關閉個人化廣告，或前往 aboutads.info 了解第三方供應商 Cookie 的選擇退出方式。屆時本頁會更新對應說明。
- 第三方連結：本站可能包含指向外部網站的連結，這些網站有各自的隱私權政策，本站不對其內容或做法負責。
- 兒童隱私：本站並非以兒童為對象，且不會在知情情況下蒐集未滿 16 歲兒童的個人資料。
- 你的權利：由於本站預設不蒐集可識別個人身分的資料，通常沒有可供存取或刪除的個人資料。若你位於歐盟 / 英國（GDPR）或加州（CCPA / CPRA）等地區並對資料處理有疑問，可透過下方聯絡方式與我們聯繫。
- 安全提醒：請避免在任何線上工具中輸入高度敏感的個人資料、密碼、金融帳號或機密資訊。
- 政策更新：本站可能不定期更新本政策，重大變更會更新本頁生效日期。如有疑問請來信 ${SITE.email}。

### pages.zh.terms.body  (array)
- 生效日期：2026 年 6 月 16 日。使用免費工具箱（funnytools.win）即表示你同意本使用條款。
- 服務說明：本站提供免費、免安裝的線上小工具，僅供一般資訊與日常便利之用。
- 「依現狀」提供：本站工具與內容均以「現狀」與「現有」基礎提供，不附任何明示或默示之擔保，包括但不限於適售性、特定用途之適用性與不侵權。我們不保證工具結果完全準確、不中斷或無錯誤。
- 責任限制：在法律允許的最大範圍內，對於因使用或無法使用本站所造成之任何直接、間接、附帶或衍生性損害，本站均不負賠償責任。
- 可接受使用：你同意以合法方式使用本站，不得從事干擾網站運作、嘗試入侵、大量自動化抓取或其他濫用行為。
- 智慧財產權：本站名稱、設計、程式碼與內容受著作權等智慧財產權保護；你可正常使用工具，但不得未經授權重製或散布本站內容。提供「嵌入」功能的工具，請依嵌入頁面的說明使用。
- 第三方服務：本站未來可能整合第三方服務（例如廣告或分析），這些服務有其自身條款與政策。
- 變更：我們可能隨時調整工具、分類、功能或本條款；重大變更會更新本頁生效日期。
- 準據法：本條款依中華民國（台灣）法律解釋與適用。
- 聯絡：如有任何問題，請來信 ${SITE.email}。

### pages.zh.disclaimer.body  (array)
- 生效日期：2026 年 6 月 16 日。本站提供的所有結果僅供一般參考，使用前請自行判斷並驗證。
- 非專業建議：本站不提供法律、醫療、投資、稅務、會計或其他專業建議。
- 財務 / 薪資 / 貸款類工具：薪資、加班費、貸款、複利、稅務等計算採用你輸入的參數與一般公式，結果為概估，可能因法規調整、實際條件或四捨五入而與官方或金融機構之計算不同；正式金額請以主管機關公告或專業人士意見為準。
- 健康類工具：BMI、壓力測驗等僅供自我參考，並非醫療診斷工具，不能取代醫師或專業人員的評估。
- 趣味測驗：性格與趣味測驗僅供娛樂與自我探索，不具科學或臨床效力。
- 隨機工具：隨機抽選結果不應用於法律上具拘束力之抽獎、博弈或其他須符合特定法規的用途。
- 責任歸屬：你依本站工具結果所做的任何決策與後續行動，皆由你自行負責。

### pages.en.about.body  (array)
- Free Tools Hub is a free, no-install, no-sign-up website that gathers everyday tools for work, study, money, and daily life into clean, readable, mobile-friendly pages.
- More than 40 tools are live, spanning Money & Salary, Work & Time, Random, Text & Writing, Image & File, Personality & Fun, and Student & Teacher, with more added over time.
- Most tools run locally in your browser, require no account, and do not upload what you enter to a server. The goal is tools that are easy to use, fast to load, and free of clutter.
- For tool suggestions or bug reports, email ${SITE.email}.

### pages.en.privacy.body  (array)
- Effective date: June 16, 2026. This Privacy Policy explains how Free Tools Hub (funnytools.win, the "Site") handles your data.
- The Site is static, and all tools run locally in your browser by default. The text, numbers, lists, and settings you enter are not sent to a Free Tools Hub server, are not stored by us, and no account or registration is required.
- Local storage: Some tools use your browser's localStorage to remember preferences (such as Pomodoro lengths). That data stays on your device and can be removed any time by clearing your browser data.
- Cookies and advertising: The Site currently runs no Google AdSense or any third-party ads. If advertising is enabled later, Google and other third-party vendors may use cookies to serve personalized ads based on your prior visits to this and other sites. You can opt out of personalized advertising at Google Ads Settings (google.com/settings/ads), or learn about third-party vendor cookies at aboutads.info. This page will be updated when that happens.
- Third-party links: The Site may link to external websites that have their own privacy policies; we are not responsible for their content or practices.
- Children's privacy: The Site is not directed to children and does not knowingly collect personal data from children under 16.
- Your rights: Because the Site does not collect personally identifiable information by default, there is usually no personal data to access or delete. If you are in the EU/UK (GDPR) or California (CCPA/CPRA) and have questions about data handling, contact us using the details below.
- Safety reminder: Please avoid entering highly sensitive personal data, passwords, financial account numbers, or confidential information into any online tool.
- Updates: We may update this policy from time to time and will revise the effective date above for material changes. Questions: ${SITE.email}.

### pages.en.terms.body  (array)
- Effective date: June 16, 2026. By using Free Tools Hub (funnytools.win), you agree to these Terms of Use.
- Service: The Site offers free, no-install online tools for general information and everyday convenience only.
- "As is": The tools and content are provided on an "as is" and "as available" basis, without warranties of any kind, express or implied, including merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that results are fully accurate, uninterrupted, or error-free.
- Limitation of liability: To the maximum extent permitted by law, the Site is not liable for any direct, indirect, incidental, or consequential damages arising from your use of, or inability to use, the Site.
- Acceptable use: You agree to use the Site lawfully and not to interfere with its operation, attempt to breach it, perform bulk automated scraping, or otherwise abuse it.
- Intellectual property: The Site name, design, code, and content are protected by copyright and other rights. You may use the tools normally but may not reproduce or redistribute Site content without authorization. For tools that offer an "embed" feature, follow the instructions on the embed page.
- Third-party services: The Site may integrate third-party services in the future (such as advertising or analytics), which have their own terms and policies.
- Changes: We may change tools, categories, features, or these Terms at any time; material changes will update the effective date above.
- Governing law: These Terms are interpreted under the laws of the Republic of China (Taiwan).
- Contact: For any questions, email ${SITE.email}.

### pages.en.disclaimer.body  (array)
- Effective date: June 16, 2026. All results from the Site are for general reference only; use your own judgment and verify before relying on them.
- Not professional advice: The Site does not provide legal, medical, investment, tax, accounting, or other professional advice.
- Financial / salary / loan tools: Salary, overtime, loan, compound-interest, and tax calculations use the parameters you enter and general formulas. Results are estimates and may differ from official or financial-institution figures due to regulatory changes, real conditions, or rounding; rely on official announcements or qualified professionals for binding amounts.
- Health tools: BMI, stress tests, and similar tools are for self-reference only, are not medical diagnostic tools, and do not replace evaluation by a physician or professional.
- Fun quizzes: Personality and fun quizzes are for entertainment and self-reflection only and have no scientific or clinical validity.
- Random tools: Random results should not be used for legally binding raffles, gambling, or other purposes subject to specific regulations.
- Responsibility: Any decisions and follow-up actions you take based on the tools are your own responsibility.

## 6) FIX STALE COPY in src/data/categories.ts
The "image" category description still implies it is planned/未上線. Replace BOTH locales:
- image.zh: 提供圖片壓縮、轉檔、調整尺寸與 QR Code 等常用檔案工具，全部在瀏覽器本機處理。
- image.en: Compress, convert, and resize images, plus QR codes and other handy file tasks — all processed locally in your browser.
(Do not change any other category text.)

## 7) SEO META
In src/layouts/BaseLayout.astro: add a `<meta name="twitter:image" content={ogImage} />` line next to the
existing twitter tags (ogImage is already computed). No other head changes.

## 8) VERIFY BEFORE YOU FINISH
Run: `npm run build`
It MUST print "194 page(s) built" and "Complete!" with no ERROR. If the count changed or there is any
error, fix it. Then grep the dist/ output to confirm NO "adsbygoogle" appears (monetization stays off).
Do not commit or push — leave that to the operator.

Report a concise summary of every file you changed and confirm the build result.
