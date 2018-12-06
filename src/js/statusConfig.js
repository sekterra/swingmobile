/**
 * 통계정보관련 설정
 * dashboardConfig.js에서 참조
 * 실제 데이터는 statusMethod.js에서 가져옴
 */
 let statusConfig = {
  /******* equipment *******/
  // 설치된 설비 수
  installedEquipment: {
    taskGroup: 'equipment',
    type: 'mini-statistic',
    subTitleKey: 'number',
    color: 'success darken-1',
    remark: 'test',
    xs12: true,
    sm6: true,
    lg4: true
  },
  // 고장 설비 수
  breakdownEquipment: {
    taskGroup: 'equipment',
    type: 'mini-statistic',
    subTitleKey: 'number',
    color: 'purple darken-1',
    remark: 'test',
    xs12: true,
    sm6: true,
    lg4: true
  },
  // 설비 가동 비율
  equipmentUtilizationRate: {
    taskGroup: 'equipment',
    type: 'y-gauge-chart',
    color: 'info',
    remark: '',
    xs12: true,
    sm6: true,
    lg4: true
  },
  // 설비 통계 현황
  equipmentOfDowntime: {
    taskGroup: 'equipment',
    type: 'y-multibar-chart',
    seriesKeys: ['totalCost'],
    chartTypes: ['bar'],
    xlableKey: 'equipCd',
    color: 'success  darken-1',
    backgroundColor: '',
    remark: '',
    defaultParam: {
      dateType: 'MON',
      startDate: '0m',
      endDate: '0m'
    },
    xs12: true,
    sm6: true
  },
  // 유지 비용
  maintenanceCost: {
    taskGroup: 'equipment',
    type: 'y-multibar-chart',
    seriesKeys: ['totalCost'],
    chartTypes: ['bar'],
    xlableKey: 'equipCd',
    color: 'success  darken-1',
    backgroundColor: '',
    remark: '',
    defaultParam: {
      dateType: 'MON',
      startDate: '0m',
      endDate: '0m',
      unit: 1000,
    },
    xs12: true,
    sm6: true
  },
  mttr: {
    taskGroup: 'equipment',
    type: 'y-multibar-chart',
    seriesKeys: ['mttr'],
    chartTypes: ['line'],
    xlableKey: 'equipCd',
    color: 'success  darken-1',
    backgroundColor: '',
    remark: '',
    defaultParam: {
      dateType: 'MON',
      startDate: '0m',
      endDate: '0m'
    },
    xs12: true,
    sm6: true
  },
  mtbf: {
    taskGroup: 'equipment',
    type: 'y-multibar-chart',
    seriesKeys: ['mtbf'],
    chartTypes: ['line'],
    xlableKey: 'equipCd',
    color: 'success  darken-1',
    backgroundColor: '',
    remark: '',
    defaultParam: {
      dateType: 'MON',
      startDate: '0m',
      endDate: '0m'
    },
    xs12: true,
    sm6: true
  },
  /******* equipment *******/

  /******* wo *******/
  // WO 비용
  woCost: {
    taskGroup: 'wo',
    type: 'mini-statistic',
    subTitleKey: 'number',
    color: 'indigo darken-1',
    remark: 'test',
    defaultParam: {
      dateType: 'YEAR',
      startDate: '0y',
      endDate: '0y',
      unit: 1000,
    },
    xs12: true,
    sm6: true,
    lg4: true
  },
  // WO 시간
  woHour: {
    taskGroup: 'wo',
    type: 'mini-statistic',
    subTitleKey: 'hour',
    color: 'purple darken-1',
    remark: 'test',
    defaultParam: {
      dateType: 'YEAR',
      startDate: '0y',
      endDate: '0y',
      unit: 1000,
    },
    xs12: true,
    sm6: true,
    lg4: true
  },
  // 오늘의 WO 완료율
  woCompleteRateToday: {
    taskGroup: 'wo',
    type: 'circle-statistic',
    subTitleKey: 'headline',
    caption: 'complete',
    color: 'info',
    remark: '',
    xs12: true,
    sm6: true,
    lg4: true
  },
  // 월별 년도별 작업 완료율
  woCompleteRate: {
    taskGroup: 'wo',
    type: 'y-multibar-chart',
    seriesKeys: ['woCompleteRate'],
    chartTypes: ['bar'],
    xlableKey: 'yearMon',
    color: 'success  darken-1',
    backgroundColor: '',
    remark: '',
    defaultParam: {
      dateType: 'MON',
      startDate: '0m',
      endDate: '0m'
    },
    xs12: true,
    sm6: true
  },
  woCosts: {
    taskGroup: 'wo',
    type: 'y-multibar-chart',
    seriesKeys: ['materialCost', 'laborCost', 'outsourcingCost'],
    chartTypes: ['bar'],
    xlableKey: 'yearMon',
    color: 'success  darken-1',
    backgroundColor: '',
    remark: '',
    defaultParam: {
      dateType: 'MON',
      startDate: '0m',
      endDate: '0m',
      unit: 1000,
    },
    xs12: true,
    sm6: true
  },
  // 원인별 WO 발생현황
  woCauseStatus: {
    taskGroup: 'wo',
    type: 'y-pie-chart',
    legendKey: 'causeNm',
    backgroundColor: '',
    remark: '',
    defaultParam: {
      dateType: 'MON',
      startDate: '0m',
      endDate: '0m',
      unit: 1000,
    },
    xs12: true,
    sm6: true
  },
  /******* wo *******/

  /******* inspection *******/
  // 점검 완료율
  inspectionCompleteRate: {
    taskGroup: 'inspection',
    type: 'mini-statistic'
  },
  /******* inspection *******/

  /******* pm *******/
  // PM 완료율
  pmCompleteRate: {
    taskGroup: 'pm',
    type: 'mini-statistic'
  },
  /******* pm *******/
 };

 export default statusConfig;