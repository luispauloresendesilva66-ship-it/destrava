# Aula 3 — Links

**Nível:** Primeiro Commit · **Duração estimada:** ~10 minutos · **Blocos:** 12

## Como este roteiro é usado

- A voz do vídeo é **gerada por IA** a partir do texto em "Fala". Por isso a "Fala" precisa soar natural quando lida em voz alta: frases curtas, sem siglas soltas, com os símbolos de código ditos por extenso.
- O que está em "Tela" é o que o pipeline de vídeo anima (editor da Destrava, prévia do navegador, rótulos, setas, checks). Não é lido pela voz.
- Um áudio por bloco: `bloco01`, `bloco02`... Para corrigir uma fala, gere de novo só aquele bloco.
- Todo o conteúdo de exemplo é fictício (a aluna "Ana"). Nada de marcas, empresas ou sites reais: os endereços usam o domínio reservado `example.com`.

---

## Bloco 01 — Abertura

**Fala:**
Olá, que bom te ver de novo. Na aula passada, você montou a página "sobre mim" da Ana, com títulos, parágrafos, ênfase e comentários. E eu prometi que ela ia ganhar links e imagens. Hoje é o dia dos links. As imagens ganham uma aula só delas, logo em seguida, porque cada assunto merece o seu tempo. Os links são o que transforma um monte de páginas soltas numa rede. Hoje você vai aprender a levar a pessoa para outro site, para uma segunda página da Ana, para um trecho da mesma página e até para o e-mail dela. E, no caminho, vai entender como o navegador encontra um arquivo dentro de uma pasta. Abre o editor e bora destravar.

**Tela:** logo da Destrava animando → título "Aula 3 — Links" → os 5 degraus do curso com o primeiro aceso; ao lado, a página "Sobre mim" da Ana, da aula passada, aparece com algumas palavras sublinhadas em azul; de cada uma sai uma seta para um cartãozinho: "outro site", "outra página", "uma seção", "e-mail". Rótulo: "o que a gente vai construir hoje".

---

## Bloco 02 — Hipertexto: um texto com portas

**Fala:**
Lembra que, na primeira aula, você viu que HTML quer dizer linguagem de marcação de hipertexto? Pois é, chegou a hora de entender esse tal de hipertexto. Um texto comum, você lê do começo ao fim, como um livro. Um hipertexto é um texto com portas: você clica numa palavra e vai parar em outro lugar. Essas portas são os links. Quando você navega pela internet, pulando de uma página para outra, está passando por links o tempo todo, mesmo sem perceber. Sem eles, cada página seria uma ilha. No navegador, um link costuma aparecer azul e sublinhado, e o cursor do mouse vira uma mãozinha quando passa por cima. Agora vamos criar o primeiro.

**Tela:** a sigla "HyperText Markup Language" volta, com "HyperText = hipertexto" destacado. Um livro aberto com uma seta reta, do começo ao fim, rotulado "texto comum". Ao lado, várias páginas soltas, como ilhas; linhas azuis aparecem ligando umas às outras, rotuladas "hipertexto = texto com links". Por fim, na prévia do navegador, uma palavra azul e sublinhada; o cursor passa por cima e vira uma mãozinha.

---

## Bloco 03 — A tag a e o href

**Fala:**
O link é a tag a, de âncora. Ela tem abertura, conteúdo e fechamento, como as que você já conhece. Só que, sozinha, ela não sabe para onde ir. Quem diz o destino é o href. O href é um atributo, uma informação extra que fica dentro da tag de abertura. Você escreve href, sinal de igual, e o endereço entre aspas. A Ana adora cozinhar, então a página dela vai ganhar um link para um site de receitas: agá tê tê pê esse, dois pontos, barra, barra, receitas ponto example ponto com. Esse é um endereço completo, desde o começo. A gente chama isso de caminho absoluto. E, entre a abertura e o fechamento, fica o texto que a pessoa vê e clica.

**Tela:** no editor da Destrava, abaixo do parágrafo "Nas horas livres, gosto de cozinhar...", é digitado:
```html
<p>Veja as <a href="https://receitas.example.com">minhas receitas favoritas</a>.</p>
```
a linha fica destacada; três rótulos com setas: `<a>` → "a tag do link", `href="..."` → "atributo: para onde vai", "minhas receitas favoritas" → "o texto que a pessoa clica". O endereço `https://receitas.example.com` ganha o rótulo "caminho absoluto: o endereço completo". Na prévia, as palavras aparecem azuis e sublinhadas; o cursor clica e uma nova página "receitas.example.com" desliza por cima.

