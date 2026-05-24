import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { AxiosInstance } from 'axios'
import { isAxiosError } from 'axios'
import { AuthorizationStatus, TOKEN_STORAGE_KEY } from '@/const'
import type { AuthInfo, UserData } from '@/types/auth'

export type AuthState = {
  authorizationStatus: AuthorizationStatus
  user: UserData | null
}

const initialState: AuthState = {
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

export const checkAuthStatus = createAsyncThunk<
  UserData | null,
  void,
  {
    extra: AxiosInstance
    rejectValue: 'unauthorized'
    state: { auth: AuthState }
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
    try {
      await api.delete('/logout')
    } catch {
      /* ignore */
    }
    localStorage.removeItem(TOKEN_STORAGE_KEY)
  },
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState(state) {
      state.authorizationStatus = AuthorizationStatus.NoAuth
      state.user = null
    },
  },
  extraReducers(builder) {
    builder
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

const { resetAuthState } = authSlice.actions

export const clearAuth = createAsyncThunk<void, void>(
  'sixCities/clearAuth',
  (_, { dispatch }) => {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    dispatch(resetAuthState())
  },
)

export const authReducer = authSlice.reducer
