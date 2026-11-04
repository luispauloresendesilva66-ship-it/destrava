# Aula 9 — Flexbox na prática

**Nível:** Primeira Demão · **Duração estimada:** ~10 minutos · **Blocos:** 11

## Como este roteiro é usado

- A voz do vídeo é **gerada por IA** a partir do texto em "Fala". Por isso a "Fala" precisa soar natural quando lida em voz alta: frases curtas, sem siglas soltas, com os símbolos de código ditos por extenso.
- O que está em "Tela" é o que o pipeline de vídeo anima (editor da Destrava, prévia do navegador, rótulos, setas, checks). Não é lido pela voz.
- Um áudio por bloco: `bloco01`, `bloco02`... Para corrigir uma fala, gere de novo só aquele bloco.
- Todo o conteúdo de exemplo é fictício (a aluna "Ana"). Nada de marcas, empresas ou sites reais: os endereços usam o domínio reservado `example.com`. Ferramentas citadas de forma genérica ("as ferramentas de desenvolvedor do navegador", "o modo de tela de celular"), sem nomes de produtos.
- A página da Ana é a mesma da aula 9 do nível 1 (com o `header` que tem o `h1` e o menu `nav`, a seção `#projetos` com o `h2` "Meus projetos" e uma lista `ul` de dois links, e o `footer` com o parágrafo "Feito pela Ana, em 2026."), já ligada ao `estilo.css`, com tudo o que foi feito até a aula 8: `*` com `box-sizing: border-box;`; `body` com fundo `#fdf6e3` (creme), `font-family: Verdana, Arial, sans-serif;`, `font-size: 1.125rem;` e `line-height: 1.6;`; `p` com `color: #333333`; `h1, h2` com `color: #264653` (azul-petróleo), `font-family: Georgia, "Times New Roman", serif;` e `line-height: 1.2;`; `h1` com `text-align: center;` e `font-size: 2rem;`; `h2` com `font-size: 1.5rem;`; `.destaque` com `font-weight: bold;`, `padding: 8px 16px;` e `border-left: 4px solid #b5452c;`; `.destaque, nav a` com `color: #b5452c` (terracota); `nav a` sem sublinhado, em negrito, com `display: inline-block;` e `padding: 8px 12px;`; `section` com `background-color: #ffffff;`, `padding: 16px;`, `border: 2px solid #264653;`, `border-radius: 8px;` e `margin-bottom: 24px;`; `main` com `max-width: 720px;` e `margin: 0 auto;`; `img` com `border-radius: 50%;`, `max-width: 100%;`, `height: auto;` e `display: block;`; `header` com `display: flex;`, `justify-content: space-between;` e `align-items: center;`; `nav ul` com `display: flex;`, `gap: 16px;`, `list-style: none;` e `padding: 0;`; `footer` com fundo `#264653` e `footer p` com `color: #ffffff`. Nesta aula não entra nenhuma cor nova: os cartões usam o creme `#fdf6e3` e o azul-petróleo `#264653`, que já estão no arquivo.
- As contas de largura da aula: o `main` tem até `720px`; tirando o `padding` e a borda da `section`, sobram `684px` para os cartões. Três cartões de `200px` com dois `gap` de `16px` somam `632px`, então cabem numa linha no computador. Abaixo de `632px` de espaço, o terceiro desce; abaixo de `416px`, cada cartão fica numa linha.
- Na "Fala", os termos de CSS e as tags são escritos do jeito que se fala, com as mesmas grafias das aulas anteriores: `CSS` = "cê ésse ésse", `px` = "pê xis", `h1` = "agá um", `h2` = "agá dois", `p` = "pê", `a` = "é", `ul` = "u éle", `li` = "éle í", `section` = "sécchon", `footer` = "fúter", `div` = "dív", `class` = "cléss", `padding` = "péding", `border` = "bórder", `border-radius` = "bórder rêidius", `background-color` = "béquigráund cálor", `margin` = "márdjin", `margin-top` = "márdjin tóp", `width` = "uídth", `auto` = "óto", `display` = "displêi", `flex` = "fléx", `flexbox` = "fléx bócs", `flex-direction` = "fléx dairécxon", `row` = "rôu", `column` = "cólam", `justify-content` = "djâstifai cóntent", `align-items` = "aláin áitems", `space-between` = "spêis bituín", `center` = "cênter", `stretch` = "strétch", `gap` = "guép". Do nível 1: `article` = "ártikol". Novas nesta aula: `flex-wrap` = "fléx ráp", `wrap` = "ráp", `nowrap` = "nôu ráp", `flex: 1` = "fléx um" (quando é ditado, "fléx, dois pontos, um"), `min-width` = "mín uídth", `h3` = "agá três". Os nomes das classes são ditos como palavras em português: `.projetos` = "ponto projetos", `.cartao` = "ponto cartão" (sem til no código, porque nomes de classe não levam acento). Os números com unidade são ditos por extenso: `16px` = "dezesseis pê xis", `200px` = "duzentos pê xis", `400px` = "quatrocentos pê xis", `8px` = "oito pê xis", `1px` = "um pê xis". Os símbolos são ditos por extenso: `.` = "ponto", `{` = "abre chaves", `}` = "fecha chaves", `:` = "dois pontos", `;` = "ponto e vírgula". Seguem com o nome normal: HTML, body, estilo ponto cê ésse ésse. Os termos "flex container", "flex item" e "wrap", quando aparecem como rótulo, ficam só na "Tela"; na "Fala", eles são ditos "caixa flexível" (ou "a mãe"), "itens" (ou "as filhas") e "quebrar a linha".

