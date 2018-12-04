/**
 * 통계정보관련 설정
 * dashboardConfig.js에서 참조
 * 실제 데이터는 statusMethod.js에서 가져옴
 */
 let statusConfig = {
  // 설치된 설비  
  installedEquipment: {
    taskGroup: 'equipment',
    type: 'mini-statistic',
    taskIcon: 'domain',
    statusIcon: 'style',
    subTitleKey: 'number',
    color: 'success  darken-1',
    remark: 'test',
    xs12: true,
    sm6: true,
    lg4: true
    // valueKey: 'totalCount',
    // methodKey: 'setEquipmentCardStatus'
  },
  breakdownEquipment: {
    taskGroup: 'equipment',
    type: 'mini-statistic',
    valueKey: 'totalBreakdownCount',
    methodKey: 'setEquipmentCardStatus'
  },
  equipmentUtilizationRate: {
    taskGroup: 'equipment',
    type: 'y-gauge-chart',
    taskIcon: 'domain',
    statusIcon: 'network_check',
    color: 'info',
    remark: '',
    xs12: true,
    sm6: true,
    lg4: true
    // valueKey: 'utilizationRate',
    // methodKey: 'setEquipmentCardStatus'
  },
  woCost: {
    taskGroup: 'wo',
    type: 'mini-statistic',
    valueKey: 'totalCosts',
    methodKey: 'woTotalCostAndHour'
  },
  woHour: {
    taskGroup: 'wo',
    type: 'mini-statistic',
    valueKey: 'totalHours',
    methodKey: 'woTotalCostAndHour'
  },
  inspectionCompleteRate: {
    taskGroup: 'inspection',
    type: 'mini-statistic'
  },
  pmCompleteRate: {
    taskGroup: 'pm',
    type: 'mini-statistic'
  },
  woCompleteRate: {
    taskGroup: 'wo',
    type: 'circle-statistic',
    taskIcon: 'description',
    statusIcon: 'circle_chart',
    subTitleKey: 'headline',
    caption: 'complete',
    color: 'info',
    remark: '',
    xs12: true,
    sm6: true,
    lg4: true
    // valueKey: 'woCompleteRate',
    // methodKey: 'woPmCompleteStatus'
  },
  maintenanceCost: {
    taskGroup: 'equipment',
    type: 'y-multibar-chart',
    seriesKeys: ['totalCost'],
    chartTypes: ['bar'],
    taskIcon: 'domain',
    statusIcon: 'style',
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
  woCauseStatus: {
    taskGroup: 'wo',
    type: 'y-pie-chart',
    taskIcon: 'domain',
    statusIcon: 'style',
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
  }
 };

 export default statusConfig;