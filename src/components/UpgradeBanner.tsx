import { Link } from '@tanstack/react-router'

export default function UpgradeBanner() {
  return (
    <div className="island-shell rounded-2xl border border-[rgba(180,120,40,0.35)] bg-[rgba(255,200,80,0.12)] p-5">
      <h3 className="mb-2 text-lg font-semibold text-[var(--sea-ink)]">Subscription required</h3>
      <p className="mb-4 text-sm text-[var(--sea-ink-soft)]">
        Upgrade to Pro to process trades, connect brokers, and use the desktop app.
      </p>
      <Link
        to="/pricing"
        className="inline-block rounded-full bg-[var(--lagoon-deep)] px-4 py-2 text-sm font-semibold text-white no-underline"
      >
        View pricing
      </Link>
    </div>
  )
}
