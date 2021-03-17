import * as React from 'react'
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
  const [isNameError, setIsNameError] = React.useState(false)
  const [isPasswordError, setIsPasswordError] = React.useState(false)
  const [isEmailError, setIsEmailError] = React.useState(false)

  const [isEmailInvalid, setIsEmailInvalid] = React.useState(false)
  const [isEmailTaken] = React.useState(false)

  const [isLoginNotAllowed] = React.useState(false)

  const emailInputRef = React.useRef<HTMLInputElement>(null)
  const nameInputRef = React.useRef<HTMLInputElement>(null)

  const handleSubmit = (event: React.SyntheticEvent<UserFormElement>) => {
    event.preventDefault()

    const { name, password, email } = event.currentTarget.elements

    const handleFormValidation = () => {
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
      if (handleFormValidation() === true) {
        /* User can sign up */
        return true
      }
    }
  }

  return (
    <HomeMain>
      <Title>Madara</Title>
      <Subtitle>Manage Your Daily Tasks</Subtitle>
      <ToolBar role="toolbar" aria-label="Login or register">
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
              ref={nameInputRef}
            />
            {isNameError && (
              <ErrorMessage
                role="alert"
                aria-label="Name must be at least two characters long."
              >
                Name must be at least two characters long.
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
            aria-required="true"
            onChange={(event) => {
              setIsEmailInvalid(!event.target.validity.valid)
            }}
            ref={emailInputRef}
          />
          {isEmailError && (
            <ErrorMessage role="alert" aria-label="Email is not valid.">
              Email is not valid.
            </ErrorMessage>
          )}
          {isEmailTaken && (
            <ErrorMessage role="alert" aria-label="Email is taken.">
              Email is taken.
            </ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">Enter Your Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="Naruto's Password"
            aria-required="true"
          />
          {isPasswordError && (
            <ErrorMessage
              role="alert"
              aria-label="Password must be at least 6 characters long."
            >
              Password must be at least 6 characters long.
            </ErrorMessage>
          )}
          {isLoginNotAllowed && (
            <ErrorMessage
              role="alert"
              aria-label="Password or email is invalid."
              isLoginMode={isLoginMode}
            >
              Password or Email Is Invalid.
            </ErrorMessage>
          )}
        </FormGroup>

        <SubmitButton type="submit">
          {isLoginMode ? 'Sign In' : 'Sign Up'}
        </SubmitButton>
      </Form>
    </HomeMain>
  )
}
