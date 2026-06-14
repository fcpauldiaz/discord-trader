# Trade Platform — Product Register

## Audience
Active options traders who follow Discord alert channels and want automated execution with guardrails.

## Core jobs
1. Subscribe and connect a broker
2. Copy webhook URL into Notification Watcher
3. Monitor P&L and trade history on the dashboard

## Information hierarchy (dashboard)
1. Monthly P&L calendar (primary)
2. KPI strip (MTD P&L, win rate, trade count, paper/live filter)
3. Trade table (secondary, sortable)

## Gating
- Free: marketing, signup, view empty dashboard with upgrade CTA
- Pro: webhook URL, broker connections, trade processing

## Pages
| Route | Purpose |
|-------|---------|
| `/` | Marketing |
| `/pricing` | Lemon Squeezy checkout |
| `/dashboard` | Performance |
| `/connections` | Broker OAuth |
| `/webhooks` | Webhook URL |
| `/settings` | Paper/live, caps, tickers |
| `/billing` | Subscription management |

## API dependency
All authenticated data comes from `trade-receiver` REST API (`VITE_RECEIVER_API_URL`).
