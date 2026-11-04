# Aula 5 — O modelo de caixa

**Nível:** Primeira Demão · **Duração estimada:** ~11 minutos · **Blocos:** 11

## Como este roteiro é usado

- A voz do vídeo é **gerada por IA** a partir do texto em "Fala". Por isso a "Fala" precisa soar natural quando lida em voz alta: frases curtas, sem siglas soltas, com os símbolos de código ditos por extenso.
- O que está em "Tela" é o que o pipeline de vídeo anima (editor da Destrava, prévia do navegador, rótulos, setas, checks). Não é lido pela voz.
- Um áudio por bloco: `bloco01`, `bloco02`... Para corrigir uma fala, gere de novo só aquele bloco.
- Todo o conteúdo de exemplo é fictício (a aluna "Ana"). Nada de marcas, empresas ou sites reais: os endereços usam o domínio reservado `example.com`. Ferramentas citadas de forma genérica ("as ferramentas de desenvolvedor do navegador", "inspecionar"), sem nomes de produtos.
- A página da Ana é a mesma da aula 9 do nível 1 (com a foto `imagens/foto-ana.jpg`, de 200 por 200, dentro da seção "Sobre mim"), já ligada ao `estilo.css`, com tudo o que foi feito até a aula 4: `body` com fundo `#fdf6e3` (creme), `font-family: Verdana, Arial, sans-serif;`, `font-size: 18px;` e `line-height: 1.6;`; `p` com `color: #333333`; `h1, h2` com `color: #264653` (azul-petróleo), `font-family: Georgia, "Times New Roman", serif;` e `line-height: 1.2;`; `h1` com `text-align: center;`; `.destaque` com `font-weight: bold;`; `.destaque, nav a` com `color: #b5452c` (terracota); `nav a` sem sublinhado e em negrito; `footer` com fundo `#264653` e `footer p` com `color: #ffffff`. Contraste novo desta aula: `#333333` e `#264653` sobre o branco `#ffffff` dos cartões = 12,6:1 e 10,1:1; `#b5452c` sobre `#ffffff` = 5,4:1.
- Na "Fala", os termos de CSS e as tags são escritos do jeito que se fala, com as mesmas grafias das aulas 1 a 4: `CSS` = "cê ésse ésse", `color` = "cálor", `background-color` = "béquigráund cálor", `font-size` = "fónti sáiz", `px` = "pê xis", `class` = "cléss", `id` = "ái di", `h1` = "agá um", `h2` = "agá dois", `p` = "pê", `nav` = "név", `a` = "é", `footer` = "fúter", `section` = "sécchon", `main` = "mêin", `left` = "léft", `right` = "ráit", `none` = "nân", `rem` = "rém", `#264653` = "cerquilha, dois seis, quatro seis, cinco três", `#b5452c` = "cerquilha, bê cinco, quatro cinco, dois cê", `#ffffff` = "cerquilha, seis éfes". Novas nesta aula: `padding` = "péding", `border` = "bórder", `margin` = "márdjin", `border-radius` = "bórder rêidius", `solid` = "sólid", `dashed` = "désht", `dotted` = "dóted", `top` = "tóp", `bottom` = "bótom", `padding-top` = "péding tóp", `padding-left` = "péding léft", `margin-bottom` = "márdjin bótom", `margin-top` = "márdjin tóp", `border-left` = "bórder léft", `box-sizing` = "bócs sáizin". Os números com unidade são ditos por extenso: `16px` = "dezesseis pê xis", `2px` = "dois pê xis", `8px` = "oito pê xis", `24px` = "vinte e quatro pê xis"; o `%` é dito "por cento" (`50%` = "cinquenta por cento"). Os símbolos são ditos por extenso: `.` = "ponto", `#` = "cerquilha", `,` = "vírgula", `{` = "abre chaves", `}` = "fecha chaves", `:` = "dois pontos", `;` = "ponto e vírgula", `-` (sinal de menos) = "menos". Seguem com o nome normal: HTML, body, img, estilo ponto cê ésse ésse. O apelido "TRBL" aparece só na "Tela"; na "Fala", a ordem é dita por extenso: "em cima, direita, embaixo, esquerda".

