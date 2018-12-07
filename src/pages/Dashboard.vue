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
      <v-card color="grey lighten-4" flat>
        <v-card-text>
          <y-status :statusList="dashboard" />
        </v-card-text>
      </v-card>
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
// import YDashboardCard from '@/components/widgets/YDashboardCard'
// import selectConfig from '@/js/selectConfig.js'
import $ from 'jquery'
import draggable from 'vuedraggable';
import statusConfig from '@/js/statusConfig.js'
import dashboardConfig from '@/js/dashboardConfig.js'
import YStatus from '@/components/widgets/chart/YStatus'

export default {
  /* attributes: name, components, props, data */
  components: {
    YStatus,
    draggable
  },
  data: () => ({
    userInfo: null,
    isOpenPopup: false,
    statusData: {}, // 통계 데이터
    toggleTask: [0, 1, 2, 3],
    toggleChart: [0, 1, 2, 3, 4, 5],
    dashboardConfig: dashboardConfig,
    statusConfig: statusConfig,
    dashboard: [],
    dashboardSettings: [],
  }),
  computed: {
    
  },
  /* Vue lifecycle: created, mounted, destroyed, etc */
  created() {
  },
  beforeMount() {
    Object.assign(this.$data, this.$options.data());
    
    if (localStorage.dashboardSetting) this.dashboard = JSON.parse(localStorage.dashboardSetting)
    else this.dashboard = this.$comm.clone(this.dashboardConfig)
    console.log(':::: beforeMount :::' + JSON.stringify(this.dashboard))
  },
  mounted() {
    // this.setDashboardData()
    this.setDashboardSettings()
  },
  beforeDestroy() {
    window.getApp.$off('STATUS_METHOD_CALLBACK', this.setStatusData);
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
     * dashboard에 설정된 데이터를 조회
     */
    setDashboardData () {
      // 1. 사용자 정의 dashboard가 있다면 가져온다.
      

      
      // // 2. 대쉬보드 안의 통계자료 조회
      // $.each(this.dashboard, (_i, _item) => {
      //   // 2-1. 현재 loop의 키값으로 statusData에 동적으로 item 생성
      //   // this.statusData[_item.key] = {}
      //   var thisStatusConfig = statusConfig[_item.key]
      //   // 2-2. statusMethod.js 내 함수에서 사용될 파라미터 설정
      //   //  *data 정보는 필수 값으로써, 함수 호출시 데이터를 동적으로 바인딩 시켜주기 위함

      //   var valueKey = thisStatusConfig.hasOwnProperty('valueKey') ? thisStatusConfig.valueKey: _item.key
      //   // 2-3 이미 데이터가 존재하면 다시 조회 하지 않음
      //   if (this.statusData.hasOwnProperty(valueKey)) {
      //     console.log('statusData:' + valueKey + ' already exists.')
      //     return
      //   }

      //   var param = thisStatusConfig.hasOwnProperty('defaultParam') ? thisStatusConfig.defaultParam : {}
      //   param.key = _item.key;

      //   // 2-4. methodKey 항목이 정의되지 않으면 _item.key 정보로 함수명이 존재함
      //   if (typeof statusMethod[_item.key] === 'function') statusMethod[_item.key].call(this, param)
      //   else window.alert('[개발자용 오류 메시지]\\n' + _item.key + '함수가 statusMethod.js에 정의되지 않았습니다.')

      //   // 2-3-1. statusMethod.js에서 직접 참고할 함수명이 존재한다면 호출
      //   // if (thisStatusConfig.hasOwnProperty('methodKey')) {
      //   //   if (typeof statusMethod[thisStatusConfig.methodKey] === 'function') statusMethod[thisStatusConfig.methodKey].call(this, param)
      //   //   else window.alert('[개발자용 오류 메시지]\\n' + thisStatusConfig.methodKey + '함수가 statusMethod.js에 정의되지 않았습니다.')
      //   // }
      //   // // 2-3-2. methodKey 항목이 정의되지 않으면 _item.key 정보로 함수명이 존재함
      //   // else {
      //   //     if (typeof statusMethod[_item.key] === 'function') statusMethod[_item.key].call(this, param)
      //   //     else window.alert('[개발자용 오류 메시지]\\n' + _item.key + '함수가 statusMethod.js에 정의되지 않았습니다.')
      //   // }
      // })
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
        else if (_item === 5) chartTypeIcons.push('plain-table-order')
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
    },
    setStatusData(_statusData) {
      console.log('::::::::::::: STATUS_METHOD_CALLBACK receive dashboard :::::::::::::')
      this.$set(this.statusData, _statusData.key, _statusData.data);
    },
  }
};
</script>
<style>
.yscroll {
  height: 300px;
  overflow-y: auto;
}
</style>
