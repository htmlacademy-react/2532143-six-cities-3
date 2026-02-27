import clsx from 'clsx'
import { City, OffersListItem } from '@/types/cards'
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '@/const'
import { Icon, layerGroup, Marker } from 'leaflet'
import { useEffect, useRef } from 'react'
import useMap from '@/hooks/use-map'

type MapProps = {
  className?: string
  city: City
  offers: OffersListItem[]
  selectedOffer?: OffersListItem
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
})

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
})

function Map({
  className,
  city,
  offers,
  selectedOffer,
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

        const isSelected =
          selectedOffer !== undefined && offer.id === selectedOffer.id

        marker
          .setIcon(isSelected ? currentCustomIcon : defaultCustomIcon)
          .addTo(markerLayer)
      })

      return () => {
        map.removeLayer(markerLayer)
      }
    }
  }, [map, offers, selectedOffer])

  return <section ref={mapRef} className={clsx('map', className)}></section>
}

export { Map }
