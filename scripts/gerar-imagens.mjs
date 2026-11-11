import { chromium } from 'playwright-core';
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
const src = fs.readFileSync('src/data/glifo.ts', 'utf8');
const C1 = src.match(/C1 = (".*?");/)[1], C2 = src.match(/C2 = (".*?");/)[1];
const p1 = JSON.parse(C1), p2 = JSON.parse(C2);
const grad = `<linearGradient id="o" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8a6526"/><stop offset=".38" stop-color="#dcbd78"/><stop offset=".55" stop-color="#b8924a"/><stop offset="1" stop-color="#7a5620"/></linearGradient>`;
const mono = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s}) translate(-8 -10)"><path d="${p1}" fill="url(#o)"/><path d="${p2}" fill="url(#o)"/></g>`;
// favicon.svg: quadrado marinho com o CC dourado
const fav = (pad) => { const s = (100 - pad * 2) / 178; const w = 166 * s; return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs>${grad}</defs><rect width="100" height="100" rx="${pad > 14 ? 0 : 18}" fill="#12203a"/>${mono((100 - w) / 2, pad, s)}</svg>`; };
fs.writeFileSync('public/favicon.svg', fav(12));
fs.writeFileSync('public/mask.tmp.svg', fav(22));
const cinzel = 'data:font/woff2;base64,' + fs.readFileSync('node_modules/@fontsource/cinzel/files/cinzel-latin-500-normal.woff2').toString('base64');
const corm = 'data:font/woff2;base64,' + fs.readFileSync('node_modules/@fontsource/eb-garamond/files/eb-garamond-latin-500-normal.woff2').toString('base64');
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const shot = async (html, w, h, out) => {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  await p.setContent(`<!doctype html><html><head><style>@font-face{font-family:Cinzel;src:url(${cinzel})}@font-face{font-family:Corm;src:url(${corm})}html,body{margin:0;width:${w}px;height:${h}px;overflow:hidden}</style></head><body>${html}</body></html>`);
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
  await p.screenshot({ path: out, omitBackground: false }); await p.close();
};
const icone = (size, file, pad = 12) => shot(`<img src="data:image/svg+xml;base64,${Buffer.from(fav(pad)).toString('base64')}" width="${size}" height="${size}" style="display:block">`, size, size, file);
await icone(32, 'public/favicon-32.png');
await icone(180, 'public/apple-touch-icon.png');
await icone(192, 'public/icon-192.png');
await icone(512, 'public/icon-512.png');
await icone(512, 'public/icon-512-maskable.png', 22);
// logo para schema e redes (fundo pedra)
const pedra = `background:#ece6dc radial-gradient(120% 80% at 50% 0%, #fff6e2 0%, transparent 60%)`;
await shot(`<div style="width:1000px;height:1000px;${pedra};display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:Cinzel;color:#12203a">
<svg viewBox="0 0 166 178" width="300" height="322"><defs>${grad}</defs>${mono(0,0,1)}</svg>
<div style="font-size:84px;letter-spacing:3px;margin-top:40px">CARNEIRO CABRAL</div>
<div style="display:flex;align-items:center;gap:22px;margin-top:14px;font-size:30px;letter-spacing:10px;color:#12203a"><span style="width:90px;height:3px;background:#b8924a"></span>ADVOGADOS ASSOCIADOS<span style="width:90px;height:3px;background:#b8924a"></span></div></div>`, 1000, 1000, 'public/logo.png');
// foto de perfil do Facebook (monograma em marinho, círculo-safe)
await shot(`<div style="width:1000px;height:1000px;background:#12203a radial-gradient(70% 70% at 50% 40%, #1f3458, #12203a);display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:Cinzel;color:#ece6dc">
<svg viewBox="0 0 166 178" width="330" height="354"><defs>${grad}</defs>${mono(0,0,1)}</svg>
<div style="font-size:66px;letter-spacing:3px;margin-top:34px">CARNEIRO CABRAL</div>
<div style="margin-top:10px;font-size:24px;letter-spacing:9px;color:#dcc08a">ADVOGADOS ASSOCIADOS</div></div>`, 1000, 1000, 'marca/facebook-perfil.png');
// og:image 1200x630
const og = (w, h, file, extra = '') => shot(`<div style="width:${w}px;height:${h}px;display:grid;grid-template-columns:${Math.round(w*0.07)}px 1fr ${Math.round(w*0.09)}px;background:#15171c">
<div style="background:linear-gradient(90deg,rgba(0,0,0,.3),transparent 40%,rgba(0,0,0,.35)),#12203a"></div>
<div style="position:relative;${pedra};display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:Cinzel;color:#12203a">
<div style="position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,transparent,#ffe2ac 12%,#fff1d2 50%,#ffe2ac 88%,transparent);box-shadow:0 0 30px 8px rgba(255,214,150,.5)"></div>
<svg viewBox="0 0 166 178" width="${h*0.29}" height="${h*0.31}" style="filter:drop-shadow(2px 4px 3px rgba(60,40,10,.35))"><defs>${grad}</defs>${mono(0,0,1)}</svg>
<div style="font-size:${h*0.12}px;letter-spacing:2px;margin-top:${h*0.04}px;text-shadow:1px 2px 2px rgba(18,32,58,.2)">CARNEIRO CABRAL</div>
<div style="display:flex;align-items:center;gap:18px;margin-top:10px;font-size:${h*0.038}px;letter-spacing:9px"><span style="width:70px;height:2px;background:#b8924a"></span>ADVOGADOS ASSOCIADOS<span style="width:70px;height:2px;background:#b8924a"></span></div>
${extra}</div>
<div style="background:linear-gradient(180deg,rgba(255,214,150,.28),transparent 45%,rgba(0,0,0,.35)),repeating-linear-gradient(90deg,#7a5536 0 16px,#5e3f27 16px 22px,#2a1b10 22px 27px)"></div></div>`, w, h, file);
await og(1200, 630, 'public/og.png', `<div style="margin-top:26px;font-family:Corm;font-size:30px;font-weight:500;color:#4a5163">Goiânia · Cuiabá · Brasília</div>`);
// capa do Facebook 1640x624 (área segura central)
await og(1640, 624, 'marca/facebook-capa.png', `<div style="margin-top:22px;font-family:Corm;font-size:32px;font-weight:500;color:#4a5163">Atendimento jurídico em Goiânia, Cuiabá e Brasília</div>`);
await b.close();
fs.unlinkSync('public/mask.tmp.svg');
console.log('ok');
