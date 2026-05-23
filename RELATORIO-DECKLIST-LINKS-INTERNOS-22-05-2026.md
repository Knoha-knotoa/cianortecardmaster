# Relatório — Decklist reutilizável e links internos

Alterações realizadas em 22/05/2026:

- Criado o include `_includes/decklist-card.html` para exibir decklists em formato de card reutilizável.
- Criado o arquivo `_data/decklists/dash_io_la_bombita.yml` com a decklist da Dash I/O La Bombita.
- Criado o include `_includes/internal-links-card.html` para inserir, ao final dos artigos, um card de links internos úteis para SEO e navegação.
- Atualizado o artigo `_decks/Classic-Constructed/deck-tech-dash-io-la-bombita.md` para usar o novo card de decklist e o card de links internos no final.
- Atualizado `assets/css/styles.css` com os estilos dos novos componentes.

Uso futuro da decklist:

```liquid
{% include decklist-card.html deck="nome_do_arquivo" %}
```

Uso futuro do card de links internos:

```liquid
{% include internal-links-card.html %}
```

O card de links internos busca automaticamente o último post de Armory publicado na coleção `comunidade` e também aponta para guias, decks, blog e agenda.
