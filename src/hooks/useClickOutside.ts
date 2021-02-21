import * as React from 'react'

type CallbackType = (event: MouseEvent) => void

export const useClickOutside = (
  elRef: React.RefObject<HTMLElement>,
  callback: CallbackType
) => {
  const callbackRef = React.useRef<CallbackType>()
  callbackRef.current = callback

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        elRef.current?.contains(event.target as Node) &&
        callbackRef.current
      ) {
        callbackRef.current(event)
      }
    }

    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [callbackRef, elRef])
}
