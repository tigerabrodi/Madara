import * as React from 'react'

export const useTabArrowSwitch = () => {
  const tabListRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const tabs = document.querySelectorAll('[role="tab"]')

    let tabFocusIndex = 0

    const handleArrowTabSwitch = (event: KeyboardEvent) => {
      const shouldSwitchViaArrows =
        event.code === 'ArrowRight' || event.code === 'ArrowLeft'

      if (shouldSwitchViaArrows) {
        tabs[tabFocusIndex].setAttribute('tabindex', '-1')

        const moveRight = event.code === 'ArrowRight'
        if (moveRight) {
          tabFocusIndex++
          const isEndPosition = tabFocusIndex >= tabs.length

          if (isEndPosition) {
            tabFocusIndex = 0
          }
        }

        const moveLeft = event.code === 'ArrowLeft'
        if (moveLeft) {
          tabFocusIndex--
          const isStartPosition = tabFocusIndex < 0
          if (isStartPosition) {
            tabFocusIndex = tabs.length - 1
          }
        }

        const tabToBeFocused = tabs[tabFocusIndex] as HTMLButtonElement
        tabToBeFocused.setAttribute('tabindex', '0')
        tabToBeFocused.focus()
      }
    }

    tabListRef.current?.addEventListener('keydown', handleArrowTabSwitch)

    return () =>
      tabListRef.current?.removeEventListener('keydown', handleArrowTabSwitch)
  }, [])

  return tabListRef
}
