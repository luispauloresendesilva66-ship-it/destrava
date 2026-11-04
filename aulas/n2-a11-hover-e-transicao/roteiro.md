# Aula 11 — Hover e transição

**Nível:** Primeira Demão · **Duração estimada:** ~8 minutos · **Blocos:** 10

## Como este roteiro é usado

- A voz do vídeo é **gerada por IA** a partir do texto em "Fala". Por isso a "Fala" precisa soar natural quando lida em voz alta: frases curtas, sem siglas soltas, com os símbolos de código ditos por extenso.
- O que está em "Tela" é o que o pipeline de vídeo anima (editor da Destrava, prévia do navegador, rótulos, setas, checks). Não é lido pela voz.
- Um áudio por bloco: `bloco01`, `bloco02`... Para corrigir uma fala, gere de novo só aquele bloco.
- Todo o conteúdo de exemplo é fictício (a aluna "Ana"). Nada de marcas, empresas ou sites reais: os endereços usam o domínio reservado `example.com`. Ferramentas citadas de forma genérica ("as configurações do sistema", "o celular"), sem nomes de produtos nem de aparelhos. O mouse, o teclado e o celular da "Tela" são desenhos genéricos, sem marca.
- A página da Ana é a mesma da aula 10 (com o `header` que tem o `h1` e o menu `nav`, a seção `#projetos` com os três cartões `article.cartao` dentro da `div.projetos`, e o `footer`), já ligada ao `estilo.css` e com a `meta viewport` no `head`, com tudo o que foi feito até a aula 10. As regras que importam nesta aula: `nav a` sem sublinhado, em negrito, com `color: #b5452c` (terracota, pela regra `.destaque, nav a`), `display: inline-block;` e `padding: 8px 12px;`; `.cartao` com `flex: 1;`, `min-width: 200px;`, `display: flex;`, `flex-direction: column;`, fundo creme, `padding: 16px;`, borda `1px solid #264653` e `border-radius: 8px;`; e, no fim do arquivo, o bloco `@media (min-width: 768px)` com `header` (`flex-direction: row;`) e `body` (`font-size: 1.25rem;`). Nesta aula não entra nenhuma cor nova: o hover usa o azul-petróleo `#264653` e o branco `#ffffff`, e o contorno do foco usa o terracota `#b5452c`, todos das aulas anteriores.
- As regras novas desta aula entram **antes** do bloco `@media`, logo depois das regras `nav a` e `.cartao`. O `@media` continua sendo a última coisa do arquivo. A regra `@media (prefers-reduced-motion: reduce)` também vai no fim, depois do `@media` da aula 10.
- O hover aqui é só um enfeite: nada de importante fica escondido atrás dele, porque no celular não existe "passar o mouse por cima". A "Fala" diz isso no bloco 4.
- Na "Fala", os termos de CSS e as tags são escritos do jeito que se fala, com as mesmas grafias das aulas anteriores: `CSS` = "cê ésse ésse", `px` = "pê xis", `a` = "é", `nav` = "név", `nav a` = "név é", `.cartao` = "ponto cartão", `color` = "cálor", `background-color` = "béquigráund cálor", `solid` = "sólid", `border` = "bórder", `display` = "displêi", `@media` = "arroba mídia", `#264653` = "cerquilha, dois seis, quatro seis, cinco três", `#b5452c` = "cerquilha, bê cinco, quatro cinco, dois cê", `#ffffff` = "cerquilha, seis éfes". Novas nesta aula: `:hover` = "dois pontos rôver" (o nome sozinho: "rôver"), `:focus` = "dois pontos fôcus" ("fôcus"), `:focus-visible` = "dois pontos fôcus vísibol" ("fôcus vísibol"), `outline` = "áutlain", `transition` = "transíchon", `ease` = "íz", `transform` = "transfórm", `translateY` = "transléit uái", `cursor` = "kârsor", `pointer` = "póinter", `prefers-reduced-motion` = "prifêrs ridiúst môuchon", `reduce` = "ridiúss", `none` = "nân", `all` = "ól". Os números são ditos por extenso: `0.3s` = "zero vírgula três segundos", `2px` = "dois pê xis", `-4px` = "menos quatro pê xis", `768px` = "setecentos e sessenta e oito pê xis". Pseudo-classe é dita "pseudoclasse". Os símbolos são ditos por extenso: `{` = "abre chaves", `}` = "fecha chaves", `(` = "abre parênteses", `)` = "fecha parênteses", `:` = "dois pontos", `;` = "ponto e vírgula", `,` = "vírgula", `*` = "asterisco". Seguem com o nome normal: HTML, mouse, Tab (dito "a tecla tab"), estilo ponto cê ésse ésse.

