import { City } from './types/offers'
import type { SortOption } from './types/sort'

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  NotFound = '/404',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const TOKEN_STORAGE_KEY = 'six-cities-token'

/** Max reviews rendered in the list (Academy / e2e). Total count is still full length. */
export const OFFER_REVIEWS_DISPLAY_LIMIT = 10

export const URL_MARKER_DEFAULT = '/img/pin.svg'
export const URL_MARKER_CURRENT = '/img/pin-active.svg'

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'popular', label: 'Popular' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'top-rated', label: 'Top rated first' },
]

export const OFFER_INSIDE_ITEMS = [
  'Wi-Fi',
  'Heating',
  'Kitchen',
  'Fridge',
  'Washing machine',
  'Coffee machine',
  'Dishwasher',
  'Towels',
  'Baby seat',
  'Cabel TV',
] as const

export const CITIES: City[] = [
  {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13,
    },
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13,
    },
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.38333,
      longitude: 4.9,
      zoom: 13,
    },
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13,
    },
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13,
    },
  },
]

export const DEFAULT_CITY =
  CITIES.find((city) => city.name === 'Paris') ?? CITIES[0]
