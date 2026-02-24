type Location = {
  latitude: number
  longitude: number
  zoom: number
}

export type Point = {
  name: string
  latitude: number
  longitude: number
}

export type City = {
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
export type Points = Point[]
