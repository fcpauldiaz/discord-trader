import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { api } from '#/lib/api-client'
import { isLoggedIn } from '#/lib/auth'
import UpgradeBanner from '#/components/UpgradeBanner'

export const Route = createFileRoute('/connections')({ component: ConnectionsPage })

function ConnectionsPage() {
  const navigate = useNavigate()
  const [brokers, setBrokers] = useState<Awaited<ReturnType<typeof api.brokers>>>([])
  const [canTrade, setCanTrade] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate({ to: '/login' })
      return
    }
    api.billing().then((b) => setCanTrade(b.can_process_trades)).catch(() => {})
    api.brokers().then(setBrokers).catch(() => {})

    const params = new URLSearchParams(window.location.search)
    const connected = params.get('connected')
    if (connected) {
      setMsg(`${connected} connected successfully`)
      window.history.replaceState({}, '', '/connections')
    }
  }, [navigate])

  async function connectTradier() {
    const { url } = await api.tradierAuthorize()
    window.location.href = url
  }

  async function connectSchwab() {
    const { url } = await api.schwabAuthorize()
    window.location.href = url
  }

  return (
    <main className="page-wrap max-w-2xl space-y-6 px-4 py-10">
      <h1 className="text-3xl font-bold">Broker connections</h1>
      {!canTrade && <UpgradeBanner />}
      <ul className="space-y-2 text-sm">
        {brokers.map((b) => (
          <li key={b.broker} className="island-shell rounded-xl px-4 py-3">
            {b.broker}: {b.status} {b.account_id && `(${b.account_id})`}
          </li>
        ))}
      </ul>
      {canTrade && (
        <div className="space-y-4">
          <div className="island-shell rounded-2xl p-5">
            <h2 className="mb-3 font-semibold">Tradier</h2>
            <p className="mb-3 text-sm text-[var(--sea-ink-soft)]">
              Connect via OAuth — your token is stored per account, not in server env vars.
            </p>
            <button onClick={connectTradier} className="rounded-full bg-[var(--lagoon-deep)] px-4 py-2 text-sm text-white">
              Connect Tradier
            </button>
          </div>
          <div className="island-shell rounded-2xl p-5">
            <h2 className="mb-3 font-semibold">Charles Schwab</h2>
            <button onClick={connectSchwab} className="rounded-full border px-4 py-2 text-sm">
              Authorize Schwab
            </button>
          </div>
          <div className="island-shell rounded-2xl p-5 opacity-70">
            <h2 className="mb-1 font-semibold">Webull (beta)</h2>
            <p className="text-sm text-[var(--sea-ink-soft)]">Coming soon — feature flagged in receiver.</p>
          </div>
        </div>
      )}
      {msg && <p className="text-sm">{msg}</p>}
    </main>
  )
}
