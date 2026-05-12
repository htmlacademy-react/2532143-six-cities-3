import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { DEFAULT_CITY } from '@/const'
import type { City } from '@/types/offers'
import type { SortOption } from '@/types/sort'

export type AppState = {
  city: City
  sort: SortOption
}

const initialState: AppState = {
  city: DEFAULT_CITY,
  sort: 'popular',
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeCity(state, action: PayloadAction<City>) {
      state.city = action.payload
    },
    changeSort(state, action: PayloadAction<SortOption>) {
      state.sort = action.payload
    },
  },
})

export const { changeCity, changeSort } = appSlice.actions
export const appReducer = appSlice.reducer
