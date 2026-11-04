# Aula 7 — Block e inline

**Nível:** Primeira Demão · **Duração estimada:** ~9 minutos · **Blocos:** 10

## Como este roteiro é usado

- A voz do vídeo é **gerada por IA** a partir do texto em "Fala". Por isso a "Fala" precisa soar natural quando lida em voz alta: frases curtas, sem siglas soltas, com os símbolos de código ditos por extenso.
- O que está em "Tela" é o que o pipeline de vídeo anima (editor da Destrava, prévia do navegador, rótulos, setas, checks). Não é lido pela voz.
- Um áudio por bloco: `bloco01`, `bloco02`... Para corrigir uma fala, gere de novo só aquele bloco.
- Todo o conteúdo de exemplo é fictício (a aluna "Ana"). Nada de marcas, empresas ou sites reais: os endereços usam o domínio reservado `example.com`. Ferramentas citadas de forma genérica ("as ferramentas de desenvolvedor do navegador", "inspecionar"), sem nomes de produtos.
- A página da Ana é a mesma da aula 9 do nível 1 (com a foto `imagens/foto-ana.jpg`, de 200 por 200, dentro da seção "Sobre mim", e o menu `nav` com uma lista `ul` de dois links), já ligada ao `estilo.css`, com tudo o que foi feito até a aula 6: `*` com `box-sizing: border-box;`; `body` com fundo `#fdf6e3` (creme), `font-family: Verdana, Arial, sans-serif;`, `font-size: 1.125rem;` e `line-height: 1.6;`; `p` com `color: #333333`; `h1, h2` com `color: #264653` (azul-petróleo), `font-family: Georgia, "Times New Roman", serif;` e `line-height: 1.2;`; `h1` com `text-align: center;` e `font-size: 2rem;`; `h2` com `font-size: 1.5rem;`; `.destaque` com `font-weight: bold;`, `padding: 8px 16px;` e `border-left: 4px solid #b5452c;`; `.destaque, nav a` com `color: #b5452c` (terracota); `nav a` sem sublinhado e em negrito; `section` com `background-color: #ffffff;`, `padding: 16px;`, `border: 2px solid #264653;`, `border-radius: 8px;` e `margin-bottom: 24px;`; `main` com `max-width: 720px;`; `img` com `border-radius: 50%;`, `max-width: 100%;` e `height: auto;`; `footer` com fundo `#264653` e `footer p` com `color: #ffffff`. Nesta aula não entra nenhuma cor nova.
- Na "Fala", os termos de CSS e as tags são escritos do jeito que se fala, com as mesmas grafias das aulas anteriores: `CSS` = "cê ésse ésse", `px` = "pê xis", `h1` = "agá um", `p` = "pê", `nav` = "név", `a` = "é", `ul` = "u éle", `li` = "éle í", `section` = "sécchon", `main` = "mêin", `div` = "dív" (do nível 1), `padding` = "péding", `margin` = "márdjin", `margin-left` = "márdjin léft", `width` = "uídth", `height` = "rêit", `max-width` = "méx uídth", `text-align` = "técst alái", `center` = "cênter", `none` = "nân", `auto` = "óto". Novas nesta aula: `display` = "displêi", `block` = "blóc", `inline` = "inláin", `inline-block` = "inláin blóc", `span` = "spén". Os números com unidade são ditos por extenso: `8px` = "oito pê xis", `12px` = "doze pê xis", `200px` = "duzentos pê xis", `720px` = "setecentos e vinte pê xis"; o `0` é dito "zero". Os símbolos são ditos por extenso: `{` = "abre chaves", `}` = "fecha chaves", `:` = "dois pontos", `;` = "ponto e vírgula". Seguem com o nome normal: HTML, body, img, strong, estilo ponto cê ésse ésse. Os termos em inglês "block" e "inline", quando aparecem como rótulo, ficam só na "Tela"; na "Fala", eles são ditos "elemento de bloco" e "elemento em linha", ou com a grafia acima quando são o valor do displêi.

---

## Bloco 01 — Abertura

**Fala:**
Olá, seja bem-vindo à aula sete da Primeira Demão. Na aula passada, a Ana deu um teto para a largura do mêin, com méx uídth de setecentos e vinte pê xis. As linhas ficaram boas de ler. Mas o mêin ficou encostado à esquerda, com um espaço vazio do lado direito. E tem outra coisa estranha na página. Os títulos e os parágrafos ocupam a linha toda, um embaixo do outro. Já os links do menu e o negrito ficam no meio do texto, sem quebrar a linha. Por que essa diferença? Hoje, você vai descobrir. Vai conhecer os elementos de bloco e os elementos em linha, a propriedade displêi, que muda esse comportamento, e vai centralizar o mêin da Ana no meio da tela. Abre o editor e bora destravar.

