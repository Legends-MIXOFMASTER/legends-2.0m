describe('Authentication Flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should show login form', () => {
    cy.get('[data-testid="login-form"]').should('be.visible');
    cy.get('[data-testid="email-input"]').should('be.visible');
    cy.get('[data-testid="password-input"]').should('be.visible');
  });

  it('should validate email format', () => {
    cy.get('[data-testid="email-input"]').type('invalid-email');
    cy.get('[data-testid="login-button"]').click();
    cy.get('[data-testid="email-error"]').should('be.visible');
  });

  it('should validate password format', () => {
    cy.get('[data-testid="password-input"]').type('weak');
    cy.get('[data-testid="login-button"]').click();
    cy.get('[data-testid="password-error"]').should('be.visible');
  });

  it('should handle successful login', () => {
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 200,
      body: { token: 'fake-jwt-token' }
    }).as('loginRequest');

    cy.get('[data-testid="email-input"]').type('test@example.com');
    cy.get('[data-testid="password-input"]').type('StrongP@ss123');
    cy.get('[data-testid="login-button"]').click();

    cy.wait('@loginRequest');
    cy.url().should('include', '/dashboard');
  });

  it('should handle failed login', () => {
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 401,
      body: { error: 'Invalid credentials' }
    }).as('loginRequest');

    cy.get('[data-testid="email-input"]').type('wrong@example.com');
    cy.get('[data-testid="password-input"]').type('WrongP@ss123');
    cy.get('[data-testid="login-button"]').click();

    cy.wait('@loginRequest');
    cy.get('[data-testid="login-error"]').should('be.visible');
  });
});
