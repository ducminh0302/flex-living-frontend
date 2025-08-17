import React from 'react'
import { Link } from 'react-router-dom'
import { TrendingUp, TrendingDown, Eye, MapPin, Calendar } from 'lucide-react'
import Card from './Card'
import Badge from './Badge'
import StarRating from './StarRating'
import type { PropertyStats } from '../types/api'

interface PropertyOverviewCardProps {
  property: PropertyStats & {
    name: string
    city?: string
    country?: string
    imageUrl?: string
  }
  className?: string
}

const PropertyOverviewCard: React.FC<PropertyOverviewCardProps> = ({
  property,
  className = '',
}) => {
  const totalReviews = property.totalReviews || 0
  const averageRating = property.averageRating || 0
  const publicReviewsCount = Object.values(property.ratingDistribution).reduce((sum, count) => sum + count, 0)
  const recentTrend = property.trendsData && property.trendsData.length > 1 
    ? property.trendsData[property.trendsData.length - 1].averageRating - 
      property.trendsData[property.trendsData.length - 2].averageRating
    : 0

  // Calculate category performance
  const topCategory = Object.entries(property.categoryAverages || {})
    .sort(([,a], [,b]) => b - a)[0]
  
  const worstCategory = Object.entries(property.categoryAverages || {})
    .sort(([,a], [,b]) => a - b)[0]

  return (
    <Card hover className={`relative overflow-hidden ${className}`}>
      {/* Property Image */}
      {property.imageUrl && (
        <div className="aspect-w-16 aspect-h-9">
          <img 
            src={property.imageUrl} 
            alt={property.name}
            className="w-full h-32 object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {property.name}
            </h3>
            {(property.city || property.country) && (
              <div className="flex items-center text-gray-500 text-sm mb-2">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{property.city}, {property.country}</span>
              </div>
            )}
          </div>
          
          {/* Trend Indicator */}
          {recentTrend !== 0 && (
            <div className={`flex items-center text-xs ${
              recentTrend > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {recentTrend > 0 ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {Math.abs(recentTrend).toFixed(1)}
            </div>
          )}
        </div>

        {/* Rating Overview */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <StarRating rating={averageRating} size="md" />
            <span className="ml-2 text-lg font-semibold text-gray-900">
              {averageRating.toFixed(1)}
            </span>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">{totalReviews} reviews</div>
            <div className="flex items-center text-xs text-gray-500">
              <Eye className="h-3 w-3 mr-1" />
              {publicReviewsCount} public
            </div>
          </div>
        </div>

        {/* Category Performance */}
        {(topCategory || worstCategory) && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-600 mb-2">Performance</div>
            <div className="space-y-1">
              {topCategory && (
                <div className="flex justify-between items-center text-xs">
                  <span className="text-green-600">Best: {topCategory[0].replace('_', ' ')}</span>
                  <Badge variant="success" size="sm">{topCategory[1].toFixed(1)}</Badge>
                </div>
              )}
              {worstCategory && worstCategory !== topCategory && (
                <div className="flex justify-between items-center text-xs">
                  <span className="text-red-600">Needs work: {worstCategory[0].replace('_', ' ')}</span>
                  <Badge variant="warning" size="sm">{worstCategory[1].toFixed(1)}</Badge>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Rating Distribution */}
        <div className="mb-4">
          <div className="text-xs text-gray-600 mb-2">Rating Distribution</div>
          <div className="space-y-1">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = property.ratingDistribution[rating as keyof typeof property.ratingDistribution] || 0
              const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0
              return (
                <div key={rating} className="flex items-center text-xs">
                  <span className="w-6 text-gray-600">{rating}★</span>
                  <div className="flex-1 mx-2 bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-yellow-400 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="w-6 text-gray-600 text-right">{count}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <Link 
            to={`/property/${property.propertyId}/reviews`}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            View Public Page →
          </Link>
          
          <div className="flex items-center space-x-2">
            <button className="text-gray-400 hover:text-gray-600">
              <Eye className="h-4 w-4" />
            </button>
            <button className="text-gray-400 hover:text-gray-600">
              <Calendar className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats Badge */}
      {totalReviews > 0 && (
        <div className="absolute top-2 right-2">
          <Badge 
            variant={averageRating >= 4.5 ? 'success' : averageRating >= 4 ? 'primary' : 'warning'}
            size="sm"
          >
            {averageRating >= 4.5 ? 'Excellent' : averageRating >= 4 ? 'Good' : 'Fair'}
          </Badge>
        </div>
      )}
    </Card>
  )
}

export default PropertyOverviewCard
