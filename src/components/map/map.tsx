import clsx from 'clsx'
import { City } from '@/types/cards'
import { Point } from '@/types/cards'
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '@/const'
import { Icon, layerGroup, Marker } from 'leaflet'
import { useEffect, useRef } from 'react'
import useMap from '@/hooks/use-map'

type MapProps = {
  className?: 'cities__map'
  city: City
  points: Point[]
  selectedPoint: Point | undefined
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
  points,
  selectedPoint,
}: MapProps): JSX.Element {
  const mapRef = useRef(null)
  const map = useMap(mapRef, city)

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map)
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude,
        })

        marker
          .setIcon(
            selectedPoint !== undefined && point.name === selectedPoint.name
              ? currentCustomIcon
              : defaultCustomIcon,
          )
          .addTo(markerLayer)
      })

      return () => {
        map.removeLayer(markerLayer)
      }
    }
  }, [map, points, selectedPoint])

  return <section ref={mapRef} className={clsx('map', className)}></section>
}

export { Map }
