# Aula 2 — Seletores: tag, classe e id

**Nível:** Primeira Demão · **Duração estimada:** ~9 minutos · **Blocos:** 11

## Como este roteiro é usado

- A voz do vídeo é **gerada por IA** a partir do texto em "Fala". Por isso a "Fala" precisa soar natural quando lida em voz alta: frases curtas, sem siglas soltas, com os símbolos de código ditos por extenso.
- O que está em "Tela" é o que o pipeline de vídeo anima (editor da Destrava, prévia do navegador, rótulos, setas, checks). Não é lido pela voz.
- Um áudio por bloco: `bloco01`, `bloco02`... Para corrigir uma fala, gere de novo só aquele bloco.
- Todo o conteúdo de exemplo é fictício (a aluna "Ana"). Nada de marcas, empresas ou sites reais: os endereços usam o domínio reservado `example.com`. A página da Ana é a mesma da aula 9 do nível 1 (`index.html` com topo, menu, seções `#sobre`, `#projetos`, `#rotina` e `#contato`, rodapé), já ligada ao `estilo.css` da aula 1 deste nível.
- Na "Fala", os termos de CSS e as tags são escritos do jeito que se fala, com as mesmas grafias da aula 1: `CSS` = "cê ésse ésse", `link` = "línk", `color` = "cálor", `background-color` = "béquigráund cálor", `navy` = "nêivi", `purple` = "pârpou", `tomato` = "tomêitou", `id` = "ái di", `h1` = "agá um", `p` = "pê". Novas nesta aula: `class` = "cléss", `h2` = "agá dois", `white` = "uáit", `D` (a letra) = "dê". Do nível 1: `nav` = "név", `a` = "é", `ul` = "u éle", `li` = "éle í", `label` = "lêibol", `footer` = "fúter". Os símbolos são ditos por extenso: `.` = "ponto", `#` = "cerquilha" (como na aula 3 do nível 1), `,` = "vírgula", `{` = "abre chaves", `}` = "fecha chaves", `:` = "dois pontos", `;` = "ponto e vírgula". Seguem com o nome normal: HTML, head, body, estilo ponto cê ésse ésse. Os nomes de classe e de ái di em português (destaque, contato, grande, foto-perfil) são lidos como palavras.

---

## Bloco 01 — Abertura

**Fala:**
Olá, seja bem-vindo à aula dois da Primeira Demão. Na aula passada, a página da Ana ganhou as primeiras cores. Você viu que toda regra de cê ésse ésse tem um seletor, abre chaves, as declarações, e fecha chaves. E ligou o arquivo estilo ponto cê ésse ésse à página com a tag línk. Mas ficou uma pergunta no ar: e se a Ana quiser pintar só um parágrafo, e não todos? Hoje, você vai aprender a escolher exatamente quem recebe o estilo. São três tipos de seletor: por tag, por classe e por ái di. Depois, você vai juntar seletores com vírgula, mirar um elemento que está dentro de outro e entender quem vence quando duas regras brigam pelo mesmo elemento. Abre o editor e bora destravar.

**Tela:** logo da Destrava → título "Aula 2 — Seletores: tag, classe e id". Um cartão de revisão mostra a regra `h1 { color: navy; }` com as etiquetas da aula 1 ("seletor", "propriedade", "valor") e a linha `<link rel="stylesheet" href="estilo.css">` com check verde. Depois, a página da Ana com três parágrafos iguais; um deles pisca com um ponto de interrogação e o rótulo "e se for só este?". Por fim, três etiquetas aparecem em fila: `p` "tag", `.destaque` "classe", `#contato` "id".

---

## Bloco 02 — O seletor de tag

**Fala:**
Começando pelo que você já conhece. Até agora, todo seletor era o nome de uma tag: agá um, body, pê. Esse é o seletor de tag. Ele é direto e poderoso, mas não escolhe: pega todos os elementos daquela tag na página. Se a Ana escreve pê, abre chaves, cálor, dois pontos, nêivi, todos os parágrafos ficam azul-marinho. O do sobre mim, o dos projetos e até o do rodapé. Para o visual geral, isso é ótimo. É assim que você define a cor do texto da página toda, o tamanho padrão da letra, o fundo. Mas a Ana tem um parágrafo especial no sobre mim: o que diz que ela está procurando o primeiro emprego na área. Ela quer que só esse chame a atenção. Com o seletor de tag, não dá. Para isso existem as classes.

