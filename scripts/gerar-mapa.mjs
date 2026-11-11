// Gera src/data/mapa.ts com os contornos de MT, GO e DF (malha oficial do IBGE) e dos estados vizinhos.
// Fonte: https://servicodados.ibge.gov.br/api/v3/malhas/paises/BR?intrarregiao=UF (salva em origem/ufs.geojson)
import fs from 'fs';

const geo = JSON.parse(fs.readFileSync('origem/ufs.geojson', 'utf8'));
const DESTAQUE = { 51: 'MT', 52: 'GO', 53: 'DF' };
const NOMES = { 11: 'RO', 12: 'AC', 13: 'AM', 15: 'PA', 17: 'TO', 21: 'MA', 22: 'PI', 29: 'BA', 31: 'MG', 35: 'SP', 41: 'PR', 50: 'MS' };
const LAT0 = -15.5 * Math.PI / 180;
const proj = ([lon, lat]) => [lon * Math.cos(LAT0), -lat];

// caixa: MT + GO + DF com margem
let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
const aneis = (g) => (g.type === 'Polygon' ? [g.coordinates] : g.coordinates);
for (const f of geo.features) {
  if (!DESTAQUE[f.properties.codarea]) continue;
  for (const pol of aneis(f.geometry)) for (const anel of pol) for (const p of anel) {
    const [x, y] = proj(p); minX = Math.min(minX, x); maxX = Math.max(maxX, x); minY = Math.min(minY, y); maxY = Math.max(maxY, y);
  }
}
const m = 1.4; minX -= m; maxX += m; minY -= m; maxY += m;
const W = 600, H = Math.round(W * (maxY - minY) / (maxX - minX));
const xy = (p) => { const [x, y] = proj(p); return [((x - minX) / (maxX - minX)) * W, ((y - minY) / (maxY - minY)) * H]; };
const caminho = (g) => aneis(g).map((pol) => pol.map((anel) => 'M' + anel.map((p) => xy(p).map((v) => v.toFixed(1)).join(' ')).join('L') + 'Z').join('')).join('');

const estados = [], vizinhos = [];
for (const f of geo.features) {
  const cod = f.properties.codarea;
  const d = caminho(f.geometry);
  if (DESTAQUE[cod]) estados.push({ uf: DESTAQUE[cod], d });
  else if (NOMES[cod]) vizinhos.push({ uf: NOMES[cod], d });
}
const cidades = { cuiaba: [-56.0974, -15.601], goiania: [-49.2648, -16.6869], brasilia: [-47.8828, -15.7939] };
const pontos = Object.fromEntries(Object.entries(cidades).map(([k, p]) => [k, xy(p).map((v) => +v.toFixed(1))]));
// rótulo dos estados no "centro" visual aproximado
const rotulos = { MT: xy([-55.6, -12.8]), GO: xy([-50.0, -15.2]), DF: xy([-47.75, -15.25]) };

fs.writeFileSync('src/data/mapa.ts', `// Gerado por scripts/gerar-mapa.mjs a partir da malha do IBGE. Não editar à mão.
export const MAPA = ${JSON.stringify({ largura: W, altura: H, estados, vizinhos, pontos, rotulos: Object.fromEntries(Object.entries(rotulos).map(([k, v]) => [k, v.map((n) => +n.toFixed(1))])) })};
`);
console.log('ok', W + 'x' + H, estados.map((e) => e.uf + ':' + e.d.length).join(' '), 'vizinhos', vizinhos.length);
