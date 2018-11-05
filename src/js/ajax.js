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
  accept: null,
  request: null,
  requestGet: null,
  requestPost: null,
  requestPut: null,
  requestFile: null,
  defaultErrorHandler: null,
  getErrorMessage: null
}

var orgAjax = {
  url: null,
  param: null,
  type: 'GET',
  async: true,
  isSetHeader: true,
  isAuthCheck: false,
  processData: true,
  dataType: 'json',
  contentType: 'application/json;charset=utf-8'
}

// 기본 ajax
ajax.request = function (_callbackSuccess, _callbackFail) {
  // 현재 프로토콜, 호스트를 조합하여 url 설정 (내/외부 접속)
  // BACKEND 직접 호출 시, 주석처리
  if (!ajax.url) return null
  ajax.url = ajax.url.charAt(0) === '/' ? ajax.url.substring(1, ajax.url.length) : ajax.url
  var url = ajax.isAuthCheck ? config.protocol + config.backEndAuthFullUrl + ajax.url : config.protocol + config.backEndFullUrl + ajax.url
  // TODO : array 파라미터를 처리하기 위해 traditional 설정(서버 상황에 맞게 설정해야 함)
  // true : `data` are sent as "a=1&a=2&a=3"
  // false : `data` are sent as "a[]=1&a[]=2&a[]=3"
  // 참고 url : https://stackoverflow.com/questions/31152130/is-it-good-to-use-jquery-ajax-with-traditional-true/31152304#31152304
  var traditional = ajax.type.toUpperCase() === 'GET'

  let appVue = window.getApp
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
      xhr.setRequestHeader('X-TenantID', 'yullin') // 개발버전
    },
    success: function (xhr, status, req) {
      // ajax.url = null
      // ajax.param = null
      // ajax.accept = null
      // ajax.contentType = 'application/json;charset=utf-8'
      // ajax.processData = true

      for(var key in orgAjax) {
        ajax[key] = orgAjax[key]
      }

      // if (xhr.hasOwnProperty('token')) {
      //   jwt.checkValidToken((data) => {
      //     if (data === '' || data === 'undefined') {
      //       window.alert('jwt error')
      //       comm.movePage('/')
      //       return
      //     }
      //     console.log('user info:' + JSON.stringify(data))
      //     appVue.setUserPk(data.userpk)
      //   })
      // }

      if (typeof _callbackSuccess === 'function') _callbackSuccess(xhr, status, req)
      else return xhr
    },
    error: function (xhr, status, err) {
      // ajax.url = null
      // ajax.param = null
      // ajax.accept = null
      // ajax.contentType = 'application/json;charset=utf-8'
      // ajax.processData = true
      for(var key in orgAjax) {
        ajax[key] = orgAjax[key]
      }

      if (xhr.status >= 400) {
        // status code : 500 -> _fnFail 함수를 못 가져옴!
        if (xhr.hasOwnProperty('error') && xhr.error.needLogin) {
          console.log(':::::::::::: ajax :' + JSON.stringify(xhr))
        }
        
        
        // TODO : 전역 에러처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        var message = appVue.$t('error.requestError')
        var responseText = JSON.parse(xhr.responseText)
        if (responseText.hasOwnProperty('errorMessage')) message = responseText.errorMessage
        appVue.$emit('APP_REQUEST_ERROR', message)
        if (typeof _callbackFail === 'function') {
          _callbackFail(xhr, status, err)
        } else {
          return xhr
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

export default ajax
