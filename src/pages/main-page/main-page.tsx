import { Header } from '@/components/header'
import { MainList } from '@/components/main-list'
import { City, Offers, OffersListItem } from '@/types/offers'
import { SortList } from '@/components/sort-list'
import { Map } from '@/components/map'
import { Tabs } from '@/components/tabs'
import { useState } from 'react'

type MainPageProps = {
  offersCount: number
  offers: Offers
  city: City
}

function MainPage({ offersCount, offers, city }: MainPageProps): JSX.Element {
  const [selectedOffer, setSelectedOffer] = useState<
    OffersListItem | undefined
  >(undefined)
  const [, setSelectedId] = useState<string | null>(null)

  const handleCardHover = (offer: OffersListItem, id: string) => {
    setSelectedId(id)
    setSelectedOffer(offer)
  }

  const handleCardLeave = () => {
    setSelectedId(null)
    setSelectedOffer(undefined)
  }

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
              <MainList
                offers={offers}
                onCardHover={handleCardHover}
                onCardLeave={handleCardLeave}
              />
            </section>

            <div className="cities__right-section">
              <Map
                className="cities__map"
                city={city}
                offers={offers}
                selectedOfferId={selectedOffer?.id}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export { MainPage }
