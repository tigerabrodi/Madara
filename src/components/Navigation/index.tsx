import { LogoutButton, Logout } from './styles'

export const Navigation = () => (
  <nav>
    <LogoutButton aria-label="Logout">
      <Logout aria-hidden="true" />
    </LogoutButton>
  </nav>
)
