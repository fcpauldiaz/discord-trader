type LibsqlConfig = {
  url: string
  authToken?: string
}

function stripQuotes(value: string): string {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1)
  }
  return value
}

export function resolveLibsqlConfig(rawUrl?: string): LibsqlConfig {
  const raw = stripQuotes(rawUrl ?? process.env.DATABASE_URL ?? 'file:./data/trade.db')

  if (raw.startsWith('sqlite:///')) {
    return { url: `file:${raw.slice('sqlite:///'.length)}` }
  }

  if (raw.startsWith('sqlite+libsql:///')) {
    return {
      url: `file:${raw.slice('sqlite+libsql:///'.length)}`,
      authToken: process.env.TURSO_AUTH_TOKEN,
    }
  }

  if (raw.startsWith('libsql://')) {
    return {
      url: raw,
      authToken: process.env.TURSO_AUTH_TOKEN,
    }
  }

  if (raw.startsWith('file:')) {
    return { url: raw }
  }

  throw new Error(
    'DATABASE_URL must be file:, libsql://, sqlite:///, or sqlite+libsql:/// to match trade-receiver.',
  )
}
