# Próximos passos — site carneirocabral.adv.br

Situação em 11/11/2026 (madrugada). Este arquivo explica o que já está pronto, o que falta e como fazer cada etapa.

---

## 1. O que já está pronto

| Item | Situação |
|---|---|
| Site completo (20 páginas: 13 institucionais + central de artigos + 6 artigos) | Pronto e testado |
| Código no GitHub | https://github.com/BroonTreyer/carneirocabral-site (branch `main`) |
| Hospedagem | GitHub Pages, gratuito, com publicação automática a cada alteração no `main` |
| Domínio configurado no GitHub | `carneirocabral.adv.br` |
| Testes | `npm run testar`: 0 falhas. Lighthouse: desempenho 96–97, acessibilidade, boas práticas e SEO 100 |
| Imagens para o Facebook | Pasta `marca/`: `facebook-perfil.png` (1000×1000) e `facebook-capa.png` (1640×624) |

**Artigos (SEO):** voo cancelado/atrasado, nome negativado, INSS negou benefício, BPC/LOAS, pensão alimentícia, conta bloqueada em execução. Cada um com imagem de compartilhamento própria (`public/og/artigos/`).

**Páginas:** início, 6 áreas de atuação (Consumidor, Empresarial, Trabalho, Agrário e Agronegócio, Família e Sucessões, Previdenciário), 3 cidades (Goiânia, Cuiabá, Brasília), política de privacidade, termos de uso, créditos das imagens e página de erro 404.

**O site ainda não abre pelo endereço** porque falta apontar o domínio (etapa 2).

---

## 2. Apontar o domínio no registro.br (falta fazer)

1. Entre em https://registro.br com a conta dona do domínio.
2. Abra **carneirocabral.adv.br → DNS → Editar zona**.
3. **Não apague nada do que já existe.** O registro MX (`smtp.google.com`) e os registros TXT (`google-site-verification` e `v=spf1`) mantêm o e-mail `contato@` funcionando.
4. Adicione estes registros:

| Tipo | Nome | Valor |
|---|---|---|
| A | (deixe vazio) | 185.199.108.153 |
| A | (deixe vazio) | 185.199.109.153 |
| A | (deixe vazio) | 185.199.110.153 |
| A | (deixe vazio) | 185.199.111.153 |
| AAAA | (deixe vazio) | 2606:50c0:8000::153 |
| AAAA | (deixe vazio) | 2606:50c0:8001::153 |
| AAAA | (deixe vazio) | 2606:50c0:8002::153 |
| AAAA | (deixe vazio) | 2606:50c0:8003::153 |
| CNAME | www | broontreyer.github.io |

5. Salve. A propagação costuma levar de alguns minutos a algumas horas.

**Depois que o domínio abrir**, ligue o HTTPS obrigatório (o certificado é gratuito e automático):

```bash
gh api -X PUT repos/BroonTreyer/carneirocabral-site/pages -F https_enforced=true
```

Se o GitHub disser que o certificado ainda não está pronto, espere mais um pouco e repita.

---

## 2b. SEO técnico já feito

- Título e descrição únicos por página, canonical, sitemap (`/sitemap-index.xml`), robots.txt, RSS (`/rss.xml`) e `/llms.txt` para buscadores de IA.
- Dados estruturados: LegalService (escritório e cada cidade), WebSite, Service (áreas), Article (artigos), BreadcrumbList, FAQPage, CollectionPage, Person (equipe).
- `max-image-preview:large`, imagem de compartilhamento por artigo, links internos entre áreas, cidades e artigos.
- Lighthouse: SEO e acessibilidade 100, desempenho 95–97.

**O que mais pesa para chegar ao topo e depende do escritório** (em ordem):
1. Domínio no ar (etapa 2) e Search Console (etapa 3).
2. **Perfil da Empresa no Google** para cada cidade, com endereço real, fotos do escritório, horário e categoria "Advogado". Pedir **avaliações** a clientes satisfeitos (sem oferecer nada em troca).
3. **Endereços completos** no site (campo `endereco` em `src/data/site.ts`) e um telefone (62) para Goiânia.
4. **Mesmo nome, endereço e telefone** em todos os lugares: Google, Facebook, Instagram, Jusbrasil, OAB.
5. **Um artigo novo por semana**, sobre dúvidas reais de clientes (pode pedir ao Claude: arquivo novo em `src/content/artigos/`).
6. Links de outros sites (entrevistas, artigos em portais jurídicos, associações).

## 3. Google Search Console (depois do domínio)

1. Acesse https://search.google.com/search-console com a conta Google do escritório.
2. O domínio já está verificado no Google (há um registro TXT `google-site-verification` no DNS). Se a propriedade não aparecer, adicione-a como **Domínio**: `carneirocabral.adv.br`.
3. Em **Sitemaps**, envie: `https://carneirocabral.adv.br/sitemap-index.xml`
4. Em **Inspeção de URL**, peça a indexação da página inicial.

