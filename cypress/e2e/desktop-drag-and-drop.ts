import { timings } from '../support/animations'
import { buildUser, buildTask } from '../support/generate'
import * as keyCodes from '../support/key-codes'

context('Desktop drag and drop functionality', () => {
  beforeEach(() => {
    cy.viewport(1280, 900)
    indexedDB.deleteDatabase('firebaseLocalStorageDb')
  })

  it('Should reorder tasks within a section', () => {
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
          cy.findByText(secondTodoTask.text).should('exist')
        })
      cy.findAllByRole('article', { name: 'Task in Todo column' })
        .first()
        .focus()
        .trigger('keydown', { keyCode: keyCodes.space })
        .trigger('keydown', { keyCode: keyCodes.arrowDown, force: true })
        .wait(timings.outOfTheWay * 1000)
        .trigger('keydown', { keyCode: keyCodes.space, force: true })
    })
  })

  it('should reorder tasks between sections', () => {
    const user = buildUser()

    const firstTask = buildTask()
    const secondTask = buildTask()

    cy.visit('/')

    cy.registerUser(user)

    cy.findByRole('region', { name: 'Todo column with 0 tasks' }).within(() => {
      cy.findByText('Todo').should('exist')
      cy.findByRole('button', { name: 'Add a task to this column.' }).click()
      cy.findByRole('textbox', { name: 'Enter a task' }).type(firstTask.text, {
        force: true,
      })
      cy.findByRole('button', { name: 'Add' }).click()

      cy.findByRole('button', { name: 'Add a task to this column.' }).click()
      cy.findByRole('textbox', { name: 'Enter a task' }).type(secondTask.text, {
        force: true,
      })
      cy.findByRole('button', { name: 'Add' }).click()
    })

    cy.findByRole('region', {
      name: 'Todo column with 2 tasks',
    }).within(() => {
      cy.findAllByRole('article', { name: 'Task in Todo column' })
        .first()
        .focus()
        .trigger('keydown', { keyCode: keyCodes.space })
        .trigger('keydown', { keyCode: keyCodes.arrowRight, force: true })
        .wait(timings.outOfTheWay * 1000)
        .trigger('keydown', { keyCode: keyCodes.space, force: true })
    })

    cy.findByRole('region', {
      name: 'In progress column with 1 tasks',
    }).within(() => {
      cy.findByText(secondTask.text).should('exist')
      cy.findByRole('article', { name: 'Task in In progress column' })
        .focus()
        .trigger('keydown', { keyCode: keyCodes.space })
        .trigger('keydown', { keyCode: keyCodes.arrowRight, force: true })
        .wait(timings.outOfTheWay * 1000)
        .trigger('keydown', { keyCode: keyCodes.space, force: true })
    })

    cy.findByRole('region', {
      name: 'Done column with 1 tasks',
    }).within(() => {
      cy.findByText(secondTask.text).should('exist')
      cy.findByRole('article', { name: 'Task in Done column' })
        .focus()
        .trigger('keydown', { keyCode: keyCodes.space })
        .trigger('keydown', { keyCode: keyCodes.arrowLeft, force: true })
        .wait(timings.outOfTheWay * 1000)
        .trigger('keydown', { keyCode: keyCodes.space, force: true })
    })

    cy.findByRole('region', {
      name: 'In progress column with 1 tasks',
    }).within(() => {
      cy.findByText(secondTask.text).should('exist')
      cy.findByRole('article', { name: 'Task in In progress column' })
        .focus()
        .trigger('keydown', { keyCode: keyCodes.space })
        .trigger('keydown', { keyCode: keyCodes.arrowLeft, force: true })
        .wait(timings.outOfTheWay * 1000)
        .trigger('keydown', { keyCode: keyCodes.space, force: true })
    })

    cy.findByRole('region', {
      name: 'Todo column with 2 tasks',
    }).within(() => {
      cy.findAllByRole('article', { name: 'Task in Todo column' }).should(
        'have.length',
        2
      )
    })
  })
})
