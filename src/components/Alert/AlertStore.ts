import create from 'zustand'
import { v4 as uuidv4 } from 'uuid'

export type AlertType = 'success' | 'warning' | 'error'

export type Alert = { message: string; type: AlertType; id: string }

type AlertState = {
  alerts: Alert[]
  addAlert: (alert: Alert) => void
  removeAlert: (id: string) => void
}

export const useAlertStore = create<AlertState>((set) => ({
  alerts: [],
  addAlert: (alert: Alert) =>
    set(({ alerts }) => ({
      alerts: [...alerts, { ...alert }],
    })),
  removeAlert: (id: string) =>
    set(({ alerts }) => ({
      alerts: alerts.filter((alert) => alert.id !== id),
    })),
}))

export const useAlert = (type: AlertType) => {
  const { addAlert, removeAlert } = useAlertStore()

  const addAlertComponent = (message: string) => {
    const alert: Alert = {
      message,
      type,
      id: uuidv4(),
    }

    addAlert(alert)
    setTimeout(() => {
      removeAlert(alert.id)
    }, 3500)
  }

  return addAlertComponent
}
