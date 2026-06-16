const FEATURES = [
  {
    title: 'Desktop alert capture',
    description: 'macOS and Windows notifications are forwarded automatically — no manual webhook setup.',
  },
  {
    title: 'AI trade parsing',
    description: 'Discord-style alerts become structured buy/sell intents with strike, expiry, and price.',
  },
  {
    title: 'Chain validation',
    description: 'Strike, expiration, and liquidity are checked against live option chains before any order.',
  },
  {
    title: 'Multi-broker execution',
    description: 'Connect Schwab or Tradier and trade in paper or live mode from one dashboard.',
  },
  {
    title: 'Subscription gating',
    description: 'Pro unlocks automated execution; free accounts can explore the platform.',
  },
  {
    title: 'Performance dashboard',
    description: 'P&L calendar, trade history, and sizing controls in one place.',
  },
] as const

export default function FeaturesSection() {
  return (
    <section className="marketing-section page-wrap px-4">
      <h2 className="marketing-section-title">Features</h2>
      <p className="marketing-section-subtitle">
        A complete product stack — desktop capture, AI parsing, and broker execution.
      </p>
      <div className="feature-grid">
        {FEATURES.map((feature) => (
          <article key={feature.title} className="feature-item">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
