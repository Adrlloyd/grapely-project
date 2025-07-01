describe('testing user flow pathways', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('http://localhost:5173');
  })

  it('lets you select a wine', () => {
    cy.get('h1').should('contain', '');

    cy.contains('Sign In').click()

    cy.url().should('contain', '/login');

    cy.get('button[type="submit"]').click()

    cy.url().should('contain', '/home');
  })
})
