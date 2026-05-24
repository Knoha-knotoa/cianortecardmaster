---
title: "Guia: Equipamentos e a Fase de Defesa em Flesh and Blood"
category_label: "Guia"
summary: "Entenda como equipamentos defendem, quando quebram, como funcionam Blade Break, Battleworn, Temper, Guardwell, escudos, T-Bone, Fragment e interações com heróis."
description: "Guia de regras de Flesh and Blood sobre equipamentos e defesa: defesa 0, Blade Break, Battleworn, Temper, Guardwell, T-Bone, Fragment, Rampart e combat chain."
keywords:
  - equipamentos Flesh and Blood
  - defesa Flesh and Blood
  - Blade Break
  - Battleworn
  - Temper
  - T-Bone Flesh and Blood
  - combat chain
image: "goagain:Crown of Providence"
image_alt: "Carta Crown of Providence usada como exemplo em guia de equipamentos e defesa de Flesh and Blood"
author: "Neto"
date: 2026-05-18
last_modified_at: 2026-05-24
schema_type: "BlogPosting"
content_style: "flesh-and-blood"
guide_game: "flesh-and-blood"
guide_topic: "regras-keywords"
guide_level: "intermediario"
tags:
  - Flesh and Blood
  - Guia
  - Regras
  - Equipamentos
  - Defesa
  - Cianorte Card Masters
cards:
  - "Crown of Providence"
  - "Rampart of the Ram's Head"
  - "Stalagmite, Bastion of Isenloft"
  - "Steelbraid Buckler"
  - "Seasoned Saviour"
  - "Tectonic Plating"
  - "Flamescale Furnace"
  - "Snapdragon Scalers"
  - "Nullrune Gloves"
  - "Compass of Sunken Depths"
  - "Plate of Tough Love"
  - "Tiara of Suspense"
  - "T-Bone"
  - "Meganetic Shockwave"
  - "Meganetic Protocol"
  - "Palantir Aeronought"
  - "Teklovossen"
  - "Lyath Goldmane, Vile Savant"
---

> **Resumo de mesa:** equipamento com defesa 0 pode defender. Equipamento sem valor de defesa não pode. Blade Break, Battleworn, Temper e Guardwell normalmente só fazem algo quando a combat chain fecha. Já efeitos como “when this defends” acontecem quando o equipamento realmente vira carta defensora.

<div class="tcg-card-grid">
  {% include tcg-card.html game="fab" name="Crown of Providence" %}
</div>

## Por que este guia existe?

Em Flesh and Blood, defender com equipamento parece simples: você coloca a armadura na frente do ataque e soma a defesa. Mas, na prática, essa é uma das partes do jogo que mais gera dúvida.

Algumas perguntas aparecem direto na mesa:

- equipamento com defesa 0 pode bloquear?
- equipamento sem defesa é a mesma coisa que defesa 0?
- Crown of Providence compra carta quando defende ou quando quebra?
- Temper coloca contador na hora do bloco ou no fim da combat chain?
- Rampart of the Ram’s Head pode bloquear 4 pagando 4 recursos?
- T-Bone obriga a bloquear com equipamento sem defesa?
- se o equipamento já tem contador -1 de defesa, Fragment ainda reduz o ataque?

Este guia organiza essas respostas de forma prática, com foco em **equipamentos e fase de defesa**. Heróis e cartas específicas aparecem como exemplos para entender a regra.

---

## 1. O básico: quando o equipamento pode defender?

Durante o **Defend Step**, o herói defensor pode declarar cartas da mão e/ou equipamentos públicos que controla como cartas defensoras.

Mas existe uma condição fundamental: a carta precisa ter a **propriedade defesa**.

Isso cria uma diferença muito importante:

| Situação do equipamento | Pode defender? | Explicação |
|---|---:|---|
| Tem defesa 3, 2 ou 1 | Sim | Contribui com esse valor de defesa. |
| Tem defesa 0 impressa | Sim | 0 é um valor válido de defesa. |
| Não tem valor de defesa impresso | Não | A carta não tem a propriedade defesa. |

