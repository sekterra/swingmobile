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
  /**
   * 현재 설치된 설비와 고장난 설비 수를 가져오는 함수
   * @param {*object} _param 
   */
  woTotalCostAndHour(_param) {
    ajax.url = selectConfig.wo.totalCostAndHour.url;
    ajax.param = comm.clone(selectConfig.wo.totalCostAndHour.searchData);
    ajax.param.dateType = _param.dateType
    var dateFormat = _param.dateType === 'YEAR' ? 'YYYY' : 'YYYY-MM'
    ajax.param.startDate = comm.getPrevDate(_param.startDate, dateFormat)
    ajax.param.endDate = comm.getPrevDate(_param.endDate, dateFormat)
    // ajax.param.dateType = 'YEAR'
    // ajax.param.startDate = comm.getThisYear()
    // ajax.param.endDate = comm.getThisYear()

    var sumHour = 0;  // 작업시간 합계
    var sumMaterialCosts = 0; // 자재비 합계
    var sumLaborCosts = 0;  // 인건비 합계
    var sumOutSourcingCosts = 0;  // 외주비 합계
    var sumEtcCosts = 0;  // 기타비용 합계
    var self = this
    ajax.requestGet((_result) => {
      var result = _result.content
      $.each(result, (_i, _item) => {
        sumHour += _item.totWorkHour;
        sumMaterialCosts += _item.mtrlCost;
        sumLaborCosts += _item.laborCost;
        sumOutSourcingCosts += _item.outsideCost;
        sumEtcCosts += _item.etcCost;
      })

      var statusData = {}
      statusData.key = _param.key
      statusData.data = {}
      statusData.data.totalHours = comm.setNumberSeperator(sumHour);
      statusData.data.totalCosts = comm.setNumberSeperator(Math.ceil((sumMaterialCosts + sumLaborCosts + sumOutSourcingCosts + sumEtcCosts) / 1000));
      appVue.$emit('STATUS_METHOD_CALLBACK', statusData)
    });
  },
  /**
   * 점검 완료율을 가져오는 함수
   * @param {*object} _param 
   */
  inspectionCompleteRate(_param) {
    ajax.url = selectConfig.inspection.completeStatus.url;
    ajax.param = comm.clone(selectConfig.inspection.completeStatus.searchData);
    var dateFormat = _param.dateType === 'YEAR' ? 'YYYY' : 'YYYYMM'
    ajax.param.startDate = comm.getPrevDate(_param.startDate, dateFormat)
    ajax.param.endDate = comm.getPrevDate(_param.endDate, dateFormat)
    console.log('ajax:' + JSON.stringify(ajax.param))
    var self = this
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
      statusData.data[_param.key] = comm.getPercentage(totalCompleteCount, totalCount).toString() + '%';
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
    ajax.param.startDate = comm.getPrevDate(_param.startDate, dateFormat)
    ajax.param.endDate = comm.getPrevDate(_param.endDate, dateFormat)
    var self = this
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
      statusData.data[_param.key] = comm.getPercentage(totalCompleteCount, totalCount).toString() + '%';
      appVue.$emit('STATUS_METHOD_CALLBACK', statusData)
    })
  },
  /**
   * WO 완료율을 가져오는 함수
   * @param {*object} _param 
   */
  // woPmCompleteStatus(_param) {
    woCompleteRate(_param) {
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
      // self.dataset.wo.todayCompleteStatus.value = comm.getPercentage(woCompleteArray.length, result.length);
      // self.dataset.wo.todayCompleteStatus.headline = woCompleteArray.length.toString() + '/' + result.length.toString() + ' ';

      // PM 완료율 계산
      // var pmArray = result.filter((_item) => {
      //   return _item.pmPk
      // })
      // var pmCompleteArray = result.filter((_item) => {
      //   return _item.pmPk && _item.woStatusCd === 'WO_STATUS_C'
      // })
      // self.dataset.pm.todayCompleteStatus.value = comm.getPercentage(pmCompleteArray.length, pmArray.length);
      // self.dataset.pm.todayCompleteStatus.headline = pmCompleteArray.length.toString() + '/' + pmArray.length.toString() + ' ';

      appVue.$emit('STATUS_METHOD_CALLBACK', statusData)
    })
  },
  maintenanceCost(_param) {
    var url = selectConfig.equipment.maintenanceCost.url
    if (_param.dateType === 'YEAR') url += 'year'
    else url += 'month'
    ajax.url = url
    ajax.param = comm.clone(selectConfig.equipment.maintenanceCost.searchData)
    ajax.param.dateType =  _param.dateType
    if (comm.moment.isDate(_param.startDate) && comm.moment.isDate(_param.endDate)) {
      ajax.param.startDate = _param.startDate
      ajax.param.endDate = _param.endDate, dateFormat
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
      console.log('statusData.data.xAxisLabels:' + JSON.stringify(statusData.xAxisLabels))
      appVue.$emit('STATUS_METHOD_CALLBACK', statusData)
    })
  }
}

 export default statusMethod;