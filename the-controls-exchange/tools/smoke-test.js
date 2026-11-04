#!/usr/bin/env node
// Browser smoke test for The Controls Exchange.
//
//   node the-controls-exchange/tools/smoke-test.js [screenshot-dir]
//
// Serves the repository root on a local port, opens every page in headless Chromium
// (desktop and phone widths) and fails on any console error, page error or blocked
// resource (a CSP hash mismatch shows up here as a console error).
// Requires Playwright with Chromium installed: npm i -g playwright && npx playwright install chromium
const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..', '..');
const shotDir = process.argv[2];
const types = { '.html': 'text/html; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.webp': 'image/webp', '.md': 'text/markdown; charset=utf-8', '.xml': 'application/xml', '.txt': 'text/plain' };

const server = http.createServer((req, res) => {
  const rel = decodeURIComponent(new URL(req.url, 'http://x').pathname).replace(/^\/+/, '') || 'index.html';
  const file = path.join(root, rel);
  if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});

(async () => {
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = `http://127.0.0.1:${server.address().port}/`;
  const pages = fs.readdirSync(root).filter(f => f.endsWith('.html')).sort();
  const browser = await chromium.launch();
  let failures = 0;
  for (const [label, viewport] of [['desktop', { width: 1440, height: 900 }], ['phone', { width: 390, height: 844 }]]) {
    for (const file of pages) {
      const page = await browser.newPage({ viewport });
      const problems = [];
      page.on('console', m => { if (m.type() === 'error') problems.push(m.text()); });
      page.on('pageerror', e => problems.push('pageerror: ' + e.message));
      page.on('requestfailed', r => problems.push('request failed: ' + r.url()));
      page.on('response', r => { if (r.status() >= 400) problems.push(`HTTP ${r.status()}: ${r.url()}`); });
      await page.goto(base + file, { waitUntil: 'networkidle' });
      await page.waitForTimeout(300);
      let detail = '';
      if (file === 'index.html') {
        const info = await page.evaluate(() => ({
          folders: document.querySelectorAll('#track-nav [data-folder]').length,
          status: (document.querySelector('.statusbar')?.innerText || '').replace(/\s+/g, ' ').trim()
        }));
        detail = ` | ${info.folders} nav folders | ${info.status}`;
        if (!info.folders) problems.push('navigation tree did not render');
        if (shotDir) await page.screenshot({ path: path.join(shotDir, `home-${label}.png`) });
      }
      if (problems.length) failures++;
      console.log(`${problems.length ? 'FAIL' : 'ok  '} ${label.padEnd(7)} ${file}${detail}`);
      for (const p of problems) console.log('      ' + p);
      await page.close();
    }
  }
  await browser.close();
  server.close();
  console.log(failures ? `${failures} page load(s) with problems` : 'All pages loaded without errors');
  process.exit(failures ? 1 : 0);
})().catch(err => { console.error(err); server.close(); process.exit(1); });
