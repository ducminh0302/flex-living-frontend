import React from 'react'
import { Search, Filter, X, Star, Calendar, Tag } from 'lucide-react'
import Input from '../Input'
import Button from '../Button'
import Card from '../Card'
import { useReviewStore } from '../../stores/reviewStore'

interface ReviewFiltersProps {
  onFiltersChange?: (filters: any) => void
}

const ReviewFilters: React.FC<ReviewFiltersProps> = ({ onFiltersChange }) => {
  const { filters, setFilters } = useReviewStore()
  const [showFilters, setShowFilters] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState(filters.search || '')

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    
    // Debounce search
    const timeoutId = setTimeout(() => {
      const newFilters = { ...filters, search: value }
      setFilters(newFilters)
      onFiltersChange?.(newFilters)
    }, 300)
    
    return () => clearTimeout(timeoutId)
  }

  const handleRatingFilter = (min: number, max: number) => {
    const newFilters = { 
      ...filters, 
      rating: filters.rating?.min === min && filters.rating?.max === max 
        ? undefined 
        : { min, max }
    }
    setFilters(newFilters)
    onFiltersChange?.(newFilters)
  }

  const handleSourceFilter = (source: string) => {
    const currentSources = filters.source || []
    const newSources = currentSources.includes(source)
      ? currentSources.filter(s => s !== source)
      : [...currentSources, source]
    
    const newFilters = { 
      ...filters, 
      source: newSources.length > 0 ? newSources : undefined
    }
    setFilters(newFilters)
    onFiltersChange?.(newFilters)
  }

  const handleCategoryFilter = (category: string) => {
    const currentCategories = filters.categories || []
    const newCategories = currentCategories.includes(category)
      ? currentCategories.filter(c => c !== category)
      : [...currentCategories, category]
    
    const newFilters = { 
      ...filters, 
      categories: newCategories.length > 0 ? newCategories : undefined
    }
    setFilters(newFilters)
    onFiltersChange?.(newFilters)
  }

  const clearAllFilters = () => {
    const newFilters = {}
    setFilters(newFilters)
    setSearchTerm('')
    onFiltersChange?.(newFilters)
  }

  const hasActiveFilters = Object.keys(filters).length > 0

  const ratingOptions = [
    { label: '5 Stars', min: 5, max: 5 },
    { label: '4+ Stars', min: 4, max: 5 },
    { label: '3+ Stars', min: 3, max: 5 },
    { label: '2- Stars', min: 1, max: 2 },
  ]

  const sourceOptions = ['hostaway', 'google', 'manual']
  const categoryOptions = ['cleanliness', 'communication', 'location', 'value', 'accuracy', 'checkin']

  return (
    <div className="space-y-4">
      {/* Search and Filter Toggle */}
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <Input
            variant="search"
            icon={Search}
            placeholder="Search reviews by guest name, content..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <Button
          variant="secondary"
          onClick={() => setShowFilters(!showFilters)}
          icon={Filter}
        >
          Filters {hasActiveFilters && `(${Object.keys(filters).length})`}
        </Button>
        {hasActiveFilters && (
          <Button variant="ghost" onClick={clearAllFilters}>
            <X className="h-4 w-4" />
            Clear
          </Button>
        )}
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <Card padding="md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Rating Filters */}
            <div>
              <h3 className="flex items-center text-sm font-medium text-gray-900 mb-3">
                <Star className="h-4 w-4 mr-2" />
                Rating
              </h3>
              <div className="space-y-2">
                {ratingOptions.map((option) => (
                  <label key={option.label} className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      checked={filters.rating?.min === option.min && filters.rating?.max === option.max}
                      onChange={() => handleRatingFilter(option.min, option.max)}
                    />
                    <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Source Filters */}
            <div>
              <h3 className="flex items-center text-sm font-medium text-gray-900 mb-3">
                <Tag className="h-4 w-4 mr-2" />
                Source
              </h3>
              <div className="space-y-2">
                {sourceOptions.map((source) => (
                  <label key={source} className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      checked={filters.source?.includes(source) || false}
                      onChange={() => handleSourceFilter(source)}
                    />
                    <span className="ml-2 text-sm text-gray-700 capitalize">
                      {source}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Category Filters */}
            <div>
              <h3 className="flex items-center text-sm font-medium text-gray-900 mb-3">
                <Filter className="h-4 w-4 mr-2" />
                Categories
              </h3>
              <div className="space-y-2">
                {categoryOptions.map((category) => (
                  <label key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      checked={filters.categories?.includes(category) || false}
                      onChange={() => handleCategoryFilter(category)}
                    />
                    <span className="ml-2 text-sm text-gray-700 capitalize">
                      {category.replace('_', ' ')}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Date Range Filter */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="flex items-center text-sm font-medium text-gray-900 mb-3">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="date"
                label="From"
                value={filters.dateRange?.start || ''}
                onChange={(e) => {
                  const newFilters = {
                    ...filters,
                    dateRange: {
                      ...filters.dateRange,
                      start: e.target.value,
                      end: filters.dateRange?.end || '',
                    }
                  }
                  setFilters(newFilters)
                  onFiltersChange?.(newFilters)
                }}
              />
              <Input
                type="date"
                label="To"
                value={filters.dateRange?.end || ''}
                onChange={(e) => {
                  const newFilters = {
                    ...filters,
                    dateRange: {
                      start: filters.dateRange?.start || '',
                      end: e.target.value,
                    }
                  }
                  setFilters(newFilters)
                  onFiltersChange?.(newFilters)
                }}
              />
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}

export default ReviewFilters
