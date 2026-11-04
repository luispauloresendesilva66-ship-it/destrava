# Aula 1 — O que é CSS?

**Nível:** Primeira Demão · **Duração estimada:** ~8 minutos · **Blocos:** 10

## Como este roteiro é usado

- A voz do vídeo é **gerada por IA** a partir do texto em "Fala". Por isso a "Fala" precisa soar natural quando lida em voz alta: frases curtas, sem siglas soltas, com os símbolos de código ditos por extenso.
- O que está em "Tela" é o que o pipeline de vídeo anima (editor da Destrava, prévia do navegador, rótulos, setas, checks). Não é lido pela voz.
- Um áudio por bloco: `bloco01`, `bloco02`... Para corrigir uma fala, gere de novo só aquele bloco.
- Todo o conteúdo de exemplo é fictício (a aluna "Ana"). Nada de marcas, empresas ou sites reais: os endereços usam o domínio reservado `example.com`. A página da Ana é a mesma da aula 9 do nível 1 (`index.html`, `paginas/projetos.html`, avatar ilustrado em `imagens/foto-ana.jpg`).
- Esta é a aula de amostra do nível: no plano Grátis ela fica aberta para assistir. Por isso ela se explica sozinha, sem depender de ter visto o nível 1 inteiro.
- Na "Fala", os termos de CSS e as tags são escritos do jeito que se fala: `CSS` = "cê ésse ésse", `style` = "stáil", `link` = "línk", `rel` = "rél", `stylesheet` = "stáil xíti", `href` = "agá réf", `color` = "cálor", `background-color` = "béquigráund cálor", `font-size` = "fónti sáiz", `px` = "pê xis", `navy` = "nêivi", `lightyellow` = "láit iélou", `green` = "grín", `purple` = "pârpou", `tomato` = "tomêitou", `id` = "ái di", `h1` = "agá um", `p` = "pê", `Cascading Style Sheets` = "kasquêidin stáil xíts". Os símbolos são ditos por extenso: `{` = "abre chaves", `}` = "fecha chaves", `:` = "dois pontos", `;` = "ponto e vírgula". Seguem com o nome normal, como no nível 1: HTML, head, body, title, index ponto html.

---

## Bloco 01 — Abertura

**Fala:**
Olá, seja bem-vindo ao segundo nível da Destrava: Primeira Demão. Lembra da casa da primeira aula? O HTML é a estrutura: as paredes, as portas, os cômodos. No nível passado, a Ana levantou essa estrutura inteira: uma página pessoal com topo, menu, sobre mim, projetos, rotina, formulário e rodapé. Funciona, está organizada, mas ainda tem cara de rascunho: letra preta, fundo branco, links azuis. Agora chegou a hora do acabamento. É aqui que entra o cê ésse ésse, a linguagem que cuida da aparência. Hoje, você vai entender o que ele é, como se escreve uma regra e as formas de ligar o cê ésse ésse a uma página. E, no fim, a página da Ana vai ganhar as primeiras cores. Abre o editor e bora destravar.

**Tela:** logo da Destrava animando → título "Nível 2 — Primeira Demão" → os 5 degraus do curso, o primeiro com bandeirinha e o segundo acendendo → título "Aula 1 — O que é CSS?". Depois, a casa da aula 1 do nível 1 aparece só com a estrutura em linhas (rótulo "HTML: nível 1 ✓"); um rolo de tinta passa por cima e pinta as paredes (rótulo "CSS: agora"). Ao lado, a página da Ana da aula 9, em preto e branco, com o rótulo "estrutura pronta, falta o acabamento".

---

## Bloco 02 — Estrutura e aparência

**Fala:**
Vamos separar bem os papéis. O HTML diz o que cada coisa é: isto é um título, isto é um parágrafo, isto é um menu. O cê ésse ésse diz como cada coisa aparece: de que cor, de que tamanho, com quanto espaço em volta. Repara numa coisa curiosa: a página da Ana já tem alguma aparência. O título é grande e em negrito, e os links são azuis e sublinhados. Quem fez isso foi o próprio navegador, que tem um estilo padrão para cada tag. Com o cê ésse ésse, você passa a mandar nisso. E o melhor: o mesmo HTML pode ganhar visuais completamente diferentes sem mudar uma linha da estrutura. O nome vem do inglês, kasquêidin stáil xíts, que quer dizer folhas de estilo em cascata. Guarde a palavra folha de estilo, que ela vai aparecer daqui a pouco.

