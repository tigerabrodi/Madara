// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
/// <reference types="cypress" />

import { User } from './generate'

declare global {
  namespace Cypress {
    interface Chainable {
      registerUser: typeof registerUser
    }
  }
}

const registerUser = (user: User) => {
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
}

// Cypress.Commands.add('login', (email, password) => { ... })
Cypress.Commands.add('registerUser', registerUser)
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
