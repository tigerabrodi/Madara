import * as React from 'react'

export const useLiveRef = (value: () => void) => {
  const ref = React.useRef(value)
  React.useLayoutEffect(() => {
    ref.current = value
  })
  return ref
}
