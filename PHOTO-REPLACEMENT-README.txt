# PHOTO REPLACEMENT GUIDE

This website now uses a JSON-driven image system for:
- Home hero portrait
- Home preview block (Teaching / Science / Life)
- About preview block
- Teaching preview block
- Academic Background preview block
- Gallery page

---
## 1. MAIN IMAGE DATA FILES

Inside `assets/data/` you have these files:

### `gallery-categories.json`
Controls gallery categories and filter buttons on `gallery.html`.

### `gallery-items.json`
Controls all gallery images and captions.
Every image that should appear in the gallery must be described here.

### `gallery-previews.json`
Controls the 3-image preview blocks on these pages:
- Home
- About
- Teaching
- Academic Background

### `site-media.json`
Controls special site images outside the normal gallery system.
Right now it includes:
- Home hero portrait

### `gallery-data.js`
This is a fallback mirror for local browser usage when JSON cannot be loaded with `file://`.
If you test locally and changes do not appear, update this file too or use a local server / GitHub Pages.

---
## 2. FOLDER STRUCTURE FOR IMAGES

Put images here:

- Home hero portrait:
  `assets/images/gallery/portrait/`

- Gallery and preview images:
  `assets/images/gallery/teaching/`
  `assets/images/gallery/science/`
  `assets/images/gallery/life/`
  `assets/images/gallery/academic/`   (future use)
  `assets/images/gallery/travel/`     (future use)
  `assets/images/gallery/projects/`   (future use)

You can create more folders later if you add more categories.

---
## 3. HOW TO REPLACE THE HOME HERO PORTRAIT

### Current config file:
`assets/data/site-media.json`

### Current key:
`homeHeroPortrait`

### Example:
```json
{
  "homeHeroPortrait": {
    "src": "assets/images/gallery/portrait/hero-portrait.jpg",
    "alt": "Professional portrait",
    "label": "Professional portrait"
  }
}
```

### Steps:
1. Put your portrait file into:
   `assets/images/gallery/portrait/`
2. Open:
   `assets/data/site-media.json`
3. Change the `src` value to your file path
4. Save
5. Refresh the page

### Recommended file types:
- `.jpg`
- `.jpeg`
- `.png`
- `.webp`

---
## 4. HOW TO REPLACE THE 3 PREVIEW IMAGES ON HOME

### Page block:
Home → `Teaching, Science & Life`

### Data file:
`assets/data/gallery-previews.json`

### Page key:
`home`

### Example:
```json
"home": {
  "title": "Teaching, Science & Life",
  "text": "A visual glimpse into teaching, academic work, and personal experience beyond the standard profile blocks.",
  "targetHash": "all",
  "items": [
    { "itemId": "teaching-1", "label": "Teaching" },
    { "itemId": "science-1", "label": "Science" },
    { "itemId": "life-1", "label": "Life" }
  ]
}
```

### Important:
The preview block does not store image files directly.
It uses `itemId` values from `gallery-items.json`.

So if you want to change one preview image:
1. Put a new image file into the correct folder
2. Add or update its object in `gallery-items.json`
3. Use that image `id` inside `gallery-previews.json`

---
## 5. HOW TO REPLACE THE 3 PREVIEW IMAGES ON ABOUT

### Page block:
About → `A visual side of my profile`

### Data file:
`assets/data/gallery-previews.json`

### Page key:
`about`

### Example:
```json
"about": {
  "title": "A visual side of my profile",
  "text": "Selected moments from teaching, science, and everyday professional life that add a more personal dimension to the site.",
  "targetHash": "all",
  "items": [
    { "itemId": "teaching-2", "label": "Teaching" },
    { "itemId": "science-2", "label": "Science" },
    { "itemId": "life-2", "label": "Life" }
  ]
}
```

---
## 6. HOW TO REPLACE THE 3 PREVIEW IMAGES ON TEACHING

### Page block:
Teaching → `Teaching in practice`

### Data file:
`assets/data/gallery-previews.json`

### Page key:
`teaching`

### Example:
```json
"teaching": {
  "title": "Teaching in practice",
  "text": "A visual overview of classroom work, tutoring, and chemistry teaching moments in different educational contexts.",
  "targetHash": "teaching",
  "items": [
    { "itemId": "teaching-1", "label": "Classroom" },
    { "itemId": "teaching-3", "label": "Tutoring" },
    { "itemId": "teaching-4", "label": "Chemistry Practice" }
  ]
}
```

