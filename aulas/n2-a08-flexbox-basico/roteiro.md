# Aula 8 — Flexbox: o básico

**Nível:** Primeira Demão · **Duração estimada:** ~12 minutos · **Blocos:** 12

## Como este roteiro é usado

- A voz do vídeo é **gerada por IA** a partir do texto em "Fala". Por isso a "Fala" precisa soar natural quando lida em voz alta: frases curtas, sem siglas soltas, com os símbolos de código ditos por extenso.
- O que está em "Tela" é o que o pipeline de vídeo anima (editor da Destrava, prévia do navegador, rótulos, setas, checks). Não é lido pela voz.
- Um áudio por bloco: `bloco01`, `bloco02`... Para corrigir uma fala, gere de novo só aquele bloco.
- Todo o conteúdo de exemplo é fictício (a aluna "Ana"). Nada de marcas, empresas ou sites reais: os endereços usam o domínio reservado `example.com`. Ferramentas citadas de forma genérica ("as ferramentas de desenvolvedor do navegador", "inspecionar"), sem nomes de produtos.
- A página da Ana é a mesma da aula 9 do nível 1 (com o `header` que tem o `h1` e o menu `nav`, com uma lista `ul` de dois links, e a foto `imagens/foto-ana.jpg` dentro da seção "Sobre mim"), já ligada ao `estilo.css`, com tudo o que foi feito até a aula 7: `*` com `box-sizing: border-box;`; `body` com fundo `#fdf6e3` (creme), `font-family: Verdana, Arial, sans-serif;`, `font-size: 1.125rem;` e `line-height: 1.6;`; `p` com `color: #333333`; `h1, h2` com `color: #264653` (azul-petróleo), `font-family: Georgia, "Times New Roman", serif;` e `line-height: 1.2;`; `h1` com `text-align: center;` e `font-size: 2rem;`; `h2` com `font-size: 1.5rem;`; `.destaque` com `font-weight: bold;`, `padding: 8px 16px;` e `border-left: 4px solid #b5452c;`; `.destaque, nav a` com `color: #b5452c` (terracota); `nav a` sem sublinhado, em negrito, com `display: inline-block;` e `padding: 8px 12px;`; `nav li` com `display: inline;`; `section` com `background-color: #ffffff;`, `padding: 16px;`, `border: 2px solid #264653;`, `border-radius: 8px;` e `margin-bottom: 24px;`; `main` com `max-width: 720px;` e `margin: 0 auto;`; `img` com `border-radius: 50%;`, `max-width: 100%;`, `height: auto;` e `display: block;`; `footer` com fundo `#264653` e `footer p` com `color: #ffffff`. Nesta aula não entra nenhuma cor nova.
- Na "Fala", os termos de CSS e as tags são escritos do jeito que se fala, com as mesmas grafias das aulas anteriores: `CSS` = "cê ésse ésse", `px` = "pê xis", `h1` = "agá um", `p` = "pê", `nav` = "név", `a` = "é", `ul` = "u éle", `li` = "éle í", `header` = "rédêr", `main` = "mêin", `div` = "dív", `padding` = "péding", `margin` = "márdjin", `height` = "rêit", `text-align` = "técst alái", `center` = "cênter", `none` = "nân", `display` = "displêi", `inline` = "inláin", `inline-block` = "inláin blóc". Novas nesta aula: `flex` = "fléx", `flexbox` = "fléx bócs", `flex-direction` = "fléx dairécxon", `row` = "rôu", `column` = "cólam", `justify-content` = "djâstifai cóntent", `align-items` = "aláin áitems", `flex-start` = "fléx stárt", `flex-end` = "fléx énd", `space-between` = "spêis bituín", `space-around` = "spêis arráund", `space-evenly` = "spêis ívenli", `stretch` = "strétch", `gap` = "guép", `list-style` = "líst stáil". Os números com unidade são ditos por extenso: `16px` = "dezesseis pê xis", `300px` = "trezentos pê xis"; o `0` é dito "zero". Os símbolos são ditos por extenso: `{` = "abre chaves", `}` = "fecha chaves", `:` = "dois pontos", `;` = "ponto e vírgula". Seguem com o nome normal: HTML, body, img, estilo ponto cê ésse ésse. Os termos "flex container", "flex item", "main axis" e "cross axis", quando aparecem como rótulo, ficam só na "Tela"; na "Fala", eles são ditos "caixa flexível" (ou "a mãe"), "itens" (ou "as filhas"), "eixo principal" e "eixo cruzado".

