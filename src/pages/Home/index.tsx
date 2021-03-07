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
  SwitchButton,
  Title,
  SwitchButtonHighlight,
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

  const emailInputRef = React.useRef() as React.RefObject<HTMLInputElement>
  const nameInputRef = React.useRef() as React.RefObject<HTMLInputElement>

  const handleSwitchButtonKeyPress = (
    event: React.KeyboardEvent<HTMLButtonElement>
  ) =>
    event.key === 'Enter' && !isLoginMode
      ? emailInputRef.current?.focus()
      : event.key === 'Enter' && isLoginMode
      ? setTimeout(() => {
          nameInputRef.current?.focus()
        }, 10)
      : null

  const handleSubmit = (event: React.SyntheticEvent<UserFormElement>) => {
    event.preventDefault()

    const { name, password } = event.currentTarget.elements

    const handleFormValidation = () => {
      const isNameInvalid = !name.value || (name.value && name.value.length < 2)
      if (isNameInvalid) {
        setIsNameError(true)
        return setTimeout(() => {
          setIsNameError(false)
        }, 2500)
      }

      if (isEmailInvalid) {
        setIsEmailError(true)
        return setTimeout(() => {
          setIsEmailError(false)
        }, 2500)
      }

      const isPasswordInvalid =
        !password.value || (password.value && password.value.length < 6)
      if (isPasswordInvalid) {
        setIsPasswordError(true)
        return setTimeout(() => {
          setIsPasswordError(false)
        }, 2500)
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
      <Form
        onSubmit={handleSubmit}
        autoComplete="off"
        isLoginMode={isLoginMode}
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
              aria-describedby={isNameError ? 'nameInputError' : undefined}
              ref={nameInputRef}
            />
            {isNameError && (
              <ErrorMessage
                role="alert"
                id="nameInputError"
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
            required
            placeholder="NarutoUzumaki@gmail.com"
            aria-describedby={isEmailError ? 'emailInputError' : undefined}
            onChange={(event) => {
              setIsEmailInvalid(!event.target.validity.valid)
            }}
            ref={emailInputRef}
          />
          {isEmailError && (
            <ErrorMessage
              role="alert"
              aria-label="Email is not valid."
              id="emailInputError"
            >
              Email is not valid.
            </ErrorMessage>
          )}
          {isEmailTaken && (
            <ErrorMessage
              role="alert"
              aria-label="Email is taken."
              id="emailInputError"
            >
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
            aria-describedby={
              isPasswordError ? 'passwordInputError' : undefined
            }
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

        <SwitchButton
          type="button"
          onClick={() => setIsLoginMode(!isLoginMode)}
          onKeyPress={handleSwitchButtonKeyPress}
        >
          {isLoginMode
            ? 'Do not have an account yet?'
            : 'Already have an account?'}{' '}
          <SwitchButtonHighlight>
            {isLoginMode ? 'Sign Up!' : 'Sign In!'}
          </SwitchButtonHighlight>
        </SwitchButton>
      </Form>
    </HomeMain>
  )
}
