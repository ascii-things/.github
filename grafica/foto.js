// node foto.js <cartella grafica> : banner.png (1280x420) e avatar.png (500x500)
const { chromium } = require('playwright');
const path = require('path');
const dir = path.resolve(process.argv[2]);
(async () => {
  const b = await chromium.launch();
  for (const [tipo, w, h] of [['banner', 1280, 420], ['avatar', 500, 500]]) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
    await p.goto(require('url').pathToFileURL(path.join(dir, 'disegno.html')).href + '?tipo=' + tipo);
    await p.waitForFunction(() => document.title === 'pronto');
    await p.screenshot({ path: path.join(dir, tipo + '.png') });
  }
  await b.close(); console.log('ok');
})().catch(e => { console.error(e); process.exit(1); });
