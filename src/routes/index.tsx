import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { api } from '#/lib/api-client'
import type { Review } from '#/lib/review-types'
import ReviewCard from '#/components/reviews/ReviewCard'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    api.reviews(3).then(setReviews).catch(() => {})
  }, [])

  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <section className="island-shell rise-in relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14">
        <p className="island-kicker mb-3">Notification Watcher → AI → Trade</p>
        <h1 className="display-title mb-5 max-w-3xl text-4xl font-bold tracking-tight text-[var(--sea-ink)] sm:text-6xl">
          Turn Discord alerts into executed options trades.
        </h1>
        <p className="mb-8 max-w-2xl text-base text-[var(--sea-ink-soft)] sm:text-lg">
          Watch macOS or Windows notifications, parse trade signals with AI, validate against live option chains,
          and route orders to Schwab or Tradier — paper or live.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/signup"
            className="rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-5 py-2.5 text-sm font-semibold text-[var(--lagoon-deep)] no-underline"
          >
            Get started
          </Link>
          <Link
            to="/pricing"
            className="rounded-full border border-[rgba(23,58,64,0.2)] bg-white/50 px-5 py-2.5 text-sm font-semibold text-[var(--sea-ink)] no-underline"
          >
            Pricing
          </Link>
        </div>
      </section>
      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          ['AI parsing', 'Discord-style alerts become structured trade intents.'],
          ['Chain validation', 'Strike, expiry, and liquidity checked before any order.'],
          ['Multi-broker', 'Schwab and Tradier with paper + live modes.'],
        ].map(([title, desc]) => (
          <article key={title} className="island-shell rounded-2xl p-5">
            <h2 className="mb-2 font-semibold text-[var(--sea-ink)]">{title}</h2>
            <p className="m-0 text-sm text-[var(--sea-ink-soft)]">{desc}</p>
          </article>
        ))}
      </section>
      <section className="mt-10">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-2xl font-semibold text-[var(--sea-ink)]">Customer reviews</h2>
          <Link to="/reviews" className="text-sm font-semibold text-[var(--lagoon-deep)] no-underline">
            See all reviews →
          </Link>
        </div>
        {reviews.length ? (
          <div className="grid gap-4 sm:grid-cols-3">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-[var(--sea-ink-soft)]">Reviews from paying customers will appear here.</p>
        )}
      </section>
    </main>
  )
}
