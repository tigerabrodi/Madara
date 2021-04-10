import { LogoutButton, Logout } from './styles'
import firebase from 'firebase/app'
import { useAlert } from 'components/Alert/AlertStore'

export const Navigation = () => {
  const auth = firebase.auth()

  const signOutSuccessAlert = useAlert(
    'You have successfully signed out.',
    'success'
  )

  const onSignOut = () => {
    auth.signOut()
    signOutSuccessAlert()
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
