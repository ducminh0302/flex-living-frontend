import React from 'react'
import { Line } from 'react-chartjs-2'
import { commonChartOptions, chartColors } from '../../utils/chartSetup'
import Card from '../Card'

interface TrendsChartProps {
  data: {
    month: string
    averageRating: number
    reviewCount: number
  }[]
  title?: string
  className?: string
}

const TrendsChart: React.FC<TrendsChartProps> = ({
  data,
  title = 'Rating Trends',
  className = '',
}) => {
  const chartData = {
    labels: data.map(item => item.month),
    datasets: [
      {
        label: 'Average Rating',
        data: data.map(item => item.averageRating),
        borderColor: chartColors.primary,
        backgroundColor: `${chartColors.primary}20`, // 20% opacity
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: chartColors.primary,
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2,
      },
    ],
  }

  const options = {
    ...commonChartOptions,
    scales: {
      ...commonChartOptions.scales,
      y: {
        ...commonChartOptions.scales!.y,
        min: 1,
        max: 5,
        ticks: {
          ...commonChartOptions.scales!.y!.ticks,
          stepSize: 0.5,
        },
      },
    },
    plugins: {
      ...commonChartOptions.plugins,
      tooltip: {
        ...commonChartOptions.plugins!.tooltip,
        callbacks: {
          afterLabel: function(context: any) {
            const dataIndex = context.dataIndex
            const reviewCount = data[dataIndex]?.reviewCount || 0
            return `Reviews: ${reviewCount}`
          },
        },
      },
    },
  }

  return (
    <Card className={className}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">Monthly average ratings over time</p>
      </div>
      
      <div className="relative h-64">
        <Line data={chartData} options={options} />
      </div>
    </Card>
  )
}

export default TrendsChart
