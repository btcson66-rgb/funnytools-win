(() => {
  const productGrids = [...document.querySelectorAll('[data-affiliate-products], [data-support-products]')];
  if (!productGrids.length) return;

  const icons = {
    computer: '⌘', mobile: '◉', office: '▤', student: '✎', teacher: '♧', home: '⌂', general: '◇',
    'file-photo': '▣', productivity: '⌘', travel: '⌁', printing: '▤', 'mobile-photo': '◉',
    'digital-accessories': '⌘', organization: '▦', workspace: '▤', wellness: '♡',
  };
  const platformLabels = { shopee: '蝦皮', coupang: '酷澎', amazon: 'Amazon', internal: 'FunnyTools', other: '其他' };
  const categoryAliases = {
    computer: ['computer', 'digital-accessories', 'workspace', 'file-photo', '3c', '電腦', '鍵盤', '滑鼠', '耳機', '螢幕', '記憶卡'],
    mobile: ['mobile', 'mobile-photo', 'digital-accessories', '3c', '行動', '手機', '平板', '充電'],
    office: ['office', 'workspace', 'organization', 'printing', '辦公', '收納', '文具', '桌面', '電腦', '3c'],
    student: ['student', 'workspace', 'organization', '學習', '文具', '學生', '辦公', '3c'],
    teacher: ['teacher', 'workspace', 'organization', 'student', '教學', '教師', '學習', '文具', '辦公', '3c'],
    home: ['home', 'workspace', 'organization', '居家', '生活', '日用品', '廚房', '清潔', '收納'],
    general: [],
  };

  const asText = (value) => typeof value === 'string' ? value.trim() : '';
  const validAffiliateUrl = (value) => {
    const text = asText(value);
    if (!text) return '';
    try {
      const url = new URL(text);
      return url.protocol === 'https:' ? url.href : '';
    } catch {
      return '';
    }
  };
  const validImageUrl = (value) => {
    const text = asText(value);
    if (!text) return '';
    try {
      const url = new URL(text, window.location.origin);
      const allowed = url.origin === window.location.origin
        && url.pathname.startsWith('/assets/support-products/')
        && /\.(webp|avif|png|jpe?g)$/i.test(url.pathname);
      return allowed ? url.href : '';
    } catch {
      return '';
    }
  };
  const productKey = (product) => [
    asText(product.category).toLowerCase(),
    ...(Array.isArray(product.tags) ? product.tags.map((tag) => asText(tag).toLowerCase()) : []),
  ];
  const matchesCategory = (product, requestedCategory) => {
    const category = asText(requestedCategory).toLowerCase();
    if (!category || category === 'general') return true;
    const aliases = categoryAliases[category] || [category];
    return aliases.some((alias) => productKey(product).includes(alias));
  };
  const matchesTags = (product, requestedTags) => {
    if (!requestedTags.length) return true;
    const keys = productKey(product);
    return requestedTags.some((tag) => keys.includes(tag));
  };
  const shuffle = (items) => {
    const copy = [...items];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
    }
    return copy;
  };
  const idsOf = (items) => items.map((item) => item.id).join('|');
  const track = (eventName, params = {}) => {
    try {
      window.__ft_track?.(eventName, { page_path: window.location.pathname, ...params });
    } catch {
      // Analytics must never affect the tool or the shelf.
    }
  };

  function balancePlatforms(batch, pool, cursor, batchSize) {
    if (batchSize < 2) return batch;
    const shown = new Set(batch.map((item) => item.platform));
    const available = new Set(pool.map((item) => item.platform));
    if (available.size < 2 || shown.size > 1) return batch;
    const missing = [...available].find((platform) => platform !== batch[0]?.platform);
    const replacementIndex = pool.findIndex((item, index) => index >= cursor + batch.length && item.platform === missing);
    if (replacementIndex < 0) return batch;
    const lastIndex = cursor + batch.length - 1;
    [pool[lastIndex], pool[replacementIndex]] = [pool[replacementIndex], pool[lastIndex]];
    return pool.slice(cursor, cursor + batchSize);
  }

  function createCard(product, position, context, toolSlug, batchNumber) {
    const article = document.createElement('article');
    article.className = 'affiliate-product-card support-product-card';
    const title = asText(product.shortTitle) || asText(product.title) || '實用支持商品';

    const media = document.createElement('div');
    media.className = 'affiliate-product-media support-product-media';
    const imageUrl = validImageUrl(product.imageUrl);
    if (imageUrl) {
      const image = document.createElement('img');
      image.src = imageUrl;
      image.alt = title || '推薦商品圖片';
      image.loading = 'lazy';
      image.decoding = 'async';
      image.width = 640;
      image.height = 480;
      image.addEventListener('error', () => {
        media.replaceChildren();
        const placeholder = document.createElement('span');
        placeholder.className = 'affiliate-product-placeholder support-product-icon';
        placeholder.setAttribute('aria-hidden', 'true');
        placeholder.textContent = icons[asText(product.category)] || '◇';
        media.append(placeholder);
      }, { once: true });
      media.append(image);
    } else {
      const placeholder = document.createElement('span');
      placeholder.className = 'affiliate-product-placeholder support-product-icon';
      placeholder.setAttribute('aria-hidden', 'true');
      placeholder.textContent = icons[asText(product.category)] || '◇';
      media.append(placeholder);
    }
    article.append(media);

    const platform = document.createElement('span');
    platform.className = 'affiliate-product-platform support-product-platform';
    platform.textContent = platformLabels[asText(product.platform)] || platformLabels.other;
    article.append(platform);

    const heading = document.createElement('h3');
    heading.textContent = title;
    article.append(heading);
    const descriptionText = asText(product.optionalDescription) || asText(product.description);
    if (descriptionText) {
      const description = document.createElement('p');
      description.className = 'affiliate-product-description';
      description.textContent = descriptionText;
      article.append(description);
    }
    const price = document.createElement('p');
    price.className = 'affiliate-product-price';
    price.textContent = asText(product.optionalPriceLabel) || '查看目前價格';
    article.append(price);

    const href = validAffiliateUrl(product.affiliateUrl) || validAffiliateUrl(product.fallbackUrl);
    if (href) {
      const link = document.createElement('a');
      link.className = 'affiliate-product-link btn';
      link.href = href;
      link.target = '_blank';
      link.rel = 'sponsored nofollow noopener';
      link.textContent = '查看商品';
      link.setAttribute('aria-label', `查看商品：${title}`);
      link.dataset.affiliateProductId = asText(product.id);
      link.dataset.affiliatePlatform = asText(product.platform) || 'other';
      link.dataset.affiliateCategory = asText(product.category) || 'general';
      link.dataset.affiliatePosition = String(position);
      link.dataset.affiliateToolSlug = toolSlug;
      link.dataset.affiliateContext = context;
      link.dataset.affiliateBatch = String(batchNumber);
      article.append(link);
    }
    return article;
  }

  function getStorageKey(context, category, toolSlug) {
    return `funnytools-affiliate:${window.location.pathname}:${context}:${category || 'all'}:${toolSlug || 'page'}`;
  }
  function loadState(key) {
    try {
      const value = JSON.parse(sessionStorage.getItem(key) || 'null');
      return value && Array.isArray(value.poolIds) ? value : null;
    } catch {
      return null;
    }
  }
  function saveState(key, state) {
    try { sessionStorage.setItem(key, JSON.stringify(state)); } catch { /* enhancement only */ }
  }

  function mountGrid(grid) {
    if (!(grid instanceof HTMLElement) || grid.dataset.affiliateReady === 'true') return;
    grid.dataset.affiliateReady = 'true';
    const shelf = grid.closest('[data-affiliate-shelf]');
    const supportPage = !shelf;
    const root = shelf || grid.closest('section') || document.body;
    const refreshButton = root.querySelector('[data-affiliate-refresh], [data-refresh-products]');
    const expandButton = root.querySelector('[data-affiliate-expand]');
    const supportLink = root.querySelector('[data-affiliate-support-link]');
    const status = root.querySelector('[data-resource-status]');
    if (!(refreshButton instanceof HTMLButtonElement)) return;

    const context = shelf?.dataset.affiliateContext || 'support_page';
    const category = shelf?.dataset.affiliateCategory || '';
    const requestedTags = (shelf?.dataset.affiliateTags || '')
      .split(',').map((item) => item.trim().toLowerCase()).filter(Boolean);
    const toolSlug = shelf?.dataset.toolSlug || '';
    const platformFilter = (grid.dataset.supportProductsPlatforms || '')
      .split(',').map((item) => item.trim()).filter(Boolean);
    const initialLimit = Number(shelf?.dataset.affiliateInitialLimit || (supportPage ? 8 : 4));
    const batchSize = Math.max(1, Math.min(initialLimit, 8));
    const productsSrc = shelf?.dataset.affiliateProductsSrc || grid.dataset.supportProductsSrc || '/data/support-products.json';
    const stateKey = getStorageKey(context, category, toolSlug);
    let pool = [];
    let cursor = 0;
    let displayLimit = batchSize;
    let batchNumber = 1;
    let lastBatchIds = '';
    let shelfViewed = false;
    let successSeen = context !== 'tool_result';
    let revealTimer = 0;
    const contextDimensions = () => context === 'article'
      ? { article_slug: toolSlug, article_category: category }
      : context === 'tool_result'
        ? { tool_slug: toolSlug }
        : {};

    const reveal = () => {
      if (!shelf || !successSeen || !pool.length || !grid.childElementCount || !shelf.hidden) return;
      window.clearTimeout(revealTimer);
      revealTimer = window.setTimeout(() => {
        shelf.hidden = false;
        if (!shelfViewed) {
          shelfViewed = true;
          const visible = [...grid.querySelectorAll('[data-affiliate-platform]')].map((item) => item.dataset.affiliatePlatform);
          track('affiliate_shelf_view', { ...contextDimensions(), platform_mix: [...new Set(visible)].join(','), context });
        }
      }, 380);
    };

    const updateControls = () => {
      if (expandButton instanceof HTMLButtonElement) expandButton.hidden = pool.length <= displayLimit || displayLimit >= 12;
      if (supportLink instanceof HTMLAnchorElement) supportLink.hidden = pool.length <= 12;
      refreshButton.disabled = pool.length <= batchSize;
      refreshButton.hidden = !supportPage && pool.length <= batchSize;
      if (status instanceof HTMLElement && supportPage) status.textContent = `目前顯示 ${grid.childElementCount} 項資源，共整理 ${pool.length} 項。`;
    };
    const render = (items, reason = 'initial') => {
      grid.replaceChildren(...items.map((item, index) => createCard(item, index + 1, context, toolSlug, batchNumber)));
      grid.setAttribute('aria-busy', 'false');
      updateControls();
      if (reason === 'refresh') track('affiliate_refresh', { ...contextDimensions(), context, batch_number: batchNumber });
      if (reason === 'expand') track('affiliate_expand', { ...contextDimensions(), context, to_count: items.length, batch_number: batchNumber });
    };
    const buildPool = (eligible, stored) => {
      const byId = new Map(eligible.map((item) => [item.id, item]));
      const storedPool = (stored?.poolIds || []).map((id) => byId.get(id)).filter(Boolean);
      const missing = shuffle(eligible.filter((item) => !storedPool.some((storedItem) => storedItem.id === item.id)));
      return storedPool.length ? [...storedPool, ...missing] : shuffle(eligible);
    };
    const nextBatch = (size) => {
      if (!pool.length) return [];
      if (cursor >= pool.length) {
        const previous = lastBatchIds;
        pool = shuffle(pool);
        cursor = 0;
        batchNumber = 1;
        for (let attempt = 0; attempt < 8 && idsOf(pool.slice(0, size)) === previous; attempt += 1) pool = shuffle(pool);
      }
      let batch = pool.slice(cursor, cursor + size);
      batch = balancePlatforms(batch, pool, cursor, size);
      cursor = Math.min(pool.length, cursor + batch.length);
      lastBatchIds = idsOf(batch);
      batchNumber += 1;
      saveState(stateKey, { poolIds: pool.map((item) => item.id), cursor, batchNumber, lastBatchIds, displayLimit });
      return batch;
    };
    const renderCurrent = (reason = 'initial') => render(pool.slice(0, Math.min(displayLimit, pool.length)), reason);

    expandButton?.addEventListener('click', () => {
      const previousCount = displayLimit;
      displayLimit = Math.min(displayLimit < 8 ? 8 : 12, pool.length);
      cursor = Math.max(cursor, displayLimit);
      saveState(stateKey, { poolIds: pool.map((item) => item.id), cursor, batchNumber, lastBatchIds, displayLimit });
      renderCurrent('expand');
      if (previousCount === displayLimit) return;
    });
    supportLink?.addEventListener('click', () => track('affiliate_support_page_click', { ...contextDimensions(), context, batch_number: batchNumber }));
    refreshButton.addEventListener('click', () => {
      if (!pool.length) return;
      displayLimit = batchSize;
      const next = nextBatch(batchSize);
      render(next, 'refresh');
      reveal();
    });
    grid.addEventListener('click', (event) => {
      const target = event.target instanceof Element ? event.target.closest('a[data-affiliate-product-id]') : null;
      if (!(target instanceof HTMLAnchorElement)) return;
      track('affiliate_product_click', {
        ...contextDimensions(),
        platform: target.dataset.affiliatePlatform || 'other',
        product_id: target.dataset.affiliateProductId || 'unknown',
        product_category: target.dataset.affiliateCategory || 'general',
        product_position: Number(target.dataset.affiliatePosition || 0),
        context: target.dataset.affiliateContext || context,
        batch_number: Number(target.dataset.affiliateBatch || batchNumber),
      });
    });
    document.addEventListener('freetools:tool-success', () => {
      if (context !== 'tool_result' || successSeen) return;
      successSeen = true;
      reveal();
    }, { once: true });

    // The event is the primary integration point. This small local observer is
    // a defensive fallback for tools whose widget script updates its result
    // before the analytics observer has finished attaching.
    if (context === 'tool_result') {
      const interactionRoot = document.querySelector('.tool-interaction');
      if (interactionRoot instanceof HTMLElement) {
        let interactionStarted = false;
        const markStarted = (event) => {
          const target = event.target;
          if (target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement) {
            interactionStarted = true;
            return;
          }
          if (event.type === 'click' && target instanceof Element) {
            const button = target.closest('button');
            if (button && !button.disabled && !button.matches('[data-reset], [data-clear], [data-copy], .copy-button')) interactionStarted = true;
          }
        };
        interactionRoot.addEventListener('input', markStarted, true);
        interactionRoot.addEventListener('change', markStarted, true);
        interactionRoot.addEventListener('click', markStarted, true);
        const isResult = (element) => {
          if (!(element instanceof HTMLElement) || element.hidden || element.getAttribute('aria-hidden') === 'true') return false;
          if (element.closest('[data-error], .form-error, [role="alert"], .toast')) return false;
          const result = element.closest('[data-results], [data-result], output, .resultbox, .bigresult, [aria-live="polite"]');
          return result instanceof HTMLElement && !result.hidden && result.getClientRects().length > 0 && Boolean(result.textContent?.trim());
        };
        const observer = new MutationObserver((mutations) => {
          if (!interactionStarted || successSeen) return;
          const activeError = interactionRoot.querySelector('[data-error]:not([hidden]), .form-error:not([hidden]), [role="alert"]:not([hidden])');
          if (activeError instanceof HTMLElement && activeError.getClientRects().length && activeError.textContent?.trim()) return;
          if (mutations.some((mutation) => isResult(mutation.target instanceof Element ? mutation.target : mutation.target.parentElement))) {
            successSeen = true;
            reveal();
            observer.disconnect();
          }
        });
        observer.observe(interactionRoot, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['hidden', 'aria-hidden'] });
      }
    }

    fetch(productsSrc, { headers: { Accept: 'application/json' } })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => {
        const allProducts = Array.isArray(data)
          ? data.filter((item) => item && (item.enabled === true || item.status === 'active') && typeof item.id === 'string')
            .filter((item) => !platformFilter.length || platformFilter.includes(item.platform))
            .filter((item) => validAffiliateUrl(item.affiliateUrl) || validAffiliateUrl(item.fallbackUrl))
          : [];
        const categoryProducts = category ? allProducts.filter((item) => matchesCategory(item, category)) : allProducts;
        const taggedProducts = requestedTags.length
          ? categoryProducts.filter((item) => matchesTags(item, requestedTags))
          : categoryProducts;
        const eligible = taggedProducts.length >= batchSize
          ? taggedProducts
          : categoryProducts.length >= batchSize
            ? categoryProducts
            : allProducts;
        if (!eligible.length) {
          grid.setAttribute('aria-busy', 'false');
          if (status instanceof HTMLElement && supportPage) status.textContent = '目前沒有可顯示的資源。';
          return;
        }
        const stored = loadState(stateKey);
        pool = buildPool(eligible, stored);
        cursor = Math.min(Number(stored?.cursor) || 0, pool.length);
        batchNumber = Math.max(1, Number(stored?.batchNumber) || 1);
        lastBatchIds = asText(stored?.lastBatchIds);
        displayLimit = Math.min(Number(stored?.displayLimit) || batchSize, Math.min(12, pool.length));
        if (stored?.poolIds?.length) renderCurrent();
        else render(nextBatch(batchSize));
        reveal();
      })
      .catch(() => {
        grid.setAttribute('aria-busy', 'false');
        if (status instanceof HTMLElement && supportPage) status.textContent = '資源暫時無法載入，請稍後再試。';
      });
  }

  productGrids.forEach(mountGrid);
})();
