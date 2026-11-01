# Aula 7 — Formulários: o básico

**Nível:** Primeiro Commit · **Duração estimada:** ~11 minutos · **Blocos:** 11

## Como este roteiro é usado

- A voz do vídeo é **gerada por IA** a partir do texto em "Fala". Por isso a "Fala" precisa soar natural quando lida em voz alta: frases curtas, sem siglas soltas, com os símbolos de código ditos por extenso.
- O que está em "Tela" é o que o pipeline de vídeo anima (editor da Destrava, prévia do navegador, rótulos, setas, checks). Não é lido pela voz.
- Um áudio por bloco: `bloco01`, `bloco02`... Para corrigir uma fala, gere de novo só aquele bloco.
- Todo o conteúdo de exemplo é fictício (a aluna "Ana"). Nada de marcas, empresas ou sites reais: os endereços usam o domínio reservado `example.com`.
- Na "Fala", as tags e os atributos de formulário são escritos do jeito que se fala, para a voz não tropeçar: `form` = "fórm", `input` = "ínput", `label` = "lêibol", `textarea` = "téxt érria", `button` = "bâton", `type` = "táip", `text` = "téxt", `email` = "i-mêil", `submit` = "sâbmit", `name` = "nêim", `id` = "ái di", `for` = "fór", `placeholder` = "plêis rôlder", `required` = "riquáiârd", `action` = "éction". As de tabela, da aula passada, seguem como antes: `table` = "têibol", `th` = "tê agá".

---

## Bloco 01 — Abertura

**Fala:**
Olá, que bom te ver de novo. Na aula passada, a página da Ana ganhou uma tabela: o horário de estudos da semana, com cabeçalhos em tê agá e um título com a quépchon. Até agora, a página só mostra coisas. A pessoa chega, lê, olha as fotos e vai embora. Hoje, isso muda. A página da Ana vai começar a ouvir quem visita. Pensa naquela caixinha de contato que aparece em tanto site, com um espaço para o nome, outro para o e-mail, um campo grande para a mensagem e um botão de enviar. Isso é um formulário. Você vai aprender a criar os campos, a dar um nome para cada um, a ligar cada campo ao seu rótulo e a colocar o botão. E, no fim, a Ana vai ter um formulário de contato na página dela. Abre o editor e bora destravar.

**Tela:** logo da Destrava animando → título "Aula 7 — Formulários: o básico" → os 5 degraus do curso com o primeiro aceso; ao lado, a página "Sobre mim" da Ana, da aula passada, com a tabela "Horário de estudos da semana"; uma seta mostra a página "falando" com quem visita, e depois um balão volta de quem visita para a página. Surge um formulário de contato ilustrado, com os campos "Nome", "E-mail", "Mensagem" e o botão "Enviar". Rótulo: "o que a gente vai construir hoje".

---

## Bloco 02 — O que é um formulário

**Fala:**
Antes do código, vamos entender a ideia. Um formulário é um pedaço da página onde quem visita pode escrever ou escolher alguma coisa. Você usa formulários o tempo todo, mesmo sem perceber. A caixa de busca é um formulário. A tela de cadastro também. O campo para deixar um comentário, idem. Todo formulário tem três peças. Primeiro, os campos, que são os espaços onde a pessoa digita. Segundo, os rótulos, que são os textos que dizem o que vai em cada campo, como nome ou e-mail. E terceiro, um botão, para a pessoa avisar que terminou. Hoje, a gente vai montar essas três peças. E, para não ter surpresa, já adianto uma coisa: nesta aula, o formulário vai ficar pronto e funcionando na tela, mas ainda não vai mandar a mensagem para lugar nenhum. Já já eu explico o porquê.

**Tela:** três cartõezinhos aparecem: uma caixa de busca com uma lupa, uma tela de cadastro e um campo de comentário, com o rótulo "tudo isso é formulário". Depois, o formulário de contato da Ana se desmonta em três camadas coloridas: os campos em azul, rótulo "campos: onde se digita"; os textos "Nome", "E-mail" e "Mensagem" em verde, rótulo "rótulos: o que vai em cada campo"; o botão em laranja, rótulo "botão: terminei". No canto, um aviso amarelo discreto: "por enquanto, não envia para lugar nenhum".

---

## Bloco 03 — A caixa fórm e o primeiro campo: ínput

