import moment from 'moment'
import $ from 'jquery'
import config from './config'
var comm = {
  baseDeviceSize : 600,
  getFixedSizeByDevice: null,
  movePage: null,
  clone: null,
  today: new Date(moment().format()),
  getToday: null,
  getPrevDate: null,
  getFirstDayThisYear: null,
  getLastDayThisYear: null,
  getThisMonth: null,
  getPrevMonth: null,
  getFormatDate: null,
  convertStringToDate: null,
  dateCompare: null,
  getDatediff: null,
  fixedStr: null,
  getFilteredArray: null,
  trim: null,
  moment: moment,
  setNumberSeperator: null,
  getPercentage: null
};

/**
 * function name : getDeviceRatio
 * remark : device 크기에 따라서 크기를 동적으로 조정
 * parameters
 *  _baseSize : xs 사이즈(600px) 기준 크기
 *  _breakpoint: $vuetify.breakpoint 개체
 */
comm.getFixedSizeByDevice = function (_baseSize, _breakpoint) {
  if (_breakpoint.xs) return _baseSize;
  else if(_breakpoint.smAndUp) {
    var ratio = window.screen.width / comm.baseDeviceSize;
    return Math.floor(_baseSize * ratio);
  }
}

comm.movePage = function (_$router, _path) {
  console.log('path:' + _path)
  _$router.push({'path': _path})
}

/**
 * function name : clone
 * remark : JSON object 복제
 * @param {*} _json : 원본 JSON object
 */
comm.clone = function (_json) {
  return JSON.parse(JSON.stringify(_json))
}

comm.getToday = function (_isLocalSet) {
  var today = null
  var dateFormat = _isLocalSet ? 'L' : 'YYYY-MM-DD';  // default : ISO format('YYYY-MM-DD)
  return  moment().format(dateFormat)
}

/**
 * 현재날짜를 기준으로 과거 일자를 가져오는 함수
  * @param {} _gapOfDate : 현재일 기준 이전 날짜, 기본값 : 1y (예) 10d - 10일전, 10m - 10개월 전, 10y - 10년전
  * 사용예) comm.getPrevDate('10d')
 */
comm.getPrevDate = function (_gapOfDate, _isLocalSet) {
  let gapOfDate = config.defaultGapOfDate
  if (_gapOfDate) gapOfDate = _gapOfDate
  let div = gapOfDate.substr(gapOfDate.length - 1, 1).toLowerCase()
  let gap = Number(gapOfDate.substring(0, gapOfDate.length - 1))
  let today = new Date(comm.today)
  if (div === 'd') today.setDate(today.getDate() - gap)
  else if (div === 'm') today.setMonth(today.getMonth() - gap)
  else if (div === 'y') today.setYear(today.getFullYear() - gap)

  var prevDate = null;
  var dateFormat = _isLocalSet ? 'L' : 'YYYY-MM-DD';  // default : ISO format('YYYY-MM-DD)
  return  moment(today).format(dateFormat)
}

comm.fixStr = function (_str, _size, _div) {
  if (_str === null || _str.length <= 0) return ''
  var fixedStr = _str.toString()
  for (var i = 0; i < _size - fixedStr.length; i++) {
    fixedStr = _div + fixedStr
  }
  return fixedStr
}

comm.getFormatDate = function (_dateStr, _div) {
  if (_dateStr.length < 8) return null
  _div = typeof _div === 'undefined' ? '-' : _div
  var formatDate = {}
  formatDate.date = ''
  formatDate.hour = []
  if (_dateStr.length === 8) formatDate.date = _dateStr.substring(0, 4) + _div + _dateStr.substring(4, 6) + _div + _dateStr.substring(6, 8)
  else if (_dateStr.length === 12) {
    formatDate.date = _dateStr.substring(0, 4) + _div + _dateStr.substring(4, 6) + _div + _dateStr.substring(6, 8)
    formatDate.hour.push(_dateStr.substring(8, 10))
    formatDate.hour.push(_dateStr.substring(10, 12))
  } else {
    var date = _dateStr.split(' ')
    formatDate.date = date[0]
    formatDate.hour.push(date[1].split(':')[0])
    formatDate.hour.push(date[1].split(':')[1])
  }
  return formatDate
}

