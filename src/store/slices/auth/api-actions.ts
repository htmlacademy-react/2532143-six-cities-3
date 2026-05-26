import { createAsyncThunk } from '@reduxjs/toolkit'
import type { AxiosInstance } from 'axios'
import { isAxiosError } from 'axios'
import { AuthorizationStatus, TOKEN_STORAGE_KEY } from '@/const'
import type { AuthInfo, UserData } from '@/types/auth'
import type { Offers } from '@/types/offers'

function mapUserFromAuthPayload(info: AuthInfo): UserData {
  return {
    name: info.name,
    avatarUrl: info.avatarUrl,
    isPro: info.isPro,
    email: info.email,
  }
}

type AuthSliceForChecks = {
  auth: {
    authorizationStatus: AuthorizationStatus
  }
}

type OffersSliceForLogout = {
  offers: {
    offers: Offers
  }
}

export const checkAuthStatus = createAsyncThunk<
  UserData | null,
  void,
  {
    extra: AxiosInstance
    rejectValue: 'unauthorized'
    state: AuthSliceForChecks
  }
>('sixCities/checkAuth', async (_arg, { extra: api, rejectWithValue }) => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY)
  if (!token) {
    return null
  }
  try {
    const { data } = await api.get<AuthInfo>('/login')
    localStorage.setItem(TOKEN_STORAGE_KEY, data.token)
    return mapUserFromAuthPayload(data)
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
  return mapUserFromAuthPayload(data)
})

export const logout = createAsyncThunk<
  Offers,
  void,
  { extra: AxiosInstance; state: OffersSliceForLogout }
>('sixCities/logout', async (_, { extra: api, getState }) => {
  await api.delete('/logout').catch(() => undefined)
  localStorage.removeItem(TOKEN_STORAGE_KEY)
  return getState().offers.offers.map((offer) => ({
    ...offer,
    isFavorite: false,
  }))
})
