/**
 * 통계정보관련 설정
 * dashboardConfig.js에서 참조
 * 실제 데이터는 statusMethod.js에서 가져옴
 */
 let statusConfig = {
  // 설치된 설비  
  installedEquipment: {
    group: 'equipment',
    type: 'mini-statistic',
    valueKey: 'totalCount',
    methodKey: 'setEquipmentCardStatus'
  },
  breakdownEquipment: {
    group: 'equipment',
    type: 'mini-statistic',
    valueKey: 'totalBreakdownCount',
    methodKey: 'setEquipmentCardStatus'
  },
  equipmentUtilizationRate: {
    group: 'equipment',
    type: 'y-gauge-chart',
    valueKey: 'utilizationRate',
    methodKey: 'setEquipmentCardStatus'
  },
  woCost: {
    group: 'wo',
    type: 'mini-statistic',
    valueKey: 'totalCosts',
    methodKey: 'woTotalCostAndHour'
  },
  woHour: {
    group: 'wo',
    type: 'mini-statistic',
    valueKey: 'totalHours',
    methodKey: 'woTotalCostAndHour'
  },
  inspectionCompleteRate: {
    group: 'inspection',
    type: 'mini-statistic'
  },
  pmCompleteRate: {
    group: 'pm',
    type: 'mini-statistic'
  },
  woCompleteRate: {
    group: 'wo',
    type: 'circle-statistic',
    valueKey: 'woCompleteRate',
    methodKey: 'woPmCompleteStatus'
  }
 };

 export default statusConfig;