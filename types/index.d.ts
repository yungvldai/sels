declare module 'sels' {
  type RecordValue = string | boolean | number;

  interface RecordOptions {
    maxAge?: number;
    expires?: Date | string;
  }

  export const remove: (key: string) => boolean;
  export const get: (key: string) => string | null;
  export const asyncGet: (key: string) => Promise<string | null>;
  export const clear: () => boolean;
  export const set: (
    key: string,
    value: RecordValue,
    options?: RecordOptions | undefined
  ) => boolean;

  export const isAvailable: boolean;

  const Sels = {
    remove,
    get,
    asyncGet,
    clear,
    set,
    isAvailable
  };

  export default Sels;
}
