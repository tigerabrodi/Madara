import create from 'zustand'

type AlertType = 'Success' | 'Warning' | 'Error'

type Alert = { message: string; type: AlertType; id: string }

type AlertState = {
  alerts: Array<Alert>
  addAlert: (alert: Alert) => void
  removeAlert: (id: string) => void
}

export const useAlertStore = create<AlertState>((set) => ({
  alerts: [],
  addAlert: (alert: Alert) =>
    set(({ alerts }) => ({
      alerts: [...alerts, { alert }] as Array<Alert>,
    })),
  removeAlert: (id: string) =>
    set(({ alerts }) => ({
      alerts: alerts.filter((alert) => alert.id !== id),
    })),
}))
