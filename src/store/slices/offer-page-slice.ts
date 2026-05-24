import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { AxiosInstance } from 'axios'
import { isAxiosError } from 'axios'
import type { OfferDetail } from '@/types/offer-detail'
import type { OffersListItem } from '@/types/offers'
import type { ReviewsItem } from '@/types/reviews'

const NEARBY_LIMIT = 3
const REVIEWS_LIMIT = 10

export type OfferPageState = {
  offer: OfferDetail | null
  nearbyOffers: OffersListItem[]
  reviews: ReviewsItem[]
  isLoading: boolean
  isNotFound: boolean
  hasError: boolean
  sendReviewStatus: 'success' | 'error' | 'idle' | 'pending'
}

const initialState: OfferPageState = {
  offer: null,
  nearbyOffers: [],
  reviews: [],
  isLoading: false,
  isNotFound: false,
  hasError: false,
  sendReviewStatus: 'idle',
}

function sortReviewsNewestFirst(items: ReviewsItem[]): ReviewsItem[] {
  return items
    .toSorted((a: ReviewsItem, b: ReviewsItem) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, REVIEWS_LIMIT)
}

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
        comments: sortReviewsNewestFirst(comments),
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

export const offerPageSlice = createSlice({
  name: 'offerPage',
  initialState,
  reducers: {
    resetOfferPage() {
      return { ...initialState }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOfferPageData.pending, (state) => {
        state.isLoading = true
        state.isNotFound = false
        state.hasError = false
        state.offer = null
        state.nearbyOffers = []
        state.reviews = []
      })
      .addCase(fetchOfferPageData.fulfilled, (state, action) => {
        state.isLoading = false
        state.offer = action.payload.offer
        state.nearbyOffers = action.payload.nearby.slice(0, NEARBY_LIMIT)
        state.reviews = action.payload.comments
      })
      .addCase(fetchOfferPageData.rejected, (state, action) => {
        state.isLoading = false
        if (action.payload === 'notFound') {
          state.isNotFound = true
          return
        }
        state.hasError = true
      })
      .addCase(postOfferComment.fulfilled, (state, action) => {
        state.reviews = sortReviewsNewestFirst([
          ...state.reviews,
          action.payload,
        ])
      })
  },
})

export const { resetOfferPage } = offerPageSlice.actions
export const offerPageReducer = offerPageSlice.reducer
