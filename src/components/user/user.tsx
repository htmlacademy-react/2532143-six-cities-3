import type { ReviewsItem } from '../../types/reviews.js'

type UserProps = {
  type: 'offer' | 'reviews'
  reviewsItem: ReviewsItem
  isPro?: boolean
}

const sizes = {
  offer: {
    width: 74,
    height: 74,
  },
  reviews: {
    width: 54,
    height: 54,
  },
}

function User({ type, reviewsItem, isPro }: UserProps): JSX.Element {
  const { width, height } = sizes[type]
  const { user } = reviewsItem
  const isProStatus = isPro ?? user.isPro

  return (
    <div
      className={`${type === 'offer' ? 'offer__host-user' : 'reviews__user'} user ${isProStatus ? `${type}__user--pro` : ''}`}
    >
      <div
        className={`${type}__avatar-wrapper ${isProStatus ? `${type}__avatar-wrapper--pro` : ''} user__avatar-wrapper`}
      >
        <img
          className={`${type}__avatar user__avatar`}
          src={user.avatarUrl}
          width={width}
          height={height}
          alt={`${type === 'offer' ? 'Host' : 'Reviews'} avatar`}
        />
      </div>
      <span className={`${type}__user-name`}>{user.name}</span>
      {isProStatus && <span className={`${type}__user-status`}>Pro</span>}
    </div>
  )
}

export { User }
