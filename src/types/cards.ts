type Location = {
  latitude: number
  longitude: number
  zoom: number
}

type City = {
  name: string
  location: Location
}

export type OffersListItem = {
  id: string
  title: string
  price: number
  type: string
  city: City
  location: Location
  isFavorite: boolean
  isPremium: boolean
  rating: number
  previewImage: string
}

export type Offers = OffersListItem[]
