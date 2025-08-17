import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface AppStore {
  // UI State
  sidebarOpen: boolean
  isMobile: boolean
  
  // Theme & Preferences
  theme: 'light' | 'dark'
  
  // Notifications
  notifications: {
    id: string
    type: 'success' | 'error' | 'warning' | 'info'
    title: string
    message?: string
    duration?: number
  }[]
  
  // Actions
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
  setIsMobile: (isMobile: boolean) => void
  setTheme: (theme: 'light' | 'dark') => void
  addNotification: (notification: Omit<AppStore['notifications'][0], 'id'>) => void
  removeNotification: (id: string) => void
  clearNotifications: () => void
}

export const useAppStore = create<AppStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      sidebarOpen: true,
      isMobile: false,
      theme: 'light',
      notifications: [],
      
      // Actions
      setSidebarOpen: (sidebarOpen: boolean) => set({ sidebarOpen }),
      
      toggleSidebar: () => {
        const { sidebarOpen } = get()
        set({ sidebarOpen: !sidebarOpen })
      },
      
      setIsMobile: (isMobile: boolean) => set({ isMobile }),
      
      setTheme: (theme: 'light' | 'dark') => set({ theme }),
      
      addNotification: (notification) => {
        const id = Math.random().toString(36).substr(2, 9)
        const newNotification = { ...notification, id }
        
        set((state) => ({
          notifications: [...state.notifications, newNotification]
        }))
        
        // Auto remove after duration (default 5 seconds)
        const duration = notification.duration ?? 5000
        if (duration > 0) {
          setTimeout(() => {
            get().removeNotification(id)
          }, duration)
        }
      },
      
      removeNotification: (id: string) => {
        set((state) => ({
          notifications: state.notifications.filter(n => n.id !== id)
        }))
      },
      
      clearNotifications: () => set({ notifications: [] }),
    }),
    { name: 'AppStore' }
  )
)
