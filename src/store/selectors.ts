import { createSelector } from '@reduxjs/toolkit'
import type { SixCitiesState } from './reducer'

export const selectCity = (state: SixCitiesState) => state.city

export const selectOffers = (state: SixCitiesState) => state.offers

export const selectOffersInCurrentCity = createSelector(
  [selectOffers, selectCity],
  (offers, city) => offers.filter((offer) => offer.city.name === city.name),
)
