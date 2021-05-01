import { buildUser, buildTask } from '../support/generate'

context('Mobile resolution user flow iteration 2, delete all tasks', () => {
  beforeEach(() => {
    cy.viewport(375, 667)
    indexedDB.deleteDatabase('firebaseLocalStorageDb')
  })

  it('mobile delete all tasks', () => {
    const user = buildUser()

    const todoTask = buildTask()
    const secondTodoTask = buildTask()

    const inProgressTask = buildTask()
    const secondInProgressTask = buildTask()

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

    /* Todo */
    cy.findByRole('tabpanel', { name: 'Todo column with 0 tasks' }).within(
      () => {
        cy.findByText('Todo').should('exist')
        cy.findByRole('button', { name: 'Add a task to this column.' }).click()
        cy.findByRole('textbox', { name: 'Enter a task' }).type(todoTask.text, {
          force: true,
        })

        cy.findByRole('button', { name: 'Add' }).click()
        cy.findByRole('button', { name: 'Task in Todo column' }).within(() => {
          cy.findByText(todoTask.text).should('exist')
        })
      }
    )

    cy.findByRole('tabpanel', { name: 'Todo column with 1 tasks' }).within(
      () => {
        cy.findByText('Todo').should('exist')
        cy.findByRole('button', { name: 'Add a task to this column.' }).click()
        cy.findByRole('textbox', { name: 'Enter a task' }).type(
          secondTodoTask.text,
          {
            force: true,
          }
        )

        cy.findByRole('button', { name: 'Add' }).click()
        cy.findByText(secondTodoTask.text).should('exist')

        cy.findByRole('button', {
          name: 'Delete all tasks in Todo column.',
        }).click()
      }
    )

    cy.findByRole('alertdialog', { name: 'Are you sure?' }).within(() => {
      cy.findByRole('heading', { name: 'Are you sure?' }).should('exist')
      cy.findByText(
        'Do you really want to delete all tasks in Todo column?'
      ).should('exist')
      cy.findByRole('button', { name: 'Yes' }).click({ force: true })
    })

    cy.findByRole('alert').within(() => {
      cy.findByRole('heading', { name: 'Success!' }).should('exist')
      cy.findByText(
        'You successfully deleted all tasks in Todo column.'
      ).should('exist')
      cy.findByRole('button', { name: 'Close alert' }).click()
    })

    cy.findByRole('tabpanel', { name: 'Todo column with 0 tasks' }).within(
      () => {
        cy.findByRole('button').should('not.exist')
      }
    )

    /* In progress */
    cy.findByRole('tab', { name: 'In progress' }).click()

    cy.findByRole('tabpanel', {
      name: 'In progress column with 0 tasks',
    }).within(() => {
      cy.findByText('In progress').should('exist')
      cy.findByRole('button', { name: 'Add a task to this column.' }).click()
      cy.findByRole('textbox', { name: 'Enter a task' }).type(
        inProgressTask.text,
        {
          force: true,
        }
      )

      cy.findByRole('button', { name: 'Add' }).click()
      cy.findByRole('button', { name: 'Task in In progress column' }).within(
        () => {
          cy.findByText(inProgressTask.text).should('exist')
        }
      )
    })

    cy.findByRole('tabpanel', {
      name: 'In progress column with 1 tasks',
    }).within(() => {
      cy.findByText('In progress').should('exist')
      cy.findByRole('button', { name: 'Add a task to this column.' }).click()
      cy.findByRole('textbox', { name: 'Enter a task' }).type(
        secondInProgressTask.text,
        {
          force: true,
        }
      )

      cy.findByRole('button', { name: 'Add' }).click()
      cy.findByText(secondInProgressTask.text).should('exist')

      cy.findByRole('button', {
        name: 'Delete all tasks in In progress column.',
      }).click()
    })

    cy.findByRole('alertdialog', { name: 'Are you sure?' }).within(() => {
      cy.findByRole('heading', { name: 'Are you sure?' }).should('exist')
      cy.findByText(
        'Do you really want to delete all tasks in In progress column?'
      ).should('exist')
      cy.findByRole('button', { name: 'Yes' }).click({ force: true })
    })

    cy.findByRole('alert').within(() => {
      cy.findByRole('heading', { name: 'Success!' }).should('exist')
      cy.findByText(
        'You successfully deleted all tasks in In progress column.'
      ).should('exist')
      cy.findByRole('button', { name: 'Close alert' }).click()
    })

    cy.findByRole('tabpanel', {
      name: 'In progress column with 0 tasks',
    }).within(() => {
      cy.findByRole('button').should('not.exist')
    })
  })
})
