import { Card } from '../card'
import { Offers, OffersListItem } from '@/types/cards'

type NearPlacesListProps = {
  offers: Offers
  onCardHover?: (offer: OffersListItem) => void
  onCardLeave?: () => void
}

function NearPlacesList({
  offers,
  onCardHover,
  onCardLeave,
}: NearPlacesListProps): JSX.Element {
  const nearPlacesCount = 3
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {offers.slice(0, nearPlacesCount).map((offer) => (
          <Card
            key={offer.id}
            offer={offer}
            cardType="near"
            onMouseEnter={() => onCardHover?.(offer)}
            onMouseLeave={onCardLeave}
          />
        ))}
      </div>
    </section>
  )
}

export { NearPlacesList }
