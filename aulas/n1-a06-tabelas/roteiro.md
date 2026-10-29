# Aula 6 — Tabelas

**Nível:** Primeiro Commit · **Duração estimada:** ~9 minutos · **Blocos:** 10

## Como este roteiro é usado

- A voz do vídeo é **gerada por IA** a partir do texto em "Fala". Por isso a "Fala" precisa soar natural quando lida em voz alta: frases curtas, sem siglas soltas, com os símbolos de código ditos por extenso.
- O que está em "Tela" é o que o pipeline de vídeo anima (editor da Destrava, prévia do navegador, rótulos, setas, checks). Não é lido pela voz.
- Um áudio por bloco: `bloco01`, `bloco02`... Para corrigir uma fala, gere de novo só aquele bloco.
- Todo o conteúdo de exemplo é fictício (a aluna "Ana"). Nada de marcas, empresas ou sites reais: os endereços usam o domínio reservado `example.com`.
- Na "Fala", as tags de tabela são escritas do jeito que se fala, para a voz não tropeçar: `table` = "têibol", `tr` = "tê erre", `td` = "tê dê", `th` = "tê agá", `caption` = "quépchon", `thead` = "tê réd", `tbody` = "tê bódi". As de lista, da aula passada, seguem como antes: `ul` = "u éle", `li` = "éle í".

---

## Bloco 01 — Abertura

**Fala:**
Olá, que bom te ver de novo. Na aula passada, a página da Ana ganhou listas: a lista de compras com marcadores, a receita do bolo de caneca numerada, e até uma lista dentro da outra. Hoje, a gente vai um passo além. Tem informação que não cabe numa lista, porque ela tem linhas e colunas. Pensa num boletim da escola, numa tabela de preços ou no horário das aulas da semana. Em HTML, isso é uma tabela. Você vai aprender a montar uma tabela do zero, a marcar os cabeçalhos, a dar um título para ela e a organizar as partes. E, no fim, a Ana vai colocar o horário de estudos dela na página. Abre o editor e bora destravar.

**Tela:** logo da Destrava animando → título "Aula 6 — Tabelas" → os 5 degraus do curso com o primeiro aceso; ao lado, a página "Sobre mim" da Ana, da aula passada, com a lista "O que estou aprendendo"; três cartõezinhos surgem ao redor: um boletim com notas em colunas, uma tabela de preços e uma grade de horários da semana. Rótulo: "o que a gente vai construir hoje".

---

## Bloco 02 — Quando usar uma tabela

**Fala:**
Antes do código, uma pergunta importante: quando usar uma tabela? A resposta é: quando os dados fazem sentido em linhas e colunas. Um bom teste é ler a tabela cruzando as duas coisas. Na linha de segunda-feira, na coluna do assunto, está escrito HTML. Se esse cruzamento faz sentido, é uma tabela. E se os itens só vêm um depois do outro, sem colunas, como a lista de compras, aí é uma lista mesmo. Agora, o uso errado. Há muitos anos, antes do CSS ficar poderoso, muita gente usava tabela para montar o visual da página: o menu numa célula, o texto em outra. Isso é usar tabela para layout, e hoje é considerado um erro. O leitor de tela anuncia uma tabela que não existe, e a página fica difícil de mudar. Tabela é para dados. O visual fica com o CSS.

**Tela:** uma grade simples com "Dia" e "Assunto" no topo; o dedo de uma animação percorre a linha "Segunda" e a coluna "Assunto", e as duas se cruzam na célula "HTML", que acende com check verde, rótulo "linha + coluna = faz sentido". Depois, uma página antiga ilustrada é dividida em células tracejadas, com o menu numa e o texto em outra; um "x" vermelho aparece, rótulo "tabela para layout: não". Fim do bloco: dois cartões lado a lado, "dados → tabela" com check verde e "visual → CSS (próximos níveis)".

---

## Bloco 03 — A estrutura básica: table, tr e td