A frase para decorar é:

> **Defesa 0 é diferente de não ter defesa.**

Exemplos:

| Carta | Defesa | Pode defender? |
|---|---:|---:|
| Crown of Providence | 2 | Sim |
| Snapdragon Scalers | 0 | Sim |
| Nullrune Gloves | 0 | Sim |
| Compass of Sunken Depths | sem valor de defesa | Não |

<div class="tcg-card-grid">
  {% include tcg-card.html game="fab" name="Snapdragon Scalers" %}
  {% include tcg-card.html game="fab" name="Nullrune Gloves" %}
  {% include tcg-card.html game="fab" name="Compass of Sunken Depths" %}
</div>

Essa diferença é decisiva contra cartas que obrigam a defender com equipamento, como **T-Bone** e **Meganetic Shockwave**.

---

## 2. O equipamento fica preso na combat chain

Quando você defende com um equipamento, ele vira uma carta defensora no chain link. Ele não volta imediatamente para a zona de equipamento.

Ele fica na combat chain até ela fechar.

Isso importa porque um mesmo equipamento não pode defender duas vezes enquanto ainda está preso na chain.

Exemplo:

1. O oponente ataca.
2. Você defende com Rampart of the Ram’s Head.
3. O ataque resolve.
4. Se o oponente continuar a mesma combat chain com outro ataque com Go Again, o Rampart ainda está preso no chain link anterior.
5. Você não pode usar o Rampart de novo até a combat chain fechar.

Resumo:

> **Equipamento que já está defendendo não pode defender de novo na mesma combat chain.**

---

## 3. “When this defends”: efeitos que resolvem quando o equipamento entra na defesa

Alguns equipamentos têm textos como:

> **When this defends...**  
> **Whenever you defend with...**

Esses efeitos disparam quando o equipamento se torna uma carta defensora. Eles não esperam a combat chain fechar.

### Crown of Providence

<div class="tcg-card-grid">
  {% include tcg-card.html game="fab" name="Crown of Providence" %}
</div>

**Crown of Providence** diz:

> When this defends, you may put a card from your hand or arsenal on the bottom of your deck. If you do, draw a card.

A sequência correta é:

1. Você declara Crown como defesa.
2. Crown vira carta defensora.
3. O efeito “when this defends” dispara.
4. Você pode colocar uma carta da mão ou arsenal no fundo do deck.
5. Se fizer isso, compra uma carta.
6. Depois, no fechamento da combat chain, Blade Break destrói a Crown.

A Crown **não compra quando quebra**. Ela compra quando defende.

---

## 4. Blade Break, Battleworn, Temper e Guardwell

Essas quatro keywords são o coração da defesa com equipamentos.

| Keyword | O que faz | Quando acontece |
|---|---|---|
| **Blade Break** | Destrói o equipamento se ele defendeu. | Quando a combat chain fecha. |
| **Battleworn** | Coloca um contador -1 de defesa se defendeu. | Quando a combat chain fecha. |
| **Temper** | Coloca um contador -1 de defesa e destrói se ficar com defesa 0. | Quando a combat chain fecha. |
| **Guardwell** | Coloca contadores -1 iguais à defesa atual do equipamento. | Quando a combat chain fecha. |

### Blade Break

Blade Break é o mais simples:

> Se defendeu, quebra quando a combat chain fecha.

Exemplos:

- Crown of Providence
- Fyendal’s Spring Tunic
- Plate of Tough Love
- Ironrot Gauntlet

<div class="tcg-card-grid">
  {% include tcg-card.html game="fab" name="Plate of Tough Love" %}
</div>

### Battleworn

Battleworn não destrói o equipamento. Ele apenas coloca contador -1 de defesa.

Exemplo com **Tectonic Plating**:

| Momento | Defesa atual |
|---|---:|
| Antes de defender | 2 |
| Depois de defender uma vez e fechar a chain | 1 |
| Depois de defender outra vez e fechar a chain | 0 |

