# Aula 9 — Projeto final: seu primeiro site pessoal

**Nível:** Primeiro Commit · **Duração estimada:** ~14 minutos · **Blocos:** 14

## Como este roteiro é usado

- A voz do vídeo é **gerada por IA** a partir do texto em "Fala". Por isso a "Fala" precisa soar natural quando lida em voz alta: frases curtas, sem siglas soltas, com os símbolos de código ditos por extenso.
- O que está em "Tela" é o que o pipeline de vídeo anima (editor da Destrava, prévia do navegador, rótulos, setas, checks). Não é lido pela voz.
- Um áudio por bloco: `bloco01`, `bloco02`... Para corrigir uma fala, gere de novo só aquele bloco.
- Todo o conteúdo de exemplo é fictício (a aluna "Ana"). Nada de marcas, empresas ou sites reais: os endereços usam o domínio reservado `example.com`. A foto da Ana é o mesmo avatar ilustrado da aula 4 (`foto-ana.jpg`, sem foto de pessoa real).
- Esta aula não ensina Git. "Salvar a primeira versão" quer dizer salvar o arquivo e guardar uma cópia da pasta do site; o Git fica para um próximo nível.
- Na "Fala", as tags e os atributos são escritos do jeito que se fala, reaproveitando a grafia das aulas passadas: `h1` = "agá um", `h2` = "agá dois", `a` = "é", `ul` = "u éle", `li` = "éle í", `id` = "ái di", `table` = "têibol", `tr` = "tê erre", `td` = "tê dê", `th` = "tê agá", `caption` = "quépchon", `thead` = "tê réd", `tbody` = "tê bódi", `form` = "fórm", `input` = "ínput", `label` = "lêibol", `textarea` = "téxt érria", `button` = "bâton", `type` = "táip", `text` = "téxt", `email` = "i-mêil", `name` = "nêim", `for` = "fór", `header` = "rédêr", `nav` = "név", `main` = "mêin", `section` = "sécchon", `footer` = "fúter". Seguem com o nome normal, como nas aulas 1 a 4: DOCTYPE, html, head, body, meta charset, title, strong, img, src, alt, href, target, rel, noopener e mailto.

---

## Bloco 01 — Abertura

**Fala:**
Oi, que bom te ver por aqui. Chegou o dia. Esta é a última aula do nível Primeiro Commit, e ela é diferente das outras. Hoje não tem tag nova. Hoje, você vai juntar tudo o que aprendeu e construir uma página pessoal inteira, do zero, com a sua cara. A gente vai fazer junto, passo a passo, usando a página da Ana como guia. Primeiro, você vai planejar a página no papel. Depois, vai escrever o código, região por região. Em seguida, vai revisar tudo com uma checklist, para não deixar nenhum detalhe para trás. E, no fim, vai salvar a primeira versão do seu site. Ah, e tem mais: eu vou te contar como funciona a prova do nível e o certificado. Então, pega um papel, abre o editor e bora destravar.

**Tela:** logo da Destrava animando → título "Aula 9 — Projeto final: seu primeiro site pessoal" → os 5 degraus do curso com o primeiro aceso e uma bandeirinha no topo dele, rótulo "último passo do degrau 1". Ao lado, uma página em branco vai se montando peça por peça: topo, menu, seções, tabela, formulário e rodapé. Rótulo: "o que a gente vai construir hoje". Três ícones aparecem em sequência: um lápis ("planejar"), um editor ("construir") e uma prancheta com checks ("revisar").

---

## Bloco 02 — O que você aprendeu neste nível

