import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './router'

Vue.config.productionTip = false
Vue.use(VueRouter)
let instance = null
let router = null

function render (props) {
  const { container } = props || {}
  // 在 render 中创建 VueRouter，可以保证在卸载微应用时，移除 location 事件监听，防止事件污染
  router = new VueRouter({
    // 运行在主应用中时，添加路由命名空间 /vue
    base: window.__POWERED_BY_QIANKUN__ ? '/sub-vue/' : '/',
    mode: 'history',
    routes
  })

  // 挂载应用
  instance = new Vue({
    router,
    render: (h) => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}

// 独立运行时，直接挂载应用
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap ({ components, utils, emitFnc, paper }) {
  console.log('VueMicroApp bootstraped')
  // Vue.use(components) // 注册主应用下发的组件
  Vue.component('main-world', components)

  Vue.prototype.$mainUtils = utils // 把工具函数挂载在vue $mainUtils对象

  Object.keys(emitFnc).forEach(i => { // 把mainEmit函数一一挂载
    Vue.prototype[i] = emitFnc[i]
  })

  paper.subscribe(v => { // 在子应用注册呼机监听器，这里可以监听到其他应用的广播
    console.log(`监听到子应用${v.from}发来消息：`, v)
    // store.dispatch('app/setToken', v.token)   // 在子应用中监听到其他应用广播的消息后处理逻辑
  })
  Vue.prototype.$pager = paper // 将呼机挂载在vue实例
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount (props) {
  console.log('VueMicroApp mount', props)
  render(props)
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount () {
  console.log('VueMicroApp unmount')
  instance.$destroy()
  instance = null
  router = null
}
