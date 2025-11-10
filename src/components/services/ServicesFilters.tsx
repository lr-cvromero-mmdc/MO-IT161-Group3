/**
 * ServicesFilters Component
 * 
 * Search and category filter controls for services and products.
 * Includes search input with debouncing and category dropdown.
 */

import { Container } from "@/components/layout/Container"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Loader2 } from "lucide-react"
import { CategoryOption } from "@/types/services"

interface ServicesFiltersProps {
  /** Current search term value */
  searchValue: string
  /** Callback when search input changes */
  onSearchChange: (value: string) => void
  /** Currently selected category */
  selectedCategory: string
  /** Callback when category selection changes */
  onCategoryChange: (value: string) => void
  /** Available category options */
  categories: CategoryOption[]
  /** Active tab name for placeholder text */
  activeTab: string
  /** Whether search is currently processing */
  isSearching?: boolean
}

/**
 * ServicesFilters - Search and filter controls
 * 
 * Features:
 * - Search input with icon
 * - Category dropdown filter
 * - Responsive layout (stacks on mobile, horizontal on desktop)
 * - Accessibility labels
 * 
 * @param searchValue - Current search input value
 * @param onSearchChange - Handler for search input changes
 * @param selectedCategory - Currently selected category filter
 * @param onCategoryChange - Handler for category selection changes
 * @param categories - Array of available category options
 * @param activeTab - Active tab name ("services" or "products")
 */
export function ServicesFilters({
  searchValue,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  activeTab,
  isSearching = false
}: ServicesFiltersProps) {
  return (
    <section className="py-8 bg-brand-cream" role="search" aria-label="Filter services and products">
      <Container>
        <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
          {/* Search Input */}
          <div className="flex-1 relative">
            {isSearching ? (
              <Loader2 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-brand-primary animate-spin z-10" 
                aria-hidden="true"
              />
            ) : (
              <Search 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" 
                aria-hidden="true"
              />
            )}
            <Input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className={`pl-10 h-12 text-lg focus-ring ${isSearching ? 'pr-10' : ''}`}
              aria-label={`Search ${activeTab}`}
              aria-busy={isSearching}
            />
          </div>

          {/* Category Filter */}
          <div className="md:w-64">
            <Select 
              value={selectedCategory} 
              onValueChange={onCategoryChange}
            >
              <SelectTrigger 
                className="h-12 text-lg focus-ring"
                aria-label="Filter by category"
              >
                <Filter className="h-5 w-5 mr-2" aria-hidden="true" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Container>
    </section>
  )
}

