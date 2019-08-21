import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'
import Page1 from '@/pages/page1'
import Page2 from '@/pages/page2'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    // 设置home页面作为首页，并为其设置别名，即访问 '/'就是访问 '/home'
    { path: '/', component: Home , alias: '/home' },
    // { path: '/', redirect: { name: 'home' } },
    { path: '/home', name: 'home', component: Home },
    { path: '/page1', name: 'page1', component: Page1 },
    { path: '/page1/page2', name: 'page2', component: Page2 }
  ]
})