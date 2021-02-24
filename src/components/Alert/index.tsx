import { useAlertStore } from './AlertStore'
import {
  AlertClose,
  AlertCloseButton,
  AlertIcon,
  AlertMessage,
  AlertStatus,
  AlertWrapper,
} from './styles'

export const Alert = () => {
  const alerts = useAlertStore((state) => state.alerts)

  return alerts.length > 0 ? (
    <>
      {alerts.map(({ type, message }) => (
        <AlertWrapper role="alert" tabIndex={0}>
          <AlertIcon title="check" />
          <AlertStatus>{type}!</AlertStatus>
          <AlertCloseButton aria-label="Close toast">
            <AlertClose aria-hidden="true" />
          </AlertCloseButton>
          <AlertMessage>{message}</AlertMessage>
        </AlertWrapper>
      ))}
    </>
  ) : null
}
