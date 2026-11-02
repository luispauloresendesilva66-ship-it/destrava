// Dados da Aula 8 — Tags semânticas (extraídos do roteiro.md; Fala verbatim)
export const BLOCK_TEXTS = [
  { n: 1, title: "Abertura", fala: "Oi, que bom te ver por aqui de novo. Na aula passada, a página da Ana aprendeu a ouvir quem visita: ganhou um formulário de contato, com cada lêibol ligada ao seu campo e um botão de enviar. A página já tem bastante coisa. Tem título, parágrafos, links, imagens, listas, uma tabela e um formulário. Só que, olhando o código, tudo está jogado em sequência, como uma pilha de papéis soltos em cima da mesa. Hoje, a gente vai arrumar essa mesa. Você vai aprender a dividir a página em regiões com significado: o topo, o menu, o conteúdo principal, as seções e o rodapé. Por fora, quase nada muda. Mas, por dentro, a página fica muito mais fácil de entender, tanto para as pessoas quanto para as máquinas. Abre o editor e bora destravar." },
  { n: 2, title: "O problema da sopa de dív", fala: "Antes das tags novas, vamos entender o problema. Durante muito tempo, quem fazia sites usava uma tag só para dividir a página: a dív. Ela é uma caixa genérica, que agrupa outras tags, mas não diz nada sobre o que tem dentro. Uma dív para o topo, uma dív para o menu, uma dív para o texto, uma dív para o rodapé. E dív dentro de dív, dentro de dív. Esse código ganhou até apelido: sopa de dív. O navegador mostra tudo direitinho, mas, para quem lê o código, é tudo igual. Você precisa caçar pistas para descobrir onde começa o menu e onde termina o conteúdo. E não é só você. O leitor de tela e os buscadores também ficam sem saber o que é cada parte. A solução são as tags semânticas, que são caixas com nome e com significado." },
  { n: 3, title: "O topo da página: rédêr", fala: "A primeira tag semântica é a rédêr, que quer dizer cabeçalho. Ela guarda o topo da página: aquela parte que apresenta o site e costuma ficar lá em cima. Normalmente, é ali que fica o título principal, o agá um, às vezes uma imagem ou um logo, e uma frase curta de apresentação. No caso da Ana, a rédêr guarda o agá um, olá, eu sou a Ana, e a foto de perfil dela, da aula quatro. Repara numa coisa importante: a rédêr não é a mesma coisa que a tag head, lá do começo do arquivo. A head guarda informações invisíveis, como o título da aba. Já a rédêr fica dentro do body e aparece na tela. Os nomes parecem, mas os trabalhos são bem diferentes. Na dúvida, lembre: rédêr é o topo que a pessoa vê." },
  { n: 4, title: "O menu: név", fala: "Logo abaixo do topo, a Ana tem aqueles links que levam para cada parte da página, lembra? Da aula três, com a cerquilha e o ái di. Esse conjunto de links é um menu, e o menu tem uma tag própria: a név, de navegação. A név diz: aqui estão os caminhos principais do site. E tem um jeito muito comum de montar o menu por dentro: uma lista. Isso mesmo, a u éle da aula cinco. Cada item do menu vira uma éle í, e dentro de cada éle í vai um link, a tag é. Assim, a Ana escreve: név, dentro dela uma u éle, e dentro, três itens: quem sou eu, o que estou aprendendo e fale comigo. Faz sentido, porque um menu é exatamente isso: uma lista de lugares para onde a pessoa pode ir." },
  { n: 5, title: "O conteúdo principal: mêin", fala: "Agora vem a parte mais importante da página: o conteúdo principal. Para ele existe a tag mêin, que quer dizer principal. Dentro da mêin vai aquilo que só existe nesta página e que é o motivo de alguém visitar. No caso da Ana, é o texto sobre ela, a lista do que está aprendendo, a tabela de estudos e o formulário. O topo e o rodapé, que costumam se repetir em todas as páginas do site, ficam de fora. E aqui vai a regra de ouro da mêin: só uma por página. Faz sentido, né? Uma página não pode ter dois conteúdos principais. Se tivesse, nenhum dos dois seria principal de verdade. Então, a estrutura da Ana fica assim: primeiro a rédêr, depois a mêin, e, no final, o rodapé, que a gente vê daqui a pouco." },
  { n: 6, title: "Partes do conteúdo: sécchon e ártikol", fala: "Dentro da mêin, o conteúdo ainda pode ser dividido em partes. Para isso existem duas tags parecidas, mas com usos diferentes. A primeira é a sécchon, que quer dizer seção. Ela agrupa um assunto da página, e toda sécchon tem um título, normalmente um agá dois. A Ana cria uma sécchon para quem sou eu, outra para o que estou aprendendo e outra para fale comigo. Inclusive, o ái di que antes ficava no agá dois pode ir para a própria sécchon, e o link do menu continua funcionando. A segunda tag é a ártikol, que quer dizer artigo. Ela é para um conteúdo que faz sentido sozinho, mesmo fora da página: um post de blog, uma notícia, um comentário. O teste é simples: se você pudesse recortar aquele pedaço e colar em outro site, e ele ainda fizesse sentido, é uma ártikol." },
  { n: 7, title: "O rodapé, fúter, e quando a dív ainda serve", fala: "Para fechar a página, vem a fúter, que quer dizer rodapé. É a parte de baixo, onde costuma ficar quem fez o site, o ano, um link de contato ou para as redes. A Ana coloca na fúter um parágrafo: feito pela Ana, em dois mil e vinte e seis. Agora, uma pergunta justa: se existem tantas tags com significado, a dív morreu? Não. A dív continua útil, mas para um caso específico: quando você precisa de uma caixa só para agrupar coisas, por causa da aparência, e esse grupo não tem significado próprio. Por exemplo: daqui a alguns níveis, com o cê ésse ésse, você vai querer colocar dois cartões lado a lado. Aquela caixa que segura os dois não é um topo, nem um menu, nem uma seção. É só uma caixa. Aí sim, a dív é a escolha certa." },
  { n: 8, title: "Por que isso importa", fala: "Você pode estar pensando: se a página fica igualzinha na tela, por que tanto trabalho? Por três motivos. O primeiro: quem usa leitor de tela. Cada uma dessas tags vira um ponto de referência. Com um atalho, a pessoa pula direto para o menu, ou direto para o conteúdo principal, sem ter que ouvir a página inteira de cima a baixo. É como ter um índice da página. O segundo: os buscadores. Os programas que leem a internet para montar os resultados de busca entendem melhor o que é conteúdo de verdade e o que é só menu ou rodapé. E o terceiro motivo é você e quem trabalha com você. Daqui a seis meses, ou numa equipe, abrir um código e ver rédêr, név, mêin e fúter é como abrir um armário com gavetas etiquetadas. Você acha tudo na hora." },
  { n: 9, title: "A página da Ana, organizada", fala: "Agora, vamos ver a página da Ana inteira, já organizada. Logo depois do body, abre a rédêr, com o agá um, a foto e a név com a lista de links. Fecha a rédêr. Depois, abre a mêin. Dentro dela, uma sécchon para quem sou eu, uma para o que estou aprendendo, com a lista e a tabela, e uma para fale comigo, com o formulário. Cada sécchon com o seu agá dois e o seu ái di. Fecha a mêin. Por fim, a fúter com o parágrafo do rodapé. Repara na indentação: cada região um nível para dentro, e as seções mais um nível. Agora, faz o teste. Olha a prévia. Está quase igual a antes, e é isso mesmo. A mudança não é na aparência, é no significado. Clica nos links do menu e veja cada um levar para a sua seção." },
  { n: 10, title: "Os erros mais comuns e o próximo degrau", fala: "Antes de terminar, os erros que mais aparecem com tags semânticas. O primeiro: colocar mais de uma mêin na página. É só uma. O segundo: usar név para qualquer grupinho de links. A név é para a navegação principal, o menu. Um link solto no meio de um texto, ou no rodapé, não precisa dela. O terceiro: sécchon sem título. Se você não consegue dar um agá dois para aquele pedaço, talvez ele não seja uma seção. E o quarto: trocar toda dív por uma tag semântica sem pensar. A ideia não é sumir com a dív, é escolher a tag pelo significado. Recapitulando: rédêr é o topo, név é o menu, mêin é o conteúdo principal, sécchon é um assunto com título, ártikol é um conteúdo que vive sozinho, fúter é o rodapé, e a dív é a caixa sem significado. Os exercícios estão logo abaixo do vídeo. Na próxima aula, o projeto final: você vai juntar tudo e construir o seu primeiro site pessoal. Até lá, e bora destravar." },
]

