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
              <v-toolbar-title class="subheading">{{$t('menu.equipmentStatistics')}}</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="">
              <!-- 요약 -->
              <v-layout row wrap>
                <v-flex sm12>
                  <h4>{{$t('title.summary')}}</h4>
                </v-flex>
                <v-flex lg6 sm6 xs12>
                  <mini-statistic
                    icon="domain"
                    :iconTitle="$t('title.installedEquipment')"
                    :title="totalCount"
                    :sub-title="$t('title.number')"
                    color="success"      
                  >
                  </mini-statistic>  
                </v-flex>
                <v-flex lg6 sm6 xs12>
                  <mini-statistic
                    icon="domain"
                    :iconTitle="$t('title.breakdownEquipment')"
                    :title="totalBreakdownCount"
                    :sub-title="$t('title.number')"
                    color="red darken-3"      
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

                <!-- 오늘의 설비가동율 -->
                <v-flex xs12>
                  <y-gauge-chart
                    :title="$t('title.equipmentUtilizationRate')"
                    :icon="dataset.equipment.statusOfToday.icon.label"
                    :color="dataset.equipment.statusOfToday.color"
                    :data-list="dataset.equipment.statusOfToday.data"
                  >
                  </y-gauge-chart>
                </v-flex>
              </v-layout>
              <!-- /오늘 통계 -->
              <!-- 월간 통계 -->
              <v-layout row wrap>
                <v-flex sm12>
                  <h4>{{$t('title.monthlyStatus')}}</h4>
                </v-flex>
                <!-- 월별 설비 고장시간 -->
                <v-flex lg6 sm12 xs12 >
                  <y-multibar-chart
                    :title="$t('title.equipmentOfDowntime')" 
                    :series="dataset.breakdownTimeMonth.series"
                    :x-axis-labels="dataset.breakdownTimeMonth.xAxisLabels"
                    :data-list="dataset.breakdownTimeMonth.dataList"
                    :unit="dataset.breakdownTimeMonth.unit"
                    icon="bar_chart"
                    color="indigo"
                    background-color="#F1F8E9">
                  </y-multibar-chart>
                </v-flex>
                <!-- /월별 설비 고장시간 -->
                <!-- 설비별 정비 비용 -->
                <v-flex lg6 sm12 xs12 >
                  <y-simple-datepicker
                    type="month"
                    v-model="dataset.costByMonth.curDate"
                    format="YYYYMM"
                  >
                  </y-simple-datepicker>
                  <y-multibar-chart
                    :title="$t('title.maintenanceCost')" 
                    :series="dataset.costByMonth.series"
                    :x-axis-labels="dataset.costByMonth.xAxisLabels"
                    :data-list="dataset.costByMonth.dataList"
                    :unit="dataset.costByMonth.unit"
                    icon="bar_chart"
                    color="indigo"
                    background-color="#F1F8E9">
                  </y-multibar-chart>
                </v-flex>
                <!-- /설비별 정비 비용 -->
                <!-- 월별 MTTR -->
                <v-flex lg6 sm12 xs12 >
                  <y-simple-datepicker
                    type="month"
                    v-model="dataset.mttrByMonth.curDate"
                    format="YYYYMM"
                  >
                  </y-simple-datepicker>
                  <y-multibar-chart
                    :title="$t('title.mttr')" 
                    :series="dataset.mttrByMonth.series"
                    :x-axis-labels="dataset.mttrByMonth.xAxisLabels"
                    :data-list="dataset.mttrByMonth.dataList"
                    :unit="dataset.mttrByMonth.unit"
                    icon="bar_chart"
                    color="indigo"
                    background-color="#F1F8E9">
                  </y-multibar-chart>
                </v-flex>
                <!-- /월별 MTTR -->

                <!-- 월별 MTBF -->
                <v-flex lg6 sm12 xs12 >
                  <y-simple-datepicker
                    type="month"
                    v-model="dataset.mtbfByMonth.curDate"
                    format="YYYYMM"
                  >
                  </y-simple-datepicker>
                  <y-multibar-chart
                    :title="$t('title.mtbf')" 
                    :series="dataset.mtbfByMonth.series"
                    :x-axis-labels="dataset.mtbfByMonth.xAxisLabels"
                    :data-list="dataset.mtbfByMonth.dataList"
                    :unit="dataset.mtbfByMonth.unit"
                    icon="bar_chart"
                    color="indigo"
                    background-color="#F1F8E9">
                  </y-multibar-chart>
                </v-flex>
                <!-- /월별 MTBF -->
              </v-layout>
              <!-- /월간 통계 -->
              <!-- 연간 통계 -->
              <v-layout row wrap>
                <!-- 년도별 설비 고장시간 -->
                <v-flex lg6 sm12 xs12 >
                  <y-multibar-chart
                    :title="$t('title.equipmentOfDowntime')" 
                    :series="dataset.breakdownTimeYear.series"
                    :x-axis-labels="dataset.breakdownTimeYear.xAxisLabels"
                    :data-list="dataset.breakdownTimeYear.dataList"
                    :unit="dataset.breakdownTimeYear.unit"
                    icon="bar_chart"
                    color="indigo"
                    background-color="#F9FBE7">
                  </y-multibar-chart>
                </v-flex>
                <!-- /년도별 설비 고장시간 -->
                <!-- /설비별 정비 비용 -->
                <v-flex lg6 sm12 xs12 >
                  <y-simple-datepicker
                    type="year"
                    v-model="dataset.costByYear.curDate"
                    format="YYYY"
                  >
                  </y-simple-datepicker>
                  <y-multibar-chart
                    :title="$t('title.maintenanceCost')" 
                    :series="dataset.costByYear.series"
                    :x-axis-labels="dataset.costByYear.xAxisLabels"
                    :data-list="dataset.costByYear.dataList"
                    :unit="dataset.costByYear.unit"
                    icon="bar_chart"
                    color="indigo"
                    background-color="#F9FBE7">
                  </y-multibar-chart>
                </v-flex>
                <!-- /설비별 정비 비용 -->
                <!-- 년도별 MTTR -->
                <v-flex lg6 sm12 xs12 >
                  <y-simple-datepicker
                    type="year"
                    v-model="dataset.mttrByYear.curDate"
                    format="YYYY"
                  >
                  </y-simple-datepicker>
                  <y-multibar-chart
                    :title="$t('title.mttr')" 
                    :series="dataset.mttrByYear.series"
                    :x-axis-labels="dataset.mttrByYear.xAxisLabels"
                    :data-list="dataset.mttrByYear.dataList"
                    :unit="dataset.mttrByYear.unit"
                    icon="bar_chart"
                    color="indigo"
                    background-color="#F9FBE7">
                  </y-multibar-chart>
                </v-flex>
                <!-- /년도별 MTTR -->

                <!-- 년도별 MTBF -->
                <v-flex lg6 sm12 xs12 >
                  <y-simple-datepicker
                    type="year"
                    v-model="dataset.mtbfByYear.curDate"
                    format="YYYY"
                  >
                  </y-simple-datepicker>
                  <y-multibar-chart
                    :title="$t('title.mtbf')" 
                    :series="dataset.mtbfByYear.series"
                    :x-axis-labels="dataset.mtbfByYear.xAxisLabels"
                    :data-list="dataset.mtbfByYear.dataList"
                    :unit="dataset.mtbfByYear.unit"
                    icon="bar_chart"
                    color="indigo"
                    background-color="#F9FBE7">
                  </y-multibar-chart>
                </v-flex>
                <!-- /년도별 MTBF -->
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
import YGaugeChart from '@/components/widgets/chart/YGaugeChart'

