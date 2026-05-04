import { useState } from 'react'
import clsx from 'clsx'
import { Header } from '@/components/header'
import { MainEmpty } from '@/components/main-empty'
import { MainList } from '@/components/main-list'
import { Map } from '@/components/map'
import { SortOptions } from '@/components/sort-options'
import { Spinner } from '@/components/spinner'
import { Tabs } from '@/components/tabs'
import { CITIES } from '@/const'
import { useAppSelector } from '@/store/hooks'
import {
  selectAreOffersLoading,
  selectCity,
  selectOffersInCurrentCity,
  selectSortedOffersInCurrentCity,
} from '@/store/selectors'

function MainPage(): JSX.Element {
  const city = useAppSelector(selectCity)
  const offersInCity = useAppSelector(selectOffersInCurrentCity)
  const sortedOffers = useAppSelector(selectSortedOffersInCurrentCity)
  const areOffersLoading = useAppSelector(selectAreOffersLoading)
  const hasOffers = offersInCity.length > 0
  const activeCityName = city.name
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const handleCardHover = (id: string) => {
    setSelectedId(id)
  }

  const handleCardLeave = () => {
    setSelectedId(null)
  }

  const citiesSectionClassName = clsx(
    'cities__places-container',
    'container',
    !areOffersLoading && !hasOffers && 'cities__places-container--empty',
  )

  return (
    <div className="page page--gray page--main">
      <Header />

      <main
        className={clsx(
          'page__main',
          'page__main--index',
          !areOffersLoading && !hasOffers && 'page__main--index-empty',
        )}
      >
        <h1 className="visually-hidden">Cities</h1>
        <Tabs cities={CITIES} activeCityName={activeCityName} />

        <div className="cities">
          {areOffersLoading ? (
            <div className={citiesSectionClassName}>
              <Spinner />
            </div>
          ) : (
            <div className={citiesSectionClassName}>
              {hasOffers ? (
                <>
                  <section className="cities__places places">
                    <h2 className="visually-hidden">Places</h2>
                    <b className="places__found">
                      {offersInCity.length} places to stay in {activeCityName}
                    </b>
                    <SortOptions />
                    <MainList
                      offers={sortedOffers}
                      onCardHover={handleCardHover}
                      onCardLeave={handleCardLeave}
                    />
                  </section>

                  <div className="cities__right-section">
                    <Map
                      className="cities__map"
                      city={city}
                      offers={sortedOffers}
                      selectedOfferId={selectedId ?? null}
                    />
                  </div>
                </>
              ) : (
                <>
                  <MainEmpty cityName={activeCityName} />
                  <div className="cities__right-section" />
                </>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export { MainPage }
