import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AuthorizationStatus, TOKEN_STORAGE_KEY } from '@/const'
import type { Offers } from '@/types/offers'
import type { UserData } from '@/types/auth'
import { checkAuthStatus, login, logout } from './api-actions'

export type AuthState = {
  authorizationStatus: AuthorizationStatus
  user: UserData | null
}

type OffersSliceSubset = {
  offers: {
    offers: Offers
  }
}

const initialState: AuthState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
}

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
      .addCase(logout.pending, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth
        state.user = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth
        state.user = null
      })
  },
})

export const clearAuth = createAsyncThunk<
  { clearedOffers: Offers },
  void,
  { state: OffersSliceSubset }
>('sixCities/clearAuth', (_, { dispatch, getState }) => {
  localStorage.removeItem(TOKEN_STORAGE_KEY)
  const clearedOffers = getState().offers.offers.map((offer) => ({
    ...offer,
    isFavorite: false,
  }))
  dispatch(authSlice.actions.resetAuthState())
  return { clearedOffers }
})

export const authReducer = authSlice.reducer