---

## Bloco 01 — Abertura

**Fala:**
Olá, seja bem-vindo à aula cinco da Primeira Demão. Na aula passada, a Ana cuidou do texto: escolheu as fontes, com reserva, deu ar entre as linhas e tirou o sublinhado do menu. A leitura ficou gostosa. Mas olha a página de longe. Está tudo encostado. O texto gruda nas bordas da tela, as seções se emendam umas nas outras, e a foto é um quadrado duro no meio do texto. Falta espaço. E, para controlar o espaço, você precisa conhecer um segredo do cê ésse ésse: todo elemento da página é uma caixa. Hoje, você vai aprender as camadas dessa caixa. O espaço de dentro, a borda e o espaço de fora. Vai arredondar os cantos, transformar a foto da Ana num círculo e espiar as caixas com as ferramentas do navegador. Abre o editor e bora destravar.

**Tela:** logo da Destrava → título "Aula 5 — O modelo de caixa". Um cartão de revisão mostra `font-family`, `line-height: 1.6` e `text-decoration: none` com o rótulo "aula 4: texto e fontes". Depois, a página da Ana como ficou na aula 4, vista de longe: setas vermelhas apontam o texto colado nas laterais, as duas seções emendadas e a foto quadrada; rótulo "tudo encostado". Por fim, contornos tracejados aparecem em volta de cada elemento (título, parágrafos, seções, foto), com o rótulo "todo elemento é uma caixa".

---

## Bloco 02 — Todo elemento é uma caixa

**Fala:**
Para o navegador, cada elemento é um retângulo, mesmo quando não parece. O título, o parágrafo, a foto, o link, a seção inteira, e até o body, que é a caixa que guarda a página toda. Umas caixas ficam dentro das outras, como numa mudança. E toda caixa tem quatro camadas, de dentro para fora. No centro, o conteúdo: o texto ou a imagem. Em volta dele, o péding, o espaço de dentro, entre o conteúdo e a borda. Depois, a bórder, a borda, a linha que contorna a caixa. E, por fora de tudo, a márdjin, o espaço de fora, que afasta essa caixa das vizinhas. Pensa num quadro pendurado na parede. A foto é o conteúdo. O passe-partout, aquele papel em volta da foto, é o péding. A moldura é a bórder. E a distância até o próximo quadro é a márdjin. Isso tem nome: modelo de caixa. Guarda essa ordem, porque ela vai voltar a aula inteira: conteúdo, péding, bórder e márdjin.

**Tela:** um quadro na parede é montado em camadas, de dentro para fora: a foto ("conteúdo"), um papel claro em volta ("`padding`: espaço de dentro"), a moldura ("`border`: a borda") e o espaço até um segundo quadro ao lado ("`margin`: espaço de fora"). O quadro se transforma no diagrama clássico do modelo de caixa: quatro retângulos, um dentro do outro, com as cores de cada camada (conteúdo azul-claro, `padding` verde, `border` amarelo, `margin` laranja) e as quatro etiquetas. Rótulo: "de dentro para fora: conteúdo → `padding` → `border` → `margin`".

---

## Bloco 03 — Padding: o espaço de dentro

**Fala:**
Vamos começar pelo péding. A Ana quer transformar cada seção da página num cartão branco. Primeiro, ela dá um fundo: sécchon, béquigráund cálor, cerquilha, seis éfes. O cartão aparece, mas o texto fica grudado na beirada branca. Agora, péding, dois pontos, dezesseis pê xis. Pronto: o texto se afasta dezesseis pê xis da beirada, nos quatro lados. E repara num detalhe importante. O fundo branco também cobre a área do péding. O béquigráund cálor pinta o conteúdo e o espaço de dentro. É por isso que o péding parece fazer a caixa crescer. Ele faz parte da caixa. Com a márdjin é diferente, como você vai ver já já. Uma dica: o péding não aceita valor negativo. Se quiser menos espaço, diminua o número, até zero. Valor com o sinal de menos, no péding, o navegador simplesmente ignora.

