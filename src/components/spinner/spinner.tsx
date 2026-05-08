import styles from './spinner.module.css'

function Spinner(): JSX.Element {
  return (
    <div
      className={styles.root}
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
