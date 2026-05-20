# Correção — Spikes com até 9 cartas por jogo

Alterações aplicadas:

- A grade da página Spikes foi corrigida para 3 colunas no desktop, não 4.
- O script `scripts/update-spikes.mjs` agora busca páginas extras da JustTCG usando `offset` até completar até 9 cartas por jogo.
- Mantido o limite de 20 cartas por requisição para respeitar o limite do plano gratuito da JustTCG.
- A página continua exibindo apenas a janela diária/24h.
- Se a API realmente tiver menos de 9 cartas com alta positiva nas últimas 24h para um jogo, o site exibirá menos de 9 para não inventar spikes.

Importante:

Depois de subir os arquivos, rode manualmente o workflow **Atualizar spikes JustTCG** no GitHub Actions para regenerar `assets/data/spikes.json` com a nova lógica.
