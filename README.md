# Vue 3 + Vite
### 全局安装 pnpm 包管理工具
- win + R 打开cmd： `npm i pnpm -g`

### 安装依赖
- `pnpm i`

### 运行项目
- `pnpm test/dev`

### 文件目录结构
- `assests`: 存放`css`文件和`scss`文件
- `components`: 公共组件
- `icons/svg`: `svg`文件
- `register-attrs`: 全局工具函数注册
- `register-components`: 全局组件注册，vant组件按需加载
- `router`: 路由组件
- `utils`: 工具库
- `views`: 页面组件

### views目录结构
- `router.js`: 路由注册
- `index.vue`: 页面内容
- `index.scss`: 页面样式

### components/test 组件
- `provide/inject`: 全局工具函数使用方式
- `scss/mixin`: 全局`scss`文件`mixin`使用方式
- `useRoute/useRouter`: 获取组件路由信息，路由跳转
