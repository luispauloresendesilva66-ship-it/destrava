export const PLANS = ['free', 'gold', 'platinum']

const RETAKE_COOLDOWN_MS = {
  free: 86_400_000,
  gold: 7_200_000,
  platinum: 0,
}

export function assertPlan(plan) {
  if (!PLANS.includes(plan)) throw new Error(`Unknown plan: ${plan}`)
  return plan
}

export function retakeCooldownMs(plan) {
  return RETAKE_COOLDOWN_MS[assertPlan(plan)]
}

export function includesCertificate(plan) {
  return assertPlan(plan) !== 'free'
}
