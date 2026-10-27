# Destrava — Documento de design do app

*Data: 27/10/2026 · Autor do produto: fundador da Destrava · Status: rascunho para aprovação*

> Convenção: itens marcados **[decisão do Claude]** foram escolhas minhas, não pedidas pelo fundador. Todo o resto foi decidido pelo fundador na conversa.

---

## 1. Intenção e o porquê

A **Destrava** é uma plataforma de ensino de programação (HTML, CSS e JavaScript, do básico ao avançado) para **adultos que querem sair do emprego atual ou começar na carreira de tecnologia antes, ou em vez, de uma faculdade**.

Esse público já gastou dinheiro com cursos que prometiam "aprender programação em poucas horas" e não aprendeu nada. A Destrava se posiciona como o oposto:

- **barata** (planos de R$ 0 a R$ 49,99/mês);
- **honesta** (sem promessa milagrosa, sem horas infladas no certificado);
- **exigente** (o aluno só avança de nível com 90% ou mais na prova).

O projeto também vai para o **currículo do fundador**, então o código precisa ser limpo, organizado e explicável numa entrevista.

O instrutor **não aparece**. As aulas são narradas com a voz do fundador, gravada pessoalmente ou clonada com o Chatterbox. A produção dos vídeos acontece fora do app.

## 2. Metas, não-metas e anti-metas

**Metas**
- App web instalável (PWA) que funciona bem no computador e no celular.
- Cadastro e login com e-mail e senha.
- Três planos (Grátis, Gold, Platinum), com cobrança mensal por cartão de crédito, débito e Pix.
- Cinco níveis com videoaulas, exercícios estilo Duolingo, prova final com nota mínima de 90% e certificado verificável.
- Custo fixo **zero** para operar até chegarem os primeiros alunos pagantes.
- Painel de administrador para o fundador gerenciar o conteúdo sem mexer no código.

**Não-metas (fora deste projeto)**
- Produzir o conteúdo do curso (roteiros, gravações, exercícios, perguntas). Será um projeto à parte. Este app só precisa receber e exibir esse conteúdo.
- Vídeos de divulgação (Reels/TikTok). Também é um projeto à parte.
- Apps nativos na Play Store ou na App Store. O PWA resolve por agora.
- Mentoria ao vivo e correção humana.

**Anti-metas (seria um fracasso mesmo funcionando)**
- Certificado com horas infladas ou nota que não reflete a prova.
- Qualquer texto no app ou no checkout que prometa emprego ou aprendizado em tempo irreal.
- O aluno pagar e não ter o acesso liberado automaticamente.
- Vídeos pagos acessíveis por qualquer pessoa com um link.
- Perder o progresso ou os certificados do aluno se ele cancelar.

## 3. Restrições

- **Orçamento: R$ 0/mês** no início. Tudo deve caber nos planos gratuitos abaixo.
- O fundador ainda **não tem CNPJ**. A operação será como pessoa física (CPF) no Mercado Pago e abrir CNPJ depois.
- O fundador conhece JavaScript, CSS e PHP (curso técnico). A stack precisa ser algo que ele consiga manter e explicar.
- Público brasileiro: interface toda em português, preços em reais, Pix obrigatório.
- **LGPD** e **Código de Defesa do Consumidor**: termos de uso, política de privacidade, consentimento explícito para a comunidade no WhatsApp, cancelamento a qualquer momento e direito de arrependimento de 7 dias para compras online (CDC, art. 49).

## 4. Stack (decidida com o fundador)

