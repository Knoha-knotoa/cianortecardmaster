# Alteração aplicada na Home - Agenda da Semana

Data: 20/05/2026

## O que foi alterado

- Substituído o bloco antigo de Agenda da Home por uma seção chamada **Agenda da Semana**.
- A página Agenda do menu foi mantida intacta.
- Cada linha da agenda da Home é clicável e leva para `/agenda/`.
- No PC, as linhas têm visual de mural/faixas de evento, com tamanhos alternados e inclinação leve.
- No celular, as linhas ficam em formato linear para melhorar a leitura e o toque.
- Incluído parágrafo curto de SEO abaixo da agenda.

## Arquivos alterados

- `index.html`
- `_data/home_agenda.yml`
- `assets/css/styles.css`

## Como editar os eventos da Home

Edite o arquivo:

```txt
_data/home_agenda.yml
```

Campos disponíveis:

```yml
- day: "Domingo"
  title: "Encontro semanal da comunidade"
  game: "Card games, RPG e comunidade"
  time: "13:30"
  url: "/agenda/"
```
