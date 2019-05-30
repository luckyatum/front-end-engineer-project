# Iterator和for...of

js原有表示'集合'概念的有Array和Object，后面es6增加了Set和Map，因此需要一个统一的接口机制来处理不同的数据结构

iterator接口一旦部署了，就可以依次访问某集合的元素

iterator便利过程：

1. 创建一个指针对象，指向当前数据结构的起始位置
2. 第一次调用指针对象的next()方法，指针指向数据结构的第一个成员
3. 第二次调用next()方法，指针指向第二个成员
4. 不断调用next()方法，直到它指向数据结构的结束位置

每次调用next()方法都会返回两个值，分别是遍历成员和done布尔值（用于标识遍历是否已经结束）

es6规定，默认的iterator接口部署在Symbol.iterator属性，也就是说，只要一个数据接口具有Symbol.iterator属性，就可以认为是可遍历的，for...of循环可以遍历

原生部署了Symbol.iterator接口的数据结构有

* Array
* Map
* Set
* String
* TypedArray
* 函数的argument对象
* NodeList对象

[Symbol.iterator]属性会返回一个遍历器，其核心特征就是拥有next()方法，用于遍历成员

对于对象，类数组结构的对象可以直接部署数组[Symbol.iterator]并使用

```js
var obj = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3,
    [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for(var o of obj) {
    console.log(o); // a b c
}
// 非类数组结构对象无效果
var obj = {
    a: 'a',
    b: 'b',
    c: 'c',
    length: 3,
    [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for(var o of obj) {
    console.log(o); // undefined undefined undefined
}
```

上述类数组对象也可以直接使用Array.from()函数转换成真正的数组

```js
var obj = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3
};
for(var o of Array.from(obj)) {
    console.log(o); // a b c
}
```

部署了iterator接口（添加了[Symbol.iterator]属性）就可以使用for...of循环遍历成员，也可以使用while循环

## 默认调用iterator接口的场合（调用[Symbol.iterator]属性的方法）

1. 解构赋值，对数组和Set结构进行解构赋值，会调用Symbol.iterator方法

    ```js
    let set = new Set().add('a').add('b').add('c');
    let [x, y] = set;
    // x = 'a', y = 'b';

    let [first, ...rest] = set;
    // first = 'a' rest = ['b', 'c']
    ```

2. 扩展运算符(...)也会调用默认的运算符

    ```js
    var str = 'hello';
    [...str]; // ['h', 'e', 'l', 'l', 'o']
    ```

    实际上，只要拥有iterator接口，就可以使用...运算符将其变成数组

3. yield*，后面跟的是一个可遍历的结构

    ```js
    let generator = function*() {
        yield 1;
        yield* [2, 3, 4];
        yield 5;
    };

    let iterator = generator();
    iterator.next(); // {value: 1, done: flase}
    iterator.next(); // {value: 2, done: flase}
    iterator.next(); // {value: 3, done: flase}
    iterator.next(); // {value: 4, done: flase}
    iterator.next(); // {value: 5, done: flase}
    iterator.next(); // {value: undefined, done: true}
    ```

4. 使用数组作为参数的场合

    * for...of
    * Array.from()
    * Map()、Set()、WeakMap()和WeakSet()
    * Promise.all()
    * Promise.race()

## 字符串的iterator接口

原生字符串对象也有iterator接口

```js
var str = 'abc';
var i = str[Symbol.iterator];
i.next(); // {value: 'a', done: flase}
i.next(); // {value: 'b', done: flase}
i.next(); // {value: 'c', done: flase}
i.next(); // {value: undefined', done: true}
```

通过修改原生Symbol.iterator属性可以修改遍历器

```js
var str = 'abc';
str[Symbol.iterator] = function() {
    return {
        next: function() {
            if (this._first) {
                this._first = false;
                return { value: 'bye', done: false };
            } else {
                return { done: true };
            }
        },
        _first: true
    };
};
```

iterator最简单实现是generator函数

```js
var myIterator = {};
myIterator[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
};
[...myIterator]; // 1 2 3
```

遍历器对象除了拥有next()方法，还有return()、throw()方法，自身部署遍历器函数必须实现next方法，但是剩下的方法是可选的

return方法使用场合通常是for...of提前退出（出错或者break、continue语句）

```js
function readLineSync(file) {
    return {
        next: function() {
            return { done: true };
        },
        return: function() {
            file.close();
            return { done: true };
        }
    };
}
```

上述代码中，一旦遍历提前退出，就会触发return方法，关闭文件

throw主要是配合generator函数使用
