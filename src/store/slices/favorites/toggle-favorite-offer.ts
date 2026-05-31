import { createAsyncThunk } from '@reduxjs/toolkit'
import type { AxiosInstance } from 'axios'
import type { OfferDetail } from '@/types/offer-detail'
import type { Offers, OffersListItem } from '@/types/offers'
import { offerPageSlice } from '../offer-page/offer-page-slice'

type ToggleFavoriteThunkState = {
  favorites: { items: Offers }
  offers: { offers: Offers }
  offerPage: {
    offer: OfferDetail | null
    nearbyOffers: OffersListItem[]
  }
}

type OfferPageFavoritePatch =
  | { skipped: true }
  | {
      skipped: false
      nextOpenedOffer: OfferDetail | null
      nextNearbyOffers: OffersListItem[]
    }

type FavoriteToggleFulfillment = {
  favoritesItems: Offers
  catalogOffers: Offers
}

function detailToPreview(detail: OfferDetail): OffersListItem {
  return {
    id: detail.id,
    title: detail.title,
    price: detail.price,
    type: detail.type,
    city: detail.city,
    location: detail.location,
    isFavorite: detail.isFavorite,
    isPremium: detail.isPremium,
    rating: detail.rating,
    previewImage: detail.previewImage,
  }
}

function nextFavoriteList(prev: Offers, detail: OfferDetail): Offers {
  if (!detail.isFavorite) {
    return prev.filter((offer) => offer.id !== detail.id)
  }

  const preview = detailToPreview(detail)
  const index = prev.findIndex((offer) => offer.id === detail.id)
  if (index === -1) {
    return [...prev, preview]
  }

  const next = [...prev]
  next[index] = preview
  return next
}

function nextCatalogList(prev: Offers, detail: OfferDetail): Offers {
  const preview = detailToPreview(detail)
  const index = prev.findIndex((offer) => offer.id === detail.id)
  if (index === -1) {
    return prev
  }
  const next = [...prev]
  next[index] = preview
  return next
}

function offerPagePatchFromDetail(
  page: ToggleFavoriteThunkState['offerPage'],
  detail: OfferDetail,
): OfferPageFavoritePatch {
  const { offer, nearbyOffers } = page

  if (
    offer === null ||
    (offer.id !== detail.id &&
      !nearbyOffers.some((near) => near.id === detail.id))
  ) {
    return { skipped: true }
  }

  const nextNearbyOffers = nearbyOffers.map((item) =>
    item.id === detail.id ? { ...item, isFavorite: detail.isFavorite } : item,
  )

  return {
    skipped: false,
    nextNearbyOffers,
    nextOpenedOffer: offer.id === detail.id ? detail : null,
  }
}

export const toggleFavoriteOffer = createAsyncThunk<
  FavoriteToggleFulfillment,
  { offerId: string; isFavoriteNow: boolean },
  { extra: AxiosInstance; state: ToggleFavoriteThunkState }
>(
  'favorites/toggleFavoriteOffer',
  async ({ offerId, isFavoriteNow }, thunkApi) => {
    const { extra: api, getState, dispatch } = thunkApi
    const status = isFavoriteNow ? 0 : 1
    const { data: detail } = await api.post<OfferDetail>(
      `/favorite/${offerId}/${status}`,
    )

    const { favorites, offers, offerPage } = getState()
    const patch = offerPagePatchFromDetail(offerPage, detail)

    if (!patch.skipped) {
      if (patch.nextOpenedOffer) {
        dispatch(
          offerPageSlice.actions.replaceOffer({
            offer: patch.nextOpenedOffer,
            nearbyOffers: patch.nextNearbyOffers,
          }),
        )
      } else {
        dispatch(
          offerPageSlice.actions.replaceNearby({
            nearbyOffers: patch.nextNearbyOffers,
          }),
        )
      }
    }

    return {
      favoritesItems: nextFavoriteList(favorites.items, detail),
      catalogOffers: nextCatalogList(offers.offers, detail),
    }
  },
)
