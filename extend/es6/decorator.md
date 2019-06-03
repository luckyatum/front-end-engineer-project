# 修饰器

## 类的修饰

修饰器是一个函数，用来修改类的行为

```js
@testable
class MyTestableClass {
    // ...
}
function testable(target) {
    console.log(target);
    target.isTestable = true;
}
MyTestableClass.isTestable; // true
```

基本上，类的修饰器的行为等同于下面形式

```js
@decorator
class A {}
// 等同于
class A {}
A = decorator(A) || A;
```

修饰器对类的行为的改变是在代码编译时候发生的，而不是在运行时，所以，编译器本质就是编译时执行的函数

如果想要往修饰器传递参数，可以在修饰器外层再封装一层函数

```js

function testable(isTestable) {
    return function(target) {
        target.isTestable = isTestable;
    }
}

@testable(true)
class MyTestableClass {}
MyTestableClass.isTestable; // true

@testable(false)
class MyTestableClass {}
MyTestableClass.isTestable; // false
```

也就是说，上述的testable函数修改了修饰器的行为，使得其可以直接传递参数，然后返回一个执行函数，用于真正修改类的行为

## 方法的修饰

修饰器不仅可以修饰类，还可以修饰类的属性，这时候的修饰器一共可以接受三个参数，第一个是要修饰的目标对象，第二个是要修饰的属性名，第三个是该属性的描述对象

```js
class Person {
    @readonly
    name() {
        return `${this.first} ${this.last}`;
    }
}

function readonly(target, name, descriptor) {
    // descriptor 对象原来的值如下
    //{
        // value: specifiedFunction,
        // enumerable: false ,
        // configurable: true ,
        // writable: true
    //};
    descriptor.writable = false;
    return descriptor;
}
```

下面是一个输出日志的修饰器

```js
class Math {
    @log
    add(a, b) {
        return a + b;
    }
}
function log (target, name, descriptor) {
    var oldValue = descriptor.value;

    descriptor.value = function() {
        console.log(`Calling "${name}" with`, arguments);
        return oldValue.apply(null, arguments);
    }

    return descriptor;
}
const math = new Math();
math.add(2, 4);
```

上面修饰器意思是在执行oldValue方法之前，先执行一次console.log打印日志

修饰器可以起到注释作用

```js
@testable
class Person {
    @readonly
    @nonenumerable
    name() {};
}
```

从修饰器就可以看出类是可测试的，方法name是只读且不可枚举的

如果同一个方法有多个修饰器，该方法会从外到内进入修饰器，然后由内向外执行

```js
function dec(id) {
    console.log('evaluated', id);
    return (target, property, descriptor) => {
        console.log('executed', id);
    };
}

class Example {
    @dec(1)
    @dec(2)
    method() {}
}
// evaluated 1
// evaluated 2
// executed 2
// executed 1
```

上面可以看出，外层修饰器@dec(1)先进入，但是内层修饰器@dec(2)先执行
