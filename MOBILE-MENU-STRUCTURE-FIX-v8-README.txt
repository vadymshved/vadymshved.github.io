MOBILE MENU STRUCTURE FIX V8

Root cause found:
- the mobile toggle button was outside `.topbar-inner`
- this broke the header layout and pushed the button to the left edge / divider area

What was fixed:
- moved the mobile toggle button inside `.topbar-inner`
- placed it after the language switcher
- kept the right-aligned dropdown behavior
- removed the active underline inside the mobile dropdown
- updated cache-bust to menufix8

This version should restore:
- language switch in its normal place
- menu button to the right of the language switch
- dropdown opening under that button
