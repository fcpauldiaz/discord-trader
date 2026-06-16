import { describe, expect, it } from 'vitest'

import { resolveLibsqlConfig } from '#/lib/database-url'

describe('resolveLibsqlConfig', () => {
  it('maps receiver sqlite URL to libsql file URL', () => {
    expect(resolveLibsqlConfig('sqlite:///./data/trade.db')).toEqual({
      url: 'file:./data/trade.db',
    })
  })

  it('passes through libsql remote URLs with auth token from env', () => {
    const previous = process.env.TURSO_AUTH_TOKEN
    process.env.TURSO_AUTH_TOKEN = 'token-123'
    expect(resolveLibsqlConfig('libsql://db-org.turso.io')).toEqual({
      url: 'libsql://db-org.turso.io',
      authToken: 'token-123',
    })
    process.env.TURSO_AUTH_TOKEN = previous
  })

  it('supports embedded replica URLs', () => {
    const previous = process.env.TURSO_AUTH_TOKEN
    process.env.TURSO_AUTH_TOKEN = 'token-123'
    expect(resolveLibsqlConfig('sqlite+libsql:///./data/trade.db')).toEqual({
      url: 'file:./data/trade.db',
      authToken: 'token-123',
    })
    process.env.TURSO_AUTH_TOKEN = previous
  })
})
