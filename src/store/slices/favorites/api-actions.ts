import { createAsyncThunk } from '@reduxjs/toolkit'
import type { AxiosInstance } from 'axios'
import type { Offers } from '@/types/offers'

export const fetchFavoriteOffers = createAsyncThunk<
  Offers,
  void,
  { extra: AxiosInstance }
>('favorites/fetchFavoriteOffers', async (_arg, { extra: api }) => {
  const { data } = await api.get<Offers>('/favorite')
  return data
})
