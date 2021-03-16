import { Subject } from 'rxjs'
import mainWorld from '@/components/HelloWorld.vue'
import { formalDate } from '@/utils/index.js'
import Vue from 'vue'

const paper = new Subject()
paper.subscribe(v => { // 在主应用注册呼机监听器，这里可以监听到其他应用的广播
  console.log(`监听到子应用${v.from}发来消息：`, v)
  // store.dispatch('app/setToken', v.token) // 这里处理主应用监听到改变后的逻辑
})

const msg = { // 结合下章主应用下发资源给子应用，将pager作为一个模块传入子应用
  data: '111', // 从主应用仓库读出的数据
  components: mainWorld, // 从主应用读出的组件库
  utils: formalDate, // 从主应用读出的工具类库
  emitFnc: childEmit, // 从主应用下发emit函数来收集子应用反馈
  paper // 从主应用下发应用间通信呼机
}
const microApps = [
  {
    name: 'sub-vue',
    entry: '//localhost:3000',
    container: '#subapp-viewport',
    activeRule: '/sub-vue',
    props: msg
  }
  // {
  //   name: 'sub-qiankun',
  //   entry: '//localhost:8001',
  //   container: '#subapp-viewport',
  //   activeRule: '/sub-qiankun',
  //   props: {
  //     routerBase: '/sub-qiankun'
  //   }
  // }
]

function childEmit (data) {
  console.log(data)
}

Vue.prototype.$pager = paper
export default microApps