**Fala:**
Agora sim, o código. Todo formulário começa com a tag fórm. Ela é a caixa que guarda todos os campos, assim como a têibol guarda a tabela inteira. Dentro dela, vem o primeiro campo, que é a tag ínput, que quer dizer entrada. É por ali que a informação entra. A ínput tem um detalhe: ela não tem tag de fechamento. Igual à tag de imagem, da aula quatro, ela abre e pronto. Para dizer que tipo de campo é, a gente usa o atributo táip. Com táip igual a téxt, ela vira uma caixa de texto de uma linha só. E tem mais um atributo importante, o nêim, que é o nome do campo. A Ana escreve nêim igual a nome. Quem visita não vê o nêim, mas ele é como uma etiqueta: mais tarde, quando o formulário for enviado, é por esse nome que a gente sabe o que a pessoa digitou em cada campo.

**Tela:** "form" aparece com o rótulo "a caixa do formulário"; depois "input", com "input = entrada". No editor, abaixo de um novo `<h2>Fale comigo</h2>`, é digitado:
```html
<form>
  <input type="text" name="nome">
</form>
```
uma caixa tracejada envolve o `<form>` inteiro; o `<input>` pisca, e um balão mostra "sem tag de fechamento, igual ao `<img>`". O atributo `type="text"` ganha o rótulo "texto de uma linha"; `name="nome"` ganha uma etiqueta pendurada, rótulo "o nome do dado, invisível para quem visita". Na prévia, aparece uma caixinha de texto vazia; o cursor clica nela e digita "Ana".

---

## Bloco 04 — O rótulo: lêibol, com fór e ái di

**Fala:**
Tem um problema na caixinha que a gente acabou de criar: ninguém sabe o que escrever nela. Falta o rótulo. Para isso existe a tag lêibol, que quer dizer etiqueta. Ela guarda o texto que explica o campo. A Ana escreve uma lêibol com o texto nome. Mas não basta colocar a lêibol perto do campo. É preciso ligar os dois. E essa ligação é feita com dois atributos que trabalham juntos. No campo, a gente coloca um ái di, que é a identidade dele, única na página. Por exemplo, ái di igual a nome. E na lêibol, a gente coloca o atributo fór, que quer dizer para, com o mesmo valor: fór igual a nome. Pronto. A lêibol diz: eu sou o rótulo do campo que tem esse ái di. Atenção, porque os dois valores precisam ser exatamente iguais, letra por letra.

**Tela:** "label" aparece com o rótulo "label = etiqueta". No editor, o formulário é atualizado:
```html
<form>
  <label for="nome">Nome</label>
  <input type="text" id="nome" name="nome">
</form>
```
`for="nome"` e `id="nome"` ficam destacados na mesma cor, e uma linha curva liga um ao outro, rótulo "mesmo valor = ligados". Na prévia, o texto "Nome" aparece ao lado da caixinha. Um cartão lembra a aula 3: "o `id` também serve de destino para links com `#`".

---

## Bloco 05 — Por que ligar o rótulo ao campo

**Fala:**
Você pode estar pensando: mas o texto já está do lado do campo, por que ligar? Por dois motivos. O primeiro você mesmo pode testar agora. Clica no texto nome, na prévia. Repara: o cursor pula para dentro da caixinha. Quando a lêibol está ligada, clicar no rótulo é o mesmo que clicar no campo. Isso ajuda muito no celular, onde os campos são pequenos e o dedo é grande. O segundo motivo é para quem usa leitor de tela. Quando a pessoa chega no campo, o leitor anuncia: nome, caixa de texto. Sem a ligação, ele diz só: caixa de texto. E a pessoa fica sem saber o que digitar ali. Lembra da tabela, na aula passada? É a mesma ideia da tê agá. O rótulo dá contexto para o campo. Então, a regra é simples: todo campo tem uma lêibol, e toda lêibol aponta para o seu campo.

**Tela:** na prévia, o cursor clica no texto "Nome"; a caixinha acende com uma borda azul e o cursor de texto pisca dentro dela, rótulo "clicou no rótulo, foi para o campo". Ao lado, um celular desenhado com um dedo tocando o rótulo grande, check verde. Depois, a tela fica escura com o ícone de alto-falante: primeiro, sem ligação, o balão "caixa de texto" com pontos de interrogação; depois, com ligação, o balão "Nome, caixa de texto" com check verde. No fim, o cartão: "todo campo tem um `<label>`".

---

## Bloco 06 — Plêis rôlder não é rótulo

**Fala:**
Agora, um atalho que parece bom, mas é armadilha. Existe um atributo chamado plêis rôlder. Ele coloca um texto clarinho dentro do campo, como uma dica. Por exemplo: plêis rôlder igual a seu nome completo. Fica bonito, e é por isso que muita gente usa o plêis rôlder no lugar da lêibol. Só que tem um problema: no momento em que a pessoa começa a digitar, a dica some. Se ela se distrair no meio do caminho, já não sabe mais o que aquele campo pedia. Além disso, o texto clarinho é difícil de ler para muita gente, e nem todo leitor de tela anuncia o plêis rôlder do mesmo jeito. Então, use o plêis rôlder só como um exemplo extra, se quiser. O rótulo de verdade é sempre a lêibol.

