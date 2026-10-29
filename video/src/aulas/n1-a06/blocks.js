// Dados da Aula 6 — Tabelas (extraídos do roteiro.md; Fala verbatim)
export const BLOCK_TEXTS = [
  { n: 1, title: "Abertura", fala: "Olá, que bom te ver de novo. Na aula passada, a página da Ana ganhou listas: a lista de compras com marcadores, a receita do bolo de caneca numerada, e até uma lista dentro da outra. Hoje, a gente vai um passo além. Tem informação que não cabe numa lista, porque ela tem linhas e colunas. Pensa num boletim da escola, numa tabela de preços ou no horário das aulas da semana. Em HTML, isso é uma tabela. Você vai aprender a montar uma tabela do zero, a marcar os cabeçalhos, a dar um título para ela e a organizar as partes. E, no fim, a Ana vai colocar o horário de estudos dela na página. Abre o editor e bora destravar." },
  { n: 2, title: "Quando usar uma tabela", fala: "Antes do código, uma pergunta importante: quando usar uma tabela? A resposta é: quando os dados fazem sentido em linhas e colunas. Um bom teste é ler a tabela cruzando as duas coisas. Na linha de segunda-feira, na coluna do assunto, está escrito HTML. Se esse cruzamento faz sentido, é uma tabela. E se os itens só vêm um depois do outro, sem colunas, como a lista de compras, aí é uma lista mesmo. Agora, o uso errado. Há muitos anos, antes do CSS ficar poderoso, muita gente usava tabela para montar o visual da página: o menu numa célula, o texto em outra. Isso é usar tabela para layout, e hoje é considerado um erro. O leitor de tela anuncia uma tabela que não existe, e a página fica difícil de mudar. Tabela é para dados. O visual fica com o CSS." },
  { n: 3, title: "A estrutura básica: table, tr e td", fala: "Agora sim, o código. Toda tabela começa com a tag têibol, que é a caixa da tabela inteira. Dentro dela, a tabela é montada linha por linha. Cada linha é uma tê erre, de table row, linha da tabela. E dentro de cada linha vão as células, uma tê dê para cada uma. Tê dê vem de table data, dado da tabela. Vamos fazer uma tabela bem pequena. Abre a têibol. Abre uma tê erre. Dentro dela, uma tê dê com segunda, e outra tê dê com HTML. Fecha a tê erre. Outra linha: tê erre, tê dê com terça, tê dê com CSS, fecha a tê erre. E fecha a têibol. Repara: não existe tag de coluna. As colunas aparecem sozinhas, pela posição das células." },
  { n: 4, title: "Cabeçalhos com th", fala: "A tabela funciona, mas falta dizer o que cada coluna significa. Para isso existe a tê agá, de table header, cabeçalho da tabela. Ela é uma célula, igual à tê dê, só que é um título. Fica assim: antes das linhas de dados, a Ana cria uma tê erre nova. Dentro dela, uma tê agá com dia, e outra tê agá com assunto. No navegador, os cabeçalhos aparecem em negrito e centralizados. Mas, como sempre, o importante não é a aparência. A tê agá avisa para o navegador e para o leitor de tela: isto aqui é o nome da coluna. E dá para usar a tê agá também no começo de cada linha, quando a primeira célula é o título daquela linha." },
  { n: 5, title: "Um título para a tabela: caption", fala: "Toda tabela merece um título. E não um título solto em cima dela, mas um que pertence à tabela. É a tag quépchon, que quer dizer legenda. Lembra da legenda da imagem, na aula quatro? A ideia é parecida. A quépchon vai logo depois de abrir a têibol, antes de qualquer linha. Essa posição é obrigatória: ela é a primeira coisa dentro da tabela. A Ana escreve: horário de estudos da semana. No navegador, o texto aparece centralizado, em cima da tabela. E tem uma vantagem: quando alguém com leitor de tela chega na tabela, ouve primeiro o nome dela. Assim, a pessoa decide se quer ler aquela tabela inteira ou pular para a próxima parte da página." },
  { n: 6, title: "As partes da tabela: thead e tbody", fala: "Numa tabela maior, vale separar as partes. A linha de cabeçalhos vai dentro da tê réd, de table head, a cabeça da tabela. E as linhas de dados vão dentro da tê bódi, de table body, o corpo da tabela. A ordem fica assim: abre a têibol, vem a quépchon, depois a tê réd com a linha dos títulos, e por fim a tê bódi com todas as linhas de dados. No navegador, quase nada muda. Mas o código fica mais organizado, e mais tarde o CSS consegue estilizar a cabeça e o corpo separadamente. Um detalhe curioso: se você não escrever a tê bódi, o navegador cria uma sozinho, por baixo dos panos. Ele faz questão de que toda tabela tenha um corpo." },
  { n: 7, title: "O horário de estudos da Ana", fala: "Agora, vamos montar a tabela completa na página da Ana. Ela quer mostrar o horário de estudos da semana, com três colunas: dia, horário e assunto. Na tê réd, uma linha com três tê agá: dia, horário e assunto. Na tê bódi, uma linha para cada dia. Segunda, das sete às oito da noite, HTML. Quarta, no mesmo horário, CSS. E sábado, das nove às onze da manhã, projeto da página pessoal. Repara que cada linha tem exatamente três células, uma para cada coluna. Se uma linha ficar com menos, a tabela fica torta. E a ordem das células também importa: a primeira tê dê de cada linha cai na coluna dia, a segunda na coluna horário, e a terceira na coluna assunto. Se você trocar a ordem numa linha, o sábado vai parar na coluna do horário. E, para o código ficar fácil de ler, use a indentação da aula passada: cada nível um pouquinho mais para dentro." },
  { n: 8, title: "Tabela acessível", fala: "Vamos falar de quem não enxerga a tela. Uma pessoa com leitor de tela não vê a grade. Ela vai ouvindo célula por célula. Se a tabela só tem tê dê, ela escuta: segunda, dezenove às vinte, HTML. E fica se perguntando o que é cada coisa. Dezenove às vinte é um horário? Uma nota? Um preço? Numa tabela grande, com dez linhas e cinco colunas, isso vira uma confusão. Com a tê agá, o leitor de tela junta o cabeçalho com a célula: dia, segunda. Horário, dezenove às vinte. Assunto, HTML. Faz toda a diferença. E a quépchon dá o nome da tabela logo de cara. Então, duas regras simples para guardar: toda tabela de dados tem cabeçalhos com tê agá, e toda tabela tem uma quépchon dizendo do que ela trata." },
  { n: 9, title: "Os erros mais comuns", fala: "Agora, os erros que mais aparecem com tabelas. O primeiro: a tê dê solta, direto dentro da têibol, sem uma tê erre em volta. Toda célula mora dentro de uma linha. O segundo: esquecer a tê agá e escrever os títulos das colunas como tê dê, às vezes com um strong para parecer cabeçalho. Fica com cara de título, mas o leitor de tela não sabe disso. O terceiro: linhas com quantidades diferentes de células, e a tabela fica torta. Antes de terminar, conte as células de cada linha: todas precisam ter o mesmo número. E o quarto, que a gente já viu: usar tabela para montar o layout da página. Se o conteúdo não é dado em linhas e colunas, não é tabela." },
  { n: 10, title: "Resumo e próximo degrau", fala: "Vamos recapitular. Tabela é para dados em linhas e colunas, nunca para montar o visual da página. A têibol é a caixa. Cada linha é uma tê erre, e cada célula é uma tê dê. Os cabeçalhos usam a tê agá. A quépchon dá o título, logo depois de abrir a têibol. E a tê réd e a tê bódi separam a cabeça e o corpo. Agora é a sua vez: os exercícios estão logo abaixo do vídeo. Na próxima aula, a página da Ana deixa de só mostrar coisas e começa a ouvir quem visita. Chegam os formulários, para criar um formulário de contato. Até lá, e bora destravar." },
]

// Na Fala, as tags são ditas do jeito que se fala para a voz não tropeçar; nas legendas, aparece o nome real.
export const CAPTION_FIX = [
  ["têibol", "table"],
  ["tê erre", "tr"],
  ["Tê dê", "td"],
  ["tê dê", "td"],
  ["tê agá", "th"],
  ["quépchon", "caption"],
  ["tê réd", "thead"],
  ["tê bódi", "tbody"],
  ["u éle", "ul"],
  ["éle í", "li"],
]

// Configuração de cena por bloco.
export const SCENE_CONFIG = {
  1: { scene: "abertura", levels: ["Primeiro Commit", "Nível 2", "Nível 3", "Nível 4", "Nível 5"] },
  2: { scene: "quandoUsar" },
  3: { scene: "estrutura" },
  4: { scene: "th" },
  5: { scene: "caption" },
  6: { scene: "partes" },
  7: { scene: "paginaAna" },
  8: { scene: "acessivel" },
  9: { scene: "erros" },
  10: { scene: "resumo" },
}

export const BLOCKS = BLOCK_TEXTS.map((b) => ({ ...b, ...SCENE_CONFIG[b.n], captionFix: CAPTION_FIX }))
