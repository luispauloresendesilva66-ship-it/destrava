# Aula 3 — Cores

**Nível:** Primeira Demão · **Duração estimada:** ~9 minutos · **Blocos:** 10

## Como este roteiro é usado

- A voz do vídeo é **gerada por IA** a partir do texto em "Fala". Por isso a "Fala" precisa soar natural quando lida em voz alta: frases curtas, sem siglas soltas, com os símbolos de código ditos por extenso.
- O que está em "Tela" é o que o pipeline de vídeo anima (editor da Destrava, prévia do navegador, rótulos, setas, checks). Não é lido pela voz.
- Um áudio por bloco: `bloco01`, `bloco02`... Para corrigir uma fala, gere de novo só aquele bloco.
- Todo o conteúdo de exemplo é fictício (a aluna "Ana"). Nada de marcas, empresas ou sites reais: os endereços usam o domínio reservado `example.com`. Ferramentas citadas de forma genérica ("o seletor de cores do navegador", "um verificador de contraste"), sem nomes de produtos. A página da Ana é a mesma da aula 9 do nível 1, já ligada ao `estilo.css`, com as regras das aulas 1 e 2 (`body`, `h1, h2`, `p`, `.destaque`, `#contato`, `nav a`).
- Paleta da Ana nesta aula: fundo `#fdf6e3` (creme), cor principal `#264653` (azul-petróleo, o mesmo que `rgb(38, 70, 83)`), destaque `#b5452c` (terracota, a versão escura do coral `#e76f51`), neutros `#ffffff` e `#333333`. Contrastes calculados: `#264653` sobre `#fdf6e3` = 9,3:1; `#b5452c` sobre `#fdf6e3` = 5,1:1; `#e76f51` sobre `#fdf6e3` = 2,9:1 (fraco para texto); `#ffffff` sobre `#264653` = 10,1:1; `#333333` sobre `#fdf6e3` = 11,7:1.
- Na "Fala", os termos de CSS e as tags são escritos do jeito que se fala, com as mesmas grafias das aulas 1 e 2: `CSS` = "cê ésse ésse", `color` = "cálor", `background-color` = "béquigráund cálor", `navy` = "nêivi", `lightyellow` = "láit iélou", `green` = "grín", `purple` = "pârpou", `tomato` = "tomêitou", `white` = "uáit", `class` = "cléss", `id` = "ái di", `h1` = "agá um", `h2` = "agá dois", `p` = "pê", `nav` = "név", `a` = "é", `footer` = "fúter". Novas nesta aula: `hex` (hexadecimal) = "réx", `rgb` = "érre gê bê", `rgba` = "érre gê bê á", `border-color` = "bórder cálor", `black` = "bléc", `red` = "réd", `blue` = "blú", `gray` = "grêi". As letras dos códigos hexadecimais são ditas pelo nome em português: `a` = "á", `b` = "bê", `c` = "cê", `d` = "dê", `e` = "é", `f` = "éfe"; os códigos são lidos em pares, com pausa (vírgula) entre eles: `#fdf6e3` = "cerquilha, éfe dê, éfe seis, é três"; `#264653` = "cerquilha, dois seis, quatro seis, cinco três"; `#b5452c` = "cerquilha, bê cinco, quatro cinco, dois cê"; `#e76f51` = "cerquilha, é sete, seis éfe, cinco um"; `#ffffff` = "cerquilha, seis éfes"; `#333333` = "cerquilha, três três, três três, três três"; `#ff0000` = "cerquilha, éfe éfe, zero zero, zero zero". Os símbolos são ditos por extenso: `#` = "cerquilha", `.` = "ponto", `,` = "vírgula", `(` e `)` = "abre parênteses" e "fecha parênteses", `{` = "abre chaves", `}` = "fecha chaves", `:` = "dois pontos", `;` = "ponto e vírgula". Seguem com o nome normal: HTML, body, estilo ponto cê ésse ésse.

---

## Bloco 01 — Abertura

