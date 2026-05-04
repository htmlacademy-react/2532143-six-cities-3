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
  areOffersLoading: boolean
}

const initialState: SixCitiesState = {
  city: DEFAULT_CITY,
  offers: [],
  sort: 'popular',
  areOffersLoading: true,
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
        state.areOffersLoading = true
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.areOffersLoading = false
        state.offers = action.payload
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.areOffersLoading = false
      })
  },
})

export const { changeCity, fillOffersList, changeSort } = sixCitiesSlice.actions
export const reducer = sixCitiesSlice.reducer
