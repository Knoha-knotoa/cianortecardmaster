# Cianorte Card Masters - instruções do site

## Como subir no GitHub

1. Extraia este ZIP.
2. Envie todo o conteúdo para a raiz do repositório `cianortecardmaster`.
3. Em `Settings > Pages`, deixe o GitHub Pages usando a branch principal.

O arquivo `_config.yml` já está configurado para:

```yml
baseurl: "/cianortecardmaster"
```

Se no futuro você criar um repositório do tipo `seunome.github.io`, altere para:

```yml
baseurl: ""
```

## Menu principal

O menu foi reorganizado nesta ordem:

```txt
Home
Guias
Deck
Blog
Spikes
Comunidade
Agenda
Sobre
```

A antiga página `Onde jogar` continua existindo apenas como atalho, mas o menu agora aponta para `Agenda`.

## Organização dos conteúdos

As áreas atualizáveis usam coleções do Jekyll. Para publicar, basta criar um arquivo `.md` na pasta certa.

```txt
_guias/
_decks/
_blog/
_comunidade/
```

## Subpastas da Comunidade

Crie o arquivo `.md` dentro de uma destas pastas:

```txt
_comunidade/Fanservice/
_comunidade/Fotos/
_comunidade/Videos/
_comunidade/Musica/
_comunidade/Meme/
_comunidade/Torneio/
_comunidade/Liga/
_comunidade/Armory/
```

Cada pasta aparece automaticamente na página `Comunidade`, com rótulo e estilo visual próprio.

### Exemplo de post em Comunidade / Fotos

Arquivo:

```txt
_comunidade/Fotos/encontro-da-comunidade.md
```

Conteúdo:

```yml
---
title: "Encontro da comunidade"
summary: "Fotos e momentos do encontro da galera."
image: "/assets/img/comunidade/foto-principal.jpg"
gallery:
  - "/assets/img/comunidade/foto-1.jpg"
  - "/assets/img/comunidade/foto-2.jpg"
author: "Cianorte Card Masters"
date: 2026-05-20
tags:
  - Comunidade
  - Fotos
---

Texto do post aqui.
```

## Subpastas do Blog

Crie o arquivo `.md` dentro de uma destas pastas:

```txt
_blog/Flesh-and-Blood/
_blog/Pokemon/
_blog/Magic/
_blog/TCG/
_blog/RPG/
_blog/Cianorte-card-master/
```

Cada pasta aparece automaticamente na página `Blog`, com rótulo e estilo visual próprio.

### Exemplo de post em Blog / Flesh and Blood

Arquivo:

```txt
_blog/Flesh-and-Blood/analise-de-heroi.md
```

Conteúdo:

```yml
---
title: "Análise de herói"
summary: "Resumo curto da postagem."
image: "goagain:Dash I/O"
author: "Neto"
date: 2026-05-20
tags:
  - Flesh and Blood
  - Blog
---

Texto do post aqui.
```

## Guias

Crie o arquivo em `_guias`, exemplo:

```txt
_guias/meu-guia-de-flesh-and-blood.md
```

Topo recomendado:

```yml
---
title: "Nome do guia"
summary: "Resumo curto."
image: "/assets/img/posts/sua-imagem.jpg"
author: "Seu nome"
date: 2026-05-20
tags:
  - Guia
  - Flesh and Blood
---
```

## Deck

Crie o arquivo em `_decks`, exemplo:

```txt
_decks/deck-tech-dash-io.md
```

Topo recomendado:

```yml
---
title: "Deck Tech: Nome do deck"
summary: "Resumo curto."
image: "goagain:Dash I/O"
author: "Seu nome"
date: 2026-05-20
tags:
  - Deck Tech
  - Flesh and Blood
---
```

## Imagens principais

Edite:

```txt
_data/images.yml
```

Ali ficam:

- logo do menu
- imagem do banner hero
- imagem padrão dos posts

## Agenda

Edite:

```txt
_data/events.yml
```

Os cards da página `Agenda` e da Home são puxados desse arquivo.

## APIs globais instaladas no site

O site já vem preparado para buscar imagens de cartas automaticamente em APIs públicas:

- **Flesh and Blood** → GoAgain
- **Magic: The Gathering** → Scryfall
- **Pokémon TCG** → Pokémon TCG API
- **Yu-Gi-Oh!** → YGOPRODeck

O JavaScript global fica em:

```txt
assets/js/card-apis-global.js
```

Em qualquer post ou página, use:

```liquid
{% include tcg-card.html game="fab" name="Bios Update" pitch="red" %}
{% include tcg-card.html game="mtg" name="Lightning Bolt" %}
{% include tcg-card.html game="pokemon" name="Pikachu" %}
{% include tcg-card.html game="yugioh" name="Blue-Eyes White Dragon" %}
```

### Grade de cartas

```html
<div class="tcg-card-grid">
  {% include tcg-card.html game="fab" name="Dash I/O" %}
  {% include tcg-card.html game="fab" name="Bios Update" pitch="red" %}
  {% include tcg-card.html game="mtg" name="Lightning Bolt" %}
  {% include tcg-card.html game="pokemon" name="Pikachu" %}
</div>
```

## Spikes com JustTCG

A página `spikes.html` usa o arquivo:

```txt
assets/data/spikes.json
```

Esse arquivo pode ser atualizado automaticamente por GitHub Actions usando:

```txt
.github/workflows/update-spikes.yml
scripts/update-spikes.mjs
```

Configure o secret no GitHub:

```txt
JUSTTCG_API_KEY
```

Depois rode em `Actions > Atualizar spikes JustTCG > Run workflow`.
