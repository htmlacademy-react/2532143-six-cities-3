import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'
import type { AxiosInstance } from 'axios'
import { DEFAULT_CITY } from '@/const'
import { City, Offers } from '@/types/offers'
import type { SortOption } from '@/types/sort'

export type SixCitiesState = {
  city: City
  offers: Offers
  sort: SortOption
  isOffersLoading: boolean
  hasOffersLoadError: boolean
}

const initialState: SixCitiesState = {
  city: DEFAULT_CITY,
  offers: [],
  sort: 'popular',
  isOffersLoading: true,
  hasOffersLoadError: false,
}

export const fetchOffers = createAsyncThunk<
  Offers,
  void,
  { extra: AxiosInstance }
>('sixCities/fetchOffers', async (_arg, { extra: api }) => {
  const { data } = await api.get<Offers>('/offers')
  return data
})

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
  extraReducers(builder) {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isOffersLoading = true
        state.hasOffersLoadError = false
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.isOffersLoading = false
        state.hasOffersLoadError = false
        state.offers = action.payload
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.isOffersLoading = false
        state.hasOffersLoadError = true
      })
  },
})

export const { changeCity, fillOffersList, changeSort } = sixCitiesSlice.actions
export const reducer = sixCitiesSlice.reducer
