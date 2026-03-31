# Multipage version of the website

Files included:
- index.html
- about.html
- teaching.html
- academic.html
- resources.html
- services.html
- contact.html

Assets:
- assets/css/style.css (original extracted styles)
- assets/css/multipage.css (small multipage helper layer)
- assets/js/site.js (original extracted script + language persistence + current-page highlight)

Notes:
- Put your portrait image and CV files into the same places you plan to use in GitHub.
- The original font references were preserved inside `assets/css/style.css`. If your font files already exist in the repo, just adjust the paths if needed.
- Placeholder links for booking, CV, and legal info were left as they were in the original file.


## Quick content editing

Main placeholders are now centralized in `assets/js/site.js` inside the `siteConfig` object.
Edit these values there:
- `bookingUrl`
- `contactEmail`
- `travelProjectUrl`
- `cvFile`
- `institutionLinks`

For downloadable local files, place them in `assets/docs/` and point `cvFile` to the file path, for example:
`assets/docs/CV.pdf`
