import { memo } from "react"
import { MapPin } from "lucide-react"

interface LocationSearchSuggestionsProps {
  suggestions: Array<{ name: string; lat: number; lng: number }>
  onSuggestionClick: (lat: number, lng: number, name: string) => void
  className?: string
}

function LocationSearchSuggestionsComponent({ 
  suggestions, 
  onSuggestionClick, 
  className 
}: LocationSearchSuggestionsProps) {
  if (suggestions.length === 0) return null

  return (
    <div className={`absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-200 rounded-lg shadow-lg z-10 ${className}`}>
      <div className="py-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion.lat, suggestion.lng, suggestion.name)}
            className="w-full px-4 py-3 text-left hover:bg-neutral-50 flex items-center gap-3 transition-colors"
            type="button"
          >
            <MapPin className="h-4 w-4 text-brand-primary flex-shrink-0" />
            <span className="text-brand-dark">{suggestion.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export const LocationSearchSuggestions = memo(LocationSearchSuggestionsComponent)
LocationSearchSuggestions.displayName = "LocationSearchSuggestions"