---

## Bloco 01 — Abertura

**Fala:**
Olá, seja bem-vindo à aula oito da Primeira Demão. Na aula passada, a Ana colocou os links do menu lado a lado, com displêi inláin nos éle í, e aumentou a área de clique com inláin blóc e péding. Funcionou. Mas foi um pouco no improviso. O espaço entre os links depende dos espaços do próprio HTML, e alinhar as coisas desse jeito dá trabalho. E tem mais: a Ana quer o nome dela à esquerda, no topo da página, e o menu à direita, na mesma linha. Com o que você sabe até aqui, isso é bem difícil. Hoje, você vai conhecer a ferramenta feita exatamente para isso: o fléx bócs. Com ele, você coloca itens lado a lado, escolhe o espaço entre eles e alinha tudo, na horizontal e na vertical, com poucas linhas. No fim da aula, o topo da página da Ana vai ficar com cara de site de verdade. Abre o editor e bora destravar.

**Tela:** logo da Destrava → título "Aula 8 — Flexbox: o básico". Um cartão de revisão mostra `nav li { display: inline; }` e `nav a { display: inline-block; padding: 8px 12px; }` com o rótulo "aula 7: menu em linha". Na prévia, o espaço entre os dois links ganha uma lupa e a etiqueta "depende dos espaços do HTML". Depois, um rascunho do topo desejado: "Olá, eu sou a Ana" à esquerda e o menu à direita, na mesma linha, com o rótulo "o objetivo de hoje". O título `display: flex` aparece em destaque.

---

## Bloco 02 — O problema: lado a lado

**Fala:**
Lembra dos elementos de bloco? Eles ocupam a linha toda e se empilham, um embaixo do outro. Isso é ótimo para um texto, mas péssimo quando você quer coisas lado a lado. Um menu, uma fila de botões, uma foto ao lado de um texto. Até aqui, a saída era mudar o displêi das filhas para inláin ou inláin blóc. Só que aí elas viram pedaços de texto. Ganham espacinhos que você não pediu, e alinhar elas na vertical vira uma briga. O fléx bócs resolve isso de outro jeito. Em vez de mexer em cada filha, você muda uma coisa só: a caixa mãe. Você diz para a mãe: organiza as suas filhas numa fila. E ela organiza. É uma regra na mãe, e as filhas obedecem. Esse é o segredo do fléx bócs. Guarda essa frase, porque ela vai aparecer de novo nos erros comuns.

**Tela:** três caixas coloridas (`div`) empilhadas, cada uma de ponta a ponta; rótulo "bloco: empilha". Ao lado, exemplos de coisas lado a lado: um menu, uma fila de três botões, uma foto com um texto ao lado. Depois, as mesmas três caixas com `display: inline-block;`: ficam na linha, mas com um espacinho entre elas (destacado com lupa) e desalinhadas na vertical; "x" laranja, rótulo "improviso". Por fim, uma caixa mãe tracejada em volta das três; a mãe ganha a etiqueta `display: flex;` e as filhas se alinham numa fila, sem espacinho; check verde. Rótulo: "uma regra na mãe, as filhas obedecem".

---

## Bloco 03 — Caixa flexível e itens

**Fala:**
Vamos dar nome às peças. Quando você escreve displêi, dois pontos, fléx, numa caixa, ela vira uma caixa flexível. E as filhas diretas dela viram itens. Só as filhas diretas. As netas continuam como estavam. Vamos testar. Imagina uma dív com três dívs dentro, cada uma com uma cor. Sem nada, elas se empilham. Agora, na dív mãe: displêi, dois pontos, fléx, ponto e vírgula. Pronto. As três sobem para a mesma linha, uma ao lado da outra, encostadinhas. Repara numa coisa: cada item ficou só da largura do conteúdo. Ele não ocupa mais a linha toda. E repara em outra: os itens ficaram todos da mesma altura. Se um tem mais texto e fica mais alto, os outros esticam junto. Esse esticar tem um motivo, e você vai entender daqui a pouco. Por enquanto, guarda isso: displêi fléx vai na mãe, e quem se organiza são as filhas.

