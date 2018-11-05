import ajax from './ajax.js'
import cookie from './cookie.js'

ajax.isAuthCheck = true

// jwt 공통함수
var jwt = {
  getJwtToken: null,
  getNewToken: null,
  checkValidToken: null
}

// 쿠키에 저장된 토큰 가져오는 함수
jwt.getJwtToken = function () {
  var jwtToken = cookie.getCookie('jwtToken')

  // jwtToken === '' 일 경우
  if (!jwtToken) {
    console.log('정상적인 접근이 아니거나 오류가 발생했습니다.')
    return null
  }

  return jwtToken
}

jwt.setJwtToken = function (_value) {
  var value = 'Bearer ' + _value
  cookie.setCookie('jwtToken', value)
}

// 새 토큰 발급 및 쿠키에 저장된 토큰 갱신
jwt.getNewToken = function () {
  // jwt 토큰 갱신
  ajax.requestGet('auth/auth/valid', null, (data) => {
    // 기존 토큰 삭제 후
    // 새 토큰 쿠키에 저장
  }, (data) => {
    // 인증이 안되서(말바꾸기) 로그인화면으로 이동합니다.
    // 로그인화면 이동
  })
}

// 토큰인증함수
jwt.checkValidToken = function (fnSuceess, fnFail) {
  ajax.isSetHeader = true
  ajax.isAuthCheck = true
  ajax.url = 'auth/valid'
  ajax.requestGet(fnSuceess, fnFail)
}

export default jwt
