import { Notify } from 'vant'

class Tools {
  constructor() {
    this.fakeElem = null
  }
  /**
   * 设置对象属性
   * @param {操作对象} obj
   * @param {属性名称} keyList 格式：{ key: '属性名', value: '重置的内容' }
   */
  objSetValue(obj, keyList) {
    keyList.forEach((item) => {
      obj[item.key] = item.value
    })
  }

  /**
   * 验证变量值是否为null、空字符串、undefined、数组是否为空，是：true，否：false
   * @returns {Boolean}
   */
  isEmptyValue(value) {
    let isEmpty = true
    if (
      value != null &&
      value !== '' &&
      value !== 'undefined' &&
      value !== undefined &&
      value?.length !== 0
    ) {
      isEmpty = false
    }

    return isEmpty
  }

  /**
   * 是否是空对象，是：true，不是：false
   * @param {判断的对象} obj
   * @returns {Boolean}
   */
  isEmptyObject(obj) {
    if (Object.prototype.toString.call(obj) !== '[object Object]') {
      return false
    }
    return !(Object.keys(obj).length > 0)
  }

  /**
   * 防抖
   * @param {执行的函数} fn
   * @param {延迟执行的时间} delay
   * @param {是否立即执行} immediate
   */
  debounce(fn, delay, immediate = false) {
    let timer = null
    let isInvoke = false

    const _debounce = function (...args) {
      return new Promise((resolve) => {
        if (timer) clearTimeout(timer)

        if (immediate && !isInvoke) {
          const result = fn.apply(this, args)
          resolve(result)
          isInvoke = true
        } else {
          timer = setTimeout(() => {
            const result = fn.apply(this, args)
            resolve(result)
            isInvoke = false
            timer = null
          }, delay)
        }
      })
    }

    _debounce.cancel = function () {
      if (timer) clearTimeout(timer)
      timer = null
      isInvoke = false
    }

    return _debounce
  }

  /**
   * 复制粘贴板
   * @param {元素类名} element => .class
   * @param {复制的内容} content
   */
  clipboard(content) {
    if (content) {
      this.fakeElem = document.createElement('textarea')
      this.fakeElem.value = content
      document.body.appendChild(this.fakeElem)
      this.fakeElem.select()
      if (document.execCommand('Copy')) {
        Notify({ type: 'success', duration: 300, message: '复制成功！' })
      } else {
        Notify({
          type: 'warning',
          duration: 300,
          message: '该浏览器不支持自动复制,请手动复制！'
        })
      }
      if (this.fakeElem) {
        document.body.removeChild(this.fakeElem)
        this.fakeElem = null
      }
    }
  }

  /**
   * 获取两个坐标点之间的距离
   * @param { 起始点 } start
   * @param { 终点 } end
   * @returns
   */
  getDistance(start, end) {
    const radLat1 = (start.latitude * Math.PI) / 180
    const radLat2 = (end.latitude * Math.PI) / 180
    const radLng1 = (start.longitude * Math.PI) / 180
    const radLng2 = (end.longitude * Math.PI) / 180
    const a = radLat1 - radLat2
    const b = radLng1 - radLng2
    const s =
      2 *
      Math.asin(
        Math.sqrt(
          Math.pow(Math.sin(a / 2), 2) +
            Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(b / 2, 2)
        )
      )
    return Math.round(s * 6378.137 * 10000) / 10000
  }

  /**
   * 根据起始位置，计算合适的缩放比例
   * @param { 起始位置经纬度 } start
   * @param { 结束位置经纬度 } end
   * @returns
   */
  getZoom(start, end) {
    let distance = this.getDistance(start, end)
    if (distance >= 1000) {
      return 3
    } else if (distance >= 500 && distance < 1000) {
      return 4
    } else if (distance >= 200 && distance < 500) {
      return 5
    } else if (distance >= 100 && distance < 200) {
      return 6
    } else if (distance >= 50 && distance < 100) {
      return 7
    } else if (distance >= 30 && distance < 50) {
      return 8
    } else if (distance >= 20 && distance < 30) {
      return 9
    } else if (distance >= 10 && distance < 20) {
      return 10
    } else if (distance >= 5 && distance < 10) {
      return 11
    } else if (distance >= 2 && distance < 5) {
      return 12
    } else if (distance >= 1 && distance < 2) {
      return 13
    } else if (distance >= 0.5 && distance < 1) {
      return 14
    } else if (distance >= 0.2 && distance < 0.5) {
      return 15
    } else if (distance >= 0.1 && distance < 0.2) {
      return 16
    } else if (distance >= 0.05 && distance < 0.1) {
      return 17
    } else if (distance >= 0.025 && distance < 0.05) {
      return 18
    } else if (distance >= 0.01 && distance < 0.025) {
      return 19
    }
    return 16
  }

  /**
   * 元素距离顶部的高度
   * @param {元素顶部所有元素的 rem 值的和} topElement
   * @param {偏移量} offset
   * @returns
   */
  eTop(topElement, offset) {
    const { innerHeight, outerHeight, fontSizeValue } = window
    const value = fontSizeValue * topElement
    return innerHeight - (outerHeight - innerHeight) + offset - value + 'px'
  }
}

export default new Tools()
