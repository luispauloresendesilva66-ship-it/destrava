const PURPLE = { light: '#534AB7', dark: '#7F77DD' }
const GREEN = '#97C459'
const TEXT = { light: '#26215C', dark: '#EEEDFE' }

export default function Logo({ variant = 'horizontal', theme = 'light', size = 40 }) {
  const purple = PURPLE[theme] ?? PURPLE.light
  const showWordmark = variant === 'horizontal'
  const markWidth = 66
  const markHeight = 88
  const width = showWordmark ? 66 + 24 + 330 : markWidth
  const height = markHeight

  return (
    <svg
      role="img"
      aria-label="Destrava"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      height={size}
      width={(size * width) / height}
    >
      <circle cx="32" cy="56" r="32" fill={purple} />
      <rect x="52" y="0" width="14" height="88" rx="7" fill={purple} />
      <circle cx="32" cy="50" r="9" fill={GREEN} />
      <path d="M28 55 L24 74 H40 L36 55 Z" fill={GREEN} />
      {showWordmark && (
        <text
          x="90"
          y="68"
          fontSize="64"
          fontWeight="500"
          fontFamily="system-ui, -apple-system, 'Segoe UI', sans-serif"
          fill={TEXT[theme] ?? TEXT.light}
        >
          destrava
        </text>
      )}
    </svg>
  )
}
