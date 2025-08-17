import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { Review, ReviewFilters, SortOptions } from '../types/api'

interface ReviewStore {
  // State
  reviews: Review[]
  filters: ReviewFilters
  sortOptions: SortOptions
  selectedReviews: number[]
  isLoading: boolean
  error: string | null
  
  // Actions
  setReviews: (reviews: Review[]) => void
  setFilters: (filters: ReviewFilters) => void
  setSortOptions: (options: SortOptions) => void
  setSelectedReviews: (reviewIds: number[]) => void
  toggleReviewSelection: (reviewId: number) => void
  selectAllReviews: () => void
  clearSelection: () => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
}

const initialState = {
  reviews: [],
  filters: {},
  sortOptions: { field: 'date' as const, direction: 'desc' as const },
  selectedReviews: [],
  isLoading: false,
  error: null,
}

export const useReviewStore = create<ReviewStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        
        setReviews: (reviews: Review[]) => set({ reviews }),
        
        setFilters: (filters: ReviewFilters) => set({ filters }),
        
        setSortOptions: (sortOptions: SortOptions) => set({ sortOptions }),
        
        setSelectedReviews: (selectedReviews: number[]) => set({ selectedReviews }),
        
        toggleReviewSelection: (reviewId: number) => {
          const { selectedReviews } = get()
          const newSelection = selectedReviews.includes(reviewId)
            ? selectedReviews.filter(id => id !== reviewId)
            : [...selectedReviews, reviewId]
          set({ selectedReviews: newSelection })
        },
        
        selectAllReviews: () => {
          const { reviews } = get()
          set({ selectedReviews: reviews.map(review => review.id) })
        },
        
        clearSelection: () => set({ selectedReviews: [] }),
        
        setLoading: (isLoading: boolean) => set({ isLoading }),
        
        setError: (error: string | null) => set({ error }),
        
        reset: () => set(initialState),
      }),
      {
        name: 'review-store',
        partialize: (state) => ({ 
          filters: state.filters, 
          sortOptions: state.sortOptions 
        }),
      }
    ),
    { name: 'ReviewStore' }
  )
)
