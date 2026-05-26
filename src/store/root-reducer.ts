import { combineReducers } from '@reduxjs/toolkit'
import { appReducer } from './slices/app'
import { authReducer } from './slices/auth'
import { favoritesReducer } from './slices/favorites'
import { offerPageReducer } from './slices/offer-page'
import { offersReducer } from './slices/offers'

export const rootReducer = combineReducers({
  app: appReducer,
  offers: offersReducer,
  favorites: favoritesReducer,
  auth: authReducer,
  offerPage: offerPageReducer,
})

export type RootState = ReturnType<typeof rootReducer>
