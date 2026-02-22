import { Fragment } from 'react'

const RATING_VALUES = [5, 4, 3, 2, 1] as const

const RATING_TITLES = {
  5: 'perfect',
  4: 'good',
  3: 'not bad',
  2: 'badly',
  1: 'terribly',
} as const

type RatingItemProps = {
  rating: number
  onRatingChange: (rating: number) => void
}

function RatingItem({ rating, onRatingChange }: RatingItemProps): JSX.Element {
  return (
    <div className="reviews__rating-form form__rating">
      {RATING_VALUES.map((value) => (
        <Fragment key={value}>
          <input
            className="form__rating-input visually-hidden"
            name="rating"
            value={value}
            id={`${value}-stars`}
            type="radio"
            checked={rating === value}
            onChange={() => onRatingChange(value)}
          />
          <label
            htmlFor={`${value}-stars`}
            className="reviews__rating-label form__rating-label"
            title={RATING_TITLES[value]}
          >
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>
        </Fragment>
      ))}
    </div>
  )
}

export { RatingItem }
