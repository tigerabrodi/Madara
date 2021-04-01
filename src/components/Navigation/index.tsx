import { LogoutButton, Logout } from './styles'
import { useAlert } from 'components/Alert/AlertStore'
import firebase from 'firebase/app'

export const Navigation = () => {
  const auth = firebase.auth()

  const addSuccessAlert = useAlert(
    'You have successfully signed out.',
    'success'
  )

  const onSignOut = () => {
    addSuccessAlert()
    auth.signOut()
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
