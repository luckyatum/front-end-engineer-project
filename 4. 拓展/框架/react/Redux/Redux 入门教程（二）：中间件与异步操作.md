# [Redux 入门教程（二）：中间件与异步操作](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_two_async_operations.html)

## 前言

上一篇文章介绍了Redux的基本用法：用户发出Action，Reducer函数算出新的State，重新渲染View。

但是有一个关键问题，就是碰到异步怎么办？Action发出后，过一段时间才算出新的State，这就是异步。

怎么才能让Reducer在异步操作结束后才执行呢，这就需要用到中间件(middleware)；

## 中间件的概念

为了理解中间件，我们从框架作者角度思考，如果要添加功能，你会在哪个环节添加？

(1) Reducer：纯函数，只提供计算State的功能，不适合承担别的功能，也承担不了，因为理论上纯函数不能做读写操作；
(2) View: 与State一一对应，可以看做State的视觉层，也不适合承担其他功能；
(3) Action: 存放数据的对象，即消息的载体，只能被别人操作，自己无法操作；

可见，只有Action这个步骤适合添加功能，即store.dispatch()方法。例如要添加日志功能，把Action和State打印出来：

```js
let next = store.dispatch;
store.dispatch = function dispatchAndLog(action) {
    console.log('dispatching', action);
    next(action);
    console.log('next state', store.getStore());
}
```

上面代码中对dispatch进行了改造，在执行Action前后都添加了打印操作，这就是中间件的雏形。

中间件就是一个函数，对Store.dispatch方法进行了改造，在发出Action和执行Reducer这两部之间，添加了其他功能。

## 中间件的实现

本教程只教如何使用中间件，不教如何编写中间件。

```js
import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';

const logger = createLogger();

const store = createStore(
    reducer,
    applyMiddleware(logger)
);
```

上面代码中，redux-logger提供一个生成器createLogger，可以生成日志中渐渐logger。然后，将它放在applyMiddleware中，传入createStore方法，就完成了store.dispatch()的功能增强。

这里有两点需要注意：

(1) createStore方法可以接受整个应用的初始状态作为参数，那样的话，applyMiddleware就是第三个参数了。

```js
const store = createStore(
    reducer,
    initial_state,
    applyMiddleware(logger)
);
```

(2) 中间件的次序有讲究

```js
const store = createStore(
    reducer,
    applyMiddleware(thunk, promise, logger)
);
```

上面代码中，applyMiddleware的三个参数，就是三个中间件，有的中间件对于次序有要求，例如logger中间件要求在最后，否则输出会不正确。

## applyMiddleware

applyMiddleware这个方法到底是做什么的，它是redux的原生方法，作用是将所有中间件组成一个数组，依次执行。下面是其源码：

```js
export default function applyMiddleware(...middlewares) {
    return (createStore) => (reducer, preloadedState, enhancer) => {
        var store = createStore(reducer, preloadedState, enhancer);
        var dispatch = store.dispatch;
        var chain = [];

        var middlewareAPI = {
            getState: store.getState,
            dispatch: (action) => dispatch(action)
        };

        chain = middlewares.map(middleware => middleware(middlewareAPI));
        dispatch = compose(...chain)(store.dispatch);

        return { ...store, dispatch };
    }
}
```

上面代码中，所有中间件被放进一个数组chain，然后嵌套执行，最后执行store.dispatch。

可以看到，中间件内部可以通过middlewareAPI拿到getState和dispatch两个方法。

## 异步操作基本思路

理解了中间件，就可以处理异步操作了。

同步操作是只需要发出一种Action，异步操作的差别是它要发出三种Action：

* 操作发起时的Action;
* 操作成功时的Action;
* 操作失败时的Action;

以向服务器发起请求为例，三种Action可以有两种不同的写法：

```js
// 写法一：名称相同，参数不同
{ type: 'FETCH_POSTS'},
{ type: 'FETCH_POSTS', status: 'error', error: 'Oops' },
{ type: 'FETCH_POSTS', status: 'success', response: {...} }

// 写法二：名称不同
{ type: 'FETCH_POSTS_REQUEST' },
{ type: 'FETCH_POSTS_FAILURE ', error: 'Oops' },
{ type: 'FETCH_POST_SUCCESS', response: {...} }
```

除了Action种类不同，异步操作的State也要改造，反映不同的操作状态。

```js
let state = {
    //...
    isFetching: false,
    didInvalidate: true,
    lastUpdated: 'xxxxxx'
}
```

上面代码中，state属性isFetching表示是否在抓取数据，didInvalidate表示数据是否过时，lastUpdated表示上一次更新时间。

现在，异步操作思路就很清楚了：

