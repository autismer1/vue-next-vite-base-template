import $dayjs from 'utils/day'
import $cookie from 'utils/cookie'
import $tools from 'utils/tools'

const attrs = {
  $dayjs,
  $cookie,
  $tools
}

export default function (Vue) {
  for (const attr in attrs) {
    Vue.provide(attr, attrs[attr])
  }
}
