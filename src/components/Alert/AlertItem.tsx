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
}: AlertItemProps) => (
  <AlertWrapper role="alert" tabIndex={0}>
    <AlertIcon title="check" />
    <AlertStatus>
      {type === 'success'
        ? 'Success!'
        : type === 'error'
        ? 'Error!'
        : type === 'warning'
        ? 'Warning!'
        : null}
    </AlertStatus>
    <AlertCloseButton aria-label="Close toast" onClick={() => removeAlert(id)}>
      <AlertClose aria-hidden="true" />
    </AlertCloseButton>
    <AlertMessage>{message}</AlertMessage>
  </AlertWrapper>
)
