FROM python:3.12-slim

# production image 目前是手動 build 的，沒有這個標記就無法從外部確認容器裡跑的是哪個
# commit。正式 build 必須傳入 git SHA：--build-arg GIT_REVISION=$(git rev-parse HEAD)。
# 沒傳時退回 unknown，不讓 build 失敗（見 BACKEND_DEPLOY_RUNBOOK.md）。
ARG GIT_REVISION=unknown

LABEL org.opencontainers.image.title="funnytools-conversion-api" \
      org.opencontainers.image.source="https://github.com/btcson66-rgb/funnytools-win" \
      org.opencontainers.image.revision="${GIT_REVISION}"

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    FUNNYTOOLS_REVISION=${GIT_REVISION}

RUN apt-get update && apt-get install -y --no-install-recommends \
    tesseract-ocr \
    tesseract-ocr-eng \
    tesseract-ocr-chi-tra \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . ./

RUN useradd --create-home --uid 10001 appuser && chown -R appuser:appuser /app
USER appuser

ENV FUNNYTOOLS_MAX_UPLOAD_MB=80 \
    FUNNYTOOLS_MAX_BATCH_MB=120 \
    FUNNYTOOLS_MAX_IMAGE_PIXELS=25000000 \
    FUNNYTOOLS_MAX_PDF_PAGES=200 \
    FUNNYTOOLS_MAX_OCR_PAGES=30 \
    FUNNYTOOLS_ENABLE_DOCS=0

EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD python -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8000/health', timeout=3).read()" || exit 1

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "2"]
