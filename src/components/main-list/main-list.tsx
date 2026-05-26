import { Card } from '@/components/card'
import { Offers } from '@/types/offers'
import { memo } from 'react'

type OffersListProps = {
  offers: Offers
  onCardHover: (id: string) => void
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
          onMouseEnter={onCardHover}
          onMouseLeave={onCardLeave}
          cardType="main-list"
        />
      ))}
    </div>
  )
}

const MainListMemo = memo(MainList)
MainListMemo.displayName = 'MainListMemo'

export { MainListMemo as MainList }
