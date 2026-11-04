# Aula 10 — Responsivo: o básico

**Nível:** Primeira Demão · **Duração estimada:** ~11 minutos · **Blocos:** 11

## Como este roteiro é usado

- A voz do vídeo é **gerada por IA** a partir do texto em "Fala". Por isso a "Fala" precisa soar natural quando lida em voz alta: frases curtas, sem siglas soltas, com os símbolos de código ditos por extenso.
- O que está em "Tela" é o que o pipeline de vídeo anima (editor da Destrava, prévia do navegador, rótulos, setas, checks). Não é lido pela voz.
- Um áudio por bloco: `bloco01`, `bloco02`... Para corrigir uma fala, gere de novo só aquele bloco.
- Todo o conteúdo de exemplo é fictício (a aluna "Ana"). Nada de marcas, empresas ou sites reais: os endereços usam o domínio reservado `example.com`. Ferramentas citadas de forma genérica ("as ferramentas de desenvolvedor do navegador", "o modo de tela de celular"), sem nomes de produtos nem de aparelhos. Os celulares, tablets e computadores da "Tela" são desenhos genéricos, sem marca.
- A página da Ana é a mesma da aula 9 (com o `header` que tem o `h1` e o menu `nav`, a seção `#projetos` com os três cartões `article.cartao` dentro da `div.projetos`, e o `footer` com dois parágrafos), já ligada ao `estilo.css`, com tudo o que foi feito até a aula 9: `*` com `box-sizing: border-box;`; `body` com fundo `#fdf6e3` (creme), `font-family: Verdana, Arial, sans-serif;`, `font-size: 1.125rem;` e `line-height: 1.6;`; `p` com `color: #333333`; `h1, h2, h3` com `color: #264653` (azul-petróleo), `font-family: Georgia, "Times New Roman", serif;` e `line-height: 1.2;`; `h1` com `text-align: center;` e `font-size: 2rem;`; `h2` com `font-size: 1.5rem;`; `.destaque` com `font-weight: bold;`, `padding: 8px 16px;` e `border-left: 4px solid #b5452c;`; `.destaque, nav a` com `color: #b5452c` (terracota); `nav a` sem sublinhado, em negrito, com `display: inline-block;` e `padding: 8px 12px;`; `section` com `background-color: #ffffff;`, `padding: 16px;`, `border: 2px solid #264653;`, `border-radius: 8px;` e `margin-bottom: 24px;`; `main` com `max-width: 720px;` e `margin: 0 auto;`; `img` com `border-radius: 50%;`, `max-width: 100%;`, `height: auto;` e `display: block;`; `header` com `display: flex;`, `justify-content: space-between;` e `align-items: center;`; `nav ul` com `display: flex;`, `gap: 16px;`, `list-style: none;` e `padding: 0;`; `.projetos` com `display: flex;`, `gap: 16px;` e `flex-wrap: wrap;`; `.cartao` com `flex: 1;`, `min-width: 200px;`, `display: flex;`, `flex-direction: column;`, fundo creme, `padding: 16px;`, borda `1px solid #264653` e `border-radius: 8px;`; `.cartao a` com `margin-top: auto;`; `footer` com fundo `#264653`, `display: flex;`, `justify-content: space-between;`, `flex-wrap: wrap;`, `gap: 8px;` e `padding: 0 16px;`; `footer p` com `color: #ffffff`. Nesta aula não entra nenhuma cor nova.
- A ordem do arquivo importa nesta aula: o bloco `@media` fica **no fim** do `estilo.css`, depois de todas as regras. Assim, nas telas grandes, a regra de dentro do `@media` vem por último e vence a de fora (aula 2: "vence a que vem por último no arquivo").
- O `768px` é só um exemplo de ponto de quebra, escolhido porque é onde o topo da Ana começa a caber em linha. A "Fala" não promete que um aparelho tem tal largura: diz "telas mais largas" e "telas estreitas, como a da maioria dos celulares".
- Na "Fala", os termos de CSS e as tags são escritos do jeito que se fala, com as mesmas grafias das aulas anteriores: `CSS` = "cê ésse ésse", `px` = "pê xis", `rem` = "rém", `h1` = "agá um", `p` = "pê", `nav` = "név", `ul` = "u éle", `header` = "rédêr", `main` = "mêin", `footer` = "fúter", `img` = "img" (dito "a imagem" quando possível), `width` = "uídth", `max-width` = "méx uídth", `min-width` = "mín uídth", `font-size` = "fónti sáiz", `display` = "displêi", `flex` = "fléx", `flexbox` = "fléx bócs", `flex-direction` = "fléx dairécxon", `flex-wrap` = "fléx ráp", `wrap` = "ráp", `row` = "rôu", `column` = "cólam", `justify-content` = "djâstifai cóntent", `align-items` = "aláin áitems", `gap` = "guép", `name` = "nêim" (do nível 1). Do nível 1: `head` e `meta charset` seguem com o nome normal ("o head", "a meta charset"). Novas nesta aula: `meta` = "méta" (quando é a tag nova), `viewport` = "víu pórt", `content` = "cóntent", `device-width` = "divaiss uídth", `initial-scale` = "inichal squêil", `@media` = "arroba mídia", `min-width` dentro do `@media` continua "mín uídth", `max-width` dentro do `@media` continua "méx uídth", "mobile first" fica só na "Tela" (na "Fala": "celular primeiro"), "breakpoint" fica só na "Tela" (na "Fala": "ponto de quebra"). Os números com unidade são ditos por extenso: `768px` = "setecentos e sessenta e oito pê xis", `720px` = "setecentos e vinte pê xis", `200px` = "duzentos pê xis", `1000px` = "mil pê xis", `1.125rem` = "um vírgula um dois cinco rém", `1.25rem` = "um vírgula vinte e cinco rém"; o `%` é dito "por cento" (`100%` = "cem por cento"); o `1` de `initial-scale=1` é dito "um". Os símbolos são ditos por extenso: `{` = "abre chaves", `}` = "fecha chaves", `(` = "abre parênteses", `)` = "fecha parênteses", `:` = "dois pontos", `;` = "ponto e vírgula", `=` = "igual a", `,` = "vírgula", `@` = "arroba", aspas = "entre aspas". Seguem com o nome normal: HTML, body, tablet, estilo ponto cê ésse ésse, index ponto HTML.

