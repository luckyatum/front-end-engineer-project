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