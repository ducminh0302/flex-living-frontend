import axios from 'axios'
import type { ApiResponse, Review, Property, PropertyStats, PaginatedResponse, ReviewFilters, SortOptions, PaginationParams } from '../types/api'

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    if (import.meta.env.VITE_ENABLE_REQUEST_LOGGING === 'true') {
      console.log('API Request:', config.method?.toUpperCase(), config.url)
    }
    return config
  },
  (error) => {
    console.error('Request interceptor error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

// API service functions
export const apiService = {
  // Review endpoints
  async getHostawayReviews(): Promise<Review[]> {
    const response = await apiClient.get<ApiResponse<Review[]>>('/reviews/hostaway')
    return response.data.data || []
  },

  async getReviews(propertyId?: number, filters?: ReviewFilters, sort?: SortOptions, pagination?: PaginationParams): Promise<PaginatedResponse<Review>> {
    const params = new URLSearchParams()
    
    if (propertyId) params.append('propertyId', propertyId.toString())
    if (filters?.rating) {
      params.append('ratingMin', filters.rating.min.toString())
      params.append('ratingMax', filters.rating.max.toString())
    }
    if (filters?.categories?.length) {
      filters.categories.forEach(cat => params.append('categories', cat))
    }
    if (filters?.channels?.length) {
      filters.channels.forEach(ch => params.append('channels', ch))
    }
    if (filters?.dateRange) {
      params.append('dateStart', filters.dateRange.start)
      params.append('dateEnd', filters.dateRange.end)
    }
    if (filters?.search) params.append('search', filters.search)
    if (sort) {
      params.append('sortBy', sort.field)
      params.append('sortOrder', sort.direction)
    }
    if (pagination) {
      params.append('page', pagination.page.toString())
      params.append('limit', pagination.limit.toString())
    }

    const response = await apiClient.get<ApiResponse<PaginatedResponse<Review>>>(`/reviews?${params}`)
    return response.data.data!
  },

  async getPublicReviews(propertyId: number): Promise<Review[]> {
    const response = await apiClient.get<ApiResponse<Review[]>>(`/reviews/public/${propertyId}`)
    return response.data.data || []
  },

  async toggleReviewDisplay(reviewId: number, isDisplayed: boolean): Promise<Review> {
    const response = await apiClient.patch<ApiResponse<Review>>(`/reviews/${reviewId}/display`, { isDisplayedPublicly: isDisplayed })
    return response.data.data!
  },

  // Property endpoints
  async getProperties(): Promise<Property[]> {
    const response = await apiClient.get<ApiResponse<Property[]>>('/properties')
    return response.data.data || []
  },

  async getProperty(propertyId: number): Promise<Property> {
    const response = await apiClient.get<ApiResponse<Property>>(`/properties/${propertyId}`)
    return response.data.data!
  },

  async getPropertyStats(propertyId?: number): Promise<PropertyStats[]> {
    const url = propertyId ? `/properties/${propertyId}/stats` : '/properties/stats'
    const response = await apiClient.get<ApiResponse<PropertyStats[]>>(url)
    return response.data.data || []
  },

  // Google Places endpoints (if needed)
  async searchGooglePlaces(query: string): Promise<any[]> {
    const response = await apiClient.get(`/google-places/search?query=${encodeURIComponent(query)}`)
    return response.data.data || []
  },

  async getGoogleReviews(placeId: string): Promise<Review[]> {
    const response = await apiClient.get<ApiResponse<Review[]>>(`/google-places/reviews/${placeId}`)
    return response.data.data || []
  },
}

export default apiService
