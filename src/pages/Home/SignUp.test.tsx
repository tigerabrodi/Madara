import {
  waitForElementToBeRemoved,
  render,
  screen,
  userEvent,
} from 'test-utils'
import { buildUser } from 'utils/generators'
import { Home } from '.'

test('should not allow name to be shorter than 2 characters', async () => {
  const newUser = buildUser()
  render(<Home />)

  expect(
    screen.queryByRole('alert', {
      name: /Name must be at least two characters long./i,
    })
  ).not.toBeInTheDocument()

  userEvent.type(screen.getByLabelText(/enter your name/i), 'l')
  userEvent.type(screen.getByLabelText(/enter your email/i), newUser.email)
  userEvent.type(
    screen.getByLabelText(/Enter Your Password/i),
    newUser.password
  )

  userEvent.click(screen.getByRole('button', { name: /sign up/i }))

  expect(
    screen.getByRole('alert', {
      name: /Name must be at least two characters long./i,
    })
  ).toBeInTheDocument()

  await waitForElementToBeRemoved(() =>
    screen.queryByRole('alert', {
      name: /Name must be at least two characters long./i,
    })
  )
})

test('should not allow invalid emails', async () => {
  const newUser = buildUser()
  render(<Home />)

  expect(
    screen.queryByRole('alert', { name: /Email is not valid./i })
  ).not.toBeInTheDocument()

  userEvent.type(screen.getByLabelText(/enter your name/i), newUser.name)
  userEvent.type(screen.getByLabelText(/enter your email/i), 'blah')
  userEvent.type(
    screen.getByLabelText(/enter your password/i),
    newUser.password
  )

  userEvent.click(screen.getByRole('button', { name: /sign up/i }))

  expect(
    screen.getByRole('alert', { name: /Email is not valid./i })
  ).toBeInTheDocument()

  await waitForElementToBeRemoved(() =>
    screen.queryByRole('alert', { name: /Email is not valid./i })
  )
})

test('should not allow empty emails', async () => {
  const newUser = buildUser()
  render(<Home />)

  expect(
    screen.queryByRole('alert', { name: /Email is not valid./i })
  ).not.toBeInTheDocument()

  userEvent.type(screen.getByLabelText(/enter your name/i), newUser.name)

  userEvent.click(screen.getByRole('button', { name: /sign up/i }))

  expect(
    screen.getByRole('alert', { name: /Email is not valid./i })
  ).toBeInTheDocument()

  await waitForElementToBeRemoved(() =>
    screen.queryByRole('alert', { name: /Email is not valid./i })
  )
})

test('should not allow passwords shorter than 6 characters', async () => {
  const newUser = buildUser()
  render(<Home />)

  expect(
    screen.queryByRole('alert', {
      name: /Password must be at least 6 characters long./i,
    })
  ).not.toBeInTheDocument()

  userEvent.type(screen.getByLabelText(/enter your name/i), newUser.name)
  userEvent.type(screen.getByLabelText(/enter your email/i), newUser.email)
  userEvent.type(screen.getByLabelText(/enter your password/i), 'blah')

  userEvent.click(screen.getByRole('button', { name: /sign up/i }))

  expect(
    screen.getByRole('alert', {
      name: /Password must be at least 6 characters long./i,
    })
  ).toBeInTheDocument()

  await waitForElementToBeRemoved(() =>
    screen.queryByRole('alert', {
      name: /Password must be at least 6 characters long./i,
    })
  )
})

test('should show password as plain text if show password button has been clicked', () => {
  render(<Home />)

  const passwordInput = screen.getByLabelText(/enter your password/i)

  expect(passwordInput).toHaveAttribute('type', 'password')

  userEvent.click(
    screen.getByRole('button', {
      name: /Show password as plain text. Note: this will visually expose your password on the screen./i,
    })
  )

  expect(passwordInput).toHaveAttribute('type', 'text')
})
