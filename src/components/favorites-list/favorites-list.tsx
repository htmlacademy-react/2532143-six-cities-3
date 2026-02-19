import { FavoritesListItem } from '@/components/favorites-list-item'
import { offers } from '@/mocks/offers'

function FavoritesList(): JSX.Element {
  const uniqueCities = Array.from(
    new Set(offers.map((offer) => offer.city.name)),
  )

  return (
    <ul className="favorites__list">
      {uniqueCities.map((cityName) => (
        <FavoritesListItem key={cityName} cityName={cityName} />
      ))}
    </ul>
  )
}

export { FavoritesList }
