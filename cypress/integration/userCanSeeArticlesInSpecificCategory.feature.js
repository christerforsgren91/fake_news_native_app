describe('User can see articles in specific category', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://fakest-newzz.herokuapp.com/api/articles', {
      fixture: 'articles.json',
    });
    cy.intercept('GET', 'https://fakest-newzz.herokuapp.com/api/articles/**', {
      fixture: 'article.json',
    });
  });
  describe('Successfully can see specific category', () => {
    beforeEach(() => {
      cy.intercept(
        'GET',
        'https://fakest-newzz.herokuapp.com/api/articles/Science',
        {
          fixture: 'scienceCategories.json',
        }
      );
      cy.viewport('iphone-x');
      cy.visit('/');
      cy.get('[data-testid=article]').first().click();
      cy.get('[data-testid=category-button]').click();
    });
    it('is expected to show two articles', () => {
      cy.get('[data-testid=view-by-category]').within(() => {
        cy.get('[data-testid=article]').should('have.length', 2);
      });
    });
    it('is expected to show articles of science category', () => {
      cy.get('[data-testid=view-by-category]').within(() => {
        cy.get('[data-testid=category]').each(($span) => {
          expect($span.text()).to.equal('Science');
        });
      });
    });
  });
  describe('Unsuccesfully, no articles in category', () => {
    beforeEach(() => {
      cy.intercept(
        'GET',
        'https://fakest-newzz.herokuapp.com/api/articles/Science',
        {
          articles: [],
        }
      );
      cy.viewport('iphone-x');
      cy.visit('/');
      cy.get('[data-testid=article]').first().click();
      cy.get('[data-testid=category-button]').click();
    });
    it('is expected to show no article message', () => {
      cy.get('[data-testid=no-articles-message]').should(
        'contain',
        'No articles available at this moment'
      );
    });
  });
});
