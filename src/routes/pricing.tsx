import { createFileRoute, Link } from '@tanstack/react-router'
import { checkoutUrl } from '#/lib/lemon-squeezy'
import { useSession } from '#/lib/auth-client'
import { api } from '#/lib/api-client'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/pricing')({ component: PricingPage })

function PricingPage() {
  const { data: session } = useSession()
  const [userId, setUserId] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (!session?.user) return
    api.me().then((u) => {
      setUserId(u.id)
      setEmail(u.email)
    }).catch(() => {})
  }, [session?.user])

  return (
    <main className="page-wrap px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold text-[var(--sea-ink)]">Pricing</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <article className="island-shell rounded-2xl p-6">
          <h2 className="text-xl font-semibold">Free</h2>
          <p className="mt-2 text-3xl font-bold">$0</p>
          <ul className="mt-4 space-y-2 text-sm text-[var(--sea-ink-soft)]">
            <li>Sign up and explore the dashboard</li>
            <li>No trade processing</li>
            <li>No webhook URL</li>
          </ul>
          <Link to="/signup" className="mt-6 inline-block text-sm font-semibold text-[var(--lagoon-deep)]">
            Create account
          </Link>
        </article>
        <article className="island-shell rounded-2xl border-2 border-[var(--lagoon-deep)] p-6">
          <h2 className="text-xl font-semibold">Pro</h2>
          <p className="mt-2 text-3xl font-bold">Subscribe</p>
          <ul className="mt-4 space-y-2 text-sm text-[var(--sea-ink-soft)]">
            <li>AI trade parsing + execution</li>
            <li>Paper and live trading</li>
            <li>Webhook URL + broker connections</li>
            <li>Performance dashboards</li>
          </ul>
          {session?.user && userId ? (
            <a
              href={checkoutUrl(userId, email)}
              className="mt-6 inline-block rounded-full bg-[var(--lagoon-deep)] px-5 py-2.5 text-sm font-semibold text-white no-underline"
            >
              Subscribe with Lemon Squeezy
            </a>
          ) : !session?.user ? (
            <Link to="/login" className="mt-6 inline-block text-sm font-semibold text-[var(--lagoon-deep)]">
              Log in to subscribe
            </Link>
          ) : null}
        </article>
      </div>
    </main>
  )
}
