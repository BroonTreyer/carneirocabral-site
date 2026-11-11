// Padroniza as fotos REAIS da equipe para o carrossel: recorta o fundo (IA local), aplica o fundo azul-marinho
// do escritório com luz dourada e enquadra todas no mesmo tamanho (900 x 1260), da cintura para cima.
// Uso: coloque as fotos originais em origem/equipe/ (ex.: maria-souza.jpg) e rode: node scripts/padronizar-equipe.mjs
// Saída: src/assets/equipe/<mesmo-nome>.jpg — depois cadastre a pessoa em EQUIPE (src/data/site.ts).
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const ORIGEM = 'origem/equipe';
const DESTINO = 'src/assets/equipe';
const W = 900, H = 1260;
if (!fs.existsSync(ORIGEM)) { console.log(`Crie a pasta ${ORIGEM} e coloque as fotos lá.`); process.exit(0); }
fs.mkdirSync(DESTINO, { recursive: true });

const fundo = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs><radialGradient id="g" cx="50%" cy="38%" r="70%"><stop offset="0" stop-color="#2a4472"/><stop offset=".55" stop-color="#16294a"/><stop offset="1" stop-color="#0b1528"/></radialGradient>
  <radialGradient id="l" cx="50%" cy="30%" r="45%"><stop offset="0" stop-color="#dcbd78" stop-opacity=".22"/><stop offset="1" stop-color="#dcbd78" stop-opacity="0"/></radialGradient></defs>
  <rect width="100%" height="100%" fill="url(#g)"/><rect width="100%" height="100%" fill="url(#l)"/></svg>`);
fs.writeFileSync('origem/.fundo-equipe.svg', fundo);

for (const arq of fs.readdirSync(ORIGEM).filter((a) => /\.(jpe?g|png|webp)$/i.test(a))) {
  const nome = path.parse(arq).name;
  const recorte = `origem/.${nome}-recorte.png`;
  execFileSync(process.execPath, ['scripts/recortar.mjs', path.join(ORIGEM, arq), recorte, '1400'], { stdio: 'inherit' });
  const code = `import sharp from 'sharp';
    const pessoa = await sharp(${JSON.stringify(recorte)}).resize({ width: ${Math.round(W * 0.92)}, height: ${Math.round(H * 0.94)}, fit: 'inside' }).toBuffer();
    const m = await sharp(pessoa).metadata();
    await sharp('origem/.fundo-equipe.svg').composite([{ input: pessoa, left: Math.round((${W} - m.width) / 2), top: ${H} - m.height }])
      .modulate({ saturation: 0.92 }).jpeg({ quality: 88, mozjpeg: true }).toFile(${JSON.stringify(path.join(DESTINO, nome + '.jpg'))});
    console.log('pronta', ${JSON.stringify(nome)});`;
  execFileSync(process.execPath, ['--input-type=module', '-e', code], { stdio: 'inherit' });
  fs.unlinkSync(recorte);
}
