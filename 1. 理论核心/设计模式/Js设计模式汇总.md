# [JavaScript设计模式总结](https://juejin.im/post/5c984610e51d45656702a785)

## 设计模式目的

为了更好的代码重用性、可读性、可维护性。

## 六大原则

1. 单一职责原则
2. 里氏替换原则
3. 依赖倒转原则
4. 接口隔离原则
5. 最少知识原则
6. 开放封闭原则

## 设计模式分类

### 创建型模式

工厂方法模式、抽象工厂模式、单例模式、建造者模式、原型模式

### 结构型模式

适配器模式、装饰器模式、代理模式、外观模式、桥接模式、组合模式、享元模式

### 行为型模式

策略模式、模板方法模式、观察者模式、迭代子模式、责任链模式、命令模式、备忘录模式、状态模式、访问者模式、中介者模式、解释器模式

### 其他模式

并发行模式、线程池模式

## js常用的设计模式

### 1. 工厂模式

> 常见的实例化对象模式，相当于创建实例对象的new，提供一个创建对象的接口

```js
  // 某个需要创建的对象
  class Product {
    constructor (name) {
      this.name = name;
    }

    init () {}
  }

  // 工厂对象
  class Creator {
    create (name) {
      return new Product(name);
    }
  }

  const creator = new Creator();
  const p = creator.create('myName');
```

### 2. 单例模式

> 保证一个类仅有一个实例，并提供一个访问它的全局访问点

```js
  // 单例对象
  class SingleObject {
    login() {}
  }

  // 访问方法
  SingleObject.getInstance = (function() {
    let instance;

    return function() {
      if (!instance) {
        instance = new SingleObject();
      }
      return instance;
    }
  })();

  const obj1 = SingleObject.getInstance();
  const obj2 = SingleObject.getInstance();

  // obj1 === obj2  true
```

### 3. 适配器模式

> 用来解决两个接口不兼容问题，有一个对象包装不兼容的对象

```js
  class Adapter {
    specificRequest() {
      return '德国标准插头'
    }
  }

  // 适配器对象
  class Target {
    constructor () {
      this.adapter = new Adapter();
    }

    request () {
      const info = this.adapter.specificRequest();
      console.log(`${info} — 转换器 — 中国标准插头`);
    }
  }

  const target = new Target();
  console.log(target.request()); // 德国标准插头 - 转换器 - 中国标准插头
```

### 4. 装饰器模式

> 在不改变自身的基础上，动态给对象增加某个功能

```js
  class Plane {
    fire() {
      console.log('发送普通子弹');
    }
  }

  // 装饰过的对象
  class Missile {
    constructor(plane) {
      this.plane = plane;
    }

    fire() {
      this.plane.fire();
      console.log('发射导弹');
    }
  }

  let plane = new Plane();
  plane = new Missile(plane);

  plane.fire();
  // 发送普通子弹
  // 发射导弹
```

### 5. 代理模式

> 为其他对象提供一种代理，便于控制这种对象的访问

```js
  class Flower {}

  // 源对象
  class Jack {
    constructor (target) {
      this.target = target;
    }

    sendFlower (target) {
      const flower = new Flower();
      this.target.receiveFlower(flower);
    }
  }

  // 目标对象
  class Rose {
    receiveFlower(flower) {
      console.log('收到花: ', flower);
    }
  }

  // 代理对象
  class ProxyObj {
    constructor () {
      this.target = new Rose();
    }

    receiveFlower(flower) {
      this.sendFlower(flower);
    }

    sendFlower (flower) {
      this.target.receiveFlower(flower);
    }
  }

  const proxyObj = new ProxyObj();
  const jack = new Jack(proxyObj);
  jack.sendFlower(proxyObj); // 收到花：[object Object]
```

### 6. 外观模式

> 为一组复杂的子系统接口提供一个更高级的统一接口，通过这个接口使得对子系统接口的访问更容易，不符合单一职责原则和开放封闭原则

```js
  class A {
      eat () {}
  }
  class  B {
      eat () {}
  }
  class C {
      eat () {
          const a = new A();
          const b = new B();
          a.eat();
          b.eat();
      }
  }
  // 跨浏览器事件侦听器
  function addEvent(el, type, fn) {
      if (window.addEventListener) {
          el.addEventListener(type, fn, false);
      } else if (window.attachEvent) {
          el.attachEvent('on' + type, fn);
      } else {
          el['on' + type] = fn;
      }
  }
```

### 7. 观察者模式

> 定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知

```js
  class Subject {
    constructor () {
      this.state = 0;
      this.observers = [];
    }
    getState () {
      return this.state;
    }
    setState (state) {
      this.state = state;
      this.notify();
    }
    notify () {
      this.observers.forEach(observer => {
        observer.update();
      })
    }
    attach (observer) {
      this.observers.push(observer);
    }
  }


  class Observer {
    constructor (name, subject) {
      this.name = name;
      this.subject = subject;
      this.subject.attach(this);
    }
    update () {
      console.log(`${this.name} update, state: ${this.subject.getState()}`);
    }
  }

  let sub = new Subject();
  let observer1 = new Observer('o1', sub);
  let observer2 = new Observer('o2', sub);

  sub.setState(1);
```

### 8. 迭代器模式

> 提供一种方法顺序访问一个聚合对象中各个元素, 而又无须暴露该对象的内部表示

内部迭代器：内部已经定义好迭代规则，外部只需要调用一次即可

```js
  const each = (args, fn) => {
    for (let i = 0, len = args.length; i < len; i++) {
      const value = fn(args[i], i, args);

      if (value === false) break;
    }
  }
```

外部迭代器：必须显示的请求迭代下一个元素

```js
  // 迭代器
  class Iterator {
    constructor (list) {
      this.list = list;
      this.index = 0;
    }
    next () {
      if (this.hasNext()) {
        return this.list[this.index++]
      }
      return null;
    }
    hasNext () {
      if (this.index === this.list.length) {
        return false;
      }
      return true;
    }
  }
  const arr = [1, 2, 3, 4, 5, 6];
  const ite = new Iterator();

  while(ite.hasNext()) {
    console.log(ite.next()); // 依次打印 1 2 3 4 5 6
  }
```

### 9. 状态模式

> 关键是区分事物内部的状态，事物内部状态往往会带来事物的行为改变，即允许对象在内部状态发生改变时改变它的行为

```js
  // 红灯
  class RedLight {
    constructor (state) {
      this.state = state;
    }
    light () {
      console.log('turn to red light');
      this.state.setState(this.state.greenLight)
    }
  }
  // 绿灯
  class greenLight {
    constructor (state) {
      this.state = state;
    }
    light () {
      console.log('turn to green light');
      this.state.setState(this.state.yellowLight)
    }
  }
  // 黄灯
  class yellowLight {
    constructor (state) {
      this.state = state;
    }
    light () {
      console.log('turn to yellow light');
      this.state.setState(this.state.redLight)
    }
  }
  class State {
    constructor () {
      this.redLight = new RedLight(this)
      this.greenLight = new greenLight(this)
      this.yellowLight = new yellowLight(this)
      this.setState(this.redLight) // 初始化为红灯
    }
    setState (state) {
      this.currState = state;
    }
  }
  const state = new State();
  state.currState.light() // turn to red light
  setInterval(() => {
    state.currState.light() // 每隔3秒依次打印红灯、绿灯、黄灯
  }, 3000)
```