| Peça | Ferramenta | Limite gratuito relevante |
|---|---|---|
| Front-end | JavaScript + CSS, PWA, hospedado no **Cloudflare Pages** | Sem custo para sites estáticos |
| Auth, banco de dados, funções | **Supabase** (Auth, Postgres com Row Level Security, Edge Functions) | 50 mil usuários ativos/mês. **O projeto pausa após 7 dias sem uso** (atenção no início) |
| Vídeos | **Cloudflare R2**, com URLs assinadas e temporárias geradas por uma Edge Function só para usuários com acesso | 10 GB armazenados, sem custo de saída (cerca de 40 aulas em 720p) |
| Pagamentos | **Mercado Pago** (Checkout Pro / Assinaturas + webhooks recebidos por uma Edge Function) | Sem mensalidade, só taxa por venda |
| Endereço | `destrava.pages.dev` até comprar o domínio | — |

**[decisão do Claude]** Framework do front-end: **React + Vite**. É JavaScript, muito pedido em vagas, e organiza bem um app desse tamanho. Se o construtor tiver um motivo forte, pode usar outro, desde que continue sendo JavaScript.

**[decisão do Claude]** E-mails transacionais (lembrete de cobrança, recuperação de senha) saem pelo e-mail embutido do Supabase no começo. Se o limite apertar, trocar por um serviço com plano grátis (ex.: Resend).

> Observação: a chave Pix do fundador (e-mail) **não** é usada diretamente pelo app. O Pix entra pelo Mercado Pago, que confirma o pagamento automaticamente e repassa o dinheiro para a conta do fundador.

## 5. Planos e o que cada um libera

| Recurso | Grátis | Gold — R$ 39,99/mês | Platinum — R$ 49,99/mês |
|---|---|---|---|
| Aulas | Primeiro Commit em **versão reduzida** + a **1ª aula de cada um dos níveis 2 a 5** como amostra | Trilha completa, níveis 1 a 5 | Tudo do Gold |
| Exercícios | Com **vidas** (limite diário de erros) | Ilimitados | Ilimitados |
| Prova de nível | ✅ só do Primeiro Commit | ✅ todas | ✅ todas |
| Espera para refazer a prova | 24 horas | 2 horas | Imediata |
| Certificado | **Pago à parte: R$ 39** | ✅ incluso | ✅ incluso |
| Sequência diária e conquistas | ✅ | ✅ | ✅ |
| Comunidade no WhatsApp | ❌ | ✅ | ✅ + grupo exclusivo |
| Projetos de portfólio guiados | ❌ | ❌ | ✅ |
| Correção de código com IA | ❌ | ❌ | ✅ |
| Trilha de carreira (currículo, LinkedIn, GitHub, simulado de entrevista) | ❌ | ❌ | ✅ |

**Upsell do certificado:** quando o aluno grátis passa na prova do Primeiro Commit e vai comprar o certificado (R$ 39), o app mostra também a opção "Certificado + 1 mês de Gold por R$ 39,99", que destrava o nível 2.

**[decisão do Claude]** Vidas no grátis: 5 por dia, cada erro em exercício gasta uma, e elas recarregam à meia-noite (horário de Brasília).

**[decisão do Claude]** O que significa "Primeiro Commit reduzido" é uma decisão de conteúdo. O app só precisa permitir marcar cada aula e cada exercício como "disponível no grátis: sim/não" no painel de admin.

**[decisão do Claude]** Correção com IA: usar a API do Claude (modelo Haiku, o mais barato), com limite de correções por mês por aluno. **Esse é o único recurso com custo variável**, e só existe para quem paga Platinum. Exige uma chave de API com crédito antes de liberar o Platinum.

## 6. Pagamentos e assinaturas