---

## Bloco 01 — Abertura

**Fala:**
Olá, seja bem-vindo à aula nove da Primeira Demão. Na aula passada, você conheceu o fléx bócs. Displêi fléx na caixa mãe, e as filhas ficam lado a lado. Com ele, a Ana arrumou o menu e o topo da página. Hoje, a gente vai usar o fléx bócs num caso que aparece em quase todo site: cartões. Sabe aquela fileira de caixinhas, cada uma com um título, um texto curto e um link? A Ana vai transformar a seção meus projetos nisso. Só que tem um desafio. No computador, cabem três cartões numa linha. No celular, não cabem. E a gente quer que os cartões se ajeitem sozinhos, quebrando para a linha de baixo quando faltar espaço. Para isso, você vai aprender duas peças novas: o fléx ráp e o fléx um. Abre o editor e bora destravar.

**Tela:** logo da Destrava → título "Aula 9 — Flexbox na prática". Um cartão de revisão mostra `header { display: flex; justify-content: space-between; align-items: center; }` com o rótulo "aula 8: o topo da Ana". Depois, um rascunho da seção "Meus projetos" com três cartões lado a lado numa tela de computador; a tela encolhe até o tamanho de um celular e os cartões descem, um embaixo do outro. Rótulo: "o objetivo de hoje". As etiquetas `flex-wrap` e `flex: 1` aparecem em destaque.

---

## Bloco 02 — O HTML dos cartões

**Fala:**
Primeiro, o HTML. Hoje, a seção meus projetos é uma lista u éle com dois links. A Ana vai trocar a lista por cartões. Cada cartão é uma ártikol. Lembra do nível um? A ártikol é para um conteúdo que faz sentido sozinho. Um projeto, com título, texto e link, faz sentido sozinho. Dentro de cada ártikol, vão três coisas: um agá três com o nome do projeto, um pê com uma frase curta e um link. Por que agá três? Porque a seção já tem o agá dois, meus projetos, e cada cartão é uma parte dela. Cada ártikol ganha a cléss cartão. E os três cartões ficam juntos dentro de uma dív, com a cléss projetos. Por que uma dív? Porque ela é a caixa genérica, sem significado. Ela só existe para agrupar os cartões, e é ela que vai ser a caixa flexível. Agora, os cartões estão empilhados, um embaixo do outro. É o que a gente vai mudar.

