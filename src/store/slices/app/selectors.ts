import type { RootState } from '@/store/root-reducer'

export const selectCity = (state: RootState) => state.app.city

export const selectSort = (state: RootState) => state.app.sort