- **Cartão de crédito:** assinatura recorrente no Mercado Pago, cobrada automaticamente todo mês.
- **Pix e débito:** sem recorrência automática. O app gera uma cobrança avulsa a cada mês e avisa o aluno por e-mail **3 dias antes do vencimento** [decisão do Claude].
- **Certificado avulso (R$ 39):** pagamento único, por qualquer meio.
- O acesso é liberado **automaticamente**, quando o webhook do Mercado Pago confirma o pagamento. O webhook precisa ser idempotente (o mesmo aviso chegando duas vezes não pode gerar acesso ou cobrança duplicada).
- **Inadimplência:** **[decisão do Claude]** 3 dias de tolerância depois do vencimento. Depois disso, a conta volta ao nível de acesso do Grátis.
- **Ao perder o plano**, o aluno mantém o progresso e todos os certificados já emitidos. Não acessa mais aulas, exercícios nem provas pagas.
- **Cancelamento:** pelo próprio app, a qualquer momento, valendo até o fim do período já pago. Direito de arrependimento de 7 dias, com reembolso integral.
- **Reembolso (7 dias):** **[decisão do Claude]** o aluno pede pelo app, e o fundador aprova no admin com um botão que chama a API de reembolso do Mercado Pago. Um reembolso revoga o acesso pago e qualquer certificado emitido com aquele pagamento, inclusive o avulso de R$ 39.
- **Combo "Certificado + 1 mês de Gold" (R$ 39,99):** **[decisão do Claude]** pagamento único, não recorrente. Dá 30 dias de Gold, e no fim do período o app convida o aluno a assinar. O certificado continua dele mesmo depois que o Gold expira.
- **Troca de plano:** **[decisão do Claude]** sobe na hora (Gold → Platinum), cobrando a diferença proporcional. Desce no fim do ciclo atual.

## 7. Estrutura do curso

| Nível | Nome | Conteúdo | Projeto final |
|---|---|---|---|
| 1 | **Primeiro Commit** | Como a web funciona, HTML do zero, CSS básico | Página pessoal simples |
| 2 | *a definir* | Flexbox, Grid, responsividade | Landing page responsiva |
| 3 | *a definir* | Lógica com JavaScript: variáveis, condições, laços, funções | Calculadora / jogo de adivinhação |
| 4 | *a definir* | JavaScript no navegador: DOM, eventos, formulários, localStorage | Lista de tarefas que salva |
| 5 | *a definir* | APIs, fetch, async/await, organização de projeto | App de clima ou de filmes |

- Cada nível tem cerca de **10 a 12 videoaulas de 20 a 30 minutos**, com exercícios depois de cada aula e uma prova no final.
- Os nomes dos níveis 2 a 5 ainda serão definidos, então ficam editáveis no admin.
- O aluno só acessa o nível N+1 depois de passar na prova do nível N, além de ter o plano adequado.
- **[decisão do Claude]** Dentro de um nível, as aulas ficam liberadas em ordem. A próxima aula abre quando o aluno conclui os exercícios da anterior.
- **[decisão do Claude]** As aulas-amostra dos níveis 2 a 5 (plano Grátis) ficam abertas independentemente das travas de nível e de ordem. São só para assistir, sem exercícios nem prova.
- **[decisão do Claude]** A prova do Primeiro Commit é **a mesma** para alunos grátis e pagantes, com o mesmo banco de perguntas, para que o certificado valha o mesmo. As aulas reduzidas do grátis precisam cobrir tudo o que a prova cobra, e isso é responsabilidade do projeto de conteúdo. O grátis ganha menos aulas de aprofundamento e menos exemplos, mas não menos assunto.

## 8. Videoaulas

- Arquivos de vídeo no R2, servidos por URL assinada que expira em poucas horas, gerada só para quem tem direito àquela aula.
- Player com velocidade ajustável (1x, 1.25x, 1.5x, 2x) e retomada de onde o aluno parou.
- O progresso (tempo assistido) é salvo para a retomada e para as métricas. Ele **não** muda as horas do certificado (ver seção 11).
- **[decisão do Claude]** Legendas em arquivo `.vtt` opcional por aula, por acessibilidade e porque muita gente assiste sem som no celular.

## 9. Exercícios estilo Duolingo

Tipos de exercício (todos cadastrados pelo admin):
1. **Múltipla escolha**
2. **Completar a lacuna** no código
3. **Ordenar blocos** de código
4. **Editor de código**: o aluno escreve HTML, CSS ou JS, e o código roda numa **iframe isolada (sandbox) no próprio navegador**. Testes automáticos definidos pelo admin verificam o resultado (ex.: "existe um `<h1>`", "a função `soma(2,3)` retorna 5").