**Tela:** no `index.html`, a lista antiga da seção `#projetos` fica cinza e é trocada por:
```html
<section id="projetos">
  <h2>Meus projetos</h2>
  <div class="projetos">
    <article class="cartao">
      <h3>Receitas favoritas</h3>
      <p>Um site com as receitas que eu mais gosto de fazer.</p>
      <a href="https://receitas.example.com" target="_blank" rel="noopener">Ver o site</a>
    </article>
    <article class="cartao">
      <h3>Página pessoal</h3>
      <p>Esta página, feita do zero com HTML e CSS.</p>
      <a href="#sobre">Ver do começo</a>
    </article>
    <article class="cartao">
      <h3>Todos os projetos</h3>
      <p>A lista completa, com o que já fiz e o que está em andamento.</p>
      <a href="paginas/projetos.html">Ver a lista</a>
    </article>
  </div>
</section>
```
`<article>` pisca com o cartão "nível 1, aula 8: faz sentido sozinho"; `<h3>` ganha o rótulo "parte da seção do `h2`"; `<div class="projetos">` ganha o rótulo "caixa genérica: só agrupa". A árvore: `div.projetos` → três `article.cartao` → `h3`, `p`, `a`. Na prévia, os três projetos empilhados, sem estilo.

---

## Bloco 03 — O visual de cada cartão

**Fala:**
Antes de mexer no layout, vamos dar cara de cartão para cada um. Isso você já sabe fazer, desde a aula cinco. No estilo ponto cê ésse ésse: ponto cartão, abre chaves. Béquigráund cálor creme, o mesmo do fundo da página, para o cartão se destacar do branco da seção. Péding, dois pontos, dezesseis pê xis, para o texto não encostar na borda. Bórder, dois pontos, um pê xis, sólid, azul-petróleo. E bórder rêidius, dois pontos, oito pê xis, ponto e vírgula, fecha chaves, para arredondar os cantos. E um detalhe: o título do cartão é um agá três, e a regra das fontes de título só fala de agá um e agá dois. Então a Ana acrescenta o agá três nessa regra: agá um, vírgula, agá dois, vírgula, agá três. Pronto. O título do cartão ganha a mesma fonte e a mesma cor dos outros títulos. Agora sim, cada projeto parece um cartão. Mas eles continuam empilhados.

**Tela:** no `estilo.css`:
```css
.cartao {
  background-color: #fdf6e3;
  padding: 16px;
  border: 1px solid #264653;
  border-radius: 8px;
}
```
a cada linha, a prévia muda: o fundo creme aparece dentro da seção branca; o texto se afasta da borda; a borda fina azul-petróleo aparece; os cantos arredondam. Cartão "aula 5: modelo de caixa" no canto. Depois, a regra `h1, h2 {` ganha `, h3` e vira `h1, h2, h3 {`; os títulos dos cartões trocam para a fonte serifada azul-petróleo. Rótulo: "cara de cartão, mas ainda empilhados".

---

## Bloco 04 — Os cartões em fila

**Fala:**
Agora, o fléx bócs. Quem é a mãe dos cartões? É a dív projetos. Então a regra vai nela. Ponto projetos, abre chaves, displêi, dois pontos, fléx, ponto e vírgula. Guép, dois pontos, dezesseis pê xis, ponto e vírgula, fecha chaves. Os três cartões sobem para a mesma linha, com dezesseis pê xis entre eles. Bonito, no computador. Mas olha a largura de cada um. Cada cartão ficou de um tamanho, conforme o texto que tem dentro. O que tem a frase mais longa ficou mais largo. Não ficou com cara de fileira organizada. E tem um problema maior. Vamos estreitar a tela, como se fosse um celular. Os cartões não descem. Eles ficam espremidos na mesma linha, cada vez mais finos, com o texto quebrando palavra por palavra. E, se não der mais para espremer, eles passam da borda da seção. Isso acontece porque, por padrão, a caixa flexível põe tudo numa linha só, e não quebra nunca.

**Tela:** no editor:
```css
.projetos {
  display: flex;
  gap: 16px;
}
```
na prévia, os três cartões sobem para a mesma linha, com réguas de `16px` entre eles. Setas mostram as larguras diferentes dos três cartões, rótulo "cada um do tamanho do texto". Depois, a borda da prévia é arrastada para a esquerda, até a largura de um celular: os cartões ficam finos, o texto quebra palavra por palavra (lupa) e, no fim, o terceiro cartão passa da borda da seção, destacado em vermelho; "x" laranja, rótulo "não quebra a linha".

---

