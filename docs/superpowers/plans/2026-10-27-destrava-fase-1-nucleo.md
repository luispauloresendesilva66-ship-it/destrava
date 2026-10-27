# Destrava — Fase 1: Núcleo de aprendizado — Plano de construção

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ter a Destrava funcionando de ponta a ponta sem pagamento. O aluno se cadastra, assiste às aulas, faz os exercícios, faz a prova com nota mínima de 90% e recebe um certificado verificável. O plano de cada aluno (`free`/`gold`/`platinum`) é definido à mão no banco até a Fase 2.

**Architecture:** SPA em React + Vite (PWA) no Cloudflare Pages, falando direto com o Supabase (Auth + Postgres com RLS) para leitura. Toda regra que não pode ser burlada (liberar vídeo, sortear e corrigir prova, emitir certificado) roda em Edge Functions do Supabase. A lógica de negócio fica em módulos JavaScript **puros** em `supabase/functions/_shared/`, testados com Vitest e importados tanto pelas Edge Functions (Deno) quanto pelo front.

**Tech Stack:** JavaScript (ESM), React 18.3, Vite 5, react-router-dom 6, @supabase/supabase-js 2, vite-plugin-pwa 0.20, @uiw/react-codemirror 4, jspdf 2.5, qrcode 1.5, linkedom 0.18, postcss 8, quickjs-emscripten 0.31, aws4fetch 1, Vitest 2, @testing-library/react 16, Supabase CLI (via `npx supabase`).

**Spec:** `docs/superpowers/specs/2026-10-27-destrava-app-design.md`

## Roteiro geral (cada fase tem seu próprio plano)

| Fase | Conteúdo | Plano |
|---|---|---|
| **1 — Núcleo** (este) | Repo, regras de negócio, banco + RLS, login, níveis, aulas com vídeo protegido, exercícios, provas, certificados, PWA, deploy | este arquivo |
| 2 — Pagamentos | Mercado Pago: assinatura no cartão, Pix/débito mensal, certificado avulso R$ 39, combo R$ 39,99, webhook idempotente, tolerância de 3 dias, cancelamento, reembolso, upgrade/downgrade | escrito ao fim da Fase 1 |
| 3 — Admin, Platinum e lançamento | Painel admin (CRUD, upload de vídeo, importação JSON, métricas, fila de reembolso), projetos de portfólio + correção com IA + trilha de carreira, links do WhatsApp com consentimento, landing page final, páginas legais | escrito ao fim da Fase 2 |

Na Fase 1, o conteúdo entra por um script de importação (Task 8), que o admin da Fase 3 reaproveita.

## Global Constraints

- Linguagem: **JavaScript** (ESM, `.js`/`.jsx`). Sem TypeScript.
- Identificadores no código em inglês. **Todo texto visível ao aluno em português do Brasil.**
- Planos válidos: exatamente `'free' | 'gold' | 'platinum'`. Qualquer outro valor lança erro.
- Nota mínima de aprovação: **90%**, comparada sem arredondamento (`correct * 100 >= 90 * total`).
- Espera para refazer a prova: free **24 h** (86 400 000 ms), gold **2 h** (7 200 000 ms), platinum **0**. Sem limite total de tentativas.
- Vidas do plano free: **5 por dia**, recarregam à meia-noite de **America/Sao_Paulo** (UTC−3 fixo, o Brasil não tem horário de verão desde 2019).
- URL assinada de vídeo expira em **3 h** (10 800 s).
- Certificado: carga horária **fixa por nível** = `round((soma das durações das aulas em min + exerciseMinutes + examMinutes) / 60)`, mínimo 1. Para aluno free, entram só as aulas `is_free`. Um certificado por aluno por nível.
- Código do certificado: `DTV-XXXX-XXXX`, com o alfabeto `ABCDEFGHJKMNPQRSTUVWXYZ23456789`.
- Cores da marca: noite `#26215C`, roxo `#534AB7`, lavanda `#EEEDFE`, verde `#97C459`. O verde só aparece em conquista (acerto, aprovação, desbloqueio).
- Nenhuma resposta de prova chega ao navegador antes da correção. As respostas ficam em tabela sem policy de leitura.
- Custo zero: só os planos gratuitos de Supabase, Cloudflare Pages e Cloudflare R2.
- Nenhum texto promete emprego ou aprendizado em tempo irreal.

## Review Focus

1. **Aluno fecha a aba no meio da prova e reabre:** deve voltar à **mesma tentativa, com as mesmas perguntas**, e não sortear de novo para "pescar" uma prova mais fácil. Teste: Task 13, `startExam returns the open attempt`.
2. **Nota na fronteira:** 27/30 (90%) passa e 26/30 (86,67%) reprova. 89,99% nunca arredonda para 90. Teste: Task 4, `scoreAttempt boundary`.
3. **Clique duplo ou reenvio da rede no "Enviar prova":** não pode gerar duas correções nem dois certificados. Teste: Task 13, `submitExam twice`, mais a constraint `unique (user_id, level_id)` na Task 7.
4. **Código com loop infinito na questão prática da prova:** a correção expira (timeout), a questão conta como errada e a função responde normalmente. Teste: Task 6, `js-equals times out`.
5. **Aluno free chamando direto a função de vídeo de uma aula paga:** recebe 403, sem URL. Teste: Task 11, `getLessonVideoUrl forbidden for free on paid lesson`.

---

## Estrutura de arquivos

