import clsx from 'clsx'
import { Header } from '@/components/header'
import { MainList } from '@/components/main-list'
import { MainEmpty } from '@/components/main-empty'
import { SortList } from '@/components/sort-list'
import { Map } from '@/components/map'
import { Tabs } from '@/components/tabs'
import { CITIES } from '@/const'
import { useState } from 'react'
import { useAppSelector } from '@/store/hooks'
import { selectCity, selectOffersInCurrentCity } from '@/store/selectors'

function MainPage(): JSX.Element {
  const city = useAppSelector(selectCity)
  const offersInCity = useAppSelector(selectOffersInCurrentCity)
  const hasOffers = offersInCity.length > 0
  const activeCityName = city.name
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const handleCardHover = (id: string) => {
    setSelectedId(id)
  }

  const handleCardLeave = () => {
    setSelectedId(null)
  }

  return (
    <div className="page page--gray page--main">
      <Header />

      <main
        className={clsx(
          'page__main',
          'page__main--index',
          !hasOffers && 'page__main--index-empty',
        )}
      >
        <h1 className="visually-hidden">Cities</h1>
        <Tabs cities={CITIES} activeCityName={activeCityName} />

        <div className="cities">
          <div
            className={clsx(
              'cities__places-container',
              'container',
              !hasOffers && 'cities__places-container--empty',
            )}
          >
            {hasOffers ? (
              <>
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">
                    {offersInCity.length} places to stay in {activeCityName}
                  </b>
                  <SortList />
                  <MainList
                    offers={offersInCity}
                    onCardHover={handleCardHover}
                    onCardLeave={handleCardLeave}
                  />
                </section>

                <div className="cities__right-section">
                  <Map
                    className="cities__map"
                    city={city}
                    offers={offersInCity}
                    selectedOfferId={selectedId ?? null}
                  />
                </div>
              </>
            ) : (
              <>
                <MainEmpty cityName={activeCityName} />
                <div className="cities__right-section"></div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export { MainPage }
