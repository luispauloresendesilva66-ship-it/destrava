# Aula 2 — Sua primeira página

**Nível:** Primeiro Commit · **Duração estimada:** ~10 minutos · **Blocos:** 12

## Como este roteiro é usado

- A voz do vídeo é **gerada por IA** a partir do texto em "Fala". Por isso a "Fala" precisa soar natural quando lida em voz alta: frases curtas, sem siglas soltas, com os símbolos de código ditos por extenso.
- O que está em "Tela" é o que o pipeline de vídeo anima (editor da Destrava, prévia do navegador, rótulos, setas, checks). Não é lido pela voz.
- Um áudio por bloco: `bloco01`, `bloco02`... Para corrigir uma fala, gere de novo só aquele bloco.
- Todo o conteúdo de exemplo é fictício (a aluna "Ana"). Nada de marcas, empresas ou sites reais.

---

## Bloco 01 — Abertura

**Fala:**
Olá, que bom te ver de novo. Na aula passada, você descobriu o que é o HTML, entendeu o que é uma tag, com abertura, conteúdo e fechamento, e montou a estrutura básica de uma página, com o head e o body. Hoje a gente vai colocar a mão na massa de verdade. Vamos construir, juntos, uma pequena página "sobre mim". Para não ficar abstrato, eu vou usar como exemplo a Ana, uma pessoa que, assim como você, está aprendendo programação do zero. No caminho, você vai aprender a organizar títulos, escrever parágrafos, quebrar linhas, dar ênfase a uma palavra e deixar recados no código. Abre o editor, se ajeita aí na cadeira, e bora destravar.

**Tela:** logo da Destrava animando → título "Aula 2 — Sua primeira página" → os 5 degraus do curso com o primeiro aceso; ao lado, uma prévia do resultado final da aula (a página "Sobre mim" da Ana) aparece desfocada, com o rótulo "o que a gente vai construir hoje".

---

## Bloco 02 — O ponto de partida

**Fala:**
Toda página começa do mesmo jeito, e você já conhece esse começo. Eu vou escrever a estrutura básica de novo: o DOCTYPE, a tag html com o lang igual a pt-BR, o head e o body. Dentro do head, a meta charset igual a UTF-8, para os acentos funcionarem, e o title. Dessa vez, o título da aba vai ser "Sobre mim". Repara que eu estou escrevendo tudo de novo em vez de copiar e colar. Isso é de propósito. Escrever com as próprias mãos é o que faz essa estrutura grudar na sua memória. Salva o arquivo como index ponto html. A página ainda está em branco, mas a aba já mostra "Sobre mim". Agora é encher o body.

**Tela:** o editor da Destrava à esquerda, a prévia do navegador à direita. O código é digitado linha a linha:
```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <title>Sobre mim</title>
  </head>
  <body>
  </body>
</html>
```
a linha do `<title>` fica destacada e uma seta a liga à aba do navegador, que mostra "Sobre mim"; o nome `index.html` aparece no topo do editor; a área do body pisca, vazia, com o rótulo "é aqui que a gente vai trabalhar".

---

## Bloco 03 — Seis níveis de título

**Fala:**
O HTML tem seis tags de título: h1, h2, h3, h4, h5 e h6. A letra h vem de heading, que quer dizer título, e o número indica o nível. O h1 é o mais importante, e o h6 é o menos importante. No navegador, cada nível aparece num tamanho diferente: o h1 é o maior, e eles vão diminuindo até o h6. Olha na tela. Mas atenção, porque aqui mora um detalhe que separa quem só copia código de quem entende o que está fazendo. Esses números não existem por causa do tamanho da letra. Eles existem para mostrar a hierarquia do conteúdo, como os capítulos e subcapítulos de um livro. É isso que a gente vai ver agora.

**Tela:** as seis linhas são digitadas uma embaixo da outra no editor:
```html
<h1>Título nível 1</h1>
<h2>Título nível 2</h2>
<h3>Título nível 3</h3>
<h4>Título nível 4</h4>
<h5>Título nível 5</h5>
<h6>Título nível 6</h6>
```
na prévia, os títulos aparecem em escadinha, do maior para o menor; uma seta vertical ao lado, de cima para baixo, com o rótulo "mais importante → menos importante".

---

## Bloco 04 — Hierarquia: um h1 por página

**Fala:**
Pensa num livro. Ele tem um título na capa, depois capítulos, e dentro dos capítulos, seções. Na página é igual. O h1 é o título da capa: o assunto principal da página. Por isso, a regra é usar um h1 por página. Na página da Ana, o h1 vai ser "Olá, eu sou a Ana". Depois vêm os capítulos, com h2: "Quem sou eu" e "O que estou aprendendo". E se um capítulo tiver uma parte menor dentro dele, aí entra o h3. E tem uma segunda regra, tão importante quanto a primeira: nunca escolha um título pelo tamanho. Quer uma letra menor? Isso é trabalho do CSS, que você vai aprender logo mais. O número do título diz a importância, não a aparência.

