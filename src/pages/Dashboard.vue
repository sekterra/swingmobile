<template>
  <div id="pageDashboard">
    <v-container grid-list-xl fluid>
      <!-- TODO : summary -->
      <v-layout row wrap>
        <!-- mini statistic start -->
        <v-flex sm12>
          <h4>Summary</h4>
        </v-flex>
        <v-flex lg3 sm6 xs12>
          <mini-chart
            title="PM 실시율"
            sub-title="10%"
            icon="trending_up"
            :data="dataset.monthVisit"
            :chart-color="color.blue.base"
            type="bar"
          >
          </mini-chart>
        </v-flex>
        <v-flex lg3 sm6 xs12>
          <mini-chart
            title="점검 실시율"
            sub-title="15%"
            icon="trending_up"
            :data="dataset.monthVisit"
            :chart-color="color.green.base"
            type="bar"
          >
          </mini-chart>
        </v-flex>
        <v-flex lg3 sm6 xs12>
          <mini-chart
            title="정비 비용"
            sub-title="-800,000원"
            icon="trending_down"
            :data="dataset.monthVisit"
            :chart-color="color.red.base"
            type="bar"
          >
          </mini-chart>
        </v-flex>
        <v-flex lg3 sm6 xs12>
          <mini-statistic
            icon="fa fa-facebook"
            title="100+"
            sub-title="Likes"
            color="indigo"      
          >
          </mini-statistic>  
        </v-flex>
        <!-- mini statistic  end -->   
      </v-layout>

      <!-- TODO : 설비 관련 통계 -->
      <v-layout row wrap>
        <v-flex sm12>
          <h4>Equipments</h4>
        </v-flex>
         <v-flex lg4 sm12 xs12>
          <v-widget title="설비상태" content-bg="white">
            <v-btn icon slot="widget-header-action">
              <v-icon class="text--secondary">refresh</v-icon>
            </v-btn>
            <div slot="widget-content">
                <e-chart 
                :path-option="[
                  ['dataset.source', locationData],
                  ['legend.bottom', '0'],
                  ['color', [color.lightBlue.base, color.indigo.base, color.pink.base, color.green.base, color.cyan.base, color.teal.base]],
                  ['xAxis.show', false],
                  ['yAxis.show', false],
                  ['series[0].type', 'pie'],
                  ['series[0].avoidLabelOverlap', true],         
                  ['series[0].radius', ['50%', '70%']],                      
                ]"
                height="400px"
                width="100%"
                >
                </e-chart>     
            </div>
          </v-widget>  
        </v-flex>
        <v-flex lg8 sm12 xs12>
          <v-widget title="설비별 DownTime" content-bg="white">
            <v-btn icon slot="widget-header-action">
              <v-icon class="text--secondary">refresh</v-icon>
            </v-btn>
            <div slot="widget-content">
                <e-chart 
                :path-option="[
                  ['dataset.source', siteTrafficData],
                  ['color', [color.lightBlue.base, color.green.lighten1]],
                  ['legend.show', true],
                  ['xAxis.axisLabel.show', true],
                  ['yAxis.axisLabel.show', true],
                  ['grid.left', '2%'],
                  ['grid.bottom', '5%'],
                  ['grid.right', '3%'],
                  ['series[0].type', 'bar'],
                  ['series[0].areaStyle', {}],
                  ['series[0].smooth', true],
                  ['series[1].smooth', true],
                  ['series[1].type', 'bar'],
                  ['series[1].areaStyle', {}],
                ]"
                height="400px"
                width="100%"
                >
                </e-chart>     
            </div>
          </v-widget>  
        </v-flex>
      </v-layout>
      <!-- /TODO : 설비 관련 통계 -->

      <!-- TODO : 점검 통계 -->
      <v-layout row wrap>
        <v-flex sm12>
          <h4>PM / Inspection</h4>
        </v-flex>
        <v-flex lg4 sm12>
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
                ['dataset.source', dataset.stackData],
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
                  ['dataset.source', dataset.monthVisit],
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
                ['dataset.source', dataset.monthVisit],
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
      </v-layout>
      <!-- /TODO : PM / 점검 통계 -->

      <!-- TODO : 오늘의 주요 통계 -->
      <v-layout row wrap>
        <v-flex sm12>
          <h4>Today</h4>
        </v-flex>
        <!-- Circle statistic -->
        <v-flex lg4 sm12 xs12 v-for="(item,index) in trending" :key="'c-trending'+index">
          <circle-statistic
            :title="item.subheading"
            :sub-title="item.headline"
            :caption="item.caption"
            :icon="item.icon.label"
            :color="item.linear.color"
            :value="item.linear.value"
          >
          </circle-statistic>            
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <!-- <v-flex lg4 sm12 xs12>
          <linear-statistic 
            title="WO 완료율"
            sub-title="Sales increase"
            icon="trending_up"
            color="success"
            :value="15"
          >
          </linear-statistic>
        </v-flex> -->
        <v-flex lg4 sm12 xs12>
          <linear-statistic class="my-4"
            title="WO 완료율"
            sub-title="완료"
            icon="trending_up"
            color="success"
            :value="15"
          >
          </linear-statistic> 
        </v-flex>
        <v-flex lg4 sm12 xs12>
          <linear-statistic class="my-4"
            title="점검 완료율"
            sub-title="완료"
            icon="trending_up"
            color="pink"
            :value="90"
          >
          </linear-statistic> 
        </v-flex>
        <v-flex lg4 sm12 xs12>         
          <linear-statistic class="my-4"
            title="PM 실시율"
            sub-title="실시"
            icon="trending_up"
            color="primary"
            :value="100"
          >
          </linear-statistic> 
        </v-flex>         
      </v-layout>
      <!-- /TODO : 오늘의 주요 통계 -->

      <v-layout row wrap>
        <v-flex sm12>
          <h4>MTTR / MTBF</h4>
        </v-flex>
        <v-flex lg6 sm12 xs12>
          <plain-table></plain-table>
        </v-flex>
        <v-flex lg6 sm12 xs12>
          <plain-table-order></plain-table-order>
        </v-flex>               
      </v-layout>
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
import {
  StackData,
  SinData,
  monthVisitData,
  campaignData,
  locationData,
} from '@/api/chart';

