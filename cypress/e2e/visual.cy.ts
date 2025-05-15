describe('Visual Regression Tests', () => {
  it('should match homepage snapshot', () => {
    cy.visit('/');
    cy.percySnapshot('Homepage');
  });

  it('should match login page snapshot', () => {
    cy.visit('/login');
    cy.percySnapshot('Login Page');
  });

  it('should match cocktail list snapshot', () => {
    cy.login('test@example.com', 'StrongP@ss123');
    cy.visit('/cocktails');
    cy.percySnapshot('Cocktail List');
  });

  it('should match cocktail details snapshot', () => {
    cy.login('test@example.com', 'StrongP@ss123');
    cy.visit('/cocktails/1');
    cy.percySnapshot('Cocktail Details');
  });

  it('should match profile page snapshot', () => {
    cy.login('test@example.com', 'StrongP@ss123');
    cy.visit('/profile');
    cy.percySnapshot('Profile Page');
  });

  it('should match dark mode snapshots', () => {
    cy.visit('/');
    cy.get('[data-testid="theme-toggle"]').click();
    cy.percySnapshot('Homepage Dark Mode');
  });
});
