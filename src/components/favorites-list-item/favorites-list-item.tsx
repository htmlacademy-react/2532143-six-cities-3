import { Card } from '@/components/card'
import { OffersListItem } from '@/types/offers'

type FavoritesListItemProps = {
  cityName: string
  offers: OffersListItem[]
}

function FavoritesListItem({
  cityName,
  offers,
}: FavoritesListItemProps): JSX.Element {
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
        {offers.map((offer) => (
          <Card key={offer.id} offer={offer} cardType="favorites-list" />
        ))}
      </div>
    </li>
  )
}

export { FavoritesListItem }
