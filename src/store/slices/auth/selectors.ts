import type { RootState } from '@/store/root-reducer'

export const selectAuthorizationStatus = (state: RootState) =>
  state.auth.authorizationStatus

export const selectUser = (state: RootState) => state.auth.user