---

## Bloco 01 — Abertura

**Fala:**
Olá, seja bem-vindo à aula onze da Primeira Demão. Na aula passada, a página da Ana ficou boa no celular, no tablet e no computador. Hoje, ela vai ganhar vida. Passa o mouse por cima de um botão num site bem feito. Ele muda de cor, às vezes sobe um pouquinho. Isso é uma resposta: a página mostra que aquilo dá para clicar, e a pessoa se sente mais segura para continuar. Nesta aula, os links do menu da Ana e os cartões de projetos vão responder quando o mouse passar por cima. E essa mudança vai ser suave, sem pulo. Você vai aprender o rôver, o fôcus vísibol, para quem usa o teclado, e o transíchon, que deixa a mudança suave. Abre o editor e bora destravar.

**Tela:** logo da Destrava → título "Aula 11 — Hover e transição". Na prévia, o cursor de um mouse genérico passa por cima de um link do menu da Ana, que fica com fundo azul-petróleo e letra branca, devagar; depois, por cima de um cartão, que sobe um pouco. As etiquetas `:hover`, `:focus-visible` e `transition` aparecem em destaque.

---

## Bloco 02 — Pseudoclasses: os estados

**Fala:**
Um link não é sempre igual. Ele pode estar parado. Pode estar com o mouse por cima. Pode estar selecionado pelo teclado. Cada um desses momentos é um estado. E o cê ésse ésse tem um jeito de escolher um elemento só quando ele está num estado: a pseudoclasse. Ela vai no fim do seletor, grudada, com dois pontos na frente. Por exemplo: név é, dois pontos rôver. Rôver quer dizer "passar por cima". Então essa regra vale só para o link do menu que está com o mouse em cima. Quando o mouse sai, a regra para de valer, e o link volta a ser como era. Repara: sem espaço entre o é e os dois pontos. É tudo uma palavra só no seletor.

**Tela:** um link do menu da Ana em três versões lado a lado, com rótulos: "parado", "mouse por cima" (`:hover`), "selecionado pelo teclado" (`:focus-visible`). Etiqueta: "pseudo-classe = um estado". Depois, o seletor `nav a:hover` escrito devagar; o `:hover` pisca, com a etiqueta "grudado no seletor, sem espaço". Um "x" vermelho em `nav a :hover`, com o rótulo "com espaço: não é a mesma coisa".

---

## Bloco 03 — O hover no menu da Ana

**Fala:**
Vamos ao menu da Ana. No estilo ponto cê ésse ésse, logo depois da regra név é, ela escreve uma regra nova. Név é, dois pontos rôver, abre chaves. Béquigráund cálor, dois pontos, cerquilha, dois seis, quatro seis, cinco três, ponto e vírgula. É o azul-petróleo dos títulos. E cálor, dois pontos, cerquilha, seis éfes, ponto e vírgula, a letra branca. Fecha chaves. Salva e passa o mouse no menu. O link fica com fundo azul e letra branca. Tira o mouse, e ele volta a ser terracota. Como o fundo azul é escuro, a letra precisa ser clara, para dar para ler bem. Repara que a regra rôver só traz o que muda. O negrito e o péding continuam valendo, lá da regra név é de cima.