**Tela:** logo da Destrava → título "Aula 7 — Block e inline". Um cartão de revisão mostra `main { max-width: 720px; }` com o rótulo "aula 6: um teto para a largura". Depois, a página da Ana num monitor largo: o `main` encostado à esquerda e um espaço vazio grande à direita, com um ponto de interrogação; rótulo "e o centro?". Em seguida, contornos tracejados aparecem na página: caixas largas em volta do `h1`, dos `p` e das `section`, de ponta a ponta; caixas justas em volta dos links do menu e do texto em negrito. Rótulos: "ocupa a linha toda" e "só o espaço do conteúdo".

---

## Bloco 02 — Elementos de bloco: a linha toda

**Fala:**
Todo elemento do HTML já nasce com um jeito de ocupar espaço. O primeiro jeito é o de bloco. Um elemento de bloco ocupa a linha toda, de uma ponta à outra da caixa mãe, mesmo que o conteúdo seja curtinho. E o próximo elemento sempre começa embaixo dele. Por isso, os blocos se empilham, um em cima do outro, como tijolos numa parede. São de bloco o agá um e os outros títulos, o pê, a sécchon, o mêin, a u éle e a dív. Lembra da dív, do nível um? Ela é uma caixa neutra de bloco. Não quer dizer nada, só serve para agrupar e estilizar. Foi nos elementos de bloco que você usou tudo o que aprendeu até aqui. Uídth, rêit, péding e márdjin funcionam do jeito que você espera. É por isso que as seções da Ana viraram cartões tão fácil.

**Tela:** uma prévia com um `h1`, dois `p` e uma `div`, cada um com um contorno tracejado azul que vai de uma ponta à outra; rótulo "block: ocupa a linha toda". Um `p` com uma palavra só ("Oi.") mostra a caixa larga mesmo com pouco texto. Setas mostram cada caixa começando embaixo da anterior; animação de tijolos se empilhando, rótulo "empilham, um embaixo do outro". Lista: `h1`, `h2`, `p`, `section`, `main`, `ul`, `div`, com a etiqueta "elementos de bloco". A `div` ganha a etiqueta "caixa neutra de bloco (nível 1)". Por fim, um cartão da Ana com `width`, `padding` e `margin` marcados e checks verdes; rótulo "no bloco, tudo funciona".

---

## Bloco 03 — Elementos em linha e o span

**Fala:**
O segundo jeito é o em linha. Um elemento em linha não quebra a linha. Ele ocupa só o espaço do próprio conteúdo e vai fluindo junto com o texto, como uma palavra numa frase. Quando a linha acaba, ele continua na linha de baixo. São em linha o é, dos links, o strong, a img, e o spén. O spén é o par da dív. A dív é a caixa neutra de bloco, e o spén é a caixa neutra em linha. Ele serve para pegar um pedaço de uma frase e estilizar, sem quebrar nada. Agora, a pegadinha. Num elemento em linha, uídth e rêit não funcionam. O navegador simplesmente ignora. O márdjin em cima e embaixo também não empurra as linhas. E o péding em cima e embaixo até aparece, mas invade a linha de cima e a de baixo. A img é um caso especial: ela é em linha, mas aceita largura e altura. Por isso a foto da Ana tem duzentos por duzentos.

**Tela:** um parágrafo com um link, um `strong` e um `span` no meio do texto; cada um ganha um contorno tracejado laranja, justo em volta das palavras; rótulo "inline: só o espaço do conteúdo". O parágrafo encolhe e o link quebra para a linha de baixo, continuando ali. Lista: `a`, `strong`, `img`, `span`, com a etiqueta "elementos em linha". Lado a lado: `div` ("caixa neutra de bloco") e `span` ("caixa neutra em linha"). Depois, no editor, `span { width: 300px; height: 80px; }` com a prévia sem mudar nada; "x" vermelho, rótulo "inline ignora `width` e `height`". Em seguida, `margin: 20px 0;` num link: nada se mexe; e `padding: 20px 0;` num link com fundo: o fundo invade as linhas de cima e de baixo. Por fim, a foto da Ana com a etiqueta "`img`: inline, mas aceita largura e altura".

---

## Bloco 04 — A propriedade display