**Fala:**
Agora sim, o código. Toda tabela começa com a tag têibol, que é a caixa da tabela inteira. Dentro dela, a tabela é montada linha por linha. Cada linha é uma tê erre, de table row, linha da tabela. E dentro de cada linha vão as células, uma tê dê para cada uma. Tê dê vem de table data, dado da tabela. Vamos fazer uma tabela bem pequena. Abre a têibol. Abre uma tê erre. Dentro dela, uma tê dê com segunda, e outra tê dê com HTML. Fecha a tê erre. Outra linha: tê erre, tê dê com terça, tê dê com CSS, fecha a tê erre. E fecha a têibol. Repara: não existe tag de coluna. As colunas aparecem sozinhas, pela posição das células.

**Tela:** "table" aparece com o rótulo "a caixa da tabela"; depois "table row", com "tr = linha"; depois "table data", com "td = célula". No editor, é digitado linha por linha:
```html
<table>
  <tr>
    <td>Segunda</td>
    <td>HTML</td>
  </tr>
  <tr>
    <td>Terça</td>
    <td>CSS</td>
  </tr>
</table>
```
uma caixa tracejada envolve o `<table>` inteiro; cada `<tr>` ganha uma faixa horizontal colorida, rótulo "uma linha"; cada `<td>` pisca ao ser digitado, rótulo "uma célula". Na prévia, aparece a grade com duas linhas e duas colunas; uma faixa vertical destaca a segunda coluna, rótulo "coluna = a mesma posição em cada linha".

---

## Bloco 04 — Cabeçalhos com th

**Fala:**
A tabela funciona, mas falta dizer o que cada coluna significa. Para isso existe a tê agá, de table header, cabeçalho da tabela. Ela é uma célula, igual à tê dê, só que é um título. Fica assim: antes das linhas de dados, a Ana cria uma tê erre nova. Dentro dela, uma tê agá com dia, e outra tê agá com assunto. No navegador, os cabeçalhos aparecem em negrito e centralizados. Mas, como sempre, o importante não é a aparência. A tê agá avisa para o navegador e para o leitor de tela: isto aqui é o nome da coluna. E dá para usar a tê agá também no começo de cada linha, quando a primeira célula é o título daquela linha.

**Tela:** "table header" aparece com "th = célula de cabeçalho". No editor, uma linha nova é inserida no topo da tabela:
```html
<tr>
  <th>Dia</th>
  <th>Assunto</th>
</tr>
```
na prévia, "Dia" e "Assunto" surgem em negrito e centralizados; uma etiqueta "nome da coluna" aparece em cima de cada um. Ao lado, um mini exemplo com `<th>Segunda</th>` no começo de uma linha, rótulo "th também serve para o título da linha".

---

## Bloco 05 — Um título para a tabela: caption

**Fala:**
Toda tabela merece um título. E não um título solto em cima dela, mas um que pertence à tabela. É a tag quépchon, que quer dizer legenda. Lembra da legenda da imagem, na aula quatro? A ideia é parecida. A quépchon vai logo depois de abrir a têibol, antes de qualquer linha. Essa posição é obrigatória: ela é a primeira coisa dentro da tabela. A Ana escreve: horário de estudos da semana. No navegador, o texto aparece centralizado, em cima da tabela. E tem uma vantagem: quando alguém com leitor de tela chega na tabela, ouve primeiro o nome dela. Assim, a pessoa decide se quer ler aquela tabela inteira ou pular para a próxima parte da página.

**Tela:** no editor, logo abaixo de `<table>`, é digitado:
```html
<caption>Horário de estudos da semana</caption>
```
uma seta aponta para a posição, com o rótulo "logo depois de abrir a table". Na prévia, o título aparece centralizado em cima da grade. Ao lado, uma versão errada com `<h3>` solto acima da tabela recebe um aviso amarelo, rótulo "parece título, mas não pertence à tabela". Por fim, o ícone de alto-falante com o balão: "Tabela: Horário de estudos da semana, 2 colunas, 4 linhas".