## Bloco 05 — flex-wrap: deixar quebrar a linha

**Fala:**
Quem decide se a fila pode quebrar é a propriedade fléx ráp. Ela também vai na mãe. O padrão é nôu ráp, que quer dizer não quebrar: todo mundo numa linha só, custe o que custar. O valor que a Ana quer é ráp, que quer dizer quebrar. Na regra ponto projetos: fléx ráp, dois pontos, ráp, ponto e vírgula. Agora, quando os itens não cabem, os que sobram descem para a linha de baixo, como palavras num parágrafo. E repara numa coisa boa: o guép também vale entre as linhas. Os cartões de cima e os de baixo ficam com dezesseis pê xis entre eles. Só que, olhando a prévia, ainda não está do jeito que a Ana quer. Como cada cartão quer a largura da frase inteira, quase nenhum cabe ao lado do outro, e eles acabam um embaixo do outro, com larguras diferentes. O fléx ráp liberou a quebra. Agora falta dizer o tamanho dos cartões.

**Tela:** no editor, a regra ganha uma linha:
```css
.projetos {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
```
um cartão lateral mostra os dois valores: "`nowrap` → padrão: uma linha só" e "`wrap` → quebra para a linha de baixo". Animação: palavras de um parágrafo descendo para a linha de baixo quando a linha enche, rótulo "como texto". Na prévia, os cartões quebram; uma régua de `16px` aparece entre as linhas, rótulo "o `gap` vale entre as linhas também". Por fim, os cartões com larguras diferentes, cada um numa linha; ponto de interrogação, rótulo "falta o tamanho".

---

## Bloco 06 — flex: 1, partes iguais

**Fala:**
Para os cartões dividirem a linha em partes iguais, existe o fléx um. Ele vai nas filhas, em cada cartão. Na regra ponto cartão: fléx, dois pontos, um, ponto e vírgula. O fléx um quer dizer: cada cartão pega uma parte igual do espaço da linha. Três cartões, três partes iguais. Na prévia, os três voltam para a mesma linha, todos da mesma largura. Agora sim tem cara de fileira organizada. Se a Ana colocar um quarto cartão, os quatro dividem a linha em quatro partes. Só que, se você estreitar a tela de novo, aparece o problema antigo. Os cartões encolhem juntos, cada vez mais finos, e só descem quando já estão espremidos, com quase uma palavra por linha. Isso porque o fléx um diz como dividir o espaço, mas não diz qual é o tamanho mínimo que um cartão aguenta. Falta uma última peça.

**Tela:** no editor:
```css
.cartao {
  flex: 1;
  background-color: #fdf6e3;
  padding: 16px;
  border: 1px solid #264653;
  border-radius: 8px;
}
```
na prévia, os três cartões voltam para a mesma linha, com a mesma largura; três chaves iguais embaixo deles, rótulo "`flex: 1` → partes iguais". Por um instante, um quarto cartão aparece e os quatro se ajustam em quatro partes iguais; depois, ele some. A borda da prévia é arrastada de novo: os três encolhem juntos até ficarem estreitinhos, com uma palavra por linha (lupa); rótulo "encolhem demais antes de descer".

---

## Bloco 07 — min-width: quando a quebra acontece

**Fala:**
A última peça é o mín uídth, a largura mínima. Ainda na regra ponto cartão: mín uídth, dois pontos, duzentos pê xis, ponto e vírgula. Agora, o cartão pode crescer, por causa do fléx um, mas nunca fica mais estreito que duzentos pê xis. E é aí que a quebra acontece. No computador, a seção tem uns seiscentos e oitenta pê xis por dentro. Três cartões de duzentos, mais os dois guéps, cabem. Então os três ficam na mesma linha, cada um com um terço. Numa tela menor, os três não cabem mais com duzentos pê xis cada. Em vez de espremer, o terceiro desce para a linha de baixo. E, como ele está sozinho na linha e tem fléx um, ele cresce e ocupa a linha toda. No celular, nem dois cabem, e cada cartão fica numa linha. Três linhas de cê ésse ésse, e os cartões se ajeitam sozinhos em qualquer tela.

