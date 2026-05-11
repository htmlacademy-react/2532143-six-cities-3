import { createSelector } from '@reduxjs/toolkit'
import { Offers } from '@/types/offers'
import type { SortOption } from '@/types/sort'
import type { SixCitiesState } from './reducer'

export const selectCity = (state: SixCitiesState) => state.city

export const selectOffers = (state: SixCitiesState) => state.offers

export const selectSort = (state: SixCitiesState) => state.sort

export const selectIsOffersLoading = (state: SixCitiesState) =>
  state.isOffersLoading

export const selectHasOffersLoadError = (state: SixCitiesState) =>
  state.hasOffersLoadError

export const selectAuthorizationStatus = (state: SixCitiesState) =>
  state.authorizationStatus

export const selectUser = (state: SixCitiesState) => state.user

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
