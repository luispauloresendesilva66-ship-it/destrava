# Aula 6 — Tamanhos e unidades

**Nível:** Primeira Demão · **Duração estimada:** ~10 minutos · **Blocos:** 11

## Como este roteiro é usado

- A voz do vídeo é **gerada por IA** a partir do texto em "Fala". Por isso a "Fala" precisa soar natural quando lida em voz alta: frases curtas, sem siglas soltas, com os símbolos de código ditos por extenso.
- O que está em "Tela" é o que o pipeline de vídeo anima (editor da Destrava, prévia do navegador, rótulos, setas, checks). Não é lido pela voz.
- Um áudio por bloco: `bloco01`, `bloco02`... Para corrigir uma fala, gere de novo só aquele bloco.
- Todo o conteúdo de exemplo é fictício (a aluna "Ana"). Nada de marcas, empresas ou sites reais: os endereços usam o domínio reservado `example.com`. Ferramentas citadas de forma genérica ("as configurações do navegador", "as ferramentas de desenvolvedor"), sem nomes de produtos.
- A página da Ana é a mesma da aula 9 do nível 1 (com a foto `imagens/foto-ana.jpg`, de 200 por 200, dentro da seção "Sobre mim"), já ligada ao `estilo.css`, com tudo o que foi feito até a aula 5: `body` com fundo `#fdf6e3` (creme), `font-family: Verdana, Arial, sans-serif;`, `font-size: 18px;` e `line-height: 1.6;`; `p` com `color: #333333`; `h1, h2` com `color: #264653` (azul-petróleo), `font-family: Georgia, "Times New Roman", serif;` e `line-height: 1.2;`; `h1` com `text-align: center;`; `.destaque` com `font-weight: bold;`, `padding: 8px 16px;` e `border-left: 4px solid #b5452c;`; `.destaque, nav a` com `color: #b5452c` (terracota); `nav a` sem sublinhado e em negrito; `section` com `background-color: #ffffff;`, `padding: 16px;`, `border: 2px solid #264653;`, `border-radius: 8px;` e `margin-bottom: 24px;`; `img` com `border-radius: 50%;`; `footer` com fundo `#264653` e `footer p` com `color: #ffffff`. Nesta aula não entra nenhuma cor nova.
- Na "Fala", os termos de CSS e as tags são escritos do jeito que se fala, com as mesmas grafias das aulas 1 a 5: `CSS` = "cê ésse ésse", `font-size` = "fónti sáiz", `line-height` = "láin ráit", `px` = "pê xis", `h1` = "agá um", `h2` = "agá dois", `main` = "mêin", `padding` = "péding", `border` = "bórder", `margin` = "márdjin", `border-radius` = "bórder rêidius", `rem` = "rém", `box-sizing` = "bócs sáizin". Novas nesta aula: `width` = "uídth", `height` = "rêit" (sozinho; dentro de `line-height` continua "láin ráit", como na aula 4), `max-width` = "méx uídth", `em` = "êm", `border-box` = "bórder bócs", `auto` = "óto", `*` = "asterisco". Os números com unidade são ditos por extenso: `300px` = "trezentos pê xis", `720px` = "setecentos e vinte pê xis", `2rem` = "dois rém", `1.5rem` = "um vírgula cinco rém", `1.125rem` = "um vírgula um dois cinco rém"; o `%` é dito "por cento" (`50%` = "cinquenta por cento", `100%` = "cem por cento"). Os decimais são ditos com "vírgula" (na "Tela", aparecem com ponto, como o CSS exige). Os símbolos são ditos por extenso: `.` = "ponto", `{` = "abre chaves", `}` = "fecha chaves", `:` = "dois pontos", `;` = "ponto e vírgula". Seguem com o nome normal: HTML, body, img, estilo ponto cê ésse ésse. O nome `content-box` aparece só na "Tela".

---

## Bloco 01 — Abertura