```
destrava/
  package.json                 # workspace raiz: vitest + deps usadas pelo _shared
  vitest.config.js             # roda supabase/functions/_shared/**/*.test.js
  content/
    README.md                  # formato do JSON de conteúdo
    primeiro-commit.json       # conteúdo de exemplo (2 aulas)
  scripts/
    import-content.js          # importa content/*.json para o Supabase
  supabase/
    config.toml
    migrations/0001_core.sql
    functions/
      deno.json                # import map (npm:) para as libs do _shared
      _shared/
        domain/plans.js        lives.js  access.js  exam.js  certificate.js  (+ .test.js)
        grader/cssCheck.js     grade.js  (+ .test.js)
        services/video-service.js  exam-service.js  (+ .test.js)
        repo/supabase-repo.js  # implementa a interface de repositório com o service client
        http.js                # cors, json(), auth do usuário a partir do JWT
      video-url/index.ts
      exam-start/index.ts
      exam-submit/index.ts
  web/
    package.json  vite.config.js  index.html  .env.example
    public/icons/              # ícones PWA gerados do logo E
    src/
      main.jsx  App.jsx
      lib/supabase.js  lib/api.js
      styles/tokens.css  styles/global.css
      components/Logo.jsx  Layout.jsx  Button.jsx  LockBadge.jsx
      features/auth/       SignupPage.jsx LoginPage.jsx ForgotPasswordPage.jsx ResetPasswordPage.jsx useSession.js RequireAuth.jsx
      features/levels/     DashboardPage.jsx LevelMapPage.jsx useCourse.js
      features/lessons/    LessonPage.jsx VideoPlayer.jsx
      features/exercises/  ExerciseRunner.jsx MultipleChoice.jsx FillBlank.jsx OrderBlocks.jsx CodeExercise.jsx runInBrowser.js useLives.js
      features/exams/      ExamPage.jsx ExamResultPage.jsx
      features/certificates/ CertificatesPage.jsx VerifyCertificatePage.jsx certificatePdf.js
```

Os entrypoints das Edge Functions são `.ts` só porque o Supabase espera esse nome. O conteúdo deles é JavaScript puro e só chama os serviços em `_shared`.

---

### Task 1: Esqueleto do repositório e identidade visual

**Files:**
- Create: `package.json`, `vitest.config.js`, `.gitignore`, `README.md`
- Create: `web/` (Vite React), `web/src/styles/tokens.css`, `web/src/styles/global.css`, `web/src/components/Logo.jsx`, `web/src/components/Layout.jsx`, `web/src/App.jsx`
- Test: `web/src/components/Logo.test.jsx`

**Interfaces:**
- Produces: `<Logo variant="mark"|"horizontal" theme="light"|"dark" size={number} />`; `<Layout>` com cabeçalho (logo + menu) e `<main>`; CSS custom properties `--c-night`, `--c-purple`, `--c-lavender`, `--c-green`, `--c-purple-soft: #7F77DD`.

- [ ] **Step 1:** `git init`, criar `.gitignore` (node_modules, dist, .env*, supabase/.temp) e o `package.json` raiz com `"type":"module"`, `"workspaces":["web"]` e o script `"test":"vitest run"`. `vitest.config.js` com `include: ['supabase/functions/_shared/**/*.test.js']`.
- [ ] **Step 2:** `npm create vite@5 web -- --template react`, depois instalar em `web`: `react-router-dom@6 @supabase/supabase-js@2` e, como dev, `vitest@2 @testing-library/react@16 @testing-library/jest-dom jsdom`. Configurar o `test.environment: 'jsdom'` no `web/vite.config.js`.
- [ ] **Step 3: Write the failing test** `Logo.test.jsx`:
  - `renders accessible name "Destrava"`: `render(<Logo variant="horizontal" />)` → `getByRole('img', { name: 'Destrava' })` existe e `getByText('destrava')` existe.
  - `mark variant has no wordmark`: `render(<Logo variant="mark" />)` → `queryByText('destrava')` é null.
- [ ] **Step 4:** Rodar `npm --prefix web exec vitest run` → FAIL (`Logo` não existe).
- [ ] **Step 5:** Implementar `Logo.jsx` como SVG inline do conceito E aprovado. Geometria do símbolo: `circle cx=32 cy=56 r=32` + `rect x=52 y=0 w=14 h=88 rx=7` na cor roxa (`#534AB7` no tema claro, `#7F77DD` no escuro), mais o miolo verde `circle cx=32 cy=50 r=9` + `path "M28 55 L24 74 H40 L36 55 Z"` (`#97C459`). Wordmark "destrava" em minúsculas, peso 500. `tokens.css` com as cores. `Layout.jsx` com o cabeçalho. `App.jsx` com `BrowserRouter` e uma rota `/` provisória.
- [ ] **Step 6:** Rodar os testes → PASS. `npm --prefix web run dev` abre a página com o logo.
- [ ] **Step 7: Commit** `chore: scaffold destrava repo with brand tokens and logo`

---

### Task 2: Regras de plano e de acesso

**Files:**
- Create: `supabase/functions/_shared/domain/plans.js`, `supabase/functions/_shared/domain/access.js`
- Test: `supabase/functions/_shared/domain/plans.test.js`, `access.test.js`

**Interfaces:**
- Produces (`plans.js`): `PLANS = ['free','gold','platinum']`; `assertPlan(plan) -> plan` (lança `Error('Unknown plan: x')`); `retakeCooldownMs(plan) -> number`; `includesCertificate(plan) -> boolean` (false só no free).
- Produces (`access.js`):
  - `canAccessLevel({ plan, levelPosition, passedLevelPositions: number[] }) -> boolean`
  - `canWatchLesson({ plan, levelPosition, levelUnlocked, lesson: { position, isFree, isSample }, previousLessonDone }) -> boolean`
  - `canTakeExam({ plan, levelPosition, levelUnlocked }) -> boolean`
  - `isLessonDone({ exerciseIds: string[], correctExerciseIds: Set<string> }) -> boolean`
  - `certificateStatusOnPass(plan) -> 'active' | 'locked'`

