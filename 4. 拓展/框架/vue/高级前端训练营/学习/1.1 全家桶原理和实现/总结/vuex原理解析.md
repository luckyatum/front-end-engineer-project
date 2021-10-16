# vuex原理解析

* 实现Store类

  * 实现一个响应式的state
  * 实现commit()
  * 实现dispatch()
  * getters

* 挂载$store

初始化：Store声明、install实现、kvuex.js

```js
let Vue;
//  kvuex.js
class Store {
  constructor(options = {}) {
    this._vm = new Vue({
      data: {
        $$state: options.state
      }
    })
  }
  get state() {
    return this._vm._data.$$state
  }
  set state(v) {
    console.error('please use replaceState to reset state.')
  }
}

// 实现install，挂载$store
function install(_Vue) {
  Vue = _Vue

  Vue.mixin({
    beforeCreate() {
      // this是vue实例，从vue实例中获取选项$options，然后拿到挂载在选项上的store
      /**
       * new Vue({
       *  store: new Vuex.Store({})
       * })
       *
       */
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

export default { Store, install }
```

实现commit，根据用户传入type获取并执行对应mutation

```js
class Store {
  constructor(options = {}) {
    // 保存用户mutations选项
    this._mutations = options.mutations || {}
  }

  commit(type, payload) {
    // 获取type对应的mutation
    const entry = this._mutations[type]

    if (!entry) {
      // 对应mutation不存在
      return
    }

    // 指定上下文为Store实例
    // 传递state给mutation
    entry(this.state, payload);
  }
}
```

实现action：根据用户传入type获取并执行对应action

```js
class Store {
  constructor(options = {}) {
    // 保存用户mutations选项
    this._actions_ = options.actions || {}

    // 绑定commit上下文，否则action中调用commit时可能出问题
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
  }

  dispatch(type, payload) {
    // 获取type对应的action
    const entry = this._actions[type]

    if (!entry) {
      // 对应action不存在
      return
    }

    // 指定上下文为Store实例
    // 传递state给action
    entry(this, payload);
  }
}
```

实现getters

1. 利用vue的computed属性
2. 循环获取getters的key和fn，每个都添加到computed中

  ```js
  computed[key] = function() {
    return fn(store.state)
  }
  ```

3. 然后获取getters的时候返回vm实例的计算属性：

  ```js
  Object.defineProperty(store.getters, key, {
    get() {
      return store._vm[key], // 这里获取计算属性
    }
  })
  ```

4. 最后将computed对象添加到_vm实例中

  ```js
    store._vm = new Vue({
      data: {},
      computed
    })
  ```
