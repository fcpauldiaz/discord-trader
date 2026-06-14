import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { api } from '#/lib/api-client'
import { isLoggedIn } from '#/lib/auth'
import UpgradeBanner from '#/components/UpgradeBanner'

export const Route = createFileRoute('/webhooks')({ component: WebhooksPage })

function WebhooksPage() {
  const navigate = useNavigate()
  const [url, setUrl] = useState<string | null>(null)
  const [canTrade, setCanTrade] = useState(false)

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate({ to: '/login' })
      return
    }
    api.billing().then((b) => setCanTrade(b.can_process_trades)).catch(() => {})
    api.webhook().then((w) => setUrl(w.url)).catch(() => {})
  }, [navigate])

  return (
    <main className="page-wrap max-w-2xl space-y-6 px-4 py-10">
      <h1 className="text-3xl font-bold">Webhook setup</h1>
      {!canTrade && <UpgradeBanner />}
      <p className="text-sm text-[var(--sea-ink-soft)]">
        Paste this URL into Notification Watcher → Webhooks → Add webhook URL.
      </p>
      {url ? (
        <code className="block break-all rounded-xl border border-[var(--line)] bg-[var(--chip-bg)] p-4 text-sm">{url}</code>
      ) : (
        <p className="text-sm">Webhook URL unavailable until subscription is active.</p>
      )}
    </main>
  )
}
