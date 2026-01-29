/// <reference types="cypress" />

describe('decathlon.cz.cz', () => {
  beforeEach(() => {
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
    cy.visit('https://www.superzoo.cz/')
    cy.wait(2000);
    cy.contains('button', 'Odmítnout').click();
  })

  it ('SZ-PS-at-3 Adding a product to the cart via the product page on the site https://www.superzoo.cz/', () => {
    cy.get('.nav-bar__link > .composite-link__underline').then(($offerNavBar) => {
      
      const randomNavBar = Math.floor(Math.random() * $offerNavBar.length);

      cy.wrap($offerNavBar).eq(randomNavBar)
      .trigger('mouseover')                                                                         
      .should('be.visible')                                                                    
      .click();
    })

    cy.wait(5000);

    cy.get('body').then(($body_3) => {
      if ($body_3.find('.js-carousel__item.tns-item.tns-slide-active').length > 0) {             
        cy.get('[id^="tns"][id*="-item"] .product-box-sm__heading').should('be.visible').then($offerBoxSM => {
    
          const randomBoxSM = Math.floor(Math.random() * $offerBoxSM.length);

          cy.wait(3000)
          cy.wrap($offerBoxSM).eq(randomBoxSM) 
          .click({force: true });
        });
      }
      else {
        cy.log('No SSubcategories found');
      }
    })

    cy.get('.grow > .btn').contains('button', 'Přidat do košíku').click();
    cy.get('#snippet--pdModal').should('be.visible');
    cy.wait(3000);
    cy.contains('button', 'Zavřít dialogové okno').click();
    cy.get('.btn__inner').contains('Do košíku').click();
    cy.wait(3000);
    cy.contains('button', 'Zavřít dialogové okno').click();

    cy.get('#snippet-basketBox-basketBox-count > .flex').should('contain', 2);
  })
})