- Resposta imediata: certo ou errado, com uma explicação curta.
- Sequência diária (streak), XP e conquistas.
- **[decisão do Claude]** Nos **exercícios**, o código do aluno roda no navegador, e não no servidor. É grátis, rápido e seguro, desde que fique dentro do sandbox. Burlar um exercício não dá nenhuma vantagem real.
- **[decisão do Claude]** Na **prova**, a questão prática é corrigida **no servidor** (Edge Function), para que a nota não possa ser forjada. JS roda num ambiente isolado. HTML e CSS são verificados por análise da estrutura (por exemplo com linkedom ou um parser de CSS). Por isso, as questões práticas de prova se limitam a verificações que dá para fazer sem um navegador real.

## 10. Provas de nível

- **Nota mínima: 90%.**
- Cada tentativa sorteia perguntas de um **banco maior** daquele nível (o admin define quantas por prova, por exemplo 20 de um banco de 60).
- A prova mistura múltipla escolha com **pelo menos um exercício prático de código**, corrigido automaticamente.
- Ao reprovar, o aluno vê os **assuntos em que errou** e links para as aulas e os exercícios desses assuntos.
- **Espera para refazer:** Grátis 24 h, Gold 2 h, Platinum imediata. **Sem limite total de tentativas.**
- A validação da nota e do tempo de espera acontece **no servidor** (Edge Function ou RLS), nunca só no navegador, para ninguém burlar a regra.
- **[decisão do Claude]** Sem tempo-limite na prova. Se o fundador quiser, entra depois.

## 11. Certificados

- Emitido ao passar na prova de cada nível, em **PDF**, com o visual da marca.
- Contém: nome completo do aluno, nome do nível, **horas de curso**, **média**, data, código único e **QR code**.
- O QR code leva a uma **página pública de verificação** (`/certificado/<código>`) que confirma que o certificado é verdadeiro.
- **Horas = carga horária fixa do nível**, o mesmo número para todos os aprovados naquele nível (decisão do fundador). É calculada pelo sistema como a duração real das aulas do nível mais o tempo médio estimado dos exercícios e da prova, e arredondada. Nunca é inflada. O admin vê o cálculo, mas não pode digitar um valor arbitrário.
- **[decisão do Claude]** O certificado do Primeiro Commit emitido para um aluno grátis mostra a carga horária da **versão reduzida** que ele cursou. Essa carga é calculada do mesmo jeito, só com as aulas marcadas como grátis.
- **[decisão do Claude]** "Média" = nota da prova em que o aluno foi aprovado.
- **[decisão do Claude]** O aluno informa o nome completo no momento da emissão, e esse nome não pode ser alterado depois sem pedido ao suporte.
- Aluno grátis: o certificado do Primeiro Commit fica bloqueado até ele pagar R$ 39 ou assinar o Gold.

## 12. Comunidade no WhatsApp

- Uma **Comunidade do WhatsApp** com grupos separados (avisos, Gold, Platinum).
- O app mostra o link do convite só para quem tem plano ativo.
- Antes de mostrar o link, o aluno aceita um aviso de que o número dele ficará visível para os outros membros (LGPD).
- Remover quem cancelou é manual, feito pelo fundador. O admin deve listar quem perdeu o plano.

## 13. Painel do administrador

Acesso só para a conta do fundador (papel `admin` no banco).

- Criar e editar níveis, aulas (upload de vídeo para o R2), exercícios, banco de perguntas de prova e projetos do Platinum.
- Marcar o que é visível no plano grátis.
- Ver alunos, planos, pagamentos e certificados emitidos. Revogar um certificado em caso de fraude.
- Métricas simples: cadastros, conversão grátis → pago, aprovação por prova.
- **[decisão do Claude]** **Importação em lote** de exercícios, perguntas de prova e metadados de aulas a partir de um arquivo JSON com formato documentado, porque digitar centenas de itens à mão não é viável. Os vídeos e os `.vtt` sobem um por aula, pelo admin.
- Fila de pedidos de reembolso.

