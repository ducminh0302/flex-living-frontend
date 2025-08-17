import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { commonChartOptions, chartColors } from '../../utils/chartSetup'
import Card from '../Card'

interface RatingDistributionChartProps {
  data: {
    1: number
    2: number
    3: number
    4: number
    5: number
  }
  title?: string
  className?: string
}

const RatingDistributionChart: React.FC<RatingDistributionChartProps> = ({
  data,
  title = 'Rating Distribution',
  className = '',
}) => {
  const chartData = {
    labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
    datasets: [
      {
        data: [data[1], data[2], data[3], data[4], data[5]],
        backgroundColor: [
          chartColors.danger,
          '#FB7185', // red-400
          chartColors.warning,
          '#60A5FA', // blue-400
          chartColors.success,
        ],
        borderWidth: 2,
        borderColor: '#FFFFFF',
        hoverBorderWidth: 3,
      },
    ],
  }

  const options = {
    ...commonChartOptions,
    plugins: {
      ...commonChartOptions.plugins,
      legend: {
        position: 'right' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
            weight: 'normal' as const,
          },
        },
      },
    },
    cutout: '60%',
  }

  const totalReviews = Object.values(data).reduce((sum, count) => sum + count, 0)
  const averageRating = totalReviews > 0 
    ? Object.entries(data).reduce((sum, [rating, count]) => sum + (parseInt(rating) * count), 0) / totalReviews 
    : 0

  return (
    <Card className={className}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex items-center mt-2">
          <div className="text-2xl font-bold text-gray-900">
            {averageRating.toFixed(1)}
          </div>
          <div className="ml-2 text-sm text-gray-600">
            ({totalReviews} reviews)
          </div>
        </div>
      </div>
      
      <div className="relative h-64">
        <Doughnut data={chartData} options={options} />
      </div>
      
      {/* Legend with counts */}
      <div className="mt-4 space-y-1">
        {Object.entries(data).reverse().map(([rating, count]) => (
          <div key={rating} className="flex justify-between items-center text-sm">
            <span className="text-gray-600">{rating} stars</span>
            <span className="font-medium">{count}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default RatingDistributionChart
