# Trade Platform

TanStack Start marketing site and logged-in app for broker connections, webhooks, billing, and performance dashboards.

## Quick start

```bash
cd trade-platform
cp .env.example .env
npm install
npm run dev
```

Set `VITE_RECEIVER_API_URL` to your running [trade-receiver](https://github.com/) instance.

## Routes

| Route | Description |
|-------|-------------|
| `/` | Marketing landing |
| `/pricing` | Lemon Squeezy checkout |
| `/login`, `/signup` | API key auth |
| `/dashboard` | P&L calendar + trade table |
| `/connections` | Tradier + Schwab connect |
| `/webhooks` | Webhook URL (paid) |
| `/settings` | Paper/live, caps, tickers |
| `/billing` | Subscription status |

## Tests & CI

```bash
npm run test
npm run build
```

## Design

See `PRODUCT.md` and `DESIGN.md` for impeccable product/brand registers.
