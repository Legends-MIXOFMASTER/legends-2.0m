// Jest setup file for testing configuration

// Testing Library
import '@testing-library/jest-dom';

// Polyfills for global objects
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock global fetch
global.fetch = jest.fn();

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {
    this.observe = jest.fn();
    this.unobserve = jest.fn();
    this.disconnect = jest.fn();
  }
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {
    this.observe = jest.fn();
    this.unobserve = jest.fn();
    this.disconnect = jest.fn();
  }
};

// Mock storage
const storageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn()
};

Object.defineProperty(window, 'localStorage', {
  value: storageMock,
  writable: true
});

Object.defineProperty(window, 'sessionStorage', {
  value: storageMock,
  writable: true
});

// Global console configuration
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn()
};

// Test lifecycle hooks
beforeEach(() => {
  // Reset storage mocks
  storageMock.clear();
});

afterEach(() => {
  // Reset all mocks
  jest.clearAllMocks();
  
  // Reset fetch mock
  global.fetch.mockClear();
});
