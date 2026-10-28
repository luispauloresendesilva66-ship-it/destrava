# Aula 4 — Imagens

**Nível:** Primeiro Commit · **Duração estimada:** ~10 minutos · **Blocos:** 12

## Como este roteiro é usado

- A voz do vídeo é **gerada por IA** a partir do texto em "Fala". Por isso a "Fala" precisa soar natural quando lida em voz alta: frases curtas, sem siglas soltas, com os símbolos de código ditos por extenso.
- O que está em "Tela" é o que o pipeline de vídeo anima (editor da Destrava, prévia do navegador, rótulos, setas, checks). Não é lido pela voz.
- Um áudio por bloco: `bloco01`, `bloco02`... Para corrigir uma fala, gere de novo só aquele bloco.
- Todo o conteúdo de exemplo é fictício (a aluna "Ana"). Nada de marcas, empresas ou sites reais: os endereços usam o domínio reservado `example.com`.
- As imagens do exemplo são **ilustrações genéricas** desenhadas pelo pipeline: `foto-ana.jpg` é um avatar ilustrado simples (sem foto de pessoa real) e `projeto-receitas.png` é uma miniatura estilizada de uma página de receitas fictícia.

---

## Bloco 01 — Abertura

**Fala:**
Olá, que bom te ver de novo. Na aula passada, a página da Ana ganhou links: para um site de receitas, para a página de projetos, para as seções e para o e-mail dela. E eu prometi que as imagens iam ganhar uma aula só delas. Chegou a hora. Uma página só com texto funciona, mas uma imagem bem colocada ajuda a contar a história. Hoje a Ana vai ganhar uma foto de perfil e uma miniatura do projeto de receitas. Você vai aprender a colocar a imagem, a descrever o que ela mostra para quem não consegue ver, a acertar o tamanho e a escrever uma legenda. E vai reaproveitar o que aprendeu sobre pastas. Abre o editor e bora destravar.

**Tela:** logo da Destrava animando → título "Aula 4 — Imagens" → os 5 degraus do curso com o primeiro aceso; ao lado, a página "Sobre mim" da Ana, da aula passada, aparece só com texto e links azuis; um espaço vazio tracejado surge abaixo do `<h1>` e se preenche com o avatar ilustrado da Ana; na página "Projetos", outro espaço tracejado se preenche com a miniatura do site de receitas, com uma legenda embaixo. Rótulo: "o que a gente vai construir hoje".

---

## Bloco 02 — A tag img e o src

**Fala:**
A imagem é a tag img, de image, imagem em inglês. E ela tem uma diferença importante em relação às tags que você já conhece: ela não tem fechamento. Pensa bem: o parágrafo tem um texto dentro, e o link tem as palavras que a pessoa clica. Mas a imagem não envolve conteúdo nenhum. Ela é o próprio conteúdo. Por isso, a gente chama a img de tag vazia. Você abre, coloca os atributos, e pronto, sem nenhuma barra img no final. Lembra do br, a quebra de linha? É a mesma ideia. E, assim como o link precisa do href, a imagem precisa do src, que vem de source, fonte. O src diz qual arquivo de imagem o navegador deve mostrar.

**Tela:** lado a lado, três tags: `<p>texto</p>`, `<a href="...">texto</a>` e `<img src="...">`; nas duas primeiras, o conteúdo entre abertura e fechamento brilha, com o rótulo "tem conteúdo dentro"; na `<img>`, só a abertura, com o rótulo "tag vazia: sem fechamento". Um `</img>` aparece ao lado, recebe um "x" vermelho e some. Ao lado, `<br>` surge com o rótulo "mesma ideia". Por fim, `src="..."` fica destacado com o rótulo "source = fonte: qual arquivo mostrar", e uma seta liga o `href` do link ao `src` da imagem, com o rótulo "cada um com o seu endereço".

---

## Bloco 03 — Uma pasta para as imagens