---

## Bloco 01 — Abertura

**Fala:**
Olá, seja bem-vindo à aula dez da Primeira Demão. Na aula passada, a Ana montou os cartões de projetos, e eles se ajeitam sozinhos quando a tela fica estreita. Hoje, a gente vai cuidar da página inteira nas telas de todos os tamanhos. Pensa em quem vai visitar a página da Ana. Uma pessoa abre no celular, no ônibus. Outra abre no tablet, no sofá. Outra, no computador do trabalho. É a mesma página, com o mesmo HTML e o mesmo cê ésse ésse, mas em telas bem diferentes. Uma página responsiva é isso: uma página que responde ao tamanho da tela e fica boa em todas. Para isso, você vai aprender duas peças. A primeira é uma linha de HTML, a méta víu pórt. A segunda é o arroba mídia, que aplica regras só quando a tela tem um certo tamanho. Abre o editor e bora destravar.

**Tela:** logo da Destrava → título "Aula 10 — Responsivo: o básico". A página da Ana aparece em três desenhos genéricos lado a lado: um celular, um tablet e um computador, com a mesma página adaptada em cada um. Rótulo: "a mesma página, muitas telas". Um cartão de revisão mostra `.projetos { display: flex; gap: 16px; flex-wrap: wrap; }` com o rótulo "aula 9: já se ajeita". As etiquetas `<meta name="viewport">` e `@media` aparecem em destaque.

---

## Bloco 02 — O que já é responsivo

**Fala:**
Antes de escrever qualquer coisa nova, vamos ver o que a Ana já tem de bom. Abrindo a página numa tela estreita, muita coisa já funciona. O mêin tem méx uídth de setecentos e vinte pê xis. Isso é um teto, não uma largura fixa. No computador, ele para em setecentos e vinte. No celular, ele encolhe e ocupa a tela toda. A foto da Ana tem méx uídth de cem por cento, da aula seis. Então ela nunca fica maior que a caixa onde está, e não vaza para fora da tela. E os cartões têm fléx ráp e mín uídth, da aula passada. Numa tela estreita, eles descem, um embaixo do outro. Repara que nada disso tem uma largura fixa em pê xis. Esse é o segredo do responsivo: medidas que podem encolher. Mas ainda tem duas coisas para arrumar: o topo, que fica apertado, e um problema que só aparece num celular de verdade.

