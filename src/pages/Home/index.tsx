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
export const Home = () => {
  const [isLoginMode, setIsLoginMode] = React.useState(false)
  const [isNameError, setIsNameError] = React.useState(false)
  const [isPasswordError, setIsPasswordError] = React.useState(false)
  const [isEmailError, setIsEmailError] = React.useState(false)

  const [isEmailInvalid, setIsEmailInvalid] = React.useState(false)

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    type EventWithElements = typeof event.target & {
      elements: {
        name: {
          value: string
        }
        email: {
          value: string
        }
        password: {
          value: string
        }
      }
    }

    const target = event.target as EventWithElements

    const { name, password } = target.elements

    const isNameInvalid = name.value.length < 2
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

    const isPasswordInvalid = password.value.length < 6
    if (isPasswordInvalid) {
      setIsPasswordError(true)
      return setTimeout(() => {
        setIsPasswordError(false)
      }, 2500)
    }
  }

  return (
    <HomeMain>
      <Title>Madara</Title>
      <Subtitle>Manage Your Daily Tasks</Subtitle>
      <Form onSubmit={(event) => onSubmit(event)} autoComplete="off" noValidate>
        <FormTitle> {isLoginMode ? 'Sign In' : 'Sign Up'} </FormTitle>

        {!isLoginMode && (
          <FormGroup role="group">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              aria-describedby={isNameError ? 'nameInputError' : undefined}
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

        <FormGroup role="group">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            aria-describedby={isEmailError ? 'emailInputError' : undefined}
            required
            onChange={(event) => {
              setIsEmailInvalid(!event.target.validity.valid)
            }}
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
        </FormGroup>

        <FormGroup role="group">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            aria-describedby={
              isPasswordError ? 'passwordInputError' : undefined
            }
          />
          {isPasswordError && (
            <ErrorMessage
              role="alert"
              aria-label="Password must be at least 6 characters long."
              id="passwordInputError"
            >
              Password must be at least 6 characters long.
            </ErrorMessage>
          )}
        </FormGroup>

        <SubmitButton type="submit">
          {isLoginMode ? 'Sign In' : 'Sign Up'}
        </SubmitButton>

        <SwitchButton
          type="button"
          onClick={() => setIsLoginMode(!isLoginMode)}
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
