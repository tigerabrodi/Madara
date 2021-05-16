import * as React from 'react'
import firebase from 'firebase/app'
import { useCreateUserWithEmailAndPassword } from 'hooks/auth/useCreateUserWithEmailAndPassword'
import { useSignInWithEmailAndPassword } from 'hooks/auth/useSignInWithEmailAndPassword'
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
  confirmPassword: HTMLInputElement
}

interface UserFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

export const Home = () => {
  const [isLoginMode, setIsLoginMode] = React.useState(false)
  const [shouldShowPassword, setShouldShowPassword] = React.useState(false)
  const [isNameError, setIsNameError] = React.useState(false)
  const [isPasswordError, setIsPasswordError] = React.useState(false)
  const [isConfirmError, setIsConfirmError] = React.useState(false)
  const [isEmailError, setIsEmailError] = React.useState(false)

  const [isEmailInvalid, setIsEmailInvalid] = React.useState(false)

  const [isLoginNotAllowed] = React.useState(false)

  const auth = firebase.auth()

  const [
    createUserWithEmailAndPassword,
    isSignUpLoading,
    isSignUpError,
    signUpError,
  ] = useCreateUserWithEmailAndPassword(auth)

  const isEmailTaken = signUpError?.code === 'auth/email-already-in-use'

  const [
    signInWithEmailAndPassword,
    isSignInLoading,
    isSignInError,
    signInError,
  ] = useSignInWithEmailAndPassword(auth)

  const emailInputRef = React.useRef<HTMLInputElement>(null)
  const nameInputRef = React.useRef<HTMLInputElement>(null)

  const handleSubmit = async (event: React.SyntheticEvent<UserFormElement>) => {
    event.preventDefault()

    const {
      name,
      password,
      email,
      confirmPassword,
    } = event.currentTarget.elements

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

      const isConfirmPasswordInvalid = password.value !== confirmPassword.value
      if (isConfirmPasswordInvalid) {
        setIsConfirmError(true)
        return setTimeout(() => {
          setIsConfirmError(false)
        }, 3000)
      }

      return true
    }

    if (isLoginMode) {
      signInWithEmailAndPassword(email.value, password.value)
    } else {
      if (canUserSignUp() === true) {
        createUserWithEmailAndPassword(email.value, password.value, name.value)
      }
    }
  }

  return (
    <HomeMain isLoginMode={isLoginMode}>
      <Title>Madara</Title>
      <Subtitle>Manage Your Tasks</Subtitle>
      <ToolBar role="toolbar" aria-label="Sign In or Sign Up">
        <ToolBarButton
          aria-pressed={isLoginMode ? false : true}
          onClick={() => setIsLoginMode(false)}
          isLoginMode={isLoginMode}
          isRegisterButton
        >
          Register
        </ToolBarButton>
        <ToolBarButton
          aria-pressed={isLoginMode ? true : false}
          onClick={() => setIsLoginMode(true)}
          isLoginMode={isLoginMode}
        >
          Login
        </ToolBarButton>
      </ToolBar>
      <Form
        onSubmit={handleSubmit}
        isLoginMode={isLoginMode}
        autoComplete="off"
        noValidate
      >
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

        <FormGroup isLoginMode={isLoginMode}>
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
          {isSignUpError && isEmailTaken && (
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

        <FormGroup isLoginMode={isLoginMode}>
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
          {isSignInError && signInError && (
            <ErrorMessage
              role="alert"
              id="password-hint"
              aria-label="Email or password is not correct."
            >
              Email or password is not correct.
              <WarningIcon role="img" aria-label="error" />
            </ErrorMessage>
          )}
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

        {!isLoginMode && (
          <FormGroup>
            <Label htmlFor="confirmPassword">Confirm Your Password</Label>
            <Input
              type={shouldShowPassword ? 'text' : 'password'}
              id="confirmPassword"
              placeholder="Naruto's password"
              aria-describedby={
                isConfirmError ? 'confirmPassword-hint' : undefined
              }
              aria-invalid={isConfirmError ? 'true' : 'false'}
              aria-required="true"
            />
            {isConfirmError && (
              <ErrorMessage
                role="alert"
                id="confirmPassword-hint"
                aria-label="Passwords do not match."
              >
                Passwords do not match.
                <WarningIcon role="img" aria-label="error" />
              </ErrorMessage>
            )}
          </FormGroup>
        )}

        <SubmitButton type="submit">
          {isLoginMode ? 'Sign In' : 'Sign Up'}
          {(isSignUpLoading || isSignInLoading) && (
            <SmallSpinner aria-hidden="true" />
          )}
        </SubmitButton>
      </Form>
    </HomeMain>
  )
}
