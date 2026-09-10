interface ObjectUrlAdapter<T> {
  create: (value: T) => string;
  revoke: (url: string) => void;
}

/** Own at most one object URL and make replacement/release idempotent. */
export function createOwnedObjectUrl<T>(adapter?: ObjectUrlAdapter<T>) {
  const urlApi = adapter || {
    create: (value: T) => URL.createObjectURL(value as Blob | MediaSource),
    revoke: (url: string) => URL.revokeObjectURL(url),
  };
  let currentUrl: string | null = null;
  const release = () => {
    if (!currentUrl) return;
    const url = currentUrl;
    currentUrl = null;
    urlApi.revoke(url);
  };

  return {
    replace(value: T) {
      release();
      currentUrl = urlApi.create(value);
      return currentUrl;
    },
    release,
    get currentUrl() {
      return currentUrl;
    },
  };
}
