import { toast as reactHotToast } from 'react-hot-toast'
import {
  AlertClose,
  AlertCloseButton,
  AlertIcon,
  AlertMessage,
  AlertStatus,
  AlertWrapper,
} from './styles'

type AlertItemProps = {
  removeAlert: () => void
  message: string
}

/* TODO Rename alert close button name in tests */

const AlertItem = ({ message, removeAlert }: AlertItemProps) => {
  return (
    <AlertWrapper role="alert">
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
    <AlertItem
      message={message}
      removeAlert={() => reactHotToast.dismiss(toast.id)}
    />
  ))
