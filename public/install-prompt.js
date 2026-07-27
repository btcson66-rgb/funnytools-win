(() => {
  let installEvent = null;
  const dismissedKey = 'freetools-install-dismissed';
  const visitCountKey = 'freetools-visit-count';
  const sessionCountedKey = 'freetools-visit-counted';
  const toolUsedKey = 'freetools-tool-used';

  if (sessionStorage.getItem(sessionCountedKey) !== 'true') {
    const previousVisits = Number.parseInt(localStorage.getItem(visitCountKey) || '0', 10);
    localStorage.setItem(visitCountKey, String(Number.isFinite(previousVisits) ? previousVisits + 1 : 1));
    sessionStorage.setItem(sessionCountedKey, 'true');
  }

  function isPromptEligible() {
    const visits = Number.parseInt(localStorage.getItem(visitCountKey) || '0', 10);
    return visits >= 2 || localStorage.getItem(toolUsedKey) === 'true';
  }

  function markToolUsed() {
    localStorage.setItem(toolUsedKey, 'true');
    renderPrompt();
  }

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
    if (isPromptEligible()) renderPrompt();
  });

  function renderPrompt() {
    if (!installEvent || !isPromptEligible()) return;
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
      ? '可將 FunnyTools 加到桌面，之後更快開啟常用工具。'
      : 'Install FunnyTools for faster access to common tools.';
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

  const interactionRoot = document.querySelector('.tool-interaction');
  if (interactionRoot) {
    interactionRoot.addEventListener('change', markToolUsed, { once: true });
    interactionRoot.addEventListener('click', (event) => {
      const control = event.target instanceof Element ? event.target.closest('button, a') : null;
      if (control && !control.hasAttribute('disabled')) markToolUsed();
    }, { once: true });
  }
})();
