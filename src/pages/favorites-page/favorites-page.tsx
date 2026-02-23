import { FavoritesList } from '@/components/favorites-list'
import { Header } from '@/components/header'
import { Logo } from '@/components/logo'

function FavoritesPage(): JSX.Element {
  return (
    <body>
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
    </body>
  )
}

export { FavoritesPage }
