import { Link } from '@tanstack/react-router'
import ThemeToggle from './ThemeToggle'
import { isLoggedIn } from '#/lib/auth'

export default function Header() {
  const loggedIn = typeof window !== 'undefined' && isLoggedIn()
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--header-bg)] px-4 backdrop-blur-lg">
      <nav className="page-wrap flex flex-wrap items-center gap-x-3 gap-y-2 py-3 sm:py-4">
        <h2 className="m-0 flex-shrink-0 text-base font-semibold tracking-tight">
          <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1.5 text-sm text-[var(--sea-ink)] no-underline sm:px-4 sm:py-2">
            <span className="h-2 w-2 rounded-full bg-[linear-gradient(90deg,#56c6be,#7ed3bf)]" />
            Trade Platform
          </Link>
        </h2>
        <div className="order-3 flex w-full flex-wrap items-center gap-x-4 gap-y-1 pb-1 text-sm font-semibold sm:order-none sm:w-auto sm:flex-nowrap sm:pb-0">
          <Link to="/" className="nav-link" activeProps={{ className: 'nav-link is-active' }}>Home</Link>
          <Link to="/pricing" className="nav-link" activeProps={{ className: 'nav-link is-active' }}>Pricing</Link>
          {loggedIn ? (
            <>
              <Link to="/dashboard" className="nav-link" activeProps={{ className: 'nav-link is-active' }}>Dashboard</Link>
              <Link to="/connections" className="nav-link" activeProps={{ className: 'nav-link is-active' }}>Connections</Link>
              <Link to="/webhooks" className="nav-link" activeProps={{ className: 'nav-link is-active' }}>Webhooks</Link>
              <Link to="/billing" className="nav-link" activeProps={{ className: 'nav-link is-active' }}>Billing</Link>
              <Link to="/settings" className="nav-link" activeProps={{ className: 'nav-link is-active' }}>Settings</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link" activeProps={{ className: 'nav-link is-active' }}>Log in</Link>
              <Link to="/signup" className="nav-link" activeProps={{ className: 'nav-link is-active' }}>Sign up</Link>
            </>
          )}
        </div>
        <div className="ml-auto"><ThemeToggle /></div>
      </nav>
    </header>
  )
}
