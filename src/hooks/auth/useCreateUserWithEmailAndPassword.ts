import * as React from 'react'
import firebase from 'firebase/app'
import { useAlert } from 'components/Alert/AlertStore'
import {
  EmailAndPasswordActionHook,
  FirebaseAuth,
  FirebaseError,
} from './types'
import { Status } from 'types'

export const useCreateUserWithEmailAndPassword = (
  auth: FirebaseAuth
): EmailAndPasswordActionHook => {
  const [signUpError, setSignUpError] = React.useState<FirebaseError>()
  const [
    registeredUser,
    setRegisteredUser,
  ] = React.useState<firebase.auth.UserCredential>()
  const [status, setStatus] = React.useState<Status>('idle')

  const signUpSuccessAlert = useAlert(
    'You have successfully signed up.',
    'success'
  )

  const createUserWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    setStatus('loading')
    try {
      const user = await auth.createUserWithEmailAndPassword(email, password)
      setRegisteredUser(user)
      setStatus('success')
      signUpSuccessAlert()
    } catch (error) {
      setStatus('error')
      setSignUpError(error)
    }
  }

  const isSignUpLoading = status === 'loading'
  const isSignUpError = status === 'error'
  const isSignUpSuccess = status === 'success'

  const resArray: EmailAndPasswordActionHook = [
    createUserWithEmailAndPassword,
    isSignUpLoading,
    isSignUpSuccess,
    isSignUpError,
    signUpError,
    registeredUser,
  ]
  return React.useMemo<EmailAndPasswordActionHook>(() => resArray, resArray)
}