export default {
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
    PlainTableOrder    
  },
  data: () => ({
    color: Material,
    selectedTab: 'tab-1',
    dataset: {
      sinData: SinData,
      monthVisit: monthVisitData,
      campaign: campaignData,
      location: locationData,
      stackData: StackData,
    },
    linearTrending: [
      {
        subheading: 'Sales',
        headline: '2,55',
        caption: 'increase',
        percent: 15,
        icon: {
          label: 'trending_up',
          color: 'success'
        },
        linear: {
          value: 15,
          color: 'success'
        }
      },
      {
        subheading: 'Revenue',
        headline: '6,553',
        caption: 'increase',
        percent: 10,
        icon: {
          label: 'trending_down',
          color: 'error'
        },
        linear: {
          value: 15,
          color: 'error'
        }
      },
      {
        subheading: 'Orders',
        headline: '5,00',
        caption: 'increase',
        percent: 50,
        icon: {
          label: 'arrow_upward',
          color: 'info'
        },
        linear: {
          value: 50,
          color: 'info'
        }
      }
    ],    
    trending: [
      {
        subheading: 'WO 완료율',
        headline: '3/20',
        caption: '건 완료',
        percent: 15,
        icon: {
          label: 'description',
          color: 'info'
        },
        linear: {
          value: 15,
          color: 'info'
        }
      },        
      {
        subheading: '점검 완료율',
        headline: '9/10',
        caption: '건 완료',
        percent: 90,
        icon: {
          label: 'list',
          color: 'primary'
        },
        linear: {
          value: 90,
          color: 'success'
        }
      },        
      {
        subheading: 'PM 실시율',
        headline: '3/3',
        caption: '건 실시',
        percent: 100,
        icon: {
          label: 'bug_report',
          color: 'primary'
        },
        linear: {
          value: 100,
          color: 'error'
        }
      },        
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
    }
  },

};
</script>
