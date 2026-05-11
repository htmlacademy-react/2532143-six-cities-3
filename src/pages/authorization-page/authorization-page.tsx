import { FormEvent, useState } from 'react'
import { isAxiosError } from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import { Header } from '@/components/header'
import { AppRoute, AuthorizationStatus, CITIES } from '@/const'
import { changeCity, login } from '@/store/reducer'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectAuthorizationStatus } from '@/store/selectors'

function AuthorizationPage(): JSX.Element {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const authorizationStatus = useAppSelector(selectAuthorizationStatus)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorText, setErrorText] = useState<string | null>(null)
  const [quickCity] = useState(
    () => CITIES[Math.floor(Math.random() * CITIES.length)],
  )

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    setErrorText(null)

    const passwordOk =
      !/\s/.test(password) && /[A-Za-z]/.test(password) && /\d/.test(password)

    if (!passwordOk) {
      setErrorText(
        'Пароль должен содержать минимум одну букву и одну цифру, без пробелов.',
      )
      return
    }

    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        navigate(AppRoute.Main)
      })
      .catch((error: unknown) => {
        if (!isAxiosError(error)) {
          setErrorText('Не удалось выполнить вход')
          return
        }
        const details = error.response?.data as { message?: string } | undefined
        const msg =
          details?.message ?? error.message ?? 'Не удалось выполнить вход'
        setErrorText(msg)
      })
  }

  const handleQuickCity = () => {
    dispatch(changeCity(quickCity))
    navigate(AppRoute.Main)
  }

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Main} replace />
  }

  return (
    <div className="page page--gray page--login">
      <Header showUserNav={false} logoActive={false} />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={handleSubmit}
            >
              {errorText ? (
                <p className="login__error" style={{ color: '#4481c3' }}>
                  {errorText}
                </p>
              ) : null}
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(evt) => setEmail(evt.target.value)}
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(evt) => setPassword(evt.target.value)}
                  required
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a
                className="locations__item-link"
                href="#"
                onClick={(evt) => {
                  evt.preventDefault()
                  handleQuickCity()
                }}
              >
                <span>{quickCity.name}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export { AuthorizationPage }