---

## Bloco 04 — Um texto de link que faz sentido

**Fala:**
Agora, um detalhe que faz muita diferença: o texto do link. Sabe aqueles sites cheios de "clique aqui"? Isso é um problema. Quem usa um leitor de tela, aquele programa que lê a página em voz alta, muitas vezes pula de link em link para achar o que procura. Imagina ouvir "clique aqui, clique aqui, clique aqui". Não dá para saber para onde cada um leva. E quem só passa o olho pela página também se perde. A regra é simples: o texto do link precisa dizer para onde ele leva, mesmo lido sozinho. Em vez de "para ver as minhas receitas, clique aqui", escreva "veja as minhas receitas favoritas", com o link nessas palavras. Fica claro para todo mundo.

**Tela:** uma página genérica com três links "clique aqui" destacados; um ícone de alto-falante lê cada um, e balõezinhos "clique aqui?" aparecem com pontos de interrogação. Depois, lado a lado no editor:
```html
<p>Para ver as minhas receitas, <a href="https://receitas.example.com">clique aqui</a>.</p>
<p>Veja as <a href="https://receitas.example.com">minhas receitas favoritas</a>.</p>
```
a primeira linha recebe um "x" vermelho; a segunda, um check verde, com o rótulo "o texto diz para onde vai".

---

## Bloco 05 — Uma segunda página

**Fala:**
A Ana quer mostrar os projetos que está fazendo no curso. Em vez de lotar a página inicial, ela vai criar uma segunda página. Na mesma pasta do index ponto html, eu crio um arquivo novo: projetos ponto html. Ele recebe a estrutura básica de sempre, com o title "Projetos" e um h1 "Meus projetos". Agora, de volta ao index, eu crio um link com o href igual a projetos ponto html. Repara: não tem agá tê tê pê esse, nem nome de site. Só o nome do arquivo. Isso é um caminho relativo. Ele quer dizer: procure esse arquivo a partir de onde eu estou agora. Como os dois arquivos estão na mesma pasta, o nome basta.

**Tela:** à esquerda do editor, uma árvore de arquivos com a pasta `site-da-ana` e, dentro, `index.html`; um arquivo novo `projetos.html` aparece ao lado dele, com brilho. O editor abre `projetos.html` e mostra a estrutura básica, com `<title>Projetos</title>` e `<h1>Meus projetos</h1>` destacados. Depois o editor volta ao `index.html` e é digitado:
```html
<p>Conheça os <a href="projetos.html">meus projetos</a>.</p>
```
`href="projetos.html"` ganha o rótulo "caminho relativo: a partir de onde eu estou". Uma seta sai do link e vai até `projetos.html` na árvore. Na prévia, o cursor clica no link e uma segunda aba do navegador, "Projetos", aparece na frente, mostrando "Meus projetos".

---

## Bloco 06 — O caminho de volta

**Fala:**
Só que agora a pessoa está na página de projetos e não tem como voltar, a não ser pelo botão do navegador. Todo caminho de ida merece um caminho de volta. Então, no projetos ponto html, logo abaixo do h1, eu crio um link com o href igual a index ponto html e o texto "Voltar para a página inicial". Pronto: as duas páginas estão ligadas, uma apontando para a outra. Clica num link, vai. Clica no outro, volta. Parece pouco, mas isso já é um site de verdade: um conjunto de páginas que conversam entre si. Todo site que você visita, por maior que seja, funciona com essa mesma ideia. São páginas ligadas por links, só que em quantidade bem maior.

**Tela:** o editor abre `projetos.html` e, abaixo do `<h1>`, é digitado:
```html
<p><a href="index.html">Voltar para a página inicial</a></p>
```
a linha fica destacada. Na árvore de arquivos, duas setas curvas ligam `index.html` e `projetos.html`, uma em cada sentido, com os rótulos "ida" e "volta". Na prévia, o cursor clica em "Voltar para a página inicial" e a página "Sobre mim" volta para a frente; clica de novo em "meus projetos" e a página "Projetos" aparece. Por fim, as duas páginas se afastam e aparecem várias outras ligadas por linhas, como uma teia, com o rótulo "um site = páginas ligadas por links".

---

## Bloco 07 — Pastas e o ponto, ponto, barra