- [ ] **Step 1: Write the failing tests:**
  - `retakeCooldownMs`: free → `86_400_000`, gold → `7_200_000`, platinum → `0`. `assertPlan('vip')` lança erro.
  - `canAccessLevel`: o nível 1 é sempre `true`. Nível 2 com gold e `[1]` → true. Nível 2 com gold e `[]` → false. **Nível 2 com free e `[1]` → false.**
  - `canWatchLesson`:
    - free, nível 3, `{isSample:true}`, `levelUnlocked:false` → **true** (amostra ignora as travas).
    - free, nível 1, `{position:2,isFree:false}` → false.
    - free, nível 1, `{position:2,isFree:true}`, `previousLessonDone:false` → false; com `true` → true.
    - gold, nível 2, `levelUnlocked:true`, `{position:1}` → true (primeira aula não depende de anterior).
    - gold, nível 2, `levelUnlocked:false`, `{position:1,isSample:true}` → **true** (amostra também vale para pagante).
  - `canTakeExam`: free nível 1 → true; free nível 2 com `levelUnlocked:true` → false; gold nível 2 com `levelUnlocked:true` → true.
  - `isLessonDone`: sem exercícios → true; com `['a','b']` e `{'a'}` → false.
  - `certificateStatusOnPass`: free → `'locked'`, gold → `'active'`.
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Implementar. Regra do free em `canWatchLesson`: fora as amostras, só o nível 1, só aulas `isFree`, e na ordem (`previousLessonDone` se refere à aula free anterior, calculada por quem chama). Pagante: `levelUnlocked && (lesson.position === 1 || previousLessonDone)`.
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5: Commit** `feat: plan and access rules`

---

### Task 3: Vidas do plano grátis

**Files:**
- Create: `supabase/functions/_shared/domain/lives.js`
- Test: `supabase/functions/_shared/domain/lives.test.js`

**Interfaces:**
- Produces: `MAX_LIVES = 5`; `startOfDaySaoPaulo(now: Date) -> Date` (instante UTC da meia-noite local); `nextLivesResetAt(now: Date) -> Date`; `livesRemaining({ plan, errorsToday }) -> number | Infinity` (pagante → `Infinity`); `currentStreakDays({ activityDates: Date[], now: Date }) -> number` (dias seguidos, no fuso de SP, com pelo menos um exercício feito; hoje ainda sem atividade não quebra a sequência de ontem); `xpFor({ correctExercises, passedExams }) -> number` = `correctExercises * 10 + passedExams * 100`.

- [ ] **Step 1: Write the failing tests:**
  - `currentStreakDays`: atividade em 25, 26 e 27/10 (SP), `now` = 27/10 → 3. Atividade em 25 e 26, `now` = 27/10 → 2. Atividade em 24 e 26, `now` = 27/10 → 1. Sem atividade → 0.
  - `xpFor({ correctExercises: 7, passedExams: 1 })` → 170.
  - `startOfDaySaoPaulo(new Date('2026-10-27T02:30:00Z'))` → `2026-10-26T03:00:00.000Z` (23h30 do dia 26 em SP).
  - `startOfDaySaoPaulo(new Date('2026-10-27T03:00:00Z'))` → `2026-10-27T03:00:00.000Z`.
  - `nextLivesResetAt(new Date('2026-10-27T15:00:00Z'))` → `2026-10-28T03:00:00.000Z`.
  - `livesRemaining({plan:'free', errorsToday:2})` → 3; `errorsToday:7` → 0 (nunca negativo); `plan:'gold'` → `Infinity`.
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Implementar com o offset fixo de −3 h (sem libs de fuso).
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5: Commit** `feat: daily lives for free plan`

---

### Task 4: Regras da prova

**Files:**
- Create: `supabase/functions/_shared/domain/exam.js`
- Test: `supabase/functions/_shared/domain/exam.test.js`

**Interfaces:**
- Produces:
  - `PASS_PERCENT = 90`
  - `drawQuestions(bank: Array<{id}>, count: number, random = Math.random) -> Array` (Fisher–Yates, sem repetição; lança `Error('Question bank too small')` se `bank.length < count`)
  - `scoreAttempt({ questions: Array<{id, topic}>, results: Record<id, boolean> }) -> { correct, total, percent, passed, wrongTopics: string[] }`. `percent = Math.floor(correct*100/total)`, `passed = correct*100 >= PASS_PERCENT*total`, `wrongTopics` únicos e ordenados. Uma questão sem resultado conta como errada.
  - `nextAttemptAt({ lastSubmittedAt: Date | null, plan }) -> Date | null` (null = pode agora)

- [ ] **Step 1: Write the failing tests:**
  - `drawQuestions`: banco com 60 itens e count 20 → 20 ids únicos, todos do banco. Com um `random` fixo (ex.: `() => 0`) o resultado é determinístico. Banco com 5 e count 20 → lança erro.
  - **`scoreAttempt boundary`**: 27/30 → `{percent:90, passed:true}`; 26/30 → `{percent:86, passed:false}`; 179/200 (89,5%) → `{percent:89, passed:false}`; 20/20 → 100, true.
  - `wrongTopics`: erros em `['css','html','css']` → `['css','html']`.
  - `nextAttemptAt`: free com envio em `2026-10-27T10:00Z` → `2026-10-28T10:00Z`; gold → `2026-10-27T12:00Z`; platinum → null; `lastSubmittedAt:null` → null.
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Implementar (`nextAttemptAt` usa `retakeCooldownMs` da Task 2 e devolve null quando o cooldown é 0).
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5: Commit** `feat: exam drawing, scoring and cooldown`

---

### Task 5: Regras do certificado

**Files:**
- Create: `supabase/functions/_shared/domain/certificate.js`
- Test: `supabase/functions/_shared/domain/certificate.test.js`

**Interfaces:**
- Produces:
  - `computeWorkloadHours({ lessonDurationsSeconds: number[], exerciseMinutes: number, examMinutes: number }) -> number`
  - `CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'`
  - `generateCertificateCode(randomBytes = (n) => crypto.getRandomValues(new Uint8Array(n))) -> string` (formato `DTV-XXXX-XXXX`, índice = `byte % alphabet.length`)

- [ ] **Step 1: Write the failing tests:**
  - 12 aulas de 1 500 s (300 min) + exercícios 240 + prova 60 = 600 min → **10**.
  - 2 aulas de 1 200 s (40 min) + 0 + 0 → **1** (mínimo).
  - 3 aulas de 1 800 s (90 min) + 0 + 0 → **2** (1,5 arredonda para cima).
  - O código casa com `/^DTV-[ABCDEFGHJKMNPQRSTUVWXYZ23456789]{4}-[ABCDEFGHJKMNPQRSTUVWXYZ23456789]{4}$/`. Com `randomBytes` fixo, o código é determinístico.
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Implementar.
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5: Commit** `feat: certificate workload and code`

