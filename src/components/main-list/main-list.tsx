import { Card } from '@/components/card'
import { Offers } from '@/types/cards'
import { useState } from 'react'

type OffersListProps = {
  offers: Offers
}

function MainList({ offers }: OffersListProps): JSX.Element {
  const [, setSelectedId] = useState<string | null>(null)
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((item) => (
        <Card
          key={item.id}
          offer={item}
          onMouseEnter={() => setSelectedId(item.id)}
          onMouseLeave={() => setSelectedId(null)}
          cardType="main-list"
        />
      ))}
    </div>
  )
}

export { MainList }
