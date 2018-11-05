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
                    icon="list_alt"
                    :iconTitle="$t('title.inspectionPerformanceStatus')"
                    :title="dataset.inspection.completeRate"
                    :sub-title="$t('title.complete')"
                    color="purple"      
                  >
                  </mini-statistic>
                </v-flex>
                <v-flex lg4 sm6 xs12>
                  <mini-statistic
                    icon="list_alt"
                    :iconTitle="$t('title.detectedError')"
                    :title="dataset.inspection.detectedErrorCount"
                    :sub-title="$t('title.number')"
                    color="red"    
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

                <!-- 오늘의 점검 완료율 -->
                <v-flex xs12>
                  <circle-statistic
                    :title="$t('title.InspectionCompleteRate')"
                    :sub-title="dataset.inspection.todayCompleteStatus.headline"
                    :caption="$t('title.complete')"
                    :icon="dataset.inspection.todayCompleteStatus.icon.label"
                    :color="dataset.inspection.todayCompleteStatus.color"
                    :value="dataset.inspection.todayCompleteStatus.value"
                  >
                  </circle-statistic>
                </v-flex>
                <!-- /오늘의 점검 완료율 -->
              </v-layout>
              <!-- /오늘 통계 -->
              <!-- 월간 통계 -->
              <v-layout row wrap>
                <v-flex sm12>
                  <h4>{{$t('title.monthlyStatus')}}</h4>
                </v-flex>
                <!-- 점검 수행현황 -->
                <v-flex lg6 sm12 xs12 >
                  <y-simple-datepicker
                    type="month"
                    v-model="dataset.completeStatusMonth.curDate"
                    format="YYYYMM"
                  >
                  </y-simple-datepicker>
                  <y-multibar-chart
                    :title="$t('title.inspectionPerformanceStatus')" 
                    :series="dataset.completeStatusMonth.series"
                    :x-axis-labels="dataset.completeStatusMonth.xAxisLabels"
                    :data-list="dataset.completeStatusMonth.dataList"
                    icon="bar_chart"
                    color="indigo"
                    background-color="#F1F8E9">
                  </y-multibar-chart>
                </v-flex>
                <!-- /점검 수행현황 -->
              </v-layout>
              <!-- /월간 통계 -->
              <!-- 연간 통계 -->
              <v-layout row wrap>
                <v-flex sm12>
                  <h4>{{$t('title.yearlyStatus')}}</h4>
                </v-flex>
                <!-- 점검 수행현황 -->
                <v-flex lg6 sm12 xs12 >
                  <y-simple-datepicker
                    type="year"
                    v-model="dataset.completeStatusYear.curDate"
                    format="YYYY"
                  >
                  </y-simple-datepicker>
                  <y-multibar-chart
                    :title="$t('title.inspectionPerformanceStatus')" 
                    :series="dataset.completeStatusYear.series"
                    :x-axis-labels="dataset.completeStatusYear.xAxisLabels"
                    :data-list="dataset.completeStatusYear.dataList"
                    icon="bar_chart"
                    color="indigo"
                    background-color="#F9FBE7">
                  </y-multibar-chart>
                </v-flex>
                <!-- /점검 수행현황 -->
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
      inspection: {
        completeRate: 0,
        detectedErrorCount: 0,
        // 오늘의 점검 완료율
        todayCompleteStatus: {
          subheading: null,
          headline: null,
          caption: null,
          value: 0,
          color: 'success',
          icon: {
            label: 'list',
            color: 'success'
          }
        }
      },
      completeStatusMonth: {
        xAxisLabels: [],
        series: [],
        dataList: [],
        curDate: null
      },
      completeStatusYear: {
        xAxisLabels: [],
        series: [],
        dataList: [],
        curDate: null
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
  watch: {
    'dataset.completeStatusMonth.curDate': function () {
      this.getPmPerformanceStatus('month')
    },
    'dataset.completeStatusYear.curDate': function () {
      this.getPmPerformanceStatus('year')
    }
  },
  /* Vue lifecycle: created, mounted, destroyed, etc */
  beforeMount() {
    // 올해의 점검 수행률
    this.getInspectionCompleteRate();
    // 이상 발견 설비 개수
    this.getDetectedErrorCount();
    // 오늘의 점검완료 현황
    this.getInspectionStatusOfToday();

    this.dataset.completeStatusMonth.curDate = this.$comm.getThisMonth()
    this.dataset.completeStatusYear.curDate = this.$comm.getThisYear()
    // 이달의 WO 비용
    this.getWoTotalCostAndHour();
    // 오늘의 WO완료 현황
    this.getWoPmCompleteStatusOfToday();
    // 기간별 작업 준수율
    this.getWoCompleteRate('month');
    // 부서별 기간별 작업비용
    this.getWoCosts('month');
    // WO 원인별 현황
    this.getWoCauseStatus('month');

    // 기간별 작업 준수율
    this.getWoCompleteRate('year');
    // 부서별 기간별 작업비용
    this.getWoCosts('year');
    // WO 원인별 현황
    this.getWoCauseStatus('year');
  },
  /* methods */
  methods: {
    /**
     * 올해의 점검 수행률
     */
    getInspectionCompleteRate() {
      this.$ajax.url = selectConfig.inspection.completeStatus.url;
      this.$ajax.param = selectConfig.inspection.completeStatus.searchData;
      this.$ajax.param.dateType = 'YEAR'
      this.$ajax.param.startDate = this.$comm.getThisYear()
      this.$ajax.param.endDate = this.$comm.getThisYear()
      var self = this
      var totalCount = 0;
      var totalCompleteCount = 0;
      this.$ajax.requestGet((_result) => {
        $.each(_result, (_i, _item) => {
          totalCount += _item.totCnt;
          totalCompleteCount += _item.finishCnt;
          console.log('getInspectionCompleteRate:' + _item.totCnt + ':' + _item.finishCnt)
        })
        self.dataset.inspection.completeRate = this.$comm.getPercentage(totalCompleteCount, totalCount).toString() + '%';
      })
    },
    // 오늘의 점검완료 현황
    getInspectionStatusOfToday() {
      this.$ajax.url = selectConfig.inspectionList[0].url
      this.$ajax.param = selectConfig.inspectionList[0].searchData
      this.$ajax.param.startDate = this.$comm.getToday()
      this.$ajax.param.endDate = this.$comm.getToday()
      let self = this
      this.$ajax.requestGet((_result) => {
        var result = _result.content
        var completeArray = result.filter((_item) => {
          return _item.chkDt
        })

        self.dataset.inspection.todayCompleteStatus.value = this.$comm.getPercentage(completeArray.length, result.length);
        self.dataset.inspection.todayCompleteStatus.headline = completeArray.length.toString() + '/' + result.length.toString() + ' ';
      })
    },
    /**
     * 월별/년도별 점검 수행 현황
     */
    getPmPerformanceStatus(_type) {
      this.$ajax.url = selectConfig.inspection.completeStatus.url;
      this.$ajax.param = selectConfig.inspection.completeStatus.searchData;
      if (_type === 'year') {
        this.$ajax.param.dateType = 'YEAR'
        this.$ajax.param.startDate = this.dataset.completeStatusYear.curDate
        this.$ajax.param.endDate = this.dataset.completeStatusYear.curDate
      } else {
        this.$ajax.param.dateType = 'MON'
        this.$ajax.param.startDate = this.dataset.completeStatusMonth.curDate
        this.$ajax.param.endDate = this.dataset.completeStatusMonth.curDate
      }

      var self = this
      var totalCount = 0;
      var totalCompleteCount = 0;
      var xAxisLabels = []
      var dataList = []
      var series = [
        {name: this.$t('title.inspectionCompleteCount'), type: 'bar'},
        {name: this.$t('title.inspectionInompleteCount'), type: 'bar'},
        {name: this.$t('title.InspectionCompleteRate'), type: 'line', yAxisIndex: 1},
      ]
      
      var completeCount = 0;
      var incompleteCount = 0;
      var completeRate = 0;
      this.$ajax.requestGet((_result) => {
        if (_type === 'year') self.dataset.completeStatusYear.series = series
        else self.dataset.completeStatusMonth.series = series
        
        $.each(series, (_i) => {
          dataList.push(new Array())
        })

        $.each(_result, (_i, _item) => {
          // 완료수
          completeCount += _item.finishCnt
          // 미완료수
          incompleteCount += _item.notFinishCnt
        })

        dataList[0].unshift(completeCount)
        dataList[1].unshift(incompleteCount)
        dataList[2].unshift(this.$comm.getPercentage(completeCount / (completeCount + incompleteCount)))

        if (_type === 'year') {
          self.dataset.completeStatusYear.xAxisLabels = xAxisLabels
          self.dataset.completeStatusYear.dataList = dataList
        }
        else {
          self.dataset.completeStatusMonth.xAxisLabels = xAxisLabels
          self.dataset.completeStatusMonth.dataList = dataList
        }
      })
    },
    getDetectedErrorCount() {
      this.$ajax.url = selectConfig.inspection.detectedErrorStatus.url
      this.$ajax.param = selectConfig.inspection.detectedErrorStatus.searchData
      this.$ajax.param.dateType = 'YEAR'
      this.$ajax.param.startDate = this.$comm.getThisYear()
      this.$ajax.param.endDate = this.$comm.getThisYear()
      let self = this
      this.$ajax.requestGet((_result) => {
        var result = _result.content        
        self.dataset.inspection.detectedErrorCount = result.length;
      })
    },
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
      this.$ajax.param = this.$comm.clone(selectConfig.woList[0].searchData)
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
    getWoCompleteRate(_type) {
      this.$ajax.url = selectConfig.wo.woCompeteRateByMonth.url
      this.$ajax.param = selectConfig.wo.woCompeteRateByMonth.searchData
      if (_type === 'year') {
        this.$ajax.param.dateType = 'YEAR'
        this.$ajax.param.startDate = this.$comm.getPrevYear(this.years)
        this.$ajax.param.endDate = this.$comm.getThisYear()        
      } else {
        this.$ajax.param.dateType = 'MON'
        this.$ajax.param.startDate = this.$comm.getPrevMonth(this.months)
        this.$ajax.param.endDate = this.$comm.getThisMonth()
      }
      let self = this
      this.$ajax.requestGet((_result) => {
        var data = []
        var totalWoCount = 0
        var completeWoCount = 0
        var loopCnt = _type === 'year' ? this.years : this.months
        for(var i = 0; i < loopCnt; i++) {
          var curData = _type === 'year' ? this.$comm.getPrevYear(i) : this.$comm.getPrevMonth(i)
          var tmpArray = _result.filter((_item) => {
            return curData === _item.yearMon.split('.').join('')
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
        if (_type === 'year') self.dataset.workCompleteRateYears.data = data
        else self.dataset.workCompleteRateMonths.data = data
      })
    },
    /**
     * 기간별 작업비용
     */
    getWoCosts(_type) {
      this.$ajax.url = selectConfig.wo.woCostsByMonth.url
      this.$ajax.param = selectConfig.wo.woCostsByMonth.searchData
      if (_type === 'year') {
        this.$ajax.param.dateType = 'YEAR'
        this.$ajax.param.startDate = this.$comm.getPrevYear(this.years)
        this.$ajax.param.endDate = this.$comm.getThisYear()        
      } else {
        this.$ajax.param.dateType = 'MON'
        this.$ajax.param.startDate = this.$comm.getPrevMonth(this.months)
        this.$ajax.param.endDate = this.$comm.getThisMonth()
      }
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
        var series = [
          {name: this.$t('title.materialCost'), type: 'bar'},
          {name: this.$t('title.laborCost'), type: 'bar'},
          {name: this.$t('title.outsourcingCost'), type: 'bar'},
          // {name: this.$t('title.totalCost'), type: 'bar'}
          // {name: this.$t('title.totalCost'), type: 'line', yAxisIndex: 1},
        ]
        if (_type === 'year') self.dataset.woCostsYears.series = series
        else self.dataset.woCostsMonths.series = series
        
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
            // dataList[3].unshift(0)
          }
          else {
            // 자재비
            mtrlCost = tmpArray.reduce(function (sum, _item) {
                return sum + _item.mtrlCost;
            }, 0);
            // 인건비
            laborCost = tmpArray.reduce(function (sum, _item) {
                return sum + _item.laborCost;
            }, 0);
            // 외주비
            outsideCost = tmpArray.reduce(function (sum, _item) {
                return sum + _item.outsideCost;
            }, 0);
            // 총액
            totCost = tmpArray.reduce(function (sum, _item) {
                return sum + _item.totCost;
            }, 0);

            var unit = _type === 'year' ? self.dataset.woCostsYears.unit : self.dataset.woCostsMonths.unit
            dataList[0].unshift(Math.ceil(mtrlCost / unit))
            dataList[1].unshift(Math.ceil(laborCost / unit))
            dataList[2].unshift(Math.ceil(outsideCost / unit))
          }
        }

        if (_type === 'year') {
          self.dataset.woCostsYears.xAxisLabels = xAxisLabels
          self.dataset.woCostsYears.dataList = dataList
          console.log('year xAxisLabels:' + JSON.stringify(xAxisLabels))
          console.log('year dataList:' + JSON.stringify(dataList))
        }
        else {
          self.dataset.woCostsMonths.xAxisLabels = xAxisLabels
          self.dataset.woCostsMonths.dataList = dataList
          console.log('month xAxisLabels:' + JSON.stringify(xAxisLabels))
          console.log('month dataList:' + JSON.stringify(dataList))
        }
      })
    },
    /**
     * 원인별 WO 현황
     */
    getWoCauseStatus(_type) {
      this.$ajax.url = selectConfig.woList[1].url
      this.$ajax.param = selectConfig.woList[1].searchData
      if (_type === 'year') {
        this.$ajax.param.dateType = 'YEAR'
        this.$ajax.param.startDate = this.$comm.getPrevYear(this.years)
        this.$ajax.param.endDate = this.$comm.getThisYear()        
      } else {
        this.$ajax.param.dateType = 'MON'
        this.$ajax.param.startDate = this.$comm.getPrevMonth(this.months)
        this.$ajax.param.endDate = this.$comm.getThisMonth()
      }
      let self = this
      this.$ajax.requestGet((_result) => {
        var data = []
        var legendData= []
        $.each(_result, (_i, _item) => {
          data.push({
            value: _item.workOrderCnt,
            name: _item.causeNm
          })
          legendData.push(_item.causeNm)
        })

        if (_type === 'year') {
          self.dataset.woCauseYears.data = data
          self.dataset.woCauseYears.legendData = legendData
        } else {
          self.dataset.woCauseMonths.data = data
          self.dataset.woCauseMonths.legendData = legendData
        }
      });
    }
  }
}
</script>