**Tela:** no `estilo.css`, é digitado:
```css
section {
  background-color: #ffffff;
}
```
a prévia mostra a seção "Sobre mim" com fundo branco e o texto colado na beirada; rótulo "fundo sem espaço". Depois, entra a linha:
```css
  padding: 16px;
```
e o texto se afasta da beirada nos quatro lados, com quatro setinhas verdes marcando `16px`. A área do `padding` pisca em verde, com o rótulo "o fundo cobre o conteúdo + o `padding`". Por fim, `padding: -10px;` aparece riscado, com "x" vermelho e o rótulo "`padding` negativo: ignorado".

---

## Bloco 04 — Os quatro lados e os atalhos

**Fala:**
Até aqui, um valor só, igual nos quatro lados. Mas cada lado tem a sua propriedade. Péding tóp, em cima. Péding ráit, à direita. Péding bótom, embaixo. E péding léft, à esquerda. Elas servem quando só um lado precisa mudar: péding léft, vinte e quatro pê xis, afasta o texto só da esquerda. Mas escrever as quatro dá trabalho, então o péding aceita um atalho, com vários valores separados por espaço. Com dois valores, o primeiro vale para em cima e embaixo, e o segundo para os lados. Péding, oito pê xis, dezesseis pê xis: oito em cima e embaixo, dezesseis à direita e à esquerda. Com quatro valores, a ordem é a do ponteiro do relógio, começando ao meio-dia: em cima, direita, embaixo, esquerda. Péding, um, dois, três, quatro pê xis: um em cima, dois à direita, três embaixo e quatro à esquerda. Essa ordem do relógio vale também para a márdjin, que você vai ver daqui a pouco.

**Tela:** uma caixa com quatro setas, cada uma com a sua propriedade: `padding-top`, `padding-right`, `padding-bottom`, `padding-left`. Depois, três linhas de atalho, cada uma com a sua caixa ao lado:
- `padding: 16px;` → os quatro lados acendem juntos; rótulo "1 valor: todos os lados".
- `padding: 8px 16px;` → em cima e embaixo acendem com `8px`, os lados com `16px`; rótulo "2 valores: em cima/embaixo, lados".
- `padding: 1px 2px 3px 4px;` → um relógio aparece sobre a caixa e o ponteiro gira do meio-dia, acendendo em cima, direita, embaixo e esquerda; rótulo "4 valores: sentido do relógio (TRBL: top, right, bottom, left)".

---

## Bloco 05 — Border: a borda

**Fala:**
Agora, a bórder. A borda tem três informações: a largura, o estilo e a cor. Dá para escrever tudo numa linha só, nessa ordem. Bórder, dois pontos, dois pê xis, espaço, sólid, espaço, cerquilha, dois seis, quatro seis, cinco três. Uma borda de dois pê xis, contínua, no azul-petróleo da Ana. O estilo é a parte que mais gente esquece. Sólid é a linha contínua. Désht é tracejada. Dóted é pontilhada. E nân quer dizer sem borda. Se quiser, dá para escrever cada parte numa propriedade separada, mas o atalho em uma linha é o mais usado. Atenção: sem o estilo, a borda não aparece. Bórder, dois pê xis, cerquilha, dois seis, quatro seis, cinco três, sem o sólid, não mostra nada. A borda também tem versões por lado, como a bórder léft, só do lado esquerdo. E fica a dica: para o corretor, use a ordem do enunciado. Largura, estilo, cor.

