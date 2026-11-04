# Aula 4 — Texto e fontes

**Nível:** Primeira Demão · **Duração estimada:** ~10 minutos · **Blocos:** 11

## Como este roteiro é usado

- A voz do vídeo é **gerada por IA** a partir do texto em "Fala". Por isso a "Fala" precisa soar natural quando lida em voz alta: frases curtas, sem siglas soltas, com os símbolos de código ditos por extenso.
- O que está em "Tela" é o que o pipeline de vídeo anima (editor da Destrava, prévia do navegador, rótulos, setas, checks). Não é lido pela voz.
- Um áudio por bloco: `bloco01`, `bloco02`... Para corrigir uma fala, gere de novo só aquele bloco.
- Todo o conteúdo de exemplo é fictício (a aluna "Ana"). Nada de marcas, empresas ou sites reais: os endereços usam o domínio reservado `example.com`. Ferramentas e serviços citados de forma genérica ("serviços de fontes da internet", "as ferramentas do navegador"), sem nomes de produtos. Os nomes de fonte que aparecem (`Verdana`, `Arial`, `Georgia`, `"Times New Roman"`) são citados só como valores de código: são fontes que já vêm instaladas na maioria dos computadores e celulares, e o roteiro não recomenda nem compara produtos.
- A página da Ana é a mesma da aula 9 do nível 1, já ligada ao `estilo.css`, com as regras e a paleta da aula 3: `body` com fundo `#fdf6e3` (creme); `p` com `color: #333333` e o `font-size: 18px` da aula 1; `h1, h2` com `color: #264653` (azul-petróleo); `.destaque, nav a` com `color: #b5452c` (terracota); `footer` com fundo `#264653`; `footer p` com `color: #ffffff`; `#contato` (aula 2).
- Na "Fala", os termos de CSS e as tags são escritos do jeito que se fala, com as mesmas grafias das aulas 1 a 3: `CSS` = "cê ésse ésse", `color` = "cálor", `background-color` = "béquigráund cálor", `font-size` = "fónti sáiz", `px` = "pê xis", `link` = "línk", `class` = "cléss", `id` = "ái di", `h1` = "agá um", `h2` = "agá dois", `p` = "pê", `nav` = "név", `a` = "é", `footer` = "fúter", `#264653` = "cerquilha, dois seis, quatro seis, cinco três", `#333333` = "cerquilha, três três, três três, três três". Novas nesta aula: `font-family` = "fónti fémili", `serif` = "sérif", `sans-serif` = "sãns sérif", `monospace` = "mônou spêis", `font-weight` = "fónti uêit", `bold` = "bôld", `normal` = "normal" (como em português), `font-style` = "fónti stáil", `italic` = "itálic", `line-height` = "láin ráit", `text-align` = "técst alái", `left` = "léft", `center` = "cênter", `right` = "ráit", `text-decoration` = "técst decorêixon", `none` = "nân", `underline` = "ânder láin", `text-transform` = "técst transfórm", `uppercase` = "âper kêis", `letter-spacing` = "léter spêicin", `rem` = "rém". Nomes de fonte: `Verdana` = "verdána", `Arial` = "árial", `Georgia` = "djórdja", `Times New Roman` = "táims niú rôuman". Os números dos pesos são ditos por extenso: `400` = "quatrocentos", `700` = "setecentos". O `1.6` é dito "um vírgula seis" e o `1.2` é dito "um vírgula dois" (na "Tela", aparecem com ponto, como o CSS exige). Os símbolos são ditos por extenso: `.` = "ponto", `#` = "cerquilha", `,` = "vírgula", `"` = "aspas", `{` = "abre chaves", `}` = "fecha chaves", `:` = "dois pontos", `;` = "ponto e vírgula". Seguem com o nome normal: HTML, body, estilo ponto cê ésse ésse.

---

## Bloco 01 — Abertura

**Fala:**
Olá, seja bem-vindo à aula quatro da Primeira Demão. Na aula passada, a Ana trocou os nomes de cor por códigos, montou uma paleta pequena e conferiu o contraste. A página ficou com cara de projeto. Mas repara no texto: ele ainda usa a letra que o navegador escolheu sozinho, com as linhas meio apertadas. E quase tudo o que a gente lê numa página é texto. Se o texto cansa, a pessoa vai embora, por mais bonitas que sejam as cores. Hoje, você vai aprender a escolher a fonte, com uma fonte de reserva para garantir. Depois, vai mexer no tamanho, no peso, no espaço entre as linhas, no alinhamento e no sublinhado dos links. E vai conhecer a herança, um truque que economiza muito cê ésse ésse. Abre o editor e bora destravar.