Mesmo com defesa 0, o equipamento continua em campo. Battleworn não destrói sozinho.

<div class="tcg-card-grid">
  {% include tcg-card.html game="fab" name="Tectonic Plating" %}
</div>

### Temper

Temper parece Battleworn, mas tem uma diferença enorme:

> Depois de colocar o contador -1, se o equipamento tiver defesa 0, ele é destruído.

Exemplo com **Flamescale Furnace**:

| Momento | Defesa atual | O que acontece? |
|---|---:|---|
| Primeira defesa | 2 | Quando a chain fecha, ganha um contador e fica com 1. |
| Segunda defesa | 1 | Quando a chain fecha, ganha outro contador, fica com 0 e é destruída. |

<div class="tcg-card-grid">
  {% include tcg-card.html game="fab" name="Flamescale Furnace" %}
</div>

### Guardwell

Guardwell normalmente “gasta” toda a defesa de uma vez.

Exemplo com **Tiara of Suspense**:

| Momento | Defesa atual | O que acontece? |
|---|---:|---|
| Tiara sem contador defende | 2 | Quando a chain fecha, recebe 2 contadores -1. |
| Depois disso | 0 | Continua em campo, a menos que outro efeito destrua. |

<div class="tcg-card-grid">
  {% include tcg-card.html game="fab" name="Tiara of Suspense" %}
</div>

Guardwell não diz “destrua”. Ele coloca contadores.

---

## 5. Defesa atual importa: contadores mudam o valor

Quando uma carta fala “defense”, ela normalmente olha a defesa modificada, não apenas o número impresso.

Isso inclui contadores -1 de defesa.

Exemplo com um ataque que tem **Fragment**:

> Whenever a card with 2 or more Defense defends this, this gets -2 Power.

Você verifica a defesa atual da carta no momento em que ela defende.

| Equipamento | Contadores -1 | Defesa atual | Fragment dá -2 no ataque? |
|---|---:|---:|---:|
| Temper 2 | 0 | 2 | Sim |
| Temper 2 | 1 | 1 | Não |
| Temper 3 | 1 | 2 | Sim |
| Battleworn 2 | 1 | 1 | Não |
| Plate of Tough Love com Confidence + Toughness | 0 | 3 | Sim |

Resumo:

> **Fragment olha a defesa atual. Se os contadores já reduziram o equipamento para 1 ou 0, Fragment não ativa.**

---

## 6. Equipamentos que obrigam o oponente a defender com equipamento

Alguns ataques forçam o defensor a usar equipamento, se puder.

Aqui entram duas regras importantes:

1. se o equipamento tem defesa 0, ele pode ser usado;
2. se o equipamento não tem valor de defesa, ele não pode ser usado.

### T-Bone

<div class="tcg-card-grid">
  {% include tcg-card.html game="fab" name="T-Bone" pitch="red" %}
</div>

**T-Bone** obriga o defensor a defender com um equipamento que controla, se possível, desde que você controle uma carta boosted na combat chain.

Exemplo:

O atacante deu boost e jogou T-Bone. O defensor tem:

| Equipamento | Defesa | Pode ser escolhido? |
|---|---:|---:|
| Crown of Providence | 2 | Sim |
| Snapdragon Scalers | 0 | Sim |
| Compass of Sunken Depths | sem defesa | Não |

O defensor pode escolher Snapdragon Scalers, mesmo defendendo 0, para cumprir a obrigação e preservar a Crown.

### Meganetic Shockwave

<div class="tcg-card-grid">
  {% include tcg-card.html game="fab" name="Meganetic Shockwave" pitch="blue" %}
</div>

**Meganetic Shockwave** obriga o defensor a defender com X equipamentos, onde X é o número de vezes que você boostou naquela combat chain.

Exemplo:

Você deu boost 3 vezes e joga Meganetic Shockwave.

O defensor tem:

| Equipamento | Defesa | Conta como opção legal? |
|---|---:|---:|
| Crown of Providence | 2 | Sim |
| Fyendal’s Spring Tunic | 1 | Sim |
| Nullrune Gloves | 0 | Sim |
| Compass of Sunken Depths | sem defesa | Não |

