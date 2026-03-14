import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { MainPage } from '@/pages/main-page/main-page'
import ErrorPage from '@/pages/error-page'
import { AppRoute, AuthorizationStatus } from './const'
import { AuthorizationPage } from '@/pages/authorization-page'
import { OfferPage } from '@/pages/offer-page'
import { PrivateRoute } from '@/components/private-route'
import { FavoritesPage } from '@/pages/favorites-page'
import { Offers } from './types/offers'
import { City } from './types/offers'
import { Reviews } from './types/reviews'

type AppScreenProps = {
  offersCount: number
  offers: Offers
  city: City
  reviews: Reviews
}

function App({
  offersCount,
  offers,
  city,
  reviews,
}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <MainPage offersCount={offersCount} offers={offers} city={city} />
          }
        />
        <Route path={AppRoute.Login} element={<AuthorizationPage />} />
        <Route
          path={AppRoute.Offer}
          element={
            <OfferPage
              offers={offers}
              reviews={reviews}
              reviewsItem={reviews[0]}
            />
          }
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
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
