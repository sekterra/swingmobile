<!--
  목적 : 컴포넌트
  Detail :
  *
  examples:
  *
  -->
<template>
    <v-card class="ma-0 pa-0" :color="backgroundColor">
      <v-card-title class="drag-handle">
        <div class="layout row ma-0 justify-space-between">
          <div class="subheading layout align-center mt-1 ml-1">
            <v-icon>{{icon}}</v-icon>
            {{title}}
          </div>
          <div class="icon">
            <!-- <v-icon :color="color">{{icon}}</v-icon> -->
          </div>
        </div>
      </v-card-title>
      <v-card-text>
        <div class="justify-center row layout">
          <e-chart 
          :path-option="[
            ['toolbox', toolbox],
            ['xAxis.axisLine.show', false],
            ['yAxis.axisLine.show', false],
            ['tooltip', tooltip],
            ['series',  [{
              data: dataList,
              type: 'gauge',
              title: false,
              center : ['50%', '50%'],    // 默认全局居中
              startAngle: 140,
              endAngle : -140,
              min: 0,                     // 최소값
              max: 100,                   // 최대값
              precision: 0,               // 소수 정확도, 기본값은 0, 소수점 없음
              splitNumber: 10,             // 세그먼트 수, 기본값은 5입니다.
              title : {
                show : false,
                offsetCenter: ['-65%', -10],       // x, y，단위 픽셀
                textStyle: {       // 나머지 속성은 기본적으로 전역 텍스트 스타일을 사용합니다. 자세한 내용은 TEXTSTYLE을 참조하십시오.
                    color: '#333',
                    fontSize : 13
                }
              },
              detail : {
                  show : true,
                  borderWidth: 0,
                  borderColor: '#ccc',
                  width: 100,
                  height: 40,
                  offsetCenter: ['-60%', 5],       // x, y，단위 픽셀
                  formatter:'{value}%',
                  textStyle: {       // 나머지 속성은 기본적으로 전역 텍스트 스타일을 사용합니다. 자세한 내용은 TEXTSTYLE을 참조하십시오.
                      color: 'auto',
                      fontSize : 20
                  }
              },
              axisLine: {            // 좌표축
                show: true,        // 기본 디스플레이, 속성 표시 컨트롤이 표시되는지 여부
                lineStyle: {       // 선 스타일을 제어하는 ​​선 스타일 속성
                    color: [[0.2, '#ff4500'],[0.5, '#FFA000'],[0.7, '#FFC107'], [0.9, '#43A047'],[1, '#3F51B5']], 
                    width: 30
                }
              }
            }]]
          ]"
          width="100%"
          >
          </e-chart>
        </div>
      </v-card-text>
    </v-card>
</template>

<script>
// 참고 사이트 : http://echarts.baidu.com/echarts2/doc/example/gauge.html
var toolbox = {
  show: true,
  orient: 'horizontal',
  left: 'right',
  top: 'bottom',
  feature: {
    mark: {show: true},
    dataView: {show: true, readOnly: false},
    magicType: {show: true},
    restore: {show: true},
    saveAsImage: {show: true}
  }
}

import EChart from '@/components/chart/echart';
export default {
  /* attributes: name, components, props, data */
  components: {
    EChart
  },
  name: 'y-gauge-chart',
  props: {
    icon: {
      type: String,
      default: 'timeline'
    },
    title: String,
    color: {
      type: String,
      default: 'indigo'
    },
    legendData: Array,
    dataList: {
      type: Array,
      default: null
    },
    backgroundColor: ''
  },
  data: () => ({
    toolbox: toolbox,
    tooltip : {
        formatter: "{b} : {c}%"
    }
  }),
  watch: {
    dataList() {
      window.dispatchEvent(new Event('resize'));
    }
  },
  //* Vue lifecycle: created, mounted, destroyed, etc */
  mounted() {
  },
  //* methods */
  methods: {
  }
}
</script>