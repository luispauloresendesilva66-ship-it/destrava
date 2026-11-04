# Aula 12 — Projeto final: dê acabamento ao seu site

**Nível:** Primeira Demão · **Duração estimada:** ~13 minutos · **Blocos:** 14

## Como este roteiro é usado

- A voz do vídeo é **gerada por IA** a partir do texto em "Fala". Por isso a "Fala" precisa soar natural quando lida em voz alta: frases curtas, sem siglas soltas, com os símbolos de código ditos por extenso.
- O que está em "Tela" é o que o pipeline de vídeo anima (editor da Destrava, prévia do navegador, rótulos, setas, checks). Não é lido pela voz.
- Um áudio por bloco: `bloco01`, `bloco02`... Para corrigir uma fala, gere de novo só aquele bloco.
- Todo o conteúdo de exemplo é fictício (a aluna "Ana"). Nada de marcas, empresas ou sites reais: os endereços usam o domínio reservado `example.com`. Ferramentas citadas de forma genérica ("um verificador de contraste", "o modo de tela de celular das ferramentas de desenvolvedor do navegador", "o validador de CSS"), sem nomes de produtos nem de aparelhos. Os celulares e computadores da "Tela" são desenhos genéricos, sem marca. A foto da Ana é o mesmo avatar ilustrado de sempre (`imagens/foto-ana.jpg`).
- Esta é a aula do projeto final. Não tem propriedade nova, a não ser uma pequena: `border-collapse: collapse;`, para a tabela (bloco 9). O aluno **não** estiliza a página da Ana: ele abre a **própria** página pessoal, a pasta `meu-site` da aula 9 do nível 1, e cria nela um `estilo.css` do zero. A página da Ana é o exemplo, montada região por região, na ordem em que o aluno deve fazer a dele.
- A página da Ana é a da aula 9 do nível 1 (com a tabela `#rotina` e o formulário `#contato`), já com o que entrou no HTML durante este nível: a `meta viewport` no `head`, a `link` para o `estilo.css` e a seção `#projetos` com os três cartões `article.cartao` dentro da `div.projetos` (aula 9). O `estilo.css` mostrado aqui é o mesmo de onde a aula 11 parou, organizado por região, com um acréscimo novo: as regras da tabela, do formulário e do botão (blocos 9 e 10). Paleta da Ana: creme `#fdf6e3` (fundo), azul-petróleo `#264653` (principal), terracota `#b5452c` (destaque), e os neutros `#ffffff` e `#333333`. Contrastes da aula 3 e da aula 5: `#333333` sobre `#fdf6e3` = 11,7:1; `#264653` sobre `#fdf6e3` = 9,3:1; `#b5452c` sobre `#fdf6e3` = 5,1:1; `#ffffff` sobre `#264653` = 10,1:1; `#ffffff` sobre `#b5452c` = 5,4:1 (o fundo do botão no hover).
- A ordem do arquivo continua a da aula 10 e da aula 11: todas as regras normais primeiro, e os dois blocos `@media` no fim, o `(min-width: 768px)` e depois o `(prefers-reduced-motion: reduce)`.
- Esta aula não ensina Git. "Salvar a versão 2" quer dizer salvar os arquivos e guardar uma cópia da pasta do site com o nome `meu-site-v2`, como a `meu-site-v1` da aula 9 do nível 1. A "Fala" diz que o controle de versões de verdade, com Git, fica para um próximo nível. A prova e o certificado são descritos como o app funciona hoje (mesmas falas da aula 9 do nível 1): o nome completo confirmado antes da prova vai no certificado e não pode ser alterado depois; perguntas sorteadas das doze aulas, sempre com pelo menos uma de código; nota mínima de noventa por cento; se não passar, o app mostra os assuntos para revisar e dá para tentar de novo; quem passa conquista o certificado, com um QR Code de verificação. Sem datas para o próximo nível.
- Na "Fala", os termos de CSS e as tags são escritos do jeito que se fala, com as mesmas grafias das aulas 1 a 11: `CSS` = "cê ésse ésse", `style` = "stáil", `link` = "línk", `rel` = "rél", `stylesheet` = "stáil xíti", `href` = "agá réf", `class` = "cléss", `id` = "ái di", `px` = "pê xis", `rem` = "rém", `color` = "cálor", `background-color` = "béquigráund cálor", `font-size` = "fónti sáiz", `font-family` = "fónti fémili", `serif` = "sérif", `sans-serif` = "sãns sérif", `line-height` = "láin ráit", `text-align` = "técst alái", `left` = "léft", `text-decoration` = "técst decorêixon", `none` = "nân", `padding` = "péding", `border` = "bórder", `margin` = "márdjin", `margin-bottom` = "márdjin bótom", `margin-top` = "márdjin tóp", `border-radius` = "bórder rêidius", `solid` = "sólid", `box-sizing` = "bócs sáizin", `border-box` = "bórder bócs", `width` = "uídth", `height` = "rêit", `max-width` = "méx uídth", `min-width` = "mín uídth", `auto` = "óto", `*` = "asterisco", `display` = "displêi", `block` = "blóc", `inline-block` = "inláin blóc", `flex` = "fléx", `flex-direction` = "fléx dairécxon", `row` = "rôu", `column` = "cólam", `justify-content` = "djâstifai cóntent", `align-items` = "aláin áitems", `space-between` = "spêis bituín", `center` = "cênter", `gap` = "guép", `list-style` = "líst stáil", `flex-wrap` = "fléx ráp", `wrap` = "ráp", `meta` = "méta", `viewport` = "víu pórt", `@media` = "arroba mídia", `:hover` = "dois pontos rôver" ("rôver"), `:focus-visible` = "dois pontos fôcus vísibol" ("fôcus vísibol"), `outline` = "áutlain", `transition` = "transíchon", `transform` = "transfórm", `translateY` = "transléit uái", `prefers-reduced-motion` = "prifêrs ridiúst môuchon", `.cartao` = "ponto cartão", `.projetos` = "ponto projetos"; as tags: `h1` = "agá um", `h2` = "agá dois", `h3` = "agá três", `p` = "pê", `a` = "é", `ul` = "u éle", `li` = "éle í", `nav` = "név", `header` = "rédêr", `main` = "mêin", `section` = "sécchon", `footer` = "fúter", `div` = "dív", `article` = "ártikol"; do nível 1: `table` = "têibol", `th` = "tê agá", `td` = "tê dê", `label` = "lêibol", `input` = "ínput", `textarea` = "téxt érria", `button` = "bâton". Nova nesta aula: `border-collapse` = "bórder colépss", `collapse` = "colépss". Os códigos de cor são lidos em pares, como na aula 3: `#fdf6e3` = "cerquilha, éfe dê, éfe seis, é três"; `#264653` = "cerquilha, dois seis, quatro seis, cinco três"; `#b5452c` = "cerquilha, bê cinco, quatro cinco, dois cê"; `#ffffff` = "cerquilha, seis éfes"; `#333333` = "cerquilha, três três, três três, três três". Os números com unidade são ditos por extenso: `16px` = "dezesseis pê xis", `8px` = "oito pê xis", `720px` = "setecentos e vinte pê xis", `768px` = "setecentos e sessenta e oito pê xis", `200px` = "duzentos pê xis", `1.6` = "um vírgula seis", `1.125rem` = "um vírgula um dois cinco rém"; o `%` é dito "por cento" (`100%` = "cem por cento"). Os símbolos são ditos por extenso: `.` = "ponto", `#` = "cerquilha", `,` = "vírgula", `{` = "abre chaves", `}` = "fecha chaves", `:` = "dois pontos", `;` = "ponto e vírgula", `../` = "ponto ponto barra". O nome da pasta `meu-site-v2` é dito "meu site, versão dois". Seguem com o nome normal: HTML, head, body, img, estilo ponto cê ésse ésse, index ponto HTML, Verdana ("verdána") e Georgia ("djórdja"), como na aula 4, Git, QR Code e JavaScript.