**Fala:**
Antes de escrever o src, a Ana organiza os arquivos. Lembra da pasta paginas? Agora ela cria, na pasta principal do site, outra pasta: imagens, sem acento. Dentro dela, vão dois arquivos: foto traço ana ponto jota pê gê, e projeto traço receitas ponto pê ene gê. No index, logo abaixo do h1, vai a img com o src igual a imagens, barra, foto traço ana ponto jota pê gê. É um caminho relativo, igual aos links: o nome da pasta para entrar. E na página de projetos, que está dentro da pasta paginas? De lá, a pasta imagens está uma pasta acima. Então o caminho começa com ponto, ponto, barra. Mesma regra: o nome da pasta entra, e o ponto, ponto, barra sobe.

**Tela:** na árvore de arquivos, uma pasta `imagens` é criada dentro de `site-da-ana` e os dois arquivos entram nela, cada um com uma miniatura ilustrada ao lado (o avatar da Ana e a tela de receitas):
```
site-da-ana/
├── index.html
├── imagens/
│   ├── foto-ana.jpg
│   └── projeto-receitas.png
└── paginas/
    └── projetos.html
```
no editor do `index.html`, abaixo do `<h1>`, é digitado:
```html
<img src="imagens/foto-ana.jpg">
```
a linha fica destacada; uma seta desce da raiz para dentro de `imagens`, rotulada "entra na pasta". Na prévia, o avatar ilustrado aparece abaixo do título, bem grande. Depois, no `projetos.html`, aparece `<img src="../imagens/projeto-receitas.png">`; uma seta sobe de `paginas` para `site-da-ana` e desce para `imagens`, rotulada "`../` sobe, `imagens/` entra". No canto, o resumo fixo da aula passada volta: "`pasta/` entra · `../` sobe".

---

## Bloco 04 — O alt: o texto alternativo

**Fala:**
Agora, o atributo mais importante da imagem: o alt, de texto alternativo. Ele descreve a imagem em palavras, e faz diferença em três situações. A primeira: quem usa leitor de tela. O programa não enxerga a foto. Ele lê o alt em voz alta. Sem alt, a pessoa ouve só "imagem", ou o nome do arquivo, e fica sem saber o que tem ali. A segunda: quando a imagem não carrega. Pode ser internet lenta ou caminho errado. No lugar da imagem, o navegador mostra um ícone quebrado e o texto do alt, e a informação não se perde. A terceira: os sites de busca. Eles também leem o alt para entender do que a imagem trata. Toda imagem precisa de um alt.

**Tela:** no editor, a linha da imagem ganha o atributo:
```html
<img src="imagens/foto-ana.jpg" alt="Ana sorrindo, com um caderno de anotações na mão">
```
`alt="..."` fica destacado com o rótulo "texto alternativo". Três cartões aparecem em sequência: 1) um ícone de alto-falante com um balão de fala lendo "Imagem: Ana sorrindo, com um caderno de anotações na mão"; antes dele, um balão riscado em vermelho lendo só "foto-ana.jpg", com o rótulo "sem alt"; 2) na prévia, o avatar some e no lugar aparece o ícone de imagem quebrada com o texto do alt ao lado, rotulado "a imagem não carregou, mas a informação ficou"; 3) uma lupa passa sobre o alt, com o rótulo "busca entende a imagem". No fim, os três ícones se juntam com o rótulo "toda imagem precisa de alt".

---

## Bloco 05 — Como escrever um bom alt

**Fala:**
E o que escrever no alt? Pensa assim: se você tivesse que contar essa imagem por telefone para alguém, o que diria? Para a foto da Ana, algo como: Ana sorrindo, com um caderno de anotações na mão. Curto, direto, com o que importa. Não precisa começar com "imagem de", ou "foto de", porque o leitor de tela já avisa que é uma imagem. E nada de repetir o nome do arquivo. Agora, tem imagens que são só enfeite, como um risquinho decorativo entre duas seções. Elas não trazem informação nenhuma. Para essas, você escreve alt igual a aspas vazias: abre e fecha aspas, sem nada dentro. Assim, o leitor de tela entende que pode pular. Vazio, mas presente.

