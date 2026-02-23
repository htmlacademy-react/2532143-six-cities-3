import clsx from 'clsx'

type MapProps = {
  className?: 'cities__map'
}

function Map({ className }: MapProps): JSX.Element {
  return <section className={clsx('map', className)}></section>
}

export { Map }