* 操作开始时，送出一个Action，触发State更新为“正在操作”状态，View重新渲染。
* 操作结束时，再送出一个Action,触发State更新为"操作结束"状态，View再一次重新渲染。

## Redux-thunk中间件

异步操作至少要送出两个Action: 用户触发第一个Action，这个跟同步操作一样，没有问题，如何才能在操作结束时，系统自动送出第二个Action呢？

奥妙就在Action Creator中：

```js
class AsyncApp extends Component {
    componentDidMount() {
        const { dispatch, selectedPost } = this.props;
        dispatch(fetchPosts(selectedPost));
    }
}
```

上述代码中，fetchPosts就是一个Action Creator。下面是fetchPosts代码：

```js
const fetchPosts = postTitle => (dispatch, getState) => {
    dispatch(requestPosts(postTitle));

    return fetch(`/some/API/${postTitle}.json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(postTitle, json)));
};

// 使用方法一
store.dispatch(fetchPosts('reactJs'));
// 使用方法二
store.dispatch(fetchPosts('reactJs')).then(() => {
    console.log(store.getState());
});
```

上面的代码中，fetchPosts是一个Action Creator，函数执行后，先发出一个Action: requestPosts(postTitle)，然后进行异步操作；

拿到结果后，先将结果转成JSON格式，然后再发出一个Action：receivePosts(postTitle, json);

上面代码有几点需要注意的：

(1) fetchPosts返回了一个函数，而普通的Action Creator默认返回一个对象；
(2) 返回的函数参数是dispatch和getState这两个Redux方法，普通的Action Creator的参数是Action的内容；
(3) 在返回的函数中，先发出一个Action表示操作开始；
(4) 异步操作结束后，再发出一个Action表示操作结束；

这样的处理，就解决了自动发送第二个Action的问题，但是，又带来了一个新的问题，Action是由store.dispatch方法发送的，默认情况下dispatch只接受对象参数，不能是函数；

这时，就要使用中间件redux-thunk。

```js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

const store = createStore(
    reducer,
    applyMiddleware(thunk)
);
```

上面代码中使用redux-thunk作为中间件，改造store.dispatch，使得后者可以接受函数作为参数；

因此，异步操作的第一种解决方案，写出一个返回函数的Action Creator，然后使用redux-thunk中间件改造store.dispatch；

## redux-promise中间件

既然可以返回函数，自然Action Creator也可以返回其他值，例如返回一个Promise对象；这是另一个异步解决方案：返回Promise；

这需要使用redux-promise中间件；

```js
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import reducer from './reducers';

const store = createStore(
    reducer,
    applyMiddleware(promiseMiddleware)
)
```

这中间件使得dispatch可以接受Promise对象作为参数，这时Action Creator有两种写法，写法一：返回值是一个Promise对象：

```js
const fetchPosts = (dispatch, postTitle) => {
    return new Promise((resolve, reject) => {
        dispatch(requestPosts(postTitle));
        return fetch(`/some/API/${postTitle}.json`)
        .then(response => {
            type: 'FETCH_POSTS',
            payload: response.json()
        });
    });
}
```

写法二，Action对象的payload是一个Promise对象，这需要从redux-actions模块因此createAction方法，并且写法也要变成下面这样：

```js
import { createAction } from 'redux-actions';

class AsyncApp extends Component {
    componentDidMount() {
        const { dispatch, selectedPost } = this.props;

        // 发出同步Action
        dispatch(requestPosts(selectedPost));
        // 发出异步Action
        dispatch(createAction(
            'FETCH_POSTS',
            fetch(`/some/API/${postTitle},json`)
                .then(response => response.json())
        ));
    }
}
```

上面代码中，第二个dispatch方法发出的是异步Action，只有等到操作结束。这个Action才会实际发出，注意，createAction的第二个参数必须是一个Promise对象；

下面是redux-promise的源码：

```js
export default function promiseMiddleware({ dispatch }) {
  return next => action => {
    if (!isFSA(action)) {
      return isPromise(action)
        ? action.then(dispatch)
        : next(action);
    }

    return isPromise(action.payload)
      ? action.payload.then(
          result => dispatch({ ...action, payload: result }),
          error => {
            dispatch({ ...action, payload: error, error: true });
            return Promise.reject(error);
          }
        )
      : next(action);
  };
}
```

上面代码可以看出，如果Action本身是一个Promise，它resolve以后的值应该是一个Action对象，会被dispatch方法送出：action.then(dispatch)，但reject以后不会有任何动作；

如果Action对象的payload属性是一个Promise对象，那么无论resolve和reject，dispatch方法都会发出Action;