**Tela:** um telefone ilustrado com um balão de fala: "Ana sorrindo, com um caderno de anotações na mão". Depois, três alts no editor, um embaixo do outro:
```html
<img src="imagens/foto-ana.jpg" alt="foto-ana.jpg">
<img src="imagens/foto-ana.jpg" alt="Foto de uma imagem da Ana">
<img src="imagens/foto-ana.jpg" alt="Ana sorrindo, com um caderno de anotações na mão">
```
os dois primeiros recebem "x" vermelho, com os rótulos "nome do arquivo" e "'foto de' sobra"; o terceiro, check verde, com o rótulo "curto e diz o que importa". Em seguida, na prévia, uma linha ondulada decorativa aparece entre duas seções, e o editor mostra `<img src="imagens/enfeite.svg" alt="">`; as aspas vazias ganham uma lupa com o rótulo "imagem de enfeite: alt vazio"; o alto-falante passa por ela em silêncio, com uma setinha de "pular".

---

## Bloco 06 — Tamanho: width e height

**Fala:**
Agora, o tamanho. A foto da Ana tem oitocentos por oitocentos pixels, e isso ocupa quase a tela inteira. Para mostrar menor, você usa os atributos width, que quer dizer largura, e height, que quer dizer altura. Os valores são números em pixels, sem escrever nada depois. Na foto da Ana: width igual a duzentos, e height igual a duzentos. Mas cuidado com a proporção. A foto é quadrada, então largura e altura precisam ser iguais. Se você colocar duzentos de largura e cem de altura, a Ana fica achatada. A regra é: divida os dois pelo mesmo número. E tem um bônus: com o width e o height, o navegador reserva o espaço da imagem antes dela chegar, e a página não fica pulando.

**Tela:** na prévia, o avatar da Ana aparece enorme, ocupando quase tudo, com uma régua mostrando "800 × 800". No editor, a linha ganha os atributos:
```html
<img src="imagens/foto-ana.jpg" alt="Ana sorrindo, com um caderno de anotações na mão" width="200" height="200">
```
`width="200"` → "largura", `height="200"` → "altura"; o avatar encolhe na prévia até ficar do lado do texto, com a régua "200 × 200" e check verde. Depois, um exemplo errado: `width="200" height="100"`, o avatar fica achatado, com "x" vermelho e o rótulo "proporção quebrada"; volta ao normal com o rótulo "800 ÷ 4 = 200 · 800 ÷ 4 = 200". Por fim, uma página carregando: sem width e height, o texto pula para baixo quando a imagem chega ("x"); com eles, um retângulo tracejado guarda o lugar e nada se mexe (check).

---

## Bloco 07 — Arquivos leves e formatos

**Fala:**
Mas diminuir o tamanho na tela não diminui o arquivo. Se a foto original pesa vários megas, o navegador baixa tudo, mesmo mostrando pequena. E imagens pesadas deixam a página lenta, principalmente no celular, com internet fraca. Então, antes de colocar no site, salve a imagem num tamanho próximo do que vai aparecer. E os formatos? O jota pê gê é bom para fotos. O pê ene gê é bom para desenhos, capturas de tela e imagens com fundo transparente. O uébi pê é mais moderno e costuma deixar o arquivo bem menor, com a mesma qualidade. E o esse vê gê é diferente: ele desenha a imagem com formas, então fica nítido em qualquer tamanho. É ótimo para ícones e desenhos simples.

**Tela:** um arquivo `foto-ana.jpg` com uma etiqueta "5 MB" desce por um cano até um celular, devagar, com uma barra de carregamento travando; o rótulo "mostrar pequeno ≠ arquivo leve". Ao lado, o mesmo arquivo redimensionado, com a etiqueta "60 KB", passa rapidinho, com check verde. Depois, quatro cartões lado a lado, cada um com um exemplo ilustrado: `.jpg` → "fotos" (paisagem ilustrada), `.png` → "desenhos, capturas de tela, fundo transparente" (quadriculado de transparência), `.webp` → "moderno, arquivo menor" (setinha de peso para baixo), `.svg` → "formas: nítido em qualquer tamanho" (uma estrela que cresce sem borrar, ao lado de uma estrela `.png` que fica pixelada).