---

## Bloco 01 — Abertura

**Fala:**
Oi, que bom te ver por aqui. Chegou o dia. Esta é a última aula da Primeira Demão, e ela é diferente das outras. Hoje quase não tem propriedade nova. Hoje, você vai pegar a sua própria página pessoal, aquela que você construiu no fim do nível um, e dar a ela um acabamento completo, com tudo o que aprendeu. Lembra da casa? No nível um, você levantou a estrutura. Agora vem a pintura. A gente vai fazer junto, região por região, usando a página da Ana como exemplo. Primeiro, você vai planejar o visual. Depois, vai escrever o estilo, na ordem certa. Em seguida, vai revisar tudo com uma checklist. E, no fim, vai salvar a segunda versão do seu site. E eu ainda te conto como funciona a prova do nível e o certificado. Então, abre a pasta do seu site, abre o editor e bora destravar.

**Tela:** logo da Destrava animando → título "Aula 12 — Projeto final: dê acabamento ao seu site" → os 5 degraus do curso, com o primeiro aceso e com bandeirinha, e o segundo aceso com uma bandeirinha no topo, rótulo "último passo do degrau 2". Ao lado, uma página pessoal sem estilo (letra preta, fundo branco, tudo empilhado) recebe uma demão de tinta que passa de cima a baixo: aparecem o fundo creme, os títulos azul-petróleo, o menu em linha e os cartões. Três ícones aparecem em sequência: uma paleta ("planejar"), um pincel ("estilizar") e uma prancheta com checks ("revisar").

