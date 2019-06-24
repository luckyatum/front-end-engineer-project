# [深入理解javascript的5种继承方式](https://blog.csdn.net/u014787301/article/details/52203696)

1. 构造函数式

```js
function Super(color) {
    this.color = color;
}
// 继承
function Sub(color) {
    Super.call(this, color);
}

var sub1 = new Sub('red');
console.log(sub1.color); // red
```

构造函数是假借Super的构造函数，利用子类来执行，从而使得子类对象有了Super构造函数的属性

缺点，方法不共享，每个实例在内存有一份自己的拷贝，所以对父类方法的修改没办法共享到所有子类身上，同时消耗内存

2. 原型链式

```js
 function  Super(){
        this.colors = ['c','a','b'];
        this.print = function(){
            console.log(this.colors);
        }
    }
    function Sub(){
    }
    Sub.prototype = new Super();

    var instance1 = new Sub();
    instance1.colors.push('v');
    console.log(instance1.colors);   //c,a,b,v

    var instance2 = new Sub();
    console.log(instance2.colors);//c a b v
```

根据原型链的特性，如果一个方法或者属性在当前对象找不到，则沿着其原型链往上寻找，直到找到为止

所以将子类原型指向父类实例，可以实现父类实例一个方法所有子类共享，子类也可以重写自己的方法

但是父类的实例的基本属性也被所有对象共享，所以一旦某一个子类将其修改了，那么所有的子类属性都会被修改

3. 组合式

```js
function Super() {
    this.colors = ['c','a','b'];
}
Super.prototype.print = function(){
    console.log(this.colors);
};
function Sub(){
    Super.call(this);
}
Sub.prototype = new Super();
Sub.prototype.constructor = Sub;

var instance1 = new Sub();
instance1.colors.push('v');
console.log(instance1.colors);  //a b c v

var instance2 = new Sub();
console.log(instance2.colors);   //a b c 
```

组合式继承采用了原型链和构造函数继承结合

把希望子类继承的属性，并且所有子类不共享的属性放到父类构造函数

把希望所有子类共享的方法或者属性，放到父类的原型

4. Object.create式（寄生式）

```js
var sup = {
    colors : ['c','a','b']
};

var instance1 = Object.create(sup);
instance1.colors.push('v');
console.log(instance1.colors);    //a b c v

var instance2 = Object.create(sup);
console.log(instance2.colors);    //a b c v
```

基本上等于原型继承，所以也是所有属性和方法共享，不同点是不需要构造函数来表示一个类，通过类去创建一个对象

5. 寄生组合式

```js
 function  Super() {
    this.colors = ['c','a','b'];
}
Super.prototype.print = function() {
    console.log(this.colors);
};
function Sub(){
    Super.call(this);
}
var proto = Object.create(Super.prototype);
proto.constructor = Sub;
Sub.prototype = proto;


var instance1 = new Sub();
instance1.colors.push('v');
console.log(instance1.colors); //a b c v

var instance2 = new Sub();
console.log(instance2.colors);//a b c
```

组合继承有一个最大的问题，在于Sub.prototype = new Super();的时候，新建了一个父类的实例，所有父类中的所有属性在Sub的原型对象上也拷贝了一份，但是寄生组合式就使用Object.create生成对象，不会拷贝原有对象
