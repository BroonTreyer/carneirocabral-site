import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const artigos = (await getCollection('artigos')).sort((a, b) => b.data.publicado.getTime() - a.data.publicado.getTime());
  return rss({
    title: 'Carneiro Cabral Advogados Associados — Artigos',
    description: 'Guias práticos sobre direitos do consumidor, previdenciário, família e cobranças.',
    site: context.site,
    customData: '<language>pt-BR</language>',
    items: artigos.map((a) => ({
      title: a.data.titulo,
      description: a.data.descricao,
      pubDate: a.data.publicado,
      link: `/artigos/${a.id}/`,
      categories: a.data.palavrasChave,
    })),
  });
}
