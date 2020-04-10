# [[译] React 组件中绑定回调](https://segmentfault.com/a/1190000006133727)

为事件绑定回调函数是很常见的操作：

```js
    class DankButton extends React.component {
        render() {
            return <button onClick={this.handleClick}>点击</button>;
        }

        handleClick() {
            console.log('look!');
        }
    }
```

上面代码不会有什么问题，执行也会成功调用handleClick输出look，但是，一旦回调函数涉及到调用类里面的其他方法，或者是使用state、props等操作，就会出现问题：

```js
    class DankButton extends React.component {
        render() {
            return <button onClick={this.handleClick}>点击</button>;
        }

        handleClick() {
            this.logPhrase();
        }

        logPhrase() {
            console.log('such new ledge');
        }
    }
```

会发现出现如下报错：

```TypeError: this.logPhrase is not a function at handleClick```

这是因为handleClick里面的this根本就不是这个class，所以也就找不到里面的方法；

下面有一些方法可以将this指定到组件：

1. 箭头函数（不好的方案👎）

    由于箭头函数没有自己的this，其this会绑定在定义时候所在的作用域，所以利用这个特性可以使得handleClick始终绑定组件的this

    ```js
        class DankButton extends React.Component {
            render() {
                // Bad Solution: An arrow function!
                return <button onClick={() => this.handleClick()}>Click me!</button>
            }

            handleClick() {
                this.logPhrase()
            }

            logPhrase() {
                console.log('such gnawledge')
            }
        }
    ```

    这种方式的缺点就是比较耗费性能，因为箭头函数定义在render函数内部，因此每次组件渲染调用render方法的时候都会产生一个新的函数，旧的函数就需要垃圾回收机制清空它们；

2. this.handleClick.bind(this)（不好的方案👎）

    ```js
    class DankButton extends React.Component {
        render() {
            // Bad Solution: Bind that callback!
            return <button onClick={this.handleClick.bind(this)}>Click me!</button>
        }

        handleClick() {
            this.logPhrase()
        }

        logPhrase() {
            console.log('such gnawledge')
        }
    }
    ```

    缺点同箭头函数，也是定义在render函数内部，每次都会重新产生一个新函数，旧的函数需要垃圾回收机制处理；

    那么，为什么上面没有使用匿名函数也会产生不同的函数呢，这是因为：**.bind并不会修改原有函数，而是返回一个指定了this的新函数**。

3. 构造函数中使用.bind(this)（好的方案👍）

    ```js
        class DankButton extends React.Component {
            constructor() {
                super()
                // Good Solution: Bind it in here!
                this.handleClick = this.handleClick.bind(this)  
            }

            render() {
                return <button onClick={this.handleClick}>Click me!</button>
            }

            handleClick() {
                this.logPhrase()
            }

            logPhrase() {
                console.log('such gnawledge')
            }
        }
    ```

    上面解决方案同样是利用.bind(this)强制指定函数上下文。但是不一样的是，这次是在constructor中调用的，因此只会在组件初始化时候执行，后续组件的渲染也不会产生新的函数。

    如果你使用的是React.createClass而不是ES6的classes，你就不会碰到这个问题，createClass生成的组件会把它们的方法自动绑定到组件的this，甚至是你传递给事件回调的函数。
