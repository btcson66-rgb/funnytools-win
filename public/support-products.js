(() => {
  const grid = document.querySelector('[data-support-products]');
  const refreshButton = document.querySelector('[data-refresh-products]');
  const status = document.querySelector('[data-resource-status]');
  if (!(grid instanceof HTMLElement) || !(refreshButton instanceof HTMLButtonElement)) return;

  const batchSize = 8;
  const isEnglish = document.documentElement.lang.toLowerCase().startsWith('en');
  const platformFilter = (grid.dataset.supportProductsPlatforms || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
  const labels = isEnglish
    ? {
      fallbackImageAlt: 'Recommended resource image',
      fallbackIcon: 'Resource',
      fallbackTitle: 'Recommended resource',
      cta: 'Open resource',
      ctaLabel: (title) => `Open recommended resource: ${title || 'Recommended resource'}`,
      status: (shown, total) => `Showing ${shown} recommended resource${shown === 1 ? '' : 's'} from ${total} available.`,
      empty: 'No recommended resources are available right now.',
      error: 'Recommended resources could not be loaded. Please try again later.',
    }
    : null;
  const icons = {
    'file-photo': '▣',
    productivity: '⌘',
    travel: '⌁',
    printing: '▤',
    'mobile-photo': '◉',
  };
  const platformLabels = {
    shopee: '蝦皮',
    coupang: '酷澎',
    amazon: 'Amazon',
    internal: 'FunnyTools',
    other: '其他',
  };
  let products = [];
  let previousIds = '';

  function shuffle(items) {
    const copy = [...items];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
    }
    return copy;
  }

  function selectBatch() {
    if (products.length <= batchSize) return [...products];
    let batch = [];
    for (let attempt = 0; attempt < 12; attempt += 1) {
      batch = shuffle(products).slice(0, batchSize);
      const ids = batch.map((item) => item.id).sort().join('|');
      if (ids !== previousIds) {
        previousIds = ids;
        return batch;
      }
    }
    return batch;
  }

  function validAffiliateUrl(value) {
    if (typeof value !== 'string' || !value.trim()) return '';
    try {
      const url = new URL(value);
      return url.protocol === 'https:' ? url.href : '';
    } catch {
      return '';
    }
  }

  function validImageUrl(value) {
    if (typeof value !== 'string' || !value.trim()) return '';
    try {
      const url = new URL(value, window.location.origin);
      const isLocalProductImage = url.origin === window.location.origin
        && url.pathname.startsWith('/assets/support-products/')
        && url.pathname.endsWith('.webp');
      return isLocalProductImage ? url.href : '';
    } catch {
      return '';
    }
  }

  function createCard(product) {
    const article = document.createElement('article');
    article.className = 'support-product-card';

    const imageUrl = validImageUrl(product.imageUrl);
    if (imageUrl) {
      const media = document.createElement('div');
      media.className = 'support-product-media';
      const image = document.createElement('img');
      image.src = imageUrl;
      image.alt = product.title || '酷澎商品圖片';
      image.loading = 'lazy';
      image.decoding = 'async';
      image.width = 640;
      image.height = 640;
      image.addEventListener('error', () => {
        const icon = document.createElement('span');
        icon.className = 'support-product-icon';
        icon.setAttribute('aria-hidden', 'true');
        icon.textContent = icons[product.category] || '◇';
        media.replaceWith(icon);
      }, { once: true });
      media.append(image);
      article.append(media);
    } else {
      const icon = document.createElement('span');
      icon.className = 'support-product-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = icons[product.category] || '◇';
      article.append(icon);
    }

    const platform = document.createElement('span');
    platform.className = 'support-product-platform';
    platform.textContent = platformLabels[product.platform] || platformLabels.other;
    article.append(platform);

    const heading = document.createElement('h3');
    heading.textContent = product.title || '實用資源';
    article.append(heading);

    const description = document.createElement('p');
    description.textContent = product.description || '';
    article.append(description);

    if (Array.isArray(product.tags) && product.tags.length) {
      const tags = document.createElement('ul');
      tags.className = 'support-product-tags';
      product.tags.slice(0, 3).forEach((tag) => {
        const item = document.createElement('li');
        item.textContent = String(tag);
        tags.append(item);
      });
      article.append(tags);
    }

    const href = validAffiliateUrl(product.affiliateUrl) || validAffiliateUrl(product.fallbackUrl);
    if (href) {
      const link = document.createElement('a');
      link.className = 'btn';
      link.href = href;
      link.target = '_blank';
      link.rel = 'sponsored nofollow noopener';
      link.textContent = '前往查看';
      link.setAttribute('aria-label', `前往酷澎查看：${product.title || '實用資源'}`);
      if (labels) {
        link.textContent = labels.cta;
        link.setAttribute('aria-label', labels.ctaLabel(product.title));
      }
      link.dataset.affiliateItemId = product.id;
      link.dataset.affiliatePlatform = product.platform || 'other';
      article.append(link);
    }

    return article;
  }
  function render() {
    const batch = selectBatch();
    grid.replaceChildren(...batch.map(createCard));
    grid.setAttribute('aria-busy', 'false');
    if (status) status.textContent = labels?.status(batch.length, products.length) || `目前顯示 ${batch.length} 項資源，共整理 ${products.length} 項。`;
  }

  refreshButton.addEventListener('click', render);

  grid.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target.closest('a[data-affiliate-item-id]') : null;
    if (!(target instanceof HTMLAnchorElement) || typeof window.gtag !== 'function') return;
    window.gtag('event', 'affiliate_click', {
      item_id: target.dataset.affiliateItemId || 'unknown',
      affiliate_platform: target.dataset.affiliatePlatform || 'other',
      link_domain: new URL(target.href).hostname,
    });
  });

  fetch('/data/support-products.json', { headers: { Accept: 'application/json' } })
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then((data) => {
      products = Array.isArray(data)
        ? data.filter((item) => item && item.status === 'active' && typeof item.id === 'string')
          .filter((item) => !platformFilter.length || platformFilter.includes(item.platform))
        : [];
      refreshButton.disabled = products.length <= batchSize;
      if (!products.length) {
        grid.setAttribute('aria-busy', 'false');
        if (status) status.textContent = labels?.empty || '目前沒有可顯示的資源。';
        return;
      }
      render();
    })
    .catch(() => {
      grid.setAttribute('aria-busy', 'false');
      if (status) status.textContent = labels?.error || '資源暫時無法載入，請稍後再試。';
    });
})();
