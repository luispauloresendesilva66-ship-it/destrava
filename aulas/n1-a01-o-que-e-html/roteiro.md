# Aula 1 — O que é HTML?

**Nível:** Primeiro Commit · **Duração estimada:** ~10 minutos · **Blocos:** 12

## Como gravar

- Grave **um áudio por bloco** e dê o nome do bloco ao arquivo: `bloco01`, `bloco02`... (qualquer formato serve: WhatsApp, gravador do Windows, celular).
- Leia **só o texto em "Fala"**. O que está em "Tela" é o que eu vou animar no vídeo, não é para ler.
- Fale com calma, como se estivesse explicando para um amigo. Pausas são bem-vindas.
- Errou? Regrave só aquele bloco.
- Lugar silencioso, celular a um palmo da boca, sem ventilador ligado.

---

## Bloco 01 — Abertura

**Fala:**
Olá, seja bem-vindo à Destrava. Eu sou o seu instrutor, e a partir de agora a gente vai aprender programação de verdade, do zero. Antes de começar, quero deixar uma coisa clara: aqui ninguém vai te prometer que você vira programador em duas horas. Programação se aprende do mesmo jeito que se aprende qualquer coisa que vale a pena: um degrau de cada vez. E é exatamente assim que este curso funciona. Você só sobe para o próximo nível quando dominar o atual. Nesta primeira aula, a gente vai entender o que é o HTML, para que ele serve e, no final, você vai ver a sua primeira página na internet sendo construída. Bora destravar?

**Tela:** logo da Destrava animando (cadeado do "d" destravando em verde) → título "Aula 1 — O que é HTML?" → os 5 degraus do curso, o primeiro acendendo.

---

## Bloco 02 — Como a internet entrega um site

**Fala:**
Toda vez que você abre um site, acontece uma conversa bem rápida. O seu navegador, que pode ser o Chrome, o Edge ou o Firefox, manda um pedido para um computador lá longe, que a gente chama de servidor. O pedido é mais ou menos assim: me manda a página inicial desse site. E o servidor responde mandando um arquivo. O detalhe que pouca gente sabe é que esse arquivo é só texto. Um texto escrito de um jeito especial, que o navegador lê e transforma na página bonita que você vê. Esse jeito especial de escrever é o HTML.

**Tela:** animação com um ícone de navegador à esquerda e um servidor à direita; uma seta "pedido" vai, uma seta "resposta" volta carregando um documento de texto; o documento entra no navegador e vira uma página.

---

## Bloco 03 — HTML, CSS e JavaScript

**Fala:**
Quase todo site do mundo é feito com três linguagens trabalhando juntas. Pensa numa casa. O HTML é a estrutura: as paredes, as portas, os cômodos. Ele diz o que existe na página: aqui tem um título, aqui tem um texto, aqui tem uma imagem. O CSS é o acabamento: a cor da parede, o piso, a decoração. Ele cuida da aparência. E o JavaScript é a parte elétrica: é ele que faz as coisas acontecerem quando você clica num botão. Neste curso você vai aprender as três, nessa ordem. E hoje a gente começa pela base de tudo, que é a estrutura: o HTML.

**Tela:** uma casa sendo montada em três camadas: primeiro a estrutura em linhas (rótulo "HTML"), depois cor e acabamento (rótulo "CSS"), depois uma lâmpada acendendo com um clique (rótulo "JavaScript").

---

## Bloco 04 — Linguagem de marcação

**Fala:**
HTML é a sigla para HyperText Markup Language, que em português seria linguagem de marcação de hipertexto. A palavra mais importante aí é marcação. Com o HTML, você não dá ordens para o computador fazer contas. Você marca o conteúdo, dizendo o que cada pedaço é. É como pegar um texto impresso e passar um marca-texto: isso aqui é o título, isso aqui é um parágrafo, isso aqui é um link. Por isso tem gente que diz que HTML não é uma linguagem de programação, e sim de marcação. E tudo bem: ele é o primeiro passo obrigatório para qualquer pessoa que quer trabalhar com desenvolvimento web.

**Tela:** a sigla "HyperText Markup Language" aparecendo palavra por palavra, com "Markup = Marcação" destacado; depois um texto simples sendo "marcado" com marca-texto em três cores, com etiquetas "título", "parágrafo", "link".

---

## Bloco 05 — Anatomia de uma tag

**Fala:**
A marcação no HTML é feita com etiquetas que a gente chama de tags. Olha esse exemplo na tela. Uma tag começa com o sinal de menor, o nome da tag, e o sinal de maior. Essa é a tag de abertura. Depois vem o conteúdo, que é o texto que vai aparecer. E no final vem a tag de fechamento, que é igual à de abertura, só que com uma barra antes do nome. A letra p vem de parágrafo. Então essa linha está dizendo para o navegador: o texto "Olá, mundo" é um parágrafo. Abertura, conteúdo, fechamento. Guarda essa ideia, porque você vai usar ela o tempo todo.

**Tela:** o código `<p>Olá, mundo</p>` grande no centro; cada parte se destaca em sequência com rótulos: "tag de abertura" `<p>`, "conteúdo" `Olá, mundo`, "tag de fechamento" `</p>` (com a barra piscando).

---

## Bloco 06 — Todo site tem HTML

**Fala:**
Quer ver uma coisa interessante? Qualquer site que você visita tem HTML por trás. No computador, se você apertar Control e U ao mesmo tempo, o navegador mostra o código da página. Vai aparecer um monte de texto que, à primeira vista, parece confuso. Mas repara: no meio dele tem um monte de sinais de menor e maior. São as tags. É o HTML daquele site. Hoje parece um idioma estranho, mas daqui a pouco tempo você vai bater o olho nisso e entender muita coisa. Faz esse teste depois da aula num site que você usa bastante.

