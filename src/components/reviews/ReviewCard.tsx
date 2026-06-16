import type { Review } from '#/lib/review-types'

function stars(rating: number): string {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating)
}

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="island-shell rounded-2xl p-5">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <p className="m-0 font-semibold text-[var(--sea-ink)]">{review.author_name}</p>
        {review.verified_customer && (
          <span className="rounded-full bg-[rgba(79,184,178,0.15)] px-2 py-0.5 text-xs font-medium text-[var(--lagoon-deep)]">
            Verified customer
          </span>
        )}
      </div>
      <p className="mb-2 text-sm tracking-wide text-amber-600" aria-label={`${review.rating} out of 5 stars`}>
        {stars(review.rating)}
      </p>
      <p className="mb-3 text-sm leading-relaxed text-[var(--sea-ink-soft)]">{review.body}</p>
      <p className="m-0 text-xs text-[var(--sea-ink-soft)]">
        {new Date(review.created_at).toLocaleDateString()}
      </p>
    </article>
  )
}
