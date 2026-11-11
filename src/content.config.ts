import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Artigos de orientação jurídica (conteúdo informativo, conforme o Provimento 205/2021 da OAB).
const artigos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/artigos' }),
  schema: z.object({
    titulo: z.string(),
    tituloSeo: z.string().max(62),
    descricao: z.string().min(110).max(160),
    resumo: z.string(),
    area: z.enum(['direito-do-consumidor', 'direito-empresarial', 'direito-do-trabalho', 'direito-agrario-e-agronegocio', 'familia-e-sucessoes', 'direito-previdenciario']),
    publicado: z.coerce.date(),
    atualizado: z.coerce.date().optional(),
    palavrasChave: z.array(z.string()),
    perguntas: z.array(z.object({ p: z.string(), r: z.string() })).default([]),
  }),
});

export const collections = { artigos };
