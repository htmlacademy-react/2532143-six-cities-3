import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/store/root-reducer'

const REVIEWS_DISPLAY_LIMIT = 10

/** Raw reviews in state (unordered; server/API order preserved). */
export const selectOfferPageReviewsRaw = (state: RootState) =>
  state.offerPage.reviews

/** Newest first, limited for display (derived in selector, not in reducer). */
export const selectOfferPageReviews = createSelector(
  [selectOfferPageReviewsRaw],
  (reviews) =>
    [...reviews]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, REVIEWS_DISPLAY_LIMIT),
)

export const selectOfferPageOffer = (state: RootState) => state.offerPage.offer

export const selectOfferPageNearby = (state: RootState) =>
  state.offerPage.nearbyOffers

export const selectOfferPageLoading = (state: RootState) =>
  state.offerPage.isLoading

export const selectOfferPageNotFound = (state: RootState) =>
  state.offerPage.isNotFound

export const selectOfferPageError = (state: RootState) =>
  state.offerPage.hasError

export const selectOfferPageSendReviewStatus = (state: RootState) =>
  state.offerPage.sendReviewStatus
