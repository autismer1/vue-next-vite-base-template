import { createApp } from 'vue'
import '@/assets/css/reset.css'
import router from './router'
import registerAttrs from './register-attrs' // 注册全局方法
import registerComponents from './register-components' // 注册全局组件
import flexible from 'utils/flexible' // rem 布局

import App from './App.vue'

const app = createApp(App)

app.use(router).mount('#app')

registerAttrs(app)
registerComponents(app)

window.fontSizeValue = flexible(document, window)
