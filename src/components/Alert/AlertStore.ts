import create from 'zustand'

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
