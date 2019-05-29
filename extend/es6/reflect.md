# Reflect

Reflect对象设计初衷在于针对Object的某些操作，给出一致的行为，同时提供与Proxy保持统一的一套Api，使得Proxy可以方便的进行代理操作

1. 将一些明显的Object的语言内部行为提取出来，比如Object.defineProperty，目前在Object和Reflect都部署了这些方法，未来将会统一部署在Reflect上
2. 修改Object的方法返回值，使其更合理
3. 将一些命令式Object操作改成函数式

    ```js
    // 旧写法
    'assgin' in object; // true
    // 新写法
    Reflect.has(object, 'assgin'); // true
    ```

4. Reflect对象与Proxy对象方法一一对应，Proxy对象很方便就可以调用对应的Reflect方法来完成默认行为；

Reflect对象共有13个静态方法：

Reflect.get(target, key, recevier)，查找并返回target对象的key属性，没有则返回undefined

Reflect.set(target, key, value, recevier)，设置target对象的key属性为value值

Reflect.has(target, key)，对应key in target的in运算符，返回布尔值

Reflect.deleteProperty(target, key)，删除key值，删除成功或者属性不存在，返回true，删除失败或者属性仍然存在，返回false

Reflect.construct(target, args)，等同于new target(...args)，提供了一种不使用new运算符来调用构造函数的方法

Reflect.getPrototypeOf(obj)，用于读取对象的__proto__属性（__proto__属性指向构造函数的prototype对象），和Object.getPrototypeOf(obj)唯一区别是，如果参数不是对象，object.getPrototypeOf会先将这个参数转为对象，然后再运行，而Reflect.getPrototypeOf会直接报错

Reflect.setPrototypeOf(obj, newProto)，用于设置对象的__proto__属性

Reflect.apply(func, thisArg, args)，等同于Function.prototype.apply.call(func, thisArg, args)，用于绑定this对象后执行给定函数

Reflect.defineProperty(target, key, attributes)，基本等同于Object.defineProperty，后者今后可能被废弃

Reflect.getOwnPropertyDescriptor(target, key)，基本等同于Object.getOwnPropertyDescriptor，后者今后可能被废弃

Reflect.isExtensible(target)，返回一个布尔值，表示对象是否可拓展（非对象不可拓展）

Reflect.preventExtensions(target)，用于使一个对象变为不可扩展的，返回一个布尔值，表示操作是否成功

Reflect.ownKeys(target)，用于返回对象的所有属性（包括Symbol属性和普通属性，不可枚举属性等）
