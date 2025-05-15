describe('Cocktail Management', () => {
  beforeEach(() => {
    cy.login('test@example.com', 'StrongP@ss123');
    cy.visit('/cocktails');
  });

  it('should display cocktail list', () => {
    cy.get('[data-testid="cocktail-list"]').should('be.visible');
    cy.get('[data-testid="cocktail-card"]').should('have.length.at.least', 1);
  });

  it('should search for cocktails', () => {
    cy.get('[data-testid="search-input"]').type('Margarita');
    cy.get('[data-testid="cocktail-card"]').should('contain', 'Margarita');
  });

  it('should filter by category', () => {
    cy.get('[data-testid="category-filter"]').click();
    cy.get('[data-testid="category-option"]').contains('Tequila').click();
    cy.get('[data-testid="cocktail-card"]').should('contain', 'Tequila');
  });

  it('should add new cocktail', () => {
    cy.get('[data-testid="add-cocktail-button"]').click();
    cy.get('[data-testid="name-input"]').type('Test Cocktail');
    cy.get('[data-testid="description-input"]').type('A test cocktail description');
    cy.get('[data-testid="ingredients-input"]').type('Ingredient 1{enter}Ingredient 2{enter}');
    cy.get('[data-testid="submit-button"]').click();
    cy.get('[data-testid="success-message"]').should('be.visible');
  });

  it('should edit existing cocktail', () => {
    cy.get('[data-testid="cocktail-card"]').first().find('[data-testid="edit-button"]').click();
    cy.get('[data-testid="name-input"]').clear().type('Updated Cocktail');
    cy.get('[data-testid="submit-button"]').click();
    cy.get('[data-testid="success-message"]').should('be.visible');
  });
});
