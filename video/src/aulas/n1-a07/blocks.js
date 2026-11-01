// Dados da Aula 7 — Formulários: o básico (extraídos do roteiro.md; Fala verbatim)
export const BLOCK_TEXTS = [
  { n: 1, title: "Abertura", fala: "Olá, que bom te ver de novo. Na aula passada, a página da Ana ganhou uma tabela: o horário de estudos da semana, com cabeçalhos em tê agá e um título com a quépchon. Até agora, a página só mostra coisas. A pessoa chega, lê, olha as fotos e vai embora. Hoje, isso muda. A página da Ana vai começar a ouvir quem visita. Pensa naquela caixinha de contato que aparece em tanto site, com um espaço para o nome, outro para o e-mail, um campo grande para a mensagem e um botão de enviar. Isso é um formulário. Você vai aprender a criar os campos, a dar um nome para cada um, a ligar cada campo ao seu rótulo e a colocar o botão. E, no fim, a Ana vai ter um formulário de contato na página dela. Abre o editor e bora destravar." },
  { n: 2, title: "O que é um formulário", fala: "Antes do código, vamos entender a ideia. Um formulário é um pedaço da página onde quem visita pode escrever ou escolher alguma coisa. Você usa formulários o tempo todo, mesmo sem perceber. A caixa de busca é um formulário. A tela de cadastro também. O campo para deixar um comentário, idem. Todo formulário tem três peças. Primeiro, os campos, que são os espaços onde a pessoa digita. Segundo, os rótulos, que são os textos que dizem o que vai em cada campo, como nome ou e-mail. E terceiro, um botão, para a pessoa avisar que terminou. Hoje, a gente vai montar essas três peças. E, para não ter surpresa, já adianto uma coisa: nesta aula, o formulário vai ficar pronto e funcionando na tela, mas ainda não vai mandar a mensagem para lugar nenhum. Já já eu explico o porquê." },
  { n: 3, title: "A caixa form e o primeiro campo: input", fala: "Agora sim, o código. Todo formulário começa com a tag fórm. Ela é a caixa que guarda todos os campos, assim como a têibol guarda a tabela inteira. Dentro dela, vem o primeiro campo, que é a tag ínput, que quer dizer entrada. É por ali que a informação entra. A ínput tem um detalhe: ela não tem tag de fechamento. Igual à tag de imagem, da aula quatro, ela abre e pronto. Para dizer que tipo de campo é, a gente usa o atributo táip. Com táip igual a téxt, ela vira uma caixa de texto de uma linha só. E tem mais um atributo importante, o nêim, que é o nome do campo. A Ana escreve nêim igual a nome. Quem visita não vê o nêim, mas ele é como uma etiqueta: mais tarde, quando o formulário for enviado, é por esse nome que a gente sabe o que a pessoa digitou em cada campo." },
  { n: 4, title: "O rótulo: label, com for e id", fala: "Tem um problema na caixinha que a gente acabou de criar: ninguém sabe o que escrever nela. Falta o rótulo. Para isso existe a tag lêibol, que quer dizer etiqueta. Ela guarda o texto que explica o campo. A Ana escreve uma lêibol com o texto nome. Mas não basta colocar a lêibol perto do campo. É preciso ligar os dois. E essa ligação é feita com dois atributos que trabalham juntos. No campo, a gente coloca um ái di, que é a identidade dele, única na página. Por exemplo, ái di igual a nome. E na lêibol, a gente coloca o atributo fór, que quer dizer para, com o mesmo valor: fór igual a nome. Pronto. A lêibol diz: eu sou o rótulo do campo que tem esse ái di. Atenção, porque os dois valores precisam ser exatamente iguais, letra por letra." },
  { n: 5, title: "Por que ligar o rótulo ao campo", fala: "Você pode estar pensando: mas o texto já está do lado do campo, por que ligar? Por dois motivos. O primeiro você mesmo pode testar agora. Clica no texto nome, na prévia. Repara: o cursor pula para dentro da caixinha. Quando a lêibol está ligada, clicar no rótulo é o mesmo que clicar no campo. Isso ajuda muito no celular, onde os campos são pequenos e o dedo é grande. O segundo motivo é para quem usa leitor de tela. Quando a pessoa chega no campo, o leitor anuncia: nome, caixa de texto. Sem a ligação, ele diz só: caixa de texto. E a pessoa fica sem saber o que digitar ali. Lembra da tabela, na aula passada? É a mesma ideia da tê agá. O rótulo dá contexto para o campo. Então, a regra é simples: todo campo tem uma lêibol, e toda lêibol aponta para o seu campo." },
  { n: 6, title: "Placeholder não é rótulo", fala: "Agora, um atalho que parece bom, mas é armadilha. Existe um atributo chamado plêis rôlder. Ele coloca um texto clarinho dentro do campo, como uma dica. Por exemplo: plêis rôlder igual a seu nome completo. Fica bonito, e é por isso que muita gente usa o plêis rôlder no lugar da lêibol. Só que tem um problema: no momento em que a pessoa começa a digitar, a dica some. Se ela se distrair no meio do caminho, já não sabe mais o que aquele campo pedia. Além disso, o texto clarinho é difícil de ler para muita gente, e nem todo leitor de tela anuncia o plêis rôlder do mesmo jeito. Então, use o plêis rôlder só como um exemplo extra, se quiser. O rótulo de verdade é sempre a lêibol." },
  { n: 7, title: "O campo de e-mail e o required", fala: "O segundo campo do formulário da Ana é o e-mail. Ela podia usar outra ínput com táip téxt, mas existe um táip melhor: táip igual a i-mêil. Por fora, parece a mesma caixinha. Mas o navegador passa a saber que ali vai um endereço de e-mail. No celular, o teclado já aparece com o arroba à mão. E, na hora de enviar, o navegador confere se o texto tem cara de e-mail. Se a pessoa digitar só ana, sem arroba, aparece um aviso. A Ana monta igual ao nome: uma lêibol com fór igual a email, e uma ínput com táip i-mêil, ái di email e nêim email. E, de bônus, um atributo rapidinho: o riquáiârd, que quer dizer obrigatório. Ele não precisa de valor, basta escrever a palavra. Com ele, o navegador não deixa enviar o formulário com aquele campo vazio." },
  { n: 8, title: "Um campo maior: textarea", fala: "Para o nome e o e-mail, uma linha basta. Mas a mensagem pode ser longa, com vários parágrafos. Para isso existe a téxt érria, que quer dizer área de texto. É uma caixa maior, onde dá para escrever várias linhas. E aqui vai uma diferença importante em relação à ínput: a téxt érria tem tag de abertura e tag de fechamento. Se você colocar um texto entre as duas, ele aparece já escrito dentro da caixa. Por isso, na maioria das vezes, a gente abre e fecha a téxt érria logo em seguida, sem nada no meio, nem um espaço. O resto funciona igualzinho: ela também tem ái di e nêim, e também ganha a sua lêibol. A Ana escreve uma lêibol com fór igual a mensagem e uma téxt érria com ái di mensagem e nêim mensagem." },
  { n: 9, title: "O botão e a verdade sobre o envio", fala: "Falta a terceira peça: o botão. Ele é a tag bâton. Dentro dela vai o texto que aparece no botão. A Ana escreve: enviar. E coloca o atributo táip igual a sâbmit, que quer dizer enviar o formulário. Quando a pessoa clica, o navegador confere os campos, aquele do e-mail e os obrigatórios, e tenta enviar. Agora, a verdade que eu prometi lá no começo. Enviar para onde? Quem decide isso é o atributo éction, na tag fórm, que aponta para um servidor: um programa que recebe os dados e faz alguma coisa com eles, como guardar ou mandar um e-mail. A gente ainda não tem esse servidor. Isso fica para níveis mais à frente. Então, por enquanto, quando você clicar em enviar, a página só recarrega, e os campos ficam vazios de novo. Isso é normal. O formulário está certo." },
  { n: 10, title: "O formulário de contato da Ana", fala: "Agora, vamos juntar tudo na página da Ana. Ela cria um título novo: fale comigo. E, logo abaixo, o formulário completo. Abre a fórm. Primeiro, o nome: uma lêibol com fór igual a nome e uma ínput téxt com ái di nome. Depois, o e-mail: lêibol com fór igual a email e uma ínput do táip i-mêil, obrigatória. Em seguida, a mensagem: lêibol com fór igual a mensagem e uma téxt érria. E, por fim, o bâton do táip sâbmit, com o texto enviar. Fecha a fórm. Repara que cada par de rótulo e campo está dentro de um parágrafo. Isso não é obrigatório, mas coloca cada par numa linha, e o formulário fica fácil de ler. E repara também na indentação da aula cinco, cada nível um pouquinho mais para dentro. Agora, faz o teste: clica em cada rótulo e veja o cursor pular para o campo certo." },
  { n: 11, title: "Os erros mais comuns e o próximo degrau", fala: "Antes de terminar, os erros que mais aparecem com formulários. O primeiro: lêibol sem o fór. O texto aparece, mas não está ligado a nada. O segundo: o fór e o ái di com valores diferentes, tipo email com hífen num e sem hífen no outro, ou com letra maiúscula só de um lado. Precisa ser igual, letra por letra. O terceiro: fechar a ínput, como se ela fosse uma téxt érria. A ínput não tem fechamento. E o quarto: usar o plêis rôlder no lugar da lêibol. Agora, vamos recapitular. A fórm é a caixa. A ínput cria campos de uma linha, com táip téxt ou i-mêil. A téxt érria é para textos longos. A lêibol é o rótulo, ligado pelo fór e pelo ái di. E o bâton do táip sâbmit envia. Os exercícios estão logo abaixo do vídeo. Na próxima aula, a gente organiza a página inteira em regiões com significado, usando as tags semânticas. Até lá, e bora destravar." },
]

