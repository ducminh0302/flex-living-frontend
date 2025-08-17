import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  Filler,
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  Filler
)

// Chart.js default configuration
ChartJS.defaults.font.family = 'Inter, system-ui, sans-serif'
ChartJS.defaults.color = '#6B7280' // gray-500

// Common chart options
export const commonChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        padding: 20,
        usePointStyle: true,
        font: {
          size: 12,
          weight: 'normal' as const,
        },
      },
    },
    tooltip: {
      backgroundColor: '#1F2937', // gray-800
      titleColor: '#F9FAFB', // gray-50
      bodyColor: '#F9FAFB',
      borderColor: '#374151', // gray-700
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: true,
      padding: 12,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 11,
        },
      },
    },
    y: {
      grid: {
        color: '#F3F4F6', // gray-100
      },
      ticks: {
        font: {
          size: 11,
        },
      },
    },
  },
}

// Color palettes for charts
export const chartColors = {
  primary: '#3B82F6', // primary-500
  success: '#10B981', // green-500
  warning: '#F59E0B', // yellow-500
  danger: '#EF4444', // red-500
  info: '#06B6D4', // cyan-500
  purple: '#8B5CF6', // violet-500
  gradient: {
    primary: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
    success: 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
  }
}
