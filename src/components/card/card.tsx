import { AppRoute } from '@/const'
import { OffersListItem } from '@/types/cards'
import { Badge } from '@/components/badge'
import { generatePath, Link } from 'react-router-dom'
import { FavoritesButton } from '../favorites-button'

type CardsScreenProps = {
  offer: OffersListItem
  onMouseEnter: () => void
  isSelected?: string | null
}

function Card({
  offer,
  onMouseEnter,
  isSelected,
}: CardsScreenProps): JSX.Element {
  const { id, title, price, type, previewImage, isPremium } = offer

  return (
    <article
      onMouseEnter={onMouseEnter}
      className="cities__card place-card"
      id={id}
      data-selected={isSelected ?? ''}
    >
      {isPremium && <Badge text="Premium" />}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={generatePath(AppRoute.Offer, { id })}>
          <img
            className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoritesButton />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span
              style={{
                width: '80%',
              }}
            ></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={generatePath(AppRoute.Offer, { id })}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  )
}

export { Card }
