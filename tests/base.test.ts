import Sels from '../src';

const originalLocalStorage: Storage = localStorage;

interface FakeStorage {
  [key: string]: string
}

describe('base testing', () => {
  beforeEach(() => {
    // @ts-ignore
    Object.defineProperty(global, 'localStorage', {
      value: new class {
        constructor(private store: FakeStorage = {}) {}
      
        clear() {
          this.store = {};
        }
      
        getItem(key: string) {
          return this.store[key] || null;
        }
      
        setItem(key: string, value: any) {
          this.store[key] = String(value);
        }
      
        removeItem(key: string) {
          delete this.store[key];
        }
      
        __show__() {
          return this.store;
        }
      }
    })
  });

  afterEach(() => {
    Object.defineProperty(global, 'localStorage', {
      value: originalLocalStorage
    });
  });

  it('check write/read', () => {
    Sels.set('test', '123');
    const value = Sels.get('test');
    expect(value).toBe('123');
  });

  it('check expiry', () => {
    Sels.set('test', '123', { maxAge: 0 });
    const keys = Object.keys(localStorage.__show__());
    expect(keys).toEqual(expect.arrayContaining(['test', 'test@expires']));
    return new Promise((resolve) => {
      setTimeout(() => {
        const value = Sels.get('test');
        resolve(value);
      }, 1000);
    }).then(value => {
      expect(value).toBe(null);
    })
  });

  it('check NOT expiry', () => {
    Sels.set('test', '123', { maxAge: 2 });
    return new Promise((resolve) => {
      setTimeout(() => {
        const value = Sels.get('test');
        resolve(value);
      }, 1000);
    }).then(value => {
      expect(value).toBe('123');
    })
  });

  it('remove WITH', () => {
    Sels.set('test', '123', { maxAge: 999 });
    Sels.remove('test');
    const keys = Object.keys(localStorage.__show__());
    expect(keys.length).toBe(0);
  });

  it('test async', () => {
    Sels.set('test', '123', { maxAge: 999 });
    return Sels.asyncGet('test').then(value => {
      expect(value).toBe('123');
    });
  });
});