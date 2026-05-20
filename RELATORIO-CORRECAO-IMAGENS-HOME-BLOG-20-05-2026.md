# Correção de imagens dos cards, Home e Blog — 20/05/2026

## Problemas encontrados

1. Em `_layouts/post.html`, havia um fechamento Liquid incorreto:

```liquid
`unless item_label`
  `assign item_label = page.category_label`
`endif`
```

O correto é:

```liquid
`unless item_label`
  `assign item_label = page.category_label`
`endunless`
```

Esse erro pode quebrar o build do Jekyll nas páginas internas dos posts.

2. As imagens via API, como `image: "goagain:Dash I/O"` ou `image: "scryfall:Krenko, Mob Boss"`, dependiam totalmente do JavaScript e da API externa. Se a API falhasse, bloqueasse, demorasse ou não retornasse imagem, o card ficava sem capa útil.

3. Algumas chamadas aplicavam `relative_url` sem tratar primeiro imagens remotas. Isso podia gerar caminho errado em imagens externas em alguns cards sociais.

4. O workflow dos spikes foi padronizado para cron em UTC: `0 8 * * *`, equivalente a 05:00 em Brasília.

## Arquivos corrigidos

- `_layouts/post.html`
- `_includes/post-card.html`
- `_includes/social-post-card.html`
- `_includes/tcg-card.html`
- `assets/js/card-apis-global.js`
- `index.html`
- `.github/workflows/update-spikes.yml`

## O que mudou

- Corrigido o fechamento ``endunless`` em `_layouts/post.html`.
- Cards com imagem via API agora recebem uma imagem fallback da categoria.
- Se a API de carta falhar, o JavaScript troca automaticamente para a imagem padrão da categoria.
- Imagens locais e remotas agora são tratadas com mais segurança.
- Imagens da galeria e agenda da Home receberam fallback visual.
- O carregador de imagens por API ficou mais seguro, usando criação de elemento `<img>` em vez de HTML direto.
- GoAgain ganhou tentativa extra usando `q=` caso a busca por `name=` falhe.
- Workflow dos spikes padronizado para rodar 05:00 em Brasília usando `cron: "0 8 * * *"` em UTC.

## Observação importante

O arquivo `_config.yml` continua com:

```yml
baseurl: "/cianortecardmaster"
```

Isso está correto para GitHub Pages no endereço do repositório, como:

```text
https://usuario.github.io/cianortecardmaster/
```

Se futuramente usar domínio próprio, provavelmente será necessário trocar para:

```yml
baseurl: ""
```
