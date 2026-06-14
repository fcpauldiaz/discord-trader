import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { api } from '#/lib/api-client'
import { isLoggedIn } from '#/lib/auth'
import { checkoutUrl } from '#/lib/lemon-squeezy'
import UpgradeBanner from '#/components/UpgradeBanner'

export const Route = createFileRoute('/billing')({ component: BillingPage })

function BillingPage() {
  const navigate = useNavigate()
  const [billing, setBilling] = useState<Awaited<ReturnType<typeof api.billing>> | null>(null)
  const [user, setUser] = useState<{ id: string; email: string } | null>(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate({ to: '/login' })
      return
    }
    api.billing().then(setBilling).catch(() => {})
    api.me().then((u) => setUser({ id: u.id, email: u.email })).catch(() => {})
  }, [navigate])

  async function regenerate() {
    try {
      await api.regenerateWebhook()
      setMessage('Webhook secret regenerated.')
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Failed')
    }
  }

  return (
    <main className="page-wrap max-w-2xl space-y-6 px-4 py-10">
      <h1 className="text-3xl font-bold">Billing</h1>
      {billing && !billing.can_process_trades && <UpgradeBanner />}
      {billing && (
        <div className="island-shell space-y-2 rounded-2xl p-5 text-sm">
          <p><strong>Status:</strong> {billing.status}</p>
          <p><strong>Plan:</strong> {billing.plan_name}</p>
          <p><strong>Can process trades:</strong> {billing.can_process_trades ? 'Yes' : 'No'}</p>
        </div>
      )}
      {user && (
        <a href={checkoutUrl(user.id, user.email)} className="inline-block rounded-full bg-[var(--lagoon-deep)] px-5 py-2 text-white no-underline">
          Manage subscription
        </a>
      )}
      {billing?.can_process_trades && (
        <button onClick={regenerate} className="rounded-full border border-[var(--line)] px-4 py-2 text-sm">
          Regenerate webhook secret
        </button>
      )}
      {message && <p className="text-sm text-[var(--sea-ink-soft)]">{message}</p>}
    </main>
  )
}
