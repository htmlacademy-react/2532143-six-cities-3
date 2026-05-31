import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { AppRoute } from '@/const'
import styles from './error-page.module.css'

function ErrorPage(): JSX.Element {
  return (
    <Fragment>
      <h1 className={styles.error}>ERROR 404: Page Not Found</h1>
      <div className={styles.box}>
        <img
          src="https://img.freepik.com/premium-vector/404-error-with-tired-person-concept-illustration_114360-7899.jpg?w=1480"
          width="500"
          height="400"
          alt=""
        />
      </div>

      <div className={styles.redirect}>
        <h2>
          <Link to={AppRoute.Main}>Click here to go Main Page</Link>
        </h2>
      </div>
    </Fragment>
  )
}

export default ErrorPage
