// Importa um arquivo de conteúdo (um nível) para o Supabase usando a service_role.
// Uso: node scripts/import-content.js content/primeiro-commit.json [--env-file caminho]
import { existsSync, readFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'
import { validateContent } from './validate-content.js'
import { replaceExamQuestions } from './replace-exam-questions.js'

function fail(message) {
  console.error(message)
  process.exit(1)
}

function check(error, what) {
  if (error) throw new Error(`${what}: ${error.message}`)
}

function parseArgs(argv) {
  const args = { file: null, envFile: null }
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--env-file') args.envFile = argv[++i]
    else if (argv[i].startsWith('--env-file=')) args.envFile = argv[i].slice('--env-file='.length)
    else if (!args.file) args.file = argv[i]
  }
  return args
}

async function importContent(supabase, content) {
  const { level, exam, lessons, examQuestions } = content

  const { data: levelRow, error: levelErr } = await supabase
    .from('levels')
    .upsert(
      { position: level.position, slug: level.slug, name: level.name, description: level.description ?? null },
      { onConflict: 'position' },
    )
    .select('id')
    .single()
  check(levelErr, 'Falha ao salvar o nível')

  const { error: examErr } = await supabase.from('exam_configs').upsert(
    {
      level_id: levelRow.id,
      question_count: exam.questionCount,
      exercise_minutes: exam.exerciseMinutes,
      exam_minutes: exam.examMinutes,
    },
    { onConflict: 'level_id' },
  )
  check(examErr, 'Falha ao salvar a configuração da prova')

  let exerciseCount = 0
  for (const lesson of lessons) {
    const { data: lessonRow, error: lessonErr } = await supabase
      .from('lessons')
      .upsert(
        {
          level_id: levelRow.id,
          position: lesson.position,
          title: lesson.title,
          description: lesson.description ?? null,
          duration_seconds: lesson.durationSeconds,
          video_key: lesson.videoKey ?? null,
          captions_key: lesson.captionsKey ?? null,
          is_free: lesson.isFree ?? false,
          is_sample: lesson.isSample ?? false,
        },
        { onConflict: 'level_id,position' },
      )
      .select('id')
      .single()
    check(lessonErr, `Falha ao salvar a aula ${lesson.position}`)

    // Não há unique(lesson_id, position) em exercises: select, depois update ou insert.
    for (const ex of lesson.exercises ?? []) {
      const row = {
        type: ex.type,
        topic: ex.topic,
        prompt: ex.prompt,
        solution: ex.solution,
        explanation: ex.explanation ?? null,
      }
      const where = `aula ${lesson.position}, exercício ${ex.position}`
      const { data: found, error: findErr } = await supabase
        .from('exercises')
        .select('id')
        .eq('lesson_id', lessonRow.id)
        .eq('position', ex.position)
      check(findErr, `Falha ao buscar ${where}`)
      if (found.length > 0) {
        const { error } = await supabase.from('exercises').update(row).eq('id', found[0].id)
        check(error, `Falha ao atualizar ${where}`)
      } else {
        const { error } = await supabase
          .from('exercises')
          .insert({ ...row, lesson_id: lessonRow.id, position: ex.position })
        check(error, `Falha ao criar ${where}`)
      }
      exerciseCount++
    }
  }

  // Perguntas de prova são substituídas a cada importação (sem perder as antigas se algo falhar).
  await replaceExamQuestions(supabase, levelRow.id, examQuestions)

  return { lessons: lessons.length, exercises: exerciseCount, questions: examQuestions.length }
}

async function main() {
  const { file, envFile } = parseArgs(process.argv.slice(2))
  if (!file) fail('Uso: node scripts/import-content.js <arquivo.json> [--env-file caminho]')

  let content
  try {
    content = JSON.parse(readFileSync(file, 'utf8'))
  } catch (err) {
    fail(`Não consegui ler o arquivo "${file}" como JSON: ${err.message}`)
  }

  const errors = validateContent(content)
  if (errors.length > 0) {
    console.error(`Conteúdo inválido (${errors.length} ${errors.length === 1 ? 'erro' : 'erros'}). Nada foi importado:`)
    for (const e of errors) console.error(`- ${e}`)
    process.exit(1)
  }

  const envPath = envFile ?? (existsSync('.env') ? '.env' : null)
  if (envPath) {
    if (!existsSync(envPath)) fail(`Arquivo de ambiente não encontrado: ${envPath}`)
    process.loadEnvFile(envPath)
  }

  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    fail(
      'Faltam SUPABASE_URL e/ou SUPABASE_SERVICE_ROLE_KEY.\n' +
        'Coloque as duas em um arquivo .env na raiz do projeto (veja .env.example),\n' +
        'ou informe outro arquivo com --env-file. A chave nunca deve ser enviada ao Git.',
    )
  }

  const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })
  try {
    const r = await importContent(supabase, content)
    const s = (n, one, many) => `${n} ${n === 1 ? one : many}`
    console.log(
      `Importado: 1 nível, ${s(r.lessons, 'aula', 'aulas')}, ${s(r.exercises, 'exercício', 'exercícios')}, ${s(r.questions, 'pergunta', 'perguntas')}.`,
    )
  } catch (err) {
    fail(`Erro na importação: ${err.message}`)
  }
}

main()
