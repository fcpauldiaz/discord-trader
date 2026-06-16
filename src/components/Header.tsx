import { Link, useNavigate } from '@tanstack/react-router'
import ThemeToggle from './ThemeToggle'
import { clearReceiverTokenCache } from '#/lib/api-client'
import { signOut, useSession } from '#/lib/auth-client'

export default function Header() {
  const { data: session, isPending } = useSession()
  const navigate = useNavigate()
  const loggedIn = Boolean(session?.user)

  async function logout() {
    clearReceiverTokenCache()
    await signOut()
    navigate({ to: '/' })
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--header-bg)] px-4 backdrop-blur-lg">
      <nav className="page-wrap flex flex-wrap items-center gap-x-3 gap-y-2 py-3 sm:py-4">
        <h2 className="m-0 flex-shrink-0 text-base font-semibold tracking-tight">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--sea-ink)] no-underline">
            Trade Platform
          </Link>
        </h2>
        <div className="order-3 flex w-full flex-wrap items-center gap-x-4 gap-y-1 pb-1 text-sm font-semibold sm:order-none sm:w-auto sm:flex-nowrap sm:pb-0">
          <Link to="/" className="nav-link" activeProps={{ className: 'nav-link is-active' }}>Home</Link>
          <Link to="/pricing" className="nav-link" activeProps={{ className: 'nav-link is-active' }}>Pricing</Link>
          <Link to="/reviews" className="nav-link" activeProps={{ className: 'nav-link is-active' }}>Reviews</Link>
          {loggedIn ? (
            <>
              <Link to="/dashboard" className="nav-link" activeProps={{ className: 'nav-link is-active' }}>Dashboard</Link>
              <Link to="/connections" className="nav-link" activeProps={{ className: 'nav-link is-active' }}>Connections</Link>
              <Link to="/billing" className="nav-link" activeProps={{ className: 'nav-link is-active' }}>Billing</Link>
              <Link to="/settings" className="nav-link" activeProps={{ className: 'nav-link is-active' }}>Settings</Link>
              <button type="button" onClick={logout} className="nav-link border-0 bg-transparent p-0">
                Log out
              </button>
            </>
          ) : !isPending ? (
            <>
              <Link to="/login" className="nav-link" activeProps={{ className: 'nav-link is-active' }}>Log in</Link>
              <Link to="/signup" className="nav-link" activeProps={{ className: 'nav-link is-active' }}>Sign up</Link>
            </>
          ) : null}
        </div>
        <div className="ml-auto"><ThemeToggle /></div>
      </nav>
    </header>
  )
}
