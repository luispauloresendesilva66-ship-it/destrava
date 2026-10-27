export default function LockBadge() {
  return (
    <span className="lock-badge" role="img" aria-label="Bloqueado">
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
        <rect x="5" y="11" width="14" height="10" rx="2" fill="currentColor" />
        <path
          d="M8 11V8a4 4 0 0 1 8 0v3"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  )
}
