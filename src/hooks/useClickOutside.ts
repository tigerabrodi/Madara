import * as React from 'react'
import { useEventListener } from './useEventListener'

type Callback = () => void

export const useClickOutside = <T extends HTMLElement = HTMLDivElement>(
  callback: Callback
) => {
  const containerRef = React.useRef<T>(null)
  const firstButtonRef = React.useRef<HTMLButtonElement>(null)

  const handleOutsideClick = (event: Event) => {
    const isOutsideContainerElement = !containerRef.current?.contains(
      event.target as Node
    )

    const isFirstButtonTarget =
      event.target === firstButtonRef.current ||
      firstButtonRef.current?.contains(event.target as Node)

    if (isOutsideContainerElement && !isFirstButtonTarget) {
      callback()
    }
  }
  useEventListener(handleOutsideClick)

  return { containerRef, firstButtonRef }
}
