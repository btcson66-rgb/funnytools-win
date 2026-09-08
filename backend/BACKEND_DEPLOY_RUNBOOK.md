# Conversion API 後端部署 Runbook

`https://api.funnytools.win` 的後端**不是**由這個 repo 的任何 GitHub workflow 部署的。
`deploy.yml` / `preflight.yml` / `seo-indexing.yml` 都只處理前端，
`conversion-api-smoke.yml` 打的是已經上線的 production。

> **合併 PR ≠ 後端已上線。**
> backend/ 的改動要生效，必須由擁有者在本機手動 build image 並替換 container。
> 在這份 runbook 的「驗證」步驟通過之前，任何文件都不得寫「production fixed」，
> 只能寫「fix prepared and CI verified」。

## 目前的 production 架構

| 項目 | 內容 |
|---|---|
| Runtime | 擁有者本機 Windows 的 Docker Desktop |
| Container | `funnytools-conversion-api` |
| Port 綁定 | `127.0.0.1:8000` → container `8000`（**只綁 loopback，不對外開**） |
| Restart policy | `unless-stopped` |
| 對外連線 | 既有的 Cloudflare Named Tunnel 把 `api.funnytools.win` 轉到 `http://127.0.0.1:8000` |
| Tunnel connector | Windows 排程工作 `FunnyToolsConversionTunnel`（跑 cloudflared） |
| Uvicorn | `--workers 2`（見 `backend/Dockerfile`） |
| Docker HEALTHCHECK | interval 30s / timeout 5s / retries 3 / start-period 10s |

部署過程**不需要**碰 tunnel、DNS 或排程工作。Tunnel 指的是 localhost:8000，
只要新 container 綁到同一個 port，對外就會自動接上。
若這次部署要改動 tunnel 或 DNS，代表你走錯流程了，停下來。

## 版本辨識（先讀這段）

在這次改動之前，image 沒有任何 commit 標記，無法從外部確認線上跑的是哪一版。
現在 `backend/Dockerfile` 接受 `--build-arg GIT_REVISION=<git sha>`：

- 寫進 OCI label `org.opencontainers.image.revision`
- 也寫進容器環境變數，由 `GET /health` 回傳

```
GET /health -> {"ok": true, "version": "1.1.0", "revision": "<git sha>"}
```

`version` 已從 `1.0.0` 升到 `1.1.0`，所以**光看 `/health` 就能分辨新舊**：
還回 `1.0.0` 就是舊 image，這次部署沒有生效。

沒傳 `GIT_REVISION` 不會讓 build 失敗，只會回 `unknown`——
但正式部署一定要傳，否則下一次出事時又無從追查。

---

## 1. 部署前

```powershell
# 1-1 確認 checkout 乾淨，且停在要部署的 commit
git status --short          # 必須是空的
git log -1 --format=%H      # 記下這個 SHA，後面要用

# 1-2 記下目前線上的 image 與 container，出事要靠它回滾
docker inspect funnytools-conversion-api --format "{{.Config.Image}} {{.Image}}"
docker images funnytools-conversion-api
```

把上面兩行的輸出貼進 `Company Vault/99_System/` 的部署記錄。
**在確認回滾目標存在之前不要往下走。**

```powershell
# 1-3 本機測試（在 backend/ 目錄）
cd backend
python -m venv .venv
.venv\Scripts\pip install -r requirements-test.txt
.venv\Scripts\python -m pytest
```

pytest 必須全綠。有 skip 的話要看清楚 skip 原因——
`needs_tesseract` 在沒裝 tesseract 的本機 skip 是正常的（CI 上有裝，會實際跑）。

## 2. 部署

```powershell
# 2-1 建立**新 tag** 的 image。不要覆寫舊 tag，否則沒有東西可以回滾。
$SHA = git rev-parse --short HEAD
$TAG = "$(Get-Date -Format yyyyMMdd)-$SHA"

docker build `
  --build-arg GIT_REVISION=$(git rev-parse HEAD) `
  -t funnytools-conversion-api:$TAG `
  .\backend