**Fala:**
Olá, seja bem-vindo à aula seis da Primeira Demão. Na aula passada, a Ana transformou as seções em cartões, com péding, bórder e márdjin, e deixou a foto redonda. A página ganhou respiro. Mas abre essa página numa tela bem larga, de computador. Os cartões esticam de uma ponta à outra, e cada linha de texto fica comprida demais para ler. Agora pensa no celular. Se alguém colocar uma largura fixa grande numa caixa, a página passa da tela, e aparece a rolagem para o lado. Hoje, você vai aprender a controlar o tamanho das caixas. A largura e a altura, as unidades pê xis, por cento e rém, a largura máxima, e o bócs sáizin, que a aula passada prometeu. No fim, a página da Ana vai ficar boa no computador e no celular. Abre o editor e bora destravar.

**Tela:** logo da Destrava → título "Aula 6 — Tamanhos e unidades". Um cartão de revisão mostra `padding: 16px;`, `border: 2px solid #264653;` e `margin-bottom: 24px;` com o rótulo "aula 5: o modelo de caixa". Depois, a página da Ana como ficou na aula 5, num monitor bem largo: os cartões esticados de ponta a ponta e uma linha de texto enorme, com uma seta longa voltando ao começo da linha seguinte; rótulo "linha comprida demais". Em seguida, a silhueta de um celular com uma caixa larga passando da borda da tela e uma barra de rolagem horizontal; rótulo "vazou para o lado".

---

## Bloco 02 — Largura e altura

**Fala:**
Toda caixa tem uma largura e uma altura. A largura é a uídth, e a altura é a rêit. Até agora, você não mexeu nelas, e o navegador decidiu sozinho. Por padrão, uma seção, um parágrafo ou um título ocupam toda a largura disponível, de uma ponta à outra. E a altura cresce junto com o conteúdo: mais texto, caixa mais alta. Para mudar isso, você escreve um valor. Uídth, dois pontos, trezentos pê xis: a caixa fica com trezentos pê xis de largura. O pê xis é uma unidade fixa. Trezentos pê xis são trezentos pê xis num celular ou num monitor enorme. Isso é perigoso para caixas grandes. Uma caixa com uídth de mil pê xis não cabe num celular, que tem uns quatrocentos de largura, e a página vaza para o lado. E a altura? Quase sempre, deixe no automático. Se você fixar a rêit e o texto crescer, ele transborda e passa por cima do que vem depois.

**Tela:** um parágrafo dentro de uma caixa tracejada que vai de uma ponta à outra da prévia; setas marcam `width` ("largura") na horizontal e `height` ("altura") na vertical. Rótulo: "padrão: largura toda, altura do conteúdo". Mais texto entra no parágrafo e a caixa cresce para baixo; rótulo "a altura acompanha o conteúdo". No editor:
```css
p {
  width: 300px;
}
```
a caixa encolhe para `300px`, com uma régua em cima. Depois, a mesma caixa com `width: 1000px;` aparece num celular de uns `400px` e passa da tela; "x" vermelho, rótulo "`px` é fixo: não se adapta". Por fim, uma caixa com `height: 80px;` e o texto escapando por baixo, por cima do cartão seguinte; rótulo "altura fixa: o texto transborda".

---

## Bloco 03 — Porcentagem: uma parte da caixa mãe

**Fala:**
A primeira unidade que se adapta é a porcentagem. Por cento, no cê ésse ésse, quer dizer uma parte da caixa de quem está por fora, a caixa mãe. Se a Ana coloca uídth, cinquenta por cento, num parágrafo dentro de uma seção de seiscentos pê xis, o parágrafo fica com trezentos. Se a seção diminuir para quatrocentos, o parágrafo diminui junto, para duzentos. A conta é sempre feita em cima da caixa mãe, não da tela inteira. E cem por cento quer dizer a largura toda da caixa mãe. Por isso, a porcentagem se adapta a telas diferentes. Com a altura, a porcentagem é mais traiçoeira. Rêit, cinquenta por cento, só funciona se a caixa mãe tiver uma altura definida. Como a altura costuma ser automática, muitas vezes a declaração simplesmente não faz nada. Mais um motivo para deixar a altura em paz.

