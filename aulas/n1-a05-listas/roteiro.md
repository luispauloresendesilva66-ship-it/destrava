# Aula 5 — Listas

**Nível:** Primeiro Commit · **Duração estimada:** ~8 minutos · **Blocos:** 10

## Como este roteiro é usado

- A voz do vídeo é **gerada por IA** a partir do texto em "Fala". Por isso a "Fala" precisa soar natural quando lida em voz alta: frases curtas, sem siglas soltas, com os símbolos de código ditos por extenso.
- O que está em "Tela" é o que o pipeline de vídeo anima (editor da Destrava, prévia do navegador, rótulos, setas, checks). Não é lido pela voz.
- Um áudio por bloco: `bloco01`, `bloco02`... Para corrigir uma fala, gere de novo só aquele bloco.
- Todo o conteúdo de exemplo é fictício (a aluna "Ana"). Nada de marcas, empresas ou sites reais: os endereços usam o domínio reservado `example.com`.
- Na "Fala", as tags de lista são ditas letra por letra, para a voz não tropeçar: `ul` = "u éle", `ol` = "ó éle", `li` = "éle í".

---

## Bloco 01 — Abertura

**Fala:**
Olá, que bom te ver de novo. Na aula passada, a página da Ana ganhou imagens: a foto de perfil, com um alt bem escrito e o tamanho na proporção certa, e a miniatura do projeto de receitas, com legenda e tudo. Hoje, a gente vai organizar as coisas. Pensa em quantas listas você vê num dia só: a lista de compras, o passo a passo de uma receita, o menu de um site. Em HTML, as listas têm tags próprias. Você vai aprender a fazer listas com marcadores e listas numeradas, a escolher entre uma e outra, e a colocar uma lista dentro de outra. Abre o editor e bora destravar.

**Tela:** logo da Destrava animando → título "Aula 5 — Listas" → os 5 degraus do curso com o primeiro aceso; ao lado, a página "Sobre mim" da Ana, da aula passada, com o avatar ilustrado e o texto; três cartõezinhos surgem ao redor: um bloco de notas com "arroz, feijão, café", um cartão de receita com "1, 2, 3" e uma barra de menu com três links. Rótulo: "o que a gente vai construir hoje".

---

## Bloco 02 — Por que não só uma linha embaixo da outra

**Fala:**
Primeiro, por que não escrever os itens um embaixo do outro, cada um na sua linha? Lembra que o navegador ignora as quebras de linha do código? Se você digitar arroz, feijão e café em três linhas, eles aparecem grudados, numa linha só. Dava para resolver com o br, mas aí o navegador não sabe que aquilo é uma lista. Ele vê só um texto picado. E quem usa leitor de tela perde uma informação importante. Com as tags de lista, o leitor de tela avisa: lista, três itens. A pessoa já sabe o tamanho da lista antes de começar a ouvir. Mais uma vez, o HTML não é sobre aparência. É sobre dizer o que cada coisa é.

**Tela:** no editor, três linhas soltas: `Arroz`, `Feijão`, `Café`; na prévia, elas aparecem grudadas: "Arroz Feijão Café", com "x" vermelho e o rótulo "o navegador ignora as quebras de linha". Depois, as linhas ganham `<br>` e se separam na prévia, mas uma lupa passa por cima com o rótulo "parece lista, mas não é". Por fim, o ícone de alto-falante com um balão de fala: "Lista, 3 itens", com check verde e o rótulo "HTML diz o que cada coisa é".

---

## Bloco 03 — Lista com marcadores: ul e li

**Fala:**
A lista mais comum é a lista com marcadores, aquelas bolinhas na frente de cada item. A tag é a u éle, de unordered list, que quer dizer lista não ordenada. Ela é a caixa que guarda a lista inteira. E cada item vai dentro de uma tag éle í, de list item, item da lista. Vamos fazer a lista de compras da Ana. Abre a u éle. Dentro dela, uma éle í com arroz, e fecha a éle í. Outra éle í com feijão. E mais uma com café. Por fim, fecha a u éle. No navegador, aparecem três itens, cada um na sua linha, com uma bolinha na frente. E as bolinhas, o navegador coloca sozinho.

**Tela:** a sigla "unordered list" aparece, com "ul = lista não ordenada" destacado; depois "list item", com "li = item da lista". No editor, é digitado linha por linha:
```html
<ul>
  <li>Arroz</li>
  <li>Feijão</li>
  <li>Café</li>
</ul>
```
uma caixa tracejada envolve o `<ul>` inteiro, com o rótulo "a caixa da lista"; cada `<li>` pisca quando é digitado, com o rótulo "um item". Na prévia, os três itens aparecem com bolinhas; uma setinha aponta para uma bolinha, com o rótulo "o navegador coloca sozinho".

---

## Bloco 04 — Lista numerada: ol

