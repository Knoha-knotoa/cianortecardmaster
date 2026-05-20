# Relatório de alterações — Home e Spikes

## Home

- Mantido o bloco **Últimas imagens da comunidade** sem alterações.
- Alterado apenas o bloco **Últimas postagens**.
- Quando uma postagem recente da coleção `_comunidade` for Instagram, YouTube, TikTok, X, foto, vídeo, música, meme ou tiver embed configurado, a Home passa a usar o mesmo include da página Comunidade: `_includes/social-post-card.html`.
- Postagens comuns continuam usando o card padrão `_includes/post-card.html`.

## Spikes

- A página de Spikes agora renderiza apenas a janela **últimas 24 horas**.
- Cada card game pode mostrar até **9 cartas**.
- O script de atualização da JustTCG agora gera apenas a janela `daily`.
- O JSON gerado passa a usar o schema `spikes-daily-v4`.
- A imagem vinda da JustTCG agora tem prioridade quando estiver disponível no retorno da API.
- Se a JustTCG não enviar imagem, o site ainda tenta usar o fallback das APIs globais por jogo.

## Arquivos alterados

- `index.html`
- `spikes.html`
- `assets/js/spikes.js`
- `scripts/update-spikes.mjs`
- `assets/data/spikes.json`
- `assets/css/styles.css`