**Fala:**
Antes de começar, olha só o caminho que você fez. Na aula um, você descobriu o que é HTML e escreveu a estrutura básica de uma página. Na dois, vieram os títulos, os parágrafos e o strong, para destacar o que é importante. Na três, os links, com a tag é e o href. Na quatro, as imagens, com o src e o texto alternativo. Na cinco, as listas. Na seis, as tabelas. Na sete, o formulário de contato. E, na oito, as tags semânticas, que organizam a página em regiões com significado. São oito aulas, e cada uma virou uma peça de quebra-cabeça. Hoje, a gente encaixa todas elas. E repara: quase tudo o que vem a seguir você já viu. Se alguma parte parecer nova, volta na aula daquele assunto. Ela continua lá, esperando por você.

**Tela:** uma linha do tempo horizontal com oito cartões que acendem um por um: "1 Estrutura básica", "2 Títulos e textos", "3 Links", "4 Imagens", "5 Listas", "6 Tabelas", "7 Formulários", "8 Tags semânticas". Cada cartão vira uma peça de quebra-cabeça colorida; as oito peças voam para o centro e se encaixam formando o desenho de uma página. Rótulo: "tudo junto, hoje".

---

## Bloco 03 — Planejar antes de escrever

**Fala:**
Todo site bom começa antes do código, com um rascunho. Pega uma folha e desenha um retângulo, que é a sua página. Lá em cima, uma faixa para o topo: o seu nome e o menu. No meio, um espaço grande para o conteúdo principal. E embaixo, uma faixa fininha para o rodapé. Agora, divide o meio em partes. A Ana escolheu quatro: sobre mim, meus projetos, minha rotina e fale comigo. Ao lado de cada parte, anota o que vai dentro. Sobre mim tem um texto e uma foto. Meus projetos, uma lista de links. Minha rotina, uma tabela. E fale comigo, um formulário. Pronto. Esse desenho simples já é a planta da casa. E repara que cada caixa do desenho já tem uma tag esperando por ela: rédêr, név, mêin, sécchon e fúter.

**Tela:** uma mão desenha a lápis, numa folha quadriculada, um retângulo dividido em faixas: "topo: nome + menu", "conteúdo principal" e "rodapé". O meio se divide em quatro caixas: "Sobre mim (texto + foto)", "Meus projetos (lista de links)", "Minha rotina (tabela)", "Fale comigo (formulário)". Depois, etiquetas de código voam e grudam em cada caixa: `header`, `nav`, `main`, `section` (quatro vezes) e `footer`. Rótulo: "o rascunho é a planta da casa".

---

## Bloco 04 — O esqueleto da página

**Fala:**
Agora, o editor. Cria um arquivo novo chamado index ponto html, numa pasta só para o seu site. A primeira linha é o DOCTYPE, que avisa o navegador que é um documento HTML moderno. Depois, a tag html, com lang igual a pt-BR, porque a página está em português. Dentro dela, o head e o body. No head vão as informações que não aparecem no meio da página. Primeiro, a meta charset igual a UTF-8, para os acentos aparecerem certinho. Depois, o title, que é o texto da aba do navegador. A Ana escreve: Ana Souza, página pessoal. E você escreve o seu nome. Repara que esse começo é sempre igual, em toda página que você fizer. É o esqueleto. Daqui para frente, tudo o que a gente escrever vai dentro do body, que é o que a pessoa vê na tela.

**Tela:** na lateral, uma pasta `meu-site` com o arquivo `index.html` sendo criado. No editor, é digitado:
```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <title>Ana Souza, página pessoal</title>
  </head>
  <body>

  </body>
</html>
```
cada linha pisca com um cartãozinho "aula 1". Na prévia, a aba do navegador mostra "Ana Souza, página pessoal". Um cursor substitui "Ana Souza" por um campo destacado "seu nome aqui", rótulo "use o seu nome".

---

## Bloco 05 — O topo e o menu

