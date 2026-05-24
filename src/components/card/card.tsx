import { AppRoute } from '@/const'
import { OffersListItem } from '@/types/offers'
import { Badge } from '@/components/badge'
import { generatePath, Link } from 'react-router-dom'
import { FavoritesButton } from '../favorites-button'
import { Rating } from '../rating'

type CardsScreenProps = {
  offer: OffersListItem
  onMouseEnter?: (id: string) => void
  onMouseLeave?: () => void
  cardType: 'main-list' | 'favorites-list' | 'near'
}

const classes = {
  'main-list': 'cities__card place-card',
  'favorites-list': 'favorites__card place-card',
  near: 'near-places__card place-card',
}

const imageClasses = {
  'main-list': 'cities__image-wrapper place-card__image-wrapper',
  'favorites-list': 'favorites__image-wrapper place-card__image-wrapper',
  near: 'near-places__image-wrapper place-card__image-wrapper',
}

const sizes = {
  'main-list': {
    width: 260,
    height: 200,
  },
  'favorites-list': {
    width: 150,
    height: 110,
  },
  near: {
    width: 260,
    height: 200,
  },
}

function Card({
  offer,
  onMouseEnter,
  onMouseLeave,
  cardType,
}: CardsScreenProps): JSX.Element {
  const { id, title, price, type, previewImage, isPremium, rating } = offer
  const { width, height } = sizes[cardType]
  const cardInfoClassname =
    cardType === 'favorites-list'
      ? 'favorites__card-info place-card__info'
      : 'place-card__info'

  return (
    <article
      onMouseEnter={() => onMouseEnter?.(id)}
      onMouseLeave={onMouseLeave}
      className={classes[cardType]}
      id={id}
    >
      {isPremium && <Badge type="place-card" text="Premium" />}
      <div className={imageClasses[cardType]}>
        <Link to={generatePath(AppRoute.Offer, { id })}>
          <img
            className="place-card__image"
            src={previewImage}
            width={width}
            height={height}
            alt="Place image"
          />
        </Link>
      </div>
      <div className={cardInfoClassname}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoritesButton type="place-card" cardType={cardType} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <Rating rating={rating} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={generatePath(AppRoute.Offer, { id })}>{title}</Link>
        </h2>
        <p className="place-card__type">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </p>
      </div>
    </article>
  )
}

export { Card }
