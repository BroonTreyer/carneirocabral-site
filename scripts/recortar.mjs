// Recorta o fundo de uma foto com IA local (nada é enviado para fora).
// Uso: node scripts/recortar.mjs entrada.jpg saida.png [largura]
// As etapas rodam em processos separados porque o removedor traz outra versão do sharp.
import { execFileSync } from 'child_process';
import fs from 'fs';
const [entrada, saida, largura = '1400'] = process.argv.slice(2);
const tmp = saida + '.tmp.png';
const node = (code) => execFileSync(process.execPath, ['--input-type=module', '-e', code], { stdio: 'inherit' });
node(`import sharp from 'sharp'; await sharp(${JSON.stringify(entrada)}).rotate().resize({ width: ${+largura} }).png().toFile(${JSON.stringify(tmp)});`);
node(`import { removeBackground } from '@imgly/background-removal-node'; import fs from 'fs';
const b = await removeBackground(${JSON.stringify(tmp)}, { model: 'medium', output: { format: 'image/png', quality: 1 } });
fs.writeFileSync(${JSON.stringify(tmp)}, Buffer.from(await b.arrayBuffer()));`);
node(`import sharp from 'sharp'; const s = sharp(${JSON.stringify(tmp)}).trim({ threshold: 1 }); const i = await s.png().toFile(${JSON.stringify(saida)}); console.log('ok', ${JSON.stringify(saida)}, i.width + 'x' + i.height);`);
fs.unlinkSync(tmp);
