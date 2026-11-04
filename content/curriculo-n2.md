# Currículo do Nível 2 — Primeira Demão

**Aprovado pelo founder em 2026-11-04 (nome: Primeira Demão).** Objetivo do nível: dar aparência à página pessoal construída no Primeiro Commit, com CSS do zero até o layout responsivo básico. Fio condutor: a mesma página "sobre mim" da Ana (aluna fictícia), agora com um arquivo `estilo.css` que cresce a cada aula. No projeto final, o aluno estiliza a própria página pessoal que fez na aula 9 do nível 1. JavaScript fica para os próximos níveis.

## Nome do nível

| Opção | Por quê |
|---|---|
| Mão de Tinta | "Dar uma mão de tinta" é expressão do dia a dia. Continua a metáfora da casa (HTML é a estrutura, CSS é o acabamento). |
| **Primeira Demão** (escolhida pelo founder) | Mesma metáfora: a primeira demão de tinta é o primeiro acabamento da casa. Rima com "Primeiro Commit". Slug: `primeira-demao`. |
| Pixel Perfeito | Termo do mundo dev, como "commit". Ponto fraco: soa perfeccionista, e o curso repete "não precisa ficar perfeito, precisa ficar seu". |

## Aulas

| # | Aula | Objetivo (1 linha) | Propriedades / assuntos principais | Min. | Exercício de código |
|---|---|---|---|---|---|
| 1 | O que é CSS? | Entender o papel do CSS, a anatomia de uma regra e as formas de ligar o CSS ao HTML. | regra (`seletor { propriedade: valor; }`), `<style>`, `<link rel="stylesheet" href>`, atributo `style` (só citado), `color`, `background-color`, `font-size` | 8 | sim: `link` + 3 declarações |
| 2 | Seletores: tag, classe e id | Escolher quem recebe o estilo e entender quem vence quando duas regras brigam. | seletor de tag, `.classe`, `#id`, atributo `class`, vários seletores com vírgula, seletor de descendente (`nav a`), cascata e especificidade (noção) | 11 | sim: `class`/`id` no HTML + regras com `.` e `#` |
| 3 | Cores | Usar cores por nome, hexadecimal e rgb, e escolher combinações legíveis. | nomes de cor, `#rrggbb`, `rgb()`, `color`, `background-color`, contraste e acessibilidade | 9 | sim: cores em hexadecimal |
| 4 | Texto e fontes | Deixar o texto legível e com personalidade. | `font-family` (com fonte de reserva), `font-size`, `font-weight`, `line-height`, `text-align`, `text-decoration`, herança | 10 | sim |
| 5 | O modelo de caixa | Entender que todo elemento é uma caixa e controlar o espaço dentro e fora dela. | `padding`, `border`, `margin`, `border-radius`, atalhos de 1, 2 e 4 valores, ferramenta de inspeção do navegador | 11 | sim |
| 6 | Tamanhos e unidades | Definir largura e altura sem quebrar a página em telas diferentes. | `width`, `height`, `max-width`, `px`, `%`, `rem`, `box-sizing: border-box`, `img { max-width: 100%; }` | 10 | sim |
| 7 | Block e inline | Entender por que alguns elementos ocupam a linha toda e outros não, e centralizar um bloco. | `display: block`, `inline`, `inline-block`, `none`; `margin: 0 auto` | 9 | sim |
| 8 | Flexbox: o básico | Colocar itens lado a lado e alinhar, a começar pelo menu da Ana. | `display: flex`, `flex-direction`, `justify-content`, `align-items`, `gap`, `list-style: none` | 12 | sim: menu em linha |
| 9 | Flexbox na prática | Montar cartões lado a lado que quebram linha sozinhos. | `flex-wrap`, `flex: 1`, a `div` como caixa de layout (gancho da aula 8 do nível 1) | 10 | sim: cartões de projetos |
| 10 | Responsivo: o básico | Fazer a página funcionar bem no celular e no computador. | `<meta name="viewport">`, `@media (min-width: …)`, pensar primeiro no celular | 11 | sim (ver observação sobre `@media`) |
| 11 | Hover e transição | Dar resposta visual quando o mouse passa e suavizar a mudança. | `:hover`, `:focus`, `transition`, `cursor: pointer` | 8 | sim |
| 12 | Projeto final: a sua página com a sua cara | Estilizar a página pessoal da aula 9 do nível 1 com tudo o que foi visto, revisar com uma checklist e salvar a segunda versão. | todas as anteriores | 15 | sim: mini projeto final |

