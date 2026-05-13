import type { OffersListItem } from '@/types/offers'

export type OfferHost = {
  name: string
  avatarUrl: string
  isPro: boolean
}

export type OfferDetail = OffersListItem & {
  description: string
  bedrooms: number
  goods: string[]
  host: OfferHost
  images: string[]
  maxAdults: number
}

export const OFFER_TYPE_LABELS: Record<string, string> = {
  apartment: 'Apartment',
  room: 'Room',
  house: 'House',
  hotel: 'Hotel',
}
