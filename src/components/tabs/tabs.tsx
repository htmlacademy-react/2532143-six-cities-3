import clsx from 'clsx'
import { City } from '@/types/offers'

type TabsProps = {
  cities: City[]
  activeCity: City
  onCityChange: (city: City) => void
}

function Tabs({ cities, activeCity, onCityChange }: TabsProps): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => {
            const isActive = city.name === activeCity.name

            return (
              <li className="locations__item" key={city.name}>
                <a
                  className={clsx(
                    'locations__item-link',
                    'tabs__item',
                    isActive && 'tabs__item--active',
                  )}
                  href="#"
                  onClick={(event) => {
                    event.preventDefault()
                    onCityChange(city)
                  }}
                >
                  <span>{city.name}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}

export { Tabs }
