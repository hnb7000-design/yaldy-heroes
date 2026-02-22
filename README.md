# YALDY UNIVERSE — Project Folder
# ================================

## How to open in VSCode:
1. Open VSCode
2. File > Open Folder
3. Navigate to: Documents > YALDY_UNIVERSE
4. Click "Select Folder"

## Folder Structure:

```
YALDY_UNIVERSE/
|
|-- index.html              <-- Portal (Home page)
|
|-- pages/                  <-- All other HTML pages
|   |-- heroes-hub.html
|   |-- david-shepherd.html
|   |-- david-king.html
|   |-- joab.html
|   |-- chapters.html
|   |-- chapter-lion.html
|   |-- chapter-goliath.html
|   |-- artifacts.html
|   |-- about.html
|   |-- contact.html
|   |-- faq.html
|   |-- privacy.html
|   |-- terms.html
|   |-- shipping-returns.html
|   |-- accessibility.html
|   |-- gate-lead.html
|   |-- gate-welcome.html
|   |-- gate-unlocked.html
|   |-- gate-artifact.html
|
|-- images/
|   |-- heroes/             <-- Character images (cards, profiles, hero shots)
|   |   |-- david-shepherd-card.webp
|   |   |-- david-shepherd-hero.webp
|   |   |-- david-shepherd-profile.webp
|   |   |-- david-king-card.webp
|   |   |-- david-king-hero.webp
|   |   |-- joab-card.webp
|   |
|   |-- scenes/             <-- Cinematic scene backgrounds (slider images)
|   |   |-- slide-gate.webp
|   |   |-- slide-sheep.webp
|   |   |-- slide-tracks.webp
|   |   |-- slide-lion.webp
|   |
|   |-- icons/              <-- Logo, UI icons, badges
|   |   |-- yaldy-logo.png
|   |   |-- crown-icon.svg
|   |   |-- shield-icon.svg
|   |
|   |-- artifacts/          <-- Product images (puzzles)
|       |-- puzzle-lion-150.webp
|       |-- puzzle-goliath-300.webp
|       |-- puzzle-city-500.webp
|       |-- puzzle-valley-1000.webp
|
|-- css/                    <-- Stylesheets (future: when we split CSS from HTML)
|
|-- js/                     <-- JavaScript (future: when we split JS from HTML)
|
|-- docs/                   <-- Documentation & reference
    |-- SITEMAP.md          <-- Full Universe architecture & content map
    |-- README.md           <-- This file
```

## How to add images:

1. Go to Google Drive > "תמונות לאתר" folder
2. Download the image
3. Rename it according to the naming convention above
4. Place it in the correct subfolder under images/

### Naming rules:
- All lowercase
- Dashes instead of spaces: david-shepherd-card (not david_shepherd_card)
- Format: keep as .webp (lighter, faster loading)
- If you need .jpg/.png, that works too

## How to preview the site:

1. Open VSCode
2. Install extension: "Live Server" (by Ritwick Dey)
3. Right-click on index.html > "Open with Live Server"
4. The site opens in your browser at localhost:5500
5. Every time you save a file, it auto-refreshes!

## How to edit text:

1. Open the HTML file in VSCode
2. Use Ctrl+H (Find & Replace)
3. Find the Hebrew or English text you want to change
4. Replace it
5. Save (Ctrl+S)
6. Browser auto-refreshes (with Live Server)

## How to deploy (publish online):

1. Go to netlify.com/drop
2. Drag the entire YALDY_UNIVERSE folder into the browser
3. Done! You get a URL like yaldy-heroes.netlify.app

## Important links:

- Google Drive assets: https://drive.google.com/drive/folders/1-blVZE5biud1S3n70zq_9rqY9LjiegEp
- Old Wix site: https://www.yaldyheroes.com
- Sitemap document: docs/SITEMAP.md
