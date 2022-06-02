<template>
  <div
    v-if="isExternals"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
  ></div>
  <img v-else v-bind="$attrs" :class="svgClass" :src="iconName" />
</template>

<script>
import { computed } from 'vue'
import { isExternal } from 'utils/validate'

export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const isExternals = computed(() => isExternal(props.iconClass))
    const iconName = computed(() => `/src/icons/svg/${props.iconClass}.svg`)
    const svgClass = computed(() =>
      props.className ? 'svg-icon ' + props.className : 'svg-icon'
    )
    const styleExternalIcon = computed(() => ({
      mask: `url(${props.iconClass}) no-repeat 50% 50%`,
      '-webkit-mask': `url(${props.iconClass}) no-repeat 50% 50%`
    }))

    return {
      isExternals,
      iconName,
      svgClass,
      styleExternalIcon
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 0.9rem;
  height: 0.9rem;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
