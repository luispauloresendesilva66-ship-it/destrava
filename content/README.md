# Conteúdo do Destrava

O conteúdo do curso (níveis, aulas, exercícios e banco de perguntas da prova) fica em **um arquivo JSON por nível**, nesta pasta. Um validador confere o arquivo e um script de importação grava tudo no Supabase.

O arquivo `primeiro-commit.json` é só um **exemplo** para testar o app. O conteúdo real vem do projeto de conteúdo e segue exatamente este formato.

## Como importar

1. Copie `.env.example` para `.env` (na raiz do repositório) e preencha:
   - `SUPABASE_URL`: endereço do projeto (Project Settings > API).
   - `SUPABASE_SERVICE_ROLE_KEY`: chave `service_role` (mesma tela). **É secreta.** O `.env` já é ignorado pelo Git. Nunca cole essa chave no app, em chat ou em commit.
2. Rode:

```
node scripts/import-content.js content/primeiro-commit.json
```

Para usar outro arquivo de variáveis: `node scripts/import-content.js content/nivel.json --env-file caminho/do/arquivo.env`.

Se o JSON tiver erros, o script lista todos em português e **não importa nada**. Se faltar `SUPABASE_URL` ou `SUPABASE_SERVICE_ROLE_KEY`, ele avisa e para.

Resultado esperado: `Importado: 1 nível, 2 aulas, 7 exercícios, 6 perguntas.`

### O que a importação faz

- **Nível**: criado ou atualizado pela `position`.
- **Aulas**: criadas ou atualizadas pela dupla (`level.position`, `lesson.position`).
- **Exercícios**: criados ou atualizados pela dupla (aula, `exercise.position`).
- **Configuração da prova**: criada ou atualizada para o nível.
- **Perguntas da prova**: **substituídas a cada importação**. As perguntas e respostas antigas do nível são apagadas e as do arquivo são inseridas. (Tentativas de prova antigas guardam os ids das perguntas antigas.)
- Aulas ou exercícios que existem no banco mas sumiram do arquivo **não são apagados**.

A importação é repetível: rodar duas vezes com o mesmo arquivo dá o mesmo resultado.

## Formato do arquivo

```json
{
  "level": { "position": 1, "slug": "primeiro-commit", "name": "Primeiro Commit", "description": "…" },
  "exam": { "questionCount": 20, "exerciseMinutes": 240, "examMinutes": 60 },
  "lessons": [
    {
      "position": 1,
      "title": "…",
      "description": "…",
      "durationSeconds": 1500,
      "videoKey": "N1/a01.mp4",
      "captionsKey": "N1/a01.vtt",
      "isFree": true,
      "isSample": false,
      "exercises": [
        {
          "position": 1,
          "type": "multiple_choice",
          "topic": "html",
          "prompt": { "question": "…", "options": ["…", "…"] },
          "solution": { "correctIndex": 0 },
          "explanation": "…"
        }
      ]
    }
  ],
  "examQuestions": [
    {
      "type": "code",
      "topic": "html",
      "prompt": { "statement": "…", "starter": { "html": "" } },
      "answer": { "tests": [{ "type": "dom-exists", "selector": "h1" }] }
    }
  ]
}
```

### `level` (obrigatório)

| Campo | Regra |
|---|---|
| `position` | inteiro maior que 0; único entre os níveis |
| `slug` | texto, único (ex.: `primeiro-commit`) |
| `name` | texto |
| `description` | texto (opcional) |

### `exam` (obrigatório)

| Campo | Regra |
|---|---|
| `questionCount` | quantas perguntas cada prova sorteia do banco |
| `exerciseMinutes` | minutos de exercícios exigidos no nível (guardado em `exam_configs.exercise_minutes`) |
| `examMinutes` | tempo da prova, em minutos |

Todos são inteiros maiores que 0. O banco (`examQuestions`) precisa ter **pelo menos `questionCount` perguntas**.

### `lessons[]` (pelo menos uma)