**Tela:** no editor, uma versão sem `<label>` aparece:
```html
<input type="text" name="nome" placeholder="Seu nome completo">
```
na prévia, o campo mostra "Seu nome completo" em cinza clarinho; o cursor digita "An" e a dica desaparece; um ponto de interrogação flutua sobre o campo, rótulo "cadê a dica?". Um "x" vermelho aparece com o rótulo "placeholder no lugar do label: não". Depois, a versão certa, com `<label for="nome">Nome</label>` acima do campo e o `placeholder` mantido, ganha check verde, rótulo "placeholder: só um exemplo extra".

---

## Bloco 07 — O campo de e-mail e o riquáiârd

**Fala:**
O segundo campo do formulário da Ana é o e-mail. Ela podia usar outra ínput com táip téxt, mas existe um táip melhor: táip igual a i-mêil. Por fora, parece a mesma caixinha. Mas o navegador passa a saber que ali vai um endereço de e-mail. No celular, o teclado já aparece com o arroba à mão. E, na hora de enviar, o navegador confere se o texto tem cara de e-mail. Se a pessoa digitar só ana, sem arroba, aparece um aviso. A Ana monta igual ao nome: uma lêibol com fór igual a email, e uma ínput com táip i-mêil, ái di email e nêim email. E, de bônus, um atributo rapidinho: o riquáiârd, que quer dizer obrigatório. Ele não precisa de valor, basta escrever a palavra. Com ele, o navegador não deixa enviar o formulário com aquele campo vazio.

**Tela:** no editor, abaixo do campo de nome, é digitado:
```html
<label for="email">E-mail</label>
<input type="email" id="email" name="email" required>
```
`type="email"` ganha o rótulo "o navegador sabe que é e-mail"; um celular desenhado mostra o teclado com a tecla "@" destacada. Na prévia, o cursor digita "ana" e clica fora; um balão de aviso do navegador aparece, rótulo "falta o @". O atributo `required` pisca, rótulo "obrigatório: não pode ficar vazio", e um balão "Preencha este campo" surge sobre o campo vazio.

---

## Bloco 08 — Um campo maior: téxt érria

**Fala:**
Para o nome e o e-mail, uma linha basta. Mas a mensagem pode ser longa, com vários parágrafos. Para isso existe a téxt érria, que quer dizer área de texto. É uma caixa maior, onde dá para escrever várias linhas. E aqui vai uma diferença importante em relação à ínput: a téxt érria tem tag de abertura e tag de fechamento. Se você colocar um texto entre as duas, ele aparece já escrito dentro da caixa. Por isso, na maioria das vezes, a gente abre e fecha a téxt érria logo em seguida, sem nada no meio, nem um espaço. O resto funciona igualzinho: ela também tem ái di e nêim, e também ganha a sua lêibol. A Ana escreve uma lêibol com fór igual a mensagem e uma téxt érria com ái di mensagem e nêim mensagem.

**Tela:** "textarea" aparece com o rótulo "textarea = área de texto". No editor, é digitado:
```html
<label for="mensagem">Mensagem</label>
<textarea id="mensagem" name="mensagem"></textarea>
```
na prévia, surge uma caixa maior; o cursor digita duas linhas de texto e ela acomoda tudo. Dois cartões lado a lado: "`<input>`: sem fechamento, uma linha" e "`<textarea></textarea>`: abre e fecha, várias linhas". Um mini exemplo com espaços entre as tags mostra a caixa começando com espaços em branco, aviso amarelo, rótulo "abre e fecha colado".

---

## Bloco 09 — O botão e a verdade sobre o envio

**Fala:**
Falta a terceira peça: o botão. Ele é a tag bâton. Dentro dela vai o texto que aparece no botão. A Ana escreve: enviar. E coloca o atributo táip igual a sâbmit, que quer dizer enviar o formulário. Quando a pessoa clica, o navegador confere os campos, aquele do e-mail e os obrigatórios, e tenta enviar. Agora, a verdade que eu prometi lá no começo. Enviar para onde? Quem decide isso é o atributo éction, na tag fórm, que aponta para um servidor: um programa que recebe os dados e faz alguma coisa com eles, como guardar ou mandar um e-mail. A gente ainda não tem esse servidor. Isso fica para níveis mais à frente. Então, por enquanto, quando você clicar em enviar, a página só recarrega, e os campos ficam vazios de novo. Isso é normal. O formulário está certo.

