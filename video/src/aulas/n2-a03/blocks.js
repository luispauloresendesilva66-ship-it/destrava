// Dados da Aula 3 do Nível 2 — Cores (extraídos do roteiro.md; Fala verbatim)
export const BLOCK_TEXTS = [
  { n: 1, title: "Abertura", fala: "Olá, seja bem-vindo à aula três da Primeira Demão. Na aula passada, você aprendeu a escolher quem recebe o estilo: a tag pega todos, a classe usa o ponto, o ái di usa a cerquilha. E viu que, quando duas regras brigam, vence a mais específica. Até agora, a Ana pintou a página com nomes de cor em inglês: nêivi, tomêitou, pârpou, uáit. Funciona, mas a lista de nomes é curta, e nem sempre tem o tom exato que ela quer. Hoje, você vai aprender as outras formas de escrever uma cor: o código réx, que começa com cerquilha, e o érre gê bê. Depois, vai ver como escolher uma paleta pequena e, principalmente, como garantir que o texto continua fácil de ler. Abre o editor e bora destravar." },
  { n: 2, title: "Onde as cores entram", fala: "Primeiro, onde uma cor pode entrar. Você já conhece duas propriedades. Cálor muda a cor do texto. Béquigráund cálor muda a cor do fundo. E existe uma terceira que você vai usar bastante: bórder cálor, a cor da borda. A borda é a linha em volta de uma caixa, e ela tem aula própria mais para frente, na aula cinco. Por enquanto, guarde só isto: as três aceitam exatamente os mesmos valores de cor. Tudo o que você aprender hoje vale para o texto, para o fundo e para a borda. E o jeito mais simples de escrever uma cor você já usou: pelo nome. O cê ésse ésse conhece cerca de cento e quarenta nomes, todos em inglês. Réd é vermelho, blú é azul, bléc é preto, grêi é cinza." },
  { n: 3, title: "O código réx", fala: "Os nomes são práticos, mas limitados. Para ter qualquer tom, existe o código réx, de hexadecimal. Ele começa com uma cerquilha, a mesma do ái di, e tem seis caracteres. Esses seis caracteres são três pares. O primeiro par é a quantidade de vermelho. O segundo, a de verde. O terceiro, a de azul. Toda cor da tela é uma mistura dessas três luzes. Cada par vai de zero zero, que é nada daquela cor, até éfe éfe, que é o máximo. Então, cerquilha, éfe éfe, zero zero, zero zero, é vermelho no máximo, sem verde e sem azul: vermelho puro. Tudo zero é preto, porque não tem luz nenhuma. E tudo éfe, cerquilha, seis éfes, é branco, porque tem todas as luzes no máximo." },
  { n: 4, title: "Lendo um código réx", fala: "Mas por que tem letra no meio dos números? No hexadecimal, cada dígito vai de zero a nove e continua com as letras de á até éfe. O á vale dez, e o éfe vale quinze, o maior. Você não precisa fazer conta. Basta pensar assim: perto de zero é pouco, perto de éfe é muito. Olha a cor que a Ana escolheu para os títulos: cerquilha, dois seis, quatro seis, cinco três. Pouco vermelho, um pouco mais de verde e de azul, tudo baixo. Resultado: um azul-petróleo escuro. Agora, o fundo: cerquilha, éfe dê, éfe seis, é três. Tudo alto: uma cor bem clara, um creme. E tem um atalho. Quando cada par tem os dois dígitos iguais, dá para escrever só três: cerquilha, éfe éfe éfe é o mesmo que seis éfes, branco." },
  { n: 5, title: "Érre gê bê e érre gê bê á", fala: "A terceira forma diz a mesma coisa com números normais: érre gê bê. As letras são as iniciais de vermelho, verde e azul, em inglês. Você escreve érre gê bê, abre parênteses, três números separados por vírgula, e fecha parênteses. Cada número vai de zero a duzentos e cinquenta e cinco. Zero é nada, duzentos e cinquenta e cinco é o máximo, o equivalente ao éfe éfe. O azul-petróleo da Ana, em érre gê bê, fica: trinta e oito, setenta, oitenta e três. É exatamente a mesma cor do código réx, só escrita de outro jeito. E existe uma prima, o érre gê bê á. O á é de alfa, a transparência: um quarto número, de zero a um. Zero é invisível, um é a cor inteira, e zero vírgula cinco deixa a cor pela metade. Por enquanto, é só para você reconhecer quando encontrar." },
  { n: 6, title: "Escolhendo as cores", fala: "Tá, mas ninguém decora códigos. Como a Ana descobre o código da cor que ela quer? O próprio navegador ajuda. Nas ferramentas de desenvolvedor, que abrem com o botão direito, em inspecionar, toda cor do cê ésse ésse ganha um quadradinho. Clicando nele, abre um seletor de cores: você arrasta até o tom que quiser, e o código aparece pronto para copiar. Agora, a dica mais importante: escolha poucas cores. Uma paleta boa para começar tem duas ou três cores, mais os neutros, que são o branco, o preto e os cinzas. A Ana ficou com três: o creme, para o fundo, o azul-petróleo, para os títulos, e um coral, para os destaques e os links. E, para o texto comum, um cinza bem escuro, cerquilha, três três, três três, três três. Poucas cores, repetidas com regra, deixam a página com cara de projeto." },
  { n: 7, title: "Contraste: dá para ler?", fala: "Cor bonita que ninguém consegue ler não serve. Isso se chama contraste: a diferença entre a cor do texto e a cor do fundo. Texto claro em fundo claro some. Texto escuro em fundo escuro também. E um cinza médio em cima de outro cinza médio cansa a vista de qualquer pessoa, e é ainda pior para quem enxerga pouco, ou para quem está no celular, debaixo do sol. A regra prática é: fundo claro, texto escuro, ou o contrário. Para não depender do olho, existem verificadores de contraste. Você coloca as duas cores e ele diz se a combinação passa. As ferramentas do navegador também mostram isso no seletor de cores. A Ana testou e levou um susto: o coral dos links, em cima do creme, não passou. O título azul-petróleo passou com folga." },
  { n: 8, title: "A paleta na página da Ana", fala: "Para resolver o coral, a Ana escureceu o tom no seletor de cores até passar. Ficou cerquilha, bê cinco, quatro cinco, dois cê, um terracota. Agora, ela aplica a paleta no estilo ponto cê ésse ésse. Body: béquigráund cálor, cerquilha, éfe dê, éfe seis, é três. Pê: cálor, cerquilha, três três, três três, três três, o cinza escuro. Agá um, vírgula, agá dois: cálor, o azul-petróleo. Ponto destaque e név, espaço, é: cálor, o terracota. E o fúter faz o caminho inverso: fundo azul-petróleo. Os parágrafos dele, fúter, espaço, pê, ficam com o texto branco, cerquilha, seis éfes. Repare que são as mesmas regras das aulas um e dois. Só os valores mudaram. Os nomes, nêivi, tomêitou, pârpou, saíram, e os códigos entraram. E, se um dia a Ana quiser outra paleta, troca os códigos e pronto." },
  { n: 9, title: "Erros comuns", fala: "Agora, os erros mais comuns com cores. O primeiro: esquecer a cerquilha. Éfe dê, éfe seis, é três, sem a cerquilha, não é cor para o navegador, e a declaração é ignorada. O segundo: o número errado de dígitos. O código réx tem seis ou três. Com cinco, ou com sete, não funciona. Isso acontece muito quando se copia o código pela metade. O terceiro: espaço no meio do código. Cerquilha, éfe dê, espaço, éfe seis não é uma cor. O código vai todo junto. O quarto é no érre gê bê: número maior que duzentos e cinquenta e cinco, como trezentos. O máximo é duzentos e cinquenta e cinco. E lembra que o cê ésse ésse não avisa nada? Se a cor não mudou, confira essas quatro coisas. Ah, e nos exercícios, use o valor exatamente como o enunciado pede." },
  { n: 10, title: "Resumo e próximo degrau", fala: "Vamos recapitular. As cores entram no cálor, para o texto, no béquigráund cálor, para o fundo, e no bórder cálor, para a borda. Dá para escrever uma cor pelo nome em inglês, pelo código réx, com cerquilha e três pares de vermelho, verde e azul, ou pelo érre gê bê, com números de zero a duzentos e cinquenta e cinco. O código curto, de três dígitos, repete cada dígito. O érre gê bê á acrescenta a transparência. Para escolher, use o seletor de cores do navegador e fique com duas ou três cores, mais os neutros. E sempre confira o contraste: o texto precisa ser fácil de ler. Agora é a sua vez: os exercícios estão logo abaixo do vídeo. Na próxima aula, o assunto é o texto em si: fontes, tamanhos e espaçamento entre linhas. Até lá, e bora destravar." },
]