**Tela:** um livro estilizado se abre: "capa = h1", "capítulos = h2", "seções = h3". Depois, no editor, o body da Ana recebe:
```html
<h1>Olá, eu sou a Ana</h1>
<h2>Quem sou eu</h2>
<h2>O que estou aprendendo</h2>
```
à direita, um diagrama em árvore desenha o h1 no topo e os dois h2 pendurados nele. Por último, um exemplo com dois `<h1>` na mesma página recebe um "x" vermelho, e um `<h4>` escolhido "porque é pequenininho" recebe outro "x" vermelho, com o rótulo "tamanho é com o CSS".

---

## Bloco 05 — Parágrafos

**Fala:**
Agora vamos dar conteúdo para esses títulos. Texto corrido vai dentro da tag p, de parágrafo, que você já conhece. Embaixo de "Quem sou eu", eu vou escrever um parágrafo: "Trabalho no atendimento de uma loja e estou fazendo a minha transição para a área de tecnologia." E logo depois, um segundo parágrafo: "Nas horas livres, gosto de cozinhar e de andar de bicicleta." Repara no navegador: cada parágrafo vira um bloco de texto separado, com um espacinho entre eles. Você não precisou fazer nada para esse espaço aparecer. O navegador entende que um parágrafo acabou e outro começou. Uma ideia, um parágrafo. É assim que se escreve um texto fácil de ler, na página e fora dela.

**Tela:** no editor, abaixo do `<h2>Quem sou eu</h2>`, são digitados:
```html
<p>Trabalho no atendimento de uma loja e estou fazendo a minha transição para a área de tecnologia.</p>
<p>Nas horas livres, gosto de cozinhar e de andar de bicicleta.</p>
```
as duas linhas ficam destacadas; na prévia, os dois parágrafos aparecem e uma chave lateral marca o espaço entre eles, com o rótulo "o navegador separa sozinho".

---

## Bloco 06 — O navegador ignora espaços extras

**Fala:**
Agora uma coisa que costuma surpreender quem está começando. Imagina que eu aperte a barra de espaço dez vezes no meio de uma frase. Ou que eu dê vários enters, deixando linhas em branco dentro do parágrafo. O que você acha que aparece no navegador? Nada disso. O navegador junta todos os espaços seguidos, e também as quebras de linha, e transforma tudo em um único espaço. Isso tem até um lado bom: é por causa dessa regra que você pode organizar o seu código com indentação e linhas em branco, sem bagunçar a página. Mas também quer dizer que apertar enter no editor não quebra a linha na tela. Para isso, existe uma tag própria.

**Tela:** no editor, um parágrafo é digitado com muitos espaços e duas linhas em branco no meio: `<p>Eu          gosto de       programar.</p>`; os espaços extras ficam marcados com pontinhos cinza. Na prévia, a frase aparece normal: "Eu gosto de programar." Uma animação mostra os espaços "encolhendo" até virar um só, com o rótulo "vários espaços = um espaço".

---

## Bloco 07 — Quebra de linha com br

**Fala:**
A tag que quebra a linha é a br, do inglês break, que quer dizer quebra. Ela é diferente das outras que você viu até agora, porque não tem conteúdo e nem tag de fechamento: você escreve só sinal de menor, br, sinal de maior, e pronto. Ela é útil quando a quebra de linha faz parte do conteúdo, como num endereço, num poema, ou na assinatura da Ana: o nome numa linha, e a cidade na linha de baixo. Agora, o cuidado: não use o br para criar espaço entre blocos. Empilhar três, quatro br para afastar uma coisa da outra é um erro clássico. Se é outro assunto, é outro parágrafo. E se você só quer mais espaço, isso é trabalho do CSS.

**Tela:** no editor, ao final do body, é digitado:
```html
<p>Ana Souza<br>Cidade Exemplo</p>
```
o `<br>` fica destacado com o rótulo "sem fechamento"; na prévia, o nome e a cidade aparecem em duas linhas. Depois, um exemplo com `<br><br><br><br>` empilhados recebe um "x" vermelho; ao lado, a versão com dois `<p>` recebe um check verde.

---

## Bloco 08 — Ênfase com strong e em

**Fala:**
Às vezes, uma palavra precisa de mais destaque. Para isso existem duas tags. A strong marca algo importante, sério, que a pessoa não pode deixar passar. E a em marca uma ênfase, aquela palavra que você falaria com uma entonação diferente. No navegador, a strong aparece em negrito, e a em aparece em itálico. Mas, de novo: o que importa é o significado, não a aparência. Quem usa um leitor de tela, que é um programa que lê a página em voz alta, percebe essa diferença. Na página da Ana, embaixo de "O que estou aprendendo", vai assim: "Estou aprendendo HTML, com HTML marcado como importante, e estou gostando muito", com "muito" em ênfase.

**Tela:** no editor, abaixo do `<h2>O que estou aprendendo</h2>`, é digitado:
```html
<p>Estou aprendendo <strong>HTML</strong> e estou gostando <em>muito</em>.</p>
```
`<strong>` fica destacado em uma cor, com o rótulo "importante"; `<em>` em outra cor, com o rótulo "ênfase". Na prévia, "HTML" aparece em negrito e "muito" em itálico; um ícone de alto-falante ao lado mostra uma onda sonora mais forte em cima das duas palavras.