**Tela:** no `estilo.css`, logo abaixo da regra `nav a`:
```css
nav a:hover {
  background-color: #264653;
  color: #ffffff;
}
```
na prévia, o cursor passa pelos três links do menu, um de cada vez; cada um troca de cor na hora. Uma seta liga a regra `nav a` (`display: inline-block; padding: 8px 12px;`) à prévia, rótulo "continua valendo"; outra liga `nav a:hover`, rótulo "só o que muda".

---

## Bloco 04 — Quem não usa mouse

**Fala:**
Agora pensa em duas pessoas que não usam mouse. A primeira navega pelo teclado. Ela aperta a tecla tab, e o navegador pula de link em link. Para ela, o rôver nunca acontece. Por isso, existe o fôcus, o estado de quem foi selecionado. E o fôcus vísibol, que aparece só quando a seleção veio do teclado, e não do clique. A regra é simples: sempre que você estilizar o rôver, estilize o fôcus vísibol junto. É só usar a vírgula, da aula dois: név é, dois pontos rôver, vírgula, név é, dois pontos fôcus vísibol. E a Ana ainda dá um contorno, numa regra só do foco: áutlain, dois pontos, dois pê xis sólid cerquilha, bê cinco, quatro cinco, dois cê. A segunda pessoa está no celular. No celular, não existe passar por cima: o dedo toca e já clica. Então, nunca esconda nada importante atrás do rôver.

**Tela:** um teclado genérico com a tecla `Tab` sendo apertada; na prévia, um contorno pula de link em link no menu da Ana. Etiquetas: `:focus` → "selecionado"; `:focus-visible` → "selecionado pelo teclado". Depois, o `estilo.css`:
```css
nav a:hover,
nav a:focus-visible {
  background-color: #264653;
  color: #ffffff;
}

nav a:focus-visible {
  outline: 2px solid #b5452c;
}
```
a vírgula pisca, com o cartão "aula 2: vários seletores com vírgula". Na prévia, pelo teclado, o link selecionado fica azul com o contorno terracota. Por fim, um celular genérico com um dedo tocando no menu; rótulo "no celular, não tem hover: não esconda nada atrás dele".

---

## Bloco 05 — A transição

**Fala:**
O menu já responde, mas a mudança é um pulo: de terracota para azul, na hora. Para ficar suave, existe o transíchon. Ele vai na regra név é, a normal, e não na regra do rôver. Transíchon, dois pontos, béquigráund cálor, zero vírgula três segundos, íz, ponto e vírgula. São três partes. Primeiro, qual propriedade vai mudar devagar: o béquigráund cálor. Depois, quanto tempo leva: zero vírgula três segundos, que se escreve zero ponto três e a letra ésse. E, por último, o jeito da mudança. O íz começa devagar, acelera e termina devagar, e parece natural. Salva e passa o mouse. Agora o fundo vai aparecendo, suave. E, quando o mouse sai, ele some suave também.

**Tela:** antes e depois: à esquerda, o link trocando de cor de uma vez (rótulo "sem transição: um pulo"); à direita, a cor mudando aos poucos (rótulo "com transição: suave"). No `estilo.css`, dentro da regra `nav a`:
```css
nav a {
  /* ... o que já tinha ... */
  transition: background-color 0.3s ease;
}
```
as três partes ganham etiquetas: `background-color` → "o que muda"; `0.3s` → "quanto tempo (0,3 segundo)"; `ease` → "o jeito: devagar, rápido, devagar". Uma linha do tempo de 0 a 0,3 segundo mostra a cor indo do terracota ao azul.

---

## Bloco 06 — O cartão que sobe

