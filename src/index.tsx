import React from 'react'
import ReactDOM from 'react-dom/client'
import { Settings } from './const'
import App from 'src/app'
import { offers } from './mocks/offers'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <App offersCount={Settings.offersCount} offer={offers} />
  </React.StrictMode>,
)
