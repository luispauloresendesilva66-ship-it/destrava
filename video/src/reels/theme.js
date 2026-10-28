// Identidade visual dos Reels: a mesma do app (web/src/styles/tokens.css) — palco noturno com brilhos,
// acentos vívidos por nível, Gold/Platinum e verde só para conquista.
export const RW = 1080
export const RH = 1920
export const RFPS = 30
export const SCENE_PAD = 0.25 // s depois do áudio de cada cena

// Zonas seguras (interface do Instagram/TikTok)
export const SAFE = { top: 220, bottom: 1540, side: 60 }
export const CONTENT_W = RW - SAFE.side * 2

export const R = {
  night950: '#120F33',
  night900: '#1A1640',
  night: '#26215C',
  night700: '#33296F',
  purple: '#534AB7',
  purpleSoft: '#7F77DD',
  lavender: '#EEEDFE',
  muted: '#B8B3E6',
  accent: '#C9C2FF',
  violet: '#8B6CFF',
  violetDeep: '#7048E8',
  cyan: '#3EC5FF',
  magenta: '#F0509E',
  orange: '#FF8A3D',
  gold: '#F5BE3C',
  green: '#97C459',
  greenLight: '#B5DB7E',
  red: '#FF6B5B',
  white: '#FFFFFF',
  onGold: '#3D2700',
}

export const HUES = [R.violet, R.cyan, R.magenta, R.orange, R.gold]

export const GRAD = {
  primary: 'linear-gradient(135deg, #6A5CF0 0%, #7048E8 55%, #9A55F2 100%)',
  headline: 'linear-gradient(92deg, #C9C2FF 0%, #8FD8FF 48%, #F7A3D2 100%)',
  vivid: `linear-gradient(120deg, ${R.violet}, ${R.cyan} 50%, ${R.magenta})`,
  success: `linear-gradient(135deg, #B5DB7E 0%, ${R.green} 100%)`,
  gold: 'linear-gradient(135deg, #FFE7A3 0%, #F5BE3C 50%, #E08A1E 100%)',
  platinum: 'linear-gradient(135deg, #F4F3FB 0%, #C2BEE0 55%, #9E97D6 100%)',
  glass: 'linear-gradient(160deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.05) 100%)',
}

export const DISPLAY = "'Jakarta', 'Segoe UI', system-ui, sans-serif"
export const SANS = "'InterR', 'Segoe UI', system-ui, sans-serif"
export const CODE = "Consolas, 'Cascadia Mono', 'Courier New', monospace"

export const KICKER = {
  pitch: 'Destrava',
  dica: 'Dica rápida',
  mito: 'Mito ou verdade',
  desafio: 'Desafio do dia',
  produto: 'Por dentro do app',
}

export const SITE_URL = 'destrava.luispauloresendesilva66.workers.dev'
