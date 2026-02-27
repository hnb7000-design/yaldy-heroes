/**
 * fix-image-dimensions.js
 * Scans all HTML files, finds <img> tags missing width/height,
 * reads the actual image dimensions from disk, and adds them.
 */

const fs = require('fs');
const path = require('path');
const { imageSize } = require('image-size');

// HTML files to process
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

const report = [];
const errors = [];

function resolveImagePath(src, htmlFilePath) {
  if (!src || src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
    return null;
  }
  const htmlDir = path.dirname(htmlFilePath);
  return path.resolve(htmlDir, src);
}

function getImageDimensions(imgPath) {
  try {
    if (!fs.existsSync(imgPath)) return null;
    const buf = fs.readFileSync(imgPath);
    const dims = imageSize(new Uint8Array(buf));
    if (dims && dims.width && dims.height) {
      return { width: dims.width, height: dims.height };
    }
    return null;
  } catch (err) {
    errors.push(`  Could not read dimensions: ${imgPath} — ${err.message}`);
    return null;
  }
}

function processFile(htmlFilePath) {
  const relPath = path.relative(ROOT, htmlFilePath);
  let content = fs.readFileSync(htmlFilePath, 'utf8');

  // Match all <img ...> tags
  const imgRegex = /<img\b([^>]*)>/gi;
  let totalImages = 0;
  let alreadyHaveDims = 0;
  let fixed = 0;
  let skipped = 0;

  const newContent = content.replace(imgRegex, (fullMatch, attrs) => {
    totalImages++;

    const hasWidth = /\bwidth\s*=\s*["']\d+["']/i.test(attrs) || /\bwidth\s*=\s*\d+/i.test(attrs);
    const hasHeight = /\bheight\s*=\s*["']\d+["']/i.test(attrs) || /\bheight\s*=\s*\d+/i.test(attrs);

    if (hasWidth && hasHeight) {
      alreadyHaveDims++;
      return fullMatch;
    }

    // Extract src
    const srcMatch = attrs.match(/\bsrc\s*=\s*["']([^"']+)["']/i);
    if (!srcMatch) {
      skipped++;
      errors.push(`  No src found in <img> tag in ${relPath}`);
      return fullMatch;
    }

    const src = srcMatch[1];
    const imgPath = resolveImagePath(src, htmlFilePath);
    if (!imgPath) {
      skipped++;
      return fullMatch; // external URL or data URI
    }

    const dims = getImageDimensions(imgPath);
    if (!dims) {
      skipped++;
      errors.push(`  Image not found or unreadable: ${src} in ${relPath}`);
      return fullMatch;
    }

    // Add width and height attributes before the closing >
    // Insert right after <img (before existing attributes) or at end
    let newAttrs = attrs;

    if (!hasWidth) {
      newAttrs = newAttrs.trimEnd() + ` width="${dims.width}"`;
    }
    if (!hasHeight) {
      newAttrs = newAttrs.trimEnd() + ` height="${dims.height}"`;
    }

    fixed++;
    return `<img${newAttrs}>`;
  });

  if (newContent !== content) {
    fs.writeFileSync(htmlFilePath, newContent, 'utf8');
  }

  report.push({
    file: relPath,
    total: totalImages,
    withDims: alreadyHaveDims + fixed,
    fixed: fixed,
    skipped: skipped,
  });
}

// Process all files
console.log('Scanning HTML files for images missing width/height...\n');

htmlFiles.forEach(f => {
  if (fs.existsSync(f)) {
    processFile(f);
  } else {
    console.log(`File not found: ${f}`);
  }
});

// Print report
console.log('=' .repeat(80));
console.log('IMAGE DIMENSIONS REPORT');
console.log('=' .repeat(80));
console.log('');
console.log(
  'File'.padEnd(42) +
  'Total'.padStart(7) +
  'WithDims'.padStart(10) +
  'Fixed'.padStart(7) +
  'Skipped'.padStart(9)
);
console.log('-'.repeat(75));

let grandTotal = 0, grandWithDims = 0, grandFixed = 0, grandSkipped = 0;

report.forEach(r => {
  console.log(
    r.file.padEnd(42) +
    String(r.total).padStart(7) +
    String(r.withDims).padStart(10) +
    String(r.fixed).padStart(7) +
    String(r.skipped).padStart(9)
  );
  grandTotal += r.total;
  grandWithDims += r.withDims;
  grandFixed += r.fixed;
  grandSkipped += r.skipped;
});

console.log('-'.repeat(75));
console.log(
  'TOTAL'.padEnd(42) +
  String(grandTotal).padStart(7) +
  String(grandWithDims).padStart(10) +
  String(grandFixed).padStart(7) +
  String(grandSkipped).padStart(9)
);

if (errors.length > 0) {
  console.log('\n--- Errors/Warnings ---');
  errors.forEach(e => console.log(e));
}

console.log('\nDone!');
