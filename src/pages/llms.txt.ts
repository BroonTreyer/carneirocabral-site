// Resumo do site para buscadores e assistentes de IA (padrão llms.txt). Gerado a partir dos dados do site.
import { getCollection } from 'astro:content';
import { SITE, AREAS, CIDADES, TELEFONES, NUMEROS } from '../data/site';

export async function GET() {
  const artigos = (await getCollection('artigos')).sort((a, b) => b.data.publicado.getTime() - a.data.publicado.getTime());
  const n = (rotulo: string) => NUMEROS.find((x) => x.rotulo.includes(rotulo));
  const linhas = [
    `# ${SITE.nomeCompleto}`,
    '',
    `> Escritório de advocacia com atendimento em Goiânia (GO), Cuiabá (MT) e Brasília (DF). Mais de ${n('processos')?.valor.toLocaleString('pt-BR')} processos acompanhados, mais de ${n('clientes')?.valor.toLocaleString('pt-BR')} clientes atendidos e ${n('advogados')?.valor} advogados.`,
    '',
    `Contato: ${SITE.email} · WhatsApp Brasília e Goiânia ${TELEFONES.brasilia.exibicao} · WhatsApp Cuiabá ${TELEFONES.cuiaba.exibicao}`,
    '',
    '## Áreas de atuação',
    ...AREAS.map((a) => `- [${a.titulo}](${SITE.url}/atuacao/${a.slug}/): ${a.texto}`),
    '',
    '## Cidades',
    ...CIDADES.map((c) => `- [Advogados em ${c.nome} (${c.uf})](${SITE.url}/advogados-em-${c.slug}/): ${c.texto[0]}`),
    '',
    '## Artigos',
    ...artigos.map((a) => `- [${a.data.titulo}](${SITE.url}/artigos/${a.id}/): ${a.data.resumo}`),
    '',
    '## Observação',
    '- O conteúdo do site é informativo e não substitui a consulta a um advogado, conforme o Provimento 205/2021 da OAB.',
    '',
  ];
  return new Response(linhas.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