Nesse caso, se possível, ele precisará defender com Crown, Tunic e Nullrune. Compass não entra porque não tem defesa.

### Meganetic Protocol

<div class="tcg-card-grid">
  {% include tcg-card.html game="fab" name="Meganetic Protocol" pitch="blue" %}
</div>

**Meganetic Protocol** é mais específico: ele obriga o defensor a defender com equipamentos que tenham contadores -1 de defesa, conforme o número de Evos que o atacante tem equipado.

Exemplo:

O atacante tem 2 Evos equipados e joga Meganetic Protocol.

O defensor tem:

| Equipamento | Estado | Pode ser puxado? |
|---|---|---:|
| Tectonic Plating | 1 contador -1 | Sim |
| Refraction Bolters | 1 contador -1 | Sim |
| Crown of Providence | sem contador | Não para esse efeito |
| Nullrune Gloves | sem contador | Não para esse efeito |

Mesmo um equipamento com defesa atual 0 pode ser usado, desde que ainda tenha a propriedade defesa.

### Palantir Aeronought

<div class="tcg-card-grid">
  {% include tcg-card.html game="fab" name="Palantir Aeronought" pitch="red" %}
</div>

**Palantir Aeronought** também obriga o herói defensor a defender com um equipamento, se puder. Além disso, pode virar Cogs para ganhar poder e, na terceira ativação da habilidade no turno, destruir uma carta defendendo.

Esse é um exemplo de ataque que não apenas puxa equipamento, mas também pode punir a carta que entrou na defesa.

---

## 7. Escudos e Off-Hand

Escudos em Flesh and Blood normalmente são equipamentos do tipo **Off-Hand**.

Exemplos:

| Carta | Tipo | Defesa |
|---|---|---:|
| Rampart of the Ram’s Head | Guardian Equipment - Off-Hand | 0 |
| Stalagmite, Bastion of Isenloft | Ice Guardian Equipment - Off-Hand | 2 |
| Steelbraid Buckler | Guardian Equipment - Off-Hand | 2 |
| Seasoned Saviour | Guardian Equipment - Off-Hand | 3 |

<div class="tcg-card-grid">
  {% include tcg-card.html game="fab" name="Rampart of the Ram's Head" %}
  {% include tcg-card.html game="fab" name="Stalagmite, Bastion of Isenloft" %}
  {% include tcg-card.html game="fab" name="Seasoned Saviour" %}
</div>

Off-Hand ocupa uma zona de arma. Por isso, normalmente você usa escudo com arma 1H, não com arma 2H.

Exemplos:

| Arma | Pode usar escudo junto? |
|---|---:|
| Titan’s Fist, 1H | Sim |
| Winter’s Wail, 1H | Sim |
| Anothos, 2H | Não |
| Sledge of Anvilheim, 2H | Não |

### Rampart of the Ram’s Head

Rampart tem defesa 0 e diz:

> When this defends, you may pay 1 resource. If you do, it gets +1 defense until end of turn.

A dúvida comum é: posso pagar 4 recursos de uma vez para ele defender 4?

A resposta é **não**.

Rampart dispara uma vez cada vez que defende. Quando esse efeito resolve, você pode pagar 1 recurso. Se pagar, ele ganha +1 de defesa até o fim do turno.

| Situação | Defesa do Rampart |
|---|---:|
| Defende e não paga | 0 |
| Defende e paga 1 | 1 |
| Tenta pagar 4 de uma vez | Não pode |

Mas ele pode acumular defesa no mesmo turno se defender em combat chains diferentes.

Exemplo:

| Chain | O que acontece | Defesa naquela defesa |
|---|---|---:|
| Primeira chain | Rampart defende e você paga 1 | 1 |
| Segunda chain no mesmo turno | Rampart defende de novo e você paga 1 | 2 |
| Terceira chain no mesmo turno | Rampart defende de novo e você paga 1 | 3 |
| Quarta chain no mesmo turno | Rampart defende de novo e você paga 1 | 4 |