**Fala:**
Agora, uma receita. No passo a passo, a ordem importa: não dá para assar o bolo antes de misturar a massa. Para isso existe a ó éle, de ordered list, lista ordenada. A diferença é só a caixa: os itens continuam sendo éle í. A Ana escreve a receita de um bolo de caneca. Abre a ó éle. Primeiro item: misture os ingredientes na caneca. Segundo: leve ao micro-ondas por três minutos. Terceiro: espere esfriar e sirva. Fecha a ó éle. No navegador, cada passo aparece com um número na frente: um, dois, três. E o melhor: você não escreve os números. Se a Ana colocar um passo novo no meio, a numeração se ajusta sozinha.

**Tela:** "ordered list" aparece, com "ol = lista ordenada" destacado. No editor:
```html
<ol>
  <li>Misture os ingredientes na caneca</li>
  <li>Leve ao micro-ondas por três minutos</li>
  <li>Espere esfriar e sirva</li>
</ol>
```
o `<ol>` e o `</ol>` ficam destacados, com o rótulo "só a caixa muda"; os `<li>` ficam com o rótulo "itens: os mesmos de sempre". Na prévia, os passos aparecem numerados 1, 2, 3. Depois, um `<li>Polvilhe açúcar por cima</li>` é inserido entre o segundo e o terceiro; na prévia, os números se reorganizam sozinhos para 1, 2, 3, 4, com check verde e o rótulo "numeração automática".

---

## Bloco 05 — Quando usar cada uma

**Fala:**
E como saber qual usar? Faça uma pergunta: se eu trocar os itens de lugar, muda alguma coisa? Na lista de compras, tanto faz pegar o café antes ou depois do arroz. A ordem não importa, então é u éle. Na receita, trocar os passos estraga o bolo. A ordem importa, então é ó éle. Outros exemplos: os seus hobbies, as linguagens que você quer aprender, os itens de uma mala. Tudo isso é u éle. Um ranking dos seus filmes favoritos, as instruções para instalar um programa, os passos de um tutorial. Tudo isso é ó éle. Repara que a escolha não é pela aparência, bolinha ou número. É pelo significado.

**Tela:** uma pergunta grande no centro: "Se eu trocar a ordem, muda alguma coisa?". À esquerda, a lista de compras tem os itens embaralhados por uma animação e continua com check verde, rótulo "não muda → `<ul>`". À direita, os passos da receita são embaralhados e um bolo ilustrado desmorona, com "x" vermelho, rótulo "muda → `<ol>`". Depois, duas colunas de cartões: `<ul>` com "hobbies", "linguagens para aprender", "itens da mala"; `<ol>` com "ranking de filmes", "instalar um programa", "passos de um tutorial". Rótulo final: "escolha pelo significado, não pela aparência".

---

## Bloco 06 — Uma lista dentro da outra

**Fala:**
Às vezes, um item tem os seus próprios itens. Na lista de compras, a Ana quer separar as frutas: banana, maçã e laranja. Para isso, você coloca uma lista dentro de outra. O detalhe que mais confunde é onde a lista de dentro entra. Ela vai dentro de uma éle í, e não solta dentro da u éle. Então fica assim: a éle í começa com a palavra frutas. Logo depois, ainda dentro dela, abre uma nova u éle, com três éle í: banana, maçã e laranja. Fecha essa u éle, e só então fecha a éle í de frutas. No navegador, as frutas aparecem mais para dentro, com outro marcador. E dá para misturar: uma ó éle dentro de uma u éle, por exemplo.

**Tela:** no editor, a lista de compras ganha um item novo, digitado linha por linha:
```html
<ul>
  <li>Arroz</li>
  <li>Feijão</li>
  <li>Frutas
    <ul>
      <li>Banana</li>
      <li>Maçã</li>
      <li>Laranja</li>
    </ul>
  </li>
  <li>Café</li>
</ul>
```
uma caixa tracejada envolve o `<li>Frutas ... </li>`, com o rótulo "a lista de dentro mora dentro do item"; o `</ul>` interno e o `</li>` de frutas piscam um depois do outro, com o rótulo "fecha a lista, depois o item". Ao lado, uma versão errada com o `<ul>` interno logo depois de `</li>` recebe "x" vermelho. Na prévia, as frutas aparecem recuadas, com marcador de círculo vazado, rótulo "outro nível, outro marcador".

---

## Bloco 07 — Listas na página da Ana

**Fala:**
Agora, vamos levar isso para a página da Ana. Lembra da seção O que estou aprendendo? Até agora, era um parágrafo. Ela vira uma u éle com três itens: HTML, CSS e JavaScript. E dá para ir além: dentro de uma éle í pode ir quase tudo que você já aprendeu. Um strong, para destacar, ou um link. Na página de projetos, a Ana cria a lista dos projetos dela, e cada item tem um link. O primeiro leva para o site de receitas. Lembra que o texto do link precisa dizer para onde ele leva? Continua valendo. E, para o código ficar fácil de ler, deixe cada éle í um pouquinho mais para dentro, com espaços na frente. É a indentação.

