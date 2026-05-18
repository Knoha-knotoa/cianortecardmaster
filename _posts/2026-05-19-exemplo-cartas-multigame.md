---
title: "Exemplo de cartas de vários TCGs"
category_label: "Blog"
categories:
  - blog
summary: "Exemplo de uso das APIs globais para carregar imagens de cartas de vários jogos."
image: "/assets/img/banners/post-default.jpg"
author: "Cianorte Card Masters"
date: 2026-05-19
tags:
  - APIs
  - Cards
  - Multi-game
---

Abaixo estão exemplos de cartas puxadas automaticamente pelas APIs globais do site.

<div class="tcg-card-grid">
  {% include tcg-card.html game="fab" name="Dash I/O" %}
  {% include tcg-card.html game="fab" name="Bios Update" pitch="red" %}
  {% include tcg-card.html game="mtg" name="Black Lotus" %}
  {% include tcg-card.html game="mtg" name="Lightning Bolt" %}
  {% include tcg-card.html game="pokemon" name="Pikachu" %}
  {% include tcg-card.html game="pokemon" name="Charizard" %}
  {% include tcg-card.html game="yugioh" name="Dark Magician" %}
  {% include tcg-card.html game="yugioh" name="Blue-Eyes White Dragon" %}
</div>

Você pode usar o include `tcg-card.html` em qualquer post, inclusive nos guias e nas deck techs.
