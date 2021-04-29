import { timings } from '../support/animations'
import { buildUser, buildTask } from '../support/generate'
import * as keyCodes from '../support/key-codes'

context('Desktop drag and drop functionality', () => {
  beforeEach(() => {
    cy.viewport(1280, 900)
    indexedDB.deleteDatabase('firebaseLocalStorageDb')
  })

  const todoTask = buildTask()
  const secondTodoTask = buildTask()

  it('Should reorder tasks within a section', () => {
    const user = buildUser()

    cy.visit('/')

    cy.findByLabelText('Enter Your Name').type(user.name, { force: true })
    cy.findByLabelText('Enter Your Email').type(user.email, { force: true })
    cy.findByLabelText('Enter Your Password').type(user.password, {
      force: true,
    })
    cy.findByLabelText('Confirm Your Password').type(user.password, {
      force: true,
    })
    cy.findByRole('button', { name: 'Sign Up' }).click()

    cy.findByRole('alert').within(() => {
      cy.findByRole('heading', { name: 'Success!' }).should('exist')
      cy.findByText('You have successfully signed up.').should('exist')
      cy.findByRole('button', { name: 'Close alert' }).click()
    })

    cy.findByRole('heading', {
      name: `Welcome ${user.name}!`,
      level: 1,
    }).should('exist')

    cy.findByRole('region', { name: 'Todo column with 0 tasks' }).within(() => {
      cy.findByText('Todo').should('exist')
      cy.findByRole('button', { name: 'Add a task to this column.' }).click()
      cy.findByRole('textbox', { name: 'Enter a task' }).type(todoTask.text, {
        force: true,
      })
      cy.findByRole('button', { name: 'Add' }).click()

      cy.findByRole('button', { name: 'Add a task to this column.' }).click()
      cy.findByRole('textbox', { name: 'Enter a task' }).type(
        secondTodoTask.text,
        {
          force: true,
        }
      )
      cy.findByRole('button', { name: 'Add' }).click()
    })

    cy.findByRole('region', {
      name: 'Todo column with 2 tasks',
    }).within(() => {
      cy.findAllByRole('button', { name: 'Task in Todo column' })
        .first()
        .within(() => {
          cy.findByText(secondTodoTask.text).should('exist')
        })
      cy.findAllByRole('button', { name: 'Task in Todo column' })
        .first()
        .focus()
        .trigger('keydown', { keyCode: keyCodes.space })
        .trigger('keydown', { keyCode: keyCodes.arrowDown, force: true })
        .wait(timings.outOfTheWay * 1000)
        .trigger('keydown', { keyCode: keyCodes.space, force: true })
    })
  })
})
