import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'
import { api } from '#/lib/api-client'
import { isLoggedIn } from '#/lib/auth'
import KpiStrip from '#/components/dashboard/KpiStrip'
import MonthlyPnLCalendar from '#/components/dashboard/MonthlyPnLCalendar'
import TradeTable from '#/components/dashboard/TradeTable'
import UpgradeBanner from '#/components/UpgradeBanner'

export const Route = createFileRoute('/dashboard')({ component: DashboardPage })

function DashboardPage() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('')
  const [billing, setBilling] = useState<{ can_process_trades: boolean } | null>(null)
  const [summary, setSummary] = useState({ total_trades: 0, total_pnl: 0, win_rate: 0 })
  const [daily, setDaily] = useState<Record<string, number>>({})
  const [trades, setTrades] = useState<Awaited<ReturnType<typeof api.trades>>>([])
  const month = useMemo(() => new Date().toISOString().slice(0, 7), [])

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate({ to: '/login' })
      return
    }
    api.billing().then(setBilling).catch(() => setBilling({ can_process_trades: false }))
    api.summary().then(setSummary).catch(() => {})
    api.dailyPnl(month).then(setDaily).catch(() => {})
    api.trades(mode || undefined).then(setTrades).catch(() => {})
  }, [navigate, mode, month])

  return (
    <main className="page-wrap space-y-6 px-4 py-10">
      <h1 className="text-3xl font-bold text-[var(--sea-ink)]">Dashboard</h1>
      {billing && !billing.can_process_trades && <UpgradeBanner />}
      <KpiStrip
        totalPnl={summary.total_pnl}
        winRate={summary.win_rate}
        totalTrades={summary.total_trades}
        mode={mode}
        onModeChange={setMode}
      />
      <MonthlyPnLCalendar dailyPnl={daily} month={month} trades={trades} />
      <section>
        <h2 className="mb-3 text-lg font-semibold">Recent trades</h2>
        <TradeTable trades={trades} />
      </section>
    </main>
  )
}