---

### Task 6: Corretor de código (servidor) e formato dos testes

**Files:**
- Create: `supabase/functions/_shared/grader/cssCheck.js`, `supabase/functions/_shared/grader/grade.js`, `supabase/functions/deno.json`
- Test: `supabase/functions/_shared/grader/grade.test.js`
- Modify: `package.json` (adicionar `linkedom@0.18 postcss@8 quickjs-emscripten@0.31`)

**Interfaces:**
- Formato de teste (o mesmo para exercício e prova, documentado em `content/README.md` na Task 8):
  - `{ type: 'dom-exists', selector }`
  - `{ type: 'dom-text', selector, equals }` (compara `textContent.trim()`)
  - `{ type: 'css-decl', selector, property, value }` (procura no CSS e nos `<style>` do HTML uma regra com o **seletor exato** que declare `property: value`, comparando em minúsculas e sem espaços extras)
  - `{ type: 'js-equals', expression, equals }` (avalia `expression` depois do código JS do aluno e compara com `equals` por igualdade profunda de JSON)
- Produces:
  - `findCssDeclaration(cssText: string, { selector, property, value }) -> boolean` (`cssCheck.js`, puro, usado também pelo navegador)
  - `gradeCode({ html = '', css = '', js = '' }, tests) -> Promise<{ passed: boolean, results: Array<{ index, passed, message }> }>` (`passed` é true só se todos os testes passarem)

- [ ] **Step 1: Write the failing tests:**
  - `dom-exists`: html `<h1>Oi</h1>`, selector `h1` → passa; selector `h2` → falha, com a mensagem `Não encontrei o elemento h2.`
  - `dom-text`: `<p class="a"> Olá </p>`, `.a` equals `Olá` → passa.
  - `css-decl`: css `.box { display: FLEX; }` → `{selector:'.box', property:'display', value:'flex'}` passa. O mesmo CSS dentro de `<style>` no html também passa. Seletor `.caixa` → falha.
  - `js-equals`: js `function soma(a,b){return a+b}`, `soma(2,3)` equals 5 → passa. `[1,2]` contra `[1,2]` → passa.
  - **`js-equals times out`**: js `while(true){}` → resolve em menos de 3 s com `passed:false` e mensagem `Seu código demorou demais (possível loop infinito).`
  - Erro de sintaxe no js → `passed:false` e a mensagem começa com `Erro no seu código:`.
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Implementar. HTML com `parseHTML` do linkedom. CSS com `postcss.parse` (juntando o `css` e o texto dos `<style>`). JS no QuickJS (`newQuickJSWASMModule` / `getQuickJS`) com `runtime.setInterruptHandler` cortando em **1 000 ms** e `setMemoryLimit(32 * 1024 * 1024)`. A QuickJS não tem DOM, então o `js-equals` só avalia JS puro. `deno.json` mapeia `linkedom`, `postcss` e `quickjs-emscripten` para `npm:` nas mesmas versões.
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5: Commit** `feat: server-side code grader`

---

### Task 7: Banco de dados, RLS e verificação pública de certificado

**Files:**
- Create: `supabase/config.toml` (via `npx supabase init`), `supabase/migrations/0001_core.sql`
- Create: `supabase/tests/rls-check.sql` (consultas de verificação manual, comentadas)

**Interfaces (tabelas, todas com RLS ligado):**
- `profiles(id uuid pk → auth.users on delete cascade, full_name text, plan text not null default 'free' check (plan in ('free','gold','platinum')), role text not null default 'student' check (role in ('student','admin')), created_at timestamptz default now())`. Trigger `on_auth_user_created` cria o profile com `full_name` vindo de `raw_user_meta_data->>'full_name'`. Policy: o usuário lê o próprio profile e atualiza só `full_name`. **`plan` e `role` só mudam com o service role** (o update pelo usuário é feito por uma função `update_my_name(new_name text)` security definer).
- `levels(id uuid pk, position int unique not null, slug text unique, name text, description text)`. Leitura pública.
- `lessons(id uuid pk, level_id → levels, position int, title, description, duration_seconds int not null, video_key text, captions_key text, is_free bool default false, is_sample bool default false, unique(level_id, position))`. Leitura para `authenticated`.
- `exercises(id uuid pk, lesson_id → lessons, position int, type text check in ('multiple_choice','fill_blank','order_blocks','code'), topic text, prompt jsonb, solution jsonb, explanation text)`. Leitura para `authenticated`. A solução fica visível de propósito (decisão do spec: burlar exercício não traz vantagem).
- `exercise_attempts(id bigserial, user_id → auth.users default auth.uid(), exercise_id → exercises, correct bool, created_at timestamptz default now())`. O usuário insere e lê só as próprias.
- `lesson_progress(user_id, lesson_id, watched_seconds int default 0, updated_at, primary key(user_id, lesson_id))`. O usuário faz upsert e lê só as próprias.
- `exam_configs(level_id pk → levels, question_count int default 20, exercise_minutes int, exam_minutes int)`. Leitura para `authenticated`.
- `exam_questions(id uuid pk, level_id, type text check in ('multiple_choice','code'), topic, prompt jsonb)`. **Sem policy de leitura** (só o service role).
- `exam_answers(question_id pk → exam_questions, answer jsonb)`. **Sem policy de leitura.** Para múltipla escolha: `{ "correctIndex": n }`. Para código: `{ "tests": [...] }`.
- `exam_attempts(id uuid pk, user_id, level_id, question_ids uuid[], started_at, submitted_at timestamptz null, correct int, total int, percent int, passed bool, wrong_topics text[])`. O usuário só lê as próprias, sem insert nem update (quem escreve é a Edge Function). Índice parcial `unique (user_id, level_id) where submitted_at is null` (no máximo uma tentativa aberta).
- `certificates(id uuid pk, code text unique, user_id, level_id, full_name text, workload_hours int, score int, status text check in ('active','locked','revoked'), issued_at timestamptz default now(), unique(user_id, level_id))`. O usuário lê só os próprios.
- Função `verify_certificate(p_code text)` security definer, executável por `anon`. Retorna `full_name, level_name, workload_hours, score, issued_at, status` do código, e nada mais (sem e-mail nem ids).
- Seed na migração: os 5 níveis (`position` 1–5, nome do 1 = `Primeiro Commit`, nomes 2–5 = `Nível 2` … `Nível 5`, editáveis depois).

