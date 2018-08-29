<template>
  <v-container fluid class="pa-0">
    <v-layout>
    </v-layout>
  </v-container>

  
</template>

<script>
// import echart from 'echarts';
// import ecStat from 'echarts-stat';
// import comm from '../../js/common.js';
// let charTitleFont = {
//   fontFamily: 'dotum',
//   fontSize: 14,
//   fontWeight: 'bold'
// };

// let chartSeriesFont = {
//   fontFamily: 'dotum',
//   fontSize: 10,
//   fontWeight: 'bold'
// }
// export default {
//     beforeMount() {
//     },
//     mounted() {
//       try {
//         this.drawBarChart();
//         this.drawPieChart();
//         this.drawCartesianChart();
//         this.drawRadarChart();
//         this.drawBubbleChart();  
//       } catch (error) {
//         window.alert(error.message)        
//       }
//     },
//     data: () => ({
//       size: 'sm',
//       items: [
//         { text: 'Extra small (2px)', value: 'xs' },
//         { text: 'Small (4px)', value: 'sm' },
//         { text: 'Medium (8px)', value: 'md' },
//         { text: 'Large (16px)', value: 'lg' },
//         { text: 'Extra large (24px)', value: 'xl' }
//       ],
//       charts: []
//     }),
//     computed: {
//       mediaHeight() {
//         var mediaHeight = 250;
//         return comm.getFixedSizeByDevice(mediaHeight, this.$vuetify.breakpoint);
//       }
//     },
//     watch: {
//       mediaHeight() {
//         var self = this;
//         // 화면이 변경되고 난 이후 chart크기 조정
//         this.$nextTick(function () {
//           for(var i = 0; i < self.charts.length; i++) {
//             self.charts[i].resize();
//           }
//         })
//       }
//     },
//     methods: {
//       drawBarChart() {
//         var option = {
//             title: {
//               text: 'PM 수행율(예시)',
//               textStyle: charTitleFont,
//               // x:'center'
//             },
//             tooltip: {
//             },
//             legend: {
//                 data:['Sales'],
//                 show: false
//             },
//             xAxis: {
//                 data: ["BA01","BA02","BA03","BA04","BA05","BA06"],
//                 axisLabel: {
//                   rotate: 45
//                 }
//             },
//             yAxis: {
//               min: 0,
//               max: 100,
//               axisLabel: {
//                 rotate: 45
//               }
//             },
//             series: [{
//                 name: 'Sales',
//                 type: 'bar',
//                 label: chartSeriesFont,
//                 data: [5, 20, 36, 10, 10, 20],
//             }]
//         };
//         this.charts = [];
//         var chart = echart.init(document.getElementById('chart1'));
//         chart.setOption(option);
//         this.charts.push(chart);
//       },
//       drawPieChart() {
//         var option = {
//           title : {
//               text: 'WO 발생비율(예시)',
//               // subtext: '纯属虚构',
//               textStyle: charTitleFont,
//               // x:'center'
//           },
//           tooltip : {
//               trigger: 'item',
//               formatter: "{a} <br/>{b} : {c} ({d}%)"
//           },
//           legend: {
//               show: false,
//               orient: 'vertical',
//               left: 'left',
//               data: ['고장정비','일상작업','개량정비','예방정비']
//           },
//           series : [
//             {
//                 name: '건수 (비율%)',
//                 type: 'pie',
//                 radius : '60%',
//                 center: ['50%', '50%'],
//                 label: chartSeriesFont,
//                 data:[
//                     {value:335, name:'고장정비'},
//                     {value:310, name:'일상작업'},
//                     {value:234, name:'개량정비'},
//                     {value:135, name:'예방정비'}
//                 ],
//                 itemStyle: {
//                     emphasis: {
//                         shadowBlur: 10,
//                         shadowOffsetX: 0,
//                         shadowColor: 'rgba(0, 0, 0, 0.5)'
//                     }
//                 }
//             }
//           ]
//         };

