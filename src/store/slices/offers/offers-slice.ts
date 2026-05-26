import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Offers } from '@/types/offers'
import { clearAuth } from '../auth/auth-slice'
import { logout } from '../auth/api-actions'
import { toggleFavoriteOffer } from '../favorites/toggle-favorite-offer'
import { fetchOffers } from './api-actions'

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
      .addCase(toggleFavoriteOffer.fulfilled, (state, action) => {
        state.offers = action.payload.catalogOffers
      })
      .addCase(logout.pending, (state) => {
        state.offers = state.offers.map((offer) => ({
          ...offer,
          isFavorite: false,
        }))
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.offers = action.payload
      })
      .addCase(clearAuth.fulfilled, (state, action) => {
        state.offers = action.payload.clearedOffers
      })
  },
})

export const { fillOffersList } = offersSlice.actions
export const offersReducer = offersSlice.reducer