/**
 * 배열내 _item을 비교하여 중복된 정보를 제거한 배열
 * @param {*} _array : 원본 배열
 * @param {*} _item : 비교할 정보
 * ex) this.$comm.getFilteredArray(orgArray, item) OR
 *      orgArray = this.$comm.getFilteredArray(orgArray, item)
 */
comm.getFilteredArray = function (_array, _item) {
  var filteredItems = []
  filteredItems = _.filter(_array, function(__item) {
    return _.isEqual(_item, __item)
  })
  if (!filteredItems.length) _array.push(_item)
  return _array
}

/**
 * _fromDate와 _toDate를 비교하는 함수
 * @param _fromDate : 비교 시작일자
 * @param _toDate : 비교 종료일자 : 없을 경우 오늘날짜로 기본값 설정
 * @returns Boolean
 */
comm.dateCompare = function (_fromDate, _toDate) {
  if (!_fromDate) return false
  var fromDate = moment(_fromDate).format('YYYYMMDD')
  var toDate = null
  if (_toDate) toDate = moment(_toDate).format('YYYYMMDD')
  else toDate = moment(comm.today).format('YYYYMMDD')
  console.log('::::::::: toDate:' + toDate)
  return fromDate <= toDate
}

comm.getFirstDayThisYear = function () {
  return comm.today.getFullYear() + '-' + '01-01'
}

comm.getLastDayThisYear = function () {
  return comm.today.getFullYear() + '-' + '12-31'
}

comm.trim = function (_data) {
  if (typeof _data === 'string') return $.trim(_data)
  else if (typeof _data === 'object'){
    try {
      for (var key in _data) {
        if (_data[key] && typeof _data[key] === 'string') _data[key] = $.trim(_data[key])
      }
      return _data
    } catch (e) {
      console.log(':::::::::::: trim error:' + e.message)
      return _data
    }
  }
}
/**
 * 날짜를 받아와서 두 날의 차이일수를 가져오는 함수
 * @param {*필수} _firstDate : 비교날짜 1
 * @param _secondDate : 비교날짜 2, 없으면
 * @return 차이일수
 */
comm.getDatediff = function(_firstDate, _secondDate) {
  if (!_firstDate) return null
  if (!_secondDate) _secondDate = comm.today
  return Math.round((_secondDate - _firstDate)/(1000*60*60*24))
}

/**
 * string으로 날짜형식을 Date형식으로 변환
 * @param {*필수} _strDate : string형식의 날짜값
 * @param _spliter : 년월일 구분자(기본값: '-')
 * @return Date
 * @example comm.convertStringToDate('2018-12-12', '-')
 */
comm.convertStringToDate = function(_strDate, _spliter) {
  if (!_spliter) _spliter = '-'
  var dateArray = _strDate.split(_spliter)
  return new Date(_strDate)
}

comm.getThisMonth = function(_format) {
  _format = _format ? _format : 'YYYYMM'
  if (_format === 'locale') {
    var formatL = moment.localeData().longDateFormat('L');
    _format = formatL.replace(/D/g,'').replace(/^\W|\W$|\W\W/,'');
  }
  return moment().format(_format)
}

comm.getPrevMonth = function (_prev, _format) {
  _format = _format ? _format : 'YYYYMM'
  if (_format === 'locale') {
    var formatL = moment.localeData().longDateFormat('L');
    _format = formatL.replace(/D/g,'').replace(/^\W|\W$|\W\W/,'');
  }
  return moment().add(Math.abs(_prev) * -1, 'M').format(_format)
}

comm.setNumberSeperator = (_number) => {
  if (isNaN(_number)) return null
  return _number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

comm.getPercentage = (_target, _devider) => {
  _devider = _devider <= 0 ? 1 : _devider;
  return Math.ceil((_target / _devider) * 100);
}

export default comm;