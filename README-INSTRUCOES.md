# Cianorte Card Masters — instruções rápidas

## Menu

O menu está nesta ordem:

Home → Guias → Deck → Blog → Spikes → Comunidade → Agenda → Sobre

## Como publicar no Blog

O Blog aparece em **ordem de postagem**, do mais novo para o mais antigo.
As subpastas servem para organização, filtro e identidade visual automática.

Crie o arquivo `.md` dentro de uma destas pastas:

```text
_blog/Flesh-and-Blood/
_blog/Pokemon/
_blog/Magic/
_blog/TCG/
_blog/RPG/
_blog/Cianorte-card-master/
```

Exemplo:

```text
_blog/Pokemon/como-comecar-no-pokemon-tcg.md
```

Modelo básico:

```yaml
---
title: "Como começar no Pokémon TCG"
summary: "Um guia rápido para novos jogadores."
date: 2026-05-19
author: "Neto"
tags:
  - Pokémon
  - TCG
---

Texto do post aqui.
```

Se você não colocar `image`, o site usa automaticamente uma imagem de capa fixa da categoria, com cores e estilo visual próprios.

## Como publicar na Comunidade

Use estas pastas:

```text
_comunidade/Fanservice/
_comunidade/Fotos/
_comunidade/Videos/
_comunidade/Musica/
_comunidade/Meme/
_comunidade/Torneio/
_comunidade/Liga/
_comunidade/Armory/
```

Fotos, vídeos, música, meme e fanservice aparecem no feed social em ordem de postagem, com 10 posts por página e opção de 20.
Torneios e ligas aparecem em blocos próprios abaixo do feed social.
Armory alimenta a área fixa no topo da página Comunidade e as estatísticas no final.

## Como cadastrar resultado de Armory

Na pasta `_comunidade/Armory/` existe um arquivo chamado:

```text
modelo-resultado-armory.md
```

Copie esse arquivo, renomeie e remova a linha:

```yaml
published: false
```

Preencha os resultados dentro do bloco `results:`. O campo `date:` deve ser a data do Armory, não necessariamente a data em que você publicou o arquivo.

```yaml
---
title: "Armory - 19/05/2026"
summary: "Resultado do Armory de Flesh and Blood."
date: 2026-05-19
author: "Cianorte Card Masters"
image: "/assets/img/category/armory.svg"
results:
  - player: "Neto"
    hero: "Dash I/O"
    record: "3-0"
    wins: 3
  - player: "Gustavo"
    hero: "Kayo"
    record: "2-1"
    wins: 2
---

Texto opcional do post.
```

A página Comunidade soma automaticamente, dentro do mês vigente:

- vitórias por jogador;
- vitórias por herói;
- quantidade de Armory cadastrados;
- jogadores únicos;
- heróis usados.

Se você esquecer o campo `wins`, o site tenta calcular as vitórias a partir de `record`, por exemplo `3-0`.

## Agenda

A agenda é editada no arquivo:

```text
_data/events.yml
```

Foram cadastrados:

- Domingo, 14:00 - 18:00, Centro Cultural de Cianorte;
- Bazar do Weezing com calendário semanal:
  - Quarta: Armory Flesh and Blood, 19:00 - 22:30;
  - Quinta: Pokémon, 19:00 - 22:30;
  - Sexta: Friday Night Magic, 19:00 - 22:30;
  - Sábado: eventos, 14:00 - 18:00.

Os botões “Como chegar no Google Maps” usam links do Google Maps com `api=1`, sem precisar de chave paga.

As imagens do topo dos cards estão em:

```text
assets/img/agenda/fachada-centro-cultural.webp
assets/img/agenda/bazar-do-weezing-fachada.webp
```

Você pode substituir por outras fotos mantendo o mesmo caminho e nome do arquivo, ou alterar o caminho no `_data/events.yml`.

## Spikes

A página Spikes mostra apenas as altas das últimas 24 horas, com até 9 cartas por jogo.

Os dados são lidos de:

```text
assets/data/spikes.json
```

O arquivo pode ser atualizado automaticamente pelo GitHub Actions usando a API JustTCG. Para isso, adicione o segredo `JUSTTCG_API_KEY` no repositório do GitHub.

O workflow está em:

```text
.github/workflows/update-spikes.yml
```

A página não consulta a JustTCG direto no navegador, para não expor sua chave. O GitHub Actions atualiza o arquivo `spikes.json`, e o site apenas lê esse arquivo.

Depois de subir os arquivos, rode manualmente o workflow:

`Actions > Atualizar spikes JustTCG > Run workflow`

O agendamento automático está configurado para 05:00 no horário de Brasília usando cron UTC (`0 8 * * *`).

## Imagens de cartas por API

Nos posts, você pode usar imagem de carta no card da Home, Blog, Deck e na página interna do post.

Exemplos no front matter:

```yaml
image: "goagain:Dash I/O"
image: "scryfall:Krenko, Mob Boss"
image: "pokemon:Pikachu"
image: "yugioh:Blue-Eyes White Dragon"
```

Também funciona assim:

```yaml
image_game: "pokemon"
image_card: "Charizard"
```

Aliases aceitos:

- FAB: `goagain:` ou `fab:`
- Magic: `scryfall:`, `mtg:` ou `magic:`
- Pokémon: `pokemon:` ou `pkm:`
- Yu-Gi-Oh!: `yugioh:` ou `ygo:`

No corpo do post, use:

```liquid
<div class="tcg-card-grid">
  {% include tcg-card.html game="fab" name="Dash I/O" %}
  {% include tcg-card.html game="mtg" name="Lightning Bolt" %}
  {% include tcg-card.html game="pokemon" name="Pikachu" %}
  {% include tcg-card.html game="yugioh" name="Blue-Eyes White Dragon" %}
</div>
```


## Imagens por API para posts futuros

O suporte de imagens por API foi pensado para funcionar **automaticamente em posts futuros**, não só nos posts atuais.

Ele vale para:
- Home
- Blog
- Decks
- Guias
- Comunidade
- Página individual do post
- Cards sociais da comunidade (quando não houver embed e você quiser usar imagem de carta)

### Formas de usar no front matter

**Forma simples (recomendada):**
```yaml
image: "fab:Dash I/O"
image: "goagain:Bios Update"
image: "mtg:Lightning Bolt"
image: "scryfall:Krenko, Mob Boss"
image: "pokemon:Pikachu"
image: "yugioh:Blue-Eyes White Dragon"
```

**Forma separada (também funciona):**
```yaml
image_game: "pokemon"
image_card: "Charizard"
```

### Prefixos aceitos
- FAB / Flesh and Blood: `fab:` ou `goagain:`
- Magic: `mtg:`, `magic:` ou `scryfall:`
- Pokémon: `pokemon:` ou `pkm:`
- Yu-Gi-Oh!: `yugioh:` ou `ygo:`

### Observações
- Se o post não tiver `image`, o site usa a imagem padrão da seção.
- Se o post tiver `image` apontando para arquivo local (`/assets/...`) ou URL externa (`https://...`), ele continua funcionando normalmente.
- Para Pokémon, se depois você quiser mais precisão, também pode expandir o include `tcg-card.html` usando `set` e `number`.


## Ícones de heróis do Armory

- Coloque os ícones em `assets/img/fab-heroes/`.
- Quando o nome do herói no resultado for igual ao nome do arquivo (ex.: `Arakni, Huntsman.webp`), o badge circular carrega a imagem local automaticamente.
- Opcionalmente, você ainda pode informar `hero_icon` em cada jogador.