**Tela:** no `estilo.css`, a regra `section` ganha a linha:
```css
  border: 2px solid #264653;
```
os três valores se separam em três etiquetas: `2px` ("largura"), `solid` ("estilo"), `#264653` ("cor"); na prévia, o cartão ganha uma moldura azul-petróleo. Depois, três quadrados lado a lado: `solid` (linha contínua), `dashed` (tracejada) e `dotted` (pontilhada), e um quarto com `none` (sem borda). Em seguida, `border: 2px #264653;` com um quadrado sem moldura, um ponto de interrogação e o rótulo "sem o estilo, não aparece". Por fim, `border-left: 4px solid #b5452c;` com uma faixa terracota só do lado esquerdo; rótulo "uma borda só de um lado".

---

## Bloco 06 — Cantos arredondados

**Fala:**
Caixa não precisa ter canto vivo. A bórder rêidius arredonda os cantos. Quanto maior o valor, mais redondo. A Ana colocou bórder rêidius, oito pê xis, nos cartões das seções. O cartão ficou mais macio, mais moderno. E o arredondado funciona mesmo sem borda: o fundo também acompanha a curva. Agora, um truque que todo mundo adora. A foto da Ana tem duzentos por duzentos pê xis, é um quadrado. Se o bórder rêidius for cinquenta por cento, cada canto se curva até a metade do lado, e o quadrado vira um círculo. Img, abre chaves, bórder rêidius, dois pontos, cinquenta por cento, ponto e vírgula, fecha chaves. Pronto: foto redonda, como nos perfis de rede social. Se a imagem não for quadrada, os mesmos cinquenta por cento fazem uma forma oval, não um círculo.

**Tela:** um quadrado com o `border-radius` crescendo, em sequência: `0` (canto vivo), `8px` (levemente arredondado), `24px` (bem arredondado); rótulo "maior valor = mais redondo". No `estilo.css`, a regra `section` ganha `border-radius: 8px;` e o cartão da Ana arredonda os cantos. Depois:
```css
img {
  border-radius: 50%;
}
```
a foto quadrada da Ana, de `200 × 200`, vira um círculo; marcas mostram cada canto se curvando até a metade do lado, com o rótulo "quadrado + `50%` = círculo". Por fim, um retângulo deitado com `50%` vira uma forma oval; rótulo "não é quadrado? fica oval".

---

## Bloco 07 — Margin: o espaço de fora

**Fala:**
Por último, a márdjin, o espaço de fora da caixa. Ela empurra as caixas vizinhas para longe. Os cartões da Ana estão colados um no outro. Então, na regra da sécchon, ela coloca márdjin bótom, dois pontos, vinte e quatro pê xis. Agora, cada cartão deixa vinte e quatro pê xis livres embaixo, e o creme do fundo da página aparece entre eles. E aqui está a diferença mais importante da aula. O béquigráund cálor pinta o péding, mas não pinta a márdjin. A márdjin é sempre transparente: ali aparece o fundo de quem está por trás. Por isso, péding é espaço dentro do cartão, e márdjin é espaço entre os cartões. A márdjin usa os mesmos atalhos do péding, de um, dois ou quatro valores. E aceita valor negativo, mas isso é para outro dia. Mais uma: o body já vem do navegador com uma márdjin de oito pê xis em volta da página. É por isso que o conteúdo nunca encosta de verdade na beirada da janela.

**Tela:** na prévia, os dois cartões da Ana estão emendados. No `estilo.css`, a regra `section` ganha:
```css
  margin-bottom: 24px;
```
um espaço creme se abre entre os cartões, com uma seta laranja marcando `24px`. Depois, o diagrama de uma caixa com fundo branco: a área do `padding` fica branca (check verde, "o fundo pinta"), a área da `margin` fica transparente, mostrando o creme por trás ("x" cinza, "o fundo não pinta"). Um cartão compara: "`padding` = espaço dentro do cartão" e "`margin` = espaço entre os cartões". Uma etiqueta pequena mostra `margin: 0 0 24px 0;` com o rótulo "mesmos atalhos do `padding`". Por fim, a janela do navegador com uma faixa fininha em volta da página e a etiqueta "`body`: `margin` de `8px` que já vem do navegador".

