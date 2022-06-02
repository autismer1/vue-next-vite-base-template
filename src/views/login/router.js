// 微信登录
const Login = () => import('./index.vue')
export default {
  path: '/login',
  name: 'login',
  meta: {
    title: '登录'
  },
  component: Login,
  children: []
}
