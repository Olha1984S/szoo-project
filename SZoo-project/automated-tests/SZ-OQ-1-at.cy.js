/// <reference types="cypress" />

describe('decathlon.cz.cz', () => {
  beforeEach(() => {
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
    cy.visit('https://www.superzoo.cz/')
    cy.wait(2000);
    cy.contains('button', 'Odmítnout').click();
  })
  it('SZ-OQ-1-at Check the UX of the page https://www.superzoo.cz/casto-kladene-otazky/', () => {
    cy.wait(1000);     
    cy.log('Check the UX of the site https://www.superzoo.cz/');
    cy.get('#ca-uid-15 > .header-box__control').click();
    cy.get('.bg-white > .list-unstyled > :nth-child(2) > .composite-link > .composite-link__underline').click();
    cy.get('#snippet--pdModalTitle').should('contain', 'Často kladené otázky');
    
    // Checking the last item of breadcrumbs
    cy.get('#snippet--pdModalTitle')
    .invoke('text')
    .then(title => {
      cy.get('.breadcrumb__list > li')
      .last()
      .should('contain.text', title.trim());
    });
    
    // SZ-OQ-1-at-1 
    // Check the number of accordion parts of the Nejčastěji hledáte block
    // --------------------------------------------------------------------------------
    cy.get('.max-w-prose.mx-auto .js-collapsable').should('have.length', 6);

    // SZ-OQ-1-at-2 
    // Check the number of accordion parts of the Otázky podle témat block
    // --------------------------------------------------------------------------------
    cy.get('.list-unstyled').should('be.visible');
    cy.get('.composite-link__underline.grow').should('have.length', 9);
    cy.wait(2000);

    // SZ-OQ-1-at-3 
    // Checking the number of sections in an accordion block
    // --------------------------------------------------------------------------------
    cy.log('Platba');
    cy.get('.mb-2 > .list-unstyled > :nth-child(1) > .composite-link > .composite-link__underline').click();
    cy.get('.text-center').should('contain', 'Platba');

    // Checking the last item of breadcrumbs
    cy.get('#snippet--pdModalTitle')
    .invoke('text')                                                                 // Calls the text() method of the jQuery wrapper, getting the text
    .then(title => {                                                                // Passes the resulting text to a function where it can be trimmed, compared, or saved.
      cy.get('.breadcrumb__list > li')                                              // When you get the text of an element via .invoke('text'),
      .last()                                                                       // The result may contain unwanted whitespace around it, such as indents or hyphens. 
      .should('contain.text', title.trim());                                        // Using .trim() allows you to compare a clean string without it:
    });

    cy.get('.max-w-prose.mx-auto .js-collapsable').should('have.length', 3);
    cy.wait(2000);

    // Check the number of accordion parts of the Další témata podpory block
    cy.get('.composite-link__underline.grow').should('have.length', 8);
    cy.wait(2000);
    cy.get('.mt-3 > .btn').click();

    // SZ-OQ-1-at-4 
    // Checking the number of sections in an accordion block
    // --------------------------------------------------------------------------------
    cy.log('Vrácení zboží');
    cy.get('.mb-2 > .list-unstyled > :nth-child(2) > .composite-link').click();
    cy.get('.text-center').should('contain', 'Vrácení zboží');

    // Checking the last item of breadcrumbs
    cy.get('#snippet--pdModalTitle')
    .invoke('text')
    .then(title => {
      cy.get('.breadcrumb__list > li')
      .last()
      .should('contain.text', title.trim());
    });

    cy.get('.max-w-prose.mx-auto .js-collapsable').should('have.length', 3);
    cy.wait(2000);

    // Check the number of accordion parts of the Mobilní aplikace Super zoo block
    cy.get('.composite-link__underline.grow').should('have.length', 8);
    cy.wait(2000);
    cy.get('.mt-3 > .btn').click();

    // SZ-OQ-1-at-5
    // Checking the number of sections in an accordion block
    // --------------------------------------------------------------------------------
    cy.log('Mobilní aplikace Super zoo');
    cy.get('.mb-2 > .list-unstyled > :nth-child(3) > .composite-link').click();
    cy.get('.text-center').should('contain', 'Mobilní aplikace Super zoo');

    // Checking the last item of breadcrumbs
    cy.get('#snippet--pdModalTitle')
    .invoke('text')
    .then(title => {
      cy.get('.breadcrumb__list > li')
      .last()
      .should('contain.text', title.trim());
    });

    cy.get('.max-w-prose.mx-auto .js-collapsable').should('have.length', 5);
    cy.wait(2000);

    // Check the number of accordion parts of the Reklamace block
    cy.get('.composite-link__underline.grow').should('have.length', 8);
    cy.wait(2000);
    cy.get('.mt-3 > .btn').click();

    // SZ-OQ-1-at-6
    // Checking the number of sections in an accordion block
    // --------------------------------------------------------------------------------
    cy.log('Reklamace');
    cy.get('.mb-2 > .list-unstyled > :nth-child(4) > .composite-link').click();
    cy.get('.text-center').should('contain', 'Reklamace');

    // Checking the last item of breadcrumbs
    cy.get('#snippet--pdModalTitle')
    .invoke('text')
    .then(title => {
      cy.get('.breadcrumb__list > li')
      .last()
      .should('contain.text', title.trim());
    });

    cy.get('.max-w-prose.mx-auto .js-collapsable').should('have.length', 4);
    cy.wait(2000);

    // Check the number of accordion parts of the Reklamace block
    cy.get('.composite-link__underline.grow').should('have.length', 8);
    cy.wait(2000);
    cy.get('.mt-3 > .btn').click();

    // SZ-OQ-1-at-7
    // Checking the number of sections in an accordion block
    // --------------------------------------------------------------------------------
    cy.log('Doručení a doprava');
    cy.get('.mb-2 > .list-unstyled > :nth-child(5) > .composite-link').click();
    cy.get('.text-center').should('contain', 'Doručení a doprava');

    // Checking the last item of breadcrumbs
    cy.get('#snippet--pdModalTitle')
    .invoke('text')
    .then(title => {
      cy.get('.breadcrumb__list > li')
      .last()
      .should('contain.text', title.trim());
    });

    cy.get('.max-w-prose.mx-auto .js-collapsable').should('have.length', 4);
    cy.wait(2000);

    // Check the number of accordion parts of the Reklamace block
    cy.get('.composite-link__underline.grow').should('have.length', 8);
    cy.wait(2000);
    cy.get('.mt-3 > .btn').click();

    // SZ-OQ-1-at-8
    // Checking the number of sections in an accordion block
    // --------------------------------------------------------------------------------
    cy.log('Family klub');
    cy.get('.mb-2 > .list-unstyled > :nth-child(6) > .composite-link').click();
    cy.get('.text-center').should('contain', 'Family klub');

    // Checking the last item of breadcrumbs
    cy.get('#snippet--pdModalTitle')
    .invoke('text')
    .then(title => {
      cy.get('.breadcrumb__list > li')
      .last()
      .should('contain.text', title.trim());
    });

    cy.get('.max-w-prose.mx-auto .js-collapsable').should('have.length', 13);
    cy.wait(2000);

    // Check the number of accordion parts of the Reklamace block
    cy.get('.composite-link__underline.grow').should('have.length', 8);
    cy.wait(2000);
    cy.get('.mt-3 > .btn').click();

    // SZ-OQ-1-at-9
    // Checking the number of sections in an accordion block
    // --------------------------------------------------------------------------------
    cy.log('Chovatelský klub');
    cy.get('.mb-2 > .list-unstyled > :nth-child(7) > .composite-link').click();
    cy.get('.text-center').should('contain', 'Chovatelský klub');

    // Checking the last item of breadcrumbs
    cy.get('#snippet--pdModalTitle')
    .invoke('text')
    .then(title => {
      cy.get('.breadcrumb__list > li')
      .last()
      .should('contain.text', title.trim());
    });

    cy.get('.max-w-prose.mx-auto .js-collapsable').should('have.length', 3);
    cy.wait(2000);

    // Check the number of accordion parts of the Reklamace block
    cy.get('.composite-link__underline.grow').should('have.length', 8);
    cy.wait(2000);
    cy.get('.mt-3 > .btn').click();

    // SZ-OQ-1-at-10
    // Checking the number of sections in an accordion block
    // --------------------------------------------------------------------------------
    cy.log('Objednávka');
    cy.get('.mb-2 > .list-unstyled > :nth-child(8) > .composite-link').click();
    cy.get('.text-center').should('contain', 'Objednávka');

    // Checking the last item of breadcrumbs
    cy.get('#snippet--pdModalTitle')
    .invoke('text')
    .then(title => {
      cy.get('.breadcrumb__list > li')
      .last()
      .should('contain.text', title.trim());
    });

    cy.get('.max-w-prose.mx-auto .js-collapsable').should('have.length', 14);
    cy.wait(2000);

    // Check the number of accordion parts of the Reklamace block
    cy.get('.composite-link__underline.grow').should('have.length', 8);
    cy.wait(2000);
    cy.get('.mt-3 > .btn').click();

    // SZ-OQ-1-at-11
    // Checking the number of sections in an accordion block
    // --------------------------------------------------------------------------------
    cy.log('Zboží a zvířata');
    cy.get('.mb-2 > .list-unstyled > :nth-child(9) > .composite-link').click();
    cy.get('.text-center').should('contain', 'Zboží a zvířata');

    // Checking the last item of breadcrumbs
    cy.get('#snippet--pdModalTitle')
    .invoke('text')
    .then(title => {
      cy.get('.breadcrumb__list > li')
      .last()
      .should('contain.text', title.trim());
    });

    cy.get('.max-w-prose.mx-auto .js-collapsable').should('have.length', 8);
    cy.wait(2000);

    // Check the number of accordion parts of the Reklamace block
    cy.get('.composite-link__underline.grow').should('have.length', 8);
    cy.wait(2000);
    cy.get('.mt-3 > .btn').click();

    cy.get('.header__logo-img').click();

  })
                                                                         
})



