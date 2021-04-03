import firebase from 'firebase/app'

export type FirebaseAuth = firebase.auth.Auth
export type FirebaseError = firebase.FirebaseError

type AuthActionHook<T, E> = [
  (email: string, password: string) => void,
  boolean,
  boolean,
  E | undefined,
  boolean,
  T | undefined
]

export type EmailAndPasswordActionHook = AuthActionHook<
  firebase.auth.UserCredential,
  firebase.FirebaseError
>
