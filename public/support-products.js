const startAffiliateShelf = () => {
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
  const validImageUrl = (value, allowRemote = false) => {
    const text = asText(value);
    if (!text) return '';
    try {
      const url = new URL(text, window.location.origin);
      const allowed = allowRemote
        ? url.protocol === 'https:' && url.hostname === 'm.media-amazon.com' && /\.(webp|avif|png|jpe?g)(?:$|[?#])/i.test(url.pathname)
        : url.origin === window.location.origin
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
  const productId = (product) => asText(product.id) || asText(product.product_id);
  const productNetwork = (product) => asText(product.platform) || (asText(product.tracking_id) ? 'amazon' : 'other');
  const idsOf = (items) => items.map(productId).join('|');
  const track = (eventName, params = {}) => {
    try {
      window.__btcsonAffiliateTrack?.(eventName, params);
    } catch {
      // Analytics must never affect the tool or the shelf.
    }
  };

  function balancePlatforms(batch, pool, cursor, batchSize) {
    if (batchSize < 2) return batch;
    const shown = new Set(batch.map(productNetwork));
    const available = new Set(pool.map(productNetwork));
    if (available.size < 2 || shown.size > 1) return batch;
    const missing = [...available].find((platform) => platform !== productNetwork(batch[0]));
    const replacementIndex = pool.findIndex((item, index) => index >= cursor + batch.length && productNetwork(item) === missing);
    if (replacementIndex < 0) return batch;
    const lastIndex = cursor + batch.length - 1;
    [pool[lastIndex], pool[replacementIndex]] = [pool[replacementIndex], pool[lastIndex]];
    return pool.slice(cursor, cursor + batchSize);
  }

  function createCard(product, position, context, toolSlug, batchNumber, options = {}) {
    const isAmazon = options.isAmazon === true;
    const language = options.language || 'zh';
    const amazonContentMode = isAmazon ? (asText(product.amazon_content_mode) || 'text_only') : '';
    const labels = {
      zh: { imageAlt: '推薦商品圖片', cta: '查看商品', price: '查看目前價格' },
      en: { imageAlt: 'Amazon product image', cta: 'View on Amazon', price: '' },
      es: { imageAlt: 'Imagen del producto de Amazon', cta: 'Ver en Amazon', price: '' },
      fr: { imageAlt: 'Image du produit Amazon', cta: 'Voir sur Amazon', price: '' },
    }[language] || { imageAlt: 'Amazon product image', cta: 'View on Amazon', price: '' };
    const article = document.createElement('article');
    article.className = 'affiliate-product-card support-product-card';
    if (isAmazon) article.dataset.amazonContentMode = amazonContentMode;
    const title = isAmazon
      ? asText(product.internal_display_name) || asText(product.product_title) || asText(product.title) || 'Amazon product'
      : asText(product.shortTitle) || asText(product.title) || '實用支持商品';
    const href = isAmazon
      ? validAffiliateUrl(product.affiliate_url_full)
      : validAffiliateUrl(product.affiliateUrl) || validAffiliateUrl(product.fallbackUrl);
    const decorateLink = (link) => {
      link.href = href;
      link.target = '_blank';
      link.rel = 'sponsored nofollow noopener';
      link.dataset.affiliateProductId = asText(product.id) || asText(product.product_id);
      link.dataset.affiliatePlatform = isAmazon ? 'amazon' : asText(product.platform) || 'other';
      link.dataset.affiliateCategory = isAmazon ? asText(product.internal_category) || 'general' : asText(product.category) || 'general';
      link.dataset.affiliateTrackingId = isAmazon ? asText(product.tracking_id) : '';
      link.dataset.affiliatePosition = String(position);
      link.dataset.affiliateToolSlug = toolSlug;
      link.dataset.affiliateContext = context;
      link.dataset.affiliateBatch = `${asText(product.batch_id) || 'catalog-legacy'}:${batchNumber}`;
      if (isAmazon) link.dataset.affiliateContentMode = amazonContentMode;
      return link;
    };

    const media = document.createElement('div');
    media.className = 'affiliate-product-media support-product-media';
    const imageUrl = validImageUrl(isAmazon ? product.image_url : product.imageUrl, isAmazon);
    if (imageUrl) {
      const image = document.createElement('img');
      image.src = imageUrl;
      image.alt = asText(product.internal_alt_text) || asText(product.alt_text) || title || labels.imageAlt;
      image.loading = 'lazy';
      image.decoding = 'async';
      image.width = 640;
      image.height = 480;
      image.addEventListener('error', () => {
        media.replaceChildren();
        const placeholder = document.createElement('span');
        placeholder.className = 'affiliate-product-placeholder support-product-icon';
        placeholder.setAttribute('aria-hidden', 'true');
        placeholder.textContent = icons[asText(product.category || product.internal_category)] || '◇';
        media.append(placeholder);
      }, { once: true });
      media.append(image);
    } else {
      if (isAmazon) media.classList.add('affiliate-product-media--text-only');
      const placeholder = document.createElement('span');
      placeholder.className = 'affiliate-product-placeholder support-product-icon';
      placeholder.setAttribute('aria-hidden', 'true');
      placeholder.textContent = icons[asText(product.category || product.internal_category)] || '◇';
      media.append(placeholder);
    }
    if (isAmazon && href) {
      const mediaLink = decorateLink(document.createElement('a'));
      mediaLink.className = 'affiliate-product-media-link';
      mediaLink.setAttribute('aria-label', `${labels.cta}：${title}`);
      mediaLink.append(media);
      article.append(mediaLink);
    } else {
      article.append(media);
    }

    const platform = document.createElement('span');
    platform.className = 'affiliate-product-platform support-product-platform';
    platform.textContent = platformLabels[productNetwork(product)] || platformLabels.other;
    article.append(platform);

    const heading = document.createElement('h3');
    if (isAmazon && href) {
      const titleLink = decorateLink(document.createElement('a'));
      titleLink.className = 'affiliate-product-title-link';
      titleLink.textContent = title;
      titleLink.setAttribute('aria-label', `${labels.cta}：${title}`);
      heading.append(titleLink);
    } else {
      heading.textContent = title;
    }
    article.append(heading);
    const descriptionText = isAmazon
      ? asText(product.internal_description) || asText(product.product_summary) || asText(product.description)
      : asText(product.optionalDescription) || asText(product.description);
    if (descriptionText) {
      const description = document.createElement('p');
      description.className = 'affiliate-product-description';
      description.textContent = descriptionText;
      article.append(description);
    }
    if (!isAmazon) {
      const price = document.createElement('p');
      price.className = 'affiliate-product-price';
      price.textContent = asText(product.optionalPriceLabel) || labels.price;
      article.append(price);
    }

    if (href) {
      const link = document.createElement('a');
      link.className = 'affiliate-product-link btn';
      link.textContent = isAmazon ? asText(product.suggested_cta) || labels.cta : labels.cta;
      link.setAttribute('aria-label', `${link.textContent}：${title}`);
      decorateLink(link);
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
    const isAmazon = shelf?.dataset.affiliateNetwork === 'amazon';
    const language = shelf?.dataset.affiliateLanguage || 'zh';
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
    const contentSrc = shelf?.dataset.affiliateProductsContentSrc || '';
    const stateKey = getStorageKey(context, category, toolSlug);
    let pool = [];
    let cursor = 0;
    let displayLimit = batchSize;
    let batchNumber = 1;
    let refreshCount = 0;
    let lastBatchIds = '';
    let shelfViewed = false;
    let itemObserver = null;
    let successSeen = context !== 'tool_result';
    let revealTimer = 0;
    const contextDimensions = () => ({
      placement: context === 'article' ? 'article_inline' : context === 'support_page' ? 'support_page' : 'result_card',
      affiliate_placement: context === 'article' ? 'article_inline' : context === 'support_page' ? 'support_page' : 'tool_result',
      surface_type: context === 'article' ? 'article' : context === 'support_page' ? 'support' : 'tool',
      affiliate_site: 'funnytools',
      locale: language,
      page_type: context === 'article' ? 'article' : context === 'support_page' ? 'support' : 'tool',
    });
    const itemDimensions = (link) => ({
      ...contextDimensions(),
      affiliate_network: link.dataset.affiliatePlatform || 'other',
      amazon_content_mode: isAmazon ? link.dataset.affiliateContentMode || 'text_only' : undefined,
      product_id: link.dataset.affiliateProductId || 'unknown',
      product_category: link.dataset.affiliateCategory || 'general',
      affiliate_tracking_id: link.dataset.affiliateTrackingId || undefined,
      batch_id: link.dataset.affiliateBatch || 'catalog-legacy',
      card_position: Number(link.dataset.affiliatePosition || 0),
    });
const batchTrackingId = (values) => {
  const ids = [...new Set(values.map((value) => asText(value)).filter(Boolean))];
  return ids.length === 1 ? ids[0] : undefined;
};
    const batchIdFor = (items) => `${asText(items[0]?.batch_id) || 'catalog-legacy'}:${batchNumber}`;
    const observeItemViews = () => {
      itemObserver?.disconnect();
      if (!('IntersectionObserver' in window)) return;
      itemObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.5) continue;
          const card = entry.target;
          const link = card.querySelector('a[data-affiliate-product-id]');
          if (!(link instanceof HTMLAnchorElement)) continue;
          track('affiliate_item_view', itemDimensions(link));
          itemObserver.unobserve(card);
        }
      }, { threshold: [0.5] });
      grid.querySelectorAll('.affiliate-product-card').forEach((card) => itemObserver.observe(card));
    };

    const reveal = () => {
      if (!shelf || !successSeen || !pool.length || !grid.childElementCount || !shelf.hidden) return;
      window.clearTimeout(revealTimer);
      revealTimer = window.setTimeout(() => {
        shelf.hidden = false;
        if (!shelfViewed) {
          shelfViewed = true;
          const visible = [...grid.querySelectorAll('[data-affiliate-platform]')].map((item) => item.dataset.affiliatePlatform || 'other');
          track('affiliate_module_view', {
            ...contextDimensions(),
            affiliate_network: [...new Set(visible)].length === 1 ? visible[0] : 'mixed',
            affiliate_tracking_id: batchTrackingId([...grid.querySelectorAll('a[data-affiliate-product-id]')].map((link) => link.dataset.affiliateTrackingId)),
            batch_id: `catalog-legacy:${batchNumber}`,
          });
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
      grid.replaceChildren(...items.map((item, index) => createCard(item, index + 1, context, toolSlug, batchNumber, { isAmazon, language })));
      grid.setAttribute('aria-busy', 'false');
      observeItemViews();
      updateControls();
      if (reason === 'refresh') {
        const visible = [...new Set(items.map(productNetwork))];
        track('affiliate_refresh', {
          ...contextDimensions(),
          affiliate_network: visible.length === 1 ? visible[0] : 'mixed',
          affiliate_tracking_id: batchTrackingId(items.map((item) => item.tracking_id)),
          amazon_content_mode: isAmazon ? [...new Set(items.map((item) => asText(item.amazon_content_mode) || 'text_only'))][0] : undefined,
          batch_id: batchIdFor(items),
          products_shown: items.length,
          refresh_count: refreshCount,
        });
      }
    };
    const buildPool = (eligible, stored) => {
      const byId = new Map(eligible.map((item) => [productId(item), item]));
      const storedPool = (stored?.poolIds || []).map((id) => byId.get(id)).filter(Boolean);
      const missing = shuffle(eligible.filter((item) => !storedPool.some((storedItem) => productId(storedItem) === productId(item))));
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
      saveState(stateKey, { poolIds: pool.map(productId), cursor, batchNumber, lastBatchIds, displayLimit });
      return batch;
    };
    const renderCurrent = (reason = 'initial') => render(pool.slice(0, Math.min(displayLimit, pool.length)), reason);

    expandButton?.addEventListener('click', () => {
      const previousCount = displayLimit;
      displayLimit = Math.min(displayLimit < 8 ? 8 : 12, pool.length);
      cursor = Math.max(cursor, displayLimit);
      saveState(stateKey, { poolIds: pool.map(productId), cursor, batchNumber, lastBatchIds, displayLimit });
      renderCurrent('expand');
      if (previousCount === displayLimit) return;
    });
    refreshButton.addEventListener('click', () => {
      if (!pool.length) return;
      displayLimit = batchSize;
      refreshCount += 1;
      const next = nextBatch(batchSize);
      render(next, 'refresh');
      reveal();
    });
    grid.addEventListener('click', (event) => {
      const target = event.target instanceof Element ? event.target.closest('a[data-affiliate-product-id]') : null;
      if (!(target instanceof HTMLAnchorElement)) return;
      track('affiliate_click', {
        ...itemDimensions(target),
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

    const fetchJson = (url) => fetch(url, { headers: { Accept: 'application/json' } }).then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    });
    const normalizeAmazonMode = (value) => ['false', 'creators_api', 'creators-api'].includes(asText(value).toLowerCase())
      ? 'creators_api'
      : ['true', 'bootstrap'].includes(asText(value).toLowerCase()) ? 'bootstrap' : 'auto';
    const bootstrapAmazonProducts = (master) => (Array.isArray(master) ? master : []).map((item) => ({
      ...item,
      internal_display_name: asText(item.internal_display_name) || 'Amazon product option',
      internal_description: asText(item.internal_description),
      internal_alt_text: asText(item.internal_alt_text) || 'Optional Amazon product recommendation',
      amazon_content_mode: item.official_product_link_code ? 'product_link' : 'text_only',
    }));
    const mergeAmazonContent = (master, cache, configuredMode) => {
      const mode = normalizeAmazonMode(configuredMode);
      if (mode === 'bootstrap') return bootstrapAmazonProducts(master);
      if (!cache || cache.schema_version !== 1 || cache.source !== 'amazon-creators-api' || cache.ttl_seconds > 86400) return mode === 'creators_api' ? [] : bootstrapAmazonProducts(master);
      const expiresAt = Date.parse(cache.expires_at || '');
      const fetchedAt = Date.parse(cache.fetched_at || '');
      if (!Number.isFinite(expiresAt) || !Number.isFinite(fetchedAt) || Date.now() >= expiresAt || expiresAt - fetchedAt > 86400000) return mode === 'creators_api' ? [] : bootstrapAmazonProducts(master);
      const byAsin = new Map((Array.isArray(cache.records) ? cache.records : []).map((record) => [asText(record.asin), record]));
      return (Array.isArray(master) ? master : []).map((item) => {
        const content = byAsin.get(asText(item.asin));
        if (!content?.title || !content?.image_url) return mode === 'creators_api' ? null : { ...item, amazon_content_mode: item.official_product_link_code ? 'product_link' : 'text_only' };
        return { ...item, product_title: content.title, image_url: content.image_url, product_summary: item.internal_description, alt_text: `${content.title} product image`, amazon_content_mode: 'creators_api' };
      }).filter(Boolean);
    };
    const configuredAmazonMode = normalizeAmazonMode(shelf?.dataset.affiliateAmazonMode);
    const dataPromise = isAmazon
      ? fetchJson(productsSrc).then((master) => configuredAmazonMode === 'bootstrap'
        ? mergeAmazonContent(master, null, configuredAmazonMode)
        : contentSrc
          ? fetchJson(contentSrc).then((cache) => mergeAmazonContent(master, cache, configuredAmazonMode)).catch(() => mergeAmazonContent(master, null, configuredAmazonMode))
          : mergeAmazonContent(master, null, configuredAmazonMode))
      : fetchJson(productsSrc);
    dataPromise
      .then((data) => {
        const allProducts = Array.isArray(data)
          ? data.filter((item) => item && (item.enabled === true || item.status === 'active') && productId(item))
            .filter((item) => !platformFilter.length || platformFilter.includes(item.platform))
            .filter((item) => isAmazon
              ? validAffiliateUrl(item.affiliate_url_full)
              : validAffiliateUrl(item.affiliateUrl) || validAffiliateUrl(item.fallbackUrl))
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
};

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', startAffiliateShelf, { once: true });
else startAffiliateShelf();
