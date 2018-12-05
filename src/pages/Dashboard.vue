<template>
  <div id="pageDashboard">
    <v-container grid-list-xl fluid class="mt-0 pt-0">
      <div class="text-xs-right">
        <v-btn 
          icon
          flat
          dark
          color="indigo lighten-1"
          @click.prevent="openSettingPopup"
          >
          <v-icon>phonelink_setup</v-icon>
        </v-btn>
      </div>
      <!-- TODO : dashboard config -->
      <v-card color="indigo lighten-5" flat>
        <v-card-text>
          <v-layout row wrap>
            <v-flex 
              v-for="item in dashboard" :key="item.key"
              :xs12="item.xs12"
              :sm6='item.sm6' 
              :lg4='item.lg4'
              :lg8="item.lg8">
              <mini-statistic
                v-if="statusConfig[item.key].type === 'mini-statistic' && statusData[item.key]"
                :icon="$iconMapper.task[item.taskGroup]"
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
              <!-- bar, line chart -->
              <y-multibar-chart
                v-if="statusConfig[item.key].type === 'y-multibar-chart' && statusData[item.key]"
                :title="$t('title.' + item.key)"
                :x-axis-labels="statusData[item.key].xAxisLabels"
                :data-list="statusData[item.key].value"
                :unit="statusConfig[item.key].unit"
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
      <!-- / TODO : dashboard config -->
      <v-card color="indigo lighten-5" flat>
        <v-card-title>
          <div>
          {{$t('title.summaryThisYear')}}
          </div>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <!-- 설치된 설비수 -->
            <v-flex lg4 sm6 xs12>
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
            <v-flex lg4 sm6 xs12>
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
            <v-flex lg4 sm6 xs12>
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
            <v-flex lg4 sm6 xs12>
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
            <v-flex lg4 sm6 xs12>
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
            <v-flex lg4 sm6 xs12>
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
        </v-card-text>
      </v-card>
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
            :title="$t('title.inspectionCompleteRate')"
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
    <y-popup 
        :is-open-popup="isOpenPopup"
        :title="$t('title.setupDashboard')"
        event-for-return="setupDashboard"
        @closePopup="closePopup"
        @setupDashboard="setupDashboard"
      >
      <v-card slot="body" flat>
        <v-card-title>
          <v-container fluid class="pa-0">
            <v-layout row wrap>
              <v-flex xs12 sm4>
              <v-toolbar dense flat :card="true">
              <v-btn-toggle 
                v-model="toggleTask"
                multiple
                @change="toggleTaskChanged">
                <v-btn 
                  v-for="(btnItem, key) in $iconMapper.task"
                  :key="key"
                  flat
                >
                  <v-icon>{{btnItem}}</v-icon>
                </v-btn>
              </v-btn-toggle>
              <!-- <v-divider vertical class="mx-3"></v-divider> -->
              </v-toolbar>
                </v-flex>
              <v-flex xs12 sm8>
                <v-toolbar dense flat>
              <v-btn-toggle  
                v-model="toggleChart"
                multiple
                @change="toggleChartChanged"
              >
                <v-btn 
                  v-for="(btnItem, key) in $iconMapper.chart"
                  :key="key"
                  flat
                >
                  <v-icon>{{btnItem}}</v-icon>
                </v-btn>
              </v-btn-toggle>
              <!-- <v-divider vertical class="ml-2"></v-divider> -->
              <v-spacer></v-spacer>
              <v-btn
                flat
                small
                icon
                color="black"
                dark
                @click.prevent="btnClearClicked" 
              >
                <v-icon>settings_backup_restore</v-icon>
              </v-btn>
              </v-toolbar>
              </v-flex>
              
            </v-layout>
          </v-container>
        </v-card-title>
        <v-card-text>
      <v-list 
        two-line
        class="yscroll"
      >
        <draggable v-model="dashboardSettings" :options="{handle:'.handle'}">
          <template v-for="(item, i) in dashboardSettings">
            <v-list-tile
              v-if="item.visible"
              :key="item.key"
              avatar
              @click.stop=""
            >
              <v-list-tile-action class="handle">
                <v-btn 
                  v-if="item.enable" 
                  icon 
                  small 
                  color="indigo lighten-1" 
                  dark
                  @click.prevent="item.enable = !item.enable">
                  <v-icon>notifications_active</v-icon>
                </v-btn>
                <v-btn 
                  v-else 
                  icon 
                  small 
                  color="grey lighten-1"  
                  dark
                  @click.prevent="item.enable = !item.enable">
                  <v-icon>notifications_paused</v-icon>
                </v-btn>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title v-html="(i + 1) + '.  ' + $t('title.' + item.key)"></v-list-tile-title>
                <!-- <v-list-tile-sub-title v-html="$t('title.' + statusConfig[item.key].remark)"></v-list-tile-sub-title> -->
              </v-list-tile-content>
              <v-list-tile-avatar>
                <v-icon>{{$iconMapper.task[item.taskGroup]}}</v-icon>
                <v-icon>{{$iconMapper.chart[item.type]}}</v-icon>
              </v-list-tile-avatar>
            </v-list-tile>
            <!-- <v-divider 
              v-if="index > 0"
              inset
              :key="index"
            ></v-divider> -->
          </template>
        </draggable>
        </v-list>
        </v-card-text>
        </v-card>
      </y-popup>
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
import draggable from 'vuedraggable';
import dashboardConfig from '@/js/dashboardConfig.js'
import statusConfig from '@/js/statusConfig.js'
import statusMethod from '@/js/statusMethod.js'
import YMultibarChart from '@/components/widgets/chart/YMultibarChart';
import YPieChart from '@/components/widgets/chart/YPieChart';

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
    YGaugeChart,
    draggable,
    YMultibarChart,
    YPieChart
  },
  data: () => ({
    color: Material,
    woDelayData: null,
    woDashboardData: {},
    userInfo: null,
    isOpenPopup: false,
    statusData: {}, // 통계 데이터
    toggleTask: [0, 1, 2, 3],
    toggleChart: [0, 1, 2, 3, 4],
    dashboardConfig: dashboardConfig,
    statusConfig: statusConfig,
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
            label: 'assignment',
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
            label: 'list_alt',
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
    costDivider: '1,000',
    dashboard: [],
    dashboardSettings: [],
    // TODO : 샘플
    items: [
          {
            title: 'Brunch this weekend?'
          },
          {
            title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>'
          },
          {
            title: 'Oui oui',
          }
        ]
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
  },
  /* Vue lifecycle: created, mounted, destroyed, etc */
  created() {
  },
  beforeMount() {
    Object.assign(this.$data, this.$options.data());

    window.getApp.$on('STATUS_METHOD_CALLBACK', (_statusData) => {
    try {
        var mainKey = _statusData.key
        // var data = _statusData.data
        // var tmp = {}
        // for(var _key in data) {
        //   // var valueKey = statusConfig[mainKey].hasOwnProperty('valueKey') ? statusConfig[mainKey].valueKey: mainKey
        //   // var value = data[valueKey]
        //   tmp[_key] = data[_key]
        // }
        this.$set(this.statusData, mainKey, _statusData.data)
      } catch (e) {
        window.alert(e.message)
      }
    })
    
    // 과거 통계 조회(statusMethod.js로 이동 예정))
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
  mounted() {
    this.setDashboardData()
    this.setDashboardSettings()
  },
  /* methods */
  methods: {
    // // TODO : 사용자 정의 dashboard가 있다면 가져온다.
    // loadDashboardSettings() {
    //   if (localStorage.dashboard) {
    //     this.dataset.keyList = JSON.parse(localStorage.dashboard)
    //   }
    // },
    /**
     * dashboard에 설정된 데이터를 
     */
    setDashboardData () {
      // 1. 사용자 정의 dashboard가 있다면 가져온다.
      if (localStorage.dashboardSetting) this.dashboard = JSON.parse(localStorage.dashboardSetting)
      else this.dashboard = this.$comm.clone(this.dashboardConfig)

      // 2. 대쉬보드 안의 통계자료 조회
      $.each(this.dashboard, (_i, _item) => {
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

        // 2-3-1. statusMethod.js에서 직접 참고할 함수명이 존재한다면 호출
        if (thisStatusConfig.hasOwnProperty('methodKey')) {
          if (typeof statusMethod[thisStatusConfig.methodKey] === 'function') statusMethod[thisStatusConfig.methodKey].call(this, param)
          else window.alert('[개발자용 오류 메시지]\\n' + thisStatusConfig.methodKey + '함수가 statusMethod.js에 정의되지 않았습니다.')
        }
        // 2-3-2. methodKey 항목이 정의되지 않으면 _item.key 정보로 함수명이 존재함
        else {
            if (typeof statusMethod[_item.key] === 'function') statusMethod[_item.key].call(this, param)
            else window.alert('[개발자용 오류 메시지]\\n' + _item.key + '함수가 statusMethod.js에 정의되지 않았습니다.')
        }
      })
    },
    /**
     * 대쉬보드 설정 팝업에 표시할 setting 정보를 대상 구성한다.
     */
    setDashboardSettings() {
      if (!this.dashboard || this.dashboard.length <= 0) return
      var dashboardSettings = []
      
      for(var key in this.statusConfig) {
        var filter = this.$_.filter(this.dashboard, (_item) => {
          return _item.key === key
        });

        dashboardSettings.push({
          key: key,
          enable: filter.length > 0,
          visible: true,
          taskGroup: statusConfig[key].taskGroup,
          type: statusConfig[key].type,
          order: filter.length > 0 ? filter[0].order : 999
        });
      }

      dashboardSettings = this.$_.sortBy(dashboardSettings, ['order', 'taskGroup', 'type'])
      this.$set(this, 'dashboardSettings', dashboardSettings);
      // console.log('dashboardSettings:' + JSON.stringify(dashboardSettings))
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
    },
    openSettingPopup() {
      this.isOpenPopup = true
    },
    closePopup () {
      this.isOpenPopup = false
    },
    setupDashboard () {
      var dashboard = this.$_.filter(this.dashboardSettings, (_item) => {
        return _item.enable
      })

      this.$set(this, 'dashboard', dashboard)
      localStorage.dashboardSetting = JSON.stringify(dashboard)
      console.log('localStorage.dashboardSetting:' + localStorage.dashboardSetting)
      this.isOpenPopup = false
    },
    toggleTaskChanged() {
      if (!this.dashboardSettings || this.dashboardSettings.length <= 0) return
      var dashboardSettings = this.$comm.clone(this.dashboardSettings)
      
      var self = this
      var taskGroups = []
      $.each(this.toggleTask, (_i, _item) => {
        if (_item === 0) taskGroups.push('equipment')
        else if (_item === 1) taskGroups.push('wo')
        else if (_item === 2) taskGroups.push('inspection')
        else if (_item === 3) taskGroups.push('pm')
      })

      this.$_.forEach(dashboardSettings, (_item) => {
        console.log('taskGroup:' + _item.taskGroup)
        _item.visible = this.$_.includes(taskGroups, _item.taskGroup)
      })
      console.log(JSON.stringify(dashboardSettings))
      this.$set(this, 'dashboardSettings', dashboardSettings)
    },
    toggleChartChanged() {
      if (!this.dashboardSettings || this.dashboardSettings.length <= 0) return
      var dashboardSettings = this.$comm.clone(this.dashboardSettings)
      
      var self = this
      var chartTypeIcons = []
      var filterByChartType = []
      $.each(this.toggleChart, (_i, _item) => {
        if (_item === 0) chartTypeIcons.push('mini-statistic')
        else if (_item === 1) chartTypeIcons.push('y-gauge-chart')
        else if (_item === 2) chartTypeIcons.push('circle-statistic')
        else if (_item === 3) chartTypeIcons.push('y-multibar-chart')
        else if (_item === 4) chartTypeIcons.push('y-pie-chart')
        // var filtered = filteredByTask.filter((__item) => {
        //   return self.statusConfig[__item.key].chartTypeIcon === chartTypeIcon
        // })
        // // filterByChartType = this.$_.merge(filterByChartType, filtered)
        // filterByChartType = filterByChartType.concat(filtered)
      })

       this.$_.forEach(dashboardSettings, (_item) => {
        _item.visible = this.$_.includes(chartTypeIcons, _item.type)
      })

      this.$set(this, 'dashboardSettings', dashboardSettings)
    },
    btnClearClicked() {
      window.getApp.$emit('APP_CONFIRM', this.$t('message.initialize'));
      window.getApp.$on('APP_CONFIRM_REPLY', this.initDashboardSetting);
    },
    initDashboardSetting(_isInit) {
      if (!_isInit) return
      localStorage.removeItem('dashboardSetting');
      this.dashboard = this.$comm.clone(this.dashboardConfig)
      this.setDashboardSettings();
      window.getApp.$off('APP_CONFIRM_REPLY', this.initDashboardSetting);
    }
  }
};
</script>
<style>
.yscroll {
  height: 300px;
  overflow-y: auto;
}
</style>