Resumo:

> **Rampart não bloqueia 4 pagando 4 de uma vez. Ele pode chegar a defender 4 se defender quatro vezes no mesmo turno, em combat chains diferentes, pagando 1 em cada vez.**

### Stalagmite, Bastion of Isenloft

Stalagmite defende 2 e, quando defende, cria um Frostbite sob controle do herói atacante.

Depois, quando a combat chain fecha, Temper coloca um contador -1 de defesa nela. Se com isso ela ficar com defesa 0, ela é destruída.

Sequência:

1. Stalagmite defende.
2. O efeito “when this defends” cria Frostbite.
3. O dano é resolvido.
4. Quando a combat chain fecha, Temper coloca contador -1.
5. Se a defesa virar 0, Stalagmite é destruída.

---

## 8. Prevenir dano não é a mesma coisa que defender

Alguns equipamentos não entram como cartas defensoras, mas ajudam a evitar dano.

As keywords mais comuns são:

| Keyword | O que faz | Conta como defender? |
|---|---|---:|
| Arcane Barrier | Paga recursos para prevenir dano arcano. | Não |
| Spellvoid | Destrói a carta para prevenir dano arcano. | Não |
| Quell | Paga recursos para prevenir dano e destrói depois. | Não |
| Ward | Destrói a carta para prevenir dano. | Não |
| Arcane Shelter | Destrói para prevenir dano arcano. | Não |

Exemplo:

**Nullrune Gloves** tem defesa 0 e Arcane Barrier.

- Se você declara Nullrune Gloves contra um ataque físico, ela está defendendo por 0.
- Se você usa Arcane Barrier contra dano arcano, ela não está defendendo; ela está prevenindo dano.

Essa diferença importa para efeitos que dizem “when this defends”, “defending card”, “defended by equipment” ou “must defend with equipment”.

---

## 9. Dominate, Overpower e Piercing contra equipamentos

Algumas keywords dos ataques mudam a forma de defender.

### Dominate

Dominate impede que o ataque seja defendido por mais de uma carta da mão.

Mas equipamento não é carta da mão.

Exemplo:

Um ataque com Dominate pode ser defendido por:

- 1 carta da mão;
- Crown of Providence;
- Fyendal’s Spring Tunic;
- Rampart of the Ram’s Head.

Dominate limita a mão, não os equipamentos.

### Overpower

Overpower impede que o ataque seja defendido por mais de uma action card.

Equipamentos não são action cards, então podem entrar normalmente se forem legais.

Frase simples:

> **Dominate limita carta da mão. Overpower limita action card.**

### Piercing

Piercing pune equipamento.

> Piercing N: se isto for defendido por equipamento, ganha +N de poder.

Então, às vezes, usar equipamento para “salvar vida” pode aumentar o dano do ataque.

---

## 10. Evos, Teklovossen e a defesa com equipamento

<div class="tcg-card-grid">
  {% include tcg-card.html game="fab" name="Teklovossen" %}
</div>

Evos são um caso especial porque são equipamentos que podem estar no deck e podem ser jogados durante a partida.

Um Evo na mão pode defender se tiver defesa. Mas, quando ele defende da mão, ele não está equipado como permanente. Por isso, keywords como Battleworn, Blade Break e Temper normalmente importam quando o Evo está equipado na arena.

A grande jogada defensiva com **Teklovossen** é transformar uma Base antes da combat chain fechar.

Exemplo:

1. Você defende com uma Base Equipment.
2. O dano é calculado.
3. Antes da combat chain fechar, você usa a habilidade do Teklovossen para jogar um Evo como instant.
4. A Base vira sub-card embaixo do Evo.
5. Quando a combat chain fecha, a Base não está mais defendendo.
6. Assim, ela não recebe contador de Battleworn/Temper e não quebra por Blade Break.

Resumo:

> **Teklovossen pode defender com uma Base e depois transformá-la antes do fechamento da chain para evitar o desgaste daquela Base.**

