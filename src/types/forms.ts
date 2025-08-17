import { z } from 'zod'

// Review filtering form schema
export const reviewFilterSchema = z.object({
  rating: z.object({
    min: z.number().min(1).max(5),
    max: z.number().min(1).max(5),
  }).optional(),
  categories: z.array(z.string()).optional(),
  channels: z.array(z.string()).optional(),
  dateRange: z.object({
    start: z.string(),
    end: z.string(),
  }).optional(),
  search: z.string().optional(),
  source: z.array(z.string()).optional(),
})

// Property management form schema
export const propertyFormSchema = z.object({
  name: z.string().min(1, 'Property name is required').max(200),
  description: z.string().max(1000).optional(),
  address: z.string().max(500).optional(),
  city: z.string().max(100).optional(),
  country: z.string().max(100).optional(),
  googlePlaceId: z.string().optional(),
  imageUrl: z.string().url().optional(),
  amenities: z.array(z.string()).optional(),
})

// Review form schema (for manual review creation/editing)
export const reviewFormSchema = z.object({
  rating: z.number().min(1).max(5),
  publicReview: z.string().min(1, 'Review text is required').max(2000),
  privateReview: z.string().max(1000).optional(),
  guestName: z.string().min(1, 'Guest name is required').max(100),
  categories: z.array(z.object({
    category: z.string(),
    rating: z.number().min(1).max(5),
  })),
  channel: z.string().optional(),
  source: z.enum(['hostaway', 'google', 'manual']),
})

// Export inferred types
export type ReviewFilterFormData = z.infer<typeof reviewFilterSchema>
export type PropertyFormData = z.infer<typeof propertyFormSchema>
export type ReviewFormData = z.infer<typeof reviewFormSchema>
