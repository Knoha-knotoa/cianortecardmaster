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
