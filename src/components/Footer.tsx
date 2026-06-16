import { Link } from '@tanstack/react-router'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-20 border-t border-[var(--line)] px-4 pb-14 pt-10 text-[var(--sea-ink-soft)]">
      <div className="page-wrap flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p className="m-0 text-sm">
          &copy; {year} Trade Platform. Not financial advice — trading involves risk.
        </p>
        <p className="island-kicker m-0">Pairs with Notification Watcher</p>
      </div>
      <div className="page-wrap mt-4 flex flex-wrap justify-center gap-4 text-sm sm:justify-start">
        <Link to="/terms" className="text-[var(--sea-ink-soft)] no-underline hover:text-[var(--sea-ink)]">Terms</Link>
        <Link to="/privacy" className="text-[var(--sea-ink-soft)] no-underline hover:text-[var(--sea-ink)]">Privacy</Link>
        <Link to="/support" className="text-[var(--sea-ink-soft)] no-underline hover:text-[var(--sea-ink)]">Support</Link>
      </div>
    </footer>
  )
}
