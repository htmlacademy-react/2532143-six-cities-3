import { FormEvent, useState } from 'react'
import { isAxiosError } from 'axios'
import { RatingItem } from '@/components/rating-item'
import { postOfferComment } from '@/store/reducer'
import { useAppDispatch } from '@/store/hooks'

const MIN_COMMENT_LENGTH = 50
const MAX_COMMENT_LENGTH = 300

type ReviewsFormProps = {
  offerId: string
}

function ReviewsForm({ offerId }: ReviewsFormProps): JSX.Element {
  const dispatch = useAppDispatch()
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(0)
  const [isSending, setIsSending] = useState(false)
  const [errorText, setErrorText] = useState<string | null>(null)

  const commentOk =
    comment.length >= MIN_COMMENT_LENGTH && comment.length <= MAX_COMMENT_LENGTH
  const ratingOk = rating >= 1 && rating <= 5
  const canSubmit = ratingOk && commentOk && !isSending

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    if (!canSubmit) {
      return
    }

    setErrorText(null)
    setIsSending(true)

    dispatch(postOfferComment({ offerId, comment, rating }))
      .unwrap()
      .then(() => {
        setComment('')
        setRating(0)
      })
      .catch((error: unknown) => {
        if (isAxiosError(error)) {
          const details = error.response?.data as
            | { message?: string }
            | undefined
          setErrorText(
            details?.message ?? error.message ?? 'Не удалось отправить отзыв',
          )
          return
        }
        setErrorText('Не удалось отправить отзыв')
      })
      .finally(() => {
        setIsSending(false)
      })
  }

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

      {errorText ? (
        <p className="reviews__error" style={{ color: '#c1131e' }}>
          {errorText}
        </p>
      ) : null}

      <RatingItem
        rating={rating}
        onRatingChange={setRating}
        disabled={isSending}
      />

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        disabled={isSending}
        maxLength={MAX_COMMENT_LENGTH}
        onChange={(evt) => setComment(evt.target.value)}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least{' '}
          <b className="reviews__text-amount">
            {MIN_COMMENT_LENGTH} characters
          </b>{' '}
          and at most{' '}
          <b className="reviews__text-amount">
            {MAX_COMMENT_LENGTH} characters
          </b>
          .
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!canSubmit}
          aria-busy={isSending}
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export { ReviewsForm }