**Tela:** no `estilo.css` da Ana, abaixo das regras da aula 1, é digitado:
```css
p {
  color: navy;
}
```
na prévia, todos os parágrafos ficam azul-marinho ao mesmo tempo, um depois do outro com um brilho rápido: o do "Sobre mim", o dos "Meus projetos" e o do rodapé. Rótulo: "seletor de tag = todos os `<p>` da página". Depois, o parágrafo "Estou procurando o meu primeiro emprego na área." ganha uma moldura tracejada e o rótulo "só este, como?"; um "x" cinza aparece sobre `p`, com o rótulo "a tag não escolhe".

---

## Bloco 03 — O seletor de classe

**Fala:**
Uma classe é um apelido que você dá para um elemento, lá no HTML. Ela entra com o atributo cléss. No parágrafo especial da Ana, fica assim: pê, cléss igual a destaque. O nome é você que escolhe. Aqui, destaque, porque diz para que ele serve. Agora, no cê ésse ésse, para escolher esse elemento, você escreve um ponto e o nome da classe: ponto destaque. O ponto é o jeito de dizer: isto não é uma tag, é uma classe. Então a regra fica: ponto destaque, abre chaves, cálor, dois pontos, pârpou, ponto e vírgula, fecha chaves. Salva e olha a prévia: só aquele parágrafo ficou roxo. Os outros continuam azul-marinho. Repara num detalhe: no HTML, o nome vai sem o ponto. O ponto só aparece no cê ésse ésse.

**Tela:** no `index.html`, dentro da seção `#sobre`, o parágrafo ganha o atributo:
```html
<p class="destaque">Estou procurando o meu primeiro emprego na área.</p>
```
`class="destaque"` fica destacado, com o rótulo "atributo class: o apelido". No `estilo.css`, é digitado:
```css
.destaque {
  color: purple;
}
```
o `.` pisca, com o rótulo "ponto = classe". Uma seta liga `.destaque` ao `class="destaque"`. Na prévia, só esse parágrafo fica roxo, com check verde; os outros seguem azul-marinho. Por fim, lado a lado: `class="destaque"` (HTML, "sem ponto") e `.destaque` (CSS, "com ponto").

---

## Bloco 04 — Uma classe, vários elementos

**Fala:**
A grande vantagem da classe é que ela pode ser usada quantas vezes você quiser. A Ana gostou do destaque e quer usar a mesma cor num item da lista de projetos, o que ainda está em andamento. É só colocar cléss igual a destaque nessa éle í também. Pronto: a mesma regra vale para os dois, e nem precisa ser a mesma tag. Se um dia ela trocar o roxo por outra cor, muda num lugar só, e todos os destaques acompanham. E um elemento pode ter mais de uma classe ao mesmo tempo. É só separar os nomes com um espaço, dentro das mesmas aspas: cléss igual a destaque, espaço, grande. Isso quer dizer duas classes, destaque e grande, e o elemento recebe o estilo das duas regras. Guarde isso, porque vai ser importante na hora dos erros comuns.

**Tela:** na lista da seção `#projetos`, um item ganha a classe:
```html
<li class="destaque">Esta página pessoal (em andamento)</li>
```
na prévia, o item fica roxo, e uma seta sai da regra `.destaque` e se divide em duas, uma para o `<p>` e outra para o `<li>`; rótulo "uma regra, vários elementos (até de tags diferentes)". O valor `purple` é trocado por `tomato` e os dois mudam juntos; volta para `purple`. Depois, aparece:
```html
<p class="destaque grande">...</p>
```
o espaço entre `destaque` e `grande` é marcado com um tracinho amarelo e o rótulo "espaço = separa duas classes"; duas setas ligam o elemento às regras `.destaque { }` e `.grande { }`.

---

## Bloco 05 — O seletor de ái di

**Fala:**
O terceiro tipo é o seletor de ái di. Você já conhece o atributo ái di do nível um: a Ana deu um ái di para cada seção, para o menu conseguir pular direto para ela. A seção do formulário, por exemplo, tem ái di igual a contato. Lembra do link com cerquilha contato no href? No cê ésse ésse, o seletor de ái di usa exatamente o mesmo símbolo: a cerquilha e o nome. Então: cerquilha contato, abre chaves, béquigráund cálor, dois pontos, uáit, ponto e vírgula, fecha chaves. A seção de contato ganha um fundo branco e se destaca do amarelo-claro da página. A diferença principal é esta: o ái di é único. Só um elemento da página pode ter cada ái di. Por isso, a regra com cerquilha sempre mira um elemento só.

**Tela:** no `index.html`, a linha `<section id="contato">` fica destacada, e uma seta a liga ao link do menu `<a href="#contato">Fale comigo</a>`, com o cartão "aula 3 do nível 1". No `estilo.css`, é digitado:
```css
#contato {
  background-color: white;
}
```
o `#` pisca, com o rótulo "cerquilha = id"; o `#` do `href="#contato"` pisca junto, com o rótulo "o mesmo símbolo". Na prévia, a seção "Fale comigo" ganha fundo branco sobre o amarelo-claro da página. Por fim, o rótulo "id: um por página" com um selo "único".