// Na Fala, as tags e os atributos são ditos do jeito que se fala para a voz não tropeçar; nas legendas,
// aparece o nome real. A ordem importa: os trechos mais longos vêm antes ("téxt érria" antes de "téxt",
// "fórm" antes de "fór").
export const CAPTION_FIX = [
  ["plêis rôlder", "placeholder"],
  ["téxt érria", "textarea"],
  ["téxt", "text"],
  ["fórm", "form"],
  ["fór", "for"],
  ["ínput", "input"],
  ["lêibol", "label"],
  ["bâton", "button"],
  ["táip", "type"],
  ["i-mêil", "email"],
  ["sâbmit", "submit"],
  ["nêim", "name"],
  ["ái di", "id"],
  ["riquáiârd", "required"],
  ["éction", "action"],
  ["têibol", "table"],
  ["tê agá", "th"],
  ["quépchon", "caption"],
]

// Configuração de cena por bloco.
export const SCENE_CONFIG = {
  1: { scene: "abertura", levels: ["Primeiro Commit", "Nível 2", "Nível 3", "Nível 4", "Nível 5"] },
  2: { scene: "oQueE" },
  3: { scene: "formInput" },
  4: { scene: "label" },
  5: { scene: "porQue" },
  6: { scene: "placeholder" },
  7: { scene: "email" },
  8: { scene: "textarea" },
  9: { scene: "button" },
  10: { scene: "paginaAna" },
  11: { scene: "erros" },
}

export const BLOCKS = BLOCK_TEXTS.map((b) => ({ ...b, ...SCENE_CONFIG[b.n], captionFix: CAPTION_FIX }))