---

## Bloco 06 — As partes da tabela: thead e tbody

**Fala:**
Numa tabela maior, vale separar as partes. A linha de cabeçalhos vai dentro da tê réd, de table head, a cabeça da tabela. E as linhas de dados vão dentro da tê bódi, de table body, o corpo da tabela. A ordem fica assim: abre a têibol, vem a quépchon, depois a tê réd com a linha dos títulos, e por fim a tê bódi com todas as linhas de dados. No navegador, quase nada muda. Mas o código fica mais organizado, e mais tarde o CSS consegue estilizar a cabeça e o corpo separadamente. Um detalhe curioso: se você não escrever a tê bódi, o navegador cria uma sozinho, por baixo dos panos. Ele faz questão de que toda tabela tenha um corpo.

**Tela:** "table head" aparece com "thead = cabeça"; "table body", com "tbody = corpo". No editor, a tabela é reorganizada:
```html
<table>
  <caption>Horário de estudos da semana</caption>
  <thead>
    <tr>
      <th>Dia</th>
      <th>Assunto</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Segunda</td>
      <td>HTML</td>
    </tr>
  </tbody>
</table>
```
o `<thead>` ganha uma moldura azul, rótulo "cabeça"; o `<tbody>`, uma moldura verde, rótulo "corpo". Depois, uma lupa de raio-x passa sobre uma tabela sem `<tbody>` e revela um `<tbody>` fantasma, tracejado, rótulo "o navegador cria sozinho".

---

## Bloco 07 — O horário de estudos da Ana

**Fala:**
Agora, vamos montar a tabela completa na página da Ana. Ela quer mostrar o horário de estudos da semana, com três colunas: dia, horário e assunto. Na tê réd, uma linha com três tê agá: dia, horário e assunto. Na tê bódi, uma linha para cada dia. Segunda, das sete às oito da noite, HTML. Quarta, no mesmo horário, CSS. E sábado, das nove às onze da manhã, projeto da página pessoal. Repara que cada linha tem exatamente três células, uma para cada coluna. Se uma linha ficar com menos, a tabela fica torta. E a ordem das células também importa: a primeira tê dê de cada linha cai na coluna dia, a segunda na coluna horário, e a terceira na coluna assunto. Se você trocar a ordem numa linha, o sábado vai parar na coluna do horário. E, para o código ficar fácil de ler, use a indentação da aula passada: cada nível um pouquinho mais para dentro.

**Tela:** no `index.html`, abaixo de um novo `<h2>Minha rotina de estudos</h2>`, é digitado:
```html
<table>
  <caption>Horário de estudos da semana</caption>
  <thead>
    <tr>
      <th>Dia</th>
      <th>Horário</th>
      <th>Assunto</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Segunda</td>
      <td>19h às 20h</td>
      <td>HTML</td>
    </tr>
    <tr>
      <td>Quarta</td>
      <td>19h às 20h</td>
      <td>CSS</td>
    </tr>
    <tr>
      <td>Sábado</td>
      <td>9h às 11h</td>
      <td>Projeto da página pessoal</td>
    </tr>
  </tbody>
</table>
```
na prévia, a tabela aparece com o título, os cabeçalhos em negrito e três linhas; uma contagem "3 células" pisca ao lado de cada linha, com check verde. Os espaços da indentação ficam destacados em amarelo, rótulo "cada nível mais para dentro".

---

## Bloco 08 — Tabela acessível

