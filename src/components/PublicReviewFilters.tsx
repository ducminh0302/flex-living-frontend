import React, { useState } from 'react'
import { Search, SlidersHorizontal, Star, X } from 'lucide-react'
import Input from './Input'
import Button from './Button'
import Badge from './Badge'

interface PublicReviewFiltersProps {
  onFilterChange?: (filters: any) => void
  totalReviews?: number
  averageRating?: number
}

const PublicReviewFilters: React.FC<PublicReviewFiltersProps> = ({
  onFilterChange,
  totalReviews = 0,
  averageRating = 0,
}) => {
  const [filters, setFilters] = useState({
    search: '',
    rating: null as number | null,
    sortBy: 'date' as 'date' | 'rating' | 'helpful',
    timeframe: 'all' as 'all' | 'recent' | 'thisYear',
  })
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, search: e.target.value }
    handleFilterChange(newFilters)
  }

  const handleRatingFilter = (rating: number) => {
    const newRating = filters.rating === rating ? null : rating
    const newFilters = { ...filters, rating: newRating }
    handleFilterChange(newFilters)
  }

  const handleSortChange = (sortBy: typeof filters.sortBy) => {
    const newFilters = { ...filters, sortBy }
    handleFilterChange(newFilters)
  }

  const handleTimeframeChange = (timeframe: typeof filters.timeframe) => {
    const newFilters = { ...filters, timeframe }
    handleFilterChange(newFilters)
  }

  const clearFilters = () => {
    const newFilters = {
      search: '',
      rating: null,
      sortBy: 'date' as const,
      timeframe: 'all' as const,
    }
    handleFilterChange(newFilters)
  }

  const hasActiveFilters = filters.search || filters.rating || filters.sortBy !== 'date' || filters.timeframe !== 'all'

  const ratingOptions = [
    { label: '5 stars', value: 5, count: Math.floor(totalReviews * 0.4) },
    { label: '4+ stars', value: 4, count: Math.floor(totalReviews * 0.6) },
    { label: '3+ stars', value: 3, count: Math.floor(totalReviews * 0.8) },
    { label: 'All ratings', value: null, count: totalReviews },
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      {/* Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            Guest Reviews ({totalReviews})
          </h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
              <span className="text-lg font-medium text-gray-900">
                {averageRating.toFixed(1)}
              </span>
              <span className="text-sm text-gray-500 ml-1">
                out of 5
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 sm:mt-0">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            icon={showAdvanced ? X : SlidersHorizontal}
          >
            {showAdvanced ? 'Hide Filters' : 'Filter Reviews'}
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4">
        <Input
          variant="search"
          icon={Search}
          placeholder="Search reviews..."
          value={filters.search}
          onChange={handleSearchChange}
        />
      </div>

      {/* Quick Rating Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {ratingOptions.map((option) => (
          <button
            key={option.value || 'all'}
            onClick={() => handleRatingFilter(option.value!)}
            className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium transition-colors ${
              filters.rating === option.value
                ? 'bg-primary-100 text-primary-800 border-primary-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200'
            } border`}
          >
            {option.value && (
              <div className="flex items-center mr-2">
                {Array.from({ length: option.value }, (_, i) => (
                  <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                ))}
              </div>
            )}
            {option.label}
            <span className="ml-2 text-xs bg-white rounded-full px-2 py-0.5">
              {option.count}
            </span>
          </button>
        ))}
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="border-t border-gray-200 pt-4 space-y-4">
          {/* Sort Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort by:
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Most recent', value: 'date' },
                { label: 'Highest rated', value: 'rating' },
                { label: 'Most helpful', value: 'helpful' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSortChange(option.value as typeof filters.sortBy)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filters.sortBy === option.value
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Timeframe */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time period:
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'All time', value: 'all' },
                { label: 'Last 6 months', value: 'recent' },
                { label: 'This year', value: 'thisYear' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleTimeframeChange(option.value as typeof filters.timeframe)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filters.timeframe === option.value
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="flex justify-end pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                icon={X}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {filters.rating && (
              <Badge variant="primary" size="sm">
                {filters.rating}+ stars
              </Badge>
            )}
            {filters.sortBy !== 'date' && (
              <Badge variant="secondary" size="sm">
                Sorted by {filters.sortBy}
              </Badge>
            )}
            {filters.timeframe !== 'all' && (
              <Badge variant="secondary" size="sm">
                {filters.timeframe === 'recent' ? 'Last 6 months' : 'This year'}
              </Badge>
            )}
          </div>
          <span className="text-sm text-gray-500">
            {totalReviews} reviews found
          </span>
        </div>
      )}
    </div>
  )
}

export default PublicReviewFilters