**Fala:**
Dentro do body, a primeira região é o topo: a rédêr. Nela vai o agá um, o título mais importante da página. A Ana escreve: olá, eu sou a Ana. Logo abaixo, o menu, dentro de uma név. E, como você viu na aula passada, o menu é uma lista: uma u éle, com uma éle í para cada item, e um link, a tag é, dentro de cada éle í. São quatro links, um para cada seção do rascunho. No href, vai a cerquilha seguida do ái di da seção: cerquilha sobre, cerquilha projetos, cerquilha rotina e cerquilha contato. Esses ái dis ainda não existem, a gente cria daqui a pouco. E o texto de cada link diz para onde ele leva: sobre mim, meus projetos, minha rotina e fale comigo. Nada de clique aqui.

**Tela:** no editor, dentro do `<body>`, é digitado:
```html
<header>
  <h1>Olá, eu sou a Ana</h1>
  <nav>
    <ul>
      <li><a href="#sobre">Sobre mim</a></li>
      <li><a href="#projetos">Meus projetos</a></li>
      <li><a href="#rotina">Minha rotina</a></li>
      <li><a href="#contato">Fale comigo</a></li>
    </ul>
  </nav>
</header>
```
`<header>` e `<nav>` piscam com o cartão "aula 8"; `<ul>` e `<li>` com "aula 5"; cada `href="#..."` com "aula 3". Na prévia, o título e a lista de quatro links aparecem dentro de uma moldura com a etiqueta "header". Um pontinho de interrogação flutua sobre `#sobre`, rótulo "o id vem já já".

---

## Bloco 06 — Sobre mim: texto e foto

**Fala:**
Depois do topo, abre a mêin, que guarda o conteúdo principal. Só uma por página, lembra? Dentro dela, a primeira sécchon, com ái di igual a sobre. É esse ái di que faz o primeiro link do menu funcionar. Toda sécchon tem um título, então vem um agá dois: sobre mim. Depois, um parágrafo contando quem você é. A Ana escreve que trabalha no atendimento de uma loja e está fazendo a transição para a tecnologia. E que está aprendendo HTML, com a palavra HTML dentro de um strong, porque é importante. Por fim, a foto, com a tag img. No src, o caminho da imagem: imagens, barra, foto traço ana ponto jota pê gê. E no alt, um texto que descreve a foto para quem não consegue ver: Ana sorrindo, com um caderno de anotações na mão.

**Tela:** no editor, abaixo da `</header>`, é digitado:
```html
<main>
  <section id="sobre">
    <h2>Sobre mim</h2>
    <p>Trabalho no atendimento de uma loja e estou fazendo a minha transição para a tecnologia. Estou aprendendo <strong>HTML</strong>.</p>
    <img src="imagens/foto-ana.jpg" alt="Ana sorrindo, com um caderno de anotações na mão" width="200" height="200">
  </section>
```
o `id="sobre"` fica destacado e uma seta o liga ao link "Sobre mim" do menu. `<strong>` pisca com o cartão "aula 2"; `alt` pisca com o cartão "aula 4", rótulo "descreve a imagem". Na prévia, aparecem o título "Sobre mim", o parágrafo com "HTML" em negrito e o avatar ilustrado da Ana.

---

## Bloco 07 — Meus projetos: uma lista de links

**Fala:**
A segunda sécchon é meus projetos, com ái di igual a projetos e o seu agá dois. Aqui, a Ana junta duas coisas que já sabe: uma lista e links. Ela cria uma u éle, e cada éle í guarda um link para um projeto. O primeiro leva para a página de projetos do próprio site, que fica na pasta paginas. Então, o href é um caminho relativo: paginas, barra, projetos ponto html. O segundo leva para um site de fora, as receitas favoritas dela. Esse usa o caminho absoluto, começando com agá tê tê pê esse. E, como é um site externo, consultado de passagem, a Ana coloca o target underline blank, para abrir numa aba nova, junto com o rel noopener, por segurança. Mas lembra da regra da aula três: com moderação. Os links do seu próprio site abrem na mesma aba.

