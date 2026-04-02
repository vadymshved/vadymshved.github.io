MOBILE MENU FIX V2

Why this version is different:
- The previous fix still relied on a more complex active panel state.
- iPhone Safari can keep old CSS cached and can also behave badly with fixed / animated nav layers.

What was changed now:
- The mobile menu is now a very simple absolute dropdown panel under the header.
- No side drawer.
- No blur.
- No hidden overlay logic.
- Display is controlled mainly by display:none / display:block.
- CSS/JS links now include a version query string to force Safari to load the new files.

Files changed:
- assets/css/multipage.css
- assets/js/site.js
- all HTML pages now point to versioned CSS/JS assets

Important:
After uploading this version, force-refresh Safari on iPhone.
If Safari still shows the old behavior, clear the website data for that site or reload without cache.
