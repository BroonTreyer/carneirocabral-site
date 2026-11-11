// Captura de tela para revisão visual. Uso: node scripts/foto-tela.mjs URL saida.png [largura] [altura] [paginaInteira 0|1]
import { chromium } from 'playwright-core';
const [url, out, w = '1440', h = '900', full = '1'] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const p = await b.newPage({ viewport: { width: +w, height: +h } });
const erros = [];
p.on('pageerror', (e) => erros.push(e.message));
p.on('console', (m) => { if (m.type() === 'error') erros.push(m.text()); });
await p.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
await p.waitForTimeout(3800);
if (full === '1') { for (let y = 0; y < 30000; y += 600) { await p.mouse.wheel(0, 600); await p.waitForTimeout(110); } await p.waitForTimeout(2600); await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(600); }
await p.screenshot({ path: out, fullPage: full === '1' });
console.log('ok', out, 'erros:', JSON.stringify(erros.slice(0, 6)));
await b.close();
