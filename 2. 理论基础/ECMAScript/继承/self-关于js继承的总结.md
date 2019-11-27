# 关于js继承的总结

js继承总共分为5种，包括构造函数式继承、原型链式继承两种最基本继承方式，组合式继承是前两者的结合；

剩下两种是寄生式继承和寄生组合式继承（es6继承使用的是寄生组合式继承）；

## 1. 构造函数式继承

```js
// 父类构造函数
function Parent(color) {
    this.color = color;
    this.print = function() {
        console.log(this.color);
    }
}
// 子类构造函数
function Son(color) {
    Parent.call(this, color);
}

// 测试
var son1 = new Son('red');
son1.print(); // red

var son2 = new Son('blue');
son2.print(); // blue
```

上述是构造函数式继承的完整实现，也就是子类创建实例时候通过调用父类构造函数从而创建包含父类属性的子类对象

优势：子类各实例之间的属性不共享，每一个子类对象都有自己的属性；

缺点：父类的公共方法没有实现共享，也就是将来如果父类修改了自身方法的实现，已经创建的子类对象并不会修改，因为每一个子类对象的方法都是私有的；

还有一个缺点就是每个子类对象都将父类的属性方法拷贝了一份，一定程度上耗费内存。

## 2. 原型链继承

```js
function Parent() {
    this.color = 'red';
    this.print = function() {
        console.log(this.color);
    }
}
function Son() {
}
Son.prototype = new Parent();
Son.prototype.constructor = Son;

var son1 = new Son();
son1.print(); // red

var son2 = new Son();
son2.color = 'blue';
son2.print(); // blue
```

利用原型链的特点，一个变量在某个对象中找不到的时候，会沿着原型链往上级查找，直到找到为止；

优势：很好的实现了父类方法的共享，将来父类修改方法子类对象也会对应的使用更新的方法；
缺点：所有挂载在原型链上的属性都被共享了，一旦某个子类修改了属性，其他的所有子类的属性也被修改掉了；

## 3. 组合式继承

组合式继承是结合了构造函数式继承和原型链式继承的优点，实现了较为理想的继承方式

```js
function Parent(color) {
    this.color = color;
}
Parent.prototype.print = function() {
    console.log(this.color);
}
function Son(color) {
    Parent.call(this, color);
}
Son.prototype = new Parent();
Son.prototype.constructor = Son;

var son1 = new Son('red');
son1.print(); // red

var son2 = new Son('blue');
son2.print(); // blue
```

私有属性，希望子类继承但是不共享的属性放在父类构造函数；

公共方法，希望子类继承同时共享的方法放在父类原型对象上；

子类构造函数调用父类构造函数创建实例，同时子类原型指向父类实例，这样子类对象既有父类构造函数时候赋予的属性，也能访问到父类原型链上的公共方法；

优点：基本实现了继承，子类也可以重载父类的公共方法实现（子类对象上有该方法则不会去访问原型）

缺点：Son.prototype = new Parent();这个语句的时候，执行了一遍父类构造函数，同时新建了父类实例，但是其实这个父类对象我们是用不上的，目的只是为了把子类原型指向**以父类为原型**的对象（也就是父类实例）上；一旦父类对象比较大，或者执行父类构造函数比较耗时，那么这对内存或者程序运行都是一种浪费；

## 4. 寄生式继承

```js
var obj = {
    color: 'red',
    print: function() {
        console.log(this.color);
    }
};

var son1 = Object.create(obj);
son1.print(); // red

var son2 = Object.create(obj);
son2.print(); // red
```

寄生式继承本质上就是原型链式继承，Object.create(obj)方法意思是以obj为原型构造对象，所以寄生式继承不需要构造函数，但是同样有着原型式继承的优缺点。

## 5. 寄生组合式继承

```js
function Parent(color) {
    this.color = color;
}
Parent.prototype.print = function() {
    console.log(this.color);
}
function Son(color) {
    Parent.call(this, color);
}
Son.prototype = Object.create(Parent.prototype);
Son.prototype.constructor = Son;

var son1 = new Son('red');
son1.print(); // red

var son2 = new Son('blue');
son2.print(); // blue
```

寄生组合式继承是目前最为理想的继承方式，它解决了组合式继承的缺点，利用Object.create()构造父类实例来作为子类原型对象，其他优势则和组合继承一样。

## 6. 特别点

Object.create(obj)也可以使用es5的方法替代，如下：

```js
function objectCreate(obj) {
    var G = function () {};
    G.prototype = obj;
    return new G();
}

// 使用的时候
function Parent(color) {
    this.color = color;
}
Parent.prototype.print = function() {
    console.log(this.color);
}
function Son(color) {
    Parent.call(this, color);
}
Son.prototype = objectCreate(Parent.prototype);
Son.prototype.constructor = Son;

var son1 = new Son('red');
son1.print(); // red

var son2 = new Son('blue');
son2.print(); // blue
```
