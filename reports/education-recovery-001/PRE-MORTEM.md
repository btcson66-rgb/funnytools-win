# FUNNYTOOLS-EDU-RECOVERY-001 事前驗屍

| # | 可能失敗方式 | 最早偵測訊號 | 結果 | 緩解措施 |
|---:|---|---|---|---|
| 1 | 新工具公式錯誤 | 黃金向量與手算不一致 | FAIL | 先測純函式，再接 UI |
| 2 | 權重模式混用 | 百分比與小數輸入產生不同合理值 | FAIL | 明示模式，不自動猜測 |
| 3 | KR-20 接受非二分資料 | 2、3 或空白值未被拒絕 | FAIL | 矩陣驗證與錯誤訊息 |
| 4 | 批次 CSV 解析錯位 | 欄數不一致仍有結果 | FAIL | 不規則列直接拒絕 |
| 5 | 教育頁再次變成單一主題 | 標題、lead 或導航只剩教育統計 | FAIL | 指南中心改為中性任務入口 |
| 6 | 英文頁露出繁中限定工具 | `/en/` 或 `/en/tools/` 出現新 slug | FAIL | locale 可用性過濾與 sitemap 檢查 |
| 7 | 新工具造成 hreflang 虛假對應 | zh-only URL 有 en alternate | FAIL | sitemap 與頁面 alternates 設為單語 |
| 8 | 既有 Phase 2B treatment 被重寫 | 主內容 hash 改變 | FAIL | before/after hash 保護 |
| 9 | sitemap lastmod 全站漂移 | 非核准路徑日期改變 | FAIL | 保留既有 fallback 日期，限制核准路徑 |
| 10 | 低品質大量頁面擴張 | build 頁數超過允許增幅 | FAIL | 僅新增 3 個工具，禁止 clone |
| 11 | 功能工具被錯誤裁撤 | 83 個既有工具數量下降 | FAIL | 不做功能工具 pruning |
| 12 | canonical 或 noindex 回歸 | sitemap URL 缺 canonical 或出現 noindex | FAIL | audit:education-recovery 強制檢查 |
| 13 | 編輯內文洩漏代理工作語氣 | 出現 Codex、prompt、內部任務字樣 | FAIL | editorial leakage audit |
| 14 | 新頁缺少實際內鏈 | 工具頁無 hub、指南或相關工具連結 | FAIL | contentSections 與教育樞紐連結 |
| 15 | 手機版表單不可用 | 375px 出現橫向溢出或欄位擠壓 | FAIL | responsive grid 與預覽 QA |
| 16 | 結果狀態不清楚 | 不可能達成與已達標只顯示數字 | FAIL | 顯示狀態與公式 |
| 17 | 發布流程繞過備份 | 看到手動 push 或缺版本 tag | FAIL | 僅使用 preflight/release |
| 18 | 正式環境未完成卻宣稱恢復 | Actions、頁面或 GSC 無讀回 | FAIL | 部署與 GSC 分開報告 |
| 19 | GSC 延遲被誤判為失敗 | 發布後立即以零資料下結論 | FAIL | 建立 observation baseline 與時間窗 |
| 20 | 本地通過但平台失敗 | CI 或 production smoke 失敗 | FAIL | 平台 readback gate，結果標 BLOCKED |

目前狀態：本地 gates PASS；發布、CI／正式站讀回與 GSC 後續觀測仍待完成。即使發布成功，GSC 索引與搜尋成效也必須等觀測窗後再判定，不能以本地 PASS 宣稱 SEO 已恢復。
