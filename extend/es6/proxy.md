# Proxy

proxy可以理解为在目标对象上添加一层拦截层，所有对目标对象的get set操作都需要经过这层拦截层处理后才到达对象本身

```js
var obj = new Proxy({}, {
    get: function(target, key, receiver) {
        console.log(`getting ${key}`);
        return Reflect.get(target, key, receiver);
    },
    set: function(target, key, value, receiver) {
        console.log(`setting ${key}`);
        return Reflect.set(target, key, value, receiver);
    }
});

obj.count = 1; // setting count
obj.count; // getting key count
```

Proxy接受两个参数，第一个是要代理的目标对象，第二个是代理的操作

要是Proxy起作用，必须针对Proxy实例进行操作，而不是目标对象本身进行操作

Proxy可以进行的拦截操作如下：

1. get(target, key, recevier)，拦截对象的读取，如Proxy.foo或Proxy[foo]，最后一个参数receiver是可选对象，参见下面Reflect.get部分
2. set(target, key, value, receiver)，拦截对象的设置，如Proxy.foo = 2，返回布尔值
3. has(target, key)，拦截key in proxy的操作，返回一个布尔值
4. deleteProperty(target, key)，拦截delete proxy[key]的操作，返回一个布尔值
5. ownKeys(target)，拦截Object.getOwnPropertyNames(proxy)，Object.getOwnPropertySymbols(proxy)和Object.keys(proxy)，返回一个数组
6. getOwnPropertyDescriptor(target, key)，拦截Object.getOwnPropertyDescriptor(proxy)，返回属性的描述对象
7. defineProperty(target, key, desc),拦截Object.defineProperty(proxy, key, desc)，Object.defineProperties(proxy, descs)，返回一个布尔值
8. 。。。

如果一个对象属性不可配置(configurable)或不可写(writable)，使用proxy代理访问该属性会报错

```js
const target = Object.defineProperty({}, {
    foo: {
        value: 123,
        writable: false,
        configurable: false
    }
});
const handler = {
    get (target, key) {
        return 222;
    }
}
const proxy = new Proxy(target, handler);
proxy.foo; // error
```