## 13a. Recursos do Platinum (escopo da primeira versão)

**[decisão do Claude]** Para caber no custo zero e no tempo de um fundador sozinho:

- **Projetos de portfólio guiados:** páginas escritas pelo admin com enunciado, requisitos e dicas. O aluno entrega o link do projeto (GitHub ou GitHub Pages).
- **Correção com IA:** só para as **entregas dos projetos de portfólio**, não para exercícios. A IA lê o código do repositório entregue e devolve um feedback escrito (o que está bom, o que melhorar). Limite de **10 correções por mês** por aluno. O feedback é orientação e não vale nota.
- **Trilha de carreira:** conteúdo estático escrito pelo admin (currículo, LinkedIn, GitHub) mais um **simulado de entrevista em formato de quiz**, com perguntas técnicas comuns e respostas comentadas. Um simulado conversacional com IA fica para uma versão futura.

## 13b. Textos legais

**[decisão do Claude]** O construtor cria as páginas e as caixas de consentimento com **modelos de texto** de Termos de uso, Política de privacidade e Política de cancelamento e reembolso. Esses modelos **precisam ser revisados por um advogado antes do lançamento com cobrança real**. Isso bloqueia o lançamento, mas não o desenvolvimento.

## 14. Marca

- **Nome:** Destrava
- **Slogan:** *"Destrava sua carreira. Um nível de cada vez."*
- **Logo:** conceito "E", um "d" minúsculo com o buraco de fechadura no miolo.
- **Cores:** noite `#26215C`, roxo `#534AB7`, lavanda `#EEEDFE`, verde `#97C459` (o verde é reservado para conquistas: acertou, passou, destravou).
- **Estampa:** degraus, setas `>` e pontos verdes, usada no fundo, nas capas e no certificado.
- Os arquivos finais do logo (SVG/PNG, ícones do PWA em todos os tamanhos) são gerados a partir do conceito aprovado.

## 15. Telas principais

1. Página inicial pública (proposta, planos, preços, depoimentos depois)
2. Cadastro / login / recuperar senha
3. Painel do aluno (nível atual, sequência, próxima aula)
4. Mapa de níveis (os 5 degraus, com cadeados)
5. Aula (vídeo + lista de aulas do nível)
6. Exercícios
7. Prova
8. Resultado da prova (aprovado ou assuntos para revisar)
9. Certificados (lista, download, compra do avulso)
10. Planos e checkout
11. Minha conta (dados, plano, cancelar)
12. Verificação pública de certificado
13. Painel de admin
14. Termos de uso e política de privacidade

## 16. Deixado para o construtor

- Modelagem exata do banco de dados e das políticas de RLS.
- Estrutura de pastas, bibliotecas de UI, roteamento, estado.
- Biblioteca de geração de PDF e de QR code.
- Estratégia de testes, desde que cubra as regras críticas: liberação por pagamento, nota de 90%, tempo de espera por plano e emissão de certificado.
- Detalhes do service worker do PWA (o que funciona offline).

## 17. Riscos conhecidos

- **Supabase pausa projetos gratuitos inativos.** No começo, alguém precisa usar o app pelo menos uma vez por semana, ou configurar um "ping".
- **10 GB do R2** dão para umas 40 aulas. O curso completo (5 níveis × 12 aulas = 60) passa disso. Quando chegar perto, ou se reduz a resolução, ou se paga o excedente (centavos por GB).
- **Correção com IA tem custo.** Só liberar o Platinum quando houver crédito na API.
- **Pirataria de vídeo:** URLs assinadas dificultam, mas não impedem gravação de tela. É um risco aceito.