**Tela:** a prévia da página da Ana estreitando aos poucos. Três destaques aparecem, cada um com um check verde e um cartão de revisão:
- `main { max-width: 720px; }` → o `main` encolhe junto com a tela; rótulo "aula 6: teto, não largura fixa".
- `img { max-width: 100%; height: auto; }` → a foto diminui e não vaza; rótulo "aula 6".
- `.cartao { flex: 1; min-width: 200px; }` → os cartões descem; rótulo "aula 9".
Rótulo geral: "medidas que podem encolher". Por fim, o topo da página estreita: o `h1` quebrando em várias linhas, espremido ao lado do menu; ponto de interrogação laranja.

---

## Bloco 03 — O problema do celular de verdade

**Fala:**
Agora, o problema que só aparece no celular de verdade. A Ana abriu a página dela no celular, e levou um susto. A página apareceu inteira, mas minúscula. Parecia a página do computador, só que encolhida, com letras tão pequenas que ela precisou dar zoom com os dedos para conseguir ler. Os cartões nem desceram. Por que isso acontece? Quando os celulares começaram a abrir sites, quase todos os sites eram feitos só para computador. Então o navegador do celular finge que tem uma tela larga, de uns mil pê xis, monta a página nesse tamanho e depois encolhe tudo para caber na tela. Para um site antigo, isso ajuda. Para a página da Ana, que já se ajeita sozinha, atrapalha. O navegador nem deixa a página perceber que a tela é estreita. A solução é avisar o navegador: esta página sabe se adaptar, pode usar a largura de verdade da tela.

**Tela:** um desenho genérico de celular com a página da Ana minúscula, inteira, como uma miniatura do computador; os cartões lado a lado, bem pequenos; uma lupa mostra as letras ilegíveis; dois dedos fazendo o gesto de zoom. Rótulo: "sem a meta viewport". Depois, uma animação: um retângulo largo de "~1000px" com a página montada dentro; ele encolhe até caber no celular. Rótulo: "o navegador finge uma tela larga e encolhe tudo". Por fim, um balão saindo da página para o navegador: "eu sei me adaptar: use a largura da tela".

---

## Bloco 04 — A meta viewport

**Fala:**
Esse aviso é uma tag que vai no head, a méta víu pórt. No nível um, você já colocou uma méta no head: a meta charset, para os acentos funcionarem. Esta é outra. No index ponto HTML, dentro do head, logo depois da meta charset: abre a tag méta, nêim igual a, entre aspas, víu pórt. Depois, cóntent igual a, entre aspas, uídth igual a divaiss uídth, vírgula, inichal squêil igual a um. E fecha a tag. Vamos por partes. Víu pórt é o nome da área da tela onde a página aparece. Uídth igual a divaiss uídth quer dizer: a largura da página é a largura da tela do aparelho. E inichal squêil igual a um quer dizer: comece sem zoom, no tamanho normal. Salva e abre de novo no celular. A página aparece no tamanho certo, com as letras legíveis, e os cartões descem, um embaixo do outro. Essa linha vai em todas as páginas que você fizer. Decore, ou copie sempre.

**Tela:** no `index.html`, o `head` da Ana; uma linha nova entra logo abaixo da `meta charset`:
```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Ana — Sobre mim</title>
  <link rel="stylesheet" href="estilo.css">
</head>
```
cada parte da linha nova ganha uma etiqueta: `name="viewport"` → "a área da tela onde a página aparece"; `width=device-width` → "largura = a da tela do aparelho"; `initial-scale=1` → "começa sem zoom". Cartão "nível 1: a `meta charset`" no canto. Depois, o mesmo celular do bloco 3, antes e depois, lado a lado: à esquerda, a miniatura ilegível ("x" vermelho); à direita, a página no tamanho certo, com os cartões empilhados (check verde). Rótulo: "uma linha, em todas as páginas".

---

## Bloco 05 — Celular primeiro

