import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, MapPin, Award, Users, Calendar } from 'lucide-react'
import { useProperty, usePublicReviews } from '../hooks/useApi'
import PublicReviewCard from '../components/PublicReviewCard'
import PublicReviewFilters from '../components/PublicReviewFilters'
import Badge from '../components/Badge'
import StarRating from '../components/StarRating'
import { PageLoadingSkeleton, EmptyState } from '../components/LoadingStates'

const PublicPropertyReviews: React.FC = () => {
  const { propertyId } = useParams<{ propertyId: string }>()
  const propertyIdNum = propertyId ? parseInt(propertyId) : 0
  
  const [filters, setFilters] = useState({
    search: '',
    rating: null as number | null,
    sortBy: 'date' as 'date' | 'rating' | 'helpful',
    timeframe: 'all' as 'all' | 'recent' | 'thisYear',
  })

  const { data: property, isLoading: propertyLoading } = useProperty(propertyIdNum)
  const { data: allReviews = [], isLoading: reviewsLoading } = usePublicReviews(propertyIdNum)

  // Filter and sort reviews based on current filters
  const filteredReviews = React.useMemo(() => {
    let filtered = [...allReviews]

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filtered = filtered.filter(review => 
        review.guestName.toLowerCase().includes(searchTerm) ||
        review.publicReview.toLowerCase().includes(searchTerm)
      )
    }

    // Rating filter  
    if (filters.rating) {
      filtered = filtered.filter(review => (review.rating || 0) >= filters.rating!)
    }

    // Time filter
    if (filters.timeframe !== 'all') {
      const now = new Date()
      const cutoffDate = filters.timeframe === 'recent' 
        ? new Date(now.getFullYear(), now.getMonth() - 6, now.getDate())
        : new Date(now.getFullYear(), 0, 1)
      
      filtered = filtered.filter(review => new Date(review.submittedAt) >= cutoffDate)
    }

    // Sort reviews
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'rating':
          return (b.rating || 0) - (a.rating || 0)
        case 'helpful':
          // Mock helpful sorting - would need backend support
          return Math.random() - 0.5
        case 'date':
        default:
          return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      }
    })

    return filtered
  }, [allReviews, filters])

  if (propertyLoading || reviewsLoading) {
    return <PageLoadingSkeleton />
  }

  if (!property) {
    return (
      <EmptyState 
        title="Property Not Found"
        description="The property you're looking for doesn't exist or has been removed."
        action={
          <Link to="/" className="btn-primary">
            Back to Properties
          </Link>
        }
      />
    )
  }

  const averageRating = allReviews.length > 0 
    ? allReviews.reduce((sum, review) => sum + (review.rating || 0), 0) / allReviews.length
    : 0

  // Get featured reviews (high rating, recent, good content)
  const featuredReviews = allReviews
    .filter(review => (review.rating || 0) >= 4.5)
    .slice(0, 2)

  return (
    <>
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to All Properties
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Property Info */}
            <div className="lg:col-span-2">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">{property.name}</h1>
              
              {(property.city || property.country) && (
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span className="text-lg">{property.city}, {property.country}</span>
                </div>
              )}

              {property.description && (
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {property.description}
                </p>
              )}

              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((amenity, index) => (
                    <Badge key={index} variant="secondary" size="sm">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Stats Card */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl p-6 border border-primary-100">
                <div className="text-center mb-4">
                  <div className="flex justify-center mb-2">
                    <StarRating rating={averageRating} size="lg" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {averageRating.toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    Based on {allReviews.length} review{allReviews.length !== 1 ? 's' : ''}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      Total Reviews
                    </span>
                    <span className="font-semibold">{allReviews.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-gray-600">
                      <Award className="h-4 w-4 mr-2" />
                      Excellent Rating
                    </span>
                    <span className="font-semibold">
                      {Math.round((allReviews.filter(r => (r.rating || 0) >= 4.5).length / allReviews.length) * 100)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      Recent Reviews
                    </span>
                    <span className="font-semibold">
                      {allReviews.filter(r => new Date(r.submittedAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Reviews */}
        {featuredReviews.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredReviews.map((review) => (
                <PublicReviewCard 
                  key={review.id} 
                  review={review} 
                  variant="featured"
                />
              ))}
            </div>
          </div>
        )}

        {/* Reviews Section */}
        <div>
          <PublicReviewFilters
            onFilterChange={setFilters}
            totalReviews={filteredReviews.length}
            averageRating={averageRating}
          />

          {/* Reviews Grid */}
          {filteredReviews.length === 0 ? (
            <EmptyState 
              title="No reviews found"
              description="Try adjusting your filters to see more reviews."
              action={
                <button
                  onClick={() => setFilters({
                    search: '',
                    rating: null,
                    sortBy: 'date',
                    timeframe: 'all',
                  })}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              }
            />
          ) : (
            <div className="space-y-6">
              {filteredReviews.map((review, index) => {
                // Show different variants for visual variety
                const variant = index < 2 && featuredReviews.length === 0 ? 'featured' : 'default'
                
                return (
                  <PublicReviewCard 
                    key={review.id} 
                    review={review} 
                    variant={variant}
                    showProperty={false}
                  />
                )
              })}
              
              {/* Load More Button (if needed) */}
              {filteredReviews.length > 10 && (
                <div className="text-center pt-8">
                  <button className="btn-secondary">
                    Show More Reviews
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default PublicPropertyReviews
