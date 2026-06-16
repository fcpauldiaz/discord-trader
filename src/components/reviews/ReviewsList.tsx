import type { Review } from '#/lib/review-types'
import ReviewCard from '#/components/reviews/ReviewCard'

export default function ReviewsList({ reviews }: { reviews: Review[] }) {
  if (!reviews.length) {
    return <p className="text-sm text-[var(--sea-ink-soft)]">No reviews yet. Be the first paying customer to share feedback.</p>
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  )
}
