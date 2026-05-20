# Ajustes de imagens, agenda, Home e Spikes — 20/05/2026

## O que foi alterado

### 1. Imagens padrão para cards do Blog/Deck/Home
Foram adicionadas imagens padrão em `assets/img/banners/` para quando uma postagem não tiver `image` preenchida:

- `default-flesh-and-blood.webp`
- `default-magic.jpg`
- `default-pokemon.webp`
- `default-tcg.webp`
- `default-rpg.webp`
- `default-cianorte-card-master.webp`

O arquivo `_data/images.yml` agora centraliza esses fallbacks por categoria.

### 2. API de imagem para Magic e Pokémon nos cards/postagens
O include `_includes/post-card.html` e o layout `_layouts/post.html` agora reconhecem imagens vindas de API nos cards da Home, Blog, Deck e páginas internas.

Exemplos de uso no front matter:

```yml
image: "goagain:Dash I/O"
image: "scryfall:Krenko, Mob Boss"
image: "pokemon:Pikachu"
image: "yugioh:Blue-Eyes White Dragon"
```

Também funciona assim:

```yml
image_game: "pokemon"
image_card: "Charizard"
```

Aliases aceitos:

- FAB: `goagain:` ou `fab:`
- Magic: `scryfall:`, `mtg:` ou `magic:`
- Pokémon: `pokemon:` ou `pkm:`
- Yu-Gi-Oh!: `yugioh:` ou `ygo:`

### 3. Página Agenda com fotos reais
Em `_data/events.yml`, os cards da página Agenda foram ajustados para usar:

- Centro Cultural: `/assets/img/agenda/fachada-centro-cultural.webp`
- Bazar do Weezing: `/assets/img/agenda/bazar-do-weezing-fachada.webp`

A foto nova do Bazar foi salva em `assets/img/agenda/bazar-do-weezing-fachada.webp`.

### 4. Home: Últimas postagens com altura mínima
Foi adicionado CSS para os cards do bloco `Últimas postagens` na Home terem altura mínima e comportamento uniforme.

A postagem do Instagram continua podendo aparecer como card social, mas no bloco da Home o embed fica compacto para não quebrar o layout.

### 5. Spikes: preparado para até 9 cartas por jogo
O script `scripts/update-spikes.mjs` foi reforçado para buscar até 9 cartas por jogo nas últimas 24h:

- `DISPLAY_LIMIT = 9`
- busca com páginas extras da JustTCG
- leitura mais robusta de formatos de resposta da API
- leitura mais robusta de campos de variação 24h
- fallback por histórico de preço quando a API não mandar o campo de variação pronto
- `min_price` reduzido para `0.01` para aumentar a chance de completar 9 cartas

Importante: o arquivo `assets/data/spikes.json` continua sendo o último arquivo estático gerado. Sem a `JUSTTCG_API_KEY` no ambiente local, ele não é atualizado aqui. Depois de subir no GitHub e rodar o workflow manualmente, ele deve gerar até 9 cartas por jogo se a JustTCG retornar 9 cartas com alta positiva nas últimas 24h.

### 6. Workflow das 5h da manhã
O workflow `.github/workflows/update-spikes.yml` foi ajustado para rodar às 05:00 no horário de Brasília usando cron UTC:

```yml
- cron: "0 8 * * *"
```

O GitHub Actions usa UTC no agendamento.
