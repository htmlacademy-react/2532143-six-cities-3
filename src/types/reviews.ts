export type ReviewsItem = {
  id: string
  date: string
  user: {
    name: string
    avatarUrl: string
    isPro: boolean
  }
  comment: string
  rating: number
}

export type Reviews = ReviewsItem[]
