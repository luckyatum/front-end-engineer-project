# generator

generator函数是一种异步编程解决方案

从语法上，可以将其理解成一种状态机，其内部挂载了多种状态

执行generator函数会返回一个遍历器对象，generator函数特征是function和函数名称之间有*号，内部使用yield定义不同的内部状态

```js
function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    yield 'ending';
}
```

generator函数调用后,返回的是一个指向函数内部状态的指针对象（遍历器对象）

generator函数遇到yield表达式就暂停执行，直接将紧随其后的表达式作为value值返回

下一次调用next方法时再往下执行，直到遇到下一条yield语句

如果没有遇到新的yield语句，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式作为返回对象的value值

## generator和iterator接口

由于iterator接口的含义就是只要[Symbol.iterator]属性存在，并且该方法执行就是返回一个遍历器对象，而generator函数执行就是返回遍历器对象，所以可以把generator函数当作[Symbol.iterator]属性值，从而使得某对象具有iterator接口

```js
var obj = {};
obj[Symbol.oterator] = function*() {
    yield 1;
    yield 2;
    yield 3;
};
[...obj]; // 1 2 3
```

## yield语句返回值

yield语句本身没有返回值，或者说返回undefined；next()方法可以传递一个参数，该参数会作为上一条yield表达式的返回值

```js
function* a() {
    var is_stop = false;
    while(!is_stop) {
        is_stop = yield 1;
    }
}
var n = a();

n.next(); // { value: 1, done: flase }
n.next(); // { value: 1, done: flase }
n.next(true); // { value: undefined, done: true }
```

上述代码中，is_stop的值是根据yield语句执行的返回值决定的，而yield语句的返回值取决于下一次调用的next函数的参数，所以只有next(true)的时候才会结束while循环

for...of循环可以遍历generator函数，利用for...of和generator实现斐波那契数列

```js
function* fibonacci() {
    let [prev, curr] = [0, 1];

    for(;;) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

for(let n of fibonacci()) {
    if (n > 1000) break;
    console.log(n);
}
```

## Generator.prototyp.throw()

Generator函数返回的遍历器对象都有一个throw方法，可以在函数体外抛出错误，然后在Generator函数体内捕获

```js
var g = function* () {
    try {
        yield;
    } catch(e) {
        console.log('内部捕获', e);
    }
};

var i = g();
i.next();

try {
    i.throw('a');
    i.throw('b');
} catch(e) {
    console.log('外部捕获', e);
}
// 内部捕获 a
// 外部捕获 b
```

上面代码中i.throw了两次，第一次被g内部的catch捕获了，第二次被外部的catch捕获

如果generator函数体内没有try/catch代码块，那么错误只能被外部捕获，同时如果错误不是i抛出，而是全局抛出的，那么generator是捕获不到的

throw方法被捕获后会执行一次next()方法

```js
var gen = function* () {
    var c = 1;
    try {
        yield console.log('a');
    } catch(e) {
        // ...
        c = 2;
    }
    yield console.log(c);
    yield console.log('c');
}
var g = gen();
g.next(); // a
g.throw(); // b
g.next(); // c
```

如果内部没有try catch代码块，错误抛出后会中断函数体的执行，否则会执行一次next()方法

## Generator.prototype.return()

返回给定的参数值，然后结束generator的执行

```js
function* gen() {
    yield 1;
    yield 2;
    yield 3;
}

var g = gen();

g.next(); // { value: 1, done: flase }
g.return('finish'); // { value: 'finish', done: true }
g.next(); // { value: undefined, done: true }
```

如果generator函数里面有try/finally代码块，那么return方法会推迟到finally代码块执行完后

```js
function* gen() {
    yield 1;
    try {
        yield 2;
        yield 3;
    } finally {
        yield 4;
        yield 5;
    }
    yield 6;
}
var g = gen();
g.next(); // { value: 1, done: flase }
g.next(); // { value: 2, done: flase }
g.return(7); // { value: 4, done: flase }
g.next(); // { value: 5, done: flase }
g.next(); // { value: 7, done: true }
```

## yield*表达式

在Generator函数内部调用另一个Generator函数，默认是没有效果的，使用yield*表达式可以在Generator函数内部调用别的Generator

```js
function* bar() {
    yield 'a';
    yield 'b';
}
function* foo() {
    yield 'x';
    yield* bar();
    yield 'y';
}
// 等同于
function* foo() {
    yield 'x';
    yield 'a';
    yield 'b';
    yield 'y';
}
// 等同于
function* foo() {
    yield 'x';
    for(let v of bar()) {
        yield v;
    }
    yield 'y';
}
```

所以事实上，yield*后面跟的是一个遍历器对象

## 使用yield*语句遍历完全二叉树

```js
// 二叉树构造函数
function Tree(left, label, right) {
    this.left = left; // 左树
    this.label = label; // 当前节点
    this.right = right; // 右树
}
// 中序遍历函数
// 由于返回的是一个遍历器，所以要用generator函数
// 函数体内使用递归算法，所以左树和右树要用yield*遍历
function* inorder(t) {
    if (t) {
        yield* inorder(t.left);
        yield t.label;
        yield* inorder(t.right);
    }
}
// 生成二叉树
function make(array) {
    // 判断是否为叶节点
    if (array.length == 1) {
        return new Tree(null, array[0], null);
    } else {
        return new Tree(make(array[0]), array[1], make(array[2]));
    }
}
let tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);

// 遍历二叉树
var result = [];
for(let node of inorder(tree)) {
    result.push(node);
}
result; // ['a', 'b', 'c', 'd', 'e', 'f', 'g']
```

## Generator与状态机

实现一个clock状态机

```js
var clock = function* () {
    while(true) {
        console.log('Tick');
        yield;
        console.log('Tock');
        yield;
    }
};
var c = clock();
c.next(); // Tick
c.next(); // Tock
c.next(); // Tick
c.next(); // ...
```

## 异步操作的同步化表达

因为yield后面的语句需要执行next()方法才会执行，所以异步操作后的操作就可以放在yield语句之后，也就是不需要回调函数了

```js
function* loadUI() {
    showLoadingScreen();
    yield loadUIDataAsync();
    hideLoadingScreen();
}
var loader = loadUI();
loader.next(); // 加载UI
loader.next(); // 卸载UI
```

```js
// generator封装ajax操作
function* main() {
    var result = yield request('http://xxx.com');
    var resp = JSON.parse(result);
    console.log(resp);
}

function request(url) {
    ajaxCall(url, function(res) {
        it.next(res);
    });
}
var it = main();
it.next();
```

利用generator函数可以在任意对象上部署iterator接口

```js
function* iterEntries(obj) {
    let keys = Object.keys(obj);
    for(let i = 0;i < keys;i++) {
        let key = keys[i];
        yield [key, obj[key]];
    }
}

let myObj = { foo: 3, bar: 7 };
for(let [key, value] of iterEntries(myObj)) {
    console.log(key, value);
}
// foo 3
// bar 7
```