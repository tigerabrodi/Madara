it('', () => {
  cy.visit('/')

  cy.findByRole('heading', { name: /madara/i }).should('exist')
})
