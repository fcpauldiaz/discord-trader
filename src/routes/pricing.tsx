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
    <main className="marketing-page page-wrap px-4 py-12">
      <header className="marketing-page-header">
        <h1>Pricing</h1>
        <p>Start free, upgrade when you are ready to automate execution.</p>
      </header>
      <div className="pricing-grid">
        <article className="pricing-card">
          <h2>Free</h2>
          <p className="pricing-amount">$0</p>
          <ul className="pricing-features">
            <li>Sign up and explore the dashboard</li>
            <li>No trade processing</li>
            <li>No desktop app automation</li>
          </ul>
          <Link to="/signup" className="btn-secondary">
            Create account
          </Link>
        </article>
        <article className="pricing-card pricing-card-featured">
          <h2>Pro</h2>
          <p className="pricing-amount">Subscribe</p>
          <ul className="pricing-features">
            <li>AI trade parsing + execution</li>
            <li>Paper and live trading</li>
            <li>Desktop app + automated execution</li>
            <li>Performance dashboards</li>
          </ul>
          {session?.user && userId ? (
            <a href={checkoutUrl(userId, email)} className="btn-primary">
              Subscribe with Lemon Squeezy
            </a>
          ) : !session?.user ? (
            <Link to="/login" className="btn-primary">
              Log in to subscribe
            </Link>
          ) : null}
        </article>
      </div>
    </main>
  )
}