**Fala:**
Olá, seja bem-vindo à aula três da Primeira Demão. Na aula passada, você aprendeu a escolher quem recebe o estilo: a tag pega todos, a classe usa o ponto, o ái di usa a cerquilha. E viu que, quando duas regras brigam, vence a mais específica. Até agora, a Ana pintou a página com nomes de cor em inglês: nêivi, tomêitou, pârpou, uáit. Funciona, mas a lista de nomes é curta, e nem sempre tem o tom exato que ela quer. Hoje, você vai aprender as outras formas de escrever uma cor: o código réx, que começa com cerquilha, e o érre gê bê. Depois, vai ver como escolher uma paleta pequena e, principalmente, como garantir que o texto continua fácil de ler. Abre o editor e bora destravar.

**Tela:** logo da Destrava → título "Aula 3 — Cores". Um cartão de revisão mostra `p`, `.destaque` e `#contato` com as etiquetas "tag", "classe" e "id", e o pódio `#id` > `.classe` > `tag`. Depois, a página da Ana como ficou na aula 2 (fundo `lightyellow`, títulos `navy`, links `tomato`). Por fim, três formas da mesma cor aparecem em fila: `white`, `#ffffff` e `rgb(255, 255, 255)`, com o rótulo "três jeitos de dizer branco".

---

## Bloco 02 — Onde as cores entram

**Fala:**
Primeiro, onde uma cor pode entrar. Você já conhece duas propriedades. Cálor muda a cor do texto. Béquigráund cálor muda a cor do fundo. E existe uma terceira que você vai usar bastante: bórder cálor, a cor da borda. A borda é a linha em volta de uma caixa, e ela tem aula própria mais para frente, na aula cinco. Por enquanto, guarde só isto: as três aceitam exatamente os mesmos valores de cor. Tudo o que você aprender hoje vale para o texto, para o fundo e para a borda. E o jeito mais simples de escrever uma cor você já usou: pelo nome. O cê ésse ésse conhece cerca de cento e quarenta nomes, todos em inglês. Réd é vermelho, blú é azul, bléc é preto, grêi é cinza.

**Tela:** um parágrafo de exemplo no centro, com três setas e três rótulos: "texto" → `color`, "fundo" → `background-color`, "borda" → `border-color` (a borda aparece como uma linha fina em volta da caixa, com o cartão "borda: aula 5"). Rótulo: "os mesmos valores servem para as três". Depois, uma grade de amostras com o nome embaixo: `red`, `blue`, `black`, `gray`, `white`, `navy`, `tomato`, `purple`, `green`, `lightyellow`, com o rótulo "cerca de 140 nomes, em inglês".

---

## Bloco 03 — O código réx

**Fala:**
Os nomes são práticos, mas limitados. Para ter qualquer tom, existe o código réx, de hexadecimal. Ele começa com uma cerquilha, a mesma do ái di, e tem seis caracteres. Esses seis caracteres são três pares. O primeiro par é a quantidade de vermelho. O segundo, a de verde. O terceiro, a de azul. Toda cor da tela é uma mistura dessas três luzes. Cada par vai de zero zero, que é nada daquela cor, até éfe éfe, que é o máximo. Então, cerquilha, éfe éfe, zero zero, zero zero, é vermelho no máximo, sem verde e sem azul: vermelho puro. Tudo zero é preto, porque não tem luz nenhuma. E tudo éfe, cerquilha, seis éfes, é branco, porque tem todas as luzes no máximo.

**Tela:** o código `#ff0000` em letras grandes; a `#` ganha o rótulo "começa com cerquilha". Os seis caracteres se separam em três pares coloridos: `ff` (vermelho, rótulo "R"), `00` (verde, rótulo "G"), `00` (azul, rótulo "B"). Três lanternas, vermelha, verde e azul, acendem conforme o par: só a vermelha acesa, e a amostra fica vermelha. Depois, `#000000` com as três lanternas apagadas e a amostra preta ("sem luz = preto"); `#ffffff` com as três acesas e a amostra branca ("tudo no máximo = branco"). Rótulo fixo: "`#RRGGBB`: vermelho, verde, azul".