**Tela:** logo da Destrava → título "Aula 4 — Texto e fontes". Um cartão de revisão mostra a paleta da Ana (`#fdf6e3`, `#264653`, `#b5452c`, `#333333`) com o rótulo "aula 3: cores". Depois, a página da Ana como ficou na aula 3, com uma lupa sobre um parágrafo: letras com a fonte padrão do navegador e linhas juntas; rótulo "fonte padrão, linhas apertadas". Por fim, a frase "Olá, eu sou a Ana" muda de fonte três vezes, com o rótulo "a fonte muda a personalidade".

---

## Bloco 02 — A família da fonte

**Fala:**
A propriedade que escolhe a fonte é a fónti fémili, a família da fonte. Antes dos nomes, conheça as três famílias que todo navegador entende. Sérif é a letra com serifa: aqueles pezinhos nas pontas, como nos livros e nos jornais impressos. Sãns sérif, que quer dizer "sem serifa", é a letra lisa, sem os pezinhos, muito usada em telas. E mônou spêis é a letra em que todos os caracteres têm a mesma largura, como a do editor de código. Essas três são famílias genéricas. Você não diz qual fonte exata quer, só o estilo. Escrevendo fónti fémili, dois pontos, sãns sérif, o navegador usa a fonte sem serifa que estiver instalada no aparelho. Funciona em qualquer computador ou celular. A Ana começou assim, no body, e a página inteira já mudou de cara.

**Tela:** três colunas com a mesma palavra "Ana" bem grande, cada uma com o nome embaixo: `serif` (setinhas apontando os pezinhos, rótulo "com serifa: pezinhos"), `sans-serif` (rótulo "sem serifa: lisa") e `monospace` (cada letra dentro de uma caixinha de mesma largura, rótulo "todas com a mesma largura"). Depois, no `estilo.css`, é digitado:
```css
body {
  font-family: sans-serif;
}
```
e a prévia troca a letra da página inteira por uma sem serifa. Rótulo: "família genérica = só o estilo, o navegador escolhe a fonte".

---

## Bloco 03 — Fonte de reserva

**Fala:**
Mas e se a Ana quiser uma fonte específica? Ela escreve o nome da fonte. O problema é que a fonte precisa existir no aparelho de quem visita a página. Se não existir, o navegador ignora e usa a letra padrão. Por isso, a fónti fémili aceita uma lista, separada por vírgulas. O navegador tenta a primeira. Se não tiver, tenta a segunda. E assim por diante. Essa lista termina sempre com uma família genérica, que é a fonte de reserva: ela sempre funciona. A Ana escreveu: verdána, vírgula, árial, vírgula, sãns sérif. E atenção: se o nome da fonte tiver espaço, como táims niú rôuman, ele vai entre aspas. Existem também serviços de fontes da internet, que entregam fontes novas por um línk. Mesmo usando um deles, mantenha a reserva no fim da lista.

**Tela:** no `estilo.css`, o valor vira:
```css
body {
  font-family: Verdana, Arial, sans-serif;
}
```
três caixinhas acendem em sequência, da esquerda para a direita, com o rótulo "tenta a 1ª, depois a 2ª, depois a reserva". Uma animação mostra dois aparelhos: num, `Verdana` existe e ganha check verde; no outro, `Verdana` e `Arial` ganham "x" cinza e `sans-serif` ganha check verde, com o rótulo "a reserva sempre funciona". Depois, `font-family: Georgia, "Times New Roman", serif;` com as aspas piscando e o rótulo "nome com espaço vai entre aspas". Por fim, um ícone genérico de nuvem com a letra "A" e o rótulo "fontes da internet: chegam por um `<link>`, mas a reserva continua no fim".

---

## Bloco 04 — Herança: escreva uma vez só

