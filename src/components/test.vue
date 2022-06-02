<template>
  <div class="test">
    <van-button plain size="small" @click="handleClick">查轨迹</van-button>
  </div>
</template>

<script setup>
import { inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// 获取路由信息
const routes = useRoute()
console.log(routes)

// 注册路由
const router = useRouter()
const handleClick = () => {
  router.push({
    path: '/query-track'
  })
}

// 获取全局方法
const $dayjs = inject('$dayjs')
console.log($dayjs.getAWeek())

</script>

<style scoped lang="scss">
.test {
  height: 100rem;
  width: 5rem;
  background-color: $systemColor;

  @include red;
  @include userselect(none);
}
</style>
