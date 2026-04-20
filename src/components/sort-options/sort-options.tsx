import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { SORT_OPTIONS } from '@/const'
import { changeSort } from '@/store/reducer'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectSort } from '@/store/selectors'

function SortOptions(): JSX.Element {
  const activeSort = useAppSelector(selectSort)
  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const activeLabel =
    SORT_OPTIONS.find((item) => item.value === activeSort)?.label ??
    SORT_OPTIONS[0].label

  return (
    <form
      ref={formRef}
      className="places__sorting"
      action="#"
      method="get"
      onSubmit={(event) => event.preventDefault()}
    >
      <span className="places__sorting-caption">Sort by</span>{' '}
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpen((open) => !open)}
      >
        {activeLabel}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={clsx(
          'places__options',
          'places__options--custom',
          isOpen && 'places__options--opened',
        )}
      >
        {SORT_OPTIONS.map(({ value, label }) => (
          <li
            key={value}
            className={clsx(
              'places__option',
              activeSort === value && 'places__option--active',
            )}
            tabIndex={0}
            onClick={() => {
              dispatch(changeSort(value))
              setIsOpen(false)
            }}
          >
            {label}
          </li>
        ))}
      </ul>
    </form>
  )
}

export { SortOptions }
