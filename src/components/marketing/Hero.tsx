import { Link } from '@tanstack/react-router'

export default function Hero() {
  return (
    <section className="marketing-hero">
      <div className="page-wrap px-4 sm:px-6 lg:px-8">
        <div className="marketing-hero-inner">
          <div>
            <span className="marketing-badge">Discord alerts → executed trades</span>
            <h1>
              Turn notification alerts into{' '}
              <span className="marketing-hero-highlight">broker orders</span> automatically
            </h1>
            <p className="marketing-hero-lead">
              Install the desktop app, sign in once, and let AI handle the rest.
            </p>
            <p className="marketing-hero-sub">
              Parse Discord-style alerts, validate option chains, and route orders to Schwab or
              Tradier — paper or live.
            </p>
            <div className="marketing-hero-actions">
              <Link to="/signup" className="btn-primary btn-primary-lg">
                Get started — automate alerts
              </Link>
              <Link to="/pricing" className="btn-secondary">
                View pricing
              </Link>
            </div>
            <p className="marketing-hero-note">Set up in minutes. No webhook URLs to copy.</p>
          </div>
          <div className="marketing-hero-visual">
            <div className="marketing-hero-card-shadow" aria-hidden="true" />
            <div className="marketing-hero-card">
              <h3>How a trade flows</h3>
              <ul>
                <li>1. Desktop app captures the alert</li>
                <li>2. AI parses strike, expiry, action</li>
                <li>3. Chain validation runs</li>
                <li>4. Broker places the order</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