**Tela:** uma seção de `600px` (caixa mãe, contorno azul-petróleo) com um parágrafo dentro, em `width: 50%;`; o parágrafo mede `300px` e aparece a conta `50% de 600px = 300px`. A seção encolhe para `400px` e o parágrafo encolhe junto: `50% de 400px = 200px`. Rótulo: "`%` = parte da caixa mãe". Depois, `width: 100%;` com o parágrafo ocupando a seção inteira. Por fim, `height: 50%;` dentro de uma caixa mãe sem altura definida: nada muda, e aparece um ponto de interrogação com o rótulo "altura em `%`: só com a altura da mãe definida".

---

## Bloco 04 — Rem: o tamanho que respeita quem lê

**Fala:**
Agora, a unidade preferida para o tamanho das letras: o rém. Rém quer dizer o tamanho da letra da raiz da página, que é o elemento HTML. Nos navegadores, esse tamanho padrão é dezesseis pê xis. Então, um rém vale dezesseis pê xis, dois rém valem trinta e dois, e um vírgula cinco rém valem vinte e quatro. E por que não usar pê xis? Muita gente aumenta o tamanho da letra nas configurações do navegador ou do celular, para enxergar melhor. Quando a pessoa escolhe vinte pê xis, um rém passa a valer vinte, e todo o texto em rém cresce junto. Um texto preso em pê xis pode ignorar essa escolha, e a página fica difícil de ler justo para quem mais precisa. Isso é acessibilidade. Existe também o êm, primo do rém. Ele usa o tamanho da letra da caixa mãe, não da raiz. Num elemento dentro do outro, o êm vai se multiplicando, e as contas se embaralham. Por isso, para começar, fique com o rém.

**Tela:** a árvore da página com o elemento `html` no topo, destacado, e a etiqueta "raiz: `16px` (padrão do navegador)". Uma tabela aparece linha por linha: `1rem = 16px`, `1.5rem = 24px`, `2rem = 32px`. Depois, uma tela genérica de configurações do navegador com o tamanho da letra passando de "médio" para "grande": a raiz vira `20px`, a tabela se refaz (`1rem = 20px`, `2rem = 40px`) e o texto em `rem` na prévia cresce, com check verde; ao lado, um texto em `px` que não muda, com "x" vermelho. Rótulo: "`rem` respeita a escolha de quem lê: acessibilidade". Por fim, um cartão pequeno: "`em` = tamanho da letra da caixa mãe", com três caixas aninhadas em `1.2em` e a letra crescendo a cada nível; rótulo "`em` se multiplica: comece com `rem`".

---

## Bloco 05 — As letras da Ana em rem

**Fala:**
Vamos converter os tamanhos da Ana. A conta é simples: divida o valor em pê xis por dezesseis. O body está com fónti sáiz de dezoito pê xis. Dezoito dividido por dezesseis dá um vírgula um dois cinco. Então, fónti sáiz, um vírgula um dois cinco rém. Na tela, fica igualzinho, mas agora respeita a escolha de quem lê. Os títulos também ganham tamanho em rém. Agá um, fónti sáiz, dois rém: trinta e dois pê xis no padrão. Agá dois, fónti sáiz, um vírgula cinco rém: vinte e quatro. Repara na escrita. No cê ésse ésse, o número vem colado na unidade, sem espaço, e com ponto no lugar da vírgula. E o láin ráit de um vírgula seis, sem unidade, continua como está: ele já acompanha o tamanho da letra. O pê xis não some da página. Ele segue ótimo para as bordas e os detalhes pequenos, que não precisam crescer com o texto.

**Tela:** a conta aparece grande: `18px ÷ 16 = 1.125rem`. No `estilo.css`, na regra `body`, `font-size: 18px;` é riscado e substituído por:
```css
  font-size: 1.125rem;
```
a prévia não muda; rótulo "mesmo tamanho, agora em `rem`". Depois, entram as regras:
```css
h1 {
  font-size: 2rem;
}

h2 {
  font-size: 1.5rem;
}
```
com as etiquetas "`2rem` = `32px`" e "`1.5rem` = `24px`". O `1.5rem` ganha uma lupa: o ponto ("ponto, não vírgula") e a junção do número com a unidade ("tudo junto, sem espaço"); ao lado, `1,5 rem` riscado com "x" vermelho. Por fim, `line-height: 1.6;` com check verde e o rótulo "sem unidade: já acompanha a letra", e `border: 2px solid #264653;` com o rótulo "`px` segue bom para detalhes".

