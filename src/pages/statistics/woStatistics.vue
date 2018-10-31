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
            <v-toolbar color="primary darken-1" dark="" flat dense cad>
              <v-toolbar-title class="subheading">{{$t('menu.woStatistics')}}</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="">
              <!-- 요약 -->
              <v-layout row wrap>
                <v-flex sm12>
                  <h4>{{$t('title.summaryThisYear')}}</h4>
                </v-flex>
                <v-flex lg4 sm6 xs12>
                  <mini-statistic
                    icon="description"
                    iconTitle="WO"
                    :title="totalCosts"
                    :sub-title="$t('title.cost')"
                    color="indigo"      
                  >
                  </mini-statistic>  
                </v-flex>
                <v-flex lg4 sm6 xs12>
                  <mini-statistic
                    icon="description"
                    iconTitle="WO"
                    :title="totalHours"
                    :sub-title="$t('title.workHours')"
                    color="purple"    
                  >
                  </mini-statistic>
                </v-flex>
              </v-layout>
              <!-- /요약 -->
              <!-- 오늘 통계 -->
              <v-layout row wrap>
                <v-flex sm12>
                  <h4>{{$t('title.todayStatus')}}</h4>
                </v-flex>

                <!-- 오늘의 WO 완료율 -->
                <v-flex lg4 sm6 xs12>
                  <circle-statistic
                    :title="$t('title.woCompleteRate')"
                    :sub-title="dataset.wo.todayCompleteStatus.headline"
                    :caption="$t('title.complete')"
                    :icon="dataset.wo.todayCompleteStatus.icon.label"
                    :color="dataset.wo.todayCompleteStatus.color"
                    :value="dataset.wo.todayCompleteStatus.value"
                  >
                  </circle-statistic>
                </v-flex>
              </v-layout>
              <!-- /오늘 통계 -->
              <!-- 월간 통계 -->
              <v-layout row wrap>
                <v-flex sm12>
                  <h4>{{$t('title.monthlyStatus')}}</h4>
                </v-flex>
                <!-- 기간별 작업 준수율 -->
                <v-flex lg6 sm12 xs12 >
                    <y-line-statistic 
                      :title="$t('title.WorkCompleteRate6Months')" 
                      :x-axis-labels="labelsIn6Months"
                      :data="dataset.workCompleteRate6Months.data"
                      :y-min="0"
                      :y-max="100"
                      icon="timeline" 
                      color="indigo">
                    </y-line-statistic>
                </v-flex>
                <!-- /기간별 작업 준수율 -->
                <!-- wo 발생비용 -->
                <v-flex lg6 sm12 xs12 >
                    <y-multibar-chart
                      :title="$t('title.woCosts6Month')" 
                      :series="dataset.woCosts.series"
                      :x-axis-labels="dataset.woCosts.xAxisLabels"
                      :data-list="dataset.woCosts.dataList"
                      :unit="dataset.woCosts.unit"
                      icon="bar_chart"
                      color="indigo">
                    </y-multibar-chart>
                </v-flex>
                <!-- /wo 발생비용 -->
                <!-- 작업 준수율 -->
                <!-- /작업 준수율 -->
              </v-layout>
              <!-- /월간 통계 -->
              <!-- 연간 통계 -->
              <!-- /연간 통계 -->
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
import color from 'vuetify/es5/util/colors';
import EChart from '@/components/chart/echart';
import YLineStatistic from '@/components/widgets/statistic/YLineStatistic';
import YMultibarChart from '@/components/widgets/chart/YMultibarChart';

