# Relatório - Spikes com TCGCSV / TCGplayer

## Arquivos alterados

- `scripts/update-spikes.mjs`
- `assets/js/spikes.js`
- `assets/css/styles.css`
- `spikes.html`
- `.github/workflows/update-spikes.yml`
- `assets/data/spikes.json` apenas para atualizar metadados de compatibilidade

## O que mudou

### Spikes

- Removidos os gráficos dos cards de Spikes.
- Os cards agora exibem valores em formato de campos.
- Para todos os jogos, o preço principal continua vindo da JustTCG.
- Para Flesh and Blood, o script agora tenta cruzar cada carta com a API TCGCSV para obter referência de TCGplayer.
- Para Flesh and Blood, quando houver correspondência no TCGCSV, aparecem:
  - JustTCG
  - TCGplayer
  - TCG x5
  - TCG x6
  - TCG x7

### TCGCSV

- A integração com TCGCSV roda somente no GitHub Actions, não no navegador.
- Isso evita problemas de CORS e mantém o site estático no GitHub Pages.
- O script respeita um intervalo entre chamadas ao TCGCSV.
- A imagem da JustTCG continua tendo prioridade. A imagem do TCGCSV/TCGplayer só é usada como fallback quando a JustTCG não enviar imagem.

### Workflow

- O workflow continua podendo ser rodado manualmente em `Run workflow`.
- A rotina agendada ficou em `0 8 * * *`, equivalente a 05:00 no horário de Brasília.

## Observação importante

Depois de subir o ZIP no GitHub, rode manualmente o workflow `Atualizar spikes JustTCG` para gerar o `assets/data/spikes.json` novo com os campos reais de TCGplayer/TCGCSV.

Enquanto o workflow não rodar, o site pode mostrar o campo TCGplayer como aguardando atualização ou sem correspondência.
