import { useAlertStore, Alert, AlertType } from 'components/Alert/AlertStore'
import { v4 as uuidv4 } from 'uuid'

export const useAlert = (message: string, type: AlertType) => {
  const { addAlert, removeAlert } = useAlertStore()

  const addAlertComponent = () => {
    const alert: Alert = {
      message,
      type,
      id: uuidv4(),
    }

    addAlert(alert)
    setTimeout(() => {
      removeAlert(alert.id)
    }, 3000)
  }

  return addAlertComponent
}
