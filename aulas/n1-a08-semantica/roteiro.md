# Aula 8 — Tags semânticas

**Nível:** Primeiro Commit · **Duração estimada:** ~10 minutos · **Blocos:** 10

## Como este roteiro é usado

- A voz do vídeo é **gerada por IA** a partir do texto em "Fala". Por isso a "Fala" precisa soar natural quando lida em voz alta: frases curtas, sem siglas soltas, com os símbolos de código ditos por extenso.
- O que está em "Tela" é o que o pipeline de vídeo anima (editor da Destrava, prévia do navegador, rótulos, setas, checks). Não é lido pela voz.
- Um áudio por bloco: `bloco01`, `bloco02`... Para corrigir uma fala, gere de novo só aquele bloco.
- Todo o conteúdo de exemplo é fictício (a aluna "Ana"). Nada de marcas, empresas ou sites reais: os endereços usam o domínio reservado `example.com`.
- Na "Fala", as tags semânticas são escritas do jeito que se fala, para a voz não tropeçar: `header` = "rédêr", `nav` = "név", `main` = "mêin", `section` = "sécchon", `article` = "ártikol", `footer` = "fúter", `div` = "dív". As das aulas passadas seguem como antes: `ul` = "u éle", `li` = "éle í", `a` = "é", `form` = "fórm", `id` = "ái di".

---

## Bloco 01 — Abertura

**Fala:**
Oi, que bom te ver por aqui de novo. Na aula passada, a página da Ana aprendeu a ouvir quem visita: ganhou um formulário de contato, com cada lêibol ligada ao seu campo e um botão de enviar. A página já tem bastante coisa. Tem título, parágrafos, links, imagens, listas, uma tabela e um formulário. Só que, olhando o código, tudo está jogado em sequência, como uma pilha de papéis soltos em cima da mesa. Hoje, a gente vai arrumar essa mesa. Você vai aprender a dividir a página em regiões com significado: o topo, o menu, o conteúdo principal, as seções e o rodapé. Por fora, quase nada muda. Mas, por dentro, a página fica muito mais fácil de entender, tanto para as pessoas quanto para as máquinas. Abre o editor e bora destravar.

**Tela:** logo da Destrava animando → título "Aula 8 — Tags semânticas" → os 5 degraus do curso com o primeiro aceso; ao lado, a página "Sobre mim" da Ana, da aula passada, com o formulário "Fale comigo" no fim. O código da página aparece como uma pilha bagunçada de folhas soltas; as folhas se organizam em caixas coloridas rotuladas "topo", "menu", "conteúdo principal", "seções" e "rodapé". Rótulo: "o que a gente vai construir hoje".

---

## Bloco 02 — O problema da sopa de dív

**Fala:**
Antes das tags novas, vamos entender o problema. Durante muito tempo, quem fazia sites usava uma tag só para dividir a página: a dív. Ela é uma caixa genérica, que agrupa outras tags, mas não diz nada sobre o que tem dentro. Uma dív para o topo, uma dív para o menu, uma dív para o texto, uma dív para o rodapé. E dív dentro de dív, dentro de dív. Esse código ganhou até apelido: sopa de dív. O navegador mostra tudo direitinho, mas, para quem lê o código, é tudo igual. Você precisa caçar pistas para descobrir onde começa o menu e onde termina o conteúdo. E não é só você. O leitor de tela e os buscadores também ficam sem saber o que é cada parte. A solução são as tags semânticas, que são caixas com nome e com significado.

**Tela:** no editor, aparece um código com muitas `<div>` aninhadas e só a palavra `div` destacada em cinza, repetida várias vezes:
```html
<div>
  <div><h1>Olá, eu sou a Ana</h1></div>
  <div><a href="#quem-sou">Quem sou eu</a></div>
  <div>
    <div><h2>Quem sou eu</h2></div>
  </div>
  <div><p>Feito pela Ana</p></div>
</div>
```
uma tigela de sopa ilustrada se enche de letrinhas "div", rótulo "sopa de div". Uma lupa passa pelo código com pontos de interrogação: "onde está o menu?". Depois, as caixas cinzas trocam de cor e ganham etiquetas com nomes, rótulo "semântica = significado".

---

## Bloco 03 — O topo da página: rédêr

