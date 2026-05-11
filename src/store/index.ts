import { configureStore } from '@reduxjs/toolkit'
import { isAxiosError } from 'axios'
import { createAPI } from '@/api'
import { TOKEN_STORAGE_KEY } from '@/const'
import { reducer, clearAuth, type SixCitiesState } from './reducer'

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

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY)
  if (token && config.headers) {
    config.headers['X-Token'] = token
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (isAxiosError(error) && error.response?.status === 401) {
      store.dispatch(clearAuth())
    }
    return Promise.reject(error)
  },
)

export type RootState = SixCitiesState
export type AppDispatch = typeof store.dispatch