| Campo | Regra |
|---|---|
| `position` | inteiro maior que 0; sem repetir no nível |
| `title` | texto |
| `description` | texto (opcional) |
| `durationSeconds` | **obrigatório**, inteiro maior que 0 |
| `videoKey`, `captionsKey` | caminho do arquivo no armazenamento (ex.: `N1/a01.mp4`, `N1/a01.vtt`); opcionais |
| `isFree` | `true` se a aula é gratuita (padrão `false`) |
| `isSample` | `true` se é aula de amostra (padrão `false`) |
| `exercises` | lista de exercícios (pode ser vazia) |

### Exercícios

Campos comuns: `position` (inteiro > 0, sem repetir na aula), `type`, `topic` (assunto, usado para dizer ao aluno o que revisar), `prompt`, `solution` e `explanation` (texto mostrado após a resposta, opcional).

O `type` é exatamente um destes:

**`multiple_choice`**: múltipla escolha.
```json
"prompt": { "question": "…", "options": ["A", "B", "C"] },
"solution": { "correctIndex": 1 }
```
Pelo menos 2 opções; `correctIndex` começa em 0.

**`fill_blank`**: preencher lacunas. Marque cada lacuna com `___`.
```json
"prompt": { "code": "<___>Olá</p>", "blanks": 1 },
"solution": { "answers": ["p"] }
```
`answers` tem uma resposta por lacuna (`blanks`). A comparação ignora maiúsculas/minúsculas e espaços.

**`order_blocks`**: ordenar blocos. Escreva os blocos **na ordem correta** em `blocks`; o app embaralha na tela.
```json
"prompt": { "blocks": ["<ul>", "<li>Item</li>", "</ul>"] },
"solution": { "order": [0, 1, 2] }
```
`order` é uma permutação dos índices dos blocos.

**`code`**: o aluno escreve código e testes automáticos conferem.
```json
"prompt": { "statement": "Crie um <h1> com o texto \"Meu site\".", "starter": { "html": "", "css": "", "js": "" } },
"solution": { "tests": [ … ] }
```
`starter` é opcional, e cada parte (`html`, `css`, `js`) também.

### Perguntas da prova (`examQuestions[]`)

Mesmos `prompt` dos exercícios, mas o gabarito vai em **`answer`** (fica numa tabela que o aluno não consegue ler) e o `type` é só:

- `multiple_choice`: `prompt` `{ question, options }`, `answer` `{ correctIndex }`.
- `code`: `prompt` `{ statement, starter }`, `answer` `{ tests: [...] }`.

Cada pergunta tem `topic` (assunto).

### Testes de código (`tests`)

Usados em `solution.tests` (exercício) e `answer.tests` (prova). A resposta só é aceita se **todos** passarem. Tipos permitidos:

| `type` | Campos | O que confere |
|---|---|---|
| `dom-exists` | `selector` | existe um elemento que casa com o seletor CSS |
| `dom-text` | `selector`, `equals` | o texto do elemento (sem espaços nas pontas) é igual a `equals` |
| `css-decl` | `selector`, `property`, `value` | o CSS do aluno declara `property: value` para o seletor |
| `js-equals` | `expression`, `equals` | roda o JS do aluno e a expressão resulta em `equals` (valor JSON) |

Exemplos:
```json
{ "type": "dom-exists", "selector": "h1" }
{ "type": "dom-text", "selector": "h1", "equals": "Meu site" }
{ "type": "css-decl", "selector": "h1", "property": "color", "value": "red" }
{ "type": "js-equals", "expression": "soma(2, 3)", "equals": 5 }
```

## Validação

`validateContent` (em `scripts/validate-content.js`) devolve a lista de erros em português; vazia significa que o arquivo está válido. Exemplos de mensagens:

- `Aula 1, exercício 1: tipo "xyz" inválido.`
- `Banco de prova tem 5 perguntas, mas a prova pede 20.`
- `Aula 2: "durationSeconds" é obrigatório e deve ser um inteiro maior que zero.`

Para só validar, sem tocar no banco, use o script de importação sem as variáveis de ambiente: ele valida primeiro e, se o arquivo estiver inválido, mostra os erros antes de pedir a chave.