**Tela:** no editor, dentro da `<main>`, é digitado:
```html
  <section id="projetos">
    <h2>Meus projetos</h2>
    <ul>
      <li><a href="paginas/projetos.html">Todos os meus projetos</a></li>
      <li><a href="https://receitas.example.com" target="_blank" rel="noopener">Minhas receitas favoritas</a></li>
    </ul>
  </section>
```
o primeiro `href` ganha o rótulo "caminho relativo"; o segundo, "caminho absoluto". `target="_blank"` e `rel="noopener"` piscam com o cartão "aula 3", rótulo "aba nova, com moderação". Na prévia, aparece a lista com os dois links sublinhados.

---

## Bloco 08 — Minha rotina: uma tabela

**Fala:**
A terceira sécchon é minha rotina, com ái di igual a rotina. Aqui, os dados têm linhas e colunas, então é trabalho para a têibol. Logo depois de abrir a têibol, vem a quépchon, o título da tabela: horário de estudos da semana. Depois, a tê réd, com a linha de cabeçalho. Uma tê erre, e dentro dela duas tê agá: dia e assunto. Em seguida, a tê bódi, com as linhas de dados. Cada linha é uma tê erre, e cada célula é uma tê dê. Segunda, HTML. Terça, CSS. Quarta, revisão. Repara que todas as linhas têm o mesmo número de células: duas. Se uma linha tiver uma célula a mais ou a menos, a tabela fica torta. E, se você não tiver uma rotina de estudos, tudo bem: coloca o que fizer sentido para você, como os seus horários livres.

**Tela:** no editor, dentro da `<main>`, é digitado:
```html
  <section id="rotina">
    <h2>Minha rotina</h2>
    <table>
      <caption>Horário de estudos da semana</caption>
      <thead>
        <tr>
          <th>Dia</th>
          <th>Assunto</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Segunda</td><td>HTML</td></tr>
        <tr><td>Terça</td><td>CSS</td></tr>
        <tr><td>Quarta</td><td>Revisão</td></tr>
      </tbody>
    </table>
  </section>
```
`<caption>`, `<th>` e `<td>` piscam com o cartão "aula 6". Cada linha `<tr>` ganha uma faixa colorida com o número "2" ao lado, rótulo "mesmo número de células". Na prévia, a tabela aparece com a legenda em cima e o cabeçalho em negrito.

---

## Bloco 09 — Fale comigo: o formulário

**Fala:**
A última sécchon é fale comigo, com ái di igual a contato. Dentro dela, o formulário, que começa com a tag fórm. O primeiro campo é o nome. Vem uma lêibol com fór igual a nome, e o texto nome. Depois, uma ínput com táip igual a téxt, ái di igual a nome e nêim igual a nome. O fór da lêibol e o ái di do campo têm o mesmo valor, e é isso que liga um ao outro. O segundo campo é o e-mail: a mesma ideia, mas com táip igual a i-mêil. O terceiro é a mensagem, com uma téxt érria, que é a caixa grande, de várias linhas. Diferente da ínput, a téxt érria tem tag de fechamento. Por fim, o bâton, com o texto enviar. E lembra: por enquanto, o formulário fica pronto na tela, mas ainda não envia para lugar nenhum.

**Tela:** no editor, dentro da `<main>`, é digitado:
```html
  <section id="contato">
    <h2>Fale comigo</h2>
    <form>
      <label for="nome">Nome</label>
      <input type="text" id="nome" name="nome">
      <label for="email">E-mail</label>
      <input type="email" id="email" name="email">
      <label for="mensagem">Mensagem</label>
      <textarea id="mensagem" name="mensagem"></textarea>
      <button type="submit">Enviar</button>
    </form>
  </section>
</main>
```
cada par `for`/`id` fica na mesma cor, ligado por uma linha, com o cartão "aula 7". Na prévia, o cursor clica no texto "Nome" e o campo ao lado fica em foco, rótulo "a label está ligada". Um aviso amarelo discreto: "ainda não envia para lugar nenhum".

---

## Bloco 10 — O rodapé e a página com a sua cara