---

## Bloco 02 — O que você aprendeu neste nível

**Fala:**
Antes de começar, olha só o caminho. Na aula um, você conheceu o cê ésse ésse e ligou o primeiro arquivo de estilo. Na dois, os seletores: tag, cléss e ái di. Na três, as cores e o contraste. Na quatro, as fontes e o espaço entre as linhas. Na cinco, o modelo de caixa: péding, bórder e márdjin. Na seis, os tamanhos e as unidades, com o rém e o méx uídth. Na sete, a diferença entre elemento de bloco e elemento em linha. Na oito e na nove, o fléx bócs, para colocar as coisas lado a lado e fazer os cartões. Na dez, a página que fica boa no celular. E, na onze, o rôver, o foco e a transição. São onze aulas, e cada uma virou uma demão de tinta. Hoje, você passa todas elas na sua página. E, se alguma parte parecer nova, volta na aula daquele assunto. Ela continua lá, esperando por você.

**Tela:** uma linha do tempo horizontal com onze cartões que acendem um por um: "1 O que é CSS", "2 Seletores", "3 Cores", "4 Texto e fontes", "5 Modelo de caixa", "6 Tamanhos e unidades", "7 Block e inline", "8 Flexbox: o básico", "9 Flexbox na prática", "10 Responsivo", "11 Hover e transição". Cada cartão vira uma faixa de tinta de uma cor; as onze faixas passam, uma depois da outra, sobre o desenho de uma página, que vai ganhando acabamento. Rótulo: "tudo junto, hoje".

---

## Bloco 03 — Planejar o visual

**Fala:**
Todo acabamento bom começa antes do código, com três escolhas. A primeira: a paleta. Escolha duas ou três cores, no máximo, e mais os neutros, que são o branco e um cinza bem escuro para o texto. A Ana escolheu o creme para o fundo, o azul-petróleo para os títulos e o terracota para os destaques. A segunda: as fontes. No máximo duas. Uma para os títulos e outra para o texto. A Ana usa a djórdja nos títulos e a verdána no texto, sempre com uma lista de reserva no fim. A terceira: o espaço. Escolha poucos tamanhos e repita sempre os mesmos. A Ana usa oito pê xis para os espaços pequenos e dezesseis para os normais. E, antes de escrever qualquer regra, confira o contraste das suas cores num verificador. Texto claro em fundo claro não dá para ler, por mais bonito que pareça. Anota tudo numa folha: ela vai ser o seu guia enquanto você escreve o estilo.

