// GSC sitemap 提交結果的判定規則，抽成純函式是為了讓它可以被測試。
//
// 抽出來的理由：roomfeng 的同一段邏輯在 2026-08-31 發生過回歸——原本靠
// 「alerts 非空就 exit 1」達成的「卡住要讓步驟失敗」規則，在一次把退出碼
// 改寫成分支結構的重構裡漏掉了 stuck 那條，於是每次部署都印出 STUCK 警告
// 卻仍回報成功。那正是 CLAUDE.md 風險紅線第 6 條禁止的靜默跳過。
//
// 規則本身只有一句：**只要有 alert，這個步驟就必須是紅的。**
// 這一步排在部署之後，失敗只會讓 workflow 變紅，不會擋住網站上線。

export function resolveSitemapOutcome({
  failureCount = 0,
  submittedCount = 0,
  registeredCount = 0,
  alertCount = 0,
} = {}) {
  if (failureCount > 0) {
    return {
      status: 'failed',
      message: `${failureCount} sitemap path(s) failed; see the per-path entries.`,
      exitCode: 1,
    };
  }

  if (submittedCount > 0) {
    return {
      status: 'submitted',
      message: `Submitted ${submittedCount} unregistered sitemap path(s); read back ${registeredCount} existing path(s).`,
      // 有新提交但同時有卡住的項目，仍然要紅。
      exitCode: alertCount > 0 ? 1 : 0,
    };
  }

  if (alertCount > 0) {
    return {
      status: 'registered_pending',
      message: `Read back ${registeredCount} registered sitemap path(s). Google download remains pending; no repeat PUT was sent. Failing the step so this does not stay invisible.`,
      exitCode: 1,
    };
  }

  return {
    status: 'already_registered',
    message: `Read back ${registeredCount} registered sitemap path(s); no repeat PUT was needed.`,
    exitCode: 0,
  };
}
