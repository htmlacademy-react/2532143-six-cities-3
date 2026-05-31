import { Card } from '@/components/card'
import { OffersListItem } from '@/types/offers'
import clsx from 'clsx'
import styles from './favorites-list-item.module.css'

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
          <button
            type="button"
            className={clsx('locations__item-link', styles.cityLabel)}
          >
            <span>{cityName}</span>
          </button>
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
