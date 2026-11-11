import { chromium } from 'playwright-core';
import fs from 'fs';
const B = 'http://localhost:4321';
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const falhas = []; const ok = (c, m) => { if (!c) falhas.push(m); console.log((c ? 'PASSA ' : 'FALHA ') + m); };
// 1. todas as páginas: status, título, descrição, canonical, h1 único, og, json-ld válido, sem erro de console, sem rolagem horizontal
const paginas = [...fs.readFileSync('dist/sitemap-0.xml','utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1].replace('https://carneirocabral.adv.br', B));
ok(paginas.length === 20, `sitemap com 20 páginas (achou ${paginas.length})`);
const titulos = new Set();
for (const w of [1440, 390]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
  for (const url of paginas) {
    const p = await ctx.newPage(); const erros = [];
    p.on('pageerror', e => erros.push(e.message)); p.on('console', m => m.type() === 'error' && erros.push(m.text()));
    const r = await p.goto(url, { waitUntil: 'networkidle' });
    const d = await p.evaluate(() => ({
      t: document.title, desc: document.querySelector('meta[name=description]')?.content || '',
      can: document.querySelector('link[rel=canonical]')?.href, h1: document.querySelectorAll('h1').length,
      og: !!document.querySelector('meta[property="og:image"]'),
      ld: [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => { try { JSON.parse(s.textContent); return true } catch { return false } }),
      larg: document.documentElement.scrollWidth - innerWidth,
      imgsSemAlt: [...document.querySelectorAll('img:not([alt])')].length,
    }));
    const nome = url.replace(B, '') + ` @${w}`;
    ok(r.status() === 200 && erros.length === 0, `${nome}: 200 e sem erros ${erros.join('|')}`);
    ok(d.larg <= 0, `${nome}: sem rolagem lateral (${d.larg}px)`);
    if (w === 1440) {
      ok(d.h1 === 1 && d.og && d.ld.every(Boolean) && d.ld.length >= 1, `${nome}: 1 h1, og:image, JSON-LD válido (${d.ld.length})`);
      ok(d.t.length <= 65 && d.desc.length >= 90 && d.desc.length <= 165, `${nome}: título ${d.t.length} car., descrição ${d.desc.length} car.`);
      ok(!titulos.has(d.t), `${nome}: título único`); titulos.add(d.t);
    }
    await p.close();
  }
  await ctx.close();
}
// 2. links internos: todos existem
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
const links = new Set();
for (const url of paginas) { await p.goto(url); (await p.$$eval('a[href^="/"]', as => as.map(a => a.getAttribute('href').split('#')[0]).filter(Boolean))).forEach(h => links.add(h)); }
for (const h of links) { const r = await p.request.get(B + h); ok(r.status() === 200, `link interno ${h} → ${r.status()}`); }
for (const f of ['/favicon.ico','/favicon.svg','/favicon-32.png','/apple-touch-icon.png','/icon-192.png','/icon-512.png','/icon-512-maskable.png','/og.png','/logo.png','/robots.txt','/sitemap-index.xml','/site.webmanifest','/marmore.svg']) { const r = await p.request.get(B + f); ok(r.status() === 200, `arquivo ${f}`); }
// 3. formulário: valida vazio e monta a mensagem do WhatsApp certa
await p.goto(B + '/');
await p.evaluate(() => { window.__aberto = null; window.open = (u) => { window.__aberto = u; }; });
await p.click('.formulario button[type=submit]');
ok(await p.isVisible('.formulario__erro'), 'formulário vazio mostra erro');
await p.fill('#f-nome', 'Maria Teste'); await p.fill('#f-tel', '(65) 99999-0000'); await p.selectOption('#f-cidade', 'cuiaba'); await p.fill('#f-msg', 'Voo cancelado.');
await p.click('.formulario button[type=submit]');
const u = await p.evaluate(() => window.__aberto);
ok(u && u.startsWith('https://wa.me/5565936181181?text=') && decodeURIComponent(u).includes('Maria Teste') && decodeURIComponent(u).includes('Cuiabá'), `formulário Cuiabá → WhatsApp de Cuiabá: ${u?.slice(0,60)}`);
await p.selectOption('#f-cidade', 'goiania'); await p.click('.formulario button[type=submit]');
ok((await p.evaluate(() => window.__aberto)).startsWith('https://wa.me/5561947560317'), 'formulário Goiânia → WhatsApp (61)');
// 4. botão flutuante
await p.mouse.wheel(0, 1200); await p.waitForTimeout(900);
ok(await p.evaluate(() => getComputedStyle(document.querySelector('.zap')).opacity === '1'), 'WhatsApp flutuante aparece ao rolar');
await p.click('.zap__botao'); ok(await p.isVisible('.zap__painel'), 'painel do WhatsApp abre');
ok((await p.$$eval('.zap__opcao', a => a.map(x => x.href))).join().includes('wa.me/5565936181181'), 'painel tem número de Cuiabá');
await p.keyboard.press('Escape'); ok(!(await p.isVisible('.zap__painel')), 'Esc fecha o painel');
// 5. FAQ abre
await p.click('#perguntas summary'); ok(await p.isVisible('#perguntas details[open] p'), 'pergunta frequente abre');
// 6. menu mobile
const m = await (await b.newContext({ viewport: { width: 390, height: 844 } })).newPage();
await m.goto(B + '/'); ok(!(await m.isVisible('#menu-lista a[href="/#atuacao"]')), 'menu mobile começa fechado');
await m.click('.menu__botao'); await m.waitForTimeout(400); ok(await m.isVisible('#menu-lista a[href="/#atuacao"]'), 'menu mobile abre');
await m.click('#menu-lista a[href="/#atuacao"]'); await m.waitForTimeout(1500);
ok(await m.evaluate(() => Math.abs(document.getElementById('atuacao').getBoundingClientRect().top) < 120), 'link do menu leva à seção e fecha');
// 7. conteúdo visível sem JS de animação (reduced motion)
const rm = await (await b.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } })).newPage();
await rm.goto(B + '/'); await rm.waitForTimeout(500);
ok(await rm.evaluate(() => [...document.querySelectorAll('[data-revelar]')].every(e => getComputedStyle(e).opacity === '1')), 'com movimento reduzido, tudo visível');
// 8. animações revelam conteúdo ao rolar
const an = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await an.goto(B + '/'); const alturaTotal = await an.evaluate(() => document.documentElement.scrollHeight); for (let y = 0; y < alturaTotal + 1000; y += 500) { await an.mouse.wheel(0, 500); await an.waitForTimeout(100); } await an.waitForTimeout(1500);
ok(await an.evaluate(() => [...document.querySelectorAll('[data-revelar]')].every(e => getComputedStyle(e).opacity === '1')), 'após rolar, todos os blocos foram revelados');
await b.close();
console.log(`\n${falhas.length} falha(s)`); falhas.forEach(f => console.log(' - ' + f));