---

## Bloco 06 — Classe ou ái di?

**Fala:**
Então, quando usar cada um? Para estilo, prefira a classe quase sempre. Ela pode ser reaproveitada, combina com outras classes e não briga tanto com as outras regras, que é o assunto de daqui a pouco. O ái di tem trabalhos mais importantes: ser o endereço de uma seção, como no menu da Ana, e ligar o lêibol ao campo do formulário, lembra? Não tem problema usar um ái di que já existe para um ajuste pontual, como o fundo do contato. Mas, se você está criando um nome só para pintar alguma coisa, crie uma classe. Uma dica para lembrar: a classe é como o uniforme de um time, que muita gente veste igual. O ái di é como o número do seu documento: cada pessoa tem o seu, e ele não se repete.

**Tela:** duas colunas. "Classe `.`" com três jogadores de camisa igual e os itens "pode repetir", "várias por elemento", "a escolha para estilo" com checks verdes. "Id `#`" com um documento de identidade ilustrado (sem dados reais) e os itens "único na página", "endereço de seção (`href=\"#contato\"`)", "liga `<label for>` ao campo (aula 7 do nível 1)". Embaixo, a regra do bolso: "vai pintar? crie uma classe".

---

## Bloco 07 — Vários seletores com vírgula

**Fala:**
Agora, um atalho. A Ana quer que o agá um e os agá dois fiquem com a mesma cor, nêivi. Ela poderia escrever duas regras iguais, uma para cada. Mas dá para juntar: agá um, vírgula, agá dois, abre chaves, cálor, dois pontos, nêivi, ponto e vírgula, fecha chaves. A vírgula quer dizer "e": esta regra vale para o agá um e para os agá dois. Dá para colocar quantos seletores quiser na lista, e até misturar os tipos: agá um, vírgula, agá dois, vírgula, ponto destaque. Isso evita repetir a mesma declaração em vários lugares. E, se a Ana mudar de ideia sobre a cor, troca num lugar só. Um cuidado: a vírgula entre os seletores faz toda a diferença. Sem ela, o significado muda completamente, como você vai ver agora.

**Tela:** à esquerda, duas regras separadas, `h1 { color: navy; }` e `h2 { color: navy; }`, com a declaração repetida sublinhada em amarelo. Elas se fundem numa só:
```css
h1, h2 {
  color: navy;
}
```
a vírgula pisca, com o rótulo "vírgula = e". Na prévia, o título "Olá, eu sou a Ana" e os títulos de seção "Sobre mim", "Meus projetos", "Minha rotina" e "Fale comigo" ficam azul-marinho. Depois, por um instante, aparece `h1, h2, .destaque { }`, com o rótulo "dá para misturar tag e classe".

---

## Bloco 08 — Um elemento dentro do outro

**Fala:**
Lembra do menu da Ana? É uma név, com uma lista de links dentro. A Ana quer que os links do menu fiquem tomêitou, mas sem mudar os outros links da página, como os do fúter. Para isso existe o seletor de descendente: név, espaço, é. Lendo em português: todo link que está dentro de uma név. O espaço entre os dois nomes quer dizer "dentro de". E não precisa estar logo dentro: o link está numa éle í, que está na u éle, que está na név, e mesmo assim vale. Agora compare. Név, vírgula, é: pega a név inteira e todos os links da página. Név, espaço, é: pega só os links do menu. Uma vírgula a mais ou a menos muda tudo.

**Tela:** o HTML do menu aparece em camadas encaixadas, `<nav>` → `<ul>` → `<li>` → `<a>`, como caixas uma dentro da outra. No `estilo.css`, é digitado:
```css
nav a {
  color: tomato;
}
```
o espaço entre `nav` e `a` é marcado com um tracinho amarelo e o rótulo "espaço = dentro de". Na prévia, os quatro links do menu ficam vermelho-alaranjados; o link do rodapé continua azul, com o rótulo "fora da nav, não muda". Por fim, duas linhas comparadas: `nav, a` ("a nav e todos os links") e `nav a` ("só os links dentro da nav"), cada uma acendendo na prévia o que pega.

---

## Bloco 09 — Quem vence quando duas regras brigam

