import { useState, useCallback } from 'react'
import { 
  Location, 
  findNearestLocation, 
  searchPhilippineArea
} from '@/lib/locationUtils'
import { useDebouncedCallback } from './useDebouncedCallback'

export interface LocationSearchResult {
  location: Location & { distance: number }
  userLocation: { lat: number; lng: number } | null
}

export interface LocationSearchState {
  isLoading: boolean
  error: string | null
  result: LocationSearchResult | null
  suggestions: Array<{ name: string; lat: number; lng: number }>
  searchQuery: string
}

export function useLocationSearch(locations: Location[]) {
  const [state, setState] = useState<LocationSearchState>({
    isLoading: false,
    error: null,
    result: null,
    suggestions: [],
    searchQuery: ''
  })

  const updateSuggestions = useDebouncedCallback((query: string) => {
    setState(prev => ({
      ...prev,
      suggestions: query.length > 0 ? searchPhilippineArea(query).slice(0, 5) : []
    }))
  }, 250)

  // Update search query and suggestions
  const updateSearchQuery = useCallback((query: string) => {
    setState(prev => ({
      ...prev,
      searchQuery: query
    }))
    updateSuggestions(query)
  }, [updateSuggestions])

  // Search by text input (city name)
  const searchByText = useCallback(async (query: string) => {
    if (!query.trim()) return

    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const areas = searchPhilippineArea(query)
      
      if (areas.length === 0) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Location not found. Try searching for Metro Manila, Cebu, Davao, or Iloilo.'
        }))
        return
      }

      // Use the first matching area
      const area = areas[0]
      const nearest = findNearestLocation(area.lat, area.lng, locations)

      setState(prev => ({
        ...prev,
        isLoading: false,
        result: {
          location: nearest,
          userLocation: { lat: area.lat, lng: area.lng }
        },
        suggestions: []
      }))
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to search location'
      }))
    }
  }, [locations])

  // Search by coordinates (from suggestion click)
  const searchByCoordinates = useCallback((lat: number, lng: number) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const nearest = findNearestLocation(lat, lng, locations)

      setState(prev => ({
        ...prev,
        isLoading: false,
        result: {
          location: nearest,
          userLocation: { lat, lng }
        },
        suggestions: []
      }))
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to find nearest location'
      }))
    }
  }, [locations])

  // Get current location using geolocation API
  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        error: 'Geolocation is not supported by this browser'
      }))
      return
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }))

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        
        const nearest = findNearestLocation(latitude, longitude, locations)

        setState(prev => ({
          ...prev,
          isLoading: false,
          result: {
            location: nearest,
            userLocation: { lat: latitude, lng: longitude }
          }
        }))
      },
      (error) => {
        let errorMessage = 'Failed to get your location'
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please enable location services.'
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.'
            break
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.'
            break
        }

        setState(prev => ({
          ...prev,
          isLoading: false,
          error: errorMessage
        }))
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    )
  }, [locations])

  // Clear results and reset state
  const clearResults = useCallback(() => {
    setState({
      isLoading: false,
      error: null,
      result: null,
      suggestions: [],
      searchQuery: ''
    })
  }, [])

  // Clear only error
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }))
  }, [])

  return {
    ...state,
    updateSearchQuery,
    searchByText,
    searchByCoordinates,
    getCurrentLocation,
    clearResults,
    clearError
  }
}
