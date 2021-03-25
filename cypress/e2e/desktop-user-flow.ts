import { buildUser } from '../support/generate'

context('Desktop resolution', () => {
  beforeEach(() => {
    cy.viewport(1280, 900)
  })

  it('desktop complete user flow', () => {
    const user = buildUser()

    cy.visit('/')
    cy.findByRole('heading', { name: /madara/i, level: 1 }).should('exist')
    cy.findByText('Manage Your Tasks').should('exist')
    cy.findByRole('button', { name: /logout/i }).should('not.exist')

    cy.findByLabelText(/enter your name/i).type(user.name)
    cy.findByLabelText(/enter your email/i).type(user.email)
    cy.findByLabelText(/enter your password/i).type(user.password)

    cy.findByRole('button', { name: /Sign Up/i }).click()

    cy.findByRole('heading', {
      name: `Welcome ${user.name}!`,
      level: 1,
    }).should('exist')
  })
})
