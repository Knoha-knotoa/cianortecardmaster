---
published: false
title: "Liga - Inicio DD/MM/AAAA Término DD/MM/AAAA"
summary: "Resultado do da liga de Classic Constructed."
game: "Flesh and Blood"
format: "Classic Constructed"
rounds: 20
date: 2026-05-19
event_date: 2026-05-19
next_liga: "Domingo • 13:30"
author: "Cianorte Card Masters"
local: "Centro Cultural de Cianorte"
image: "/assets/img/banners/banner-liga-fab-resultado.png"
image_alt: "Modelo visual para resultado de liga da comunidade Cianorte Card Masters"
results:
  - player: "Nome do jogador"
    hero: "Nome do herói"
    # Opcional: informe uma foto do jogador para aparecer no hexágono do pódio da página completa.
    # player_image: "/assets/img/jogadores/nome-do-jogador.webp"
    # Opcional: use uma imagem local do herói. Se não informar, o site tenta buscar pela API GoAgain.
    # hero_icon: "/assets/img/fab-heroes/nome-do-heroi.webp"
    # Se existir um arquivo local com o nome do herói em assets/img/fab-heroes/, o site carrega o badge automaticamente.
    # Se existir um arquivo local com o nome exato do herói em assets/img/fab-heroes/, o site tenta carregar automaticamente.
    record: "3-0"
    wins: 3
  - player: "Nome do jogador 2"
    hero: "Nome do herói 2"
    record: "2-1"
    wins: 2
  - player: "Nome do jogador 3"
    hero: "Nome do herói 3"
    record: "1-2"
    wins: 1
  - player: "Nome do jogador 4"
    hero: "Nome do herói 4"
    record: "0-3"
    wins: 0


# Modelo para Liga de Pokémon
# Para Pokémon, você pode escrever o nome como aparece na carta:
# hero: "Mega Absol EX / Mega Gengar EX"
# O site remove automaticamente EX, V, VMAX etc. para buscar a imagem na PokeSprite/PokeAPI.
# Quando a API precisar de um nome diferente, informe o campo opcional pokemon_api:
# results:
#   - player: "Nome do treinador"
#     hero: "Mega Charizard X EX / Ogerpon EX"
#     pokemon_api: "charizard-mega-x / ogerpon"
#     record: "10 pts"
#     wins: 10
#
# Também é possível usar objetos se quiser deixar display e busca bem separados:
#   - player: "Nome do treinador"
#     pokemon:
#       - name: "Mega Absol EX"
#         api: "absol-mega"
#       - name: "Mega Gengar EX"
#         api: "gengar-mega"
#     record: "8 pts"
#     wins: 8

---

Resultado padronizado da Liga.

Copie este arquivo, remova `published: false`, altere a data e preencha a lista `results`.