**Fala:**
Vamos falar de quem não enxerga a tela. Uma pessoa com leitor de tela não vê a grade. Ela vai ouvindo célula por célula. Se a tabela só tem tê dê, ela escuta: segunda, dezenove às vinte, HTML. E fica se perguntando o que é cada coisa. Dezenove às vinte é um horário? Uma nota? Um preço? Numa tabela grande, com dez linhas e cinco colunas, isso vira uma confusão. Com a tê agá, o leitor de tela junta o cabeçalho com a célula: dia, segunda. Horário, dezenove às vinte. Assunto, HTML. Faz toda a diferença. E a quépchon dá o nome da tabela logo de cara. Então, duas regras simples para guardar: toda tabela de dados tem cabeçalhos com tê agá, e toda tabela tem uma quépchon dizendo do que ela trata.

**Tela:** a tabela da Ana fica escura, só com o ícone de alto-falante. Primeiro, a versão sem `<th>`: balões de fala aparecem em sequência, "Segunda", "19h às 20h", "HTML", com pontos de interrogação ao redor, rótulo "só td: dados sem contexto". Depois, a versão com `<th>`: os balões viram "Dia: Segunda", "Horário: 19h às 20h", "Assunto: HTML", com check verde, rótulo "th dá contexto". No fim, duas regras em cartões: "dados → `<th>` nos cabeçalhos" e "toda tabela → `<caption>`".

---

## Bloco 09 — Os erros mais comuns

**Fala:**
Agora, os erros que mais aparecem com tabelas. O primeiro: a tê dê solta, direto dentro da têibol, sem uma tê erre em volta. Toda célula mora dentro de uma linha. O segundo: esquecer a tê agá e escrever os títulos das colunas como tê dê, às vezes com um strong para parecer cabeçalho. Fica com cara de título, mas o leitor de tela não sabe disso. O terceiro: linhas com quantidades diferentes de células, e a tabela fica torta. Antes de terminar, conte as células de cada linha: todas precisam ter o mesmo número. E o quarto, que a gente já viu: usar tabela para montar o layout da página. Se o conteúdo não é dado em linhas e colunas, não é tabela.

**Tela:** quatro cartões aparecem em sequência, cada um com o erro e a correção:
1. `<table><td>Segunda</td></table>`, com "x" vermelho e o rótulo "td solto"; embaixo, `<table><tr><td>Segunda</td></tr></table>`, com check verde e o rótulo "toda célula mora numa linha".
2. `<td><strong>Dia</strong></td>`, com "x" vermelho e o rótulo "parece cabeçalho, mas não é"; embaixo, `<th>Dia</th>`, com check verde.
3. uma tabela em que a segunda linha tem só duas células; na prévia, a linha fica com um buraco no fim, "x" vermelho; a célula que falta é digitada e a grade se completa, check verde, rótulo "mesmo número de células".
4. a página antiga dividida em células, do bloco 2, com "x" vermelho, rótulo "tabela não é layout".
No fim, os cartões encolhem para uma checklist: "td e th dentro de tr", "títulos com th", "linhas completas", "tabela só para dados".

---

## Bloco 10 — Resumo e próximo degrau

**Fala:**
Vamos recapitular. Tabela é para dados em linhas e colunas, nunca para montar o visual da página. A têibol é a caixa. Cada linha é uma tê erre, e cada célula é uma tê dê. Os cabeçalhos usam a tê agá. A quépchon dá o título, logo depois de abrir a têibol. E a tê réd e a tê bódi separam a cabeça e o corpo. Agora é a sua vez: os exercícios estão logo abaixo do vídeo. Na próxima aula, a página da Ana deixa de só mostrar coisas e começa a ouvir quem visita. Chegam os formulários, para criar um formulário de contato. Até lá, e bora destravar.

**Tela:** lista do resumo aparecendo item por item com checks verdes ("tabela: só para dados", "table: a caixa", "tr: linha · td: célula", "th: cabeçalho", "caption: o título, logo no começo", "thead e tbody: cabeça e corpo"); botão "Fazer os exercícios" pulsando; prévia da próxima aula com o ícone de um formulário com um campo e um botão e o texto "Aula 7 — Formulários"; encerramento com o logo da Destrava e o slogan "Destrava sua carreira. Um nível de cada vez."
