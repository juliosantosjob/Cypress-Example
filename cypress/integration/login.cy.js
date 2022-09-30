/// <reference types="cypress" />

describe('Validate scenarios login', function () {
    it('login success', function () {
        cy.get('#bf-js-login').click();
        cy.intercept('**/recaptcha/api2/**').as('recaptcha');

        cy.wait('@recaptcha');
        cy.get('[id*="loginWithU"]').click();

        cy.get('#inputEmail').type(`${Cypress.env('email')}`);
        cy.get('#inputPassword').type(`${Cypress.env('password')}`);
        cy.get('[type=submit]').first().click();

        cy.visit('/_secure/account/#/profile');

        cy.get('.bf-account__title')
            .should('be.visible')
            .and('have.text', 'Minha Conta');
    });

    it('login email error', function () {
        cy.get('#bf-js-login').click();
        cy.intercept('**/recaptcha/api2/**').as('recaptcha');

        cy.wait('@recaptcha');
        cy.get('[id*="loginWithU"]').click();

        cy.get('#inputEmail').type(`${Cypress.env('emailError')}`);
        cy.get('#inputPassword').type(`${Cypress.env('password')}`);
        cy.get('[type=submit]').first().click();

        cy.get('[class="alert alert-warning alert-wrong-pswd"]')
            .should('be.visible')
            .and('have.contain', 'Usuário e/ou senha errada');
    });

    it('login password error', function () {
        cy.get('#bf-js-login').click();
        cy.intercept('**/recaptcha/api2/**').as('recaptcha');

        cy.wait('@recaptcha');
        cy.get('[id*="loginWithU"]').click();

        cy.get('#inputEmail').type(`${Cypress.env('email')}`);
        cy.get('#inputPassword').type(`${Cypress.env('passwordError')}`);
        cy.get('[type=submit]').first().click();

        cy.get('[class="alert alert-warning alert-wrong-pswd"]')
            .should('be.visible')
            .and('have.contain', 'Usuário e/ou senha errada');
    });
});