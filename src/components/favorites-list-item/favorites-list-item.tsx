import { offers } from '@/mocks/offers'
import { FavoritesCard } from '../favorites-card'

type FavoritesListItemProps = {
  cityName: string
}

function FavoritesListItem({ cityName }: FavoritesListItemProps): JSX.Element {
  const cityOffers = offers.filter((offer) => offer.city.name === cityName)

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{cityName}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {cityOffers.map((offer) => (
          <FavoritesCard key={offer.id} offer={offer} />
        ))}
      </div>
    </li>
  )
}

export { FavoritesListItem }