---

## Bloco 04 — Lendo um código réx

**Fala:**
Mas por que tem letra no meio dos números? No hexadecimal, cada dígito vai de zero a nove e continua com as letras de á até éfe. O á vale dez, e o éfe vale quinze, o maior. Você não precisa fazer conta. Basta pensar assim: perto de zero é pouco, perto de éfe é muito. Olha a cor que a Ana escolheu para os títulos: cerquilha, dois seis, quatro seis, cinco três. Pouco vermelho, um pouco mais de verde e de azul, tudo baixo. Resultado: um azul-petróleo escuro. Agora, o fundo: cerquilha, éfe dê, éfe seis, é três. Tudo alto: uma cor bem clara, um creme. E tem um atalho. Quando cada par tem os dois dígitos iguais, dá para escrever só três: cerquilha, éfe éfe éfe é o mesmo que seis éfes, branco.

**Tela:** uma régua de dígitos de `0` a `f` (`0 1 2 3 4 5 6 7 8 9 a b c d e f`), clara de um lado e escura do outro, com as etiquetas "pouco" e "muito"; o `a` ganha "= 10" e o `f` ganha "= 15". Depois, `#264653` com os três pares e três barras de nível baixas, e a amostra azul-petróleo, rótulo "tudo baixo = escuro". Em seguida, `#fdf6e3` com três barras altas e a amostra creme, rótulo "tudo alto = claro". Por fim, o atalho: `#fff` → `#ffffff` e `#f00` → `#ff0000`, cada dígito se duplicando, com o rótulo "3 dígitos: cada um vale dobrado". As letras podem ser maiúsculas ou minúsculas: `#FDF6E3` = `#fdf6e3`.

---

## Bloco 05 — Érre gê bê e érre gê bê á

**Fala:**
A terceira forma diz a mesma coisa com números normais: érre gê bê. As letras são as iniciais de vermelho, verde e azul, em inglês. Você escreve érre gê bê, abre parênteses, três números separados por vírgula, e fecha parênteses. Cada número vai de zero a duzentos e cinquenta e cinco. Zero é nada, duzentos e cinquenta e cinco é o máximo, o equivalente ao éfe éfe. O azul-petróleo da Ana, em érre gê bê, fica: trinta e oito, setenta, oitenta e três. É exatamente a mesma cor do código réx, só escrita de outro jeito. E existe uma prima, o érre gê bê á. O á é de alfa, a transparência: um quarto número, de zero a um. Zero é invisível, um é a cor inteira, e zero vírgula cinco deixa a cor pela metade. Por enquanto, é só para você reconhecer quando encontrar.

**Tela:** `rgb(38, 70, 83)` em letras grandes; `rgb` ganha "vermelho, verde, azul", os parênteses ganham "abre e fecha", e cada número ganha a sua cor. Embaixo, uma régua de `0` a `255`, com `255` marcado "= `ff`, o máximo". Uma seta dupla liga `rgb(38, 70, 83)` a `#264653`, as duas com a mesma amostra azul-petróleo; rótulo "mesma cor, outra escrita". Depois, `rgba(38, 70, 83, 0.5)` sobre um fundo listrado: o quarto número pisca com o rótulo "alfa: 0 = invisível, 1 = inteira"; a amostra fica meio transparente, deixando as listras aparecerem. O ponto decimal de `0.5` ganha o rótulo "no CSS, ponto em vez de vírgula".

---

## Bloco 06 — Escolhendo as cores

