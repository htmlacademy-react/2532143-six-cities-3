import { createSelector } from '@reduxjs/toolkit'
import type { Offers } from '@/types/offers'
import type { SortOption } from '@/types/sort'
import type { RootState } from '@/store/root-reducer'
import { selectCity, selectSort } from '@/store/slices/app/selectors'

export const selectOffers = (state: RootState) => state.offers.offers

export const selectIsOffersLoading = (state: RootState) =>
  state.offers.isOffersLoading

export const selectHasOffersLoadError = (state: RootState) =>
  state.offers.hasOffersLoadError

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