export default {
  /* attributes: name, components, props, data */
  components: {
    MiniStatistic,
    CircleStatistic,
    EChart,
    YLineStatistic,
    YMultibarChart
  },
  name: 'y-wo-statistics',
  props: {
  },
  data: () => ({
    color: color,
    dataset: {
       wo: {
        // 원인별 현황
        causeStatus: {
          dataType: 'wo',
          data: null,
          key: 'causeStatus',
          type: 'bar',
          title: ''
        },
        // 오늘의 WO 완료율
        todayCompleteStatus: {
          subheading: null,
          headline: null,
          caption: null,
          value: 0,
          color: 'info',
          icon: {
            label: 'description',
            color: 'info'
          }
        }
      },
      workCompleteRate6Months: {
        data: []
      },
      woCosts: {
        xAxisLabels: [],
        series: [],
        dataList: [],
        unit: 1000
      }
    },
    totalCosts: 0,
    totalHours: 0
  }),
  computed: {
    labelsIn6Months() {
      var thisMonth = this.$comm.getThisMonth('locale')
      var labels = []
      labels.unshift(thisMonth)
      for(var i=1; i < 6; i++) {
        labels.unshift(this.$comm.getPrevMonth(i, 'locale'))
      }
      console.log('test:' + JSON.stringify(labels))
      return labels
    }
  },
  /* Vue lifecycle: created, mounted, destroyed, etc */
  beforeMount() {
    // 이달의 WO 비용
    this.getWoTotalCostAndHour();
    // 오늘의 WO완료 현황
    this.getWoPmCompleteStatusOfToday();
    // 기간별 작업 준수율
    this.getWoCompleteRate();
    // 부서별 기간별 작업비용
    this.getWoCosts();
  },
  /* methods */
  methods: {
     /**
     * 이달의 WO 비용
     */
    getWoTotalCostAndHour() {
      this.$ajax.url = selectConfig.wo.totalCostAndHour.url;
      this.$ajax.param = selectConfig.wo.totalCostAndHour.searchData;
      this.$ajax.param.startDate = this.$comm.getThisMonth()
      this.$ajax.param.endDate = this.$comm.getThisMonth()

      var sumHour = 0;  // 작업시간 합계
      var sumMaterialCosts = 0; // 자재비 합계
      var sumLaborCosts = 0;  // 인건비 합계
      var sumOutSourcingCosts = 0;  // 외주비 합계
      var sumEtcCosts = 0;  // 기타비용 합계
      var self = this
      this.$ajax.requestGet((_result) => {
        var result = _result.content
        $.each(result, (_i, _item) => {
          sumHour += _item.totWorkHour;
          sumMaterialCosts += _item.mtrlCost;
          sumLaborCosts += _item.laborCost;
          sumOutSourcingCosts += _item.outsideCost;
          sumEtcCosts += _item.etcCost;
        })
        self.totalHours = this.$comm.setNumberSeperator(sumHour);
        self.totalCosts = this.$comm.setNumberSeperator(sumMaterialCosts + sumLaborCosts + sumOutSourcingCosts + sumEtcCosts);
      });
    },
    // 오늘의 WO완료 현황
    getWoPmCompleteStatusOfToday() {
      this.$ajax.url = selectConfig.woList[0].url
      this.$ajax.param = selectConfig.woList[0].searchData
      this.$ajax.param.woStatus = ['WO_STATUS_P', 'WO_STATUS_C']  // WO 승인, 완료만 조회
      this.$ajax.param.woStatusEx = ['WO_STATUS_X'] // WO 취소는 제외
      this.$ajax.param.dateConds = 'startdt'
      this.$ajax.param.startDate = this.$comm.getToday()
      this.$ajax.param.endDate = this.$comm.getToday()
      let self = this
      this.$ajax.requestGet((_result) => {
        var result = _result.content
        // WO 완료율 계산
        var woCompleteArray = result.filter((_item) => {
          return _item.woStatusCd === 'WO_STATUS_C'
        });
        self.dataset.wo.todayCompleteStatus.value = this.$comm.getPercentage(woCompleteArray.length, result.length);
        self.dataset.wo.todayCompleteStatus.headline = woCompleteArray.length.toString() + '/' + result.length.toString() + ' ';
      })
    },
    /**
     * 기간별 작업 준수율
     */
    getWoCompleteRate() {
      this.$ajax.url = selectConfig.wo.woCompeteRateByMonth.url
      this.$ajax.param = selectConfig.wo.woCompeteRateByMonth.searchData
      this.$ajax.param.startDate = this.$comm.getPrevMonth(6)
      this.$ajax.param.endDate = this.$comm.getThisMonth()
      let self = this
      this.$ajax.requestGet((_result) => {
        var data = []
        var totalWoCount = 0
        var completeWoCount = 0
        for(var i = 0; i < 6; i++) {
          var curMonth = this.$comm.getPrevMonth(i)
          var tmpArray = _result.filter((_item) => {
            return curMonth === _item.yearMon.split('.').join('')
          })
          if (tmpArray.length <= 0) data.unshift(0)
          else {
            totalWoCount = tmpArray.reduce(function (sum, _item) {
                return sum + _item.totWoCnt;
            }, 0);

            completeWoCount = tmpArray.reduce(function (sum, _item) {
                return sum + _item.okWoCnt;
            }, 0);
            data.unshift(this.$comm.getPercentage(completeWoCount, totalWoCount))
          }
        }
        self.dataset.workCompleteRate6Months.data = data
      })
    },
    /**
     * 기간별 작업비용
     */
    getWoCosts() {
      this.$ajax.url = selectConfig.wo.woCostsByMonth.url
      this.$ajax.param = selectConfig.wo.woCostsByMonth.searchData
      this.$ajax.param.startDate = this.$comm.getPrevMonth(6)
      this.$ajax.param.endDate = this.$comm.getThisMonth()
      let self = this
      this.$ajax.requestGet((_result) => {
        var result = _result.filter((_item) => {
          return _item.deptNm !== 'SUBSUM' && _item.deptNm !== 'TOTSUM'
        })
        var xAxisLabels = []
        var dataList = []
        var totCost = 0
        var mtrlCost = 0
        var laborCost = 0
        var outsideCost = 0
        var completeWoCount = 0
        self.dataset.woCosts.series = [
          {name: this.$t('title.materialCost'), type: 'bar'},
          {name: this.$t('title.laborCost'), type: 'bar'},
          {name: this.$t('title.outsourcingCost'), type: 'bar'},
          // {name: this.$t('title.totalCost'), type: 'bar'}
          // {name: this.$t('title.totalCost'), type: 'line', yAxisIndex: 1},
        ]

        $.each(self.dataset.woCosts.series, (_i) => {
          dataList.push(new Array())
        })

        for(var i = 0; i < 6; i++) {
          var curMonth = this.$comm.getPrevMonth(i, 'locale')
          xAxisLabels.unshift(curMonth)
          console.log('===========' + curMonth + '============')
          var tmpArray = _result.filter((_item) => {
            return curMonth === _item.yearMon.split('.').join('')
          })
          
          if (tmpArray.length <= 0) {
            dataList[0].unshift(0)
            dataList[1].unshift(0)
            dataList[2].unshift(0)
            // dataList[3].unshift(0)
          }
          else {
            mtrlCost = tmpArray.reduce(function (sum, _item) {
                return sum + _item.mtrlCost;
            }, 0);

            laborCost = tmpArray.reduce(function (sum, _item) {
                return sum + _item.laborCost;
            }, 0);

            outsideCost = tmpArray.reduce(function (sum, _item) {
                return sum + _item.outsideCost;
            }, 0);
            totCost = tmpArray.reduce(function (sum, _item) {
                return sum + _item.totCost;
            }, 0);
            dataList[0].unshift(Math.ceil(mtrlCost / self.dataset.woCosts.unit))
            dataList[1].unshift(Math.ceil(laborCost / self.dataset.woCosts.unit))
            dataList[2].unshift(Math.ceil(outsideCost / self.dataset.woCosts.unit))
            // dataList[3].unshift(Math.ceil(totCost / 1000000))
            // dataList[3].unshift(totCost)
            console.log(curMonth + ':' + mtrlCost)
          }
        }

        self.dataset.woCosts.xAxisLabels = xAxisLabels
        self.dataset.woCosts.dataList = dataList
      })
    }
  }
}
</script>

