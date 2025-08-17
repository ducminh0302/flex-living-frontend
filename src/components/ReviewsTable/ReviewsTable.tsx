import React, { useState } from 'react'
import { Eye, EyeOff, Star, Calendar, User, Tag } from 'lucide-react'
import Button from '../Button'
import Badge from '../Badge'
import StarRating from '../StarRating'
import { useToggleReviewDisplay } from '../../hooks/useApi'
import { useReviewStore } from '../../stores/reviewStore'
import type { Review } from '../../types/api'

interface ReviewsTableProps {
  reviews: Review[]
  isLoading?: boolean
  onSelectionChange?: (selectedIds: number[]) => void
}

const ReviewsTable: React.FC<ReviewsTableProps> = ({
  reviews,
  isLoading = false,
  onSelectionChange,
}) => {
  const { selectedReviews, toggleReviewSelection, selectAllReviews, clearSelection } = useReviewStore()
  const toggleDisplayMutation = useToggleReviewDisplay()
  const [sortField, setSortField] = useState<'rating' | 'date' | 'guestName'>('date')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const handleToggleDisplay = async (review: Review) => {
    try {
      await toggleDisplayMutation.mutateAsync({
        reviewId: review.id,
        isDisplayed: !review.isDisplayedPublicly
      })
    } catch (error) {
      console.error('Failed to toggle review display:', error)
    }
  }

  const handleSelectAll = () => {
    if (selectedReviews.length === reviews.length) {
      clearSelection()
    } else {
      selectAllReviews()
    }
    onSelectionChange?.(selectedReviews)
  }

  const handleRowSelect = (reviewId: number) => {
    toggleReviewSelection(reviewId)
    onSelectionChange?.(selectedReviews)
  }

  const sortedReviews = [...reviews].sort((a, b) => {
    let aVal, bVal
    
    switch (sortField) {
      case 'rating':
        aVal = a.rating || 0
        bVal = b.rating || 0
        break
      case 'date':
        aVal = new Date(a.submittedAt).getTime()
        bVal = new Date(b.submittedAt).getTime()
        break
      case 'guestName':
        aVal = a.guestName.toLowerCase()
        bVal = b.guestName.toLowerCase()
        break
      default:
        return 0
    }

    if (sortDirection === 'asc') {
      return aVal > bVal ? 1 : -1
    } else {
      return aVal < bVal ? 1 : -1
    }
  })

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="animate-pulse p-6">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="h-4 bg-gray-200 rounded w-8"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/6"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                checked={selectedReviews.length === reviews.length && reviews.length > 0}
                onChange={handleSelectAll}
              />
              <span className="ml-2 text-sm text-gray-700">
                {selectedReviews.length > 0 
                  ? `${selectedReviews.length} selected` 
                  : 'Select all'
                }
              </span>
            </label>
          </div>

          {selectedReviews.length > 0 && (
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  // Bulk enable display
                  console.log('Bulk enable display for:', selectedReviews)
                }}
              >
                <Eye className="h-4 w-4" />
                Show Selected
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  // Bulk disable display  
                  console.log('Bulk disable display for:', selectedReviews)
                }}
              >
                <EyeOff className="h-4 w-4" />
                Hide Selected
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-12 px-6 py-3"></th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('guestName')}
                  className="flex items-center hover:text-gray-700"
                >
                  <User className="h-4 w-4 mr-1" />
                  Guest
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('rating')}
                  className="flex items-center hover:text-gray-700"
                >
                  <Star className="h-4 w-4 mr-1" />
                  Rating
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Review
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('date')}
                  className="flex items-center hover:text-gray-700"
                >
                  <Calendar className="h-4 w-4 mr-1" />
                  Date
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Property
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedReviews.map((review) => (
              <tr key={review.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    checked={selectedReviews.includes(review.id)}
                    onChange={() => handleRowSelect(review.id)}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {review.guestName}
                  </div>
                  <div className="text-sm text-gray-500">
                    <Badge variant="secondary" size="sm">
                      <Tag className="h-3 w-3 mr-1" />
                      {review.source}
                    </Badge>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {review.rating && (
                    <StarRating rating={review.rating} size="sm" showValue />
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-xs truncate">
                    {review.publicReview}
                  </div>
                  {review.reviewCategory.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {review.reviewCategory.slice(0, 2).map((cat, index) => (
                        <Badge key={index} variant="secondary" size="sm">
                          {cat.category}: {cat.rating}
                        </Badge>
                      ))}
                      {review.reviewCategory.length > 2 && (
                        <Badge variant="secondary" size="sm">
                          +{review.reviewCategory.length - 2} more
                        </Badge>
                      )}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(review.submittedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {review.listingName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge 
                    variant={review.isDisplayedPublicly ? 'success' : 'secondary'}
                    size="sm"
                  >
                    {review.isDisplayedPublicly ? 'Public' : 'Hidden'}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleToggleDisplay(review)}
                    isLoading={toggleDisplayMutation.isPending}
                  >
                    {review.isDisplayedPublicly ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {reviews.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No reviews found</p>
        </div>
      )}
    </div>
  )
}

export default ReviewsTable
