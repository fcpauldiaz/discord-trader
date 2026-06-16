# Trade Platform

TanStack Start marketing site and logged-in app for broker connections, webhooks, billing, and performance dashboards.

## Quick start

```bash
cd trade-platform
cp .env.example .env
npm install
npx auth migrate   # first run only — creates Better Auth tables
npm run dev
```

Also run [trade-receiver](https://github.com/fcpauldiaz/trade-receiver) on port 8000. Set `VITE_RECEIVER_API_URL` and matching `INTERNAL_API_SECRET` on both services.

## Auth

Sign up and log in use **Better Auth** (email + password). Sessions live in a platform SQLite DB (`DATABASE_URL`). On signup, the platform provisions a linked user in trade-receiver via `POST /v1/internal/provision`.

API calls to trade-receiver use a **Better Auth JWT** (`Authorization: Bearer …`), not cookies.

### Environment

| Variable | Purpose |
|----------|---------|
| `BETTER_AUTH_SECRET` | Session signing (32+ chars) |
| `BETTER_AUTH_URL` | Public platform URL |
| `DATABASE_URL` | Better Auth SQLite path (`file:./data/auth.db`) |
| `INTERNAL_API_SECRET` | Must match receiver — provisions users on signup |
| `VITE_RECEIVER_API_URL` | trade-receiver API base |

### Legacy users (API-key signup)

If you had an account before Better Auth, sign up again with the **same email**. The receiver links your existing subscription and trade history to the new auth account.

## Routes

| Route | Description |
|-------|-------------|
| `/` | Marketing landing |
| `/reviews` | Public customer reviews + submit form for paid subscribers |
| `/pricing` | Lemon Squeezy checkout |
| `/login`, `/signup` | Email + password (Better Auth) |
| `/dashboard` | P&L calendar + trade table |
| `/connections` | Tradier + Schwab connect + test connection |
| `/onboarding` | Post-connect sizing setup + SPY test order |
| `/webhooks` | Webhook URL (paid) |
| `/settings` | Paper/live, sizing mode, caps, tickers |
| `/billing` | Subscription status |

## Deploy on Coolify (Dockerfile)

Use the repo **Dockerfile** — do not use Nixpacks (it pins Node 22.11, which is too old for TanStack Start).

| Setting | Value |
|---------|--------|
| Build Pack | **Dockerfile** |
| Port | `3000` |
| Start command | leave empty (uses image `CMD`) |

**Build-time variables** (required for client bundle):

| Variable | Example |
|----------|---------|
| `VITE_RECEIVER_API_URL` | `https://api.yourdomain.com` |
| `VITE_LEMON_SQUEEZY_CHECKOUT_URL` | your checkout URL |

**Runtime variables:**

| Variable | Example |
|----------|---------|
| `BETTER_AUTH_SECRET` | 32+ char secret |
| `BETTER_AUTH_URL` | `https://app.yourdomain.com` |
| `DATABASE_URL` | `file:./data/auth.db` |
| `INTERNAL_API_SECRET` | same as trade-receiver |
| `RECEIVER_API_URL` | trade-receiver URL (server-side provisioning) |
| `PORT` | `3000` |

Mount a persistent volume on `/app/data` for the Better Auth SQLite database.

## Tests & CI

```bash
npm run test
npm run build
```

## Design

See `PRODUCT.md` and `DESIGN.md` for impeccable product/brand registers.
