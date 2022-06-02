/**
 * 适配尺寸 375
 * 10px = 10 / 20 = 0.5rem
 */

export default function (doc, win) {
  const docEl = doc.documentElement
  const resizeEvt =
    'orientationchange' in window ? 'orientationchange' : 'resize'

  function recalc() {
    const clientWidth = docEl.clientWidth
    if (!clientWidth) return
    docEl.style.fontSize = 20 * (clientWidth / 375) + 'px'
  }

  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
  return 20 * (docEl.clientWidth / 375)
}
