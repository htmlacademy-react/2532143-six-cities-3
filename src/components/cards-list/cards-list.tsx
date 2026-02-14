import { Card } from '@/components/card'
import { Offer } from '@/types/cards'
import { useState } from 'react'

type OffersListProps = {
  offer: Offer
}

function CardsList({ offer }: OffersListProps): JSX.Element {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  return (
    <div className="cities__places-list places__list tabs__content">
      {offer.map((item) => (
        <Card
          key={item.id}
          offer={item}
          onMouseEnter={() => setSelectedId(item.id)}
          isSelected={selectedId}
        />
      ))}
    </div>
  )
}

export { CardsList }
