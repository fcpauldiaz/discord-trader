import { describe, expect, it } from 'vitest'

import { formatSocialProofCount } from '#/lib/public-stats'

describe('formatSocialProofCount', () => {
  it('formats thousands with rounding', () => {
    expect(formatSocialProofCount(2345)).toBe('2,300+')
  })

  it('formats hundreds with rounding', () => {
    expect(formatSocialProofCount(156)).toBe('150+')
  })

  it('formats small counts exactly', () => {
    expect(formatSocialProofCount(42)).toBe('42')
  })
})
