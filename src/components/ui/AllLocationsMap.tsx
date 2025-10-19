import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import { cn } from '@/lib/utils'

// Custom marker icon with brand colors
const customIcon = new Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

interface Location {
  name: string
  address: string
  hours: string
  phone: string
  lat: number
  lng: number
}

interface AllLocationsMapProps {
  locations: Location[]
  className?: string
}

export function AllLocationsMap({ locations, className }: AllLocationsMapProps) {
  // Calculate center point of all locations (Metro Manila area)
  const centerLat = locations.reduce((sum, loc) => sum + loc.lat, 0) / locations.length
  const centerLng = locations.reduce((sum, loc) => sum + loc.lng, 0) / locations.length

  return (
    <div className={cn("w-full h-96 rounded-lg overflow-hidden border border-neutral-200 shadow-sm", className)}>
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution=''
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {locations.map((location, index) => (
          <Marker 
            key={index} 
            position={[location.lat, location.lng]} 
            icon={customIcon}
          >
            <Popup>
              <div className="text-sm max-w-xs">
                <h3 className="font-semibold text-brand-dark mb-2">{location.name}</h3>
                <p className="text-neutral-600 mb-2">{location.address}</p>
                <div className="space-y-1 text-xs">
                  <p className="flex items-center gap-1">
                    <span className="font-medium">Hours:</span>
                    <span className="text-neutral-600">{location.hours}</span>
                  </p>
                  <p className="flex items-center gap-1">
                    <span className="font-medium">Phone:</span>
                    <a 
                      href={`tel:${location.phone}`}
                      className="text-brand-primary hover:underline"
                    >
                      {location.phone}
                    </a>
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-neutral-200">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(location.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-primary hover:underline text-xs font-medium"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
