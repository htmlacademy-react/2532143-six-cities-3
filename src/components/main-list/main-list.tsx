import { Card } from '@/components/card'
import { Offers, OffersListItem } from '@/types/cards'

type OffersListProps = {
  offers: Offers
  onCardHover: (offer: OffersListItem, id: string) => void
  onCardLeave: () => void
}

function MainList({
  offers,
  onCardHover,
  onCardLeave,
}: OffersListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((item) => (
        <Card
          key={item.id}
          offer={item}
          onMouseEnter={() => onCardHover(item, item.id)}
          onMouseLeave={onCardLeave}
          cardType="main-list"
        />
      ))}
    </div>
  )
}

export { MainList }