**Tela:** uma página genérica de exemplo (não um site real de marca) e o atalho "Ctrl + U" aparecendo; a página "vira" e mostra o código-fonte, com as tags `<` `>` destacadas uma a uma.

---

## Bloco 07 — O que você precisa para começar

**Fala:**
Para escrever HTML você não precisa comprar nada nem ter um computador potente. Você só precisa de duas coisas: um editor de texto e um navegador. O navegador você já tem. Para o editor, o mais usado no mercado é o Visual Studio Code, que é gratuito. Mas, aqui na Destrava, você nem precisa instalar nada no começo: dentro do app tem um editor de código onde você vai fazer os exercícios e ver o resultado na hora. Mais para frente no curso, eu te mostro como montar o seu ambiente profissional no seu computador.

**Tela:** dois cards lado a lado: "Editor de texto" (ícone de editor, legenda "VS Code — grátis") e "Navegador" (ícone genérico de navegador); depois uma prévia do editor de exercícios da Destrava.

---

## Bloco 08 — A estrutura básica de uma página

**Fala:**
Agora vamos montar a nossa primeira página. Todo arquivo HTML segue uma estrutura básica, e eu vou escrever ela com você. A primeira linha é o DOCTYPE, que avisa o navegador que esse é um documento HTML moderno. Depois vem a tag html, que abraça a página inteira. Repara que nela eu coloquei lang igual a pt-BR, dizendo que a página está em português do Brasil. Dentro do html, a página se divide em duas partes: o head, que é a cabeça, e o body, que é o corpo. Não se preocupa em decorar agora. Você vai escrever essa estrutura tantas vezes que ela vai sair no automático.

**Tela:** o editor da Destrava com o código sendo digitado aos poucos, sincronizado com a fala:
```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
  </head>
  <body>
  </body>
</html>
```
com destaque em `<!DOCTYPE html>`, depois `lang="pt-BR"`, depois `<head>` e `<body>`.

---

## Bloco 09 — Head e body

**Fala:**
Qual a diferença entre o head e o body? O head guarda informações sobre a página que não aparecem no meio dela. Por exemplo, a tag meta charset igual a UTF-8, que garante que os acentos e o cê-cedilha apareçam certinho. E a tag title, que é o título que aparece lá em cima, na aba do navegador. Já o body é o corpo: tudo o que você colocar dentro dele aparece na tela para o visitante. Então, regra simples: informação sobre a página vai no head. Conteúdo que a pessoa vai ver vai no body.

**Tela:** o código continua sendo digitado dentro do head:
```html
<meta charset="UTF-8">
<title>Minha primeira página</title>
```
ao lado, uma janela de navegador com a aba mostrando "Minha primeira página"; uma seta liga o `<title>` à aba.

---

## Bloco 10 — Colocando conteúdo na tela

**Fala:**
Agora sim, vamos colocar alguma coisa na tela. Dentro do body, eu vou escrever uma tag h1, que é o título principal da página, com o texto "Minha primeira página". E logo abaixo, um parágrafo com a tag p: "Estou aprendendo HTML na Destrava." Depois é só salvar o arquivo com o nome index ponto html e abrir no navegador. E olha aí: a sua primeira página. O título aparece grande e em negrito, e o parágrafo aparece embaixo, em tamanho normal. Simples assim. Parabéns, você acabou de escrever HTML de verdade.

**Tela:** dentro do body é digitado:
```html
<h1>Minha primeira página</h1>
<p>Estou aprendendo HTML na Destrava.</p>
```
o nome do arquivo `index.html` aparece; a tela se divide e mostra o resultado no navegador; confete discreto verde no "Parabéns".

---

## Bloco 11 — O erro mais comum

**Fala:**
Agora o erro que todo iniciante comete, e tudo bem cometer: esquecer de fechar uma tag. Olha esse exemplo: eu abri o h1 e não fechei. O navegador é bonzinho e tenta adivinhar o que você quis dizer, mas às vezes ele adivinha errado, e o resto da página inteira fica com cara de título. Por isso, crie o hábito: abriu, já fecha. E outra dica: repara que eu deixo o código que está dentro de outra tag um pouco mais para a direita. Isso se chama indentação. O navegador não liga para isso, mas para você e para quem vai ler o seu código, faz toda a diferença.

**Tela:** o código `<h1>Minha primeira página` sem fechamento; no navegador ao lado, o parágrafo também aparece gigante e em negrito, marcado com um "x" vermelho; depois o `</h1>` é adicionado e o resultado corrige, com um check verde. Em seguida, a mesma página mostrada sem indentação e com indentação, lado a lado.

---

## Bloco 12 — Resumo e próximo degrau

**Fala:**
Vamos recapitular. O HTML é a linguagem que dá estrutura às páginas da internet. Ele funciona com tags, que têm abertura, conteúdo e fechamento. Toda página tem o head, com as informações sobre ela, e o body, com o que aparece na tela. E você já escreveu a sua primeira página com um título e um parágrafo. Agora vem a parte mais importante: praticar. Logo abaixo deste vídeo tem os exercícios desta aula. Faz eles com calma, porque é praticando que o conhecimento fica. Nos vemos na próxima aula. Até lá, e bora destravar.

**Tela:** lista do resumo aparecendo item por item com checks verdes; botão "Fazer os exercícios" pulsando; encerramento com o logo da Destrava e o slogan "Destrava sua carreira. Um nível de cada vez."