---

## Bloco 08 — Margens que se encontram e a ferramenta de inspeção

**Fala:**
Uma curiosidade das margens. Quando a margem de baixo de uma caixa encontra a margem de cima da caixa seguinte, o navegador não soma as duas. Ele fica só com a maior. Vinte e quatro pê xis embaixo e dezesseis em cima dão vinte e quatro, e não quarenta. Isso se chama colapso de margens. Isso só acontece com as margens de cima e de baixo, nunca com as dos lados. Não precisa decorar. Só lembra disso quando um espaço ficar menor do que você esperava. E, quando o espaço não fizer sentido, peça ajuda ao navegador. Clica com o botão direito no elemento, em inspecionar. Nas ferramentas de desenvolvedor, além das regras, existe um desenho do modelo de caixa daquele elemento, com o conteúdo, o péding, a bórder e a márdjin, cada camada com os seus números. Passando o mouse, a página pinta cada camada de uma cor. É o jeito mais rápido de descobrir de onde vem um espaço.

**Tela:** duas caixas empilhadas: a de cima com `margin-bottom: 24px`, a de baixo com `margin-top: 16px`. Uma conta aparece, `24 + 16 = 40`, e é riscada; no lugar, o espaço real mostra `24px` com o rótulo "fica a maior: colapso de margens". Depois, a página da Ana no navegador; clique com o botão direito sobre o cartão "Sobre mim" → "Inspecionar". Um painel genérico de ferramentas de desenvolvedor mostra o diagrama do modelo de caixa com os números (`margin` `24` embaixo, `border` `2`, `padding` `16`, conteúdo com a largura e a altura). O mouse passa sobre o diagrama e, na página, o cartão ganha camadas coloridas (`padding` verde, `margin` laranja). Rótulo: "botão direito → inspecionar → modelo de caixa".

---

## Bloco 09 — A caixa na página da Ana

**Fala:**
Agora, a Ana junta tudo no estilo ponto cê ésse ésse. Na regra da sécchon: fundo branco, péding de dezesseis pê xis, bórder de dois pê xis, sólid, azul-petróleo, bórder rêidius de oito pê xis e márdjin bótom de vinte e quatro. Cada seção virou um cartão, com o fundo creme aparecendo entre eles. Na img, o bórder rêidius de cinquenta por cento deixou a foto redonda. E o parágrafo de destaque ganhou um capricho. Um péding de oito pê xis em cima e embaixo, e dezesseis nos lados, com o atalho de dois valores. E uma bórder léft de quatro pê xis, sólid, terracota, como uma marca na lateral. Repara que o texto continua fácil de ler: o cinza escuro e o azul-petróleo têm ótimo contraste no branco. E nada de márdjin na foto ou nos títulos: o péding dos cartões já dá o respiro. Com poucas linhas, a página deixou de ser um bloco de texto e ganhou respiro.

**Tela:** o `estilo.css` da Ana sendo atualizado, uma declaração por vez, cada uma refletida na prévia (as regras de cor e de texto das aulas 3 e 4 continuam no arquivo):
```css
section {
  background-color: #ffffff;
  padding: 16px;
  border: 2px solid #264653;
  border-radius: 8px;
  margin-bottom: 24px;
}

img {
  border-radius: 50%;
}

.destaque {
  font-weight: bold;
  padding: 8px 16px;
  border-left: 4px solid #b5452c;
}
```
a prévia final mostra os dois cartões brancos com moldura azul-petróleo e cantos arredondados, separados pelo creme do fundo; a foto da Ana redonda; o destaque em negrito terracota, com a faixa na lateral esquerda. Um cartão de contraste: "`#333333` no branco: 12,6:1" e "`#264653` no branco: 10,1:1", com checks verdes. Rótulo: "cartões: `padding` + `border` + `border-radius` + `margin`".

