import { FavoritesListItem } from '@/components/favorites-list-item'
import { Offers } from '@/types/offers'
import { useAppSelector } from '@/store/hooks'
import { selectOffers } from '@/store/selectors'

function FavoritesList(): JSX.Element {
  const offers = useAppSelector(selectOffers)

  const offersByCity = offers.reduce(
    (acc, offer) => {
      ;(acc[offer.city.name] ||= []).push(offer)
      return acc
    },
    {} as Record<string, Offers>,
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
