type FavoritesButtonProps = {
  type: 'place-card' | 'offer'
  cardType: string
}

const sizes = {
  'place-card': {
    width: 18,
    height: 19,
  },
  offer: {
    width: 31,
    height: 33,
  },
}

function FavoritesButton({
  type,
  cardType,
}: FavoritesButtonProps): JSX.Element {
  const { width, height } = sizes[type]
  const isActive =
    cardType === 'favorites-list' ? 'place-card__bookmark-button--active' : ''

  return (
    <button
      className={`${type}__bookmark-button ${isActive} button `}
      type="button"
    >
      <svg className={`${type}__bookmark-icon`} width={width} height={height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  )
}

export { FavoritesButton }