export default {
  /* attributes: name, components, props, data */
  components: {
    MiniStatistic,
    CircleStatistic,
    EChart,
    YLineChart,
    YMultibarChart,
    YPieChart,
    YGaugeChart
  },
  name: 'y-wo-statistics',
  props: {
  },
  data: () => ({
    color: color,
    dataset: {
      equipment: {
        statusOfToday: {
          dataType: 'equipment',
          data: null,
          key: 'statusOfToday',
          type: 'donut',
          title: '',
          icon: {
            label: 'domain',
            color: 'info'
          }
        }
      },
      // 월별 설비 고장 시간
      breakdownTimeMonth: {
        xAxisLabels: [],
        series: [],
        dataList: [],
        curDate: null
      },
      // 년도별 설비 고장 시간
      breakdownTimeYear: {
        xAxisLabels: [],
        series: [],
        dataList: [],
        curDate: null
      },
      // 월별 정비 비용
      costByMonth: {
        xAxisLabels: [],
        series: [],
        dataList: [],
        unit: 1000,
        curDate: null
      },
      // 년도별 정비 비용
      costByYear: {
        xAxisLabels: [],
        series: [],
        dataList: [],
        unit: 10000,
        curDate: null
      },
      // 월별 mttr 
      mttrByMonth: {
        xAxisLabels: [],
        series: [],
        dataList: [],
        curDate: null
      },
      // 년도별 mttr 
      mttrByYear: {
        xAxisLabels: [],
        series: [],
        dataList: [],
        curDate: null
      },
      // 월별 MTBF
      mtbfByMonth: {
        xAxisLabels: [],
        series: [],
        dataList: [],
        curDate: null
      },
      // 년도별 MTBF
      mtbfByYear: {
        xAxisLabels: [],
        series: [],
        dataList: [],
        curDate: null
      },
    },
    totalCount: 0,
    totalBreakdownCount: 0,
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
    'dataset.costByMonth.curDate': function () {      
      this.getMaintenanceCost('month')
    },
    'dataset.costByYear.curDate': function () {      
      this.getMaintenanceCost('year')
    },
    'dataset.mttrByMonth.curDate': function () {
      this.getMttr('month')
    },
    'dataset.mttrByYear.curDate': function () {
      this.getMttr('year')
    },
    'dataset.mtbfByMonth.curDate': function () {
      this.getMtbf('month')
    },
    'dataset.mtbfByYear.curDate': function () {
      this.getMtbf('year')
    }
  },
  /* Vue lifecycle: created, mounted, destroyed, etc */
  mounted() {
    // 오늘의 설비 현황
    this.getEquipmentStatusOfToday();
    // 월별 설비고장시간
    this.getBreakdownTime('month')
    // 년도별 설비고장시간
    this.getBreakdownTime('year')
    this.dataset.costByMonth.curDate = this.$comm.getThisMonth()
    this.dataset.costByYear.curDate = this.$comm.getThisYear()
    this.dataset.mttrByMonth.curDate = this.$comm.getThisMonth()
    this.dataset.mttrByYear.curDate = this.$comm.getThisYear()
    this.dataset.mtbfByMonth.curDate = this.$comm.getThisMonth()
    this.dataset.mtbfByYear.curDate = this.$comm.getThisYear()
  },
  /* methods */
  methods: {
    // 오늘의 설비 현황
    getEquipmentStatusOfToday() {
      this.$ajax.url = selectConfig.equipmentList[0].url
      this.$ajax.param = selectConfig.equipmentList[0].searchData
      var self = this
      this.$ajax.requestGet((_result) => {
        var data = _result.content
        var items = [
          {name: '', value: 0},
          {name: '', value: 0},
        ]
        $.each(data, function (_i, _item){
          if (_item.equipStatusCd === 'EQUIP_STATUS_O') {
            items[0].name = _item.equipStatusNm
            items[0].value++
          }
          else if (_item.equipStatusCd === 'EQUIP_STATUS_B') {
            items[1].name = _item.equipStatusNm
            items[1].value++
            self.totalBreakdownCount++;
          }
          self.totalCount++;
        })
        self.dataset.equipment.statusOfToday.data = [{value: this.$comm.getPercentage(this.totalCount - this.totalBreakdownCount, this.totalCount), name: this.$t('title.equipmentUtilizationRate')}]
        self.dataset.equipment.statusOfToday.title = this.$t('title.equipmentUtilizationRate')  // TODO : 오늘의 설비현황
      }, (_error) => {
        console.log('_error:' + JSON.stringify(_error))
      })
    },
    // 고장 타입별 다운타임
    getBreakdownTime(_type) {
      this.$ajax.url = selectConfig.equipmentList[1].url
      this.$ajax.param = selectConfig.equipmentList[1].searchData

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
      let items = []
      this.$ajax.requestGet((_result) => {
        var data = _result.content
        var item = {}
        var prevYearMon = ''
        var xAxisLabels = []
        var dataList = [] // 월/년도별 항목 데이터
        // bar type의 chart를 먼저 표시한다.
        var series = [
          {name: '', type: 'bar'}
        ]
        if (_type === 'year') self.dataset.breakdownTimeYear.series = series
        else self.dataset.breakdownTimeMonth.series = series
        
        $.each(series, (_i) => {
          dataList.push(new Array())
        })

        $.each(data, function (_i, _item){
          if (prevYearMon !== _item.yearMon) {
            if (prevYearMon !== '') {
              xAxisLabels.unshift(item.month)
              dataList[0].unshift(item.breakTime)
            }
            item = {}
            item.month =  _item.yearMon
            item.breakTime = _item.totBreakTime
          } else item.breakTime += _item.totBreakTime

          if (_i === data.length - 1) {
            item.breakTime += _item.totBreakTime
            xAxisLabels.unshift(item.month)
            dataList[0].unshift(item.breakTime)
            // self.equipmentBreakDownData = self.$comm.clone(items)
          }
          prevYearMon = _item.yearMon
        })
        if (_type === 'year') {
          self.dataset.breakdownTimeYear.dataList = dataList
          self.dataset.breakdownTimeYear.xAxisLabels = xAxisLabels
        }
        else {
          console.log('dataList:' + JSON.stringify(dataList))
          console.log('xAxisLabels:' + JSON.stringify(xAxisLabels))
          self.dataset.breakdownTimeMonth.dataList = dataList
          self.dataset.breakdownTimeMonth.xAxisLabels = xAxisLabels
        }
      })
    },
    /**
     * 기간별 작업비용
     */
    getMaintenanceCost(_type) {
      this.$ajax.url = selectConfig.equipment.maintenanceCost.url + _type
      this.$ajax.param = selectConfig.equipment.maintenanceCost.searchData

      var searchDate = _type === 'year' ? this.dataset.costByYear.curDate : this.dataset.costByMonth.curDate
      if (_type === 'year') {
        this.$ajax.param.dateType = 'YEAR'
      } else {
        this.$ajax.param.dateType = 'MON'
      }
      this.$ajax.param.startDate = searchDate
      this.$ajax.param.endDate = searchDate
      
      let self = this
      this.$ajax.requestGet((_result) => {
        var result = _result.content
        var xAxisLabels = []
        var dataList = [] // 월/년도별 항목 데이터
        var totCost = 0
        var mtrlCost = 0
        var laborCost = 0
        var outsideCost = 0
        var completeWoCount = 0
        // bar type의 chart를 먼저 표시한다.
        var series = [
          {name: this.$t('title.totalCost'), type: 'bar'}
        ]
        if (_type === 'year') self.dataset.costByYear.series = series
        else self.dataset.costByMonth.series = series
        
        $.each(series, (_i) => {
          dataList.push(new Array())
        })
       
        $.each(result, (_i, _item) => {
          xAxisLabels.unshift(_item.equipCd)

          var unit = _type === 'year' ? self.dataset.costByYear.unit : self.dataset.costByMonth.unit
          dataList[0].unshift(Math.ceil(_item.totCost / unit))
        })

        if (_type === 'year') {
          self.dataset.costByYear.xAxisLabels = xAxisLabels
          self.dataset.costByYear.dataList = dataList
        }
        else {
          self.dataset.costByMonth.xAxisLabels = xAxisLabels
          self.dataset.costByMonth.dataList = dataList
        }
      })
    },
    /**
     * 기간별 mttr
     */
    getMttr(_type) {
      this.$ajax.url = selectConfig.equipment.mttr.url
      this.$ajax.param = selectConfig.equipment.mttr.searchData

      var searchDate = _type === 'year' ? this.dataset.mttrByYear.curDate : this.dataset.mttrByMonth.curDate
      if (_type === 'year') {
        this.$ajax.param.dateType = 'YEAR'
      } else {
        this.$ajax.param.dateType = 'MON'
      }
      this.$ajax.param.startDate = searchDate
      this.$ajax.param.endDate = searchDate
      
      let self = this
      this.$ajax.requestGet((_result) => {
        var result = _result.content
        var xAxisLabels = []
        var dataList = [] // 월/년도별 항목 데이터
        var totCost = 0
        var mtrlCost = 0
        var laborCost = 0
        var outsideCost = 0
        var completeWoCount = 0
        // line type의 chart를 먼저 표시한다.
        var series = [
          {name: this.$t('title.mttr'), type: 'line'}
        ]
        if (_type === 'year') self.dataset.mttrByYear.series = series
        else self.dataset.mttrByMonth.series = series
        
        $.each(series, (_i) => {
          dataList.push(new Array())
        })
       
        $.each(result, (_i, _item) => {
          xAxisLabels.unshift(_item.equipCd)
          dataList[0].unshift(_item.calculateValue)
        })

        if (_type === 'year') {
          self.dataset.mttrByYear.xAxisLabels = xAxisLabels
          self.dataset.mttrByYear.dataList = dataList
        }
        else {
          self.dataset.mttrByMonth.xAxisLabels = xAxisLabels
          self.dataset.mttrByMonth.dataList = dataList
        }
      })
    },
    /**
     * 기간별 MTBF
     */
    getMtbf(_type) {
      this.$ajax.url = selectConfig.equipment.mtbf.url
      this.$ajax.param = selectConfig.equipment.mtbf.searchData

      var searchDate = _type === 'year' ? this.dataset.mtbfByYear.curDate : this.dataset.mtbfByMonth.curDate
      if (_type === 'year') {
        this.$ajax.param.dateType = 'YEAR'
      } else {
        this.$ajax.param.dateType = 'MON'
      }
      this.$ajax.param.startDate = searchDate
      this.$ajax.param.endDate = searchDate
      
      let self = this
      this.$ajax.requestGet((_result) => {
        var result = _result.content
        var xAxisLabels = []
        var dataList = [] // 월/년도별 항목 데이터
        var totCost = 0
        var mtrlCost = 0
        var laborCost = 0
        var outsideCost = 0
        var completeWoCount = 0
        // line type의 chart를 먼저 표시한다.
        var series = [
          {name: this.$t('title.mtbf'), type: 'line'}
        ]
        if (_type === 'year') self.dataset.mtbfByYear.series = series
        else self.dataset.mtbfByMonth.series = series
        
        $.each(series, (_i) => {
          dataList.push(new Array())
        })
       
        $.each(result, (_i, _item) => {
          xAxisLabels.unshift(_item.equipCd)
          dataList[0].unshift(_item.calculateValue)
        })

        if (_type === 'year') {
          self.dataset.mtbfByYear.xAxisLabels = xAxisLabels
          self.dataset.mtbfByYear.dataList = dataList
        }
        else {
          self.dataset.mtbfByMonth.xAxisLabels = xAxisLabels
          self.dataset.mtbfByMonth.dataList = dataList
        }
      })
    },
  }
}
</script>

