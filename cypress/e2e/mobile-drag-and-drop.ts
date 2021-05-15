import { buildUser, buildTask } from '../support/generate'
import { timings } from '../support/animations'
import * as keyCodes from '../support/key-codes'

context('Mobile drag and drop', () => {
  beforeEach(() => {
    cy.viewport(375, 667)
    indexedDB.deleteDatabase('firebaseLocalStorageDb')
  })

  it('should reorder within a section', () => {
    const user = buildUser()

    const todoTask = buildTask()
    const secondTodoTask = buildTask()

    cy.visit('/')

    cy.registerUser(user)

    cy.findByRole('tabpanel', { name: 'Todo column with 0 tasks' }).within(
      () => {
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

        cy.findAllByRole('button', {
          name: 'Move current task to another column',
        }).should('not.exist')
      }
    )

    cy.findByRole('button', { name: 'Reorder tasks' }).click()

    cy.findByRole('tabpanel', {
      name: 'Todo column with 2 tasks',
    }).within(() => {
      cy.findAllByRole('article', { name: 'Task in Todo column' })
        .first()
        .within(() => {
          cy.findByRole('button', { name: 'Reorder current task' })

            .focus()
            .trigger('keydown', { keyCode: keyCodes.space })
            .trigger('keydown', { keyCode: keyCodes.arrowDown, force: true })
            .wait(timings.outOfTheWay * 1000)
            .trigger('keydown', { keyCode: keyCodes.space, force: true })
        })
    })

    cy.findByRole('button', { name: 'Reorder tasks' }).click()

    cy.findByRole('tabpanel', {
      name: 'Todo column with 2 tasks',
    }).within(() => {
      cy.findAllByRole('article', { name: 'Task in Todo column' })
        .first()
        .within(() => {
          cy.findByRole('button', { name: 'Reorder current task' }).should(
            'not.exist'
          )
        })
    })
  })

  it('it should move to another column', () => {
    const user = buildUser()

    const todoTask = buildTask()
    const secondTodoTask = buildTask()

    cy.visit('/')

    cy.registerUser(user)

    cy.findByRole('tabpanel', { name: 'Todo column with 0 tasks' }).within(
      () => {
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

        cy.findAllByRole('button', {
          name: 'Move current task to another column',
        }).should('not.exist')
      }
    )

    cy.findByRole('button', { name: 'Reorder tasks' }).click()

    cy.findByRole('tabpanel', {
      name: 'Todo column with 2 tasks',
    }).within(() => {
      cy.findAllByRole('article', { name: 'Task in Todo column' })
        .first()
        .within(() => {
          cy.findByRole('button', {
            name: 'Move current task to another column',
          }).click()
        })
    })

    cy.findByRole('dialog', {
      name: 'Move task in Todo column to another column',
    }).within(() => {
      cy.findByRole('button', { name: 'To do' }).should('be.disabled')

      cy.findByRole('button', { name: 'In progress' }).click()
    })

    cy.findByRole('dialog', {
      name: 'Move task in Todo column to another column',
    }).should('not.exist')

    cy.findByRole('alert').within(() => {
      cy.findByRole('heading', { name: 'Success!' }).should('exist')
      cy.findByText(
        'Successfully moved task from todo column to in progress column.'
      ).should('exist')
      cy.findByRole('button', { name: 'Close alert' }).click()
    })

    cy.findByRole('tabpanel', {
      name: 'In progress column with 1 tasks',
    }).within(() => {
      cy.findByRole('article', { name: 'Task in In progress column' }).within(
        () => {
          cy.findByText(secondTodoTask.text)
        }
      )
    })
  })
})
