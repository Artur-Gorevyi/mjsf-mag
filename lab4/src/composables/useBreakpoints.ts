import { ref, computed, onMounted } from 'vue'
import { useEventListener } from './useEventListener'

const DEFAULT_BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1440,
}

export type Breakpoints = {
  [key: string]: number
}

export interface UseBreakpointsReturn {
  width: import('vue').Ref<number>
  isMobile: import('vue').ComputedRef<boolean>
  isTablet: import('vue').ComputedRef<boolean>
  isDesktop: import('vue').ComputedRef<boolean>
  greater: (name: keyof Breakpoints) => boolean
  smaller: (name: keyof Breakpoints) => boolean
  between: (min: keyof Breakpoints, max: keyof Breakpoints) => boolean
}

export function useBreakpoints(
  breakpoints: Breakpoints = DEFAULT_BREAKPOINTS
): UseBreakpointsReturn {
  const width = ref<number>(0)

  onMounted(() => {
    width.value = window.innerWidth
  })

  useEventListener('resize', () => {
    width.value = window.innerWidth
  })

  const isGreaterOrEqual = (breakpointValue: number): boolean => {
    return width.value >= breakpointValue
  }

  const isSmallerThan = (breakpointValue: number): boolean => {
    return width.value < breakpointValue
  }

  const isMobile = computed(() => {
    const mobileBreakpoint = breakpoints.mobile
    if (!mobileBreakpoint) return false
    return width.value < mobileBreakpoint
  })

  const isTablet = computed(() => {
    const mobileBreakpoint = breakpoints.mobile
    const tabletBreakpoint = breakpoints.tablet
    const desktopBreakpoint = breakpoints.desktop
    
    if (tabletBreakpoint) {
      return width.value >= mobileBreakpoint && width.value < tabletBreakpoint
    }
    if (desktopBreakpoint) {
      return width.value >= mobileBreakpoint && width.value < desktopBreakpoint
    }
    return false
  })

  const isDesktop = computed(() => {
    const desktopBreakpoint = breakpoints.desktop
    if (!desktopBreakpoint) return false
    return width.value >= desktopBreakpoint
  })

  const greater = (name: keyof Breakpoints): boolean => {
    const breakpointValue = breakpoints[name]
    if (breakpointValue === undefined) return false
    return isGreaterOrEqual(breakpointValue)
  }

  const smaller = (name: keyof Breakpoints): boolean => {
    const breakpointValue = breakpoints[name]
    if (breakpointValue === undefined) return false
    return isSmallerThan(breakpointValue)
  }

  const between = (min: keyof Breakpoints, max: keyof Breakpoints): boolean => {
    const minValue = breakpoints[min]
    const maxValue = breakpoints[max]
    
    if (minValue === undefined || maxValue === undefined) return false
    
    return width.value >= minValue && width.value < maxValue
  }

  return {
    width,
    isMobile,
    isTablet,
    isDesktop,
    greater,
    smaller,
    between,
  }
}

