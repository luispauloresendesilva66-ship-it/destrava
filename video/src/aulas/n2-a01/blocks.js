// Dados da Aula 1 do Nível 2 — O que é CSS? (extraídos do roteiro.md; Fala verbatim)
export const BLOCK_TEXTS = [
  { n: 1, title: "Abertura", fala: "Olá, seja bem-vindo ao segundo nível da Destrava: Primeira Demão. Lembra da casa da primeira aula? O HTML é a estrutura: as paredes, as portas, os cômodos. No nível passado, a Ana levantou essa estrutura inteira: uma página pessoal com topo, menu, sobre mim, projetos, rotina, formulário e rodapé. Funciona, está organizada, mas ainda tem cara de rascunho: letra preta, fundo branco, links azuis. Agora chegou a hora do acabamento. É aqui que entra o cê ésse ésse, a linguagem que cuida da aparência. Hoje, você vai entender o que ele é, como se escreve uma regra e as formas de ligar o cê ésse ésse a uma página. E, no fim, a página da Ana vai ganhar as primeiras cores. Abre o editor e bora destravar." },
  { n: 2, title: "Estrutura e aparência", fala: "Vamos separar bem os papéis. O HTML diz o que cada coisa é: isto é um título, isto é um parágrafo, isto é um menu. O cê ésse ésse diz como cada coisa aparece: de que cor, de que tamanho, com quanto espaço em volta. Repara numa coisa curiosa: a página da Ana já tem alguma aparência. O título é grande e em negrito, e os links são azuis e sublinhados. Quem fez isso foi o próprio navegador, que tem um estilo padrão para cada tag. Com o cê ésse ésse, você passa a mandar nisso. E o melhor: o mesmo HTML pode ganhar visuais completamente diferentes sem mudar uma linha da estrutura. O nome vem do inglês, kasquêidin stáil xíts, que quer dizer folhas de estilo em cascata. Guarde a palavra folha de estilo, que ela vai aparecer daqui a pouco." },
  { n: 3, title: "A anatomia de uma regra", fala: "Todo cê ésse ésse é feito de regras. E toda regra tem a mesma forma. Primeiro vem o seletor, que diz quem vai receber o estilo. Por exemplo, agá um: todos os títulos agá um da página. Depois, abre chaves. Dentro das chaves vem a declaração: o nome de uma propriedade, dois pontos, o valor, e um ponto e vírgula no fim. A primeira propriedade que a gente vai usar é a cálor, a cor do texto. Então fica assim: agá um, abre chaves, cálor, dois pontos, nêivi, ponto e vírgula, fecha chaves. Nêivi é um azul-marinho. Lendo em português: todo agá um fica com o texto azul-marinho. Repara que, diferente do HTML, aqui não tem sinal de menor nem de maior. O seletor é só o nome da tag." },
  { n: 4, title: "A tag style", fala: "Agora, onde a regra vai? A primeira forma é a tag stáil, que fica dentro do head. Abre o index ponto html da Ana. Dentro do head, logo depois do title, abre a tag stáil. Dentro dela, escreve a regra: agá um, abre chaves, cálor, dois pontos, nêivi, ponto e vírgula, fecha chaves. E fecha a tag stáil. Salva e olha a prévia: o olá, eu sou a Ana ficou azul-marinho. Esse é o seu primeiro cê ésse ésse funcionando. Por que no head? Porque o head guarda as informações sobre a página, e o estilo é uma delas. Ele não aparece como texto na tela. Ele muda a forma como o resto aparece." },
  { n: 5, title: "Mais de uma declaração", fala: "Uma regra pode ter várias declarações, uma embaixo da outra, cada uma com o seu ponto e vírgula. Vamos dar mais duas pinceladas. Uma regra nova para o body, que é a página inteira, com a propriedade béquigráund cálor, a cor do fundo, com o valor láit iélou, um amarelo bem clarinho. Agora o fundo da página toda ficou amarelo-claro. E outra regra para o pê, o parágrafo, com a fónti sáiz, o tamanho da letra, igual a dezoito pê xis. Pê xis é de pixels, os pontinhos da tela. Mais para frente, tem uma aula só sobre tamanhos. Repara que a béquigráund cálor tem duas palavras ligadas por um tracinho. No cê ésse ésse é assim: nada de espaço no meio do nome da propriedade." },
  { n: 6, title: "Um arquivo só para o estilo", fala: "A tag stáil funciona, mas tem um problema. Lembra que a Ana também tem a página de projetos? Se o estilo ficar dentro do index ponto html, a página de projetos continua sem cor. E copiar o mesmo cê ésse ésse em todas as páginas dá trabalho e confunde. A solução é um arquivo só para o estilo: estilo ponto cê ésse ésse, na pasta do site. As regras saem da tag stáil e vão para esse arquivo, sem a tag. No head, no lugar da stáil, entra a tag línk, com dois atributos. O rél, igual a stáil xíti, avisa que o arquivo é uma folha de estilo. E o agá réf, igual a estilo ponto cê ésse ésse, diz onde ele está. A línk não tem fechamento. Agora é só colocar a mesma linha na página de projetos, com o caminho certo, e as duas ficam com o mesmo visual." },
  { n: 7, title: "No editor da Destrava, e o atributo style", fala: "Nos exercícios da Destrava, o editor tem uma aba HTML e uma aba cê ésse ésse. A aba cê ésse ésse faz o papel do estilo ponto cê ésse ésse: o que você escreve ali já vale para a página da prévia. Então, nos exercícios, as regras vão na aba cê ésse ésse. Existe ainda uma terceira forma, que você vai encontrar por aí: o atributo stáil, direto na tag. Por exemplo, um pê com stáil igual a cálor, dois pontos, vermelho. Funciona, mas só para aquele elemento, e mistura a estrutura com a aparência no mesmo lugar. Fica difícil de achar e de mudar depois. Neste curso, a gente não usa. Arquivo separado sempre que der, e a tag stáil para testes rápidos." },
  { n: 8, title: "Os erros mais comuns", fala: "Agora, os erros que mais aparecem nessa primeira semana de cê ésse ésse. Um detalhe importante: quando o cê ésse ésse tem um erro, o navegador não reclama. Ele só ignora aquela parte, e você fica sem entender por que nada mudou. O primeiro erro: esquecer o ponto e vírgula. A declaração seguinte gruda na anterior, e as duas param de funcionar. O segundo: escrever a propriedade errado, ou em português. Cor, dois pontos, azul não existe. É cálor, e o valor também é em inglês. O terceiro: esquecer de fechar as chaves, e a regra seguinte se perde. O quarto é na línk: esquecer o rél, ou errar o nome do arquivo no agá réf. Se nada mudou na página, confira essas quatro coisas primeiro." },
  { n: 9, title: "Experimente", fala: "Antes dos exercícios, um convite: brinque um pouco. O cê ésse ésse se aprende mexendo. Troque o nêivi por outra cor: grín, que é verde, pârpou, que é roxo, ou tomêitou, que é um vermelho alaranjado. Mude o tamanho dos parágrafos para vinte pê xis, ou para quatorze, e veja a diferença. Pinte o fundo de outra cor e repare se o texto continua fácil de ler. Se ficar estranho, não tem problema: é só voltar o valor. Nada quebra a estrutura da página. Esse é o lado bom de separar as coisas. O HTML continua o mesmo, e você testa quantos visuais quiser. Na aula de cores, você vai aprender a escolher combinações que ficam bonitas e legíveis." },
  { n: 10, title: "Resumo e próximo degrau", fala: "Vamos recapitular. O HTML é a estrutura, e o cê ésse ésse é a aparência. Toda regra tem um seletor, abre chaves, uma ou mais declarações com propriedade, dois pontos, valor e ponto e vírgula, e fecha chaves. Você conheceu três propriedades: cálor, para a cor do texto, béquigráund cálor, para a cor do fundo, e fónti sáiz, para o tamanho da letra. O cê ésse ésse pode ficar na tag stáil, dentro do head, ou, melhor ainda, num arquivo separado, ligado com a tag línk, com rél igual a stáil xíti. Agora é a sua vez: os exercícios estão logo abaixo do vídeo. E fica uma pergunta para a próxima aula: e se a Ana quiser pintar só um parágrafo, e não todos? Para isso existem os seletores de classe e de ái di. Até lá, e bora destravar." },
]

