# Guia rápido — imagens por API em posts futuros

Este projeto agora aceita imagens de cartas por API em **posts novos** de forma automática.

## Onde funciona
- Home
- Blog
- Decks
- Guias
- Comunidade
- Página individual do post
- Cards sociais da comunidade
- Spikes (já usa o carregador global)

## Sintaxe recomendada

Use no front matter do Markdown:

```yaml
image: "fab:Dash I/O"
```

Exemplos:

```yaml
image: "goagain:Dash I/O"
image: "mtg:Sol Ring"
image: "scryfall:Counterspell"
image: "pokemon:Charizard"
image: "tcgdex:Mega Venusaur ex"
image: "yugioh:Dark Magician"
```

## Sintaxe alternativa

```yaml
image_game: "pokemon"
image_card: "Pikachu"
```

## Compatibilidade

O sistema também continua aceitando:

```yaml
image: "/assets/img/posts/minha-imagem.webp"
```

ou

```yaml
image: "https://site.com/imagem.jpg"
```

## Dica prática

Para posts futuros, o mais simples é usar sempre o campo `image:` com prefixo da API. Para Pokémon recente, prefira `tcgdex:` ou use `game="tcgdex"` nos includes dentro do texto.

Para Pokémon, o carregador tenta imagens em **português do Brasil (`pt-br`) primeiro** pela TCGdex e cai para inglês quando a carta ainda não tem imagem/dados em português. A TCGdex é multilíngue, mas cada idioma tem níveis diferentes de completude, então cartas muito recentes podem aparecer em inglês até a base receber a versão brasileira.

### Exemplo de post de Magic
```yaml
---
title: "Commander da semana"
summary: "Uma lista agressiva e simples de pilotar."
image: "scryfall:Krenko, Mob Boss"
author: "Neto"
date: 2026-05-20
---
```

### Exemplo de post de Pokémon
```yaml
---
title: "Carta destaque do formato"
summary: "Uma peça importante para o meta."
image: "pokemon:Charizard"
author: "Neto"
date: 2026-05-20
---
```

### Exemplo de imagem de carta Pokémon dentro do texto
```liquid
{% include tcg-card.html game="tcgdex" name="Mega Venusaur ex" set="MEG" number="3" lang="pt-br" %}
```

### Exemplo de post de Flesh and Blood
```yaml
---
title: "Deck Tech Dash I/O"
summary: "Granadas, BIOS e pressão constante."
image: "fab:Dash I/O"
author: "Neto"
date: 2026-05-20
---
```