**Tela:** no editor:
```html
<div class="caixa">
  <div>Um</div>
  <div>Dois</div>
  <div>Três, com mais texto</div>
</div>
```
na prévia, as três `div` empilhadas. Depois, no CSS:
```css
.caixa {
  display: flex;
}
```
as três sobem para a mesma linha. Rótulos: a mãe com contorno tracejado azul, etiqueta "flex container (caixa flexível)"; cada filha com contorno laranja, etiqueta "flex item (item)". Um `span` dentro da terceira `div` ganha a etiqueta "neta: não é item". Setas mostram a largura de cada item justa no conteúdo; depois, a altura igual dos três, com o rótulo "esticam juntos (já já você entende)".

---

## Bloco 04 — Eixo principal e eixo cruzado

**Fala:**
Para usar o fléx bócs sem se perder, você precisa de uma ideia só: os dois eixos. O eixo principal é a direção da fila, o caminho que os itens seguem. Por padrão, ele é na horizontal, da esquerda para a direita. O eixo cruzado é o outro, que corta o principal. Por padrão, ele é na vertical, de cima para baixo. Pensa numa fila de pessoas num ponto de ônibus. A fila anda para a frente: esse é o eixo principal. E cada pessoa tem uma altura: isso é o eixo cruzado. Por que isso importa? Porque o fléx bócs tem uma propriedade para cada eixo. Uma alinha os itens ao longo da fila, e a outra alinha os itens no sentido que corta a fila. Se você souber em qual eixo quer mexer, você sempre sabe qual propriedade usar. Parece muita teoria, mas é só isso: uma seta para a fila, outra seta cortando a fila. Daqui a pouco, você vai ver essas duas setas na prática.

**Tela:** a caixa flexível com os três itens. Uma seta grossa azul atravessa os itens da esquerda para a direita, etiqueta "main axis (eixo principal)". Uma seta grossa laranja de cima para baixo, cortando a azul, etiqueta "cross axis (eixo cruzado)". Animação: uma fila de bonequinhos num ponto de ônibus; a fila anda para a direita (seta azul) e cada bonequinho tem alturas diferentes (seta laranja). Por fim, dois cartões: "eixo principal → `justify-content`" e "eixo cruzado → `align-items`", com a nota "já já".

---

## Bloco 05 — flex-direction: linha ou coluna

**Fala:**
Quem escolhe a direção do eixo principal é a propriedade fléx dairécxon. Ela tem dois valores principais. O primeiro é rôu, que quer dizer linha. É o padrão: os itens ficam lado a lado, da esquerda para a direita. Você nem precisa escrever. O segundo é cólam, que quer dizer coluna. Fléx dairécxon, dois pontos, cólam, ponto e vírgula. Os itens voltam a ficar um embaixo do outro. Mas atenção: continua sendo uma caixa flexível. E agora vem o pulo do gato. Quando a direção muda, os eixos giram junto. Com cólam, o eixo principal passa a ser o vertical, de cima para baixo. E o eixo cruzado passa a ser o horizontal. As propriedades continuam as mesmas, mas passam a mexer em outra direção. Isso confunde muita gente no começo. Então, antes de alinhar, sempre pergunte: para onde está indo a minha fila? Para a direita, ou para baixo? A resposta diz qual é o eixo principal. No menu da Ana, a fila vai para a direita, então vamos ficar com o rôu.

**Tela:** a caixa flexível com três itens. No editor, `flex-direction: row;` com a etiqueta "padrão"; os itens lado a lado, seta azul na horizontal. Depois, troca para:
```css
.caixa {
  display: flex;
  flex-direction: column;
}
```
os itens deslizam para uma coluna. As setas giram juntas: a azul ("main axis") fica vertical, a laranja ("cross axis") fica horizontal; rótulo "a direção mudou, os eixos giraram". Por fim, a pergunta em destaque: "para onde vai a fila?".

---

## Bloco 06 — justify-content: ao longo da fila

