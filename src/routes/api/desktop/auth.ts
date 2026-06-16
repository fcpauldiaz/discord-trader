import { createFileRoute } from '@tanstack/react-router'

import { auth } from '#/lib/auth.server'
import { issueDeviceToken } from '#/lib/device-token'

type DesktopAuthBody = {
  email?: string
  password?: string
}

export const Route = createFileRoute('/api/desktop/auth')({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        let body: DesktopAuthBody
        try {
          body = (await request.json()) as DesktopAuthBody
        } catch {
          return Response.json({ error: 'Invalid JSON body' }, { status: 400 })
        }

        const email = body.email?.trim()
        const password = body.password
        if (!email || !password) {
          return Response.json({ error: 'Email and password are required' }, { status: 400 })
        }

        try {
          const result = await auth.api.signInEmail({
            body: { email, password },
          })
          const user = result.user
          if (!user) {
            return Response.json({ error: 'Invalid credentials' }, { status: 401 })
          }

          const token = await issueDeviceToken(user.id, user.email)
          return Response.json({
            api_key: token.api_key,
            ingest_url: token.ingest_url,
            email: user.email,
          })
        } catch {
          return Response.json({ error: 'Invalid credentials' }, { status: 401 })
        }
      },
    },
  },
})