**Fala:**
E se você quiser mudar o jeito de um elemento? Para isso existe a propriedade displêi. Ela tem quatro valores que você precisa conhecer. Displêi, dois pontos, blóc, transforma o elemento num bloco. Ele passa a ocupar a linha toda e aceita uídth e rêit. Displêi, dois pontos, inláin, faz o contrário: o elemento passa a fluir na linha. O terceiro é o meio-termo, o inláin blóc. O elemento fica na linha, ao lado do texto, mas aceita uídth, rêit, péding e márdjin como um bloco. É o melhor dos dois mundos. E o quarto é o nân. Displêi, dois pontos, nân, esconde o elemento. Ele some da página, e o espaço dele também. Atenção: some para todo mundo, inclusive para quem usa leitor de tela. Por isso, nunca use nân em conteúdo que as pessoas precisam ler. E para saber o displêi de qualquer elemento, clica com o botão direito, escolhe inspecionar, e procura o displêi nos estilos calculados.

**Tela:** quatro cartões, um por valor, cada um com a mesma frase e um `span` destacado:
1. `display: block;` → o `span` vai para uma linha só dele, de ponta a ponta; rótulo "vira bloco".
2. `display: inline;` → um `p` passa a ficar na mesma linha do vizinho; rótulo "vira linha".
3. `display: inline-block;` → o `span` fica na linha, mas com `width`, `padding` e `margin` funcionando, sem invadir as linhas vizinhas; rótulo "na linha, mas com medidas de bloco".
4. `display: none;` → o `span` some e o texto ao redor fecha o espaço; rótulo "esconde: some para todo mundo". Um aviso pequeno: "leitor de tela também não lê: não esconda conteúdo importante".
Depois, as ferramentas de desenvolvedor do navegador abertas (genéricas): clique com o botão direito no `h1` → "Inspecionar" → aba de estilos calculados, com a linha `display: block` destacada; depois, num link, `display: inline`. Rótulo: "inspecionar mostra o `display`".

---

## Bloco 05 — O menu da Ana com área de clique maior

**Fala:**
Vamos usar isso no menu da Ana. Hoje, os dois links estão um embaixo do outro, porque cada éle í da lista é um bloco. E o link é pequeno: só dá para clicar em cima das letras. No celular, com o dedo, isso é difícil. Primeiro, os itens lado a lado. Név, espaço, éle í, abre chaves, displêi, dois pontos, inláin, ponto e vírgula, fecha chaves. Os itens da lista passam a fluir na linha, e as bolinhas somem. Agora, a área de clique. Név, espaço, é, abre chaves, displêi, dois pontos, inláin blóc, ponto e vírgula, e péding, dois pontos, oito pê xis, espaço, doze pê xis, ponto e vírgula, fecha chaves. Oito em cima e embaixo, doze nos lados. Com o inláin blóc, o péding empurra as coisas em volta, e a área em que dá para clicar fica bem maior. Na próxima aula, esse menu fica ainda melhor.

**Tela:** o menu da Ana na prévia: "Sobre mim" e "Fale comigo" um embaixo do outro, com bolinhas; cada `li` com um contorno azul de ponta a ponta, rótulo "`li` é bloco: empilha". Um dedo tenta tocar o link e erra por pouco; a área clicável aparece justa em volta das letras, rótulo "área de clique pequena". No editor:
```css
nav li {
  display: inline;
}
```
os dois itens sobem para a mesma linha e as bolinhas somem; check verde. Depois:
```css
nav a {
  display: inline-block;
  padding: 8px 12px;
}
```
a área clicável de cada link cresce (destacada em terracota clarinho), com as medidas `8px` em cima e embaixo e `12px` dos lados; o dedo agora acerta fácil, check verde. Rótulo: "`inline-block` + `padding` = área de clique maior". Etiqueta pequena: "aula 8: menu com flexbox".

---

## Bloco 06 — Centralizar uma caixa: margin zero auto

**Fala:**
Agora, a promessa da aula passada: centralizar o mêin. Mêin, abre chaves, márdjin, dois pontos, zero, espaço, óto, ponto e vírgula, fecha chaves. Lembra da aula cinco? Com dois valores, o primeiro vale para cima e embaixo, e o segundo para os lados. Então, zero em cima e embaixo, e óto na esquerda e na direita. O óto quer dizer: navegador, faz a conta para mim. Ele pega o espaço que sobra ao lado da caixa e divide igualzinho entre os dois lados. Resultado: o mêin fica no meio da tela. Mas tem uma condição. A caixa precisa de uma largura menor que a da mãe, com uídth ou com méx uídth. Sem isso, um bloco ocupa a linha toda, não sobra espaço nenhum para dividir, e nada acontece. No caso da Ana, a méx uídth de setecentos e vinte já está lá. Numa tela larga, o mêin para em setecentos e vinte e vai para o meio. No celular, ele ocupa a tela toda.

