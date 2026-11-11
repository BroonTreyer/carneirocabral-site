// Gera public/og/artigos/<slug>.png (1200x630) para cada artigo em src/content/artigos.
// Uso: node scripts/gerar-og-artigos.mjs   (também roda dentro de `npm run imagens`)
import { chromium } from 'playwright-core';
import fs from 'fs';
import path from 'path';

const PASTA = 'src/content/artigos';
const SAIDA = 'public/og/artigos';
fs.mkdirSync(SAIDA, { recursive: true });

const AREAS = {
  'direito-do-consumidor': 'Direito do Consumidor', 'direito-empresarial': 'Direito Empresarial', 'direito-do-trabalho': 'Direito do Trabalho',
  'direito-agrario-e-agronegocio': 'Direito Agrário e Agronegócio', 'familia-e-sucessoes': 'Família e Sucessões', 'direito-previdenciario': 'Direito Previdenciário',
};
const fonte = (arq) => 'data:font/woff2;base64,' + fs.readFileSync(arq).toString('base64');
const garamond = fonte('node_modules/@fontsource/eb-garamond/files/eb-garamond-latin-500-normal.woff2');
const cinzel = fonte('node_modules/@fontsource/cinzel/files/cinzel-latin-500-normal.woff2');
const mulish = fonte('node_modules/@fontsource-variable/mulish/files/mulish-latin-wght-normal.woff2');
const glifo = fs.readFileSync('src/data/glifo.ts', 'utf8');
const C1 = JSON.parse(glifo.match(/C1 = (".*?");/)[1]), C2 = JSON.parse(glifo.match(/C2 = (".*?");/)[1]);
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
for (const arq of fs.readdirSync(PASTA).filter((a) => a.endsWith('.md'))) {
  const slug = arq.replace(/\.md$/, '');
  const txt = fs.readFileSync(path.join(PASTA, arq), 'utf8');
  const titulo = txt.match(/^titulo:\s*"(.*)"\s*$/m)[1];
  const area = AREAS[txt.match(/^area:\s*(\S+)/m)[1]];
  await p.setContent(`<!doctype html><html><head><style>
    @font-face{font-family:G;src:url(${garamond})} @font-face{font-family:C;src:url(${cinzel})} @font-face{font-family:M;src:url(${mulish})}
    html,body{margin:0;width:1200px;height:630px;overflow:hidden}
    body{background:radial-gradient(90% 120% at 85% 0%,rgba(184,146,74,.22),transparent 55%),linear-gradient(135deg,#16294a,#0b1528);color:#f4efe6;font-family:M;position:relative}
    .moldura{position:absolute;inset:26px;border:1px solid rgba(220,192,138,.35)}
    .topo{position:absolute;left:76px;top:70px;display:flex;align-items:center;gap:16px}
    .marca{font-family:C;font-size:24px;letter-spacing:2px;line-height:1}
    .sub{font-family:C;font-size:12px;letter-spacing:5px;color:#dcc08a;margin-top:6px}
    .area{position:absolute;left:76px;top:190px;font-size:22px;font-weight:700;color:#dcc08a}
    .filete{position:absolute;left:76px;top:232px;width:72px;height:3px;background:#b8924a}
    h1{position:absolute;left:76px;right:90px;top:256px;margin:0;font-family:G;font-weight:500;font-size:${titulo.length > 70 ? 54 : 62}px;line-height:1.08}
    .rodape{position:absolute;left:76px;bottom:62px;font-size:20px;color:#aab3c4}
  </style></head><body><div class="moldura"></div>
    <div class="topo"><svg viewBox="8 10 166 178" width="52" height="56"><defs><linearGradient id="o" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8a6526"/><stop offset=".4" stop-color="#dcbd78"/><stop offset="1" stop-color="#7a5620"/></linearGradient></defs><path d="${C1}" fill="url(#o)"/><path d="${C2}" fill="url(#o)"/></svg>
      <div><div class="marca">CARNEIRO CABRAL</div><div class="sub">ADVOGADOS ASSOCIADOS</div></div></div>
    <div class="area">${esc(area)}</div><div class="filete"></div>
    <h1>${esc(titulo)}</h1>
    <div class="rodape">carneirocabral.adv.br · Goiânia, Cuiabá e Brasília</div>
  </body></html>`);
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(150);
  await p.screenshot({ path: path.join(SAIDA, slug + '.png') });
  console.log('ok', slug);
}
await b.close();
