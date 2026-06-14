const API_BASE = import.meta.env.VITE_RECEIVER_API_URL || 'http://localhost:8000'

export type BillingStatus = {
  status: string
  plan_name: string
  renews_at: string | null
  ends_at: string | null
  can_process_trades: boolean
  webhook_enabled: boolean
}

export type Trade = {
  id: string
  broker: string
  mode: string
  status: string
  underlying: string
  option_type: string
  strike: number
  expiration: string
  quantity: number
  fill_price: number | null
  pnl: number | null
  created_at: string
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('api_key') : null
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(init?.headers as Record<string, string>),
  }
  if (token) headers.Authorization = `Bearer ${token}`
  const res = await fetch(`${API_BASE}${path}`, { ...init, headers })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || res.statusText)
  }
  return res.json() as Promise<T>
}

export const api = {
  register: (email: string, name?: string) =>
    apiFetch<{ id: string; email: string; api_key: string }>('/v1/users', {
      method: 'POST',
      body: JSON.stringify({ email, name }),
    }),
  me: () => apiFetch<{ id: string; email: string; can_process_trades: boolean; webhook_url: string | null }>('/v1/me'),
  billing: () => apiFetch<BillingStatus>('/v1/me/billing'),
  webhook: () => apiFetch<{ url: string | null; enabled: boolean }>('/v1/me/webhook'),
  regenerateWebhook: () => apiFetch<{ webhook_secret: string }>('/v1/me/billing/regenerate-webhook', { method: 'POST' }),
  brokers: () => apiFetch<Array<{ broker: string; status: string; account_id: string | null }>>('/v1/me/brokers'),
  connectTradier: (access_token: string, account_id: string) =>
    apiFetch('/v1/me/brokers/tradier', {
      method: 'POST',
      body: JSON.stringify({ access_token, account_id }),
    }),
  disconnectBroker: (broker: string) =>
    apiFetch(`/v1/me/brokers/${broker}`, { method: 'DELETE' }),
  schwabAuthorize: () => apiFetch<{ url: string }>('/v1/me/brokers/schwab/authorize'),
  trades: (mode?: string) => apiFetch<Trade[]>(`/v1/me/trades${mode ? `?mode=${mode}` : ''}`),
  dailyPnl: (month: string) => apiFetch<Record<string, number>>(`/v1/me/performance/daily?month=${month}`),
  summary: () => apiFetch<{ total_trades: number; total_pnl: number; win_rate: number }>('/v1/me/performance/summary'),
  settings: () =>
    apiFetch<{ default_mode: string; max_contracts: number; allowed_tickers: string | null; live_trading_enabled: boolean }>(
      '/v1/me/settings',
    ),
  updateSettings: (body: {
    default_mode: string
    max_contracts: number
    allowed_tickers: string | null
    live_trading_enabled: boolean
  }) => apiFetch('/v1/me/settings', { method: 'PUT', body: JSON.stringify(body) }),
}
