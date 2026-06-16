import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { signUp } from '#/lib/auth-client'

export const Route = createFileRoute('/signup')({ component: SignupPage })

function SignupPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    const result = await signUp.email({ email, password, name })
    if (result.error) {
      setError(result.error.message || 'Signup failed')
      return
    }
    navigate({ to: '/pricing' })
  }

  return (
    <main className="page-wrap mx-auto max-w-md px-4 py-12">
      <h1 className="mb-6 text-2xl font-bold">Sign up</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block text-sm">
          Email
          <input
            type="email"
            className="mt-1 w-full rounded-xl border border-[var(--line)] px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="block text-sm">
          Password
          <input
            type="password"
            className="mt-1 w-full rounded-xl border border-[var(--line)] px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
          />
        </label>
        <label className="block text-sm">
          Name
          <input
            className="mt-1 w-full rounded-xl border border-[var(--line)] px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" className="rounded-full bg-[var(--lagoon-deep)] px-5 py-2 text-white">
          Create account
        </button>
      </form>
    </main>
  )
}
