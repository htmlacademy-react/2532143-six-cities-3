import { createAsyncThunk } from '@reduxjs/toolkit'
import type { AxiosInstance } from 'axios'
import { isAxiosError } from 'axios'
import type { OfferDetail } from '@/types/offer-detail'
import type { OffersListItem } from '@/types/offers'
import type { ReviewsItem } from '@/types/reviews'

const NEARBY_LIMIT = 3

export const fetchOfferPageData = createAsyncThunk<
  {
    offer: OfferDetail
    nearbyOffers: OffersListItem[]
    comments: ReviewsItem[]
  },
  string,
  { extra: AxiosInstance; rejectValue: 'notFound' }
>(
  'offerPage/fetchOfferPageData',
  async (offerId, { extra: api, rejectWithValue }) => {
    try {
      const { data: offer } = await api.get<OfferDetail>(`/offers/${offerId}`)
      const [{ data: nearbyOffers }, { data: comments }] = await Promise.all([
        api.get<OffersListItem[]>(`/offers/${offerId}/nearby`),
        api.get<ReviewsItem[]>(`/comments/${offerId}`),
      ])
      return {
        offer,
        nearbyOffers: nearbyOffers.slice(0, NEARBY_LIMIT),
        comments,
      }
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 404) {
        return rejectWithValue('notFound')
      }
      throw error
    }
  },
)

type OfferPageReviewsSubset = {
  offerPage: { reviews: ReviewsItem[] }
}

export const postOfferComment = createAsyncThunk<
  ReviewsItem[],
  { offerId: string; comment: string; rating: number },
  { extra: AxiosInstance; state: OfferPageReviewsSubset }
>(
  'offerPage/postComment',
  async ({ offerId, comment, rating }, { extra: api, getState }) => {
    const { data } = await api.post<ReviewsItem>(`/comments/${offerId}`, {
      comment,
      rating,
    })
    const prev = getState().offerPage.reviews
    return [...prev, data]
  },
)
