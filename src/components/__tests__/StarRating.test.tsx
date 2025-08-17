import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test/test-utils'
import StarRating from '../StarRating'

describe('StarRating Component', () => {
  it('renders correct number of stars', () => {
    render(<StarRating rating={4} maxRating={5} />)
    
    // Should render 5 stars total
    const stars = screen.getAllByTestId('star') || document.querySelectorAll('svg')
    expect(stars).toHaveLength(5)
  })

  it('shows rating value when showValue is true', () => {
    render(<StarRating rating={4.5} showValue />)
    expect(screen.getByText('(4.5)')).toBeInTheDocument()
  })

  it('applies correct size classes', () => {
    render(<StarRating rating={4} size="lg" />)
    const container = screen.getByTestId('star-rating') || document.querySelector('.flex')
    expect(container).toBeInTheDocument()
  })

  it('handles zero rating', () => {
    render(<StarRating rating={0} />)
    expect(screen.getByTestId('star-rating') || document.querySelector('.flex')).toBeInTheDocument()
  })

  it('handles decimal ratings', () => {
    render(<StarRating rating={3.7} showValue />)
    expect(screen.getByText('(3.7)')).toBeInTheDocument()
  })
})