**Fala:**
Repara numa coisa: a Ana colocou a fónti fémili no body, e não no pê. Mesmo assim, os parágrafos, os títulos e os links mudaram de fonte. Isso é a herança. Algumas propriedades passam de pai para filho no HTML. Se o body tem uma fonte, tudo o que está dentro dele herda essa fonte, a não ser que uma regra mais específica diga outra coisa. As propriedades de texto, como a fonte, o tamanho, o cálor e o espaço entre as linhas, são herdadas. O fundo e a borda, não. Por isso, o lugar certo para o texto padrão da página é o body. A Ana aproveitou e mudou o fónti sáiz de dezoito pê xis, que estava no pê desde a aula um, para o body. Agora vale para a página toda. E, quando precisar de uma exceção, é só criar uma regra para aquele elemento.

**Tela:** a árvore da página da Ana: `body` no topo, com galhos para `header`, `main` e `footer`, e daí para `h1`, `nav`, `h2`, `p` e `a`. A declaração `font-family: Verdana, Arial, sans-serif;` desce como tinta, do `body` para todos os galhos; rótulo "herança: pai passa para os filhos". Um cartão compara: "herdam: `font-family`, `font-size`, `color`, `line-height`" (checks verdes) e "não herdam: `background-color`, `border`" ("x" cinza). Depois, no `estilo.css`, a linha `font-size: 18px;` sai da regra `p` e entra na regra `body`; rótulo "escreva uma vez só, no `body`".

---

## Bloco 05 — Tamanho e peso

**Fala:**
O tamanho você já conhece: fónti sáiz, em pê xis. Para o texto comum, a dica é não ficar abaixo de dezesseis pê xis. A Ana usa dezoito. Os títulos já vêm maiores do navegador, mas dá para ajustar com o fónti sáiz também. Na aula seis, você vai conhecer outra unidade, o rém, que respeita o tamanho de letra que a pessoa escolheu no aparelho. Por enquanto, pê xis resolve. Agora, o peso. A fónti uêit deixa a letra mais grossa ou mais fina. Os valores mais usados são normal e bôld, o negrito. Também dá para usar números: quatrocentos é o normal, setecentos é o negrito. Os títulos já vêm em negrito. A Ana quer que o parágrafo de destaque também fique: ponto destaque, fónti uêit, dois pontos, bôld.

**Tela:** um parágrafo de exemplo com uma régua de tamanhos ao lado: `14px` (sinal de atenção, "pequeno demais"), `16px` (check, "mínimo para texto"), `18px` (check, "o da Ana"). Uma etiqueta pequena: "`rem`: aula 6". Depois, a palavra "destaque" em três pesos lado a lado, com os rótulos `normal` = `400` e `bold` = `700`. No `estilo.css`:
```css
.destaque {
  font-weight: bold;
}
```
na prévia, o parágrafo "Estou procurando o meu primeiro emprego na área." fica em negrito e terracota; rótulo "`bold` = negrito".

---

## Bloco 06 — Itálico e espaço entre as linhas

**Fala:**
Para o itálico, a letra inclinada, existe a fónti stáil, com o valor itálic. Para voltar ao normal, o valor é normal. Use com calma: um texto inteiro inclinado cansa. Agora, uma das propriedades mais importantes para a leitura: a láin ráit, a altura da linha, ou seja, o espaço entre uma linha e a próxima. Linhas muito juntas cansam. Para o texto comum, um bom valor fica entre um vírgula cinco e um vírgula sete. Repare: é um número sozinho, sem pê xis. Ele quer dizer "tantas vezes o tamanho da letra". Com letra de dezoito pê xis e láin ráit um vírgula seis, cada linha fica com uns vinte e nove pê xis de altura. E, se a Ana aumentar a letra depois, o espaço acompanha sozinho. Nos títulos, que são grandes, um vírgula dois já basta.

**Tela:** a frase "Feito pela Ana, em 2026." em `font-style: italic;`, inclinada, com o rótulo "itálico". Depois, o mesmo parágrafo de três linhas mostrado duas vezes: à esquerda, linhas coladas ("x" vermelho, "apertado"); à direita, `line-height: 1.6;` com linhas arejadas (check verde). O `1.6` ganha a etiqueta "sem unidade = 1,6 × o tamanho da letra" e uma conta aparece: `18px × 1.6 ≈ 29px`. O ponto de `1.6` ganha o rótulo "no CSS, ponto em vez de vírgula". Por fim, o `font-size` muda de `18px` para `22px` e o espaço entre as linhas cresce junto; rótulo "o espaço acompanha a letra".

---

## Bloco 07 — Alinhamento e sublinhado

