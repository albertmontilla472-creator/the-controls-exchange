#!/usr/bin/env node
// Before/after screenshots: serves two copies of the site and captures the same views from each.
// Usage: node the-controls-exchange/tools/visual-compare.js <before-dir> <after-dir> <out-dir>
// Make <before-dir> with:  git worktree add --detach ../cx-before origin/main
// Then compare with:      python3 the-controls-exchange/tools/visual-diff.py <out-dir>
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const { chromium } = require('playwright');

const [beforeDir, afterDir, outDir] = process.argv.slice(2);
if (!beforeDir || !afterDir || !outDir) {
  console.error('usage: visual-compare.js <before-dir> <after-dir> <out-dir>');
  process.exit(2);
}
const TYPES = { '.html': 'text/html; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.md': 'text/plain; charset=utf-8' };
const VIEWS = [
  ['home', 'index.html#library/home'],
  ['folder-lon-ft10', 'index.html#library/protocol-lon-ft10'],
  ['folder-drivers', 'index.html#library/drivers'],
  ['news', 'index.html#news/news'],
  ['software', 'index.html#software/downloads'],
  ['programming', 'index.html#programming/programming'],
  ['recommended', 'index.html#recommended/recommended'],
  ['collection-niagara-4', 'niagara-4.html'],
  ['privacy', 'privacy.html'],
];
const SIZES = [['desktop', { width: 1440, height: 900 }, false], ['phone', { width: 390, height: 844 }, true]];

function serve(root) {
  const server = http.createServer((req, res) => {
    const file = path.join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname).slice(1) || 'index.html');
    if (!file.startsWith(path.resolve(root)) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise(resolve => server.listen(0, '127.0.0.1', () => resolve(server)));
}

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const servers = { before: await serve(path.resolve(beforeDir)), after: await serve(path.resolve(afterDir)) };
  const browser = await chromium.launch();
  for (const [sizeName, viewport, mobile] of SIZES) {
    for (const [name, url] of VIEWS) {
      for (const side of ['before', 'after']) {
        const page = await browser.newPage({ viewport, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: 1 });
        await page.goto(`http://127.0.0.1:${servers[side].address().port}/${url}`, { waitUntil: 'networkidle' });
        await page.waitForTimeout(400);
        await page.screenshot({ path: path.join(outDir, `${sizeName}-${name}-${side}.png`) });
        await page.close();
      }
    }
  }
  await browser.close();
  for (const s of Object.values(servers)) s.close();
  console.log(`saved ${SIZES.length * VIEWS.length * 2} screenshots to ${outDir}`);
})();