**Tela:** o `main` da Ana encostado à esquerda num monitor largo. No editor, a regra `main` ganha a segunda linha:
```css
main {
  max-width: 720px;
  margin: 0 auto;
}
```
o cartão da aula 5 aparece rapidinho: "dois valores: cima/embaixo, lados". Sobre o `0 auto`, as etiquetas "`0` = cima e embaixo" e "`auto` = esquerda e direita". Na prévia, o espaço vazio à direita se divide em duas partes iguais, com setas do mesmo tamanho dos dois lados, e o `main` desliza para o meio; check verde, rótulo "`auto`: divide o espaço que sobra". Depois, a mesma regra sem a `max-width`: o `main` continua de ponta a ponta, sem espaço para dividir; "x" vermelho, rótulo "sem largura, não centraliza". Por fim, a prévia alterna entre o computador (centralizado em `720px`) e o celular (tela toda).

---

## Bloco 07 — Centralizar o texto ou centralizar a caixa

**Fala:**
Agora, uma confusão muito comum. Centralizar o texto e centralizar a caixa são coisas diferentes. O técst alái, cênter, que a Ana usa no agá um desde a aula quatro, centraliza o que está dentro da caixa. O texto, os links e as outras coisas em linha vão para o meio. Mas a caixa continua do mesmo tamanho e no mesmo lugar. Já o márdjin zero óto move a própria caixa de bloco para o meio. O conteúdo dela continua alinhado à esquerda. Uma pergunta ajuda a decidir. Você quer mexer no que está dentro, ou na caixa inteira? Dentro, é técst alái. A caixa inteira, é márdjin óto, com uma largura definida. E os dois podem andar juntos. No mêin da Ana, a caixa vai para o meio com o márdjin, e o título lá dentro continua centralizado pelo técst alái.

**Tela:** duas prévias lado a lado com a mesma caixa estreita (contorno tracejado) e um parágrafo dentro. Esquerda: `text-align: center;` → o texto vai para o meio, a caixa continua encostada à esquerda; rótulo "`text-align`: centraliza o que está dentro". Direita: `width: 300px; margin: 0 auto;` → a caixa vai para o meio, o texto continua alinhado à esquerda dentro dela; rótulo "`margin: 0 auto`: centraliza a caixa". Entre elas, a pergunta: "dentro ou a caixa inteira?". Por fim, a página da Ana: o `main` centralizado e o `h1` com o texto centralizado, com as duas etiquetas ao mesmo tempo.

---

## Bloco 08 — A foto da Ana e o espacinho misterioso

**Fala:**
Lembra que a img é um elemento em linha? Isso causa um efeito curioso. Repara embaixo da foto da Ana. Tem um espacinho, de poucos pê xis, entre a foto e o que vem depois. Não é márdjin, nem péding. Como a imagem fica numa linha de texto, o navegador reserva embaixo dela o espaço das letras que descem, como a perninha do gê e do pê. A solução é transformar a imagem num bloco. Img, abre chaves, displêi, dois pontos, blóc, ponto e vírgula, fecha chaves. O espacinho some. E tem um bônus. Como a foto agora é um bloco e tem uídth de duzentos pê xis, dá para centralizar ela também, com márdjin zero óto. Não é obrigatório, fica a seu gosto. Agora, salva o estilo ponto cê ésse ésse e abre a prévia. O menu está em linha, com links fáceis de clicar, o mêin está no meio da tela, e a foto encaixa certinho no cartão.

**Tela:** zoom embaixo da foto da Ana: uma faixa fina destacada entre a foto e o parágrafo seguinte, com uma régua mostrando "≈ 4px"; rótulo "de onde veio?". A foto aparece sobre uma linha de texto com as letras "g" e "p", e a linha de base marcada: a parte de baixo das letras ocupa a faixa; rótulo "`img` é inline: espaço das letras que descem". No editor, a regra `img` ganha:
```css
  display: block;
```
a faixa some; check verde. Depois, como bônus opcional, `margin: 0 auto;` na `img` com a foto indo para o meio do cartão; etiqueta "opcional". Por fim, o `estilo.css` da Ana com as regras novas da aula (as regras das aulas 3 a 6 continuam no arquivo):
```css
nav li {
  display: inline;
}

nav a {
  display: inline-block;
  padding: 8px 12px;
}

main {
  max-width: 720px;
  margin: 0 auto;
}

img {
  border-radius: 50%;
  max-width: 100%;
  height: auto;
  display: block;
}
```
e a prévia completa num monitor largo: menu em linha, `main` centralizado, foto sem espacinho.

