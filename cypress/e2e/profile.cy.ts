describe('User Profile', () => {
  beforeEach(() => {
    cy.login('test@example.com', 'StrongP@ss123');
    cy.visit('/profile');
  });

  it('should display user information', () => {
    cy.get('[data-testid="profile-name"]').should('be.visible');
    cy.get('[data-testid="profile-email"]').should('contain', 'test@example.com');
  });

  it('should update profile information', () => {
    cy.get('[data-testid="edit-profile-button"]').click();
    cy.get('[data-testid="name-input"]').clear().type('Updated Name');
    cy.get('[data-testid="save-button"]').click();
    cy.get('[data-testid="success-message"]').should('be.visible');
    cy.get('[data-testid="profile-name"]').should('contain', 'Updated Name');
  });

  it('should change password', () => {
    cy.get('[data-testid="change-password-button"]').click();
    cy.get('[data-testid="current-password"]').type('StrongP@ss123');
    cy.get('[data-testid="new-password"]').type('NewStrongP@ss123');
    cy.get('[data-testid="confirm-password"]').type('NewStrongP@ss123');
    cy.get('[data-testid="save-password-button"]').click();
    cy.get('[data-testid="success-message"]').should('be.visible');
  });

  it('should handle favorite cocktails', () => {
    cy.get('[data-testid="favorites-tab"]').click();
    cy.get('[data-testid="favorite-cocktail"]').should('have.length.at.least', 0);
    cy.get('[data-testid="add-favorite-button"]').first().click();
    cy.get('[data-testid="favorite-cocktail"]').should('have.length.at.least', 1);
  });
});
