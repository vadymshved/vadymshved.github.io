Gallery data system

Files:
- gallery-categories.json  -> category definitions
- gallery-items.json       -> all gallery images and captions
- gallery-previews.json    -> 3-image preview blocks for pages
- site-media.json          -> hero portrait and other core site media
- gallery-data.js          -> JS fallback mirror of the JSON data for local browser testing

Recommended workflow:
1. Put image file into assets/images/gallery/<category>/
2. Add one new item object to gallery-items.json
3. If needed, reference that item id inside gallery-previews.json
4. If needed for hero image, update site-media.json

Important:
When you open HTML locally from file:// some browsers do not allow fetch() from JSON.
For that reason gallery-data.js mirrors the same data and keeps the gallery working offline.
