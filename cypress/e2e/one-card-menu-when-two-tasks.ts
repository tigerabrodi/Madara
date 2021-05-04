import { buildUser, buildTask } from '../support/generate'

context('Desktop drag and drop functionality', () => {
  beforeEach(() => {
    cy.viewport(1280, 900)
    indexedDB.deleteDatabase('firebaseLocalStorageDb')
  })

  it('Only one card menu should show when open one but two tasks exist in a section', () => {
    const user = buildUser()

    const todoTask = buildTask()
    const secondTodoTask = buildTask()

    cy.visit('/')

    cy.registerUser(user)

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
      cy.findAllByRole('article', { name: 'Task in Todo column' })
        .first()
        .within(() => {
          cy.findByRole('button', { name: 'Card menu' }).click()
        })
      cy.findByRole('menu').should('exist')
    })
  })
})
