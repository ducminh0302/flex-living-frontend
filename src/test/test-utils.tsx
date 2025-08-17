import React from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { vi } from 'vitest'

// Mock data for tests
export const mockProperty = {
  id: 1,
  name: 'Test Property',
  city: 'London',
  country: 'UK',
  description: 'A beautiful test property',
  averageRating: 4.5,
  totalReviews: 10,
  amenities: ['WiFi', 'Kitchen', 'Parking'],
}

export const mockReview = {
  id: 1,
  type: 'guest-to-host' as const,
  status: 'published' as const,
  rating: 5,
  publicReview: 'Great stay!',
  reviewCategory: [
    { category: 'cleanliness', rating: 5 },
    { category: 'communication', rating: 5 },
  ],
  submittedAt: '2023-08-15T10:00:00Z',
  guestName: 'John Doe',
  listingName: 'Test Property',
  listingId: 1,
  source: 'hostaway' as const,
  isDisplayedPublicly: true,
}

// Create a custom render function that includes providers
function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  })
}

interface AllTheProvidersProps {
  children: React.ReactNode
}

const AllTheProviders: React.FC<AllTheProvidersProps> = ({ children }) => {
  const queryClient = createTestQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </QueryClientProvider>
  )
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

// Mock API responses
export const mockApiSuccess = (data: any) => {
  return Promise.resolve({
    data: {
      status: 'success',
      data,
    },
  })
}

export const mockApiError = (message = 'API Error') => {
  return Promise.reject(new Error(message))
}

// Mock hooks
export const mockUseQuery = (data: any, isLoading = false, error = null) => {
  return vi.fn(() => ({
    data,
    isLoading,
    error,
    refetch: vi.fn(),
    isSuccess: !isLoading && !error,
    isError: !!error,
  }))
}

export const mockUseMutation = () => {
  return vi.fn(() => ({
    mutate: vi.fn(),
    mutateAsync: vi.fn(),
    isLoading: false,
    error: null,
    isSuccess: false,
    isError: false,
  }))
}

// User event helpers
export const createMockEvent = (overrides = {}) => ({
  preventDefault: vi.fn(),
  stopPropagation: vi.fn(),
  target: { value: '' },
  ...overrides,
})

// Re-export everything
export * from '@testing-library/react'
export { customRender as render }