- [ ] **Step 1:** O fundador cria um projeto grátis em supabase.com (região São Paulo) e anota a URL, a `anon key` e a `service_role key`. Depois `npx supabase init` e `npx supabase link --project-ref <ref>`.
- [ ] **Step 2:** Escrever `0001_core.sql` conforme acima.
- [ ] **Step 3:** `npx supabase db push` → aplica sem erro.
- [ ] **Step 4: Verificação de RLS** (`rls-check.sql`, rodando no SQL editor com `set role authenticated; set request.jwt.claims = '{"sub":"<uuid de teste>"}';`):
  - `select * from exam_answers` → 0 linhas.
  - `select * from exam_questions` → 0 linhas.
  - `update profiles set plan='platinum' where id = auth.uid()` → 0 linhas afetadas ou erro.
  - `select * from verify_certificate('DTV-XXXX-XXXX')` como `anon` → 0 linhas, sem erro.
- [ ] **Step 5: Commit** `feat: core schema with RLS and certificate verification`

---

### Task 8: Formato do conteúdo e script de importação

**Files:**
- Create: `content/README.md`, `content/primeiro-commit.json`, `scripts/import-content.js`, `scripts/validate-content.js`
- Test: `scripts/validate-content.test.js` (adicionar `scripts/**/*.test.js` ao include do vitest)

**Interfaces:**
- Formato (um arquivo por nível):
```json
{
  "level": { "position": 1, "slug": "primeiro-commit", "name": "Primeiro Commit", "description": "…" },
  "exam": { "questionCount": 20, "exerciseMinutes": 240, "examMinutes": 60 },
  "lessons": [{
    "position": 1, "title": "…", "durationSeconds": 1500, "videoKey": "n1/a01.mp4", "captionsKey": "n1/a01.vtt",
    "isFree": true, "isSample": false,
    "exercises": [{ "position": 1, "type": "multiple_choice", "topic": "html",
      "prompt": { "question": "…", "options": ["…","…"] }, "solution": { "correctIndex": 0 }, "explanation": "…" }]
  }],
  "examQuestions": [{ "type": "code", "topic": "html",
    "prompt": { "statement": "…", "starter": { "html": "" } }, "answer": { "tests": [{ "type": "dom-exists", "selector": "h1" }] } }]
}
```
  - `fill_blank`: prompt `{ code: "…___…", blanks: 1 }`, solution `{ answers: ["…"] }` (comparação sem diferença de maiúsculas/espaços).
  - `order_blocks`: prompt `{ blocks: ["…"] }` (o app embaralha na tela), solution `{ order: [0,1,2] }`.
  - `code`: prompt `{ statement, starter: { html?, css?, js? } }`, solution `{ tests: [...] }` (formato da Task 6).
- Produces: `validateContent(json) -> string[]` (lista de erros em português, vazia se estiver válido); `node scripts/import-content.js content/primeiro-commit.json` faz upsert por (`level.position`, `lesson.position`, `exercise.position`). As perguntas de prova são substituídas a cada importação.

- [ ] **Step 1: Write the failing tests** para `validateContent`:
  - O exemplo `content/primeiro-commit.json` → `[]`.
  - `type` desconhecido → contém `Aula 1, exercício 1: tipo "xyz" inválido.`
  - Teste de código com `type` desconhecido → erro.
  - `examQuestions.length < exam.questionCount` → `Banco de prova tem 5 perguntas, mas a prova pede 20.`
  - `durationSeconds` ausente → erro.
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Implementar o validador. O import usa `@supabase/supabase-js` com `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` vindos do ambiente, e se recusa a rodar se `validateContent` retornar erros. Escrever `primeiro-commit.json` com **2 aulas de exemplo** (uma `isFree`), 4 exercícios (um de cada tipo), `questionCount: 4` e 6 perguntas de prova (com pelo menos 1 de código). É só para testar o app. O conteúdo real vem do projeto de conteúdo.
- [ ] **Step 4:** `npm test` → PASS. `node scripts/import-content.js content/primeiro-commit.json` → `Importado: 1 nível, 2 aulas, 4 exercícios, 6 perguntas.`
- [ ] **Step 5:** Documentar o formato completo em `content/README.md` (em português, para o fundador e para o projeto de conteúdo).
- [ ] **Step 6: Commit** `feat: content format, validator and importer`

---

### Task 9: Cadastro, login e recuperação de senha

**Files:**
- Create: `web/src/lib/supabase.js`, `web/.env.example`, `web/src/features/auth/*` (ver estrutura)
- Modify: `web/src/App.jsx`
- Test: `web/src/features/auth/SignupPage.test.jsx`

**Interfaces:**
- Produces: `supabase` (client com `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`); `useSession() -> { session, profile, loading }` (o profile vem de `profiles`); `<RequireAuth>` redireciona para `/entrar`. Rotas: `/cadastro`, `/entrar`, `/esqueci-senha`, `/nova-senha`.

- [ ] **Step 1: Write the failing test** (`supabase` mockado):
  - Enviar com senha de 7 caracteres → mostra `A senha precisa ter pelo menos 8 caracteres.` e não chama `signUp`.
  - Enviar sem marcar o aceite dos termos → mostra `Você precisa aceitar os termos de uso.`
  - Envio válido → chama `supabase.auth.signUp({ email, password, options: { data: { full_name } } })` e mostra `Enviamos um link de confirmação para o seu e-mail.`
