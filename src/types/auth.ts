export type UserData = {
  name: string
  avatarUrl: string
  isPro: boolean
  email: string
}

export type AuthInfo = UserData & {
  token: string
}
