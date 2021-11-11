import * as React from 'react'
import { GlobalStyle } from '../theme/globalStyles'

export const AppProviders = ({ children }: { children: React.ReactNode }) => (
  <>
    <GlobalStyle />
    {children}
  </>
)
