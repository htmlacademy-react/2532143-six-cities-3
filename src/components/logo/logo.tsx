import clsx from 'clsx'
import { AppRoute } from '@/const'
import { Link } from 'react-router-dom'

type LogoProps = {
  type: 'header' | 'footer'
  /** На странице Login логотип без модификатора `--active`. */
  isActive?: boolean
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

function Logo({ type, isActive = true }: LogoProps): JSX.Element {
  const { width, height } = sizes[type]

  return (
    <Link
      to={AppRoute.Main}
      className={clsx(`${type}__logo-link`, {
        [`${type}__logo-link--active`]: isActive,
      })}
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
