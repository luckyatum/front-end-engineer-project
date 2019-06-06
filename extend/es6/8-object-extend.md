# 对象的扩展

es6允许将变量直接写入对象，简洁表示

```js
var foo = 'bar';
var baz = { foo };
// { foo: 'bar' }
// 等同于
var baz = { foo: foo };
```

es6允许方法简写

```js
var obj = {
    method () {}
}
// 等同于
var obj = {
    method: function() {}
}
```

es6允许在对象内部使用表达式定义键名

```js
var a = 'ss';
var b = 'ff';
var obj = {
    [a]: '123',
    [a + b]: '4'
};
// { ss: '123', ssff: '4' }
```

表达式还可以用于方法名

```js
let a = 's';
let b = 'fgc';
let obj = {
    [a + b] () {}
};
// {sfgc: f}
```

## 如果表达式中变量为一个对象，那么会先将其转换为[object object]

对象的方法也有name属性，一般是返回方法名

```js
let obj = {
    test () {}
}
obj.test.name; // test
```

如果对象方法使用了取值存值函数（get set），那么name属性不是在该方法上，而是在对象的get和set属性上，并且返回的名称带有get和set前缀

```js
const obj = {
    get foo() {},
    set foo() {}
}
obj.foo.name; // TypeError: Can't read property 'name' of undefined

const descriptor = Object .getOwnPropertyDescriptor(obj ,’foo ’);
descriptor.get.name; // get foo
descriptor.set.name; // set foo
```

如果对象方法是一个symbol值，则name属性返回的是对应symbol值的描述

```js
const key1 = Symbol('description');
const key2 = Symbol();
let obj = {
    [key1]() {},
    [key2]() {}
};
obj[key1],name; // 'description'
obj[key2],name; // ''
```

Object.is()，用于比较两个值是否严格相等，与'==='行为基本一致

```js
Object.is('foo', 'foo'); // true
Object.is({}, {}); // false

// 与===不同的两个地方在于，+0和-0不相等，NaN等于其自身
+0 === -0; // true
Object.is(+0, -0); // false

NaN === NaN; // false
Object.is(NaN, NaN); // true
```

Object.assgin()，用于将源对象所有可枚举属性复制到目标对象

```js
let target = {a: 1};

let source1 = {b: 2};
let source2 = {c: 3};

Object.assgin(target, source1, source2);
// { a: 1, b: 2, c: 3};
```

如果源对象或者多个源对象属性和目标对象相同，则后面属性会覆盖前面属性

```js
let target = {a: 1, b: 1};

let source1 = {b: 2, c: 2};
let source2 = {c: 3};

Object.assgin(target, source1, source2);
// { a: 1, b: 2, c: 3};
```

如果只有一个参数，则返回该对象

```js
Object.assgin(obj) === obj; // true
```

如果第一个参数不是对象，则会先转换成对象

```js
typeof Object.assgin(2); // object
```

如果第一个参数是undefined或者null，则会报错

```js
Object.assgin(undefined); // error
Object.assgin(null); // error
```

Object.assgin执行的是浅复制，如果源对象某个属性值是对象，那么目标对象得到的是该对象的引用

```js
var source = {
    a: 1,
    b: {
        c: 2
    }
};
var obj2 = Object.assign({} , objl);
obj1.b.c = 3;
obj2.b.c; // 3
```

嵌套对象中，一旦遇到同名属性，assgin会直接替换整个对象

```js
var target = {
    a: 1,
    b: {
        c: 2,
        d: 3
    }
};
var source = {
    a: 2,
    b: {
        c: 'hello'
    }
};
Object.assgin(target, source);
// { a: 2, b: { c: 'hello' } }
```

上面的b嵌套对象直接被替换掉，而不是替换成{c: 'hello', d: 3 }的形式，需要注意

Object.assgin还可以处理数组，会按照序号0,1,2处理合并，其实相当于把数组当作对象，0,1,2当作键名来处理

## 属性的遍历

1. for...in 遍历对象自身和继承的可枚举属性
2. Object.keys() 返回一个数组，包含自身所有可枚举属性（不含Symbol属性）
3. Object.getOwnPropertyNames(obj) 返回一个数组，包含对象自身所有属性（不含Symbol属性，但是包括不可枚举属性）
4. Object.getOwnPropertySymbols(obj) 返回一个数组，包含对象自身所有Symbol属性
5. Reflect.ownKeys(obj) 返回一个数组，包含对象自身所有属性（Symbol属性或者不可枚举属性）

Object.keys()、Object.values()和Object.entries()，三个均返回一个数组，可使用for...of遍历结果

Object.keys()返回一个数组，成员是参数对象的（不含继承）所有可遍历的属性的键名

Object.values()返回一个数组，成员是参数对象的（不含继承）所有可遍历的键值

```js
var obj = {
    100: 'a',
    2: 'b',
    7: 'c'
};
Object.values(obj); // b c a
```

values返回的顺序取决于数值的键名

Object.entries()返回一个数组，成员是参数对象的（不含继承）所有可遍历的键值对

```js
var obj = {
    100: 'a',
    2: 'b',
    7: 'c'
};
Object.entries(obj); // [[2, 'b'], [7, 'c'], [100, 'a']]
```

entries()和表现values基本一致

对象的扩展运算符(...)

```js
let {x, y, ...z} = { x: 1, y: 2, a: 3, b: 4};
z // {a: 3, b: 4}
```

扩展运算符作用在解构赋值时候把尚未读取的属性放到一个对象中

扩展运算符必须在解构赋值的最后一个对象，否则会出错

```js
let {x, ...y, z} = { x: 1, y: 2, a: 3, b: 4}; // error
```

解构赋值也是浅复制，如果某个值里面是一个对象，那么获取的值是该对象的一个引用

Null传导运算符用于解决多层属性嵌套判断是否存在问题

```js
// 传统写法
const firstName = (message
    && message.body
    && message.body.user
    && message.body.user.firstName) || 'default';

// 使用Null传导运算符的写法
const firstName = message?.body?.user?.firstName || 'default';
```

上述代码只要其中一个返回null或undefined，就不再继续运算，而是返回undefined

Null传导运算有4种用法：

1. obj?.prop 读取对象属性
2. obj?.[expr] 同上
3. func?.(...args) 函数或对象方法调用
4. new C?.(...args) 构造函数调用
