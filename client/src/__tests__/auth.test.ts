import { validateEmail, validatePassword } from '../utils/validation';
import { AuthService } from '../services/auth';
import { mockLocalStorage } from '../utils/test-utils';

// Mock localStorage
beforeAll(() => {
  mockLocalStorage();
});

describe('Authentication Utilities', () => {
  describe('validateEmail', () => {
    it('should validate correct email formats', () => {
      expect(validateEmail('user@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.uk')).toBe(true);
    });

    it('should reject invalid email formats', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('@nodomain.com')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('should validate strong passwords', () => {
      expect(validatePassword('StrongP@ss123')).toBe(true);
      expect(validatePassword('AnotherGood1!')).toBe(true);
    });

    it('should reject weak passwords', () => {
      expect(validatePassword('weak')).toBe(false);
      expect(validatePassword('12345678')).toBe(false);
      expect(validatePassword('')).toBe(false);
    });
  });
});

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    localStorage.clear();
    authService = new AuthService();
  });

  it('should start with no authenticated user', () => {
    expect(authService.isAuthenticated()).toBe(false);
    expect(authService.getToken()).toBeNull();
  });

  it('should store and retrieve tokens', () => {
    const testToken = 'test-jwt-token';
    authService.setToken(testToken);
    
    expect(authService.isAuthenticated()).toBe(true);
    expect(authService.getToken()).toBe(testToken);
  });

  it('should clear authentication on logout', () => {
    authService.setToken('test-token');
    expect(authService.isAuthenticated()).toBe(true);

    authService.logout();
    expect(authService.isAuthenticated()).toBe(false);
    expect(authService.getToken()).toBeNull();
  });
});
