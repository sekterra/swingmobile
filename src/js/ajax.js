/**
 * backend와 통신하기 위한 ajax 설정
 */
import config from './config'

// ajax 공통함수
var ajax = {
  url: null,
  param: null,
  type: 'GET',
  async: true,
  isSetHeader: true,
  dataType: 'json',
  contentType: 'application/json;charset=utf-8',
  request: null,
  requestGet: null,
  requestPost: null,
  requestPut: null,
  requestFile: null,
  defaultErrorHandler: null,
  getErrorMessage: null
}

// 기본 ajax
ajax.request = function (_callbackSuccess, _callbackFail) {
  // 현재 프로토콜, 호스트를 조합하여 url 설정 (내/외부 접속)
  // BACKEND 직접 호출 시, 주석처리
  var url = config.protocol + config.backEndFullUrl + '/' + ajax.url
  var ajaxOptions = {
    type: ajax.type,
    async: ajax.async,
    url: url,
    dataType: ajax.dataType,
    contentType: ajax.contentType, // 필수,
    // cache: false,
    beforeSend: function (xhr) {
      // if (ajax.isSetHeader) {
      //   var token = jwt.getJwtToken()
      //   if (typeof token === 'undefined' || !token) {
      //     window.location.href = '/'
      //     return
      //   }
      //   xhr.setRequestHeader('X-Authorization', token)
      // }
      xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
    },
    success: function (xhr, status, req) {
      if (typeof _callbackSuccess === 'function') _callbackSuccess(xhr, status, req)
      else return xhr
    },
    error: function (xhr, status, err) {
      if (xhr.status >= 400) {
        // status code : 500 -> _fnFail 함수를 못 가져옴!
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
      ajax.param = JSON.stringify(ajax.param)
    }
    ajaxOptions.data = ajax.param
  }
  $.ajax(ajaxOptions)
}

ajax.requestGet = function (_callbackSuccess, _callbackFail) {
  ajax.type = 'GET'
  ajax.request(_callbackSuccess, _callbackFail)
}

ajax.requestPost = function (_callbackSuccess, _callbackFail) {
  ajax.type = 'POST'
  ajax.request(_callbackSuccess, _callbackFail)
}

ajax.requestPut = function (_callbackSuccess, _callbackFail) {
  ajax.type = 'PUT'
  ajax.request(_callbackSuccess, _callbackFail)
}

ajax.getErrorMessage = function (_error) {
  if (_error.status === 400) {
    return '[400오류]필수 입력값이 입력되지 않았습니다.'
  }
}

export default ajax
