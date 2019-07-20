# [js事件模型](https://segmentfault.com/a/1190000006934031)

## 观察者模式

订阅发布模式，多个观察者订阅同一个发布对象，一旦发布者状态变化，将会通知所有的订阅者，对应的订阅者会做出反应;

利用js实现的发布订阅模式

```js
var event = (function() {
    var topics = {}; // 发布者

    return {
        publish: function(topic, info) {
            if (topics.hasOwnProperty(topic)) {
                topics[topic].forEach(function(handler) {
                    handler(info ? info : {});
                });
            }
        },
        subscribe: function(topic, handler) {
            if (!topics.hasOwnProperty(topic)) {
                topics[topic] = [];
            }
            topics[topic].push(handler);
        },
        remove: function(topic, handler) {
            if (!topics.hasOwnProperty(topic)) {
                return;
            }

            var handlerIndex = -1;
            topics[topic].forEach(function(element, index) {
                if (element === handler) {
                    handlerIndex = index;
                }
            });

            if (handlerIndex >= 0) {
                topics[topic].splice(handlerIndex, 1);
            }
        },
        removeAll: function(topic) {
            if (topics.hasOwnProperty(topic)) {
                topics[topic].length = 0;
            }
        }
    };
})();
```


## 事件与事件流

事件是浏览器与文档交互的瞬间，如点击按钮，填写表格等，事件是js与html之间交互的桥梁

dom是树形结构，如果父子元素同时绑定了事件，当触发子节点时候，两个事件的触发顺序是怎样的呢，这就涉及到事件流的概念

事件流分成两种：

* 事件冒泡：从下往上的传播方式。事件由最底层的子节点开始，一层一层往上面传递，直到dom最高层的节点
* 事件捕获：从上往下的传播方式。事件由最高层的dom节点开始，一步一步往下传递，直到dom最底层节点

## 事件模型

### 1. DOM0级模型

又称原始事件模型，该模型中，事件不会传播，即没有事件流的概念

```html
<!-- 在html中直接绑定 -->
<input type="button" onclick="fun()">

<!-- 通过js代码绑定 -->
<script>
    var btn = document.getElementById('btn');
    btn.onclick = fun;
    // 移除监听函数
    btn.onclick = null;
</script>
```

### 2. IE事件模型

IE事件模型分为两个阶段：

> * 事件处理阶段。事件到达目标元素，触发目标元素的监听函数。
> * 事件冒泡阶段。事件从目标元素冒泡到document，依次检查经过的节点是否绑定了事件监听函数。

```js
// 事件绑定方式如下
attachEvent(eventType, handler);

// 事件移除方式如下
detachEvent(eventType, handler);
```

### 3. DOM2级模型

W3C标准模型，现代浏览器除了ie6，7，8外，都支持；该事件模型中，事件一共有三个阶段：

> * 事件捕获阶段。事件从document一直向下传播到目标元素，依次检查经过的节点是否绑定了监听函数，有的话就执行；
> * 事件处理阶段。事件到达目标元素，触发目标元素的监听函数；
> * 事件冒泡阶段。事件从目标元素冒泡到document元素，依次检查经过的节点是否绑定了监听函数，有的话就执行。

```js
// 事件绑定
addEventListener(eventType, handler, useCapture);

// 事件移除
removeEventListener(eventType, handler, useCapture);
```
useCapture是一个boolean用于指定是否在捕获阶段进行处理，一般设置为false与IE浏览器保持一致。

## 事件对象

当一个事件被触发时，会创建一个事件对象，这个对象里面包含了与该事件相关的属性和方法，该对象会作为第一个参数传递给监听函数

DOM模型事件对象常用属性

> * type用于获取事件类型
> * target用于获取事件目标
> * stopPropagation()阻止事件冒泡
> * preventDefault()阻止事件默认行为

IE模型事件对象常用属性

> * type用于获取事件类型
> * srcElement获取事件目标
> * cancelBubble阻止事件冒泡
> * returnValue阻止事件默认行为

## 事件代理

事件在冒泡过程中会到达父元素，因此子元素的监听函数可以绑定在父节点，由父节点的监听函数统一处理，这称为事件代理

## 自定义事件

* 首先创建一个事件

```js
var event = new Event('threeClick', {
    bubbles: true,
    cancelable: false
});
```

* 为事件注册监听函数

```js
target.addEventListener('threeClick', hello, false);
```

在合适的时机触发，使用dispatchEvent函数，该方法在当前节点触发指定事件，该方法返回一个布尔值，只要有一个监听函数调用了event.preventDefault()，则返回false，否则返回true
