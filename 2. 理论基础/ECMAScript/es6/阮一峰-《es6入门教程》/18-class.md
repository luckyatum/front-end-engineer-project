# class语法

定义一个类

```js
class Point {
    constructor (x, y) {
        this.x = x;
        this.y = y;
    }
    toString () {
        return '(' + this.x + ', ' + this.y + ')';
    }
}
typeof Point; // function
Point === Point.prototype.constructor; // true

var pointInstance = new Point(1, 2);
```

constructor就是构造函数，this表示实例对象，还定义了方法toString

上述代码表明，类的数据类型就是函数，类本身指向构造函数

使用时候也是直接使用new，和构造函数用法一致，类的所有方法都定义在构造函数的prototype属性上

类的内部定义的方法都是不可枚举的

```js
class Point {
    constructor () {
        // ...
    }
    toString() {
        // ...
    }
}
Object.keys(Point.prototype); // []
Object.getOwnPropertyNames(Point.prototype); // ['constructor', 'toString']
```

class使用表达式形式的时候，后面可以添加名称，用于class内部使用

```js
var MyClass = class Me {
    getName () {
        return Me.name;
    }
}
```

类的声明不会存在变量提升

## 私有方法

class内部无法定义私有方法，所以所有的方法外部都可以访问得到

```js
// 方法1
class widget {
    // 公有方法
    foo(baz) {
        this._bar(baz);
    }
    // 私有方法
    _bar(baz) {
        return this.snaf = baz;
    }
}
```

方法1是通过添加_下划线方式定义私有方法，这只是一种命名约定，外部仍然可以使用该方法

```js
// 方法2
class widget {
    foo(baz) {
        bar.call(this, baz);
    }
}
function bar(baz) {
    return this.snaf = baz;
}
```

方法2是直接将私有方法移除到类之外，外部无法访问

```js
// 方法3
const bar = Symbol('bar');
const snaf = Symbol('snaf');
export default class widget {
    foo(baz) {
        this[bar](baz);
    }
    [bar](baz) {
        return this[snaf] = baz;
    }
}
```

方法3是将私有方法定义为Symbol值，外部无法获取bar和snaf值，所以可以看作是私有方法

## 私有属性

es6不支持私有属性，目前有提案是在变量前加#标记为私有属性

## this指向

类的内部使用this，将会默认指向类的实例，但是如果单独使用该方法，会出错

```js
class Logger {
    printName (name = 'there') {
        this.print(`hello ${name}`);
    }

    print(text) {
        console.log(text);
    }
}

var log = new Logger();
const {printName} = log;
printName(); // error
```

解决方案一是构造函数中绑定该方法的this

```js
class Logger {
    constructor () {
        this.printName = this.printName.bind(this);
    }
    // ...
}
```

解决方案二是使用箭头函数

```js
class Logger {
    constructor() {
        this.printName = (name = 'there') => {
            this.print(`hello ${name}`);
        };
    }
    // ...
}
```

类的内部可以使用get和set关键字对某个属性设置存值函数和取值函数，用于拦截该属性的存取行为

```js
class MyClass {
    constructor() {
        // ...
    }
    get prop() {
        return 'getter';
    }
    set prop(value) {
        console.log(`setter: ${value}`);
    }
}
```

如果某个方法前加上星号（*），表示该方法是一个Generator函数

```js
class Foo {
    constructor(...args) {
        this.args = args;
    }
    *[Symbol.iterator]() {
        for(let arg of this.args) {
            yield arg;
        }
    }
}
```

## class的静态方法

如果在类的方法前加上一个static，该方法不会被实例所继承，而是直接通过类调用

```js
class Foo {
    static classMethod() {
        console.log('static');
    }
}
Foo.classMethod(); // static
```

父类静态方法可以被子类继承

```js
class Foo {
    static classMethod() {
        console.log('父亲');
    }
}

class Son extends Foo {
}
Son.classMethod(); // 父亲
```

子类还可以从super对象调用

```js
class Foo {
    static classMethod() {
        return 'father';
    }
}
class Son extends Foo {
    static classMethod() {
        return super.classMethod() + ',foo';
    }
}
Son.classMethod(); // father,foo
```

类暂无静态属性

## new.target属性

构造函数内部，可以使用new.target获取当前构造函数的名称，如果不是通过new调用的，那么会返回undefined，可以通过这个属性得知当前构造函数的调用方式，class构造函数内部使用new.target，返回当前class名称