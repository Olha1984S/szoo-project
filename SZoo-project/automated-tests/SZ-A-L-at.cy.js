/// <reference types="cypress" />

describe('decathlon.cz.cz', () => {
  beforeEach(() => {
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
    cy.visit('https://www.superzoo.cz/')
    cy.wait(2000);
    cy.contains('button', 'Odmítnout').click();

  })
  it('Authorization on the site https://www.superzoo.cz/ and logout', () => {
    cy.wait(1000);                                                                     
    cy.contains('a', 'účet').click();
    cy.get('#snippet--pdModalTitle').should('be.visible');
    cy.get('#frm-loginForm-login').type('45pleasant@punkproof.com');
    cy.get('#frm-loginForm-password').type('1Pena583!');
    cy.get(':nth-child(7) > .btn').click();
    cy.contains('span', 'Přihlášení bylo úspěšné').should('be.visible');
    cy.wait(2000); 
    cy.get('#ca-uid-15 > .header-box__control').click();
    cy.get('[href="/oauth/log-out?returnUrl=https%3A%2F%2Fwww.superzoo.cz%2F"]').click();
    cy.contains('h2', 'Super zoo').should('be.visible');
  })                                                                        
})



