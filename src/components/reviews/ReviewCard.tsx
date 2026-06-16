import type { Review } from '#/lib/review-types'

function stars(rating: number): string {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating)
}

type ReviewCardProps = {
  review: Review
  compact?: boolean
}

export default function ReviewCard({ review, compact = false }: ReviewCardProps) {
  if (compact) {
    return (
      <article className="review-list-item">
        <p className="review-list-meta">
          <span className="review-list-author">{review.author_name}</span>
          {review.verified_customer && <span className="review-badge">Verified</span>}
          <span className="review-list-stars" aria-label={`${review.rating} out of 5 stars`}>
            {stars(review.rating)}
          </span>
        </p>
        <p className="review-list-body">{review.body}</p>
      </article>
    )
  }

  return (
    <article className="feature-item">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <p className="m-0 font-semibold text-[var(--foreground)]">{review.author_name}</p>
        {review.verified_customer && <span className="review-badge">Verified customer</span>}
      </div>
      <p className="mb-2 text-sm text-[var(--primary)]" aria-label={`${review.rating} out of 5 stars`}>
        {stars(review.rating)}
      </p>
      <p className="mb-3 text-sm leading-relaxed text-[var(--muted-foreground)]">{review.body}</p>
      <p className="m-0 text-xs text-[var(--muted-foreground)]">
        {new Date(review.created_at).toLocaleDateString()}
      </p>
    </article>
  )
}
