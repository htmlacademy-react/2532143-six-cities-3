const RATING_BAR_WIDTH = {
  'place-card': 73,
  offer: 147,
  reviews: 98,
} as const

type RatingVariant = keyof typeof RATING_BAR_WIDTH

type RatingProps = {
  rating: number
  variant?: RatingVariant
}

function getRatingBarWidthPx(rating: number, variant: RatingVariant): number {
  const barWidth = RATING_BAR_WIDTH[variant]
  const roundedRating = Math.round(rating)

  return Math.floor((roundedRating / 5) * barWidth)
}

function Rating({ rating, variant = 'place-card' }: RatingProps): JSX.Element {
  const widthPx = getRatingBarWidthPx(rating, variant)

  return (
    <span
      style={{
        width: `${widthPx}px`,
      }}
    ></span>
  )
}

export { Rating }
export type { RatingVariant }
