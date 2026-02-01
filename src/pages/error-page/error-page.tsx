import { Fragment } from 'react'
import styles from './error-page.module.css'

function ErrorPage(): JSX.Element {
  return (
    <Fragment>
      <h1 className={styles.error}>
        ERROR 404: Page Not Found
      </h1>
      <div className={styles.box}>
        <img
          src="https://img.freepik.com/premium-vector/404-error-with-tired-person-concept-illustration_114360-7899.jpg?w=1480"
          width="500"
          height="400"
        />
      </div>

      <div className={styles.redirect}>
        <h2>
          <a href="/">Click here to go Main Page</a>
        </h2>
      </div>
    </Fragment>
  )
}

export default ErrorPage
