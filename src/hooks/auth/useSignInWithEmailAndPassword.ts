import { useState, useMemo } from 'react'
import firebase from 'firebase/app'
import { EmailAndPasswordActionHook, FirebaseError } from './types'
import { Status } from 'types'
import { useAlert } from 'components/Alert/AlertStore'

export const useSignInWithEmailAndPassword = (
  auth: firebase.auth.Auth
): EmailAndPasswordActionHook => {
  const [signInError, setSignInError] = useState<FirebaseError>()
  const [status, setStatus] = useState<Status>('idle')

  const signInSuccessAlert = useAlert('success')

  const signInWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    setStatus('loading')
    try {
      await auth.signInWithEmailAndPassword(email, password)
      signInSuccessAlert('You have successfully signed in.')
      setStatus('success')
    } catch (error) {
      setSignInError(error as FirebaseError)
      setStatus('error')
      setTimeout(() => {
        setSignInError(undefined)
      }, 3000)
    }
  }

  const isSignInLoading = status === 'loading'
  const isSignInError = status === 'error'

  const resArray: EmailAndPasswordActionHook = [
    signInWithEmailAndPassword,
    isSignInLoading,
    isSignInError,
    signInError,
  ]
  return useMemo<EmailAndPasswordActionHook>(() => resArray, resArray)
}
