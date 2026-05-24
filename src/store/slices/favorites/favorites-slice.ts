import { createSlice } from '@reduxjs/toolkit'
import type { Offers } from '@/types/offers'
import { authSlice } from '../auth/auth-slice'
import { logout } from '../auth/api-actions'
import { fetchFavoriteOffers } from './api-actions'
import { toggleFavoriteOffer } from './toggle-favorite-offer'

export type FavoritesState = {
  items: Offers
  isFavoritesLoading: boolean
  hasFavoritesLoadError: boolean
  favoriteRequestOfferId: string | null
}

const initialState: FavoritesState = {
  items: [],
  isFavoritesLoading: false,
  hasFavoritesLoadError: false,
  favoriteRequestOfferId: null,
}

function resetFavoriteItems(state: FavoritesState) {
  state.items = []
}

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteOffers.pending, (state) => {
        state.isFavoritesLoading = true
        state.hasFavoritesLoadError = false
      })
      .addCase(fetchFavoriteOffers.fulfilled, (state, action) => {
        state.isFavoritesLoading = false
        state.hasFavoritesLoadError = false
        state.items = action.payload
      })
      .addCase(fetchFavoriteOffers.rejected, (state) => {
        state.isFavoritesLoading = false
        state.hasFavoritesLoadError = true
      })
      .addCase(toggleFavoriteOffer.pending, (state, action) => {
        state.favoriteRequestOfferId = action.meta.arg.offerId
      })
      .addCase(toggleFavoriteOffer.fulfilled, (state, action) => {
        state.favoriteRequestOfferId = null
        state.items = action.payload.favoritesItems
      })
      .addCase(toggleFavoriteOffer.rejected, (state) => {
        state.favoriteRequestOfferId = null
      })
      .addCase(logout.fulfilled, (state) => {
        resetFavoriteItems(state)
      })
      .addCase(authSlice.actions.resetAuthState, (state) => {
        resetFavoriteItems(state)
      })
  },
})

export const favoritesReducer = favoritesSlice.reducer
