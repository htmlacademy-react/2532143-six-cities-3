import React from 'react'
import ReactDOM from 'react-dom/client'
import { Settings } from './const'
import App from 'src/app'
import { mockOffers } from './mocks/offers'
import { CITY } from './mocks/city'
import { mockReviews } from './mocks/reviews'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <App
      offersCount={Settings.offersCount}
      offers={mockOffers}
      city={CITY}
      reviews={mockReviews}
    />
  </React.StrictMode>,
)
