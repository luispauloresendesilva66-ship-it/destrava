// Dados da Aula 9 — Projeto final: seu primeiro site pessoal (extraídos do roteiro.md; Fala verbatim)
export const BLOCK_TEXTS = [
  { n: 1, title: "Abertura", fala: "Oi, que bom te ver por aqui. Chegou o dia. Esta é a última aula do nível Primeiro Commit, e ela é diferente das outras. Hoje não tem tag nova. Hoje, você vai juntar tudo o que aprendeu e construir uma página pessoal inteira, do zero, com a sua cara. A gente vai fazer junto, passo a passo, usando a página da Ana como guia. Primeiro, você vai planejar a página no papel. Depois, vai escrever o código, região por região. Em seguida, vai revisar tudo com uma checklist, para não deixar nenhum detalhe para trás. E, no fim, vai salvar a primeira versão do seu site. Ah, e tem mais: eu vou te contar como funciona a prova do nível e o certificado. Então, pega um papel, abre o editor e bora destravar." },
  { n: 2, title: "O que você aprendeu neste nível", fala: "Antes de começar, olha só o caminho que você fez. Na aula um, você descobriu o que é HTML e escreveu a estrutura básica de uma página. Na dois, vieram os títulos, os parágrafos e o strong, para destacar o que é importante. Na três, os links, com a tag é e o href. Na quatro, as imagens, com o src e o texto alternativo. Na cinco, as listas. Na seis, as tabelas. Na sete, o formulário de contato. E, na oito, as tags semânticas, que organizam a página em regiões com significado. São oito aulas, e cada uma virou uma peça de quebra-cabeça. Hoje, a gente encaixa todas elas. E repara: quase tudo o que vem a seguir você já viu. Se alguma parte parecer nova, volta na aula daquele assunto. Ela continua lá, esperando por você." },
  { n: 3, title: "Planejar antes de escrever", fala: "Todo site bom começa antes do código, com um rascunho. Pega uma folha e desenha um retângulo, que é a sua página. Lá em cima, uma faixa para o topo: o seu nome e o menu. No meio, um espaço grande para o conteúdo principal. E embaixo, uma faixa fininha para o rodapé. Agora, divide o meio em partes. A Ana escolheu quatro: sobre mim, meus projetos, minha rotina e fale comigo. Ao lado de cada parte, anota o que vai dentro. Sobre mim tem um texto e uma foto. Meus projetos, uma lista de links. Minha rotina, uma tabela. E fale comigo, um formulário. Pronto. Esse desenho simples já é a planta da casa. E repara que cada caixa do desenho já tem uma tag esperando por ela: rédêr, név, mêin, sécchon e fúter." },
  { n: 4, title: "O esqueleto da página", fala: "Agora, o editor. Cria um arquivo novo chamado index ponto html, numa pasta só para o seu site. A primeira linha é o DOCTYPE, que avisa o navegador que é um documento HTML moderno. Depois, a tag html, com lang igual a pt-BR, porque a página está em português. Dentro dela, o head e o body. No head vão as informações que não aparecem no meio da página. Primeiro, a meta charset igual a UTF-8, para os acentos aparecerem certinho. Depois, o title, que é o texto da aba do navegador. A Ana escreve: Ana Souza, página pessoal. E você escreve o seu nome. Repara que esse começo é sempre igual, em toda página que você fizer. É o esqueleto. Daqui para frente, tudo o que a gente escrever vai dentro do body, que é o que a pessoa vê na tela." },
  { n: 5, title: "O topo e o menu", fala: "Dentro do body, a primeira região é o topo: a rédêr. Nela vai o agá um, o título mais importante da página. A Ana escreve: olá, eu sou a Ana. Logo abaixo, o menu, dentro de uma név. E, como você viu na aula passada, o menu é uma lista: uma u éle, com uma éle í para cada item, e um link, a tag é, dentro de cada éle í. São quatro links, um para cada seção do rascunho. No href, vai a cerquilha seguida do ái di da seção: cerquilha sobre, cerquilha projetos, cerquilha rotina e cerquilha contato. Esses ái dis ainda não existem, a gente cria daqui a pouco. E o texto de cada link diz para onde ele leva: sobre mim, meus projetos, minha rotina e fale comigo. Nada de clique aqui." },
  { n: 6, title: "Sobre mim: texto e foto", fala: "Depois do topo, abre a mêin, que guarda o conteúdo principal. Só uma por página, lembra? Dentro dela, a primeira sécchon, com ái di igual a sobre. É esse ái di que faz o primeiro link do menu funcionar. Toda sécchon tem um título, então vem um agá dois: sobre mim. Depois, um parágrafo contando quem você é. A Ana escreve que trabalha no atendimento de uma loja e está fazendo a transição para a tecnologia. E que está aprendendo HTML, com a palavra HTML dentro de um strong, porque é importante. Por fim, a foto, com a tag img. No src, o caminho da imagem: imagens, barra, foto traço ana ponto jota pê gê. E no alt, um texto que descreve a foto para quem não consegue ver: Ana sorrindo, com um caderno de anotações na mão." },
  { n: 7, title: "Meus projetos: uma lista de links", fala: "A segunda sécchon é meus projetos, com ái di igual a projetos e o seu agá dois. Aqui, a Ana junta duas coisas que já sabe: uma lista e links. Ela cria uma u éle, e cada éle í guarda um link para um projeto. O primeiro leva para a página de projetos do próprio site, que fica na pasta paginas. Então, o href é um caminho relativo: paginas, barra, projetos ponto html. O segundo leva para um site de fora, as receitas favoritas dela. Esse usa o caminho absoluto, começando com agá tê tê pê esse. E, como é um site externo, consultado de passagem, a Ana coloca o target underline blank, para abrir numa aba nova, junto com o rel noopener, por segurança. Mas lembra da regra da aula três: com moderação. Os links do seu próprio site abrem na mesma aba." },
  { n: 8, title: "Minha rotina: uma tabela", fala: "A terceira sécchon é minha rotina, com ái di igual a rotina. Aqui, os dados têm linhas e colunas, então é trabalho para a têibol. Logo depois de abrir a têibol, vem a quépchon, o título da tabela: horário de estudos da semana. Depois, a tê réd, com a linha de cabeçalho. Uma tê erre, e dentro dela duas tê agá: dia e assunto. Em seguida, a tê bódi, com as linhas de dados. Cada linha é uma tê erre, e cada célula é uma tê dê. Segunda, HTML. Terça, CSS. Quarta, revisão. Repara que todas as linhas têm o mesmo número de células: duas. Se uma linha tiver uma célula a mais ou a menos, a tabela fica torta. E, se você não tiver uma rotina de estudos, tudo bem: coloca o que fizer sentido para você, como os seus horários livres." },
  { n: 9, title: "Fale comigo: o formulário", fala: "A última sécchon é fale comigo, com ái di igual a contato. Dentro dela, o formulário, que começa com a tag fórm. O primeiro campo é o nome. Vem uma lêibol com fór igual a nome, e o texto nome. Depois, uma ínput com táip igual a téxt, ái di igual a nome e nêim igual a nome. O fór da lêibol e o ái di do campo têm o mesmo valor, e é isso que liga um ao outro. O segundo campo é o e-mail: a mesma ideia, mas com táip igual a i-mêil. O terceiro é a mensagem, com uma téxt érria, que é a caixa grande, de várias linhas. Diferente da ínput, a téxt érria tem tag de fechamento. Por fim, o bâton, com o texto enviar. E lembra: por enquanto, o formulário fica pronto na tela, mas ainda não envia para lugar nenhum." },
  { n: 10, title: "O rodapé e a página com a sua cara", fala: "Para fechar, depois da mêin, vem a fúter, o rodapé. A Ana coloca um parágrafo com o nome dela e um link de e-mail, usando o mailto: href igual a mailto, dois pontos, ana arroba example ponto com. Agora, olha a prévia. A página está inteira: topo, menu, quatro seções e rodapé. Clica nos links do menu e veja cada um levar para a sua seção. E agora vem a parte mais importante desta aula. Essa página é da Ana, mas o projeto é seu. Troca o nome pelo seu. Escreve a sua história no sobre mim. Coloca a sua foto ou uma ilustração, sempre com um alt que descreva a imagem. Lista o que você já fez, mesmo que sejam os exercícios deste curso. Monta a sua rotina. Não precisa ficar perfeito. Precisa ficar seu." },
  { n: 11, title: "A checklist de revisão", fala: "Página pronta? Então, hora de revisar. Quem trabalha com desenvolvimento revisa o próprio código antes de mostrar para alguém, e você vai fazer o mesmo. Passa item por item. Um: a página tem um agá um só? O título principal é um só, e as seções usam agá dois. Dois: toda imagem tem alt, descrevendo o que ela mostra? Três: toda lêibol tem o fór igual ao ái di do seu campo? Clica no texto de cada rótulo e veja se o campo certo fica selecionado. Quatro: toda tag que abriu, fechou? Lembrando que a img e a ínput não fecham. Cinco: a indentação está em ordem, com cada região um nível para dentro? E seis: abre o arquivo no navegador e testa tudo. Clica em cada link do menu, confere os acentos e olha se nada sumiu. Marcou os seis? Parabéns, a página passou na revisão." },
  { n: 12, title: "Salvar a primeira versão", fala: "Revisou? Agora, salva. Parece óbvio, mas muita gente perde trabalho por esquecer. Salva o arquivo no editor, e confere se a pasta do site tem tudo: o index ponto html, a pasta imagens, com a sua foto, e a pasta paginas, se você criou outras páginas. Depois, faz uma cópia da pasta inteira e dá um nome que diga que é a primeira versão, como meu site, versão um. Assim, se amanhã você mexer em alguma coisa e algo quebrar, a versão que funcionava está guardada. Essa é a ideia por trás do nome deste nível: o primeiro commit é o primeiro registro de um trabalho que funciona. E, num próximo nível, você vai aprender a guardar versões de verdade, com Git, que é a ferramenta que as equipes usam para isso no dia a dia." },
  { n: 13, title: "A prova do nível e o certificado", fala: "Agora, falta um passo para fechar o nível: a prova. Quando você quiser fazer, vai no mapa de níveis e clica em fazer a prova. Antes de começar, o app pede o seu nome completo. Capricha, porque esse nome vai no certificado e não dá para mudar depois. A prova sorteia perguntas sobre tudo o que você viu nas nove aulas, e sempre tem pelo menos uma pergunta de código, em que você escreve HTML de verdade. Para passar, é preciso acertar pelo menos noventa por cento. Parece muito, mas é de propósito: aqui, você só avança quando mostra que aprendeu de verdade. Se não der dessa vez, sem problema. O app mostra os assuntos para revisar, e você pode tentar de novo. E, quando passar, conquista o certificado do nível, com um QR Code que qualquer pessoa pode usar para conferir que ele é verdadeiro." },
  { n: 14, title: "Seu primeiro site e o próximo degrau", fala: "Para, respira e olha o que você fez. Algumas aulas atrás, você talvez nem soubesse o que era uma tag. Hoje, você planejou, construiu, revisou e salvou um site pessoal inteiro, com links, imagens, listas, tabela, formulário e uma estrutura organizada. Esse é o seu primeiro site. E ele é só o começo. Os exercícios desta aula estão logo abaixo do vídeo, e o último deles é um mini projeto final, para você montar uma página com topo, menu, conteúdo e rodapé. Depois, é a prova. E, no próximo nível, a sua página vai ganhar aparência, com o CSS: cores, fontes, espaços e tudo o que deixa um site bonito. Lembra da casa? A estrutura está de pé. Agora vem o acabamento. Parabéns por chegar até aqui. Até o próximo nível, e bora destravar." },
]

