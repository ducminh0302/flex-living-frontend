import { Routes, Route } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import Layout from './components/Layout'
import NotificationProvider from './components/NotificationProvider'
import { 
  LazyDashboard, 
  LazyPropertyManagement, 
  LazyPublicHomepage, 
  LazyPublicPropertyReviews,
  LazyWrapper,
  usePreloadDashboard
} from './components/LazyComponents'

function App() {
  // Preload dashboard components when user is likely to navigate there
  usePreloadDashboard()

  return (
    <ErrorBoundary>
      <NotificationProvider />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <Layout variant="public">
            <LazyWrapper fullPage>
              <LazyPublicHomepage />
            </LazyWrapper>
          </Layout>
        } />
        <Route path="/property/:propertyId/reviews" element={
          <Layout variant="public">
            <LazyWrapper fullPage>
              <LazyPublicPropertyReviews />
            </LazyWrapper>
          </Layout>
        } />
        
        {/* Manager Dashboard Routes */}
        <Route path="/dashboard" element={
          <Layout variant="dashboard">
            <LazyWrapper fullPage>
              <LazyDashboard />
            </LazyWrapper>
          </Layout>
        } />
        <Route path="/dashboard/properties" element={
          <Layout variant="dashboard">
            <LazyWrapper fullPage>
              <LazyPropertyManagement />
            </LazyWrapper>
          </Layout>
        } />
        
        {/* 404 Not Found */}
        <Route path="*" element={
          <Layout variant="public">
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-gray-600 mb-6">Page not found</p>
                <a href="/" className="btn-primary">Go Home</a>
              </div>
            </div>
          </Layout>
        } />
      </Routes>
    </ErrorBoundary>
  )
}

export default App