**Tela:** no `index.html`, abaixo do `<h2 id="aprendendo">O que estou aprendendo</h2>`, o parágrafo antigo é apagado e no lugar é digitado:
```html
<ul>
  <li><strong>HTML</strong>, começando agora</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>
```
o `<strong>` dentro do primeiro item fica destacado, com o rótulo "dentro do li cabe outra tag". Depois, no `projetos.html`:
```html
<ul>
  <li><a href="https://receitas.example.com">Site de receitas</a></li>
  <li>Página pessoal (em construção)</li>
</ul>
```
na prévia, o primeiro item aparece azul e sublinhado. Por fim, os espaços antes de cada `<li>` ficam destacados em amarelo, com o rótulo "indentação: o código fica fácil de ler".

---

## Bloco 08 — Os erros mais comuns

**Fala:**
Agora, os erros que mais aparecem com listas. O primeiro: a éle í solta, fora de uma u éle ou de uma ó éle. O navegador até mostra alguma coisa, mas o item fica sem lista, e o leitor de tela não entende. Toda éle í mora dentro de uma lista. O segundo é o contrário: texto ou outra tag direto dentro da u éle, sem éle í. Dentro da caixa da lista, só entram itens. O terceiro: esquecer de fechar. Sem o fechamento da u éle, o resto da página pode acabar dentro da lista, todo deslocado. E, nas listas aninhadas, fechar na ordem errada. A regra é a de sempre: o que abriu por último fecha primeiro.

**Tela:** três cartões aparecem em sequência, cada um com o erro e a correção:
1. `<li>Arroz</li>` sozinho, sem lista em volta, com "x" vermelho e o rótulo "li solto"; embaixo, o mesmo item dentro de `<ul>...</ul>`, com check verde e o rótulo "todo li mora numa lista".
2. `<ul>Arroz<li>Feijão</li></ul>`, com o "Arroz" solto em vermelho e "x"; embaixo, `<ul><li>Arroz</li><li>Feijão</li></ul>`, com check verde e o rótulo "na caixa, só itens".
3. uma lista sem `</ul>`; na prévia, o parágrafo seguinte aparece recuado, colado na lista, com "x" vermelho; o `</ul>` é digitado e o parágrafo volta para o lugar, com check verde. Ao lado, a lista aninhada com `</li>` antes do `</ul>` interno recebe "x"; a ordem se corrige com check verde e o rótulo "abriu por último, fecha primeiro".
No fim, os cartões encolhem para uma checklist: "li dentro da lista", "só li na caixa", "fechar tudo, na ordem".

---

## Bloco 09 — As listas escondidas na web

**Fala:**
Uma curiosidade: as listas estão em muito mais lugares do que parece. Sabe o menu de um site, com os links Início, Projetos e Contato? Muitas vezes, por baixo, é uma u éle com uma éle í para cada link. Só que o CSS tira as bolinhas e coloca os itens lado a lado. Você vai aprender a fazer isso nos próximos níveis. Por enquanto, guarde a ideia: o HTML diz que é uma lista, e o visual vem depois.

**Tela:** uma barra de menu ilustrada no topo de uma página fictícia, com "Início · Projetos · Contato" lado a lado. Uma lente de raio-x passa por cima e revela o código:
```html
<ul>
  <li><a href="index.html">Início</a></li>
  <li><a href="paginas/projetos.html">Projetos</a></li>
  <li><a href="mailto:ana@example.com">Contato</a></li>
</ul>
```
a lente se afasta e os itens se empilham, com bolinhas, como uma lista comum; depois voltam para o lado a lado, com uma etiqueta "CSS" e o rótulo "o visual vem depois (próximos níveis)".

---

## Bloco 10 — Resumo e próximo degrau

**Fala:**
Vamos recapitular. A u éle é a lista não ordenada, com marcadores, para quando a ordem não importa. A ó éle é a lista ordenada, numerada, para quando a ordem importa. Nas duas, cada item é uma éle í, e toda éle í mora dentro de uma lista. Para colocar uma lista dentro de outra, ela entra dentro de uma éle í. E feche tudo, na ordem certa. Agora é a sua vez: os exercícios estão logo abaixo do vídeo. Na próxima aula, chegam as tabelas, para mostrar dados em linhas e colunas. Até lá, e bora destravar.

**Tela:** lista do resumo aparecendo item por item com checks verdes ("ul: ordem não importa", "ol: ordem importa", "li: cada item, sempre dentro de uma lista", "lista dentro de lista: dentro do li", "fechar tudo, na ordem certa"); botão "Fazer os exercícios" pulsando; prévia da próxima aula com o ícone de uma tabela e o texto "Aula 6 — Tabelas"; encerramento com o logo da Destrava e o slogan "Destrava sua carreira. Um nível de cada vez."