**Fala:**
Conforme o site cresce, a Ana vai querer organizar os arquivos em pastas. Imagina que ela crie uma pasta chamada paginas, sem acento, e coloque o projetos ponto html lá dentro. O link do index agora precisa entrar na pasta: o href fica paginas, barra, projetos ponto html. A barra separa a pasta do arquivo. E o caminho de volta? De dentro da pasta paginas, o index não está mais do lado. Ele está uma pasta acima. Para subir uma pasta, você escreve ponto, ponto, barra. Então o link de volta fica ponto, ponto, barra, index ponto html. Pensa assim: o nome da pasta entra, e o ponto, ponto, barra sobe. Com essas duas ideias, você chega a qualquer arquivo do seu site.

**Tela:** na árvore de arquivos, uma pasta `paginas` é criada dentro de `site-da-ana` e o `projetos.html` é arrastado para dentro dela:
```
site-da-ana/
├── index.html
└── paginas/
    └── projetos.html
```
o link antigo `href="projetos.html"` no `index.html` recebe um "x" vermelho e se transforma em `href="paginas/projetos.html"`, com check verde; uma seta desce da raiz para dentro de `paginas`, rotulada "entra na pasta". Depois, em `projetos.html`, o link `href="index.html"` recebe um "x" vermelho e vira `href="../index.html"`, com check verde; uma seta sobe de `paginas` para `site-da-ana`, rotulada "`../` sobe uma pasta". No canto, um resumo fixo: "`pasta/` entra · `../` sobe".

---

## Bloco 08 — Abrir em outra aba: target

**Fala:**
Às vezes, você quer que um link abra numa aba nova. Para isso existe o atributo target, que quer dizer alvo. Com o valor underline blank, que é o tracinho de baixo seguido da palavra blank, o link abre em outra aba, e a página da Ana continua aberta na aba de antes. Mas use com moderação. Abrir abas sem a pessoa pedir pode confundir, principalmente quem usa leitor de tela ou celular. Uma boa regra: links para páginas do seu próprio site abrem na mesma aba. O underline blank fica para casos especiais, como um site externo consultado no meio de uma tarefa. E, quando usar, acrescente rel igual a noopener. É um cuidado de segurança: a página nova não consegue mexer na sua.

**Tela:** no editor, o link de receitas ganha dois atributos, digitados um de cada vez:
```html
<a href="https://receitas.example.com" target="_blank" rel="noopener">minhas receitas favoritas</a>
```
`target="_blank"` fica destacado com o rótulo "abre em outra aba"; o `_` ganha uma lupa com o rótulo "underline". Na prévia, o clique faz surgir uma segunda aba do navegador, "receitas.example.com", enquanto a aba "Sobre mim" continua visível atrás. Depois, uma fileira de seis abas abertas sem querer recebe um "x" vermelho, com o rótulo "use com moderação". Por fim, `rel="noopener"` fica destacado com um ícone de cadeado e o rótulo "a página nova não mexe na sua".

---

## Bloco 09 — Links para uma seção: id e cerquilha

**Fala:**
Um link também pode levar para um trecho da mesma página. A página da Ana está crescendo, então ela quer um menu no topo, para pular direto para cada seção. Primeiro, a seção precisa de um nome. No h2 "O que estou aprendendo", eu coloco o atributo id, igual a aprendendo. O id é como um endereço único dentro da página e não pode se repetir. Depois, no topo, eu crio um link com o href igual a cerquilha, aprendendo. A cerquilha, aquele símbolo do jogo da velha, diz ao navegador: procure, nesta página, o elemento com esse id. Clica, e a página rola direto para a seção. Dá para combinar: projetos ponto html, cerquilha, e um id, leva a um trecho de outra página.

**Tela:** no editor, o `<h2>` recebe o atributo:
```html
<h2 id="aprendendo">O que estou aprendendo</h2>
```
`id="aprendendo"` fica destacado com o rótulo "nome único na página"; em seguida, rapidamente, o outro `<h2>` também ganha o seu: `<h2 id="quem-sou">Quem sou eu</h2>`. Depois, logo abaixo do `<h1>`, é digitado:
```html
<p><a href="#quem-sou">Quem sou eu</a> · <a href="#aprendendo">O que estou aprendendo</a></p>
```
o `#` ganha uma lupa com o rótulo "cerquilha = procure o id"; uma seta liga `href="#aprendendo"` ao `id="aprendendo"`. Na prévia, o cursor clica em "O que estou aprendendo" e a página rola suavemente até a seção, que pisca destacada. Por fim, aparece o exemplo `href="projetos.html#contato"` com o rótulo "outra página + uma seção dela".

