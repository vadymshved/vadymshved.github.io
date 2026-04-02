HOME IMAGES FIX

What was wrong:
- The uploaded images were added to the project, but the Home page was still pointing to old placeholder SVG files.
- The hero portrait box also had no active runtime binding in the current build.

What is fixed now:
1. Hero portrait is connected to:
   assets/images/gallery/portrait/hero-portrait.jpg
2. Home preview cards now use:
   assets/images/gallery/teaching/teaching-1.jpg
   assets/images/gallery/science/science-1.jpg
   assets/images/gallery/life/life-1.jpg
3. JSON files were updated:
   - assets/data/site-media.json
   - assets/data/gallery-items.json
   - assets/data/images-home.json
   - assets/data/gallery-data.js
4. index.html was patched so the images are visible immediately even when the site is opened locally from file://

How to replace later:
- Replace only these files, keep the names:
  assets/images/gallery/portrait/hero-portrait.jpg
  assets/images/gallery/teaching/teaching-1.jpg
  assets/images/gallery/science/science-1.jpg
  assets/images/gallery/life/life-1.jpg
