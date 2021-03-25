import { buildUser } from '../support/generate'

context('Desktop resolution', () => {
  beforeEach(() => {
    cy.viewport(1280, 900)
  })

  it('desktop complete user flow', () => {
    const user = buildUser()

    cy.visit('/')
    cy.findByRole('heading', { name: 'Madara', level: 1 }).should('exist')

    cy.findByText('Manage Your Tasks').should('exist')
    cy.findByRole('button', { name: 'Logout' }).should('not.exist')

    cy.findByLabelText('Enter Your Name').type(user.name)
    cy.findByLabelText('Enter Your Email').type(user.email)
    cy.findByLabelText('Enter Your Password').type(user.password)

    cy.findByRole('button', { name: 'Sign Up' }).click()

    cy.findByText('Signing Up').click()

    cy.findByRole('heading', {
      name: `Welcome ${user.name}!`,
      level: 1,
    }).should('exist')
  })
})
