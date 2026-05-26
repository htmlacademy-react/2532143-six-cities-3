import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { OfferDetail } from '@/types/offer-detail'
import type { OffersListItem } from '@/types/offers'
import type { ReviewsItem } from '@/types/reviews'
import { fetchOfferPageData, postOfferComment } from './api-actions'
import { sortReviewsNewestFirst } from './sort-reviews'

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
        nearby: OffersListItem[]
      }>,
    ) {
      state.offer = action.payload.offer
      state.nearbyOffers = action.payload.nearby
    },
    replaceNearby(state, action: PayloadAction<{ nearby: OffersListItem[] }>) {
      state.nearbyOffers = action.payload.nearby
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
        state.nearbyOffers = action.payload.nearby
        state.reviews = sortReviewsNewestFirst(action.payload.comments)
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
  },
})

export const { resetOfferPage, replaceOffer, replaceNearby } =
  offerPageSlice.actions
export const offerPageReducer = offerPageSlice.reducer