- [ ] **Step 2:** `npm --prefix web exec vitest run` → FAIL.
- [ ] **Step 3:** Implementar as páginas. Campos do cadastro: nome completo, e-mail, senha, checkbox "Li e aceito os termos de uso e a política de privacidade" (links para `/termos` e `/privacidade`, páginas provisórias com o aviso "Texto provisório"). Login com `signInWithPassword`. A recuperação usa `resetPasswordForEmail` com `redirectTo` para `/nova-senha`. Erros do Supabase são traduzidos (ex.: `Invalid login credentials` → `E-mail ou senha incorretos.`).
- [ ] **Step 4:** Testes → PASS. Teste manual: criar conta, confirmar o e-mail, entrar, sair, recuperar a senha.
- [ ] **Step 5: Commit** `feat: signup, login and password recovery`

---

### Task 10: Painel do aluno e mapa de níveis

**Files:**
- Create: `web/src/features/levels/useCourse.js`, `DashboardPage.jsx`, `LevelMapPage.jsx`, `web/src/components/LockBadge.jsx`
- Test: `web/src/features/levels/buildCourseState.test.js`

**Interfaces:**
- Consumes: `canAccessLevel`, `canWatchLesson`, `canTakeExam`, `isLessonDone` (Task 2), `livesRemaining`, `currentStreakDays`, `xpFor` (Task 3), importados de `../../../../supabase/functions/_shared/domain/*.js` via alias Vite `@domain`.
- Produces: `buildCourseState({ plan, levels, lessons, exercises, correctExerciseIds, passedLevelPositions }) -> Array<{ level, unlocked, examAvailable, lessons: Array<{ lesson, done, watchable }> }>` (puro, em `useCourse.js`); `useCourse() -> { state, loading, refresh }`. Rotas `/painel` (próxima aula, vidas restantes se for free, sequência de dias, XP) e `/niveis`. Conquistas com medalhas ficam para a Fase 3, e a Fase 1 entrega só a sequência e o XP.

- [ ] **Step 1: Write the failing tests** para `buildCourseState`:
  - Gold sem nada aprovado → nível 1 `unlocked`, nível 2 trancado, aula 1 do nível 1 `watchable`, aula 2 não.
  - Gold com todos os exercícios da aula 1 corretos → aula 2 `watchable`.
  - Free → a aula `isSample` do nível 3 é `watchable`, e o nível 3 continua `unlocked:false`.
  - `previousLessonDone` do free considera **só as aulas free anteriores** (pula a aula paga no meio).
- [ ] **Step 2:** FAIL → implementar → PASS.
- [ ] **Step 3:** Telas: o mapa mostra os 5 degraus em sequência, com cadeado (`LockBadge`) nos trancados e verde nos aprovados. Clicar num nível trancado do free abre o aviso "Disponível no plano Gold", ainda sem checkout (Fase 2).
- [ ] **Step 4: Commit** `feat: dashboard and level map`

---

### Task 11: Aula com vídeo protegido (R2)

**Files:**
- Create: `supabase/functions/_shared/services/video-service.js`, `supabase/functions/_shared/http.js`, `supabase/functions/_shared/repo/supabase-repo.js`, `supabase/functions/video-url/index.ts`
- Create: `web/src/lib/api.js`, `web/src/features/lessons/LessonPage.jsx`, `VideoPlayer.jsx`
- Test: `supabase/functions/_shared/services/video-service.test.js`

**Interfaces:**
- Repositório (interface usada pelas Tasks 11 e 13, implementada em `supabase-repo.js` e com fake em memória nos testes):
  - `getProfile(userId) -> { plan, fullName }`
  - `getLesson(lessonId) -> { id, levelId, levelPosition, position, isFree, isSample, videoKey, captionsKey }`
  - `getPassedLevelPositions(userId) -> number[]`
  - `isPreviousLessonDone(userId, lesson, plan) -> boolean`
- Produces: `getLessonVideoUrl({ userId, lessonId, repo, presign, now }) -> { url, captionsUrl | null, expiresAt }`, que lança `HttpError(403, 'Você não tem acesso a esta aula.')`. `presign(key, expiresSeconds) -> Promise<string>`, implementado com `aws4fetch` (`AwsClient.sign(..., { aws: { signQuery: true } })` com `X-Amz-Expires=10800`). `http.js`: `withAuth(handler)` (valida o JWT com `supabase.auth.getUser` e injeta `userId`), `json(body, status)`, CORS.
- Front: `api.getVideoUrl(lessonId)` → `supabase.functions.invoke('video-url', { body: { lessonId } })`.

- [ ] **Step 1: Write the failing tests:**
  - **`getLessonVideoUrl forbidden for free on paid lesson`**: free, aula do nível 1 com `isFree:false` → 403, e o `presign` **não** é chamado.
  - Free na amostra do nível 4 → retorna a url, e o `presign` recebe `(videoKey, 10800)`.
  - Gold no nível 2 sem o nível 1 aprovado, aula não-amostra → 403.
  - `expiresAt` = `now + 10800 s`.
  - Sem `captionsKey` → `captionsUrl: null`.
- [ ] **Step 2:** FAIL → implementar → PASS.
- [ ] **Step 3:** O fundador cria uma conta Cloudflare, um bucket R2 `destrava-videos` e um token de API R2 só de leitura e escrita nesse bucket. Configurar os secrets: `npx supabase secrets set R2_ACCOUNT_ID=… R2_ACCESS_KEY_ID=… R2_SECRET_ACCESS_KEY=… R2_BUCKET=destrava-videos`. Subir um MP4 de teste em `n1/a01.mp4`.
- [ ] **Step 4:** `npx supabase functions deploy video-url --use-api` → a chamada pelo app toca o vídeo.
- [ ] **Step 5:** `LessonPage`: player HTML5 com velocidades 1 / 1.25 / 1.5 / 2, `<track kind="captions">` quando houver legenda, retomada pelo `lesson_progress.watched_seconds` (salva a cada 15 s e no `pause`) e lista das aulas do nível ao lado. Quando a URL expira (erro no `<video>`), pede uma nova e retoma do mesmo ponto.
- [ ] **Step 6: Commit** `feat: lesson page with signed R2 video`

