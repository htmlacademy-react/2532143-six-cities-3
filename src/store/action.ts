import { createAction } from '@reduxjs/toolkit'
import { City, Offers } from '@/types/offers'

export const changeCity = createAction<City>('city/change')

export const fillOffersList = createAction<Offers>('offers/fill')
