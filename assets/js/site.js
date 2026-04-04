(function () {
  const LANGS = ['en', 'uk', 'de', 'fr', 'es', 'pl'];
  const LANG_ALIAS = { ua: 'uk', uk: 'uk', en: 'en', de: 'de', fr: 'fr', es: 'es', pl: 'pl' };
  const LANG_LABELS = { en: 'EN', uk: 'UA', de: 'DE', fr: 'FR', es: 'ES', pl: 'PL' };

  function normalizeLanguageCode(lang) {
    return LANG_ALIAS[String(lang || '').toLowerCase()] || 'en';
  }

  function getInlinePack(lang) {
    const normalized = normalizeLanguageCode(lang);
    const source = window.__I18N_INLINE__ || {};
    return source[normalized] || null;
  }

  function getStorageKey(lang) {
    return 'i18nCache::' + normalizeLanguageCode(lang);
  }

  function readCachedPack(lang) {
    try {
      const raw = localStorage.getItem(getStorageKey(lang));
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function writeCachedPack(lang, pack) {
    try {
      localStorage.setItem(getStorageKey(lang), JSON.stringify(pack));
    } catch (e) {}
  }

  async function loadJsonLanguage(lang) {
    const normalized = normalizeLanguageCode(lang);
    // JSON files are always the primary source. i18n-inline.js is a fallback only.
    const response = await fetch(`assets/i18n/${normalized}.json`, { cache: 'no-store' });
    if (!response.ok) throw new Error('Language file not found');
    return await response.json();
  }

  function captureOriginals() {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      if (!el.dataset.i18nOriginal) el.dataset.i18nOriginal = el.textContent;
    });
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      if (!el.dataset.i18nHtmlOriginal) el.dataset.i18nHtmlOriginal = el.innerHTML;
    });
    document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
      if (!el.dataset.i18nAltOriginal) el.dataset.i18nAltOriginal = el.getAttribute('alt') || '';
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      if (!el.dataset.i18nPlaceholderOriginal) el.dataset.i18nPlaceholderOriginal = el.getAttribute('placeholder') || '';
    });
    document.querySelectorAll('[data-i18n-title]').forEach((el) => {
      if (!el.dataset.i18nTitleOriginal) el.dataset.i18nTitleOriginal = el.getAttribute('title') || '';
    });
    document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
      if (!el.dataset.i18nAriaLabelOriginal) el.dataset.i18nAriaLabelOriginal = el.getAttribute('aria-label') || '';
    });
    const title = document.querySelector('title[data-i18n]');
    if (title && !title.dataset.i18nOriginal) title.dataset.i18nOriginal = title.textContent;
  }

  let __currentSelectedPack = {};
  let __currentEnglishPack = {};

  function resolveValue(key, selectedPack, englishPack, originalValue) {
    if (selectedPack && typeof selectedPack[key] === 'string' && selectedPack[key].trim() !== '') return selectedPack[key];
    if (englishPack && typeof englishPack[key] === 'string' && englishPack[key].trim() !== '') return englishPack[key];
    return originalValue;
  }

  function applyTranslations(selectedPack, englishPack) {
    captureOriginals();

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      el.textContent = resolveValue(key, selectedPack, englishPack, el.dataset.i18nOriginal || el.textContent);
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      el.innerHTML = resolveValue(key, selectedPack, englishPack, el.dataset.i18nHtmlOriginal || el.innerHTML);
    });

    document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
      const key = el.getAttribute('data-i18n-alt');
      el.setAttribute('alt', resolveValue(key, selectedPack, englishPack, el.dataset.i18nAltOriginal || ''));
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.setAttribute('placeholder', resolveValue(key, selectedPack, englishPack, el.dataset.i18nPlaceholderOriginal || ''));
    });

    document.querySelectorAll('[data-i18n-title]').forEach((el) => {
      const key = el.getAttribute('data-i18n-title');
      el.setAttribute('title', resolveValue(key, selectedPack, englishPack, el.dataset.i18nTitleOriginal || ''));
    });

    document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
      const key = el.getAttribute('data-i18n-aria-label');
      el.setAttribute('aria-label', resolveValue(key, selectedPack, englishPack, el.dataset.i18nAriaLabelOriginal || ''));
    });

    const title = document.querySelector('title[data-i18n]');
    if (title) {
      const key = title.getAttribute('data-i18n');
      title.textContent = resolveValue(key, selectedPack, englishPack, title.dataset.i18nOriginal || title.textContent);
    }
  }

  function updateLanguageUI(lang) {
    const normalized = normalizeLanguageCode(lang);
    document.documentElement.lang = normalized;

    const label = document.querySelector('.lang-label');
    if (label) label.textContent = LANG_LABELS[normalized] || normalized.toUpperCase();

    document.querySelectorAll('.lang-option').forEach((btn) => {
      btn.classList.toggle('active', normalizeLanguageCode(btn.dataset.lang) === normalized);
    });
  }

  function revealPage() {
    document.documentElement.classList.remove('i18n-preload');
  }

  async function getPackWithFallback(lang) {
    const normalized = normalizeLanguageCode(lang);
    // Always load from JSON files — no localStorage cache read here.
    // This ensures manual edits to JSON files are always reflected immediately.
    try {
      const loaded = await loadJsonLanguage(normalized);
      return loaded || {};
    } catch (e) {
      // JSON fetch failed (e.g. file:// restrictions, network error).
      // Fall back to inline pack, then to any previously cached pack.
      const inlinePack = getInlinePack(normalized);
      if (inlinePack) return inlinePack;
      const cached = readCachedPack(normalized);
      return cached || {};
    }
  }

  async function setLanguage(lang) {
    const normalized = normalizeLanguageCode(lang);
    const englishPack = await getPackWithFallback('en');
    const selectedPack = normalized === 'en' ? englishPack : await getPackWithFallback(normalized);

    __currentSelectedPack = selectedPack || {};
    __currentEnglishPack = englishPack || {};
    applyTranslations(selectedPack, englishPack);
    updateLanguageUI(normalized);
    localStorage.setItem('siteLanguage', normalized);
    document.dispatchEvent(new CustomEvent('site-language-updated', { detail: { lang: normalized } }));
    revealPage();
    return normalized;
  }

  function initLanguageOptions() {
    document.querySelectorAll('.lang-option').forEach((btn) => {
      btn.addEventListener('click', async () => {
        document.documentElement.classList.add('i18n-preload');
        await setLanguage(btn.dataset.lang);
        if (typeof window.closeLanguageMenu === 'function') window.closeLanguageMenu();
      });
    });
  }

  async function initI18n() {
    const saved = normalizeLanguageCode(localStorage.getItem('siteLanguage') || document.documentElement.getAttribute('data-initial-lang') || 'en');
    initLanguageOptions();
    try {
      await setLanguage(saved);
    } catch (e) {
      // If setLanguage() throws for any reason, always reveal the page
      // so the user is never left looking at a blank screen.
      revealPage();
    }
  }

  function getText(key, fallback) {
    return resolveValue(key, __currentSelectedPack, __currentEnglishPack, fallback || '');
  }

  window.SiteI18n = { setLanguage, normalizeLanguageCode, getText };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initI18n, { once: true });
  } else {
    initI18n();
  }

  // NOTE: window.addEventListener('load', revealPage) intentionally removed.
  // The load event fires after images/CSS are fetched but BEFORE the async
  // JSON translation fetches complete — causing the body to flash in English
  // before the selected language was applied. revealPage() is now called
  // exclusively inside setLanguage(), after applyTranslations() has run.
})();
