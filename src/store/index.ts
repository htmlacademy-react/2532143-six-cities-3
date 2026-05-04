import { configureStore } from '@reduxjs/toolkit'
import { createAPI } from '@/api'
import { reducer, type SixCitiesState } from './reducer'

export const api = createAPI()

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
})

export type RootState = SixCitiesState
export type AppDispatch = typeof store.dispatch
