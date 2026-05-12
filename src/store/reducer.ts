export { rootReducer as reducer } from './root-reducer'
export type { RootState } from './root-reducer'
export { changeCity, changeSort } from './slices/app-slice'
export type { AppState } from './slices/app-slice'
export { fetchOffers, fillOffersList } from './slices/offers-slice'
export type { OffersSliceState } from './slices/offers-slice'
export { checkAuthStatus, login, logout, clearAuth } from './slices/auth-slice'
export type { AuthState } from './slices/auth-slice'
export {
  fetchOfferPageData,
  postOfferComment,
  resetOfferPage,
} from './slices/offer-page-slice'
export type { OfferPageState } from './slices/offer-page-slice'
