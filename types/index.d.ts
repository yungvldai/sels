declare type RecordValue = string | boolean | number;

interface IRecordOptions {
  maxAge?: number;
  expires?: Date | string;
}

declare const set: (
  key: string,
  value: RecordValue,
  options?: IRecordOptions | undefined
) => boolean;

declare const remove: (key: string) => boolean;

declare const get: (key: string) => string | null;

declare const asyncGet: (key: string) => Promise<string | null>;

declare const clear: () => boolean;

declare const isAvailable: boolean;

declare const Sels: Readonly<{
  clear: () => boolean;
  get: (key: string) => string | null;
  asyncGet: (key: string) => Promise<string | null>;
  set: (key: string, value: RecordValue, options?: IRecordOptions | undefined) => boolean;
  remove: (key: string) => boolean;
  isAvailable: boolean;
}>;

export default Sels;
export { clear, get, asyncGet, set, remove, isAvailable };