**Tela:** no editor, a regra `.cartao` ganha `min-width: 200px;` logo abaixo de `flex: 1;`. Uma régua de `200px` aparece embaixo de um cartão, rótulo "nunca menos que isso". Depois, três telas lado a lado, todas com a mesma regra:
- computador: os três cartões numa linha; a conta aparece em cima: "200 + 16 + 200 + 16 + 200 = 632 ≤ 684"; check verde.
- tela média: dois cartões em cima e o terceiro embaixo, ocupando a linha toda; seta mostrando o terceiro crescendo, rótulo "sozinho na linha, `flex: 1` estica".
- celular: cada cartão numa linha.
Por fim, o modo de tela de celular das ferramentas de desenvolvedor do navegador (genérico), com a largura mudando ao vivo e os cartões se reorganizando. Rótulo: "`flex-wrap` + `flex: 1` + `min-width`".

---

## Bloco 08 — Mesma altura, e o link no pé do cartão

**Fala:**
Repara numa coisa nos cartões lado a lado: eles ficaram todos da mesma altura, mesmo com textos de tamanhos diferentes. Isso é o aláin áitems, lá da aula passada. O padrão dele é strétch, que estica os itens para a altura da linha. Então, cartões de alturas iguais vêm de graça. O link de cada cartão fica logo abaixo do texto, e, como os textos têm tamanhos diferentes, os links ficam desalinhados. Para mandar o link para o pé do cartão, a Ana transforma o próprio cartão numa caixa flexível, em coluna. Na regra ponto cartão: displêi fléx e fléx dairécxon cólam. Por dentro, o agá três, o pê e o link viram itens, um embaixo do outro. E aí vem o truque: ponto cartão, espaço, é, abre chaves, márdjin tóp, dois pontos, óto, ponto e vírgula, fecha chaves. O márdjin óto empurra o link para baixo, até o fim do cartão. E os três links ficam alinhados.

**Tela:** os três cartões lado a lado, com uma linha tracejada mostrando o topo e o fundo iguais; etiqueta "`align-items: stretch` (padrão)". Os três links ficam em alturas diferentes, com uma linha vermelha passando por eles; rótulo "desalinhados". No editor:
```css
.cartao {
  display: flex;
  flex-direction: column;
}

.cartao a {
  margin-top: auto;
}
```
(as duas primeiras linhas entram na regra `.cartao` que já existe). Na prévia, cada cartão ganha um contorno tracejado com a etiqueta "também é mãe (coluna)"; depois, um espaço destacado aparece em cima de cada link, empurrando-o para baixo, rótulo "`margin-top: auto`: empurra para o pé". Os três links se alinham numa linha tracejada verde; check verde.

---

## Bloco 09 — O rodapé em fila, e o estilo completo

**Fala:**
Para fechar, um uso rápido no rodapé. A Ana colocou um segundo parágrafo no fúter, com o e-mail dela. Ela quer o "feito pela Ana" de um lado e o e-mail do outro. Você já sabe como: fúter, abre chaves, displêi fléx, djâstifai cóntent spêis bituín, fléx ráp ráp e guép de oito pê xis, fecha chaves. E um péding de zero e dezesseis pê xis, para o texto não encostar nas laterais. No computador, um de cada lado. No celular, se não couber, o e-mail desce para a linha de baixo, sem quebrar nada. Repara que é a mesma receita dos cartões: a mãe com displêi fléx, guép e fléx ráp. Esse trio vai aparecer o tempo todo nos seus projetos. Salva o estilo ponto cê ésse ésse e olha a página inteira. O topo, o menu, os cartões e o rodapé. Tudo arrumado, e tudo se ajeitando ao tamanho da tela.

**Tela:** no `index.html`, o `footer` ganha um parágrafo: `<p>ana@example.com</p>`. No `estilo.css`:
```css
footer {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0 16px;
}
```
na prévia, os dois parágrafos do rodapé vão um para cada ponta; numa tela estreita, o e-mail desce. Depois, as regras novas da aula no `estilo.css` (as regras das aulas 3 a 8 continuam no arquivo, com `h1, h2, h3` no lugar de `h1, h2`):
```css
.projetos {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.cartao {
  flex: 1;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  background-color: #fdf6e3;
  padding: 16px;
  border: 1px solid #264653;
  border-radius: 8px;
}

.cartao a {
  margin-top: auto;
}
```
e a página completa da Ana rolando de cima a baixo, no computador e no celular. Rótulo: "o trio: `display: flex` + `gap` + `flex-wrap`".

