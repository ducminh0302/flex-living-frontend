import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Button from '../Button'
import Input from '../Input'
import Card from '../Card'
import { useAppStore } from '../../stores/appStore'

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Please enter a valid email').max(255),
  subject: z.string().min(1, 'Subject is required').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
})

type ContactFormData = z.infer<typeof contactSchema>

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => void
  className?: string
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, className = '' }) => {
  const { addNotification } = useAppStore()
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const handleFormSubmit = async (data: ContactFormData) => {
    try {
      if (onSubmit) {
        await onSubmit(data)
      } else {
        // Mock submission
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log('Contact form submitted:', data)
      }
      
      addNotification({
        type: 'success',
        title: 'Message sent!',
        message: 'Thank you for contacting us. We\'ll get back to you soon.',
      })
      
      reset()
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Failed to send message',
        message: 'Please try again later.',
      })
    }
  }

  return (
    <Card className={className}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h3>
          <p className="text-gray-600 text-sm mb-6">
            Have questions about our properties or need assistance? We're here to help!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Name *"
            {...register('name')}
            error={errors.name?.message}
            placeholder="Your full name"
          />
          
          <Input
            label="Email *"
            type="email"
            {...register('email')}
            error={errors.email?.message}
            placeholder="your@email.com"
          />
        </div>

        <Input
          label="Subject *"
          {...register('subject')}
          error={errors.subject?.message}
          placeholder="What can we help you with?"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message *
          </label>
          <textarea
            {...register('message')}
            rows={4}
            className={`
              block w-full rounded-lg border shadow-sm transition-colors 
              focus:border-primary-500 focus:ring-primary-500
              ${errors.message ? 'border-red-300' : 'border-gray-300'}
            `}
            placeholder="Tell us more about your inquiry..."
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
          )}
        </div>

        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </Card>
  )
}

export default ContactForm
