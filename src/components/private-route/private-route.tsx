import { Navigate } from 'react-router-dom'
import { AppRoute, AuthorizationStatus } from '@/const'
import { useAppSelector } from '@/store/hooks'
import { selectAuthorizationStatus, selectUser } from '@/store/selectors'

type PrivateRouteProps = {
  children: JSX.Element
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element | null {
  const { children } = props
  const authorizationStatus = useAppSelector(selectAuthorizationStatus)
  const user = useAppSelector(selectUser)

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return null
  }

  if (authorizationStatus === AuthorizationStatus.Auth && user) {
    return children
  }

  return <Navigate to={AppRoute.Login} />
}

export { PrivateRoute }
