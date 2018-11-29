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
    enable: true,
    taskIcon: 'domain',
    statusIcon: 'style',
    color: 'success  darken-1',
    remark: ''
  },
  { // 고장 설비수
    key: 'breakdownEquipment',
    enable: true,
    taskIcon: 'domain',
    statusIcon: 'bar_chart',
    color: 'red darken-1',
    remark: ''
  },
  { // 작업비용
    key: 'woCost',
    enable: false,
    taskIcon: 'description',
    statusIcon: 'pie_chart',
    color: 'purple darken-1',
    remark: ''
  },
  { // 작업시간
    key: 'woHour',
    enable: true,
    taskIcon: 'description',
    statusIcon: 'trending_up',
    color: 'purple darken-1',
    remark: ''
  },
  { // 점검완료율
    key: 'inspection',
    enable: true,
    taskIcon: 'list_alt',
    statusIcon: 'network_check',
    color: 'indigo  darken-1',
    remark: ''
  },
  { // PM완료율
    key: 'pmComplete',
    enable: true,
    taskIcon: 'assignment',
    statusIcon: 'style',
    color: 'cyan darken-1',
    remark: ''
  }
];

export default dashboardConfig;