**Tela:** uma folha de planejamento com três quadros sendo preenchidos. "Paleta": três amostras grandes, `#fdf6e3` (fundo), `#264653` (principal), `#b5452c` (destaque), e duas pequenas, `#ffffff` e `#333333` (neutros). "Fontes": "Títulos: Georgia, "Times New Roman", serif" e "Texto: Verdana, Arial, sans-serif", com o rótulo "no máximo 2". "Espaço": uma régua com `8px` e `16px` marcados, rótulo "poucos tamanhos, sempre os mesmos". Depois, um verificador de contraste genérico mostra `#333333` sobre `#fdf6e3` = "11,7:1", check verde, e um cinza-claro sobre o creme com "x" vermelho, rótulo "confira o contraste antes".

---

## Bloco 04 — Começar pela sua página

**Fala:**
Agora, abre a pasta do seu site, a do nível um. Não a cópia da versão um: essa fica guardada, do jeito que está. Você trabalha na pasta original. Dentro dela, cria um arquivo novo chamado estilo ponto cê ésse ésse, vazio. Depois, abre o index ponto HTML e, no head, coloca duas linhas. A primeira é a méta víu pórt, da aula dez, para a página ficar do tamanho certo no celular. A segunda é a línk, da aula um, com rél igual a stáil xíti e agá réf igual a estilo ponto cê ésse ésse. Se você tem outras páginas, como a de projetos, dentro da pasta paginas, coloca a mesma línk nelas também, com o ponto ponto barra na frente, que sobe uma pasta. Pronto. Um arquivo de estilo, todas as páginas. A partir daqui, a Ana mostra o estilo dela, e você escreve o seu.

**Tela:** na lateral, a pasta `meu-site` aberta, com `index.html`, `imagens/` e `paginas/`; ao lado, a pasta `meu-site-v1` com um cadeado e o rótulo "fica guardada". O arquivo `estilo.css` é criado dentro de `meu-site`. No `index.html`, dentro do `head`:
```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Ana Souza, página pessoal</title>
  <link rel="stylesheet" href="estilo.css">
</head>
```
a `meta viewport` pisca com o cartão "aula 10"; a `link`, com o cartão "aula 1". Depois, no `paginas/projetos.html`, a linha `<link rel="stylesheet" href="../estilo.css">`, com o `../` destacado, rótulo "sobe uma pasta". Rótulo final: "um arquivo, todas as páginas".

---

## Bloco 05 — A base: a página inteira

**Fala:**
A primeira parte do estilo é a base, as regras que valem para a página inteira. Começa com o asterisco e o bócs sáizin bórder bócs, da aula seis, para as larguras serem fáceis de calcular. Depois, a regra body: o béquigráund cálor creme, a fónti fémili do texto, com a verdána e a reserva, o fónti sáiz de um vírgula um dois cinco rém e o láin ráit de um vírgula seis, que deixa a leitura confortável. A regra pê pinta os parágrafos com o cinza bem escuro. Os títulos, agá um, agá dois e agá três, ganham o azul-petróleo e a djórdja, numa regra só, com vírgula. E a regra mêin, com méx uídth de setecentos e vinte pê xis e márdjin zero óto, deixa o conteúdo numa coluna confortável, no meio da tela. Salva e abre no navegador. Se você escolheu outras cores e fontes, é aqui que elas entram. Só com isso, a sua página já parece outra.

