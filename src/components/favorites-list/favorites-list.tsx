import { FavoritesListItem } from '@/components/favorites-list-item'
import { offers } from '@/mocks/offers'

function FavoritesList(): JSX.Element {
  const offersByCity = offers.reduce(
    (acc, offer) => {
      ;(acc[offer.city.name] ||= []).push(offer)
      return acc
    },
    {} as Record<string, typeof offers>,
  )

  const cityNames = Object.keys(offersByCity)

  return (
    <ul className="favorites__list">
      {cityNames.map((cityName) => (
        <FavoritesListItem
          key={cityName}
          cityName={cityName}
          offers={offersByCity[cityName]}
        />
      ))}
    </ul>
  )
}

export { FavoritesList }
