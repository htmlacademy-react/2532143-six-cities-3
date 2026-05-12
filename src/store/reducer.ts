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
  user: UserData | null
}

const initialState: SixCitiesState = {
  city: DEFAULT_CITY,
  offers: [],
  sort: 'popular',
  isOffersLoading: true,
  hasOffersLoadError: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
}

function userFromAuthInfo(info: AuthInfo): UserData {
  return {
    name: info.name,
    avatarUrl: info.avatarUrl,
    isPro: info.isPro,
    email: info.email,
  }
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
  UserData | null,
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
    localStorage.setItem(TOKEN_STORAGE_KEY, data.token)
    return userFromAuthInfo(data)
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      localStorage.removeItem(TOKEN_STORAGE_KEY)
      return rejectWithValue('unauthorized')
    }
    throw error
  }
})

export const login = createAsyncThunk<
  UserData,
  { email: string; password: string },
  { extra: AxiosInstance }
>('sixCities/login', async ({ email, password }, { extra: api }) => {
  const { data } = await api.post<AuthInfo>('/login', { email, password })
  localStorage.setItem(TOKEN_STORAGE_KEY, data.token)
  return userFromAuthInfo(data)
})

export const logout = createAsyncThunk<void, void, { extra: AxiosInstance }>(
  'sixCities/logout',
  async (_arg, { extra: api }) => {
    await api.delete('/logout')
    localStorage.removeItem(TOKEN_STORAGE_KEY)
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
    resetAuthState(state) {
      state.authorizationStatus = AuthorizationStatus.NoAuth
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
        const user = action.payload
        if (!user) {
          state.authorizationStatus = AuthorizationStatus.NoAuth
          state.user = null
          return
        }
        state.authorizationStatus = AuthorizationStatus.Auth
        state.user = user
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        if (
          action.payload === 'unauthorized' &&
          state.authorizationStatus === AuthorizationStatus.Unknown
        ) {
          state.authorizationStatus = AuthorizationStatus.NoAuth
          state.user = null
          return
        }
        if (state.authorizationStatus === AuthorizationStatus.Unknown) {
          state.authorizationStatus = AuthorizationStatus.NoAuth
        }
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth
        state.user = action.payload
      })
      .addCase(logout.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth
        state.user = null
      })
  },
})

const { resetAuthState } = sixCitiesSlice.actions

export const clearAuth = createAsyncThunk<void, void>(
  'sixCities/clearAuth',
  (_, { dispatch }) => {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    dispatch(resetAuthState())
  },
)

export const { changeCity, fillOffersList, changeSort } = sixCitiesSlice.actions
export const reducer = sixCitiesSlice.reducer
