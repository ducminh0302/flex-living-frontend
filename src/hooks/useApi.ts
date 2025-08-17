import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiService } from '../services/api'
import { useAppStore } from '../stores/appStore'
import type { Review } from '../types/api'

// React Query keys for caching
export const queryKeys = {
  properties: ['properties'] as const,
  property: (id: number) => ['properties', id] as const,
  propertyStats: (id?: number) => ['properties', 'stats', id] as const,
  reviews: ['reviews'] as const,
  hostawayReviews: ['reviews', 'hostaway'] as const,
  publicReviews: (propertyId: number) => ['reviews', 'public', propertyId] as const,
}

// Properties hooks
export const useProperties = () => {
  return useQuery({
    queryKey: queryKeys.properties,
    queryFn: apiService.getProperties,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useProperty = (propertyId: number) => {
  return useQuery({
    queryKey: queryKeys.property(propertyId),
    queryFn: () => apiService.getProperty(propertyId),
    enabled: !!propertyId,
    staleTime: 5 * 60 * 1000,
  })
}

export const usePropertyStats = (propertyId?: number) => {
  return useQuery({
    queryKey: queryKeys.propertyStats(propertyId),
    queryFn: () => apiService.getPropertyStats(propertyId),
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

// Reviews hooks
export const useHostawayReviews = () => {
  return useQuery({
    queryKey: queryKeys.hostawayReviews,
    queryFn: apiService.getHostawayReviews,
    staleTime: 1 * 60 * 1000,
  })
}

export const usePublicReviews = (propertyId: number) => {
  return useQuery({
    queryKey: queryKeys.publicReviews(propertyId),
    queryFn: () => apiService.getPublicReviews(propertyId),
    enabled: !!propertyId,
    staleTime: 2 * 60 * 1000,
  })
}

// Mutations for data updates
export const useToggleReviewDisplay = () => {
  const queryClient = useQueryClient()
  const addNotification = useAppStore(state => state.addNotification)

  return useMutation({
    mutationFn: ({ reviewId, isDisplayed }: { reviewId: number; isDisplayed: boolean }) =>
      apiService.toggleReviewDisplay(reviewId, isDisplayed),
    
    onSuccess: (updatedReview: Review) => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] })
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.publicReviews(updatedReview.listingId || 0) 
      })
      
      addNotification({
        type: 'success',
        title: 'Review updated',
        message: `Review ${updatedReview.isDisplayedPublicly ? 'enabled' : 'disabled'} for public display`,
      })
    },
    
    onError: (error: any) => {
      addNotification({
        type: 'error',
        title: 'Update failed',
        message: error.message || 'Failed to update review display status',
      })
    },
  })
}
