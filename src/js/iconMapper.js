/**
 * 업무, 차트별 icon을 매핑하는 js
 */

 var iconMapper = {
   task: {
     equipment: 'domain',
     wo: 'description',
     inspection: 'list_alt',
     pm: 'assignment'
   },
   chart: {
     'mini-statistic': 'style',
     'y-gauge-chart': 'network_check',
     'circle-statistic': 'donut_large',
     'y-multibar-chart': 'bar_chart',
     'y-pie-chart': 'pie_chart',
     'plain-table-order': 'table_chart',
   }
 }

 export default iconMapper;