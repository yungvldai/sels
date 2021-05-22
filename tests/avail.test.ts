const originalLocalStorage: Storage = localStorage;

describe('availability testing', () => {
  beforeEach(() => {
    // @ts-ignore
    Object.defineProperty(global, 'localStorage', {
      value: undefined
    });
  });

  afterEach(() => {
    Object.defineProperty(global, 'localStorage', {
      value: originalLocalStorage
    });
  });

  it('check not avail', () => {
    return import('../src/avail').then(({ default: defaultExport }) => {
      expect(defaultExport).toBe(false); // not available
    })
  });
});

export {};