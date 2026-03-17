import { ReviewsForm } from '@/components/reviews-form'
import { User } from '@/components/user'
import { Reviews } from '@/types/reviews'
import dayjs from 'dayjs'
import { Rating } from '../rating'

type OfferReviewsProps = {
  reviews: Reviews
}

function OfferReviews({ reviews }: OfferReviewsProps): JSX.Element {
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
                  <Rating rating={reviewsItem.rating} />
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
      <ReviewsForm />
    </section>
  )
}

export { OfferReviews }
