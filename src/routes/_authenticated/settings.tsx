import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { api } from '#/lib/api-client'
import UpgradeBanner from '#/components/UpgradeBanner'
import type { SizingMode, UserSettings } from '#/lib/sizing-types'

type SettingsForm = Omit<UserSettings, 'allowed_tickers'> & { allowed_tickers: string }

export const Route = createFileRoute('/_authenticated/settings')({ component: SettingsPage })

function SettingsPage() {
  const [canTrade, setCanTrade] = useState(false)
  const [settings, setSettings] = useState<SettingsForm>({
    default_mode: 'paper',
    max_contracts: 1,
    allowed_tickers: '',
    live_trading_enabled: false,
    sizing_mode: 'alert_inferred',
    fixed_contracts: 1,
    risk_percent: 1,
    default_broker: null,
  })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    api.settings().then((s) =>
      setSettings({
        ...s,
        allowed_tickers: s.allowed_tickers || '',
      }),
    )
    api.billing().then((b) => setCanTrade(b.can_process_trades)).catch(() => {})
  }, [])

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
      {!canTrade && <UpgradeBanner />}
      <form onSubmit={save} className="island-shell space-y-4 rounded-2xl p-5">
        <label className="block text-sm">
          Default mode
          <select
            className="mt-1 w-full rounded-lg border px-2 py-1"
            value={settings.default_mode}
            onChange={(e) => setSettings({ ...settings, default_mode: e.target.value })}
          >
            <option value="paper">Paper</option>
            <option value="live">Live</option>
          </select>
        </label>

        <fieldset className="space-y-3" disabled={!canTrade}>
          <legend className="text-sm font-semibold">Trade sizing (Pro)</legend>
          {(
            [
              ['alert_inferred', 'From alerts'],
              ['fixed', 'Fixed per trade'],
              ['risk_percent', 'Risk-based (% of account)'],
            ] as const
          ).map(([mode, label]) => (
            <label key={mode} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="sizing_mode"
                checked={settings.sizing_mode === mode}
                onChange={() => setSettings({ ...settings, sizing_mode: mode as SizingMode })}
              />
              {label}
            </label>
          ))}
        </fieldset>

        {settings.sizing_mode === 'fixed' && (
          <label className="block text-sm">
            Fixed contracts
            <input
              type="number"
              className="mt-1 w-full rounded-lg border px-2 py-1"
              value={settings.fixed_contracts}
              onChange={(e) => setSettings({ ...settings, fixed_contracts: Number(e.target.value) })}
            />
          </label>
        )}

        {settings.sizing_mode === 'risk_percent' && (
          <label className="block text-sm">
            Risk percent
            <input
              type="number"
              step={0.1}
              className="mt-1 w-full rounded-lg border px-2 py-1"
              value={settings.risk_percent}
              onChange={(e) => setSettings({ ...settings, risk_percent: Number(e.target.value) })}
            />
          </label>
        )}

        <label className="block text-sm">
          Max contracts
          <input
            type="number"
            className="mt-1 w-full rounded-lg border px-2 py-1"
            value={settings.max_contracts}
            onChange={(e) => setSettings({ ...settings, max_contracts: Number(e.target.value) })}
          />
        </label>
        <label className="block text-sm">
          Allowed tickers (comma-separated)
          <input
            className="mt-1 w-full rounded-lg border px-2 py-1"
            value={settings.allowed_tickers}
            onChange={(e) => setSettings({ ...settings, allowed_tickers: e.target.value })}
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={settings.live_trading_enabled}
            disabled={!canTrade}
            onChange={(e) => setSettings({ ...settings, live_trading_enabled: e.target.checked })}
          />
          Enable live trading
        </label>
        <button type="submit" disabled={!canTrade} className="rounded-full bg-[var(--lagoon-deep)] px-4 py-2 text-white disabled:opacity-50">
          Save
        </button>
        {saved && <p className="text-sm text-[var(--sea-ink-soft)]">Saved.</p>}
      </form>
    </main>
  )
}
