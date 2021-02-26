import { render, screen, userEvent, within } from 'test-utils'
import { v4 as uuidv4 } from 'uuid'
import { useAlertStore, Alert as AlertType } from './AlertStore'
import { Alert } from '.'

const DummyComponent = () => {
  const { addAlert, removeAlert } = useAlertStore()

  const handleButtonClick = () => {
    const alert: AlertType = {
      message: 'Successfully logged in',
      type: 'success',
      id: uuidv4(),
    }

    addAlert(alert)
    setTimeout(() => {
      removeAlert(alert.id)
    }, 3000)
  }

  return (
    <>
      <Alert />
      <div>
        <button type="button" onClick={handleButtonClick}>
          Trigger Alert
        </button>
      </div>
    </>
  )
}

test('show alert and close it when close button gets clicked', () => {
  render(<DummyComponent />)
  userEvent.click(screen.getByRole('button', { name: /trigger alert/i }))

  const alert = screen.getByRole('alert')

  expect(
    within(alert).getByRole('heading', { name: 'Success!' })
  ).toBeInTheDocument()

  expect(screen.getByText('Successfully logged in')).toBeInTheDocument()

  userEvent.click(screen.getByRole('button', { name: /Close toast/i }))

  expect(screen.queryByRole('alert')).not.toBeInTheDocument()
})
