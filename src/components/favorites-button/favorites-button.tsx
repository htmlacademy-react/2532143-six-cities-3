import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'
import { AppRoute, AuthorizationStatus } from '@/const'
import { toggleFavoriteOffer } from '@/store/reducer'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  selectAuthorizationStatus,
  selectFavoriteRequestOfferId,
} from '@/store/selectors'

type FavoritesButtonVariant = 'place-card' | 'offer'

const iconSizes: Record<
  FavoritesButtonVariant,
  { width: number; height: number }
> = {
  'place-card': { width: 18, height: 19 },
  offer: { width: 31, height: 33 },
}

type FavoritesButtonProps = {
  variant: FavoritesButtonVariant
  offerId: string
  isFavorite: boolean
}

function FavoritesButton({
  variant,
  offerId,
  isFavorite,
}: FavoritesButtonProps): JSX.Element {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const authorizationStatus = useAppSelector(selectAuthorizationStatus)
  const favoriteRequestOfferId = useAppSelector(selectFavoriteRequestOfferId)

  const isCheckingAuth = authorizationStatus === AuthorizationStatus.Unknown
  const isGuest = authorizationStatus === AuthorizationStatus.NoAuth
  const pending = favoriteRequestOfferId === offerId
  const inactive = pending || isCheckingAuth
  const { width, height } = iconSizes[variant]

  const activeClass =
    variant === 'offer'
      ? 'offer__bookmark-button--active'
      : 'place-card__bookmark-button--active'

  const handleBookmarkClick = () => {
    if (pending || isCheckingAuth) {
      return
    }

    if (isGuest) {
      navigate(AppRoute.Login)
      return
    }

    dispatch(toggleFavoriteOffer({ offerId, isFavoriteNow: isFavorite }))
  }

  return (
    <button
      className={clsx(
        `${variant}__bookmark-button`,
        'button',
        isFavorite && activeClass,
      )}
      type="button"
      disabled={inactive}
      onClick={(evt) => {
        evt.preventDefault()
        evt.stopPropagation()
        handleBookmarkClick()
      }}
    >
      <svg
        className={`${variant}__bookmark-icon`}
        width={width}
        height={height}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">
        {isFavorite ? 'In bookmarks' : 'To bookmarks'}
      </span>
    </button>
  )
}

export { FavoritesButton }