---

## Bloco 09 — Erros comuns

**Fala:**
Agora, os erros mais comuns. O primeiro: márdjin zero óto sem largura. O bloco ocupa a linha toda, não sobra espaço, e nada centraliza. Dê uma uídth ou uma méx uídth para a caixa. O segundo: usar técst alái para centralizar uma caixa. Ele mexe no conteúdo, não na caixa. Para a caixa, é márdjin óto. O terceiro: colocar uídth ou rêit num elemento em linha, como um link ou um spén, e achar que o cê ésse ésse está quebrado. Ele está ignorando de propósito. Use displêi inláin blóc ou blóc. O quarto: usar displêi nân para esconder um conteúdo que deveria ficar na página. Ele some para todo mundo, inclusive para quem usa leitor de tela. E o quinto, para os exercícios: escreva o valor exatamente como no enunciado. Para o corretor, márdjin zero óto é diferente de márdjin léft óto, e inláin é diferente de inláin blóc.

**Tela:** cinco cartões de erro, cada um com a correção embaixo:
1. `main { margin: 0 auto; }` sem largura, com o `main` de ponta a ponta; "x" vermelho; embaixo, `max-width: 720px;` + `margin: 0 auto;` com o `main` no meio, check verde.
2. `main { text-align: center; }` com o texto no meio e a caixa encostada à esquerda; "x" vermelho; embaixo, `margin: 0 auto;`, check verde.
3. `a { width: 200px; }` sem efeito nenhum na prévia; "x" vermelho, rótulo "inline ignora `width`"; embaixo, `display: inline-block;` + `width: 200px;`, check verde.
4. `p { display: none; }` num parágrafo da seção "Sobre mim", com o texto sumindo; "x" vermelho, rótulo "sumiu para todo mundo"; embaixo, o parágrafo de volta, check verde.
5. `margin-left: auto;` e `margin: 0 auto;` com o sinal de diferente; `display: inline;` e `display: inline-block;` com o sinal de diferente; rótulo "para o corretor, são escritas diferentes".
No fim, o aviso da aula 1: "CSS com erro não dá mensagem", e um lembrete: "nos exercícios, escreva o valor exatamente como no enunciado: `0 auto`, `inline-block`, `8px 12px`".

---

## Bloco 10 — Resumo e próximo degrau

**Fala:**
Vamos recapitular. Os elementos de bloco, como o agá um, o pê, a sécchon e a dív, ocupam a linha toda e se empilham. Os elementos em linha, como o é, o strong e o spén, ocupam só o espaço do conteúdo e ignoram uídth e rêit. A img é em linha, mas aceita largura e altura. A propriedade displêi muda o jeito: blóc, inláin, inláin blóc, que fica na linha com medidas de bloco, e nân, que esconde de todo mundo. No menu, inláin blóc com péding deixa os links fáceis de clicar. Para centralizar uma caixa, márdjin zero óto, com uma largura definida. Para centralizar o texto, técst alái cênter. E displêi blóc na img tira o espacinho embaixo da foto. Agora é a sua vez: os exercícios estão logo abaixo do vídeo. Na próxima aula, você vai conhecer o flexbox, e o menu da Ana vai ficar em fila, alinhado e com espaços certinhos. Até lá, e bora destravar.

**Tela:** lista do resumo aparecendo item por item com checks verdes ("bloco: linha toda, empilha (`h1`, `p`, `section`, `div`)", "em linha: só o conteúdo (`a`, `strong`, `span`)", "`display: block | inline | inline-block | none`", "`nav a { display: inline-block; padding: 8px 12px; }`", "`main { margin: 0 auto; }` + largura", "`text-align` = conteúdo · `margin: 0 auto` = caixa", "`img { display: block; }`"); botão "Fazer os exercícios" pulsando. Prévia da próxima aula: o menu da Ana se reorganizando numa fila, com espaços iguais entre os links, e a etiqueta `display: flex`; o texto "Aula 8 — Flexbox: o básico". Encerramento com o logo da Destrava e o slogan "Destrava sua carreira. Um nível de cada vez."