// Na Fala, os termos de CSS e as tags são escritos do jeito que se fala, para a voz não tropeçar;
// na legenda, aparece o nome real. A ordem importa: os trechos mais longos vêm antes. As regras
// completas ditas símbolo por símbolo viram código na legenda; nas outras frases, "abre chaves",
// "dois pontos" e "ponto e vírgula" continuam por extenso. O "pê" (tag p) só é trocado nas frases
// exatas em que é a tag — em qualquer outro lugar ele não aparece sozinho.
export const CAPTION_FIX = [
  ["agá um, abre chaves, cálor, dois pontos, nêivi, ponto e vírgula, fecha chaves", "h1 { color: navy; }"],
  ["um pê com stáil igual a cálor, dois pontos, vermelho", "um p com style igual a color: vermelho"],
  ["Cor, dois pontos, azul", "cor: azul"],
  ["kasquêidin stáil xíts", "Cascading Style Sheets"],
  ["estilo ponto cê ésse ésse", "estilo.css"],
  ["index ponto html", "index.html"],
  ["béquigráund cálor", "background-color"],
  ["fónti sáiz", "font-size"],
  ["dezoito pê xis", "18px"],
  ["vinte pê xis", "20px"],
  ["Pê xis é de pixels", "Px é de pixels"],
  ["o pê, o parágrafo", "o p, o parágrafo"],
  ["láit iélou", "lightyellow"],
  ["stáil xíti", "stylesheet"],
  ["cê ésse ésse", "CSS"],
  ["agá réf", "href"],
  ["agá um", "h1"],
  ["ái di", "id"],
  ["cálor", "color"],
  ["Nêivi", "Navy"],
  ["nêivi", "navy"],
  ["grín", "green"],
  ["pârpou", "purple"],
  ["tomêitou", "tomato"],
  ["stáil", "style"],
  ["línk", "link"],
  ["rél", "rel"],
]

// Configuração de cena por bloco.
export const SCENE_CONFIG = {
  1: { scene: "abertura", levels: ["Primeiro Commit", "Primeira Demão", "Nível 3", "Nível 4", "Nível 5"] },
  2: { scene: "papeis" },
  3: { scene: "anatomia" },
  4: { scene: "tagStyle" },
  5: { scene: "declaracoes" },
  6: { scene: "arquivo" },
  7: { scene: "editor" },
  8: { scene: "erros" },
  9: { scene: "experimente" },
  10: { scene: "final", levels: ["Primeiro Commit", "Primeira Demão", "Nível 3", "Nível 4", "Nível 5"] },
}

export const BLOCKS = BLOCK_TEXTS.map((b) => ({ ...b, ...SCENE_CONFIG[b.n], captionFix: CAPTION_FIX }))
