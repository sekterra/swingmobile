<template>
    <v-card class="ma-0 pa-0">
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
            ['color', [color]],
            ['xAxis.type', 'category'],
            ['xAxis.data', xAxisLabels],
            ['yAxis.type', 'value'],
            ['xAxis.axisLabel.show', true],
            ['yAxis.axisLabel.show', true],
            ['xAxis.axisLine.lineStyle.type', 'solid'],
            ['yAxis.axisLine.lineStyle.type', 'solid'],
            ['xAxis.axisLabel.rotate', 60],
            ['yAxis.min', yMin],
            ['yAxis.max', yMax],
            ['series',  [{
                data: data,
                type: 'line'
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
import EChart from '@/components/chart/echart';
export default {
  components: {
    EChart
  },
  name: 'y-line-statistic',
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
    xAxisLabels: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    yMin: Number,
    yMax: Number
  },
  data: () => ({
  })
};
</script>

<style>

</style>
