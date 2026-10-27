
// Moldura das telas de conta: painel de marca no palco (só visual) + cartão do formulário.
export default function AuthShell({ children }) {
  return (
    <div className="auth-shell">
      <div className="auth-brand stage on-dark" aria-hidden="true">
        <div className="auth-brand__inner">
          <p className="auth-brand__slogan">
            Destrava sua carreira. <span className="gradient-text">Um nível de cada vez.</span>
          </p>
          <ol className="auth-brand__steps">
            {[1, 2, 3, 4, 5].map((n) => (
              <li key={n} className={`lvl-${n}`} />
            ))}
          </ol>
        </div>
      </div>
      <div className="auth-pane">{children}</div>
    </div>
  )
}
