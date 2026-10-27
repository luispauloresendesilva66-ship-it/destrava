import { describe, it, expect } from 'vitest'
import { PLANS, assertPlan, retakeCooldownMs, includesCertificate } from './plans.js'

describe('plans', () => {
  it('lists plans', () => expect(PLANS).toEqual(['free', 'gold', 'platinum']))
  it('retake cooldown per plan', () => {
    expect(retakeCooldownMs('free')).toBe(86_400_000)
    expect(retakeCooldownMs('gold')).toBe(7_200_000)
    expect(retakeCooldownMs('platinum')).toBe(0)
  })
  it('assertPlan throws on unknown', () => {
    expect(() => assertPlan('vip')).toThrow('Unknown plan: vip')
    expect(assertPlan('gold')).toBe('gold')
  })
  it('certificate only for paid plans', () => {
    expect(includesCertificate('free')).toBe(false)
    expect(includesCertificate('gold')).toBe(true)
    expect(includesCertificate('platinum')).toBe(true)
  })
})
