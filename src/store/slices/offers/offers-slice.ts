import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'
import type { AxiosInstance } from 'axios'
import type { Offers } from '@/types/offers'

export type OffersSliceState = {
  offers: Offers
  isOffersLoading: boolean
  hasOffersLoadError: boolean
}

const initialState: OffersSliceState = {
  offers: [],
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

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    fillOffersList(state, action: PayloadAction<Offers>) {
      state.offers = action.payload
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

export const { fillOffersList } = offersSlice.actions
export const offersReducer = offersSlice.reducer
