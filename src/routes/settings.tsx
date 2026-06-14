import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { api } from '#/lib/api-client'
import { isLoggedIn } from '#/lib/auth'

export const Route = createFileRoute('/settings')({ component: SettingsPage })

function SettingsPage() {
  const navigate = useNavigate()
  const [settings, setSettings] = useState({
    default_mode: 'paper',
    max_contracts: 1,
    allowed_tickers: '',
    live_trading_enabled: false,
  })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate({ to: '/login' })
      return
    }
    api.settings().then((s) =>
      setSettings({
        default_mode: s.default_mode,
        max_contracts: s.max_contracts,
        allowed_tickers: s.allowed_tickers || '',
        live_trading_enabled: s.live_trading_enabled,
      }),
    )
  }, [navigate])

  async function save(e: React.FormEvent) {
    e.preventDefault()
    await api.updateSettings({
      ...settings,
      allowed_tickers: settings.allowed_tickers || null,
    })
    setSaved(true)
  }

  return (
    <main className="page-wrap max-w-lg space-y-4 px-4 py-10">
      <h1 className="text-3xl font-bold">Settings</h1>
      <form onSubmit={save} className="island-shell space-y-4 rounded-2xl p-5">
        <label className="block text-sm">
          Default mode
          <select className="mt-1 w-full rounded-lg border px-2 py-1" value={settings.default_mode} onChange={(e) => setSettings({ ...settings, default_mode: e.target.value })}>
            <option value="paper">Paper</option>
            <option value="live">Live</option>
          </select>
        </label>
        <label className="block text-sm">
          Max contracts
          <input type="number" className="mt-1 w-full rounded-lg border px-2 py-1" value={settings.max_contracts} onChange={(e) => setSettings({ ...settings, max_contracts: Number(e.target.value) })} />
        </label>
        <label className="block text-sm">
          Allowed tickers (comma-separated)
          <input className="mt-1 w-full rounded-lg border px-2 py-1" value={settings.allowed_tickers} onChange={(e) => setSettings({ ...settings, allowed_tickers: e.target.value })} />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={settings.live_trading_enabled} onChange={(e) => setSettings({ ...settings, live_trading_enabled: e.target.checked })} />
          Enable live trading
        </label>
        <button type="submit" className="rounded-full bg-[var(--lagoon-deep)] px-4 py-2 text-white">Save</button>
        {saved && <p className="text-sm text-[var(--sea-ink-soft)]">Saved.</p>}
      </form>
    </main>
  )
}
