import type { RootState } from '@/store/root-reducer'

export const selectFavoriteOffersRaw = (state: RootState) =>
  state.favorites.items

export const selectIsFavoritesLoading = (state: RootState) =>
  state.favorites.isFavoritesLoading

export const selectHasFavoritesLoadError = (state: RootState) =>
  state.favorites.hasFavoritesLoadError

export const selectFavoriteRequestOfferId = (state: RootState) =>
  state.favorites.favoriteRequestOfferId

export const selectFavoriteOffersCount = (state: RootState) =>
  state.favorites.items.length