**Tela:** no `estilo.css`, é digitado:
```css
* {
  box-sizing: border-box;
}

body {
  background-color: #fdf6e3;
  font-family: Verdana, Arial, sans-serif;
  font-size: 1.125rem;
  line-height: 1.6;
}

p {
  color: #333333;
}

h1, h2, h3 {
  color: #264653;
  font-family: Georgia, "Times New Roman", serif;
  line-height: 1.2;
}

main {
  max-width: 720px;
  margin: 0 auto;
}
```
cada regra pisca com o cartão da sua aula ("aula 6", "aulas 3 e 4", "aula 3", "aulas 2 e 4", "aulas 6 e 7"). Na prévia, a página pessoal sem estilo vira, de uma vez, uma coluna creme, com títulos azul-petróleo e texto confortável. Rótulo: "só a base, e já parece outra".

---

## Bloco 06 — O topo e o menu

**Fala:**
Agora, o topo. A regra rédêr vira uma caixa flexível: displêi fléx, com fléx dairécxon cólam, porque o celular vem primeiro. O djâstifai cóntent spêis bituín e o aláin áitems cênter já ficam prontos para quando o topo ficar em linha, nas telas maiores. Dentro dele, o menu. Na regra név u éle, outro displêi fléx, com guép de dezesseis pê xis, o fléx ráp, para os links descerem se não couberem, o líst stáil nân, que tira as bolinhas, e o péding zero. E os links do menu, na regra név é: a cor terracota, sem o sublinhado, em negrito, com displêi inláin blóc e um péding de oito por doze pê xis, para a área de clique ficar maior. A Ana ainda usa a mesma cor terracota no ponto destaque, numa regra só, com vírgula. Na sua página, troca o terracota pela sua cor de destaque. O topo está pronto para o celular. As telas maiores ficam para daqui a pouco.

**Tela:** no `estilo.css`, abaixo da base:
```css
header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

nav ul {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  list-style: none;
  padding: 0;
}

.destaque, nav a {
  color: #b5452c;
}

nav a {
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
  padding: 8px 12px;
  transition: background-color 0.3s ease;
}
```
cartões: `header` → "aulas 8 e 10"; `nav ul` → "aulas 8 e 10"; `nav a` → "aulas 4, 7 e 11". Na prévia estreita, o título em cima e os links lado a lado embaixo, sem bolinhas, em terracota e negrito.

---

## Bloco 07 — As seções como cartões

**Fala:**
Agora, o meio da página. Cada sécchon vira um cartão branco, com o modelo de caixa da aula cinco. Béquigráund cálor branco. Um péding de dezesseis pê xis, para o texto não encostar na borda. Uma bórder de dois pê xis, sólid, azul-petróleo. Um bórder rêidius de oito pê xis, para os cantos ficarem arredondados. E um márdjin bótom de vinte e quatro pê xis, para dar espaço entre uma seção e a outra. Repara como o branco dos cartões se destaca do fundo creme. Na sua página, use a sua cor principal na borda. Depois, a foto. Na regra img, o bórder rêidius de cinquenta por cento deixa a foto redonda. O méx uídth de cem por cento e o rêit óto fazem a foto encolher quando a tela é estreita, sem deformar. E o displêi blóc tira aquele espacinho que fica embaixo da imagem. Cada seção agora é uma caixa clara, fácil de ler.

**Tela:** no `estilo.css`:
```css
section {
  background-color: #ffffff;
  padding: 16px;
  border: 2px solid #264653;
  border-radius: 8px;
  margin-bottom: 24px;
}

img {
  border-radius: 50%;
  max-width: 100%;
  height: auto;
  display: block;
}
```
na prévia, cada seção ganha o fundo branco e a borda azul-petróleo; o desenho do modelo de caixa (conteúdo, `padding`, `border`, `margin`) aparece por cima de uma delas, com o cartão "aula 5". A foto da Ana fica redonda. Cartão: "`img`: aulas 5, 6 e 7".

---

## Bloco 08 — Os projetos em cartões