//         var chart = echart.init(document.getElementById('chart2'));
//         chart.setOption(option);
//         this.charts.push(chart);
//       },
//       drawCartesianChart() {
//         var axisData = ['1월','2월','3월','4월','5월','6월','7월'];
//         var data = axisData.map(function (item, i) {
//             return Math.round(Math.random() * 1000 * (i + 1));
//         });
//         var links = data.map(function (item, i) {
//             return {
//                 source: i,
//                 target: i + 1
//             };
//         });
//         links.pop();
//         var option = {
//             title: {
//                 text: '년도별 정비비용 현황(예시)',
//                 textStyle: charTitleFont,
//                 // x:'center'
//             },
//             tooltip: {},
//             xAxis: {
//                 type : 'category',
//                 boundaryGap : false,
//                 data : axisData
//             },
//             yAxis: {
//                 type : 'value',
//                 axisLabel: {
//                   rotate: 45
//                 }
//             },
//             series: [
//                 {
//                     type: 'graph',
//                     layout: 'none',
//                     coordinateSystem: 'cartesian2d',
//                     symbolSize: 30,
//                     label: {
//                         normal: {
//                             show: true,
//                             label: chartSeriesFont,
//                         }
//                     },
//                     edgeSymbol: ['circle', 'arrow'],
//                     edgeSymbolSize: [4, 10],
//                     data: data,
//                     links: links,
//                     lineStyle: {
//                         normal: {
//                             color: '#2f4554'
//                         }
//                     }
//                 }
//             ]
//         };
//         var chart = echart.init(document.getElementById('chart3'));
//         chart.setOption(option);
//         this.charts.push(chart);
//       },
//       drawRadarChart() {
//         var option = {
//             title: {
//                 text: 'WO 상태별 비율(예시)',
//                 textStyle: charTitleFont,
//                 // x:'center'
//             },
//             tooltip: {
//             },
//             legend: {
//               data: ['2017년도', '2018년도'],
//               orient: 'vertical',
//               left: 'left',
//               top: 'bottom'
//             },
//             radar: {
//                 // shape: 'circle',
//                 name: {
//                     textStyle: {
//                         color: '#fff',
//                         backgroundColor: '#999',
//                         borderRadius: 3,
//                         padding: [3, 5]
//                   }
//                 },
//                 indicator: [
//                   { name: '고장정비', max: 100},
//                   { name: '예방정비', max: 100},
//                   { name: '일상작업', max: 100},
//                   { name: '개량정비', max: 100}
//                 ]
//             },
//             series: [{
//                 name: '전년 vs 금년',
//                 type: 'radar',
//                 label: chartSeriesFont,
//                 // ar eaStyle: {normal: {}},
//                 data : [
//                     {
//                         value : [43, 10, 30, 17],
//                         name : '2017년도'
//                     },
//                     {
//                         value : [23, 57, 5, 15],
//                         name : '2018년도'
//                     }
//                 ]
//             }]
//         };
//         var chart = echart.init(document.getElementById('chart4'));
//         chart.setOption(option);
//         this.charts.push(chart);
//       },
//       drawBubbleChart() {
//         var data0 = [
//             [28604, 77, 17096869, 'Australia', 1990],
//             [31163, 77.4, 27662440, 'Canada', 1990],
//             [1516, 68, 1154605773, 'China', 1990],
//             [13670, 74.7, 10582082, 'Cuba', 1990],
//             [28599, 75, 4986705, 'Finland', 1990],
//             [29476, 77.1, 56943299, 'France', 1990],
//             [31476, 75.4, 78958237, 'Germany', 1990],
//             [28666, 78.1, 254830, 'Iceland', 1990],
//             [1777, 57.7, 870601776, 'India', 1990],
//             [29550, 79.1, 122249285, 'Japan', 1990],
//             [2076, 67.9, 20194354, 'North Korea', 1990],
//             [12087, 72, 42972254, 'South Korea', 1990],
//             [24021, 75.4, 3397534, 'New Zealand', 1990],
//             [43296, 76.8, 4240375, 'Norway', 1990],
//             [10088, 70.8, 38195258, 'Poland', 1990],
//             [19349, 69.6, 147568552, 'Russia', 1990],
//             [10670, 67.3, 53994605, 'Turkey', 1990],
//             [26424, 75.7, 57110117, 'United Kingdom', 1990],
//             [37062, 75.4, 252847810, 'United States', 1990]
//         ];

//         var data1 = [
//             [44056, 81.8, 23968973, 'Australia', 2015],
//             [43294, 81.7, 35939927, 'Canada', 2015],
//             [13334, 76.9, 1376048943, 'China', 2015],
//             [21291, 78.5, 11389562, 'Cuba', 2015],
//             [38923, 80.8, 5503457, 'Finland', 2015],
//             [37599, 81.9, 64395345, 'France', 2015],
//             [44053, 81.1, 80688545, 'Germany', 2015],
//             [42182, 82.8, 329425, 'Iceland', 2015],
//             [5903, 66.8, 1311050527, 'India', 2015],
//             [36162, 83.5, 126573481, 'Japan', 2015],
//             [1390, 71.4, 25155317, 'North Korea', 2015],
//             [34644, 80.7, 50293439, 'South Korea', 2015],
//             [34186, 80.6, 4528526, 'New Zealand', 2015],
//             [64304, 81.6, 5210967, 'Norway', 2015],
//             [24787, 77.3, 38611794, 'Poland', 2015],
//             [23038, 73.13, 143456918, 'Russia', 2015],
//             [19360, 76.5, 78665830, 'Turkey', 2015],
//             [38225, 81.4, 64715810, 'United Kingdom', 2015],
//             [53354, 79.1, 321773631, 'United States', 2015]
//         ];

