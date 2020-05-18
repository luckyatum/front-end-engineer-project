# [redux官方文档（2）：核心概念](https://cn.redux.js.org/docs/introduction/CoreConcepts.html)

## State

state表示的就是应用的状态，它可能是对象、数组、字符串等等任意类型的数据；

例如一个todo应用可能长这样：

```js
{
    todos: [
        {
            text: 'Eat food',
            completed: false
        },
        {
            text: 'Exercise',
            completed: true
        }
    ],
    visibilityFilter: 'SHOW_COMPLETED'
}
```

这个对象没有setter方法，因此其他的代码不能随意修改它；

## Action

要更新state，必须显式触发一个action。Action就是一个普通的javaScript对象，用来描述发生了什么。

```js
{ type: 'ADD_TODO', text: 'Go to swimming pool' },
{ type: 'TOGGLE_TODO', index: 1 },
{ type: 'ADD_TODO', text: 'Go to swimming pool' }
```

强制使用action来描述所有变化的好处是可以清晰地知道应用发生了什么，如果一些东西改变了，可以知道为什么变；

## Reducer

reducer作用是把state和action串联起来，它接收一个state和action，然后返回新的state；

reducer是一个函数；

对于大的应用来说，我们可以编写很多的小函数来管理state的某一部分；

```js
function visibilityFilter(state = 'SHOW_ALL', action) {
    if (action.type === 'SET_VISIBILITY_FILTER') {
        return action.filter;
    } else {
        return state;
    }
}

function todos(state = [], action) {
    switch(action.type) {
        case 'ADD_TODO':
            return state.concat([{ text: action.text, completed: false }]);
        case 'TOGGLE_TODO':
            return state.map((todo, index) => {
                
            });
    }
}
```
