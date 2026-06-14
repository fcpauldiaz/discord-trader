import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { api } from '#/lib/api-client'
import { setApiKey } from '#/lib/auth'

export const Route = createFileRoute('/login')({ component: LoginPage })

function LoginPage() {
  const navigate = useNavigate()
  const [apiKey, setKey] = useState('')
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setApiKey(apiKey)
    try {
      await api.me()
      navigate({ to: '/dashboard' })
    } catch {
      setError('Invalid API key')
      localStorage.removeItem('api_key')
    }
  }

  return (
    <main className="page-wrap mx-auto max-w-md px-4 py-12">
      <h1 className="mb-6 text-2xl font-bold">Log in</h1>
      <p className="mb-4 text-sm text-[var(--sea-ink-soft)]">Paste the API key from signup.</p>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          className="w-full rounded-xl border border-[var(--line)] bg-transparent px-3 py-2"
          value={apiKey}
          onChange={(e) => setKey(e.target.value)}
          placeholder="API key"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" className="rounded-full bg-[var(--lagoon-deep)] px-5 py-2 text-white">
          Log in
        </button>
      </form>
    </main>
  )
}
