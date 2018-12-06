<!--
목적 : 확장검색 기능을 지원하는 컴포넌트
Detail :
 * 
examples: 
 *  
-->
<template>
  <div>
    <v-container grid-list-xl fluid class="mt-0 pt-0">
      <v-layout row wrap>
        <v-flex xs12>
          <v-card>
            <v-toolbar color="grey lighten-3 mt-3" white flat dense cad>
              <v-toolbar-title class="subheading">{{$t('menu.woStatistics')}}</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="">
              <v-layout row wrap>
                <v-flex 
                  v-for="item in statusList" :key="item.key"
                  :xs12="statusConfig[item.key].xs12"
                  :sm6='statusConfig[item.key].sm6' 
                  :lg4='statusConfig[item.key].lg4'
                  :lg8="statusConfig[item.key].lg8">

                  <y-simple-datepicker
                    v-if="item.searchYn"
                    :ref="item.key"
                    v-model="datePicker"
                    @input="dateChanged(item.key)"
                  >
                  </y-simple-datepicker>

                  <mini-statistic
                    v-if="statusConfig[item.key].type === 'mini-statistic' && statusData[item.key]"
                    :icon="$iconMapper.task[statusConfig[item.key].taskGroup]"
                    :iconTitle="$t('title.' + item.key)"
                    :title="statusData[item.key].value"
                    :sub-title="$t('title.' + statusConfig[item.key].subTitleKey)"
                    :color="statusConfig[item.key].color"
                  >
                  </mini-statistic>

                  <y-gauge-chart
                    v-if="statusConfig[item.key].type === 'y-gauge-chart' && statusData[item.key]"
                    :title="$t('title.' + item.key)"
                    :icon="statusConfig[item.key].taskIcon"
                    :color="statusConfig[item.key].color"
                    :data-list="statusData[item.key].value"
                  >
                  </y-gauge-chart>

                  <circle-statistic
                    v-if="statusConfig[item.key].type === 'circle-statistic' && statusData[item.key]"
                    :title="$t('title.' + item.key)"
                    :sub-title="statusData[item.key][statusConfig[item.key].subTitleKey]"
                    :caption="$t('title.' + statusConfig[item.key].caption)"
                    :icon="statusConfig[item.key].taskIcon"
                    :color="statusConfig[item.key].color"
                    :value="statusData[item.key].value"
                  >
                  </circle-statistic>
                  
                  <y-multibar-chart
                    v-if="statusConfig[item.key].type === 'y-multibar-chart' && statusData[item.key]"
                    :title="$t('title.' + item.key)"
                    :x-axis-labels="statusData[item.key].xAxisLabels"
                    :data-list="statusData[item.key].value"
                    :unit="statusConfig[item.key].defaultParam.unit"
                    :series-keys="statusConfig[item.key].seriesKeys"
                    :chart-types="statusConfig[item.key].chartTypes"
                    :icon="statusConfig[item.key].taskIcon"
                    :color="statusConfig[item.key].indigo"
                    :background-color="statusConfig[item.key].backgroundColor">
                  </y-multibar-chart>

                  <y-pie-chart
                    v-if="statusConfig[item.key].type === 'y-pie-chart' && statusData[item.key]"
                    :title="$t('title.' + item.key)"
                    :data-list="statusData[item.key].value"
                    :legend-data ="statusData[item.key].legendData"
                    :icon="statusConfig[item.key].taskIcon"
                    :color="statusConfig[item.key].indigo"
                    :background-color="statusConfig[item.key].backgroundColor"
                  >
                  </y-pie-chart>
                </v-flex>
              </v-layout>
            </v-card-text>       
          </v-card>
        </v-flex>    
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import selectConfig from '@/js/selectConfig.js'
import MiniStatistic from '@/components/widgets/statistic/MiniStatistic';
import CircleStatistic from '@/components/widgets/statistic/CircleStatistic';
import $ from 'jquery';
import EChart from '@/components/chart/echart';
import YLineChart from '@/components/widgets/chart/YLineChart';
import YMultibarChart from '@/components/widgets/chart/YMultibarChart';
import YPieChart from '@/components/widgets/chart/YPieChart'
import statusConfig from '@/js/statusConfig.js'
import statusMethod from '@/js/statusMethod.js'

export default {
  /* attributes: name, components, props, data */
  components: {
    MiniStatistic,
    CircleStatistic,
    EChart,
    YLineChart,
    YMultibarChart,
    YPieChart
  },
  name: 'y-wo-statistics',
  props: {
  },
  data: () => ({
    statusList: [], // 화면에 표시할 통계목록
    statusConfig: statusConfig,
    statusData: {},
    datePicker: null,
  }),
  computed: {
  },
  /* Vue lifecycle: created, mounted, destroyed, etc */
  beforeMount() {
    Object.assign(this.$data, this.$options.data());

    this.statusList = [
      {key: 'woCost'},
      {key: 'woHour'},
      {key: 'woCompleteRateToday'},
      {key: 'woCompleteRate', searchYn: true},
      {key: 'woCosts', searchYn: true},
      {key: 'woCauseStatus', searchYn: true}
    ]
    window.getApp.$on('STATUS_METHOD_CALLBACK', this.setStatusData);
  },
  mounted() {
    this.getStatusData()
  },
  beforeDestroy() {
    window.getApp.$off('STATUS_METHOD_CALLBACK', this.setStatusData);
  },
  /* methods */
  methods: {
    /**
     * 설정값에 따라 통계데이터 조회
     */
    getStatusData() {
      // 2. 대쉬보드 안의 통계자료 조회
      $.each(this.statusList, (_i, _item) => {
        // 2-1. 현재 loop의 키값으로 statusData에 동적으로 item 생성
        // this.statusData[_item.key] = {}
        var thisStatusConfig = statusConfig[_item.key]
        // 2-2. statusMethod.js 내 함수에서 사용될 파라미터 설정
        //  *data 정보는 필수 값으로써, 함수 호출시 데이터를 동적으로 바인딩 시켜주기 위함

        var valueKey = thisStatusConfig.hasOwnProperty('valueKey') ? thisStatusConfig.valueKey: _item.key
        // 2-3 이미 데이터가 존재하면 다시 조회 하지 않음
        if (this.statusData.hasOwnProperty(valueKey)) {
          console.log('statusData:' + valueKey + ' already exists.')
          return
        }

        var param = thisStatusConfig.hasOwnProperty('defaultParam') ? thisStatusConfig.defaultParam : {}
        param.key = _item.key;

        if (typeof statusMethod[_item.key] === 'function') statusMethod[_item.key].call(this, param)
        else window.alert('[개발자용 오류 메시지]\\n' + _item.key + '함수가 statusMethod.js에 정의되지 않았습니다.')
      })
    },
    setStatusData(_statusData) {
      this.$set(this.statusData, _statusData.key, _statusData.data);
    },
    dateChanged(_key) {
      var param = statusConfig[_key].hasOwnProperty('defaultParam') ? statusConfig[_key].defaultParam : {}
      param.key = _key;

      var datePicker = this.$refs[_key][0]
      param.dateType = datePicker.dateType;

      if (datePicker.type === 'month6') {
        param.startDate = this.$comm.getPrevDate('6m', 'YYYYMM');
        param.endDate =  this.datePicker;
      } else {
        param.startDate = this.datePicker;
        param.endDate = this.datePicker;
      }

      if (typeof statusMethod[_key] === 'function') statusMethod[_key].call(this, param)
      else window.alert('[개발자용 오류 메시지]\\n' + _key + '함수가 statusMethod.js에 정의되지 않았습니다.')
    }
  }
}
</script>

