import type { ImageMetadata } from 'astro';

// Todas as fotos de src/assets/fotos, acessíveis pelo nome do arquivo sem extensão.
const arquivos = import.meta.glob<{ default: ImageMetadata }>('../assets/fotos/*.{jpg,jpeg,png,webp}', { eager: true });

export const FOTOS: Record<string, ImageMetadata> = Object.fromEntries(
  Object.entries(arquivos).map(([caminho, mod]) => [caminho.split('/').pop()!.replace(/\.\w+$/, ''), mod.default]),
);

export const foto = (nome: string) => {
  const f = FOTOS[nome];
  if (!f) throw new Error(`Foto não encontrada: ${nome}`);
  return f;
};
