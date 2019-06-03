# class的继承

class的继承比较方便

```js
class Point {}
class ColorPoint extends Point {
    constructor(x, y, color) {
        super(x, y); // 调用父类的构造函数
        this.color = color;
    }
    toString() {
        return this.color + ' ' + super.toString();
    }
}
```

上面代码中出现的super指代父类构造函数，用来新建父类的this对象，子类必须在constructor调用super()方法，否则报错，因为子类没有自己的this对象，而是继承父类的this对象

es6的继承实质与es5的继承不同，es6是先创建父类this对象，再用子类的构造函数修改this，es5是先创建子类this对象，然后将父类方法添加上去(Parent.apply(this))

如果子类没有constructor，会添加一个默认的

## Object.getPrototypeOf

Object.getPrototypeOf方法可以用来从子类上获取父类

```js
Object.getPrototypeOf(ColorPoint) === 'Point'; // true
```

子类中调用super的话，返回的是子类的实例，即super内部的this指向的是子类，也就是super等于A.prototype.call(this);

super作为函数使用只能使用在子类的构造函数中

super作为对象时在普通方法中指向父类的原型对象，在静态方法中指向父类本身

```js
class A {
    p() {
        return 2;
    }
}

class B extends A {
    constructor () {
        super();
        console.log(this.p());
    }
}

const b = new B(); // 2
```

由于绑定子类的this，因此如果通过super对某个属性赋值，这时super就是this，赋值的属性会变成子类实例的属性

```js
class A {
    constructor () {
        this.x = 1;
    }
}
class B extends A {
    constructor () {
        super();
        this.x = 2;
        super.x = 3;

        console.log(super.x); // undefined
        console.log(this.x); // 3
    }
}
```

上述代码中，由于子类的super被赋值时候等于对this赋值，所以this.x的值是3，但是读取super.x时候读取的是A.prototype.x的值，所以是undefined;

如果super在子类静态方法中被使用，那么将指向父类，而非父类的原型

```js
class Parent {
    static method(msg) {
        console.log('static', msg);
    }
    method(msg) {
        console.log('instance', msg);
    }
}

class Child extends Parent {
    static method(msg) {
        super.method(msg);
    }
    method(msg) {
        super.method(msg);
    }
}
var c = new Child();
Child.method('test'); // static test
c.method('test'); // instance test
```

上述例子中，super在静态方法中调用的话指向父类，所以Child.method调用的就是Parent.method

super在普通方法中调用指向父类的原型，所以c.method调用的是Parent.prototype.method

## class的prototype和__proto__

子类的__proto__属性表示构造函数的继承，总是指向父类
子类的prototype的__proto__属性表示方法的继承，总是指向父类的prototype属性

```js
class A {}
class B extends A {}

B.__proto__ === A; // true
B.prototype.__proto__ === A.prototype; // true
```

因为类的继承是通过以下模式实现的

```js
class A {}
class B {}
// B的实例继承A的实例
Object.setPrototypeOf(B.prototype, A.prototype);
// B继承A的静态属性
Object.setPrototypeOf(B, A);

// setPrototypeOf方法的实现如下
function setPrototypeOf(obj, proto) {
    obj.__proto__ = proto;
    return obj;
}
```

上述继承链可以这样理解：作为一个对象，子类(B)的原型(__proto__属性)是父类(A);作为一个构造函数，子类(B)的原型(prototype属性)是父类的实例

## extends属性

```js
class B extends A {}
```

extends后面的A只要是有prototype属性的函数就可以被B继承
