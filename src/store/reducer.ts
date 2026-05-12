import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'
import type { AxiosInstance } from 'axios'
import { isAxiosError } from 'axios'
import { AuthorizationStatus, DEFAULT_CITY, TOKEN_STORAGE_KEY } from '@/const'
import type { AuthInfo, UserData } from '@/types/auth'
import { City, Offers } from '@/types/offers'
import type { SortOption } from '@/types/sort'

export type SixCitiesState = {
  city: City
  offers: Offers
  sort: SortOption
  isOffersLoading: boolean
  hasOffersLoadError: boolean
  authorizationStatus: AuthorizationStatus
  token: string | null
  user: UserData | null
}

const initialState: SixCitiesState = {
  city: DEFAULT_CITY,
  offers: [],
  sort: 'popular',
  isOffersLoading: true,
  hasOffersLoadError: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  token: null,
  user: null,
}

export const fetchOffers = createAsyncThunk<
  Offers,
  void,
  { extra: AxiosInstance }
>('sixCities/fetchOffers', async (_arg, { extra: api }) => {
  const { data } = await api.get<Offers>('/offers')
  return data
})

export const checkAuthStatus = createAsyncThunk<
  AuthInfo | null,
  void,
  {
    extra: AxiosInstance
    rejectValue: 'unauthorized'
    state: SixCitiesState
  }
>('sixCities/checkAuth', async (_arg, { extra: api, rejectWithValue }) => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY)
  if (!token) {
    return null
  }
  try {
    const { data } = await api.get<AuthInfo>('/login')
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return rejectWithValue('unauthorized')
    }
    throw error
  }
})

export const login = createAsyncThunk<
  AuthInfo,
  { email: string; password: string },
  { extra: AxiosInstance }
>('sixCities/login', async ({ email, password }, { extra: api }) => {
  const { data } = await api.post<AuthInfo>('/login', { email, password })
  return data
})

export const logout = createAsyncThunk<void, void, { extra: AxiosInstance }>(
  'sixCities/logout',
  async (_arg, { extra: api }) => {
    try {
      await api.delete('/logout')
    } catch {
      /* ignore */
    }
  },
)

export const sixCitiesSlice = createSlice({
  name: 'sixCities',
  initialState,
  reducers: {
    changeCity(state, action: PayloadAction<City>) {
      state.city = action.payload
    },
    fillOffersList(state, action: PayloadAction<Offers>) {
      state.offers = action.payload
    },
    changeSort(state, action: PayloadAction<SortOption>) {
      state.sort = action.payload
    },
    clearAuth(state) {
      localStorage.removeItem(TOKEN_STORAGE_KEY)
      state.authorizationStatus = AuthorizationStatus.NoAuth
      state.token = null
      state.user = null
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isOffersLoading = true
        state.hasOffersLoadError = false
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.isOffersLoading = false
        state.hasOffersLoadError = false
        state.offers = action.payload
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.isOffersLoading = false
        state.hasOffersLoadError = true
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        const auth = action.payload
        if (!auth) {
          localStorage.removeItem(TOKEN_STORAGE_KEY)
          state.authorizationStatus = AuthorizationStatus.NoAuth
          state.token = null
          state.user = null
          return
        }
        localStorage.setItem(TOKEN_STORAGE_KEY, auth.token)
        state.authorizationStatus = AuthorizationStatus.Auth
        state.token = auth.token
        state.user = {
          name: auth.name,
          avatarUrl: auth.avatarUrl,
          isPro: auth.isPro,
          email: auth.email,
        }
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        if (
          action.payload === 'unauthorized' &&
          state.authorizationStatus === AuthorizationStatus.Unknown
        ) {
          localStorage.removeItem(TOKEN_STORAGE_KEY)
          state.authorizationStatus = AuthorizationStatus.NoAuth
          state.token = null
          state.user = null
          return
        }
        if (state.authorizationStatus === AuthorizationStatus.Unknown) {
          state.authorizationStatus = AuthorizationStatus.NoAuth
        }
      })
      .addCase(login.fulfilled, (state, action) => {
        const auth = action.payload
        localStorage.setItem(TOKEN_STORAGE_KEY, auth.token)
        state.authorizationStatus = AuthorizationStatus.Auth
        state.token = auth.token
        state.user = {
          name: auth.name,
          avatarUrl: auth.avatarUrl,
          isPro: auth.isPro,
          email: auth.email,
        }
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.removeItem(TOKEN_STORAGE_KEY)
        state.authorizationStatus = AuthorizationStatus.NoAuth
        state.token = null
        state.user = null
      })
  },
})

export const { changeCity, fillOffersList, changeSort, clearAuth } =
  sixCitiesSlice.actions
export const reducer = sixCitiesSlice.reducer
