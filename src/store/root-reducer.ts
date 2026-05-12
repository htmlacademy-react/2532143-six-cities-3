import { combineReducers } from '@reduxjs/toolkit'
import { appReducer } from './slices/app-slice'
import { authReducer } from './slices/auth-slice'
import { offersReducer } from './slices/offers-slice'

export const rootReducer = combineReducers({
  app: appReducer,
  offers: offersReducer,
  auth: authReducer,
})

export type RootState = ReturnType<typeof rootReducer>
