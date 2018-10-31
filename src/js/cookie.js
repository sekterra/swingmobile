
var cookie = {
  setCookie: null,
  getCookie: null,
  deleteCookie: null
}

cookie.setCookie = function (name, value) {
  var date = new Date()
  date.setTime(date.getTime() + 24 * 60 * 60 * 1000) // expire time : 24시간
  document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/'
}

cookie.getCookie = function (name) {
  var cookieNm = name + '='
  var cookies = document.cookie.split(';')
  for (var i = 0; i < cookies.length; i++) {
    var c = cookies[i]
    while (c.charAt(0) === ' ') c = c.substring(1)
    if (c.indexOf(cookieNm) === 0) {
      return c.substring(cookieNm.length, c.length)
    }
  }
  return ''
}

cookie.deleteCookie = function (name) {
  var cookieDate = new Date()
  cookieDate.setTime(cookieDate.getTime() - 24 * 60 * 60 * 1000)
  document.cookie = name += '=; expires=' + cookieDate.toGMTString()
}

export default cookie
