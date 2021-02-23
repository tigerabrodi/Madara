import * as React from 'react'
import { useLiveRef } from './useLiveRef'

export const useEventListener = (
  eventCallbackParam: () => void,
  element = window
) => {
  const eventCallbackRef = useLiveRef(eventCallbackParam)
  React.useEffect(() => {
    const eventCallback = eventCallbackRef.current
    element.addEventListener('click', eventCallback)
    return () => element.removeEventListener('click', eventCallback)
  }, [eventCallbackRef, element])
}
