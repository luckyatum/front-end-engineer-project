# [React 高阶组件(HOC)入门指南](https://juejin.im/post/5914fb4a0ce4630069d1f3f6)

react mixin可能会带来一些不可见的属性或状态；并且mixin会相互耦合，相互依赖，不利于代码维护；

## 高阶组件

> 高阶组件就是将组件作为输入和输出的函数

通常情况下，实现高阶组件的方式有以下两种：

  1. 属性代理
  2. 反向继承

### 属性代理

实质上是通过包裹原来的组件来操作Props，看下例子：

```js
import React, { Component } from 'react';

// 定义高阶组件
const HOC = (WrappedComponent) => {
  return class WrapperComponent extends Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
}

// 普通的组件
class WrappedComponent extends Component {
  render() {
    // ...
  }
}

// 高阶组件使用
export default HOC(WrappedComponent);
```

上面可以看到函数HOC接受了WrappedComponent组件作为参数，并且返回了一个新的包裹着WrappedComponent的组件WrapperComponent，并将传给他的props原封不动传给WrappedComponent

#### 操作props

我们看到想要传递给WrappedComponent的参数先传给了WrapperComponent组件，这样我们就可以对传入的Props做一些修改，然后再传递给WrappedComponent组件

```js
const HOC = (WrappedComponent) => {
  return class WrapperComponent extends Component {
    render() {
      const newProps = {};

      return <WrappedComponent
        {...this.props}
        {...this.newProps}
      />
    }
  }
}
```

#### 获取refs引用

```js
import React, { Component } from 'React';

const HOC = (WrappedComponent) =>
    class wrapperComponent extends Component {
        storeRef(ref) {
            this.ref = ref;
        }
        render() {
            return <WrappedComponent
                {...this.props}
                ref = {::this.storeRef}
            />;
        }
    }
```

### 反向继承

