import * as React from 'react'

type TrapTabKeyParams = {
  ref: React.RefObject<HTMLElement>
  setOpen: (state: boolean) => void
  pause?: boolean
}

export const useTrapTabKey = ({ ref, setOpen, pause }: TrapTabKeyParams) => {
  const prevFocusedElementRef = React.useRef<HTMLElement | null>(null)

  const firstButtonElementRef = React.useRef<HTMLButtonElement>(null)
  const secondButtonElementRef = React.useRef<HTMLButtonElement>(null)
  const thirdButtonElementRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (pause) {
      return
    }

    prevFocusedElementRef.current = document.activeElement as HTMLElement

    const focusableElements = ref.current?.querySelectorAll(
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]'
    )

    const firstElement = focusableElements![0] as HTMLElement
    const lastElement = focusableElements![
      focusableElements!.length - 1
    ] as HTMLElement

    firstElement.focus()

    const trapTabKey = (event: KeyboardEvent) => {
      const pressedKey = event.key.slice()
      const currentlyFocusedElement = document.activeElement
      if (pressedKey === 'Tab') {
        if (event.shiftKey) {
          if (currentlyFocusedElement === firstElement) {
            event.preventDefault()
            lastElement.focus()
          }
        } else {
          if (currentlyFocusedElement === lastElement) {
            event.preventDefault()
            firstElement.focus()
          }
        }
      }

      if (pressedKey === 'Escape') {
        setOpen(false)
        prevFocusedElementRef.current?.focus()
      }

      if (pressedKey === 'Enter') {
        const targetElement = event.target as Node
        if (firstButtonElementRef.current) {
          if (
            firstButtonElementRef.current.contains(targetElement) ||
            firstButtonElementRef.current === targetElement
          ) {
            prevFocusedElementRef.current?.focus()
          }
        }

        if (secondButtonElementRef.current) {
          if (
            secondButtonElementRef.current.contains(targetElement) ||
            secondButtonElementRef.current === targetElement
          ) {
            prevFocusedElementRef.current?.focus()
          }
        }

        if (thirdButtonElementRef.current) {
          if (
            thirdButtonElementRef.current.contains(targetElement) ||
            thirdButtonElementRef.current === targetElement
          ) {
            prevFocusedElementRef.current?.focus()
          }
        }
      }
    }

    ref.current?.addEventListener('keydown', trapTabKey)
    return () => document.removeEventListener('keydown', trapTabKey)
  }, [pause])

  return {
    firstButtonElementRef,
    secondButtonElementRef,
    thirdButtonElementRef,
  }
}