---

## Bloco 08 — Imagem com legenda: figure e figcaption

**Fala:**
Na página de projetos, a Ana quer mostrar a miniatura do projeto de receitas com uma legenda embaixo. Para isso existe a dupla figure e figcaption. A figure é uma caixa que agrupa a imagem e a legenda. Ela abre e, lá dentro, vai a img, com o src ponto, ponto, barra, imagens, barra, projeto traço receitas ponto pê ene gê, e um alt descrevendo a tela. Logo depois vem a figcaption, que é a legenda, com o texto: "Meu primeiro projeto: um site de receitas". Aí fecha a figcaption e fecha a figure. Repara: legenda e alt não são a mesma coisa. A legenda, todo mundo vê, e ela complementa a imagem. O alt substitui a imagem para quem não pode vê-la.

**Tela:** o editor abre `projetos.html` e, abaixo do `<h1>`, é digitado linha por linha:
```html
<figure>
  <img src="../imagens/projeto-receitas.png" alt="Tela do site de receitas, com a lista de pratos" width="320" height="180">
  <figcaption>Meu primeiro projeto: um site de receitas</figcaption>
</figure>
```
cada linha fica destacada enquanto é digitada; uma caixa tracejada envolve a figure, com o rótulo "figure: agrupa imagem e legenda"; `<figcaption>` → "a legenda". Na prévia, a miniatura aparece com a legenda logo abaixo. Por fim, dois rótulos lado a lado com setas: a legenda na prévia → "figcaption: todo mundo vê"; o balão do alto-falante lendo o alt → "alt: substitui a imagem".

---

## Bloco 09 — Uma imagem que é um link

**Fala:**
Lembra da tag a, da aula passada? Dentro dela, em vez de texto, pode ir uma imagem. A Ana quer que a miniatura do projeto leve para o site de receitas. Então, eu coloco a img dentro de um link: abre o a, com o href igual a agá tê tê pê esse, dois pontos, barra, barra, receitas ponto example ponto com. Depois vem a img, e fecha o a. Pronto: clicou na imagem, foi para o site. Mas tem um detalhe. Quando a imagem é um link, o alt vira o texto do link. Então ele precisa dizer para onde o link leva, como você já aprendeu. Em vez de só descrever a tela, escreva algo como: "Abrir o site de receitas da Ana".

**Tela:** dentro da `<figure>`, a `<img>` é envolvida por um link, que aparece digitado em volta dela:
```html
<figure>
  <a href="https://receitas.example.com">
    <img src="../imagens/projeto-receitas.png" alt="Abrir o site de receitas da Ana" width="320" height="180">
  </a>
  <figcaption>Meu primeiro projeto: um site de receitas</figcaption>
</figure>
```
o `<a>` e o `</a>` piscam juntos, com o rótulo "o link envolve a imagem". Na prévia, o cursor passa sobre a miniatura e vira uma mãozinha; clica, e a página "receitas.example.com" desliza por cima. Depois, o alt antigo "Tela do site de receitas..." recebe um "x" e vira "Abrir o site de receitas da Ana", com check verde; o alto-falante lê: "Link: Abrir o site de receitas da Ana". Rótulo: "imagem com link: o alt diz para onde vai".

---

## Bloco 10 — Imagens de outros sites

**Fala:**
O src também aceita um caminho absoluto, com o endereço completo de uma imagem em outro site. Funciona, mas eu recomendo evitar. Se o outro site apagar ou mudar a imagem, a sua página fica com um buraco, e você nem fica sabendo. Por isso, prefira guardar as imagens na sua pasta imagens. Agora, um ponto muito importante: só porque uma imagem está na internet, não quer dizer que você pode usar. Imagens têm dono, e é o dono quem decide quem pode usar, e como. Use fotos que você tirou, desenhos que você fez, ou imagens de acervos que deixam claro que o uso é liberado. E respeite o que a licença pede, como dar o crédito ao autor. Na dúvida, não use.

