Cypress.Commands.add('login', (email: string, password: string) => {
  cy.intercept('POST', '/api/auth/login').as('loginRequest');
  
  cy.visit('/login');
  cy.get('[data-testid="email-input"]').type(email);
  cy.get('[data-testid="password-input"]').type(password);
  cy.get('[data-testid="login-button"]').click();
  
  cy.wait('@loginRequest');
});
