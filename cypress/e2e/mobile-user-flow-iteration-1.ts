import { buildUser, buildTask } from '../support/generate'

context('Desktop resolution', () => {
  beforeEach(() => {
    cy.viewport(375, 667)
    indexedDB.deleteDatabase('firebaseLocalStorageDb')
  })

  it('desktop complete user flow', () => {
    const user = buildUser()

    const todoTask = buildTask()
    const editedTodoTask = buildTask()

    const inProgressTask = buildTask()
    const editedInProgressTask = buildTask()

    const doneTask = buildTask()
    const editedDoneTask = buildTask()

    cy.visit('/')
    cy.findByRole('heading', { name: 'Madara', level: 1 }).should('exist')

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
        cy.findByRole('article', { name: 'Task in Todo column' }).within(() => {
          cy.findByText(todoTask.text).should('exist')
          cy.findByRole('button', { name: 'Card menu' }).click()
          cy.findByRole('menu').within(() => {
            cy.findByRole('menuitem', { name: 'Edit Task' }).click()
          })
        })
      }
    )

    cy.findByRole('dialog', { name: 'Edit task' }).within(() => {
      cy.findByRole('textbox', {
        name: 'Edit your task',
      })
        .clear({ force: true })
        .type(editedTodoTask.text, { force: true })
      cy.findByRole('button', { name: 'Edit' }).click({ force: true })
    })
    cy.findByRole('tabpanel', { name: 'Todo column with 1 tasks' }).within(
      () => {
        cy.findByRole('article', { name: 'Task in Todo column' }).within(() => {
          cy.findByText(editedTodoTask.text).should('exist')
        })
      }
    )
    cy.findByRole('alert').within(() => {
      cy.findByRole('heading', { name: 'Success!' }).should('exist')
      cy.findByText('You successfully edited a task in Todo column.').should(
        'exist'
      )
      cy.findByRole('button', { name: 'Close alert' }).click()
    })

    cy.findByRole('tabpanel', { name: 'Todo column with 1 tasks' }).within(
      () => {
        cy.findByRole('article', { name: 'Task in Todo column' }).within(() => {
          cy.findByRole('button', { name: 'Card menu' }).click()
          cy.findByRole('menu').within(() => {
            cy.findByRole('menuitem', { name: 'Delete Task' }).click()
          })
        })
      }
    )

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
      cy.findByRole('button', { name: 'Close alert' }).click()
    })

    cy.findByRole('tabpanel', { name: 'Todo column with 0 tasks' }).within(
      () => {
        cy.findByRole('article').should('not.exist')
      }
    )

    /* In Progress */
    cy.findByRole('tab', { name: 'In progress' }).click()

    cy.findByRole('tabpanel', {
      name: 'In progress column with 0 tasks',
    }).within(() => {
      cy.findByText('In progress').should('exist')
      cy.findByRole('button', { name: 'Add a task to this column.' }).click()
      cy.findByRole('textbox', {
        name: 'Enter a task',
      }).type(inProgressTask.text, { force: true })

      cy.findByRole('button', { name: 'Add' }).click()
      cy.findByRole('article', { name: 'Task in In progress column' }).within(
        () => {
          cy.findByText(inProgressTask.text).should('exist')
          cy.findByRole('button', { name: 'Card menu' }).click()
          cy.findByRole('menu').within(() => {
            cy.findByRole('menuitem', { name: 'Edit Task' }).click()
          })
        }
      )
    })

    cy.findByRole('dialog', { name: 'Edit task' }).within(() => {
      cy.findByRole('textbox', {
        name: 'Edit your task',
      })
        .clear({ force: true })
        .type(editedInProgressTask.text, { force: true })
      cy.findByRole('button', { name: 'Edit' }).click({ force: true })
    })
    cy.findByRole('tabpanel', {
      name: 'In progress column with 1 tasks',
    }).within(() => {
      cy.findByRole('article', { name: 'Task in In progress column' }).within(
        () => {
          cy.findByText(editedInProgressTask.text).should('exist')
        }
      )
    })
    cy.findByRole('alert').within(() => {
      cy.findByRole('heading', { name: 'Success!' }).should('exist')
      cy.findByText(
        'You successfully edited a task in In progress column.'
      ).should('exist')
      cy.findByRole('button', { name: 'Close alert' }).click()
    })

    cy.findByRole('tabpanel', {
      name: 'In progress column with 1 tasks',
    }).within(() => {
      cy.findByRole('article', { name: 'Task in In progress column' }).within(
        () => {
          cy.findByRole('button', { name: 'Card menu' }).click()
          cy.findByRole('menu').within(() => {
            cy.findByRole('menuitem', { name: 'Delete Task' }).click()
          })
        }
      )
    })

    cy.findByRole('alertdialog').within(() => {
      cy.findByRole('heading', { name: 'Are you sure?' }).should('exist')
      cy.findByText(
        'Do you really want to delete this task in In progress column?'
      ).should('exist')
      cy.findByRole('button', { name: 'Yes' }).click({ force: true })
    })
    cy.findByRole('alert').within(() => {
      cy.findByRole('heading', { name: 'Success!' }).should('exist')
      cy.findByText(
        'You successfully deleted a task in In progress column.'
      ).should('exist')
      cy.findByRole('button', { name: 'Close alert' }).click()
    })

    cy.findByRole('tabpanel', {
      name: 'In progress column with 0 tasks',
    }).within(() => {
      cy.findByRole('article').should('not.exist')
    })

    /* Done */
    cy.findByRole('tab', { name: 'Done' }).click()

    cy.findByRole('tabpanel', { name: 'Done column with 0 tasks' }).within(
      () => {
        cy.findByText('Done').should('exist')
        cy.findByRole('button', { name: 'Add a task to this column.' }).click()
        cy.findByRole('textbox', { name: 'Enter a task' }).type(doneTask.text, {
          force: true,
        })

        cy.findByRole('button', { name: 'Add' }).click()
        cy.findByRole('article', { name: 'Task in Done column' }).within(() => {
          cy.findByText(doneTask.text).should('exist')
          cy.findByRole('button', { name: 'Card menu' }).click()
          cy.findByRole('menu').within(() => {
            cy.findByRole('menuitem', { name: 'Edit Task' }).click()
          })
        })
      }
    )

    cy.findByRole('dialog', { name: 'Edit task' }).within(() => {
      cy.findByRole('textbox', {
        name: 'Edit your task',
      })
        .clear({ force: true })
        .type(editedDoneTask.text, { force: true })
      cy.findByRole('button', { name: 'Edit' }).click({ force: true })
    })
    cy.findByRole('tabpanel', { name: 'Done column with 1 tasks' }).within(
      () => {
        cy.findByRole('article', { name: 'Task in Done column' }).within(() => {
          cy.findByText(editedDoneTask.text).should('exist')
        })
      }
    )
    cy.findByRole('alert').within(() => {
      cy.findByRole('heading', { name: 'Success!' }).should('exist')
      cy.findByText('You successfully edited a task in Done column.').should(
        'exist'
      )
      cy.findByRole('button', { name: 'Close alert' }).click()
    })

    cy.findByRole('tabpanel', { name: 'Done column with 1 tasks' }).within(
      () => {
        cy.findByRole('article', { name: 'Task in Done column' }).within(() => {
          cy.findByRole('button', { name: 'Card menu' }).click()
          cy.findByRole('menu').within(() => {
            cy.findByRole('menuitem', { name: 'Delete Task' }).click()
          })
        })
      }
    )

    cy.findByRole('alertdialog').within(() => {
      cy.findByRole('heading', { name: 'Are you sure?' }).should('exist')
      cy.findByText(
        'Do you really want to delete this task in Done column?'
      ).should('exist')
      cy.findByRole('button', { name: 'Yes' }).click({ force: true })
    })

    cy.findByRole('alert').within(() => {
      cy.findByRole('heading', { name: 'Success!' }).should('exist')
      cy.findByText('You successfully deleted a task in Done column.').should(
        'exist'
      )
      cy.findByRole('button', { name: 'Close alert' }).click()
    })

    cy.findByRole('tabpanel', { name: 'Done column with 0 tasks' }).within(
      () => {
        cy.findByRole('article').should('not.exist')
      }
    )

    cy.findByRole('button', { name: 'Logout' }).click()
    cy.findByRole('alert').within(() => {
      cy.findByRole('heading', { name: 'Success!' }).should('exist')
      cy.findByText('You have successfully signed out.').should('exist')
      cy.findByRole('button', { name: 'Close alert' }).click()
    })

    cy.findByRole('button', { name: 'Login' }).click()
    cy.findByLabelText('Enter Your Email')
      .clear()
      .type(user.email, { force: true })
    cy.findByLabelText('Enter Your Password')
      .clear()
      .type(user.password, { force: true })
    cy.findByRole('button', { name: 'Sign In' }).click()

    cy.findByRole('alert').within(() => {
      cy.findByRole('heading', { name: 'Success!' }).should('exist')
      cy.findByText('You have successfully signed in.').should('exist')
      cy.findByRole('button', { name: 'Close alert' }).click()
    })

    cy.findByRole('heading', {
      name: `Welcome ${user.name}!`,
      level: 1,
    }).should('exist')
  })
})
