# Vuex

## 核心概念

* state状态、数据；
* mutations更改状态的函数；
* actions异步操作
* store包含以上概念的容器

## 状态-state

state保存应用状态

```js
export default new Vuex.Store({
  state: { counter: 0 }
})
```

## 状态变更-mutations

mutations用于修改状态

```js
export default new Vuex.Store({
  mutations: {
    add(state) {
      state.counter++
    }
  }
})
```

## 派生状态-getters

从state派生出新状态，类似计算属性

```js
export default new Vuex.Store({
  getters: {
    doubleCounter(state) { // 计算剩余数量
      return state.counter * 2;
    }
  }
})
```


## 动作-actions

添加业务逻辑，类似controller

```js
export default new Vuex.Store({
  actions: {
    add({ commit }) {
      setTimeout(() => {
        commit('add')
      }, 1000);
    }
  }
})
```

