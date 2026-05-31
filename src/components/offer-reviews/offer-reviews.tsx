import { ReviewsForm } from '@/components/reviews-form'
import { User } from '@/components/user'
import { AuthorizationStatus } from '@/const'
import { useAppSelector } from '@/store/hooks'
import {
  selectAuthorizationStatus,
  selectOfferPageReviews,
} from '@/store/selectors'
import dayjs from 'dayjs'
import { Rating } from '../rating'

type OfferReviewsProps = {
  offerId: string
}

function OfferReviews({ offerId }: OfferReviewsProps): JSX.Element {
  const reviews = useAppSelector(selectOfferPageReviews)
  const authorizationStatus = useAppSelector(selectAuthorizationStatus)

  const isLoggedIn = authorizationStatus === AuthorizationStatus.Auth

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot;{' '}
        <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((reviewsItem) => (
          <li key={reviewsItem.id} className="reviews__item">
            <User reviewsItem={reviewsItem} type="reviews" />
            <div className="reviews__info">
              <div className="reviews__rating rating">
                <div className="reviews__stars rating__stars">
                  <Rating rating={reviewsItem.rating} variant="reviews" />
                  <span className="visually-hidden">Rating</span>
                </div>
              </div>
              <p className="reviews__text">{reviewsItem.comment}</p>
              <time className="reviews__time" dateTime={reviewsItem.date}>
                {dayjs(reviewsItem.date).format('MMMM YYYY')}
              </time>
            </div>
          </li>
        ))}
      </ul>
      {isLoggedIn ? <ReviewsForm offerId={offerId} /> : null}
    </section>
  )
}

export { OfferReviews }