**Fala:**
Agora os cartões de projetos. A Ana quer que o cartão suba um pouquinho quando o mouse passa por cima. Para isso, tem o transfórm. Na regra nova, ponto cartão, dois pontos rôver, abre chaves, transfórm, dois pontos, transléit uái, abre parênteses, menos quatro pê xis, fecha parênteses, ponto e vírgula. Fecha chaves. Transléit uái quer dizer: mexa na vertical. Menos quatro pê xis é quatro para cima. E, na regra ponto cartão normal, o transíchon: transfórm, zero vírgula três segundos, íz. O cartão sobe e desce suave. O transfórm é bom para isso, porque ele mexe o cartão sem empurrar os vizinhos. Quanto ao kârsor póinter, ele troca a seta pela mãozinha. Os links já fazem isso sozinhos. Ele serve para coisas clicáveis que não são links.

**Tela:** no `estilo.css`, dentro da regra `.cartao`, a linha nova `transition: transform 0.3s ease;` e, logo abaixo, a regra nova:
```css
.cartao:hover {
  transform: translateY(-4px);
}
```
etiquetas: `translateY` → "mexe na vertical"; `-4px` → "4px para cima". Na prévia, o cursor passa pelos três cartões; cada um sobe um pouco e desce de volta, sem mexer nos vizinhos. Um cartão lateral: `cursor: pointer;` → a seta virando mãozinha; rótulo "os links já têm".

---

## Bloco 07 — O que transicionar, e com calma

**Fala:**
Nem tudo vale a pena animar. As que ficam boas e leves são a cálor, a béquigráund cálor e o transfórm. Mudanças de tamanho e de largura costumam empurrar a página toda e ficar estranhas. E calma com o tempo. Zero vírgula três segundos é bom. Dois segundos é tempo demais: a pessoa já foi embora. E tem gente que passa mal com movimento na tela. Essas pessoas avisam isso nas configurações do sistema. E o cê ésse ésse consegue ler esse aviso. No fim do arquivo, depois do arroba mídia da aula dez: arroba mídia, abre parênteses, prifêrs ridiúst môuchon, dois pontos, ridiúss, fecha parênteses. Dentro, uma regra asterisco, com transíchon, dois pontos, nân. Para quem pediu menos movimento, as mudanças viram um pulo, sem animação.

**Tela:** três cartões verdes: `color`, `background-color`, `transform` (rótulo "leves e bonitas"); um cartão cinza: `width`, `height` (rótulo "empurram a página"). Depois, uma régua de tempo: `0.3s` com check verde, `2s` com "x" vermelho. Por fim, no fim do `estilo.css`, depois do `@media (min-width: 768px)`:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none;
  }
}
```
etiquetas: `prefers-reduced-motion: reduce` → "a pessoa pediu menos movimento"; `transition: none` → "sem animação". Um ícone genérico de configurações com a opção "reduzir movimento" ligada.

---

## Bloco 08 — O estilo completo

**Fala:**
Vamos ver como ficou. Na regra név é, entrou o transíchon do béquigráund cálor. Logo embaixo, a regra do rôver e do fôcus vísibol juntos, com o fundo azul e a letra branca, e uma regra só do fôcus vísibol, com o contorno terracota. Na regra ponto cartão, entrou o transíchon do transfórm. E a regra ponto cartão, dois pontos rôver, com o transléit uái de menos quatro pê xis. No fim do arquivo, o arroba mídia das telas maiores, e o arroba mídia de quem pediu menos movimento. Salva e testa de dois jeitos: passando o mouse e apertando a tecla tab. Nos dois, a página responde. E abre também no celular: tudo continua funcionando, só que sem o efeito de passar por cima.

**Tela:** no `estilo.css`, as regras que mudaram ou entraram nesta aula (as regras das aulas 3 a 10 continuam no arquivo):
```css
nav a {
  /* ... o que já tinha ... */
  transition: background-color 0.3s ease;
}

nav a:hover,
nav a:focus-visible {
  background-color: #264653;
  color: #ffffff;
}

