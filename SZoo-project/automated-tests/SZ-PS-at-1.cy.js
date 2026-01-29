/// <reference types="cypress" />

describe('decathlon.cz.cz', () => {
  beforeEach(() => {
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
    cy.visit('https://www.superzoo.cz/')
    cy.wait(2000);
    cy.contains('button', 'Odmítnout').click();
  })

  it('SZ-PS-at-1 Product selection journey, product discovery to cart flow on the site https://www.superzoo.cz/ ', () => {
    cy.wait(1000);                                                                     
    
    cy.get('.composite-link__underline.my-auto').then(($selectProductCategory) => {                                 // select Product Category
                                                                                                     
      const randomselectCategory = Math.floor(Math.random() * $selectProductCategory.length);           
                                                                      
      cy.wrap($selectProductCategory).eq(randomselectCategory)                                                                                                                                     
      .wait(2000)
      .trigger('mouseover')                                                                          
      .should('be.visible')                                                                    
      .click();
    })

    cy.get('span.lg\\:composite-link__underline.grow:visible').then(($selectProductSubcategory) => {                 // select Product Subcategory

      const randomselectSubcategory = Math.floor(Math.random() * $selectProductSubcategory.length);
      
      cy.wrap($selectProductSubcategory).eq(randomselectSubcategory)                                                                                                                                     
      .wait(2000)
      .trigger('mouseover')                                                                          
      .should('be.visible')                                                                    
      .click();

    }) 
    cy.get('body').then(($body_1) => {
      if ($body_1.find('.composite-link__underline.grow').length > 0) {                                               // check for subcategory presence
        cy.get('.composite-link__underline.grow').then(($selectProductSSubcategory) => {                              // select Product Sub Subcategory

          const randomselectSSubcategory = Math.floor(Math.random() * $selectProductSSubcategory.length);
          
          cy.wrap($selectProductSSubcategory).eq(randomselectSSubcategory)                                                                                                                                     
          .wait(2000)
          .trigger('mouseover')                                                                          
          .should('be.visible')                                                                    
          .click();
        })
      }
      else {
        cy.log('No SSubcategories found');
      }
    })
    
    cy.get('.product-box').then(($productBox) => {                                                                     // select Product

      const randomProduct = Math.floor(Math.random() * $productBox.length);                                            //  From the $items set, the .eq(index) method returns only one element.
      const $productcard = $productBox.eq(randomProduct);                                                              //  The object is saved in $card - this is the product card
                                                                                                                    
      cy.wrap($productcard)                                                                                                                                     
      .trigger('mouseover')                                                                          
      .should('be.visible')
      .then($buy => {   
                                                                                                                      // If there is a "do košíku" button inside the card
        if ($buy.find('span').filter((i, buy) => buy.innerText.trim() === 'do košíku').length) {                      // We create a variable called buy. It is responsible for the button.
          cy.wrap($productcard).should('be.visible').contains('span', 'do košíku').click({ force: true });
          cy.get('#snippet--pdModal').should('be.visible');
        } else {
          cy.wrap($productcard).should('be.visible').contains('span', 'Nakoupit').click({ force: true });   
          cy.get('.product-box').then(($newproductBox) => {                                                            

            const randomnewProduct = Math.floor(Math.random() * $newproductBox.length);

            cy.wrap($newproductBox).eq(randomnewProduct)                                                                                                                                     
            .wait(2000)
            .trigger('mouseover')                                                                          
            .should('be.visible')
            .contains('span', 'do košíku').click({force: true });
            cy.get('#snippet--pdModal').should('be.visible');
          })                                                     
        } 

      })
    })
  })
})




