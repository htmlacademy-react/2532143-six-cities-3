import { useEffect } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { MainPage } from '@/pages/main-page/main-page'
import ErrorPage from '@/pages/error-page'
import { AppRoute } from './const'
import { AuthorizationPage } from '@/pages/authorization-page'
import { OfferPage } from '@/pages/offer-page'
import { PrivateRoute } from '@/components/private-route'
import { FavoritesPage } from '@/pages/favorites-page'
import { checkAuthStatus, fetchOffers } from '@/store/reducer'
import { useAppDispatch } from '@/store/hooks'

function App(): JSX.Element {
  const dispatch = useAppDispatch()

  useEffect(() => {
    void dispatch(checkAuthStatus()).finally(() => {
      dispatch(fetchOffers())
    })
  }, [dispatch])

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage />} />
        <Route path={AppRoute.Login} element={<AuthorizationPage />} />
        <Route path={AppRoute.Offer} element={<OfferPage />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
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
