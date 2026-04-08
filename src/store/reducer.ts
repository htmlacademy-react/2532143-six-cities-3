import { createReducer } from '@reduxjs/toolkit'
import { City, Offers } from '@/types/offers'
import { mockDefaultCity } from '@/mocks/cities'
import { mockOffers } from '@/mocks/offers'
import { changeCity, fillOffersList } from './action'

export type SixCitiesState = {
  city: City
  offers: Offers
}

export const initialState: SixCitiesState = {
  city: mockDefaultCity,
  offers: mockOffers,
}

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload
    })
    .addCase(fillOffersList, (state, action) => {
      state.offers = action.payload
    })
})
