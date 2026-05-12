import { configureStore } from '@reduxjs/toolkit'
import { isAxiosError } from 'axios'
import { createAPI } from '@/api'
import { TOKEN_STORAGE_KEY } from '@/const'
import { clearAuth } from './slices/auth-slice'
import { rootReducer } from './root-reducer'

export type { RootState } from './root-reducer'

export const api = createAPI()

export const store = configureStore({
  reducer: rootReducer,
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
    if (!isAxiosError(error) || error.response?.status !== 401) {
      return Promise.reject(error)
    }

    const method = error.config?.method?.toLowerCase() ?? 'get'
    const url = error.config?.url ?? ''
    const isLoginCheck = method === 'get' && url.includes('login')

    if (!isLoginCheck) {
      store.dispatch(clearAuth())
    }

    return Promise.reject(error)
  },
)

export type AppDispatch = typeof store.dispatch
