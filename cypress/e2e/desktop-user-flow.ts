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

    cy.findByRole('alert').within(() => {
      cy.findByRole('heading', { name: 'Success!' }).should('exist')
      cy.findByText('You have successfully signed up.').should('exist')
      cy.findByRole('button', { name: 'Close toast' }).click()
    })

    cy.findByRole('heading', {
      name: `Welcome ${user.name}!`,
      level: 1,
    }).should('exist')

    cy.findByRole('region', { name: 'Todo column with 0 tasks' }).within(() => {
      cy.findByText('Todo').should('exist')
      cy.findByRole('button', { name: 'Add a task to this column.' }).click()
      cy.findByRole('textbox', { name: 'Enter a task' }).type(todoTask.text)
      cy.findByRole('button', { name: 'Add' }).click()
      cy.findByRole('article', { name: 'Task in Todo column' }).within(() => {
        cy.findByText(todoTask.text).should('exist')
        cy.findByRole('button', { name: 'Card menu' }).should('exist')
      })
    })

    cy.findByRole('region', { name: 'Todo column with 1 tasks' }).within(() => {
      cy.findByRole('article', { name: 'Task in Todo column' }).within(() => {
        cy.findByRole('button', { name: 'Card menu' }).click()
        cy.findByRole('menu').within(() => {
          cy.findByRole('menuitem', { name: 'Delete Task' }).click()
        })
      })
    })

    cy.findByRole('alertdialog').within(() => {
      cy.findByRole('heading', { name: 'Are you sure?' }).should('exist')
      cy.findByText(
        'Do you really want to delete this task in Todo column?'
      ).should('exist')
      cy.findByRole('button', { name: 'Yes' }).click({ force: true })
    })

    cy.findByRole('alert').within(() => {
      cy.findByRole('heading', { name: 'Success!' }).should('exist')
      cy.findByText('You successfully deleted a task in Todo column.').should(
        'exist'
      )
    })

    cy.findByRole('region', { name: 'Todo column with 0 tasks' }).within(() => {
      cy.findByRole('article').should('not.exist')
    })

    cy.findByRole('button', { name: 'Logout' }).click()
    cy.findByLabelText('Enter Your Name').type(user.name)
    cy.findByLabelText('Enter Your Email').type(user.email)
    cy.findByLabelText('Enter Your Password').type(user.password)
    cy.findByRole('button', { name: 'Sign Up' }).click()
    cy.findByRole('alert', { name: 'Email is already taken.' }).should('exist')
  })
})
