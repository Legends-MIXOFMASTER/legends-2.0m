export const mockLocalStorage = () => {
  const store: { [key: string]: string } = {};

  const mockStorage = {
    getItem: (key: string): string | null => {
      return store[key] || null;
    },
    setItem: (key: string, value: string): void => {
      store[key] = value;
    },
    removeItem: (key: string): void => {
      delete store[key];
    },
    clear: (): void => {
      Object.keys(store).forEach(key => delete store[key]);
    },
    length: 0,
    key: (index: number): string | null => {
      return Object.keys(store)[index] || null;
    }
  };

  Object.defineProperty(window, 'localStorage', {
    value: mockStorage,
    writable: true
  });

  return mockStorage;
};
