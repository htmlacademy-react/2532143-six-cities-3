import { Badge } from '@/components/badge'
import { FavoritesButton } from '../favorites-button'
import { OffersListItem } from '@/types/cards'
import { generatePath, Link } from 'react-router-dom'
import { AppRoute } from '@/const'

type FavoritesCardProps = {
  offer: OffersListItem
}

function FavoritesCard({ offer }: FavoritesCardProps): JSX.Element {
  const { id, title, price, type, previewImage, isPremium, rating } = offer
  const ratingPercentage = (rating / 5) * 100

  return (
    <article className="favorites__card place-card">
      {isPremium && <Badge type="place-card" text="Premium" />}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={generatePath(AppRoute.Offer, { id })}>
          <img
            className="place-card__image"
            src={previewImage}
            width="150"
            height="110"
            alt="Place image"
          />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoritesButton type="place-card" isActive />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span
              style={{
                width: `${ratingPercentage}%`,
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

export { FavoritesCard }