**Fala:**
A seção meus projetos ganha os cartões da aula nove. Se a sua ainda é uma lista de links, faz como a Ana fez: troca cada projeto por uma ártikol com a cléss cartão, com um agá três, um pê e o link, e coloca os cartões juntos dentro de uma dív, com a cléss projetos. No estilo, a regra ponto projetos é a caixa flexível: displêi fléx, guép de dezesseis pê xis e fléx ráp, para os cartões descerem quando faltar espaço. Na regra ponto cartão, o fléx um divide a linha por igual, e o mín uídth de duzentos pê xis impede que o cartão fique fino demais. Cada cartão também é uma caixa flexível em cólam, com fundo creme, péding, borda fina e cantos arredondados. E, na regra ponto cartão é, o márdjin tóp óto empurra o link para o pé do cartão. Assim, os links ficam alinhados, mesmo com textos de tamanhos diferentes.

**Tela:** no `index.html`, a seção `#projetos` com a `div.projetos` e três `article.cartao` (cartão "aula 9"). No `estilo.css`:
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
  transition: transform 0.3s ease;
}

.cartao a {
  margin-top: auto;
}
```
na prévia larga, três cartões lado a lado, com os links alinhados embaixo; a janela é estreitada e o terceiro cartão desce, depois cada um fica numa linha. Rótulo: "os cartões se ajeitam sozinhos".

---

## Bloco 09 — A tabela e o formulário

**Fala:**
A sua página do nível um tem uma tabela e um formulário. Eles também merecem acabamento, mas leve. Na tabela, uma propriedade nova e pequena: bórder colépss, dois pontos, colépss. Sem ela, cada célula tem a borda dela, e as bordas ficam dobradas. Com ela, as bordas vizinhas viram uma linha só. A regra têibol ganha também uídth de cem por cento. E as células, tê agá e tê dê, numa regra só, ganham uma bórder fina azul-petróleo, um péding de oito pê xis e o técst alái léft. No formulário, a lêibol vira displêi blóc, para cada rótulo ficar em cima do seu campo. A ínput e a téxt érria ganham uídth de cem por cento, péding e borda fina. E o bâton ganha o fundo azul-petróleo, a letra branca, a bórder nân e os cantos arredondados. Repara que todas as cores aqui já estão na paleta. Nenhuma cor nova. Simples, limpo e fácil de usar no celular.

**Tela:** no `estilo.css`:
```css
table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  border: 1px solid #264653;
  padding: 8px;
  text-align: left;
}

label {
  display: block;
  margin-top: 16px;
}

input, textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #264653;
  border-radius: 4px;
}

button {
  margin-top: 16px;
  padding: 8px 16px;
  background-color: #264653;
  color: #ffffff;
  border: none;
  border-radius: 8px;
}
```
antes e depois da tabela: à esquerda, as bordas dobradas entre as células (rótulo "sem `border-collapse`"); à direita, uma linha só (rótulo "`border-collapse: collapse;`", etiqueta "novo"). Na prévia, o formulário com cada rótulo em cima do seu campo, os campos da largura do cartão e o botão azul-petróleo com letra branca.

---

## Bloco 10 — Hover, foco e telas maiores

**Fala:**
Agora, a página responde, como na aula onze. A regra név é, dois pontos rôver, vírgula, név é, dois pontos fôcus vísibol, dá o fundo azul-petróleo e a letra branca. Uma regra só do fôcus vísibol ganha o áutlain terracota, para quem navega pelo teclado. O cartão sobe quatro pê xis no rôver. E o bâton também responde: no rôver e no fôcus vísibol, o fundo vira terracota. Lembra: nada importante escondido atrás do rôver, porque no celular ele não existe. Por último, no fim do arquivo, os dois arroba mídia. O primeiro, com mín uídth de setecentos e sessenta e oito pê xis, coloca o topo em rôu e aumenta um pouco a letra nas telas maiores. O segundo, o prifêrs ridiúst môuchon, tira a transição de quem pediu menos movimento. Salva, passa o mouse, aperta a tecla tab e alarga a janela. A sua página está pronta.

**Tela:** no `estilo.css`, as regras de estado logo depois das regras que elas mudam, e os dois `@media` no fim do arquivo:
```css
nav a:hover,
nav a:focus-visible {
  background-color: #264653;
  color: #ffffff;
}

