import create from 'zustand'
import { v4 as uuidv4 } from 'uuid'

type AlertType = 'Success' | 'Warning' | 'Error'

type AlertState = {
  alerts: Array<{ message: string; type: AlertType; id: string }>
  addAlert: (message: string, type: AlertType) => void
  removeAlert: (id: string) => void
}

export const useAlertStore = create<AlertState>((set) => ({
  alerts: [],
  addAlert: (message: string, type: AlertType) =>
    set(({ alerts }) => ({
      alerts: [...alerts, { message, type, id: uuidv4() }],
    })),
  removeAlert: (id: string) =>
    set(({ alerts }) => ({
      alerts: alerts.filter((alert) => alert.id !== id),
    })),
}))
