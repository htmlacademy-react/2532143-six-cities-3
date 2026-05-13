import type { OfferDetail } from '@/types/offer-detail'
import { OFFER_TYPE_LABELS } from '@/types/offer-detail'

type OfferFeaturesProps = {
  offer: OfferDetail
}

function OfferFeatures({ offer }: OfferFeaturesProps): JSX.Element {
  const typeLabel = OFFER_TYPE_LABELS[offer.type] ?? offer.type
  const bedroomsLabel =
    offer.bedrooms === 1 ? '1 Bedroom' : `${offer.bedrooms} Bedrooms`
  const adultsLabel =
    offer.maxAdults === 1 ? 'Max 1 adult' : `Max ${offer.maxAdults} adults`

  return (
    <ul className="offer__features">
      <li className="offer__feature offer__feature--entire">{typeLabel}</li>
      <li className="offer__feature offer__feature--bedrooms">
        {bedroomsLabel}
      </li>
      <li className="offer__feature offer__feature--adults">{adultsLabel}</li>
    </ul>
  )
}

export { OfferFeatures }
