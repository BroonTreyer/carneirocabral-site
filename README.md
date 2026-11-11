# Site do Carneiro Cabral Advogados Associados

Site estático (Astro + Tailwind + GSAP + Lenis) publicado em https://carneirocabral.adv.br pelo GitHub Pages.
Cada `git push` na branch `main` publica o site automaticamente (Actions → "Publicar site").

## Onde mudar cada coisa
| O quê | Arquivo |
|---|---|
| Telefones, e-mail, OAB, CNPJ, Facebook/Instagram, cidades, endereços | `src/data/site.ts` (topo do arquivo) |
| Áreas de atuação, textos, perguntas frequentes | `src/data/site.ts` |
| Cores, fontes, espaçamentos | `src/styles/global.css` (bloco `:root`) |
| Política de privacidade / Termos de uso | `src/pages/privacidade.astro` / `src/pages/termos.astro` |

## Comandos
```bash
npm install          # uma vez
npm run dev          # prévia em http://localhost:4321
npm run build        # gera a pasta dist/
npm run imagens      # refaz favicon, ícones, logo, og.png e as artes do Facebook (pasta marca/)
npm run testar       # bateria de testes (precisa de `npx astro preview` rodando)
```

## Regras de publicidade (OAB, Provimento 205/2021)
Sem promessa de resultado, sem números de causas ganhas, sem preços, sem depoimentos de clientes.
O número de inscrição da sociedade na OAB deve aparecer no site (`oab` em `src/data/site.ts`).
