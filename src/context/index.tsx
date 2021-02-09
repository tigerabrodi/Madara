import * as React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { GlobalStyle } from '../theme/globalStyles'

export const AppProviders = ({
  children,
}: {
  children: React.ReactElement
}) => (
  <>
    <GlobalStyle />
    <Router>{children}</Router>
  </>
)
