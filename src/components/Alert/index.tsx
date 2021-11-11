import { toast as reactHotToast } from 'react-hot-toast'
import {
  AlertClose,
  AlertCloseButton,
  AlertIcon,
  AlertMessage,
  AlertStatus,
  AlertWrapper,
} from './styles'

type AlertProps = {
  removeAlert: () => void
  message: string
}

const Alert = ({ message, removeAlert }: AlertProps) => {
  return (
    <AlertWrapper>
      <AlertIcon title="check" aria-hidden="true" />
      <AlertStatus>Success!</AlertStatus>
      <AlertCloseButton aria-label="Close" onClick={() => removeAlert()}>
        <AlertClose aria-hidden="true" />
      </AlertCloseButton>
      <AlertMessage>{message}</AlertMessage>
    </AlertWrapper>
  )
}

export const toast = (message: string) =>
  reactHotToast((toast) => (
    <Alert
      message={message}
      removeAlert={() => reactHotToast.dismiss(toast.id)}
    />
  ))
