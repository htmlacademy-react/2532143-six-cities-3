import clsx from 'clsx'
import { City, OffersListItem } from '@/types/offers'
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '@/const'
import { Icon, layerGroup, Marker } from 'leaflet'
import { useEffect, useRef } from 'react'
import useMap from '@/hooks/use-map'

type MapProps = {
  className?: string
  city: City
  offers: OffersListItem[]
  selectedOfferId: OffersListItem['id'] | null
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [13, 39],
})

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [13, 39],
})

function Map({
  className,
  city,
  offers,
  selectedOfferId,
}: MapProps): JSX.Element {
  const mapRef = useRef(null)
  const map = useMap(mapRef, city)

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map)
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        })

        const isSelected = offer.id === selectedOfferId

        marker
          .setIcon(isSelected ? currentCustomIcon : defaultCustomIcon)
          .addTo(markerLayer)
      })

      return () => {
        map.removeLayer(markerLayer)
      }
    }
  }, [map, offers, selectedOfferId])

  return (
    <section ref={mapRef} className={clsx('map', className)}></section>
  )
}

export { Map }