**Tela:** no editor, aparece `<img src="https://imagens.example.com/bolo.jpg" alt="Bolo de chocolate">`; uma seta liga o `src` a um servidor ilustrado distante, rotulado "caminho absoluto: outro site". O servidor apaga o arquivo e, na prévia, a imagem vira o ícone quebrado, com "x" vermelho. Depois, o arquivo é arrastado para a pasta `imagens` da árvore, e o `src` vira `imagens/bolo.jpg`, com check verde e o rótulo "prefira os seus arquivos". Por fim, uma imagem ilustrada ganha uma etiqueta "©" e um cadeado; três cartões com check verde aparecem: "foto que você tirou", "desenho que você fez", "acervo com uso liberado + crédito ao autor"; rótulo final: "na dúvida, não use".

---

## Bloco 11 — Os erros mais comuns

**Fala:**
Agora, os erros que mais aparecem com imagens. O primeiro: o caminho errado. A imagem está numa pasta e o src aponta para outra, ou falta o ponto, ponto, barra na página que está dentro de outra pasta. O segundo: maiúsculas e minúsculas. Foto traço ana com efe maiúsculo e com efe minúsculo podem ser arquivos diferentes quando o site vai para a internet. O terceiro: esquecer a extensão, aquele ponto jota pê gê ou ponto pê ene gê do final. Sem ela, o navegador não acha o arquivo. E o quarto: esquecer o alt. Esse não quebra a imagem, mas deixa muita gente de fora. Se a imagem não aparecer, confira primeiro o caminho, o nome e a extensão.

**Tela:** quatro cartões aparecem em sequência, cada um com o erro e a correção:
1. em `projetos.html`, `<img src="imagens/projeto-receitas.png">` com "x" vermelho; uma lupa procura `imagens` dentro de `paginas` e não acha nada; a prévia mostra o ícone quebrado; embaixo, `src="../imagens/projeto-receitas.png"` com check verde.
2. `<img src="imagens/Foto-ana.jpg">` ao lado da árvore de arquivos mostrando `foto-ana.jpg`; o `F` maiúsculo fica vermelho, com "x" e o rótulo "maiúscula ≠ minúscula"; embaixo, `src="imagens/foto-ana.jpg"` com check verde.
3. `<img src="imagens/foto-ana">` com "x" vermelho e o espaço da extensão piscando; embaixo, `src="imagens/foto-ana.jpg"` com check verde e o rótulo "a extensão faz parte do nome".
4. `<img src="imagens/foto-ana.jpg">` sem alt; o alto-falante lê "foto-ana.jpg" num balão riscado; embaixo, a mesma linha com `alt="Ana sorrindo, com um caderno de anotações na mão"` e check verde.
No fim, os quatro cartões encolhem para uma checklist: "caminho", "maiúsculas", "extensão", "alt".

---

## Bloco 12 — Resumo e próximo degrau

**Fala:**
Vamos recapitular. A imagem é a tag img, uma tag vazia, sem fechamento. O src diz qual arquivo mostrar, e o caminho relativo é igual ao dos links: o nome da pasta para entrar, e ponto, ponto, barra para subir. O alt descreve a imagem para quem não consegue vê-la, e fica vazio só nas imagens de enfeite. O width e o height acertam o tamanho, mantendo a proporção, e arquivos leves deixam a página rápida. A figure e a figcaption juntam imagem e legenda. Uma imagem pode virar um link. E use só imagens que você tem direito de usar. Agora é a sua vez: os exercícios estão logo abaixo do vídeo. Na próxima aula, chegam as listas. Até lá, e bora destravar.

**Tela:** lista do resumo aparecendo item por item com checks verdes ("img: tag vazia", "src e caminhos", "alt que descreve (ou vazio no enfeite)", "width e height na proporção", "arquivos leves e formatos", "figure e figcaption", "imagem com link", "imagens que você pode usar"); botão "Fazer os exercícios" pulsando; prévia da próxima aula com o ícone de lista com marcadores e o texto "Aula 5 — Listas"; encerramento com o logo da Destrava e o slogan "Destrava sua carreira. Um nível de cada vez."