**Fala:**
A primeira tag semântica é a rédêr, que quer dizer cabeçalho. Ela guarda o topo da página: aquela parte que apresenta o site e costuma ficar lá em cima. Normalmente, é ali que fica o título principal, o agá um, às vezes uma imagem ou um logo, e uma frase curta de apresentação. No caso da Ana, a rédêr guarda o agá um, olá, eu sou a Ana, e a foto de perfil dela, da aula quatro. Repara numa coisa importante: a rédêr não é a mesma coisa que a tag head, lá do começo do arquivo. A head guarda informações invisíveis, como o título da aba. Já a rédêr fica dentro do body e aparece na tela. Os nomes parecem, mas os trabalhos são bem diferentes. Na dúvida, lembre: rédêr é o topo que a pessoa vê.

**Tela:** "header" aparece com o rótulo "header = cabeçalho". No editor, logo depois de `<body>`, é digitado:
```html
<header>
  <h1>Olá, eu sou a Ana</h1>
  <img src="imagens/foto-ana.jpg" alt="Ana sorrindo, com um caderno de anotações na mão" width="200" height="200">
</header>
```
na prévia, o topo da página ganha uma moldura colorida com a etiqueta "header". Dois cartões lado a lado: "`<head>`: informações invisíveis, fora da tela" e "`<header>`: o topo visível, dentro do `<body>`", cada um com uma seta para o seu lugar no arquivo.

---

## Bloco 04 — O menu: név

**Fala:**
Logo abaixo do topo, a Ana tem aqueles links que levam para cada parte da página, lembra? Da aula três, com a cerquilha e o ái di. Esse conjunto de links é um menu, e o menu tem uma tag própria: a név, de navegação. A név diz: aqui estão os caminhos principais do site. E tem um jeito muito comum de montar o menu por dentro: uma lista. Isso mesmo, a u éle da aula cinco. Cada item do menu vira uma éle í, e dentro de cada éle í vai um link, a tag é. Assim, a Ana escreve: név, dentro dela uma u éle, e dentro, três itens: quem sou eu, o que estou aprendendo e fale comigo. Faz sentido, porque um menu é exatamente isso: uma lista de lugares para onde a pessoa pode ir.

**Tela:** "nav" aparece com o rótulo "nav = navegação". No editor, dentro da `<header>`, abaixo do `<img>`, o parágrafo antigo de links é apagado e no lugar é digitado:
```html
<nav>
  <ul>
    <li><a href="#quem-sou">Quem sou eu</a></li>
    <li><a href="#aprendendo">O que estou aprendendo</a></li>
    <li><a href="#contato">Fale comigo</a></li>
  </ul>
</nav>
```
`<ul>` e `<li>` piscam com o cartão "aula 5: listas"; cada `href="#..."` pisca com o cartão "aula 3: links com #id". Na prévia, os três links aparecem em lista, dentro de uma moldura com a etiqueta "nav".

---

## Bloco 05 — O conteúdo principal: mêin

**Fala:**
Agora vem a parte mais importante da página: o conteúdo principal. Para ele existe a tag mêin, que quer dizer principal. Dentro da mêin vai aquilo que só existe nesta página e que é o motivo de alguém visitar. No caso da Ana, é o texto sobre ela, a lista do que está aprendendo, a tabela de estudos e o formulário. O topo e o rodapé, que costumam se repetir em todas as páginas do site, ficam de fora. E aqui vai a regra de ouro da mêin: só uma por página. Faz sentido, né? Uma página não pode ter dois conteúdos principais. Se tivesse, nenhum dos dois seria principal de verdade. Então, a estrutura da Ana fica assim: primeiro a rédêr, depois a mêin, e, no final, o rodapé, que a gente vê daqui a pouco.

**Tela:** "main" aparece com o rótulo "main = principal". No editor, abaixo da `</header>`, é digitado `<main>`, e todo o conteúdo da página, do "Quem sou eu" até o formulário, recebe um recuo e fica dentro dela, terminando em `</main>`. Na prévia, uma moldura grande envolve o meio da página, etiqueta "main". Um cartão mostra duas molduras `<main>` na mesma página com "x" vermelho, rótulo "só uma por página". No canto, um esqueleto simplificado: `header` → `main` → `footer`.

---

## Bloco 06 — Partes do conteúdo: sécchon e ártikol

