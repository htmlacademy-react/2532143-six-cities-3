export type CardsType = {
  id: string
  title: string
  price: number
  type: string
  city: {
    name: string
    location: {
      latitude: number
      longitude: number
      zoom: number
    }
  }
  location: {
    latitude: number
    longitude: number
    zoom: number
  }
  isFavorite: boolean
  isPremium: boolean
  rating: number
  previewImage: string
}

export type Cards = CardsType[]
