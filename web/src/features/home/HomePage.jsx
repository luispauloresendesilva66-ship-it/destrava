import { Link, Navigate } from 'react-router-dom'
import { useSession } from '../auth/useSession.js'
import './home.css'

// Ícones (decorativos: o título do cartão já diz o que é).
const ICONS = {
  play: 'M8 5.5v13a1 1 0 0 0 1.5.86l10.4-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z',
  heart: 'M12 20.5s-7.5-4.6-7.5-10.1A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.5 2.8c0 5.5-7.5 10.1-7.5 10.1Z',
  exam: 'M9 3h6a1 1 0 0 1 1 1v1h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2V4a1 1 0 0 1 1-1Zm1 2v1h4V5h-4Zm5.3 5.3-4.3 4.3-2.3-2.3-1.4 1.4 3.7 3.7 5.7-5.7-1.4-1.4Z',
  qr: 'M4 4h6v6H4V4Zm2 2v2h2V6H6Zm8-2h6v6h-6V4Zm2 2v2h2V6h-2ZM4 14h6v6H4v-6Zm2 2v2h2v-2H6Zm8-2h2v2h-2v-2Zm2 2h2v2h-2v-2Zm2-2h2v2h-2v-2Zm-4 4h2v2h-2v-2Zm4 0h2v2h-2v-2Z',
}

function Icon({ name, size = 22 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} focusable="false" aria-hidden="true">
      <path d={ICONS[name]} fill="currentColor" fillRule="evenodd" />
    </svg>
  )
}

const FEATURES = [
  {
    icon: 'play',
    tone: 'violet',
    title: 'Videoaulas curtas',
    text: 'Aulas diretas, em português, para assistir no celular ou no computador.',
  },
  {
    icon: 'heart',
    tone: 'magenta',
    title: 'Exercícios interativos com vidas',
    text: 'Pratique logo depois de cada aula. Errou? Veja a explicação e tente de novo.',
  },
  {
    icon: 'exam',
    tone: 'cyan',
    title: 'Prova de nível com nota mínima de 90%',
    text: 'Você só avança de nível quando mostra que aprendeu de verdade.',
  },
  {
    icon: 'qr',
    tone: 'gold',
    title: 'Certificado com QR Code verificável',
    text: 'Qualquer pessoa confere se o seu certificado é verdadeiro, direto pelo QR Code.',
  },
]

const PLANS = [
  {
    id: 'free',
    name: 'Grátis',
    price: 'R$ 0',
    items: [
      'Primeiro nível em versão reduzida',
      'Primeira aula de cada nível como amostra',
      'Exercícios com vidas diárias',
      'Prova do primeiro nível',
    ],
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 'R$ 39,99',
    featured: true,
    items: [
      'Todos os níveis, conforme forem lançados',
      'Exercícios ilimitados',
      'Provas de todos os níveis',
      'Certificado incluso',
    ],
  },
  {
    id: 'platinum',
    name: 'Platinum',
    price: 'R$ 49,99',
    items: [
      'Tudo do Gold',
      'Refazer a prova sem espera',
      'Projetos de portfólio guiados (em breve)',
      'Trilha de carreira: currículo, LinkedIn e GitHub (em breve)',
    ],
  },
]

// Ilustração: editor escrevendo HTML + selo de certificado. Só visual.
function EditorArt() {
  return (
    <div className="editor-art" aria-hidden="true">
      <div className="editor-art__window">
        <div className="editor-art__bar">
          <span className="editor-art__dot" />
          <span className="editor-art__dot" />
          <span className="editor-art__dot" />
          <span className="editor-art__tab">index.html</span>
        </div>
        <pre className="editor-art__code">
          <code>
            <span className="ln">1</span><span className="tg">&lt;!DOCTYPE html&gt;</span>{'\n'}
            <span className="ln">2</span><span className="tg">&lt;html</span> <span className="at">lang</span>=<span className="st">&quot;pt-BR&quot;</span><span className="tg">&gt;</span>{'\n'}
            <span className="ln">3</span>  <span className="tg">&lt;body&gt;</span>{'\n'}
            <span className="ln">4</span>    <span className="tg">&lt;h1&gt;</span>Meu site<span className="tg">&lt;/h1&gt;</span>{'\n'}
            <span className="ln">5</span>    <span className="tg">&lt;p&gt;</span>Linha a linha.<span className="tg">&lt;/p&gt;</span>{'\n'}
            <span className="ln">6</span>    <span className="tg">&lt;a</span> <span className="at">href</span>=<span className="st">&quot;#&quot;</span><span className="tg">&gt;</span>Projetos<span className="caret" />{'\n'}
            <span className="ln">7</span>  <span className="tg">&lt;/body&gt;</span>{'\n'}
            <span className="ln">8</span><span className="tg">&lt;/html&gt;</span>
          </code>
        </pre>
      </div>
      <div className="editor-art__cert">
        <span className="editor-art__seal">
          <svg viewBox="0 0 24 24" width="18" height="18" focusable="false">
            <path d="m6 12.5 4 4 8-9" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span>
          <strong>Certificado válido</strong>
          <small>Nível 1 · Primeiro Commit</small>
        </span>
      </div>
      <div className="editor-art__xp">+10 XP</div>
    </div>
  )
}

export default function HomePage() {
  const { session, loading } = useSession()
  if (loading) return <p className="loading" role="status">Carregando...</p>
  if (session) return <Navigate to="/painel" replace />
  return (
    <div className="home">
      <section className="stage on-dark home-hero">
        <div className="home-hero__inner">
          <div className="home-hero__copy rise">
            <p className="home-hero__eyebrow">Curso de programação em português</p>
            <h1>
              Destrava sua carreira.{' '}
              <span className="gradient-text home-hero__accent">Um nível de cada vez.</span>
            </h1>
            <p className="home__lead">Aprenda programação em português, passo a passo, no seu ritmo.</p>
            <div className="home__actions">
              <Link className="btn btn--primary btn--lg" to="/entrar">
                Entrar
              </Link>
              <Link className="btn btn--glass btn--lg" to="/cadastro">
                Criar conta
              </Link>
            </div>
            <ol className="home-hero__journey" aria-hidden="true">
              {[1, 2, 3, 4, 5].map((n) => (
                <li key={n} className={`lvl-${n}`}>
                  {n}
                </li>
              ))}
            </ol>
          </div>
          <EditorArt />
        </div>
      </section>

      <section className="home-section" aria-labelledby="home-features-title">
        <header className="home-section__head">
          <p className="eyebrow">Como funciona</p>
          <h2 id="home-features-title">Aprender fazendo, com começo, meio e fim</h2>
        </header>
        <ul className="feature-grid">
          {FEATURES.map((f) => (
            <li key={f.title} className="card feature-card lift">
              <span className={`icon-chip icon-chip--${f.tone}`}>
                <Icon name={f.icon} />
              </span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="home-section home-plans" aria-labelledby="home-plans-title">
        <header className="home-section__head">
          <p className="eyebrow">Planos</p>
          <h2 id="home-plans-title">Comece grátis e avance no seu ritmo</h2>
        </header>
        <ul className="plan-grid">
          {PLANS.map((p) => (
            <li key={p.id} className={`plan-card plan-card--${p.id}${p.featured ? ' plan-card--featured' : ''}`}>
              {p.featured && <p className="plan-card__ribbon">Recomendado</p>}
              <span className={`badge badge--${p.id}`}>{p.name}</span>
              <p className="plan-card__price">
                <strong>{p.price}</strong>
                <span>/mês</span>
              </p>
              <ul className="plan-card__items">
                {p.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
