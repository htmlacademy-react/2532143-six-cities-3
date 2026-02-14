import { AppRoute } from '@/const'
import { Link } from 'react-router-dom'

type LogoProps = {
  type: 'header' | 'footer'
}

const sizes = {
  header: {
    width: 81,
    height: 41,
  },
  footer: {
    width: 64,
    height: 33,
  },
}

function Logo({ type }: LogoProps): JSX.Element {
  const { width, height } = sizes[type]

  return (
    <Link
      to={AppRoute.Main}
      className={`${type}__logo-link ${type}__logo-link--active`}
    >
      <img
        className={`${type}__logo`}
        src="img/logo.svg"
        alt="6 cities logo"
        width={width}
        height={height}
      />
    </Link>
  )
}

export { Logo }
