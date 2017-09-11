import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

Vue.use(Router)

let routes = [
  {
    path: '/Hello',
    component: Hello,
    name: '',
    hidden: true
  },
  {
    path: '/Hello',
    component: Hello,
    name: '导航一',
    iconCls: 'el-icon-message',
    children: [
    ]
  }
]

sessionStorage.setItem('routes', JSON.stringify(routes))

export default new Router({routes})