**Tela:** duas colunas: "HTML = o que é" com etiquetas "título", "parágrafo", "menu" sobre a página; "CSS = como aparece" com etiquetas "cor", "tamanho", "espaço". Depois, a página da Ana sem CSS, com setas: "título grande (estilo do navegador)", "link azul e sublinhado (estilo do navegador)". Em seguida, o mesmo `index.html` aparece no centro e se divide em três prévias lado a lado, cada uma com cores e fontes diferentes; rótulo: "mesmo HTML, três visuais". Por fim, "Cascading Style Sheets" aparece com a tradução "folhas de estilo em cascata", e "Style Sheet = folha de estilo" fica destacado.

---

## Bloco 03 — A anatomia de uma regra

**Fala:**
Todo cê ésse ésse é feito de regras. E toda regra tem a mesma forma. Primeiro vem o seletor, que diz quem vai receber o estilo. Por exemplo, agá um: todos os títulos agá um da página. Depois, abre chaves. Dentro das chaves vem a declaração: o nome de uma propriedade, dois pontos, o valor, e um ponto e vírgula no fim. A primeira propriedade que a gente vai usar é a cálor, a cor do texto. Então fica assim: agá um, abre chaves, cálor, dois pontos, nêivi, ponto e vírgula, fecha chaves. Nêivi é um azul-marinho. Lendo em português: todo agá um fica com o texto azul-marinho. Repara que, diferente do HTML, aqui não tem sinal de menor nem de maior. O seletor é só o nome da tag.

**Tela:** no centro, a regra aparece peça por peça, cada uma com uma etiqueta colorida:
```css
h1 {
  color: navy;
}
```
`h1` → "seletor: quem recebe o estilo"; `{` e `}` → "chaves: o começo e o fim da regra"; `color` → "propriedade: o que muda"; `:` → "dois pontos separam"; `navy` → "valor: como fica"; `;` → "ponto e vírgula fecha a declaração". Depois, a frase "todo `<h1>` fica com o texto azul-marinho" aparece embaixo. Por fim, `<h1>` (HTML) e `h1` (CSS) lado a lado, com o rótulo "no CSS, sem `<` e `>`".

---

## Bloco 04 — A tag style

**Fala:**
Agora, onde a regra vai? A primeira forma é a tag stáil, que fica dentro do head. Abre o index ponto html da Ana. Dentro do head, logo depois do title, abre a tag stáil. Dentro dela, escreve a regra: agá um, abre chaves, cálor, dois pontos, nêivi, ponto e vírgula, fecha chaves. E fecha a tag stáil. Salva e olha a prévia: o olá, eu sou a Ana ficou azul-marinho. Esse é o seu primeiro cê ésse ésse funcionando. Por que no head? Porque o head guarda as informações sobre a página, e o estilo é uma delas. Ele não aparece como texto na tela. Ele muda a forma como o resto aparece.

**Tela:** no `index.html` da Ana, dentro do `<head>`, abaixo do `<title>`, é digitado:
```html
<head>
  <meta charset="UTF-8">
  <title>Ana Souza, página pessoal</title>
  <style>
    h1 {
      color: navy;
    }
  </style>
</head>
```
`<style>` e `</style>` ficam destacados, com o rótulo "a caixa do CSS, dentro do head". Na prévia, o título "Olá, eu sou a Ana" muda de preto para azul-marinho, com check verde e o rótulo "primeiro CSS funcionando".

---

## Bloco 05 — Mais de uma declaração

**Fala:**
Uma regra pode ter várias declarações, uma embaixo da outra, cada uma com o seu ponto e vírgula. Vamos dar mais duas pinceladas. Uma regra nova para o body, que é a página inteira, com a propriedade béquigráund cálor, a cor do fundo, com o valor láit iélou, um amarelo bem clarinho. Agora o fundo da página toda ficou amarelo-claro. E outra regra para o pê, o parágrafo, com a fónti sáiz, o tamanho da letra, igual a dezoito pê xis. Pê xis é de pixels, os pontinhos da tela. Mais para frente, tem uma aula só sobre tamanhos. Repara que a béquigráund cálor tem duas palavras ligadas por um tracinho. No cê ésse ésse é assim: nada de espaço no meio do nome da propriedade.