---

## Bloco 06 — Max-width: um teto para o texto

**Fala:**
Lembra da dica da aula quatro? Linhas de sessenta a setenta e cinco letras são as mais fáceis de ler. Numa tela larga, o texto da Ana passa muito disso. Daria para usar uídth, setecentos e vinte pê xis, no mêin. Só que aí, no celular, a caixa de setecentos e vinte não cabe, e a página vaza. A solução é a méx uídth, a largura máxima. Mêin, abre chaves, méx uídth, dois pontos, setecentos e vinte pê xis, ponto e vírgula, fecha chaves. Ela funciona como um teto. Numa tela grande, o mêin para de crescer em setecentos e vinte, e as linhas ficam num tamanho bom para ler. Numa tela pequena, ele fica menor, do tamanho que couber. Agora, repara que a caixa ficou encostada à esquerda, com um espaço vazio do lado direito. Centralizar essa caixa é assunto da próxima aula. Por enquanto, guarda a ideia: para caixas grandes, prefira méx uídth a uídth.

**Tela:** o cartão da aula 4 volta: "60 a 75 letras por linha". Na prévia larga, uma linha de texto da Ana com um contador mostrando "110 letras" e "x" vermelho. Primeiro, `width: 720px;` no `main`: no computador fica bom, mas no celular a caixa passa da tela; "x" vermelho, rótulo "fixo: vaza no celular". Depois:
```css
main {
  max-width: 720px;
}
```
a prévia alterna entre o computador (o `main` para em `720px`, uma linha tracejada marca o "teto", contador "70 letras", check verde) e o celular (o `main` ocupa a tela toda, sem vazar, check verde). Rótulo: "`max-width` = teto: cresce até ali, encolhe quando precisa". Por fim, o `main` encostado à esquerda no computador, com o espaço vazio à direita e uma etiqueta "centralizar: aula 7".

---

## Bloco 07 — Imagens que cabem na caixa

**Fala:**
As imagens têm um problema parecido. Uma foto tem um tamanho próprio, em pê xis. Se ela for mais larga que a tela do celular, ela vaza da caixa e empurra a página para o lado. A regra que resolve isso é famosa. Img, abre chaves, méx uídth, dois pontos, cem por cento, ponto e vírgula, fecha chaves. Quer dizer: a imagem nunca fica mais larga que a caixa mãe. Se a foto couber, ela fica no tamanho dela. Se não couber, ela encolhe até caber. Repara que é méx uídth, e não uídth. Com uídth de cem por cento, uma foto pequena seria esticada até a largura toda, e ficaria borrada. E uma dica: junto com essa regra, use rêit, dois pontos, óto. Assim, a altura acompanha a largura, e a foto encolhe sem achatar. A foto da Ana, de duzentos por duzentos, continua um círculo perfeito.

**Tela:** uma foto genérica de paisagem, de `1200px` de largura, dentro de um cartão num celular: a foto passa da borda da tela; "x" vermelho, rótulo "imagem maior que a caixa: vaza". No editor:
```css
img {
  max-width: 100%;
}
```
a foto encolhe até a largura do cartão; check verde, rótulo "nunca mais larga que a caixa mãe". Depois, uma comparação lado a lado com uma foto pequena: `max-width: 100%;` (fica no tamanho dela, nítida, check verde) e `width: 100%;` (esticada e borrada, "x" vermelho). Em seguida, a foto encolhendo com a altura fixa, achatada ("x" vermelho), e, com `height: auto;`, na proporção certa (check verde). Por fim, a regra `img` da Ana com `border-radius: 50%;`, `max-width: 100%;` e `height: auto;`, e a foto `200 × 200` ainda redonda.