---

## Bloco 09 — Comentários no código

**Fala:**
Agora uma ferramenta que você vai usar a carreira inteira: o comentário. Um comentário é um recado que você deixa no código, para você mesmo ou para outra pessoa, e que o navegador não mostra na página. Ele começa com sinal de menor, ponto de exclamação e dois tracinhos. E termina com dois tracinhos e sinal de maior. Tudo o que estiver no meio é ignorado pelo navegador. Na página da Ana, eu vou deixar um comentário antes de cada seção, dizendo o que ela é. Parece bobagem numa página pequena, mas quando o código crescer, esses recados vão te poupar muito tempo. Só um cuidado: quem abrir o código-fonte consegue ler. Então nada de senha ou segredo em comentário.

**Tela:** no editor, são digitados acima das seções:
```html
<!-- Seção: apresentação -->
<!-- Seção: o que estou aprendendo -->
```
as partes `<!--` e `-->` ficam destacadas com os rótulos "começa" e "termina"; os comentários aparecem em cinza no editor; na prévia, nada muda, e um rótulo aponta "o navegador não mostra". Por fim, um comentário com "senha: 1234" recebe um "x" vermelho.

---

## Bloco 10 — A página da Ana completa

**Fala:**
Vamos olhar tudo junto. No topo, o h1 com o título principal: "Olá, eu sou a Ana". Depois, um comentário marcando a apresentação, o h2 "Quem sou eu" e os dois parágrafos. Em seguida, outro comentário, o h2 "O que estou aprendendo" e o parágrafo com o strong e o em. E, no final, a assinatura, com o nome e a cidade separados por um br. Repara na indentação: tudo o que está dentro do body está um pouco mais para a direita. Salva e olha o navegador. Uma página simples, mas organizada, com hierarquia e com significado. Isso é exatamente o que se espera de um HTML bem escrito. E foi você que escreveu.

**Tela:** o editor mostra o body completo, rolando devagar enquanto cada parte é destacada em sincronia com a fala:
```html
<body>
  <h1>Olá, eu sou a Ana</h1>

  <!-- Seção: apresentação -->
  <h2>Quem sou eu</h2>
  <p>Trabalho no atendimento de uma loja e estou fazendo a minha transição para a área de tecnologia.</p>
  <p>Nas horas livres, gosto de cozinhar e de andar de bicicleta.</p>

  <!-- Seção: o que estou aprendendo -->
  <h2>O que estou aprendendo</h2>
  <p>Estou aprendendo <strong>HTML</strong> e estou gostando <em>muito</em>.</p>

  <p>Ana Souza<br>Cidade Exemplo</p>
</body>
```
ao lado, a prévia do navegador com a página pronta; confete discreto verde quando a página aparece inteira.

---

## Bloco 11 — O erro mais comum

**Fala:**
Agora o erro que aparece muito nesta fase: cruzar as tags. Olha esse exemplo. Eu abri o strong, depois abri o em, e na hora de fechar, fechei o strong primeiro. As tags ficaram cruzadas, uma por cima da outra. O navegador tenta consertar sozinho, mas o resultado pode não ser o que você queria, e o seu código fica confuso para quem for ler. A regra é: a última tag que você abriu é a primeira que você fecha. Pensa em caixas: se você colocou uma caixa pequena dentro de uma caixa grande, precisa fechar a pequena antes de fechar a grande. Abriu strong, abriu em? Então fecha em, e depois fecha strong.

**Tela:** no editor, o código `<strong><em>muito</strong></em>` com setas coloridas ligando cada abertura ao seu fechamento; as setas se cruzam e recebem um "x" vermelho. Depois, duas caixas animadas, uma pequena dentro de uma grande, fechando na ordem certa. Por fim, o código corrigido `<strong><em>muito</em></strong>`, com as setas uma dentro da outra, sem se cruzar, e um check verde.

---

## Bloco 12 — Resumo e próximo degrau

**Fala:**
Vamos recapitular o que você aprendeu hoje. Os títulos vão do h1 ao h6 e mostram a hierarquia do conteúdo, com um h1 por página, e nunca escolhidos pelo tamanho. Texto corrido vai em parágrafos, com a tag p. O navegador ignora os espaços e as linhas extras, e a br quebra a linha quando a quebra faz parte do conteúdo. A strong marca o que é importante, e a em marca a ênfase. E os comentários guardam recados que só aparecem no código. Agora é a sua vez: os exercícios estão logo abaixo do vídeo. Na próxima aula, a página da Ana vai ganhar links e imagens. Até lá, e bora destravar.

**Tela:** lista do resumo aparecendo item por item com checks verdes ("h1 a h6 e hierarquia", "p", "espaços extras", "br", "strong e em", "comentários"); botão "Fazer os exercícios" pulsando; prévia da próxima aula com os ícones de link e de imagem e o texto "Aula 3 — Links e imagens"; encerramento com o logo da Destrava e o slogan "Destrava sua carreira. Um nível de cada vez."