**Tela:** dentro do `<style>`, abaixo da regra do `h1`, é digitado:
```css
body {
  background-color: lightyellow;
}

p {
  font-size: 18px;
}
```
na prévia, o fundo da página inteira fica amarelo-claro (rótulo "background-color = cor do fundo") e os parágrafos crescem um pouco (rótulo "font-size = tamanho da letra"). `18px` ganha a etiqueta "px = pixels (aula 6)". O tracinho de `background-color` pisca, com o rótulo "nome com tracinho, sem espaço". Ao lado, `background color` com espaço recebe um "x" vermelho.

---

## Bloco 06 — Um arquivo só para o estilo

**Fala:**
A tag stáil funciona, mas tem um problema. Lembra que a Ana também tem a página de projetos? Se o estilo ficar dentro do index ponto html, a página de projetos continua sem cor. E copiar o mesmo cê ésse ésse em todas as páginas dá trabalho e confunde. A solução é um arquivo só para o estilo: estilo ponto cê ésse ésse, na pasta do site. As regras saem da tag stáil e vão para esse arquivo, sem a tag. No head, no lugar da stáil, entra a tag línk, com dois atributos. O rél, igual a stáil xíti, avisa que o arquivo é uma folha de estilo. E o agá réf, igual a estilo ponto cê ésse ésse, diz onde ele está. A línk não tem fechamento. Agora é só colocar a mesma linha na página de projetos, com o caminho certo, e as duas ficam com o mesmo visual.

**Tela:** na lateral, a pasta `meu-site` ganha o arquivo `estilo.css`, ao lado de `index.html`. As três regras saem do `<style>` e voam para o `estilo.css`:
```css
h1 {
  color: navy;
}

body {
  background-color: lightyellow;
}

p {
  font-size: 18px;
}
```
no `<head>` do `index.html`, o `<style>` some e no lugar é digitado:
```html
<link rel="stylesheet" href="estilo.css">
```
`rel="stylesheet"` ganha o rótulo "é uma folha de estilo"; `href="estilo.css"` ganha "onde está o arquivo"; o fim da tag, "sem fechamento". Depois, no `paginas/projetos.html`, é digitado `<link rel="stylesheet" href="../estilo.css">`, com o `../` destacado e o cartão "caminhos: aula 3 do nível 1". As duas páginas aparecem lado a lado, com o mesmo fundo amarelo-claro e o título azul-marinho; rótulo "um arquivo, todas as páginas".

---

## Bloco 07 — No editor da Destrava, e o atributo style

**Fala:**
Nos exercícios da Destrava, o editor tem uma aba HTML e uma aba cê ésse ésse. A aba cê ésse ésse faz o papel do estilo ponto cê ésse ésse: o que você escreve ali já vale para a página da prévia. Então, nos exercícios, as regras vão na aba cê ésse ésse. Existe ainda uma terceira forma, que você vai encontrar por aí: o atributo stáil, direto na tag. Por exemplo, um pê com stáil igual a cálor, dois pontos, vermelho. Funciona, mas só para aquele elemento, e mistura a estrutura com a aparência no mesmo lugar. Fica difícil de achar e de mudar depois. Neste curso, a gente não usa. Arquivo separado sempre que der, e a tag stáil para testes rápidos.

**Tela:** o editor da Destrava com as abas "HTML" e "CSS"; a aba "CSS" é clicada e mostra as regras da Ana, com uma seta até o arquivo `estilo.css` e o rótulo "a aba CSS = o seu estilo.css". Depois, um cartão com `<p style="color: red;">Texto vermelho</p>`: o atributo `style` é destacado em amarelo, com o rótulo "atributo style: só aquele elemento". Embaixo, um ranking com três linhas: "1. arquivo separado (`<link>`)" com check verde, "2. tag `<style>` (testes rápidos)" com check verde, "3. atributo `style` (evite)" com um sinal de atenção.

---

## Bloco 08 — Os erros mais comuns

**Fala:**
Agora, os erros que mais aparecem nessa primeira semana de cê ésse ésse. Um detalhe importante: quando o cê ésse ésse tem um erro, o navegador não reclama. Ele só ignora aquela parte, e você fica sem entender por que nada mudou. O primeiro erro: esquecer o ponto e vírgula. A declaração seguinte gruda na anterior, e as duas param de funcionar. O segundo: escrever a propriedade errado, ou em português. Cor, dois pontos, azul não existe. É cálor, e o valor também é em inglês. O terceiro: esquecer de fechar as chaves, e a regra seguinte se perde. O quarto é na línk: esquecer o rél, ou errar o nome do arquivo no agá réf. Se nada mudou na página, confira essas quatro coisas primeiro.