Recomendado também: criar ou atualizar o **Perfil da Empresa no Google** (Google Maps) de cada cidade, com o link do site.

---

## 4. Página no Facebook

1. Entre no Facebook com a conta pessoal de quem vai administrar a página.
2. Crie uma **Página** → categoria **Advogado e escritório de advocacia**.
3. Nome: **Carneiro Cabral Advogados Associados**.
4. Foto do perfil: `marca/facebook-perfil.png`. Capa: `marca/facebook-capa.png`.
5. Sugestão de texto para a seção "Sobre":
   > Escritório de advocacia com atendimento em Goiânia, Cuiabá e Brasília. Atuamos em Direito do Consumidor, Empresarial, do Trabalho, Agrário e Agronegócio, Família e Sucessões e Previdenciário.
6. Site: `https://carneirocabral.adv.br` · E-mail: `contato@carneirocabral.adv.br` · WhatsApp: (61) 94756-0317 e (65) 93618-1181.
7. Depois de criada, envie o endereço da página para entrar no site, no campo `facebook` de `src/data/site.ts`. O link aparece no rodapé e nos dados para o Google.

Lembrete: posts e anúncios seguem as mesmas regras do Provimento 205/2021 da OAB (sem promessa de resultado, sem preços, sem depoimentos de clientes).

---

## 5. Dados que o escritório precisa confirmar

Tudo isso fica no topo de `src/data/site.ts`.

| Dado | Por quê |
|---|---|
| **Nº de inscrição da sociedade na OAB** | Obrigatório na publicidade (Código de Ética, art. 44). Hoje não aparece. |
| **Nº da OAB de cada advogado** | Aparece no carrossel da equipe. Consultar em https://cna.oab.org.br |
| **Grafia dos nomes** | Corrigido para "Victória Avellar" e "Ivan Bitencourt". Confirmar no CNA. |
| **Cargo** | Todos aparecem como "Advogado(a)". Indicar quem é sócio. |
| **CNPJ** | Aparece no rodapé e na política de privacidade quando preenchido. |
| **Endereço de cada cidade** | As páginas de cidade dizem "atendimento com hora marcada" enquanto não houver endereço. |
| **Telefone de Goiânia** | Hoje usa o (61) de Brasília. |
| **Números** | +25.000 processos, +9.000 clientes, 11 advogados, 3 capitais. Confirmar que "9" é 9 mil. |
| **Suposições do texto** | Atendimento por videochamada e com hora marcada; guarda por 12 meses das mensagens de quem não contratou (política de privacidade). |

---

## 6. Como alterar o site

| O quê | Onde |
|---|---|
| Telefones, e-mail, OAB, CNPJ, redes, cidades, áreas, equipe, números, perguntas | `src/data/site.ts` |
| Textos da página inicial | `src/pages/index.astro` |
| Cores e fontes | `src/styles/global.css` (bloco `:root`) |
| Fotos | `src/assets/fotos/` e `src/assets/equipe/` |
| Privacidade e termos | `src/pages/privacidade.astro` e `src/pages/termos.astro` |

**Para publicar uma alteração:** salve, faça `git commit` e `git push` no `main`. O GitHub publica sozinho em cerca de 1 minuto (aba **Actions** do repositório).

**Comandos:**

```bash
npm install          # uma vez
npm run dev          # prévia em http://localhost:4321
npm run build        # gera a pasta dist/
npm run testar       # bateria de testes (com `npx astro preview` rodando)
npm run imagens      # refaz favicon, ícones, logo, og.png e artes do Facebook
npm run mapa         # refaz o mapa dos estados (malha do IBGE em origem/ufs.geojson)
```

**Nova foto da equipe:** coloque a foto em `src/assets/equipe/` e cadastre a pessoa em `EQUIPE` (`src/data/site.ts`) com nome, cargo e OAB. Fotos com fundo diferente podem ser padronizadas com `node scripts/padronizar-equipe.mjs` (originais em `origem/equipe/`).

---

## 7. Decisões tomadas (e por quê)

- **Sem tribunais superiores (STF, STJ, TST):** o escritório não atua nessas cortes.
- **Sem números de êxito, depoimentos ou preços:** vedados pelo Provimento 205/2021 da OAB. Os números aparecem como "processos acompanhados" e "clientes atendidos".
- **Fotos de terceiros** (Wikimedia Commons) com licença aberta e crédito na página `/creditos/`, obrigatório pela licença.
- **Fontes hospedadas no próprio site** (sem Google Fonts) e **nenhum cookie de rastreamento**: melhor para a LGPD e para a velocidade. Por isso não há banner de cookies.
- **Títulos em EB Garamond:** a fonte anterior (Cormorant) desenhava o circunflexo afastado da letra e parecia texto quebrado.
- **Equipe em esteira contínua**, com botão de pausa exigido pela norma de acessibilidade WCAG 2.2.2.
