import { LogoutButton, Logout } from './styles'
import firebase from 'firebase/app'

export const Navigation = () => {
  const auth = firebase.auth()

  const onSignOut = () => auth.signOut()

  return (
    <nav>
      {auth.currentUser && (
        <LogoutButton aria-label="Logout" onClick={onSignOut}>
          <Logout aria-hidden="true" />
        </LogoutButton>
      )}
    </nav>
  )
}