nav a:focus-visible {
  outline: 2px solid #b5452c;
}

.cartao:hover {
  transform: translateY(-4px);
}

button:hover,
button:focus-visible {
  background-color: #b5452c;
}

@media (min-width: 768px) {
  header {
    flex-direction: row;
  }

  body {
    font-size: 1.25rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    transition: none;
  }
}
```
cartões: estados → "aula 11"; `@media (min-width: 768px)` → "aula 10". Na prévia: o cursor passa pelo menu, por um cartão e pelo botão; a tecla `Tab` percorre os links com o contorno terracota; a janela é alargada e o topo fica em linha. Rótulo: "página pronta".

---

## Bloco 11 — A checklist de revisão

**Fala:**
Página pronta? Então, hora de revisar, item por item. Um: o contraste. Todo texto se lê bem sobre o seu fundo? Confere no verificador, principalmente os textos claros. Dois: os tamanhos. A letra do texto está confortável, em rém, e os títulos se destacam? Três: o foco. Aperta a tecla tab e percorre a página. Você sempre sabe onde está? Quatro: o celular. Estreita a janela, ou usa o modo de tela de celular das ferramentas de desenvolvedor, e olha a página toda. Cinco: a rolagem para o lado. Na tela estreita, a página não pode ter barra de rolagem na horizontal. Se tiver, alguma caixa está larga demais, quase sempre um uídth fixo em pê xis. Troca por méx uídth. E seis: o cê ésse ésse sem erro. Confere os pontos e vírgulas e as chaves, ou passa o arquivo num validador de cê ésse ésse. Abre no navegador e testa tudo. Marcou os seis? Parabéns.

**Tela:** uma prancheta com a checklist; cada item ganha um check verde quando é falado, enquanto a prévia ou o editor mostra o teste:
1. "Contraste" → um verificador de contraste genérico com `#333333` sobre `#fdf6e3` = "11,7:1".
2. "Tamanhos legíveis, em `rem`" → o `font-size: 1.125rem;` do `body` brilha.
3. "Foco visível" → a tecla `Tab` percorrendo o menu, com o contorno terracota.
4. "Funciona no celular" → o modo de tela de celular das ferramentas de desenvolvedor do navegador (genérico), com a página empilhada.
5. "Sem rolagem para o lado" → uma caixa com `width: 900px` passando da tela, "x" vermelho; troca para `max-width: 900px`, check verde.
6. "CSS sem erro" → as chaves coloridas aos pares e os `;` destacados; um validador de CSS genérico com a mensagem "nenhum erro encontrado".
Rótulo final: "6 de 6, página revisada".

---

## Bloco 12 — Salvar a versão 2

**Fala:**
Revisou? Agora, salva. Salva o estilo ponto cê ésse ésse e o index ponto HTML, e confere se a pasta do site tem tudo: o index, o estilo, a pasta imagens e a pasta paginas, se você tiver. Depois, faz a mesma coisa do nível um: copia a pasta inteira e dá à cópia um nome que diga que é a segunda versão, como meu site, versão dois. Agora você tem duas versões guardadas: a um, só com o HTML, e a dois, com o acabamento. Se amanhã você mexer em alguma coisa e algo quebrar, a versão que funcionava está ali. E a versão um continua intacta: ela é o registro do nível um, e a versão dois é o registro deste. Copiar pastas resolve por enquanto, mas não é o jeito que as equipes trabalham. Num próximo nível, você vai aprender a guardar versões de verdade, com Git, que registra cada mudança, sem precisar copiar nada.

