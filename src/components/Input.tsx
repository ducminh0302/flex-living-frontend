import React from 'react'
import { LucideIcon } from 'lucide-react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helpText?: string
  icon?: LucideIcon
  variant?: 'default' | 'search'
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helpText,
  icon: Icon,
  variant = 'default',
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

  const baseClasses = 'block w-full rounded-lg border shadow-sm transition-colors focus:border-primary-500 focus:ring-primary-500 disabled:bg-gray-50 disabled:text-gray-500'
  
  const variantClasses = {
    default: 'border-gray-300',
    search: 'border-gray-300 pl-10',
  }
  
  const errorClasses = error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div className="relative">
        {Icon && variant === 'search' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-4 w-4 text-gray-400" />
          </div>
        )}
        
        <input
          id={inputId}
          className={`
            ${baseClasses}
            ${variantClasses[variant]}
            ${errorClasses}
            ${className}
          `}
          {...props}
        />
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      
      {helpText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helpText}</p>
      )}
    </div>
  )
}

export default Input
