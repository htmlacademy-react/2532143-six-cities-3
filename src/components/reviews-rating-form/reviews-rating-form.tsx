import { useState } from 'react'

const RATING_VALUES = [5, 4, 3, 2, 1] as const

const RATING_TITLES = {
  5: 'perfect',
  4: 'good',
  3: 'not bad',
  2: 'badly',
  1: 'terribly',
} as const

function ReviewsRatingForm(): JSX.Element {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null)

  return (
    <div
      className="reviews__rating-form form__rating"
      onMouseLeave={() => setHoveredRating(null)}
    >
      {RATING_VALUES.map((number) => (
        <div key={number} onMouseEnter={() => setHoveredRating(number)}>
          <input
            className="form__rating-input visually-hidden"
            name="rating"
            value={number}
            id={`${number}-stars`}
            type="radio"
          />
          <label
            htmlFor={`${number}-stars`}
            className={`reviews__rating-label form__rating-label ${
              hoveredRating !== null && number <= hoveredRating
                ? 'is-active'
                : ''
            }`}
            title={RATING_TITLES[number]}
          >
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>
        </div>
      ))}
    </div>
  )
}

export { ReviewsRatingForm }
