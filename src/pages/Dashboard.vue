<template>
  <div id="pageDashboard">
    <v-container grid-list-xl fluid class="mt-0 pt-0">
      <!-- TODO : summary -->
      <v-layout row wrap>
        <v-flex sm12>
          <h4>{{$t('title.summaryThisYear')}}</h4>
        </v-flex>
        <!-- 설치된 설비수 -->
        <v-flex lg3 sm6 xs12>
          <mini-statistic
            icon="domain"
            :iconTitle="$t('title.installedEquipment')"
            :title="dataset.equipment.totalCount"
            :sub-title="$t('title.number')"
            color="success  darken-1"      
          >
          </mini-statistic>  
        </v-flex>
        <!-- /설치된 설비수 -->
        <!-- 고장 설비수 -->
        <v-flex lg3 sm6 xs12>
          <mini-statistic
            icon="domain"
            :iconTitle="$t('title.breakdownEquipment')"
            :title="dataset.equipment.totalBreakdownCount"
            :sub-title="$t('title.number')"
            color="red darken-1"      
          >
          </mini-statistic>  
        </v-flex>
        <!-- /고장 설비수 -->
        <!-- WO 비용 -->
        <v-flex lg3 sm6 xs12>
          <mini-statistic
            icon="description"
            iconTitle="WO"
            :title="dataset.wo.totalCosts"
            :sub-title="$t('title.cost') + '(' + $t('title.unit') + ':' + costDivider + ')'"
            color="indigo darken-1"      
          >
          </mini-statistic>  
        </v-flex>
        <!-- /WO 비용 -->
        <!-- WO 작업시간 -->
        <v-flex lg3 sm6 xs12>
          <mini-statistic
            icon="description"
            iconTitle="WO"
            :title="dataset.wo.totalHours"
            :sub-title="$t('title.workHours')"
            color="purple darken-1"    
          >
          </mini-statistic>
        </v-flex>
        <!-- /WO 작업시간 -->
        <!-- 점검 완료율 -->
        <v-flex lg3 sm6 xs12>
          <mini-statistic
            icon="list_alt"
            iconTitle="Inspection"
            :title="dataset.inspection.completeRate"
            :sub-title="$t('title.complete')"
            color="teal darken-1"      
          >
          </mini-statistic>           
        </v-flex>          
        <!-- /점검 완료율 -->
        <!-- PM 완료율 -->
        <v-flex lg3 sm6 xs12>
          <mini-statistic
            icon="assignment"
            iconTitle="PM"
            :title="dataset.pm.completeRate"
            :sub-title="$t('title.complete')"
            color="cyan darken-1"      
          >
          </mini-statistic>            
        </v-flex>        
        <!-- /PM 완료율 -->
      </v-layout>
      <!-- /TODO : summary -->

      <!-- TODO : 설비 관련 통계 -->
      <v-layout row wrap>
        <v-flex sm12>
          <h4>{{$t('title.todayStatus')}}</h4>
        </v-flex>
        <!-- TODO : 오늘의 설비현황 -->
        <!-- <v-flex lg4 sm6 xs12>
          <y-dashboard-card 
            v-if="dataset.equipment.statusOfToday.data"
            :related-contents="dataset.equipment"
            :default-key="dataset.keyList.equipment[0]"
            @chartChanged="chartChanged"
          >
          </y-dashboard-card>
        </v-flex> -->
        <!-- /TODO : 오늘의 설비현황 -->
        <!-- 오늘의 설비가동율 -->
        <v-flex lg4 sm6 xs12>
          <y-gauge-chart
            :title="$t('title.equipmentUtilizationRate')"
            :icon="dataset.equipment.statusOfToday.icon.label"
            :color="dataset.equipment.statusOfToday.color"
            :data-list="dataset.equipment.statusOfToday.data"
          >
          </y-gauge-chart>
        </v-flex>
        <!-- /오늘의 설비가동율 -->
        <!-- TODO : 설비별 Downtime -->
        <v-flex lg8 sm6 xs12>
          <y-dashboard-card 
            v-if="dataset.equipment.breakdownTime.data"
            :related-contents="dataset.equipment"
            :default-key="dataset.keyList.equipment[1]"
            @chartChanged="chartChanged"
          >
          </y-dashboard-card>
        </v-flex>
        <!-- /TODO : 설비별 Downtime -->
      </v-layout>
      <!-- /TODO : 설비 관련 통계 -->

      <!-- TODO : 오늘의 주요 통계 -->
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

        <!-- 오늘의 점검율 -->
        <v-flex lg4 sm6 xs12>
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

        <!-- 오늘의 PM 수행율 -->
        <v-flex lg4 sm6 xs12>
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
      <!-- /오늘의 WO 완료율 -->

      <!-- SAMPLE -->
      <!-- <v-layout row wrap>
        <v-flex lg4 sm4 xs12>
          <linear-statistic class="my-4"
            :title="$t('title.woStatistics')"
            sub-title="$t('title.Complete')"
            icon="trending_up"
            color="success"
            :value="15"
          >
          </linear-statistic>
        </v-flex>
        <v-flex lg4 sm4 xs12>
          <linear-statistic class="my-4"
            title="점검 완료율"
            sub-title="완료"
            icon="trending_up"
            color="pink"
            :value="90"
          >
          </linear-statistic> 
        </v-flex>
        <v-flex lg4 sm4 xs12>         
          <linear-statistic class="my-4"
            title="PM 실시율"
            sub-title="실시"
            icon="trending_up"
            color="primary"
            :value="100"
          >
          </linear-statistic> 
        </v-flex>         
      </v-layout> -->
      <!-- /SAMPLE -->
      <!-- /TODO : 오늘의 주요 통계 -->

      <!-- WO 관련 통계 -->
      <v-layout row wrap>
        <v-flex sm12>
          <h4>{{$t('title.wo')}}</h4>
        </v-flex>
        <v-flex lg4 sm6 xs12>
          <!-- TODO : 원인별 WO 현황 -->
          <y-dashboard-card 
            v-if="dataset.wo.causeStatus.data"
            :related-contents="dataset.wo"
            :default-key="dataset.keyList.wo[0]"
            @chartChanged="chartChanged"
          >
          </y-dashboard-card>
          <!-- /TODO : 원인별 WO 현황 -->
        </v-flex>
        <!-- TODO : 점검별 WO 발행건수 -->
        <!-- <v-flex lg4 sm6 xs12>
          <v-flex lg4 sm12>
            <v-card color="blue darken-1" dark>
              <v-card-title>
                <div class="layout row ma-0">
                  <div class="subheading">점검별 WO 발행건수</div>
                  <v-spacer></v-spacer>
                  <div class="caption"> <v-icon>trending_up</v-icon>  20%</div>
                </div>
              </v-card-title>
              <v-card-media
              >
                <e-chart 
                :path-option="[
                  ['dataset.source', sampleDataset.monthVisit],
                  ['color', [color.blue.base]],
                  ['xAxis.show', false],
                  ['xAxis.boundaryGap', false],
                  ['grid.left', '0'],
                  ['grid.bottom', '0'],
                  ['grid.right', '0'],
                  ['yAxis.show', false],
                  ['series[0].areaStyle', {} ],
                  ['series[0].smooth', true ],
                ]"
                height="200px"
                width="100%"
                >
                </e-chart>
              </v-card-media>    
              <v-card-text class="white">
                <div class="layout row align-center ma-0">
                  <div class="grey--text">
                    <div class="caption">최대</div>
                    <div class="subheading mt-2">25건</div>
                  </div>
                  <v-spacer></v-spacer>
                  <div class="">
                    <v-progress-circular
                      :size="100"
                      :width="15"
                      :rotate="360"
                      :value="10"
                      color="blue"
                    >
                      10
                    </v-progress-circular>
                  </div>
                </div>
              </v-card-text>                    
            </v-card>             
          </v-flex>
        </v-flex> -->
        <!-- /TODO : 점검별 WO 발행건수 -->
        <v-flex lg4 sm12 xs12>
          <!-- TODO : 지연 작업 -->
          <plain-table-order
            v-if="woDelayData"
            :title="$t('title.woDelay')"
            :data="woDelayData">
          </plain-table-order>
          <!-- /TODO : 지연 작업 -->
        </v-flex>
      </v-layout>
      <!-- WO 관련 통계 -->

      <!-- TODO : 점검 통계 -->
      <!-- <v-layout row wrap>
        <v-flex sm12>
          <h4>PM / Inspection</h4>
          <v-card dark color="green">
            <v-card-title>
              <div class="layout row ma-0">
                <div class="subheading">월별 PM수행율</div>
                <v-spacer></v-spacer>
                <div class="caption"> <v-icon>trending_up</v-icon>  20%</div>
              </div>
            </v-card-title>
            <v-card-media class="white--text">
              <e-chart 
                ref="chart"
                :path-option="[
                ['dataset.source', sampleDataset.stackData],
                ['grid.bottom', '10%'],
                ['grid.top', '5%'],
                ['xAxis.show', false],
                ['yAxis.show', false],      
                ['series[0].type', 'bar'],         
                ['series[0].barGap', '-100%'],         
                ['series[0].itemStyle.normal.color', 'rgba(0,0,0,0.1)'],         
                ['series[0].barWidth', '50%'],        
                ['series[1].barWidth', '50%'],        
                ['series[1].type', 'bar'],          
                ['series[1].itemStyle.normal.color', color.shades.white],         
                ]"
                height="200px"
                width="100%"
              >
              </e-chart>
            </v-card-media>
            <v-card-text class="white">
              <div class="layout row align-center ma-0">
                <div class="grey--text">
                  <div class="caption">최대</div>
                  <div class="subheading mt-2">90%</div>
                </div>
                <v-spacer></v-spacer>
                <div class="">
                  <v-progress-circular
                    :size="100"
                    :width="15"
                    :rotate="360"
                    :value="10"
                    color="blue"
                  >
                    10
                  </v-progress-circular>
                </div>
              </div>
            </v-card-text>
          </v-card>            
        </v-flex>
        <v-flex lg4 sm12>
          <v-card class="box-shadow" dark color="pink">
            <v-card-title>
              <div class="layout row ma-0">
                <div class="subheading">PM 수행 현황</div>
                <v-spacer></v-spacer>
                <div class="caption"> <v-icon>trending_up</v-icon>  20%</div>
              </div>
            </v-card-title>
            <v-card-media
              class="white--text"
            >
              <e-chart 
                :path-option="[
                  ['dataset.source', sampleDataset.monthVisit],
                  ['color', [color.pink.lighten2]],
                  ['grid.left', '0'],
                  ['grid.bottom', '0'],
                  ['grid.right', '0'],                
                  ['xAxis.show', false],
                  ['yAxis.show', false],
                ]"
                height="200px"
                width="100%"
              >
              </e-chart>
            </v-card-media>
            <v-card-text class="white">
              <div class="layout row align-center ma-0">
                <div class="grey--text">
                  <div class="caption">최대</div>
                  <div class="subheading mt-2">30%</div>
                </div>
                <v-spacer></v-spacer>
                <div class="">
                  <v-progress-circular
                    :size="100"
                    :width="15"
                    :rotate="360"
                    :value="10"
                    color="blue"
                  >
                    10
                  </v-progress-circular>
                </div>
              </div>
            </v-card-text>
          </v-card>             
        </v-flex>
      </v-layout> -->
      <!-- /TODO : PM / 점검 통계 -->

      

      <!-- <v-layout row wrap>
        <v-flex sm12>
          <h4>MTTR / MTBF</h4>
        </v-flex>
        <v-flex lg6 sm12 xs12>
          <plain-table></plain-table>
        </v-flex>
      </v-layout> -->
    </v-container>
  </div>