---

## Bloco 10 — Erros comuns

**Fala:**
Agora, os erros mais comuns com caixas. O primeiro: esquecer o estilo da borda. Sem sólid, désht ou dóted, a borda não aparece, mesmo com largura e cor. O segundo: trocar péding por márdjin. Se o fundo precisa crescer em volta do texto, é péding. Se a caixa precisa se afastar da vizinha, é márdjin. Na dúvida, abre a ferramenta de inspeção e olha onde o espaço está. O terceiro: errar a ordem do atalho de quatro valores. Lembra do relógio, começando ao meio-dia: em cima, direita, embaixo, esquerda. O quarto: péding negativo. Ele não existe, e o navegador ignora a declaração inteira. E o quinto, para os exercícios: o corretor diferencia o atalho da propriedade por lado. Márdjin bótom, vinte e quatro pê xis, é diferente de márdjin, zero, zero, vinte e quatro, zero. Use a forma que o enunciado pedir.

**Tela:** cinco cartões de erro, cada um com a correção embaixo:
1. `border: 2px #264653;` com um quadrado sem moldura e "x" vermelho; embaixo, `border: 2px solid #264653;` com check verde e a palavra `solid` destacada.
2. um cartão com o texto grudado na beirada e o rótulo "`margin` no lugar de `padding`"; embaixo, o mesmo cartão com `padding`, check verde, e o lembrete "fundo em volta do texto: `padding`; espaço entre caixas: `margin`".
3. `padding: 4px 1px 2px 3px;` com as setas nos lados errados e o rótulo "ordem trocada?"; embaixo, o relógio com "em cima → direita → embaixo → esquerda".
4. `padding: -10px;` riscado, com "x" vermelho e o rótulo "não existe: ignorado".
5. `margin: 0 0 24px 0;` e `margin-bottom: 24px;` lado a lado, com o sinal de diferente entre eles e o rótulo "para o corretor, atalho ≠ propriedade por lado".
No fim, o aviso da aula 1: "CSS com erro não dá mensagem", e um lembrete: "nos exercícios, escreva o valor exatamente como no enunciado, na mesma ordem: `2px solid #264653`".

---

## Bloco 11 — Resumo e próximo degrau

**Fala:**
Vamos recapitular. Todo elemento é uma caixa, com quatro camadas: o conteúdo, o péding, a bórder e a márdjin. O péding é o espaço de dentro, e o fundo pinta essa área. A bórder é a borda, com largura, estilo e cor, e sem o estilo ela não aparece. A márdjin é o espaço de fora, sempre transparente, e entre duas caixas fica a maior margem. Os atalhos aceitam um valor para todos os lados, dois para em cima e embaixo e para os lados, ou quatro, no sentido do relógio. A bórder rêidius arredonda os cantos, e cinquenta por cento num quadrado faz um círculo. Agora é a sua vez: os exercícios estão logo abaixo do vídeo. Na próxima aula, você vai definir a largura e a altura das caixas e vai conhecer o bócs sáizin, que deixa essa conta bem mais simples. Até lá, e bora destravar.

**Tela:** lista do resumo aparecendo item por item com checks verdes ("conteúdo → `padding` → `border` → `margin`", "`padding: 16px;`: o fundo pinta", "`border: 2px solid #264653;`", "`margin-bottom: 24px;`: transparente", "1, 2 ou 4 valores: em cima, direita, embaixo, esquerda", "`border-radius: 50%;` = círculo", "botão direito → inspecionar"); botão "Fazer os exercícios" pulsando. Prévia da próxima aula: um cartão da Ana com uma régua de largura em cima, o `padding` e a `border` se somando à largura, e a etiqueta `box-sizing: border-box`; o texto "Aula 6 — Tamanhos e unidades". Encerramento com o logo da Destrava e o slogan "Destrava sua carreira. Um nível de cada vez."
