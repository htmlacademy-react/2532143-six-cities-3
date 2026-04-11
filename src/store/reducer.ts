import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { DEFAULT_CITY } from '@/const'
import { City, Offers } from '@/types/offers'
import { mockOffers } from '@/mocks/offers'

export type SixCitiesState = {
  city: City
  offers: Offers
}

const initialState: SixCitiesState = {
  city: DEFAULT_CITY,
  offers: mockOffers,
}

export const sixCitiesSlice = createSlice({
  name: 'sixCities',
  initialState,
  reducers: {
    changeCity(state, action: PayloadAction<City>) {
      state.city = action.payload
    },
    fillOffersList(state, action: PayloadAction<Offers>) {
      state.offers = action.payload
    },
  },
})

export const { changeCity, fillOffersList } = sixCitiesSlice.actions
export const reducer = sixCitiesSlice.reducer