//         var data = [
//             [28604, 77],
//             [31163, 77.4],
//             [1516, 68],
//             [13670, 74.7],
//             [28599, 75],
//             [29476, 77.1],
//             [31476, 75.4],
//             [28666, 78.1],
//             [1777, 57.7],
//             [29550, 79.1],
//             [2076, 67.9],
//             [12087, 72],
//             [24021, 75.4],
//             [43296, 76.8],
//             [10088, 70.8],
//             [19349, 69.6],
//             [10670, 67.3],
//             [26424, 75.7],
//             [37062, 75.4],
//             [44056, 81.8],
//             [43294, 81.7],
//             [13334, 76.9],
//             [21291, 78.5],
//             [38923, 80.8],
//             [37599, 81.9],
//             [44053, 81.1],
//             [42182, 82.8],
//             [5903, 66.8],
//             [36162, 83.5],
//             [1390, 71.4],
//             [34644, 80.7],
//             [34186, 80.6],
//             [64304, 81.6],
//             [24787, 77.3],
//             [23038, 73.13],
//             [19360, 76.5],
//             [38225, 81.4],
//             [53354, 79.1]
//         ];

//         // See https://github.com/ecomfe/echarts-stat
//         var myRegression = ecStat.regression('logarithmic', data);

//         myRegression.points.sort(function(a, b) {
//             return a[0] - b[0];
//         });

//         var option = {
//             legend: {
//                 data: ['2017', '2018'],
//                 bottom: 20
//             },
//             title: {
//                 text: '전년도 대비 비교(샘플)',
//                 subtext: 'By ecStat.regression',
//                 sublink: 'https://github.com/ecomfe/echarts-stat',
//                 left: 'center',
//                 textStyle: charTitleFont,
//                 // x:'center'
//             },
//             tooltip: {
//                 trigger: 'axis',
//                 axisPointer: {
//                     type: 'cross'
//                 }
//             },
//             grid: {
//                 top: 80,
//                 bottom: 90
//             },
//             xAxis: {
//                 type: 'value',
//                 splitLine: {
//                     lineStyle: {
//                         type: 'dashed'
//                     }
//                 },
//             },
//             yAxis: {
//                 type: 'value',
//                 splitLine: {
//                     lineStyle: {
//                         type: 'dashed'
//                     }
//                 },
//             },
//             series: [{
//                 name: '2017',
//                 type: 'scatter',
//                 symbolSize: function(data) {
//                     return Math.sqrt(data[2]) / 5e2;
//                 },
//                 label: {
//                     emphasis: {
//                         show: true,
//                         formatter: function(param) {
//                             return param.data[3];
//                         },
//                         position: 'top'
//                     }
//                 },
//                 itemStyle: {
//                     normal: {
//                         shadowBlur: 10,
//                         shadowColor: 'rgba(120, 36, 50, 0.5)',
//                         shadowOffsetY: 5,
//                         color: new echart.graphic.RadialGradient(0.4, 0.3, 1, [{
//                             offset: 0,
//                             color: 'rgb(251, 118, 123)'
//                         }, {
//                             offset: 1,
//                             color: 'rgb(204, 46, 72)'
//                         }])
//                     }
//                 },
//                 data: data0
//             }, {
//                 name: '2018',
//                 type: 'scatter',
//                 symbolSize: function(data) {
//                     return Math.sqrt(data[2]) / 5e2;
//                 },
//                 label: {
//                     emphasis: {
//                         show: true,
//                         formatter: function(param) {
//                             return param.data[3];
//                         },
//                         position: 'top'
//                     }
//                 },
//                 itemStyle: {
//                     normal: {
//                         shadowBlur: 10,
//                         shadowColor: 'rgba(25, 100, 150, 0.5)',
//                         shadowOffsetY: 5,
//                         color: new echart.graphic.RadialGradient(0.4, 0.3, 1, [{
//                             offset: 0,
//                             color: 'rgb(129, 227, 238)'
//                         }, {
//                             offset: 1,
//                             color: 'rgb(25, 183, 207)'
//                         }])
//                     }
//                 },
//                 data: data1
//             }, {
//                 name: 'line',
//                 type: 'line',
//                 lineStyle: {
//                     normal: {
//                         color: '#2f4554'
//                     }
//                 },
//                 smooth: true,
//                 showSymbol: false,
//                 data: myRegression.points,
//                 markPoint: {
//                     itemStyle: {
//                         normal: {
//                             color: 'transparent'
//                         }
//                     },
//                     label: {
//                         normal: {
//                             show: true,
//                             position: 'left',
//                             formatter: myRegression.expression,
//                             textStyle: {
//                                 color: '#333',
//                                 fontSize: 14
//                             }
//                         }
//                     },
//                     data: [{
//                         coord: myRegression.points[myRegression.points.length - 1]
//                     }]
//                 }
//             }]
//         };
//         var chart = echart.init(document.getElementById('bubbleChart'));
//         chart.setOption(option);
//         this.charts.push(chart);
//       }
//     }
//   }
</script>

<style>
.border {
  border: 1px dashed #0000ff;
}
.chart {
  width: 100%;
  height: 100%;
}
</style>


