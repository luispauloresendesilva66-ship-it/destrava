// Dados da Aula 2 do Nível 2 — Seletores: tag, classe e id (extraídos do roteiro.md; Fala verbatim)
export const BLOCK_TEXTS = [
  { n: 1, title: "Abertura", fala: "Olá, seja bem-vindo à aula dois da Primeira Demão. Na aula passada, a página da Ana ganhou as primeiras cores. Você viu que toda regra de cê ésse ésse tem um seletor, abre chaves, as declarações, e fecha chaves. E ligou o arquivo estilo ponto cê ésse ésse à página com a tag línk. Mas ficou uma pergunta no ar: e se a Ana quiser pintar só um parágrafo, e não todos? Hoje, você vai aprender a escolher exatamente quem recebe o estilo. São três tipos de seletor: por tag, por classe e por ái di. Depois, você vai juntar seletores com vírgula, mirar um elemento que está dentro de outro e entender quem vence quando duas regras brigam pelo mesmo elemento. Abre o editor e bora destravar." },
  { n: 2, title: "O seletor de tag", fala: "Começando pelo que você já conhece. Até agora, todo seletor era o nome de uma tag: agá um, body, pê. Esse é o seletor de tag. Ele é direto e poderoso, mas não escolhe: pega todos os elementos daquela tag na página. Se a Ana escreve pê, abre chaves, cálor, dois pontos, nêivi, todos os parágrafos ficam azul-marinho. O do sobre mim, o dos projetos e até o do rodapé. Para o visual geral, isso é ótimo. É assim que você define a cor do texto da página toda, o tamanho padrão da letra, o fundo. Mas a Ana tem um parágrafo especial no sobre mim: o que diz que ela está procurando o primeiro emprego na área. Ela quer que só esse chame a atenção. Com o seletor de tag, não dá. Para isso existem as classes." },
  { n: 3, title: "O seletor de classe", fala: "Uma classe é um apelido que você dá para um elemento, lá no HTML. Ela entra com o atributo cléss. No parágrafo especial da Ana, fica assim: pê, cléss igual a destaque. O nome é você que escolhe. Aqui, destaque, porque diz para que ele serve. Agora, no cê ésse ésse, para escolher esse elemento, você escreve um ponto e o nome da classe: ponto destaque. O ponto é o jeito de dizer: isto não é uma tag, é uma classe. Então a regra fica: ponto destaque, abre chaves, cálor, dois pontos, pârpou, ponto e vírgula, fecha chaves. Salva e olha a prévia: só aquele parágrafo ficou roxo. Os outros continuam azul-marinho. Repara num detalhe: no HTML, o nome vai sem o ponto. O ponto só aparece no cê ésse ésse." },
  { n: 4, title: "Uma classe, vários elementos", fala: "A grande vantagem da classe é que ela pode ser usada quantas vezes você quiser. A Ana gostou do destaque e quer usar a mesma cor num item da lista de projetos, o que ainda está em andamento. É só colocar cléss igual a destaque nessa éle í também. Pronto: a mesma regra vale para os dois, e nem precisa ser a mesma tag. Se um dia ela trocar o roxo por outra cor, muda num lugar só, e todos os destaques acompanham. E um elemento pode ter mais de uma classe ao mesmo tempo. É só separar os nomes com um espaço, dentro das mesmas aspas: cléss igual a destaque, espaço, grande. Isso quer dizer duas classes, destaque e grande, e o elemento recebe o estilo das duas regras. Guarde isso, porque vai ser importante na hora dos erros comuns." },
  { n: 5, title: "O seletor de ái di", fala: "O terceiro tipo é o seletor de ái di. Você já conhece o atributo ái di do nível um: a Ana deu um ái di para cada seção, para o menu conseguir pular direto para ela. A seção do formulário, por exemplo, tem ái di igual a contato. Lembra do link com cerquilha contato no href? No cê ésse ésse, o seletor de ái di usa exatamente o mesmo símbolo: a cerquilha e o nome. Então: cerquilha contato, abre chaves, béquigráund cálor, dois pontos, uáit, ponto e vírgula, fecha chaves. A seção de contato ganha um fundo branco e se destaca do amarelo-claro da página. A diferença principal é esta: o ái di é único. Só um elemento da página pode ter cada ái di. Por isso, a regra com cerquilha sempre mira um elemento só." },
  { n: 6, title: "Classe ou ái di?", fala: "Então, quando usar cada um? Para estilo, prefira a classe quase sempre. Ela pode ser reaproveitada, combina com outras classes e não briga tanto com as outras regras, que é o assunto de daqui a pouco. O ái di tem trabalhos mais importantes: ser o endereço de uma seção, como no menu da Ana, e ligar o lêibol ao campo do formulário, lembra? Não tem problema usar um ái di que já existe para um ajuste pontual, como o fundo do contato. Mas, se você está criando um nome só para pintar alguma coisa, crie uma classe. Uma dica para lembrar: a classe é como o uniforme de um time, que muita gente veste igual. O ái di é como o número do seu documento: cada pessoa tem o seu, e ele não se repete." },
  { n: 7, title: "Vários seletores com vírgula", fala: "Agora, um atalho. A Ana quer que o agá um e os agá dois fiquem com a mesma cor, nêivi. Ela poderia escrever duas regras iguais, uma para cada. Mas dá para juntar: agá um, vírgula, agá dois, abre chaves, cálor, dois pontos, nêivi, ponto e vírgula, fecha chaves. A vírgula quer dizer \"e\": esta regra vale para o agá um e para os agá dois. Dá para colocar quantos seletores quiser na lista, e até misturar os tipos: agá um, vírgula, agá dois, vírgula, ponto destaque. Isso evita repetir a mesma declaração em vários lugares. E, se a Ana mudar de ideia sobre a cor, troca num lugar só. Um cuidado: a vírgula entre os seletores faz toda a diferença. Sem ela, o significado muda completamente, como você vai ver agora." },
  { n: 8, title: "Um elemento dentro do outro", fala: "Lembra do menu da Ana? É uma név, com uma lista de links dentro. A Ana quer que os links do menu fiquem tomêitou, mas sem mudar os outros links da página, como os do fúter. Para isso existe o seletor de descendente: név, espaço, é. Lendo em português: todo link que está dentro de uma név. O espaço entre os dois nomes quer dizer \"dentro de\". E não precisa estar logo dentro: o link está numa éle í, que está na u éle, que está na név, e mesmo assim vale. Agora compare. Név, vírgula, é: pega a név inteira e todos os links da página. Név, espaço, é: pega só os links do menu. Uma vírgula a mais ou a menos muda tudo." },
  { n: 9, title: "Quem vence quando duas regras brigam", fala: "Agora, uma pergunta. O parágrafo especial da Ana tem duas regras falando dele: a do pê, que diz nêivi, e a do ponto destaque, que diz pârpou. E ele ficou roxo. Por quê? Aqui entra a cascata, aquela palavra do nome do cê ésse ésse. Quando duas regras brigam pela mesma propriedade, vale uma conta simples. Primeiro: a regra mais específica vence. O ái di é o mais específico, porque mira um elemento só. Depois vem a classe, e por último a tag. Então, ái di vence classe, e classe vence tag. Segundo: se as duas regras forem do mesmo tipo, como duas regras de pê, vence a que vem por último no arquivo. Essa conta tem nome, especificidade, e tem mais detalhes, que a gente vê com calma depois. Por enquanto, guarde essas duas." },
  { n: 10, title: "Nomes e erros comuns", fala: "Para dar nome às classes, três dicas. Use letras minúsculas. Se o nome tiver duas palavras, ligue com um tracinho, como foto-perfil. E evite acento e cedilha no nome: em vez de botão, com til, escreva sem o til. Agora, os erros mais comuns. O primeiro: esquecer o ponto no cê ésse ésse. Destaque, sem o ponto, procura uma tag chamada destaque, que não existe. O segundo: espaço no nome da classe. Cléss igual a foto perfil, com espaço, vira duas classes, foto e perfil. O terceiro: maiúscula e minúscula. Ponto Destaque, com dê maiúsculo, não acha a classe destaque, minúscula. Para o seletor, são nomes diferentes. O quarto: usar o mesmo ái di duas vezes na página. O menu pode pular para o lugar errado. E, como você viu na aula passada, o navegador não avisa nada." },
  { n: 11, title: "Resumo e próximo degrau", fala: "Vamos recapitular. O seletor de tag pega todos os elementos daquela tag. A classe entra no HTML com o atributo cléss e, no cê ésse ésse, com um ponto na frente. Ela pode ser usada em vários elementos, e um elemento pode ter várias classes. O ái di usa a cerquilha e é único na página. Para estilo, prefira a classe. A vírgula junta seletores numa regra só, e o espaço escolhe um elemento dentro de outro, como név, espaço, é. Quando duas regras brigam, ái di vence classe, classe vence tag, e, entre iguais, vence a última. Agora é a sua vez: os exercícios estão logo abaixo do vídeo. Na próxima aula, a Ana vai além dos nomes de cor: hexadecimal, rgb e combinações fáceis de ler. Até lá, e bora destravar." },
]

