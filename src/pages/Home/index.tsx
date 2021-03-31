import * as React from 'react'
import firebase from 'firebase/app'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { useAlert } from 'hooks/useAlert'
import {
  ErrorMessage,
  Form,
  FormGroup,
  FormTitle,
  HomeMain,
  Input,
  Label,
  SubmitButton,
  Subtitle,
  Title,
  ToolBar,
  ToolBarButton,
  ShowPasswordButton,
  WarningIcon,
  SmallSpinner,
} from './styles'

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement
  email: HTMLInputElement
  password: HTMLInputElement
}

interface UserFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

export const Home = () => {
  const [isLoginMode, setIsLoginMode] = React.useState(false)
  const [shouldShowPassword, setShouldShowPassword] = React.useState(false)
  const [isNameError, setIsNameError] = React.useState(false)
  const [isPasswordError, setIsPasswordError] = React.useState(false)
  const [isEmailError, setIsEmailError] = React.useState(false)

  const [isEmailInvalid, setIsEmailInvalid] = React.useState(false)
  const [isEmailTaken, setIsEmailTaken] = React.useState(false)

  const [isLoginNotAllowed] = React.useState(false)

  const auth = firebase.auth()
  const firestore = firebase.firestore()
  const usersRef = firestore.collection('users')

  const createUserResult = useCreateUserWithEmailAndPassword(auth)

  const addSuccessAlert = useAlert(
    'You have successfully signed up.',
    'success'
  )

  const createUserWithEmailAndPassword = createUserResult[0]
  const isSignUpLoading = createUserResult[2]
  const isSignUpError = createUserResult[3]

  const emailInputRef = React.useRef<HTMLInputElement>(null)
  const nameInputRef = React.useRef<HTMLInputElement>(null)

  const handleSubmit = async (event: React.SyntheticEvent<UserFormElement>) => {
    event.preventDefault()

    const { name, password, email } = event.currentTarget.elements

    const canUserSignUp = () => {
      const isNameInvalid = !name.value || (name.value && name.value.length < 2)
      if (isNameInvalid) {
        setIsNameError(true)
        return setTimeout(() => {
          setIsNameError(false)
        }, 3000)
      }

      if (isEmailInvalid || !email.value) {
        setIsEmailError(true)
        return setTimeout(() => {
          setIsEmailError(false)
        }, 3000)
      }

      const isPasswordInvalid =
        !password.value || (password.value && password.value.length < 6)
      if (isPasswordInvalid) {
        setIsPasswordError(true)
        return setTimeout(() => {
          setIsPasswordError(false)
        }, 3000)
      }

      return true
    }

    if (isLoginMode) {
      /* User can sign in */
      return true
    } else {
      if (canUserSignUp() === true) {
        createUserWithEmailAndPassword(email.value, password.value)

        if (isSignUpError) {
          const isEmailAlreadyTaken =
            isSignUpError.code === 'auth/email-already-in-use'
          if (isEmailAlreadyTaken) {
            setIsEmailTaken(true)
            return setTimeout(() => {
              setIsEmailTaken(false)
            }, 3000)
          }
        } else {
          addSuccessAlert()
          await usersRef.add({
            name: name.value,
            email: email.value,
          })
        }
      }
    }
  }

  return (
    <HomeMain>
      <Title>Madara</Title>
      <Subtitle>Manage Your Tasks</Subtitle>
      <ToolBar role="toolbar" aria-label="Sign In or Sign Up">
        <ToolBarButton
          aria-pressed={isLoginMode ? false : true}
          onClick={() => setIsLoginMode(false)}
          isLoginMode={isLoginMode}
          isRegisterButton
        >
          Sign Up
        </ToolBarButton>
        <ToolBarButton
          aria-pressed={isLoginMode ? true : false}
          onClick={() => setIsLoginMode(true)}
          isLoginMode={isLoginMode}
        >
          Sign In
        </ToolBarButton>
      </ToolBar>
      <Form onSubmit={handleSubmit} autoComplete="off" noValidate>
        <FormTitle> {isLoginMode ? 'Sign In' : 'Sign Up'} </FormTitle>
        {!isLoginMode && (
          <FormGroup>
            <Label htmlFor="name">Enter Your Name</Label>
            <Input
              type="text"
              id="name"
              placeholder="Naruto Uzumaki"
              aria-required="true"
              aria-invalid={isNameError ? 'true' : 'false'}
              aria-describedby={isNameError ? 'name-hint' : undefined}
              ref={nameInputRef}
            />
            {isNameError && (
              <ErrorMessage
                role="alert"
                id="name-hint"
                aria-label="Name must be at least two characters long."
              >
                Name must be at least two characters long.
                <WarningIcon role="img" aria-label="error" />
              </ErrorMessage>
            )}
          </FormGroup>
        )}

        <FormGroup>
          <Label htmlFor="email">Enter Your Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="NarutoUzumaki@gmail.com"
            aria-describedby={isEmailError ? 'email-hint' : undefined}
            aria-invalid={isEmailError || isEmailTaken ? 'true' : 'false'}
            aria-required="true"
            onChange={(event) => {
              setIsEmailInvalid(!event.target.validity.valid)
            }}
            ref={emailInputRef}
          />
          {isEmailError && (
            <ErrorMessage
              role="alert"
              id="email-hint"
              aria-label="Email is not valid."
            >
              Email is not valid.
              <WarningIcon role="img" aria-label="error" />
            </ErrorMessage>
          )}
          {isEmailTaken && (
            <ErrorMessage
              role="alert"
              id="email-hint"
              aria-label="Email is already taken."
            >
              Email is already taken.
              <WarningIcon role="img" aria-label="error" />
            </ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">Enter Your Password</Label>
          <Input
            type={shouldShowPassword ? 'text' : 'password'}
            id="password"
            placeholder="Naruto's Password"
            aria-describedby={isPasswordError ? 'password-hint' : undefined}
            aria-invalid={isPasswordError ? 'true' : 'false'}
            aria-required="true"
          />
          <ShowPasswordButton
            aria-controls="password"
            aria-pressed={shouldShowPassword ? 'true' : 'false'}
            aria-label="Show password as plain text. Note: this will visually expose your password on the screen."
            onClick={() => setShouldShowPassword(!shouldShowPassword)}
            type="button"
          >
            Show
          </ShowPasswordButton>
          {isPasswordError && (
            <ErrorMessage
              role="alert"
              id="password-hint"
              aria-label="Password must be at least 6 characters long."
            >
              Password must be at least 6 characters long.
              <WarningIcon role="img" aria-label="error" />
            </ErrorMessage>
          )}
          {isLoginNotAllowed && (
            <ErrorMessage
              role="alert"
              aria-label="Password or email is invalid."
              isLoginMode={isLoginMode}
            >
              Password or Email Is Invalid.
              <WarningIcon role="img" aria-label="error" />
            </ErrorMessage>
          )}
        </FormGroup>

        <SubmitButton type="submit">
          {isLoginMode ? 'Sign In' : 'Sign Up'}
          {isSignUpLoading && <SmallSpinner aria-hidden="true" />}
        </SubmitButton>
      </Form>
    </HomeMain>
  )
}
