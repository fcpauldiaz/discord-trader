import { mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { betterAuth } from 'better-auth'
import { jwt } from 'better-auth/plugins'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import Database from 'better-sqlite3'

import { provisionReceiverUser } from '#/lib/provision-receiver'

function authDatabasePath(): string {
  const raw = process.env.DATABASE_URL ?? 'file:./data/auth.db'
  const path = raw.startsWith('file:') ? raw.slice(5) : raw
  mkdirSync(dirname(path), { recursive: true })
  return path
}

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL ?? 'http://localhost:3000',
  secret: process.env.BETTER_AUTH_SECRET ?? 'dev-better-auth-secret-change-in-production',
  database: new Database(authDatabasePath()),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    jwt({
      jwt: {
        definePayload: ({ user }) => ({
          sub: user.id,
          email: user.email,
          name: user.name,
        }),
        expirationTime: '1h',
      },
    }),
    tanstackStartCookies(),
  ],
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await provisionReceiverUser({
            id: user.id,
            email: user.email,
            name: user.name,
          })
        },
      },
    },
  },
})
