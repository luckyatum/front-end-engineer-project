# Symbol

Symbol用于属性键，该类型与原本的字符串类型键共同作为属性的键类型

Symbol表示独一无二的，与undefined、null、number、string、boolean和object共同组成js数据类型

Symbol属性由Symbol函数产生，如果一个对象的属性是Symbol类型的，那么该属性绝对是独一无二的

Symbol函数可以接受一个字符串作为参数，作为该symbol值的描述

```js
var s1 = Symbol('foo');
var s2 = Symbol('bar');
s1.toString(); // Symbol(foo)
s2.toString(); // Symbol(bar)
```

Symbol不能与其他类型的值进行运算，否则会报错

```js
var s = Symbol('test Symbol');
'this is a symbol' + s; // error
`this is a symbol ${s}`; // error
```

但是Symbol可以使用toString方法转化为字符串

```js
var s = Symbol('test Symbol');
'this is a symbol ' + s.toString(); // this is a symbol Symbol('test Symbol')
```

Symbol也可以转为布尔值

```js
var s = Symbol('boolean symbol');
Boolean(s); // true
```

Symbol用于对象的属性值

```js
var s = Symbol();
// 写法1
var obj = {
    [s]: 'hello'
};
// 写法2
obj[s] = 'hello';
// 写法3
Object.defineProperty(obj, Symbol, {value: 'hello'});
// 上面三种写法结果相同
obj[s]; // hello
```

Symbol作为属性不能使用点运算符

Symbol可以定义常量，并且保证这组常量的值都是不相等的

```js
log.level = {
    DEBUG: Symbol('debug'),
    INFO: Symbol('info'),
    WARN: Symbol('warn')
}
```

对于对象属性Symbol，普通的for...in，for...of无法遍历出来，Object.keys()，Object.getOwnPropertyNames()也无法返回，可以通过Object.getOwnPropertySymbols()得到所有的Symbol属性，也可以通过新的API Reflect.ownKeys(Obj)获取对象所有的属性，包括普通属性和Symbol属性

Symbol.for()，Symbol.keyFor()，有时候我们希望使用原有的Symbol值，可以使用for()方法查找

```js
var s1 = Symbol.for('foo');
var s2 = Symbol.for('foo');

s1 === s2; // true
```

Symbol()方法和Symbol.for()方法都会产生一个新的Symbol值，唯一区别在于，for()方法在创建新的Symbol值之前，会先检查全局是否存在同样参数的Symbol.for()生成的Symbol值，存在的话直接返回该值

Symbol.keyFor()返回已经登记的一个Symbol的描述值

```js
var s1 = Symbol.for('foo');
Symbol.keyFor(s1); // foo

var s2 = Symbol('foo');
Symbol.keyFor(s2); // undefined
```

Symbol内置一些属性值，用于某些行为的判断等操作

Symbol.isConcatSpreadable，表示当对象执行Array.prototype.concat()方法时候是否可以展开

```js
// 默认数组行为
var arr1 = ['a', 'b'];
['c', 'd'].concat(arr1, 'e'); // ['c', 'd', 'a', 'b', 'e']

// 添加Symbol.isConcatSpreadable属性后的行为
var arr1 = ['a', 'b'];
arr1[Symbol.isConcatSpreadable] = false;
['c', 'd'].concat(arr1, 'e'); // ['c', 'd', ['a', 'b'], 'e']
```

类似数组的对象也是可以展开的，但是对象默认的Symbol.isConcatSpreadable属性是false的，必须手动打开

```js
// 默认对象行为
var obj = {length: 2, 0: 'a', 1: 'b'};
['c', 'd'].concat(obj, 'e'); // ['c', 'd', obj, 'e']

// 添加Symbol.isConcatSpreadable属性后的行为
var obj = {length: 2, 0: 'a', 1: 'b'};
obj[Symbol.isConcatSpreadable] = true;
['c', 'd'].concat(obj, 'e'); // ['c', 'd', 'a', 'b', 'e']
```

Symbol.match，该属性指向一个函数，如果调用string.match(myObject)时，如果该属性存在，则会执行该函数

```js
String.prototype.match(regexp);
// 等同于
regexp[Symbol.match](this);

// 包含一个类的例子
class MyMatcher {
    [Symbol.match] (string) {
        return 'hello world'.indexOf(string);
    }
}
'e'.match(new MyMatcher()); // 1
```

Symbol.replace，该属性指向一个函数，如果调用string.replace(myObject)时，如果该属性存在，则会执行该函数

```js
String.prototype.replace(searchValue, replaceValue);
// 等同于
searchValue[Symbol.replace](this, replaceValue);

// 例子
const obj = {};
obj[Symbol.replace] = (...s) => console.log(s);
'hello'.replace(obj, 'world'); // ['hello', 'world']
```

Symbol.replace会接受到两个参数，第一个是当前作用的对象（上述例子是'hello'），第二个是'world'

还存在Symbol.search、Symbol.split、Symbol.iterator、Symbol.toPrimitive、Symbol..toStringTag、Symbol.unscopables等API，使用差不多