</template>

<script>
import API from '@/api';
import EChart from '@/components/chart/echart';
import MiniStatistic from '@/components/widgets/statistic/MiniStatistic';
import MiniChart from '@/components/widgets/chart/MiniChart';
import PostListCard from '@/components/widgets/card/PostListCard';
import ProfileCard from '@/components/widgets/card/ProfileCard';
import PostSingleCard from '@/components/widgets/card/PostSingleCard';
import WeatherCard from '@/components/widgets/card/WeatherCard';
import PlainTable from '@/components/widgets/list/PlainTable';
import PlainTableOrder from '@/components/widgets/list/PlainTableOrder';
import VWidget from '@/components/VWidget';
import Material from 'vuetify/es5/util/colors';
import VCircle from '@/components/circle/VCircle';
import BoxChart from '@/components/widgets/chart/BoxChart';
import ChatWindow from '@/components/chat/ChatWindow';
import CircleStatistic from '@/components/widgets/statistic/CircleStatistic';
import LinearStatistic from '@/components/widgets/statistic/LinearStatistic';
import YGaugeChart from '@/components/widgets/chart/YGaugeChart'
import {
  StackData,
  SinData,
  monthVisitData,
  campaignData,
  locationData,
} from '@/api/chart';

import YDashboardCard from '@/components/widgets/YDashboardCard'
import selectConfig from '@/js/selectConfig.js'
import $ from 'jquery'