**Fala:**
Com a méta víu pórt no lugar, dá para ver o topo da página no celular. E ele está apertado. O agá um, olá, eu sou a Ana, fica espremido de um lado, quebrando em três linhas, e o menu do outro, com os links quase caindo para fora. No computador, título de um lado e menu do outro fica ótimo. No celular, fica melhor um embaixo do outro. Aqui entra uma ideia importante: celular primeiro. Você escreve primeiro o cê ésse ésse do celular, que é a tela menor e mais simples. Depois, acrescenta o que muda nas telas maiores. Então, na regra rédêr, que já tem displêi fléx, a Ana acrescenta: fléx dairécxon, dois pontos, cólam, ponto e vírgula. O título e o menu ficam um embaixo do outro, centralizados pelo aláin áitems cênter. E, no név u éle, fléx ráp, dois pontos, ráp, para os links descerem se não couberem. Pronto, o celular está resolvido. Agora, falta devolver o topo em linha para as telas maiores.

**Tela:** um celular genérico com o topo apertado: o `h1` quebrando em três linhas à esquerda, o menu à direita, um link passando da borda (destacado em vermelho). Depois, a etiqueta "mobile first = celular primeiro" e uma escada de dois degraus: "1) o celular (regras normais)" → "2) as telas maiores (`@media`)". No `estilo.css`:
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
```
(as linhas novas, `flex-direction: column;` e `flex-wrap: wrap;`, piscam). No celular, o título sobe e o menu fica embaixo dele, centralizado; check verde. Mas no computador, o topo também fica empilhado, com muito espaço sobrando dos lados; rótulo "no computador, não era isso".

---

## Bloco 06 — A regra @media

**Fala:**
Para aplicar regras só nas telas maiores, existe o arroba mídia. Ele vai no fim do estilo ponto cê ésse ésse. Arroba mídia, abre parênteses, mín uídth, dois pontos, setecentos e sessenta e oito pê xis, fecha parênteses. Isso é a condição. Ela quer dizer: se a tela tiver pelo menos setecentos e sessenta e oito pê xis de largura. Depois da condição, abre chaves. E aqui vem a novidade: dentro dessas chaves, vão regras inteiras, cada uma com o seu seletor e as suas próprias chaves. São chaves dentro de chaves. Uma regra rédêr, abre chaves, fléx dairécxon, dois pontos, rôu, ponto e vírgula, fecha chaves. E, no fim, a chave que fecha o arroba mídia. Nas telas estreitas, a condição é falsa, e o navegador ignora tudo o que está dentro. Nas telas largas, a condição é verdadeira, e essas regras valem. E, como o arroba mídia está no fim do arquivo, a regra de dentro vem por último e vence.

**Tela:** no fim do `estilo.css`, o bloco é escrito parte por parte:
```css
@media (min-width: 768px) {
  header {
    flex-direction: row;
  }
}
```
etiquetas: `@media` → "regras para um tamanho de tela"; `(min-width: 768px)` → "a condição: pelo menos 768px de largura"; as chaves de fora em laranja, rótulo "as chaves do `@media`"; as chaves de `header` em azul, rótulo "as chaves da regra". Rótulo geral: "chaves dentro de chaves". Depois, duas telas: uma estreita, com o bloco `@media` cinza e a etiqueta "condição falsa: ignorado"; uma larga, com o bloco aceso e a etiqueta "condição verdadeira: vale". Cartão "aula 2: vence a que vem por último no arquivo".

---

## Bloco 07 — O topo em linha e a letra maior

**Fala:**
Vamos ver o resultado. Na tela estreita, o topo da Ana continua empilhado: título em cima, menu embaixo. Agora, alargue a janela. Quando ela passa de setecentos e sessenta e oito pê xis, o topo muda sozinho. O título vai para a esquerda e o menu para a direita, na mesma linha, como na aula oito. E repara que a Ana só precisou mudar uma propriedade. O displêi fléx, o djâstifai cóntent e o aláin áitems continuam valendo, lá da regra de fora. Dentro do arroba mídia, vai só o que muda. Aproveitando o mesmo arroba mídia, a Ana quer mais uma coisa. Numa tela grande, a pessoa costuma ler mais longe da tela, então a letra pode crescer um pouco. Dentro do mesmo bloco, uma regra body, abre chaves, fónti sáiz, dois pontos, um vírgula vinte e cinco rém, ponto e vírgula, fecha chaves. Fora do arroba mídia, o body continua com um vírgula um dois cinco rém. No celular, a letra da aula quatro. Nas telas maiores, um pouquinho maior.

**Tela:** a prévia sendo alargada: até `767px`, o topo empilhado; ao passar de `768px`, o `h1` vai para a esquerda e o menu para a direita (animação suave entre os dois). Um contador de largura da janela aparece no canto. Uma seta liga a regra `header` de fora (`display: flex; justify-content: space-between; align-items: center;`) à prévia, rótulo "continua valendo"; outra liga `flex-direction: row;` de dentro do `@media`, rótulo "só o que muda". Depois, o bloco ganha uma segunda regra:
```css
@media (min-width: 768px) {
  header {
    flex-direction: row;
  }

  body {
    font-size: 1.25rem;
  }
}
```
na prévia, o texto dos parágrafos cresce um pouco ao passar de `768px`. Cartão lateral: "fora: `body { font-size: 1.125rem; }` → celular" e "dentro: `font-size: 1.25rem;` → telas maiores".

---

## Bloco 08 — Testando e escolhendo o ponto de quebra

**Fala:**
Como testar tudo isso sem ter dez aparelhos em casa? Tem dois jeitos. O primeiro: arrastar a borda da janela do navegador, deixando ela mais estreita e mais larga, e olhar a página mudar. O segundo: as ferramentas de desenvolvedor do navegador têm um modo de tela de celular. Nele, você escolhe uma largura, e a página aparece como num aparelho daquele tamanho, já com a méta víu pórt fazendo efeito. Mas, sempre que der, abra também num celular de verdade. E por que setecentos e sessenta e oito? Esse número é o ponto de quebra, o tamanho em que a regra muda. Ele é um valor bem comum, mas não é uma lei. Telas estreitas, como a da maioria dos celulares, ficam abaixo dele, e telas mais largas ficam acima. Só que existem aparelhos de todos os tamanhos, e eles mudam todo ano. Por isso, o melhor jeito de escolher é olhar a sua página: estreite a tela e veja onde ela começa a ficar ruim. Para começar, um ou dois pontos de quebra bastam.

**Tela:** primeiro, a borda da janela do navegador sendo arrastada para a esquerda e para a direita, com o contador de largura e a página da Ana mudando. Depois, o modo de tela de celular das ferramentas de desenvolvedor do navegador (genérico), com um campo de largura sendo trocado: `375`, `600`, `800`; a página se reorganiza a cada troca. Rótulo: "teste sem precisar de vários aparelhos". Depois, uma régua horizontal de larguras com uma marca em `768px`, etiqueta "breakpoint = ponto de quebra"; à esquerda, "telas estreitas"; à direita, "telas mais largas". Cartão: "um ou dois pontos de quebra bastam · escolha olhando a sua página".

---

## Bloco 09 — O estilo completo

**Fala:**
Vamos ver como ficou o estilo ponto cê ésse ésse da Ana. Lá em cima, as regras normais, que valem em todas as telas, e são o layout do celular. Na regra rédêr, o fléx dairécxon cólam. No név u éle, o fléx ráp ráp. O body, com um vírgula um dois cinco rém. Os cartões, o mêin e a imagem, do jeito que já estavam. E, no fim do arquivo, um único bloco arroba mídia, com mín uídth de setecentos e sessenta e oito pê xis, e duas regras dentro: o rédêr volta para rôu, e o body ganha um vírgula vinte e cinco rém. E, no index ponto HTML, a méta víu pórt no head. Salva tudo e faz o teste. Estreita a janela: topo empilhado, cartões um embaixo do outro, foto do tamanho da tela. Alarga a janela: topo em linha, três cartões lado a lado, letra um pouco maior. Uma página, um arquivo de estilo, e ela fica boa no celular, no tablet e no computador.

**Tela:** no `index.html`, a `meta viewport` destacada no `head`, com check verde. No `estilo.css`, as regras que mudaram ou entraram nesta aula (as regras das aulas 3 a 9 continuam no arquivo):
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

/* ... as outras regras ... */

@media (min-width: 768px) {
  header {
    flex-direction: row;
  }

  body {
    font-size: 1.25rem;
  }
}
```
uma chave grande à esquerda das regras de cima, rótulo "celular (vale em todas as telas)"; outra à esquerda do `@media`, rótulo "telas maiores (no fim do arquivo)". Depois, a página completa da Ana num celular, num tablet e num computador (desenhos genéricos), lado a lado; check verde em cada um.

