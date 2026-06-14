import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { api } from '#/lib/api-client'
import { setApiKey } from '#/lib/auth'

export const Route = createFileRoute('/signup')({ component: SignupPage })

function SignupPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [apiKey, setKey] = useState('')
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      const res = await api.register(email, name)
      setKey(res.api_key)
      setApiKey(res.api_key)
      navigate({ to: '/pricing' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed')
    }
  }

  return (
    <main className="page-wrap mx-auto max-w-md px-4 py-12">
      <h1 className="mb-6 text-2xl font-bold">Sign up</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input className="w-full rounded-xl border border-[var(--line)] px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input className="w-full rounded-xl border border-[var(--line)] px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" className="rounded-full bg-[var(--lagoon-deep)] px-5 py-2 text-white">Create account</button>
      </form>
      {apiKey && (
        <p className="mt-4 text-xs text-[var(--sea-ink-soft)]">Save your API key: <code>{apiKey}</code></p>
      )}
    </main>
  )
}