---

## 11. Pleiades, Toughness e Plate of Tough Love

<div class="tcg-card-grid">
  {% include tcg-card.html game="fab" name="Plate of Tough Love" %}
</div>

Algumas cartas não mudam equipamento diretamente, mas criam situações em que a defesa do equipamento muda.

**Plate of Tough Love** tem defesa 1 e Blade Break. Ela ganha +2 de defesa se você controlar um token **Confidence** e um token **Toughness**.

| Situação | Defesa da Plate |
|---|---:|
| Sem tokens | 1 |
| Só Confidence | 1 |
| Só Toughness | 1 |
| Confidence + Toughness | 3 |

Isso importa contra ataques com Fragment.

Se Plate of Tough Love estiver com defesa 3 no momento em que defende, ela conta como carta com 2 ou mais de defesa. Então Fragment reduz o poder do ataque.

Mas cuidado: **Toughness token**, por si só, aumenta a próxima action card que você usa para defender. Ele não aumenta equipamento diretamente. A Plate aumenta por causa do próprio texto dela, que verifica se você controla Confidence e Toughness.

---

## 12. Erros comuns de mesa

### “Meu equipamento tem defesa 0, então não pode bloquear.”

Errado. Defesa 0 é defesa válida.

### “Meu equipamento não tem defesa, mas T-Bone me obrigou, então posso usar.”

Errado. T-Bone só obriga se houver um equipamento que possa defender legalmente.

### “Crown compra quando quebra.”

Errado. Crown compra quando defende. Ela quebra depois, quando a combat chain fecha.

### “Battleworn quebra quando chega a 0.”

Errado. Battleworn só coloca contador. Quem destrói ao chegar a 0, no fechamento da chain, é Temper.

### “Temper coloca contador na hora que bloqueia.”

Errado. Temper coloca contador quando a combat chain fecha.

### “Rampart bloqueia 4 se eu pagar 4 recursos.”

Errado. Rampart só permite pagar 1 por vez quando ele defende. Para chegar a defesa 4, ele precisaria defender várias vezes no mesmo turno, em combat chains diferentes.

### “Prevenir dano com Arcane Barrier é defender.”

Errado. Arcane Barrier, Spellvoid, Quell e Ward previnem dano, mas não são declaração de defesa.

---

## 13. Cola rápida para consulta

| Situação | Resposta curta |
|---|---|
| Equipamento com defesa 0 pode defender? | Sim. |
| Equipamento sem defesa pode defender? | Não. |
| Blade Break quebra quando? | Quando a combat chain fecha. |
| Battleworn destrói em 0? | Não. |
| Temper destrói em 0? | Sim, quando o Temper resolve no fechamento da chain. |
| Guardwell destrói? | Não necessariamente; ele coloca contadores. |
| Crown compra quando? | Quando defende. |
| Rampart paga 4 de uma vez? | Não. Paga 1 por defesa. |
| T-Bone puxa defesa 0? | Sim. |
| T-Bone puxa equipamento sem defesa? | Não. |
| Fragment olha defesa impressa ou atual? | Defesa atual. |
| Dominate impede equipamento? | Não. Limita cartas da mão. |
| Overpower impede equipamento? | Não. Limita action cards. |
| Arcane Barrier conta como block? | Não. É prevenção de dano arcano. |

---

## Conclusão

A defesa com equipamentos em Flesh and Blood depende menos de “quanto está escrito no canto da carta” e mais de **quando a carta defende**, **qual é a defesa atual dela**, **se ela realmente tem a propriedade defesa** e **quando a combat chain fecha**.

A frase principal do guia é:

> **Equipamento com defesa 0 pode defender; equipamento sem defesa não pode. E a maioria dos efeitos que desgasta ou quebra equipamento acontece só quando a combat chain fecha.**

Dominando isso, você evita erros contra T-Bone, Meganetic Shockwave, Fragment, Rampart, Crown of Providence, escudos Guardian e interações avançadas com Evos.

{% include internal-links-card.html %}
