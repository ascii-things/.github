// node banner-koi.js <index.html di ASCII Zoo> <uscita.png>
// Banner 1280x420: lo stagno delle koi vero di ASCII Zoo con il nome piccolo in mezzo.
const { chromium } = require('playwright');
const path = require('path'), url = require('url');
const [html, out] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1280, height: 420 }, deviceScaleFactor: 2 });
  await p.clock.install({ time: new Date('2026-11-18T22:10:00') });
  await p.goto(url.pathToFileURL(path.resolve(html)).href + '#koi');
  await p.clock.runFor(9000);
  await p.evaluate(() => {
    const st = document.createElement('style');
    st.textContent = `
      #titolo{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:99;text-align:center;
        font-family:"JetBrains Mono",Consolas,monospace;padding:22px 46px;white-space:nowrap;
        background:rgba(9,10,15,.94);border:1px solid rgba(255,179,71,.55);border-radius:4px;
        box-shadow:0 0 50px rgba(255,140,40,.18)}
      #titolo .n{font-size:54px;letter-spacing:6px;color:#f4efe6;text-shadow:0 0 14px rgba(255,220,180,.35)}
      #titolo .n b{color:#ff9a3c;font-weight:400;text-shadow:0 0 16px rgba(255,140,40,.8)}
      #titolo .s{margin-top:8px;font-size:17px;letter-spacing:2px;color:#8b98ab}`;
    document.head.appendChild(st);
    const d = document.createElement('div'); d.id = 'titolo';
    d.innerHTML = '<div class="n">ascii<b>.</b>things</div><div class="s">small, fast, open-source software made of text</div>';
    document.body.appendChild(d);
  });
  await p.clock.runFor(200);
  await p.screenshot({ path: out });
  await b.close(); console.log('ok');
})().catch(e => { console.error(e); process.exit(1); });
