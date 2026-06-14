import { describe, expect, it } from 'vitest'
import { checkoutUrl } from '#/lib/lemon-squeezy'

describe('lemon-squeezy', () => {
  it('builds checkout URL with user id and email', () => {
    const url = checkoutUrl('user-123', 'test@example.com')
    expect(url).toContain('checkout%5Bemail%5D=test%40example.com')
    expect(url).toContain('checkout%5Bcustom%5D%5Buser_id%5D=user-123')
  })
})
