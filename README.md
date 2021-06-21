# sels 🍪➡️🗄
sels - safe expirable **localStorage**

[![npm](https://img.shields.io/npm/v/sels?color=cc3534)](https://www.npmjs.com/package/sels)
[![Tests](https://github.com/yungvldai/sels/actions/workflows/main.yml/badge.svg)](https://github.com/yungvldai/sels/actions/workflows/main.yml)
[![LICENSE](https://img.shields.io/github/license/yungvldai/sels?color=yellow)](https://github.com/yungvldai/sels/blob/master/LICENSE)
![Package size](https://img.shields.io/github/size/yungvldai/sels/.size/index.min.js)

Using cookies for client-only purposes is irrational and unsafe. There is no point in using cookies if the data is not intended to be sent to the server. In this case, you need to use localStorage. However, localStorage may not be available (then an error will be generated), and there is no expiry mechanism in localStorage.

*This library solves both problems*

## Installing and usage

```bash
npm i sels
```

```js
import sels from 'sels';

sels.set('key', 'value');
```

или

```html
<script src="https://cdn.jsdelivr.net/npm/sels@latest/index.min.js"></script>
```
```js
Sels.set('key', 'value');
```

## Breaking changes ⚠️

 - The method `get` version 1.x.x has been renamed to `asyncGet` (see description below)

## Types & interfaces

```ts
interface IRecordOptions {
  maxAge?: number
  expires?: string | Date
}

type RecordValue = string | boolean | number;
```

## Methods

`set(key: string, value: RecordValue, options?: IRecordOptions): boolean` - adds or modifies a record in **localStorage**. `value` will be cast to string. 
Before write, the ability to write will be checked, if the recording failed, it will return `false`, else `true`.

`asyncGet(key: string): Promise` - reads a record from **localStorage**. Checks readability before reading. If it fails, the Promise will be rejected with an error value, otherwise the Promise will be resolved with the read value. Promise will resolve with value `null`, if the specified key is not found.

`get(key: string): string | null` - reads a record from **localStorage**. Checks readability before reading. If the read failed, it will return `null`, otherwise the key value will be returned. If the key is not found, it will also return `null`.

`remove(key: string)` - removes record from **localStorage**. Before deleting, it checks if deletion is possible. It will return `true`, if deletion is successful, else `false`. 
If the key is not found, but there is no error, it will return `true` anyway.

`clear()` - completely cleans **localStorage**, it will return `true`, if successful, else `false`.

## Fields

`Sels` also exports value `isAvailable: boolean` - availability of **localStorage**.

## Options 

The `set` method takes a third (optional) parameter - `options`. If nothing is passed, the record will be eternal.

 - `maxAge` is needed to indicate the number of seconds - the lifetime of the record. After this time expires, the record will no longer be available.
 - `expires` is needed to specify a date string or object `Date`, after which the record should become inaccessible. 
The date can be passed as a string (e.g. *ISO string* or `12-31-2021`). [`Date.parse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse) will be used for parsing.
You can also specify a Jira-like period, for example, `1w 2d 3h`, so the record will stop being read after 1 week (7 days) + 2 days + 3 hours. Supported units: `y`, `m`, `w`, `d`, `h` (year, month, week, day, hour).

## Translations

 - [🇷🇺 Русский](https://github.com/yungvldai/sels/blob/master/translations/ru/README.md)
 - [🇺🇸 English (this)](https://github.com/yungvldai/sels/blob/master/README.md)