---
## 7. HOW TO REPLACE THE 3 PREVIEW IMAGES ON ACADEMIC BACKGROUND

### Page block:
Academic Background → `Academic Environment`

### Data file:
`assets/data/gallery-previews.json`

### Page key:
`academic`

### Example:
```json
"academic": {
  "title": "Academic Environment",
  "text": "A visual overview of laboratory work, academic context, and research-related environments connected with chemistry and science.",
  "targetHash": "science",
  "items": [
    { "itemId": "science-1", "label": "Laboratory" },
    { "itemId": "science-2", "label": "Research" },
    { "itemId": "science-3", "label": "Academic Context" }
  ]
}
```

---
## 8. HOW TO ADD A NEW IMAGE TO THE GALLERY

### Main file:
`assets/data/gallery-items.json`

Each image needs an object like this:

```json
{
  "id": "teaching-5",
  "filename": "assets/images/gallery/teaching/teaching-5.jpg",
  "category": "teaching",
  "title": "Teaching 5",
  "caption": "Chemistry classroom session",
  "alt": "Chemistry classroom session",
  "visible": true,
  "featured": false,
  "order": 15,
  "previewTargets": ["home", "teaching"]
}
```

### Meaning of fields:
- `id` → unique image ID
- `filename` → relative file path
- `category` → category id from `gallery-categories.json`
- `title` → short internal/display title
- `caption` → visible caption on gallery page
- `alt` → accessibility text
- `visible` → show in gallery grid or not
- `featured` → reserved for future highlight logic
- `order` → sort order
- `previewTargets` → optional list of pages where you may want to reuse it later

### Steps:
1. Put your image file in the correct folder
2. Add its object to `gallery-items.json`
3. Save
4. Refresh the site

---
## 9. HOW TO USE A GALLERY IMAGE INSIDE A PREVIEW BLOCK

After adding an image to `gallery-items.json`, use its `id` in:
`assets/data/gallery-previews.json`

Example:
```json
{ "itemId": "teaching-5", "label": "Classroom" }
```

This means:
- `itemId` must already exist in `gallery-items.json`
- `label` is the short text shown under the preview image

---
## 10. HOW TO ADD A NEW CATEGORY TO THE GALLERY

### File:
`assets/data/gallery-categories.json`

### Example object:
```json
{
  "id": "travel",
  "title": "Travel",
  "description": "International and travel-related images.",
  "icon": "airplane-tilt",
  "order": 5,
  "visibleInFilters": true,
  "visibleAsAlbum": true,
  "hash": "travel",
  "coverImage": "assets/images/gallery/travel/cover.jpg",
  "albumText": "Travel, cities, and international experience."
}
```

### Steps:
1. Create the image folder:
   `assets/images/gallery/travel/`
2. Add the category object to `gallery-categories.json`
3. Add gallery items in `gallery-items.json` with:
   `"category": "travel"`
4. If needed, create a cover image file and point `coverImage` to it

---
## 11. IMPORTANT: LOCAL TESTING VS GITHUB PAGES

If you open HTML files directly using `file://`, some browsers may block JSON loading.

### If that happens:
Either:
- use GitHub Pages / local server

Or:
- also update `assets/data/gallery-data.js`

Because `gallery-data.js` is the fallback mirror used when JSON cannot load.

---
## 12. FAST WORKFLOW SUMMARY

### Replace Home hero portrait:
- update file in `assets/images/gallery/portrait/`
- update `assets/data/site-media.json`

### Replace Home / About / Teaching / Academic preview images:
- update or add image in `assets/images/gallery/...`
- update `assets/data/gallery-items.json`
- update `assets/data/gallery-previews.json`

### Add more gallery images:
- put file into folder
- add object to `gallery-items.json`

### Add a new gallery category:
- create folder
- add object to `gallery-categories.json`
- add items to `gallery-items.json`

---
## 13. FILES YOU WILL MOST OFTEN EDIT

Most common files:
- `assets/data/site-media.json`
- `assets/data/gallery-items.json`
- `assets/data/gallery-previews.json`

Less often:
- `assets/data/gallery-categories.json`

Only if local fallback is needed:
- `assets/data/gallery-data.js`