**Fala:**
Agora, uma pergunta. O parágrafo especial da Ana tem duas regras falando dele: a do pê, que diz nêivi, e a do ponto destaque, que diz pârpou. E ele ficou roxo. Por quê? Aqui entra a cascata, aquela palavra do nome do cê ésse ésse. Quando duas regras brigam pela mesma propriedade, vale uma conta simples. Primeiro: a regra mais específica vence. O ái di é o mais específico, porque mira um elemento só. Depois vem a classe, e por último a tag. Então, ái di vence classe, e classe vence tag. Segundo: se as duas regras forem do mesmo tipo, como duas regras de pê, vence a que vem por último no arquivo. Essa conta tem nome, especificidade, e tem mais detalhes, que a gente vê com calma depois. Por enquanto, guarde essas duas.

**Tela:** o parágrafo `<p class="destaque">` no centro, com duas regras puxando, uma de cada lado: `p { color: navy; }` e `.destaque { color: purple; }`. A do `.destaque` vence e o parágrafo fica roxo; rótulo "classe vence tag". Depois, um pódio: 1º `#id`, 2º `.classe`, 3º `tag`, com o título "especificidade (o básico)". Em seguida, duas regras do mesmo tipo no arquivo:
```css
p {
  color: navy;
}

p {
  color: green;
}
```
a segunda ganha a etiqueta "vem por último: vence" e os parágrafos ficam verdes; a primeira fica em cinza. Rótulo final: "mais específica vence; empate, vence a última".

---

## Bloco 10 — Nomes e erros comuns

**Fala:**
Para dar nome às classes, três dicas. Use letras minúsculas. Se o nome tiver duas palavras, ligue com um tracinho, como foto-perfil. E evite acento e cedilha no nome: em vez de botão, com til, escreva sem o til. Agora, os erros mais comuns. O primeiro: esquecer o ponto no cê ésse ésse. Destaque, sem o ponto, procura uma tag chamada destaque, que não existe. O segundo: espaço no nome da classe. Cléss igual a foto perfil, com espaço, vira duas classes, foto e perfil. O terceiro: maiúscula e minúscula. Ponto Destaque, com dê maiúsculo, não acha a classe destaque, minúscula. Para o seletor, são nomes diferentes. O quarto: usar o mesmo ái di duas vezes na página. O menu pode pular para o lugar errado. E, como você viu na aula passada, o navegador não avisa nada.

**Tela:** um cartão "nomes de classe" com três linhas e checks verdes: "minúsculas: `destaque`", "tracinho entre palavras: `foto-perfil`", "sem acento e cedilha: `botao`" (ao lado, `botão` com sinal de atenção). Depois, quatro cartões de erro, cada um com a correção embaixo:
1. `destaque { color: purple; }` com "x" vermelho e o rótulo "sem ponto, procura a tag `<destaque>`"; embaixo, `.destaque { color: purple; }` com check verde.
2. `class="foto perfil"` com o espaço em vermelho e o rótulo "duas classes: foto e perfil"; embaixo, `class="foto-perfil"` com check verde.
3. `.Destaque` com o "D" em vermelho ao lado de `class="destaque"`, rótulo "maiúscula ≠ minúscula"; embaixo, `.destaque` com check verde.
4. dois `<section id="contato">` na mesma página, com "x" vermelho e o rótulo "id repetido"; embaixo, um só, com check verde.
No fim, o aviso da aula 1: "CSS com erro não dá mensagem".

---

## Bloco 11 — Resumo e próximo degrau

**Fala:**
Vamos recapitular. O seletor de tag pega todos os elementos daquela tag. A classe entra no HTML com o atributo cléss e, no cê ésse ésse, com um ponto na frente. Ela pode ser usada em vários elementos, e um elemento pode ter várias classes. O ái di usa a cerquilha e é único na página. Para estilo, prefira a classe. A vírgula junta seletores numa regra só, e o espaço escolhe um elemento dentro de outro, como név, espaço, é. Quando duas regras brigam, ái di vence classe, classe vence tag, e, entre iguais, vence a última. Agora é a sua vez: os exercícios estão logo abaixo do vídeo. Na próxima aula, a Ana vai além dos nomes de cor: hexadecimal, rgb e combinações fáceis de ler. Até lá, e bora destravar.

**Tela:** lista do resumo aparecendo item por item com checks verdes ("`p`: todos os parágrafos", "`.destaque`: quem tem `class=\"destaque\"`", "`#contato`: o único com `id=\"contato\"`", "para estilo, prefira classe", "`h1, h2`: vírgula = e", "`nav a`: espaço = dentro de", "`#id` > `.classe` > `tag`; empate, vence a última"); botão "Fazer os exercícios" pulsando. Prévia da próxima aula: uma paleta com `#1e3a8a` e `rgb(255, 99, 71)` e o texto "Aula 3 — Cores". Encerramento com o logo da Destrava e o slogan "Destrava sua carreira. Um nível de cada vez."
