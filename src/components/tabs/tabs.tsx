import clsx from 'clsx'
import { City } from '@/types/offers'
import { useAppDispatch } from '@/store/hooks'
import { changeCity } from '@/store/reducer'
import styles from './tabs.module.css'

type TabsProps = {
  cities: City[]
  activeCityName: City['name']
}

function Tabs({ cities, activeCityName }: TabsProps): JSX.Element {
  const dispatch = useAppDispatch()
  const handleCityChange = (nextCity: City) => {
    dispatch(changeCity(nextCity))
  }

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => {
            const isActive = city.name === activeCityName

            return (
              <li className="locations__item" key={city.name}>
                <button
                  type="button"
                  className={clsx(
                    'locations__item-link',
                    'tabs__item',
                    styles.tabLink,
                    isActive && 'tabs__item--active',
                  )}
                  onClick={() => {
                    handleCityChange(city)
                  }}
                >
                  <span>{city.name}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}

export { Tabs }