**Fala:**
Agora, a primeira propriedade de alinhamento: djâstifai cóntent. Ela trabalha no eixo principal, ao longo da fila. E ela decide o que fazer com o espaço que sobra. O padrão é fléx stárt: os itens ficam juntos, no começo da fila, e o espaço que sobra fica todo no fim. Com fléx énd, é o contrário: os itens vão para o fim. Com cênter, eles ficam juntos, no meio. E aqui vem o meu favorito: spêis bituín, que quer dizer espaço entre. O primeiro item vai para o começo, o último vai para o fim, e o espaço que sobra é dividido entre eles. Tem mais dois, para você conhecer. O spêis arráund dá um espaço em volta de cada item, então as pontas ficam com meio espaço. E o spêis ívenli deixa todos os espaços iguais, inclusive nas pontas. Na dúvida, comece pelo cênter ou pelo spêis bituín. São os que você mais vai usar.

**Tela:** uma caixa flexível larga com três itens pequenos e a seta azul do eixo principal. No editor, a linha `justify-content:` troca de valor, e a prévia anima cada um:
- `flex-start` → itens no começo; o espaço que sobra destacado no fim; etiqueta "padrão".
- `flex-end` → itens no fim.
- `center` → itens juntos, no meio.
- `space-between` → primeiro na ponta esquerda, último na ponta direita, espaços iguais entre eles; estrela, etiqueta "favorito".
- `space-around` → meio espaço nas pontas, espaço inteiro entre os itens (réguas mostrando as medidas).
- `space-evenly` → todos os espaços iguais, inclusive nas pontas.
Rótulo final: "`justify-content` = eixo principal". Os dois primeiros da lista para decorar: `center` e `space-between`.

---

## Bloco 07 — align-items: no eixo cruzado

**Fala:**
A segunda propriedade é aláin áitems. Ela trabalha no eixo cruzado, que, na fila normal, é a vertical. Lembra que os itens ficaram todos da mesma altura? É por causa do padrão do aláin áitems, que é strétch, que quer dizer esticar. Os itens esticam para ocupar a altura toda da caixa flexível. Agora, mudando o valor. Com fléx stárt, cada item fica só da própria altura, encostado em cima. Com fléx énd, encostado embaixo. E com cênter, cada item fica no meio, na vertical. Esse cênter é o que mais aparece por aí: ele alinha um texto pequeno com um texto grande, ou um ícone com uma palavra, pelo meio. Resumindo, numa frase. Djâstifai cóntent mexe ao longo da fila. Aláin áitems mexe no sentido que corta a fila. E se a direção for cólam, os dois trocam de lado, porque os eixos giraram.

**Tela:** uma caixa flexível alta (com uma etiqueta "altura: 200px") e três itens com textos de tamanhos diferentes, com a seta laranja do eixo cruzado. No editor, a linha `align-items:` troca de valor:
- `stretch` → os três ocupam a altura toda; etiqueta "padrão: estica".
- `flex-start` → cada um da própria altura, encostado em cima.
- `flex-end` → encostados embaixo.
- `center` → cada um no meio, na vertical; uma linha tracejada passa pelo meio de todos; check verde.
Depois, dois cartões lado a lado: "`justify-content` → ao longo da fila" (seta azul) e "`align-items` → corta a fila" (seta laranja). Por fim, a direção vira `column` e os dois cartões trocam as setas, rótulo "com `column`, trocam de lado".

---

## Bloco 08 — gap: o espaço entre os itens

**Fala:**
E o espaço entre os itens? Antes do fléx bócs, a saída era colocar márdjin em cada um. Só que aí sobra márdjin no último item, ou no primeiro, e você precisa de uma regra extra só para tirar. O fléx bócs tem uma propriedade bem mais simples: guép, que quer dizer vão. Você escreve na caixa mãe. Guép, dois pontos, dezesseis pê xis, ponto e vírgula. Pronto: dezesseis pê xis entre um item e outro. Só entre eles. Nada antes do primeiro, nada depois do último. E se você mudar de ideia, troca o número num lugar só. É mais limpo, mais fácil de ler e não tem sobra. Então, a regra prática: para espaço entre itens de uma caixa flexível, use guép. O márdjin continua útil, mas para afastar uma caixa das outras coisas em volta, não para espaçar os itens da fila.

**Tela:** três itens numa caixa flexível. Primeiro, cada item com `margin-right: 16px;`: aparece um espaço sobrando depois do último, destacado em vermelho; "x" laranja, rótulo "sobra no último". Depois, o `margin-right` sai e a mãe ganha:
```css
.caixa {
  display: flex;
  gap: 16px;
}
```
réguas de `16px` aparecem só entre os itens, nada nas pontas; check verde, rótulo "`gap`: só entre os itens". O número muda de `16px` para `32px` e os espaços crescem juntos; rótulo "um lugar só".

