import { useState, useEffect } from 'react'

type Direction = 'max' | 'min'

export const useMedia = (direction: Direction, width: string) => {
  const [isNotMobileLayout, setIsNotMobileLayout] = useState(false)

  useEffect(() => {
    const checkMobileLayout = () => {
      const isNotMobileLayout = window.matchMedia(
        `(${direction}-width: ${width}px)`
      ).matches
      setIsNotMobileLayout(isNotMobileLayout)
    }

    checkMobileLayout()
    window.addEventListener('resize', checkMobileLayout)
    return () => {
      window.removeEventListener('resize', checkMobileLayout)
    }
  }, [])

  return isNotMobileLayout
}
