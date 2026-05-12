import clsx from 'clsx'
import styles from './spinner.module.css'

type SpinnerProps = {
  variant?: 'section' | 'page'
}

function Spinner({ variant = 'section' }: SpinnerProps): JSX.Element {
  return (
    <div
      className={clsx(
        styles.root,
        variant === 'page' ? styles.page : styles.section,
      )}
      aria-busy="true"
      aria-live="polite"
      role="status"
    >
      <span className="visually-hidden">Loading offers</span>
      <span className={styles.circle} />
    </div>
  )
}

export { Spinner }