**Fala:**
Para alinhar o texto, existe a técst alái. Os valores principais são léft, para a esquerda, que é o padrão, cênter, para o centro, e ráit, para a direita. A Ana centralizou só o título principal: agá um, técst alái, dois pontos, cênter. E os parágrafos? Deixe à esquerda. Texto longo centralizado é difícil de ler, porque o olho perde o começo de cada linha. Agora, a técst decorêixon, que controla o sublinhado. Os links já vêm sublinhados do navegador. No menu, a Ana tirou o sublinhado: név, espaço, é, técst decorêixon, dois pontos, nân. Mas cuidado. O sublinhado é o sinal de que aquilo é um link. Se tirar, deixe outra pista: no menu da Ana, os links ficam em negrito, na cor terracota, num lugar onde todo mundo espera links. No meio de um parágrafo, mantenha o sublinhado.

**Tela:** três linhas de texto com os valores `left`, `center` e `right`, cada uma encostando no seu lado; `left` ganha a etiqueta "padrão". No `estilo.css`:
```css
h1 {
  text-align: center;
}
```
na prévia, "Olá, eu sou a Ana" vai para o centro. Um parágrafo longo centralizado aparece com as bordas irregulares e o rótulo "texto longo: à esquerda". Depois:
```css
nav a {
  text-decoration: none;
  font-weight: bold;
}
```
o sublinhado dos links do menu some e eles ficam em negrito; rótulo "sem sublinhado? deixe outra pista". Um link no meio de um parágrafo continua sublinhado, com check verde e o rótulo "no meio do texto, mantenha o sublinhado". Uma etiqueta pequena mostra `underline` como o valor que coloca o sublinhado de volta.

---

## Bloco 08 — Dicas de leitura

**Fala:**
Juntando tudo, quatro dicas para um texto fácil de ler. Primeira: letra de pelo menos dezesseis pê xis para o texto comum. Segunda: láin ráit entre um vírgula cinco e um vírgula sete. Terceira: linhas nem curtas nem compridas demais, algo entre sessenta e setenta e cinco letras por linha. Numa tela grande, um parágrafo que vai de uma ponta à outra cansa, porque o olho se perde na volta. Na aula seis, você vai ver como limitar a largura. Quarta: no máximo duas fontes na página, uma para os títulos e outra para o texto. E existem mais propriedades de texto, para usar com moderação. A técst transfórm, com o valor âper kêis, deixa tudo em letra maiúscula. E a léter spêicin aumenta o espaço entre as letras. Ficam bem em rótulos curtos, não em parágrafos.

**Tela:** um cartão "texto fácil de ler" com quatro itens aparecendo com checks verdes: "letra de 16px ou mais", "`line-height` de 1.5 a 1.7", "60 a 75 letras por linha", "no máximo 2 fontes". Ao lado, um parágrafo esticado numa tela larga, com uma seta longa voltando ao começo da linha seguinte e o rótulo "linha comprida demais: largura na aula 6". Depois, a palavra "contato" vira "CONTATO" com `text-transform: uppercase;` e ganha espaço entre as letras com `letter-spacing: 2px;`; rótulo "bom em rótulos curtos".

---

## Bloco 09 — O texto na página da Ana

**Fala:**
Agora, a Ana junta tudo no estilo ponto cê ésse ésse. No body, além do fundo creme, ela coloca a fónti fémili verdána, árial, sãns sérif, a fónti sáiz de dezoito pê xis e a láin ráit de um vírgula seis. Por herança, isso vale para a página toda. No pê, sobra só o cálor, o cinza escuro. Nos títulos, agá um, vírgula, agá dois, ela usa outra família, com serifa: djórdja, táims niú rôuman, entre aspas, e sérif como reserva. E uma láin ráit de um vírgula dois. O agá um ganha o técst alái cênter. O ponto destaque fica em bôld. E os links do menu ficam sem sublinhado e em negrito. Repare que ela não repetiu a fonte em lugar nenhum. Duas famílias, uma para os títulos e outra para o texto. A página ficou arejada e com personalidade.