---

## Bloco 10 — Os erros comuns

**Fala:**
Agora, os erros mais comuns. O primeiro: esquecer a méta víu pórt. No computador, tudo parece certo. Mas, no celular, a página volta a aparecer minúscula. E o arroba mídia das telas grandes passa a valer no celular, porque o navegador acha que a tela é larga. O segundo: esquecer a chave que fecha o arroba mídia. São chaves dentro de chaves, então cada regra fecha a dela, e o arroba mídia fecha a dele, no fim. Se faltar uma, o navegador se perde e pode estragar as regras que vêm depois. O terceiro: confundir mín uídth com méx uídth. Mín uídth quer dizer a partir dessa largura, para cima. Méx uídth quer dizer até essa largura, para baixo. No celular primeiro, o normal é o mín uídth. O quarto: larguras fixas em pê xis. Uma caixa com uídth de novecentos pê xis passa da tela de qualquer celular. Prefira méx uídth e porcentagem. E o quinto: nos exercícios, escreva o valor exatamente como no enunciado. O corretor confere a declaração, mas não confere se ela está dentro do arroba mídia. Então, preste atenção você nisso.

**Tela:** cinco cartões de erro, cada um com a correção embaixo:
1. o `head` sem a `meta viewport` e o celular com a página minúscula; "x" vermelho; embaixo, `<meta name="viewport" content="width=device-width, initial-scale=1">`, check verde.
2. um `@media` sem a última `}`, com as regras de baixo cinza e quebradas; "x" vermelho; embaixo, o bloco com as chaves coloridas aos pares (laranja para o `@media`, azul para a regra), check verde.
3. uma régua de larguras: `(min-width: 768px)` com uma seta para a direita, rótulo "de 768px para cima"; `(max-width: 768px)` com uma seta para a esquerda, rótulo "até 768px, para baixo"; etiqueta "celular primeiro → `min-width`".
4. `.caixa { width: 900px; }` num celular: a caixa passa da borda, destacada em vermelho; embaixo, `max-width: 900px;` ou `width: 100%;`, check verde.
5. um lembrete: "o corretor confere a declaração, não confere se ela está dentro do `@media`: confira você"; "escreva o valor exatamente como no enunciado: `column`, `row`, `1.25rem`".