---

## Bloco 09 — O menu da Ana com flexbox

**Fala:**
Agora, o menu da Ana. Quem é a mãe dos itens do menu? É a lista u éle. Os éle í são as filhas. Então a regra vai na lista. Név, espaço, u éle, abre chaves, displêi, dois pontos, fléx, ponto e vírgula. Guép, dois pontos, dezesseis pê xis, ponto e vírgula. Líst stáil, dois pontos, nân, ponto e vírgula. E péding, dois pontos, zero, ponto e vírgula, fecha chaves. O displêi fléx põe os itens em fila. O guép dá dezesseis pê xis entre os links. O líst stáil é a propriedade das bolinhas da lista, e o nân tira as bolinhas. E o péding zero tira o recuo à esquerda que toda lista já traz. Agora, a regra antiga, név éle í com displêi inláin, pode sair do arquivo. O fléx bócs já cuida disso. E a regra do név é, com inláin blóc e péding, pode ficar. A área de clique continua grande.

**Tela:** a árvore do menu: `nav` → `ul` → dois `li` → `a`. O `ul` ganha a etiqueta "mãe (flex container)" e os `li` a etiqueta "filhas (flex items)". No editor:
```css
nav ul {
  display: flex;
  gap: 16px;
  list-style: none;
  padding: 0;
}
```
na prévia, a cada linha: os itens ficam em fila; o espaço de `16px` aparece entre os links com uma régua; as bolinhas somem (etiqueta "`list-style: none`: sem bolinhas"); o recuo à esquerda some (etiqueta "`padding: 0`: sem recuo"). Depois, a regra `nav li { display: inline; }` fica cinza e é apagada, rótulo "não precisa mais". A regra `nav a { display: inline-block; padding: 8px 12px; }` ganha um check, rótulo "continua: área de clique".

---

## Bloco 10 — O topo da Ana: nome à esquerda, menu à direita

**Fala:**
E o topo da página, com o nome de um lado e o menu do outro? O rédêr da Ana tem duas filhas: o agá um e o név. Então, o rédêr vai ser a caixa flexível. Rédêr, abre chaves, displêi, dois pontos, fléx, ponto e vírgula. Djâstifai cóntent, dois pontos, spêis bituín, ponto e vírgula. Aláin áitems, dois pontos, cênter, ponto e vírgula, fecha chaves. Com o displêi fléx, o agá um e o név ficam na mesma linha. Com o spêis bituín, o agá um vai para a ponta esquerda e o név para a ponta direita, e o espaço que sobra fica no meio. E com o aláin áitems cênter, os dois ficam alinhados pelo meio, na vertical. Sem ele, o menu, que é mais baixo, ficaria esticado ou desalinhado do título. Salva o estilo ponto cê ésse ésse e olha a prévia. É o topo de um site de verdade, e com três linhas.

**Tela:** a árvore do topo: `header` → `h1` e `nav`, com as etiquetas "mãe" e "filhas". No editor:
```css
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```
a cada linha, a prévia muda: o `h1` e o `nav` sobem para a mesma linha; o `h1` vai para a esquerda e o `nav` para a direita, com o espaço do meio destacado ("`space-between`"); uma linha tracejada horizontal passa pelo meio do título e do menu ("`align-items: center`"). Depois, o `estilo.css` da Ana com as regras novas da aula (as regras das aulas 3 a 7 continuam no arquivo, menos a `nav li`, que saiu):
```css
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav ul {
  display: flex;
  gap: 16px;
  list-style: none;
  padding: 0;
}
```
e a prévia completa: o nome da Ana à esquerda, o menu à direita, na mesma linha. Por fim, as ferramentas de desenvolvedor do navegador abertas (genéricas): clique com o botão direito no `header` → "Inspecionar"; ao lado do `header`, aparece uma etiqueta pequena "flex"; ao clicar nela, a prévia mostra os contornos dos itens e o espaço entre eles destacado. Rótulo: "a etiqueta `flex` mostra a caixa flexível".

---

## Bloco 11 — Centralizar de verdade, e os erros comuns

