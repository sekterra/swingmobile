<!--
목적 : 하나의 x항목에 여러 bar를 표현하는 차트 컴포넌트
Detail :
 * 
examples: 
 *  
-->
<template>
  <v-card class="ma-0 pa-0" :color="backgroundColor">
      <v-card-title>
        <div class="layout row ma-0">
          <!-- <div class="icon">
          </div> -->
          <v-icon :color="color">{{icon}}</v-icon>
          <div class="subheading">{{title}}</div>
        </div>
      </v-card-title>
      <v-card-text>
        <div class="justify-center row layout">
          <e-chart 
          :option="option"
          :optionString="optionString"
          width="100%"
          >
          </e-chart>
        </div>
      </v-card-text>
    </v-card>
</template>

<script>
import EChart from '@/components/chart/echart';
import $ from 'jquery';
var echarts = require('echarts/dist/echarts.js')

// https://digitalsynopsis.com/design/beautiful-color-gradients-backgrounds/
var gradients = [
  {
    'start': '#ebedee', // 6. Cloudy Knoxville
    'end': '#fdfbfb'
  },
  {
    'start': '#fdfcfb', // 9.Everlasting Sky
    'end': '#e2d1c3'
  },
  {
    'start': '#ff9a9e', // 1. Warm Flame
    'end': '#fecfef'
  },
  {
    'start': '#ffecd2', // 2. Juicy Peach
    'end': '#fcb69f'
  },
  {
    'start': '#a1c4fd', // 4. Winter Neva
    'end': '#c2e9fb'
  },
]

// 공통적으로 적용되는 label 옵션
var labelOption = {
    normal: {
      show: true,
      position: 'insideBottom',
      distance: 15,
      align: 'left',
      verticalAlign: 'middle',
      rotate: 90,
      formatter: '{a} {c}',
      fontSize: 10,
      color: '#BABABA',
    }
};

var defaultOption = {
    color: ['#003366', '#006699', '#4cabce', '#e5323e'],
    legend: {
      data: []
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        }
    },
    toolbox: {
      // orient: 'vertical',
      left: 'right',
      top: 'bottom',
      feature: {
        dataView: {show: true, readOnly: false},
        magicType: {show: true, type: ['line', 'bar']},
        restore: {show: true},
        saveAsImage: {show: true}
      }
    },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        axisTick: {show: false},
        data: null,
        axisLabel: {
          show: true,
          rotate: 60
        },
        axisLine: {
          show: true,
          lineStyle: {
            type: 'solid'
          }
        },
      }
    ],
    yAxis: [
      {
          type: 'value',
          axisLabel: {
            show: true,
            formatter: '{value}'
          },
          axisLine: {
            show: true,
            lineStyle: {
              type: 'solid'
            }
          },
          name: ''
      },
      {
          type: 'value',
          axisLabel: {
            show: true,
            formatter: '{value}%'
          },
          name: '',
          min: 0,
          max: 100,
          interval: 10,
      }
    ],
    series: []
  }

var seriesTemplate = {
    // name: 'Forest',
    type: 'bar',
    barGap: 0,
    itemStyle: {
      normal: {
        // color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
        //   [
        //     {offset: 0, color: '#83bff6'},
        //     {offset: 0.5, color: '#188df0'},
        //     {offset: 1, color: '#188df0'}
        //   ]
        // )
      },
      emphasis: {
        // color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
        //   [
        //     // {offset: 0, color: '#2378f7'},
        //     // {offset: 0.7, color: '#2378f7'},
        //     // {offset: 1, color: '#83bff6'}
        //   ]
        // )
      }
    },
    label: labelOption,
      // data: [390, 332, 301, 334, 390]
  }

export default {
  /* attributes: name, components, props, data */
  components: {
    EChart
  },
  name: 'y-multibar-chart',
  props: {
    title: String,
    // series: {
    //   type: Array,  // name, type  속성
    //   default: null
    // },
    xAxisLabels: Array, // 
    dataList: {
      type: Array,
      default: null
    },
    icon: String,
    color: String,
    chartColor: {
      type: Array,
      default: null
    },
    unit: {
      type: Number,
      default: null
    },
    backgroundColor: '',
    seriesKeys: Array,
    chartTypes: Array,
    xlableKey: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    option: null,
    optionString: null,
    series: null
  }),
  computed: {
    // series() {
    //   var name = this.seriesKeys ? this.$t('title.' + this.seriesKeys) : 'test'
    //   return { name: name, type: this.chartType }
    // },
    // xAxisLabels() {
    //   return this.$_.map(this.dataList, this.xlableKey)
    // }
  },
  watch: {
    dataList() {
      this.setSeries();
      window.dispatchEvent(new Event('resize'));
    }
  },
  /* Vue lifecycle: created, mounted, destroyed, etc */
  mounted() {
    this.series = []
    $.each(this.seriesKeys, (_i, _key) => {
      this.series.push({
        name: this.seriesKeys ? this.$t('title.' + _key) : 'chart' + _i,
        type: this.chartTypes[_i] ? this.chartTypes[_i] : 'bar'
      })
    })
    // this.series = [{ name: name, type: this.chartType }]
    this.setSeries()
    this.$nextTick(() => {
      // chart에 크기 조정 요청
      window.dispatchEvent(new Event('resize'));
    })
  },
  /* methods */
  methods: {
    setSeries() {
      if (!this.series) return
      
      defaultOption.series = []
      var legendNames = []
      let self = this
      defaultOption.xAxis[0].data = this.xAxisLabels
      var dataList = this.dataList

      if (this.unit) {
        defaultOption.yAxis[0].name = this.$t('title.unit') + '\n(' + this.unit + ')'
      } else defaultOption.yAxis[0].name = ''
        
      $.each(this.series, (_i, _item) => {
        var thisSeries = self.$comm.clone(seriesTemplate)
        thisSeries.name = _item.name
        thisSeries.type = _item.type
        if (_item.hasOwnProperty('yAxisIndex')) {
          thisSeries.yAxisIndex = _item.yAxisIndex
          thisSeries.label.normal.formatter = '{c}%'
          thisSeries.label.normal.rotate = 0
        }
        thisSeries.data = dataList[_i]
        var normalGradient = [
          {offset: 0, color: gradients[_i].start},
          {offset: 0.5, color: gradients[_i].end},
          {offset: 1, color: gradients[_i].end}
        ]
        var emphasisGradient = [
          {offset: 0, color: gradients[_i].end},
          {offset: 0.7, color: gradients[_i].start},
          {offset: 1, color: gradients[_i].start}
        ]
        // thisSeries.itemStyle.normal.color = new echarts.graphic.LinearGradient(0, 0, 0, 1, normalGradient);
        // thisSeries.itemStyle.emphasis.color = new echarts.graphic.LinearGradient(0, 0, 0, 1, emphasisGradient);
        // thisSeries.itemStyle.normal.color = new echarts.graphic.LinearGradient(0, 0, 0, 1, normalGradient);
        // thisSeries.itemStyle.emphasis.color = new echarts.graphic.LinearGradient(0, 0, 0, 1, emphasisGradient);
        defaultOption.series.push(thisSeries)
        legendNames.push(_item.name)
      });

      defaultOption.legend.data = legendNames
      this.option = defaultOption
      if (this.chartColor) this.option.color = this.chartColor
      this.optionString = JSON.stringify(defaultOption)
    }
  }
}
</script>

