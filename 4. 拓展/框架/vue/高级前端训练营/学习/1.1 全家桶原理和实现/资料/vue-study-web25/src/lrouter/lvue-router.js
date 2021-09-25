// 1.实现一个插件
// 2.实现VueRouter: 处理选项、监控url变化，动态渲染
let Vue;


class VueRouter {
  constructor(options) {
    // 1. 处理选项
    this.$options = options;

    // 2. 需要响应式的current
    const initial = window.location.hash.slice(1) || '/'
    Vue.util.defineReactive(this, 'current', initial)

    // 3. 监控url变化，变化的时候更新current
    window.addEventListener('hashchange', this.onHashChange.bind(this));

    // 缓存path和route映射关系
    this.routeMap = {};
    this.$options.routes.forEach(route => {
      this.routeMap[route.path] = route;
    })
  }

  onHashChange() {
    this.current = window.location.hash.slice(1);
  }
}

// 插件需要install方法
VueRouter.install = function(_Vue) {
  Vue = _Vue;

  // 任务1：挂载$router，怎么拿到router实例，利用Vue.mixin
  Vue.mixin({
    // 每个组件都会执行这里
    beforeCreate() {
      // 这里的上下文是组件实例
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
      }
    }
  })

  // 任务2：注册两个全局组件
  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        required: true
      }
    },
    render(h) {
      // runtime-only的vue只能通过render函数来实现模板渲染
      return h('a', { attrs: { href: '#' + this.to } }, this.$slots.default);
    }
  })
  Vue.component('router-view', {
    render(h) {
      // 获取current
      const { routeMap, current } = this.$router;
      const component = routeMap[current] ? routeMap[current].component : null;

      return h(component);
    }
  })

}

export default VueRouter;