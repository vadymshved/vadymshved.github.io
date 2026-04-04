# Vadym Shved Website

## Final multilingual structure

This website uses:
- one HTML file per page
- one canonical JSON translation file per language
- one localization loader in `assets/js/site.js`

## Translation files
- `assets/i18n/en.json`
- `assets/i18n/uk.json`
- `assets/i18n/de.json`
- `assets/i18n/fr.json`
- `assets/i18n/es.json`
- `assets/i18n/pl.json`

## Important rule
HTML keeps English text directly inside the translated elements:

```html
<h2 data-i18n="gallery_title">Gallery</h2>
```

This means:
- English stays the base language
- the page remains readable if JS fails
- other languages are applied by `site.js`

## How translations now load (fixed)

`assets/js/site.js` always fetches the JSON file for the active language on every page load:

1. **JSON file** (`assets/i18n/<lang>.json`) — primary source, always loaded fresh via `fetch()` with `cache: 'no-store'`
2. **`assets/js/i18n-inline.js`** — fallback only, used if the JSON fetch fails (e.g. `file://` restrictions)
3. **localStorage** — only used to remember which language the user last selected; it is no longer used to cache translation packs

**To edit a translation:** open the relevant `assets/i18n/<lang>.json`, change the value for the key you want, save, and reload the page. The updated text will appear immediately.

**One-time step after updating:** if you had previously used the site with caching active, open browser DevTools → Application → Local Storage → delete any keys starting with `i18nCache::`. These stale cache entries are no longer read, so this is optional, but it keeps storage clean.

## Note for local testing
When opening the website directly from a ZIP-extracted folder via `file://`, some browsers may restrict JSON loading.
In that case, the site falls back to `assets/js/i18n-inline.js` automatically (which still contains the last known translations).
For the most reliable multilingual editing workflow, use a simple local server (e.g. `npx serve .` or VS Code Live Server).
English will always remain visible as fallback because the HTML itself contains the English source text.
