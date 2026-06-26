(() => {
  let installEvent = null;
  const dismissedKey = 'freetools-install-dismissed';

  function syncOnlineState() {
    document.documentElement.dataset.offline = navigator.onLine ? 'false' : 'true';
  }

  syncOnlineState();
  window.addEventListener('online', syncOnlineState);
  window.addEventListener('offline', syncOnlineState);

  if (!('serviceWorker' in navigator)) return;

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });

  window.addEventListener('beforeinstallprompt', (event) => {
    if (localStorage.getItem(dismissedKey) === 'true') return;
    event.preventDefault();
    installEvent = event;
    renderPrompt();
  });

  function renderPrompt() {
    if (document.querySelector('[data-install-prompt]')) return;

    const prompt = document.createElement('aside');
    prompt.className = 'install-prompt';
    prompt.dataset.installPrompt = '';
    prompt.innerHTML = `
      <span data-install-copy></span>
      <button type="button" data-install-action></button>
      <button type="button" data-install-dismiss aria-label="Dismiss">×</button>
    `;

    const isZh = document.documentElement.lang.toLowerCase().startsWith('zh');
    prompt.querySelector('[data-install-copy]').textContent = isZh
      ? '可將 FreeTools 加到桌面，之後更快開啟常用工具。'
      : 'Install FreeTools for faster access to common tools.';
    prompt.querySelector('[data-install-action]').textContent = isZh ? '安裝' : 'Install';

    prompt.querySelector('[data-install-dismiss]').addEventListener('click', () => {
      localStorage.setItem(dismissedKey, 'true');
      prompt.remove();
    });

    prompt.querySelector('[data-install-action]').addEventListener('click', async () => {
      if (!installEvent) return;
      installEvent.prompt();
      await installEvent.userChoice.catch(() => null);
      installEvent = null;
      prompt.remove();
    });

    document.body.append(prompt);
  }
})();
