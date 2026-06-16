import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/support')({ component: SupportPage })

function SupportPage() {
  return (
    <main className="page-wrap max-w-2xl space-y-4 px-4 py-10">
      <h1 className="text-3xl font-bold">Support</h1>
      <p className="text-sm text-[var(--sea-ink-soft)]">
        Email support@tradeplatform.example or open an issue on GitHub for bugs and feature requests.
      </p>
      <ul className="list-disc space-y-2 pl-5 text-sm">
        <li>Desktop app — install Notification Watcher and sign in with your platform account</li>
        <li><Link to="/connections">Broker connections</Link> — Tradier and Schwab OAuth</li>
        <li><Link to="/billing">Billing</Link> — subscription and renewals</li>
      </ul>
    </main>
  )
}
