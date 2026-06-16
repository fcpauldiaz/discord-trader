import { Link } from '@tanstack/react-router'

export default function UpgradeBanner() {
  return (
    <div className="feature-item border-[hsl(var(--primary))] bg-[hsl(var(--muted))]">
      <h3 className="mb-2 text-base font-semibold">Subscription required</h3>
      <p className="mb-4 text-sm text-[var(--muted-foreground)]">
        An active Pro subscription is required for this feature.
      </p>
      <Link to="/pricing" className="btn-primary btn-sm">
        View pricing
      </Link>
    </div>
  )
}
