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
  { // 설치된 설비수
    key: 'breakdownEquipment',
    order: 2,
    enable: true,  // 활성화 여부
  },
  { // 작업비용
    key: 'woCost',
    order: 3,
    enable: false,
  },
  { // 작업시간
    key: 'woHour',
    order: 4,
    enable: true
  },
  { // 점검완료율
    key: 'inspectionCompleteRate',
    order: 5,
    enable: true
  },
  { // PM완료율
    key: 'pmCompleteRate',
    order: 6,
    enable: true,
  },
  { // 가동 설비 현황
    key: 'equipmentUtilizationRate',
    order: 7,
    enable: true,  // 활성화 여부
  },
  { // 작업 완료율
    key: 'woCompleteRate',
    order: 8,
    enable: true,  // 활성화 여부
  },
  { // 설비별 유지비용
    key: 'maintenanceCost',
    order: 9,
    enable: true,  // 활성화 여부
  },
  { // 원인별 WO 현황
    key: 'woCauseStatus',
    order: 10,
    enable: true,  // 활성화 여부
  },
  { // 지연 작업 현황
    key: 'woDelay',
    order: 11,
    enable: true,  // 활성화 여부
  }
];

export default dashboardConfig;