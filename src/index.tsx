import React from 'react'
import ReactDOM from 'react-dom/client'
import { Settings } from './const'
import App from 'src/app'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <App offersCount={Settings.offersCount} />
  </React.StrictMode>,
)
