import { createSelector } from '@reduxjs/toolkit'
import { Offers } from '@/types/offers'
import type { SortOption } from '@/types/sort'
import type { RootState } from './root-reducer'

export const selectCity = (state: RootState) => state.app.city

export const selectOffers = (state: RootState) => state.offers.offers

export const selectSort = (state: RootState) => state.app.sort

export const selectIsOffersLoading = (state: RootState) =>
  state.offers.isOffersLoading

export const selectHasOffersLoadError = (state: RootState) =>
  state.offers.hasOffersLoadError

export const selectAuthorizationStatus = (state: RootState) =>
  state.auth.authorizationStatus

export const selectUser = (state: RootState) => state.auth.user

export const selectFavoriteOffersCount = createSelector(
  selectOffers,
  (offers) => offers.filter((offer) => offer.isFavorite).length,
)

export const selectOffersInCurrentCity = createSelector(
  [selectOffers, selectCity],
  (offers, city) => offers.filter((offer) => offer.city.name === city.name),
)

function sortOffers(offers: Offers, sort: SortOption): Offers {
  const items = [...offers]

  switch (sort) {
    case 'popular':
      return items
    case 'price-asc':
      return items.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return items.sort((a, b) => b.price - a.price)
    case 'top-rated':
      return items.sort((a, b) => b.rating - a.rating)
  }
}

export const selectSortedOffersInCurrentCity = createSelector(
  [selectOffersInCurrentCity, selectSort],
  (offers, sort) => sortOffers(offers, sort),
)

export const selectOfferPageOffer = (state: RootState) => state.offerPage.offer

export const selectOfferPageNearby = (state: RootState) =>
  state.offerPage.nearbyOffers

export const selectOfferPageReviews = (state: RootState) =>
  state.offerPage.reviews

export const selectOfferPageLoading = (state: RootState) =>
  state.offerPage.isLoading

export const selectOfferPageNotFound = (state: RootState) =>
  state.offerPage.isNotFound

export const selectOfferPageError = (state: RootState) =>
  state.offerPage.hasError
