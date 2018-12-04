<!--
  목적 : 컴포넌트
  Detail :
  *
  examples:
  *
  -->
<template>
    <v-card class="ma-0 pa-0" :color="backgroundColor">
      <v-card-title>
        <div class="layout row ma-0 justify-space-between">
          <div class="subheading">{{title}}</div>
          <div class="icon">
            <v-icon :color="color">{{icon}}</v-icon>
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
            ['legend', {
                type: 'scroll',
                orient: 'vertical',
                left: 'left',
                data: legendData
            }],
            ['tooltip', tooltip],
            ['series',  [{
              data: dataList,
              type: 'pie',
              selectedMode: 'single',
              radius : '60%',
              center: ['60%', '50%'],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
              label: labelOption
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
// 공통적으로 적용되는 label 옵션
var labelOption = {
  normal: {
    show: true,
    position: 'inside',
    distance: 15,
    align: 'left',
    verticalAlign: 'middle',
    rotate: 90,
    formatter: '{b}: {c}',
    fontSize: 10,
    color: '#fff',
  }
};

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
  name: 'y-pie-chart',
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
    dataList: Array,
    backgroundColor: ''
  },
  data: () => ({
    toolbox: toolbox,
    tooltip : {
        trigger: 'item',
        formatter: "{b} : {c}({d}%)"
    },
    labelOption: labelOption
  }),
  //* Vue lifecycle: created, mounted, destroyed, etc */
  mounted() {
    this.$nextTick(() => {
      // chart에 크기 조정 요청
      window.dispatchEvent(new Event('resize'));
    })
  },
  //* methods */
  methods: {
  }
}
</script>