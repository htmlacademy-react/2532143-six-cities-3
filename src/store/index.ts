import { configureStore } from '@reduxjs/toolkit'
import { reducer, type SixCitiesState } from './reducer'

export const store = configureStore({
  reducer,
})

export type RootState = SixCitiesState
export type AppDispatch = typeof store.dispatch
