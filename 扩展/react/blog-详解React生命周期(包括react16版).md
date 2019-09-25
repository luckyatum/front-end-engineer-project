# [详解React生命周期(包括react16版)](https://www.jianshu.com/p/514fe21b9914)

![生命周期](https://upload-images.jianshu.io/upload_images/5287253-bd799f87556b5ecc.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

## 1. initialization阶段

用于做一些初始化工作，如定义state的初始内容

## 2. 挂载(mount)阶段

1. componentWillMount

    组件挂载到DOM前调用，只会调用一次，且在此处调用this.setState不会引起组件重新渲染

2. render

    根据组件的props和state（只要两者有重传递和重赋值，都会引起组件的重新render），return一个React元素，不负责组件的实际渲染工作。

    **不能在render里面执行setState操作，因为render是纯函数，不能影响外部状态**

3. componentDidMount

    组件挂载到DOM后调用，只会调用一次

## 3. 更新(update)阶段

造成组件更新的两类情况：

1. 父组件重新render

父组件重新render的情况有两种，一种是每当父组件重新render导致的重传props，子组件将直接跟着渲染，无论props是否有变化。可通过shouldComponentUpdate方法优化

```js
class Child extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.someThings === this.props.someThings) {
            // 如果满足某些情况，则不需要重新渲染
            return false;
        }
    }
    render() {
        return <div>{this.props.someThings}</div>
    }
}
```

另一种是在componentWillReceiveProps方法中，将props转换成自己的state

```js
class Child extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            someThings: props.someThings
        };

        componentWillReceiveProps(nextProps) {
            this.setState({
                someThings: nextProps.someThings
            });
        };
        render() {
            return <div>{this.state.someThings</div>
        };
    }
}
```

官网中描述，在该函数(componentWillReceiveProps)中调用 this.setState() 将不会引起第二次渲染。

是因为componentWillReceiveProps中判断了props是否变化，若变化，this.setState()将引起state变化，从而引起render，此时没必要再做第二次因为重传props引起的render了，否则将会重新渲染.

2. 组件本身调用setState，无论state有无变化。可通过shouldComponentUpdate优化

![react生命周期](https://segmentfault.com/img/bVbeoGH?w=1200&h=1300)

## 4. 卸载(unmount)阶段

1. componentWillUnmount

在组件被卸载前调用，可执行一些清理工作等

## react生命周期变更缘由

原有生命周期在react v16推出了Fiber之后就不适用了，因为要开启async rendering，因此在render函数之前的所有函数，都有可能被执行多次

* componentWillMount
* componentWillReceiveProps
* shouldComponentUpdate
* componentWillUpdate

除了shouldComponentUpdate以外，上述函数都将被getDerivedStateFromProps替代。

也就是用一个静态函数来代替几个生命周期函数，该函数强制开发者在render前只做无副作用的操作

## 新引入的生命周期函数，getDerivedStateFromProps和getSnapshotBeforeUpdate

### static getDerivedStateFromProps(nextProps)

v16.4后，该生命周期无论在何时，什么原因引起的updating，都会被调用，在组件创建时和更新时的render方法之前被调用，它返回一个对象表示更新的state，或者返回null表示什么都不更新

### getSnapshotBeforeUpdate(prevProps, prevState)

该生命周期被调用在render之后，可以读取但无法使用DOM，它使您的组件可以在可能更改之前从DOM捕获一些信息，该方法任何返回值都将作为参数传递给componentDidUpdate

```js
class ScrollingList extends React.Component {
    constructor(props) {
        super(props);
        this.listRef = React.createRef();
    };

    getSnapshotBeforeUpdate(prevProps, prevState) {
        return null;
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        // snapshot就是入参
    }
}
```
