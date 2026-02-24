import { Card } from '../card'
import { Offers } from '@/types/cards'

type NearPlacesListProps = {
  offers: Offers
}

function NearPlacesList({ offers }: NearPlacesListProps): JSX.Element {
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {offers.slice(0, 3).map((offer) => (
          <Card key={offer.id} offer={offer} cardType="near" />
        ))}
      </div>
    </section>
  )
}

export { NearPlacesList }
