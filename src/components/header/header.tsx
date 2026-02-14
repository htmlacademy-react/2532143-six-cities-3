import { UserNav } from '@/components/user-nav'
import { Logo } from '@/components/logo'

function Header(): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo type="header" />
          </div>
          <UserNav />
        </div>
      </div>
    </header>
  )
}

export { Header }
