/**
 * backend와 통신하기 위한 ajax 설정
 */
import config from './config'
import jwt from './jwtToken'
import $ from 'jquery'
import comm from './common'

// ajax 공통함수
var ajax = {
  url: null,
  param: null,
  type: 'GET',
  async: true,
  isSetHeader: true,
  isAuthCheck: false,
  processData: true,
  dataType: 'json',
  contentType: 'application/json;charset=utf-8',
  ajaxPid: null,  // ajax 요청의 key값 millisecond 데이터
  isRetry:  false,  // network 커넥션 오류로 인해 재전송 처리 요청 여부(true: 재전송 중, false: 일반 요청)
  accept: null,
  request: null,
  requestGet: null,
  requestPost: null,
  requestPut: null,
  requestFile: null,
  defaultErrorHandler: null,
  getErrorMessage: null,
  isLogin: null
}

var orgAjax = {
  url: null,
  param: null,
  type: 'GET',
  async: true,
  isRetry:  false,
  isSetHeader: true,
  isAuthCheck: false,
  processData: true,
  dataType: 'json',
  contentType: 'application/json;charset=utf-8',
  ajaxPid: null
}

// 기본 ajax
ajax.request = function (_callbackSuccess, _callbackFail) {
  // 현재 프로토콜, 호스트를 조합하여 url 설정 (내/외부 접속)
  // BACKEND 직접 호출 시, 주석처리
  if (!ajax.url) return null
  ajax.url = ajax.url.charAt(0) === '/' ? ajax.url.substring(1, ajax.url.length) : ajax.url
  var url = ajax.isAuthCheck ? config.protocol + config.backEndAuthFullUrl + ajax.url : config.protocol + config.backEndFullUrl + ajax.url

  console.log(':::::::::::::::::::::: ajax : ' + url)
  // TODO : array 파라미터를 처리하기 위해 traditional 설정(서버 상황에 맞게 설정해야 함)
  // true : `data` are sent as "a=1&a=2&a=3"
  // false : `data` are sent as "a[]=1&a[]=2&a[]=3"
  // 참고 url : https://stackoverflow.com/questions/31152130/is-it-good-to-use-jquery-ajax-with-traditional-true/31152304#31152304
  var traditional = ajax.type.toUpperCase() === 'GET'
  let appVue = window.getApp  // App.vue Object

  let ajaxPid = comm.moment().valueOf() // ajax 고유 프로세스 id millisecond 정보
  // 백업이 필요한 경우 : POST 또는 PUT request 이면서, 재전송 처리가 아닐 경우
  let isNeedBackup = (ajax.type === 'POST' || ajax.type === 'PUT') && !ajax.isRetry

  // 현재의 요청을 필요시 App.vue에 백업해둔다.(네트워크 오류가 발생하면 복원하기 위함)
  var thisRequest = null
  if (isNeedBackup) {
    thisRequest = {
      ajaxPid: ajaxPid,
      url: ajax.url,
      param: ajax.param,
      type: ajax.type
    };
    appVue.addAjaxRequest(thisRequest)
  }
  
  var ajaxOptions = {
    type: ajax.type,
    async: ajax.async,
    url: url,
    dataType: ajax.dataType,
    contentType: ajax.contentType, // 필수,
    traditional: traditional,
    // cache: false,
    beforeSend: function (xhr) {
      if (ajax.isSetHeader) {
        var token = jwt.getJwtToken()
        if (typeof token === 'undefined' || !token) {
          var error = {message: 'Invalid Token', needLogin: true}
          if (typeof _callbackFail === 'function') {
            _callbackFail(error)
          } else {
            return error
          }
        }
        xhr.setRequestHeader('X-Authorization', token)
      }
      if (ajax.accept) {
        xhr.setRequestHeader('accept', ajax.accept)
      }
      xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
      xhr.setRequestHeader('X-TenantID', config.tenantId)
    },
    success: function (xhr, status, req) {
      // 복원처리시 알림 메시지 표시
      if (ajax.isRetry) appVue.$emit('APP_REQUEST_SUCCESS', '복원작업이 성공적으로 이루어 졌습니다.')
      // 성공한 요청은 삭제한다.
      else if (isNeedBackup) appVue.removeAjaxRequest(ajaxPid)

      for(var key in orgAjax) {
        ajax[key] = orgAjax[key]
      }

      if (typeof _callbackSuccess === 'function') _callbackSuccess(xhr, status, req)
      else return xhr
    },
    error: function (xhr, status, err) {
      // console.log(':::::::::::::::: error:' + JSON.stringify(xhr))
      
      // PUT/ POST 일 경우 현재 네트워크 상태를 가져와서 offline일 경우 후속 처리를 위해 localStorage에 저장한다.
      // if (isNeedBackup &&  !appVue.getNetworkConnection()) {
      //   window.alert('network error:' + )
      //   appVue.addAjaxRequest(thisRequest)
      // }

      // 네트워크 상태가 정상적이라면, 일반 오류로 판단하고 백업에서 제거한다.
      if (appVue.getNetworkConnection()) appVue.removeAjaxRequest(ajaxPid)

      for(var key in orgAjax) {
        ajax[key] = orgAjax[key]
      }
      var errorCode = Number(xhr.status)
      var message = appVue.$t('error.requestError')
      var responseText = JSON.parse(xhr.responseText)
       if (responseText.hasOwnProperty('errorMessage')) message = responseText.errorMessage
      // console.log('error:' + errorCode + ':' + JSON.stringify(xhr) + ':' + status + ':' + err)
      // window.alert('error:' + errorCode + ':' + JSON.stringify(xhr) + ':' + status + ':' + err)

      appVue.$emit('APP_REQUEST_ERROR', message)
      if (errorCode >= 400 && errorCode < 500) {
        // status code : 500 -> _fnFail 함수를 못 가져옴!
        if (xhr.hasOwnProperty('error') && xhr.error.needLogin) {
          console.log(':::::::::::: ajax :' + JSON.stringify(xhr))
        }
        
        // TODO : 전역 에러처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (typeof _callbackFail === 'function') {
          _callbackFail(xhr, status, err)
        } else {
          return xhr
        }
      } else if (status === 'error') {
        if (typeof _callbackFail === 'function') {
          _callbackFail(xhr, status, err)
        } 
      }
    }
  }
  
  if (ajax.param) { // data는 Object로 보낼 것
    if (ajax.type === 'POST' || ajax.type === 'PUT') {
      ajaxOptions.data = JSON.stringify(ajax.param)
    } else {
      ajaxOptions.data = comm.trim(ajax.param)
    }
  }

  $.ajax(ajaxOptions)

  // for test
  // if (isNeedBackup) {
  //   window.alert('disConnected wifi in 10sec')
  //   setTimeout(() => {
  //     $.ajax(ajaxOptions)
  //   }, 10000);   
  // } else $.ajax(ajaxOptions)
}

ajax.requestGet = function (_callbackSuccess, _callbackFail) {
  ajax.type = 'GET'
  return ajax.request(_callbackSuccess, _callbackFail)
}

ajax.requestPost = function (_callbackSuccess, _callbackFail) {
  ajax.type = 'POST'
  return ajax.request(_callbackSuccess, _callbackFail)
}

ajax.requestPut = function (_callbackSuccess, _callbackFail) {
  ajax.type = 'PUT'
  return ajax.request(_callbackSuccess, _callbackFail)
}

ajax.getErrorMessage = function (_error) {
  if (_error.status === 400) {
    return '[400오류]필수 입력값이 입력되지 않았습니다.'
  }
}

ajax.isLogin = function () {
  var token = jwt.getJwtToken()
  return typeof token !== 'undefined' && token !== null
}

export default ajax
