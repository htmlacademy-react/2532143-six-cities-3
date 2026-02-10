import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { MainPage } from '@/pages/main-page/main-page'
import ErrorPage from '@/pages/error-page'
import { AppRoute, AuthorizationStatus } from './const'
import { AuthorizationPage } from '@/pages/authorization-page'
import { OffersPage } from '@/pages/offers-page'
import { PrivateRoute } from '@/components/private-route'
import { FavoritesPage } from '@/pages/favorites-page'
import { Cards } from './types/cards'

type AppScreenProps = {
  offersCount: number
  cards: Cards
}

function App({ offersCount, cards }: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage offersCount={offersCount} cards={cards} />}
        />
        <Route path={AppRoute.Login} element={<AuthorizationPage />} />
        <Route path={AppRoute.Offer} element={<OffersPage />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