---

## Bloco 08 — Box-sizing: a conta que surpreende

**Fala:**
Agora, a conta que surpreende todo mundo. A Ana dá uídth de trezentos pê xis para um cartão, com péding de dezesseis e bórder de dois pê xis. Quanto ele mede na tela? Trezentos? Não. Por padrão, a uídth vale só para o conteúdo. O péding e a bórder ficam do lado de fora e se somam. Trezentos, mais dezesseis de cada lado, mais dois de cada lado: trezentos e trinta e seis pê xis. A propriedade bócs sáizin muda essa conta. Com o valor bórder bócs, a largura passa a incluir o péding e a bórder. Trezentos são trezentos, e o conteúdo se ajusta por dentro. É tão útil que quase todo projeto começa com uma regra assim: asterisco, abre chaves, bócs sáizin, dois pontos, bórder bócs, ponto e vírgula, fecha chaves. O asterisco é o seletor universal. Ele quer dizer: todos os elementos da página, sem exceção. Uma linha só, e a conta fica do jeito que a gente espera.

**Tela:** um cartão com `width: 300px;`, `padding: 16px;` e `border: 2px solid #264653;`, com o diagrama do modelo de caixa da aula 5 por cima. A régua mede o conteúdo (`300`) e a conta aparece: `300 + 16 + 16 + 2 + 2 = 336px`; rótulo "padrão (`content-box`): `width` só do conteúdo". Depois, uma caixa com `width: 100%;` e `padding: 16px;` passando da borda da caixa mãe; "x" vermelho. Em seguida:
```css
* {
  box-sizing: border-box;
}
```
o mesmo cartão volta a medir `300px` de ponta a ponta, com o `padding` e a `border` entrando para dentro e o conteúdo encolhendo para `264px`; conta `300 − 32 − 4 = 264px`, check verde, rótulo "`border-box`: `padding` e `border` por dentro da largura". O `*` ganha uma etiqueta "seletor universal: todos os elementos", e setas saem dele para `body`, `main`, `section`, `p` e `img`.

---

## Bloco 09 — Os tamanhos na página da Ana

**Fala:**
Agora, a Ana junta tudo no estilo ponto cê ésse ésse. No topo do arquivo, a regra do asterisco, com bócs sáizin, bórder bócs. No body, o fónti sáiz virou um vírgula um dois cinco rém. Nos títulos, agá um com dois rém e agá dois com um vírgula cinco rém. No mêin, méx uídth de setecentos e vinte pê xis, para as linhas não ficarem compridas demais. E na img, junto com o bórder rêidius da aula passada, méx uídth de cem por cento e rêit óto. Repara no que não está no arquivo: nenhuma rêit fixa nas seções e nenhuma uídth em pê xis nas caixas grandes. Abre a prévia e muda o tamanho da janela. No computador, o texto para de esticar. No celular, nada vaza para o lado. E, se a pessoa aumentar a letra no navegador, os textos crescem junto.

**Tela:** o `estilo.css` da Ana sendo atualizado, uma declaração por vez, cada uma refletida na prévia (as regras de cor, de texto e de caixa das aulas 3 a 5 continuam no arquivo):
```css
* {
  box-sizing: border-box;
}

body {
  font-size: 1.125rem;
}

h1 {
  font-size: 2rem;
}

h2 {
  font-size: 1.5rem;
}

main {
  max-width: 720px;
}

img {
  border-radius: 50%;
  max-width: 100%;
  height: auto;
}
```
a janela da prévia é arrastada de larga para estreita: no computador, o `main` para em `720px` e as linhas ficam curtas; no celular, os cartões ocupam a tela sem vazar e a foto continua redonda. Depois, o tamanho da letra nas configurações passa para "grande" e os textos crescem juntos. Rótulo: "teto na largura, letras em `rem`, nada vaza".

---

## Bloco 10 — Erros comuns

