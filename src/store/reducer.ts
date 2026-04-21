import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { DEFAULT_CITY } from '@/const'
import { City, Offers } from '@/types/offers'
import type { SortOption } from '@/types/sort'
import { mockOffers } from '@/mocks/offers'

export type SixCitiesState = {
  city: City
  offers: Offers
  sort: SortOption
}

const initialState: SixCitiesState = {
  city: DEFAULT_CITY,
  offers: mockOffers,
  sort: 'popular',
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
    changeSort(state, action: PayloadAction<SortOption>) {
      state.sort = action.payload
    },
  },
})

export const { changeCity, fillOffersList, changeSort } = sixCitiesSlice.actions
export const reducer = sixCitiesSlice.reducer
