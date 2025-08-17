// Base API types
export interface ApiResponse<T> {
  status: 'success' | 'error'
  data?: T
  message?: string
  error?: string
}

// Review related types
export interface Review {
  id: number
  type: 'host-to-guest' | 'guest-to-host'
  status: 'published' | 'draft' | 'archived'
  rating: number | null
  publicReview: string
  privateReview?: string
  reviewCategory: ReviewCategory[]
  submittedAt: string
  guestName: string
  listingName: string
  listingId?: number
  channel?: string
  isDisplayedPublicly?: boolean
  source: 'hostaway' | 'google' | 'manual'
}

export interface ReviewCategory {
  category: string
  rating: number
}

// Property related types
export interface Property {
  id: number
  name: string
  description?: string
  address?: string
  city?: string
  country?: string
  averageRating?: number
  totalReviews?: number
  reviewsCount?: number
  googlePlaceId?: string
  imageUrl?: string
  amenities?: string[]
}

// Filtering and sorting types
export interface ReviewFilters {
  rating?: {
    min: number
    max: number
  }
  categories?: string[]
  channels?: string[]
  dateRange?: {
    start: string
    end: string
  }
  search?: string
  source?: string[]
}

export interface SortOptions {
  field: 'rating' | 'date' | 'guestName' | 'property'
  direction: 'asc' | 'desc'
}

// Pagination
export interface PaginationParams {
  page: number
  limit: number
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
}

// Dashboard analytics types
export interface PropertyStats {
  propertyId: number
  propertyName: string
  averageRating: number
  totalReviews: number
  ratingDistribution: {
    1: number
    2: number
    3: number
    4: number
    5: number
  }
  categoryAverages: Record<string, number>
  trendsData: {
    month: string
    averageRating: number
    reviewCount: number
  }[]
}
