import React from 'react'
import { Link } from 'react-router-dom'
import { BarChart3, Building, Star, Users, Download, Plus } from 'lucide-react'
import { useProperties, usePropertyStats, useHostawayReviews } from '../hooks/useApi'
import PropertyOverviewCard from '../components/PropertyOverviewCard'
import RatingDistributionChart from '../components/Charts/RatingDistributionChart'
import TrendsChart from '../components/Charts/TrendsChart'
import ReviewsTable from '../components/ReviewsTable/ReviewsTable'
import ReviewFilters from '../components/ReviewsTable/ReviewFilters'
import Button from '../components/Button'
import Card from '../components/Card'
import { PageLoadingSkeleton } from '../components/LoadingStates'

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'overview' | 'reviews'>('overview')
  
  const { data: properties = [], isLoading: propertiesLoading } = useProperties()
  const { data: propertyStats = [], isLoading: statsLoading } = usePropertyStats()
  const { data: reviews = [], isLoading: reviewsLoading } = useHostawayReviews()

  if (propertiesLoading || statsLoading) {
    return <PageLoadingSkeleton />
  }

  const totalReviews = propertyStats.reduce((sum, stat) => sum + stat.totalReviews, 0)
  const averageRating = propertyStats.length > 0 
    ? propertyStats.reduce((sum, stat) => sum + stat.averageRating, 0) / propertyStats.length
    : 0

  // Merge properties with stats for overview cards
  const propertiesWithStats = properties.map(property => {
    const stats = propertyStats.find(s => s.propertyId === property.id)
    return {
      id: property.id,
      propertyId: property.id,
      propertyName: property.name,
      averageRating: stats?.averageRating || 0,
      totalReviews: stats?.totalReviews || 0,
      ratingDistribution: stats?.ratingDistribution || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      categoryAverages: stats?.categoryAverages || {},
      trendsData: stats?.trendsData || [],
      name: property.name,
      city: property.city,
      country: property.country,
      imageUrl: property.imageUrl,
    }
  })

  // Calculate aggregate data for charts
  const aggregateRatingDistribution = propertyStats.reduce((acc, stat) => {
    Object.entries(stat.ratingDistribution).forEach(([rating, count]) => {
      const ratingKey = parseInt(rating) as 1 | 2 | 3 | 4 | 5
      acc[ratingKey] = (acc[ratingKey] || 0) + count
    })
    return acc
  }, { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 })

  // Generate mock trend data for last 6 months
  const mockTrendsData = Array.from({ length: 6 }, (_, i) => {
    const date = new Date()
    date.setMonth(date.getMonth() - (5 - i))
    return {
      month: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      averageRating: 4.2 + (Math.random() * 0.6 - 0.3),
      reviewCount: Math.floor(Math.random() * 20) + 10,
    }
  })

  return (
    <>
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Reviews Dashboard</h1>
              <p className="text-gray-600">Manage your property reviews and performance</p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
              <Button variant="secondary" icon={Download} size="sm">
                Export
              </Button>
              <Button variant="secondary" icon={Plus} size="sm">
                Add Review
              </Button>
              <Link to="/dashboard/properties">
                <Button variant="primary" size="sm">
                  Manage Properties
                </Button>
              </Link>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'reviews'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Review Management
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' ? (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card padding="md">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Building className="h-8 w-8 text-primary-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Properties</p>
                    <p className="text-2xl font-bold text-gray-900">{properties.length}</p>
                  </div>
                </div>
              </Card>

              <Card padding="md">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                    <p className="text-2xl font-bold text-gray-900">{totalReviews}</p>
                  </div>
                </div>
              </Card>

              <Card padding="md">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Star className="h-8 w-8 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Average Rating</p>
                    <p className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</p>
                  </div>
                </div>
              </Card>

              <Card padding="md">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <BarChart3 className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Public Reviews</p>
                    <p className="text-2xl font-bold text-gray-900">{Object.values(aggregateRatingDistribution).reduce((a, b) => a + b, 0)}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <RatingDistributionChart 
                data={aggregateRatingDistribution}
                title="Overall Rating Distribution"
              />
              <TrendsChart 
                data={mockTrendsData}
                title="Rating Trends (Last 6 Months)"
              />
            </div>

            {/* Property Performance Cards */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Property Performance</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {propertiesWithStats.map((property) => (
                  <PropertyOverviewCard key={property.id} property={property} />
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Review Management Tab */}
            <div className="space-y-6">
              <ReviewFilters />
              <ReviewsTable 
                reviews={reviews} 
                isLoading={reviewsLoading}
                onSelectionChange={(selectedIds) => {
                  console.log('Selected review IDs:', selectedIds)
                }}
              />
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Dashboard
