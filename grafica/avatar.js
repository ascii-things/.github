// node avatar.js <cartella grafica> : avatar.png 500x500 (a.t)
const { chromium } = require('playwright');
const path = require('path'), url = require('url');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 500, height: 500 }, deviceScaleFactor: 2 });
  await p.goto(url.pathToFileURL(path.join(path.resolve(process.argv[2]), 'avatar.html')).href);
  await p.waitForFunction(() => document.title === 'pronto');
  await p.screenshot({ path: path.join(path.resolve(process.argv[2]), 'avatar.png') });
  await b.close(); console.log('ok');
})().catch(e => { console.error(e); process.exit(1); });
