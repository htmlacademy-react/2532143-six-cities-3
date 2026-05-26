import type { RootState } from '@/store/root-reducer'

export const selectOfferPageReviewsRaw = (state: RootState) =>
  state.offerPage.reviews

/** Full list in store order (sorted by date on load; new reviews prepended). */
export const selectOfferPageReviews = (state: RootState) =>
  state.offerPage.reviews

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
