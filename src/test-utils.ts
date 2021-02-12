import * as React from 'react'
import { render as rtlRender } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AppProviders } from 'context'

const render = (
  ui: React.ReactElement,
  { route = '/', ...renderOptions } = {}
) => {
  window.history.pushState({}, 'Test page', route)

  return {
    ...rtlRender(ui, {
      wrapper: AppProviders as React.FunctionComponent,
      ...renderOptions,
    }),
  }
}

export * from '@testing-library/react'
export { render, userEvent }
