// Location utilities for distance calculation and location search

export interface Location {
  name: string
  address: string
  hours: string
  phone: string
  lat: number
  lng: number
  coordinates?: string
}

// Calculate distance between two points using Haversine formula
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371 // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1)
  const dLng = toRadians(lng2 - lng1)
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(dLng / 2) *
    Math.sin(dLng / 2)
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c
  
  return Math.round(distance * 10) / 10 // Round to 1 decimal place
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180)
}

// Find nearest location to given coordinates
export function findNearestLocation(
  userLat: number,
  userLng: number,
  locations: Location[]
): Location & { distance: number } {
  const locationsWithDistance = locations.map(location => ({
    ...location,
    distance: calculateDistance(userLat, userLng, location.lat, location.lng)
  }))
  
  return locationsWithDistance.reduce((nearest, current) =>
    current.distance < nearest.distance ? current : nearest
  )
}

// Sort locations by distance from user
export function sortLocationsByDistance(
  userLat: number,
  userLng: number,
  locations: Location[]
): (Location & { distance: number })[] {
  return locations
    .map(location => ({
      ...location,
      distance: calculateDistance(userLat, userLng, location.lat, location.lng)
    }))
    .sort((a, b) => a.distance - b.distance)
}

// Metro Manila area boundaries for validation
export const METRO_MANILA_BOUNDS = {
  north: 14.8,
  south: 14.3,
  east: 121.2,
  west: 120.8
}

// Check if coordinates are within Metro Manila
export function isWithinMetroManila(lat: number, lng: number): boolean {
  return (
    lat >= METRO_MANILA_BOUNDS.south &&
    lat <= METRO_MANILA_BOUNDS.north &&
    lng >= METRO_MANILA_BOUNDS.west &&
    lng <= METRO_MANILA_BOUNDS.east
  )
}

// Common Philippine cities and areas for search suggestions
export const PHILIPPINE_AREAS = [
  // Metro Manila
  { name: "Makati City", lat: 14.5547, lng: 121.0244, region: "Metro Manila" },
  { name: "Quezon City", lat: 14.6760, lng: 121.0437, region: "Metro Manila" },
  { name: "Taguig City", lat: 14.5176, lng: 121.0509, region: "Metro Manila" },
  { name: "Manila", lat: 14.5995, lng: 120.9842, region: "Metro Manila" },
  { name: "Pasig City", lat: 14.5764, lng: 121.0851, region: "Metro Manila" },
  { name: "Mandaluyong City", lat: 14.5794, lng: 121.0359, region: "Metro Manila" },
  { name: "San Juan City", lat: 14.6019, lng: 121.0355, region: "Metro Manila" },
  { name: "Pasay City", lat: 14.5378, lng: 120.9896, region: "Metro Manila" },
  { name: "Paranaque City", lat: 14.4793, lng: 121.0198, region: "Metro Manila" },
  { name: "Las Pinas City", lat: 14.4383, lng: 120.9794, region: "Metro Manila" },
  { name: "Muntinlupa City", lat: 14.3832, lng: 121.0409, region: "Metro Manila" },
  { name: "Marikina City", lat: 14.6507, lng: 121.1029, region: "Metro Manila" },
  { name: "Valenzuela City", lat: 14.7000, lng: 120.9822, region: "Metro Manila" },
  { name: "Caloocan City", lat: 14.6488, lng: 120.9668, region: "Metro Manila" },
  { name: "Malabon City", lat: 14.6648, lng: 120.9568, region: "Metro Manila" },
  { name: "Navotas City", lat: 14.6691, lng: 120.9467, region: "Metro Manila" },
  // Cebu
  { name: "Cebu City", lat: 10.3157, lng: 123.8854, region: "Cebu" },
  { name: "Mandaue City", lat: 10.3237, lng: 123.9222, region: "Cebu" },
  { name: "Lapu-Lapu City", lat: 10.3103, lng: 123.9494, region: "Cebu" },
  // Davao
  { name: "Davao City", lat: 7.0735, lng: 125.6128, region: "Davao" },
  { name: "Davao", lat: 7.0735, lng: 125.6128, region: "Davao" },
  // Iloilo
  { name: "Iloilo City", lat: 10.7202, lng: 122.5621, region: "Iloilo" },
  { name: "Iloilo", lat: 10.7202, lng: 122.5621, region: "Iloilo" },
]

// Search for area by name (case-insensitive)
export function searchPhilippineArea(query: string) {
  const normalizedQuery = query.toLowerCase().trim()
  return PHILIPPINE_AREAS.filter(area =>
    area.name.toLowerCase().includes(normalizedQuery)
  )
}

// Keep old function for backward compatibility
export function searchMetroManilaArea(query: string) {
  return searchPhilippineArea(query).filter(area => area.region === "Metro Manila")
}

// Format distance for display
export function formatDistance(distance: number): string {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m away`
  }
  return `${distance}km away`
}