export default {
  /* attributes: name, components, props, data */
  components: {
    VWidget,
    MiniStatistic,
    MiniChart,
    ChatWindow,
    VCircle,
    WeatherCard,
    PostSingleCard,
    PostListCard,
    ProfileCard,
    EChart,
    BoxChart,
    CircleStatistic,
    LinearStatistic,
    PlainTable,
    PlainTableOrder,
    YDashboardCard,
    YGaugeChart
  },
  data: () => ({
    color: Material,
    woDelayData: null,
    woDashboardData: {},
    userInfo: null,
    sampleDataset: {
      sinData: SinData,
      monthVisit: monthVisitData,
      campaign: campaignData,
      location: locationData,
      stackData: StackData,
    },
    dataset: {
      keyList: {
        equipment: ['statusOfToday', 'breakdownTime'],
        wo: ['causeStatus']
      },
      // 설비관련 통계 데이터
      equipment: {
        // 오늘의 설비현황
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
        },
        // WO 타입별 설비 고장 발생 건수
        breakdownTime: {
          dataType: 'equipment',
          data: null,
          key: 'breakdownTime',
          type: 'bar',
          title: ''
        },
        totalCount: 0, // 전체 설비수
        totalBreakdownCount: 0  // 고장 설비수
      },
      // WO 관련 통계 데이터
      wo: {
        totalCosts: 0,
        totalHours: 0,
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
      pm: {
        completeRate: 0,
        // 오늘의 pm 완료율
        todayCompleteStatus: {
          subheading: null,
          headline: null,
          caption: null,
          value: 0,
          color: 'purple',
          icon: {
            label: 'report_problem',
            color: 'purple'
          }
        }
      },
      inspection: {
        completeRate: 0,
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
      }
    },
    // Sample
    // linearTrending: [
    //   {
    //     subheading: 'Sales',
    //     headline: '2,55',
    //     caption: 'increase',
    //     percent: 15,
    //     icon: {
    //       label: 'trending_up',
    //       color: 'success'
    //     },
    //     linear: {
    //       value: 15,
    //       color: 'success'
    //     }
    //   },
    //   {
    //     subheading: 'Revenue',
    //     headline: '6,553',
    //     caption: 'increase',
    //     percent: 10,
    //     icon: {
    //       label: 'trending_down',
    //       color: 'error'
    //     },
    //     linear: {
    //       value: 15,
    //       color: 'error'
    //     }
    //   },
    //   {
    //     subheading: 'Orders',
    //     headline: '5,00',
    //     caption: 'increase',
    //     percent: 50,
    //     icon: {
    //       label: 'arrow_upward',
    //       color: 'info'
    //     },
    //     linear: {
    //       value: 50,
    //       color: 'info'
    //     }
    //   }
    // ],
    costDivider: 1000
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
    }
  },
  /* Vue lifecycle: created, mounted, destroyed, etc */
  created() {
  },
  beforeMount() {
    // TODO : 배포시에는 바로 아래 문장을 활성화 시켜야 함
    // this.loadDashboardSettings()
    Object.assign(this.$data, this.$options.data());
    this.getWoTotalCostAndHour()
    this.getPmCompleteRate()
    this.getInspectionCompleteRate()
    this.getEquipmentStatusOfToday()
    this.getWoPmCompleteStatusOfToday()
    this.getInspectionStatusOfToday()
    this.getBreakdownTime()
    this.getCauseStatus()
    this.getDelayStatus()
  },
  /* methods */
  methods: {
    // TODO : 사용자 정의 dashboard가 있다면 가져온다.
    loadDashboardSettings() {
      if (localStorage.dashboard) {
        this.dataset.keyList = JSON.parse(localStorage.dashboard)
      }
    },
    /**
     * 이달의 WO 비용
     */
    getWoTotalCostAndHour() {
      this.$ajax.url = selectConfig.wo.totalCostAndHour.url;
      this.$ajax.param = this.$comm.clone(selectConfig.wo.totalCostAndHour.searchData);
      this.$ajax.param.dateType = 'YEAR'
      this.$ajax.param.startDate = this.$comm.getThisYear()
      this.$ajax.param.endDate = this.$comm.getThisYear()

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
        self.dataset.wo.totalHours = this.$comm.setNumberSeperator(sumHour);
        self.dataset.wo.totalCosts = this.$comm.setNumberSeperator(Math.ceil((sumMaterialCosts + sumLaborCosts + sumOutSourcingCosts + sumEtcCosts) / this.costDivider));
      });
    },
    /**
     * 이달의 PM 수행률
     */
    getPmCompleteRate() {
      this.$ajax.url = selectConfig.pm.completeStatus.url;
      this.$ajax.param = this.$comm.clone(selectConfig.pm.completeStatus.searchData);
      this.$ajax.param.startDate = this.$comm.getThisMonth()
      this.$ajax.param.endDate = this.$comm.getThisMonth()
      var self = this
      var totalCount = 0;
      var totalCompleteCount = 0;
      this.$ajax.requestGet((_result) => {
        $.each(_result, (_i, _item) => {
          totalCount += _item.totCnt;
          totalCompleteCount += _item.finishCnt;
        })
        self.dataset.pm.completeRate = this.$comm.getPercentage(totalCompleteCount, totalCount).toString() + '%';
      })
    },
    /**
     * 이달의 점검 수행률
     */
    getInspectionCompleteRate() {
      this.$ajax.url = selectConfig.inspection.completeStatus.url;
      this.$ajax.param = this.$comm.clone(selectConfig.inspection.completeStatus.searchData);
      this.$ajax.param.startDate = this.$comm.getThisMonth()
      this.$ajax.param.endDate = this.$comm.getThisMonth()
      var self = this
      var totalCount = 0;
      var totalCompleteCount = 0;
      this.$ajax.requestGet((_result) => {
        $.each(_result, (_i, _item) => {
          totalCount += _item.totCnt;
          totalCompleteCount += _item.finishCnt;
        })
        self.dataset.inspection.completeRate = this.$comm.getPercentage(totalCompleteCount, totalCount).toString() + '%';
      })
    },
    // 오늘의 설비 현황
    getEquipmentStatusOfToday() {
      this.$ajax.url = selectConfig.equipmentList[0].url
      this.$ajax.param = this.$comm.clone(selectConfig.equipmentList[0].searchData)
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
            self.dataset.equipment.totalBreakdownCount++;
          }
          self.dataset.equipment.totalCount++;
        })
        // self.dataset.equipment.statusOfToday.data = items
        // self.dataset.equipment.statusOfToday.title = self.$t('title.equipmentStatusOfToday')  // TODO : 오늘의 설비현황
        self.dataset.equipment.statusOfToday.data = [{value: this.$comm.getPercentage(self.dataset.equipment.totalCount - self.dataset.equipment.totalBreakdownCount, self.dataset.equipment.totalCount), name: this.$t('title.equipmentUtilizationRate')}]
        self.dataset.equipment.statusOfToday.title = this.$t('title.equipmentUtilizationRate')  // TODO : 오늘의 설비현황
      }, (_error) => {
        console.log('_error:' + JSON.stringify(_error))
      })
    },
    // 고장 타입별 다운타임
    getBreakdownTime() {
      this.$ajax.url = selectConfig.equipmentList[1].url
      this.$ajax.param = this.$comm.clone(selectConfig.equipmentList[1].searchData)
      this.$ajax.param.startDate = this.$comm.getPrevMonth(6)
      this.$ajax.param.endDate = this.$comm.getThisMonth()
      let self = this
      let items = []
      this.$ajax.requestGet((_result) => {
        var data = _result.content
        var item = {}
        var prevYearMon = ''
        $.each(data, function (_i, _item){
          if (prevYearMon !== _item.yearMon) {
            if (prevYearMon !== '') items.push(item)
            item = {}
            item.month =  _item.yearMon
            item.breakTime = _item.totBreakTime
          } else item.breakTime += _item.totBreakTime

          if (_i === data.length - 1) {
            item.breakTime += _item.totBreakTime
            items.push(item)
            // self.equipmentBreakDownData = self.$comm.clone(items)
          }
          prevYearMon = _item.yearMon
        })
        this.dataset.equipment.breakdownTime.data = items
        this.dataset.equipment.breakdownTime.title = this.$t('title.equipmentOfDowntime')  // TODO : 설비별 Downtime
      }, (_error) => {
        console.log('_error:' + JSON.stringify(_error))
      })
    },
    // 원인별 설비 고장현황
    getCauseStatus() {
      this.$ajax.url = selectConfig.woList[1].url
      this.$ajax.param = this.$comm.clone(selectConfig.woList[1].searchData)
      this.$ajax.param.dateType = 'MON'
      this.$ajax.param.startDate = this.$comm.getPrevMonth(6)
      this.$ajax.param.endDate = this.$comm.getThisMonth()
      let self = this
      let woCauseStatusData = []
      this.$ajax.requestGet((_result) => {
        var data = _result
        $.each(data, function (_i, _item){
          woCauseStatusData.push({
            name: _item.causeNm,
            value: _item.workOrderCnt
          })
        })
        // this.woCauseStatusData = woCauseStatusData
        this.dataset.wo.causeStatus.data = woCauseStatusData
        this.dataset.wo.causeStatus.title = this.$t('title.woCauseStatus')
      }, (_error) => {
        console.log('_error:' + JSON.stringify(_error))
      })
    },
    getDelayStatus () {
      this.$ajax.url = selectConfig.woList[2].url
      this.$ajax.param = this.$comm.clone(selectConfig.woList[2].searchData)
      this.$ajax.param.startDate = this.$comm.getThisMonth()
      this.$ajax.param.endDate = this.$comm.getThisMonth()
      let self = this
      let woCauseStatusData = []
      this.$ajax.requestGet((_result) => {
        var filteredArray = _result
        if (_result.length > 10) filteredArray = _result.splice(0, 9)
        this.woDelayData = filteredArray
      }, (_error) => {
        console.log('_error:' + JSON.stringify(_error))
      })
    },
    // 오늘의 WO/PM 완료 현황
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
    // 오늘의 점검완료 현황
    getInspectionStatusOfToday() {
      this.$ajax.url = selectConfig.inspectionList[0].url
      this.$ajax.param = this.$comm.clone(selectConfig.inspectionList[0].searchData)
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
    chartChanged (_changedItem) {
      var keyList = []
      if (_changedItem.dataType === 'equipment') keyList = this.$comm.clone(this.dataset.keyList.equipment)
      var prevIndex = keyList.findIndex(function (_item) {
        return _item === _changedItem.prevKey
      })
      var index = keyList.findIndex(function (_item) {
        return _item === _changedItem.key
      })
      
      // TODO : 사용자가 바꾼 차트와 이전 차트를 swap처리
      var tmp = keyList[prevIndex]
      keyList[prevIndex] = keyList[index]
      keyList[index] = tmp
      
      // TODO : chart가 변경되었을 경우 화면에 반영하도록 '반응형'으로 적용
      this.$set(this.dataset.keyList, 'equipment', keyList)

      // TODO : 변경된 데이터를 localstorage에 저장
      localStorage.dashboard = JSON.stringify(this.dataset.keyList)
    }
  }
};
</script>
