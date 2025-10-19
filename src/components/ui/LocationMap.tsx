import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import { cn } from '@/lib/utils'

// Custom marker icon
const customIcon = new Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

interface LocationMapProps {
  name: string
  address: string
  lat: number
  lng: number
  className?: string
}

export function LocationMap({ name, address, lat, lng, className }: LocationMapProps) {
  return (
    <div className={cn("w-full h-48 rounded-lg overflow-hidden border border-neutral-200", className)}>
      <MapContainer
        center={[lat, lng]}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution=''
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={[lat, lng]} icon={customIcon}>
          <Popup>
            <div className="text-sm">
              <h3 className="font-semibold text-brand-dark">{name}</h3>
              <p className="text-neutral-600 mt-1">{address}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
