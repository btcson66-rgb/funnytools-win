// GSC sitemap 提交結果的判定規則，抽成純函式是為了讓它可以被測試。
//
// ## 這個步驟負責什麼、不負責什麼
//
// 它只回答一個問題：**這次部署有沒有把 sitemap 成功送進 Search Console。**
// 送不進去（API 掛掉、授權失效、PUT 被拒）＝ 管線壞了 ＝ 紅燈，每次都要紅。
// 這一條是 CLAUDE.md 風險紅線第 6 條，永遠不准放寬——2026-08-31 roomfeng 就
// 發生過一次真正的靜默跳過（重構退出碼時漏掉 process.exitCode，警告照印但步驟
// 回報成功）。那次的教訓是「不要讓警告沒有出口」，不是「所有警告都必須擋部署」。
//
// 它**不**負責回答「Google 到底有沒有來抓」。
//
// ## 2026-09-21：為什麼把 never-fetched 從退出碼移走
//
// 這份檔案原本的規則是「只要有 alert，這個步驟就必須是紅的」。alert 只有一種來源：
// 一筆已註冊但 Google 從未下載的 sitemap。結果是：
//
//   funnytools 的 6 筆 sitemap 於 2026-09-03 提交，14 天後（09-17）跨過門檻，
//   從那天起每一次 push 都紅在同一件事，一次都沒有綠過。
//
// roomfeng 在 2026-09-04 到 09-06 撞過一模一樣的狀況，連紅兩週之後老闆回報
//「這個通知我已經收很久了」，於是在 09-06 把它移出退出碼。這份檔案是那次修正
// 之前分岔出去的副本，所以一直帶著舊規則；它的舊檔頭引用的是 roomfeng 08-31
// 的另一次事故（真正的靜默跳過），兩件事不一樣。
//
// 永久紅燈不是「有在監控」，它是把監控關掉的最有效方法——因為所有人都學會忽略它，
// 而下一次真正的提交失敗會長得一模一樣。
//
// 這不是靜默跳過：
//   - 訊號沒有消失：alert 照樣印在 stderr，status 仍是 registered_never_fetched，
//     `stuck: true` 保留在回傳值裡讓呼叫端可以判斷。
//   - 告警沒有消失：由每 6 小時跑一次的 Fable Four-Site Health Monitor 負責。
//   - 修復路徑是新增的：gsc-submit-sitemaps.mjs 現在會每 7 天重送一次從未被擷取
//     的項目，而不是只要 GSC 回報已註冊就永遠跳過 PUT。
//
// ## 措辭：是「Search Console 沒有回報下載」
//
// API 沒有獨立的擷取失敗旗標。isPending: true + lastDownloaded: null + errors: "0"
// 這一組，在 GSC 網頁介面上顯示的就是「無法擷取 / Couldn't fetch」、類型「未知」。

export function resolveSitemapOutcome({
  failureCount = 0,
  submittedCount = 0,
  registeredCount = 0,
  alertCount = 0,
} = {}) {
  // 提交本身失敗 = 管線真的壞了。這一條是紅線，永遠 exit 1。
  if (failureCount > 0) {
    return {
      status: 'failed',
      message: `${failureCount} sitemap path(s) failed; see the per-path entries.`,
      stuck: alertCount > 0,
      exitCode: 1,
    };
  }

  const neverFetchedNote = alertCount > 0
    ? ` Search Console has never reported a download for ${alertCount} path(s)`
      + " (its web UI shows them as 無法擷取 / Couldn't fetch); those are re-submitted on a"
      + ' 7-day cadence and the standing alert belongs to the daily four-site health monitor,'
      + ' not to this step.'
    : '';

  if (submittedCount > 0) {
    return {
      status: 'submitted',
      message: `Submitted ${submittedCount} sitemap path(s); read back ${registeredCount} existing path(s).${neverFetchedNote}`,
      stuck: alertCount > 0,
      exitCode: 0,
    };
  }

  if (alertCount > 0) {
    return {
      status: 'registered_never_fetched',
      message: `Read back ${registeredCount} registered sitemap path(s).${neverFetchedNote}`,
      stuck: true,
      exitCode: 0,
    };
  }

  return {
    status: 'already_registered',
    message: `Read back ${registeredCount} registered sitemap path(s); no repeat PUT was needed.`,
    stuck: false,
    exitCode: 0,
  };
}