**Tela:** um aviso no topo: "CSS com erro não dá mensagem: o navegador só ignora". Quatro cartões aparecem em sequência, cada um com o erro e a correção:
1. `color: navy` seguido de `font-size: 18px;` sem `;` entre eles, com "x" vermelho e o rótulo "sem ponto e vírgula, as duas falham"; embaixo, a versão certa com check verde.
2. `cor: azul;` com "x" vermelho; embaixo, `color: blue;` com check verde e o rótulo "propriedade e valor em inglês".
3. uma regra sem `}`, com a regra seguinte em cinza, rótulo "abriu, fechou"; embaixo, a correção com check verde.
4. `<link href="estilo.css">` sem `rel`, e `<link rel="stylesheet" href="estilos.css">` com o "s" a mais em vermelho; embaixo, `<link rel="stylesheet" href="estilo.css">` com check verde.
No fim, os cartões encolhem para uma checklist: "ponto e vírgula", "nome em inglês", "chaves fechadas", "link com rel e caminho certo".

---

## Bloco 09 — Experimente

**Fala:**
Antes dos exercícios, um convite: brinque um pouco. O cê ésse ésse se aprende mexendo. Troque o nêivi por outra cor: grín, que é verde, pârpou, que é roxo, ou tomêitou, que é um vermelho alaranjado. Mude o tamanho dos parágrafos para vinte pê xis, ou para quatorze, e veja a diferença. Pinte o fundo de outra cor e repare se o texto continua fácil de ler. Se ficar estranho, não tem problema: é só voltar o valor. Nada quebra a estrutura da página. Esse é o lado bom de separar as coisas. O HTML continua o mesmo, e você testa quantos visuais quiser. Na aula de cores, você vai aprender a escolher combinações que ficam bonitas e legíveis.

**Tela:** a página da Ana na prévia, com o `estilo.css` ao lado. O valor `navy` é trocado em sequência por `green`, `purple` e `tomato`, e o título muda de cor a cada troca (cada cor com a tradução em um rótulo pequeno). Depois, `18px` vira `20px` e `14px`, e os parágrafos crescem e encolhem. Por fim, o fundo vira `black` com o texto preto quase sumindo, com um sinal de atenção e o rótulo "dá para ler?"; o valor volta para `lightyellow`, com check verde. Rótulo final: "mexeu, viu, voltou: nada quebra".

---

## Bloco 10 — Resumo e próximo degrau

**Fala:**
Vamos recapitular. O HTML é a estrutura, e o cê ésse ésse é a aparência. Toda regra tem um seletor, abre chaves, uma ou mais declarações com propriedade, dois pontos, valor e ponto e vírgula, e fecha chaves. Você conheceu três propriedades: cálor, para a cor do texto, béquigráund cálor, para a cor do fundo, e fónti sáiz, para o tamanho da letra. O cê ésse ésse pode ficar na tag stáil, dentro do head, ou, melhor ainda, num arquivo separado, ligado com a tag línk, com rél igual a stáil xíti. Agora é a sua vez: os exercícios estão logo abaixo do vídeo. E fica uma pergunta para a próxima aula: e se a Ana quiser pintar só um parágrafo, e não todos? Para isso existem os seletores de classe e de ái di. Até lá, e bora destravar.

**Tela:** lista do resumo aparecendo item por item com checks verdes ("HTML = estrutura, CSS = aparência", "regra: `seletor { propriedade: valor; }`", "`color`, `background-color`, `font-size`", "`<style>` no head", "`<link rel=\"stylesheet\" href=\"estilo.css\">`: o melhor jeito"); botão "Fazer os exercícios" pulsando. Depois, a página da Ana com três parágrafos iguais; um deles pisca com um ponto de interrogação e o rótulo "e se for só este?". Prévia da próxima aula com `.classe` e `#id` em destaque e o texto "Aula 2 — Seletores: tag, classe e id". Encerramento com o logo da Destrava e o slogan "Destrava sua carreira. Um nível de cada vez."