**Fala:**
Tá, mas ninguém decora códigos. Como a Ana descobre o código da cor que ela quer? O próprio navegador ajuda. Nas ferramentas de desenvolvedor, que abrem com o botão direito, em inspecionar, toda cor do cê ésse ésse ganha um quadradinho. Clicando nele, abre um seletor de cores: você arrasta até o tom que quiser, e o código aparece pronto para copiar. Agora, a dica mais importante: escolha poucas cores. Uma paleta boa para começar tem duas ou três cores, mais os neutros, que são o branco, o preto e os cinzas. A Ana ficou com três: o creme, para o fundo, o azul-petróleo, para os títulos, e um coral, para os destaques e os links. E, para o texto comum, um cinza bem escuro, cerquilha, três três, três três, três três. Poucas cores, repetidas com regra, deixam a página com cara de projeto.

**Tela:** a página da Ana no navegador; clique com o botão direito → "Inspecionar". O painel de estilos mostra `color: navy;` com um quadradinho de cor ao lado; o quadradinho é clicado e abre um seletor de cores genérico (área de tons, barra de matiz, campo com o código). O cursor arrasta até um azul-petróleo e o campo mostra `#264653`, com o rótulo "copie o código". Depois, a paleta da Ana em cartões: `#fdf6e3` "fundo", `#264653` "principal", `#e76f51` "destaque", e, separados, os neutros `#ffffff` e `#333333`. Rótulo: "2 ou 3 cores + neutros".

---

## Bloco 07 — Contraste: dá para ler?

**Fala:**
Cor bonita que ninguém consegue ler não serve. Isso se chama contraste: a diferença entre a cor do texto e a cor do fundo. Texto claro em fundo claro some. Texto escuro em fundo escuro também. E um cinza médio em cima de outro cinza médio cansa a vista de qualquer pessoa, e é ainda pior para quem enxerga pouco, ou para quem está no celular, debaixo do sol. A regra prática é: fundo claro, texto escuro, ou o contrário. Para não depender do olho, existem verificadores de contraste. Você coloca as duas cores e ele diz se a combinação passa. As ferramentas do navegador também mostram isso no seletor de cores. A Ana testou e levou um susto: o coral dos links, em cima do creme, não passou. O título azul-petróleo passou com folga.

**Tela:** três cartões lado a lado com a mesma frase "Fale comigo": amarelo-claro sobre branco (quase invisível, "x" vermelho), cinza `#777777` sobre cinza `#888888` ("x" vermelho) e `#264653` sobre `#fdf6e3` (check verde). Rótulo: "contraste = diferença entre texto e fundo". Depois, um verificador de contraste genérico, com dois campos ("texto" e "fundo") e um resultado: `#264653` sobre `#fdf6e3` → "9,3 : 1 — passa"; `#e76f51` sobre `#fdf6e3` → "2,9 : 1 — não passa para texto", com sinal de atenção. Rótulo final: "fundo claro, texto escuro (ou o contrário)".

---

## Bloco 08 — A paleta na página da Ana

**Fala:**
Para resolver o coral, a Ana escureceu o tom no seletor de cores até passar. Ficou cerquilha, bê cinco, quatro cinco, dois cê, um terracota. Agora, ela aplica a paleta no estilo ponto cê ésse ésse. Body: béquigráund cálor, cerquilha, éfe dê, éfe seis, é três. Pê: cálor, cerquilha, três três, três três, três três, o cinza escuro. Agá um, vírgula, agá dois: cálor, o azul-petróleo. Ponto destaque e név, espaço, é: cálor, o terracota. E o fúter faz o caminho inverso: fundo azul-petróleo. Os parágrafos dele, fúter, espaço, pê, ficam com o texto branco, cerquilha, seis éfes. Repare que são as mesmas regras das aulas um e dois. Só os valores mudaram. Os nomes, nêivi, tomêitou, pârpou, saíram, e os códigos entraram. E, se um dia a Ana quiser outra paleta, troca os códigos e pronto.

