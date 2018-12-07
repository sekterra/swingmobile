/**
 * statusConfig.js에서 정의된 통계정보를 실제로 조회
 * 함수명은 statusConfig의 자식 key값과 동일해야 함
 */
import ajax from '@/js/ajax.js'
import comm from '@/js/common.js'
import selectConfig from '@/js/selectConfig.js'
import $ from 'jquery'

let appVue = window.getApp

let statusMethod = {
  /******* equipment *******/
  /**
   * 현재 설치된 설비수를 가져오는 함수
   * @param {*object} _param 
   */
  installedEquipment(_param) {
    ajax.url = selectConfig.equipmentList[0].url
    ajax.param = comm.clone(selectConfig.equipmentList[0].searchData)
    var self = this
    ajax.requestGet((_result) => {
      var data = _result.content
      var statusData = {}
      statusData.key = _param.key
      statusData.data = {}
      statusData.data.totalBreakdownCount = 0
      statusData.data.value = 0
      $.each(data, function (_i, _item){
        // if (_item.equipStatusCd === 'EQUIP_STATUS_B') statusData.data.totalBreakdownCount++;
        statusData.data.value++;
      })

      // statusData.data.utilizationRate = []
      // statusData.data.utilizationRate.push({
      //   value: comm.getPercentage(statusData.data.totalCount - statusData.data.totalBreakdownCount, statusData.data.totalCount)
      // })

      appVue.$emit('STATUS_METHOD_CALLBACK', statusData)
    })
  },
  /**
   * 현재 설치된 설비수를 가져오는 함수
   * @param {*object} _param 
   */
  breakdownEquipment(_param) {
    ajax.url = selectConfig.equipmentList[0].url
    ajax.param = comm.clone(selectConfig.equipmentList[0].searchData)
    var self = this
    ajax.requestGet((_result) => {
      var data = _result.content
      var statusData = {}
      statusData.key = _param.key
      statusData.data = {}
      statusData.data.totalBreakdownCount = 0
      statusData.data.value = 0
      $.each(data, function (_i, _item){
        if (_item.equipStatusCd === 'EQUIP_STATUS_B') statusData.data.value++;
      })

      // statusData.data.utilizationRate = []
      // statusData.data.utilizationRate.push({
      //   value: comm.getPercentage(statusData.data.totalCount - statusData.data.totalBreakdownCount, statusData.data.totalCount)
      // })

      appVue.$emit('STATUS_METHOD_CALLBACK', statusData)
    })
  },
  /**
   * 현재 설비 가동률 조회
   * @param {*} _param 
   */
  equipmentUtilizationRate(_param) {
    ajax.url = selectConfig.equipmentList[0].url
    ajax.param = comm.clone(selectConfig.equipmentList[0].searchData)
    var self = this
    ajax.requestGet((_result) => {
      var data = _result.content
      var statusData = {}
      statusData.key = _param.key
      statusData.data = {}
      var totalBreakdownCount = 0
      var totalCount = 0
      $.each(data, function (_i, _item){
        if (_item.equipStatusCd === 'EQUIP_STATUS_B') totalBreakdownCount++;
        totalCount++;
      })

      statusData.data.value = []
      statusData.data.value.push({
        value: comm.getPercentage(totalCount - totalBreakdownCount, totalCount)
      })
      appVue.$emit('STATUS_METHOD_CALLBACK', statusData)
    })
  },
  // 설비별 유지보수 비용
  maintenanceCost(_param) {
    var url = selectConfig.equipment.maintenanceCost.url
    if (_param.dateType === 'YEAR') url += 'year'
    else url += 'month'
    ajax.url = url
    ajax.param = comm.clone(selectConfig.equipment.maintenanceCost.searchData)
    ajax.param.dateType =  _param.dateType
    if (!isNaN(_param.startDate) && !isNaN(_param.endDate)) {
      ajax.param.startDate = _param.startDate
      ajax.param.endDate = _param.endDate
    } else {
      var dateFormat = _param.dateType === 'YEAR' ? 'YYYY' : 'YYYYMM'
      ajax.param.startDate = comm.getPrevDate(_param.startDate, dateFormat)
      ajax.param.endDate = comm.getPrevDate(_param.endDate, dateFormat)
    }
    
    let self = this
    ajax.requestGet((_result) => {
      var result = _result.content
      var dataList = [] // 월/년도별 항목 데이터
      var xAxisLabels = []  // x축 항목별 라벨
      
      // bar, line차트는 series별로 데이터를 가짐
      dataList.push(new Array())

      $.each(result, (_i, _item) => {
        xAxisLabels.unshift(_item.equipCd)
        dataList[0].unshift(Math.ceil(_item.totCost / _param.unit))
      })
      var statusData = {}
      statusData.key = _param.key
      statusData.data = {}
      statusData.data.value = dataList
      statusData.data.xAxisLabels = xAxisLabels
      appVue.$emit('STATUS_METHOD_CALLBACK', statusData)
    })
  },
  // 고장 타입별 다운타임
  equipmentOfDowntime(_param) {
    var url = selectConfig.equipmentList[1].url
    if (_param.dateType === 'YEAR') url += 'year'
    else url += 'month'
    ajax.url = url
    ajax.param = comm.clone(selectConfig.equipmentList[1].searchData)

    ajax.param.dateType =  _param.dateType
    // if (comm.moment.isDate(_param.startDate) && comm.moment.isDate(_param.endDate)) {
    // 원래는 위의 로직으로 처리해야 하는데 데이터가 YYYY 또는 YYYYMM 으로 들어와서 처리가 안 됨
    if (!isNaN(_param.startDate) && !isNaN(_param.endDate)) {
      ajax.param.startDate = _param.startDate
      ajax.param.endDate = _param.endDate
    } else {
      var dateFormat = _param.dateType === 'YEAR' ? 'YYYY' : 'YYYYMM'
      ajax.param.startDate = comm.getPrevDate(_param.startDate, dateFormat)
      ajax.param.endDate = comm.getPrevDate(_param.endDate, dateFormat)
    }

    ajax.requestGet((_result) => {
      var data = _result.content
      var item = {}
      var prevYearMon = ''
      var xAxisLabels = []
      var dataList = [] // 월/년도별 항목 데이터

       // bar, line차트는 series별로 데이터를 가짐
       dataList.push(new Array())
     
      $.each(data, function (_i, _item){
        if (prevYearMon !== _item.yearMon) {
          if (prevYearMon !== '') {
            xAxisLabels.unshift(item.month)
            dataList[0].unshift(item.breakTime)
          }
          item = {}
          item.month =  _item.yearMon
          item.breakTime = _item.totBreakTime
        } else item.breakTime += _item.totBreakTime

        if (_i === data.length - 1) {
          if (_i > 0) item.breakTime += _item.totBreakTime
          xAxisLabels.unshift(item.month)
          dataList[0].unshift(item.breakTime)
        }
        prevYearMon = _item.yearMon
      })

      var statusData = {}
      statusData.key = _param.key
      statusData.data = {}
      statusData.data.value = dataList
      statusData.data.xAxisLabels = xAxisLabels
      appVue.$emit('STATUS_METHOD_CALLBACK', statusData)
    })
  },
  /**
   * 기간별 mttr
   */
  mttr(_param) {
    ajax.url = selectConfig.equipment.mttr.url
    ajax.param = comm.clone(selectConfig.equipment.mttr.searchData)

    ajax.param.dateType =  _param.dateType
    // if (comm.moment.isDate(_param.startDate) && comm.moment.isDate(_param.endDate)) {
    // 원래는 위의 로직으로 처리해야 하는데 데이터가 YYYY 또는 YYYYMM 으로 들어와서 처리가 안 됨
    if (!isNaN(_param.startDate) && !isNaN(_param.endDate)) {
      ajax.param.startDate = _param.startDate
      ajax.param.endDate = _param.endDate
    } else {
      var dateFormat = _param.dateType === 'YEAR' ? 'YYYY' : 'YYYYMM'
      ajax.param.startDate = comm.getPrevDate(_param.startDate, dateFormat)
      ajax.param.endDate = comm.getPrevDate(_param.endDate, dateFormat)
    }
    
    let self = this
    ajax.requestGet((_result) => {
      var result = _result.content
      var xAxisLabels = []
      var dataList = [] // 월/년도별 항목 데이터
      
      dataList.push(new Array())
      
      $.each(result, (_i, _item) => {
        xAxisLabels.unshift(_item.equipCd)
        dataList[0].unshift(_item.calculateValue)
      })

      var statusData = {}
      statusData.key = _param.key
      statusData.data = {}
      statusData.data.value = dataList
      statusData.data.xAxisLabels = xAxisLabels
      appVue.$emit('STATUS_METHOD_CALLBACK', statusData)
    })
  },
  /**
   * 기간별 MTBF
   */
  mtbf(_param) {
    ajax.url = selectConfig.equipment.mtbf.url
    ajax.param = comm.clone(selectConfig.equipment.mtbf.searchData)

    ajax.param.dateType =  _param.dateType
    if (!isNaN(_param.startDate) && !isNaN(_param.endDate)) {
      ajax.param.startDate = _param.startDate
      ajax.param.endDate = _param.endDate
    } else {
      var dateFormat = _param.dateType === 'YEAR' ? 'YYYY' : 'YYYYMM'
      ajax.param.startDate = comm.getPrevDate(_param.startDate, dateFormat)
      ajax.param.endDate = comm.getPrevDate(_param.endDate, dateFormat)
    }
    
    let self = this
    ajax.requestGet((_result) => {
      var result = _result.content
      var xAxisLabels = []
      var dataList = [] // 월/년도별 항목 데이터
      
      dataList.push(new Array())
      
      $.each(result, (_i, _item) => {
        xAxisLabels.unshift(_item.equipCd)
        dataList[0].unshift(_item.calculateValue)
      })

      var statusData = {}
      statusData.key = _param.key
      statusData.data = {}
      statusData.data.value = dataList
      statusData.data.xAxisLabels = xAxisLabels
      appVue.$emit('STATUS_METHOD_CALLBACK', statusData)
    })
  },
  /******* equipment *******/

  /******* wo *******/
  /**
   * 현재 설치된 설비와 고장난 설비 수를 가져오는 함수
   * @param {*object} _param 
   */
  woCost(_param) {
    ajax.url = selectConfig.wo.totalCostAndHour.url;
    ajax.param = comm.clone(selectConfig.wo.totalCostAndHour.searchData);
    ajax.param.dateType = _param.dateType
    var dateFormat = _param.dateType === 'YEAR' ? 'YYYY' : 'YYYY-MM'
    ajax.param.startDate = comm.getPrevDate(_param.startDate, dateFormat)
    ajax.param.endDate = comm.getPrevDate(_param.endDate, dateFormat)

    var sumMaterialCosts = 0; // 자재비 합계
    var sumLaborCosts = 0;  // 인건비 합계
    var sumOutSourcingCosts = 0;  // 외주비 합계
    var sumEtcCosts = 0;  // 기타비용 합계
    ajax.requestGet((_result) => {
      var result = _result.content
      $.each(result, (_i, _item) => {
        sumMaterialCosts += _item.mtrlCost;
        sumLaborCosts += _item.laborCost;
        sumOutSourcingCosts += _item.outsideCost;
        sumEtcCosts += _item.etcCost;
      })

      var statusData = {}
      statusData.key = _param.key
      statusData.data = {}
      statusData.data.value = comm.setNumberSeperator(Math.ceil((sumMaterialCosts + sumLaborCosts + sumOutSourcingCosts + sumEtcCosts) / 1000));
      appVue.$emit('STATUS_METHOD_CALLBACK', statusData)
    });
  },
  /**
   * 현재 설치된 설비와 고장난 설비 수를 가져오는 함수
   * @param {*object} _param 
   */
  woHour(_param) {
    ajax.url = selectConfig.wo.totalCostAndHour.url;
    ajax.param = comm.clone(selectConfig.wo.totalCostAndHour.searchData);
    ajax.param.dateType = _param.dateType
    var dateFormat = _param.dateType === 'YEAR' ? 'YYYY' : 'YYYY-MM'
    ajax.param.startDate = comm.getPrevDate(_param.startDate, dateFormat)
    ajax.param.endDate = comm.getPrevDate(_param.endDate, dateFormat)

    var sumHour = 0;  // 작업시간 합계
    ajax.requestGet((_result) => {
      var result = _result.content
      $.each(result, (_i, _item) => {
        sumHour += _item.totWorkHour;
      })

      var statusData = {}
      statusData.key = _param.key
      statusData.data = {}
      statusData.data.value = comm.setNumberSeperator(sumHour);
      appVue.$emit('STATUS_METHOD_CALLBACK', statusData)
    });
  },
  /**
   * 오늘의 WO 완료율을 가져오는 함수
   * @param {*object} _param 
   */
  woCompleteRateToday(_param) {
    ajax.url = selectConfig.woList[0].url
    ajax.param = comm.clone(selectConfig.woList[0].searchData)
    ajax.param.woStatus = ['WO_STATUS_P', 'WO_STATUS_C']  // WO 승인, 완료만 조회
    ajax.param.woStatusEx = ['WO_STATUS_X'] // WO 취소는 제외
    ajax.param.dateConds = 'startdt'
    ajax.param.startDate = comm.getToday()
    ajax.param.endDate = comm.getToday()
    let self = this
    ajax.requestGet((_result) => {
      var result = _result.content
      // WO 완료율 계산
      var woCompleteArray = result.filter((_item) => {
        return _item.woStatusCd === 'WO_STATUS_C'
      });

      var statusData = {}
      statusData.key = _param.key
      statusData.data = {}
      statusData.data.value = comm.getPercentage(woCompleteArray.length, result.length);
      statusData.data.headline = woCompleteArray.length.toString() + '/' + result.length.toString() + ' ';

      appVue.$emit('STATUS_METHOD_CALLBACK', statusData)
    })
  },
  /**
   * WO 완료율을 가져오는 함수
   * @param {*object} _param 
   */
  woCompleteRate(_param) {
    ajax.url = selectConfig.wo.woCompeteRateByMonth.url
    ajax.param = comm.clone(selectConfig.wo.woCompeteRateByMonth.searchData)
    
    ajax.param.dateType =  _param.dateType
    var dateFormat = _param.dateType === 'YEAR' ? 'YYYY' : 'YYYYMM'
    if (!isNaN(_param.startDate) && !isNaN(_param.endDate)) {
      ajax.param.startDate = _param.startDate
      ajax.param.endDate = _param.endDate
    } else {
      ajax.param.startDate = comm.getPrevDate(_param.startDate, dateFormat)
      ajax.param.endDate = comm.getPrevDate(_param.endDate, dateFormat)
    }

    ajax.requestGet((_result) => {
      var item = {}
      var prevYearMon = null
      var xAxisLabels = []
      var dataList = [] // 월/년도별 항목 데이터

      // bar, line차트는 series별로 데이터를 가짐
      dataList.push(new Array())
      
      var startDate = comm.moment(_param.startDate, dateFormat)
      var endDate = comm.moment(_param.endDate, dateFormat)
      var dateDiff = _param.dateType === 'YEAR' ? endDate.diff(startDate, 'years') : endDate.diff(startDate, 'months')
      dateDiff = Math.abs(dateDiff) ? Math.abs(dateDiff) : 1
      var totalWoCount = 0
      var completeWoCount = 0

      for(var i = 0; i < dateDiff; i++) {
        var curData = _param.dateType === 'YEAR' ? comm.getPrevYear(i) : comm.getPrevMonth(i)
        var tmpArray = _result.filter((_item) => {
          return curData === _item.yearMon.split('.').join('')
        })
        xAxisLabels.unshift(curData)
        if (tmpArray.length <= 0) dataList[0].unshift(0)
        else {
          totalWoCount = tmpArray.reduce(function (sum, _item) {
              return sum + _item.totWoCnt;
          }, 0);

          completeWoCount = tmpArray.reduce(function (sum, _item) {
              return sum + _item.okWoCnt;
          }, 0);
          dataList[0].unshift(comm.getPercentage(completeWoCount, totalWoCount))
        }
      }

      // $.each(_result, function (_i, _item){
      //   if (prevYearMon !== _item.yearMon) {
      //     if (prevYearMon) {
      //       xAxisLabels.unshift(item.yearMon)
      //       dataList[0].unshift(comm.getPercentage(item.completeWoCount, item.totalWoCount))
      //     }
      //     item = {}
      //     item.yearMon = _item.yearMon
      //     item.totalWoCount = _item.totWoCnt
      //     item.completeWoCount = _item.okWoCnt
      //   } else {
      //     item.totalWoCount += _item.totWoCnt
      //     item.completeWoCount += _item.okWoCnt
      //   }

      //   if (_i === _result.length - 1) {
      //     if (_i > 0) {
      //       item.yearMon = _item.yearMon
      //       item.totalWoCount += _item.totWoCnt
      //       item.completeWoCount += _item.okWoCnt
      //     }
      //     xAxisLabels.unshift(item.yearMon)
      //     dataList[0].unshift(comm.getPercentage(item.completeWoCount, item.totalWoCount))
      //   }
      //   prevYearMon = _item.yearMon
      // })

      var statusData = {}
      statusData.key = _param.key
      statusData.data = {}
      statusData.data.value = dataList
      statusData.data.xAxisLabels = xAxisLabels
      appVue.$emit('STATUS_METHOD_CALLBACK', statusData)
    })
  },
  /**
   * 월별 년도별 작업비용
   * @param {*} _param 
   */
  woCosts(_param) {
    ajax.url = selectConfig.wo.woCostsByMonth.url
    ajax.param = comm.clone(selectConfig.wo.woCostsByMonth.searchData)
    ajax.param.dateType =  _param.dateType
    var dateFormat = _param.dateType === 'YEAR' ? 'YYYY' : 'YYYYMM'
    if (!isNaN(_param.startDate) && !isNaN(_param.endDate)) {
      ajax.param.startDate = _param.startDate
      ajax.param.endDate = _param.endDate
    } else {
      ajax.param.startDate = comm.getPrevDate(_param.startDate, dateFormat)
      ajax.param.endDate = comm.getPrevDate(_param.endDate, dateFormat)
    }
    
    let self = this
    ajax.requestGet((_result) => {
      var result = _result.filter((_item) => {
        return _item.deptNm !== 'SUBSUM' && _item.deptNm !== 'TOTSUM'
      })
      var xAxisLabels = []
      var dataList = [] // 월/년도별 항목 데이터
      var totCost = 0
      var mtrlCost = 0
      var laborCost = 0
      var outsideCost = 0
      // var completeWoCount = 0
      // var series = [
      //   {name: t('title.materialCost'), type: 'bar'},
      //   {name: t('title.laborCost'), type: 'bar'},
      //   {name: t('title.outsourcingCost'), type: 'bar'},
      //   // {name: t('title.totalCost'), type: 'bar'}
      //   // {name: t('title.totalCost'), type: 'line', yAxisIndex: 1},
      // ]
      // if (_type === 'year') self.dataset.woCostsYears.series = series
      // else self.dataset.woCostsMonths.series = series
      
      for(var i = 0; i < 3; i++) {
        dataList.push(new Array())
      }
      var startDate = comm.moment(_param.startDate, dateFormat)
      var endDate = comm.moment(_param.endDate, dateFormat)
      var dateDiff = _param.dateType === 'YEAR' ? endDate.diff(startDate, 'years') : endDate.diff(startDate, 'months')
      dateDiff = Math.abs(dateDiff) ? Math.abs(dateDiff) : 1
      for(var i = 0; i < dateDiff; i++) {
        var curData = _param.dateType === 'YEAR' ? comm.getPrevYear(i) : comm.getPrevMonth(i)
        xAxisLabels.unshift(curData)

        var tmpArray = _result.filter((_item) => {
          return curData === _item.yearMon.split('.').join('')
        })
        
        if (tmpArray.length <= 0) {
          dataList[0].unshift(0)
          dataList[1].unshift(0)
          dataList[2].unshift(0)
          // dataList[3].unshift(0)
        }
        else {
          // 자재비
          mtrlCost = tmpArray.reduce(function (sum, _item) {
              return sum + _item.mtrlCost;
          }, 0);
          // 인건비
          laborCost = tmpArray.reduce(function (sum, _item) {
              return sum + _item.laborCost;
          }, 0);
          // 외주비
          outsideCost = tmpArray.reduce(function (sum, _item) {
              return sum + _item.outsideCost;
          }, 0);
          // 총액
          totCost = tmpArray.reduce(function (sum, _item) {
              return sum + _item.totCost;
          }, 0);

          dataList[0].unshift(Math.ceil(mtrlCost / _param.unit))
          dataList[1].unshift(Math.ceil(laborCost / _param.unit))
          dataList[2].unshift(Math.ceil(outsideCost / _param.unit))
        }
      }

      var statusData = {}
      statusData.key = _param.key
      statusData.data = {}
      statusData.data.value = dataList
      statusData.data.xAxisLabels = xAxisLabels
      appVue.$emit('STATUS_METHOD_CALLBACK', statusData)
    })
  },
    // 원인별 WO 현황
    woCauseStatus(_param) {
      ajax.url = selectConfig.woList[1].url
      ajax.param = comm.clone(selectConfig.woList[1].searchData)
      ajax.param.dateType = _param.dateType
      if (!isNaN(_param.startDate) && !isNaN(_param.endDate)) {
        ajax.param.startDate = _param.startDate
        ajax.param.endDate = _param.endDate
      } else {
        var dateFormat = _param.dateType === 'YEAR' ? 'YYYY' : 'YYYYMM'
        ajax.param.startDate = comm.getPrevDate(_param.startDate, dateFormat)
        ajax.param.endDate = comm.getPrevDate(_param.endDate, dateFormat)
      }

      ajax.requestGet((_result) => {
        var data = []
        var legendData= []
        $.each(_result, (_i, _item) => {
          data.push({
            value: _item.workOrderCnt,
            name: _item.causeNm
          })
          legendData.push(_item.causeNm)
        })

        var statusData = {}
        statusData.key = _param.key
        statusData.data = {}
        statusData.data.value = data
        statusData.data.legendData = legendData
        appVue.$emit('STATUS_METHOD_CALLBACK', statusData)
      });
    },
    woDelay(_param) {
      ajax.url = selectConfig.woList[2].url
      ajax.param = comm.clone(selectConfig.woList[2].searchData)
      ajax.param.dateType = _param.dateType
      if (!isNaN(_param.startDate) && !isNaN(_param.endDate)) {
        ajax.param.startDate = _param.startDate
        ajax.param.endDate = _param.endDate
      } else {
        var dateFormat = _param.dateType === 'YEAR' ? 'YYYY' : 'YYYYMM'
        ajax.param.startDate = comm.getPrevDate(_param.startDate, dateFormat)
        ajax.param.endDate = comm.getPrevDate(_param.endDate, dateFormat)
      }
      
      ajax.requestGet((_result) => {
        var filteredArray = _result
        if (_result.length > 10) filteredArray = _result.splice(0, 9)
        var statusData = {}
        statusData.key = _param.key
        statusData.data = {}
        statusData.data.value = filteredArray
        appVue.$emit('STATUS_METHOD_CALLBACK', statusData)
      })
    },
  /******* wo *******/

  /******* inspection *******/
  /**
   * 점검 완료율을 가져오는 함수
   * @param {*object} _param 
   */
  inspectionCompleteRate(_param) {
    ajax.url = selectConfig.inspection.completeStatus.url;
    ajax.param = comm.clone(selectConfig.inspection.completeStatus.searchData);
    var dateFormat = _param.dateType === 'YEAR' ? 'YYYY' : 'YYYYMM'
    ajax.param.dateType =  _param.dateType
    if (!isNaN(_param.startDate) && !isNaN(_param.endDate)) {
      ajax.param.startDate = _param.startDate
      ajax.param.endDate = _param.endDate
    } else {
      ajax.param.startDate = comm.getPrevDate(_param.startDate, dateFormat)
      ajax.param.endDate = comm.getPrevDate(_param.endDate, dateFormat)
    }

    var totalCount = 0;
    var totalCompleteCount = 0;
    ajax.requestGet((_result) => {
      $.each(_result, (_i, _item) => {
        totalCount += _item.totCnt;
        totalCompleteCount += _item.finishCnt;
      })
      var statusData = {}
      statusData.key = _param.key
      statusData.data = {}
      statusData.data.value = comm.getPercentage(totalCompleteCount, totalCount).toString() + '%';
      appVue.$emit('STATUS_METHOD_CALLBACK', statusData)
    })
  },
  /**
   * 점검이상 발견 수
   * @param {*} _param 
   */
  detectedError(_param) {
    ajax.url = selectConfig.inspection.detectedErrorStatus.url
    ajax.param = comm.clone(selectConfig.inspection.detectedErrorStatus.searchData)
    var dateFormat = _param.dateType === 'YEAR' ? 'YYYY' : 'YYYYMM'
    ajax.param.dateType =  _param.dateType
    if (!isNaN(_param.startDate) && !isNaN(_param.endDate)) {
      ajax.param.startDate = _param.startDate
      ajax.param.endDate = _param.endDate
    } else {
      ajax.param.startDate = comm.getPrevDate(_param.startDate, dateFormat)
      ajax.param.endDate = comm.getPrevDate(_param.endDate, dateFormat)
    }

    ajax.requestGet((_result) => {
      var result = _result.content        
      var statusData = {}
      statusData.key = _param.key
      statusData.data = {}
      statusData.data.value = result.length;
      appVue.$emit('STATUS_METHOD_CALLBACK', statusData)
    })
  },
  // 오늘의 점검 수행현황
  inspectionCompleteRateToday(_param) {
    ajax.url = selectConfig.inspectionList[0].url
    ajax.param = selectConfig.inspectionList[0].searchData
    ajax.param.startDate = comm.getToday()
    ajax.param.endDate = comm.getToday()
    let self = this
    ajax.requestGet((_result) => {
      var result = _result.content
      var completeArray = result.filter((_item) => {
        return _item.chkDt
      })

      var statusData = {}
      statusData.key = _param.key
      statusData.data = {}
      statusData.data.value = comm.getPercentage(completeArray.length, result.length);
      statusData.data.headline = completeArray.length.toString() + '/' + result.length.toString() + ' ';

      appVue.$emit('STATUS_METHOD_CALLBACK', statusData)
    })
  },
  /**
   * 점검 수행현황
   * @param {*} _param 
   */
  inspectionPerformanceStatus(_param) {
    ajax.url = selectConfig.inspection.completeStatus.url;
    ajax.param = comm.clone(selectConfig.inspection.completeStatus.searchData);
    var dateFormat = _param.dateType === 'YEAR' ? 'YYYY' : 'YYYYMM'
    ajax.param.dateType =  _param.dateType
    if (!isNaN(_param.startDate) && !isNaN(_param.endDate)) {
      ajax.param.startDate = _param.startDate
      ajax.param.endDate = _param.endDate
    } else {
      ajax.param.startDate = comm.getPrevDate(_param.startDate, dateFormat)
      ajax.param.endDate = comm.getPrevDate(_param.endDate, dateFormat)
    }

    var xAxisLabels = []
    var dataList = []
    
    var completeCount = 0;
    var incompleteCount = 0;
    
    ajax.requestGet((_result) => {
      for (var i=0; i < 3; i++) {
        dataList.push(new Array())
      }

      $.each(_result, (_i, _item) => {
        // 완료수
        completeCount += _item.finishCnt
        // 미완료수
        incompleteCount += _item.notFinishCnt
      })

      dataList[0].unshift(completeCount)
      dataList[1].unshift(incompleteCount)
      dataList[2].unshift(comm.getPercentage(completeCount / (completeCount + incompleteCount)))

      var statusData = {}
      statusData.key = _param.key
      statusData.data = {}
      statusData.data.value = dataList
      statusData.data.xAxisLabels = xAxisLabels
      appVue.$emit('STATUS_METHOD_CALLBACK', statusData)
    })
  },
  /******* inspection *******/

  /******* pm *******/
  /**
   * 올해의 pm 발행수
   * @param {*} _param 
   */
  pmCount(_param) {
    ajax.url = selectConfig.pm.completeStatusYear.url;
    ajax.param = comm.clone(selectConfig.pm.completeStatusYear.searchData);
    var dateFormat = _param.dateType === 'YEAR' ? 'YYYY' : 'YYYYMM'
    ajax.param.dateType =  _param.dateType
    if (!isNaN(_param.startDate) && !isNaN(_param.endDate)) {
      ajax.param.startDate = _param.startDate
      ajax.param.endDate = _param.endDate
    } else {
      ajax.param.startDate = comm.getPrevDate(_param.startDate, dateFormat)
      ajax.param.endDate = comm.getPrevDate(_param.endDate, dateFormat)
    }

    var totalCount = 0;
    ajax.requestGet((_result) => {
      $.each(_result, (_i, _item) => {
        totalCount += _item.totCnt;
      })
      var statusData = {}
      statusData.key = _param.key
      statusData.data = {}
      statusData.data.value = comm.setNumberSeperator(totalCount)
      appVue.$emit('STATUS_METHOD_CALLBACK', statusData)
    })
  },
  /**
   * PM 완료율을 가져오는 함수
   * @param {*object} _param 
   */
  pmCompleteRate(_param) {
    ajax.url = selectConfig.pm.completeStatus.url;
    ajax.param = comm.clone(selectConfig.pm.completeStatus.searchData);
    var dateFormat = _param.dateType === 'YEAR' ? 'YYYY' : 'YYYYMM'
    ajax.param.dateType =  _param.dateType
    if (!isNaN(_param.startDate) && !isNaN(_param.endDate)) {
      ajax.param.startDate = _param.startDate
      ajax.param.endDate = _param.endDate
    } else {
      ajax.param.startDate = comm.getPrevDate(_param.startDate, dateFormat)
      ajax.param.endDate = comm.getPrevDate(_param.endDate, dateFormat)
    }

    var totalCount = 0;
    var totalCompleteCount = 0;
    ajax.requestGet((_result) => {
      $.each(_result, (_i, _item) => {
        totalCount += _item.totCnt;
        totalCompleteCount += _item.finishCnt;
      })
      var statusData = {}
      statusData.key = _param.key
      statusData.data = {}
      statusData.data.value = comm.getPercentage(totalCompleteCount, totalCount).toString() + '%';
      appVue.$emit('STATUS_METHOD_CALLBACK', statusData)
    })
  },
  /**
   * 오늘의 점검 완료율
   * @param {*} _param 
   */
  pmCompleteRateToday(_param) {
    ajax.url = selectConfig.woList[0].url
    ajax.param = comm.clone(selectConfig.woList[0].searchData)
    ajax.param.woStatus = ['WO_STATUS_P', 'WO_STATUS_C']  // WO 승인, 완료만 조회
    ajax.param.woStatusEx = ['WO_STATUS_X'] // WO 취소는 제외
    ajax.param.dateConds = 'startdt'
    ajax.param.startDate = comm.getToday()
    ajax.param.endDate = comm.getToday()
    let self = this
    ajax.requestGet((_result) => {
      var result = _result.content
      // PM 완료율 계산
      var pmArray = result.filter((_item) => {
        return _item.pmPk
      })
      var pmCompleteArray = result.filter((_item) => {
        return _item.pmPk && _item.woStatusCd === 'WO_STATUS_C'
      })

      var statusData = {}
      statusData.key = _param.key
      statusData.data = {}
      statusData.data.value = comm.getPercentage(pmCompleteArray.length, pmArray.length);
      statusData.data.headline = pmCompleteArray.length.toString() + '/' + pmArray.length.toString() + ' ';
      appVue.$emit('STATUS_METHOD_CALLBACK', statusData)
    })
  },
  /**
   * PM 수행률
   * @param {*} _param 
   */
  pmPerformanceStatus(_param) {
    if (_param.dateType === 'YEAR') {
      ajax.url = selectConfig.pm.completeStatusYear.url;
      ajax.param = comm.clone(selectConfig.pm.completeStatusYear.searchData);
    } else {
      ajax.url = selectConfig.pm.completeStatus.url;
      ajax.param = comm.clone(selectConfig.pm.completeStatus.searchData);
    }

    var dateFormat = _param.dateType === 'YEAR' ? 'YYYY' : 'YYYYMM'
    ajax.param.dateType =  _param.dateType
    if (!isNaN(_param.startDate) && !isNaN(_param.endDate)) {
      ajax.param.startDate = _param.startDate
      ajax.param.endDate = _param.endDate
    } else {
      ajax.param.startDate = comm.getPrevDate(_param.startDate, dateFormat)
      ajax.param.endDate = comm.getPrevDate(_param.endDate, dateFormat)
    }

    var self = this
    var xAxisLabels = []
    var dataList = []
    
    var completeCount = 0;
    var incompleteCount = 0;

    ajax.requestGet((_result) => {
      for(var i = 0; i < 3; i++) {
        dataList.push(new Array())
      }
      
      var startDate = comm.moment(_param.startDate, dateFormat)
      var endDate = comm.moment(_param.endDate, dateFormat)
      var dateDiff = _param.dateType === 'YEAR' ? endDate.diff(startDate, 'years') : endDate.diff(startDate, 'months')
      dateDiff = Math.abs(dateDiff) ? Math.abs(dateDiff) : 1

      for(var i = 0; i < dateDiff; i++) {
        var curData = _param.dateType === 'YEAR' ? comm.getPrevYear(i) : comm.getPrevMonth(i)
        xAxisLabels.unshift(curData)

        var tmpArray = _result.filter((_item) => {
          return curData === _item.yearMon.split('.').join('')
        })
        
        if (tmpArray.length <= 0) {
          dataList[0].unshift(0)
          dataList[1].unshift(0)
          dataList[2].unshift(0)
        }
        else {
          // 완료수
          completeCount = tmpArray.reduce(function (sum, _item) {
              return sum + _item.finishCnt;
          }, 0);
          // 미완료수
          incompleteCount = tmpArray.reduce(function (sum, _item) {
              return sum + _item.notFinishCnt;
          }, 0);

          dataList[0].unshift(completeCount)
          dataList[1].unshift(incompleteCount)
          dataList[2].unshift(comm.getPercentage(completeCount / (completeCount + incompleteCount)))
        }
      }

      var statusData = {}
      statusData.key = _param.key
      statusData.data = {}
      statusData.data.value = dataList
      statusData.data.xAxisLabels = xAxisLabels
      appVue.$emit('STATUS_METHOD_CALLBACK', statusData)
    })
  }
  /******* pm *******/
}

 export default statusMethod;
