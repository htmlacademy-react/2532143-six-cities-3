export { rootReducer as reducer } from './root-reducer'
export type { RootState } from './root-reducer'
export { changeCity, changeSort } from './slices/app'
export type { AppState } from './slices/app'
export type { OffersSliceState } from './slices/offers'
export { fetchOffers, fillOffersList } from './slices/offers'

export type { FavoritesState } from './slices/favorites'
export { fetchFavoriteOffers, toggleFavoriteOffer } from './slices/favorites'

export { checkAuthStatus, login, logout, clearAuth } from './slices/auth'
export type { AuthState } from './slices/auth'
export {
  fetchOfferPageData,
  postOfferComment,
  resetOfferPage,
} from './slices/offer-page'
export type {
  OfferPageSendReviewStatus,
  OfferPageState,
} from './slices/offer-page'
