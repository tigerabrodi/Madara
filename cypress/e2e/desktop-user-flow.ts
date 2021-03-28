import { buildUser, buildTask } from '../support/generate'

context('Desktop resolution', () => {
  beforeEach(() => {
    cy.viewport(1280, 900)
  })

  it('desktop complete user flow', () => {
    const user = buildUser()
    const todoTask = buildTask()
    const inProgressTask = buildTask()
    const doneTask = buildTask()

    cy.visit('/')
    cy.findByRole('heading', { name: 'Madara', level: 1 }).should('exist')

    cy.findByText('Manage Your Tasks').should('exist')
    cy.findByRole('button', { name: 'Logout' }).should('not.exist')

    cy.findByLabelText('Enter Your Name').type(user.name)
    cy.findByLabelText('Enter Your Email').type(user.email)
    cy.findByLabelText('Enter Your Password').type(user.password)

    cy.findByRole('button', { name: 'Sign Up' }).click()

    cy.findByText('Signing Up').should('exist')

    cy.findByRole('heading', { name: 'Success!' }).should('exist')

    cy.findByText('You have successfully signed up.').should('exist')

    cy.findByRole('button', { name: 'Logout' }).should('exist')

    cy.findByRole('heading', {
      name: `Welcome ${user.name}!`,
      level: 1,
    }).should('exist')

    cy.findByRole('region', { name: 'Todo column with 0 tasks' }).within(() => {
      cy.findByRole('button', { name: 'Add a task to this column.' }).click()

      cy.findByRole('textbox', { name: 'Enter a task' }).type(todoTask.text)

      cy.findByRole('button', { name: 'Add' }).click()

      cy.findByRole('article', { name: 'Task in Todo column' }).within(() => {
        cy.findByText(todoTask.text).should('exist')
        cy.findByRole('button', { name: 'Card menu' }).should('exist')
      })
    })
  })
})
