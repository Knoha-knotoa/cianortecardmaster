# Cianorte Card Masters - Site novo

## Como subir no GitHub

1. Crie um repositório novo.
2. Extraia este ZIP.
3. Envie todo o conteúdo para a raiz do repositório.
4. Em Settings > Pages, selecione GitHub Pages usando a branch principal.

## Se o repositório não for jose.github.io

Abra `_config.yml` e ajuste:

```yml
baseurl: "/nome-do-repositorio"
```

Exemplo:

```yml
baseurl: "/cianortecardmaster"
```

Se for um site de usuário, como `seunome.github.io`, deixe:

```yml
baseurl: ""
```

## Onde trocar imagens principais

Edite:

```txt
_data/images.yml
```

Ali ficam:

- logo do menu
- imagem do banner hero
- imagem padrão dos posts

## Como criar post de Guia

Crie arquivo em `_posts`, exemplo:

```txt
2026-05-20-nome-do-guia.md
```

Com topo:

```yml
---
title: "Nome do guia"
category_label: "Guia"
categories:
  - guias
summary: "Resumo curto."
image: "/assets/img/posts/sua-imagem.jpg"
author: "Seu nome"
date: 2026-05-20
---
```

## Como criar post de Deck

```yml
---
title: "Deck Tech: Nome do deck"
category_label: "Deck Tech"
categories:
  - decks
summary: "Resumo curto."
image: "/assets/img/posts/sua-imagem.jpg"
author: "Seu nome"
date: 2026-05-20
---
```

## Como criar post de Blog

```yml
---
title: "Título do post"
category_label: "Blog"
categories:
  - blog
summary: "Resumo curto."
image: "/assets/img/posts/sua-imagem.jpg"
author: "Seu nome"
date: 2026-05-20
---
```

## Como criar post de Comunidade com galeria

```yml
---
title: "Encontro da comunidade"
category_label: "Comunidade"
categories:
  - comunidade
summary: "Resumo curto."
image: "/assets/img/comunidade/foto-principal.jpg"
gallery:
  - "/assets/img/comunidade/foto-1.jpg"
  - "/assets/img/comunidade/foto-2.jpg"
author: "Cianorte Card Masters"
date: 2026-05-20
---
```

## Como editar calendário / onde jogar

Edite:

```txt
_data/events.yml
```

Os cards da página Onde jogar e da home são puxados desse arquivo.


## APIs globais instaladas no site

O site já vem preparado para buscar imagens de cartas automaticamente em quatro APIs públicas:

- **Flesh and Blood** → GoAgain
- **Magic: The Gathering** → Scryfall
- **Pokémon TCG** → Pokémon TCG API
- **Yu-Gi-Oh!** → YGOPRODeck

O JavaScript global fica em:

```txt
assets/js/card-apis-global.js
```

Você não precisa chamar a API manualmente. Em qualquer post ou página, use o include:

```liquid
{% include tcg-card.html game="fab" name="Bios Update" pitch="red" %}
{% include tcg-card.html game="mtg" name="Lightning Bolt" %}
{% include tcg-card.html game="pokemon" name="Pikachu" %}
{% include tcg-card.html game="yugioh" name="Blue-Eyes White Dragon" %}
```

### Exemplos por jogo

#### Flesh and Blood (GoAgain)
```liquid
{% include tcg-card.html game="fab" name="Dash I/O" %}
{% include tcg-card.html game="fab" name="Bios Update" pitch="red" %}
```

#### Magic (Scryfall)
```liquid
{% include tcg-card.html game="mtg" name="Black Lotus" %}
{% include tcg-card.html game="mtg" name="Lightning Bolt" %}
```

#### Pokémon
```liquid
{% include tcg-card.html game="pokemon" name="Pikachu" %}
{% include tcg-card.html game="pokemon" name="Charizard" %}
```

Você também pode informar set ou número para ajudar:
```liquid
{% include tcg-card.html game="pokemon" name="Pikachu" set="Base" %}
```

#### Yu-Gi-Oh!
```liquid
{% include tcg-card.html game="yugioh" name="Dark Magician" %}
{% include tcg-card.html game="yugioh" name="Blue-Eyes White Dragon" %}
```

### Grade de cartas
Se quiser várias cartas em grade:

```html
<div class="tcg-card-grid">
  {% include tcg-card.html game="fab" name="Dash I/O" %}
  {% include tcg-card.html game="mtg" name="Black Lotus" %}
  {% include tcg-card.html game="pokemon" name="Pikachu" %}
  {% include tcg-card.html game="yugioh" name="Dark Magician" %}
</div>
```


## Spikes com JustTCG

A página `spikes.html` usa o arquivo:

```txt
assets/data/spikes.json
```

Esse arquivo é atualizado automaticamente por GitHub Actions usando:

```txt
.github/workflows/update-spikes.yml
scripts/update-spikes.mjs
```

### Por que não chamar a JustTCG direto no navegador?

A JustTCG exige chave de API no header `x-api-key`. Como o GitHub Pages é estático, colocar essa chave no JavaScript público exporia sua chave. Por isso o projeto usa GitHub Actions com Secret.

### Como configurar

1. No GitHub, entre no repositório.
2. Vá em `Settings > Secrets and variables > Actions`.
3. Clique em `New repository secret`.
4. Nome do secret:

```txt
JUSTTCG_API_KEY
```

5. Valor: sua chave da JustTCG.
6. Salve.
7. Vá em `Actions > Atualizar spikes JustTCG > Run workflow`.

Depois disso, o arquivo `assets/data/spikes.json` será atualizado.

### Como trocar atualização diária para semanal

Abra:

```txt
.github/workflows/update-spikes.yml
```

Troque:

```yml
- cron: "30 8 * * *"
```

por:

```yml
- cron: "30 8 * * 1"
```

Isso roda toda segunda-feira às 08:30 UTC.
