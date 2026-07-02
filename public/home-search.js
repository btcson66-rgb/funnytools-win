const homeSearchInput = document.querySelector('[data-home-search]');
const homeSearchItems = Array.from(document.querySelectorAll('[data-home-search-item]'));
const homeSearchResults = document.querySelector('[data-home-search-results]');
const homeSearchSection = document.querySelector('[data-home-search-section]');

if (homeSearchInput instanceof HTMLInputElement && homeSearchResults instanceof HTMLElement) {
  let homeSearchEmpty = null;

  const filterHomeTools = () => {
    const query = homeSearchInput.value.trim().toLowerCase();
    let matched = 0;
    let shown = 0;

    homeSearchItems.forEach((item) => {
      if (!(item instanceof HTMLElement)) return;

      const searchText = item.getAttribute('data-search') || '';
      const isDefault = item.getAttribute('data-default') === 'true';
      const isMatch = query === '' ? isDefault : searchText.includes(query);
      const shouldShow = isMatch && shown < 12;

      item.hidden = !shouldShow;

      if (isMatch) matched += 1;
      if (shouldShow) shown += 1;
    });

    const hasNoResults = query !== '' && matched === 0;

    if (hasNoResults && homeSearchEmpty === null) {
      homeSearchEmpty = document.createElement('p');
      homeSearchEmpty.className = 'empty-state';
      homeSearchEmpty.setAttribute('aria-live', 'polite');
      homeSearchEmpty.textContent = homeSearchSection instanceof HTMLElement
        ? homeSearchSection.dataset.emptyText || 'No matching tool yet. Try another keyword or view all tools.'
        : 'No matching tool yet. Try another keyword or view all tools.';
      homeSearchResults.insertAdjacentElement('afterend', homeSearchEmpty);
    } else if (!hasNoResults && homeSearchEmpty !== null) {
      homeSearchEmpty.remove();
      homeSearchEmpty = null;
    }
  };

  // Enter jumps to the full tools page with the query applied.
  homeSearchInput.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    const query = homeSearchInput.value.trim();
    if (query === '') return;
    const toolsPath = document.documentElement.lang === 'en' ? '/en/tools/' : '/tools/';
    window.location.href = `${toolsPath}?q=${encodeURIComponent(query)}`;
  });

  homeSearchInput.addEventListener('input', filterHomeTools);
  filterHomeTools();
}
