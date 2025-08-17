import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Award, TrendingUp } from 'lucide-react'
import { useProperties } from '../hooks/useApi'
import Card from '../components/Card'
import Badge from '../components/Badge'
import StarRating from '../components/StarRating'
import { PageLoadingSkeleton } from '../components/LoadingStates'

const PublicHomepage: React.FC = () => {
  const { data: properties = [], isLoading } = useProperties()

  if (isLoading) {
    return <PageLoadingSkeleton />
  }

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Badge variant="success" size="md">
                <Award className="h-4 w-4 mr-1" />
                Trusted by 1000+ Guests
              </Badge>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Premium Properties,
              <br />
              <span className="text-primary-600">Authentic Reviews</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover exceptional accommodations through real guest experiences. Every review tells a story of comfort, quality, and memorable stays.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center">
                <StarRating rating={4.8} size="lg" />
                <span className="ml-2 text-lg font-semibold text-gray-900">4.8/5</span>
                <span className="ml-2 text-gray-600">Average Rating</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-green-500 mr-1" />
                <span className="text-lg font-semibold text-gray-900">95%</span>
                <span className="ml-2 text-gray-600">Guest Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => {
            const isHighRated = (property.averageRating || 0) >= 4.5
            const hasRecentReviews = (property.totalReviews || 0) > 10
            
            return (
              <Card key={property.id} hover className="overflow-hidden group">
                {/* Property Image */}
                {property.imageUrl ? (
                  <div className="relative aspect-w-16 aspect-h-9 overflow-hidden">
                    <img 
                      src={property.imageUrl} 
                      alt={property.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {isHighRated && (
                      <div className="absolute top-3 left-3">
                        <Badge variant="success" size="sm">
                          <Award className="h-3 w-3 mr-1" />
                          Top Rated
                        </Badge>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <MapPin className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                        {property.name}
                      </h3>
                      {(property.city || property.country) && (
                        <div className="flex items-center text-gray-500 text-sm">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{property.city}, {property.country}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Description */}
                  {property.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {property.description}
                    </p>
                  )}
                  
                  {/* Rating & Reviews */}
                  {(property.averageRating || property.totalReviews) && (
                    <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <StarRating 
                          rating={property.averageRating || 0} 
                          size="sm" 
                        />
                        <span className="ml-2 font-semibold text-gray-900">
                          {(property.averageRating || 0).toFixed(1)}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">
                          {property.totalReviews || 0} reviews
                        </div>
                        {hasRecentReviews && (
                          <div className="text-xs text-green-600">
                            Recently reviewed
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Amenities Preview */}
                  {property.amenities && property.amenities.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {property.amenities.slice(0, 3).map((amenity, index) => (
                          <Badge key={index} variant="secondary" size="sm">
                            {amenity}
                          </Badge>
                        ))}
                        {property.amenities.length > 3 && (
                          <Badge variant="secondary" size="sm">
                            +{property.amenities.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Action */}
                  <Link 
                    to={`/property/${property.id}/reviews`}
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    View Reviews & Details
                  </Link>
                </div>
              </Card>
            )
          })}
        </div>
        
        {properties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No properties available at the moment.</p>
          </div>
        )}
      </div>
    </>
  )
}

export default PublicHomepage
