import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { MainPage } from '../../pages/mainPage/mainPage';
import { AppRoute, AuthorizationStatus } from '../../const';
import ErrorPage from '../../pages/errorPage/errorPage';
import AuthorizationPage from '../../pages/authorizationPage/authorizationPage';
import OffersPage from '../../pages/offersPage/offersPage';
import FavoritesPage from '../../pages/favoritesPage/favoritesPage';
import PrivateRoute from '../private-route/private-route';


type AppScreenProps = {
  offersCount: number;
}

function App({offersCount}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage offersCount = {offersCount}/>}
        />
        <Route
          path={AppRoute.Login}
          element={<AuthorizationPage />}
        />
        <Route
          path={AppRoute.Offer}
          element={<OffersPage />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.NoAuth}
            >
              <FavoritesPage />
            </PrivateRoute>

          }
        />
        <Route
          path='*'
          element={<ErrorPage />}
        />

      </Routes>
    </BrowserRouter>

  );
}

export default App;
