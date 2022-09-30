beforeEach(() => {
    cy.visit(`${Cypress.env('baseUrl')}`);
    cy.intercept('**/api/events').as('user');

    cy.wait('@user');
    cy.url().should('be.equal', `${Cypress.env('baseUrl')}`);
    cy.get('#bf-js-login').should('have.text', 'Entre'); 
});