// Na Fala, as tags são ditas do jeito que se fala para a voz não tropeçar; nas legendas, aparece o nome
// real. A ordem importa: os trechos mais longos vêm antes. O "é" (tag a) só é trocado na frase exata
// "a tag é." — em qualquer outro lugar, "é" é o verbo ser e fica como está.
export const CAPTION_FIX = [
  ["a tag é.", "a tag a."],
  ["cê ésse ésse", "CSS"],
  ["agá dois", "h2"],
  ["agá um", "h1"],
  ["u éle", "ul"],
  ["éle í", "li"],
  ["ái di", "id"],
  ["rédêr", "header"],
  ["sécchon", "section"],
  ["ártikol", "article"],
  ["fúter", "footer"],
  ["mêin", "main"],
  ["név", "nav"],
  ["dív", "div"],
  ["lêibol", "label"],
  ["fórm", "form"],
]

// Configuração de cena por bloco.
export const SCENE_CONFIG = {
  1: { scene: "abertura", levels: ["Primeiro Commit", "Nível 2", "Nível 3", "Nível 4", "Nível 5"] },
  2: { scene: "sopa" },
  3: { scene: "header" },
  4: { scene: "nav" },
  5: { scene: "main" },
  6: { scene: "section" },
  7: { scene: "footer" },
  8: { scene: "porQue" },
  9: { scene: "paginaAna" },
  10: { scene: "erros" },
}

export const BLOCKS = BLOCK_TEXTS.map((b) => ({ ...b, ...SCENE_CONFIG[b.n], captionFix: CAPTION_FIX }))
