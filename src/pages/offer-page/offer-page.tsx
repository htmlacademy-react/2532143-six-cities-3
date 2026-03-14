import { Header } from '@/components/header'
import { OfferFeatures } from '@/components/offer-features'
import { OfferGallery } from '@/components/offer-gallery'
import { OfferInside } from '@/components/offer-inside'
import { Offers, OffersListItem } from '@/types/cards'
import { useParams } from 'react-router-dom'
import ErrorPage from '@/pages/error-page/'
import { NearPlacesList } from '@/components/near-places-list'
import { Badge } from '@/components/badge'
import { FavoritesButton } from '@/components/favorites-button'
import { OfferReviews } from '@/components/offer-reviews'
import { User } from '@/components/user'
import { Map } from '@/components/map'
import { useState } from 'react'

type OfferPageProps = {
  offers: Offers
}

function OfferPage({ offers }: OfferPageProps): JSX.Element {
  const { id } = useParams<{ id: string }>()
  const offer = offers.find((item) => item.id === id)
  const [selectedNearOffer, setSelectedNearOffer] = useState<
    OffersListItem | undefined
  >(undefined)

  if (!offer) {
    return <ErrorPage />
  }

  const { rating, price, title, isPremium } = offer
  const ratingPercentage = (rating / 5) * 100

  const handleCardHover = (nearOffer: OffersListItem) => {
    setSelectedNearOffer(nearOffer)
  }

  const handleCardLeave = () => {
    setSelectedNearOffer(undefined)
  }

  const nearPlacesCount = 3
  const nearOffers = offers.slice(0, nearPlacesCount)

  return (
    <body>
      <div className="page">
        <Header />

        <main className="page__main page__main--offer">
          <section className="offer">
            <div className="offer__gallery-container container">
              <OfferGallery />
            </div>
            <div className="offer__container container">
              <div className="offer__wrapper">
                {isPremium && <Badge type="offer" text="Premium" />}
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">{title}</h1>
                  <FavoritesButton type="offer" cardType="offer" />
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span
                      style={{
                        width: `${ratingPercentage}%`,
                      }}
                    ></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">
                    {rating}
                  </span>
                </div>
                <OfferFeatures />
                <div className="offer__price">
                  <b className="offer__price-value">&euro;{price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <OfferInside />
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <User name="Angelina" type="offer" isPro />
                  <div className="offer__description">
                    <p className="offer__text">
                      A quiet cozy and picturesque that hides behind a a river
                      by the unique lightness of Amsterdam. The building is
                      green and from 18th century.
                    </p>
                    <p className="offer__text">
                      An independent House, strategically located between
                      Rembrand Square and National Opera, but where the bustle
                      of the city comes to rest in this alley flowery and
                      colorful.
                    </p>
                  </div>
                </div>
                <OfferReviews />
              </div>
            </div>
            <Map
              className="offer__map"
              city={offer.city}
              offers={nearOffers}
              selectedOffer={selectedNearOffer}
            />
            <div className="container">
              <NearPlacesList
                offers={offers}
                onCardHover={handleCardHover}
                onCardLeave={handleCardLeave}
              />
            </div>
          </section>
        </main>
      </div>
    </body>
  )
}

export { OfferPage }