// Na Fala, os termos de CSS e as tags são escritos do jeito que se fala; na legenda, aparece o nome
// real. A ordem importa: os trechos mais longos vêm antes. As regras ditas símbolo por símbolo viram
// código na legenda. Os tokens curtos ("pê", "é", "dê", "ponto") só são trocados nas frases exatas em
// que são código — nunca sozinhos ("é" é verbo, "ponto" e "cerquilha" também são o nome do símbolo).
export const CAPTION_FIX = [
  ["cerquilha contato, abre chaves, béquigráund cálor, dois pontos, uáit, ponto e vírgula, fecha chaves", "#contato { background-color: white; }"],
  ["agá um, vírgula, agá dois, abre chaves, cálor, dois pontos, nêivi, ponto e vírgula, fecha chaves", "h1, h2 { color: navy; }"],
  ["ponto destaque, abre chaves, cálor, dois pontos, pârpou, ponto e vírgula, fecha chaves", ".destaque { color: purple; }"],
  ["agá um, vírgula, agá dois, vírgula, ponto destaque", "h1, h2, .destaque"],
  ["pê, abre chaves, cálor, dois pontos, nêivi", "p { color: navy }"],
  ["cléss igual a destaque, espaço, grande", "class=\"destaque grande\""],
  ["pê, cléss igual a destaque", "p class=\"destaque\""],
  ["cléss igual a destaque", "class=\"destaque\""],
  ["Cléss igual a foto perfil", "class=\"foto perfil\""],
  ["Ponto Destaque, com dê maiúsculo", ".Destaque, com D maiúsculo"],
  ["ponto destaque, que diz pârpou", ".destaque, que diz purple"],
  ["ponto destaque", ".destaque"],
  ["cerquilha contato no href", "#contato no href"],
  ["ái di igual a contato", "id=\"contato\""],
  ["név, espaço, é", "nav a"],
  ["Név, espaço, é", "nav a"],
  ["Név, vírgula, é", "nav, a"],
  ["estilo ponto cê ésse ésse", "estilo.css"],
  ["agá um, body, pê.", "h1, body, p."],
  ["a do pê, que diz", "a do p, que diz"],
  ["duas regras de pê", "duas regras de p"],
  ["cê ésse ésse", "CSS"],
  ["agá dois", "h2"],
  ["agá um", "h1"],
  ["ái di", "id"],
  ["éle í", "li"],
  ["u éle", "ul"],
  ["cléss", "class"],
  ["cálor", "color"],
  ["nêivi", "navy"],
  ["pârpou", "purple"],
  ["tomêitou", "tomato"],
  ["uáit", "white"],
  ["lêibol", "label"],
  ["fúter", "footer"],
  ["línk", "link"],
  ["név", "nav"],
]

// Configuração de cena por bloco.
export const SCENE_CONFIG = {
  1: { scene: "abertura" },
  2: { scene: "tag" },
  3: { scene: "classe" },
  4: { scene: "reuso" },
  5: { scene: "id" },
  6: { scene: "classeOuId" },
  7: { scene: "virgula" },
  8: { scene: "descendente" },
  9: { scene: "cascata" },
  10: { scene: "erros" },
  11: { scene: "final" },
}

export const BLOCKS = BLOCK_TEXTS.map((b) => ({ ...b, ...SCENE_CONFIG[b.n], captionFix: CAPTION_FIX }))
