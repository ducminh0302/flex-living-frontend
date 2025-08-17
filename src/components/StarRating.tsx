import React from 'react'
import { Star } from 'lucide-react'

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
  className?: string
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  showValue = false,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  }

  const stars = Array.from({ length: maxRating }, (_, i) => {
    const filled = i < Math.floor(rating)
    const halfFilled = i < rating && i >= Math.floor(rating)
    
    return (
      <Star
        key={i}
        className={`
          ${sizeClasses[size]}
          ${filled ? 'text-yellow-400 fill-current' : 
            halfFilled ? 'text-yellow-400 fill-current opacity-50' : 
            'text-gray-300'}
        `}
      />
    )
  })

  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex items-center">
        {stars}
      </div>
      {showValue && (
        <span className="ml-1 text-sm text-gray-600">
          ({rating.toFixed(1)})
        </span>
      )}
    </div>
  )
}

export default StarRating