**Total estimado:** cerca de 124 minutos de vídeo, mais os exercícios de cada aula e a prova do nível.

## Projeto final

A página pessoal que o aluno fez na aula 9 do Primeiro Commit (topo com menu, sobre mim com foto, projetos, rotina em tabela, formulário de contato, rodapé) ganha um `estilo.css` próprio: paleta de cores com bom contraste, fontes, espaçamentos com o modelo de caixa, menu em linha com flexbox, cartões de projetos, links com hover e um ajuste responsivo para celular. A aula termina salvando a "versão 2" da pasta do site, retomando a ideia de versões da aula 9 do nível 1.

## Observações para a decisão

- **Diferença em relação à spec.** A tabela da seção 7 da spec põe "CSS básico" no nível 1 e "Flexbox, Grid, responsividade" no nível 2, com uma landing page como projeto. O nível 1 ficou só com HTML, então o nível 2 começa o CSS do zero e termina no flexbox e no responsivo básico. Grid fica de fora, ou entra como uma aula 13 opcional (~10 min). Se o founder quiser manter a landing page como projeto, ela pode substituir a página pessoal na aula 12. A proposta aqui é a página pessoal, para dar continuidade ao que o aluno já fez.
- **Como os exercícios são corrigidos.** O corretor confere o CSS com o teste `css-decl` (seletor, propriedade e valor). Ele lê a aba CSS do editor e os blocos `<style>` do HTML. Não lê o atributo `style=""` nem arquivos ligados por `<link>`. Por isso as aulas ensinam `<style>` e `<link>` e só citam o `style=""`, e os exercícios pedem o CSS na aba CSS. A parte de HTML (`class`, `id`, `<link>`, `<meta name="viewport">`) é conferida com `dom-exists`.
- **Limites do `css-decl` que os enunciados precisam respeitar:**
  - O valor é comparado como texto, sem diferenciar maiúsculas e minúsculas e juntando espaços repetidos. `#1e3a8a` e `#1E3A8A` passam, mas `navy`, `#000080` e `rgb(0, 0, 128)` são valores diferentes. O enunciado precisa dizer o valor exato.
  - O seletor precisa ser exatamente o do teste (`.cartao` não casa com `div.cartao`). Se a regra tiver vários seletores separados por vírgula, basta um deles casar.
  - Atalhos e propriedades longas são diferentes: `margin: 0 auto` não casa com `margin-left: auto`. O enunciado precisa dizer qual forma usar.
  - Regras dentro de `@media` também contam, mas o teste **não confere** se a regra está dentro do `@media`. Na aula 10, o exercício confere a `meta viewport` (`dom-exists`) e a declaração, e o "está dentro do `@media`" fica para múltipla escolha e ordenar blocos.
  - `:hover` funciona como texto do seletor (`a:hover`), então a aula 11 dá para corrigir.
  - **Erro de sintaxe derruba tudo.** O corretor lê o CSS com o postcss. Se faltar um ponto e vírgula entre duas declarações ou uma chave de fechamento, a leitura falha e **todos** os testes `css-decl` do exercício reprovam, cada um com a mensagem "Não encontrei …". No navegador, só a regra com erro para de funcionar. Sugestão para o app: quando o postcss falhar, mostrar uma mensagem própria ("Seu CSS tem um erro de escrita: confira pontos e vírgulas e chaves"). O ponto e vírgula na última declaração da regra é opcional e não causa esse problema.
- **Prova do nível.** O banco precisa crescer junto com as aulas, com perguntas de código usando `css-decl`. Por enquanto, o `nivel-2.json` tem um banco provisório só da aula 1 (marcado como provisório no próprio arquivo).
- **Aula de amostra.** Pela spec, a aula 1 deste nível é a amostra do plano Grátis (`isSample: true`): fica aberta para todos, só para assistir, sem exercícios.
- Durações são estimativas pelo roteiro (cerca de 165 palavras de fala por minuto, a média real das aulas do nível 1).
