import firebase from 'firebase/app'

export type FirebaseAuth = firebase.auth.Auth
export type FirebaseError = firebase.FirebaseError

type AuthActionHook<E> = [
  (email: string, password: string, name?: string) => void,
  boolean,
  boolean,
  E | undefined
]

export type EmailAndPasswordActionHook = AuthActionHook<firebase.FirebaseError>
