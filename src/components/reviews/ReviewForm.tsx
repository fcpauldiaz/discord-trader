import { useState } from 'react'
import type { Review } from '#/lib/review-types'
import { api } from '#/lib/api-client'

type Props = {
  existing: Review | null
  onSaved: () => void
}

export default function ReviewForm({ existing, onSaved }: Props) {
  const [rating, setRating] = useState(existing?.rating ?? 5)
  const [body, setBody] = useState(existing?.body ?? '')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      await api.submitReview({ rating, body })
      onSaved()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save review')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="island-shell space-y-4 rounded-2xl p-5">
      <h2 className="text-lg font-semibold text-[var(--sea-ink)]">
        {existing ? 'Update your review' : 'Leave a review'}
      </h2>
      <label className="block text-sm">
        Rating
        <select
          className="mt-1 w-full rounded-lg border border-[var(--line)] bg-transparent px-2 py-1"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {n} star{n > 1 ? 's' : ''}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm">
        Your review
        <textarea
          className="mt-1 min-h-28 w-full rounded-lg border border-[var(--line)] bg-transparent px-3 py-2"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={2000}
          required
        />
      </label>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={saving}
        className="rounded-full bg-[var(--lagoon-deep)] px-4 py-2 text-sm text-white disabled:opacity-60"
      >
        {saving ? 'Saving…' : existing ? 'Update review' : 'Publish review'}
      </button>
    </form>
  )
}
