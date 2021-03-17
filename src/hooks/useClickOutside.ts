import * as React from 'react'
import { useEventListener } from './useEventListener'

type CheckFN = (elTarget: Node) => boolean
type Callback = () => void

export const useClickOutside = <T extends HTMLElement = HTMLDivElement>(
  callback: Callback,
  checkFn?: CheckFN
) => {
  const containerRef = React.useRef<T>(null)
  const handleOutsideClick = (event: Event) => {
    checkFn =
      checkFn ||
      ((elTarget) => !containerRef.current?.contains(elTarget as Node))
    if (checkFn(event.target as Node)) {
      callback()
    }
  }
  useEventListener(handleOutsideClick)
  return [containerRef]
}
