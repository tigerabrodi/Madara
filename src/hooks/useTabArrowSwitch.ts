import * as React from 'react'

export const useTabArrowSwitch = () => {
  const tabListRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const tabs = document.querySelectorAll('[role="tab"]')

    let tabFocusIndex = 0

    const handleArrowTabSwitch = (event: KeyboardEvent) => {
      // Move right
      if (event.code === 'ArrowRight' || event.code === 'ArrowLeft') {
        tabs[tabFocusIndex].setAttribute('tabindex', '-1')
        if (event.code === 'ArrowRight') {
          tabFocusIndex++
          // If we're at the end, go to the start
          if (tabFocusIndex >= tabs.length) {
            tabFocusIndex = 0
          }
          // Move left
        } else if (event.code === 'ArrowLeft') {
          tabFocusIndex--
          // If we're at the start, move to the end
          if (tabFocusIndex < 0) {
            tabFocusIndex = tabs.length - 1
          }
        }

        tabs[tabFocusIndex].setAttribute('tabindex', '0')
        ;(tabs[tabFocusIndex] as HTMLButtonElement).focus()
      }
    }

    tabListRef.current?.addEventListener('keydown', handleArrowTabSwitch)

    return () =>
      tabListRef.current?.removeEventListener('keydown', handleArrowTabSwitch)
  }, [])

  return tabListRef
}
