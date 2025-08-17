import React, { Suspense } from 'react'
import { PageLoadingSkeleton, CenteredLoading } from './LoadingStates'

// Lazy load heavy components for better performance
export const LazyDashboard = React.lazy(() => import('../pages/Dashboard'))
export const LazyPropertyManagement = React.lazy(() => import('../pages/PropertyManagement'))
export const LazyPublicHomepage = React.lazy(() => import('../pages/PublicHomepage'))
export const LazyPublicPropertyReviews = React.lazy(() => import('../pages/PublicPropertyReviews'))

// Chart components (heavy due to Chart.js)
export const LazyRatingDistributionChart = React.lazy(() => import('./Charts/RatingDistributionChart'))
export const LazyTrendsChart = React.lazy(() => import('./Charts/TrendsChart'))

// Complex table components
export const LazyReviewsTable = React.lazy(() => import('./ReviewsTable/ReviewsTable'))

// Wrapper component for lazy loading with proper fallbacks
interface LazyWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  fullPage?: boolean
}

export const LazyWrapper: React.FC<LazyWrapperProps> = ({ 
  children, 
  fallback,
  fullPage = false 
}) => {
  const defaultFallback = fullPage ? <PageLoadingSkeleton /> : <CenteredLoading />
  
  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  )
}

// Hook for preloading components
export const usePreloadComponent = (importFn: () => Promise<any>) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      importFn()
    }, 100) // Small delay to not interfere with initial render
    
    return () => clearTimeout(timer)
  }, [importFn])
}

// Preload hook for dashboard components
export const usePreloadDashboard = () => {
  usePreloadComponent(() => import('../pages/Dashboard'))
  usePreloadComponent(() => import('./Charts/RatingDistributionChart'))
  usePreloadComponent(() => import('./Charts/TrendsChart'))
  usePreloadComponent(() => import('./ReviewsTable/ReviewsTable'))
}
