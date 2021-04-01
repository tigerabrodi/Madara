import * as React from 'react'
import { AlertItem } from './AlertItem'
import { useAlertStore } from './AlertStore'

export const Alert = ({ children }: { children: React.ReactNode }) => {
  const alerts = useAlertStore((state) => state.alerts)
  const removeAlert = useAlertStore((state) => state.removeAlert)

  return alerts.length > 0 ? (
    <React.Fragment>
      {alerts.map((alert) => (
        <AlertItem alert={alert} removeAlert={removeAlert} key={alert.id} />
      ))}
      {children}
    </React.Fragment>
  ) : null
}
