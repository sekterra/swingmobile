<!--
목적 : Dashboard에 사용하는 Card 컴포넌트
Detail :
 * 
examples: 
 *  
-->
<template>
    <v-widget :title="title" content-bg="white" class="create">
      <v-speed-dial
        v-model="fab"
        :top="top"
        :bottom="bottom"
        :right="right"
        :left="left"
        :direction="direction"
        :open-on-hover="hover"
        :transition="transition"
        slot="widget-header-action"
        style="bottom: -10px;"
      >
        <v-btn
          slot="activator"
          v-model="fab"
          color="grey darken-2"
          dark
          flat
          icon
          fab
        >
          <v-icon>settings</v-icon>
          <v-icon>close</v-icon>
        </v-btn>
        <v-btn
          v-for="item in relatedContents"
          :key="item.key"
          dark
          small
          :color="item.key === key ? 'grey lighten-2' : 'primary'"
          @click="chartChanged(item.key)"
        >
          <v-icon v-if="item.type === 'bar'">bar_chart</v-icon>
          <v-icon v-if="item.type === 'donut'">pie_chart</v-icon>
          {{ item.title}}
        </v-btn>
        <!-- <v-btn
          dark
          small
          color="grey lighten-2"
        >
          <v-icon>show_chart</v-icon>
          WO Statistics
        </v-btn>
        <v-btn
          fab
          dark
          icon
          small
          color="grey lighten-2"
        >
          <v-icon>delete</v-icon>
        </v-btn> -->
      </v-speed-dial>
      <div slot="widget-content">
          <div v-if="chartData && chartData.length > 0">
            <mini-chart
              v-if="type === 'mini'"
              title="PM 실시율2"
              sub-title="10%"
              icon="trending_up"
              :data="dataset.monthVisit"
              chart-color="primary"
              type="bar"
            >
            </mini-chart>
            <e-chart 
              v-if="type === 'bar'"
              :path-option="[
                ['dataset.source', chartData],
                ['color', chartColor],
                ['legend.show', true],
                ['xAxis.axisLabel.show', true],
                ['yAxis.axisLabel.show', true],
                ['grid.left', '2%'],
                ['grid.bottom', '5%'],
                ['grid.right', '3%'],
                ['series[0].type', 'bar'],
                ['series[0].areaStyle', {}],
                ['series[0].smooth', true],
              ]"
              height="400px"
              width="100%"
            >
            </e-chart>
            <e-chart 
            v-if="type === 'donut'"
              :path-option="[
                ['dataset.source', chartData],
                ['legend.bottom', '0'],
                ['color', chartColor],
                ['xAxis.show', false],
                ['yAxis.show', false],
                ['series[0].type', 'pie'],
                ['series[0].avoidLabelOverlap', false],
                ['series[0].radius', ['40%', '70%']],
            ]"
            height="400px"
            width="100%"
            >
            </e-chart>
            <circle-statistic
              v-if="type === 'circle-statistic'"
              :title="item.subheading"
              :sub-title="item.headline"
              :caption="item.caption"
              :icon="item.icon.label"
              :color="item.linear.color"
              :value="item.linear.value"
            >
            </circle-statistic>
          </div>
          <div v-else>
            no chart data
          </div>
      </div>
    </v-widget>
</template>

<script>
import VWidget from '@/components/VWidget';
import MiniChart from '@/components/widgets/chart/MiniChart';
import EChart from '@/components/chart/echart';
import chartColor from '@/js/chartColor.js'
import {
  StackData,
  SinData,
  monthVisitData,
  campaignData,
  locationData,
} from '@/api/chart';
import API from '@/api';
import { defaultCoreCipherList } from 'constants';

export default {
  /* attributes: name, components, props, data */
  name: 'y-dashboard-card',
  components: {
    MiniChart,
    VWidget,
    EChart
  },
  props: {
    // title: {
    //   type: String,
    //   required: true,
    // },
    // type: {
    //   type: String,
    //   required: true,
    //   validator: function (_value) {
    //     // The value must match one of these strings
    //     return ['mini', 'bar', 'donut', 'circle-statistic', 'linear-statistic'].indexOf(_value) !== -1
    //   }
    // },
    // chartData: {
    //   type: Array
    // },
    relatedContents: {
      type: Object,
      required: true
    },
    defaultKey: {
      type: String,
      required: true
    }
  },
  data: () => ({
    isOpen: false,
    // 삭제 예정
    dataset: {
      sinData: SinData,
      monthVisit: monthVisitData,
      campaign: campaignData,
      location: locationData,
      stackData: StackData,
    },
    direction: 'top',
    fab: false,
    fling: false,
    hover: false,
    tabs: null,
    top: false,
    right: true,
    bottom: true,
    left: false,
    transition: 'slide-y-reverse-transition',
    orgChartColor: chartColor
  }),
  computed: {
    activity () {
      return API.getActivity();
    },
    posts () {
      return API.getPost(3);
    },
    siteTrafficData () {
      return API.getMonthVisit;
    },
    locationData () {
      return API.getLocation;
    },
    key () {
      return this.defaultKey
    },
    title () {
      return this.relatedContents[this.key].title
    },
    chartData () {
      return this.relatedContents[this.key].data
    },
    type () {
      return this.relatedContents[this.key].type
    },
    dataType () {
      return this.relatedContents[this.key].dataType
    },
    chartColor () {
      if (!this.chartData || this.chartData.length <= 0) return
      if (this.type === 'bar') return this.orgChartColor.bar.slice(0, this.chartData.length)
      else if (this.type === 'donut') return this.orgChartColor.donut.slice(0, this.chartData.length)
    }
  },
  /* Vue lifecycle: created, mounted, destroyed, etc */
  /* methods */
  methods: {
    chartChanged(_key) {
      if (this.key === _key) return
      // var prevKey = this.key
      // this.key = _key
      this.$emit('chartChanged', {
        prevKey: this.key,
        key: _key,
        dataType: this.dataType
      })
    }
  }
}
</script>

<style>
  /* This is for documentation purposes and will not be needed in your application */
  .create .v-speed-dial {
    position: absolute;
  }

  .create .v-btn--floating {
    position: relative;
  } 
</style>
