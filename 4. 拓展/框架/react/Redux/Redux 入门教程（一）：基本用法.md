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

    上面代码中，Action名称是ADD_TODO，携带的信息是Learn Redux

    可以理解为，Action描述当前正在发生的事，改变State的唯一办法，就是使用Action。

4. Action Creator

    View要发送多少种信息，就会有多少种Action，如果都手写，会很麻烦，因此有了Action Creator，这是一个专门创建Action的函数。

    ```js
    const ADD_TODO = '添加TODO';

    function addTodo(text) {
        return {
            type: ADD_TODO,
            text
        }
    }

    const action = addTodo('Learn Redux');
    ```

    上面代码中的addTodo函数就是一个Action Creator。

5. store.dispatch()

    store.dispatch()是View发出Action的唯一方法；

    ```js
    import { createStore } from 'redux';

    const store = createStore(fn);

    store.dispatch({
        type: 'ADD_TODO',
        payload: 'Learn Redux'
    });
    ```

    上面代码中，store.dispatch接受一个Action对象作为参数，将它发送出去。

    结合Action Creator，代码可以改写成：

    ```js
    store.dispatch(addTodo('Learn Redux'));
    ```

6. Reducer

    Store收到Action后，必须给出一个新的State，这样View才会发生变化。这种State的计算过程就叫做Reducer。

    Reducer是一个函数，它接受Action和当前的State作为参数，返回一个新的State。

    ```js
    const reducer = function (state, action) {
        // ...
        return new_state;
    }
    ```

    整个应用的初始状态，可以作为State的默认值。

    ```js
    const defaultState = 0;
    const reducer = (state = defaultState, action) => {
        switch(action.type) {
            case 'ADD':
                return state + action.payload;
            default:
                return state;
        }
    };

    const state = reducer(1, {
        type: 'ADD',
        payload: 2
    });
    ```

    上面代码中，reducer收到ADD的Action后，返回一个新的State，作为加法的计算结果。其他运算逻辑也可以用不同的Action.type来调用。

    实际应用中，Reducer不像上面那样手动调用，store.dispatch方法会触发Reducer的自动执行，为此，Redux需要知道Reducer函数，做法就是在生成Store的时候，将Reducer传入CreateStore方法；

    ```js
    import { createStore } from 'redux'

    const store = createStore(reducer);
    ```

    上面代码中，createStore接受reducer为参数，生成一个新的Store。以后每当store.dispatch发送过来一个新的Action，就会调用Reducer，得到新的State。

    Reducer可以作为数组的reduce方法的参数。

    ```js
    const actions = [
        { type: 'ADD', payload: 0 },
        { type: 'ADD', payload: 1 },
        { type: 'ADD', payload: 2 }
    ];

    const total = actions.reduce(reducer, 0); // 3
    ```

    上面代码中，数组actions表示依次有三个action，分别是加0、加1、加2，数组的reduce方法接受Reducer函数作为参数，可以直接得到最终状态3；

7. 纯函数

    Reducer函数的最重要特征，就是一个纯函数。也就是相同的输入，必然得到相同的输出。

    由于Reducer是一个纯函数，可以保证相同的state，得到相同的View。但是正因为这一点，Reducer函数里面不能改变State，必须返回一个全新的对象。

    ```js
    // state是一个对象
    function reducer(state, action) {
        return Object.assign({}, state, { thingToChange });
        // 或者
        return { ...state, ...newState };
    }

    // state是一个数组
    function reducer(state, action) {
        return [ ...state, newItem ];
    }
    ```

8. store.subscribe()

    Store允许使用store.subscribe方法设置监听函数，一旦State发生变化，就自动执行这个函数。

    ```js
    import { createStore } from 'redux';
    const store = createStore(reducer);

    store.subscribe(listener);
    ```

    显然，只要把View的更新函数（对于React项目，就是render方法或setState方法）放入listen，就会实现View的自动渲染。

    store.subscribe方法返回一个函数，调用这个函数就可以解除监听。

    ```js
    const unSubscribe = store.subscribe(() => {
        console.log(store.getState());
    });

    unSubscribe();
    ```

## Store的实现

上节介绍了Redux涉及的基本概念，发现Store提供了三个方法：

```js
    store.getState();
    store.dispatch();
    store.subscribe();
```

