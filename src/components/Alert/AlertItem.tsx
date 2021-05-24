import * as React from 'react'
import { Alert } from './AlertStore'
import {
  AlertClose,
  AlertCloseButton,
  AlertIcon,
  AlertMessage,
  AlertStatus,
  AlertWrapper,
} from './styles'

type AlertItemProps = {
  alert: Alert
  removeAlert: (id: string) => void
}

export const AlertItem = ({
  alert: { id, message, type },
  removeAlert,
}: AlertItemProps) => {
  const alertWrapperRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (message && alertWrapperRef.current) {
      alertWrapperRef.current.focus()
    }
  }, [message])

  return (
    <AlertWrapper role="alert" tabIndex={-1} ref={alertWrapperRef}>
      <AlertIcon title="check" aria-hidden="true" />
      <AlertStatus>
        {type === 'success'
          ? 'Success!'
          : type === 'error'
          ? 'Error!'
          : type === 'warning'
          ? 'Warning!'
          : null}
      </AlertStatus>
      <AlertCloseButton
        aria-label="Close alert"
        onClick={() => removeAlert(id)}
      >
        <AlertClose aria-hidden="true" />
      </AlertCloseButton>
      <AlertMessage>{message}</AlertMessage>
    </AlertWrapper>
  )
}