**Fala:**
Dentro da mêin, o conteúdo ainda pode ser dividido em partes. Para isso existem duas tags parecidas, mas com usos diferentes. A primeira é a sécchon, que quer dizer seção. Ela agrupa um assunto da página, e toda sécchon tem um título, normalmente um agá dois. A Ana cria uma sécchon para quem sou eu, outra para o que estou aprendendo e outra para fale comigo. Inclusive, o ái di que antes ficava no agá dois pode ir para a própria sécchon, e o link do menu continua funcionando. A segunda tag é a ártikol, que quer dizer artigo. Ela é para um conteúdo que faz sentido sozinho, mesmo fora da página: um post de blog, uma notícia, um comentário. O teste é simples: se você pudesse recortar aquele pedaço e colar em outro site, e ele ainda fizesse sentido, é uma ártikol.

**Tela:** "section" aparece com o rótulo "section = seção (um assunto, com título)". No editor, dentro da `<main>`, é digitado:
```html
<section id="quem-sou">
  <h2>Quem sou eu</h2>
  <p>Estou aprendendo a programar...</p>
</section>
```
o `id` sobe do `<h2>` para a `<section>`, e uma seta liga `href="#quem-sou"` do menu à nova `<section>`. Depois, "article" aparece com o rótulo "article = artigo (faz sentido sozinho)". Uma tesoura recorta um cartão "Meu primeiro post: por que comecei a programar" e o cola numa outra página genérica de `example.com`; check verde, rótulo "recortou e ainda faz sentido".

---

## Bloco 07 — O rodapé, fúter, e quando a dív ainda serve

**Fala:**
Para fechar a página, vem a fúter, que quer dizer rodapé. É a parte de baixo, onde costuma ficar quem fez o site, o ano, um link de contato ou para as redes. A Ana coloca na fúter um parágrafo: feito pela Ana, em dois mil e vinte e seis. Agora, uma pergunta justa: se existem tantas tags com significado, a dív morreu? Não. A dív continua útil, mas para um caso específico: quando você precisa de uma caixa só para agrupar coisas, por causa da aparência, e esse grupo não tem significado próprio. Por exemplo: daqui a alguns níveis, com o cê ésse ésse, você vai querer colocar dois cartões lado a lado. Aquela caixa que segura os dois não é um topo, nem um menu, nem uma seção. É só uma caixa. Aí sim, a dív é a escolha certa.

**Tela:** "footer" aparece com o rótulo "footer = rodapé". No editor, abaixo da `</main>`, é digitado:
```html
<footer>
  <p>Feito pela Ana, em 2026.</p>
</footer>
```
na prévia, a parte de baixo da página ganha a moldura com a etiqueta "footer". Depois, um cartão: "`<div>`: caixa sem significado, só para agrupar". Dois cartõezinhos de projeto aparecem lado a lado dentro de uma moldura tracejada cinza, etiqueta `div`, rótulo "só uma caixa para o visual (CSS, próximos níveis)", check verde.

---

## Bloco 08 — Por que isso importa

**Fala:**
Você pode estar pensando: se a página fica igualzinha na tela, por que tanto trabalho? Por três motivos. O primeiro: quem usa leitor de tela. Cada uma dessas tags vira um ponto de referência. Com um atalho, a pessoa pula direto para o menu, ou direto para o conteúdo principal, sem ter que ouvir a página inteira de cima a baixo. É como ter um índice da página. O segundo: os buscadores. Os programas que leem a internet para montar os resultados de busca entendem melhor o que é conteúdo de verdade e o que é só menu ou rodapé. E o terceiro motivo é você e quem trabalha com você. Daqui a seis meses, ou numa equipe, abrir um código e ver rédêr, név, mêin e fúter é como abrir um armário com gavetas etiquetadas. Você acha tudo na hora.

**Tela:** três cartões aparecem em sequência. 1) Tela escura com o ícone de alto-falante e um menu de pontos de referência: "banner", "navegação", "principal", "rodapé"; o cursor escolhe "principal" e a página pula direto para a `<main>`, rótulo "pular direto para o que importa". 2) Um robozinho de busca lê a página com uma lupa e destaca a `<main>` em verde e o `<nav>` e o `<footer>` em cinza, rótulo "o buscador entende o que é conteúdo". 3) Dois armários lado a lado: um com gavetas sem nada escrito, rótulo "sopa de div", e outro com gavetas etiquetadas "header", "nav", "main", "footer", com check verde.

---

## Bloco 09 — A página da Ana, organizada

