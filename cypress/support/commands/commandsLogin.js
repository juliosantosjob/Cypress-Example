/// <reference types="cypress" />

Cypress.Commands.add('login', (email, password) => { 
    cy.get('#bf-js-login').click();
    cy.intercept('**/recaptcha/api2/**').as('recaptcha');

    cy.wait('@recaptcha');
    cy.get('[id*="loginWithU"]').click();

    cy.get('#inputEmail').type(`${Cypress.env(email)}`);
    cy.get('#inputPassword').type(`${Cypress.env(password)}`, { log:false });
    cy.get('[type=submit]').first().click();
});