**Tela:** "button" aparece com o rótulo "button = botão". No editor, no fim do formulário, é digitado:
```html
<button type="submit">Enviar</button>
```
na prévia, surge o botão "Enviar"; o cursor clica nele. Uma animação mostra os dados saindo do formulário com as etiquetas `nome`, `email` e `mensagem` penduradas, seguindo uma seta até uma nuvem tracejada com o rótulo "servidor (próximos níveis)". A seta para no meio do caminho e a página pisca, recarregando com os campos vazios; rótulo "sem servidor, a página só recarrega". No fim, um check verde: "o formulário está certo".

---

## Bloco 10 — O formulário de contato da Ana

**Fala:**
Agora, vamos juntar tudo na página da Ana. Ela cria um título novo: fale comigo. E, logo abaixo, o formulário completo. Abre a fórm. Primeiro, o nome: uma lêibol com fór igual a nome e uma ínput téxt com ái di nome. Depois, o e-mail: lêibol com fór igual a email e uma ínput do táip i-mêil, obrigatória. Em seguida, a mensagem: lêibol com fór igual a mensagem e uma téxt érria. E, por fim, o bâton do táip sâbmit, com o texto enviar. Fecha a fórm. Repara que cada par de rótulo e campo está dentro de um parágrafo. Isso não é obrigatório, mas coloca cada par numa linha, e o formulário fica fácil de ler. E repara também na indentação da aula cinco, cada nível um pouquinho mais para dentro. Agora, faz o teste: clica em cada rótulo e veja o cursor pular para o campo certo.

**Tela:** no `index.html`, abaixo da tabela, é digitado:
```html
<h2>Fale comigo</h2>
<form>
  <p>
    <label for="nome">Nome</label>
    <input type="text" id="nome" name="nome">
  </p>
  <p>
    <label for="email">E-mail</label>
    <input type="email" id="email" name="email" required>
  </p>
  <p>
    <label for="mensagem">Mensagem</label>
    <textarea id="mensagem" name="mensagem"></textarea>
  </p>
  <button type="submit">Enviar</button>
</form>
```
na prévia, aparece o formulário completo, cada par em uma linha; o cursor clica em "Nome", "E-mail" e "Mensagem", e cada campo acende em sequência, com check verde. Cada par `for`/`id` ganha a mesma cor. Os espaços da indentação ficam destacados em amarelo, rótulo "cada nível mais para dentro".

---

## Bloco 11 — Os erros mais comuns e o próximo degrau

**Fala:**
Antes de terminar, os erros que mais aparecem com formulários. O primeiro: lêibol sem o fór. O texto aparece, mas não está ligado a nada. O segundo: o fór e o ái di com valores diferentes, tipo email com hífen num e sem hífen no outro, ou com letra maiúscula só de um lado. Precisa ser igual, letra por letra. O terceiro: fechar a ínput, como se ela fosse uma téxt érria. A ínput não tem fechamento. E o quarto: usar o plêis rôlder no lugar da lêibol. Agora, vamos recapitular. A fórm é a caixa. A ínput cria campos de uma linha, com táip téxt ou i-mêil. A téxt érria é para textos longos. A lêibol é o rótulo, ligado pelo fór e pelo ái di. E o bâton do táip sâbmit envia. Os exercícios estão logo abaixo do vídeo. Na próxima aula, a gente organiza a página inteira em regiões com significado, usando as tags semânticas. Até lá, e bora destravar.

**Tela:** quatro cartões aparecem em sequência, cada um com o erro e a correção:
1. `<label>Nome</label>`, com "x" vermelho e o rótulo "label sem for"; embaixo, `<label for="nome">Nome</label>`, com check verde.
2. `<label for="email">` com `<input id="Email">`, com "x" vermelho e o rótulo "valores diferentes"; embaixo, `for="email"` e `id="email"` na mesma cor, check verde.
3. `<input type="text" name="nome"></input>`, com "x" vermelho e o rótulo "input não fecha"; embaixo, `<input type="text" name="nome">`, check verde.
4. o campo só com `placeholder`, do bloco 6, com "x" vermelho, rótulo "placeholder não é rótulo".
Depois, a lista do resumo aparece item por item com checks verdes ("form: a caixa", "input: uma linha, text ou email", "textarea: textos longos", "label + for + id: rótulo ligado", "button type=\"submit\": envia"); botão "Fazer os exercícios" pulsando; prévia da próxima aula com a página da Ana dividida em regiões coloridas e o texto "Aula 8 — Tags semânticas"; encerramento com o logo da Destrava e o slogan "Destrava sua carreira. Um nível de cada vez."
