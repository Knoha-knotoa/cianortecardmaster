# Guia rápido — Heróis da Comunidade

A coleção de autores fica na pasta `_autores/`.

Cada autor tem um arquivo `.md` próprio, por exemplo:

- `_autores/ejar.md`
- `_autores/hermes.md`
- `_autores/21.md`
- `_autores/kayn.md`
- `_autores/the-librarian.md`

A página geral fica em:

```text
/autores/
```

## Como vincular um post a um autor

Em qualquer post, deck tech, guia ou publicação da comunidade, coloque no front matter:

```yaml
autor: ejar
```

ou:

```yaml
autor: Hermes
```

Também funciona com `author`, caso você prefira:

```yaml
author: Kayn
```

A recomendação é usar sempre o `slug`, porque ele é curto, estável e evita confusão:

```yaml
autor: the-librarian
```

## Slugs já criados

```yaml
ejar: Ejar
hermes: Hermes
21: 21
kayn: Kayn
the-librarian: The librarian
```

Quando o post estiver vinculado, o site mostra no card e no topo do post:

- nome do aventureiro;
- foto/avatar, quando houver;
- jogo principal;
- jogos que acompanha;
- link para a página do autor.

Na página do autor, aparecem automaticamente os posts, decks, guias e publicações da comunidade vinculados a ele.

## Observação sobre nome real

Os perfis não exibem nome real nas páginas renderizadas. Para publicar com segurança, prefira sempre usar o `slug` ou o nome de aventureiro no front matter.
