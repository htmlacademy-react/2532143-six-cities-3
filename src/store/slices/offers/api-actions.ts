import { createAsyncThunk } from '@reduxjs/toolkit'
import type { AxiosInstance } from 'axios'
import type { Offers } from '@/types/offers'

export const fetchOffers = createAsyncThunk<
  Offers,
  void,
  { extra: AxiosInstance }
>('sixCities/fetchOffers', async (_arg, { extra: api }) => {
  const { data } = await api.get<Offers>('/offers')
  return data
})