**Tela:** o `estilo.css` da Ana sendo atualizado, uma declaração por vez, cada uma refletida na prévia (as regras de cor da aula 3 continuam no arquivo):
```css
body {
  background-color: #fdf6e3;
  font-family: Verdana, Arial, sans-serif;
  font-size: 18px;
  line-height: 1.6;
}

p {
  color: #333333;
}

h1, h2 {
  color: #264653;
  font-family: Georgia, "Times New Roman", serif;
  line-height: 1.2;
}

h1 {
  text-align: center;
}

.destaque {
  font-weight: bold;
}

nav a {
  text-decoration: none;
  font-weight: bold;
}
```
a linha `font-size: 18px;` da regra `p` aparece riscada, em cinza, com uma seta para a regra `body` e o rótulo "subiu para o `body`: herança". A prévia final mostra os títulos com serifa em azul-petróleo, o título principal centralizado, o texto sem serifa, com linhas arejadas, o destaque em negrito terracota e o menu sem sublinhado, em negrito. Rótulo: "2 famílias: títulos e texto".

---

## Bloco 10 — Erros comuns

**Fala:**
Agora, os erros mais comuns com texto. O primeiro: nome de fonte com espaço, sem aspas. Táims niú rôuman, sem as aspas, às vezes funciona e às vezes não, dependendo do nome. Para não arriscar, sempre que o nome tiver espaço, coloque aspas. O segundo: esquecer a fonte de reserva. Se a lista só tem uma fonte, e o aparelho não tem essa fonte, a página volta para a letra padrão. Termine sempre com sérif, sãns sérif ou mônou spêis. O terceiro: láin ráit com pê xis. Láin ráit dezesseis pê xis, numa letra de dezoito, deixa as linhas encavaladas. Prefira o número sem unidade, como um vírgula seis. O quarto: tirar o sublinhado dos links sem deixar outra pista. A pessoa não sabe onde clicar. E, nos exercícios, use os valores exatamente como o enunciado pede: bôld é diferente de setecentos para o corretor, mesmo sendo o mesmo peso.

**Tela:** quatro cartões de erro, cada um com a correção embaixo:
1. `font-family: Times New Roman, serif;` com o nome marcado em amarelo, um sinal de atenção e o rótulo "nome com espaço, sem aspas: arriscado"; embaixo, `font-family: "Times New Roman", serif;` com check verde.
2. `font-family: Verdana;` com o rótulo "sem reserva"; embaixo, `font-family: Verdana, sans-serif;` com check verde e o lembrete "termine com uma família genérica".
3. `line-height: 16px;` numa letra de `18px`, com as linhas se sobrepondo e "x" vermelho; embaixo, `line-height: 1.6;` com check verde.
4. um parágrafo com um link sem sublinhado, da mesma cor do texto, com um ponto de interrogação ("onde clico?"); embaixo, o link sublinhado, com check verde.
No fim, o aviso da aula 1: "CSS com erro não dá mensagem", e um lembrete: "nos exercícios, `bold` ≠ `700` para o corretor: escreva o valor exatamente como no enunciado".

---

## Bloco 11 — Resumo e próximo degrau

**Fala:**
Vamos recapitular. A fónti fémili escolhe a fonte, com uma lista separada por vírgulas e uma família genérica no fim, como reserva: sérif, sãns sérif ou mônou spêis. Nome com espaço vai entre aspas. As propriedades de texto são herdadas, então o texto padrão vai no body. A fónti sáiz muda o tamanho, a fónti uêit muda o peso, e a fónti stáil deixa em itálico. A láin ráit, sem unidade, dá ar entre as linhas. A técst alái alinha, e a técst decorêixon controla o sublinhado. Se tirar o sublinhado de um link, deixe outra pista. Agora é a sua vez: os exercícios estão logo abaixo do vídeo. Na próxima aula, você vai descobrir que todo elemento da página é uma caixa, e vai aprender a controlar o espaço dentro e fora dela. Até lá, e bora destravar.

**Tela:** lista do resumo aparecendo item por item com checks verdes ("`font-family: Verdana, Arial, sans-serif;`", "nome com espaço: `\"Times New Roman\"`", "herança: texto padrão no `body`", "`font-size`, `font-weight: bold`, `font-style: italic`", "`line-height: 1.6`", "`text-align: center`", "`text-decoration: none` + outra pista"); botão "Fazer os exercícios" pulsando. Prévia da próxima aula: o parágrafo de destaque da Ana ganha camadas coloridas em volta (dentro, borda e fora), e o texto "Aula 5 — O modelo de caixa". Encerramento com o logo da Destrava e o slogan "Destrava sua carreira. Um nível de cada vez."
