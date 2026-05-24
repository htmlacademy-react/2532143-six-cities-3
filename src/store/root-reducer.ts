import { combineReducers } from '@reduxjs/toolkit'
import { appReducer } from './slices/app'
import { authReducer } from './slices/auth'
import { offerPageReducer } from './slices/offer-page'
import { offersReducer } from './slices/offers'

export const rootReducer = combineReducers({
  app: appReducer,
  offers: offersReducer,
  auth: authReducer,
  offerPage: offerPageReducer,
})

export type RootState = ReturnType<typeof rootReducer>
