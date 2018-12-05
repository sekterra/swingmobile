/**
 * Dashboard 화면을 설정하는 js 파일
 */

 let dashboardConfig = [   
  // {
  //   key: '',  // 구분키값, 통계 타이틀과 같은 키 값을 가져야 함(locale.title의 값 중 하나)
  //   enable: true,  // 활성화 여부
  //   taskIcon: '', // 업무 icon(설비: domain, WO: description, 점검: list_alt, PM: assignment)
  //   statusIcon: '', // 통계용 icon(바차트 : bar_chart, 파이차트 : pie_chart, 라인차트: trending_up, 카드차트: style, 게이지 차트: network_check)
  //   color: '',  // 차트 메인 색상
  //   remark: ''  // 설명
  // },
  { // 설치된 설비수
    key: 'installedEquipment',
    order: 1,
    enable: true,  // 활성화 여부
  },
  // { // 고장 설비수
  //   key: 'breakdownEquipment',
  //   enable: true,
  //   taskIcon: 'domain',
  //   statusIcon: 'bar_chart',
  //   subTitleKey: 'number',
  //   color: 'red darken-1',
  //   remark: '',
  //   xs12: true,
  //   sm6: true,
  //   lg4: true
  // },
  // { // 작업비용
  //   key: 'woCost',
  //   enable: false,
  //   taskIcon: 'description',
  //   statusIcon: 'pie_chart',
  //   subTitleKey: 'cost',
  //   param: {
  //     dateType: 'YEAR',
  //     startDate: '0y',
  //     endDate: '0y',
  //   },
  //   color: 'purple darken-1',
  //   remark: '',
  //   xs12: true,
  //   sm6: true,
  //   lg4: true
  // },
  // { // 작업시간
  //   key: 'woHour',
  //   enable: true,
  //   taskIcon: 'description',
  //   statusIcon: 'trending_up',
  //   subTitleKey: 'workHours',
  //   param: {
  //     dateType: 'YEAR',
  //     startDate: '0y',
  //     endDate: '0y',
  //   },
  //   color: 'purple darken-1',
  //   remark: '',
  //   xs12: true,
  //   sm6: true,
  //   lg4: true
  // },
  // { // 점검완료율
  //   key: 'inspectionCompleteRate',
  //   enable: true,
  //   taskIcon: 'list_alt',
  //   statusIcon: 'network_check',
  //   subTitleKey: 'complete',
  //   param: {
  //     dateType: 'MONTH',
  //     startDate: '0m',
  //     endDate: '0m',
  //   },
  //   color: 'indigo  darken-1',
  //   remark: '',
  //   xs12: true,
  //   sm6: true,
  //   lg4: true
  // },
  // { // PM완료율
  //   key: 'pmCompleteRate',
  //   enable: true,
  //   taskIcon: 'assignment',
  //   statusIcon: 'style',
  //   subTitleKey: 'complete',
  //   param: {
  //     dateType: 'MONTH',
  //     startDate: '0m',
  //     endDate: '0m',
  //   },
  //   color: 'cyan darken-1',
  //   remark: '',
  //   xs12: true,
  //   sm6: true,
  //   lg4: true
  // },
  { // 가동 설비 현황
    key: 'equipmentUtilizationRate',
    order: 2,
    enable: true,  // 활성화 여부
  },
  // { // 가동 설비 현황
  //   key: 'equipmentUtilizationRate',
  //   enable: true,
  //   taskIcon: 'domain',
  //   statusIcon: 'network_check',
  //   color: 'info',
  //   remark: '',
  //   xs12: true,
  //   sm6: true,
  //   lg4: true
  // },
  // { // 가동 설비 현황
  //   key: 'woCompleteRate',
  //   enable: true,
  //   taskIcon: 'description',
  //   statusIcon: 'circle_chart',
  //   subTitleKey: 'headline',
  //   caption: 'complete',
  //   color: 'info',
  //   remark: '',
  //   xs12: true,
  //   sm6: true,
  //   lg4: true
  // },
  { // 작업 완료율
    key: 'woCompleteRate',
    order: 3,
    enable: true,  // 활성화 여부
  },
  { // 설비별 유지비용
    key: 'maintenanceCost',
    order: 4,
    enable: true,  // 활성화 여부
  },
  { // 원인별 WO 현황
    key: 'woCauseStatus',
    order: 5,
    enable: true,  // 활성화 여부
  }
];

export default dashboardConfig;