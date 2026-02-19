import { NearPlacesCard } from '../near-places-card'

function NearPlacesList(): JSX.Element {
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        <NearPlacesCard />
        <NearPlacesCard />
        <NearPlacesCard />
      </div>
    </section>
  )
}

export { NearPlacesList }
