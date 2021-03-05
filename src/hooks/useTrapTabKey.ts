import * as React from 'react'

type TrapTabKeyParams = {
  ref: React.RefObject<HTMLElement>
  setOpen: (state: boolean) => void
  pause?: boolean
}

export const useTrapTabKey = ({ ref, setOpen, pause }: TrapTabKeyParams) => {
  const prevFocusRef = React.useRef<HTMLElement | null>(null)

  React.useEffect(() => {
    if (pause) {
      return
    }

    prevFocusRef.current = document.activeElement as HTMLElement

    const focusableElements = ref.current?.querySelectorAll(
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]'
    )

    const firstItem = focusableElements![0] as HTMLElement
    const lastItem = focusableElements![
      focusableElements!.length - 1
    ] as HTMLElement

    firstItem.focus()

    const trapTabKey = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        if (event.shiftKey) {
          if (document.activeElement === firstItem) {
            event.preventDefault()
            lastItem.focus()
          }
        } else {
          if (document.activeElement === lastItem) {
            event.preventDefault()
            firstItem.focus()
          }
        }
      } else if (event.key === 'Escape') {
        setOpen(false)
        prevFocusRef.current?.focus()
      }
    }

    ref.current?.addEventListener('keydown', trapTabKey)
    return () => document.removeEventListener('keydown', trapTabKey)
  }, [pause])
}
