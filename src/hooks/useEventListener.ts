import * as React from 'react'
import { useLiveRef } from './useLiveRef'

export const useEventListener = (
  eventCallback: EventListener,
  element: Node | (Window & typeof globalThis) = window
) => {
  const eventCbRef = useLiveRef(eventCallback)
  React.useEffect(() => {
    const eventCb = eventCbRef.current
    element.addEventListener('click', eventCb)
    return () => element.removeEventListener('click', eventCb)
  }, [eventCbRef, element])
}
