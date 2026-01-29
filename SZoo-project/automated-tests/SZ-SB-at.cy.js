/// <reference types="cypress" />

describe('superzoo.cz', () => {
  beforeEach(() => {
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
    cy.visit('https://www.superzoo.cz/')
    cy.wait(2000);
    cy.contains('button', 'Odmítnout').click();
  })

  it ('SZ-SB-at Checking links in the Nakupujte podle značek block on the site https://www.superzoo.cz/', () => {
    cy.get('.max-w-100 > p.text-center > .btn').click();
    
    const errors = [];

    cy.get('.nav-bar__link').each(($selectNavBar) => {
      const letter = $selectNavBar.find('span').text().trim();

      cy.log(`Selected letter: ${letter}`);

      cy.wrap($selectNavBar).click();

      const controlsId = $selectNavBar.attr('aria-controls');                 // Get the id of the content referenced by selectNavBar

      cy.get(`#${controlsId}`)
        .should('be.visible')
        .within(() => {
          cy.get('ul.columns-3xs > li > a').each(($link) => {

            const text = $link.text().trim();
            const firstChar = text.charAt(0);                                 // charAt(0) returns the first character of this string.

            if (firstChar !== letter) {
              
              cy.log(`❗️❗️❗️❗️❗️ Inconsistency: button "${letter}", linc "${text}"`);
              errors.push(`❌ Button "${letter}", link "${text}" doesn't match.`);
            }
          })
        })
    })
    .then(() => {
    // After the enumeration, we check and log the result.
    if (errors.length) {
      errors.forEach(msg => cy.log(msg));
    }
  })  
  })
})
