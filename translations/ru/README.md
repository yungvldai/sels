# sels 🍪➡️🗄
sels - safe expirable **localStorage**

[![npm version](https://badge.fury.io/js/sels.svg)](https://www.npmjs.com/package/sels)
[![Tests](https://github.com/yungvldai/sels/actions/workflows/main.yml/badge.svg)](https://github.com/yungvldai/sels/actions/workflows/main.yml)

Использование кук в client-only целях - нерационально и небезопасно. Нет смысла использовать куки, если данные не предназначены для отправки на сервер.
В таком случае нужно использовать **localStorage**. Однако, **localStorage** может быть не доступен (тогда будет генерироваться ошибка), а еще в **localStorage**
нет механизма времени жизни (expiry).

*Эта библиотека решает обе проблемы*

## Установка и использование

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

## Важные изменения ⚠️

 - Метод `get` версии 1.x.x переименован в `asyncGet` (см. описание ниже ниже)

## Типы

```ts
interface IRecordOptions {
  maxAge?: number
  expires?: string | Date
}

type RecordValue = string | boolean | number;
```

## Методы

`set(key: string, value: RecordValue, options?: IRecordOptions): boolean` - добавляет или модифицирует запись в **localStorage**. `value` будет приведен к строке. 
Перед записью проверится возможность записи, если запись не удалась, вернет `false`, иначе `true`.

`asyncGet(key: string): Promise` - читает запись из **localStorage**. Перед чтением проверяет возможность чтения. Если прочиать не удалось, промис будет отклонен со значением ошибки, 
иначе промис будет разрешен с прочитанным значением. Промис разрешится со значением `null`, если указанный ключ не найден.

`get(key: string): string | null` - читает запись из **localStorage**. Перед чтением проверяет возможность чтения. Если прочитать не удалось, вернется `null`, иначе
вернется значение ключа. Если ключ не найден, также вернется `null`.

`remove(key: string)` - удаляет запись из **localStorage**. Перед удалением проверяет возможно ли. Вернет `true`, если удаление успешно, `false`, если нет. 
В случае, если ключ не будет найден, однако ошибки не будет, вернется все равно `true`.

`clear()` - полностью очищает **localStorage**, вернет `true`, если успешно, иначе `false`.

## Другое

`Sels` экспортирует значение `isAvailable: boolean` - доступность **localStorage**.

## Опции 

В метод `set` третьим (опциональным) аргументом можно передать объект опций. Если не передать ничего, записи будут вечными.

 - `maxAge` нужен для указания количества секунд - времени жизни записи. После истечения этого времени запись перестанет быть доступной.
 - `expires` служит для указания строки даты или объекта `Date`, после которой запись должна стать недоступной. 
Дату можно передать строкой, например, *ISO string* или просто `12-31-2021`. Для парсинга используется [`Date.parse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse).
Также можно указать промежуток, например, `1w 2d 3h`, 
так запись перестанет читаться через 1 неделю (7 дней) + 2 дня + 3 часа. Доступные единицы: `y`, `m`, `w`, `d`, `h` (год, месяц, неделя, день, час соответственно).

## Переводы

 - [🇷🇺 Русский (этот файл)](https://github.com/yungvldai/sels/blob/master/translations/ru/README.md)
 - [🇺🇸 English](https://github.com/yungvldai/sels/blob/master/README.md)
