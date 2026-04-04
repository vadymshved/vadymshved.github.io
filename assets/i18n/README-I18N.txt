I18N STRUCTURE — VERIFIED FINAL MIRROR VERSION

Canonical language files used by the website:
- assets/i18n/en.json
- assets/i18n/uk.json
- assets/i18n/de.json
- assets/i18n/fr.json
- assets/i18n/es.json
- assets/i18n/pl.json

Verification result:
- All canonical language files now mirror the same key set.
- Current mirrored key count per language: 924

How the final system works:
1. English is the canonical base language.
2. HTML pages keep English text directly inside elements.
3. data-i18n / data-i18n-html / data-i18n-alt / data-i18n-placeholder / data-i18n-title / data-i18n-aria-label point to canonical translation keys.
4. site.js determines the selected language.
5. site.js loads one JSON file for the selected language.
6. If a translation key is missing or empty, English is used as fallback.
7. The page remains readable even if translation loading fails.

Important editing rule:
- If a translation is not ready yet in a non-English language file, keep the value empty:
  "example_key": ""
- The English HTML text and en.json value remain the visible fallback/default source.

No transitional localization folders are used anymore.


Local testing note:
An inline JS mirror of the canonical JSON files is bundled in assets/js/i18n-inline.js so language switching also works when pages are opened locally from file:// without a web server.
