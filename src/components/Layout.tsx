import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BarChart3, Settings, ArrowLeft, Menu, X } from 'lucide-react'
import { useResponsive } from '../hooks/useResponsive'
import { useAppStore } from '../stores/appStore'

interface LayoutProps {
  children: React.ReactNode
  variant?: 'dashboard' | 'public'
}

const Layout: React.FC<LayoutProps> = ({ children, variant = 'public' }) => {
  const location = useLocation()
  const { isMobile } = useResponsive()
  const { sidebarOpen, setSidebarOpen } = useAppStore()

  if (variant === 'public') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Public Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <Link to="/" className="text-2xl font-bold text-gray-900">
                  Flex Living
                </Link>
                <p className="text-gray-600 text-sm">Premium Property Reviews</p>
              </div>
              <nav className="hidden md:flex items-center space-x-6">
                <Link 
                  to="/" 
                  className="text-gray-700 hover:text-primary-600 transition-colors"
                >
                  Properties
                </Link>
                <Link 
                  to="/dashboard" 
                  className="text-gray-700 hover:text-primary-600 transition-colors"
                >
                  Manager Dashboard
                </Link>
              </nav>
            </div>
          </div>
        </header>
        {children}
      </div>
    )
  }

  // Dashboard Layout
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Dashboard Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out
        ${isMobile 
          ? (sidebarOpen ? 'translate-x-0' : '-translate-x-full')
          : 'translate-x-0'
        }
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <Link to="/dashboard" className="text-xl font-bold text-gray-900">
              {isMobile ? 'FL Manager' : 'Flex Living Manager'}
            </Link>
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-6 py-4">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/dashboard"
                  onClick={() => isMobile && setSidebarOpen(false)}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === '/dashboard'
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <BarChart3 className="h-4 w-4 mr-3" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/properties"
                  onClick={() => isMobile && setSidebarOpen(false)}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === '/dashboard/properties'
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Settings className="h-4 w-4 mr-3" />
                  Properties
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  onClick={() => isMobile && setSidebarOpen(false)}
                  className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-3" />
                  Public View
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Menu Button */}
      {isMobile && (
        <div className="fixed top-4 left-4 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className={`${isMobile ? 'pl-0' : 'pl-64'} transition-all duration-300`}>
        {children}
      </div>
    </div>
  )
}

export default Layout
