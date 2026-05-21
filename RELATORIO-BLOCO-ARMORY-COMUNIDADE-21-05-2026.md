# Relatório — Bloco Armory semanal na Comunidade

Alterações feitas:

- Refeito o bloco fixo de **Último Armory** da página `comunidade.html` com visual épico em verde/dourado, inspirado na referência enviada.
- O painel agora mostra:
  - cabeçalho do evento com badge de Armory;
  - ranking dos jogadores;
  - badge circular do herói na frente do nome do jogador;
  - campanha/record ao lado direito;
  - resumo lateral com jogadores, rodadas, jogo e próximo Armory;
  - lista lateral de heróis do evento;
  - botões para resultado completo e histórico.
- Incluídos os ícones do pacote `armory-icons.zip` em:
  - `assets/img/armory-icons/depth/`
  - `assets/img/armory-icons/flat/`
- O JavaScript da comunidade agora tenta carregar automaticamente a imagem do herói pela API GoAgain.
- O modelo de resultado Armory aceita o campo opcional `hero_icon`, caso você queira usar imagem local para algum herói.
- Adicionados os campos `game`, `rounds` e `next_armory` nos resultados/modelo de Armory.

Observação:

O arquivo `.rar` com os ícones dos heróis não pôde ser extraído automaticamente neste ambiente. Para usar exatamente os ícones locais desse pacote, extraia-os no seu computador e coloque os arquivos em `assets/img/fab-heroes/`, ou informe a imagem manualmente com `hero_icon` em cada jogador. Enquanto isso, o site usa a API GoAgain como fallback automático.
