import { OFFER_INSIDE_ITEMS } from '@/const'

function OfferInside(): JSX.Element {
  return (
    <div className="offer__inside">
      <h2 className="offer__inside-title">What&apos;s inside</h2>
      <ul className="offer__inside-list">
        {OFFER_INSIDE_ITEMS.map((item) => (
          <li key={item} className="offer__inside-item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export { OfferInside }
