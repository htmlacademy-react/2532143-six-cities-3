import { useEffect } from 'react'
import clsx from 'clsx'
import { FavoritesList } from '@/components/favorites-list'
import { Header } from '@/components/header'
import { Logo } from '@/components/logo'
import { Spinner } from '@/components/spinner'
import spinnerStyles from '@/components/spinner/spinner.module.css'
import ErrorPage from '@/pages/error-page'
import { fetchFavoriteOffers } from '@/store/reducer'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  selectHasFavoritesLoadError,
  selectIsFavoritesLoading,
} from '@/store/selectors'

function FavoritesPage(): JSX.Element {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectIsFavoritesLoading)
  const hasLoadError = useAppSelector(selectHasFavoritesLoadError)

  useEffect(() => {
    dispatch(fetchFavoriteOffers())
  }, [dispatch])

  if (isLoading) {
    return (
      <div className="page">
        <Header />
        <main
          className={clsx(
            'page__main',
            'page__main--favorites',
            spinnerStyles.flexMain,
          )}
        >
          <Spinner variant="page" />
        </main>
        <footer className="footer container">
          <Logo type="footer" />
        </footer>
      </div>
    )
  }

  if (hasLoadError) {
    return <ErrorPage />
  }

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>

            <FavoritesList />
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Logo type="footer" />
      </footer>
    </div>
  )
}

export { FavoritesPage }
