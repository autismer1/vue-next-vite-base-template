import Cookies from 'js-cookie'

class Cookie {
  get(key) {
    return Cookies.get(key)
  }

  set(key, val) {
    if (Array.isArray(key)) {
      key.forEach((item) => {
        Cookies.set(item.key, item.value)
      })
      return
    }
    Cookies.set(key, val)
  }

  remove(key) {
    Cookies.remove(key)
  }
}

export default new Cookie()
