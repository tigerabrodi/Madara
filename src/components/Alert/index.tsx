import {
  AlertClose,
  AlertCloseButton,
  AlertIcon,
  AlertMessage,
  AlertStatus,
  AlertWrapper,
} from './styles'

export const Alert = () => (
  <AlertWrapper role="alert" tabIndex={0}>
    <AlertIcon title="check" />
    <AlertStatus>Success!</AlertStatus>
    <AlertCloseButton aria-label="Close toast">
      <AlertClose aria-hidden="true" />
    </AlertCloseButton>
    <AlertMessage>You have successfully logged in.</AlertMessage>
  </AlertWrapper>
)
