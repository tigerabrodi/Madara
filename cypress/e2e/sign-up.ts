import { buildUser } from '../support/generate'

beforeEach(() => {
  cy.viewport(1280, 900)
  cy.visit('/')
})

it('should not allow name to be shorter than 2 characters', () => {
  const newUser = buildUser()

  cy.findByRole('alert', {
    name: /Name must be at least two characters long./i,
  }).should('not.exist')

  cy.findByLabelText(/enter your name/i).type('1', { force: true })

  cy.findByLabelText(/enter your email/i).type(newUser.email, { force: true })

  cy.findByLabelText(/Enter Your Password/i).type(newUser.password, {
    force: true,
  })

  cy.findByRole('button', { name: /sign up/i }).click()

  cy.findByRole('alert', {
    name: /Name must be at least two characters long./i,
  }).should('exist')
})

it('should not allow invalid emails', () => {
  const newUser = buildUser()

  cy.findByRole('alert', { name: /Email is not valid./i }).should('not.exist')

  cy.findByLabelText(/enter your name/i).type(newUser.name, { force: true })

  cy.findByLabelText(/enter your email/i).type('blah', { force: true })

  cy.findByLabelText(/enter your password/i).type(newUser.password, {
    force: true,
  })

  cy.findByRole('button', { name: /sign up/i }).click()

  cy.findByRole('alert', { name: /Email is not valid./i }).should('exist')
})

it('should not allow empty emails', () => {
  const newUser = buildUser()

  cy.findByRole('alert', { name: /Email is not valid./i }).should('not.exist')

  cy.findByLabelText(/enter your name/i).type(newUser.name, { force: true })

  cy.findByRole('button', { name: /sign up/i }).click()

  cy.findByRole('alert', { name: /Email is not valid./i }).should('exist')
})

it('should not allow passwords shorter than 6 characters', () => {
  const newUser = buildUser()

  cy.findByRole('alert', {
    name: /Password must be at least 6 characters long./i,
  }).should('not.exist')

  cy.findByLabelText(/enter your name/i).type(newUser.name, { force: true })

  cy.findByLabelText(/enter your email/i).type(newUser.email, { force: true })

  cy.findByLabelText(/enter your password/i).type('blah', { force: true })

  cy.findByRole('button', { name: /sign up/i }).click()

  cy.findByRole('alert', {
    name: /Password must be at least 6 characters long./i,
  }).should('exist')
})

it('should not allow passwords mismatch', () => {
  const newUser = buildUser()

  cy.findByRole('alert', {
    name: /Passwords do not match./i,
  }).should('not.exist')

  cy.findByLabelText(/enter your name/i).type(newUser.name, { force: true })

  cy.findByLabelText(/enter your email/i).type(newUser.email, { force: true })

  cy.findByLabelText(/enter your password/i).type(newUser.password, {
    force: true,
  })

  cy.findByLabelText(/Confirm Your Password/i).type('blah', { force: true })

  cy.findByRole('button', { name: /sign up/i }).click()

  cy.findByRole('alert', {
    name: /Passwords do not match./i,
  }).should('exist')
})

it('should show password as plain text if show password button has been clicked', () => {
  cy.findByLabelText(/enter your password/i).should(
    'have.attr',
    'type',
    'password'
  )

  cy.findByRole('button', {
    name: /Show password as plain text. Note: this will visually expose your password on the screen./i,
  }).click()

  cy.findByLabelText(/enter your password/i).should('have.attr', 'type', 'text')
})
