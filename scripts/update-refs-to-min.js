/**
 * update-refs-to-min.js
 * Updates all HTML files to reference minified CSS/JS files.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const htmlFiles = [
  'index.html',
  'pages/about.html',
  'pages/accessibility.html',
  'pages/cast.html',
  'pages/contact.html',
  'pages/david-king.html',
  'pages/david-shepherd.html',
  'pages/faq.html',
  'pages/policy.html',
  'pages/privacy.html',
  'pages/product-city-of-david.html',
  'pages/product-david-goliath.html',
  'pages/product-david-lion.html',
  'pages/product-valley-strike.html',
  'pages/refund.html',
  'pages/shipping.html',
  'pages/story.html',
  'pages/terms.html',
].map(f => path.join(ROOT, f));

const replacements = [
  // CSS: both root and pages/ paths
  { from: 'css/universe.css', to: 'css/universe.min.css' },
  { from: '../css/universe.css', to: '../css/universe.min.css' },
  // JS: both root and pages/ paths
  { from: 'js/universe.js', to: 'js/universe.min.js' },
  { from: '../js/universe.js', to: '../js/universe.min.js' },
];

let totalUpdated = 0;

htmlFiles.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  const relPath = path.relative(ROOT, filePath);

  replacements.forEach(r => {
    // Use exact string match to avoid partial replacements
    if (content.includes(r.from)) {
      content = content.split(r.from).join(r.to);
      changed = true;
    }
  });

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    totalUpdated++;
    console.log(`Updated: ${relPath}`);
  }
});

console.log(`\nDone! Updated ${totalUpdated} files.`);
