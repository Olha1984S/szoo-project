/// <reference types="cypress" />

describe('decathlon.cz.cz', () => {
  beforeEach(() => {
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
    cy.visit('https://www.superzoo.cz/')
    cy.wait(2000);
    cy.contains('button', 'Odmítnout').click();
  })

  it ('SZ-PS-at-2 Product selection journey, product discovery to cart flow on the site https://www.superzoo.cz/ ', () => {
    cy.get('.composite-link.block.leading-tight').then(($offerProduct) => {
      
      const randomOfferProd = Math.floor(Math.random() * $offerProduct.length);

      cy.wrap($offerProduct).eq(randomOfferProd)
      .trigger('mouseover')                                                                          
      .should('be.visible')                                                                    
      .click();
    })

    cy.get('.mt-1\\.5.lg\\:mt-0.lg\\:mb-3')
    .find('[id^="ca-uid-"] button.composite-link').then(($selectEn) => {
    
      const randomSelectOneEn = Math.floor(Math.random() * $selectEn.length);

      cy.wrap($selectEn).eq(randomSelectOneEn)
      .trigger('mouseover')                                                                          
      .should('be.visible')                                                                    
      .click();

      const boxId = $selectEn.eq(randomSelectOneEn).attr('aria-controls'); 
        
      cy.get(`#${boxId} > li > .composite-link`).then(($selectSubEn) => {
      
        const randomSelectOneSubEn = Math.floor(Math.random() * $selectSubEn.length);

        cy.wrap($selectSubEn).eq(randomSelectOneSubEn)
        .within(() => {                                                       // Limit the search for nested elements to only those within the selected subblock
          cy.get('span.ml-auto.text-primary-400')
          .invoke('text')                                                     // Get the text content of this <span> element
          .then(text => {
            const expectedCount = parseInt(text.trim());                      // .trim() — removes extra spaces from the beginning and end of the string.
                                                                              // parseInt(...) — converts the text to a number
            expect(expectedCount).to.be.a('number');                          // Check that expectedCount is indeed a number (validate the data type).
            
            // сохраняем значение в алиас
            cy.wrap(expectedCount).as('expectedCount');
            
            cy.wrap($selectSubEn).eq(randomSelectOneSubEn).click();

            cy.wait(5000);

          });
        });
      })
    })

    // Сравнение количества карточек с ожидаемым значением
    cy.get('@expectedCount').then(expected => {
      cy.get('section.product-box', { timeout: 10000 })
      .should('have.length', expected);
    })
  })
})
