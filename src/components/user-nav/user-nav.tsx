import { Link } from 'react-router-dom'
import { AppRoute, AuthorizationStatus } from '@/const'
import { logout } from '@/store/reducer'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  selectAuthorizationStatus,
  selectFavoriteOffersCount,
  selectUser,
} from '@/store/selectors'

function UserNav(): JSX.Element {
  const dispatch = useAppDispatch()
  const authorizationStatus = useAppSelector(selectAuthorizationStatus)
  const user = useAppSelector(selectUser)
  const favoritesCount = useAppSelector(selectFavoriteOffersCount)

  const handleSignOut = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault()
    void dispatch(logout())
  }

  const guest =
    authorizationStatus !== AuthorizationStatus.Auth || user === null

  if (guest) {
    return (
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item">
            <Link className="header__nav-link" to={AppRoute.Login}>
              <span className="header__login">Sign in</span>
            </Link>
          </li>
        </ul>
      </nav>
    )
  }

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link
            className="header__nav-link header__nav-link--profile"
            to={AppRoute.Favorites}
          >
            <div className="header__avatar-wrapper user__avatar-wrapper">
              <img src={user.avatarUrl} alt="" />
            </div>
            <span className="header__user-name user__name">{user.email}</span>
            <span className="header__favorite-count">{favoritesCount}</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <a className="header__nav-link" href="#" onClick={handleSignOut}>
            <span className="header__signout">Sign out</span>
          </a>
        </li>
      </ul>
    </nav>
  )
}

export { UserNav }