nav a:focus-visible {
  outline: 2px solid #b5452c;
}

.cartao {
  /* ... o que já tinha ... */
  transition: transform 0.3s ease;
}

.cartao:hover {
  transform: translateY(-4px);
}

/* ... o @media (min-width: 768px) da aula 10 ... */

@media (prefers-reduced-motion: reduce) {
  * {
    transition: none;
  }
}
```
na prévia, primeiro o mouse passa pelo menu e pelos cartões; depois, a tecla `Tab` percorre os links com o contorno terracota. Check verde nos dois.

---

## Bloco 09 — Os erros comuns

**Fala:**
Agora, os erros mais comuns. O primeiro: colocar o transíchon só na regra do rôver. A ida fica suave, mas, quando o mouse sai, a regra do rôver para de valer, e o transíchon vai junto. A volta vira um pulo. Coloque na regra normal. O segundo: esquecer o fôcus vísibol. Quem usa o teclado fica sem saber onde está. O terceiro: movimento demais. Tempo longo, cartão pulando longe, tudo se mexendo. Pouco é melhor. O quarto: transíchon ól em tudo. Ól quer dizer todas as propriedades, e aí até coisas que você não queria começam a se mexer. Diga o nome da propriedade. E o quinto: nos exercícios, escreva o valor exatamente como no enunciado. Para o corretor, zero ponto três ésse não é o mesmo que trezentos milissegundos.

**Tela:** cinco cartões de erro, cada um com a correção embaixo:
1. `nav a:hover { transition: ...; }` e uma animação: a ida suave, a volta num pulo; "x" vermelho; embaixo, o `transition` na regra `nav a`, check verde.
2. a tecla `Tab` percorrendo o menu sem nenhum destaque; "x" vermelho; embaixo, `nav a:hover, nav a:focus-visible`, check verde.
3. um cartão pulando alto, com `2s`; "x" vermelho; embaixo, `translateY(-4px)` e `0.3s`, check verde.
4. `transition: all 0.3s ease;` com várias coisas se mexendo; "x" vermelho; embaixo, `transition: background-color 0.3s ease;`, check verde.
5. um lembrete: "escreva o valor exatamente como no enunciado: `0.3s` não é `300ms`, `translateY(-4px)` não é `translate(0, -4px)`".

---

## Bloco 10 — Resumo e próximo degrau

**Fala:**
Vamos recapitular. Uma pseudoclasse escolhe um elemento num estado. O rôver é o mouse por cima, e o fôcus vísibol é a seleção pelo teclado: estilize sempre os dois juntos. No celular não tem rôver, então nada importante fica escondido atrás dele. O transíchon vai na regra normal, com a propriedade, o tempo e o jeito, como béquigráund cálor, zero vírgula três segundos, íz. O transfórm com transléit uái faz o cartão subir. E, para quem pediu menos movimento, o prifêrs ridiúst môuchon tira a animação. Agora é a sua vez: os exercícios estão logo abaixo do vídeo. Na próxima aula, o projeto final do nível: você vai pegar a sua própria página pessoal, do nível um, e dar a ela um estilo completo, com tudo o que aprendeu. Até lá, e bora destravar.

**Tela:** lista do resumo aparecendo item por item com checks verdes ("pseudo-classe = um estado", "`:hover` + `:focus-visible`, sempre juntos", "no celular não tem hover", "`transition: background-color 0.3s ease;` na regra normal", "`transform: translateY(-4px);` no `:hover`", "`@media (prefers-reduced-motion: reduce)`"); botão "Fazer os exercícios" pulsando. Prévia da próxima aula: a página pessoal de um aluno, sem estilo, ganhando cores, fontes, menu em linha e cartões; o texto "Aula 12 — Projeto final do nível". Encerramento com o logo da Destrava e o slogan "Destrava sua carreira. Um nível de cada vez."