// Na Fala, as tags, os atributos e os caminhos são ditos do jeito que se fala para a voz não tropeçar;
// nas legendas, aparece o nome real. A ordem importa: os trechos mais longos vêm antes. O "é" (tag a) só
// é trocado nas duas frases exatas em que é a tag — em qualquer outro lugar, "é" é o verbo ser. O "fór"
// (atributo for) também só nas frases exatas, para não pegar outras palavras.
export const CAPTION_FIX = [
  ["imagens, barra, foto traço ana ponto jota pê gê", "imagens/foto-ana.jpg"],
  ["paginas, barra, projetos ponto html", "paginas/projetos.html"],
  ["mailto, dois pontos, ana arroba example ponto com", "mailto:ana@example.com"],
  ["agá tê tê pê esse", "https"],
  ["underline blank", "_blank"],
  ["index ponto html", "index.html"],
  ["meu site, versão um", "meu-site-v1"],
  ["a tag é e o href", "a tag a e o href"],
  ["a tag é, dentro", "a tag a, dentro"],
  ["cê ésse ésse", "CSS"],
  ["téxt érria", "textarea"],
  ["lêibol com fór igual", "label com for igual"],
  ["O fór da lêibol", "O for da label"],
  ["tem o fór igual", "tem o for igual"],
  ["táip igual a téxt,", "type igual a text,"],
  ["agá dois", "h2"],
  ["agá um", "h1"],
  ["u éle", "ul"],
  ["éle í", "li"],
  ["ái dis", "ids"],
  ["ái di", "id"],
  ["têibol", "table"],
  ["tê erre", "tr"],
  ["tê dê", "td"],
  ["tê agá", "th"],
  ["quépchon", "caption"],
  ["tê réd", "thead"],
  ["tê bódi", "tbody"],
  ["fórm", "form"],
  ["ínput", "input"],
  ["lêibol", "label"],
  ["bâton", "button"],
  ["táip", "type"],
  ["i-mêil", "email"],
  ["nêim", "name"],
  ["rédêr", "header"],
  ["név", "nav"],
  ["mêin", "main"],
  ["sécchon", "section"],
  ["fúter", "footer"],
]

// Configuração de cena por bloco.
export const SCENE_CONFIG = {
  1: { scene: "abertura", levels: ["Primeiro Commit", "Nível 2", "Nível 3", "Nível 4", "Nível 5"] },
  2: { scene: "recap" },
  3: { scene: "rascunho" },
  4: { scene: "esqueleto" },
  5: { scene: "topo" },
  6: { scene: "sobre" },
  7: { scene: "projetos" },
  8: { scene: "rotina" },
  9: { scene: "contato" },
  10: { scene: "rodape" },
  11: { scene: "checklist" },
  12: { scene: "salvar" },
  13: { scene: "prova" },
  14: { scene: "final", levels: ["Primeiro Commit", "Nível 2", "Nível 3", "Nível 4", "Nível 5"] },
}

export const BLOCKS = BLOCK_TEXTS.map((b) => ({ ...b, ...SCENE_CONFIG[b.n], captionFix: CAPTION_FIX }))
