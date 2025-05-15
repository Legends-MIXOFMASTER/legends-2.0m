import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to login programmatically
       * @example cy.login('test@example.com', 'password123')
       */
      login(email: string, password: string): Chainable<Element>;
    }
  }
}
