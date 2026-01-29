/// <reference types="cypress" />

describe('decathlon.cz.cz', () => {
  beforeEach(() => {
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
    cy.visit('https://www.superzoo.cz/')
    cy.wait(2000);
    cy.contains('button', 'Odmítnout').click();
  })


  it ('SZ-PS-at-4 Check the product filter via the E-shop tab of the main menu on the site https://www.superzoo.cz/', () => {
    // Click on the E-shop menu tab
    cy.log('hhhhhhhhhh');
    cy.get('#ca-uid-1 > .main-menu__root-link > span')
    .trigger('mouseover')
    .wait(2000)
    .click();

    // select category
    cy.get('button.main-menu__tab-item-link.col-start-1').then(($eshopcategory) => {

      const randomESopsCat = Math.floor(Math.random() * $eshopcategory.length);
      
      // writes 1 element (eq(randomESopsCat)) from all matching elements of $eshopcategory to the constant
      const selectedCategory = $eshopcategory.eq(randomESopsCat); 
      
      // From the selected button, we extract the value of the `aria-controls` attribute, which indicates the ID of the subcategories
      const boxES = selectedCategory.attr('aria-controls');
      
      cy.wrap(selectedCategory)
      .trigger('mouseover')
      .should('be.visible')
      .click();
      
      // We are looking for an element with an ID corresponding to `aria-controls` - this is a container with subcategories
      cy.get(`#${boxES}`) 
      .should('exist')
      // limit the search area within the selected container
      .within(() => {                                                                      
        cy.get('li > a.composite-link.flex.items-center.gap-2').then(($eshopsubcategory) => {
            
          const randomESopsSubCat = Math.floor(Math.random() * $eshopsubcategory.length);

          cy.wrap($eshopsubcategory)
          .eq(randomESopsSubCat)
          .should('be.visible')
          .click();
        })
      })
    })
    // select the first card
    function comparisonNames() {
      cy.get('section.product-box').first().then(($firstPCart) => {
        if ($firstPCart.length) {
          cy.wrap($firstPCart)
          .within(() => {
            cy.get('.product-box__link > .composite-link__underline')
            .invoke('text')                                                     // Get the text content of this <span> element
            .then(productName => {
              const textH = productName.trim();                                 // .trim() — removes extra spaces at the beginning and end of a line.
              
              cy.wrap(textH).as('savedProductName');
              
            })
            cy.get('.col-start-2 > .btn').click();
          })
        }
      })
    }
      
    comparisonNames();


    // close the basket  pop-up
    cy.get('#snippet--pdModal').should('be.visible');
    cy.wait(3000);
    cy.contains('button', 'Zavřít dialogové okno').click();
    
    // click on the basket button
    cy.get('.header-box__control').contains('košík')
    .click();

    cy.get('.aside-basket__item').should('have.length', 1);

    // enter to the busket
    cy.get('#snippet-basketBox-basketBox > :nth-child(2) > .btn').click();

    // Compare the name of the product in the cart with the one saved earlier
    cy.get('@savedProductName').then((savedName) => {
      cy.get('.text-inherit > .decoration-transparent') // селектор названия товара в корзине
      .invoke('text')
      .then((cartProductName) => {
        const cartName = cartProductName.trim();
        expect(cartName).to.eq(savedName); // Cart product name selector
      });
    });

  })

})
