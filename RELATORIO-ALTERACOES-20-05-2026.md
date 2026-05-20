# Relatório de alterações — 20/05/2026

## Arquivos duplicados encontrados

Pode excluir do GitHub:

1. `_comunidade/resumo-encontro-commoner.md`
   - Duplicado de `_comunidade/Fotos/resumo-encontro-commoner.md`.
   - Mantive apenas a versão dentro da pasta `Fotos`.

2. `pokemon/19-05-2026-noticias-pokemon`
   - Duplicado de `_blog/Pokemon/19-05-2026-noticias-pokemon.md`.
   - Mantive apenas a versão correta dentro da coleção `_blog`.

## Organização ajustada

- Renomeei a pasta `_blog/Pok#U00e9mon` para `_blog/Pokemon`, para bater com o padrão configurado no `_config.yml`.
- Movi o post de Instagram para `_comunidade/Instagram/`.
- Movi o deck da Dash I/O para `_decks/Classic-Constructed/`.
- Criei pastas de deck por formato:
  - `_decks/Silver-Age/`
  - `_decks/Classic-Constructed/`
  - `_decks/Sealed/`
  - `_decks/Living-Legend/`
  - `_decks/Blitz/`
  - `_decks/UPF/`

## Comunidade

- Removi os gráficos da seção inicial de Armory.
- A seção inicial agora mostra apenas o resultado do último Armory.
- Mantive Torneios, Ligas e Histórico Armory como estavam.
- Criei um novo card social incorporado em `_includes/social-post-card.html`.
- A área social agora filtra por rede:
  - Instagram
  - YouTube
  - TikTok
  - X
  - Outros

### Modelo recomendado para Instagram

```yaml
---
title: "Título do post"
category_label: "Instagram"
content_style: "instagram"
social_platform: "instagram"
social_embed_url: "https://www.instagram.com/reel/CODIGO/embed"
social_url: "https://www.instagram.com/reel/CODIGO/"
summary: "Resumo curto."
author: "Neto"
date: 2026-05-20
---
```

### Modelo recomendado para YouTube

```yaml
---
title: "Título do vídeo"
category_label: "YouTube"
content_style: "youtube"
social_platform: "youtube"
youtube_id: "ID_DO_VIDEO"
social_url: "https://www.youtube.com/watch?v=ID_DO_VIDEO"
summary: "Resumo curto."
author: "Neto"
date: 2026-05-20
---
```

Para TikTok e X, o caminho mais seguro é colar o código oficial de incorporação no corpo do post, ou usar `social_embed_url` quando a própria rede oferecer um iframe incorporável.

## Spikes

- Removi os botões Dia/Semana/Mês/Mais caras do topo.
- Adicionei filtro por jogo, com todos os jogos marcados ao abrir a página.
- Aumentei os cards das cartas com limite de tamanho.
- As informações agora ficam abaixo da carta.
- O gráfico ficou maior e mais detalhado, com linhas de grade, datas e pontos de início/fim.
- Corrigi o cron do workflow para 05:00 no horário de Brasília usando UTC: `0 8 * * *`.

## Decks

- A página Deck agora tem filtros por:
  - Silver Age
  - Classic Constructed
  - Sealed
  - Living Legend
  - Blitz
  - UPF
- A organização por pasta foi preparada dentro de `_decks`.
- O deck da Dash foi marcado como `Classic Constructed`.

## Home

- Criei `_data/home_agenda.yml` para editar cada linha da agenda individualmente.
- A Home agora mostra cinco linhas clicáveis, todas levando para a página `/agenda/`.
