import { UserNav } from '@/components/user-nav'
import { Logo } from '@/components/logo'

type HeaderProps = {
  showUserNav?: boolean
  logoActive?: boolean
}

function Header({
  showUserNav = true,
  logoActive = true,
}: HeaderProps): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo type="header" isActive={logoActive} />
          </div>
          {showUserNav ? <UserNav /> : null}
        </div>
      </div>
    </header>
  )
}

export { Header }