**Fala:**
Para fechar, depois da mêin, vem a fúter, o rodapé. A Ana coloca um parágrafo com o nome dela e um link de e-mail, usando o mailto: href igual a mailto, dois pontos, ana arroba example ponto com. Agora, olha a prévia. A página está inteira: topo, menu, quatro seções e rodapé. Clica nos links do menu e veja cada um levar para a sua seção. E agora vem a parte mais importante desta aula. Essa página é da Ana, mas o projeto é seu. Troca o nome pelo seu. Escreve a sua história no sobre mim. Coloca a sua foto ou uma ilustração, sempre com um alt que descreva a imagem. Lista o que você já fez, mesmo que sejam os exercícios deste curso. Monta a sua rotina. Não precisa ficar perfeito. Precisa ficar seu.

**Tela:** no editor, abaixo da `</main>`, é digitado:
```html
<footer>
  <p>Feito por Ana Souza, em 2026. <a href="mailto:ana@example.com">ana@example.com</a></p>
</footer>
```
`mailto:` pisca com o cartão "aula 3". Na prévia, a página inteira rola de cima a baixo, com molduras finas e etiquetas em cada região; o cursor clica em "Minha rotina" no menu e a página pula até a tabela. Depois, os textos da Ana vão sendo substituídos por campos destacados: "seu nome", "a sua história", "a sua foto (com alt)", "os seus projetos", "a sua rotina". Rótulo grande: "não precisa ficar perfeito, precisa ficar seu".

---

## Bloco 11 — A checklist de revisão

**Fala:**
Página pronta? Então, hora de revisar. Quem trabalha com desenvolvimento revisa o próprio código antes de mostrar para alguém, e você vai fazer o mesmo. Passa item por item. Um: a página tem um agá um só? O título principal é um só, e as seções usam agá dois. Dois: toda imagem tem alt, descrevendo o que ela mostra? Três: toda lêibol tem o fór igual ao ái di do seu campo? Clica no texto de cada rótulo e veja se o campo certo fica selecionado. Quatro: toda tag que abriu, fechou? Lembrando que a img e a ínput não fecham. Cinco: a indentação está em ordem, com cada região um nível para dentro? E seis: abre o arquivo no navegador e testa tudo. Clica em cada link do menu, confere os acentos e olha se nada sumiu. Marcou os seis? Parabéns, a página passou na revisão.

**Tela:** uma prancheta com a checklist; cada item ganha um check verde quando é falado, enquanto o editor destaca o trecho correspondente:
1. "Um `<h1>` só" → o `<h1>` brilha; os `<h2>` aparecem em outra cor.
2. "Toda `<img>` tem `alt`" → o `alt` da foto brilha.
3. "Todo `for` igual ao `id` do campo" → os pares `for`/`id` ficam na mesma cor.
4. "Toda tag aberta foi fechada (menos `<img>` e `<input>`)" → setas ligam aberturas a fechamentos.
5. "Indentação em ordem" → os espaços do recuo ficam destacados em amarelo.
6. "Testei no navegador" → o arquivo `index.html` é aberto com duplo clique; na prévia, o cursor clica em cada link do menu.
Rótulo final: "6 de 6, página revisada".

---

## Bloco 12 — Salvar a primeira versão

**Fala:**
Revisou? Agora, salva. Parece óbvio, mas muita gente perde trabalho por esquecer. Salva o arquivo no editor, e confere se a pasta do site tem tudo: o index ponto html, a pasta imagens, com a sua foto, e a pasta paginas, se você criou outras páginas. Depois, faz uma cópia da pasta inteira e dá um nome que diga que é a primeira versão, como meu site, versão um. Assim, se amanhã você mexer em alguma coisa e algo quebrar, a versão que funcionava está guardada. Essa é a ideia por trás do nome deste nível: o primeiro commit é o primeiro registro de um trabalho que funciona. E, num próximo nível, você vai aprender a guardar versões de verdade, com Git, que é a ferramenta que as equipes usam para isso no dia a dia.

