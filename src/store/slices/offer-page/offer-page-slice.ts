import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { OfferDetail } from '@/types/offer-detail'
import type { OffersListItem } from '@/types/offers'
import type { ReviewsItem } from '@/types/reviews'
import { clearAuth } from '../auth/auth-slice'
import { logout } from '../auth/api-actions'
import { fetchOfferPageData, postOfferComment } from './api-actions'

export type OfferPageSendReviewStatus = 'idle' | 'pending' | 'success' | 'error'

export type OfferPageState = {
  offer: OfferDetail | null
  nearbyOffers: OffersListItem[]
  reviews: ReviewsItem[]
  isLoading: boolean
  isNotFound: boolean
  hasError: boolean
  sendReviewStatus: OfferPageSendReviewStatus
}

const initialState: OfferPageState = {
  offer: null,
  nearbyOffers: [],
  reviews: [],
  isLoading: false,
  isNotFound: false,
  hasError: false,
  sendReviewStatus: 'idle',
}

function resetOfferPageAuthData(state: OfferPageState) {
  state.offer = null
  state.nearbyOffers = []
  state.reviews = []
  state.sendReviewStatus = 'idle'
}

export const offerPageSlice = createSlice({
  name: 'offerPage',
  initialState,
  reducers: {
    resetOfferPage() {
      return { ...initialState }
    },
    replaceOffer(
      state,
      action: PayloadAction<{
        offer: OfferDetail
        nearbyOffers: OffersListItem[]
      }>,
    ) {
      state.offer = action.payload.offer
      state.nearbyOffers = action.payload.nearbyOffers
    },
    replaceNearby(
      state,
      action: PayloadAction<{ nearbyOffers: OffersListItem[] }>,
    ) {
      state.nearbyOffers = action.payload.nearbyOffers
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOfferPageData.pending, (state) => {
        state.isLoading = true
        state.isNotFound = false
        state.hasError = false
        state.offer = null
        state.nearbyOffers = []
        state.reviews = []
        state.sendReviewStatus = 'idle'
      })
      .addCase(fetchOfferPageData.fulfilled, (state, action) => {
        state.isLoading = false
        state.offer = action.payload.offer
        state.nearbyOffers = action.payload.nearbyOffers
        state.reviews = action.payload.comments
      })
      .addCase(fetchOfferPageData.rejected, (state, action) => {
        state.isLoading = false
        if (action.payload === 'notFound') {
          state.isNotFound = true
          return
        }
        state.hasError = true
      })
      .addCase(postOfferComment.pending, (state) => {
        state.sendReviewStatus = 'pending'
      })
      .addCase(postOfferComment.fulfilled, (state, action) => {
        state.sendReviewStatus = 'success'
        state.reviews = action.payload
      })
      .addCase(postOfferComment.rejected, (state) => {
        state.sendReviewStatus = 'error'
      })
      .addCase(logout.fulfilled, (state) => {
        resetOfferPageAuthData(state)
      })
      .addCase(clearAuth.fulfilled, (state) => {
        resetOfferPageAuthData(state)
      })
  },
})

export const { resetOfferPage, replaceOffer, replaceNearby } =
  offerPageSlice.actions
export const offerPageReducer = offerPageSlice.reducer
