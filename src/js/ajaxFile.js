/**
 * backend와 통신하기 위한 ajax 설정
 */
import config from './config'
import jwt from './jwtToken'
import $ from 'jquery'
import comm from './common'
require('./ajaxTransport')

// ajax 공통함수
var ajaxFile = {
  url: null,
  param: null,
  type: 'GET',
  async: true,
  isSetHeader: true,
  processData: false,
  cache: false,
  // dataType: 'json',
  contentType: 'application/x-www-form-urlencoded; charset: utf-8;',
  accept: 'image/*; application/json;',
  request: null,
  requestFileGet: null,
  requestPost: null,
  requestPut: null,
  requestFile: null,
  defaultErrorHandler: null,
  getErrorMessage: null
}

// 기본 ajax
ajaxFile.request = function (_callbackSuccess, _callbackFail) {
  // 현재 프로토콜, 호스트를 조합하여 url 설정 (내/외부 접속)
  // BACKEND 직접 호출 시, 주석처리
  if (!ajaxFile.url) return null
  ajaxFile.url = ajaxFile.url.charAt(0) === '/' ? ajaxFile.url.substring(1, ajaxFile.url.length) : ajaxFile.url
  var url = config.protocol + config.backEndFullUrl + ajaxFile.url
  // TODO : array 파라미터를 처리하기 위해 traditional 설정(서버 상황에 맞게 설정해야 함)
  // true : `data` are sent as "a=1&a=2&a=3"
  // false : `data` are sent as "a[]=1&a[]=2&a[]=3"
  // 참고 url : https://stackoverflow.com/questions/31152130/is-it-good-to-use-jquery-ajax-with-traditional-true/31152304#31152304
  var traditional = ajaxFile.type.toUpperCase() === 'GET'

  var ajaxOptions = {
    url: url,
    type: 'GET',
    async: true,
    dataType: 'binary',
    processData: false,
    cache: false,
    traditional: traditional,
    beforeSend: function (xhr, settings) {
      if (ajaxFile.isSetHeader) {
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
      xhr.setRequestHeader('accept', 'image/*; application/json;')
      xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
      xhr.setRequestHeader('X-TenantID', config.tenantId)
    },
    success: function (xhr, status, req) {
      if (typeof _callbackSuccess === 'function') _callbackSuccess(xhr, status, req)
      else return xhr
    },
    error: function (xhr, status, err) {
      if (xhr.status >= 400) {
        // status code : 500 -> _fnFail 함수를 못 가져옴!
        if (xhr.hasOwnProperty('error') && xhr.error.needLogin) {
          console.log(':::::::::::: ajax :' + JSON.stringify(xhr))
        }
        
        var appVue = window.getApp
        // TODO : 전역 에러처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        var message = appVue.$t('error.requestError')
        appVue.$emit('APP_REQUEST_ERROR', message)
        // window.alert('message')
        // window.alert('file upload error:' + errorCode + ':' + JSON.stringify(xhr) + ':' + status + ':' + err)
        if (typeof _callbackFail === 'function') {
          _callbackFail(xhr, status, err)
        } else {
          return xhr
        }
      } else {
        appVue.$emit('APP_REQUEST_ERROR', appVue.$t('error.requestError'))
      }
    }
  }
  
  if (ajaxFile.param) { // data는 Object로 보낼 것
    if (ajaxFile.type === 'POST' || ajaxFile.type === 'PUT') {
      ajaxOptions.data = JSON.stringify(ajaxFile.param)
    } else {
      ajaxOptions.data = comm.trim(ajaxFile.param)
    }
  }
  console.log('File:' + JSON.stringify(ajaxOptions))
  $.ajax(ajaxOptions)
}

ajaxFile.requestFileGet = function (_callbackSuccess, _callbackFail) {
  ajaxFile.type = 'GET'
  return ajaxFile.request(_callbackSuccess, _callbackFail)
}

// ajaxFile.requestPost = function (_callbackSuccess, _callbackFail) {
//   ajaxFile.type = 'POST'
//   return ajaxFile.request(_callbackSuccess, _callbackFail)
// }

// ajaxFile.requestPut = function (_callbackSuccess, _callbackFail) {
//   ajaxFile.type = 'PUT'
//   return ajaxFile.request(_callbackSuccess, _callbackFail)
// }

ajaxFile.getErrorMessage = function (_error) {
  if (_error.status === 400) {
    return '[400오류]필수 입력값이 입력되지 않았습니다.'
  }
}

export default ajaxFile