**Fala:**
Agora, os erros mais comuns com tamanhos. O primeiro: fixar a altura de uma caixa com texto. Na sua tela cabe, mas no celular as linhas quebram mais, o texto fica mais alto e transborda. Deixe a rêit no automático. O segundo: uídth de cem por cento com péding, sem o bócs sáizin. A caixa fica maior que a mãe e vaza. Use a regra do asterisco com bórder bócs. O terceiro: esquecer a unidade. Uídth, trezentos, sem o pê xis, não funciona, e o navegador ignora a declaração. A única exceção é o zero: zero é zero em qualquer unidade, então pode ir sem. O quarto: misturar rém e êm sem perceber. O êm se multiplica dentro de caixas aninhadas, e a letra cresce sem você entender por quê. Na dúvida, use rém. E o quinto, para os exercícios: escreva o número colado na unidade, com ponto, e use a propriedade que o enunciado pedir. Méx uídth é diferente de uídth.

**Tela:** cinco cartões de erro, cada um com a correção embaixo:
1. uma seção com `height: 120px;` no celular e o texto escapando por baixo; "x" vermelho; embaixo, a mesma seção sem `height`, crescendo com o texto, check verde e o lembrete "altura: deixe no automático".
2. `width: 100%;` + `padding: 16px;` com a caixa passando da mãe; embaixo, `* { box-sizing: border-box; }` com check verde.
3. `width: 300;` riscado, com "x" vermelho e o rótulo "sem unidade: ignorado"; embaixo, `width: 300px;` com check verde e, ao lado, `margin: 0;` com o rótulo "zero pode ir sem unidade" (e uma etiqueta pequena: "`line-height: 1.6` é outro caso: sem unidade de propósito").
4. três caixas aninhadas em `1.5em` com a letra crescendo a cada nível ("x" vermelho); embaixo, as mesmas em `1.5rem`, todas iguais, check verde.
5. `font-size: 2 rem;` e `font-size: 2,5rem;` riscados; embaixo, `font-size: 2rem;` e `font-size: 2.5rem;` com checks verdes. Ao lado, `width: 720px;` e `max-width: 720px;` com o sinal de diferente entre eles e o rótulo "para o corretor, `max-width` ≠ `width`".
No fim, o aviso da aula 1: "CSS com erro não dá mensagem", e um lembrete: "nos exercícios, escreva o valor exatamente como no enunciado: `2rem`, `100%`, `border-box`".

---

## Bloco 11 — Resumo e próximo degrau

**Fala:**
Vamos recapitular. A uídth é a largura e a rêit é a altura, e a altura quase sempre fica no automático. O pê xis é fixo, ótimo para detalhes pequenos. A porcentagem é uma parte da caixa mãe. O rém é o tamanho da letra da raiz, dezesseis pê xis no padrão, e cresce quando a pessoa aumenta a letra. Para passar de pê xis para rém, divida por dezesseis. A méx uídth é um teto: setecentos e vinte pê xis no mêin deixam o texto fácil de ler, e cem por cento na img impedem a foto de vazar. E o bócs sáizin com bórder bócs, no asterisco, faz o péding e a bórder caberem dentro da largura. Agora é a sua vez: os exercícios estão logo abaixo do vídeo. Na próxima aula, você vai descobrir por que alguns elementos ocupam a linha toda e outros não, e vai centralizar o mêin da Ana no meio da tela. Até lá, e bora destravar.

**Tela:** lista do resumo aparecendo item por item com checks verdes ("`width` e `height`: altura no automático", "`px` = fixo", "`%` = parte da caixa mãe", "`rem` = letra da raiz (`16px`): `px ÷ 16`", "`main { max-width: 720px; }`", "`img { max-width: 100%; }`", "`* { box-sizing: border-box; }`"); botão "Fazer os exercícios" pulsando. Prévia da próxima aula: um título ocupando a linha toda ao lado de um link que ocupa só o espaço do texto, com as etiquetas "block" e "inline"; depois, o `main` da Ana deslizando para o meio da tela, com a etiqueta `margin: 0 auto`; o texto "Aula 7 — Block e inline". Encerramento com o logo da Destrava e o slogan "Destrava sua carreira. Um nível de cada vez."
