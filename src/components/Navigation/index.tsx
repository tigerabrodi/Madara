import { LogoutButton, Logout } from './styles'
import firebase from 'firebase/app'
import { toast } from 'components/Alert'

export const Navigation = () => {
  const auth = firebase.auth()

  const onSignOut = () => {
    auth.signOut()
    toast('You have successfully signed out.')
  }

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
