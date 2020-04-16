# [Redux 入门教程（一）：基本用法](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)

## 前言

react只是dom的一个抽象层，并不是web的完整解决方案，它有两个方面没有涉及：

* 代码结构;
* 组件之间的通信；

上述两个方面对于大型应用来说是必须的，因此react无法写大型应用；

## 是否需要redux

以下的情形你可能不需要引入redux:

* 用户的使用方式非常简单；
* 用户之间没有协作；
* 不需要与服务器大量交互，也没有使用webSocket;
* 视图层只从单一来源获取数据；

但是如果有以下的场景，则表示需要redux：

* 用户的使用方式复杂；
* 不同身份的用户有不同的使用方式；
* 多个用户之间可以协作；
* 与服务器大量交互，或者使用了webSocket；
* view要从多个来源获取数据；

从组件角度，如果你的组件有以下的场景，可以考虑使用redux：

* 某个组件的状态需要共享；
* 某个状态需要在任何地方都可以拿到；
* 一个组件需要改变全局状态；
* 一个组件需要改变另一个组件的状态；

上述情况，你需要一个地方来统一管理状态，修改状态，读取状态。

## redux设计思想

1. web应用是一个状态机，视图与状态是一一对应的；
2. 所有的状态保存在一个对象里面；

## 基本概念和API

1. Store

    Store就是保存数据的地方，你可以把它看作一个容器，整个应用只能有一个Store；

    Redux提供createStore这个函数来生成Store；

    ```js
    import { createStore } from 'redux';
    const store = createStore(fn);
    ```

2. State

    Store对象包含所有数据，如果想得到某个时点的数据，就要对Store产生快照，这种时点数据的集合，就叫State。当前时刻的Store，可以通过store.getState()得到；

    ```js
    import { createStore } from 'redux';

    const store = createStore(fn);
    const state = store.getState();
    ```

    Redux规定，一个State只能对应一个View，只要State相同，View就相同。

3. Action

    State的变化，会导致View的变化。但是用户接触不到State，只能接触到View。所以，State的变化必然是View导致的，Action就是View发出的通知，表示State应该要变化了。

    Action是一个对象，其中type属性是必须的，表示Action的名称。

    ```js
    const action = {
        type: 'ADD_TODO',
        payload: 'Learn Redux'
    }
    ```

    上面代码中，