---

### Task 12: Exercícios estilo Duolingo

**Files:**
- Create: `web/src/features/exercises/*` (ver estrutura)
- Test: `web/src/features/exercises/checkAnswer.test.js`, `MultipleChoice.test.jsx`

**Interfaces:**
- Consumes: `findCssDeclaration` (Task 6), `livesRemaining`, `nextLivesResetAt` (Task 3).
- Produces:
  - `checkAnswer(exercise, answer) -> Promise<{ correct: boolean, messages: string[] }>`, em `ExerciseRunner.jsx` ou num `checkAnswer.js` separado. Múltipla escolha compara o índice. Lacuna compara sem diferença de maiúsculas e espaços. Ordenar compara a ordem exata. Código usa `runInBrowser`.
  - `runInBrowser({ html, css, js }, tests) -> Promise<{ passed, results }>`, com o mesmo formato de `gradeCode`. Roda num `<iframe sandbox="allow-scripts">` invisível via `srcdoc`, conversa por `postMessage` e tem timeout de 2 s. `css-decl` usa `findCssDeclaration` (comportamento idêntico ao do servidor).
  - `useLives() -> { remaining, resetAt, spend() }`, que conta os erros de hoje em `exercise_attempts`.
- Cada resposta insere uma linha em `exercise_attempts`. Ao zerar as vidas (free): `Suas vidas acabaram. Elas voltam à meia-noite — ou destrave vidas infinitas no Gold.`

- [ ] **Step 1: Write the failing tests** para `checkAnswer` (sem iframe):
  - Múltipla escolha: índice 1 com `correctIndex 1` → correto.
  - Lacuna: `" Display "` contra `["display"]` → correto.
  - Ordenar: `[0,2,1]` contra `[0,1,2]` → errado.
  - `MultipleChoice.test.jsx`: escolher a opção certa e confirmar mostra `Correto!` e a explicação. A errada mostra `Quase!` e a explicação.
- [ ] **Step 2:** FAIL → implementar → PASS.
- [ ] **Step 3:** O editor de código usa `@uiw/react-codemirror` com as extensões de html, css e js, abas por arquivo do `starter`, botão "Testar" e pré-visualização ao vivo no iframe. O verde aparece só no acerto.
- [ ] **Step 4:** Teste manual no celular (largura de 375 px): os quatro tipos usáveis com o polegar e o teclado sem cobrir o botão.
- [ ] **Step 5: Commit** `feat: duolingo-style exercises with lives`

---

### Task 13: Provas (servidor e telas)

**Files:**
- Create: `supabase/functions/_shared/services/exam-service.js`, `supabase/functions/exam-start/index.ts`, `supabase/functions/exam-submit/index.ts`
- Modify: `supabase/functions/_shared/repo/supabase-repo.js`
- Create: `web/src/features/exams/ExamPage.jsx`, `ExamResultPage.jsx`
- Test: `supabase/functions/_shared/services/exam-service.test.js`

**Interfaces:**
- Consumes: `canAccessLevel`, `canTakeExam`, `certificateStatusOnPass` (Task 2); `drawQuestions`, `scoreAttempt`, `nextAttemptAt` (Task 4); `computeWorkloadHours`, `generateCertificateCode` (Task 5); `gradeCode` (Task 6).
- Repositório (além do da Task 11): `getLevel(levelId) -> { id, position, name }`, `getExamConfig(levelId)`, `getQuestionBank(levelId) -> Array<{ id, type, topic, prompt, answer }>`, `getOpenAttempt(userId, levelId)`, `getLastSubmittedAttempt(userId, levelId)`, `createAttempt({ userId, levelId, questionIds, startedAt })`, `getAttempt(attemptId)`, `getQuestionsByIds(ids)` (com answer), `submitAttemptIfOpen(attemptId, result) -> boolean` (`update … where submitted_at is null`; false se já tinha sido enviada), `getWorkloadInputs(levelId, { freeOnly }) -> { lessonDurationsSeconds, exerciseMinutes, examMinutes }`, `getCertificate(userId, levelId)`, `createCertificate(row)`.
- Produces:
  - `startExam({ userId, levelId, repo, now, random }) -> { attemptId, questions: Array<{ id, type, topic, prompt }> }` (**sem** answer). Erros `HttpError` com `code`: `LEVEL_LOCKED` (403), `PLAN_NOT_ALLOWED` (403), `ALREADY_PASSED` (409), `COOLDOWN` (429, com `retryAt` ISO).
  - `submitExam({ userId, attemptId, answers: Record<questionId, number | {html,css,js}>, repo, now }) -> { percent, passed, wrongTopics, nextAttemptAt | null, certificate: { code, status } | null }`. Erros: `ATTEMPT_NOT_FOUND` (404, também quando a tentativa é de outro usuário), `ALREADY_SUBMITTED` (409).

- [ ] **Step 1: Write the failing tests** (repositório fake em memória):
  - **`startExam returns the open attempt`**: chamar duas vezes sem enviar → o mesmo `attemptId` e os mesmos ids de pergunta, e `createAttempt` chamado uma vez só.
  - As perguntas retornadas não têm a chave `answer`.
  - Free no nível 2 → `PLAN_NOT_ALLOWED`. Gold no nível 2 sem o 1 aprovado → `LEVEL_LOCKED`.
  - Gold reprovado às 10:00, tentando às 11:00 → `COOLDOWN` com `retryAt` às 12:00. Às 12:00 → permitido. Platinum logo depois de reprovar → permitido.
  - Já aprovado no nível → `ALREADY_PASSED`.
  - `submitExam`: 4 perguntas, 4 certas → `passed`, certificado `active` para gold, com `workload_hours` de `computeWorkloadHours` e `score` 100. Para free → `locked`, e `getWorkloadInputs` chamado com `{ freeOnly: true }`.
  - 3/4 → reprovado, `wrongTopics` preenchido, `nextAttemptAt` conforme o plano, sem certificado.
  - Questão de código: a resposta passa pelo `gradeCode` com os `answer.tests`. Resposta ausente conta como errada.
  - **`submitExam twice`**: a segunda chamada → `ALREADY_SUBMITTED`, e `createCertificate` chamado uma vez só.
  - A tentativa de outro usuário → `ATTEMPT_NOT_FOUND`.