**Fala:**
Agora, um truque clássico. Centralizar uma coisa no meio de uma caixa, na horizontal e na vertical ao mesmo tempo, já foi um pesadelo. Com o fléx bócs, são três linhas na mãe: displêi fléx, djâstifai cóntent cênter e aláin áitems cênter. Só precisa de uma condição: a mãe precisa de uma altura maior que a do conteúdo, como rêit de trezentos pê xis. Senão, não sobra espaço para centralizar. Agora, os erros mais comuns. O primeiro: colocar o displêi fléx nas filhas, e não na mãe. No menu da Ana, ele vai no u éle, não no éle í. O segundo: trocar djâstifai cóntent por aláin áitems. O djâstifai mexe ao longo da fila, e o aláin no sentido que corta. O terceiro: mudar para cólam e esquecer que os eixos giraram. O quarto: usar márdjin para espaçar os itens, em vez de guép. E o quinto: nos exercícios, escreva o valor exatamente como no enunciado. Para o corretor, spêis bituín é diferente de spêis arráund.

**Tela:** uma caixa com `height: 300px` e uma palavra "Oi!" no canto de cima à esquerda. No editor:
```css
.caixa {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}
```
a palavra vai para o meio na horizontal, depois para o meio na vertical; um alvo aparece atrás dela; check verde, rótulo "o clássico: centro de verdade". Depois, cinco cartões de erro, cada um com a correção embaixo:
1. `nav li { display: flex; }` com o menu ainda empilhado; "x" vermelho, rótulo "na filha, não"; embaixo, `nav ul { display: flex; }`, check verde.
2. `align-items: space-between;` com nada mudando; "x" vermelho; embaixo, `justify-content: space-between;`, check verde.
3. `flex-direction: column;` com `justify-content: center;` centralizando na vertical, e uma pessoa confusa; rótulo "a fila agora vai para baixo".
4. itens com `margin-right: 16px;` e sobra no último; "x" vermelho; embaixo, `gap: 16px;` na mãe, check verde.
5. `space-between` e `space-around` com o sinal de diferente; `flex-start` e `start` com o sinal de diferente; rótulo "para o corretor, são escritas diferentes".
No fim, um lembrete: "nos exercícios, escreva o valor exatamente como no enunciado: `space-between`, `center`, `16px`".

---

## Bloco 12 — Resumo e próximo degrau

**Fala:**
Vamos recapitular. Displêi fléx vai na caixa mãe, e as filhas diretas viram itens, lado a lado. O eixo principal é a direção da fila, e o eixo cruzado corta a fila. Fléx dairécxon escolhe a direção: rôu, o padrão, em linha, ou cólam, em coluna, e os eixos giram junto. Djâstifai cóntent alinha ao longo da fila: fléx stárt, cênter, fléx énd, spêis bituín e os outros espaços. Aláin áitems alinha no eixo cruzado, e o padrão é strétch, que estica. Guép dá espaço só entre os itens. No menu da Ana, név u éle com displêi fléx, guép de dezesseis pê xis e líst stáil nân. No topo, rédêr com displêi fléx, spêis bituín e aláin áitems cênter. Agora é a sua vez: os exercícios estão logo abaixo do vídeo. Na próxima aula, o fléx bócs na prática: cartões lado a lado que quebram a linha sozinhos quando a tela fica estreita. Até lá, e bora destravar.

**Tela:** lista do resumo aparecendo item por item com checks verdes ("`display: flex` na mãe · filhas viram itens", "eixo principal = a fila · eixo cruzado = corta a fila", "`flex-direction: row | column`", "`justify-content: flex-start | center | flex-end | space-between`", "`align-items: stretch | flex-start | center | flex-end`", "`gap: 16px` só entre os itens", "`nav ul { display: flex; gap: 16px; list-style: none; }`", "`header { display: flex; justify-content: space-between; align-items: center; }`"); botão "Fazer os exercícios" pulsando. Prévia da próxima aula: três cartões de projetos da Ana lado a lado que, quando a tela encolhe, quebram para a linha de baixo, com as etiquetas `flex-wrap` e `flex: 1`; o texto "Aula 9 — Flexbox na prática". Encerramento com o logo da Destrava e o slogan "Destrava sua carreira. Um nível de cada vez."
