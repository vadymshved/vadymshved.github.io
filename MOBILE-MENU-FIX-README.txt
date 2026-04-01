MOBILE MENU FIX

What was changed:
- Replaced the old side drawer / blurred overlay behavior with a stable dropdown panel under the header.
- Removed backdrop blur from the mobile navigation panel.
- Added opacity / visibility / pointer-events logic so Safari does not leave a dark or untouchable layer on screen.
- Improved click handling so taps inside the menu do not immediately close it.

Result:
- On mobile, the menu opens as a white dropdown panel under the header.
- Tapping outside closes it.
- Tapping a link closes it.
- The language selector continues to work separately.

Main files changed:
- assets/css/multipage.css
- assets/js/site.js
