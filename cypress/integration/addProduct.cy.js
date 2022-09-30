/// <reference types="cypress" />

describe('Products scenarios', function () {
    beforeEach(function () {
        cy.login('email', 'password');
    });

    it('adding product to cart', function () {
        cy.intercept('**/plugins/customer_chat/SDK/**').as('customerChat');
        cy.wait('@customerChat');

        cy.get('[class="el-search-autocomplete__wrapper"]').click();
        cy.fixture('itens').then(function (iten) {

            let pants = iten.product.toLowerCase();
            cy.get('.bf-search__field').type(pants).type('{enter}');

            cy.get('[class="bf-shelf-item__container"]').first().then(container => {
                cy.wrap(container).should('contain', pants);
                cy.wrap(container).contains('Comprar').click();
            });

            cy.get('.bf-buy__button').click();
            cy.get('.swal2-confirm').click();
            cy.get('#cart-title').should('have.text', 'Meu Carrinho');

            cy.get('table[class="table cart-items"]')
                .should('be.visible')
                .and('contain', pants);
        });
    });

    it.only('remove product to cart', function () {
        cy.addToCart('calça');
        cy.get('a[title="remover"]').last().click();

        cy.get('.empty-cart-title')
            .should('be.visible')
            .and('contain', 'Seu carrinho está vazio.');
    });
});
