import { Link } from '@tanstack/react-router'

export default function Hero() {
  return (
    <section className="marketing-hero">
      <h1>Turn notification alerts into broker orders automatically</h1>
      <p>
        Install the desktop app, sign in once, and let AI parse your Discord-style alerts,
        validate option chains, and route orders to Schwab or Tradier — paper or live.
      </p>
      <div className="marketing-hero-actions">
        <Link to="/signup" className="btn-primary">
          Get started
        </Link>
        <Link to="/pricing" className="btn-secondary">
          View pricing
        </Link>
      </div>
    </section>
  )
}