// Na Fala, os termos de CSS e os códigos de cor são escritos do jeito que se fala; na legenda, aparece o
// valor real. A ordem importa: os trechos mais longos vêm antes (os códigos inteiros, ditos em pares). As
// letras soltas ("é", "dê", "á", "éfe") só são trocadas nas frases exatas em que são código — nunca
// sozinhas ("é" é verbo, "á" aparece em "já").
export const CAPTION_FIX = [
  ["cerquilha, éfe éfe éfe é o mesmo que seis éfes", "#fff é o mesmo que #ffffff"],
  ["cerquilha, éfe éfe, zero zero, zero zero", "#ff0000"],
  ["cerquilha, dois seis, quatro seis, cinco três", "#264653"],
  ["cerquilha, éfe dê, éfe seis, é três", "#fdf6e3"],
  ["cerquilha, três três, três três, três três", "#333333"],
  ["cerquilha, bê cinco, quatro cinco, dois cê", "#b5452c"],
  ["Éfe dê, éfe seis, é três, sem a cerquilha", "fdf6e3, sem a cerquilha"],
  ["Cerquilha, éfe dê, espaço, éfe seis", "#fd f6e3"],
  ["cerquilha, seis éfes", "#ffffff"],
  ["trinta e oito, setenta, oitenta e três", "rgb(38, 70, 83)"],
  ["de zero zero, que é nada", "de 00, que é nada"],
  ["até éfe éfe, que é o máximo", "até ff, que é o máximo"],
  ["o equivalente ao éfe éfe", "o equivalente ao ff"],
  ["E tudo éfe,", "E tudo f,"],
  ["letras de á até éfe", "letras de a até f"],
  ["O á vale dez, e o éfe vale quinze", "O a vale dez, e o f vale quinze"],
  ["perto de éfe é muito", "perto de f é muito"],
  ["O á é de alfa", "O a é de alfa"],
  ["zero vírgula cinco", "0.5"],
  ["de zero a duzentos e cinquenta e cinco", "de 0 a 255"],
  ["duzentos e cinquenta e cinco", "255"],
  ["como trezentos", "como 300"],
  ["Ponto destaque e név, espaço, é", ".destaque e nav a"],
  ["Agá um, vírgula, agá dois", "h1, h2"],
  ["fúter, espaço, pê", "footer p"],
  ["Pê:", "p:"],
  ["estilo ponto cê ésse ésse", "estilo.css"],
  ["cê ésse ésse", "CSS"],
  ["Béquigráund cálor", "background-color"],
  ["béquigráund cálor", "background-color"],
  ["bórder cálor", "border-color"],
  ["érre gê bê á", "rgba"],
  ["érre gê bê", "rgb"],
  ["réx", "hex"],
  ["ái di", "id"],
  ["Cálor", "color"],
  ["cálor", "color"],
  ["nêivi", "navy"],
  ["tomêitou", "tomato"],
  ["pârpou", "purple"],
  ["uáit", "white"],
  ["Réd", "red"],
  ["blú", "blue"],
  ["bléc", "black"],
  ["grêi", "gray"],
  ["fúter", "footer"],
]

// Configuração de cena por bloco.
export const SCENE_CONFIG = {
  1: { scene: "abertura" },
  2: { scene: "onde" },
  3: { scene: "hex" },
  4: { scene: "lendo" },
  5: { scene: "rgb" },
  6: { scene: "escolher" },
  7: { scene: "contraste" },
  8: { scene: "paleta" },
  9: { scene: "erros" },
  10: { scene: "final" },
}

export const BLOCKS = BLOCK_TEXTS.map((b) => ({ ...b, ...SCENE_CONFIG[b.n], captionFix: CAPTION_FIX }))