- [ ] **Step 2:** FAIL → implementar → PASS.
- [ ] **Step 3:** O `full_name` do certificado vem do profile. Antes de iniciar a prova, a tela pede para o aluno confirmar o nome completo, com o aviso `Este nome vai no seu certificado e não poderá ser alterado depois.` (salvo por `update_my_name`).
- [ ] **Step 4:** Deploy: `npx supabase functions deploy exam-start --use-api` e `npx supabase functions deploy exam-submit --use-api`. **Smoke test do QuickJS no Edge Runtime**: enviar uma prova com questão `js-equals` e conferir a correção. Se o WASM não carregar no runtime, parar e reportar antes de seguir.
- [ ] **Step 5:** Telas. `ExamPage`: uma pergunta por vez, barra de progresso, e o botão "Enviar prova" desativado enquanto envia, só para evitar clique duplo, porque a proteção de verdade está no servidor. `ExamResultPage`: aprovado mostra a nota em verde e o link para o certificado. Reprovado mostra a nota, os assuntos para revisar (com links para as aulas desses tópicos) e o horário exato em que pode tentar de novo. Texto de `COOLDOWN`: `Você poderá tentar de novo às 12:00 de 27/10.`
- [ ] **Step 6: Commit** `feat: level exams graded on the server`

---

### Task 14: Certificados (lista, PDF e verificação pública)

**Files:**
- Create: `web/src/features/certificates/CertificatesPage.jsx`, `VerifyCertificatePage.jsx`, `certificatePdf.js`
- Test: `web/src/features/certificates/certificatePdf.test.js`

**Interfaces:**
- Produces: `buildCertificateLines({ fullName, levelName, workloadHours, score, issuedAt, code }) -> string[]` (puro, testável); `downloadCertificatePdf(cert)` (jsPDF em A4 paisagem com estampa, selo, logo, as linhas e um QR com `qrcode.toDataURL(`${origin}/certificado/${code}`)`). Rotas `/certificados` e `/certificado/:code` (pública, chama `supabase.rpc('verify_certificate', { p_code })`).

- [ ] **Step 1: Write the failing test:**
  - `buildCertificateLines({ fullName:'Ana Souza', levelName:'Primeiro Commit', workloadHours:10, score:94, issuedAt:'2026-10-27T15:00:00Z', code:'DTV-7K2M-QX9P' })` contém, nessa ordem: `Certificamos que Ana Souza`, `concluiu o nível Primeiro Commit da Destrava`, `com carga horária de 10 horas e média 94%.`, `Emitido em 27/10/2026 · Código DTV-7K2M-QX9P` (data no fuso de São Paulo).
  - `workloadHours: 1` → `carga horária de 1 hora`.
- [ ] **Step 2:** FAIL → implementar → PASS.
- [ ] **Step 3:** `CertificatesPage`: os certificados `active` têm o botão "Baixar PDF". Os `locked` mostram `Certificado conquistado! Destrave por R$ 39 ou assine o Gold.` (o botão de compra fica para a Fase 2). `VerifyCertificatePage`: `active` → `Certificado válido`, em verde, com nome, nível, horas, média e data. `revoked` → `Este certificado foi revogado.` `locked` ou inexistente → `Certificado não encontrado.`
- [ ] **Step 4: Commit** `feat: certificates with pdf and public verification`

---

### Task 15: PWA e publicação

**Files:**
- Modify: `web/vite.config.js`, `web/index.html`
- Create: `web/public/icons/*` (192, 512, maskable 512, apple-touch 180), `web/public/_redirects`

**Interfaces:**
- Consumes: o SVG do símbolo de `Logo.jsx` (Task 1) para gerar os ícones (fundo `#26215C`, raio de 22%).

- [ ] **Step 1:** `vite-plugin-pwa@0.20` com `registerType: 'autoUpdate'` e manifest `{ name: 'Destrava', short_name: 'Destrava', lang: 'pt-BR', theme_color: '#26215C', background_color: '#EEEDFE', display: 'standalone', start_url: '/painel' }`. **Não** fazer cache de vídeo nem de chamadas ao Supabase, só do shell estático.
- [ ] **Step 2:** `_redirects` com `/* /index.html 200` (rotas da SPA).
- [ ] **Step 3:** `npm --prefix web run build` → sem erro. O Lighthouse (aba PWA do Chrome) mostra "Installable".
- [ ] **Step 4:** O fundador conecta o repositório GitHub ao Cloudflare Pages (build `npm --prefix web run build`, output `web/dist`, variáveis `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`). No Supabase Auth, colocar `https://destrava.pages.dev` em Site URL e Redirect URLs.
- [ ] **Step 5: Teste de aceitação de ponta a ponta** em `destrava.pages.dev`, no celular e no computador:
  1. Cadastro → confirmação por e-mail → login.
  2. Conta free: assiste à aula free, faz os exercícios, perde as 5 vidas e vê o aviso.
  3. Faz a prova do Primeiro Commit: reprova → vê o horário de amanhã. Mudar `plan` para `gold` no banco → espera de 2 h.
  4. Passa com 90% ou mais → o certificado aparece. Abrir o QR no celular → `Certificado válido`.
  5. Instalar o app na tela inicial do celular.
- [ ] **Step 6: Commit** `feat: installable PWA and deploy config`

---

## Notas para quem executa

- O fundador precisa fazer à mão, em sites de terceiros: criar as contas do Supabase e da Cloudflare, gerar as chaves e conectar o GitHub. O executor pede essas ações na hora e **nunca** pede as senhas dele.
- Nunca commitar `.env*` nem a `service_role key`.
- O `npx supabase functions deploy … --use-api` dispensa o Docker. Testes locais de Edge Function com Docker são opcionais.
