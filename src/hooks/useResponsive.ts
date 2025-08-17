import { useState, useEffect } from 'react'

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

interface BreakpointConfig {
  sm: number
  md: number
  lg: number
  xl: number
  '2xl': number
}

const breakpoints: BreakpointConfig = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

export const useResponsive = () => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Set initial size

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = screenSize.width < breakpoints.md
  const isTablet = screenSize.width >= breakpoints.md && screenSize.width < breakpoints.lg
  const isDesktop = screenSize.width >= breakpoints.lg

  const isBreakpoint = (breakpoint: Breakpoint) => screenSize.width >= breakpoints[breakpoint]
  
  const currentBreakpoint: Breakpoint = (() => {
    if (screenSize.width >= breakpoints['2xl']) return '2xl'
    if (screenSize.width >= breakpoints.xl) return 'xl'
    if (screenSize.width >= breakpoints.lg) return 'lg'
    if (screenSize.width >= breakpoints.md) return 'md'
    return 'sm'
  })()

  return {
    screenSize,
    isMobile,
    isTablet,
    isDesktop,
    isBreakpoint,
    currentBreakpoint,
    breakpoints: {
      isSm: isBreakpoint('sm'),
      isMd: isBreakpoint('md'),
      isLg: isBreakpoint('lg'),
      isXl: isBreakpoint('xl'),
      is2xl: isBreakpoint('2xl'),
    }
  }
}
