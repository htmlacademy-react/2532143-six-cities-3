import { createAsyncThunk } from '@reduxjs/toolkit'
import type { AxiosInstance } from 'axios'
import { isAxiosError } from 'axios'
import type { OfferDetail } from '@/types/offer-detail'
import type { OffersListItem } from '@/types/offers'
import type { ReviewsItem } from '@/types/reviews'

export const fetchOfferPageData = createAsyncThunk<
  {
    offer: OfferDetail
    nearby: OffersListItem[]
    comments: ReviewsItem[]
  },
  string,
  { extra: AxiosInstance; rejectValue: 'notFound' }
>(
  'offerPage/fetchOfferPageData',
  async (offerId, { extra: api, rejectWithValue }) => {
    try {
      const { data: offer } = await api.get<OfferDetail>(`/offers/${offerId}`)
      const [{ data: nearby }, { data: comments }] = await Promise.all([
        api.get<OffersListItem[]>(`/offers/${offerId}/nearby`),
        api.get<ReviewsItem[]>(`/comments/${offerId}`),
      ])
      return {
        offer,
        nearby,
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

export const postOfferComment = createAsyncThunk<
  ReviewsItem,
  { offerId: string; comment: string; rating: number },
  { extra: AxiosInstance }
>(
  'offerPage/postComment',
  async ({ offerId, comment, rating }, { extra: api }) => {
    const { data } = await api.post<ReviewsItem>(`/comments/${offerId}`, {
      comment,
      rating,
    })
    return data
  },
)
