import React from 'react'
import { Star, ThumbsUp, MapPin, Award } from 'lucide-react'
import StarRating from './StarRating'
import Badge from './Badge'
import Card from './Card'
import type { Review } from '../types/api'

interface PublicReviewCardProps {
  review: Review
  variant?: 'default' | 'compact' | 'featured'
  showProperty?: boolean
  className?: string
}

const PublicReviewCard: React.FC<PublicReviewCardProps> = ({
  review,
  variant = 'default',
  showProperty = false,
  className = '',
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const isHighRating = (review.rating || 0) >= 4.5
  const isRecentReview = new Date(review.submittedAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Within 30 days

  if (variant === 'compact') {
    return (
      <Card hover padding="sm" className={className}>
        <div className="flex items-start space-x-3">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-primary-700">
                {getInitials(review.guestName)}
              </span>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {review.guestName}
                </p>
                {isHighRating && (
                  <Award className="h-3 w-3 text-yellow-500" />
                )}
              </div>
              {review.rating && (
                <StarRating rating={review.rating} size="sm" />
              )}
            </div>
            
            <p className="text-xs text-gray-600 line-clamp-2">
              {review.publicReview}
            </p>
            
            <p className="text-xs text-gray-500 mt-1">
              {formatDate(review.submittedAt)}
            </p>
          </div>
        </div>
      </Card>
    )
  }

  if (variant === 'featured') {
    return (
      <Card hover padding="lg" className={`border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-amber-50 ${className}`}>
        <div className="relative">
          {/* Featured Badge */}
          <div className="absolute -top-2 -right-2">
            <Badge variant="warning" size="sm">
              <Award className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          </div>

          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-lg font-semibold text-primary-700">
                  {getInitials(review.guestName)}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{review.guestName}</p>
                <div className="flex items-center space-x-2">
                  {review.rating && (
                    <StarRating rating={review.rating} size="md" showValue />
                  )}
                  {isRecentReview && (
                    <Badge variant="success" size="sm">New</Badge>
                  )}
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-gray-600">{formatDate(review.submittedAt)}</p>
              <Badge variant="primary" size="sm">
                {review.source}
              </Badge>
            </div>
          </div>

          {/* Review Content */}
          <div className="mb-4">
            <p className="text-gray-800 leading-relaxed">
              {review.publicReview}
            </p>
          </div>

          {/* Categories */}
          {review.reviewCategory.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Category Ratings:</h4>
              <div className="grid grid-cols-2 gap-3">
                {review.reviewCategory.map((category, index) => (
                  <div key={index} className="flex items-center justify-between bg-white/60 rounded-lg p-2">
                    <span className="text-sm text-gray-700 capitalize">
                      {category.category.replace('_', ' ')}
                    </span>
                    <StarRating rating={category.rating} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Property Info */}
          {showProperty && review.listingName && (
            <div className="pt-3 border-t border-yellow-200">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{review.listingName}</span>
              </div>
            </div>
          )}
        </div>
      </Card>
    )
  }

  // Default variant
  return (
    <Card hover padding="md" className={className}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-primary-700">
              {getInitials(review.guestName)}
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <p className="font-medium text-gray-900">{review.guestName}</p>
              {isHighRating && (
                <Award className="h-4 w-4 text-yellow-500" />
              )}
              {isRecentReview && (
                <Badge variant="success" size="sm">New</Badge>
              )}
            </div>
            <div className="flex items-center space-x-2 mt-1">
              {review.rating && (
                <StarRating rating={review.rating} size="sm" />
              )}
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500">{formatDate(review.submittedAt)}</span>
            </div>
          </div>
        </div>
        
        <Badge variant="secondary" size="sm">
          {review.source}
        </Badge>
      </div>

      {/* Review Content */}
      <div className="mb-4">
        <p className="text-gray-700 leading-relaxed">
          {review.publicReview}
        </p>
      </div>

      {/* Categories */}
      {review.reviewCategory.length > 0 && (
        <div className="border-t border-gray-100 pt-3">
          <div className="flex flex-wrap gap-2">
            {review.reviewCategory.slice(0, 3).map((category, index) => (
              <div key={index} className="flex items-center space-x-1 bg-gray-50 rounded-full px-3 py-1">
                <span className="text-xs text-gray-600 capitalize">
                  {category.category.replace('_', ' ')}
                </span>
                <div className="flex items-center">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span className="text-xs font-medium text-gray-700 ml-0.5">
                    {category.rating}
                  </span>
                </div>
              </div>
            ))}
            {review.reviewCategory.length > 3 && (
              <Badge variant="secondary" size="sm">
                +{review.reviewCategory.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Property Info */}
      {showProperty && review.listingName && (
        <div className="pt-3 border-t border-gray-100 mt-3">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{review.listingName}</span>
          </div>
        </div>
      )}

      {/* Helpful Action */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-3">
        <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
          <ThumbsUp className="h-4 w-4" />
          <span>Helpful</span>
        </button>
        <span className="text-xs text-gray-400">
          Verified stay
        </span>
      </div>
    </Card>
  )
}

export default PublicReviewCard
