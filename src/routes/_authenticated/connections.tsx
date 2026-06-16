import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { api } from '#/lib/api-client'
import UpgradeBanner from '#/components/UpgradeBanner'

export const Route = createFileRoute('/_authenticated/connections')({ component: ConnectionsPage })

function ConnectionsPage() {
  const navigate = useNavigate()
  const [brokers, setBrokers] = useState<Awaited<ReturnType<typeof api.brokers>>>([])
  const [canTrade, setCanTrade] = useState(false)
  const [defaultBroker, setDefaultBroker] = useState<string | null>(null)
  const [testMsg, setTestMsg] = useState<Record<string, string>>({})
  const [testing, setTesting] = useState<string | null>(null)
  const [error, setError] = useState('')

  async function refreshBrokers() {
    const [list, settings] = await Promise.all([api.brokers(), api.settings()])
    setBrokers(list)
    setDefaultBroker(settings.default_broker)
  }

  useEffect(() => {
    api.billing().then((b) => setCanTrade(b.can_process_trades)).catch(() => setError('Could not load billing'))
    refreshBrokers().catch(() => setError('Could not load brokers'))

    const params = new URLSearchParams(window.location.search)
    const connected = params.get('connected')
    if (connected) {
      window.history.replaceState({}, '', '/connections')
      navigate({ to: '/onboarding', search: { broker: connected } })
    }
  }, [navigate])

  async function connectTradier() {
    try {
      const { url } = await api.tradierAuthorize()
      window.location.href = url
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Tradier connect failed')
    }
  }

  async function connectSchwab() {
    try {
      const { url } = await api.schwabAuthorize()
      window.location.href = url
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Schwab connect failed')
    }
  }

  async function testConnection(broker: string) {
    setTesting(broker)
    try {
      const res = await api.testBrokerOrder(broker)
      setTestMsg((prev) => ({ ...prev, [broker]: res.message }))
    } catch (e) {
      setTestMsg((prev) => ({ ...prev, [broker]: e instanceof Error ? e.message : 'Test failed' }))
    } finally {
      setTesting(null)
    }
  }

  async function setDefault(broker: string) {
    await api.setDefaultBroker(broker)
    setDefaultBroker(broker)
  }

  async function disconnect(broker: string) {
    await api.disconnectBroker(broker)
    await refreshBrokers()
  }

  return (
    <main className="page-wrap max-w-2xl space-y-6 px-4 py-10">
      <h1 className="text-3xl font-bold">Broker connections</h1>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {!canTrade && <UpgradeBanner />}
      <ul className="space-y-2 text-sm">
        {brokers.map((b) => (
          <li key={b.broker} className="island-shell rounded-xl px-4 py-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span>
                {b.broker}: {b.status} {b.account_id && `(${b.account_id})`}
                {defaultBroker === b.broker && ' — default'}
              </span>
              {b.status === 'connected' && canTrade && (
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => setDefault(b.broker)} className="rounded-full border px-3 py-1 text-xs">
                    Set default
                  </button>
                  <button type="button" onClick={() => testConnection(b.broker)} disabled={testing === b.broker} className="rounded-full border px-3 py-1 text-xs">
                    {testing === b.broker ? 'Testing…' : 'Test'}
                  </button>
                  <button type="button" onClick={() => disconnect(b.broker)} className="rounded-full border px-3 py-1 text-xs">
                    Disconnect
                  </button>
                </div>
              )}
            </div>
            {testMsg[b.broker] && <p className="mt-2 text-xs text-[var(--sea-ink-soft)]">{testMsg[b.broker]}</p>}
          </li>
        ))}
      </ul>
      {canTrade && (
        <div className="space-y-4">
          <div className="island-shell rounded-2xl p-5">
            <h2 className="mb-3 font-semibold">Tradier</h2>
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
        </div>
      )}
    </main>
  )
}
