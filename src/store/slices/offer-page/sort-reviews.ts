import type { ReviewsItem } from '@/types/reviews'

function sortReviewsNewestFirst(reviews: ReviewsItem[]): ReviewsItem[] {
  return [...reviews].sort((a, b) => {
    const diff = Date.parse(b.date) - Date.parse(a.date)
    return Number.isFinite(diff) ? diff : 0
  })
}

export { sortReviewsNewestFirst }