```js
import { createStore } from 'redux';

let { subscribe, dispatch, getState } = createStore(reducer);
```

createStore还接受第二个参数，表示State的初始状态。通常是服务器给出的。

```js
let store = createStore(reducer, window.STATE_FROM_SERVE);
```

下面是store的一个简单实现：

```js
const createStore = (reducer) => {
    let state;
    let listeners = [];

    const getState = () => state;

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    }

    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l !== listener);
        }
    };

    dispatch({});

    return { getState, dispatch, subscribe };
}
```

## Reducer的拆分

Reducer函数负责生成State，由于整个应用只有一个State对象，包含所有数据，因此对于大型应用来说，这个State必然十分庞大，导致Reducer也十分庞大。

```js
const chatReducer = (state = defaultState, action = {}) => {
    const { type, payload } = action;

    switch(type) {
        case ADD_CHAT:
            return Object.assign((), state, {
                chatLog: state.chatLog.concat(payload)
            });
        case CHANGE_STATUS:
            return Object.assign({}, state, {
                statusMessage: payload
            });
        case CHANGE_USERNAME:
            return Object.assign((), state, {
                userName: payload
            });
        default:
            return state;
    }
};
```

上面代码中，三种Action分别改变State的三种属性；

* ADD_CHAT: chatLog属性；
* CHANGE_STATUS: statusMessage属性；
* CHANGE_USERNAME: userName属性；

这三个属性之间没有联系，这提示我们可以把Reducer函数拆分，不同的函数负责处理不同的属性，最终把它们合并成一个大的Reducer即可；

```js
const chatReducer = (state = defaultState, action = {}) => {
    return {
        chatLog: chatLog(state.chatLog, action),
        statusMessage: statusMessage(state.statusMessage, action),
        userName: userName(state.userName, action)
    }
};
```

上面代码把Reducer函数进行了三个拆分，每一个负责生成对应的属性。

Redux提供了一个combineReducers的方法，用于Reducer的拆分，你只需要定义各个子Reducer函数，然后用这个方法，将它们合成一个大的Reducer。

```js
import { combineReducer } from 'redux';

const chatReducer = combineReducers({
    chatLog,
    statusMessage,
    userName
});

export default todoApp;
```

下面是combineReducers的简单实现：

```js
const combineReducers = reducers => {
    return (state = {}, action) => {
        return Object.keys(reducers).reduce((nextState, key) => {
            nextState[key] = reducers[key](state[key], action);
            return nextState;
        });
    }
};
```

## 工作流程

本节对redux工作流程做一个梳理。

![redux工作流程](http://www.ruanyifeng.com/blogimg/asset/2016/bg2016091802.jpg)

首先，用户发出Action。

```js
store.dispatch(action);
```

然后，自动调用Reducer，并且传入两个参数，当前State和收到的Action，reducer会返回新的State。

```js
let nextState = todoApp(previousState, action);
```

State一旦有变化，Store就会调用监听函数。

```js
// 设置监听函数
store.subscribe(listener);
```

listener可以通过store.getState()得到当前状态，如果使用的是React，这时可以触发重新渲染View。

```js
function listener() {
    let newState = store.getState();
    component.setState(newState);
}
```

## 计数器

下面来看一个简单的🌰

```js
const Counter = ({ value }) => (
    <h1>{value}</h1>
);

const render = () => {
    ReactDom.render(
        <Counter value={store.getState()}/>,
        document.getElementById('root')
    )
};

store.subscribe(render);
render();
```

上面是一个简单的计数器，唯一的作用就是把参数value的值显示在网页上，Store的监听函数是render，每次State的变化都会导致网页重新渲染。

下面为Counter加入递增和递减的Action。

```js
const Counter = ({ value, onIncrement, onDecrement }) => (
    <div>
        <h1>{value}</h1>
        <Button onClick={onIncrement}>+</Button>
        <Button onClick={onDecrement}>-</Button>
    </div>
);

const reducer(state = 0, action = {}) {
    switch(action.type) {
        case 'INCREMENT': return state + 1;
        case 'DECREMENT': return state - 1;
        default: return state;
    }
}

const store = createStore(reducer);

const render = () => {
    ReactDom.render(
        <Counter
            value={store.getState()}
            onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
            onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
        />,
        document.getElementById('root')
    )
};

store.subscribe(render);
render();
```

