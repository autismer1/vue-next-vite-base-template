import { createRouter, createWebHashHistory } from 'vue-router'

const files = import.meta.globEager('@/views/**/router.js')
const routes = [
  {
    path: '/',
    redirect: '/login'
  }
]

Object.keys(files).forEach((key) => {
  routes.push(files[key].default)
})

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由前置守卫
router.beforeEach(async (to, from, next) => {
  // 动态修改页面title
  window.document.title = to.matched[0].meta.title

  next()
  // 判断是否登录,如果未登录跳转到登录页面
  // const hasToken = Cookies.get('token')
  // // 没有token并且跳转非登录页，去往登录页
  // if (!hasToken && to.path != '/login') {
  //   next('/login')

  //   // 有token并且启动页是登录页，则去到首页
  // } else if (hasToken && to.path == '/login') {
  //   next('/')
  // } else {
  //   next()
  // }
})

export default router