---

## Bloco 11 — Resumo e próximo degrau

**Fala:**
Vamos recapitular. Uma página responsiva fica boa em telas de todos os tamanhos: celular, tablet e computador. O primeiro passo é a méta víu pórt no head, com uídth igual a divaiss uídth e inichal squêil igual a um. Sem ela, o celular mostra uma miniatura da página. Depois, celular primeiro: as regras normais são o layout do celular. E, no fim do arquivo, o arroba mídia, com a condição mín uídth de setecentos e sessenta e oito pê xis, e chaves dentro de chaves, para o que muda nas telas maiores. No topo da Ana, cólam no celular e rôu nas telas maiores. E medidas que podem encolher, como o méx uídth e o fléx ráp, já fazem metade do trabalho. Agora é a sua vez: os exercícios estão logo abaixo do vídeo. Na próxima aula, hover e transição: os links da Ana vão reagir quando o mouse passar por cima, com uma mudança suave. Até lá, e bora destravar.

**Tela:** lista do resumo aparecendo item por item com checks verdes ("responsivo = a mesma página, muitas telas", "`<meta name="viewport" content="width=device-width, initial-scale=1">` no `head`", "mobile first: regras normais = celular", "`@media (min-width: 768px) { ... }` no fim do arquivo", "`header`: `column` no celular, `row` nas telas maiores", "medidas que encolhem: `max-width`, `%`, `flex-wrap`"); botão "Fazer os exercícios" pulsando. Prévia da próxima aula: um link do menu da Ana mudando de cor devagar quando o cursor passa por cima, com a etiqueta `:hover`; o texto "Aula 11 — Hover e transição". Encerramento com o logo da Destrava e o slogan "Destrava sua carreira. Um nível de cada vez."
