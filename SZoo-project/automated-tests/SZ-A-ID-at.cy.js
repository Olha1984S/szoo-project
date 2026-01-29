/// <reference types="cypress" />

describe('decathlon.cz.cz', () => {
  beforeEach(() => {
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
    cy.visit('https://www.superzoo.cz/')
    cy.wait(2000);
    cy.contains('button', 'Odmítnout').click();
  })

  it('Authorization on the site https://www.superzoo.cz/ with incorrect e-mail', () => {
    cy.wait(1000);                                                                     
    cy.contains('a', 'účet').click();
    cy.get('#snippet--pdModalTitle').should('be.visible');
    cy.get('#frm-loginForm-login').type('45pleasantpunkproof.com');
    cy.get('#frm-loginForm-password').type('1Pena583!');
    cy.get('.inp-error').should('contain', 'Zadejte prosím platnou e-mailovou adresu');
  })

  it('Authorization on the site https://www.superzoo.cz/ with incorrect possword', () => {
    cy.wait(1000);                                                                     
    cy.contains('a', 'účet').click();
    cy.get('#snippet--pdModalTitle').should('be.visible');
    cy.get('#frm-loginForm-login').type('45pleasant@punkproof.com');
    cy.get('#frm-loginForm-password').type('2Pena583!');
    cy.get(':nth-child(7) > .btn').click();
    cy.get('#snippet--flashes > .relative > span').should('contain', 'Chybné přihlašovací údaje');
  })                                                                        
})



