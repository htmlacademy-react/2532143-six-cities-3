import { Header } from '@/components/header'
import { MainList } from '@/components/main-list'
import { Offers } from '@/types/cards'
import { SortList } from '@/components/sort-list'
import { Map } from '@/components/map'
import { Tabs } from '@/components/tabs'

type MainPageProps = {
  offersCount: number
  offers: Offers
}

function MainPage({ offersCount, offers }: MainPageProps): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Tabs />

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {offersCount} places to stay in Amsterdam
              </b>
              <SortList />
              <MainList offers={offers} />
            </section>

            <div className="cities__right-section">
              <Map className="cities__map" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export { MainPage }
