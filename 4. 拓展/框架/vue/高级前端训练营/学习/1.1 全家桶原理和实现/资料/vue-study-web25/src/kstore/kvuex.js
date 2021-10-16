// 声明一个插件
// 声明一个类Store
let Vue

class Store {
  constructor(options) {
    // 1.选项处理
    // this.$options = options
    const store = this
    store._mutations = options.mutations
    store._actions = options.actions
    store.getters = {}
    const computed = {}

    for (let [key, fn] of Object.entries(options.getters)) {
      computed[key] = function() {
        return fn(store.state)
      }
      Object.defineProperty(store.getters, key, {
        get() {
          return store._vm[key]
        }
      })
    }

    // 2.响应式state
    store._vm = new Vue({
      data: {
        $$state: options.state,
      },
      computed
    })

    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)

  }

  get state() {
    console.log(this._vm);
    return this._vm._data.$$state
  }

  set state(v) {
    console.error('please use replaceState to reset state');
  }

  commit(type, payload) {
    const entry = this._mutations[type]

    if (!entry) {
      console.error('unkwnow mutation type');
      return
    }

    entry(this.state, payload)
  }

  dispatch(type, payload) {
    const entry = this._actions[type]

    if (!entry) {
      console.error('unkwnow action type');
      return
    }

    entry(this, payload)
  }
}
function install(_Vue) {
  Vue = _Vue

  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

// 导出对象认为是Vuex
export default {Store, install}