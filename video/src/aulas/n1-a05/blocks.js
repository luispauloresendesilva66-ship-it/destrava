// Dados da Aula 5 — Listas (extraídos do roteiro.md; Fala verbatim)
export const BLOCK_TEXTS = [
  { n: 1, title: "Abertura", fala: "Olá, que bom te ver de novo. Na aula passada, a página da Ana ganhou imagens: a foto de perfil, com um alt bem escrito e o tamanho na proporção certa, e a miniatura do projeto de receitas, com legenda e tudo. Hoje, a gente vai organizar as coisas. Pensa em quantas listas você vê num dia só: a lista de compras, o passo a passo de uma receita, o menu de um site. Em HTML, as listas têm tags próprias. Você vai aprender a fazer listas com marcadores e listas numeradas, a escolher entre uma e outra, e a colocar uma lista dentro de outra. Abre o editor e bora destravar." },
  { n: 2, title: "Por que não só uma linha embaixo da outra", fala: "Primeiro, por que não escrever os itens um embaixo do outro, cada um na sua linha? Lembra que o navegador ignora as quebras de linha do código? Se você digitar arroz, feijão e café em três linhas, eles aparecem grudados, numa linha só. Dava para resolver com o br, mas aí o navegador não sabe que aquilo é uma lista. Ele vê só um texto picado. E quem usa leitor de tela perde uma informação importante. Com as tags de lista, o leitor de tela avisa: lista, três itens. A pessoa já sabe o tamanho da lista antes de começar a ouvir. Mais uma vez, o HTML não é sobre aparência. É sobre dizer o que cada coisa é." },
  { n: 3, title: "Lista com marcadores: ul e li", fala: "A lista mais comum é a lista com marcadores, aquelas bolinhas na frente de cada item. A tag é a u éle, de unordered list, que quer dizer lista não ordenada. Ela é a caixa que guarda a lista inteira. E cada item vai dentro de uma tag éle í, de list item, item da lista. Vamos fazer a lista de compras da Ana. Abre a u éle. Dentro dela, uma éle í com arroz, e fecha a éle í. Outra éle í com feijão. E mais uma com café. Por fim, fecha a u éle. No navegador, aparecem três itens, cada um na sua linha, com uma bolinha na frente. E as bolinhas, o navegador coloca sozinho." },
  { n: 4, title: "Lista numerada: ol", fala: "Agora, uma receita. No passo a passo, a ordem importa: não dá para assar o bolo antes de misturar a massa. Para isso existe a ó éle, de ordered list, lista ordenada. A diferença é só a caixa: os itens continuam sendo éle í. A Ana escreve a receita de um bolo de caneca. Abre a ó éle. Primeiro item: misture os ingredientes na caneca. Segundo: leve ao micro-ondas por três minutos. Terceiro: espere esfriar e sirva. Fecha a ó éle. No navegador, cada passo aparece com um número na frente: um, dois, três. E o melhor: você não escreve os números. Se a Ana colocar um passo novo no meio, a numeração se ajusta sozinha." },
  { n: 5, title: "Quando usar cada uma", fala: "E como saber qual usar? Faça uma pergunta: se eu trocar os itens de lugar, muda alguma coisa? Na lista de compras, tanto faz pegar o café antes ou depois do arroz. A ordem não importa, então é u éle. Na receita, trocar os passos estraga o bolo. A ordem importa, então é ó éle. Outros exemplos: os seus hobbies, as linguagens que você quer aprender, os itens de uma mala. Tudo isso é u éle. Um ranking dos seus filmes favoritos, as instruções para instalar um programa, os passos de um tutorial. Tudo isso é ó éle. Repara que a escolha não é pela aparência, bolinha ou número. É pelo significado." },
  { n: 6, title: "Uma lista dentro da outra", fala: "Às vezes, um item tem os seus próprios itens. Na lista de compras, a Ana quer separar as frutas: banana, maçã e laranja. Para isso, você coloca uma lista dentro de outra. O detalhe que mais confunde é onde a lista de dentro entra. Ela vai dentro de uma éle í, e não solta dentro da u éle. Então fica assim: a éle í começa com a palavra frutas. Logo depois, ainda dentro dela, abre uma nova u éle, com três éle í: banana, maçã e laranja. Fecha essa u éle, e só então fecha a éle í de frutas. No navegador, as frutas aparecem mais para dentro, com outro marcador. E dá para misturar: uma ó éle dentro de uma u éle, por exemplo." },
  { n: 7, title: "Listas na página da Ana", fala: "Agora, vamos levar isso para a página da Ana. Lembra da seção O que estou aprendendo? Até agora, era um parágrafo. Ela vira uma u éle com três itens: HTML, CSS e JavaScript. E dá para ir além: dentro de uma éle í pode ir quase tudo que você já aprendeu. Um strong, para destacar, ou um link. Na página de projetos, a Ana cria a lista dos projetos dela, e cada item tem um link. O primeiro leva para o site de receitas. Lembra que o texto do link precisa dizer para onde ele leva? Continua valendo. E, para o código ficar fácil de ler, deixe cada éle í um pouquinho mais para dentro, com espaços na frente. É a indentação." },
  { n: 8, title: "Os erros mais comuns", fala: "Agora, os erros que mais aparecem com listas. O primeiro: a éle í solta, fora de uma u éle ou de uma ó éle. O navegador até mostra alguma coisa, mas o item fica sem lista, e o leitor de tela não entende. Toda éle í mora dentro de uma lista. O segundo é o contrário: texto ou outra tag direto dentro da u éle, sem éle í. Dentro da caixa da lista, só entram itens. O terceiro: esquecer de fechar. Sem o fechamento da u éle, o resto da página pode acabar dentro da lista, todo deslocado. E, nas listas aninhadas, fechar na ordem errada. A regra é a de sempre: o que abriu por último fecha primeiro." },
  { n: 9, title: "As listas escondidas na web", fala: "Uma curiosidade: as listas estão em muito mais lugares do que parece. Sabe o menu de um site, com os links Início, Projetos e Contato? Muitas vezes, por baixo, é uma u éle com uma éle í para cada link. Só que o CSS tira as bolinhas e coloca os itens lado a lado. Você vai aprender a fazer isso nos próximos níveis. Por enquanto, guarde a ideia: o HTML diz que é uma lista, e o visual vem depois." },
  { n: 10, title: "Resumo e próximo degrau", fala: "Vamos recapitular. A u éle é a lista não ordenada, com marcadores, para quando a ordem não importa. A ó éle é a lista ordenada, numerada, para quando a ordem importa. Nas duas, cada item é uma éle í, e toda éle í mora dentro de uma lista. Para colocar uma lista dentro de outra, ela entra dentro de uma éle í. E feche tudo, na ordem certa. Agora é a sua vez: os exercícios estão logo abaixo do vídeo. Na próxima aula, chegam as tabelas, para mostrar dados em linhas e colunas. Até lá, e bora destravar." },
]

// Na Fala, as tags são ditas letra por letra para a voz não tropeçar; nas legendas, aparece o nome real.
export const CAPTION_FIX = [
  ["u éle", "ul"],
  ["ó éle", "ol"],
  ["éle í", "li"],
]

// Configuração de cena por bloco.
export const SCENE_CONFIG = {
  1: { scene: "abertura", levels: ["Primeiro Commit", "Nível 2", "Nível 3", "Nível 4", "Nível 5"] },
  2: { scene: "porQueLista" },
  3: { scene: "ul" },
  4: { scene: "ol" },
  5: { scene: "quandoUsar" },
  6: { scene: "aninhada" },
  7: { scene: "paginaAna" },
  8: { scene: "erros" },
  9: { scene: "menu" },
  10: { scene: "resumo" },
}

export const BLOCKS = BLOCK_TEXTS.map((b) => ({ ...b, ...SCENE_CONFIG[b.n], captionFix: CAPTION_FIX }))
