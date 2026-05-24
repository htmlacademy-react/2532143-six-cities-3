import clsx from 'clsx'
import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Badge } from '@/components/badge'
import { FavoritesButton } from '@/components/favorites-button'
import { Header } from '@/components/header'
import { Map } from '@/components/map'
import { NearPlacesList } from '@/components/near-places-list'
import { OfferFeatures } from '@/components/offer-features'
import { OfferGallery } from '@/components/offer-gallery'
import { OfferInside } from '@/components/offer-inside'
import { OfferReviews } from '@/components/offer-reviews'
import { Rating } from '@/components/rating'
import { Spinner } from '@/components/spinner'
import spinnerStyles from '@/components/spinner/spinner.module.css'
import { User } from '@/components/user'
import { AppRoute } from '@/const'
import ErrorPage from '@/pages/error-page/'
import { fetchOfferPageData, resetOfferPage } from '@/store/reducer'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  selectOfferPageError,
  selectOfferPageLoading,
  selectOfferPageNearby,
  selectOfferPageNotFound,
  selectOfferPageOffer,
} from '@/store/selectors'
import type { OfferHost } from '@/types/offer-detail'
import type { ReviewsItem } from '@/types/reviews'

function hostToReviewsStub(host: OfferHost): ReviewsItem {
  return {
    id: 'host',
    date: '',
    comment: '',
    rating: 0,
    user: host,
  }
}

function OfferPage(): JSX.Element {
  const dispatch = useAppDispatch()
  const { id } = useParams<{ id: string }>()
  const offer = useAppSelector(selectOfferPageOffer)
  const nearbyOffers = useAppSelector(selectOfferPageNearby)
  const isLoading = useAppSelector(selectOfferPageLoading)
  const isNotFound = useAppSelector(selectOfferPageNotFound)
  const hasError = useAppSelector(selectOfferPageError)

  useEffect(() => {
    if (!id) {
      return
    }
    dispatch(fetchOfferPageData(id))
    return () => {
      dispatch(resetOfferPage())
    }
  }, [dispatch, id])

  if (!id) {
    return <ErrorPage />
  }

  if (isLoading) {
    return (
      <div className="page">
        <Header />
        <main className={clsx('page__main', spinnerStyles.flexMain)}>
          <Spinner variant="page" />
        </main>
      </div>
    )
  }

  if (isNotFound) {
    return <Navigate to={AppRoute.NotFound} replace />
  }

  if (hasError || !offer) {
    return <ErrorPage />
  }

  const hostStub = hostToReviewsStub(offer.host)
  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <OfferGallery images={offer.images} />
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && <Badge type="offer" text="Premium" />}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offer.title}</h1>
                <FavoritesButton
                  variant="offer"
                  offerId={offer.id}
                  isFavorite={offer.isFavorite}
                />
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <Rating rating={offer.rating} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {offer.rating}
                </span>
              </div>
              <OfferFeatures offer={offer} />
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <OfferInside goods={offer.goods} />
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <User reviewsItem={hostStub} isPro type="offer" />
                <div className="offer__description">
                  <p className="offer__text" style={{ whiteSpace: 'pre-line' }}>
                    {offer.description}
                  </p>
                </div>
              </div>
              <OfferReviews offerId={offer.id} />
            </div>
          </div>
          <Map
            className="offer__map"
            city={offer.city}
            offers={[offer, ...nearbyOffers]}
            selectedOfferId={id}
          />
          <div className="container">
            <NearPlacesList offers={nearbyOffers} />
          </div>
        </section>
      </main>
    </div>
  )
}

export { OfferPage }