**Fala:**
Agora, vamos ver a página da Ana inteira, já organizada. Logo depois do body, abre a rédêr, com o agá um, a foto e a név com a lista de links. Fecha a rédêr. Depois, abre a mêin. Dentro dela, uma sécchon para quem sou eu, uma para o que estou aprendendo, com a lista e a tabela, e uma para fale comigo, com o formulário. Cada sécchon com o seu agá dois e o seu ái di. Fecha a mêin. Por fim, a fúter com o parágrafo do rodapé. Repara na indentação: cada região um nível para dentro, e as seções mais um nível. Agora, faz o teste. Olha a prévia. Está quase igual a antes, e é isso mesmo. A mudança não é na aparência, é no significado. Clica nos links do menu e veja cada um levar para a sua seção.

**Tela:** no `index.html`, o `<body>` inteiro é mostrado, com cada região destacada numa cor:
```html
<body>
  <header>
    <h1>Olá, eu sou a Ana</h1>
    <img src="imagens/foto-ana.jpg" alt="Ana sorrindo, com um caderno de anotações na mão" width="200" height="200">
    <nav>
      <ul>
        <li><a href="#quem-sou">Quem sou eu</a></li>
        <li><a href="#aprendendo">O que estou aprendendo</a></li>
        <li><a href="#contato">Fale comigo</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <section id="quem-sou">
      <h2>Quem sou eu</h2>
      ...
    </section>
    <section id="aprendendo">
      <h2>O que estou aprendendo</h2>
      ...
    </section>
    <section id="contato">
      <h2>Fale comigo</h2>
      <form>...</form>
    </section>
  </main>
  <footer>
    <p>Feito pela Ana, em 2026.</p>
  </footer>
</body>
```
na prévia, a página aparece quase igual à da aula passada, com molduras coloridas finas e etiquetas sobre cada região; o cursor clica em "Fale comigo" no menu e a página rola até o formulário, que pisca. Os espaços da indentação ficam destacados em amarelo, rótulo "cada região um nível para dentro".

---

## Bloco 10 — Os erros mais comuns e o próximo degrau

**Fala:**
Antes de terminar, os erros que mais aparecem com tags semânticas. O primeiro: colocar mais de uma mêin na página. É só uma. O segundo: usar név para qualquer grupinho de links. A név é para a navegação principal, o menu. Um link solto no meio de um texto, ou no rodapé, não precisa dela. O terceiro: sécchon sem título. Se você não consegue dar um agá dois para aquele pedaço, talvez ele não seja uma seção. E o quarto: trocar toda dív por uma tag semântica sem pensar. A ideia não é sumir com a dív, é escolher a tag pelo significado. Recapitulando: rédêr é o topo, név é o menu, mêin é o conteúdo principal, sécchon é um assunto com título, ártikol é um conteúdo que vive sozinho, fúter é o rodapé, e a dív é a caixa sem significado. Os exercícios estão logo abaixo do vídeo. Na próxima aula, o projeto final: você vai juntar tudo e construir o seu primeiro site pessoal. Até lá, e bora destravar.

**Tela:** quatro cartões aparecem em sequência, cada um com o erro e a correção:
1. duas molduras `<main>` na mesma página, com "x" vermelho e o rótulo "mais de um main"; embaixo, uma `<main>` só, check verde.
2. um `<nav>` em volta de um único link dentro do `<footer>`, com "x" vermelho e o rótulo "nav é para o menu principal"; embaixo, o link sem `<nav>`, check verde.
3. `<section><p>...</p></section>`, com "x" vermelho e o rótulo "section sem título"; embaixo, `<section><h2>...</h2><p>...</p></section>`, check verde.
4. uma `<div>` de layout trocada por `<section>` sem título, com "x" vermelho e o rótulo "trocar no automático"; embaixo, a `<div>` mantida, check verde.
Depois, a lista do resumo aparece item por item com checks verdes ("header: o topo", "nav: o menu", "main: o principal, só um", "section: um assunto com título", "article: faz sentido sozinho", "footer: o rodapé", "div: caixa sem significado"); botão "Fazer os exercícios" pulsando; prévia da próxima aula com uma página pessoal em branco se montando peça por peça e o texto "Aula 9 — Projeto final: seu primeiro site pessoal"; encerramento com o logo da Destrava e o slogan "Destrava sua carreira. Um nível de cada vez."
