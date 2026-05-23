# Relatório — Bloco “Resultados da última liga” na Comunidade

Alterações realizadas:

- Criado o bloco destacado **Resultados da última liga** em `comunidade.html`, usando o mesmo visual do bloco **Último Armory**.
- Adicionado JSON `#league-data` para alimentar o bloco automaticamente a partir dos posts em `_comunidade/Liga/`.
- Atualizado `assets/js/community.js` para renderizar a última liga com:
  - ranking dos jogadores;
  - imagem circular dos heróis;
  - ícones de jogadores, rodadas, jogo, calendário e troféu reaproveitados do Armory;
  - botão **Ver resultado completo**;
  - botão **Ver resultados anteriores** apontando para o histórico de ligas.
- Criado o placeholder `assets/img/armory-icons/depth/badge-liga.png` para o ícone principal da liga. Ele pode ser substituído depois pelo ícone oficial da liga mantendo o mesmo nome e caminho.
- Ajustado o bloco antigo de ligas para virar **Resultados anteriores de ligas**, evitando repetir a liga mais recente no card pequeno.
- Adicionado `event_date` e `next_liga` ao modelo de liga para controlar a data do evento e o texto da próxima liga.

Arquivos alterados/criados:

- `comunidade.html`
- `assets/js/community.js`
- `assets/img/armory-icons/depth/badge-liga.png`
- `_comunidade/Liga/modelo-resultado-liga.md`
- `_comunidade/Liga/primeira-liga-de-classic-constructed-de-cianorte`
