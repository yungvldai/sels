# sels
sels - safe expirable localStorage

## Использование

```
import sels from 'sels'

...

sels.set('key', 'value');
```

## Типы

```
interface IOptions {
  maxAge?: number
  expires?: string | Date
}
```

## Методы

`set(key: string, value: any, options: IOptions): boolean` - записывает ключ-значение в localStorage. `value` будет приведен к строке. 
Перед записью проверить возможность записи, если запись не удалась, вернет `false`, иначе `true`.

`get(key: string): Promise` - читает значение из localStorage. Перед чтением проверяет возможность чтения. Если прочиать не удалось, промис реджектнется, 
иначе промис зарезольвится. Промис зарезольвится со значением `null`, если указанный ключ не найден.

`remove(key: string)` - удаляет ключ-значение из localStorage. Перед удалением проверяет возможно ли. Вернет true, если удаление успешно, false, если нет. 
В случае, если ключ не будет найден, однако ошибки не будет, вернется все равно `true`.

`clear()` - полностью очищает localStorage, вернет `true`, если успешно, иначе `false`.

## Опции 

В метод `set` третьим (опциональным) аргументом можно передать объект опций. Если не передать ничего, значения будут вечными.

`maxAge` нужен для указания количества секунд, после которого время жизни пары ключ-значение истечет и она перестанет быть доступной.
`expires` служит для указания строки даты или объекта даты, после которой пара ключ-значение должна стать недоступной. Также можно указать промежуток типа `1w 2d 3h`, 
так пара ключ-значение перестанет читаться через 1 неделю (7 дней) + 2 дня + 3 часа. Доступные единицы: `y`, `m`, `w`, `d`, `h`.


