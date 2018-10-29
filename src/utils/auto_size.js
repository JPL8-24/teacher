function debounce(fn, delay) {
  let timer = null
  return function() {
    let context = this
    let arg = arguments
    clearTimeout(timer)
    timer = setTimeout(function() {
      fn.apply(context,arguments)
    },delay)
  }
}

(function(win,doc) {
    let docEl = doc.documentElement
    let evt = "onorientationchange" in window? "onorientationchange":"resize",
      fn = function() {
        let width = docel.clientWidth
        width && (docEle.style.fontSize = 100 * (width / 750) + 'px')
        console.log(docEle.style.fontSize)
      }
      win.addEventListener('evt',debounce(fn,100),false)
      doc.addEventListener('DOMContentLoaded',debounce(fn,100),false)
}(window,document))
