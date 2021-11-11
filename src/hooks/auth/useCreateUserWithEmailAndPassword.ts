import * as React from 'react'
import firebase from 'firebase/app'
import { useAlert } from 'components/Alert/AlertStore'
import { Status } from 'types'
import {
  EmailAndPasswordActionHook,
  FirebaseAuth,
  FirebaseError,
} from './types'

export const useCreateUserWithEmailAndPassword = (
  auth: FirebaseAuth
): EmailAndPasswordActionHook => {
  const [signUpError, setSignUpError] = React.useState<FirebaseError>()
  const [status, setStatus] = React.useState<Status>('idle')

  const signUpSuccessAlert = useAlert('success')

  const usersRef = firebase.firestore().collection('users')

  const createUserWithEmailAndPassword = async (
    email: string,
    password: string,
    name?: string
  ) => {
    setStatus('loading')
    try {
      const user = await auth.createUserWithEmailAndPassword(email, password)
      await usersRef.doc(user.user?.uid).set({
        name,
        email: user.user?.email,
      })
      setStatus('success')
      signUpSuccessAlert('You have successfully signed up.')
    } catch (error) {
      setStatus('error')
      setSignUpError(error as FirebaseError)
      setTimeout(() => {
        setSignUpError(undefined)
      }, 3000)
    }
  }

  const isSignUpLoading = status === 'loading'
  const isSignUpError = status === 'error'

  const resArray: EmailAndPasswordActionHook = [
    createUserWithEmailAndPassword,
    isSignUpLoading,
    isSignUpError,
    signUpError,
  ]
  return React.useMemo<EmailAndPasswordActionHook>(() => resArray, resArray)
}