**Tela:** o seletor de cores escurecendo o coral `#e76f51` até `#b5452c`; o verificador mostra "5,1 : 1 — passa", com check verde. Depois, o `estilo.css` da Ana sendo atualizado, um valor por vez, cada troca refletida na prévia:
```css
body {
  background-color: #fdf6e3;
}

p {
  color: #333333;
}

h1, h2 {
  color: #264653;
}

.destaque, nav a {
  color: #b5452c;
}

footer {
  background-color: #264653;
}

footer p {
  color: #ffffff;
}
```
os valores antigos (`lightyellow`, `navy`, `purple`, `tomato`) saem em cinza, riscados, e os códigos entram no lugar. Rótulo: "mesmas regras, novos valores". A prévia final mostra a página creme, títulos azul-petróleo, links e destaque terracota e o rodapé azul-petróleo com texto branco; rótulo em `footer p`: "o `p` do rodapé precisa da sua própria regra, senão fica cinza-escuro no fundo escuro".

---

## Bloco 09 — Erros comuns

**Fala:**
Agora, os erros mais comuns com cores. O primeiro: esquecer a cerquilha. Éfe dê, éfe seis, é três, sem a cerquilha, não é cor para o navegador, e a declaração é ignorada. O segundo: o número errado de dígitos. O código réx tem seis ou três. Com cinco, ou com sete, não funciona. Isso acontece muito quando se copia o código pela metade. O terceiro: espaço no meio do código. Cerquilha, éfe dê, espaço, éfe seis não é uma cor. O código vai todo junto. O quarto é no érre gê bê: número maior que duzentos e cinquenta e cinco, como trezentos. O máximo é duzentos e cinquenta e cinco. E lembra que o cê ésse ésse não avisa nada? Se a cor não mudou, confira essas quatro coisas. Ah, e nos exercícios, use o valor exatamente como o enunciado pede.

**Tela:** quatro cartões de erro, cada um com a correção embaixo:
1. `background-color: fdf6e3;` com o começo em vermelho e o rótulo "sem cerquilha"; embaixo, `background-color: #fdf6e3;` com check verde.
2. `color: #26465;` com o rótulo "5 dígitos"; embaixo, `color: #264653;` com check verde e o lembrete "6 ou 3 dígitos".
3. `color: #fd f6e3;` com o espaço marcado em vermelho; embaixo, `color: #fdf6e3;` com check verde.
4. `color: rgb(300, 70, 83);` com o `300` em vermelho e o rótulo "máximo: 255"; embaixo, `color: rgb(38, 70, 83);` com check verde.
No fim, o aviso da aula 1: "CSS com erro não dá mensagem", e um lembrete: "nos exercícios, escreva o valor exatamente como no enunciado".

---

## Bloco 10 — Resumo e próximo degrau

**Fala:**
Vamos recapitular. As cores entram no cálor, para o texto, no béquigráund cálor, para o fundo, e no bórder cálor, para a borda. Dá para escrever uma cor pelo nome em inglês, pelo código réx, com cerquilha e três pares de vermelho, verde e azul, ou pelo érre gê bê, com números de zero a duzentos e cinquenta e cinco. O código curto, de três dígitos, repete cada dígito. O érre gê bê á acrescenta a transparência. Para escolher, use o seletor de cores do navegador e fique com duas ou três cores, mais os neutros. E sempre confira o contraste: o texto precisa ser fácil de ler. Agora é a sua vez: os exercícios estão logo abaixo do vídeo. Na próxima aula, o assunto é o texto em si: fontes, tamanhos e espaçamento entre linhas. Até lá, e bora destravar.

**Tela:** lista do resumo aparecendo item por item com checks verdes ("`color`, `background-color`, `border-color`", "nome: `white`", "hex: `#ffffff` (`#fff`)", "`rgb(255, 255, 255)`: de 0 a 255", "`rgba(…, 0.5)`: transparência", "2 ou 3 cores + neutros", "contraste: dá para ler?"); botão "Fazer os exercícios" pulsando. Prévia da próxima aula: a frase "Olá, eu sou a Ana" mudando de fonte e de tamanho, e o texto "Aula 4 — Texto e fontes". Encerramento com o logo da Destrava e o slogan "Destrava sua carreira. Um nível de cada vez."
