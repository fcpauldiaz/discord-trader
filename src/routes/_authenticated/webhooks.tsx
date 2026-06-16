import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { api } from '#/lib/api-client'
import UpgradeBanner from '#/components/UpgradeBanner'

export const Route = createFileRoute('/_authenticated/webhooks')({ component: WebhooksPage })

function WebhooksPage() {
  const navigate = useNavigate()
  const [url, setUrl] = useState<string | null>(null)
  const [canTrade, setCanTrade] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    api.me().then((me) => {
      if (!me.onboarding_completed) navigate({ to: '/onboarding' })
    }).catch(() => {})
    api.billing()
      .then((b) => setCanTrade(b.can_process_trades))
      .catch(() => setError('Could not load billing status'))
    api.webhook()
      .then((w) => setUrl(w.url))
      .catch(() => setError('Could not load webhook URL'))
  }, [navigate])

  async function copyUrl() {
    if (!url) return
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="page-wrap max-w-2xl space-y-6 px-4 py-10">
      <h1 className="text-3xl font-bold">Webhook setup</h1>
      {!canTrade && <UpgradeBanner />}
      <p className="text-sm text-[var(--sea-ink-soft)]">
        Paste this URL into Notification Watcher → Webhooks → Add webhook URL.
      </p>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {url ? (
        <div className="space-y-3">
          <code className="block break-all rounded-xl border border-[var(--line)] bg-[var(--chip-bg)] p-4 text-sm">{url}</code>
          <button type="button" onClick={copyUrl} className="rounded-full bg-[var(--lagoon-deep)] px-4 py-2 text-sm text-white">
            {copied ? 'Copied!' : 'Copy webhook URL'}
          </button>
        </div>
      ) : (
        !error && <p className="text-sm">Webhook URL unavailable until subscription is active.</p>
      )}
    </main>
  )
}
