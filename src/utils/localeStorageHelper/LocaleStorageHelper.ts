export class LocaleStorageHelper {
  private static isLocalStorageSupported(): boolean {
    try {
      const testKey = '__localStorageTest__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  static setItem(key: string, value: unknown): void {
    if (LocaleStorageHelper.isLocalStorageSupported()) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      throw new Error('LocalStorage is not supported in this browser.');
    }
  }

  static getItem<T>(key: string): T | null {
    if (LocaleStorageHelper.isLocalStorageSupported()) {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } else {
      throw new Error('LocalStorage is not supported in this browser.');
    }
  }

  static removeItem(key: string): void {
    if (LocaleStorageHelper.isLocalStorageSupported()) {
      localStorage.removeItem(key);
    } else {
      throw new Error('LocalStorage is not supported in this browser.');
    }
  }
}
