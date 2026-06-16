import { defineConfig } from 'drizzle-kit'

import { resolveLibsqlConfig } from './src/lib/database-url.ts'

const { url, authToken } = resolveLibsqlConfig()

export default defineConfig({
  schema: './src/db/auth-schema.ts',
  out: './drizzle',
  dialect: 'turso',
  dbCredentials: {
    url,
    authToken,
  },
})