**Tela:** o atalho de salvar aparece no editor, com o ícone de disquete e um check verde. Na lateral, a pasta `meu-site` se abre e mostra `index.html`, `estilo.css`, `imagens/foto-ana.jpg` e `paginas/projetos.html`, cada um com um check. A pasta é copiada e a cópia ganha o nome `meu-site-v2`, com a etiqueta "segunda versão". Uma linha do tempo mostra `v1` (uma página sem estilo, rótulo "só HTML") e `v2` (a página com acabamento, rótulo "com CSS"), as duas com cadeado. No canto, um cartão discreto com um ícone de ramificação: "Git: num próximo nível".

---

## Bloco 13 — A prova do nível e o certificado

**Fala:**
Agora, falta um passo para fechar o nível: a prova. Quando você quiser fazer, vai no mapa de níveis e clica em fazer a prova. Antes de começar, o app pede o seu nome completo. Confere com cuidado, porque esse nome vai no certificado e não dá para mudar depois. A prova sorteia perguntas sobre tudo o que você viu nas doze aulas, e sempre tem pelo menos uma pergunta de código, em que você escreve cê ésse ésse de verdade. Para passar, é preciso acertar pelo menos noventa por cento. É de propósito: aqui, você só avança quando mostra que aprendeu de verdade. Se não der dessa vez, sem problema. O app mostra os assuntos para revisar, e você pode tentar de novo. E, quando passar, conquista o certificado do nível, com um QR Code que qualquer pessoa pode usar para conferir que ele é verdadeiro. E, como no nível um, passar na prova libera o próximo nível.

**Tela:** a tela do mapa de níveis da Destrava, com o degrau "Primeira Demão" e o botão "Fazer a prova" pulsando. Depois, a tela da prova com o campo "Nome completo" e o aviso "Este nome vai no seu certificado e não poderá ser alterado depois." Em seguida, uma barra de progresso de perguntas, uma delas com um editor de código na aba CSS, rótulo "pelo menos uma de código". Um medidor sobe até "90%", rótulo "nota mínima". Um cartão "Assuntos para revisar" aparece e desliza para o lado, rótulo "não passou? revisa e tenta de novo". Por fim, um certificado ilustrado do nível "Primeira Demão" com o nome em destaque e um QR Code no canto; um celular genérico aponta para o QR Code e mostra "Certificado válido".

---

## Bloco 14 — O seu site com acabamento e o próximo degrau

**Fala:**
Para, respira e olha o que você fez. Doze aulas atrás, a sua página era só estrutura, letra preta em fundo branco. Hoje, ela tem cores escolhidas com cuidado, fontes legíveis, espaços que respiram, um menu em linha, cartões que se ajeitam, e ela fica boa no celular e no computador. Ela responde ao mouse e ao teclado. E foi você que planejou, escreveu, revisou e salvou. Os exercícios desta aula estão logo abaixo do vídeo, e o último deles é um mini projeto final, para você juntar as peças principais do estilo numa página só. Depois, é a prova. E, no próximo nível, a sua página vai ganhar comportamento, com JavaScript: botões que fazem coisas, conteúdo que muda na tela. A casa está de pé e pintada. Agora, ela vai ganhar a parte elétrica. Parabéns por chegar até aqui. Até o próximo nível, e bora destravar.

**Tela:** a página pessoal com acabamento aparece no centro, rolando devagar, primeiro num computador e depois num celular (desenhos genéricos); confetes caem em volta e surge o selo "Meu site com acabamento". Ao lado, a `v1` sem estilo e a `v2` com estilo, lado a lado. A lista do que foi feito aparece item por item com checks verdes ("planejei", "estilizei", "revisei", "salvei a v2"). Botão "Fazer os exercícios" pulsando, com o destaque "mini projeto final no último exercício". Depois, os 5 degraus do curso: os dois primeiros acesos com bandeirinhas, e o terceiro ganha um brilho com o texto "Próximo nível: JavaScript" e uma lâmpada ilustrada acendendo dentro da página da Ana. Encerramento com o logo da Destrava e o slogan "Destrava sua carreira. Um nível de cada vez."