---

## Bloco 10 — Link de e-mail: mailto

**Fala:**
Por fim, um link que não abre uma página: o link de e-mail. No href, em vez de um endereço de site, você escreve mailto, dois pontos, e o e-mail, tudo junto, sem espaço. Na assinatura da Ana, vai um link com o href igual a mailto, dois pontos, ana arroba example ponto com. E o texto do link mostra o próprio e-mail. Quando alguém clica, o computador abre o programa de e-mail com o destinatário já preenchido. Mas tem um detalhe: isso só funciona se a pessoa tiver um programa de e-mail configurado. Por isso, é uma boa ideia deixar o endereço visível no texto do link. Assim, quem não tiver o programa consegue copiar o e-mail e escrever do jeito que preferir.

**Tela:** no editor, a assinatura da Ana ganha uma linha:
```html
<p>Ana Souza<br>Cidade Exemplo<br><a href="mailto:ana@example.com">ana@example.com</a></p>
```
`mailto:` fica destacado com o rótulo "abre o e-mail"; um rótulo aponta para o texto do link: "o endereço visível". Na prévia, o cursor clica e uma janela estilizada de e-mail desliza para cima, com o campo "Para: ana@example.com" já preenchido. Por fim, um cursor seleciona o texto do link e um ícone de "copiar" aparece, com o rótulo "dá para copiar também".

---

## Bloco 11 — Os erros mais comuns

**Fala:**
Agora, os três erros que mais aparecem com links. O primeiro: esquecer as aspas, ou abrir e não fechar. Sem a aspa do final, o navegador não sabe onde o endereço termina, e o link quebra. O segundo: errar o nome do arquivo. Projetos com pê maiúsculo e projetos com pê minúsculo podem ser arquivos diferentes, principalmente quando o site vai para a internet. Escreva o nome exatamente igual, e prefira nomes em minúsculas, sem acento e sem espaço. O terceiro: esquecer o agá tê tê pê esse num endereço de outro site. Sem ele, o navegador acha que é um arquivo do seu site e procura na sua pasta. Se um link não funcionar, confira esses três pontos primeiro.

**Tela:** três cartões aparecem em sequência, cada um com o erro e a correção:
1. `<a href="projetos.html>meus projetos</a>` com a aspa que falta piscando em vermelho e um "x"; embaixo, `<a href="projetos.html">meus projetos</a>` com check verde.
2. `<a href="Projetos.html">` ao lado da árvore de arquivos mostrando `projetos.html`; o `P` maiúsculo fica vermelho, com "x" e o rótulo "maiúscula ≠ minúscula"; embaixo, `href="projetos.html"` com check verde.
3. `<a href="receitas.example.com">` com "x" vermelho; uma seta leva até a árvore de arquivos, onde uma lupa procura "receitas.example.com" dentro de `site-da-ana` e não acha nada; embaixo, `href="https://receitas.example.com"` com check verde.
No fim, os três cartões encolhem para uma checklist: "aspas", "nome do arquivo", "https".

---

## Bloco 12 — Resumo e próximo degrau

**Fala:**
Vamos recapitular. Um link é a tag a, e o href diz para onde ele leva. Endereços de outros sites usam o caminho absoluto, com agá tê tê pê esse. Páginas do seu site usam o caminho relativo: o nome da pasta para entrar, e ponto, ponto, barra para subir. O texto do link precisa dizer para onde ele vai, nada de "clique aqui". O target underline blank abre uma aba nova, mas só quando faz sentido, e com o rel noopener. Com o id e a cerquilha, você pula para uma seção. E o mailto abre o e-mail. Agora é a sua vez: os exercícios estão logo abaixo do vídeo. Na próxima aula, a página da Ana ganha imagens. Até lá, e bora destravar.

**Tela:** lista do resumo aparecendo item por item com checks verdes ("a e href", "caminho absoluto", "caminho relativo e ../", "texto do link que faz sentido", "target e rel", "id e #", "mailto:"); botão "Fazer os exercícios" pulsando; prévia da próxima aula com o ícone de imagem e o texto "Aula 4 — Imagens"; encerramento com o logo da Destrava e o slogan "Destrava sua carreira. Um nível de cada vez."
