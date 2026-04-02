I18N STRUCTURE

Primary flat language files used by the site:
assets/i18n/en.json
assets/i18n/uk.json
assets/i18n/de.json
assets/i18n/fr.json
assets/i18n/es.json
assets/i18n/pl.json

Additional organization copies:
assets/i18n/pages/<lang>/common.json
assets/i18n/pages/<lang>/home.json
assets/i18n/pages/<lang>/gallery.json
assets/i18n/pages/<lang>/library.json
assets/i18n/pages/<lang>/portfolio.json
assets/i18n/pages/<lang>/misc.json

Extra exact-text replacement layer:
assets/i18n/text-replacements/<lang>.json

How the system works:
1. English remains the source-of-truth.
2. site.js now tries to load language JSON from assets/i18n/.
3. data-i18n elements are translated first.
4. A second pass applies text-replacements for hardcoded labels and selected page text that still lives directly in HTML.
5. If a JSON file is missing, the original inline English fallback remains available.

Note:
This package externalizes and structures the multilingual system.
Some long hardcoded academic / project prose may still need future spot extraction to become 100% JSON-driven.