# 2-2 確認 label 有寫進去
docker inspect funnytools-conversion-api:$TAG `
  --format "{{index .Config.Labels \"org.opencontainers.image.revision\"}}"
```

```powershell
# 2-3 停掉並移除舊 container（image 保留，回滾要用）
docker stop funnytools-conversion-api
docker rm funnytools-conversion-api

# 2-4 用新 image 起同名 container，綁定與 restart policy 必須完全照舊
docker run -d `
  --name funnytools-conversion-api `
  --restart unless-stopped `
  -p 127.0.0.1:8000:8000 `
  funnytools-conversion-api:$TAG
```

- `-p` 必須是 `127.0.0.1:8000:8000`。寫成 `-p 8000:8000` 會把 API 直接曝露到區網，
  繞過 Cloudflare。
- 這次改動沒有新增任何必要的環境變數。`FUNNYTOOLS_MAX_CONCURRENT_JOBS` 有預設值 2，
  不需要傳；要調整再加 `-e`。
- **這份文件不記錄任何 secret 值。** 若未來需要傳憑證，用 `--env-file` 指向本機檔案，
  不要把值寫進這裡或任何 commit。

## 3. 驗證（四關，全過才算部署完成）

```powershell
# 3-1 Docker healthcheck 必須 healthy（start-period 10s，給它 ~40 秒）
docker inspect funnytools-conversion-api --format "{{.State.Health.Status}}"

# 3-2 本機 /health：version 必須是 1.1.0，revision 必須等於這次的 SHA
curl.exe http://127.0.0.1:8000/health

# 3-3 對外 /health：確認 tunnel 有接上新 container
curl.exe https://api.funnytools.win/health
```

3-2 與 3-3 的 `revision` 必須一致，而且等於步驟 1-1 記下的 SHA。
**只要還看到 `"version":"1.0.0"`，就是舊 image 還在跑，回到步驟 2。**

```powershell
# 3-4 跑輕量 production smoke（在 repo 根目錄）
npm run test:api
```

最後在 GitHub 手動觸發 `Conversion API production smoke` workflow，確認雲端也是綠的。
（Actions → Conversion API production smoke → Run workflow）

手動觸發時把步驟 1-1 的完整 SHA 填入 `expected_build_sha`。workflow 會將它作為
`EXPECTED_BUILD_SHA` 傳給 smoke；若 `/health.revision` 不相符，會以
`IDENTITY_MISMATCH` 失敗。每日排程不填這個欄位，只驗證一般健康與功能，因此不會把
「沒有指定預期 SHA」誤判成故障。

## 4. 回滾

出現以下任一情況就回滾，不要現場除錯：

- `docker inspect ... .State.Health.Status` 停在 `unhealthy`
- `api.funnytools.win` 反覆出現 52x / 530
- 基本轉檔（`/api/pdf/table-preview`）失敗

```powershell
docker stop funnytools-conversion-api
docker rm funnytools-conversion-api

# <OLD_TAG> = 步驟 1-2 記下的舊 image tag
docker run -d `
  --name funnytools-conversion-api `
  --restart unless-stopped `
  -p 127.0.0.1:8000:8000 `
  funnytools-conversion-api:<OLD_TAG>

docker inspect funnytools-conversion-api --format "{{.State.Health.Status}}"
curl.exe https://api.funnytools.win/health
```

回滾後 `/health` 會回到舊的 `version`，這是預期的——代表回滾成功。
接著把失敗現象寫進 `Company Vault/03_Incidents/`，不要直接重試同一個 image。

## 5. 部署後要更新的紀錄

- `Company Vault/99_System/Operations_Log.md`：一行摘要（時間、SHA、結果）
- 若這次部署是為了修 production 問題：更新 `Company Vault/03_Incidents/` 對應事件報告，
  把狀態從「fix prepared」改成「deployed + verified」，並附上步驟 3 的實測輸出