---

## Bloco 10 — Os erros comuns

**Fala:**
Agora, os erros mais comuns. O primeiro: colocar o fléx ráp no cartão, e não na mãe. Quem quebra a linha é a fila, então o fléx ráp vai no ponto projetos, junto com o displêi fléx. O fléx um e o mín uídth, esses sim, vão no cartão. O segundo: usar o fléx um sem o mín uídth. Os cartões ficam com partes iguais, mas encolhem demais antes de descer, e no celular viram tirinhas. O terceiro: usar uma medida fixa grande, como mín uídth de quatrocentos pê xis. No celular, a tela tem menos que isso, e o cartão passa da borda. Escolha um mínimo que caiba num celular. O quarto: esquecer o guép. Os cartões ficam grudados, um encostado no outro, e também nas linhas de cima e de baixo. E o quinto: nos exercícios, escreva o valor exatamente como no enunciado. Para o corretor, fléx um é uma escrita, e outras formas, mesmo que funcionem, são escritas diferentes.

**Tela:** cinco cartões de erro, cada um com a correção embaixo:
1. `.cartao { flex-wrap: wrap; }` com os cartões ainda espremidos numa linha; "x" vermelho, rótulo "no cartão, não"; embaixo, `.projetos { display: flex; flex-wrap: wrap; }`, check verde.
2. `.cartao { flex: 1; }` sem `min-width`, numa tela estreita: três tirinhas com uma palavra por linha; "x" vermelho; embaixo, `.cartao { flex: 1; min-width: 200px; }`, check verde.
3. `.cartao { min-width: 400px; }` num celular: o cartão passa da borda da tela, destacado em vermelho; rótulo "maior que a tela"; embaixo, `min-width: 200px;`, check verde.
4. cartões grudados, sem espaço entre eles nem entre as linhas; "x" vermelho; embaixo, `gap: 16px;` na mãe, check verde.
5. `flex: 1` e `flex: 1 1 0` com o sinal de diferente; `wrap` e `nowrap` com o sinal de diferente; rótulo "para o corretor, são escritas diferentes".
No fim, um lembrete: "nos exercícios, escreva o valor exatamente como no enunciado: `wrap`, `1`, `200px`".

---

## Bloco 11 — Resumo e próximo degrau

**Fala:**
Vamos recapitular. Os cartões da Ana são ártikols com a cléss cartão, dentro de uma dív com a cléss projetos, que é a caixa flexível. Na mãe, displêi fléx, guép de dezesseis pê xis e fléx ráp ráp, para deixar quebrar a linha. O padrão é nôu ráp, que espreme tudo numa linha só. Nas filhas, fléx um, para dividir a linha em partes iguais, e mín uídth de duzentos pê xis, para dizer o tamanho mínimo e fazer a quebra acontecer. Os cartões ficam da mesma altura por causa do strétch, e o márdjin tóp óto, num cartão em cólam, manda o link para o pé. Agora é a sua vez: os exercícios estão logo abaixo do vídeo. Na próxima aula, o responsivo: como fazer a página funcionar bem no celular e no computador, mudando regras conforme o tamanho da tela. Até lá, e bora destravar.

**Tela:** lista do resumo aparecendo item por item com checks verdes ("`div.projetos` = mãe · `article.cartao` = filhas", "`.projetos { display: flex; gap: 16px; flex-wrap: wrap; }`", "`nowrap` = padrão: uma linha só", "`.cartao { flex: 1; min-width: 200px; }`", "`align-items: stretch` → mesma altura", "`.cartao a { margin-top: auto; }` num cartão em `column`"); botão "Fazer os exercícios" pulsando. Prévia da próxima aula: a página da Ana num celular e num computador, lado a lado, com a etiqueta `@media`; o texto "Aula 10 — Responsivo: o básico". Encerramento com o logo da Destrava e o slogan "Destrava sua carreira. Um nível de cada vez."
