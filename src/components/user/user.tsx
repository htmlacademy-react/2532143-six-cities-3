type UserProps = {
  name: string
  type: 'offer' | 'reviews'
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

function User({ name, type, isPro }: UserProps): JSX.Element {
  const { width, height } = sizes[type]

  return (
    <div
      className={`${type === 'offer' ? 'offer__host-user' : 'reviews__user'} user ${isPro ? `${type}__user--pro` : ''}`}
    >
      <div
        className={`${type}__avatar-wrapper ${isPro ? `${type}__avatar-wrapper--pro` : ''} user__avatar-wrapper`}
      >
        <img
          className={`${type}__avatar user__avatar`}
          src={`img/avatar-${name.toLowerCase()}.jpg`}
          width={width}
          height={height}
          alt={`${type === 'offer' ? 'Host' : 'Reviews'} avatar`}
        />
      </div>
      <span className={`${type}__user-name`}>{name}</span>
      {isPro && <span className={`${type}__user-status`}>Pro</span>}
    </div>
  )
}

export { User }
