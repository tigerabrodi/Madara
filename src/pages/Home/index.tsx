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

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
  }

  return (
    <HomeMain>
      <Title>Madara</Title>
      <Subtitle>Manage Your Daily Tasks</Subtitle>
      <Form onSubmit={(event) => onSubmit(event)} autoComplete="off">
        <FormTitle> {isLoginMode ? 'Sign In' : 'Sign Up'} </FormTitle>

        {!isLoginMode && (
          <FormGroup role="group" aria-labelledby="name">
            <Label htmlFor="name" id="name">
              Name
            </Label>
            <Input type="text" id="name" />
            <ErrorMessage
              role="alert"
              aria-label="Name must be at least two characters long."
            >
              Name must be at least two characters long.
            </ErrorMessage>
          </FormGroup>
        )}

        <FormGroup role="group" aria-labelledby="email">
          <Label htmlFor="email" id="email">
            Email
          </Label>
          <Input type="email" id="email" />
          <ErrorMessage role="alert" aria-label="Email is not valid.">
            Email is not valid.
          </ErrorMessage>
        </FormGroup>

        <FormGroup role="group" aria-labelledby="password">
          <Label htmlFor="password" id="password">
            Password
          </Label>
          <Input type="password" id="password" />
          <ErrorMessage
            role="alert"
            aria-label="Password must be at least 6 characters long."
          >
            Password must be at least 6 characters long.
          </ErrorMessage>
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
