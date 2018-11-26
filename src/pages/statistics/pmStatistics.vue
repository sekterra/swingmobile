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
              <v-toolbar-title class="subheading">{{$t('menu.pmStatistics')}}</v-toolbar-title>
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
                    icon="assignment"
                    :iconTitle="$t('title.pmCount')"
                    :title="dataset.pm.totalCount"
                    :sub-title="$t('title.number')"
                    color="indigo"      
                  >
                  </mini-statistic>  
                </v-flex>
                <v-flex lg4 sm6 xs12>
                  <mini-statistic
                    icon="assignment"
                    :iconTitle="$t('title.pmCompleteRate')"
                    :title="dataset.pm.completeRate"
                    :sub-title="$t('title.complete')"
                    color="light-blue" 
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

                <!-- 오늘의 PM 수행률 -->
                <v-flex xs12>
                  <circle-statistic
                    :title="$t('title.pmCompleteRate')"
                    :sub-title="dataset.pm.todayCompleteStatus.headline"
                    :caption="$t('title.complete')"
                    :icon="dataset.pm.todayCompleteStatus.icon.label"
                    :color="dataset.pm.todayCompleteStatus.color"
                    :value="dataset.pm.todayCompleteStatus.value"
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
                <!-- PM 수행현황 -->
                <v-flex lg6 sm12 xs12 >
                    <y-multibar-chart
                      :title="$t('title.pmPerformanceStatus')" 
                      :series="dataset.pmPerformanceMonth.series"
                      :x-axis-labels="dataset.pmPerformanceMonth.xAxisLabels"
                      :data-list="dataset.pmPerformanceMonth.dataList"
                      icon="bar_chart"
                      color="indigo"
                      :chart-color="dataset.pmPerformanceMonth.color"
                      background-color="#F1F8E9">
                    </y-multibar-chart>
                </v-flex>
                <!-- /PM 수행현황 -->
              </v-layout>
              <!-- /월간 통계 -->
              <!-- 연간 통계 -->
              <v-layout row wrap>
                <v-flex sm12>
                  <h4>{{$t('title.yearlyStatus')}}</h4>
                </v-flex>
                <!-- PM 수행현황 -->
                <v-flex lg6 sm12 xs12 >
                    <y-multibar-chart
                      :title="$t('title.pmPerformanceStatus')" 
                      :series="dataset.pmPerformanceYear.series"
                      :x-axis-labels="dataset.pmPerformanceYear.xAxisLabels"
                      :data-list="dataset.pmPerformanceYear.dataList"
                      icon="bar_chart"
                      color="indigo"
                      :chart-color="dataset.pmPerformanceYear.color"
                      background-color="#F9FBE7">
                    </y-multibar-chart>
                </v-flex>
                <!-- /PM 수행현황 -->
                </v-layout>
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
import YLineChart from '@/components/widgets/chart/YLineChart';
import YMultibarChart from '@/components/widgets/chart/YMultibarChart';
import YPieChart from '@/components/widgets/chart/YPieChart'

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
    color: color,
    dataset: {
      pm: {
        completeRate: 0,
        totalCount: 0,
        // 오늘의 pm 완료율
        todayCompleteStatus: {
          subheading: null,
          headline: null,
          caption: null,
          value: 0,
          color: 'purple',
          icon: {
            label: 'assignment',
            color: 'purple'
          }
        }
      },
      pmPerformanceMonth: {
        xAxisLabels: [],
        series: [],
        dataList: [],
        unit: 1000,
        color: ['#2E7D32', '#8E24AA', '#D32F2F']
      },
      pmPerformanceYear: {
        xAxisLabels: [],
        series: [],
        dataList: [],
        unit: 1000,
        color: ['#2E7D32', '#8E24AA', '#D32F2F']
      },
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
      workCompleteRateMonths: {
        data: []
      },
       workCompleteRateYears: {
        data: []
      },
      woCostsMonths: {
        xAxisLabels: [],
        series: [],
        dataList: [],
        unit: 1000
      },
      woCauseMonths: {
        legendData: [],
        data: []
      },
      woCostsYears: {
        xAxisLabels: [],
        series: [],
        dataList: [],
        unit: 10000
      },
      woCauseYears: {
        legendData: [],
        data: []
      }
    },
    totalCosts: 0,
    totalHours: 0,
    months: 6,  // 월별 검색 기준일(지난 6개월간)
    years: 3  // 년도별 검색 기준일(지난 3년간)
  }),
  computed: {
    labelsMonths() {
      var thisMonth = this.$comm.getThisMonth('locale')
      var labels = []
      labels.unshift(thisMonth)
      for(var i=1; i < this.months; i++) {
        labels.unshift(this.$comm.getPrevMonth(i, 'locale'))
      }
      return labels
    },
    labelsYears() {
      var thisMonth = this.$comm.getThisYear()
      var labels = []
      labels.unshift(thisMonth)
      for(var i=1; i < this.years; i++) {
        labels.unshift(this.$comm.getPrevYear(i))
      }
      return labels
    }
  },
  /* Vue lifecycle: created, mounted, destroyed, etc */
  beforeMount() {
    Object.assign(this.$data, this.$options.data());
    // 올해 PM 완료율
    this.getPmCompleteRateThisYear()
    // 오늘의 PM 완료 현황
    this.getPmCompleteStatusOfToday()
    // 월별 PM 수행현황
    this.getPmPerformanceStatus('month')
    this.getPmPerformanceStatus('year')
  },
  /* methods */
  methods: {
    // 오늘의 PM 완료 현황
    getPmCompleteStatusOfToday() {
      this.$ajax.url = selectConfig.woList[0].url
      this.$ajax.param = this.$comm.clone(selectConfig.woList[0].searchData)
      this.$ajax.param.woStatus = ['WO_STATUS_P', 'WO_STATUS_C']  // WO 승인, 완료만 조회
      this.$ajax.param.woStatusEx = ['WO_STATUS_X'] // WO 취소는 제외
      this.$ajax.param.dateConds = 'startdt'
      this.$ajax.param.startDate = this.$comm.getToday()
      this.$ajax.param.endDate = this.$comm.getToday()
      let self = this
      this.$ajax.requestGet((_result) => {
        var result = _result.content
        // // WO 완료율 계산
        // var woCompleteArray = result.filter((_item) => {
        //   return _item.woStatusCd === 'WO_STATUS_C'
        // });
        // self.dataset.wo.todayCompleteStatus.value = this.$comm.getPercentage(woCompleteArray.length, result.length);
        // self.dataset.wo.todayCompleteStatus.headline = woCompleteArray.length.toString() + '/' + result.length.toString() + ' ';

        // PM 완료율 계산
        var pmArray = result.filter((_item) => {
          return _item.pmPk
        })
        var pmCompleteArray = result.filter((_item) => {
          return _item.pmPk && _item.woStatusCd === 'WO_STATUS_C'
        })
        self.dataset.pm.todayCompleteStatus.value = this.$comm.getPercentage(pmCompleteArray.length, pmArray.length);
        self.dataset.pm.todayCompleteStatus.headline = pmCompleteArray.length.toString() + '/' + pmArray.length.toString() + ' ';
      })
    },
    /**
     * 올해의 PM 발생수 / 완료율
     */
    getPmCompleteRateThisYear() {
      this.$ajax.url = selectConfig.pm.completeStatusYear.url;
      this.$ajax.param = this.$comm.clone(selectConfig.pm.completeStatusYear.searchData);
      this.$ajax.param.startDate = this.$comm.getThisYear()
      this.$ajax.param.endDate = this.$comm.getThisYear()
      var self = this
      var totalCount = 0;
      var totalCompleteCount = 0;
      this.$ajax.requestGet((_result) => {
        $.each(_result, (_i, _item) => {
          totalCount += _item.totCnt;
          totalCompleteCount += _item.finishCnt;
        })
        self.dataset.pm.totalCount = this.$comm.setNumberSeperator(totalCount);
        self.dataset.pm.completeRate = this.$comm.getPercentage(totalCompleteCount, totalCount).toString() + '%';
      })
    },
    /**
     * 월별/년도별 PM 수행 현황
     */
    getPmPerformanceStatus(_type) {
      if (_type === 'year') {
        this.$ajax.url = selectConfig.pm.completeStatusYear.url;
        this.$ajax.param = this.$comm.clone(selectConfig.pm.completeStatusYear.searchData);
        this.$ajax.param.startDate = this.$comm.getPrevYear(this.years)
        this.$ajax.param.endDate = this.$comm.getThisYear()        
      } else {
        this.$ajax.url = selectConfig.pm.completeStatus.url;
        this.$ajax.param = this.$comm.clone(selectConfig.pm.completeStatus.searchData);
        this.$ajax.param.startDate = this.$comm.getPrevMonth(this.months)
        this.$ajax.param.endDate = this.$comm.getThisMonth()
      }

      var self = this
      var totalCount = 0;
      var totalCompleteCount = 0;
      var xAxisLabels = []
      var dataList = []
      var series = [
        {name: this.$t('title.completeCount'), type: 'bar'},
        {name: this.$t('title.incompleteCount'), type: 'bar'},
        {name: this.$t('title.pmCompleteRate'), type: 'line', yAxisIndex: 1},
      ]
      
      var completeCount = 0;
      var incompleteCount = 0;
      var completeRate = 0;
      this.$ajax.requestGet((_result) => {
        if (_type === 'year') self.dataset.pmPerformanceYear.series = series
        else self.dataset.pmPerformanceMonth.series = series
        
        $.each(series, (_i) => {
          dataList.push(new Array())
        })

        var loopCnt = _type === 'year' ? this.years : this.months
        for(var i = 0; i < loopCnt; i++) {
          var curData = _type === 'year' ? this.$comm.getPrevYear(i) : this.$comm.getPrevMonth(i)
          xAxisLabels.unshift(curData)

          var tmpArray = _result.filter((_item) => {
            return curData === _item.yearMon.split('.').join('')
          })
          
          if (tmpArray.length <= 0) {
            dataList[0].unshift(0)
            dataList[1].unshift(0)
            dataList[2].unshift(0)
          }
          else {
            // 완료수
            completeCount = tmpArray.reduce(function (sum, _item) {
                return sum + _item.finishCnt;
            }, 0);
            // 미완료수
            incompleteCount = tmpArray.reduce(function (sum, _item) {
                return sum + _item.notFinishCnt;
            }, 0);

            dataList[0].unshift(completeCount)
            dataList[1].unshift(incompleteCount)
            dataList[2].unshift(this.$comm.getPercentage(completeCount / (completeCount + incompleteCount)))
          }
        }

        if (_type === 'year') {
          self.dataset.pmPerformanceYear.xAxisLabels = xAxisLabels
          self.dataset.pmPerformanceYear.dataList = dataList
        }
        else {
          self.dataset.pmPerformanceMonth.xAxisLabels = xAxisLabels
          self.dataset.pmPerformanceMonth.dataList = dataList
        }
      })
    }
  }
}
</script>

