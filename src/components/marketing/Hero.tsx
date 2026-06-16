import { Link } from '@tanstack/react-router'

export default function Hero() {
  return (
    <section className="marketing-hero rise-in">
      <p className="island-kicker mb-3">Discord alerts → executed trades</p>
      <h1>Turn notification alerts into broker orders automatically</h1>
      <p>
        Install the desktop app, sign in once, and let AI parse your alerts, validate option chains,
        and route orders to Schwab or Tradier — paper or live.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
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