**Tela:** o atalho de salvar aparece no editor, com o ícone de disquete e um check verde. Na lateral, a pasta `meu-site` se abre e mostra `index.html`, `imagens/foto-ana.jpg` e `paginas/projetos.html`, cada um com um check. Depois, a pasta é copiada e a cópia ganha o nome `meu-site-v1`, com uma etiqueta "primeira versão". Uma linha do tempo mostra `v1` guardada e uma `v2` com um "x" vermelho de "quebrou"; uma seta volta para a `v1`, rótulo "a versão que funcionava está salva". No canto, um cartão discreto com um ícone de ramificação: "Git: num próximo nível".

---

## Bloco 13 — A prova do nível e o certificado

**Fala:**
Agora, falta um passo para fechar o nível: a prova. Quando você quiser fazer, vai no mapa de níveis e clica em fazer a prova. Antes de começar, o app pede o seu nome completo. Capricha, porque esse nome vai no certificado e não dá para mudar depois. A prova sorteia perguntas sobre tudo o que você viu nas nove aulas, e sempre tem pelo menos uma pergunta de código, em que você escreve HTML de verdade. Para passar, é preciso acertar pelo menos noventa por cento. Parece muito, mas é de propósito: aqui, você só avança quando mostra que aprendeu de verdade. Se não der dessa vez, sem problema. O app mostra os assuntos para revisar, e você pode tentar de novo. E, quando passar, conquista o certificado do nível, com um QR Code que qualquer pessoa pode usar para conferir que ele é verdadeiro.

**Tela:** a tela do mapa de níveis da Destrava, com o degrau "Primeiro Commit" e o botão "Fazer a prova" pulsando. Depois, a tela da prova com o campo "Nome completo" e o aviso "Este nome vai no seu certificado e não poderá ser alterado depois." Em seguida, uma barra de progresso de perguntas, uma delas com um editor de código, rótulo "pelo menos uma de código". Um medidor sobe até "90%", rótulo "nota mínima". Um cartão "Assuntos para revisar" aparece e desliza para o lado, rótulo "não passou? revisa e tenta de novo". Por fim, um certificado ilustrado com o nome em destaque e um QR Code no canto; um celular aponta para o QR Code e mostra "Certificado válido".

---

## Bloco 14 — Seu primeiro site e o próximo degrau

**Fala:**
Para, respira e olha o que você fez. Algumas aulas atrás, você talvez nem soubesse o que era uma tag. Hoje, você planejou, construiu, revisou e salvou um site pessoal inteiro, com links, imagens, listas, tabela, formulário e uma estrutura organizada. Esse é o seu primeiro site. E ele é só o começo. Os exercícios desta aula estão logo abaixo do vídeo, e o último deles é um mini projeto final, para você montar uma página com topo, menu, conteúdo e rodapé. Depois, é a prova. E, no próximo nível, a sua página vai ganhar aparência, com o CSS: cores, fontes, espaços e tudo o que deixa um site bonito. Lembra da casa? A estrutura está de pé. Agora vem o acabamento. Parabéns por chegar até aqui. Até o próximo nível, e bora destravar.

**Tela:** a página pessoal completa aparece no centro, rolando devagar; confetes caem em volta e surge o selo "Meu primeiro site". A lista do que foi feito aparece item por item com checks verdes ("planejei", "construí", "revisei", "salvei"). Botão "Fazer os exercícios" pulsando, com o destaque "mini projeto final no último exercício". Depois, os 5 degraus do curso: o primeiro fica aceso com uma bandeirinha, e o segundo ganha um brilho com o texto "Próximo nível: CSS" e uma paleta de cores ilustrada pintando a página da Ana. Encerramento com o logo da Destrava e o slogan "Destrava sua carreira. Um nível de cada vez."
